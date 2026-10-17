"use client";

import { motion, type Variants } from "framer-motion";
import { BarChart3, Globe2, Infinity as InfinityIcon, Users, type LucideIcon } from "lucide-react";
import { ShimmerText } from "@/components/Effects";

const EASE = [0.22, 1, 0.36, 1] as const;

const stats: { icon: LucideIcon; label: string; text: string; rgb: string }[] = [
  { icon: InfinityIcon, label: "Global\nReach", text: "text-blue-400", rgb: "59,130,246" },
  { icon: Users, label: "Remote\nTeam", text: "text-purple-400", rgb: "168,85,247" },
  { icon: Globe2, label: "Multiple\nIndustries", text: "text-cyan-400", rgb: "34,211,238" },
  { icon: BarChart3, label: "Real\nImpact", text: "text-yellow-300", rgb: "250,204,21" },
];

// Abstract network of regions (no map): x / y in a 600×360 box
const nodes = [
  { id: "na", x: 110, y: 110, label: "North America" },
  { id: "la", x: 175, y: 265, label: "Latin America" },
  { id: "eu", x: 330, y: 95, label: "Europe" },
  { id: "me", x: 380, y: 205, label: "Middle East & Africa" },
  { id: "ap", x: 510, y: 150, label: "Asia Pacific" },
];
const links = [
  ["na", "eu"], ["na", "la"], ["la", "eu"], ["eu", "me"], ["eu", "ap"], ["me", "ap"], ["na", "ap"], ["la", "me"],
];
const pos = (id: string) => nodes.find((n) => n.id === id)!;
const arc = (a: string, b: string) => {
  const p = pos(a), q = pos(b);
  const mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2 - Math.abs(q.x - p.x) * 0.25 - 20;
  return `M${p.x} ${p.y} Q${mx} ${my} ${q.x} ${q.y}`;
};

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};

export default function GlobalTeam() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-16 lg:px-12">
      <div className="mx-auto grid max-w-7xl items-center gap-12 border-t border-white/10 pt-16 lg:grid-cols-2">
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
          <motion.p variants={item} className="flex items-center gap-3 text-[10px] tracking-[0.45em] text-zinc-400">
            <span className="h-px w-8 bg-blue-500" />A GLOBAL, REMOTE TEAM
          </motion.p>
          <motion.h2 variants={item} className="mt-4 text-3xl font-medium leading-tight text-white md:text-5xl">
            Technology Without
            <br />
            <ShimmerText>Borders.</ShimmerText>
          </motion.h2>
          <motion.p variants={item} className="mt-5 max-w-lg text-sm leading-relaxed text-zinc-400 md:text-base">
            Studio Base operates as a fully remote company, allowing us to work
            with top talent and clients around the world. This enables us to
            deliver high-quality solutions with flexibility, efficiency, and a
            global perspective.
          </motion.p>

          <motion.div variants={container} className="mt-10 grid grid-cols-4 gap-4">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.label} variants={item} whileHover={{ y: -6 }} className="group">
                  <motion.span
                    animate={i === 0 ? { scale: [1, 1.12, 1] } : { y: [0, -4, 0] }}
                    transition={{ duration: 3, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                    className="block w-fit"
                  >
                    <Icon size={30} strokeWidth={1.5} className={s.text} style={{ filter: `drop-shadow(0 0 8px rgba(${s.rgb},0.7))` }} />
                  </motion.span>
                  <p className="mt-3 whitespace-pre-line text-xs font-semibold leading-snug text-white transition-colors group-hover:text-blue-400">
                    {s.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* NETWORK VISUAL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: EASE }}
          className="relative aspect-[5/3] w-full"
        >
          {/* dotted grid */}
          <div className="absolute inset-0 [background-image:radial-gradient(rgba(147,197,253,0.25)_1px,transparent_1.2px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]" />
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-[15%] rounded-full bg-blue-500/15 blur-[80px]"
          />
          <svg viewBox="0 0 600 360" className="absolute inset-0 h-full w-full">
            <defs>
              <linearGradient id="arc" x1="0" x2="1">
                <stop offset="0" stopColor="#3b82f6" stopOpacity="0.1" />
                <stop offset="0.5" stopColor="#60a5fa" stopOpacity="0.9" />
                <stop offset="1" stopColor="#3b82f6" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {links.map(([a, b], i) => (
              <g key={`${a}-${b}`}>
                <motion.path
                  d={arc(a, b)}
                  fill="none"
                  stroke="url(#arc)"
                  strokeWidth="1.2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, delay: 0.3 + i * 0.12, ease: EASE }}
                />
                {/* travelling pulse */}
                <circle r="2.6" fill="#bfdbfe">
                  <animateMotion dur={`${3 + (i % 3)}s`} begin={`${i * 0.5}s`} repeatCount="indefinite" path={arc(a, b)} />
                </circle>
              </g>
            ))}
            {nodes.map((n, i) => (
              <g key={n.id}>
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r="14"
                  fill="rgba(59,130,246,0.18)"
                  animate={{ r: [10, 20, 10], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: "easeOut" }}
                />
                <circle cx={n.x} cy={n.y} r="5" fill="#60a5fa" style={{ filter: "drop-shadow(0 0 6px #3b82f6)" }} />
                <text x={n.x} y={n.y + 26} textAnchor="middle" fill="#a1a1aa" fontSize="11" letterSpacing="1.5">
                  {n.label.toUpperCase()}
                </text>
              </g>
            ))}
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
