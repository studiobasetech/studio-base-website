"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { CalendarCheck, Clock, Languages, Mic, MicOff, Phone, PhoneOff, Send } from "lucide-react";
import { ShimmerText } from "@/components/Effects";
import { contact } from "@/data/site";
import { useLang } from "@/lib/i18n";
import { CHIPS, LINES, initialState, reply, type ConvState, type Lead, type LineId } from "@/data/receptionist";

/* ------------------------------------------------------------------ */
/*  "Talk to our AI receptionist" — live voice demo on the home page.  */
/*  Voice clips: public/audio/ava/<en|es>/<line>.mp3                   */
/*  Conversation logic + wording: data/receptionist.ts                 */
/*  Booked consultations are emailed through FormSubmit (same as the   */
/*  contact form) to info@studiobase.tech.                             */
/* ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as const;
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${contact.email}`;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};

type Status = "idle" | "connecting" | "speaking" | "listening" | "thinking";
type Msg = { who: "ava" | "you"; text: string; id: number };

/* minimal typing for the browser speech recognition API */
type SRResult = { isFinal: boolean; 0: { transcript: string } };
type SREvent = { resultIndex: number; results: ArrayLike<SRResult> };
type SR = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((e: SREvent) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};
const getSR = (): (new () => SR) | null => {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: new () => SR; webkitSpeechRecognition?: new () => SR };
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
};

