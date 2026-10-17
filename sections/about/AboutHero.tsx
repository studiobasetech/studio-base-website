"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
import { LightSweep, ShimmerText } from "@/components/Effects";
import ParticleField from "@/components/ParticleField";
import StarField from "@/sections/products-services/StarField";
import { consultationHref } from "@/data/site";
import { useLang } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

const headline = {
  en: [
    { words: ["CRAFTING", "EXCELLENCE"], accent: false },
    { words: ["BEYOND", "DIGITAL."], accent: true },
  ],
  es: [
    { words: ["CREANDO", "EXCELENCIA"], accent: false },
    { words: ["MÁS", "ALLÁ", "DE", "LO", "DIGITAL."], accent: true },
  ],
};

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};
const word: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};

const MotionLink = motion.create(Link);

/**
 * About hero. Right side: the SB monogram as a floating hologram over a
 * glowing platform with orbit rings, light beams and a grid floor.
 */
export default function AboutHero() {
  const { tr, lang } = useLang();
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const px = useSpring(nx, { stiffness: 50, damping: 20 });
  const py = useSpring(ny, { stiffness: 50, damping: 20 });
  const rotY = useTransform(px, [-0.5, 0.5], [-14, 14]);
  const rotX = useTransform(py, [-0.5, 0.5], [8, -8]);
  const shiftX = useTransform(px, [-0.5, 0.5], [-16, 16]);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    nx.set((e.clientX - r.left) / r.width - 0.5);
    ny.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      onMouseMove={onMove}
      className="relative overflow-hidden bg-black px-6 pb-16 pt-32 lg:flex lg:min-h-[760px] lg:items-center lg:px-12 lg:pb-24 lg:pt-32"
    >
      <StarField meteorEvery={[4000, 8000]} density={0.3} goldOnly />
      <ParticleField />
      <div className="pointer-events-none absolute right-[10%] top-1/4 h-[480px] w-[520px] rounded-full bg-blue-600/15 blur-[100px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        {/* TEXT */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={fadeUp} className="text-[10px] tracking-[0.45em] text-zinc-300">
            {tr("ABOUT STUDIO BASE", "SOBRE STUDIO BASE")}
          </motion.p>
          <motion.h1 variants={container} className="mt-4 text-4xl font-medium leading-[1.05] text-white md:text-6xl">
            {headline[lang].map((line, li) => (
              <span key={li} className="block">
                {line.words.map((w, wi) => (
                  <motion.span key={wi} variants={word} className="inline-block" style={{ marginRight: "0.25em" }}>
                    {line.accent ? <ShimmerText>{w}</ShimmerText> : w}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-sm leading-relaxed text-zinc-300 md:text-base">
            {tr(
              "Studio Base is a technology company dedicated to turning ideas into meaningful digital experiences. We specialize in artificial intelligence, software engineering, and digital transformation, helping businesses design, build, and scale solutions that create real impact.",
              "Studio Base es una empresa de tecnología dedicada a convertir ideas en experiencias digitales con propósito. Nos especializamos en inteligencia artificial, ingeniería de software y transformación digital, y ayudamos a las empresas a diseñar, construir y escalar soluciones que generan un impacto real.",
            )}
          </motion.p>
          <motion.p variants={fadeUp} className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
            {tr(
              "We combine technology, strategy, and creativity to solve complex problems, streamline operations, and unlock new opportunities. Our focus is on building innovative, secure, and scalable digital infrastructure that empowers businesses to grow and thrive in a rapidly changing world.",
              "Combinamos tecnología, estrategia y creatividad para resolver problemas complejos, optimizar operaciones y abrir nuevas oportunidades. Nos enfocamos en construir infraestructura digital innovadora, segura y escalable que impulsa a las empresas a crecer y prosperar en un mundo que cambia rápidamente.",
            )}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
            <MotionLink
              href={consultationHref}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              animate={{ boxShadow: ["0 0 0 0 rgba(59,130,246,0.5)", "0 0 0 18px rgba(59,130,246,0)"] }}
              transition={{ boxShadow: { duration: 1.8, repeat: Infinity, ease: "easeOut" } }}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-blue-500 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-400"
            >
              <LightSweep />
              <span className="relative">{tr("Book a Consultation", "Agenda una consulta")}</span>
              <ArrowRight size={16} className="relative transition-transform duration-300 group-hover:translate-x-1" />
            </MotionLink>
            <MotionLink
              href="#who-we-are"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="group inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-blue-400 hover:text-blue-300"
            >
              {tr("Learn More", "Conoce más")}
              <ArrowDown size={15} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </MotionLink>
          </motion.div>
        </motion.div>

        {/* HOLOGRAM */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.4, ease: EASE }}
          className="relative mx-auto aspect-square w-full max-w-[520px]"
        >
          {/* grid floor */}
          <div
            className="absolute inset-x-[-20%] bottom-[2%] h-[46%] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"
            style={{ perspective: 500 }}
          >
            <motion.div
              animate={{ backgroundPositionY: ["0px", "40px"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="h-full w-full origin-bottom"
              style={{
                rotateX: 64,
                backgroundImage:
                  "linear-gradient(rgba(59,130,246,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.35) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          {/* platform + rings */}
          <div className="absolute bottom-[14%] left-1/2 h-[22%] w-[78%] -translate-x-1/2">
            <div className="absolute inset-0 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.55),rgba(59,130,246,0.08)_55%,transparent_70%)] blur-md" />
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ rotate: i % 2 ? -360 : 360 }}
                transition={{ duration: 18 + i * 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-[50%] border border-dashed"
                style={{
                  borderColor: ["rgba(147,197,253,0.7)", "rgba(168,85,247,0.5)", "rgba(250,204,21,0.45)"][i],
                  transform: `scale(${1 - i * 0.2})`,
                }}
              />
            ))}
          </div>

          {/* light beam */}
          <motion.div
            animate={{ opacity: [0.35, 0.7, 0.35] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[22%] left-1/2 h-[64%] w-[46%] -translate-x-1/2 bg-gradient-to-t from-blue-500/40 via-blue-400/10 to-transparent [clip-path:polygon(18%_100%,82%_100%,100%_0,0_0)]"
          />

          {/* floating monogram */}
          <motion.div style={{ x: shiftX }} className="absolute inset-0 flex items-center justify-center pb-[18%]">
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ rotateY: rotY, rotateX: rotX, transformPerspective: 1200 }}
              className="relative w-[46%]"
            >
              {/* soft glow behind the logo (cheaper than a drop-shadow filter) */}
              <span className="absolute inset-[8%] rounded-full bg-blue-500/50 blur-2xl" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/sb-monogram.png"
                alt="Studio Base"
                className="relative w-full"
                draggable={false}
              />
              {/* scan line */}
              <motion.span
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
                className="absolute inset-x-[-10%] h-[2px] bg-gradient-to-r from-transparent via-blue-200 to-transparent shadow-[0_0_14px_#60a5fa]"
              />
            </motion.div>
          </motion.div>

          {/* orbiting dots */}
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              animate={{ rotate: 360 }}
              transition={{ duration: 10 + i * 4, repeat: Infinity, ease: "linear", delay: -i * 2 }}
              className="absolute left-1/2 top-[42%] h-0 w-0"
            >
              <span
                className="absolute block h-2 w-2 rounded-full"
                style={{
                  left: 120 + i * 30,
                  background: ["#60a5fa", "#a855f7", "#22d3ee", "#facc15"][i],
                  boxShadow: `0 0 12px ${["#60a5fa", "#a855f7", "#22d3ee", "#facc15"][i]}`,
                }}
              />
            </motion.span>
          ))}

          {/* HUD labels */}
          {[
            { id: "ai", t: tr("AI", "IA"), pos: "left-[4%] top-[14%]" },
            { id: "software", t: "SOFTWARE", pos: "right-[0%] top-[24%]" },
            { id: "mobile", t: tr("MOBILE", "MÓVIL"), pos: "left-[0%] top-[52%]" },
            { id: "design", t: tr("DESIGN", "DISEÑO"), pos: "right-[4%] top-[58%]" },
          ].map((l, i) => (
            <motion.span
              key={l.id}
              initial={{ opacity: 0, x: i % 2 ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 + i * 0.15, ease: EASE }}
              className={`absolute rounded-md border border-blue-400/30 bg-black/70 px-2.5 py-1 font-mono text-[10px] tracking-[0.25em] text-blue-200 ${l.pos}`}
            >
              {l.t}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
