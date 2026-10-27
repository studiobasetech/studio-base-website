"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useEva } from "./EvaProvider";
import EvaPanel from "./EvaPanel";

/* ------------------------------------------------------------------ */
/*  Floating "Talk to Eva" button, bottom-right on every page.          */
/*  Opens a compact call panel. It hides while the home page Eva        */
/*  section is on screen (same call, no need to show it twice).        */
/* ------------------------------------------------------------------ */

export default function EvaWidget() {
  const { tr } = useLang();
  const { widgetOpen, setWidgetOpen, sectionVisible, inCall, status } = useEva();
  const hidden = sectionVisible && !widgetOpen;

  // Escape minimizes the panel
  useEffect(() => {
    if (!widgetOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setWidgetOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [widgetOpen, setWidgetOpen]);

  return (
    <>
      <AnimatePresence>
        {widgetOpen && (
          <motion.div
            key="eva-panel"
            role="dialog"
            aria-label={tr("Eva, AI receptionist", "Eva, recepcionista IA")}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 bottom-24 z-[60] h-[min(560px,calc(100dvh-7.5rem))] origin-bottom-right overflow-hidden rounded-[24px] border border-white/10 bg-zinc-950/95 shadow-[0_30px_100px_-20px_rgba(59,130,246,0.55)] backdrop-blur-xl sm:inset-x-auto sm:right-6 sm:w-[390px] sm:h-[min(600px,calc(100dvh-8rem))]"
          >
            <EvaPanel compact onClose={() => setWidgetOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* launcher */}
      <div
        className={`fixed bottom-5 right-4 z-[60] flex items-center gap-3 transition-all duration-500 sm:bottom-6 sm:right-6 ${
          hidden ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"
        }`}
      >
        {!widgetOpen && (
          <button
            type="button"
            onClick={() => setWidgetOpen(true)}
            tabIndex={hidden ? -1 : 0}
            className="hidden items-center gap-2 rounded-full border border-white/10 bg-zinc-950/90 px-4 py-2.5 text-xs font-medium text-white shadow-[0_10px_30px_-10px_rgba(59,130,246,0.6)] backdrop-blur-md transition hover:border-blue-400/50 sm:flex"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            {inCall ? tr("On call with Eva", "En llamada con Eva") : tr("Talk to Eva · AI receptionist", "Habla con Eva · recepcionista IA")}
          </button>
        )}
        <button
          type="button"
          onClick={() => setWidgetOpen(!widgetOpen)}
          tabIndex={hidden ? -1 : 0}
          aria-label={widgetOpen ? tr("Minimize Eva", "Minimizar a Eva") : tr("Talk to Eva, our AI receptionist", "Habla con Eva, nuestra recepcionista IA")}
          aria-expanded={widgetOpen}
          className="group relative flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-black shadow-[0_10px_40px_-8px_rgba(59,130,246,0.85)] transition-transform hover:scale-105"
        >
          {widgetOpen ? (
            <X size={22} className="text-white" />
          ) : (
            <>
              {/* mini orb */}
              <span className="absolute inset-1.5 overflow-hidden rounded-full">
                <span
                  className={`absolute -inset-2 animate-spin rounded-full bg-[conic-gradient(from_0deg,#3b82f6,#22d3ee,#8b5cf6,#60a5fa,#3b82f6)] blur-md ${
                    status === "speaking" ? "[animation-duration:2s]" : "[animation-duration:6s]"
                  }`}
                />
                <span className="absolute inset-3 rounded-full bg-white/80 blur-[6px]" />
              </span>
              {inCall && <span className="absolute -right-0.5 -top-0.5 h-4 w-4 rounded-full border-2 border-black bg-green-400" />}
            </>
          )}
        </button>
      </div>
    </>
  );
}
