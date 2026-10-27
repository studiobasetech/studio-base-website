"use client";

import Link from "@/components/LangLink";
import { ArrowRight, MessageCircle } from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { LightSweep, ShimmerText } from "@/components/Effects";
import { consultationHref } from "@/data/site";
import ParticleField from "@/components/ParticleField";
import StarField from "@/sections/products-services/StarField";
import { useLang, type Bi } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

const headlineLines = [
  { words: { en: ["Real", "Solutions."], es: ["Soluciones", "reales."] }, accent: false },
  { words: { en: ["Measurable", "Results."], es: ["Resultados", "medibles."] }, accent: true },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};

const word: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};

// Floating result chips around the laptop
const chips: { value: string; label: Bi; pos: string; delay: number }[] = [
  { value: "3x", label: { en: "Qualified leads", es: "Prospectos calificados" }, pos: "left-0 top-[8%] sm:-left-4", delay: 1.2 },
  { value: "100K+", label: { en: "App downloads", es: "Descargas de la app" }, pos: "right-0 top-[2%] lg:-right-2", delay: 1.4 },
  { value: "−70%", label: { en: "Manual work", es: "Trabajo manual" }, pos: "left-[4%] bottom-[6%]", delay: 1.6 },
  { value: "4.8★", label: { en: "App rating", es: "Calificación de la app" }, pos: "right-[2%] bottom-[12%]", delay: 1.8 },
];

const MotionLink = motion.create(Link);

/* The glowing planet behind the laptop (rendered image + live rim glow). */
function Planet({ nx, ny }: { nx: MotionValue<number>; ny: MotionValue<number> }) {
  const x = useTransform(nx, [-0.5, 0.5], [-25, 25]);
  const y = useTransform(ny, [-0.5, 0.5], [-18, 18]);

  return (
    <motion.div
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, ease: EASE }}
      className="pointer-events-none absolute -right-[38%] top-[36%] w-[150%] sm:top-[24%] sm:-right-[20%] sm:w-[110%] lg:-right-[18%] lg:top-[-14%] lg:w-[78%] xl:w-[72%]"
    >
      <motion.div
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="relative aspect-square"
      >
        {/* soft blue halo that breathes */}
        <motion.div
          animate={{ opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-[8%] rounded-full bg-blue-500/20 blur-[90px]"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/portfolio/planet-blue.jpg"
          alt=""
          aria-hidden="true"
          className="relative h-full w-full object-contain mix-blend-screen"
        />
      </motion.div>
    </motion.div>
  );
}

