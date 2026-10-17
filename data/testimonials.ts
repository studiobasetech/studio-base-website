/**
 * Client reviews for the Home "Trusted by Innovative Companies" carousel.
 * Companies are shown by initials only, for client privacy.
 * tone: colour of the card (blue | purple | yellow | cyan | pink | green).
 */
import type { Bi } from "@/lib/i18n";

export type Testimonial = {
  initials: string;
  industry: Bi;
  service: Bi;
  quote: Bi;
  rating: number;
  tone: "blue" | "purple" | "yellow" | "cyan" | "pink" | "green";
};

export const testimonials: Testimonial[] = [
  {
    initials: "A.M.",
    industry: { en: "Business Operations", es: "Operaciones de negocio" },
    service: { en: "AI Automation", es: "Automatización con IA" },
    quote: {
      en: "Studio Base helped us identify repetitive tasks across our operations and turn them into automated workflows. The result is a more efficient process, less manual work, and more time for our team to focus on important priorities.",
      es: "Studio Base nos ayudó a identificar tareas repetitivas en nuestras operaciones y a convertirlas en flujos de trabajo automatizados. El resultado es un proceso más eficiente, menos trabajo manual y más tiempo para que nuestro equipo se enfoque en las prioridades importantes.",
    },
    rating: 5,
    tone: "blue",
  },
  {
    initials: "J.R.",
    industry: { en: "Technology", es: "Tecnología" },
    service: { en: "Software Engineering", es: "Ingeniería de software" },
    quote: {
      en: "We needed a custom software solution that could grow with our business. Studio Base helped us translate our requirements into a clear technical direction and a solution designed around our actual workflows.",
      es: "Necesitábamos una solución de software a la medida que pudiera crecer junto con nuestro negocio. Studio Base nos ayudó a traducir nuestros requerimientos en una dirección técnica clara y en una solución diseñada en torno a nuestros flujos de trabajo reales.",
    },
    rating: 5,
    tone: "purple",
  },
  {
    initials: "L.C.",
    industry: { en: "Digital Products", es: "Productos digitales" },
    service: { en: "Mobile Development", es: "Desarrollo móvil" },
    quote: {
      en: "Our goal was to create a modern mobile experience for our customers. The team understood the importance of usability, performance, and a consistent experience across devices. Communication throughout the process was clear and professional.",
      es: "Nuestro objetivo era crear una experiencia móvil moderna para nuestros clientes. El equipo entendió la importancia de la usabilidad, el rendimiento y una experiencia consistente en todos los dispositivos. La comunicación durante todo el proceso fue clara y profesional.",
    },
    rating: 5,
    tone: "yellow",
  },
  {
    initials: "K.B.",
    industry: { en: "Customer Support", es: "Atención al cliente" },
    service: { en: "AI Voice Agents", es: "Agentes de voz con IA" },
    quote: {
      en: "Our customer service has completely transformed since implementing our AI agents. Studio Base helped us deploy realistic voice assistants and automated support workflows that handle hundreds of interactions daily, improving response times and customer satisfaction.",
      es: "Nuestro servicio al cliente se transformó por completo desde que implementamos nuestros agentes de IA. Studio Base nos ayudó a poner en marcha asistentes de voz realistas y flujos de soporte automatizados que atienden cientos de interacciones al día, mejorando los tiempos de respuesta y la satisfacción de nuestros clientes.",
    },
    rating: 5,
    tone: "pink",
  },
  {
    initials: "S.T.",
    industry: { en: "Business Strategy", es: "Estrategia de negocio" },
    service: { en: "Technology Consulting", es: "Consultoría tecnológica" },
    quote: {
      en: "Studio Base provided strategic guidance that helped us choose the right technology and prioritize our next steps. Their insights went beyond individual tools and focused on how our systems, processes, and long-term business goals fit together.",
      es: "Studio Base nos brindó una asesoría estratégica que nos ayudó a elegir la tecnología adecuada y a priorizar nuestros siguientes pasos. Su visión fue más allá de herramientas individuales y se enfocó en cómo encajan nuestros sistemas, procesos y objetivos de negocio a largo plazo.",
    },
    rating: 5,
    tone: "cyan",
  },
  {
    initials: "M.P.",
    industry: { en: "Digital Platforms", es: "Plataformas digitales" },
    service: { en: "Custom Software", es: "Software a la medida" },
    quote: {
      en: "The team developed a robust digital platform that has streamlined our operations and improved efficiency across multiple departments. From planning to implementation, Studio Base delivered a solution that truly supports our business and future growth.",
      es: "El equipo desarrolló una plataforma digital robusta que ha agilizado nuestras operaciones y mejorado la eficiencia en varios departamentos. Desde la planeación hasta la implementación, Studio Base entregó una solución que realmente respalda nuestro negocio y nuestro crecimiento futuro.",
    },
    rating: 5,
    tone: "green",
  },
];
