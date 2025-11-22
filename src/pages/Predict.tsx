import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ResultsDisplay from "@/components/ResultsDisplay";

const parameterSchema = z.object({
  ph: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 14, {
    message: "pH must be between 0 and 14",
  }),
  hardness: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Hardness must be a positive number",
  }),
  solids: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Solids must be a positive number",
  }),
  chloramines: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Chloramines must be a positive number",
  }),
  sulfate: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Sulfate must be a positive number",
  }),
  conductivity: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Conductivity must be a positive number",
  }),
  organic_carbon: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Organic carbon must be a positive number",
  }),
  trihalomethanes: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Trihalomethanes must be a positive number",
  }),
  turbidity: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Turbidity must be a positive number",
  }),
});

type ParameterFormData = z.infer<typeof parameterSchema>;

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

const parameters = [
  { name: "ph", label: "pH", tooltip: "Measure of acidity or alkalinity (0-14 scale)" },
  { name: "hardness", label: "Hardness (mg/L)", tooltip: "Concentration of calcium and magnesium salts" },
  { name: "solids", label: "Total Dissolved Solids (ppm)", tooltip: "Total amount of dissolved substances" },
  { name: "chloramines", label: "Chloramines (ppm)", tooltip: "Disinfectant compounds containing chlorine" },
  { name: "sulfate", label: "Sulfate (mg/L)", tooltip: "Naturally occurring mineral compound" },
  { name: "conductivity", label: "Conductivity (μS/cm)", tooltip: "Ability of water to conduct electricity" },
  { name: "organic_carbon", label: "Organic Carbon (ppm)", tooltip: "Amount of carbon in organic compounds" },
  { name: "trihalomethanes", label: "Trihalomethanes (μg/L)", tooltip: "Disinfection byproducts in treated water" },
  { name: "turbidity", label: "Turbidity (NTU)", tooltip: "Cloudiness or haziness of water" },
];

const Predict = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<ParameterFormData>({
    resolver: zodResolver(parameterSchema),
  });

  const onSubmit = async (data: ParameterFormData) => {
    setLoading(true);
    
    try {
      const PREDICT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/predict`;
      
      const response = await fetch(PREDICT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ph: data.ph,
          hardness: data.hardness,
          solids: data.solids,
          chloramines: data.chloramines,
          sulfate: data.sulfate,
          conductivity: data.conductivity,
          organic_carbon: data.organic_carbon,
          trihalomethanes: data.trihalomethanes,
          turbidity: data.turbidity,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }

      const result: PredictionResult = await response.json();
      setResult(result);
      toast.success("Prediction completed successfully!");
    } catch (error) {
      console.error('Prediction error:', error);
      toast.error("Failed to get prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 bg-background">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Water Quality Prediction
              </h1>
              <p className="text-muted-foreground">
                Enter water quality parameters to analyze potability and pollution sources
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Input Parameters</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <TooltipProvider>
                    {parameters.map((param) => (
                      <div key={param.name} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor={param.name}>{param.label}</Label>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">{param.tooltip}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Input
                          id={param.name}
                          type="text"
                          placeholder="Enter value"
                          {...register(param.name as keyof ParameterFormData)}
                        />
                        {errors[param.name as keyof ParameterFormData] && (
                          <p className="text-sm text-destructive">
                            {errors[param.name as keyof ParameterFormData]?.message}
                          </p>
                        )}
                      </div>
                    ))}
                  </TooltipProvider>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Predict"
                    )}
                  </Button>
                </form>
              </Card>

              <div className="space-y-6">
                {result ? (
                  <ResultsDisplay result={result} />
                ) : (
                  <Card className="p-12 flex flex-col items-center justify-center text-center h-full">
                    <div className="text-muted-foreground space-y-2">
                      <p className="text-lg font-medium">Results will appear here</p>
                      <p className="text-sm">Enter parameters and click Predict to see analysis</p>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Predict;
