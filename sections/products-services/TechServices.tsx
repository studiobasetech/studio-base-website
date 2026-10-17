"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  Box,
  ChartColumnIncreasing,
  CloudUpload,
  Lightbulb,
  MonitorSmartphone,
  Plus,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { TiltCard } from "@/components/Effects";
import { consultationHref } from "@/data/site";
import { techServices } from "@/data/services";
import { accents } from "./accents";
import SectionIntro from "./SectionIntro";

const icons: Record<string, LucideIcon> = {
  ai: BrainCircuit,
  software: Box,
  apps: Smartphone,
  web: MonitorSmartphone,
  cloud: CloudUpload,
  analytics: ChartColumnIncreasing,
  strategy: Lightbulb,
};

// "A, B, and C." -> ["A", "B", "C"]
const toList = (text: string) =>
  text
    .replace(/\.$/, "")
    .split(", ")
    .map((s) => s.replace(/^and /, ""));

export default function TechServices() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-black px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="OUR TECHNOLOGY SERVICES"
          title="End-to-End Technology Solutions."
          side={
            <p>
              From strategy to implementation, we provide comprehensive
              technology solutions to help businesses innovate, operate
              efficiently and scale with confidence.
            </p>
          }
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-8 lg:[&>*]:col-span-2 lg:[&>*:nth-child(5)]:col-start-2">
          {techServices.map((service, i) => {
            const a = accents[service.accent];
            const Icon = icons[service.icon] ?? BrainCircuit;
            const isOpen = open === i;

            return (
              <Reveal key={service.title} delay={(i % 4) * 0.1 + Math.floor(i / 4) * 0.15} y={50}>
                <TiltCard
                  rgb={a.rgb}
                  tilt={9}
                  float
                  floatDelay={(i % 4) * 0.6}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className={`group flex min-h-[210px] cursor-pointer flex-col overflow-hidden rounded-xl border bg-gradient-to-b from-white/[0.04] to-transparent p-5 pb-14 transition-colors duration-300 ${isOpen ? a.borderOn : a.border} ${a.borderHover}`}
                  style={{
                    boxShadow: isOpen
                      ? `0 0 50px -10px rgba(${a.rgb},0.55)`
                      : `inset 0 0 40px -25px rgba(${a.rgb},0.6)`,
                  }}
                >
                  {/* Corner glow */}
                  <div
                    className={`pointer-events-none absolute -left-10 -top-10 h-28 w-28 rounded-full blur-3xl transition-transform duration-500 group-hover:scale-150 ${a.glow}`}
                  />

                  <div className="relative z-10 flex items-start gap-3">
                    <motion.span
                      animate={{ scale: [1, 1.12, 1] }}
                      transition={{ duration: 2.6, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                      className="shrink-0"
                    >
                      <Icon
                        size={26}
                        strokeWidth={1.5}
                        className={`transition-transform duration-500 group-hover:rotate-[15deg] ${a.text}`}
                        style={{ filter: `drop-shadow(0 0 8px rgba(${a.rgb},0.7))` }}
                      />
                    </motion.span>
                    <h3 className="whitespace-pre-line text-sm font-semibold leading-snug text-white">
                      {service.title}
                    </h3>
                  </div>

                  <AnimatePresence mode="wait" initial={false}>
                    {isOpen ? (
                      <motion.ul
                        key="list"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="relative z-10 mt-4 space-y-1.5"
                      >
                        {toList(service.description).map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2 text-xs text-zinc-200"
                          >
                            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${a.check}`} />
                            <span className="first-letter:uppercase">{item}</span>
                          </li>
                        ))}
                        <li className="pt-2">
                          <Link
                            href={consultationHref}
                            onClick={(e) => e.stopPropagation()}
                            className={`inline-flex items-center gap-1.5 text-xs font-semibold ${a.text}`}
                          >
                            Talk to us <ArrowRight size={12} />
                          </Link>
                        </li>
                      </motion.ul>
                    ) : (
                      <motion.p
                        key="text"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="relative z-10 mt-4 text-xs leading-relaxed text-zinc-400"
                      >
                        {service.description}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Plus button (turns into an X when open) */}
                  {!isOpen && (
                    <motion.span
                      aria-hidden="true"
                      animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
                      transition={{ duration: 1.8, delay: i * 0.2, repeat: Infinity, ease: "easeOut" }}
                      className={`absolute bottom-4 right-4 h-6 w-6 rounded-full border ${a.border}`}
                    />
                  )}
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 250, damping: 18 }}
                    aria-hidden="true"
                    className={`absolute bottom-4 right-4 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-current ${a.text}`}
                  >
                    <Plus size={13} />
                  </motion.span>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
