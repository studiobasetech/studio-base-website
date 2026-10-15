"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Check, Cpu, Crosshair } from "lucide-react";
import Reveal from "@/components/Reveal";
import { LightSweep, TiltCard } from "@/components/Effects";
import { techProducts } from "@/data/services";
import { accents } from "./accents";
import SectionIntro from "./SectionIntro";

const EASE = [0.22, 1, 0.36, 1] as const;

const icons = {
  "hcrm-ai": Cpu,
  "baselead-ai": Crosshair,
};

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } },
};

const listItem: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

const MotionLink = motion.create(Link);

export default function TechProducts() {
  return (
    <section
      id="our-products"
      className="relative scroll-mt-20 overflow-hidden bg-black px-6 py-16 lg:px-12"
    >
      {/* Background glows that drift slowly */}
      <motion.div
        animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-0 top-1/3 h-96 w-96 rounded-full bg-yellow-400/[0.07] blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -80, 0], y: [0, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="OUR TECHNOLOGY PRODUCTS"
          title="Proprietary AI Solutions for Modern Businesses."
          side={
            <p>
              Powerful AI platforms designed to automate operations, acquire
              more clients, and drive business growth.
            </p>
          }
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {techProducts.map((product, i) => {
            const a = accents[product.accent];
            const Icon = icons[product.id as keyof typeof icons] ?? Cpu;

            return (
              <Reveal key={product.id} delay={i * 0.15} className="h-full">
                <TiltCard
                  rgb={a.rgb}
                  tilt={5}
                  className={`group grid overflow-hidden rounded-xl border bg-[#07070a] transition-colors duration-500 sm:grid-cols-[1.15fr_1fr] ${a.border} ${a.borderHover}`}
                  style={{ boxShadow: `0 0 50px -20px rgba(${a.rgb},0.45)` }}
                >
                  {/* Pulsing corner glow */}
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className={`pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full blur-3xl ${a.glow}`}
                  />

                  {/* TEXT */}
                  <div className="relative z-10 flex flex-col p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      <motion.span
                        animate={{
                          y: [0, -5, 0],
                          boxShadow: [
                            `0 0 0px 0px rgba(${a.rgb},0)`,
                            `0 0 24px 2px rgba(${a.rgb},0.5)`,
                            `0 0 0px 0px rgba(${a.rgb},0)`,
                          ],
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        whileHover={{ rotate: 12, scale: 1.1 }}
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border ${a.iconBox}`}
                      >
                        <Icon size={24} />
                      </motion.span>
                      <div>
                        <h3 className="text-xl font-semibold text-white md:text-2xl">
                          {product.title}
                        </h3>
                        <p className="mt-1 text-sm text-zinc-300">
                          {product.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="mt-5 text-xs leading-relaxed text-zinc-400 md:text-sm">
                      {product.description}
                    </p>

                    {/* CORE CAPABILITIES (line draws in) */}
                    <div className="mt-6 flex items-center gap-3">
                      <p className={`text-[10px] font-semibold tracking-[0.3em] ${a.text}`}>
                        CORE CAPABILITIES
                      </p>
                      <motion.span
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
                        className={`h-px flex-1 origin-left bg-gradient-to-r to-transparent ${a.line}`}
                      />
                    </div>

                    {/* Capabilities slide in one by one */}
                    <motion.ul
                      variants={list}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: "-60px" }}
                      className="mt-4 space-y-2.5"
                    >
                      {product.capabilities.map((c) => (
                        <motion.li
                          key={c}
                          variants={listItem}
                          whileHover={{ x: 6 }}
                          className="flex items-center gap-2.5 text-xs text-zinc-200"
                        >
                          <span
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${a.check}`}
                          >
                            <Check size={10} strokeWidth={3} />
                          </span>
                          {c}
                        </motion.li>
                      ))}
                    </motion.ul>

                    <MotionLink
                      href={product.href}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.96 }}
                      className={`group/btn relative mt-8 inline-flex w-fit items-center gap-2 overflow-hidden rounded-full px-6 py-2.5 text-xs font-semibold transition-colors ${a.button}`}
                    >
                      <LightSweep delay={3 + i} />
                      <span className="relative">Learn More</span>
                      <ArrowRight
                        size={14}
                        className="relative transition-transform duration-300 group-hover/btn:translate-x-1"
                      />
                    </MotionLink>
                  </div>

                  {/* IMAGE: floats gently, zooms on hover */}
                  <div className="relative h-64 overflow-hidden sm:h-auto">
                    <motion.img
                      src={product.image}
                      alt={`${product.title} dashboard`}
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 6, delay: i, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 h-[105%] w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#07070a] via-transparent to-transparent sm:bg-gradient-to-r" />
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
