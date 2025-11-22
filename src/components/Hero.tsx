import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Droplets } from "lucide-react";
import heroImage from "@/assets/hero-water.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden water-ripple">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-water-deep/90 via-primary/80 to-water-cyan/70" />
      </div>
      
      <div className="container relative z-10 text-center px-4">
        <div className="mx-auto max-w-4xl space-y-6 animate-fade-in">
          <div className="flex justify-center mb-4">
            <Droplets className="h-16 w-16 text-primary-foreground animate-pulse" />
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-6xl">
            Urban Stormwater
            <br />
            <span className="text-water-cyan">Source Apportionment</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg text-primary-foreground/90 sm:text-xl">
            AI-powered water quality insights in real time. Combining Machine Learning and Bayesian mixing models for accurate pollution source identification.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/predict">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all">
                Start Prediction
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="bg-background/10 hover:bg-background/20 text-primary-foreground border-primary-foreground/30 backdrop-blur-sm">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
