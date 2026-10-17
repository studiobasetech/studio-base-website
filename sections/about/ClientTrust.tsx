"use client";

import ClientVoices from "@/sections/ClientVoices";
import { getTestimonials } from "@/data/testimonials";

/* Small client-trust strip near the end of the About page. */
export default function ClientTrust() {
  return (
    <ClientVoices
      compact
      eyebrow={{ en: "TRUSTED BY CLIENTS", es: "LA CONFIANZA DE NUESTROS CLIENTES" }}
      title={{ en: "In our clients'", es: "En palabras de" }}
      titleAccent={{ en: "own words.", es: "nuestros clientes." }}
      items={getTestimonials("am", "mp", "st").map((testimonial) => ({ testimonial }))}
    />
  );
}
