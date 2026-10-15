import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import Products from "@/sections/Products";
import Process from "@/sections/Process";
import WhyStudio from "@/sections/WhyStudio";
import Technologies from "@/sections/Technologies";
import CTA from "@/sections/CTA";
import SectionTransition from "@/components/SectionTransition";

// Navbar and Footer come from app/layout.tsx.
// SectionTransition gives each section its scroll-in animation.
export default function Home() {
  return (
    <>
      <Hero />
      <SectionTransition><Services /></SectionTransition>
      <SectionTransition><Products /></SectionTransition>
      <SectionTransition><Process /></SectionTransition>
      <SectionTransition><WhyStudio /></SectionTransition>
      <SectionTransition><Technologies /></SectionTransition>
      <SectionTransition><CTA /></SectionTransition>
    </>
  );
}
