import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import HowItWorks from "@/components/HowItWorks";
import WhyItMatters from "@/components/WhyItMatters";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <AboutSection />
        <HowItWorks />
        <WhyItMatters />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
