import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SectionPlaceholder from "@/components/SectionPlaceholder";
import CTA from "@/sections/CTA";

export const metadata: Metadata = {
  title: "Products & Services",
  description:
    "Digital infrastructure, branding, interior & spatial design, and AI automation by Studio Base.",
};

export default function ProductsServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="PRODUCTS & SERVICES"
        title="Everything You Need"
        accent="To Build and Grow."
        description="Strategy, design, technology and AI under one roof, from your first idea to the systems that run your business."
      />

      <SectionPlaceholder
        name="Digital Infrastructure & Systems"
        notes="Websites, apps, software, e-commerce and integrations."
      />
      <SectionPlaceholder
        name="Branding, Identity & Creative"
        notes="Brand strategy, visual identity and creative direction."
      />
      <SectionPlaceholder
        name="Interior & Spatial Design"
        notes="Spaces designed around your brand and the people who use them."
      />
      <SectionPlaceholder
        name="AI & Automation"
        notes="AI agents, chatbots and business automation."
      />
      <SectionPlaceholder
        name="Our Products"
        notes="Studio Base products, such as BaseLead AI and HCRM AI."
      />

      <CTA />
    </>
  );
}
