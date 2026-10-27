"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Boxes,
  BrainCircuit,
  Building2,
  Check,
  Code2,
  Ellipsis,
  Heart,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  Smartphone,
  User,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { LightSweep, ShimmerText } from "@/components/Effects";
import { contact } from "@/data/site";
import { useLang, type Bi } from "@/lib/i18n";
import EvaFormAssistant from "@/components/eva/EvaFormAssistant";
import type { FormFillHooks } from "@/components/eva/EvaProvider";
import type { ProjectTypeId } from "@/data/receptionist";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------
   FORM DELIVERY ENDPOINT (FormSubmit — https://formsubmit.co)
   The site is a static export on GitHub Pages (no server / API routes),
   so submissions are POSTed as JSON to FormSubmit's AJAX endpoint, which
   emails them to contact.email (info@studiobase.tech).

   IMPORTANT: the very first submission triggers an ACTIVATION email to
   info@studiobase.tech. Someone must click "Activate Form" in that email
   once; until then submissions are not delivered.

   After activation, FormSubmit shows a random-string alias for the inbox
   (e.g. https://formsubmit.co/ajax/<random-string>). Swap it in here so
   the email address isn't exposed in the page source.
   ------------------------------------------------------------------ */
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${contact.email}`;

type Status = "idle" | "sending" | "success" | "error";

// Eva (voice form filling) names project types by id → the checkbox they tick
const TYPE_BY_ID: Record<ProjectTypeId, string> = {
  web: "Website\nDevelopment",
  mobile: "Mobile\nApplication",
  software: "Custom\nSoftware",
  ai: "AI Automation",
  other: "Other",
};

// Project type checkboxes (each with its own accent colour)
const projectTypes: { label: Bi; icon: LucideIcon; text: string; on: string; rgb: string }[] = [
  { label: { en: "Website\nDevelopment", es: "Desarrollo\nde sitios web" }, icon: Code2, text: "text-blue-400", on: "border-blue-500 bg-blue-500/10", rgb: "59,130,246" },
  { label: { en: "Mobile\nApplication", es: "Aplicación\nmóvil" }, icon: Smartphone, text: "text-purple-400", on: "border-purple-500 bg-purple-500/10", rgb: "168,85,247" },
  { label: { en: "Custom\nSoftware", es: "Software\na la medida" }, icon: Boxes, text: "text-cyan-400", on: "border-cyan-400 bg-cyan-400/10", rgb: "34,211,238" },
  { label: { en: "AI Automation", es: "Automatización\ncon IA" }, icon: BrainCircuit, text: "text-yellow-300", on: "border-yellow-400 bg-yellow-400/10", rgb: "250,204,21" },
  { label: { en: "Other", es: "Otro" }, icon: Ellipsis, text: "text-pink-400", on: "border-pink-500 bg-pink-500/10", rgb: "236,72,153" },
];

// Right-hand column
const promises: { id: string; icon: LucideIcon; title: Bi; text: Bi }[] = [
  {
    id: "clients",
    icon: Users,
    title: { en: "CLIENTS WORLDWIDE", es: "CLIENTES EN TODO EL MUNDO" },
    text: {
      en: "We work with businesses across different industries and countries.",
      es: "Trabajamos con empresas de distintas industrias y países.",
    },
  },
  {
    id: "responsive",
    icon: Zap,
    title: { en: "RESPONSIVE TEAM", es: "RESPUESTA RÁPIDA" },
    text: { en: "We typically reply within 24 hours.", es: "Normalmente respondemos en menos de 24 horas." },
  },
  {
    id: "opportunities",
    icon: Heart,
    title: { en: "EXCITING OPPORTUNITIES", es: "OPORTUNIDADES EMOCIONANTES" },
    text: {
      en: "Whether you’re a client or a talented professional, we’re always open to new conversations.",
      es: "Ya seas cliente o un profesional talentoso, siempre estamos abiertos a nuevas conversaciones.",
    },
  },
];

const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
};

const fieldBox =
  "group relative flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 transition-colors duration-300 focus-within:border-blue-500 focus-within:bg-blue-500/[0.06] focus-within:shadow-[0_0_30px_-10px_rgba(59,130,246,0.8)] hover:border-white/25";

function Field({ icon: Icon, children, error, className = "" }: { icon: LucideIcon; children: ReactNode; error?: boolean; className?: string }) {
  return (
    <motion.label variants={item} className={`${fieldBox} ${error ? "border-pink-500/70" : ""} ${className}`}>
      <Icon size={18} className="shrink-0 text-blue-400 transition-transform duration-300 group-focus-within:scale-110" />
      {children}
    </motion.label>
  );
}

const inputCls =
  "w-full bg-transparent py-4 text-sm text-white placeholder:text-zinc-400 focus:outline-none";

export default function ContactForm() {
  const { t: tx, tr, lang } = useLang();
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [types, setTypes] = useState<string[]>([]);
  const [tried, setTried] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [honey, setHoney] = useState(""); // spam honeypot — real visitors never fill it
  // latest values, for sending from Eva (voice) as well as from the button
  const formRef = useRef(form);
  const typesRef = useRef(types);
  const honeyRef = useRef(honey);
  useEffect(() => {
    formRef.current = form;
    typesRef.current = types;
    honeyRef.current = honey;
  });
  const sent = status === "success";
  const sending = status === "sending";

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const missing = {
    name: !form.name.trim(),
    email: !emailOk,
    message: !form.message.trim(),
  };
  const valid = !Object.values(missing).some(Boolean);

  const toggleType = (t: string) =>
    setTypes((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  // English labels/values for the Studio Base team, whatever language the visitor uses
  const projectTypeText = types.map((t) => t.replace("\n", " ")).join(", ");
  const languageText = lang === "es" ? "Spanish" : "English";

  /* Fallback: open the visitor's email app with everything prefilled,
     addressed to the Studio Base inbox (contact.email in data/site.ts). */
  const mailtoHref = (() => {
    const lines = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.company && `Company: ${form.company}`,
      types.length > 0 && `Project type: ${projectTypeText}`,
      lang === "es" && "Language: Spanish",
      "",
      form.message,
    ].filter((l) => l !== false && l !== "") as string[];
    const subject = `New enquiry${projectTypeText ? `: ${projectTypeText}` : ""} — ${form.name}`;
    return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  })();

  /** sends the form; returns true when FormSubmit delivered it (used by the button and by Eva) */
  const deliver = async (): Promise<boolean> => {
    const f = formRef.current;
    const typeText = typesRef.current.map((t) => t.replace("\n", " ")).join(", ");
    setTried(true);
    if (!f.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email) || !f.message.trim()) return false;

    // Honeypot filled → almost certainly a bot: pretend it worked, send nothing.
    if (honeyRef.current) {
      setStatus("success");
      return true;
    }

    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          Name: f.name,
          Email: f.email,
          Company: f.company || "—",
          "Project type": typeText || "—",
          Message: f.message,
          Language: languageText,
          Page: typeof window !== "undefined" ? window.location.href : "",
          _subject: `New website inquiry — ${f.name}`,
          _template: "table",
          _captcha: "false",
          _replyto: f.email,
          _honey: honeyRef.current,
        }),
      });
      const data = (await res.json().catch(() => null)) as { success?: string | boolean; message?: string } | null;
      const ok = res.ok && (data?.success === true || data?.success === "true");
      // FormSubmit explains failures here (e.g. "This form needs Activation…"): visible in the browser console
      if (!ok) console.warn("Contact form not delivered:", res.status, data?.message ?? data);
      setStatus(ok ? "success" : "error");
      return ok;
    } catch {
      setStatus("error");
      return false;
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    void deliver();
  };

  // what Eva needs to fill the form in by voice
  const evaHooks: FormFillHooks = {
    setField: (field, value) => setForm((cur) => ({ ...cur, [field]: value })),
    setTypes: (ids) => setTypes((cur) => [...new Set([...cur, ...ids.map((id) => TYPE_BY_ID[id])])]),
    getEmail: () => formRef.current.email,
    send: deliver,
  };

  const reset = () => {
    setForm({ name: "", email: "", company: "", message: "" });
    setTypes([]);
    setTried(false);
    setStatus("idle");
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

          <p className="relative text-[10px] tracking-[0.45em] text-zinc-400">{tr("SEND US A MESSAGE", "ENVÍANOS UN MENSAJE")}</p>
          <h2 className="relative mt-3 text-2xl font-medium text-white md:text-4xl">
            {tr("Tell us about", "Cuéntanos sobre")} <ShimmerText>{tr("your project.", "tu proyecto.")}</ShimmerText>
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
                <h3 className="mt-5 text-xl font-semibold text-white">{tr("Message sent!", "¡Mensaje enviado!")}</h3>
                <p className="mt-2 max-w-sm text-sm text-zinc-400">
                  {tr(
                    "Thanks for reaching out. Our team will get back to you soon, usually within 24 hours. You can also write to us at",
                    "Gracias por escribirnos. Nuestro equipo te responderá pronto, normalmente en menos de 24 horas. También puedes escribirnos a",
                  )}{" "}
                  <a href={`mailto:${contact.email}`} className="break-all text-blue-400 underline-offset-4 hover:underline">
                    {contact.email}
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-white"
                >
                  {tr("Send another message", "Enviar otro mensaje")}
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
                {/* Honeypot (anti-spam): hidden from people and screen readers */}
                <input
                  type="text"
                  name="_honey"
                  value={honey}
                  onChange={(e) => setHoney(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden opacity-0"
                />
                <EvaFormAssistant hooks={evaHooks} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field icon={User} error={tried && missing.name}>
                    <input className={inputCls} placeholder={tr("Full Name *", "Nombre completo *")}
                      aria-label={tr("Full name (required)", "Nombre completo (obligatorio)")} autoComplete="name" value={form.name} onChange={set("name")} />
                  </Field>
                  <Field icon={Mail} error={tried && missing.email}>
                    <input className={inputCls} type="email" placeholder={tr("Email Address *", "Correo electrónico *")}
                      aria-label={tr("Email address (required)", "Correo electrónico (obligatorio)")} autoComplete="email" value={form.email} onChange={set("email")} />
                  </Field>
                  <Field icon={Building2} className="sm:col-span-2">
                    <input className={inputCls} placeholder={tr("Company (Optional)", "Empresa (opcional)")}
                      aria-label={tr("Company (optional)", "Empresa (opcional)")} autoComplete="organization" value={form.company} onChange={set("company")} />
                  </Field>
                </div>

                <motion.label variants={item} className={`${fieldBox} items-start ${tried && missing.message ? "border-pink-500/70" : ""}`}>
                  <MessageSquare size={18} className="mt-4 shrink-0 text-blue-400" />
                  <textarea
                    rows={4}
                    className={`${inputCls} resize-y`}
                    placeholder={tr(
                      "Tell us about your project or question * — share a few details about your goals, timeline, or any questions we can help with.",
                      "Cuéntanos sobre tu proyecto o pregunta * — tus objetivos, tiempos o cualquier duda en la que podamos ayudarte.",
                    )}
                    aria-label={tr("Your message (required)", "Tu mensaje (obligatorio)")}
                    value={form.message}
                    onChange={set("message")}
                  />
                </motion.label>

                {tried && !valid && (
                  <p className="text-xs text-pink-400">
                    {tr(
                      "Please fill in the fields marked with * (and a valid email).",
                      "Completa los campos marcados con * (y un correo electrónico válido).",
                    )}
                  </p>
                )}

                {/* PROJECT TYPE */}
                <motion.p variants={item} className="pt-4 text-[10px] tracking-[0.35em] text-zinc-400">
                  {tr("PROJECT TYPE (OPTIONAL)", "TIPO DE PROYECTO (OPCIONAL)")}
                </motion.p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {projectTypes.map((t) => {
                    const Icon = t.icon;
                    const on = types.includes(t.label.en);
                    return (
                      <motion.button
                        key={t.label.en}
                        type="button"
                        variants={item}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => toggleType(t.label.en)}
                        aria-pressed={on}
                        className={`flex min-w-0 items-center gap-2 rounded-xl border px-3 py-3.5 text-left transition-colors duration-300 sm:gap-3 sm:px-4 ${
                          on ? t.on : "border-white/10 bg-white/[0.02] hover:border-white/30"
                        }`}
                        style={on ? { boxShadow: `0 0 26px -8px rgba(${t.rgb},0.8)` } : undefined}
                      >
                        <Icon size={20} className={`shrink-0 ${t.text}`} />
                        <span className="min-w-0 flex-1 whitespace-pre-line text-xs font-medium leading-snug text-white">{tx(t.label)}</span>
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
                    disabled={sending}
                    aria-busy={sending}
                    whileHover={sending ? undefined : { scale: 1.05 }}
                    whileTap={sending ? undefined : { scale: 0.96 }}
                    animate={{ boxShadow: ["0 0 0 0 rgba(59,130,246,0.5)", "0 0 0 18px rgba(59,130,246,0)"] }}
                    transition={{ boxShadow: { duration: 1.8, repeat: Infinity, ease: "easeOut" } }}
                    className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-blue-500 px-10 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-400 disabled:cursor-wait disabled:opacity-80 disabled:hover:bg-blue-500"
                  >
                    <LightSweep />
                    {sending ? (
                      <>
                        <Loader2 size={16} className="relative animate-spin" />
                        <span className="relative">{tr("Sending…", "Enviando…")}</span>
                      </>
                    ) : (
                      <>
                        <span className="relative">{tr("Send Message", "Enviar mensaje")}</span>
                        <ArrowRight size={16} className="relative transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </motion.button>
                  <p className="flex items-center gap-3 text-xs text-zinc-400">
                    <Lock size={18} className="text-blue-400" />
                    {tr("Your information is safe", "Tu información está segura")}
                    <br className="hidden sm:block" /> {tr("and will never be shared.", "y nunca será compartida.")}
                  </p>
                </motion.div>

                {status === "error" && (
                  <motion.p
                    role="alert"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="rounded-xl border border-pink-500/40 bg-pink-500/[0.06] px-4 py-3 text-xs leading-relaxed text-pink-300"
                  >
                    {tr(
                      "Sorry, we couldn't send your message right now. Please try again in a moment, or",
                      "Lo sentimos, no pudimos enviar tu mensaje en este momento. Intenta de nuevo en un momento o",
                    )}{" "}
                    <a href={mailtoHref} className="font-semibold text-white underline underline-offset-4 hover:text-blue-300">
                      {tr("email us directly", "escríbenos directamente")}
                    </a>
                    .
                  </motion.p>
                )}
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
              <motion.li key={p.id} variants={item} whileHover={{ x: 6 }} className="group flex gap-5 py-7">
                <motion.span
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  <span className="absolute inset-0 rounded-full bg-blue-500/30 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                  <Icon size={34} strokeWidth={1.4} className="relative text-blue-400" style={{ filter: "drop-shadow(0 0 8px rgba(59,130,246,0.7))" }} />
                </motion.span>
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-white transition-colors group-hover:text-blue-400">{tx(p.title)}</p>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-zinc-400">{tx(p.text)}</p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
