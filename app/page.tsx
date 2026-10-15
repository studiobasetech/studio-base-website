import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import Products from "@/sections/Products";
import Process from "@/sections/Process";
import WhyStudio from "@/sections/WhyStudio";
import Technologies from "@/sections/Technologies";
import CTA from "@/sections/CTA";

// Navbar and Footer come from app/layout.tsx.
export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Products />
      <Process />
      <WhyStudio />
      <Technologies />
      <CTA />
    </>
  );
}
