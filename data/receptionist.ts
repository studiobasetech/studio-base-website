/**
 * "Ava", the AI receptionist demo on the home page.
 *
 * Everything Ava can say lives in LINES. Each line has a matching voice clip
 * in public/audio/ava/<en|es>/<id>.mp3 (generated from this text). If you
 * edit a line, the clip must be regenerated so the voice still matches.
 *
 * The conversation logic (what Ava answers to what) is in reply() below.
 * It understands the most common questions a business receptionist gets
 * and books free consultations, which are emailed to info@studiobase.tech.
 */
import type { Bi, Lang } from "@/lib/i18n";

export const LINES = {
  greet: {
    en: "Hi, thanks for calling Studio Base! I'm Ava, the AI receptionist. I can tell you about our services, answer your questions, or book you a free consultation. How can I help you today?",
    es: "¡Hola, gracias por llamar a Studio Base! Soy Ava, la recepcionista con inteligencia artificial. Puedo contarte sobre nuestros servicios, responder tus preguntas o agendarte una consulta gratis. ¿En qué te puedo ayudar hoy?",
  },
  hello: {
    en: "Hi there! How can I help you today?",
    es: "¡Hola! ¿En qué te puedo ayudar hoy?",
  },
  services: {
    en: "Studio Base is a tech firm. We build AI agents and automation, custom software, mobile and web apps, and cloud and data solutions. Which of those sounds most useful for your business?",
    es: "Studio Base es una firma tecnológica. Creamos agentes de inteligencia artificial y automatización, software a la medida, aplicaciones móviles y web, y soluciones en la nube y de datos. ¿Cuál de esas le serviría más a tu negocio?",
  },
  ai: {
    en: "Our AI agents can answer calls like I'm doing right now, reply to messages, qualify leads, book appointments, and automate repetitive work, around the clock. Would you like to book a free consultation to see what we could automate for you?",
    es: "Nuestros agentes de inteligencia artificial pueden contestar llamadas como lo estoy haciendo ahora, responder mensajes, calificar prospectos, agendar citas y automatizar el trabajo repetitivo, las veinticuatro horas. ¿Te gustaría agendar una consulta gratis para ver qué podríamos automatizar para ti?",
  },
  software: {
    en: "We design and build custom software, web platforms, and mobile apps for iOS and Android, built around the way your business works. Want me to set up a free consultation with our team?",
    es: "Diseñamos y desarrollamos software a la medida, plataformas web y aplicaciones móviles para iOS y Android, pensadas para la forma en que trabaja tu negocio. ¿Quieres que te agende una consulta gratis con nuestro equipo?",
  },
  pricing: {
    en: "Every project is different, so pricing depends on the scope. The first consultation is free, and our team will send you a clear proposal with no surprises. Shall I book it for you?",
    es: "Cada proyecto es diferente, así que el precio depende del alcance. La primera consulta es gratis, y nuestro equipo te enviará una propuesta clara y sin sorpresas. ¿Quieres que te la agende?",
  },
  timeline: {
    en: "Smaller automations can be live in a couple of weeks, and larger platforms usually take a few months. The team will give you an exact timeline in your free consultation. Want me to book one?",
    es: "Las automatizaciones más sencillas pueden estar listas en un par de semanas, y las plataformas más grandes suelen tomar algunos meses. El equipo te dará un plazo exacto en tu consulta gratis. ¿Quieres que te agende una?",
  },
  about: {
    en: "Studio Base develops AI-powered products, custom software solutions, and digital infrastructure that help businesses automate, scale, and grow. Our team includes AI engineers, full-stack developers, mobile developers, and UI and UX designers.",
    es: "Studio Base desarrolla productos impulsados por inteligencia artificial, soluciones de software a la medida e infraestructura digital que ayudan a los negocios a automatizar, escalar y crecer. Nuestro equipo incluye ingenieros en inteligencia artificial, desarrolladores full stack, desarrolladores móviles y diseñadores UI y UX.",
  },
  products: {
    en: "We also have our own AI products: HCRM AI, for client and workforce management, and BaseLead AI, for finding and winning new clients. Would you like a demo with our team?",
    es: "También tenemos nuestros propios productos con inteligencia artificial: HCRM AI, para la gestión de clientes y equipos, y BaseLead AI, para encontrar y conseguir nuevos clientes. ¿Te gustaría una demostración con nuestro equipo?",
  },
  remote: {
    en: "We work fully online, so we can help businesses anywhere, in English or Spanish. Would you like to book a free video consultation?",
    es: "Trabajamos completamente en línea, así que podemos ayudar a negocios en cualquier lugar, en inglés o en español. ¿Te gustaría agendar una consulta gratis por videollamada?",
  },
  hours: {
    en: "I'm available twenty-four seven, and our team replies to every request within one business day.",
    es: "Yo estoy disponible las veinticuatro horas, todos los días, y nuestro equipo responde cada solicitud en un día hábil.",
  },
  language: {
    en: "I speak English and Spanish. To talk to me in Spanish, switch the language with the E S button at the top of the page.",
    es: "Hablo español e inglés. Para hablar conmigo en inglés, cambia el idioma con el botón E N en la parte superior de la página.",
  },
  human: {
    en: "Of course. The fastest way to reach our team is a free consultation, and a specialist will contact you within one business day. Shall I take your details?",
    es: "Claro. La forma más rápida de hablar con nuestro equipo es una consulta gratis, y un especialista te contactará en un día hábil. ¿Tomo tus datos?",
  },
  self: {
    en: "I'm a demo of the AI receptionists Studio Base builds for businesses. Yours could answer every call, book appointments, and capture every lead, in your brand's own voice, day and night.",
    es: "Soy una demostración de las recepcionistas con inteligencia artificial que Studio Base crea para los negocios. La tuya podría contestar cada llamada, agendar citas y captar cada cliente, con la voz de tu marca, de día y de noche.",
  },
  bookName: {
    en: "Great! Let's book your free consultation. First, what's your name?",
    es: "¡Perfecto! Vamos a agendar tu consulta gratis. Primero, ¿cuál es tu nombre?",
  },
  bookEmail: {
    en: "Thank you! What's the best email to reach you? You can type it below.",
    es: "¡Gracias! ¿Cuál es el mejor correo para contactarte? Puedes escribirlo abajo.",
  },
  badEmail: {
    en: "Hmm, that email doesn't look quite right. Could you type it again?",
    es: "Mmm, ese correo no parece correcto. ¿Podrías escribirlo de nuevo?",
  },
  bookNeed: {
    en: "Perfect. In a few words, what would you like help with?",
    es: "Perfecto. En pocas palabras, ¿con qué te gustaría que te ayudemos?",
  },
  booked: {
    en: "You're all set! Our team will email you within one business day to schedule your free consultation. Is there anything else I can help you with?",
    es: "¡Listo! Nuestro equipo te escribirá en un día hábil para agendar tu consulta gratis. ¿Hay algo más en lo que te pueda ayudar?",
  },
  sendFail: {
    en: "I'm sorry, I couldn't send that just now. Please use the form on our contact page, or email info at studiobase dot tech.",
    es: "Lo siento, no pude enviarlo en este momento. Por favor usa el formulario de nuestra página de contacto, o escribe a info arroba studiobase punto tech.",
  },
  cancelled: {
    en: "No problem, I've cancelled that. Is there anything else you'd like to know?",
    es: "No hay problema, lo cancelé. ¿Hay algo más que quieras saber?",
  },
  no: {
    en: "No problem! Is there anything else you'd like to know?",
    es: "¡No hay problema! ¿Hay algo más que quieras saber?",
  },
  bye: {
    en: "Thank you for calling Studio Base. Have a wonderful day!",
    es: "Gracias por llamar a Studio Base. ¡Que tengas un excelente día!",
  },
  fallback: {
    en: "Sorry, I didn't quite catch that. I can tell you about our services, pricing, or timelines, or book you a free consultation. What would you like?",
    es: "Perdón, no te entendí bien. Puedo contarte sobre nuestros servicios, precios o tiempos, o agendarte una consulta gratis. ¿Qué te gustaría?",
  },
} satisfies Record<string, Bi>;

