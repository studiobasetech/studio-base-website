"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import ParticleField from "@/components/ParticleField";
import { LightSweep, ShimmerText } from "@/components/Effects";
import { consultationHref } from "@/data/site";
import HeroVisual from "./HeroVisual";

const EASE = [0.22, 1, 0.36, 1] as const;

// Headline, split into words so each one blurs in
const headlineLines = [
  { words: ["Technology", "Solutions"], accent: false },
  { words: ["&", "Digital", "Transformation"], accent: true },
];

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
  /* Mouse tracking: spotlight + 3D tilt of the visual */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 120, damping: 24 });
  const sy = useSpring(my, { stiffness: 120, damping: 24 });
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, rgba(250,204,21,0.10), transparent 65%)`;

  const tiltX = useSpring(nx, { stiffness: 50, damping: 20 });
  const tiltY = useSpring(ny, { stiffness: 50, damping: 20 });

  useEffect(() => {
    mx.set(window.innerWidth * 0.7);
    my.set(300);
  }, [mx, my]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    mx.set(px);
    my.set(py);
    nx.set(px / rect.width - 0.5);
    ny.set(py / rect.height - 0.5);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-black px-6 pb-12 pt-24 lg:px-12 lg:pb-16 lg:pt-28"
    >
      {/* Very faint grid over the whole hero */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_70%_40%,black_20%,transparent_75%)]" />

      {/* Constellation (soft gold) */}
      <ParticleField color="253, 224, 71" density={0.5} />

      {/* Cursor spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlight }}
      />

      {/* Drifting glow behind the text */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-24 top-1/3 h-[420px] w-[420px] rounded-full bg-yellow-400/[0.07] blur-[120px]"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-4 lg:min-h-[560px] lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        {/* VISUAL (first on phones, right on desktop) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, filter: "blur(16px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.6, delay: 0.3, ease: EASE }}
          className="mx-auto w-full max-w-[320px] sm:max-w-[400px] lg:order-2 lg:max-w-[560px]"
        >
          <HeroVisual nx={tiltX} ny={tiltY} />
        </motion.div>

        {/* TEXT */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl lg:order-1"
        >
          <motion.p
            variants={fadeUp}
            className="flex items-center gap-3 text-[10px] tracking-[0.45em] text-zinc-300"
          >
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
              className="h-px bg-yellow-400"
            />
            PRODUCTS & SERVICES
          </motion.p>

          <motion.h1
            variants={container}
            className="mt-4 text-4xl font-medium leading-tight text-white md:text-6xl"
          >
            {headlineLines.map((line, li) => (
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
            Studio Base is a technology company specialized in artificial
            intelligence, software engineering, cybersecurity, and digital
            transformation solutions. We help organizations automate
            operations, develop scalable technology solutions, strengthen
            digital infrastructure, and create innovative digital products.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8">
            <MotionLink
              href={consultationHref}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(250,204,21,0.5)",
                  "0 0 0 18px rgba(250,204,21,0)",
                ],
              }}
              transition={{
                boxShadow: { duration: 1.8, repeat: Infinity, ease: "easeOut" },
              }}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-yellow-400 px-7 py-3 text-sm font-semibold text-black transition-colors hover:bg-yellow-300"
            >
              <LightSweep />
              <span className="relative">Book a Consultation</span>
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
