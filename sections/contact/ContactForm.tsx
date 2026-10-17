"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Boxes,
  BrainCircuit,
  Building2,
  Check,
  ChevronDown,
  Code2,
  Ellipsis,
  Heart,
  Lock,
  Mail,
  MessageSquare,
  ShieldCheck,
  Smartphone,
  Target,
  User,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { LightSweep, ShimmerText } from "@/components/Effects";
import { contact } from "@/data/site";

const EASE = [0.22, 1, 0.36, 1] as const;

// Options for "What are you interested in?"
const interests = [
  "AI Solutions & Automation",
  "Software Engineering",
  "Mobile Applications",
  "Digital Platforms",
  "Cybersecurity",
  "HCRM AI",
  "BaseLead AI",
  "Book a consultation",
  "Join the Studio Base network",
  "Other",
];

// Project type checkboxes (each with its own accent colour)
const projectTypes: { label: string; icon: LucideIcon; text: string; on: string; rgb: string }[] = [
  { label: "Website\nDevelopment", icon: Code2, text: "text-blue-400", on: "border-blue-500 bg-blue-500/10", rgb: "59,130,246" },
  { label: "Mobile\nApplication", icon: Smartphone, text: "text-purple-400", on: "border-purple-500 bg-purple-500/10", rgb: "168,85,247" },
  { label: "Custom\nSoftware", icon: Boxes, text: "text-cyan-400", on: "border-cyan-400 bg-cyan-400/10", rgb: "34,211,238" },
  { label: "AI Automation", icon: BrainCircuit, text: "text-yellow-300", on: "border-yellow-400 bg-yellow-400/10", rgb: "250,204,21" },
  { label: "Cybersecurity", icon: ShieldCheck, text: "text-pink-400", on: "border-pink-500 bg-pink-500/10", rgb: "236,72,153" },
  { label: "Other", icon: Ellipsis, text: "text-blue-400", on: "border-blue-500 bg-blue-500/10", rgb: "59,130,246" },
];

// Right-hand column
const promises = [
  { icon: Users, title: "CLIENTS WORLDWIDE", text: "We work with businesses across different industries and countries." },
  { icon: Zap, title: "RESPONSIVE TEAM", text: "We typically reply within 24 hours." },
  { icon: Heart, title: "EXCITING OPPORTUNITIES", text: "Whether you’re a client or a talented professional, we’re always open to new conversations." },
];

const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
};

const fieldBox =
  "group relative flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 transition-colors duration-300 focus-within:border-blue-500 focus-within:bg-blue-500/[0.06] focus-within:shadow-[0_0_30px_-10px_rgba(59,130,246,0.8)] hover:border-white/25";

function Field({ icon: Icon, children, error }: { icon: LucideIcon; children: ReactNode; error?: boolean }) {
  return (
    <motion.label variants={item} className={`${fieldBox} ${error ? "border-pink-500/70" : ""}`}>
      <Icon size={18} className="shrink-0 text-blue-400 transition-transform duration-300 group-focus-within:scale-110" />
      {children}
    </motion.label>
  );
}

