"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Phone, PhoneOff, Send, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { CHIPS } from "@/data/receptionist";
import { useEva, type EvaStatus } from "./EvaProvider";

/* ------------------------------------------------------------------ */
/*  Siri-style orb (canvas). Reacts to Eva's voice level and pauses    */
/*  itself while off screen.                                           */
/* ------------------------------------------------------------------ */
export function EvaOrb({ level, status }: { level: React.MutableRefObject<number>; status: EvaStatus }) {
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
    let onScreen = true;
    let smooth = 0;
    let t0 = performance.now();
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      if (onScreen && !raf) raf = requestAnimationFrame(draw);
    });
    io.observe(c);
    const blobs = [
      { c: [59, 130, 246], r: 0.5, sp: 0.7, ph: 0 },
      { c: [34, 211, 238], r: 0.42, sp: -0.9, ph: 2.1 },
      { c: [139, 92, 246], r: 0.44, sp: 0.55, ph: 4.2 },
      { c: [96, 165, 250], r: 0.36, sp: -1.2, ph: 1.0 },
    ];
    function draw(now: number) {
      if (!onScreen || !c || !ctx) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(draw);
      const dt = Math.min(0.05, (now - t0) / 1000);
      t0 = now;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const size = c.clientWidth;
      if (c.width !== Math.round(size * dpr)) c.width = c.height = Math.round(size * dpr);
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
      const core = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, base * 0.9);
      core.addColorStop(0, `rgba(255,255,255,${0.55 + smooth * 0.4})`);
      core.addColorStop(0.5, "rgba(191,219,254,0.25)");
      core.addColorStop(1, "rgba(191,219,254,0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(S / 2, S / 2, base * 0.9, 0, Math.PI * 2);
      ctx.fill();
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
    }
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [level]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="h-full w-full [mask-image:radial-gradient(circle,black_42%,transparent_70%)]"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  The call panel: used big in the home page section and compact in   */
/*  the floating widget. Both show the same call.                      */
/* ------------------------------------------------------------------ */
export default function EvaPanel({ compact = false, onClose }: { compact?: boolean; onClose?: () => void }) {
  const { tr, t } = useLang();
  const eva = useEva();
  const { status, inCall, msgs, caption, interim, micOn, micSupported, step, level } = eva;
  const [input, setInput] = useState("");
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { registerInput } = eva;

  useEffect(() => {
    registerInput(inputRef.current);
  });
  useEffect(() => () => registerInput(null), [registerInput]);

  // keep the transcript scrolled to the latest line
  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [msgs, caption, interim]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = input.trim();
    if (!v) return;
    setInput("");
    eva.send(v);
  };

  const statusText: Record<EvaStatus, string> = {
    idle: tr("Ready when you are", "Lista cuando tú lo estés"),
    connecting: tr("Connecting…", "Conectando…"),
    speaking: tr("Eva is speaking", "Eva está hablando"),
    listening: micSupported && micOn ? tr("Listening… go ahead", "Te escucho… adelante") : tr("Type your message", "Escribe tu mensaje"),
    thinking: tr("One moment…", "Un momento…"),
  };

  const placeholder =
    step === "email" ? tr("you@company.com", "tu@empresa.com") : step === "name" ? tr("Your name", "Tu nombre") : tr("Type a message…", "Escribe un mensaje…");

  return (
    <div className={compact ? "flex h-full flex-col p-4" : "p-5 sm:p-7"}>
      {/* header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-semibold text-white">
            E
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">Eva</p>
            <p className="truncate text-xs text-zinc-400">{tr("AI Receptionist · Studio Base", "Recepcionista IA · Studio Base")}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span
            className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.2em] ${
              inCall ? "border-green-400/30 bg-green-400/10 text-green-300" : "border-white/10 bg-white/5 text-zinc-400"
            }`}
          >
            {inCall ? tr("On call", "En llamada") : tr("Available", "Disponible")}
          </span>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label={tr("Minimize", "Minimizar")}
              className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition hover:bg-white/10 hover:text-white"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* orb */}
      <div className={`relative mx-auto ${compact ? "mt-1 h-24 w-24" : "mt-4 h-44 w-44 sm:h-52 sm:w-52"}`}>
        <EvaOrb level={level} status={status} />
      </div>
      <p aria-live="polite" className="text-center text-sm text-blue-200">
        {statusText[status]}
      </p>

      {/* transcript */}
      <div
        ref={scroller}
        className={`space-y-3 overflow-y-auto rounded-2xl border border-white/5 bg-black/30 p-4 [scrollbar-width:thin] ${
          compact ? "mt-3 min-h-0 flex-1" : "mt-5 h-56"
        }`}
      >
        {msgs.length === 0 && (
          <p className={`text-center text-sm text-zinc-400 ${compact ? "pt-6" : "pt-16"}`}>
            {tr("Start the call and say hello to Eva.", "Inicia la llamada y saluda a Eva.")}
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
        <div className={`flex flex-wrap gap-2 ${compact ? "mt-3" : "mt-4"}`}>
          {CHIPS.map((c) => (
            <button
              key={c.label.en}
              type="button"
              onClick={() => eva.send(t(c.say))}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-300 transition hover:border-blue-400/50 hover:text-white"
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
          onClick={eva.startCall}
          className={`group flex w-full items-center justify-center gap-2.5 rounded-full bg-blue-500 px-6 text-sm font-semibold text-white shadow-[0_10px_40px_-10px_rgba(59,130,246,0.8)] transition hover:bg-blue-400 ${
            compact ? "mt-3 py-3" : "mt-5 py-4"
          }`}
        >
          <Phone size={17} className="transition-transform group-hover:-rotate-12" />
          {tr("Start a call with Eva", "Llamar a Eva")}
        </button>
      ) : (
        <div className={`flex items-center gap-2 ${compact ? "mt-3" : "mt-4"}`}>
          {micSupported && (
            <button
              type="button"
              onClick={eva.toggleMic}
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
            onClick={eva.endCall}
            aria-label={tr("End call", "Colgar")}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-500/90 text-white transition hover:bg-red-500"
          >
            <PhoneOff size={17} />
          </button>
        </div>
      )}
    </div>
  );
}
