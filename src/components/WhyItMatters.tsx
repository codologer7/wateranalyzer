import { Card } from "@/components/ui/card";
import { Heart, Shield, Users } from "lucide-react";

const WhyItMatters = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why It Matters
            </h2>
            <p className="text-lg text-muted-foreground">
              Clean water and pollution source tracking are critical for public health and environmental protection
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="p-6 text-center hover-lift">
              <div className="flex justify-center mb-4">
                <div className="bg-accent/10 rounded-full p-4">
                  <Heart className="h-8 w-8 text-accent" />
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Public Health</h3>
              <p className="text-sm text-muted-foreground">
                Ensuring safe drinking water prevents waterborne diseases and protects communities.
              </p>
            </Card>
            
            <Card className="p-6 text-center hover-lift">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 rounded-full p-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Environmental Protection</h3>
              <p className="text-sm text-muted-foreground">
                Identifying pollution sources helps prevent ecological damage and preserve natural resources.
              </p>
            </Card>
            
            <Card className="p-6 text-center hover-lift">
              <div className="flex justify-center mb-4">
                <div className="bg-secondary/10 rounded-full p-4">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Urban Planning</h3>
              <p className="text-sm text-muted-foreground">
                Data-driven insights enable better infrastructure decisions and resource allocation.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyItMatters;
