"use client";

import { motion, type Variants } from "framer-motion";
import {
  Atom,
  ChartColumnIncreasing,
  Globe,
  Handshake,
  Sparkle,
  type LucideIcon,
} from "lucide-react";
import { ShimmerText } from "@/components/Effects";
import { reasons } from "@/data/services";
import { accents } from "./accents";
import SectionIntro from "./SectionIntro";
import { useLang } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

const icons: Record<string, LucideIcon> = {
  innovation: Atom,
  results: ChartColumnIncreasing,
  expertise: Handshake,
  scalable: Globe,
};

// Each icon gets its own idle movement
const iconMotion = [
  { rotate: [0, 360] }, // spins slowly
  { y: [0, -6, 0] }, // bobs
  { rotate: [0, -10, 10, 0] }, // wiggles
  { scale: [1, 1.15, 1] }, // pulses
];

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

export default function WhyStudioBase() {
  const { t, tr } = useLang();

  return (
    <section className="relative overflow-hidden bg-black px-6 py-16 lg:px-12">
      <div className="relative mx-auto max-w-7xl">
        <SectionIntro
          eyebrow={{ en: "WHY STUDIO BASE", es: "¿POR QUÉ STUDIO BASE?" }}
          title={
            <>
              {tr("More Than a Technology Provider.", "Más que un proveedor de tecnología.")}
              <br />
              <ShimmerText>
                {tr("A Strategic Partner for Growth.", "Un socio estratégico para crecer.")}
              </ShimmerText>
            </>
          }
          side={
            <>
              <p>
                {tr(
                  "Studio Base combines proprietary artificial intelligence products with advanced software engineering expertise to help businesses operate smarter, faster, and more efficiently.",
                  "Studio Base combina productos propios de inteligencia artificial con amplia experiencia en ingeniería de software para que las empresas operen de forma más inteligente, rápida y eficiente.",
                )}
              </p>
              <p>
                {tr(
                  "We don't just build software. We create intelligent technology solutions that help companies automate, scale, and grow.",
                  "No solo desarrollamos software. Creamos soluciones tecnológicas inteligentes que ayudan a las empresas a automatizarse, escalar y crecer.",
                )}
              </p>
            </>
          }
        />

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="relative grid grid-cols-2 gap-y-10 pb-14 lg:grid-cols-4"
        >
          {reasons.map((r, i) => {
            const a = accents[r.accent];
            const Icon = icons[r.icon] ?? Atom;

            return (
              <motion.div
                key={r.icon}
                variants={card}
                whileHover={{ y: -8 }}
                className="group relative px-4 text-center"
              >
                {/* Divider line that grows in */}
                {i > 0 && (
                  <motion.span
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 + i * 0.1, ease: EASE }}
                    className={`absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-white/20 to-transparent ${i === 2 ? "hidden lg:block" : ""}`}
                  />
                )}

                {/* Twinkling sparkle */}
                <motion.span
                  animate={{ rotate: [0, 180, 360], scale: [0.8, 1.3, 0.8], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                  className="mx-auto mb-4 block w-fit"
                >
                  <Sparkle size={12} className={a.text} />
                </motion.span>

                <div className="flex items-center justify-center gap-3">
                  <span className="relative">
                    {/* glow behind the icon on hover */}
                    <span
                      className={`absolute inset-0 rounded-full opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100 ${a.glow}`}
                    />
                    <motion.span
                      animate={iconMotion[i % iconMotion.length]}
                      transition={{
                        duration: i === 0 ? 12 : 3,
                        repeat: Infinity,
                        ease: i === 0 ? "linear" : "easeInOut",
                      }}
                      className="relative block"
                    >
                      <Icon
                        size={30}
                        strokeWidth={1.5}
                        className={a.text}
                        style={{ filter: `drop-shadow(0 0 8px rgba(${a.rgb},0.6))` }}
                      />
                    </motion.span>
                  </span>
                  <h3 className="whitespace-pre-line text-left text-sm font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-blue-500">
                    {t(r.title)}
                  </h3>
                </div>

                <p className="mx-auto mt-4 max-w-[200px] text-xs leading-relaxed text-zinc-400">
                  {t(r.description)}
                </p>
              </motion.div>
            );
          })}

          {/* Bottom line that draws across */}
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.6, ease: EASE }}
            className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-white/15 via-white/10 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
