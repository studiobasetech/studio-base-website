"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { getTestimonial } from "@/data/testimonials";
import { tones } from "@/sections/about/palette";
import { useLang } from "@/lib/i18n";

/* One short, reassuring line from a real review (an exact sentence of
   L.C.'s review — see `highlight` in data/testimonials.ts). */
export default function ContactQuote() {
  const { t, tr } = useLang();
  const item = getTestimonial("lc");
  if (!item?.highlight) return null;
  const c = tones[item.tone];

  return (
    <section className="bg-black px-6 py-12 lg:px-12">
      <motion.figure
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`relative mx-auto max-w-3xl overflow-hidden rounded-2xl border bg-[#07070a] px-6 py-8 text-center md:px-12 md:py-10 ${c.border}`}
        style={{
          boxShadow: `0 0 50px -28px rgba(${c.rgb},0.7)`,
          backgroundImage: `radial-gradient(circle at 50% 0%, rgba(${c.rgb},0.12), transparent 60%)`,
        }}
      >
        <Quote size={36} aria-hidden className={`mx-auto opacity-40 ${c.text}`} />
        <div
          className="mt-4 flex justify-center gap-1"
          role="img"
          aria-label={tr(`${item.rating} out of 5 stars`, `${item.rating} de 5 estrellas`)}
        >
          {Array.from({ length: item.rating }).map((_, s) => (
            <Star key={s} size={15} className="fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <blockquote className="mt-4 text-lg font-medium leading-snug text-white md:text-2xl">
          &ldquo;{t(item.highlight)}&rdquo;
        </blockquote>
        <figcaption className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-zinc-400">
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-full border-2 bg-black text-[11px] font-bold ${c.border} ${c.text}`}
          >
            {item.initials}
          </span>
          <span>
            {tr("Client review", "Reseña de cliente")} <span className="text-zinc-400">·</span> {t(item.industry)}{" "}
            <span className="text-zinc-400">·</span> <span className={c.text}>{t(item.service)}</span>
          </span>
        </figcaption>
      </motion.figure>
    </section>
  );
}
