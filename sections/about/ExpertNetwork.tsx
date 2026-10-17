"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  Code2,
  Handshake,
  Heart,
  PenTool,
  Search,
  ShieldCheck,
  Smartphone,
  Users,
  type LucideIcon,
} from "lucide-react";
import { ShimmerText, TiltCard } from "@/components/Effects";
import { expertCategories } from "@/data/about";
import { contact } from "@/data/site";
import { tones, type Tone } from "./palette";

const EASE = [0.22, 1, 0.36, 1] as const;
const icons: Record<string, LucideIcon> = { brain: BrainCircuit, code: Code2, phone: Smartphone, shield: ShieldCheck, pen: PenTool, sales: Handshake };
const joinHref = `mailto:${contact.email}?subject=${encodeURIComponent("Joining the Studio Base network")}`;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};

/* Generic profile silhouette (like a default avatar), tinted per category */
function Avatar({ tone, id }: { tone: Tone; id: string }) {
  const t = tones[tone];
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id={`bg-${id}`} cx="50%" cy="35%" r="75%">
          <stop offset="0%" stopColor={t.hex} stopOpacity="0.45" />
          <stop offset="100%" stopColor="#05070d" stopOpacity="1" />
        </radialGradient>
        <linearGradient id={`fg-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor={t.hex} stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" fill={`url(#bg-${id})`} />
      <circle cx="60" cy="46" r="21" fill={`url(#fg-${id})`} />
      <path d="M18 120c3-27 20-42 42-42s39 15 42 42z" fill={`url(#fg-${id})`} />
    </svg>
  );
}

/* Abstract "network of experts" visual: avatar nodes linked by glowing lines */
const netNodes = [
  { x: 90, y: 70, tone: "purple" as Tone },
  { x: 240, y: 40, tone: "blue" as Tone },
  { x: 370, y: 95, tone: "yellow" as Tone },
  { x: 60, y: 200, tone: "cyan" as Tone },
  { x: 215, y: 165, tone: "blue" as Tone, hub: true },
  { x: 345, y: 230, tone: "pink" as Tone },
  { x: 150, y: 285, tone: "yellow" as Tone },
  { x: 285, y: 310, tone: "purple" as Tone },
];
const netLinks = [[0, 4], [1, 4], [2, 4], [3, 4], [5, 4], [6, 4], [7, 4], [0, 1], [1, 2], [2, 5], [5, 7], [7, 6], [6, 3], [3, 0]];

function NetworkVisual() {
  return (
    <svg viewBox="0 0 430 350" className="h-full w-full">
      {netLinks.map(([a, b], i) => {
        const p = netNodes[a];
        const q = netNodes[b];
        const d = `M${p.x} ${p.y} L${q.x} ${q.y}`;
        return (
          <g key={i}>
            <motion.path
              d={d}
              stroke="rgba(96,165,250,0.45)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 + i * 0.06, ease: EASE }}
            />
            {b === 4 && (
              <circle r="2.2" fill="#bfdbfe">
                <animateMotion dur={`${2.5 + (i % 4) * 0.6}s`} begin={`${(i * 0.37) % 3}s`} repeatCount="indefinite" path={d} />
              </circle>
            )}
          </g>
        );
      })}
      {netNodes.map((n, i) => {
        const t = tones[n.tone];
        const r = n.hub ? 30 : 20;
        return (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={r + 8} fill="none" stroke={t.hex} strokeOpacity="0.5">
              <animate attributeName="stroke-opacity" values="0.6;0;0.6" dur="3s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={n.x} cy={n.y} r={r + 3} fill={t.hex} fillOpacity="0.12" />
            <circle cx={n.x} cy={n.y} r={r} fill="#05070d" stroke={t.hex} strokeWidth="1.5" />
            <circle cx={n.x} cy={n.y - r * 0.22} r={r * 0.32} fill={t.hex} />
            <path
              d={`M${n.x - r * 0.62} ${n.y + r * 0.62} a${r * 0.62} ${r * 0.5} 0 0 1 ${r * 1.24} 0`}
              fill={t.hex}
            />
          </g>
        );
      })}
    </svg>
  );
}

export default function ExpertNetwork() {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");

  // one card per profile slot
  const cards = useMemo(
    () => expertCategories.flatMap((c) => Array.from({ length: c.slots }, (_, k) => ({ ...c, key: `${c.id}-${k}` }))),
    [],
  );
  const q = query.trim().toLowerCase();
  const shown = cards.filter((c) => (active === "all" || c.id === active) && (!q || c.label.toLowerCase().includes(q)));

  return (
    <section id="our-network" className="relative scroll-mt-20 overflow-hidden bg-black px-6 py-16 lg:px-12">
      <div className="pointer-events-none absolute right-0 top-20 h-96 w-96 rounded-full bg-blue-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl border-t border-white/10 pt-16">
        {/* INTRO + VISUAL */}
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <motion.div
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p variants={fadeUp} className="flex items-center gap-3 text-[10px] tracking-[0.45em] text-zinc-400">
              <span className="h-px w-8 bg-blue-500" />
              OUR TECHNOLOGY NETWORK
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-medium leading-tight text-white md:text-5xl">
              A Network of
              <br />
              <ShimmerText>Specialized Experts.</ShimmerText>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
              Studio Base operates through a flexible network of specialized
              technology professionals who are selected based on each
              project&apos;s requirements, technical complexity, and business
              objectives. We collaborate with experienced AI engineers,
              full-stack and mobile developers,
              UI/UX designers and technology sales executives, allowing
              us to assemble the right team for every project and deliver
              end-to-end solutions with specialized talent.
            </motion.p>
          </motion.div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.2, ease: EASE }}
              className="relative aspect-[43/35] w-full"
            >
              <div className="absolute inset-[10%] rounded-full bg-blue-500/15 blur-[70px]" />
              <NetworkVisual />
            </motion.div>

            {/* join card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              className="relative mt-4 rounded-xl border border-yellow-400/50 bg-black/85 p-5 shadow-[0_0_40px_-15px_rgba(250,204,21,0.6)] lg:absolute lg:-right-2 lg:bottom-0 lg:mt-0 lg:w-[260px]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-yellow-400/40 bg-yellow-400/10 text-yellow-300">
                  <Users size={20} />
                </span>
                <p className="text-sm font-semibold leading-snug text-white">
                  Become Part
                  <br />
                  of Our Team <Heart size={13} className="ml-1 inline text-yellow-300" />
                </p>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-zinc-400">
                We&apos;re always looking for talented professionals to join our network and work on exciting projects.
              </p>
              <a
                href={joinHref}
                className="group mt-4 inline-flex items-center gap-2 rounded-full border border-yellow-400/70 px-4 py-2 text-xs font-semibold text-yellow-200 transition-colors hover:bg-yellow-400 hover:text-black"
              >
                Join Our Network
                <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="-mx-6 mt-14 flex gap-2 overflow-x-auto px-6 pb-2 lg:mx-0 lg:flex-wrap lg:px-0">
          {[{ id: "all", label: "All Experts", icon: "all", tone: "blue" as Tone }, ...expertCategories].map((c) => {
            const t = tones[c.tone];
            const Icon = c.icon === "all" ? Users : icons[c.icon];
            const on = active === c.id;
            return (
              <motion.button
                key={c.id}
                type="button"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActive(c.id)}
                aria-pressed={on}
                className={`relative flex shrink-0 items-center gap-2.5 rounded-full border px-4 py-2.5 text-xs font-semibold transition-colors duration-300 ${
                  on ? `${t.borderOn} ${t.onText}` : `border-white/10 text-zinc-300 ${t.borderHover}`
                }`}
                style={on ? { boxShadow: `0 0 24px -6px rgba(${t.rgb},0.8)` } : undefined}
              >
                {on && (
                  <motion.span
                    layoutId="expert-filter"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className={`absolute inset-0 rounded-full ${t.fill}`}
                  />
                )}
                <span className={`relative flex h-6 w-6 items-center justify-center rounded-md ${on ? "bg-black/20" : t.iconBox} border-0`}>
                  <Icon size={14} className={on ? "" : t.text} />
                </span>
                <span className="relative">{c.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* TITLE + SEARCH */}
        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-2xl font-medium text-white md:text-3xl">Our Technical Network</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Meet the expertise in our network. Each expert is selected based on project requirements.
            </p>
          </div>
          <label className="group flex w-full items-center gap-3 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2.5 transition-colors focus-within:border-blue-500 focus-within:shadow-[0_0_24px_-8px_rgba(59,130,246,0.8)] md:w-72">
            <Search size={15} className="text-blue-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by expertise…"
              className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
            />
          </label>
        </div>

        {/* CARDS */}
        <motion.div layout className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          <AnimatePresence mode="popLayout">
            {shown.map((c, i) => {
              const t = tones[c.tone];
              const Icon = icons[c.icon];
              return (
                <motion.div
                  key={c.key}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.6, delay: (i % 7) * 0.06, ease: EASE }}
                >
                  <TiltCard
                    tilt={8}
                    rgb={t.rgb}
                    className={`group overflow-hidden rounded-xl border bg-[#07070a] transition-colors duration-500 ${t.border} ${t.borderHover}`}
                    style={{ boxShadow: `0 0 40px -22px rgba(${t.rgb},0.8)` }}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                        <Avatar tone={c.tone} id={c.key} />
                      </div>
                      {/* scan line on hover */}
                      <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] translate-y-[-10px] bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-0 transition-all duration-[1200ms] group-hover:translate-y-[300px] group-hover:opacity-100" />
                      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#07070a] to-transparent" />
                      <span className={`absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg border bg-black/40 ${t.iconBox}`}>
                        <Icon size={15} />
                      </span>
                    </div>
                    <div className="relative px-4 pb-4">
                      <p className={`text-xs font-semibold ${t.text}`}>{c.label}</p>
                      <span className={`mt-3 block h-px w-full origin-left scale-x-50 bg-gradient-to-r from-current to-transparent transition-transform duration-500 group-hover:scale-x-100 ${t.text}`} />
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
        {shown.length === 0 && <p className="mt-8 text-sm text-zinc-500">No expertise matches your search.</p>}
      </div>
    </section>
  );
}
