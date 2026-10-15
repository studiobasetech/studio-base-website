import Reveal, { ScrollProgress } from "../components/Reveal";
import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import Products from "@/sections/Products";
import Process from "@/sections/Process";
import WhyStudio from "@/sections/WhyStudio";
import Technologies from "@/sections/Technologies";
import CTA from "@/sections/CTA";
import Footer from "@/sections/Footer";


export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      <Hero />

      <Services />

      <Products />

      <Process />

      <WhyStudio />

      <Technologies />

      <CTA />

      <Footer />

    </main>
  );
}