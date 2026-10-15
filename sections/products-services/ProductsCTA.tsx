"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import ParticleField from "@/components/ParticleField";
import { LightSweep, ShimmerText } from "@/components/Effects";
import { consultationHref } from "@/data/site";

// Swap this for the laptop image from the mockup once it's in public/images.
const CTA_IMAGE = "/images/products-hero.png";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
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

const MotionLink = motion.create(Link);

export default function ProductsCTA() {
  const ref = useRef<HTMLElement>(null);

  // The image moves slower than the page while you scroll (parallax)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.15]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-black px-6 py-20 lg:px-12 lg:py-28"
    >
      {/* Background image with parallax */}
      <motion.div
        style={{ y: imageY, scale: imageScale, backgroundImage: `url('${CTA_IMAGE}')` }}
        className="absolute -inset-y-16 inset-x-0 bg-cover bg-[position:80%_center] opacity-60 lg:bg-right lg:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/10" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />

      {/* Particles (yellow) */}
      <ParticleField density={0.5} />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="relative z-10 mx-auto max-w-7xl"
      >
        <div className="max-w-xl">
          <motion.p
            variants={fadeUp}
            className="text-[10px] tracking-[0.45em] text-zinc-300"
          >
            LET&apos;S BUILD TOGETHER
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mt-4 text-3xl font-medium leading-tight text-white md:text-5xl"
          >
            Ready to Transform
            <br />
            Your Business with <ShimmerText>Technology?</ShimmerText>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-md text-sm leading-relaxed text-zinc-300"
          >
            Partner with Studio Base and turn your ideas into powerful
            technology solutions that drive real business growth.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
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

            <MotionLink
              href="/contact"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-full border border-white/40 px-9 py-3 text-sm font-semibold text-white transition-colors hover:border-yellow-400 hover:text-yellow-400"
            >
              Contact Us
            </MotionLink>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
