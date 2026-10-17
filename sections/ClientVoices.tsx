"use client";

import { motion, type Variants } from "framer-motion";
import { Lock } from "lucide-react";
import ClientQuote from "@/components/ClientQuote";
import { ShimmerText } from "@/components/Effects";
import type { Testimonial } from "@/data/testimonials";
import { useLang, type Bi, type Text } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export type ClientVoiceItem = {
  testimonial: Testimonial;
  /** Optional small label on the card, e.g. the related service */
  chip?: Text;
};

/**
 * A section of real client reviews: eyebrow, title, subtitle and a
 * responsive grid of <ClientQuote> cards (1 col on phones, 2 on tablets,
 * up to 3 on desktop). Effects are kept light on purpose.
 */
export default function ClientVoices({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  items,
  compact = false,
  align = "center",
  className = "",
}: {
  eyebrow?: Text;
  title: Bi;
  /** Optional words after the title, shown with the shimmer effect */
  titleAccent?: Bi;
  subtitle?: Bi;
  items: ClientVoiceItem[];
  compact?: boolean;
  align?: "center" | "left";
  className?: string;
}) {
  const { t, tr } = useLang();
  const centered = align === "center";
  const cols =
    items.length >= 3
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : items.length === 2
        ? "sm:grid-cols-2"
        : "";

  return (
    <section className={`relative overflow-hidden bg-black px-6 lg:px-12 ${compact ? "py-14" : "py-16 md:py-20"} ${className}`}>
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
        >
          {eyebrow && (
            <motion.p variants={fadeUp} className="text-[10px] tracking-[0.4em] text-zinc-400">
              {t(eyebrow)}
            </motion.p>
          )}
          <motion.h2
            variants={fadeUp}
            className={`mt-3 font-medium leading-tight text-white ${compact ? "text-2xl md:text-3xl" : "text-2xl md:text-4xl"}`}
          >
            {t(title)}
            {titleAccent && (
              <>
                {" "}
                <ShimmerText>{t(titleAccent)}</ShimmerText>
              </>
            )}
          </motion.h2>
          {subtitle && (
            <motion.p
              variants={fadeUp}
              className={`mt-4 text-sm leading-relaxed text-zinc-400 md:text-base ${centered ? "mx-auto max-w-2xl" : "max-w-2xl"}`}
            >
              {t(subtitle)}
            </motion.p>
          )}
          <motion.p
            variants={fadeUp}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-zinc-500"
          >
            <Lock size={11} className="text-blue-400" />
            {tr("Client identities kept confidential", "Identidad de los clientes confidencial")}
          </motion.p>
        </motion.div>

        <div className={`grid gap-5 ${compact ? "mt-8" : "mt-10"} ${cols}`}>
          {items.map((it, i) => (
            <motion.div
              key={it.testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: EASE }}
              className="h-full"
            >
              <ClientQuote testimonial={it.testimonial} chip={it.chip} compact={compact} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
