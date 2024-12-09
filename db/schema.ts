import { pgTable, text, integer, timestamp, json, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  age: integer("age").notNull(),
  gender: text("gender").notNull(),
  weight: integer("weight").notNull(),
  height: integer("height").notNull(),
  activityLevel: text("activity_level").notNull(),
  dietaryPreferences: json("dietary_preferences").notNull(),
  goals: json("goals").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const meals = pgTable("meals", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  calories: integer("calories").notNull(),
  protein: integer("protein").notNull(),
  carbs: integer("carbs").notNull(),
  fat: integer("fat").notNull(),
  date: timestamp("date").notNull(),
  type: text("type").notNull(), // breakfast, lunch, dinner, snack
  isPlanned: boolean("is_planned").default(false).notNull(),
});

export const nutrition = pgTable("nutrition", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").references(() => users.id).notNull(),
  date: timestamp("date").notNull(),
  totalCalories: integer("total_calories").notNull(),
  totalProtein: integer("total_protein").notNull(),
  totalCarbs: integer("total_carbs").notNull(),
  totalFat: integer("total_fat").notNull(),
  weight: integer("weight"),
});

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = z.infer<typeof selectUserSchema>;

export const insertMealSchema = createInsertSchema(meals);
export const selectMealSchema = createSelectSchema(meals);
export type InsertMeal = z.infer<typeof insertMealSchema>;
export type Meal = z.infer<typeof selectMealSchema>;

export const insertNutritionSchema = createInsertSchema(nutrition);
export const selectNutritionSchema = createSelectSchema(nutrition);
export type InsertNutrition = z.infer<typeof insertNutritionSchema>;
export type Nutrition = z.infer<typeof selectNutritionSchema>;
