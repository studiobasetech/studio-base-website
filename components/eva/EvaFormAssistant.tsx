"use client";

import { useSyncExternalStore } from "react";
import { Mic, MicOff, PhoneOff } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { speechSupported, useEva, type FormFillHooks } from "./EvaProvider";
import { EvaOrb } from "./EvaPanel";

/* ------------------------------------------------------------------ */
/*  "Fill it out with Eva" — on the contact form. Eva asks each        */
/*  question out loud and types the answers into the form; the visitor */
/*  reviews it and says "send" (or presses Send Message).              */
/*  Only shown in browsers that can listen (Chrome, Edge, Safari).     */
/* ------------------------------------------------------------------ */

const noSubscribe = () => () => {};

export default function EvaFormAssistant({ hooks }: { hooks: FormFillHooks }) {
  const { tr } = useLang();
  const eva = useEva();
  const supported = useSyncExternalStore(noSubscribe, speechSupported, () => false);
  const active = eva.mode === "form" && eva.inCall;

  if (!supported) return null;

  if (!active) {
    return (
      <button
        type="button"
        onClick={() => eva.startFormFill(hooks)}
        className="group flex w-full items-center gap-4 rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-500/[0.12] via-blue-500/[0.05] to-transparent p-4 text-left transition hover:border-blue-400/60"
      >
        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/15 bg-black">
          <span className="absolute -inset-2 animate-spin rounded-full bg-[conic-gradient(from_0deg,#3b82f6,#22d3ee,#8b5cf6,#60a5fa,#3b82f6)] blur-md [animation-duration:6s]" />
          <span className="absolute inset-3 rounded-full bg-white/80 blur-[6px]" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-white">
            {tr("Prefer to talk? Fill it out with Eva", "¿Prefieres hablar? Llénalo con Eva")}
          </span>
          <span className="mt-0.5 block text-xs leading-relaxed text-zinc-400">
            {tr(
              "Our AI receptionist asks the questions and types your answers in. You review, then send.",
              "Nuestra recepcionista de IA te hace las preguntas y escribe tus respuestas. Tú revisas y envías.",
            )}
          </span>
        </span>
        <Mic size={18} className="shrink-0 text-blue-400 transition-transform group-hover:scale-110" />
      </button>
    );
  }

  const lastEva = [...eva.msgs].reverse().find((m) => m.who === "eva");
  let evaText = lastEva?.text ?? "";
  if (lastEva && eva.caption?.id === lastEva.id) {
    const words = lastEva.text.split(" ");
    evaText = words.slice(0, Math.max(1, Math.ceil(words.length * eva.caption.shown))).join(" ");
  }
  const statusText =
    eva.status === "listening"
      ? eva.micOn
        ? tr("Listening… go ahead", "Te escucho… adelante")
        : tr("Microphone off: type in the form", "Micrófono apagado: escribe en el formulario")
      : eva.status === "speaking"
        ? tr("Eva is speaking", "Eva está hablando")
        : tr("One moment…", "Un momento…");

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center gap-3 rounded-2xl border border-blue-500/40 bg-blue-500/[0.08] p-3 shadow-[0_0_40px_-15px_rgba(59,130,246,0.8)] sm:gap-4 sm:p-4"
    >
      <div className="relative h-14 w-14 shrink-0 sm:h-16 sm:w-16">
        <EvaOrb level={eva.level} status={eva.status} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-[0.25em] text-blue-300">{statusText}</p>
        <p className="mt-1 text-sm leading-snug text-white">{evaText}</p>
        {eva.interim && <p className="mt-1 truncate text-xs italic text-blue-200">“{eva.interim}”</p>}
      </div>
      <button
        type="button"
        onClick={eva.toggleMic}
        aria-label={eva.micOn ? tr("Mute microphone", "Silenciar micrófono") : tr("Turn on microphone", "Activar micrófono")}
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition ${
          eva.micOn ? "border-blue-400/40 bg-blue-500/15 text-blue-200" : "border-white/10 bg-white/5 text-zinc-400"
        }`}
      >
        {eva.micOn ? <Mic size={16} /> : <MicOff size={16} />}
      </button>
      <button
        type="button"
        onClick={eva.endCall}
        aria-label={tr("Stop Eva", "Detener a Eva")}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/90 text-white transition hover:bg-red-500"
      >
        <PhoneOff size={16} />
      </button>
    </div>
  );
}
