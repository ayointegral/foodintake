import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import NutritionCard from "../components/NutritionCard";
import ProgressChart from "../components/ProgressChart";
import MealCard from "../components/MealCard";
import type { Meal } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

export default function Dashboard() {
  const { data: nutritionData } = useQuery({
    queryKey: ['nutrition'],
    queryFn: async () => {
      const response = await fetch('/api/nutrition');
      return response.json();
    },
  });

  const { data: todaysMeals } = useQuery({
    queryKey: ['meals', 'today'],
    queryFn: async () => {
      const response = await fetch('/api/meals/today');
      return response.json();
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto py-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <NutritionCard
            title="Calories"
            current={nutritionData?.totalCalories || 0}
            target={2000}
            unit="kcal"
          />
          <NutritionCard
            title="Protein"
            current={nutritionData?.totalProtein || 0}
            target={150}
            unit="g"
            color="bg-blue-500"
          />
          <NutritionCard
            title="Carbs"
            current={nutritionData?.totalCarbs || 0}
            target={250}
            unit="g"
            color="bg-orange-500"
          />
          <NutritionCard
            title="Fat"
            current={nutritionData?.totalFat || 0}
            target={65}
            unit="g"
            color="bg-red-500"
          />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <ProgressChart
            data={nutritionData?.history || []}
            metric="calories"
            title="Calorie Trend"
          />
          
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Today's Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src="https://images.unsplash.com/photo-1487956382158-bb926046304a"
                alt="Fitness tracking"
                className="rounded-lg object-cover w-full h-48"
              />
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Today's Meals</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {todaysMeals?.map((meal: Meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
