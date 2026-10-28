/**
 * Blog articles Eva can recommend during a call.
 * Kept small on purpose (titles + keywords only) so Eva doesn't load the
 * whole blog on every page. When you add a blog post, add a line here too.
 *
 * Keywords: lower case, no accents. A strong keyword (2 points) is enough on
 * its own; a general one (1 point) needs a second match.
 */
import { norm } from "./receptionist";
import type { Lang } from "@/lib/i18n";

type EvaArticle = {
  slug: string;
  title: { en: string; es: string };
  strong: string[];
  general: string[];
};

export const EVA_ARTICLES: EvaArticle[] = [
  {
    slug: "from-chatbots-to-agents",
    title: {
      en: "From Chatbots to Agents: How AI Is Learning to Get Work Done",
      es: "De chatbots a agentes: cómo la IA está aprendiendo a hacer el trabajo",
    },
    strong: ["ai agent", "ai agents", "agente de ia", "agentes de ia", "agentic", "agents"],
    general: ["chatbot", "chatbots", "agent", "agente", "agentes", "assistant", "asistente"],
  },
  {
    slug: "the-art-of-the-prompt",
    title: {
      en: "The Art of the Prompt: A Practical Guide to Working With Language Models",
      es: "El arte del prompt: guía práctica para trabajar con modelos de lenguaje",
    },
    strong: ["prompt", "prompts", "prompting", "chatgpt", "language model", "language models", "modelo de lenguaje", "modelos de lenguaje", "llm", "llms"],
    general: ["gpt", "gemini", "claude"],
  },
  {
    slug: "responsible-ai-for-everyday-businesses",
    title: {
      en: "Responsible AI for Everyday Businesses: Fairness, Privacy and Trust",
      es: "IA responsable para empresas comunes: equidad, privacidad y confianza",
    },
    strong: ["responsible ai", "ia responsable", "ai ethics", "etica", "ethics", "ethical", "bias", "sesgo", "fairness", "is ai safe", "es segura la ia"],
    general: ["trust", "confianza", "risk", "risks", "riesgo", "riesgos"],
  },
  {
    slug: "automation-people-actually-want",
    title: {
      en: "Automation People Actually Want: Designing Workflows That Stick",
      es: "Automatización que la gente sí quiere: cómo diseñar flujos de trabajo que perduren",
    },
    strong: ["workflow", "workflows", "flujo de trabajo", "flujos de trabajo"],
    general: ["automate", "automation", "automatizar", "automatizacion", "process", "processes", "proceso", "procesos", "team", "equipo", "employees", "empleados"],
  },
  {
    slug: "anatomy-of-a-fast-website",
    title: {
      en: "The Anatomy of a Fast Website: What Happens in the First Second",
      es: "Anatomía de un sitio web rápido: lo que pasa en el primer segundo",
    },
    strong: ["fast website", "slow website", "site speed", "page speed", "website speed", "load time", "loads slowly", "sitio lento", "pagina lenta", "sitio rapido", "velocidad"],
    general: ["website", "sitio web", "pagina web", "slow", "fast", "lento", "lenta", "rapido", "seo"],
  },
  {
    slug: "apis-the-invisible-glue",
    title: {
      en: "APIs: The Invisible Glue Holding the Digital Economy Together",
      es: "APIs: el pegamento invisible que mantiene unida la economía digital",
    },
    strong: ["api", "apis", "integration", "integrations", "integracion", "integraciones", "integrate", "integrar"],
    general: ["connect", "conectar", "sync", "sincronizar"],
  },
  {
    slug: "small-data-big-decisions",
    title: {
      en: "Small Data, Big Decisions: Making Analytics Work for Growing Businesses",
      es: "Datos pequeños, grandes decisiones: cómo hacer que la analítica funcione para empresas en crecimiento",
    },
    strong: ["analytics", "analitica", "kpi", "kpis", "metrics", "metricas", "business intelligence", "reports", "reportes"],
    general: ["data", "datos", "numbers", "numeros", "decisions", "decisiones"],
  },
  {
    slug: "cloud-costs-demystified",
    title: {
      en: "Cloud Costs Demystified: How to Stop Paying for Servers You Don’t Use",
      es: "Los costos de la nube, sin misterios: cómo dejar de pagar por servidores que no usas",
    },
    strong: ["cloud cost", "cloud costs", "cloud bill", "aws bill", "costos de la nube", "costo de la nube", "hosting costs", "reduce costs", "reducir costos"],
    general: ["cloud", "nube", "aws", "azure", "servers", "servidores", "expensive", "caro", "costs", "costos"],
  },
  {
    slug: "document-ai-paperwork-to-data",
    title: {
      en: "From Paperwork to Data: How Document AI Is Changing Back-Office Work",
      es: "Del papeleo a los datos: cómo la IA documental está cambiando el trabajo administrativo",
    },
    strong: ["invoice", "invoices", "factura", "facturas", "paperwork", "papeleo", "documents", "documentos", "pdf", "pdfs", "ocr", "data entry", "captura de datos", "receipts", "recibos"],
    general: ["document", "documento", "paper", "papel", "back office", "administrativo", "forms", "formularios"],
  },
  {
    slug: "rules-bots-or-ai",
    title: {
      en: "Rules, Bots or AI? Choosing the Right Kind of Automation",
      es: "¿Reglas, bots o IA? Cómo elegir el tipo de automatización adecuado",
    },
    strong: ["rpa", "kind of automation", "type of automation", "tipo de automatizacion", "bots or ai", "bots o ia", "do i need ai", "necesito ia"],
    general: ["bot", "bots", "rules", "reglas", "automation", "automatizacion"],
  },
  {
    slug: "accessibility-is-good-design",
    title: {
      en: "Accessibility Is Good Design: Building Websites Everyone Can Use",
      es: "La accesibilidad es buen diseño: cómo crear sitios web que todos puedan usar",
    },
    strong: ["accessibility", "accessible", "accesibilidad", "accesible", "ada", "wcag", "screen reader", "lector de pantalla", "disabilities", "discapacidad"],
    general: ["design", "diseno", "ux", "usability", "usabilidad"],
  },
  {
    slug: "clean-data-first",
    title: {
      en: "Clean Data First: Why Data Quality Matters More Than Dashboards",
      es: "Primero, datos limpios: por qué la calidad de los datos importa más que los dashboards",
    },
    strong: ["data quality", "calidad de datos", "calidad de los datos", "clean data", "datos limpios", "messy data", "duplicates", "duplicados", "spreadsheet", "spreadsheets", "excel", "hojas de calculo", "dashboard", "dashboards"],
    general: ["data", "datos", "database", "base de datos"],
  },
  {
    slug: "privacy-by-design",
    title: {
      en: "Privacy by Design: Collect Less Data, Earn More Trust",
      es: "Privacidad desde el diseño: recopila menos datos y gana más confianza",
    },
    strong: ["privacy", "privacidad", "gdpr", "personal data", "datos personales", "customer data", "datos de clientes", "data protection", "proteccion de datos"],
    general: ["secure", "security", "seguridad", "confidential", "confidencial"],
  },
  {
    slug: "serverless-containers-or-servers",
    title: {
      en: "Serverless, Containers or Servers? A Plain-Language Guide to Cloud Computing Choices",
      es: "¿Serverless, contenedores o servidores? Una guía en lenguaje sencillo para elegir cómo ejecutar tu software en la nube",
    },
    strong: ["serverless", "containers", "contenedores", "docker", "kubernetes", "where to host", "donde alojar"],
    general: ["server", "servidor", "cloud", "nube", "hosting"],
  },
  {
    slug: "cloud-migration-playbook",
    title: {
      en: "Moving to the Cloud Without the Chaos: A Practical Migration Playbook",
      es: "Migrar a la nube sin caos: una guía práctica de migración",
    },
    strong: ["migration", "migrate", "migrar", "migracion", "move to the cloud", "moving to the cloud", "pasar a la nube", "mover a la nube", "legacy", "old system", "sistema viejo", "sistema antiguo"],
    general: ["cloud", "nube", "modernize", "modernizar"],
  },
];

