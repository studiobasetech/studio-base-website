"use client";

import { motion, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
import { ShimmerText } from "@/components/Effects";
import ParticleField from "@/components/ParticleField";
import StarField from "@/sections/products-services/StarField";

const EASE = [0.22, 1, 0.36, 1] as const;

const headlineLines = [
  { words: ["Let’s", "Build"], accent: false },
  { words: ["What’s", "Next,"], accent: false },
  { words: ["Together."], accent: true },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};
const word: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};

/**
 * Contact hero: an astronaut on the Moon looking at the stars
 * (public/images/contact-astronaut.jpg) with live stars, shooting
 * stars, the constellation effect and a slow mouse parallax.
 */
export default function ContactHero() {
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const px = useSpring(nx, { stiffness: 50, damping: 20 });
  const py = useSpring(ny, { stiffness: 50, damping: 20 });
  const imgX = useTransform(px, [-0.5, 0.5], [18, -18]);
  const imgY = useTransform(py, [-0.5, 0.5], [12, -12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    nx.set((e.clientX - rect.left) / rect.width - 0.5);
    ny.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[640px] overflow-hidden bg-black px-6 pb-24 pt-32 lg:flex lg:min-h-[680px] lg:items-center lg:px-12 lg:pb-32 lg:pt-32"
    >
      {/* astronaut on the Moon */}
      <motion.div style={{ x: imgX, y: imgY }} className="absolute -inset-6">
        <motion.div
          initial={{ opacity: 0, scale: 1.12, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: [1, 1.05, 1], filter: "blur(0px)" }}
          transition={{
            opacity: { duration: 2, ease: EASE },
            filter: { duration: 2, ease: EASE },
            scale: { duration: 30, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/contact-astronaut.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full select-none object-cover object-[72%_center]"
            draggable={false}
          />
        </motion.div>
      </motion.div>

      {/* readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/10" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute inset-0 bg-black/30 lg:hidden" />

      <StarField meteorEvery={[2500, 6000]} density={0.35} />
      <ParticleField />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-14"
      >
        <div>
          <motion.p variants={fadeUp} className="text-[10px] tracking-[0.45em] text-zinc-300">
            CONTACT US
          </motion.p>
          <motion.h1
            variants={container}
            className="mt-4 text-4xl font-medium leading-[1.05] text-white md:text-6xl lg:text-7xl"
          >
            {headlineLines.map((line, li) => (
              <span key={li} className="block">
                {line.words.map((w, wi) => (
                  <motion.span key={wi} variants={word} className="inline-block" style={{ marginRight: "0.25em" }}>
                    {line.accent ? <ShimmerText>{w}</ShimmerText> : w}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>
        </div>

        <motion.div variants={fadeUp} className="relative max-w-md lg:mt-10 lg:pl-10">
          {/* vertical divider that grows in */}
          <motion.span
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease: EASE }}
            className="absolute left-0 top-0 hidden h-full w-px origin-top bg-gradient-to-b from-blue-500 via-white/20 to-transparent lg:block"
          />
          <p className="text-sm leading-relaxed text-zinc-300 md:text-base">
            Have a project in mind, a question about our services, or want to
            explore a collaboration? We&apos;d love to hear from you. Whether
            you need a custom solution, want to join our network of experts,
            or simply want to learn more about Studio Base, our team is here
            to help.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
