import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import ScrollShowcase from "@/components/sections/ScrollShowcase";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import HowItWorks from "@/components/sections/HowItWorks";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="bg-bg-base min-h-screen">
      <Navbar />
      <Hero />
      <ScrollShowcase />
      <Services />
      <Portfolio />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
