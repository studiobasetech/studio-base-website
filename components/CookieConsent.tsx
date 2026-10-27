"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  GA_MEASUREMENT_ID,
  disableAnalytics,
  readConsent,
  saveConsent,
  subscribeConsent,
  subscribeOpenSettings,
  type Consent,
} from "@/lib/analytics";
import { useLang } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Cookie notice for Google Analytics (the Google tag itself is in app/layout.tsx).
 * Analytics cookies are only allowed after the visitor clicks "Accept". The choice is saved
 * in the browser, and the footer's "Cookie settings" link reopens this notice.
 */
export default function CookieConsent({ measurementId = GA_MEASUREMENT_ID }: { measurementId?: string }) {
  const { tr } = useLang();
  const consent = useSyncExternalStore<Consent | null>(subscribeConsent, readConsent, () => null);
  const [mounted, setMounted] = useState(false);
  const [reopened, setReopened] = useState(false);

  // Wait one tick after loading so the notice slides in instead of flashing.
  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 900);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => subscribeOpenSettings(() => setReopened(true)), []);

  if (!measurementId) return null;

  const open = mounted && (consent === null || reopened);

  const choose = (value: Consent) => {
    // tell the Google tag (loaded in app/layout.tsx) what the visitor chose
    const g = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    g?.("consent", "update", { analytics_storage: value });
    if (value === "denied") disableAnalytics();
    saveConsent(value);
    setReopened(false);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-live="polite"
            aria-label={tr("Cookie notice", "Aviso de cookies")}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-x-4 bottom-4 z-[70] rounded-2xl border border-blue-500/30 bg-zinc-950/95 p-5 shadow-[0_20px_60px_-20px_rgba(59,130,246,0.45)] sm:inset-x-auto sm:left-6 sm:max-w-md"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-400">
                <Cookie size={18} aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">{tr("We value your privacy", "Respetamos tu privacidad")}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-300">
                  {tr(
                    "We'd like to use Google Analytics cookies to understand how visitors use our website and improve it. They're only turned on if you accept.",
                    "Nos gustaría usar cookies de Google Analytics para entender cómo se usa nuestro sitio web y mejorarlo. Solo se activan si las aceptas.",
                  )}{" "}
                  <Link href="/privacy" className="text-blue-400 underline-offset-2 hover:underline">
                    {tr("Privacy Policy", "Aviso de privacidad")}
                  </Link>
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => choose("denied")}
                className="rounded-full border border-white/20 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-blue-500 hover:text-blue-400"
              >
                {tr("Decline", "Rechazar")}
              </button>
              <button
                type="button"
                onClick={() => choose("granted")}
                className="rounded-full bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-400"
              >
                {tr("Accept", "Aceptar")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
