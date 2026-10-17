import type { Metadata } from "next";
import ContactHero from "@/sections/contact/ContactHero";
import ContactForm from "@/sections/contact/ContactForm";
import ConnectCards from "@/sections/contact/ConnectCards";
import GlobalTeam from "@/sections/contact/GlobalTeam";
import CTA from "@/sections/CTA";
import SectionTransition from "@/components/SectionTransition";
import { ShimmerText } from "@/components/Effects";
import { contact } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your project, book a consultation or join the Studio Base network. We typically reply within 24 hours.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
      <SectionTransition><ConnectCards /></SectionTransition>
      <SectionTransition><GlobalTeam /></SectionTransition>
      <SectionTransition>
        <CTA
          eyebrow="LET'S CREATE REAL OPPORTUNITIES"
          title={
            <>
              Ready to Turn
              <br />
              Your Ideas <ShimmerText>Into Reality?</ShimmerText>
            </>
          }
          description="Tell us about your project and let's explore how we can create a solution that drives real results."
          primary={{ label: "Send Us a Message", href: "#contact-form" }}
          secondary={{
            label: "Book a Consultation",
            href: `mailto:${contact.email}?subject=${encodeURIComponent("Consultation request")}`,
          }}
        />
      </SectionTransition>
    </>
  );
}