/* ------------------------------------------------------------------ */
/*  Siri-style orb (canvas). Reacts to Ava's voice level.              */
/* ------------------------------------------------------------------ */
function Orb({ level, status }: { level: React.MutableRefObject<number>; status: Status }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const statusRef = useRef(status);
  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let smooth = 0;
    let t0 = performance.now();
    const blobs = [
      { c: [59, 130, 246], r: 0.5, sp: 0.7, ph: 0 },
      { c: [34, 211, 238], r: 0.42, sp: -0.9, ph: 2.1 },
      { c: [139, 92, 246], r: 0.44, sp: 0.55, ph: 4.2 },
      { c: [96, 165, 250], r: 0.36, sp: -1.2, ph: 1.0 },
    ];
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      const dt = Math.min(0.05, (now - t0) / 1000);
      t0 = now;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const size = c.clientWidth;
      if (c.width !== Math.round(size * dpr)) {
        c.width = c.height = Math.round(size * dpr);
      }
      const S = c.width;
      const st = statusRef.current;
      const target = st === "speaking" ? level.current : st === "listening" ? 0.18 + 0.08 * Math.sin(now / 260) : st === "thinking" ? 0.12 : 0.05;
      smooth += (target - smooth) * Math.min(1, dt * 12);
      const t = now / 1000;
      ctx.clearRect(0, 0, S, S);
      ctx.globalCompositeOperation = "lighter";
      const base = S * (0.2 + smooth * 0.09);
      for (const b of blobs) {
        const a = t * b.sp + b.ph;
        const wob = (st === "speaking" ? 0.11 : st === "listening" ? 0.07 : 0.05) * S;
        const x = S / 2 + Math.cos(a) * wob * (0.6 + smooth);
        const y = S / 2 + Math.sin(a * 1.3) * wob * (0.6 + smooth);
        const r = base * (b.r / 0.42) * (1 + 0.35 * smooth * Math.sin(a * 2.3 + 1));
        const g = ctx.createRadialGradient(x, y, 0, x, y, r * 1.6);
        g.addColorStop(0, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0.85)`);
        g.addColorStop(0.45, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0.35)`);
        g.addColorStop(1, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r * 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      // bright core
      const core = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, base * 0.9);
      core.addColorStop(0, `rgba(255,255,255,${0.55 + smooth * 0.4})`);
      core.addColorStop(0.5, "rgba(191,219,254,0.25)");
      core.addColorStop(1, "rgba(191,219,254,0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(S / 2, S / 2, base * 0.9, 0, Math.PI * 2);
      ctx.fill();
      // listening ring
      if (st === "listening") {
        ctx.globalCompositeOperation = "source-over";
        const k = (t * 0.9) % 1;
        ctx.strokeStyle = `rgba(147,197,253,${0.45 * (1 - k)})`;
        ctx.lineWidth = S * 0.006;
        ctx.beginPath();
        ctx.arc(S / 2, S / 2, base * (1.25 + k * 0.9), 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [level]);

  return <canvas ref={ref} aria-hidden="true" className="h-full w-full" />;
}

/* ------------------------------------------------------------------ */

export default function AIReceptionist() {
  const { tr, t, lang } = useLang();
  const [status, setStatus] = useState<Status>("idle");
  const [inCall, setInCall] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [caption, setCaption] = useState<{ id: number; shown: number } | null>(null);
  const [interim, setInterim] = useState("");
  const [input, setInput] = useState("");
  const [micOn, setMicOn] = useState(true);
  const [micSupported, setMicSupported] = useState(false);
  const [step, setStep] = useState<ConvState["step"]>("chat");

  const conv = useRef<ConvState>(initialState());
  const audio = useRef<HTMLAudioElement | null>(null);
  const actx = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const level = useRef(0);
  const rec = useRef<SR | null>(null);
  const listening = useRef(false);
  const inCallRef = useRef(false);
  const micOnRef = useRef(true);
  const msgId = useRef(0);
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const langRef = useRef(lang);

  useEffect(() => {
    micOnRef.current = micOn;
  }, [micOn]);

  // keep the transcript scrolled to the latest line
  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [msgs, caption, interim]);

  const push = useCallback((who: Msg["who"], text: string) => {
    const id = ++msgId.current;
    setMsgs((m) => [...m, { who, text, id }]);
    return id;
  }, []);

  /* ---------- listening ---------- */
  const stopListening = useCallback(() => {
    listening.current = false;
    try {
      rec.current?.abort();
    } catch {
      /* not running */
    }
    setInterim("");
  }, []);

  const handleUserRef = useRef<(text: string) => void>(() => {});
  const startListeningRef = useRef<() => void>(() => {});

  const startListening = useCallback(() => {
    const Ctor = getSR();
    if (!Ctor || !inCallRef.current || !micOnRef.current) {
      setStatus("listening");
      return;
    }
    stopListening();
    const r = new Ctor();
    r.lang = langRef.current === "es" ? "es-US" : "en-US";
    r.interimResults = true;
    r.continuous = false;
    let finalText = "";
    r.onresult = (e) => {
      let txt = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        if (res.isFinal) finalText += res[0].transcript;
        else txt += res[0].transcript;
      }
      setInterim((finalText + " " + txt).trim());
    };
    r.onerror = (e) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        setMicOn(false);
        micOnRef.current = false;
      }
    };
    r.onend = () => {
      if (rec.current !== r) return;
      const said = finalText.trim();
      setInterim("");
      if (!listening.current) return;
      listening.current = false;
      if (said) handleUserRef.current(said);
      else if (inCallRef.current && micOnRef.current) {
        // silence: keep listening
        setTimeout(() => {
          if (inCallRef.current && !listening.current) startListeningRef.current();
        }, 250);
      }
    };
    rec.current = r;
    listening.current = true;
    setStatus("listening");
    try {
      r.start();
    } catch {
      listening.current = false;
    }
  }, [stopListening]);
  useEffect(() => {
    startListeningRef.current = startListening;
  }, [startListening]);

  /* ---------- speaking ---------- */
  const speak = useCallback(
    (id: LineId, after?: () => void) => {
      const text = LINES[id][langRef.current];
      const mid = push("ava", text);
      setCaption({ id: mid, shown: 0 });
      setStatus("speaking");
      stopListening();
      const a = audio.current;
      const done = () => {
        setCaption(null);
        level.current = 0;
        if (!inCallRef.current) return;
        if (after) after();
        else if (conv.current.step === "email") {
          setStatus("listening");
          inputRef.current?.focus({ preventScroll: true });
        } else startListening();
      };
      if (!a) return done();
      a.onended = done;
      a.onerror = done;
      a.ontimeupdate = () => {
        if (a.duration) setCaption({ id: mid, shown: Math.min(1, a.currentTime / (a.duration * 0.92)) });
      };
      a.src = `/audio/ava/${langRef.current}/${id}.mp3`;
      a.currentTime = 0;
      a.play().catch(done);
    },
    [push, startListening, stopListening],
  );

  /* ---------- call controls ---------- */
  const endCall = useCallback(() => {
    inCallRef.current = false;
    setInCall(false);
    stopListening();
    if (audio.current) {
      audio.current.onended = null;
      audio.current.pause();
    }
    setCaption(null);
    setStatus("idle");
    level.current = 0;
  }, [stopListening]);

  /* ---------- the conversation ---------- */
  const submitLead = useCallback(async (lead: Lead) => {
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          Name: lead.name,
          Email: lead.email,
          Message: lead.need,
          Source: "AI receptionist demo (home page)",
          Language: langRef.current === "es" ? "Spanish" : "English",
          _subject: `Consultation request (AI receptionist) — ${lead.name}`,
          _template: "table",
          _captcha: "false",
          _replyto: lead.email,
        }),
      });
      const data = (await res.json().catch(() => null)) as { success?: string | boolean } | null;
      return res.ok && (data?.success === true || data?.success === "true");
    } catch {
      return false;
    }
  }, []);

  const handleUser = useCallback(
    async (text: string) => {
      const said = text.trim();
      if (!said || !inCallRef.current) return;
      stopListening();
      audio.current?.pause();
      push("you", said);
      const r = reply(conv.current, said);
      conv.current = r.state;
      setStep(r.state.step);
      if (r.submit) {
        setStatus("thinking");
        const ok = await submitLead(r.submit);
        if (!inCallRef.current) return;
        speak(ok ? "booked" : "sendFail");
        return;
      }
      setStatus("thinking");
      setTimeout(() => {
        if (!inCallRef.current) return;
        if (r.end) speak(r.line, endCall);
        else speak(r.line);
      }, 350);
    },
    [push, speak, stopListening, submitLead, endCall],
  );
  useEffect(() => {
    handleUserRef.current = handleUser;
  }, [handleUser]);

  const startCall = useCallback(() => {
    langRef.current = lang;
    setMicSupported(!!getSR());
    if (!audio.current) {
      const a = new Audio();
      a.preload = "auto";
      audio.current = a;
      try {
        const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new Ctx();
        const src = ctx.createMediaElementSource(a);
        const an = ctx.createAnalyser();
        an.fftSize = 512;
        src.connect(an);
        an.connect(ctx.destination);
        actx.current = ctx;
        analyser.current = an;
      } catch {
        /* no Web Audio: the orb just breathes */
      }
    }
    actx.current?.resume().catch(() => {});
    conv.current = initialState();
    setStep("chat");
    setMsgs([]);
    setInput("");
    inCallRef.current = true;
    setInCall(true);
    setStatus("connecting");
    setTimeout(() => {
      if (inCallRef.current) speak("greet");
    }, 900);
  }, [lang, speak]);

  // voice level for the orb
  useEffect(() => {
    let raf = 0;
    const buf = new Uint8Array(256);
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const an = analyser.current;
      if (!an || status !== "speaking") return;
      an.getByteTimeDomainData(buf);
      let sum = 0;
      for (let i = 0; i < buf.length; i++) {
        const v = (buf[i] - 128) / 128;
        sum += v * v;
      }
      level.current = Math.min(1, Math.sqrt(sum / buf.length) * 4.5);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [status]);

  // a language switch hangs up (the voice and recognition are per language)
  useEffect(() => {
    if (langRef.current !== lang) {
      langRef.current = lang;
      if (inCallRef.current) endCall();
      setMsgs([]);
    }
  }, [lang, endCall]);

  // hang up when the component unmounts
  useEffect(
    () => () => {
      inCallRef.current = false;
      try {
        rec.current?.abort();
      } catch {
        /* ignore */
      }
      audio.current?.pause();
      actx.current?.close().catch(() => {});
    },
    [],
  );

  const toggleMic = () => {
    const next = !micOn;
    setMicOn(next);
    micOnRef.current = next;
    if (!next) {
      stopListening();
      if (status === "listening") setStatus("listening");
    } else if (inCall && status === "listening") startListening();
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = input.trim();
    if (!v) return;
    setInput("");
    void handleUser(v);
  };

  const statusText: Record<Status, string> = {
    idle: tr("Ready when you are", "Lista cuando tú lo estés"),
    connecting: tr("Connecting…", "Conectando…"),
    speaking: tr("Ava is speaking", "Ava está hablando"),
    listening: micSupported && micOn ? tr("Listening… go ahead", "Te escucho… adelante") : tr("Type your message", "Escribe tu mensaje"),
    thinking: tr("One moment…", "Un momento…"),
  };

  const placeholder =
    step === "email"
      ? tr("you@company.com", "tu@empresa.com")
      : step === "name"
        ? tr("Your name", "Tu nombre")
        : tr("Type a message…", "Escribe un mensaje…");

  return (
    <section id="ai-receptionist" className="relative overflow-hidden bg-black px-6 py-24 lg:px-12">
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
              "Meet Ava. She answers questions about Studio Base and books consultations, by voice, in English or Spanish. This is the kind of AI agent we build for businesses: one that picks up every call, day or night, and never lets a lead slip away.",
              "Conoce a Ava. Responde preguntas sobre Studio Base y agenda consultas, por voz, en inglés o en español. Este es el tipo de agente de IA que creamos para los negocios: uno que contesta cada llamada, de día o de noche, y nunca deja ir a un cliente.",
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
          className="relative rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-5 shadow-[0_0_120px_-40px_rgba(59,130,246,0.7)] backdrop-blur-xl sm:p-7"
        >
          {/* header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-semibold text-white">
                A
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Ava</p>
                <p className="text-xs text-zinc-400">{tr("AI Receptionist · Studio Base", "Recepcionista IA · Studio Base")}</p>
              </div>
            </div>
            <span
              className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.2em] ${
                inCall ? "border-green-400/30 bg-green-400/10 text-green-300" : "border-white/10 bg-white/5 text-zinc-400"
              }`}
            >
              {inCall ? tr("On call", "En llamada") : tr("Available", "Disponible")}
            </span>
          </div>

          {/* orb */}
          <div className="relative mx-auto mt-4 h-44 w-44 sm:h-52 sm:w-52">
            <Orb level={level} status={status} />
          </div>
          <p aria-live="polite" className="text-center text-sm text-blue-200">
            {statusText[status]}
          </p>

          {/* transcript */}
          <div
            ref={scroller}
            className="mt-5 h-56 space-y-3 overflow-y-auto rounded-2xl border border-white/5 bg-black/30 p-4 [scrollbar-width:thin]"
          >
            {msgs.length === 0 && (
              <p className="pt-16 text-center text-sm text-zinc-400">
                {tr("Start the call and say hello to Ava.", "Inicia la llamada y saluda a Ava.")}
              </p>
            )}
            {msgs.map((m) => {
              const isCap = caption && caption.id === m.id;
              const words = m.text.split(" ");
              const shownText = isCap ? words.slice(0, Math.max(1, Math.ceil(words.length * caption.shown))).join(" ") : m.text;
              return (
                <div key={m.id} className={`flex ${m.who === "you" ? "justify-end" : "justify-start"}`}>
                  <p
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.who === "you" ? "rounded-br-md bg-blue-500 text-white" : "rounded-bl-md bg-white/[0.07] text-zinc-200"
                    }`}
                  >
                    {shownText}
                  </p>
                </div>
              );
            })}
            {interim && (
              <div className="flex justify-end">
                <p className="max-w-[85%] rounded-2xl rounded-br-md border border-blue-400/30 bg-blue-500/10 px-4 py-2.5 text-sm italic text-blue-100">
                  {interim}
                </p>
              </div>
            )}
          </div>

          {/* quick replies */}
          {inCall && step === "chat" && (
            <div className="mt-4 flex flex-wrap gap-2">
              {CHIPS.map((c) => (
                <button
                  key={c.label.en}
                  type="button"
                  onClick={() => void handleUser(t(c.say))}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-zinc-300 transition hover:border-blue-400/50 hover:text-white"
                >
                  {t(c.label)}
                </button>
              ))}
            </div>
          )}

          {/* controls */}
          {!inCall ? (
            <button
              type="button"
              onClick={startCall}
              className="group mt-5 flex w-full items-center justify-center gap-2.5 rounded-full bg-blue-500 px-6 py-4 text-sm font-semibold text-white shadow-[0_10px_40px_-10px_rgba(59,130,246,0.8)] transition hover:bg-blue-400"
            >
              <Phone size={17} className="transition-transform group-hover:-rotate-12" />
              {tr("Start a call with Ava", "Llamar a Ava")}
            </button>
          ) : (
            <div className="mt-4 flex items-center gap-2">
              {micSupported && (
                <button
                  type="button"
                  onClick={toggleMic}
                  aria-label={micOn ? tr("Mute microphone", "Silenciar micrófono") : tr("Turn on microphone", "Activar micrófono")}
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition ${
                    micOn ? "border-blue-400/40 bg-blue-500/15 text-blue-200" : "border-white/10 bg-white/5 text-zinc-400"
                  }`}
                >
                  {micOn ? <Mic size={17} /> : <MicOff size={17} />}
                </button>
              )}
              <form onSubmit={onSubmit} className="flex min-w-0 flex-1 items-center rounded-full border border-white/10 bg-black/40 pl-4 pr-1.5 focus-within:border-blue-400/50">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  type={step === "email" ? "email" : "text"}
                  inputMode={step === "email" ? "email" : "text"}
                  autoComplete={step === "email" ? "email" : step === "name" ? "name" : "off"}
                  placeholder={placeholder}
                  aria-label={placeholder}
                  className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label={tr("Send", "Enviar")}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white transition hover:bg-blue-400"
                >
                  <Send size={14} />
                </button>
              </form>
              <button
                type="button"
                onClick={endCall}
                aria-label={tr("End call", "Colgar")}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-500/90 text-white transition hover:bg-red-500"
              >
                <PhoneOff size={17} />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
