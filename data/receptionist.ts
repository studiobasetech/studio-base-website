/**
 * "Eva", the AI receptionist demo on the website (home page section + floating button on every page).
 *
 * Everything Eva can say lives in LINES. Each line has a matching voice clip
 * in public/audio/eva/<en|es>/<id>.mp3 (generated from this text). If you
 * edit a line, the clip must be regenerated so the voice still matches.
 *
 * The conversation logic (what Eva answers to what) is in reply() below.
 * It understands English and Spanish (with typos and chat shorthand), scores
 * each message against the topics in KW, answers in the visitor's language,
 * and books free consultations, which are emailed to info@studiobase.tech.
 * To teach Eva a new way of asking something, add words or phrases to KW.
 */
import type { Bi, Lang } from "@/lib/i18n";

export const LINES = {
  greet: {
    en: "Hi, thanks for calling Studio Base! I'm Eva, the AI receptionist. I can tell you about our services, answer your questions, or book you a free consultation. How can I help you today?",
    es: "¡Hola, gracias por llamar a Studio Base! Soy Eva, la recepcionista con inteligencia artificial. Puedo contarte sobre nuestros servicios, responder tus preguntas o agendarte una consulta gratis. ¿En qué te puedo ayudar hoy?",
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
  smalltalk: {
    en: "I'm doing great, thank you for asking! How can I help you today?",
    es: "¡Muy bien, gracias por preguntar! ¿En qué te puedo ayudar hoy?",
  },
  welcome: {
    en: "You're welcome! Is there anything else I can help you with?",
    es: "¡Con gusto! ¿Hay algo más en lo que te pueda ayudar?",
  },
  contact: {
    en: "You can email our team at info at studiobase dot tech, or I can book you a free consultation right now. Would you like me to?",
    es: "Puedes escribirle a nuestro equipo a info arroba studiobase punto tech, o puedo agendarte una consulta gratis ahora mismo. ¿Quieres que lo haga?",
  },
  industries: {
    en: "We work with businesses of every size, from clinics, restaurants, real estate teams, and local service companies to growing startups and established brands. If your business answers calls, follows up with clients, or handles repetitive work, we can help. Would you like a free consultation?",
    es: "Trabajamos con negocios de todos los tamaños: clínicas, restaurantes, inmobiliarias y empresas de servicios, hasta startups en crecimiento y marcas establecidas. Si tu negocio contesta llamadas, da seguimiento a clientes o tiene trabajo repetitivo, te podemos ayudar. ¿Te gustaría una consulta gratis?",
  },
  portfolio: {
    en: "You can see examples of our work on the Portfolio page of this website. In a free consultation, our team can also walk you through projects similar to yours. Want me to book one?",
    es: "Puedes ver ejemplos de nuestro trabajo en la página de Portafolio de este sitio. En una consulta gratis, nuestro equipo también puede mostrarte proyectos parecidos al tuyo. ¿Quieres que te agende una?",
  },
  integrations: {
    en: "Yes. We connect our AI agents and software to the tools you already use, like your CRM, calendar, email, WhatsApp, and online store, so everything works together. Would you like to talk it through in a free consultation?",
    es: "¡Claro que sí! Conectamos nuestros agentes de inteligencia artificial y nuestro software con las herramientas que ya usas, como tu CRM, tu calendario, tu correo, WhatsApp y tu tienda en línea, para que todo funcione en conjunto. ¿Te gustaría platicarlo en una consulta gratis?",
  },
  support: {
    en: "Yes. After launch, we stay with you with ongoing support, maintenance, and improvements as your business grows.",
    es: "Claro que sí. Después del lanzamiento te seguimos acompañando con soporte, mantenimiento y mejoras continuas a medida que tu negocio crece.",
  },
  process: {
    en: "It's simple. We start with a free consultation to understand your goals. Then we plan the solution, design and build it, launch it, and keep supporting you after that. Shall I book your free consultation?",
    es: "Es sencillo. Empezamos con una consulta gratis para entender tus objetivos. Después planeamos la solución, la diseñamos y la desarrollamos, la lanzamos y te seguimos apoyando. ¿Te agendo tu consulta gratis?",
  },
  security: {
    en: "We take security seriously. We use access controls and protected communications, and we never use your confidential data to train public AI models.",
    es: "Nos tomamos la seguridad muy en serio. Usamos controles de acceso y comunicaciones protegidas, y nunca usamos tus datos confidenciales para entrenar modelos públicos de inteligencia artificial.",
  },
  careers: {
    en: "We're always happy to meet talented people. Please send your information to info at studiobase dot tech.",
    es: "Siempre nos da gusto conocer gente talentosa. Por favor envía tu información a info arroba studiobase punto tech.",
  },
  fallback: {
    en: "Sorry, I didn't quite get that. You can ask me what Studio Base does, about AI agents, pricing, or timelines, or I can book you a free consultation.",
    es: "Perdón, no te entendí bien. Puedes preguntarme qué hace Studio Base, sobre los agentes de inteligencia artificial, precios o tiempos, o puedo agendarte una consulta gratis.",
  },
} satisfies Record<string, Bi>;

export type LineId = keyof typeof LINES;

/** Suggested replies shown as tappable chips. */
export const CHIPS: { label: Bi; say: Bi }[] = [
  { label: { en: "What do you do?", es: "¿Qué hacen?" }, say: { en: "What does Studio Base do?", es: "¿Qué hace Studio Base?" } },
  { label: { en: "AI agents", es: "Agentes de IA" }, say: { en: "Tell me about your AI agents", es: "Cuéntame de sus agentes de IA" } },
  { label: { en: "Pricing", es: "Precios" }, say: { en: "How much does it cost?", es: "¿Cuánto cuesta?" } },
  { label: { en: "Book a consultation", es: "Agendar consulta" }, say: { en: "I'd like to book a consultation", es: "Quiero agendar una consulta" } },
];

/* ------------------------------------------------------------------ */
/* understanding what the visitor said (English + Spanish)             */
/* ------------------------------------------------------------------ */

export type Step = "chat" | "name" | "email" | "need";
export type Lead = { name: string; email: string; need: string };
export type ConvState = { step: Step; offered: boolean; lead: Lead };
export const initialState = (): ConvState => ({ step: "chat", offered: false, lead: { name: "", email: "", need: "" } });

/** chat shorthand → full words (applied after norm) */
const SHORTHAND: Record<string, string> = {
  u: "you", ur: "your", r: "are", ya: "you", wat: "what", wht: "what", whats: "what is", hw: "how", pls: "please", plz: "please",
  thx: "thanks", hwo: "how", waht: "what", whta: "what", teh: "the", yuo: "you", pirce: "price", qeu: "que", ty: "thanks", tnx: "thanks", hi: "hi", q: "que", k: "que", xq: "porque", pq: "porque", tb: "tambien",
  ia: "ia", ai: "ai", a: "a", info: "info",
};

/** lower-case, no accents, no punctuation */
export const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9@.\s'/-]/g, " ")
    .replace(/[.'-]/g, (c) => (c === "'" ? "" : " "))
    .replace(/\s+/g, " ")
    .trim();

const tokenize = (s: string) =>
  norm(s)
    .split(" ")
    .filter(Boolean)
    .flatMap((w) => (SHORTHAND[w] ?? w).split(" "));

/** edit distance with swapped letters counting as one typo ("whta" → "what"), capped */
function lev(a: string, b: string, max = 1): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const d: number[][] = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  }
  return d[a.length][b.length];
}

/** everyday words that must never be "typo-corrected" into a keyword (e.g. "were" → "where") */
const NO_FUZZY = new Set([
  "there", "where", "were", "here", "what", "that", "when", "then", "they", "them", "this", "these", "those", "your", "have", "will",
  "would", "could", "should", "their", "about", "which", "while", "some", "same", "save", "sale", "more", "most", "post", "host",
  "como", "cosa", "casa", "para", "pero", "esta", "este", "estos", "tiene", "tienen", "puede", "pueden", "donde", "cuando", "mismo",
]);

/** does one typed word match one keyword word? ("stem*" = starts with stem). Tolerates small typos. */
function wordMatch(tok: string, kw: string, minFuzzy = 5): boolean {
  if (kw.endsWith("*")) {
    const stem = kw.slice(0, -1);
    if (tok.startsWith(stem)) return true;
    // only long stems get typo tolerance ("automatizacion"), short ones are too easy to confuse ("proce" vs "price")
    return stem.length >= 7 && tok.length >= stem.length && !NO_FUZZY.has(tok) && lev(tok.slice(0, stem.length), stem, 1) <= 1;
  }
  if (tok === kw) return true;
  if (kw.length < minFuzzy || tok.length < minFuzzy || NO_FUZZY.has(tok)) return false;
  return lev(tok, kw, 1) <= 1;
}

/** where the keyword (a word or a phrase) appears in the tokens: [start, end) or null */
function find(toks: string[], kw: string, used?: Set<number>): [number, number] | null {
  const parts = kw.split(" ");
  // inside a phrase the context is clear, so shorter words may have a typo too ("what dies" → "what does")
  const minFuzzy = parts.length === 1 ? 5 : 4;
  for (let i = 0; i + parts.length <= toks.length; i++) {
    if (used && parts.some((_, j) => used.has(i + j))) continue;
    if (parts.every((p, j) => wordMatch(toks[i + j], p, minFuzzy))) return [i, i + parts.length];
  }
  return null;
}
const matches = (toks: string[], kw: string) => find(toks, kw) !== null;

type Intent =
  | "self" | "smalltalk" | "book" | "human" | "contact" | "price" | "timeline" | "products" | "industries" | "portfolio"
  | "integrations" | "support" | "process" | "security" | "careers" | "ai" | "software" | "services" | "about" | "remote"
  | "hours" | "language" | "bye" | "thanks";

/** keywords per intent, English and Spanish (no accents). [keyword, weight] — phrases weigh more. */
const KW: Record<Intent, [string, number][]> = {
  self: [
    ["are you real", 4], ["are you a bot", 4], ["are you human", 4], ["are you a robot", 4], ["are you ai", 4], ["are you an ai", 4],
    ["are you a person", 4], ["are you a real", 4], ["who are you", 4], ["what are you", 3], ["what is your name", 4], ["your name", 3],
    ["eres real", 4], ["eres un bot", 4], ["eres humana", 4], ["eres una persona", 4], ["eres un robot", 4], ["eres ia", 4],
    ["eres una ia", 4], ["quien eres", 4], ["que eres", 3], ["como te llamas", 4], ["tu nombre", 3], ["how do you work", 2], ["what is this", 3], ["que es esto", 3],
  ],
  smalltalk: [["how are you", 4], ["how is it going", 4], ["how are you doing", 4], ["como estas", 4], ["que tal", 3], ["como te va", 4], ["como esta", 3]],
  book: [
    ["book*", 3], ["schedul*", 3], ["consultation*", 3], ["appointment*", 3], ["meeting", 2], ["call me", 3], ["sign up", 3], ["get started", 3],
    ["start a project", 3], ["hire you", 3], ["work with you", 2], ["demo", 1], ["agend*", 3], ["cita*", 3], ["consulta", 3], ["reunion*", 3],
    ["reserv*", 2], ["quiero empezar", 3], ["contratar*", 2], ["llamenme", 3], ["llamame", 3], ["empezar un proyecto", 3],
  ],
  human: [
    ["human", 3], ["real person", 4], ["a person", 2], ["someone", 2], ["representative", 3], ["talk to a", 2], ["speak to", 2],
    ["speak with", 2], ["talk with", 2], ["talk to your team", 3], ["humano", 3], ["una persona", 2], ["alguien", 2], ["representante", 3],
    ["hablar con", 2], ["comunicarme con", 2],
  ],
  contact: [
    ["contact*", 3], ["email", 3], ["e mail", 3], ["phone number", 3], ["your number", 3], ["reach you", 3], ["call you", 2], ["address", 2],
    ["correo", 3], ["telefono", 3], ["numero", 2], ["contacto", 3], ["contactar*", 3], ["direccion", 2], ["comunicarme", 2],
  ],
  price: [
    ["price*", 3], ["pricing", 3], ["cost*", 3], ["how much", 3], ["budget", 3], ["expensive", 3], ["cheap", 3], ["rates", 3], ["quote", 3],
    ["fee*", 2], ["afford*", 3], ["charge", 2], ["precio*", 3], ["costo*", 3], ["cuanto cuesta", 4], ["cuanto cobran", 4], ["cuesta*", 3],
    ["presupuesto", 3], ["cotiza*", 3], ["tarifa*", 3], ["caro", 3], ["barato", 3], ["cobran", 3], ["pagar", 2], ["pago", 2],
  ],
  timeline: [
    ["how long", 3], ["timeline", 3], ["timeframe", 3], ["time frame", 3], ["weeks", 2], ["months", 2], ["how fast", 3], ["how quickly", 3],
    ["how soon", 3], ["deadline", 3], ["cuanto tiempo", 4], ["tiempo", 2], ["semanas", 2], ["meses", 2], ["que tan rapido", 3], ["plazo*", 3],
    ["tarda*", 3], ["demora*", 3],
  ],
  products: [["product*", 3], ["hcrm", 4], ["baselead", 4], ["base lead", 4], ["crm", 2], ["producto*", 3]],
  industries: [
    ["industr*", 3], ["who do you work with", 4], ["do you work with", 2], ["work with businesses", 2], ["trabajan con", 2], ["what kind of business*", 3], ["type of business*", 3], ["what businesses", 3],
    ["restaurant*", 2], ["clinic*", 2], ["dental", 2], ["dentist*", 2], ["doctor*", 2], ["real estate", 2], ["realtor*", 2], ["lawyer*", 2],
    ["law firm", 2], ["salon*", 2], ["gym*", 2], ["retail", 2], ["small business*", 3], ["startup*", 2], ["industria*", 3],
    ["con quien trabajan", 4], ["que tipo de negocio*", 3], ["tipo de empresa*", 3], ["restaurante*", 2], ["clinica*", 2], ["dentista*", 2],
    ["bienes raices", 2], ["inmobiliaria*", 2], ["abogado*", 2], ["gimnasio*", 2], ["pequenos negocios", 3], ["pequena empresa", 3],
  ],
  portfolio: [
    ["portfolio", 4], ["example*", 3], ["case stud*", 4], ["previous work", 3], ["past work", 3], ["your work", 2], ["work you have done", 3],
    ["projects", 2], ["show me", 2], ["clients you", 2], ["portafolio", 4], ["ejemplo*", 3], ["trabajos", 2], ["proyectos", 2], ["casos de exito", 4],
  ],
  integrations: [
    ["integrat*", 3], ["connect*", 3], ["work with my", 3], ["use my", 2], ["google", 2], ["shopify", 3], ["hubspot", 3], ["salesforce", 3],
    ["quickbooks", 3], ["calendar", 2], ["zapier", 3], ["api", 2], ["my system*", 2], ["integra*", 3], ["conect*", 3], ["calendario", 2],
    ["mi sistema", 2], ["mis herramientas", 3],
  ],
  support: [
    ["support", 3], ["maintenance", 3], ["maintain*", 3], ["after launch", 3], ["after the project", 3], ["updates", 2], ["soporte", 3],
    ["mantenimiento", 3], ["despues del lanzamiento", 3], ["actualizaciones", 2],
  ],
  process: [
    ["process", 3], ["how does it work", 3], ["how does this work", 3], ["steps", 2], ["how do we start", 3], ["how do i start", 3],
    ["next steps", 3], ["what happens next", 3], ["proceso", 3], ["como funciona", 3], ["pasos", 2], ["como empezamos", 3], ["como empiezo", 3],
  ],
  security: [
    ["secur*", 3], ["privacy", 3], ["my data", 3], ["safe", 2], ["confidential*", 3], ["gdpr", 3], ["hipaa", 3], ["segur*", 3],
    ["privacidad", 3], ["mis datos", 3], ["confidencial*", 3],
  ],
  careers: [
    ["hiring", 3], ["job*", 3], ["career*", 3], ["work for you", 3], ["internship*", 3], ["resume", 2], ["vacante*", 3], ["empleo*", 3],
    ["trabajar con ustedes", 3], ["trabajar para", 3], ["contratando", 3], ["buscan personal", 3],
  ],
  ai: [
    ["ai", 2], ["artificial", 2], ["agent*", 2], ["automat*", 2], ["chatbot*", 3], ["bot", 1], ["voice", 2], ["receptionist*", 3],
    ["answer calls", 3], ["answer my calls", 3], ["answer my phone", 3], ["answer the phone", 3], ["pick up the phone", 3], ["contestar llamadas", 3], ["contestar el telefono", 3], ["phone calls", 3], ["calls", 1], ["whatsapp", 2], ["assistant*", 2], ["ia", 2],
    ["inteligencia", 2], ["agente*", 2], ["automatiz*", 2], ["recepcionist*", 3], ["llamadas", 2], ["asistente*", 2],
  ],
  software: [
    ["software", 2], ["app", 2], ["apps", 2], ["application*", 2], ["website*", 2], ["web", 2], ["site", 1], ["platform*", 2], ["mobile", 2],
    ["ios", 2], ["android", 2], ["saas", 2], ["ecommerce", 2], ["e commerce", 2], ["online store", 3], ["aplicacion*", 2], ["pagina*", 2],
    ["sitio*", 2], ["plataforma*", 2], ["movil", 2], ["tienda en linea", 3], ["programa*", 1], ["sistema*", 1],
  ],
  services: [
    ["service*", 2], ["what do you do", 4], ["what does studio base do", 5], ["what does", 1], ["what you do", 3], ["what can you do", 4],
    ["what do you guys do", 4], ["what do you offer", 4], ["offer*", 2], ["help me with", 2], ["do for me", 3], ["what is studio base", 4],
    ["tell me about studio base", 4], ["how can you help", 4], ["help my business", 3], ["me pueden ayudar", 4], ["ayudar con mi negocio", 3], ["como me pueden ayudar", 4], ["what kind of work", 3], ["servicio*", 2], ["que hacen", 4], ["que hace", 3], ["que ofrecen", 4],
    ["a que se dedica*", 4], ["que pueden hacer", 4], ["que es studio base", 4], ["ofrec*", 2], ["en que me pueden ayudar", 4],
  ],
  about: [
    ["about you", 2], ["about studio", 2], ["company", 2], ["your team", 3], ["experience", 2], ["who are your", 2], ["founder*", 3],
    ["owner", 2], ["who owns", 4], ["who runs", 3], ["who started", 3], ["quien es el dueno", 4], ["who is behind", 3], ["who is studio base", 4], ["empresa", 2], ["su equipo", 3], ["sobre ustedes", 3], ["experiencia", 2],
    ["fundador*", 3], ["dueno*", 2], ["quienes son", 4], ["quien esta detras", 3],
  ],
  remote: [
    ["where", 2], ["located", 3], ["location", 3], ["office*", 2], ["remote*", 2], ["online", 2], ["country", 2], ["countries", 2],
    ["near me", 3], ["in person", 3], ["donde", 2], ["ubica*", 3], ["oficina*", 2], ["remot*", 2], ["en linea", 2], ["pais*", 2],
    ["en persona", 3],
  ],
  hours: [["hours", 3], ["open", 2], ["available", 2], ["24/7", 3], ["24 7", 3], ["weekend*", 3], ["horario*", 3], ["abierto*", 2], ["disponible*", 2], ["fin de semana", 3]],
  language: [["spanish", 3], ["english", 3], ["language*", 3], ["espanol", 3], ["ingles", 3], ["idioma*", 3]],
  bye: [["bye", 4], ["goodbye", 4], ["good bye", 4], ["that is all", 4], ["thats all", 4], ["nothing else", 4], ["have a good day", 4], ["adios", 4], ["eso es todo", 4], ["nada mas", 4], ["hasta luego", 4], ["chao", 4], ["chau", 4], ["bye bye", 4]],
  thanks: [["thank*", 3], ["gracias", 3], ["appreciate it", 3], ["te lo agradezco", 3]],
};

/** order used to break ties: more specific questions first */
const PRIORITY: Intent[] = [
  "self", "smalltalk", "book", "human", "price", "timeline", "contact", "careers", "security", "integrations", "support", "process",
  "portfolio", "industries", "products", "ai", "software", "services", "about", "remote", "hours", "language", "bye", "thanks",
];

const YES = ["yes", "yeah", "yep", "yup", "sure", "ok", "okay", "please", "of course", "sounds good", "lets do it", "lets", "go ahead", "absolutely",
  "definitely", "perfect", "great", "si", "claro", "por favor", "dale", "va", "perfecto", "de acuerdo", "me parece bien", "bueno", "sale", "esta bien", "orale"];
const NO = ["no", "nope", "nah", "not now", "not right now", "maybe later", "no thanks", "no thank you", "ahora no", "despues", "luego", "no gracias", "todavia no"];
const HELLO = ["hi", "hello", "hey", "hiya", "good morning", "good afternoon", "good evening", "hola", "buenas", "buenos dias", "buenas tardes", "buenas noches", "que onda"];
const CANCEL = ["cancel", "stop", "never mind", "nevermind", "forget it", "cancela", "cancelar", "olvidalo", "olvida", "ya no"];

/** does the message start with one of these phrases? */
const startsWithAny = (toks: string[], list: string[]) =>
  list.some((p) => {
    const parts = p.split(" ");
    return parts.every((w, i) => toks[i] === w);
  });

function score(toks: string[]) {
  const scores = {} as Record<Intent, number>;
  for (const intent of PRIORITY) {
    // each word counts once per topic (so "receptionist" doesn't also count as "recepcionista")
    let sc = 0;
    const used = new Set<number>();
    for (const [kw, w] of [...KW[intent]].sort((a, b) => b[0].split(" ").length - a[0].split(" ").length)) {
      const at = find(toks, kw, used);
      if (!at) continue;
      sc += w;
      for (let i = at[0]; i < at[1]; i++) used.add(i);
    }
    scores[intent] = sc;
  }
  let best: Intent | null = null;
  for (const intent of PRIORITY) if (scores[intent] > 0 && (!best || scores[intent] > scores[best])) best = intent;
  return { best, top: best ? scores[best] : 0, scores };
}
export function debugScores(t: string) {
  return score(tokenize(t)).scores;
}

/** guess the language of a message (null = can't tell) */
export function detectLang(text: string): Lang | null {
  const raw = text.toLowerCase();
  let es = (raw.match(/[ñ¿¡áéíóú]/g) || []).length * 2;
  let en = 0;
  const ES = ["que", "como", "cuanto", "hola", "quiero", "necesito", "tienen", "hacen", "puedo", "para", "una", "los", "las", "con", "por", "gracias", "si", "mi", "es", "son", "ustedes", "tu", "esta", "donde", "cual", "negocio", "empresa", "ayuda", "buenas", "cuesta", "y", "de", "el", "la", "me", "se", "en"];
  const EN = ["what", "how", "the", "you", "do", "does", "is", "are", "can", "hello", "want", "need", "your", "my", "much", "and", "of", "to", "i", "it", "have", "with", "for", "about", "business", "please", "thanks", "yes", "hi", "a", "in"];
  for (const w of norm(text).split(" ")) {
    if (ES.includes(w)) es++;
    if (EN.includes(w)) en++;
  }
  if (es >= 2 && es > en * 1.5) return "es";
  if (en >= 2 && en > es * 1.5) return "en";
  return null;
}

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

/** what each intent answers, and whether that answer ends by offering a consultation */
const ANSWER: Record<Exclude<Intent, "book" | "bye" | "thanks">, { line: LineId; offers: boolean }> = {
  self: { line: "self", offers: false },
  smalltalk: { line: "smalltalk", offers: false },
  human: { line: "human", offers: true },
  contact: { line: "contact", offers: true },
  price: { line: "pricing", offers: true },
  timeline: { line: "timeline", offers: true },
  products: { line: "products", offers: true },
  industries: { line: "industries", offers: true },
  portfolio: { line: "portfolio", offers: true },
  integrations: { line: "integrations", offers: true },
  support: { line: "support", offers: false },
  process: { line: "process", offers: true },
  security: { line: "security", offers: false },
  careers: { line: "careers", offers: false },
  ai: { line: "ai", offers: true },
  software: { line: "software", offers: true },
  services: { line: "services", offers: false },
  about: { line: "about", offers: false },
  remote: { line: "remote", offers: true },
  hours: { line: "hours", offers: false },
  language: { line: "language", offers: false },
};

export type Reply = { state: ConvState; line: LineId; submit?: Lead; end?: boolean };

/** Decide Eva's answer to what the visitor said or typed (English or Spanish). */
export function reply(prev: ConvState, said: string): Reply {
  const toks = tokenize(said);
  const st: ConvState = { ...prev, lead: { ...prev.lead } };

  // booking flow
  if (st.step !== "chat") {
    if (startsWithAny(toks, CANCEL) && toks.length <= 4) return { state: initialState(), line: "cancelled" };
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
    st.lead.need = said.trim().slice(0, 1000);
    return { state: initialState(), line: "booked", submit: st.lead };
  }

  const startBooking = (): Reply => ({ state: { ...st, step: "name", offered: false }, line: "bookName" });
  if (!toks.length) return { state: { ...st, offered: false }, line: "fallback" };

  const { best, top } = score(toks);
  const short = toks.length <= 4;

  // a quick "yes"/"no" right after Eva offered a consultation
  if (st.offered && top < 3) {
    if (startsWithAny(toks, NO)) return { state: { ...st, offered: false }, line: "no" };
    if (startsWithAny(toks, YES)) return startBooking();
  }

  if (best === "book") return startBooking();
  if (best === "bye") return { state: initialState(), line: "bye", end: true };
  if (best === "thanks") return { state: { ...st, offered: false }, line: "welcome" };
  if (best) {
    const a = ANSWER[best];
    return { state: { ...st, offered: a.offers }, line: a.line };
  }

  if (short && startsWithAny(toks, NO)) return { state: { ...st, offered: false }, line: "no" };
  if (short && startsWithAny(toks, YES)) return startBooking();
  if (startsWithAny(toks, HELLO)) return { state: { ...st, offered: false }, line: "hello" };
  // anything else that mentions Studio Base is most likely "what do you do?"
  if (matches(toks, "studio base") || matches(toks, "studiobase")) return { state: { ...st, offered: false }, line: "services" };
  return { state: { ...st, offered: false }, line: "fallback" };
}

export const pickLine = (id: LineId, lang: Lang) => LINES[id][lang];