export type LineId = keyof typeof LINES;

/** Suggested replies shown as tappable chips. */
export const CHIPS: { label: Bi; say: Bi }[] = [
  { label: { en: "What do you do?", es: "¿Qué hacen?" }, say: { en: "What services do you offer?", es: "¿Qué servicios ofrecen?" } },
  { label: { en: "AI agents", es: "Agentes de IA" }, say: { en: "Tell me about your AI agents", es: "Cuéntame de sus agentes de IA" } },
  { label: { en: "Pricing", es: "Precios" }, say: { en: "How much does it cost?", es: "¿Cuánto cuesta?" } },
  { label: { en: "Book a consultation", es: "Agendar consulta" }, say: { en: "I'd like to book a consultation", es: "Quiero agendar una consulta" } },
];

/* ------------------------------------------------------------------ */
/* conversation logic                                                  */
/* ------------------------------------------------------------------ */

export type Step = "chat" | "name" | "email" | "need";
export type Lead = { name: string; email: string; need: string };
export type ConvState = { step: Step; offered: boolean; lead: Lead };
export const initialState = (): ConvState => ({ step: "chat", offered: false, lead: { name: "", email: "", need: "" } });

/** lower-case, no accents, no punctuation */
export const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9@.\s'-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const has = (t: string, words: string[]) =>
  words.some((w) => (w.startsWith("^") ? t === w.slice(1) || t.startsWith(`${w.slice(1)} `) : ` ${t} `.includes(w)));

