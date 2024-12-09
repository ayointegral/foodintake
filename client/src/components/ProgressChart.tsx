import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { NutritionData } from "../types";
import { format } from "date-fns";

interface ProgressChartProps {
  data: NutritionData[];
  metric: 'calories' | 'weight';
  title: string;
}

export function ProgressChart({ data, metric, title }: ProgressChartProps) {
  const chartData = data.map(item => ({
    date: format(new Date(item.date), 'MM/dd'),
    value: metric === 'calories' ? item.totalCalories : item.weight
  }));

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="hsl(141, 76%, 36%)" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default ProgressChart;
