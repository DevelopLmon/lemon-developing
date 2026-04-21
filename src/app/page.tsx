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
import { prisma } from "@/lib/prisma";

const Divider = () => (
  <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
);

async function getPrices() {
  try {
    const keys = ["pricing_starter_price", "pricing_pro_price", "pricing_premium_price"];
    const rows = await prisma.siteContent.findMany({ where: { key: { in: keys } } });
    const map = Object.fromEntries(rows.map((r: { key: string; value: string }) => [r.key, r.value]));
    return {
      starter: map["pricing_starter_price"] ?? "499",
      pro: map["pricing_pro_price"] ?? "999",
      premium: map["pricing_premium_price"] ?? "1.999",
    };
  } catch {
    return { starter: "499", pro: "999", premium: "1.999" };
  }
}

export default async function Home() {
  const prices = await getPrices();

  return (
    <main className="bg-bg-base min-h-screen">
      <Navbar />
      <Hero />
      <Divider />
      <ScrollShowcase />
      <Divider />
      <Services />
      <Divider />
      <Portfolio />
      <Divider />
      <HowItWorks />
      <Divider />
      <Pricing prices={prices} />
      <Divider />
      <FAQ />
      <Divider />
      <Contact />
      <Divider />
      <Footer />
    </main>
  );
}
