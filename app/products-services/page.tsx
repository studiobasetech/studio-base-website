import type { Metadata } from "next";
import ProductsHero from "@/sections/products-services/ProductsHero";
import TechProducts from "@/sections/products-services/TechProducts";
import TechServices from "@/sections/products-services/TechServices";
import WhyStudioBase from "@/sections/products-services/WhyStudioBase";
import ProductsCTA from "@/sections/products-services/ProductsCTA";

export const metadata: Metadata = {
  title: "Products & Services",
  description:
    "AI products (HCRM AI, BaseLead AI) and end-to-end technology services: AI automation, software engineering, apps, web platforms, cybersecurity, cloud, analytics and consulting.",
};

export default function ProductsServicesPage() {
  return (
    <>
      <ProductsHero />
      <TechProducts />
      <TechServices />
      <WhyStudioBase />
      <ProductsCTA />
    </>
  );
}
