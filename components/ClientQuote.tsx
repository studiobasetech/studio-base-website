"use client";

import { Quote, Star } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";
import { tones } from "@/sections/about/palette";
import { useLang, type Text } from "@/lib/i18n";

/**
 * One client review as a compact card, in the same style as the Home
 * carousel (dark card, tone colour, 5 stars, initials avatar).
 * The quote is always shown in full, exactly as written.
 *
 *   <ClientQuote testimonial={getTestimonial("lc")!} chip={{ en: "Application Development", es: "Desarrollo de aplicaciones" }} />
 */
export default function ClientQuote({
  testimonial: item,
  chip,
  compact = false,
  className = "",
}: {
  testimonial: Testimonial;
  /** Optional small label at the top, e.g. the related service */
  chip?: Text;
  /** Smaller padding and text (for slim rows) */
  compact?: boolean;
  className?: string;
}) {
  const { t, tr } = useLang();
  const c = tones[item.tone];

  return (
    <figure
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-[#07070a] transition-colors duration-500 ${c.border} ${c.borderHover} ${
        compact ? "p-5" : "p-6 md:p-7"
      } ${className}`}
      style={{
        boxShadow: `0 0 40px -26px rgba(${c.rgb},0.7)`,
        backgroundImage: `radial-gradient(circle at 100% 0%, rgba(${c.rgb},0.14), transparent 45%)`,
      }}
    >
      <Quote
        size={compact ? 32 : 40}
        aria-hidden
        className={`pointer-events-none absolute right-5 top-5 opacity-10 ${c.text}`}
      />

      {chip && (
        <span
          className={`relative mb-4 inline-flex w-fit max-w-[85%] items-center rounded-full border bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase leading-snug tracking-[0.15em] ${c.border} ${c.text}`}
        >
          {t(chip)}
        </span>
      )}

      <div
        className="relative flex gap-1"
        role="img"
        aria-label={tr(`${item.rating} out of 5 stars`, `${item.rating} de 5 estrellas`)}
      >
        {Array.from({ length: item.rating }).map((_, s) => (
          <Star key={s} size={compact ? 14 : 16} className="fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      <blockquote
        className={`relative mt-4 flex-1 leading-relaxed text-zinc-200 ${compact ? "text-sm" : "text-[15px]"}`}
      >
        &ldquo;{t(item.quote)}&rdquo;
      </blockquote>

      <figcaption className="relative mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
        <span
          className={`flex shrink-0 items-center justify-center rounded-full border-2 bg-black font-bold ${c.border} ${c.text} ${
            compact ? "h-10 w-10 text-xs" : "h-12 w-12 text-sm"
          }`}
          style={{ boxShadow: `0 0 14px -5px rgba(${c.rgb},0.8)` }}
        >
          {item.initials}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white">{item.initials}</p>
          <p className="text-xs leading-snug text-zinc-400">
            {t(item.industry)} <span className="text-zinc-600">·</span>{" "}
            <span className={c.text}>{t(item.service)}</span>
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
