"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { contact } from "@/data/site";
import { useLang, type Bi } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Privacy policy content. Each section has a title, paragraphs and an
 * optional bullet list, in English and Spanish. Update "lastUpdated" and
 * the relevant section whenever something changes (e.g. analytics added).
 */
const lastUpdated: Bi = { en: "October 2026", es: "octubre de 2026" };

type Section = { id: string; title: Bi; body: Bi[]; list?: Bi[]; after?: Bi[] };

const sections: Section[] = [
  {
    id: "who-we-are",
    title: { en: "1. Who we are", es: "1. Quiénes somos" },
    body: [
      {
        en: "Studio Base is a technology and creative studio based in Austin, TX. This policy explains what information we collect through this website, how we use it and the choices you have. When we say “we”, “us” or “our”, we mean Studio Base.",
        es: "Studio Base es un estudio de tecnología y creatividad con sede en Austin, TX. Esta política explica qué información recopilamos a través de este sitio web, cómo la usamos y qué opciones tienes. Cuando decimos “nosotros” o “nuestro”, nos referimos a Studio Base.",
      },
    ],
  },
  {
    id: "information-we-collect",
    title: { en: "2. Information we collect", es: "2. Información que recopilamos" },
    body: [
      {
        en: "We collect the information you choose to send us through the contact form:",
        es: "Recopilamos la información que decides enviarnos a través del formulario de contacto:",
      },
    ],
    list: [
      { en: "Your name", es: "Tu nombre" },
      { en: "Your email address", es: "Tu correo electrónico" },
      { en: "Your company (optional)", es: "Tu empresa (opcional)" },
      { en: "The service you’re interested in and the type of project", es: "El servicio que te interesa y el tipo de proyecto" },
      { en: "Your message", es: "Tu mensaje" },
    ],
    after: [
      {
        en: "If you email us directly, we receive your email address and whatever you include in your message. If you accept analytics cookies, we also receive usage statistics through Google Analytics (see section 4). We do not sell, rent or trade your personal information.",
        es: "Si nos escribes directamente por correo, recibimos tu dirección de correo y lo que incluyas en tu mensaje. Si aceptas las cookies de analítica, también recibimos estadísticas de uso a través de Google Analytics (consulta la sección 4). No vendemos, rentamos ni intercambiamos tu información personal.",
      },
    ],
  },
  {
    id: "form-delivery",
    title: { en: "3. How the contact form is delivered", es: "3. Cómo se envía el formulario de contacto" },
    body: [
      {
        en: "This website is static and has no database of its own. When you submit the contact form, your details are sent through FormSubmit, a third-party form service, which forwards them to our email inbox. FormSubmit processes the submission in order to deliver it and handles it under its own privacy policy.",
        es: "Este sitio web es estático y no tiene una base de datos propia. Cuando envías el formulario de contacto, tus datos se envían a través de FormSubmit, un servicio externo de formularios, que los reenvía a nuestro correo. FormSubmit procesa el envío para poder entregarlo y lo maneja de acuerdo con su propia política de privacidad.",
      },
    ],
  },
  {
    id: "browser-storage",
    title: { en: "4. Cookies and browser storage", es: "4. Cookies y almacenamiento en el navegador" },
    body: [
      {
        en: "We store only one thing in your browser: your language preference (English or Spanish), saved in localStorage under the key “sb-lang” so the site remembers your choice. It never leaves your device, and you can clear it at any time through your browser settings.",
        es: "Solo guardamos una cosa en tu navegador: tu preferencia de idioma (inglés o español), almacenada en localStorage con la clave “sb-lang” para que el sitio recuerde tu elección. Nunca sale de tu dispositivo y puedes borrarla cuando quieras desde la configuración de tu navegador.",
      },
      {
        en: "We also save your cookie choice (accepted or declined) in localStorage under the key “sb-cookie-consent”, so we don’t ask you again on every visit.",
        es: "También guardamos tu elección sobre las cookies (aceptadas o rechazadas) en localStorage con la clave “sb-cookie-consent”, para no preguntarte en cada visita.",
      },
      {
        en: "Google Analytics: if you click “Accept” in our cookie notice, we use Google Analytics 4, a service from Google LLC, to understand how visitors use the website (for example, which pages are viewed, how long visits last, the type of device and browser, and the approximate country or city). Google Analytics sets cookies named “_ga” and “_ga_…”, which by default last up to 2 years. Google Analytics 4 does not store full IP addresses. We use this information only in aggregate to improve the website, and we do not use it for advertising.",
        es: "Google Analytics: si haces clic en “Aceptar” en nuestro aviso de cookies, usamos Google Analytics 4, un servicio de Google LLC, para entender cómo se usa el sitio web (por ejemplo, qué páginas se visitan, cuánto duran las visitas, el tipo de dispositivo y navegador, y el país o la ciudad aproximados). Google Analytics crea cookies llamadas “_ga” y “_ga_…”, que por defecto duran hasta 2 años. Google Analytics 4 no guarda direcciones IP completas. Usamos esta información solo de forma agregada para mejorar el sitio, y no la usamos para publicidad.",
      },
      {
        en: "If you click “Decline”, Google Analytics is not loaded and no analytics cookies are set. You can change your mind at any time with the “Cookie settings” link at the bottom of every page; if you withdraw consent, we stop Google Analytics and delete its cookies. Google processes this data under its own privacy policy (policies.google.com/privacy). We do not use advertising cookies.",
        es: "Si haces clic en “Rechazar”, Google Analytics no se carga y no se crean cookies de analítica. Puedes cambiar de opinión cuando quieras con el enlace “Configuración de cookies” al final de cada página; si retiras tu consentimiento, detenemos Google Analytics y borramos sus cookies. Google trata estos datos conforme a su propia política de privacidad (policies.google.com/privacy). No usamos cookies de publicidad.",
      },
    ],
  },
  {
    id: "hosting",
    title: { en: "5. Hosting", es: "5. Alojamiento" },
    body: [
      {
        en: "This website is hosted on GitHub Pages. Like most web hosts, GitHub may automatically log technical information about visits, such as IP addresses, for security and to keep the service running. We do not control or have access to those logs; they are handled under GitHub’s privacy statement.",
        es: "Este sitio web está alojado en GitHub Pages. Como la mayoría de los servicios de alojamiento, GitHub puede registrar automáticamente información técnica de las visitas, como direcciones IP, por motivos de seguridad y para mantener el servicio en funcionamiento. Nosotros no controlamos ni tenemos acceso a esos registros; se manejan conforme a la declaración de privacidad de GitHub.",
      },
    ],
  },
  {
    id: "how-we-use",
    title: { en: "6. How we use your information", es: "6. Cómo usamos tu información" },
    body: [{ en: "We use the information you send us only to:", es: "Usamos la información que nos envías únicamente para:" }],
    list: [
      { en: "Reply to your message and answer your questions", es: "Responder tu mensaje y tus preguntas" },
      { en: "Prepare proposals and provide the services you request", es: "Preparar propuestas y brindarte los servicios que solicitas" },
      { en: "Keep a record of our conversation with you", es: "Mantener un registro de nuestra conversación contigo" },
    ],
    after: [
      {
        en: "We will not add you to a mailing list or send you marketing emails unless you ask us to.",
        es: "No te agregaremos a una lista de correo ni te enviaremos correos de marketing a menos que nos lo pidas.",
      },
    ],
  },
  {
    id: "retention",
    title: { en: "7. How long we keep it", es: "7. Cuánto tiempo la conservamos" },
    body: [
      {
        en: "We keep your messages for as long as needed to respond to you and, if we work together, for the duration of the project and any period required for our business records or by law. You can ask us to delete your information at any time.",
        es: "Conservamos tus mensajes el tiempo necesario para responderte y, si trabajamos juntos, durante el proyecto y cualquier periodo que requieran nuestros registros comerciales o la ley. Puedes pedirnos que eliminemos tu información en cualquier momento.",
      },
    ],
  },
  {
    id: "sharing",
    title: { en: "8. When we share information", es: "8. Cuándo compartimos información" },
    body: [{ en: "We only share your information:", es: "Solo compartimos tu información:" }],
    list: [
      {
        en: "With service providers that help us run this website and communicate with you (such as FormSubmit, our email provider, GitHub Pages and, if you accept analytics cookies, Google Analytics), only as needed for that purpose",
        es: "Con proveedores de servicios que nos ayudan a operar este sitio web y comunicarnos contigo (como FormSubmit, nuestro proveedor de correo, GitHub Pages y, si aceptas las cookies de analítica, Google Analytics), solo en la medida necesaria para ese fin",
      },
      {
        en: "When required by law, or to protect our rights, our users or the public",
        es: "Cuando la ley lo exija, o para proteger nuestros derechos, a nuestros usuarios o al público",
      },
    ],
  },
  {
    id: "your-rights",
    title: { en: "9. Your rights", es: "9. Tus derechos" },
    body: [
      {
        en: "You can ask us at any time to access, correct or delete the personal information you have sent us. Just contact us and we will respond as soon as we can.",
        es: "Puedes pedirnos en cualquier momento acceder, corregir o eliminar la información personal que nos hayas enviado. Solo contáctanos y te responderemos lo antes posible.",
      },
      {
        en: "Depending on where you live, you may have additional rights under local privacy laws — for example, residents of certain US states such as Texas and California, and people in the European Union or Mexico. We will honor those rights as they apply to you.",
        es: "Según el lugar donde vivas, es posible que tengas derechos adicionales conforme a las leyes de privacidad locales; por ejemplo, los residentes de ciertos estados de EE. UU. como Texas y California, y las personas en la Unión Europea o en México. Respetaremos esos derechos en la medida en que te apliquen.",
      },
    ],
  },
  {
    id: "children",
    title: { en: "10. Children’s privacy", es: "10. Privacidad de menores" },
    body: [
      {
        en: "This website is not directed to children under 13, and we do not knowingly collect personal information from them. If you believe a child has sent us information, contact us and we will delete it.",
        es: "Este sitio web no está dirigido a menores de 13 años y no recopilamos intencionalmente información personal de ellos. Si crees que un menor nos envió información, contáctanos y la eliminaremos.",
      },
    ],
  },
  {
    id: "other-sites",
    title: { en: "11. Links to other websites", es: "11. Enlaces a otros sitios web" },
    body: [
      {
        en: "Our website may link to other websites. We are not responsible for their content or privacy practices, so we encourage you to read their privacy policies.",
        es: "Nuestro sitio web puede incluir enlaces a otros sitios. No somos responsables de su contenido ni de sus prácticas de privacidad, así que te recomendamos leer sus políticas de privacidad.",
      },
    ],
  },
  {
    id: "changes",
    title: { en: "12. Changes to this policy", es: "12. Cambios a esta política" },
    body: [
      {
        en: "We may update this policy from time to time, for example if we add new tools to the website. When we do, we will change the “last updated” date at the top of this page.",
        es: "Podemos actualizar esta política de vez en cuando, por ejemplo si agregamos nuevas herramientas al sitio web. Cuando lo hagamos, cambiaremos la fecha de “última actualización” al inicio de esta página.",
      },
    ],
  },
];

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
            {tr("Privacy Policy", "Política de privacidad")}
          </h1>
          <p className="mt-4 text-sm text-zinc-400">
            {tr("Last updated:", "Última actualización:")} {t(lastUpdated)}
          </p>
          <p className="mt-6 text-base leading-relaxed text-zinc-300">
            {tr(
              "Your privacy matters to us. We keep this simple: we collect what you send us and, only if you accept, visit statistics. We use it to reply, work with you and improve the site, and we don’t sell it.",
              "Tu privacidad nos importa. Lo hacemos simple: recopilamos lo que nos envías y, solo si lo aceptas, estadísticas de visitas. Lo usamos para responderte, trabajar contigo y mejorar el sitio, y no lo vendemos.",
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
            <h2 className="text-xl font-medium text-white md:text-2xl">{tr("13. Contact us", "13. Contáctanos")}</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400 md:text-base">
              {tr(
                "If you have any questions about this policy or want to access, correct or delete your information, write to us:",
                "Si tienes alguna pregunta sobre esta política o quieres acceder, corregir o eliminar tu información, escríbenos:",
              )}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-zinc-300 md:text-base">
              Studio Base
              <br />
              {contact.address.street}
              <br />
              {contact.address.city}, {contact.address.region} {contact.address.zip}
              <br />
              <a href={`mailto:${contact.email}`} className="break-all text-blue-400 transition hover:text-blue-300">
                {contact.email}
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
