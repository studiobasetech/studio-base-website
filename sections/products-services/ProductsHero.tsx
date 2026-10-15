"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import ParticleField from "@/components/ParticleField";
import { GlowLine, LightSweep, ShimmerText } from "@/components/Effects";
import { consultationHref } from "@/data/site";

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
  /* Mouse tracking: spotlight + image parallax */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 120, damping: 24 });
  const sy = useSpring(my, { stiffness: 120, damping: 24 });
  const spotlight = useMotionTemplate`radial-gradient(480px circle at ${sx}px ${sy}px, rgba(168,85,247,0.16), transparent 65%)`;

  const spring = { stiffness: 50, damping: 20 };
  const imageX = useSpring(useTransform(nx, [-0.5, 0.5], [22, -22]), spring);
  const imageY = useSpring(useTransform(ny, [-0.5, 0.5], [14, -14]), spring);

  useEffect(() => {
    mx.set(window.innerWidth * 0.7);
    my.set(260);
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
      className="relative overflow-hidden bg-black px-6 pb-16 pt-28 lg:flex lg:min-h-[640px] lg:items-center lg:px-12 lg:pb-20 lg:pt-32"
    >
      {/* BACKGROUND IMAGE: fades in, drifts with the mouse, slowly breathes */}
      <motion.div
        initial={{ opacity: 0, scale: 1.12 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, ease: EASE }}
        style={{ x: imageX, y: imageY }}
        className="absolute inset-x-0 -top-4 h-[380px] sm:h-[460px] lg:-inset-6 lg:h-auto"
      >
        <motion.div
          animate={{ scale: [1.04, 1.1, 1.04] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="h-full w-full bg-cover bg-[position:78%_center] lg:bg-right"
          style={{ backgroundImage: "url('/images/products-hero.png')" }}
        />
      </motion.div>

      {/* Fades so the text stays readable */}
      <div className="absolute inset-x-0 top-0 h-[380px] bg-gradient-to-t from-black via-black/40 to-black/20 sm:h-[460px] lg:hidden" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-black via-black/60 to-transparent lg:block" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />

      {/* Particle network (purple) */}
      <ParticleField color="192, 132, 252" density={0.7} />

      {/* Cursor spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlight }}
      />

      {/* Drifting glow behind the text */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-24 top-1/3 h-[420px] w-[420px] rounded-full bg-yellow-400/10 blur-[120px]"
      />

      {/* CONTENT */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-7xl pt-[210px] sm:pt-[270px] lg:pt-0"
      >
        <div className="max-w-2xl">
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
        </div>
      </motion.div>

      <GlowLine />
    </section>
  );
}
