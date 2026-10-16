"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";
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

/** Big image with the title over it; the image drifts and fades as you scroll. */
export default function ArticleHero({ post }: { post: Post }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.25]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[78vh] items-end overflow-hidden bg-black px-6 pb-14 pt-32 lg:min-h-[86vh] lg:px-12 lg:pb-20"
    >
      <motion.div style={{ y, scale, opacity }} className="absolute inset-0">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 to-transparent" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-5xl"
      >
        <motion.div variants={fadeUp}>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-zinc-300 transition-colors hover:text-yellow-300"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            Blog
          </Link>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-8 inline-block rounded-full border border-yellow-400/50 bg-black/40 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-yellow-300 backdrop-blur-sm"
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
          <span className="h-px w-8 bg-yellow-400/60" />
          <span className="flex items-center gap-1.5">
            <Clock size={12} /> {readingTime(post)} min read
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
