import type { Metadata } from "next";
import AboutHero from "@/sections/about/AboutHero";
import Pillars from "@/sections/about/Pillars";
import ExpertNetwork from "@/sections/about/ExpertNetwork";
import CTA from "@/sections/CTA";
import SectionTransition from "@/components/SectionTransition";
import { ShimmerText } from "@/components/Effects";
import { contact } from "@/data/site";
import { T } from "@/lib/i18n";

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
          eyebrow={{ en: "LET'S BUILD TOGETHER", es: "CONSTRUYAMOS JUNTOS" }}
          title={
            <T
              en={
                <>
                  Great Ideas
                  <br />
                  Deserve the <ShimmerText>Right People.</ShimmerText>
                </>
              }
              es={
                <>
                  Las grandes ideas
                  <br />
                  merecen a las <ShimmerText>personas correctas.</ShimmerText>
                </>
              }
            />
          }
          description={{
            en: "If you're a talented professional who is passionate about technology and creating real impact, we'd love to have you in our network.",
            es: "Si eres un profesional talentoso, apasionado por la tecnología y por generar un impacto real, nos encantaría que formaras parte de nuestra red.",
          }}
          primary={{
            label: { en: "Become Part of Our Team", es: "Únete a nuestro equipo" },
            href: `mailto:${contact.email}?subject=${encodeURIComponent("Joining the Studio Base network")}`,
          }}
          secondary={{ label: { en: "Book a Consultation", es: "Agenda una consulta" }, href: "/contact#contact-form" }}
        />
      </SectionTransition>
    </>
  );
}
