"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { consultationHref } from "@/data/site";

const EASE = [0.22, 1, 0.36, 1] as const;

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

const MotionLink = motion.create(Link);

export default function ProductsHero() {
  return (
    <section className="relative overflow-hidden bg-black px-6 pb-16 pt-28 lg:flex lg:min-h-[620px] lg:items-center lg:px-12 lg:pb-20 lg:pt-32">
      {/* BACKGROUND IMAGE: the Studio Base chip sits on the right */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: EASE }}
        className="absolute inset-x-0 top-0 h-[360px] bg-cover bg-[position:78%_center] sm:h-[440px] lg:inset-0 lg:h-auto lg:bg-right"
        style={{ backgroundImage: "url('/images/products-hero.png')" }}
      />

      {/* Fades so the text stays readable */}
      <div className="absolute inset-x-0 top-0 h-[360px] bg-gradient-to-t from-black via-black/40 to-black/20 sm:h-[440px] lg:hidden" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-black via-black/60 to-transparent lg:block" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />

      {/* CONTENT */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-7xl pt-[200px] sm:pt-[260px] lg:pt-0"
      >
        <div className="max-w-2xl">
          <motion.p
            variants={fadeUp}
            className="text-[10px] tracking-[0.45em] text-zinc-300"
          >
            PRODUCTS & SERVICES
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-4 text-4xl font-medium leading-tight text-white md:text-6xl"
          >
            Technology Solutions
            <br />
            <span className="text-yellow-400">& Digital Transformation</span>
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-7 py-3 text-sm font-semibold text-black shadow-[0_0_30px_-5px_rgba(250,204,21,0.6)] transition-colors hover:bg-yellow-300"
            >
              Book a Consultation
              <ArrowRight size={16} />
            </MotionLink>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
