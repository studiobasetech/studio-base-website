import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ContactHero from "@/sections/contact/ContactHero";
import ContactForm from "@/sections/contact/ContactForm";
import ConnectCards from "@/sections/contact/ConnectCards";
import GlobalTeam from "@/sections/contact/GlobalTeam";
import ContactQuote from "@/sections/contact/ContactQuote";
import CTA from "@/sections/CTA";
import SectionTransition from "@/components/SectionTransition";
import { ShimmerText } from "@/components/Effects";
import { contact } from "@/data/site";
import { T } from "@/lib/i18n";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us: AI & Software Experts in Austin",
  description:
    "Tell us about your project or book a consultation with Studio Base in Austin, TX: AI automation, custom software, apps and web. Reply within 24 hours.",
  path: "/contact/",
  keywords: [
    "hire AI developers",
    "AI consulting Austin",
    "software development quote",
    "contact Studio Base",
    "contratar desarrollo de software",
  ],
});

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
      <SectionTransition><ConnectCards /></SectionTransition>
      <SectionTransition><GlobalTeam /></SectionTransition>
      <ContactQuote />
      <SectionTransition>
        <CTA
          eyebrow={{ en: "LET'S CREATE REAL OPPORTUNITIES", es: "CREEMOS OPORTUNIDADES REALES" }}
          title={
            <T
              en={
                <>
                  Ready to Turn
                  <br />
                  Your Ideas <ShimmerText>Into Reality?</ShimmerText>
                </>
              }
              es={
                <>
                  ¿Listo para convertir
                  <br />
                  tus ideas <ShimmerText>en realidad?</ShimmerText>
                </>
              }
            />
          }
          description={{
            en: "Tell us about your project and let's explore how we can create a solution that drives real results.",
            es: "Cuéntanos sobre tu proyecto y exploremos juntos cómo crear una solución que genere resultados reales.",
          }}
          primary={{ label: { en: "Send Us a Message", es: "Envíanos un mensaje" }, href: "#contact-form" }}
          secondary={{
            label: { en: "Book a Consultation", es: "Agenda una consulta" },
            href: `mailto:${contact.email}?subject=${encodeURIComponent("Consultation request")}`,
          }}
        />
      </SectionTransition>
    </>
  );
}
