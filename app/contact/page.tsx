import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SectionPlaceholder from "@/components/SectionPlaceholder";
import { contact } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a consultation or get in touch with Studio Base.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="CONTACT"
        title="Let's Build"
        accent="Something Together."
        description="Tell us about your project and we'll get back to you soon."
      />

      <SectionPlaceholder
        name="Contact Form"
        notes="Name, email, company, service of interest and message."
      />
      <SectionPlaceholder
        name="Contact Details"
        notes={`${contact.email} · ${contact.phone} · ${contact.location}`}
      />
      <SectionPlaceholder
        name="Book a Consultation"
        notes="Calendar booking (for example Calendly) or WhatsApp link."
      />
    </>
  );
}
