import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SectionPlaceholder from "@/components/SectionPlaceholder";
import CTA from "@/sections/CTA";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Selected projects by Studio Base.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="PORTFOLIO"
        title="Selected Work."
        accent="Real Results."
        description="A look at the brands, platforms, spaces and AI systems we've built with our clients."
      />

      <SectionPlaceholder
        name="Category Filters"
        notes="All · Digital · Branding · Interior · AI"
      />
      <SectionPlaceholder
        name="Project Grid"
        notes="Project cards with image, client, category and a link to the case study."
      />
      <SectionPlaceholder
        name="Featured Case Study"
        notes="One highlighted project: challenge, solution and results."
      />

      <CTA />
    </>
  );
}
