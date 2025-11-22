import { Link, useLocation } from "react-router-dom";
import { Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Droplets className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">Urban Stormwater Analysis</span>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/" ? "text-primary" : "text-foreground"
            }`}
          >
            Home
          </Link>
          <Link to="/predict">
            <Button 
              variant={location.pathname === "/predict" ? "default" : "outline"}
              size="sm"
            >
              Predict
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
