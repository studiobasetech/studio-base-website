"use client";

import Link from "@/components/LangLink";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { contact } from "@/data/site";
import { useLang } from "@/lib/i18n";
import { LEGAL_ENTITY, PRIVACY_EFFECTIVE, PRIVACY_SECTIONS as sections, PRIVACY_UPDATED } from "@/data/privacy";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function PrivacyPolicy() {
  const { t, tr } = useLang();

  return (
    <section className="relative overflow-hidden bg-black px-6 pb-24 pt-32 lg:px-12 lg:pt-40">
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-blue-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute -left-32 top-1/2 h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="flex items-center gap-3 text-[10px] tracking-[0.45em] text-zinc-400">
            <span className="h-px w-8 bg-blue-500" />
            {tr("LEGAL", "LEGAL")}
          </p>
          <h1 className="mt-4 flex items-center gap-4 text-4xl font-medium leading-tight text-white md:text-5xl">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-500/40 bg-blue-500/10 text-blue-400">
              <ShieldCheck size={24} />
            </span>
            {tr("Privacy Policy", "Aviso de privacidad")}
          </h1>
          <p className="mt-4 text-sm text-zinc-400">
            {tr("Effective date:", "Fecha de entrada en vigor:")} {t(PRIVACY_EFFECTIVE)} · {tr("Last updated:", "Última actualización:")} {t(PRIVACY_UPDATED)}
          </p>
          <p className="mt-6 text-base leading-relaxed text-zinc-300">
            {tr(
              "Your privacy matters to us. This policy explains what personal information we collect through this website, how we use and share it, and the choices and rights you have.",
              "Su privacidad nos importa. Este aviso explica qué datos personales recabamos a través de este sitio web, cómo los utilizamos y compartimos, y las opciones y derechos que usted tiene.",
            )}
          </p>
        </motion.div>

        <div className="mt-12 space-y-10 border-t border-white/10 pt-10">
          {sections.map((s) => (
            <motion.article
              key={s.id}
              id={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="scroll-mt-28"
            >
              <h2 className="text-xl font-medium text-white md:text-2xl">{t(s.title)}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="mt-3 text-sm leading-relaxed text-zinc-400 md:text-base">
                  {t(p)}
                </p>
              ))}
              {s.list && (
                <ul className="mt-4 space-y-2">
                  {s.list.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-zinc-400 md:text-base">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                      <span>{t(item)}</span>
                    </li>
                  ))}
                </ul>
              )}
              {s.after?.map((p, i) => (
                <p key={i} className="mt-4 text-sm leading-relaxed text-zinc-400 md:text-base">
                  {t(p)}
                </p>
              ))}
            </motion.article>
          ))}

          {/* CONTACT */}
          <motion.article
            id="contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="scroll-mt-28 rounded-2xl border border-blue-500/40 bg-blue-500/[0.06] p-6 shadow-[0_0_40px_-20px_rgba(59,130,246,0.8)] md:p-8"
          >
            <h2 className="text-xl font-medium text-white md:text-2xl">{tr("14. Contact", "14. Contacto")}</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400 md:text-base">
              {tr(
                "For questions about this Policy or to make a privacy request, contact:",
                "Para preguntas sobre este Aviso o para presentar una solicitud de privacidad, contacte a:",
              )}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-zinc-300 md:text-base">
              {LEGAL_ENTITY} / Studio Base
              <br />
              {contact.address.street}
              <br />
              {contact.address.city}, {contact.address.region} {contact.address.zip}
              <br />
              <a href={`mailto:${contact.email}`} className="break-all text-blue-400 transition hover:text-blue-300">
                {contact.email}
              </a>
              <br />
              <a href="https://studiobase.tech/" className="text-blue-400 transition hover:text-blue-300">
                https://studiobase.tech/
              </a>
            </p>
            <Link
              href="/contact#contact-form"
              className="mt-6 inline-flex rounded-full border border-blue-500 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-blue-500"
            >
              {tr("Go to the contact form", "Ir al formulario de contacto")}
            </Link>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