const inputCls =
  "w-full bg-transparent py-4 text-sm text-white placeholder:text-zinc-400 focus:outline-none";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", interest: "", message: "" });
  const [types, setTypes] = useState<string[]>([]);
  const [tried, setTried] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const missing = {
    name: !form.name.trim(),
    email: !emailOk,
    interest: !form.interest,
    message: !form.message.trim(),
  };
  const valid = !Object.values(missing).some(Boolean);

  const toggleType = (t: string) =>
    setTypes((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  /* No server on this site: the message opens in the visitor's email
     app, addressed to the Studio Base inbox (contact.email in data/site.ts). */
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTried(true);
    if (!valid) return;
    const lines = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.company && `Company: ${form.company}`,
      `Interested in: ${form.interest}`,
      types.length > 0 && `Project type: ${types.map((t) => t.replace("\n", " ")).join(", ")}`,
      "",
      form.message,
    ].filter((l) => l !== false && l !== "") as string[];
    const subject = `New enquiry: ${form.interest} — ${form.name}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSent(true);
  };

  return (
    <section id="contact-form" className="relative scroll-mt-24 bg-black px-6 pb-16 lg:px-12">
      {/* drifting glows */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, 30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-0 top-10 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:-mt-20 lg:grid-cols-[1.45fr_1fr] lg:items-center lg:gap-14">
        {/* FORM CARD */}
        <motion.div
          initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: EASE }}
          className="relative z-10 overflow-hidden rounded-2xl border border-blue-500/50 bg-[#05070d]/90 p-6 shadow-[0_0_80px_-20px_rgba(59,130,246,0.6)] backdrop-blur-xl md:p-10"
        >
          {/* pulsing corner glow */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"
          />

          <p className="relative text-[10px] tracking-[0.45em] text-zinc-400">SEND US A MESSAGE</p>
          <h2 className="relative mt-3 text-2xl font-medium text-white md:text-4xl">
            Tell us about <ShimmerText>your project.</ShimmerText>
          </h2>

          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="relative mt-10 flex flex-col items-center rounded-xl border border-blue-500/40 bg-blue-500/[0.06] px-6 py-12 text-center"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-white shadow-[0_0_40px_rgba(59,130,246,0.8)]"
                >
                  <Check size={26} strokeWidth={3} />
                </motion.span>
                <h3 className="mt-5 text-xl font-semibold text-white">Almost there!</h3>
                <p className="mt-2 max-w-sm text-sm text-zinc-400">
                  Your email app has opened with your message ready to go. Just
                  press send and we&apos;ll get back to you soon. If it
                  didn&apos;t open, write to{" "}
                  <a href={`mailto:${contact.email}`} className="text-blue-400 underline-offset-4 hover:underline">
                    {contact.email}
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-white"
                >
                  Edit message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                noValidate
                onSubmit={submit}
                variants={list}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                exit={{ opacity: 0 }}
                className="relative mt-8 space-y-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field icon={User} error={tried && missing.name}>
                    <input className={inputCls} placeholder="Full Name *" autoComplete="name" value={form.name} onChange={set("name")} />
                  </Field>
                  <Field icon={Mail} error={tried && missing.email}>
                    <input className={inputCls} type="email" placeholder="Email Address *" autoComplete="email" value={form.email} onChange={set("email")} />
                  </Field>
                  <Field icon={Building2}>
                    <input className={inputCls} placeholder="Company (Optional)" autoComplete="organization" value={form.company} onChange={set("company")} />
                  </Field>
                  <Field icon={Target} error={tried && missing.interest}>
                    <select
                      className={`${inputCls} cursor-pointer appearance-none pr-6 ${form.interest ? "" : "text-zinc-400"}`}
                      value={form.interest}
                      onChange={set("interest")}
                    >
                      <option value="" disabled>
                        What are you interested in? *
                      </option>
                      {interests.map((o) => (
                        <option key={o} value={o} className="bg-zinc-900 text-white">
                          {o}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="pointer-events-none absolute right-4 text-blue-400" />
                  </Field>
                </div>

                <motion.label variants={item} className={`${fieldBox} items-start ${tried && missing.message ? "border-pink-500/70" : ""}`}>
                  <MessageSquare size={18} className="mt-4 shrink-0 text-blue-400" />
                  <textarea
                    rows={4}
                    className={`${inputCls} resize-y`}
                    placeholder="Tell us about your project or question * — share a few details about your goals, timeline, or any questions we can help with."
                    value={form.message}
                    onChange={set("message")}
                  />
                </motion.label>

                {tried && !valid && (
                  <p className="text-xs text-pink-400">Please fill in the fields marked with * (and a valid email).</p>
                )}

                {/* PROJECT TYPE */}
                <motion.p variants={item} className="pt-4 text-[10px] tracking-[0.35em] text-zinc-400">
                  PROJECT TYPE (OPTIONAL)
                </motion.p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {projectTypes.map((t) => {
                    const Icon = t.icon;
                    const on = types.includes(t.label);
                    return (
                      <motion.button
                        key={t.label}
                        type="button"
                        variants={item}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => toggleType(t.label)}
                        aria-pressed={on}
                        className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors duration-300 ${
                          on ? t.on : "border-white/10 bg-white/[0.02] hover:border-white/30"
                        }`}
                        style={on ? { boxShadow: `0 0 26px -8px rgba(${t.rgb},0.8)` } : undefined}
                      >
                        <Icon size={20} className={`shrink-0 ${t.text}`} />
                        <span className="flex-1 whitespace-pre-line text-xs font-medium leading-snug text-white">{t.label}</span>
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                            on ? "border-transparent bg-white text-black" : "border-white/30"
                          }`}
                        >
                          {on && <Check size={11} strokeWidth={3} />}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                <motion.div variants={item} className="flex flex-col gap-5 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    animate={{ boxShadow: ["0 0 0 0 rgba(59,130,246,0.5)", "0 0 0 18px rgba(59,130,246,0)"] }}
                    transition={{ boxShadow: { duration: 1.8, repeat: Infinity, ease: "easeOut" } }}
                    className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-blue-500 px-10 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-400"
                  >
                    <LightSweep />
                    <span className="relative">Send Message</span>
                    <ArrowRight size={16} className="relative transition-transform duration-300 group-hover:translate-x-1" />
                  </motion.button>
                  <p className="flex items-center gap-3 text-xs text-zinc-400">
                    <Lock size={18} className="text-blue-400" />
                    Your information is safe
                    <br className="hidden sm:block" /> and will never be shared.
                  </p>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* PROMISES */}
        <motion.ul
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="relative divide-y divide-white/10"
        >
          {promises.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.li key={p.title} variants={item} whileHover={{ x: 6 }} className="group flex gap-5 py-7">
                <motion.span
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  <span className="absolute inset-0 rounded-full bg-blue-500/30 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                  <Icon size={34} strokeWidth={1.4} className="relative text-blue-400" style={{ filter: "drop-shadow(0 0 8px rgba(59,130,246,0.7))" }} />
                </motion.span>
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-white transition-colors group-hover:text-blue-400">{p.title}</p>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-zinc-400">{p.text}</p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
