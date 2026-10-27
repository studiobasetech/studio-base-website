/**
 * Content for the Products & Services page.
 * Edit the text here; the design lives in sections/products-services/.
 *
 * accent picks the color: "yellow" | "purple" | "blue" | "cyan"
 */

import type { Bi, Text } from "@/lib/i18n";

export type Accent = "yellow" | "purple" | "blue" | "cyan";

export type TechProduct = {
  id: string;
  /** Product name (same in both languages) */
  title: Text;
  subtitle: Bi;
  description: Bi;
  capabilities: Bi[];
  image: string;
  href: string;
  accent: Accent;
};

export type TechService = {
  icon: string;
  /** "\n" marks the line break */
  title: Bi;
  description: Bi;
  accent: Accent;
};

export type Reason = {
  icon: string;
  /** "\n" marks the line break */
  title: Bi;
  description: Bi;
  accent: Accent;
};

/* ------------------------------------------------------------------ */
/*  Our Technology Products                                            */
/* ------------------------------------------------------------------ */

export const techProducts: TechProduct[] = [
  {
    id: "hcrm-ai",
    title: "HCRM AI",
    subtitle: {
      en: "AI-Powered Business Automation Platform",
      es: "Plataforma de automatización empresarial con IA",
    },
    description: {
      en: "HCRM AI is an intelligent automation platform designed to help companies optimize operations, automate business processes, and improve productivity through advanced AI.",
      es: "HCRM AI es una plataforma de automatización inteligente diseñada para ayudar a las empresas a optimizar sus operaciones, automatizar procesos de negocio y aumentar su productividad con IA avanzada.",
    },
    capabilities: [
      { en: "AI Sales Agents", es: "Agentes de ventas con IA" },
      { en: "Automated Customer Communication", es: "Comunicación automatizada con clientes" },
      { en: "Lead Qualification Automation", es: "Calificación automatizada de prospectos" },
      { en: "CRM Process Automation", es: "Automatización de procesos de CRM" },
      { en: "Intelligent Workflow Management", es: "Gestión inteligente de flujos de trabajo" },
      { en: "Business Process Optimization", es: "Optimización de procesos de negocio" },
      { en: "Data Analysis & Insights", es: "Análisis de datos e información clave" },
    ],
    image: "/images/hcrm-ai-v2.webp",
    href: "/contact#contact-form",
    accent: "purple",
  },
  {
    id: "baselead-ai",
    title: "BaseLead AI",
    subtitle: {
      en: "AI-Powered Client Acquisition & Sales Intelligence Platform",
      es: "Plataforma de captación de clientes e inteligencia comercial con IA",
    },
    description: {
      en: "BaseLead AI helps businesses identify potential customers, discover opportunities, generate personalized outreach strategies, and manage sales pipelines using artificial intelligence and data-driven insights.",
      es: "BaseLead AI ayuda a las empresas a identificar clientes potenciales, descubrir oportunidades, crear estrategias de contacto personalizadas y gestionar su embudo de ventas con inteligencia artificial y análisis de datos.",
    },
    capabilities: [
      { en: "AI-Powered Lead Discovery", es: "Descubrimiento de prospectos con IA" },
      { en: "Customer Prospect Identification", es: "Identificación de clientes potenciales" },
      { en: "Business Opportunity Analysis", es: "Análisis de oportunidades de negocio" },
      { en: "Intelligent Lead Qualification", es: "Calificación inteligente de prospectos" },
      { en: "Automated Sales Research", es: "Investigación de ventas automatizada" },
      { en: "Personalized Outreach Generation", es: "Generación de mensajes de contacto personalizados" },
      { en: "Sales Pipeline Management", es: "Gestión del embudo de ventas" },
      { en: "CRM Integration", es: "Integración con CRM" },
    ],
    image: "/images/baselead-ai-blue.webp",
    href: "/contact#contact-form",
    accent: "blue",
  },
];

/* ------------------------------------------------------------------ */
/*  Our Technology Services                                            */
/* ------------------------------------------------------------------ */

