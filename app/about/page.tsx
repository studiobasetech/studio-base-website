import type { Metadata } from "next";
import AboutHero from "@/sections/about/AboutHero";
import Pillars from "@/sections/about/Pillars";
import ExpertNetwork from "@/sections/about/ExpertNetwork";
import CTA from "@/sections/CTA";
import SectionTransition from "@/components/SectionTransition";
import { ShimmerText } from "@/components/Effects";
import { contact } from "@/data/site";

export const metadata: Metadata = {
  title: "About Studio Base",
  description:
    "Studio Base is a technology company specialized in AI, software engineering and digital transformation, working through a network of specialized experts.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <SectionTransition><Pillars /></SectionTransition>
      <SectionTransition><ExpertNetwork /></SectionTransition>
      <SectionTransition>
        <CTA
          eyebrow="LET'S BUILD TOGETHER"
          title={
            <>
              Great Ideas
              <br />
              Deserve the <ShimmerText>Right People.</ShimmerText>
            </>
          }
          description="If you're a talented professional who is passionate about technology and creating real impact, we'd love to have you in our network."
          primary={{
            label: "Become Part of Our Team",
            href: `mailto:${contact.email}?subject=${encodeURIComponent("Joining the Studio Base network")}`,
          }}
          secondary={{ label: "Book a Consultation", href: "/contact#contact-form" }}
        />
      </SectionTransition>
    </>
  );
}
