import { Card } from "@/components/ui/card";
import { FileInput, Cpu, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: FileInput,
    title: "Enter Parameters",
    description: "Input water quality parameters including pH, hardness, solids, and other key indicators.",
    step: "01",
  },
  {
    icon: Cpu,
    title: "Model Processing",
    description: "Our Random Forest ML model combined with Bayesian mixing analyzes your data instantly.",
    step: "02",
  },
  {
    icon: BarChart3,
    title: "View Results",
    description: "Get potability status, event type classification, and detailed source fraction breakdowns.",
    step: "03",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20">
      <div className="container px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Three simple steps to get comprehensive water quality insights
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <Card className="p-8 text-center hover-lift h-full">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg">
                      {step.step}
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <div className="flex justify-center">
                      <div className="bg-primary/10 rounded-lg p-4">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-xl">{step.title}</h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </Card>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
