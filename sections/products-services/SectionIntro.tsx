"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { useLang, type Bi, type Text } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

const isBi = (x: unknown): x is Bi =>
  typeof x === "object" && x !== null && "en" in x && "es" in x;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

/**
 * Section heading used on the Products & Services page:
 * eyebrow + title on the left, short paragraph on the right.
 * Animates in when it scrolls into view.
 */
export default function SectionIntro({
  eyebrow,
  title,
  side,
}: {
  eyebrow: Text;
  /** Plain/JSX title, or a { en, es } pair */
  title: ReactNode | Bi;
  side?: ReactNode;
}) {
  const { t } = useLang();

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="mb-10 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16"
    >
      <div>
        <motion.p
          variants={item}
          className="flex items-center gap-3 text-[10px] tracking-[0.45em] text-zinc-400"
        >
          <motion.span
            variants={{
              hidden: { width: 0 },
              show: { width: 32, transition: { duration: 0.8, ease: EASE } },
            }}
            className="h-px bg-blue-500"
          />
          {t(eyebrow)}
        </motion.p>
        <motion.h2
          variants={item}
          className="mt-4 text-2xl font-medium leading-tight text-white md:text-4xl"
        >
          {isBi(title) ? t(title) : title}
        </motion.h2>
      </div>

      {side && (
        <motion.div
          variants={item}
          className="space-y-4 border-l border-blue-500/30 pl-5 text-sm leading-relaxed text-zinc-400"
        >
          {side}
        </motion.div>
      )}
    </motion.div>
  );
}
