import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import Products from "@/sections/Products";
import Process from "@/sections/Process";
import WhyStudio from "@/sections/WhyStudio";
import Technologies from "@/sections/Technologies";
import CTA from "@/sections/CTA";
import Testimonials from "@/sections/Testimonials";
import OrbitGame from "@/sections/OrbitGame";
import SectionTransition from "@/components/SectionTransition";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "AI Automation & Custom Software Development | Studio Base",
  absoluteTitle: true,
  description:
    "Studio Base is a tech firm building AI-powered products, custom software and digital infrastructure that help businesses automate, scale and grow.",
  path: "/",
  keywords: [
    "AI automation company",
    "AI agents for business",
    "AI voice agents",
    "custom software development company",
    "mobile app development company",
    "web development company",
    "digital transformation consulting",
    "agencia de inteligencia artificial",
  ],
});

// Navbar and Footer come from app/layout.tsx.
// SectionTransition gives each section its scroll-in animation.
export default function Home() {
  return (
    <>
      <Hero />
      <SectionTransition><Services /></SectionTransition>
      <SectionTransition><Products /></SectionTransition>
      <SectionTransition><Testimonials /></SectionTransition>
      <SectionTransition><Process /></SectionTransition>
      <SectionTransition><WhyStudio /></SectionTransition>
      <SectionTransition><Technologies /></SectionTransition>
      <SectionTransition><OrbitGame /></SectionTransition>
      <SectionTransition><CTA /></SectionTransition>
    </>
  );
}