// patterns with a leading/trailing space match whole words
const K = {
  cancel: [" cancel", " stop ", " never mind", " nevermind", " cancela", " olvidalo", " olvida "],
  self: [" are you real", " are you a bot", " are you human", " are you a robot", " are you ai", " are you an ai", " are you a person", " are you a real", " who are you", " what are you", " how do you work", " eres real", " eres un bot", " eres humana", " eres una persona", " eres un robot", " eres ia", " eres una ia", " quien eres", " que eres", " como funcionas"],
  book: [" book", " schedule", " consult", " appointment", " meeting", " call me", " sign up", " get started", " demo", " agend", " cita", " consulta", " reunion", " reserv", " demostracion", " llamenme", " llamame"],
  human: [" human", " real person", " a person", " someone", " representative", " talk to your team", " speak to", " talk to a", " humano", " una persona", " alguien", " representante", " hablar con"],
  price: [" price", " pricing", " cost", " how much", " budget", " expensive", " cheap", " rates", " quote", " fee", " precio", " costo", " cuanto", " cuesta", " presupuesto", " cotiza", " tarifa", " caro", " barato"],
  timeline: [" how long", " timeline", " time frame", " timeframe", " weeks", " months", " how fast", " how quickly", " deadline", " cuanto tiempo", " tiempo", " semanas", " meses", " que tan rapido", " plazo", " tarda"],
  products: [" product", " hcrm", " baselead", " base lead", " crm", " producto"],
  ai: [" ai ", " a i ", " artificial", " agent", " automat", " chatbot", " voice", " receptionist", " answer calls", " answer my calls", " phone", " ia ", " inteligencia", " agente", " automatiz", " recepcionista", " llamadas", " whatsapp"],
  software: [" software", " app", " website", " web ", " platform", " mobile", " ios", " android", " saas", " aplicacion", " pagina", " sitio", " plataforma", " movil"],
  services: [" service", " what do you do", " what can you do", " what you do", " offer", " help me with", " what do you guys", " servicio", " que hacen", " que ofrecen", " a que se dedican", " que pueden hacer"],
  about: [" who is studio", " about you", " about studio", " company", " your team", " experience", " who are your", " quienes son", " empresa", " su equipo", " sobre ustedes", " experiencia"],
  remote: [" where are", " where is", " located", " location", " office", " remote", " online", " country", " near me", " donde", " ubica", " oficina", " remoto", " en linea", " pais"],
  hours: [" hours", " open", " available", " 24 7", " 24/7", " horario", " abierto", " disponible"],
  language: [" spanish", " english", " language", " espanol", " ingles", " idioma"],
  bye: [" bye", " goodbye", " that's all", " thats all", " nothing else", " that is all", " adios", " eso es todo", " nada mas", " hasta luego"],
  thanks: [" thank", " gracias"],
  no: ["^no", "^nope", "^nah", " not now", " not right now", " maybe later", " no thanks", "^ahora no", " despues", " luego"],
  yes: ["^yes", "^yeah", "^yep", "^sure", "^ok", "^okay", "^please", "^of course", "^sounds good", "^let's", "^lets", "^go ahead", "^absolutely", "^definitely", "^si", "^claro", "^por favor", "^dale", "^va", "^perfecto", "^de acuerdo", "^me parece", "^bueno", "^sale"],
  hello: ["^hi", "^hello", "^hey", "^good morning", "^good afternoon", "^hola", "^buenas", "^buenos"],
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** turn a spoken email ("anna at gmail dot com") into a written one */
export function spokenEmail(s: string) {
  return s
    .toLowerCase()
    .replace(/\s+(at|arroba)\s+/g, "@")
    .replace(/\s+(dot|punto)\s+/g, ".")
    .replace(/\s+/g, "")
    .replace(/[,;]+$/g, "")
    .replace(/\.$/, "");
}

/** strip "my name is" / "me llamo" etc. */
function cleanName(s: string) {
  const t = s
    .trim()
    .replace(/^(hi|hello|hola)[,!. ]+/i, "")
    .replace(/^(my name is|my name's|i am|i'm|it's|this is|me llamo|mi nombre es|soy)\s+/i, "")
    .replace(/[.!?]+$/, "")
    .trim();
  return t.slice(0, 80);
}

export type Reply = { state: ConvState; line: LineId; submit?: Lead; end?: boolean };

/** Decide Ava's answer to what the visitor said or typed. */
export function reply(prev: ConvState, said: string): Reply {
  const t = norm(said);
  const st: ConvState = { ...prev, lead: { ...prev.lead } };

  // booking flow
  if (st.step !== "chat") {
    if (has(t, K.cancel)) return { state: { ...initialState() }, line: "cancelled" };
    if (st.step === "name") {
      st.lead.name = cleanName(said) || said.trim();
      st.step = "email";
      return { state: st, line: "bookEmail" };
    }
    if (st.step === "email") {
      const e = EMAIL_RE.test(said.trim()) ? said.trim() : spokenEmail(said);
      if (!EMAIL_RE.test(e)) return { state: st, line: "badEmail" };
      st.lead.email = e;
      st.step = "need";
      return { state: st, line: "bookNeed" };
    }
    // need
    st.lead.need = said.trim().slice(0, 1000);
    const lead = st.lead;
    return { state: initialState(), line: "booked", submit: lead };
  }

  const offer = (line: LineId): Reply => ({ state: { ...st, offered: true }, line });
  const say = (line: LineId): Reply => ({ state: { ...st, offered: false }, line });
  const startBooking = (): Reply => ({ state: { ...st, step: "name", offered: false }, line: "bookName" });

  if (!t) return say("fallback");
  if (has(t, K.self)) return say("self");
  if (st.offered && has(t, K.no)) return say("no");
  if (st.offered && has(t, K.yes)) return startBooking();
  if (has(t, K.book)) return startBooking();
  if (has(t, K.human)) return offer("human");
  if (has(t, K.price)) return offer("pricing");
  if (has(t, K.timeline)) return offer("timeline");
  if (has(t, K.products)) return offer("products");
  if (has(t, K.ai)) return offer("ai");
  if (has(t, K.software)) return offer("software");
  if (has(t, K.services)) return say("services");
  if (has(t, K.about)) return say("about");
  if (has(t, K.remote)) return offer("remote");
  if (has(t, K.hours)) return say("hours");
  if (has(t, K.language)) return say("language");
  if (has(t, K.bye) || has(t, K.thanks)) return { state: initialState(), line: "bye", end: true };
  if (has(t, K.no)) return say("no");
  if (has(t, K.yes)) return startBooking();
  if (has(t, K.hello)) return say("hello");
  return say("fallback");
}

export const pickLine = (id: LineId, lang: Lang) => LINES[id][lang];
