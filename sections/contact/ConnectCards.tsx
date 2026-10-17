"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, CalendarDays, FileText, Mail, Users, type LucideIcon } from "lucide-react";
import { TiltCard } from "@/components/Effects";
import { contact } from "@/data/site";
import { useLang, type Bi, type Text } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

type Card = {
  id: string;
  title: Bi;
  text: Bi;
  icon: LucideIcon;
  /** Page link, or a mailto with an optional (translated) subject. */
  href: string | { subject?: Bi };
  cta: Text;
  rgb: string;
  text_: string;
  border: string;
  glow: string;
};

const mail = (subject?: string) =>
  subject ? `mailto:${contact.email}?subject=${encodeURIComponent(subject)}` : `mailto:${contact.email}`;

const cards: Card[] = [
  {
    id: "consultation",
    title: { en: "Book a Consultation", es: "Agenda una consulta" },
    text: { en: "Schedule a call with our team to discuss your project.", es: "Programa una llamada con nuestro equipo para hablar de tu proyecto." },
    icon: CalendarDays,
    href: "#contact-form",
    cta: { en: "Send a request", es: "Envía una solicitud" },
    rgb: "59,130,246",
    text_: "text-blue-400",
    border: "border-blue-500/50 hover:border-blue-500",
    glow: "bg-blue-500/25",
  },
  {
    id: "network",
    title: { en: "Join Our Network", es: "Únete a nuestra red" },
    text: { en: "Are you a talented professional? Let’s connect.", es: "¿Eres un profesional talentoso? Conectemos." },
    icon: Users,
    href: { subject: { en: "Joining the Studio Base network", es: "Quiero unirme a la red de Studio Base" } },
    cta: { en: "Introduce yourself", es: "Preséntate" },
    rgb: "168,85,247",
    text_: "text-purple-400",
    border: "border-purple-500/50 hover:border-purple-500",
    glow: "bg-purple-500/25",
  },
  {
    id: "email",
    title: { en: "Email Us", es: "Escríbenos" },
    text: { en: "Send us a message any time.", es: "Envíanos un mensaje cuando quieras." },
    icon: Mail,
    href: {},
    cta: contact.email,
    rgb: "250,204,21",
    text_: "text-yellow-300",
    border: "border-yellow-400/50 hover:border-yellow-400",
    glow: "bg-yellow-400/25",
  },
  {
    id: "general",
    title: { en: "General Inquiries", es: "Consultas generales" },
    text: { en: "Partnerships, press or other questions.", es: "Alianzas, prensa u otras preguntas." },
    icon: FileText,
    href: { subject: { en: "General inquiry", es: "Consulta general" } },
    cta: { en: "Ask a question", es: "Haz una pregunta" },
    rgb: "236,72,153",
    text_: "text-pink-400",
    border: "border-pink-500/50 hover:border-pink-500",
    glow: "bg-pink-500/25",
  },
];

const grid: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const cardV: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};

export default function ConnectCards() {
  const { t, tr } = useLang();

  return (
    <section className="relative bg-black px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex items-center gap-3 text-[10px] tracking-[0.45em] text-zinc-400"
        >
          <span className="h-px w-8 bg-blue-500" />
          {tr("OTHER WAYS TO CONNECT", "OTRAS FORMAS DE CONTACTARNOS")}
        </motion.p>

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {cards.map((c, i) => {
            const Icon = c.icon;
            const href = typeof c.href === "string" ? c.href : mail(c.href.subject && t(c.href.subject));
            return (
              <motion.div key={c.id} variants={cardV} className="h-full">
                <TiltCard
                  tilt={6}
                  rgb={c.rgb}
                  className={`group h-full overflow-hidden rounded-xl border bg-[#07070a] transition-colors duration-500 ${c.border}`}
                  style={{ boxShadow: `0 0 40px -22px rgba(${c.rgb},0.7)` }}
                >
                  <a href={href} className="relative z-10 flex h-full flex-col p-6">
                    <span
                      className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 ${c.glow}`}
                    />
                    <motion.span
                      animate={{ y: [0, -5, 0], rotate: [0, -6, 6, 0] }}
                      transition={{ duration: 4, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                      className="w-fit"
                    >
                      <Icon size={30} strokeWidth={1.5} className={c.text_} style={{ filter: `drop-shadow(0 0 8px rgba(${c.rgb},0.7))` }} />
                    </motion.span>
                    <h3 className="mt-5 text-base font-semibold text-white">{t(c.title)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{t(c.text)}</p>
                    <span className={`mt-auto flex items-center gap-2 pt-6 text-xs font-semibold ${c.text_}`}>
                      <span className="truncate">{t(c.cta)}</span>
                      <ArrowRight size={14} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </a>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
