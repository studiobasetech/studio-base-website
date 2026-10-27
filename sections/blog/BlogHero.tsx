"use client";

import { motion, type Variants } from "framer-motion";
import ParticleField from "@/components/ParticleField";
import { ShimmerText } from "@/components/Effects";
import StarField from "@/sections/products-services/StarField";
import { useLang, type Bi } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};

// Words that slowly cycle in the background ticker line
const topics: Bi[] = [
  { en: "AI", es: "IA" },
  { en: "Automation", es: "Automatización" },
  { en: "Data", es: "Datos" },
  { en: "Cloud", es: "Nube" },
  { en: "Web", es: "Web" },
];

// Topic line: one quiet colour so the hero stays mostly black and white
const topicColors = ["text-zinc-300"];

export default function BlogHero() {
  const { t, tr, lang } = useLang();

  return (
    <section className="relative overflow-hidden bg-black px-6 pb-16 pt-32 lg:px-12 lg:pb-20 lg:pt-40">
      {/* background: stars, perspective grid, glows, constellation */}
      <StarField meteorEvery={[4000, 9000]} density={0.4} goldOnly />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] [mask-image:linear-gradient(to_top,black,transparent)]"
        style={{ perspective: 600 }}
      >
        <motion.div
          animate={{ backgroundPositionY: ["0px", "48px"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="h-full w-full origin-bottom"
          style={{
            rotateX: 62,
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>
      {/* one faint blue glow: the hero stays mostly black */}
      <motion.div
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-32 -top-24 h-[460px] w-[560px] rounded-full bg-blue-600/[0.08] blur-[140px]"
      />
      <ParticleField strength={0.6} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-7xl"
      >
        <motion.p variants={fadeUp} className="text-[10px] tracking-[0.45em] text-zinc-300">
          BLOG
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="mt-4 max-w-4xl text-4xl font-medium leading-tight text-white md:text-6xl lg:text-7xl"
        >
          {lang === "es" ? (
            <>
              Ideas para un <ShimmerText>futuro más inteligente.</ShimmerText>
            </>
          ) : (
            <>
              Ideas for a <ShimmerText>Smarter Future.</ShimmerText>
            </>
          )}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-2xl text-sm leading-relaxed text-zinc-300 md:text-base"
        >
          {tr(
            "Practical thinking on artificial intelligence, automation, data, cloud and the web, written for people who build and run modern businesses.",
            "Reflexiones prácticas sobre inteligencia artificial, automatización, datos, nube y web, escritas para quienes construyen y dirigen negocios modernos.",
          )}
        </motion.p>

        {/* stats + topic line */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-4 text-xs font-medium uppercase tracking-[0.2em]"
        >
          <span className="flex flex-wrap gap-x-3 gap-y-1">
            {topics.map((topic, i) => (
              <motion.span
                key={topic.en}
                animate={{ opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 3, delay: i * 0.4, repeat: Infinity }}
                className={topicColors[i % topicColors.length]}
              >
                {t(topic)}
                {i < topics.length - 1 && <span className="ml-3 text-zinc-400">/</span>}
              </motion.span>
            ))}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
