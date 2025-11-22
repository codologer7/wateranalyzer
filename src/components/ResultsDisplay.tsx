import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle, Activity } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface PredictionResult {
  potability: string;
  event_type: string;
  confidence: number;
  fractions: {
    sewage: number;
    industrial: number;
    storm: number;
    groundwater: number;
  };
}

const COLORS = {
  sewage: "hsl(var(--destructive))",
  industrial: "hsl(var(--warning-amber))",
  storm: "hsl(var(--primary))",
  groundwater: "hsl(var(--accent))",
};

const ResultsDisplay = ({ result }: { result: PredictionResult }) => {
  const chartData = Object.entries(result.fractions).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: parseFloat((value * 100).toFixed(2)),
  }));

  const isSafe = result.potability === "Safe";

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className={`p-6 border-2 ${isSafe ? "border-accent" : "border-destructive"}`}>
        <div className="flex items-center gap-4">
          {isSafe ? (
            <CheckCircle className="h-12 w-12 text-accent" />
          ) : (
            <XCircle className="h-12 w-12 text-destructive" />
          )}
          <div>
            <h3 className="text-xl font-semibold">Potability Status</h3>
            <p className={`text-2xl font-bold ${isSafe ? "text-accent" : "text-destructive"}`}>
              {result.potability}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <Activity className="h-10 w-10 text-primary" />
          <div className="flex-1">
            <h3 className="text-xl font-semibold">Event Type</h3>
            <p className="text-lg font-medium text-primary">{result.event_type}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Confidence</p>
            <p className="text-2xl font-bold text-primary">
              {(result.confidence * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Source Fractions</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[entry.name.toLowerCase() as keyof typeof COLORS]} 
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default ResultsDisplay;
