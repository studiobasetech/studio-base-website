"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  ChartNoAxesCombined,
  Code2,
  Layers,
  Lightbulb,
  ListChecks,
  ShieldCheck,
  Smartphone,
  Target,
  X,
  type LucideIcon,
} from "lucide-react";
import { LightSweep, ShimmerText, TiltCard } from "@/components/Effects";
import Reveal from "@/components/Reveal";
import { portfolioCategories, projects, type Project } from "@/data/portfolio";
import { accents } from "@/sections/products-services/accents";
import SectionIntro from "@/sections/products-services/SectionIntro";

const EASE = [0.22, 1, 0.36, 1] as const;

const categoryIcons: Record<string, LucideIcon> = {
  brain: BrainCircuit,
  code: Code2,
  phone: Smartphone,
  layers: Layers,
  shield: ShieldCheck,
};

// The four blocks on every project card
const blocks = [
  { key: "challenge", label: "Business Challenge", icon: Target },
  { key: "solution", label: "Technology Solution", icon: Lightbulb },
  { key: "features", label: "Key Features", icon: ListChecks },
  { key: "results", label: "Results", icon: ChartNoAxesCombined },
] as const;

const chipRow: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const chipItem: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
};

const MotionLink = motion.create(Link);

function blockText(p: Project, key: (typeof blocks)[number]["key"]) {
  const v = p[key];
  return Array.isArray(v) ? v : [v];
}

