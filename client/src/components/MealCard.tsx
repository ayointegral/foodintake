import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Meal } from "../types";

interface MealCardProps {
  meal: Meal;
  image?: string;
}

const mealImages = {
  breakfast: "https://images.unsplash.com/photo-1494390248081-4e521a5940db",
  lunch: "https://images.unsplash.com/photo-1497888329096-51c27beff665",
  dinner: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
  snack: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2"
};

export function MealCard({ meal, image }: MealCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={image || mealImages[meal.type]}
          alt={meal.name}
          className="h-full w-full object-cover transition-all hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{meal.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Calories</p>
            <p className="font-medium">{meal.calories}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Protein</p>
            <p className="font-medium">{meal.protein}g</p>
          </div>
          <div>
            <p className="text-muted-foreground">Carbs</p>
            <p className="font-medium">{meal.carbs}g</p>
          </div>
          <div>
            <p className="text-muted-foreground">Fat</p>
            <p className="font-medium">{meal.fat}g</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default MealCard;
