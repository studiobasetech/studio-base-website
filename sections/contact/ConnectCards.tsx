"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, CalendarDays, FileText, Mail, Users, type LucideIcon } from "lucide-react";
import { TiltCard } from "@/components/Effects";
import { contact } from "@/data/site";

const EASE = [0.22, 1, 0.36, 1] as const;

type Card = {
  title: string;
  text: string;
  icon: LucideIcon;
  href: string;
  cta: string;
  rgb: string;
  text_: string;
  border: string;
  glow: string;
};

const mail = (subject: string) => `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`;

const cards: Card[] = [
  {
    title: "Book a Consultation",
    text: "Schedule a call with our team to discuss your project.",
    icon: CalendarDays,
    href: "#contact-form",
    cta: "Send a request",
    rgb: "59,130,246",
    text_: "text-blue-400",
    border: "border-blue-500/50 hover:border-blue-500",
    glow: "bg-blue-500/25",
  },
  {
    title: "Join Our Network",
    text: "Are you a talented professional? Let’s connect.",
    icon: Users,
    href: mail("Joining the Studio Base network"),
    cta: "Introduce yourself",
    rgb: "168,85,247",
    text_: "text-purple-400",
    border: "border-purple-500/50 hover:border-purple-500",
    glow: "bg-purple-500/25",
  },
  {
    title: "Email Us",
    text: "Send us a message any time.",
    icon: Mail,
    href: `mailto:${contact.email}`,
    cta: contact.email,
    rgb: "250,204,21",
    text_: "text-yellow-300",
    border: "border-yellow-400/50 hover:border-yellow-400",
    glow: "bg-yellow-400/25",
  },
  {
    title: "General Inquiries",
    text: "Partnerships, press or other questions.",
    icon: FileText,
    href: mail("General inquiry"),
    cta: "Ask a question",
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
          OTHER WAYS TO CONNECT
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
            return (
              <motion.div key={c.title} variants={cardV} className="h-full">
                <TiltCard
                  tilt={6}
                  rgb={c.rgb}
                  className={`group h-full overflow-hidden rounded-xl border bg-[#07070a] transition-colors duration-500 ${c.border}`}
                  style={{ boxShadow: `0 0 40px -22px rgba(${c.rgb},0.7)` }}
                >
                  <a href={c.href} className="relative z-10 flex h-full flex-col p-6">
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
                    <h3 className="mt-5 text-base font-semibold text-white">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{c.text}</p>
                    <span className={`mt-auto flex items-center gap-2 pt-6 text-xs font-semibold ${c.text_}`}>
                      <span className="truncate">{c.cta}</span>
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
