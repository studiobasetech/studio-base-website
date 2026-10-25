import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ProductsHero from "@/sections/products-services/ProductsHero";
import Ticker from "@/sections/products-services/Ticker";
import TechProducts from "@/sections/products-services/TechProducts";
import TechServices from "@/sections/products-services/TechServices";
import ServiceReviews from "@/sections/products-services/ServiceReviews";
import WhyStudioBase from "@/sections/products-services/WhyStudioBase";
import ProductsCTA from "@/sections/products-services/ProductsCTA";
import SectionTransition from "@/components/SectionTransition";

export const metadata: Metadata = pageMetadata({
  title: "AI Automation & Software Development Services",
  description:
    "AI agents, AI voice agents and process automation, custom software, mobile and web apps, cloud and analytics, plus our AI products HCRM AI and BaseLead AI.",
  path: "/products-services/",
  keywords: [
    "AI automation services",
    "AI agents for business",
    "AI voice agents",
    "custom software development company",
    "mobile app development company",
    "web development company",
    "cloud deployment and integration",
    "business intelligence and analytics",
    "HCRM AI",
    "BaseLead AI",
    "servicios de automatización con IA",
    "agentes de IA para empresas",
  ],
});

export default function ProductsServicesPage() {
  return (
    <>
      <ProductsHero />
      <Ticker />
      <SectionTransition><TechProducts /></SectionTransition>
      <SectionTransition><TechServices /></SectionTransition>
      <SectionTransition><ServiceReviews /></SectionTransition>
      <SectionTransition><WhyStudioBase /></SectionTransition>
      <SectionTransition><ProductsCTA /></SectionTransition>
    </>
  );
}
