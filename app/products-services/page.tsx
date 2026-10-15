import type { Metadata } from "next";

import ProductsHero from "../../sections/products-services/ProductsHero";
import ProductsShowcase from "../../sections/products-services/ProductsShowcase";
import ServicesGrid from "../../sections/products-services/ServicesGrid";
import WhySection from "../../sections/products-services/WhySection";
import PageCTA from "../../sections/products-services/PageCTA";

export const metadata: Metadata = {
  title: "Products & Services",
  description:
    "Studio Base is a technology company specialized in artificial intelligence, software engineering, cybersecurity, and digital transformation solutions.",
};

export default function ProductsServicesPage() {
  return (
    <>
      <ProductsHero />
      <ProductsShowcase />
      <ServicesGrid />
      <WhySection />
      <PageCTA />
    </>
  );
}