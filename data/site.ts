/**
 * Site-wide content used by more than one component.
 * Edit it here once and the Navbar, Footer and Contact page all update.
 */

import type { Bi } from "@/lib/i18n";

export const navLinks: { label: Bi; href: string }[] = [
  { label: { en: "Home", es: "Inicio" }, href: "/" },
  { label: { en: "Products & Services", es: "Productos y Servicios" }, href: "/products-services" },
  { label: { en: "Portfolio", es: "Portafolio" }, href: "/portfolio" },
  { label: { en: "About Studio Base", es: "Sobre Studio Base" }, href: "/about" },
  { label: { en: "Blog", es: "Blog" }, href: "/blog" },
  { label: { en: "Contact", es: "Contacto" }, href: "/contact" },
];

/** Registered legal name (copyright, privacy policy, Google company info). */
export const LEGAL_NAME = "Studio Base LLC";

export const contact = {
  email: "info@studiobase.tech",
  // Company headquarters / mailing address. Shown ONLY where an address belongs
  // (footer, privacy policy, Google structured data), never in marketing copy,
  // page titles, descriptions or link previews.
  address: {
    street: "5900 Balcones Drive # 34618",
    city: "Austin",
    region: "TX",
    zip: "78731",
    country: "US",
  },
};

// Social profiles. The footer hides any entry whose href is "#" (or empty),
// so the icons stay hidden for now and appear automatically once you replace
// "#" with your real profile URLs.
export const socials: { label: string; short: string; href: string }[] = [
  { label: "LinkedIn", short: "in", href: "#" },
  { label: "Instagram", short: "◎", href: "#" },
  { label: "X", short: "𝕏", href: "#" },
  { label: "YouTube", short: "▶", href: "#" },
];

// Where every "Book a Consultation" button goes.
export const consultationHref = "/contact#contact-form";

// Legal pages linked in the footer's bottom row.
export const legalLinks: { label: Bi; href: string }[] = [
  { label: { en: "Privacy Policy", es: "Aviso de privacidad" }, href: "/privacy" },
];
