"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";
import ParticleField from "@/components/ParticleField";
import { formatDate, readingTime, type Post } from "@/data/blog";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};

/**
 * Article opening: title on black, then the illustration in full colour
 * as a large rounded image that zooms gently as you scroll.
 */
export default function ArticleHero({ post }: { post: Post }) {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section className="relative overflow-hidden bg-black px-6 pb-6 pt-32 lg:px-12 lg:pt-40">
      <ParticleField density={0.6} />
      <div className="pointer-events-none absolute -right-24 top-10 h-[360px] w-[460px] rounded-full bg-blue-500/10 blur-[130px]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-5xl"
      >
        <motion.div variants={fadeUp}>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-zinc-400 transition-colors hover:text-blue-400"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            Blog
          </Link>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-8 inline-block rounded-full border border-blue-500/50 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-blue-400"
        >
          {post.category}
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="mt-5 text-3xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl"
        >
          {post.title}
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-300 md:text-lg">
          {post.excerpt}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400"
        >
          <span>{formatDate(post.date)}</span>
          <span className="h-px w-8 bg-blue-500/60" />
          <span className="flex items-center gap-1.5">
            <Clock size={12} /> {readingTime(post)} min read
          </span>
        </motion.div>
      </motion.div>

      {/* illustration */}
      <motion.div
        ref={imageRef}
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease: EASE }}
        className="relative z-10 mx-auto mt-12 aspect-[16/9] w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_120px_-40px_rgba(59,130,246,0.35)] lg:mt-16"
      >
        <motion.div style={{ scale, y }} className="absolute inset-0">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            priority
            sizes="(min-width: 1280px) 1152px, 100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
