import { Card } from "@/components/ui/card";
import { Droplet, TrendingUp, AlertCircle, LineChart } from "lucide-react";

const features = [
  {
    icon: Droplet,
    title: "Source Apportionment",
    description: "Identify pollution contributions from sewage, industrial, storm, and groundwater sources.",
    color: "text-primary",
  },
  {
    icon: TrendingUp,
    title: "Potability Prediction",
    description: "AI-powered classification to determine if water is safe or unsafe for consumption.",
    color: "text-accent",
  },
  {
    icon: AlertCircle,
    title: "Event Detection",
    description: "Detect critical events like first flush, industrial spikes, and dry weather patterns.",
    color: "text-warning-amber",
  },
  {
    icon: LineChart,
    title: "Bayesian Mixing",
    description: "Advanced statistical modeling for precise source fraction calculations.",
    color: "text-secondary",
  },
];

const AboutSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            About This Tool
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            This tool combines Machine Learning and Bayesian mixing models to estimate pollution source contributions in stormwater and predict water safety with high accuracy.
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="p-6 hover-lift cursor-pointer transition-all hover:border-primary/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="space-y-3">
                  <div className={`${feature.color} bg-background rounded-lg p-3 w-fit`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