/* One project card */
function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const a = accents[project.accent];

  return (
    <TiltCard
      tilt={4}
      rgb={a.rgb}
      className={`group flex h-full flex-col overflow-hidden rounded-xl border bg-[#07070a] transition-colors duration-500 ${a.border} ${a.borderHover}`}
      style={{ boxShadow: `0 0 50px -24px rgba(${a.rgb},0.55)` }}
    >
      {/* pulsing corner glow */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className={`pointer-events-none absolute -left-16 -top-16 z-[1] h-48 w-48 rounded-full blur-3xl ${a.glow}`}
      />

      {/* image */}
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open the ${project.title} case study`}
        className="relative z-10 block aspect-[5/3] overflow-hidden"
      >
        <Image
          src={project.image}
          alt={`${project.title} dashboard`}
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-transparent to-black/30" />
        <span
          className={`absolute left-4 top-4 rounded-full border bg-black/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur-sm ${a.border} ${a.text}`}
        >
          {project.tag}
        </span>
      </button>

      {/* text */}
      <div className="relative z-10 flex flex-1 flex-col p-5 md:p-6">
        <h3 className="text-lg font-semibold leading-snug text-white">{project.title}</h3>
        <p className="mt-1 text-xs text-zinc-500">{project.client}</p>

        <div className="mt-5 space-y-4">
          {blocks.map((b) => {
            const Icon = b.icon;
            const lines = blockText(project, b.key);
            return (
              <div key={b.key} className="flex gap-3">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border ${a.iconBox}`}
                >
                  <Icon size={14} />
                </span>
                <div>
                  <p className="text-xs font-semibold text-white">{b.label}</p>
                  {b.key === "challenge" || b.key === "solution" ? (
                    <p className="mt-1 text-xs leading-relaxed text-zinc-400">{lines[0]}</p>
                  ) : b.key === "features" ? (
                    <p className="mt-1 text-xs leading-relaxed text-zinc-400">{lines.join(" · ")}</p>
                  ) : (
                    <ul className="mt-1 space-y-0.5">
                      {lines.map((r) => (
                        <li key={r} className="text-xs leading-relaxed text-zinc-200">
                          {r}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-auto flex items-center justify-between pt-6">
          <button
            type="button"
            onClick={onOpen}
            className={`inline-flex items-center gap-2 text-xs font-semibold ${a.text}`}
          >
            View Case Study
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 group-hover:rotate-45 ${a.borderHover}`}
          >
            <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </TiltCard>
  );
}

/* Full case study in a modal */
function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  const a = accents[project.accent];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 backdrop-blur-md sm:items-center sm:p-6"
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        initial={{ opacity: 0, y: 60, scale: 0.96, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.6, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className={`relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-2xl border bg-[#07070a] sm:rounded-2xl ${a.border}`}
        style={{ boxShadow: `0 0 120px -30px rgba(${a.rgb},0.6)` }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-sm transition-colors hover:border-white/60"
        >
          <X size={16} />
        </button>

        <div className="relative aspect-[5/3] w-full overflow-hidden sm:aspect-[2/1]">
          <motion.div
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: EASE }}
            className="absolute inset-0"
          >
            <Image src={project.image} alt={`${project.title} dashboard`} fill sizes="900px" className="object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-[#07070a]/20 to-transparent" />
        </div>

        <div className="relative px-6 pb-8 md:px-10 md:pb-10">
          <p className={`text-[10px] font-semibold uppercase tracking-[0.3em] ${a.text}`}>{project.tag}</p>
          <h3 className="mt-3 text-2xl font-semibold text-white md:text-4xl">{project.title}</h3>
          <p className="mt-2 text-sm text-zinc-400">{project.client}</p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {blocks.map((b, i) => {
              const Icon = b.icon;
              const lines = blockText(project, b.key);
              return (
                <motion.div
                  key={b.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 + i * 0.1, ease: EASE }}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
                >
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                    <Icon size={15} className={a.text} />
                    {b.label}
                  </p>
                  {lines.length === 1 ? (
                    <p className="mt-3 text-sm leading-relaxed text-zinc-300">{lines[0]}</p>
                  ) : (
                    <ul className="mt-3 space-y-2">
                      {lines.map((l) => (
                        <li key={l} className="flex gap-2.5 text-sm text-zinc-300">
                          <span className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${a.check}`} />
                          {l}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <MotionLink
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold ${a.button}`}
            >
              <LightSweep />
              <span className="relative">Start a Similar Project</span>
              <ArrowRight size={15} className="relative transition-transform duration-300 group-hover:translate-x-1" />
            </MotionLink>
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Back to projects
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectGrid() {
  const [active, setActive] = useState("all");
  const [open, setOpen] = useState<Project | null>(null);
  const shown = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="relative scroll-mt-20 overflow-hidden bg-black px-6 py-16 lg:px-12">
      {/* drifting background glows */}
      <motion.div
        animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-0 top-1/4 h-96 w-96 rounded-full bg-yellow-400/[0.06] blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -80, 0], y: [0, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-0 top-2/3 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* CATEGORY CHIPS (also filter the projects) */}
        <motion.div
          variants={chipRow}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="-mx-6 mb-16 flex gap-3 overflow-x-auto px-6 pb-2 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0"
        >
          {portfolioCategories.map((c, i) => {
            const a = accents[c.accent];
            const Icon = categoryIcons[c.icon];
            const on = active === c.id;
            return (
              <motion.button
                key={c.id}
                type="button"
                variants={chipItem}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActive(on ? "all" : c.id)}
                aria-pressed={on}
                className={`group relative flex min-w-[190px] shrink-0 items-center gap-4 overflow-hidden rounded-xl border bg-[#07070a] px-5 py-4 text-left transition-colors duration-300 lg:min-w-0 ${
                  on ? a.borderOn : `border-white/10 ${a.borderHover}`
                }`}
                style={on ? { boxShadow: `0 0 40px -12px rgba(${a.rgb},0.8)` } : undefined}
              >
                <span
                  className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full blur-2xl transition-opacity duration-500 ${a.glow} ${
                    on ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                />
                <motion.span
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                  className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${a.iconBox}`}
                >
                  <Icon size={20} style={{ filter: `drop-shadow(0 0 6px rgba(${a.rgb},0.7))` }} />
                </motion.span>
                <span className="relative whitespace-pre-line text-sm font-semibold leading-snug text-white">
                  {c.label}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        <SectionIntro
          eyebrow="FEATURED PROJECTS"
          title={
            <>
              Selected Work. <ShimmerText>Real Impact.</ShimmerText>
            </>
          }
          side={
            <p>
              From AI automation to custom digital platforms, our projects are
              designed to solve real business challenges and deliver measurable
              results.
            </p>
          }
        />

        {active !== "all" && (
          <Reveal y={10} className="-mt-4 mb-8">
            <button
              type="button"
              onClick={() => setActive("all")}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-xs text-zinc-300 transition-colors hover:border-white/40 hover:text-white"
            >
              <X size={12} /> Show all projects
            </button>
          </Reveal>
        )}

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.96, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.12, ease: EASE }}
                className="h-full"
              >
                <ProjectCard project={p} onOpen={() => setOpen(p)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* rendered on <body> so the page's scroll effects can't offset it */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && <CaseStudy key={open.id} project={open} onClose={() => setOpen(null)} />}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
