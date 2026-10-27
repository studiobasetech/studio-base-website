"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "@/components/LangLink";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import Reveal from "@/components/Reveal";
import { LightSweep } from "@/components/Effects";
import { categories, categoryLabel, formatDate, localizePost, posts, readingTime } from "@/data/blog";
import { useLang } from "@/lib/i18n";
import PostCard from "./PostCard";

const MotionLink = motion.create(Link);

/*
 * Topic filter colours: same set as the blog card hovers
 * (blue, purple, yellow, cyan, pink). Written out in full for Tailwind.
 */
const FILTER_COLORS = [
  { on: "border-blue-500 text-white", pill: "bg-blue-500 shadow-[0_0_24px_-4px_rgba(59,130,246,0.7)]", off: "hover:border-blue-500 hover:text-blue-400" },
  { on: "border-purple-500 text-white", pill: "bg-purple-500 shadow-[0_0_24px_-4px_rgba(168,85,247,0.7)]", off: "hover:border-purple-500 hover:text-purple-300" },
  { on: "border-yellow-400 text-black", pill: "bg-yellow-400 shadow-[0_0_24px_-4px_rgba(250,204,21,0.7)]", off: "hover:border-yellow-400 hover:text-yellow-200" },
  { on: "border-cyan-400 text-black", pill: "bg-cyan-400 shadow-[0_0_24px_-4px_rgba(34,211,238,0.7)]", off: "hover:border-cyan-400 hover:text-cyan-300" },
  { on: "border-pink-500 text-white", pill: "bg-pink-500 shadow-[0_0_24px_-4px_rgba(236,72,153,0.7)]", off: "hover:border-pink-500 hover:text-pink-300" },
];

/** Latest article, shown large at the top of the blog. */
function FeaturedPost() {
  const { lang, tr } = useLang();
  const post = localizePost(posts[0], lang);

  return (
    <Reveal>
      <Link
        href={`/blog/${post.slug}`}
        className="group relative grid overflow-hidden rounded-2xl border border-blue-500/30 bg-[#07070a] shadow-[0_0_60px_-25px_rgba(59,130,246,0.5)] transition-colors duration-500 hover:border-blue-500/70 lg:grid-cols-[1.35fr_1fr]"
      >
        <div className="relative aspect-[16/9] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent lg:inset-y-0 lg:left-auto lg:right-0 lg:h-full lg:w-1/4 lg:bg-gradient-to-r lg:from-transparent lg:to-[#07070a]/70" />
          <span className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-blue-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-black"
            />
            {tr("Latest", "Lo más nuevo")}
          </span>
        </div>

        <div className="relative flex flex-col justify-center p-6 md:p-10">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-blue-400">
            {categoryLabel(post.category, lang)}
          </p>
          <h2 className="mt-4 text-2xl font-semibold leading-tight text-white transition-colors duration-300 group-hover:text-blue-300 md:text-4xl">
            {post.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400 md:text-base">{post.excerpt}</p>
          <div className="mt-6 flex items-center gap-3 text-xs text-zinc-400">
            <span>{formatDate(post.date, lang)}</span>
            <span className="h-1 w-1 rounded-full bg-zinc-600" />
            <span className="flex items-center gap-1">
              <Clock size={12} /> {readingTime(post)} {tr("min read", "min de lectura")}
            </span>
          </div>
          <span className="relative mt-8 inline-flex w-fit items-center gap-2 overflow-hidden rounded-full bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white">
            <LightSweep />
            <span className="relative">{tr("Read article", "Leer artículo")}</span>
            <ArrowRight size={16} className="relative transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export default function BlogIndex() {
  const { lang, tr } = useLang();
  const [active, setActive] = useState("All");
  const rest = posts.slice(1);
  const shown = active === "All" ? rest : posts.filter((p) => p.category === active);

  return (
    <section className="relative bg-black px-6 pb-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <FeaturedPost />

        {/* category filters */}
        <Reveal className="mt-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] tracking-[0.45em] text-zinc-400">{tr("ALL ARTICLES", "TODOS LOS ARTÍCULOS")}</p>
            <h2 className="mt-3 text-2xl font-medium text-white md:text-3xl">
              {tr("Explore by topic", "Explora por tema")}
            </h2>
          </div>

          <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 md:mx-0 md:flex-wrap md:justify-end md:px-0">
            {["All", ...categories].map((c, i) => {
              const on = c === active;
              const col = FILTER_COLORS[i % FILTER_COLORS.length];
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActive(c)}
                  className={`relative shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-colors duration-300 ${
                    on ? col.on : `border-white/15 text-zinc-300 ${col.off}`
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="blog-filter"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className={`absolute inset-0 rounded-full transition-colors duration-300 ${col.pill}`}
                    />
                  )}
                  <span className="relative">
                    {c === "All" ? tr("All", "Todos") : categoryLabel(c, lang)}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* grid */}
        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((post) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <PostCard post={post} index={posts.indexOf(post)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {shown.length === 0 && (
          <p className="mt-10 text-sm text-zinc-400">
            {tr("No other articles in this topic yet.", "Todavía no hay más artículos sobre este tema.")}
          </p>
        )}

        <div className="mt-16 flex justify-center">
          <MotionLink
            href="/contact#contact-form"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition-colors hover:border-blue-500 hover:text-blue-400"
          >
            {tr("Have a topic you’d like us to write about?", "¿Hay algún tema sobre el que te gustaría que escribiéramos?")}
          </MotionLink>
        </div>
      </div>
    </section>
  );
}
