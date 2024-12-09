import type { Express, Request } from "express";
import { db } from "../db";
import { meals, nutrition, users } from "@db/schema";
import { eq, and } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

interface AuthRequest extends Request {
  user?: { id: number };
}

// Middleware to verify JWT token
const authenticateToken = (req: AuthRequest, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

export function registerRoutes(app: Express) {
  // Auth routes
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { password, ...userData } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const user = await db.insert(users)
        .values({ ...userData, password: hashedPassword })
        .returning();
      
      const token = jwt.sign({ id: user[0].id }, JWT_SECRET);
      res.json({ token, user: user[0] });
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  app.post("/api/auth/signin", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user.id }, JWT_SECRET);
      res.json({ token, user });
    } catch (error) {
      res.status(500).json({ error: "Authentication failed" });
    }
  });

  app.get("/api/auth/me", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const user = await db.query.users.findFirst({
        where: eq(users.id, req.user!.id),
      });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });
  // User routes
  app.post("/api/users", async (req, res) => {
    try {
      const user = await db.insert(users).values(req.body).returning();
      res.json(user[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await db.query.users.findFirst({
        where: eq(users.id, parseInt(req.params.id)),
      });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  // Nutrition routes
  app.get("/api/nutrition", async (req, res) => {
    try {
      const userId = 1; // TODO: Get from auth
      const nutritionData = await db.query.nutrition.findMany({
        where: eq(nutrition.userId, userId),
        orderBy: (nutrition, { desc }) => [desc(nutrition.date)],
        limit: 7,
      });
      res.json(nutritionData);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch nutrition data" });
    }
  });

  app.post("/api/nutrition", async (req, res) => {
    try {
      const entry = await db.insert(nutrition).values(req.body).returning();
      res.json(entry[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to log nutrition data" });
    }
  });

  // Meal routes
  app.get("/api/meals/today", async (req, res) => {
    try {
      const userId = 1; // TODO: Get from auth
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const todaysMeals = await db.query.meals.findMany({
        where: eq(meals.userId, userId),
      });
      res.json(todaysMeals);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch meals" });
    }
  });

  app.post("/api/meals", async (req, res) => {
    try {
      const meal = await db.insert(meals).values(req.body).returning();
      res.json(meal[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to create meal" });
    }
  });
}
