"use client";

import ClientVoices, { type ClientVoiceItem } from "@/sections/ClientVoices";
import { getTestimonial } from "@/data/testimonials";
import type { Bi } from "@/lib/i18n";

/* Which real review belongs to which technology service.
   (There are no reviews about the HCRM AI / BaseLead AI products.) */
const services = {
  ai: { en: "AI & Business Automation", es: "IA y automatización empresarial" },
  software: { en: "Custom Software Development", es: "Desarrollo de software a la medida" },
  apps: { en: "Application Development", es: "Desarrollo de aplicaciones" },
  strategy: { en: "Technology Strategy & AI Consulting", es: "Estrategia tecnológica y consultoría en IA" },
} satisfies Record<string, Bi>;

const mapping: [string, Bi][] = [
  ["am", services.ai],
  ["kb", services.ai],
  ["jr", services.software],
  ["mp", services.software],
  ["lc", services.apps],
  ["st", services.strategy],
];

export default function ServiceReviews() {
  const items: ClientVoiceItem[] = mapping.flatMap(([id, chip]) => {
    const testimonial = getTestimonial(id);
    return testimonial ? [{ testimonial, chip }] : [];
  });

  return (
    <ClientVoices
      eyebrow={{ en: "CLIENT REVIEWS", es: "RESEÑAS DE CLIENTES" }}
      title={{ en: "What clients say", es: "Lo que dicen nuestros clientes" }}
      titleAccent={{ en: "about our services.", es: "sobre nuestros servicios." }}
      subtitle={{
        en: "Real feedback from businesses we've worked with, grouped by the service each review relates to.",
        es: "Opiniones reales de empresas con las que hemos trabajado, agrupadas según el servicio al que se refiere cada reseña.",
      }}
      items={items}
    />
  );
}
