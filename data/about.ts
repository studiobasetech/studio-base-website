/**
 * About Studio Base page content. Edit the text here.
 * Each visible text has an English (en) and Spanish (es) version.
 */
import type { Tone } from "@/sections/about/palette";
import type { Bi } from "@/lib/i18n";

export const pillars: { id: string; title: Bi; text: Bi; icon: "target" | "eye" | "chart"; tone: Tone }[] = [
  {
    id: "mission",
    title: { en: "Our Mission", es: "Nuestra misión" },
    text: {
      en: "To empower businesses through intelligent technology solutions that drive efficiency, innovation, and sustainable growth.",
      es: "Impulsar a las empresas con soluciones tecnológicas inteligentes que generan eficiencia, innovación y crecimiento sostenible.",
    },
    icon: "target",
    tone: "blue",
  },
  {
    id: "vision",
    title: { en: "Our Vision", es: "Nuestra visión" },
    text: {
      en: "To be a global technology partner recognized for creating innovative solutions that transform industries and shape a more connected, human-centered future.",
      es: "Ser un socio tecnológico global reconocido por crear soluciones innovadoras que transforman industrias y construyen un futuro más conectado y centrado en las personas.",
    },
    icon: "eye",
    tone: "purple",
  },
  {
    id: "approach",
    title: { en: "Our Approach", es: "Nuestro enfoque" },
    text: {
      en: "We combine technology, creativity, and strategic thinking with a flexible network of specialized professionals to deliver high-quality, scalable solutions that create real business impact.",
      es: "Combinamos tecnología, creatividad y pensamiento estratégico con una red flexible de profesionales especializados para entregar soluciones escalables y de alta calidad que generan un impacto real en tu negocio.",
    },
    icon: "chart",
    tone: "cyan",
  },
];

export const values: { title: Bi; text: Bi; icon: "bulb" | "users" | "focus" | "shield" | "heart"; tone: Tone }[] = [
  {
    title: { en: "INNOVATION", es: "INNOVACIÓN" },
    text: { en: "We embrace new ideas and technologies.", es: "Adoptamos nuevas ideas y tecnologías." },
    icon: "bulb",
    tone: "blue",
  },
  {
    title: { en: "COLLABORATION", es: "COLABORACIÓN" },
    text: { en: "We work together to achieve more.", es: "Trabajamos en equipo para lograr más." },
    icon: "users",
    tone: "purple",
  },
  {
    title: { en: "FOCUSED", es: "ENFOQUE" },
    text: { en: "We prioritize what truly matters.", es: "Priorizamos lo que realmente importa." },
    icon: "focus",
    tone: "cyan",
  },
  {
    title: { en: "RELIABLE", es: "CONFIABILIDAD" },
    text: { en: "We deliver with integrity and quality.", es: "Cumplimos con integridad y calidad." },
    icon: "shield",
    tone: "yellow",
  },
  {
    title: { en: "PEOPLE FIRST", es: "PERSONAS PRIMERO" },
    text: { en: "We build long-term relationships.", es: "Construimos relaciones a largo plazo." },
    icon: "heart",
    tone: "pink",
  },
];

/**
 * Expert categories in the Studio Base contractor network (from the
 * "Project-Based Technical Resource Network" document). `slots` is how
 * many profile cards to show for that category (generic avatars for now).
 */
export const expertCategories: {
  id: string;
  label: Bi;
  icon: "brain" | "code" | "phone" | "shield" | "pen" | "sales" | "language";
  tone: Tone;
  slots: number;
}[] = [
  { id: "ai", label: { en: "AI Engineers", es: "Ingenieros de IA" }, icon: "brain", tone: "purple", slots: 2 },
  { id: "fullstack", label: { en: "Full-Stack Developers", es: "Desarrolladores full-stack" }, icon: "code", tone: "yellow", slots: 2 },
  { id: "mobile", label: { en: "Mobile Developers", es: "Desarrolladores móviles" }, icon: "phone", tone: "cyan", slots: 2 },
  { id: "design", label: { en: "UI/UX Designers", es: "Diseñadores UI/UX" }, icon: "pen", tone: "pink", slots: 1 },
  { id: "sales", label: { en: "Sales Executives", es: "Ejecutivos de ventas" }, icon: "sales", tone: "green", slots: 5 },
  {
    id: "sales-es",
    label: { en: "Spanish Sales Executives", es: "Ejecutivos de ventas en español" },
    icon: "language",
    tone: "blue",
    slots: 5,
  },
];
