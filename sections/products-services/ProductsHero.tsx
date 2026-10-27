"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring, type Variants } from "framer-motion";
import { LightSweep, ShimmerText } from "@/components/Effects";
import { consultationHref } from "@/data/site";
import ParticleField from "@/components/ParticleField";
import GalaxyScene from "./GalaxyScene";
import { useLang } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

// Headline, split into words so each one blurs in
const headlineLines = {
  en: [
    { words: ["Technology", "Solutions"], accent: false },
    { words: ["&", "Digital", "Transformation"], accent: true },
  ],
  es: [
    { words: ["Soluciones", "tecnológicas"], accent: false },
    { words: ["y", "transformación", "digital"], accent: true },
  ],
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

const word: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

const MotionLink = motion.create(Link);

export default function ProductsHero() {
  const { tr, lang } = useLang();

  /* Mouse position (-0.5 to 0.5) drives the parallax of the galaxy scene */
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const px = useSpring(nx, { stiffness: 50, damping: 20 });
  const py = useSpring(ny, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    nx.set((e.clientX - rect.left) / rect.width - 0.5);
    ny.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-black px-6 min-h-[640px] pb-20 pt-32 sm:pt-36 lg:flex lg:min-h-[760px] lg:items-center lg:px-12 lg:pb-24 lg:pt-32"
    >
      {/* Galaxy scene: rendered galaxy + live stars, constellation and HUD */}
      <GalaxyScene nx={px} ny={py} />

      {/* Constellation effect over the whole hero, same settings as the
          Home hero (dots link to each other and reach toward the mouse) */}
      <ParticleField />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* TEXT */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl lg:max-w-xl xl:max-w-2xl"
        >
          <motion.p
            variants={fadeUp}
            className="text-[10px] tracking-[0.45em] text-zinc-300"
          >
            {tr("PRODUCTS & SERVICES", "PRODUCTOS Y SERVICIOS")}
          </motion.p>

          <motion.h1
            variants={container}
            className="mt-4 text-4xl font-medium leading-tight text-white md:text-6xl"
          >
            {headlineLines[lang].map((line, li) => (
              <span key={li} className="block">
                {line.words.map((w, wi) => (
                  <motion.span
                    key={wi}
                    variants={word}
                    className="inline-block"
                    style={{ marginRight: "0.25em" }}
                  >
                    {line.accent ? <ShimmerText>{w}</ShimmerText> : w}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-sm leading-relaxed text-zinc-300 md:text-base"
          >
            {tr(
              "Studio Base is a tech firm specialized in artificial intelligence, software engineering, and digital transformation solutions. We help organizations automate operations, develop scalable technology solutions, strengthen digital infrastructure, and create innovative digital products.",
              "Studio Base es una firma tecnológica especializada en inteligencia artificial, ingeniería de software y soluciones de transformación digital. Ayudamos a las organizaciones a automatizar sus operaciones, desarrollar soluciones tecnológicas escalables, fortalecer su infraestructura digital y crear productos digitales innovadores.",
            )}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8">
            <MotionLink
              href={consultationHref}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(59,130,246,0.5)",
                  "0 0 0 18px rgba(59,130,246,0)",
                ],
              }}
              transition={{
                boxShadow: { duration: 1.8, repeat: Infinity, ease: "easeOut" },
              }}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-blue-500 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-400"
            >
              <LightSweep />
              <span className="relative">{tr("Book a Consultation", "Agenda una consulta")}</span>
              <ArrowRight
                size={16}
                className="relative transition-transform duration-300 group-hover:translate-x-1"
              />
            </MotionLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
