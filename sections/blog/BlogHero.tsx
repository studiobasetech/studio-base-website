"use client";

import { motion, type Variants } from "framer-motion";
import ParticleField from "@/components/ParticleField";
import { ShimmerText } from "@/components/Effects";
import StarField from "@/sections/products-services/StarField";
import { categories, posts } from "@/data/blog";

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
const topics = ["AI", "Automation", "Security", "Data", "Cloud", "Web", "Design"];

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
              "linear-gradient(rgba(250,204,21,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(250,204,21,0.22) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-20 top-10 h-[420px] w-[520px] rounded-full bg-yellow-400/[0.06] blur-[140px]"
      />
      <motion.div
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-24 top-1/3 h-[380px] w-[380px] rounded-full bg-yellow-400/[0.07] blur-[120px]"
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
          security, data and design, written for people who build and run
          modern businesses.
        </motion.p>

        {/* stats + topic line */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400"
        >
          <span>
            <span className="text-yellow-300">{String(posts.length).padStart(2, "0")}</span> articles
          </span>
          <span>
            <span className="text-yellow-300">{String(categories.length).padStart(2, "0")}</span> topics
          </span>
          <span className="hidden h-px w-16 bg-white/20 sm:block" />
          <span className="flex flex-wrap gap-x-3 gap-y-1">
            {topics.map((t, i) => (
              <motion.span
                key={t}
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 3, delay: i * 0.4, repeat: Infinity }}
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
