"use client";

import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  ChartColumnIncreasing,
  Crosshair,
  Eye,
  Heart,
  Lightbulb,
  ShieldCheck,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import { TiltCard } from "@/components/Effects";
import { pillars, values } from "@/data/about";
import { useLang } from "@/lib/i18n";
import { tones } from "./palette";

const EASE = [0.22, 1, 0.36, 1] as const;

const pillarIcons: Record<string, LucideIcon> = { target: Target, eye: Eye, chart: ChartColumnIncreasing };
const valueIcons: Record<string, LucideIcon> = { bulb: Lightbulb, users: Users, focus: Crosshair, shield: ShieldCheck, heart: Heart };
const valueMotion = [{ rotate: [0, -10, 10, 0] }, { y: [0, -6, 0] }, { rotate: [0, 360] }, { scale: [1, 1.12, 1] }, { scale: [1, 1.18, 1] }];

const grid: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.14 } } };
const card: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

/** Mission / Vision / Approach cards + the five values. */
export default function Pillars() {
  const { t: tx, tr } = useLang();

  return (
    <section id="who-we-are" className="relative scroll-mt-20 overflow-hidden bg-black px-6 py-16 lg:px-12">
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 md:grid-cols-3"
        >
          {pillars.map((p, i) => {
            const t = tones[p.tone];
            const Icon = pillarIcons[p.icon];
            return (
              <motion.div key={p.id} variants={card} className="h-full">
                <TiltCard
                  tilt={6}
                  rgb={t.rgb}
                  className={`group h-full overflow-hidden rounded-xl border bg-[#07070a] p-6 transition-colors duration-500 md:p-7 ${t.border} ${t.borderHover}`}
                  style={{ boxShadow: `0 0 50px -22px rgba(${t.rgb},0.7)` }}
                >
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 6, delay: i, repeat: Infinity, ease: "easeInOut" }}
                    className={`pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full blur-3xl ${t.glow}`}
                  />
                  <div className="relative z-10 flex items-start gap-4">
                    <motion.span
                      animate={{
                        y: [0, -5, 0],
                        boxShadow: [`0 0 0 0 rgba(${t.rgb},0)`, `0 0 24px 2px rgba(${t.rgb},0.5)`, `0 0 0 0 rgba(${t.rgb},0)`],
                      }}
                      transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border ${t.iconBox}`}
                    >
                      <Icon size={24} />
                    </motion.span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-xl font-semibold text-white">{tx(p.title)}</h3>
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-transform duration-500 group-hover:-rotate-45 ${t.border} ${t.text}`}
                        >
                          <ArrowRight size={13} />
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-400">{tx(p.text)}</p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* VALUES */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-16 flex items-center gap-3 text-[10px] tracking-[0.45em] text-zinc-400"
        >
          <span className="h-px w-8 bg-blue-500" />
          {tr("OUR VALUES", "NUESTROS VALORES")}
        </motion.p>
        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="relative mt-8 grid grid-cols-2 gap-y-10 pb-12 sm:grid-cols-3 lg:grid-cols-5"
        >
          {values.map((v, i) => {
            const t = tones[v.tone];
            const Icon = valueIcons[v.icon];
            return (
              <motion.div key={v.icon} variants={card} whileHover={{ y: -8 }} className="group relative px-4 text-center">
                {i > 0 && (
                  <motion.span
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: EASE }}
                    className="absolute left-0 top-0 hidden h-full w-px origin-top bg-gradient-to-b from-white/20 to-transparent lg:block"
                  />
                )}
                <span className="relative mx-auto block w-fit">
                  <span className={`absolute inset-0 rounded-full opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100 ${t.glow}`} />
                  <motion.span
                    animate={valueMotion[i % valueMotion.length]}
                    transition={{ duration: i === 2 ? 10 : 3, repeat: Infinity, ease: i === 2 ? "linear" : "easeInOut" }}
                    className="relative block"
                  >
                    <Icon size={36} strokeWidth={1.4} className={t.text} />
                  </motion.span>
                </span>
                <h3 className={`mt-4 text-xs font-semibold tracking-[0.2em] text-white transition-colors duration-300 ${t.groupText}`}>
                  {tx(v.title)}
                </h3>
                <p className="mx-auto mt-2 max-w-[180px] text-xs leading-relaxed text-zinc-400">{tx(v.text)}</p>
              </motion.div>
            );
          })}
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
            className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-blue-500/40 via-white/10 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