/* Laptop built in code, with the dashboard image on its screen. */
function Laptop({ nx, ny }: { nx: MotionValue<number>; ny: MotionValue<number> }) {
  const rotateY = useTransform(nx, [-0.5, 0.5], [-20, -8]);
  const rotateX = useTransform(ny, [-0.5, 0.5], [10, 2]);
  const { tr } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
      className="relative mx-auto w-[92%] max-w-[640px]"
      style={{ perspective: 1600 }}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}>
          {/* screen */}
          <div className="relative rounded-t-2xl border border-white/15 bg-[#0b0b0f] p-[2.2%] shadow-[0_40px_120px_-30px_rgba(59,130,246,0.45)]">
            <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portfolio/laptop-screen-blue.jpg"
                alt={tr(
                  "Global impact dashboard showing active projects, countries, ROI and uptime",
                  "Panel de impacto global con proyectos activos, países, ROI y disponibilidad",
                )}
                className="h-full w-full object-cover"
              />
              {/* glare that sweeps across the screen */}
              <motion.div
                animate={{ x: ["-120%", "220%"] }}
                transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                className="absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              />
            </div>
            {/* camera dot */}
            <span className="absolute left-1/2 top-[0.9%] h-1 w-1 -translate-x-1/2 rounded-full bg-white/30" />
          </div>
          {/* base */}
          <div className="relative mx-[-6%] h-3 rounded-b-xl bg-gradient-to-b from-zinc-500 via-zinc-700 to-zinc-900 sm:h-4">
            <span className="absolute left-1/2 top-0 h-1 w-[16%] -translate-x-1/2 rounded-b-md bg-zinc-900/80" />
          </div>
          {/* reflection / shadow */}
          <div className="mx-auto mt-3 h-6 w-[90%] rounded-[50%] bg-blue-500/20 blur-2xl" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function PortfolioHero() {
  const { t, tr, lang } = useLang();
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const px = useSpring(nx, { stiffness: 50, damping: 20 });
  const py = useSpring(ny, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    nx.set((e.clientX - rect.left) / rect.width - 0.5);
    ny.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-black px-6 pb-16 pt-32 lg:flex lg:min-h-[760px] lg:items-center lg:px-12 lg:pb-24 lg:pt-36"
    >
      <StarField meteorEvery={[3000, 7000]} density={0.5} goldOnly />
      <Planet nx={px} ny={py} />
      <ParticleField />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-8">
        {/* TEXT */}
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl">
          <motion.p variants={fadeUp} className="text-[10px] tracking-[0.45em] text-zinc-300">
            {tr("OUR PORTFOLIO", "NUESTRO PORTAFOLIO")}
          </motion.p>

          <motion.h1
            variants={container}
            className="mt-4 text-4xl font-medium leading-tight text-white md:text-6xl"
          >
            {headlineLines.map((line, li) => (
              <span key={li} className="block">
                {line.words[lang].map((w, wi) => (
                  <motion.span
                    key={wi}
                    variants={word}
                    className="inline-block"
                    style={{ marginRight: "0.25em" }}
                  >
                    {line.accent ? <ShimmerText>{w}</ShimmerText> : w}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-sm leading-relaxed text-zinc-300 md:text-base"
          >
            {tr(
              "Explore a selection of projects delivered through Studio Base's specialized technology network. We develop AI-powered solutions, custom software, and scalable digital platforms that help businesses automate, scale, and grow.",
              "Explora una selección de proyectos realizados a través de la red tecnológica especializada de Studio Base. Desarrollamos soluciones con IA, software a la medida y plataformas digitales escalables que ayudan a las empresas a automatizar, escalar y crecer.",
            )}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
            <MotionLink
              href={consultationHref}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              animate={{
                boxShadow: ["0 0 0 0 rgba(59,130,246,0.5)", "0 0 0 18px rgba(59,130,246,0)"],
              }}
              transition={{ boxShadow: { duration: 1.8, repeat: Infinity, ease: "easeOut" } }}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-blue-500 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-400"
            >
              <LightSweep />
              <span className="relative">{tr("Book a Consultation", "Agenda una consulta")}</span>
              <ArrowRight size={16} className="relative transition-transform duration-300 group-hover:translate-x-1" />
            </MotionLink>

            <MotionLink
              href="/contact#contact-form"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="group inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-blue-500 hover:text-blue-500"
            >
              {tr("Discuss a Project", "Hablemos de tu proyecto")}
              <MessageCircle size={15} className="transition-transform duration-300 group-hover:rotate-12" />
            </MotionLink>
          </motion.div>
        </motion.div>

        {/* VISUAL */}
        <div className="relative py-10 sm:py-14">
          <Laptop nx={px} ny={py} />

          {chips.map((c) => (
            <motion.div
              key={c.value}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: c.delay, ease: EASE }}
              className={`absolute z-10 hidden sm:block ${c.pos}`}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4 + c.delay, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-xl border border-blue-500/30 bg-black/60 px-4 py-2.5 shadow-[0_0_30px_-10px_rgba(59,130,246,0.6)] backdrop-blur-md"
              >
                <p className="text-lg font-semibold leading-none text-blue-400">{c.value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-zinc-400">{t(c.label)}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
