import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import MealCard from "../components/MealCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import type { MealPlan } from "../types";

export default function MealPlanner() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const { data: mealPlan } = useQuery<MealPlan>({
    queryKey: ["mealPlan", selectedDate],
    queryFn: async () => {
      const response = await fetch(`/api/meals/plan?date=${selectedDate.toISOString()}`);
      return response.json();
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto py-6">
        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Meal Planning</CardTitle>
                <CardDescription>
                  Select a date to view or modify your meal plan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Calories Target</label>
                  <Select defaultValue="2000">
                    <SelectTrigger>
                      <SelectValue placeholder="Select calories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1500">1500 kcal</SelectItem>
                      <SelectItem value="2000">2000 kcal</SelectItem>
                      <SelectItem value="2500">2500 kcal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">Generate New Plan</Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Overview</CardTitle>
                <CardDescription>
                  {selectedDate.toLocaleDateString(undefined, { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Breakfast</h3>
                    <div className="grid gap-6 md:grid-cols-2">
                      {mealPlan?.meals
                        .filter((meal) => meal.type === "breakfast")
                        .map((meal) => (
                          <MealCard 
                            key={meal.id} 
                            meal={meal}
                            image="https://images.unsplash.com/photo-1494390248081-4e521a5940db"
                          />
                        ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Lunch</h3>
                    <div className="grid gap-6 md:grid-cols-2">
                      {mealPlan?.meals
                        .filter((meal) => meal.type === "lunch")
                        .map((meal) => (
                          <MealCard 
                            key={meal.id} 
                            meal={meal}
                            image="https://images.unsplash.com/photo-1497888329096-51c27beff665"
                          />
                        ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Dinner</h3>
                    <div className="grid gap-6 md:grid-cols-2">
                      {mealPlan?.meals
                        .filter((meal) => meal.type === "dinner")
                        .map((meal) => (
                          <MealCard 
                            key={meal.id} 
                            meal={meal}
                            image="https://images.unsplash.com/photo-1490645935967-10de6ba17061"
                          />
                        ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Snacks</h3>
                    <div className="grid gap-6 md:grid-cols-2">
                      {mealPlan?.meals
                        .filter((meal) => meal.type === "snack")
                        .map((meal) => (
                          <MealCard 
                            key={meal.id} 
                            meal={meal}
                            image="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2"
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