// icon names match components in sections/products-services/TechServices.tsx
export const techServices: TechService[] = [
  {
    icon: "ai",
    title: { en: "Artificial Intelligence\n& Business Automation", es: "Inteligencia artificial\ny automatización empresarial" },
    description: {
      en: "AI agents, intelligent process automation, sales automation, workflow automation, and custom AI integrations.",
      es: "Agentes de IA, automatización inteligente de procesos, automatización de ventas, automatización de flujos de trabajo e integraciones de IA a la medida.",
    },
    accent: "blue",
  },
  {
    icon: "software",
    title: { en: "Custom\nSoftware Engineering", es: "Ingeniería de software\na la medida" },
    description: {
      en: "Enterprise software development, SaaS platforms, APIs, databases, internal business systems, and software optimization.",
      es: "Desarrollo de software empresarial, plataformas SaaS, APIs, bases de datos, sistemas internos de negocio y optimización de software.",
    },
    accent: "purple",
  },
  {
    icon: "apps",
    title: { en: "Application\nDevelopment", es: "Desarrollo de\naplicaciones" },
    description: {
      en: "Mobile applications, web applications, cross-platform solutions, application architecture, and maintenance.",
      es: "Aplicaciones móviles, aplicaciones web, soluciones multiplataforma, arquitectura de aplicaciones y mantenimiento.",
    },
    accent: "yellow",
  },
  {
    icon: "web",
    title: { en: "Digital Platforms\n& Web Engineering", es: "Plataformas digitales\ne ingeniería web" },
    description: {
      en: "Corporate websites, e-commerce platforms, customer portals, web-based business systems, and digital optimization.",
      es: "Sitios web corporativos, plataformas de e-commerce, portales para clientes, sistemas de negocio en la web y optimización digital.",
    },
    accent: "cyan",
  },
  {
    icon: "cloud",
    title: { en: "Software Deployment\n& Cloud Integration", es: "Despliegue de software\ne integración en la nube" },
    description: {
      en: "Cloud infrastructure, server deployment, system integration, DevOps, scalable architecture, and cloud optimization.",
      es: "Infraestructura en la nube, despliegue de servidores, integración de sistemas, DevOps, arquitectura escalable y optimización en la nube.",
    },
    accent: "purple",
  },
  {
    icon: "analytics",
    title: { en: "Business Intelligence\n& Analytics", es: "Inteligencia de negocios\ny analítica" },
    description: {
      en: "Business intelligence systems, analytics dashboards, data integration, predictive analytics, and AI-based data solutions.",
      es: "Sistemas de inteligencia de negocios, tableros analíticos, integración de datos, analítica predictiva y soluciones de datos con IA.",
    },
    accent: "cyan",
  },
  {
    icon: "strategy",
    title: { en: "Technology Strategy\n& AI Consulting", es: "Estrategia tecnológica\ny consultoría en IA" },
    description: {
      en: "Technology strategy, AI adoption consulting, software architecture, digital transformation planning, and process optimization.",
      es: "Estrategia tecnológica, consultoría para adoptar IA, arquitectura de software, planeación de la transformación digital y optimización de procesos.",
    },
    accent: "blue",
  },
];

/* ------------------------------------------------------------------ */
/*  Why Studio Base                                                    */
/* ------------------------------------------------------------------ */

export const reasons: Reason[] = [
  {
    icon: "innovation",
    title: { en: "Innovative\nTechnology", es: "Tecnología\ninnovadora" },
    description: {
      en: "Cutting-edge AI solutions designed for real business impact.",
      es: "Soluciones de IA de vanguardia diseñadas para generar un impacto real en tu negocio.",
    },
    accent: "purple",
  },
  {
    icon: "results",
    title: { en: "Measurable\nResults", es: "Resultados\nmedibles" },
    description: {
      en: "Increased efficiency, productivity and growth.",
      es: "Más eficiencia, productividad y crecimiento.",
    },
    accent: "blue",
  },
  {
    icon: "expertise",
    title: { en: "Trusted\nExpertise", es: "Experiencia\nconfiable" },
    description: {
      en: "A network of specialized experts in AI, software, mobile, and design.",
      es: "Una red de expertos especializados en IA, software, desarrollo móvil y diseño.",
    },
    accent: "yellow",
  },
  {
    icon: "scalable",
    title: { en: "Scalable\nSolutions", es: "Soluciones\nescalables" },
    description: {
      en: "Technology that grows with your business.",
      es: "Tecnología que crece con tu negocio.",
    },
    accent: "purple",
  },
];
