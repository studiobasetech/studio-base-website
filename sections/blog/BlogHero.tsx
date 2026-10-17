"use client";

import { motion, type Variants } from "framer-motion";
import ParticleField from "@/components/ParticleField";
import { ShimmerText } from "@/components/Effects";
import StarField from "@/sections/products-services/StarField";

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
const topics = ["AI", "Automation", "Data", "Cloud", "Web"];

// Same hover colours as the blog cards (purple left out on purpose: no purple in the hero)
const topicColors = ["text-blue-400", "text-cyan-300", "text-yellow-300", "text-pink-400", "text-orange-300"];

export default function BlogHero() {
  return (
    <section className="relative overflow-hidden bg-black px-6 pb-16 pt-32 lg:px-12 lg:pb-20 lg:pt-40">
      {/* background: stars, perspective grid, glows, constellation */}
      <StarField meteorEvery={[3000, 7000]} density={0.5} goldOnly />
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
              "linear-gradient(rgba(59,130,246,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.22) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>
      {/* colour aura (no purple) */}
      <motion.div
        animate={{ x: [0, 70, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-24 -top-10 h-[460px] w-[560px] rounded-full bg-cyan-400/20 blur-[140px]"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-1/4 top-1/3 h-[380px] w-[460px] rounded-full bg-yellow-400/20 blur-[130px]"
      />
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-28 top-1/4 h-[400px] w-[440px] rounded-full bg-pink-500/[0.16] blur-[130px]"
      />
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -25, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-24 left-1/3 h-[340px] w-[520px] rounded-full bg-blue-500/[0.14] blur-[130px]"
      />
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-10 -right-10 h-[300px] w-[360px] rounded-full bg-orange-400/[0.14] blur-[120px]"
      />
      <ParticleField />

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
          Ideas for a <ShimmerText>Smarter Future.</ShimmerText>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-2xl text-sm leading-relaxed text-zinc-300 md:text-base"
        >
          Practical thinking on artificial intelligence, automation,
          data, cloud and the web, written for people who build and run
          modern businesses.
        </motion.p>

        {/* stats + topic line */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-4 text-xs font-medium uppercase tracking-[0.2em]"
        >
          <span className="flex flex-wrap gap-x-3 gap-y-1">
            {topics.map((t, i) => (
              <motion.span
                key={t}
                animate={{ opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 3, delay: i * 0.4, repeat: Infinity }}
                className={topicColors[i % topicColors.length]}
              >
                {t}
                {i < topics.length - 1 && <span className="ml-3 text-zinc-600">/</span>}
              </motion.span>
            ))}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
