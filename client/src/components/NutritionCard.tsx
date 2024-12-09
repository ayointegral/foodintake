import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface NutritionCardProps {
  title: string;
  current: number;
  target: number;
  unit: string;
  color?: string;
}

export function NutritionCard({ title, current, target, unit, color = "bg-primary" }: NutritionCardProps) {
  const progress = Math.min((current / target) * 100, 100);
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <span className="text-xs text-muted-foreground">
          Target: {target}{unit}
        </span>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {current}{unit}
        </div>
        <Progress
          value={progress}
          className="mt-2"
          indicatorClassName={color}
        />
        <p className="text-xs text-muted-foreground mt-2">
          {progress.toFixed(0)}% of daily goal
        </p>
      </CardContent>
    </Card>
  );
}

export default NutritionCard;
