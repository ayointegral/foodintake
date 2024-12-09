import type { Express } from "express";
import { db } from "../db";
import { meals, nutrition, users } from "@db/schema";
import { eq } from "drizzle-orm";

export function registerRoutes(app: Express) {
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
