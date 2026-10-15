import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SectionPlaceholder from "@/components/SectionPlaceholder";
import CTA from "@/sections/CTA";

export const metadata: Metadata = {
  title: "About Studio Base",
  description:
    "Studio Base is a multidisciplinary creative and technology studio combining strategy, design, technology and AI.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="ABOUT STUDIO BASE"
        title="Strategy, Design,"
        accent="Technology & AI."
        description="We're a multidisciplinary studio helping forward-thinking businesses build the brands, spaces and systems they grow on."
      />

      <SectionPlaceholder
        name="Our Story"
        notes="How Studio Base started and why."
      />
      <SectionPlaceholder
        name="Mission & Values"
        notes="What we believe and how it shapes our work."
      />
      <SectionPlaceholder
        name="How We Work"
        notes="Our approach across strategy, design, technology and AI."
      />
      <SectionPlaceholder name="Team" notes="The people behind Studio Base." />

      <CTA />
    </>
  );
}
