"use client";

import { CalendarCheck } from "lucide-react";
import { CAL_LINK } from "@/lib/integrations";
import { useLang } from "@/lib/i18n";

/**
 * "Pick a time" — the Cal.com booking calendar, embedded on the contact page.
 * Hidden until CAL_LINK is filled in (lib/integrations.ts).
 */
export default function BookingCalendar() {
  const { tr, lang } = useLang();
  if (!CAL_LINK) return null;

  const src = `https://cal.com/${CAL_LINK}?embed=true&theme=dark&layout=month_view&locale=${lang}`;

  return (
    <section id="book" className="relative scroll-mt-24 bg-black px-6 pb-20 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10">
            <CalendarCheck size={18} className="text-blue-400" />
          </span>
          <div>
            <h2 className="text-2xl font-medium text-white md:text-3xl">
              {tr("Prefer to pick a time?", "¿Prefieres elegir un horario?")}
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              {tr(
                "Book your free consultation directly in our calendar. You'll get a confirmation by email.",
                "Agenda tu consulta gratis directamente en nuestro calendario. Recibirás la confirmación por correo.",
              )}
            </p>
          </div>
        </div>
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">
          <iframe
            src={src}
            title={tr("Book a free consultation", "Agenda una consulta gratis")}
            loading="lazy"
            className="h-[720px] w-full"
          />
        </div>
      </div>
    </section>
  );
}