/** the visitor is asking for articles or the blog itself */
const BLOG_ASK = /\b(articles?|blog|blogs|posts?|reading|guides?|articulos?|leer|lectura|guias?|publicaciones?)\b/;

const has = (t: string, k: string) => ` ${t} `.includes(` ${k} `);

export type ArticleLink = { href: string; title: string };

/** best matching article for what the visitor said (or null), skipping ones already suggested */
export function findArticle(said: string, lang: Lang, skip: Set<string> = new Set()) {
  const t = norm(said);
  let best: EvaArticle | null = null;
  let bestScore = 0;
  for (const a of EVA_ARTICLES) {
    if (skip.has(a.slug)) continue;
    let score = 0;
    for (const k of a.strong) if (has(t, k)) score += 2;
    for (const k of a.general) if (has(t, k)) score += 1;
    if (score > bestScore) {
      best = a;
      bestScore = score;
    }
  }
  if (!best || bestScore < 2) return null;
  return { slug: best.slug, link: { href: `/blog/${best.slug}/`, title: best.title[lang] } as ArticleLink };
}

export const asksForArticles = (said: string) => BLOG_ASK.test(norm(said));

export const BLOG_LINK = (lang: Lang): ArticleLink => ({
  href: "/blog/",
  title: lang === "es" ? "Blog de Studio Base: todos los artículos" : "Studio Base blog: all articles",
});
