"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { motion, type PanInfo, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Lock, Quote, Star } from "lucide-react";
import { ShimmerText, TiltCard } from "@/components/Effects";
import { testimonials } from "@/data/testimonials";
import { tones } from "@/sections/about/palette";

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTO_MS = 5500;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};

/* cards visible at once: 1 on phones, 2 on tablets, 3 on desktop */
const subscribe = (cb: () => void) => {
  window.addEventListener("resize", cb);
  return () => window.removeEventListener("resize", cb);
};
const getPerView = () => (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);

export default function Testimonials() {
  const perView = useSyncExternalStore(subscribe, getPerView, () => 3);
  const max = Math.max(0, testimonials.length - perView);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const i = Math.min(index, max);

  const go = useCallback((dir: 1 | -1) => setIndex((cur) => {
    const c = Math.min(cur, max);
    return dir === 1 ? (c >= max ? 0 : c + 1) : c <= 0 ? max : c - 1;
  }), [max]);

  // auto-advance (pauses on hover / touch)
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), AUTO_MS);
    return () => clearInterval(t);
  }, [paused, go]);

  // swipe / drag to change slide
  const onPanEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(1);
    else if (info.offset.x > 60) go(-1);
  };

  return (
    <section className="relative overflow-hidden bg-black px-6 py-20 lg:px-12">
      {/* ambient light */}
      <div className="pointer-events-none absolute left-1/2 top-24 h-80 w-[70%] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[100px]" />
      <svg className="pointer-events-none absolute -left-10 top-0 h-48 w-80 opacity-60" viewBox="0 0 320 190" fill="none">
        <motion.path
          d="M0 120 C 90 110, 170 60, 320 0"
          stroke="url(#tg1)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: EASE }}
        />
        <defs>
          <linearGradient id="tg1" x1="0" x2="1">
            <stop offset="0" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="1" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative mx-auto max-w-7xl">
        {/* HEADER */}
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p variants={fadeUp} className="text-[10px] tracking-[0.45em] text-zinc-400">
            CLIENT TESTIMONIALS
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-medium leading-tight text-white md:text-5xl">
            Trusted by <ShimmerText>Innovative Companies</ShimmerText>
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
            Businesses across different industries rely on Studio Base to build,
            automate, and scale their technology.
          </motion.p>
          <motion.p variants={fadeUp} className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            <Lock size={11} className="text-blue-400" /> Client identities kept confidential
          </motion.p>
        </motion.div>

        {/* CAROUSEL */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className="relative mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
        >
          <div className="overflow-hidden px-1 py-4">
            <motion.div
              onPanEnd={onPanEnd}
              animate={{ x: `-${(i * 100) / perView}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 22 }}
              className="flex cursor-grab touch-pan-y active:cursor-grabbing"
            >
              {testimonials.map((t, k) => {
                const c = tones[t.tone];
                const visible = k >= i && k < i + perView;
                return (
                  <div key={t.initials} className="shrink-0 px-3" style={{ width: `${100 / perView}%` }}>
                    <motion.div
                      animate={{ opacity: visible ? 1 : 0.35, scale: visible ? 1 : 0.96 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="h-full"
                    >
                      <TiltCard
                        tilt={5}
                        rgb={c.rgb}
                        className={`group flex h-full flex-col overflow-hidden rounded-2xl border bg-[#07070a] p-6 transition-colors duration-500 md:p-7 ${c.border} ${c.borderHover}`}
                        style={{ boxShadow: `0 0 50px -24px rgba(${c.rgb},0.7)` }}
                      >
                        <span className={`pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${c.glow}`} />
                        <Quote size={44} className={`pointer-events-none absolute right-5 top-5 opacity-10 ${c.text}`} />

                        <div className="relative flex gap-1">
                          {Array.from({ length: t.rating }).map((_, s) => (
                            <motion.span
                              key={s}
                              initial={{ opacity: 0, scale: 0.4 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.3 + s * 0.08, type: "spring", stiffness: 300, damping: 14 }}
                            >
                              <Star size={17} className="fill-yellow-400 text-yellow-400" />
                            </motion.span>
                          ))}
                        </div>

                        <p className="relative mt-5 flex-1 text-[15px] leading-relaxed text-zinc-200">
                          &ldquo;{t.quote}&rdquo;
                        </p>

                        <div className="relative mt-6 flex items-center gap-4 border-t border-white/10 pt-5">
                          <span
                            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 bg-black text-sm font-bold ${c.border} ${c.text}`}
                            style={{ boxShadow: `0 0 18px -4px rgba(${c.rgb},0.8), inset 0 0 12px -4px rgba(${c.rgb},0.6)` }}
                          >
                            {t.initials}
                          </span>
                          <div className="min-w-0">
                            <p className="font-semibold text-white">{t.initials}</p>
                            <p className="truncate text-xs text-zinc-400">
                              {t.industry} <span className="text-zinc-600">·</span> <span className={c.text}>{t.service}</span>
                            </p>
                          </div>
                        </div>
                      </TiltCard>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* CONTROLS */}
          <div className="mt-6 flex items-center justify-center gap-5">
            <button
              type="button"
              aria-label="Previous review"
              onClick={() => go(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-zinc-300 transition hover:border-blue-500 hover:text-blue-400"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: max + 1 }).map((_, d) => (
                <button
                  key={d}
                  type="button"
                  aria-label={`Show reviews ${d + 1}`}
                  onClick={() => setIndex(d)}
                  className="group relative h-2 overflow-hidden rounded-full bg-zinc-700 transition-all duration-300"
                  style={{ width: d === i ? 36 : 8 }}
                >
                  {d === i && (
                    <motion.span
                      key={`${i}-${paused}`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: paused ? 0 : AUTO_MS / 1000, ease: "linear" }}
                      className="absolute inset-y-0 left-0 bg-blue-500 shadow-[0_0_10px_#3b82f6]"
                    />
                  )}
                </button>
              ))}
            </div>
            <button
              type="button"
              aria-label="Next review"
              onClick={() => go(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-zinc-300 transition hover:border-blue-500 hover:text-blue-400"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
