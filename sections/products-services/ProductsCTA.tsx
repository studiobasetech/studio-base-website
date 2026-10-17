"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { LightSweep, ShimmerText } from "@/components/Effects";
import { consultationHref } from "@/data/site";
import ParticleField from "@/components/ParticleField";
import SpaceScene from "./SpaceScene";
import { useLang, type Text } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

const MotionLink = motion.create(Link);

/**
 * Closing call to action with the space scene. Text can be changed per
 * page (the Portfolio page uses its own wording); defaults are the
 * Products & Services text.
 */
export default function ProductsCTA({
  eyebrow = { en: "LET'S BUILD TOGETHER", es: "CONSTRUYAMOS JUNTOS" },
  title,
  description = {
    en: "Partner with Studio Base and turn your ideas into powerful technology solutions that drive real business growth.",
    es: "Trabaja con Studio Base y convierte tus ideas en soluciones tecnológicas sólidas que impulsan el crecimiento real de tu negocio.",
  },
}: {
  eyebrow?: Text;
  title?: ReactNode;
  description?: Text;
} = {}) {
  const { t, tr } = useLang();
  const ref = useRef<HTMLElement>(null);

  // The space scene moves slower than the page while you scroll (parallax)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const sceneY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  // Mouse position (-0.5 to 0.5) for the planet parallax
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
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-black px-6 py-24 lg:min-h-[560px] lg:px-12 lg:py-32"
    >
      {/* Space scene (planet, stars, nebula) with scroll parallax */}
      <motion.div style={{ y: sceneY }} className="absolute -inset-y-12 inset-x-0">
        <SpaceScene nx={px} ny={py} variant="cta" />
      </motion.div>

      {/* Constellation effect (same as the Home "Let's Build Together") */}
      <ParticleField density={0.9} />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="relative z-10 mx-auto max-w-7xl"
      >
        <div className="max-w-xl">
          <motion.p
            variants={fadeUp}
            className="text-[10px] tracking-[0.45em] text-zinc-300"
          >
            {t(eyebrow)}
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mt-4 text-3xl font-medium leading-tight text-white md:text-5xl"
          >
            {title ?? (
              <>
                {tr("Ready to Transform", "¿Listo para transformar")}
                <br />
                {tr("Your Business with ", "tu negocio con ")}
                <ShimmerText>{tr("Technology?", "tecnología?")}</ShimmerText>
              </>
            )}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-md text-sm leading-relaxed text-zinc-300"
          >
            {t(description)}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
            <MotionLink
              href={consultationHref}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(59,130,246,0.5)",
                  "0 0 0 18px rgba(59,130,246,0)",
                ],
              }}
              transition={{
                boxShadow: { duration: 1.8, repeat: Infinity, ease: "easeOut" },
              }}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-blue-500 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-400"
            >
              <LightSweep />
              <span className="relative">{tr("Book a Consultation", "Agenda una consulta")}</span>
              <ArrowRight
                size={16}
                className="relative transition-transform duration-300 group-hover:translate-x-1"
              />
            </MotionLink>

            <MotionLink
              href="/contact"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-full border border-white/40 px-9 py-3 text-sm font-semibold text-white transition-colors hover:border-blue-500 hover:text-blue-500"
            >
              {tr("Contact Us", "Contáctanos")}
            </MotionLink>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
