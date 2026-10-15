import type { Metadata } from "next";
import ProductsHero from "@/sections/products-services/ProductsHero";
import Ticker from "@/sections/products-services/Ticker";
import TechProducts from "@/sections/products-services/TechProducts";
import TechServices from "@/sections/products-services/TechServices";
import WhyStudioBase from "@/sections/products-services/WhyStudioBase";
import ProductsCTA from "@/sections/products-services/ProductsCTA";
import SectionTransition from "@/components/SectionTransition";

export const metadata: Metadata = {
  title: "Products & Services",
  description:
    "AI products (HCRM AI, BaseLead AI) and end-to-end technology services: AI automation, software engineering, apps, web platforms, cybersecurity, cloud, analytics and consulting.",
};

export default function ProductsServicesPage() {
  return (
    <>
      <ProductsHero />
      <Ticker />
      {/* no gold divider here: the moving banner already separates them */}
      <SectionTransition divider={false}><TechProducts /></SectionTransition>
      <SectionTransition><TechServices /></SectionTransition>
      <SectionTransition><WhyStudioBase /></SectionTransition>
      <SectionTransition><ProductsCTA /></SectionTransition>
    </>
  );
}
