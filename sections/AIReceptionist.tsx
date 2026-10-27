"use client";

import { useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { CalendarCheck, Clock, Languages } from "lucide-react";
import { ShimmerText } from "@/components/Effects";
import { useLang } from "@/lib/i18n";
import EvaPanel from "@/components/eva/EvaPanel";
import { useEva } from "@/components/eva/EvaProvider";

/* ------------------------------------------------------------------ */
/*  "Talk to our AI receptionist" — Eva's section on the home page.     */
/*  The call itself lives in components/eva/EvaProvider.tsx and is     */
/*  shared with the floating button shown on every page.               */
/* ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};

export default function AIReceptionist() {
  const { tr } = useLang();
  const { setSectionVisible } = useEva();
  const ref = useRef<HTMLElement>(null);

  // tell the floating button to step aside while this section is on screen
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSectionVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => {
      io.disconnect();
      setSectionVisible(false);
    };
  }, [setSectionVisible]);

  return (
    <section ref={ref} id="ai-receptionist" className="relative overflow-hidden bg-black px-6 py-24 lg:px-12">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
        {/* COPY */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.12 }}
        >
          <motion.p variants={fadeUp} className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-zinc-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            {tr("Live demo", "Demo en vivo")}
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-5xl">
            {tr("Talk to Our", "Habla con nuestra")}{" "}
            <ShimmerText>{tr("AI Receptionist.", "recepcionista con IA.")}</ShimmerText>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400">
            {tr(
              "Meet Eva. She answers questions about Studio Base and books consultations, by voice, in English or Spanish. This is the kind of AI agent we build for businesses: one that picks up every call, day or night, and never lets a lead slip away.",
              "Conoce a Eva. Responde preguntas sobre Studio Base y agenda consultas, por voz, en inglés o en español. Este es el tipo de agente de IA que creamos para los negocios: uno que contesta cada llamada, de día o de noche, y nunca deja ir a un cliente.",
            )}
          </motion.p>
          <motion.ul variants={fadeUp} className="mt-8 space-y-4">
            {[
              { icon: Clock, t: tr("Answers 24/7, instantly", "Responde 24/7, al instante") },
              { icon: CalendarCheck, t: tr("Books appointments and captures leads", "Agenda citas y capta clientes") },
              { icon: Languages, t: tr("Fluent in English and Spanish", "Habla inglés y español") },
            ].map(({ icon: Icon, t: label }) => (
              <li key={label} className="flex items-center gap-3 text-sm text-zinc-300">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10">
                  <Icon size={16} className="text-blue-400" />
                </span>
                {label}
              </li>
            ))}
          </motion.ul>
          <motion.p variants={fadeUp} className="mt-8 max-w-md text-xs leading-relaxed text-zinc-400">
            {tr(
              "Demo receptionist for Studio Base. Yours is trained on your business, your services and your brand's voice. Voice input works in Chrome, Edge and Safari; you can always type instead.",
              "Recepcionista de demostración de Studio Base. La tuya se entrena con tu negocio, tus servicios y la voz de tu marca. La entrada por voz funciona en Chrome, Edge y Safari; también puedes escribir.",
            )}
          </motion.p>
        </motion.div>

        {/* CALL PANEL */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className="relative rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.015] shadow-[0_0_120px_-40px_rgba(59,130,246,0.7)] backdrop-blur-xl"
        >
          <EvaPanel />
        </motion.div>
      </div>
    </section>
  );
}
