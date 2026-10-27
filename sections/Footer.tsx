"use client";

import Link from "next/link";
import ParticleField from "@/components/ParticleField";
import { contact, legalLinks, navLinks, socials } from "@/data/site";
import { useLang, type Bi } from "@/lib/i18n";
import { GA_MEASUREMENT_ID, openCookieSettings } from "@/lib/analytics";

// Every link here points to a real page or section.
const resources: { label: Bi; href: string }[] = [
  { label: { en: "Book a Consultation", es: "Agenda una consulta" }, href: "/contact#contact-form" },
  { label: { en: "Privacy Policy", es: "Aviso de privacidad" }, href: "/privacy" },
];

export default function Footer() {
  const { t, tr } = useLang();
  const liveSocials = socials.filter((s) => s.href && s.href !== "#");

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black px-6 py-16 lg:px-12">
      {/* Constellation effect: dots connect to each other and to the mouse */}
      <ParticleField density={0.6} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {/* BRAND */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/">
              <img
                src="/images/studio-base-logo-v2.png"
                alt="Studio Base"
                className="h-10 w-auto"
              />
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-zinc-400">
              {tr(
                "A tech firm building AI-powered products, custom software and digital infrastructure that help businesses automate, scale and grow.",
                "Una firma tecnológica que desarrolla productos con IA, software a la medida e infraestructura digital que ayudan a los negocios a automatizar, escalar y crecer.",
              )}
            </p>

            {/* Social icons are hidden until a real URL (not "#") is set in data/site.ts */}
            {liveSocials.length > 0 && (
              <div className="mt-6 flex gap-5 text-sm text-zinc-400">
                {liveSocials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-blue-500"
                  >
                    {s.short}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* NAVIGATION */}
          <div>
            <h3 className="text-sm font-semibold text-white">{tr("Navigation", "Navegación")}</h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-400 transition hover:text-blue-500"
                  >
                    {t(item.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="text-sm font-semibold text-white">{tr("Resources", "Recursos")}</h3>
            <ul className="mt-5 space-y-3">
              {resources.map((item) => (
                <li key={item.label.en}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-400 transition hover:text-blue-500"
                  >
                    {t(item.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-sm font-semibold text-white">{tr("Contact", "Contacto")}</h3>
            <a
              href={`mailto:${contact.email}`}
              className="mt-5 block text-sm text-zinc-400 transition hover:text-blue-500"
            >
              {contact.email}
            </a>
            <address className="mt-2 text-sm not-italic leading-relaxed text-zinc-400">
              {contact.address.street}
              <br />
              {contact.address.city}, {contact.address.region} {contact.address.zip}
            </address>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-zinc-400 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Studio Base. {tr("All rights reserved.", "Todos los derechos reservados.")}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-blue-500">
                {t(item.label)}
              </Link>
            ))}
            {GA_MEASUREMENT_ID && (
              <button type="button" onClick={openCookieSettings} className="transition hover:text-blue-500">
                {tr("Cookie settings", "Configuración de cookies")}
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
