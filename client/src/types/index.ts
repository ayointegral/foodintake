export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  activityLevel: string;
  dietaryPreferences: string[];
  goals: {
    type: 'weight_loss' | 'muscle_gain' | 'maintenance';
    target: number;
  };
  createdAt: Date;
}

export interface NutritionData {
  date: Date;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  weight?: number;
}

export interface Meal {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  isPlanned: boolean;
  date: Date;
}

export interface MealPlan {
  date: Date;
  meals: Meal[];
}
