"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";

const options: { value: Lang; label: string; name: string }[] = [
  { value: "en", label: "EN", name: "English" },
  { value: "es", label: "ES", name: "Español" },
];

/** EN / ES switch with a sliding blue highlight. */
export default function LanguageToggle({
  layoutId = "lang-pill",
  className = "",
}: {
  layoutId?: string;
  className?: string;
}) {
  const { lang, setLang, tr } = useLang();

  return (
    <div
      role="group"
      aria-label={tr("Change language", "Cambiar idioma")}
      className={`relative flex items-center gap-0.5 rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-md ${className}`}
    >
      <Globe size={14} aria-hidden="true" className="ml-1.5 mr-0.5 hidden text-blue-400 xl:block" />
      {options.map((o) => {
        const active = lang === o.value;
        return (
          <button
            key={o.value}
            type="button"
            lang={o.value}
            aria-pressed={active}
            aria-label={o.name}
            title={o.name}
            onClick={() => setLang(o.value)}
            className="relative rounded-full px-2 py-1 text-xs font-semibold tracking-wider xl:px-2.5"
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
                className="absolute inset-0 rounded-full bg-blue-500 shadow-[0_0_14px_rgba(59,130,246,0.6)]"
              />
            )}
            <span
              className={`relative z-10 transition-colors duration-200 ${
                active ? "text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              {o.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
