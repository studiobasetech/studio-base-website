"use client";

import { useState } from "react";
import {
  BrainCircuit,
  Code2,
  Smartphone,
  Lightbulb,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useLang, type Bi } from "@/lib/i18n";

const services: {
  icon: typeof BrainCircuit;
  title: Bi;
  description: Bi;
  features: Bi[];
  color: string;
}[] = [
  {
    icon: BrainCircuit,
    title: { en: "AI Solutions\n& Automation", es: "Soluciones de IA\ny automatización" },
    description: {
      en: "Custom AI agents and automation systems that streamline operations, reduce manual work, and increase productivity.",
      es: "Agentes de IA y sistemas de automatización a la medida que agilizan las operaciones, reducen el trabajo manual y aumentan la productividad.",
    },
    features: [
      { en: "AI Agents & Assistants", es: "Agentes y asistentes de IA" },
      { en: "Process Automation", es: "Automatización de procesos" },
      { en: "Data Analysis & Insights", es: "Análisis de datos e insights" },
      { en: "Workflow Optimization", es: "Optimización de flujos de trabajo" },
    ],
    color: "blue",
  },

  {
    icon: Code2,
    title: { en: "Software\nEngineering", es: "Ingeniería\nde software" },
    description: {
      en: "Scalable web platforms, SaaS products, and custom software built for your business needs.",
      es: "Plataformas web escalables, productos SaaS y software a la medida, creados para las necesidades de tu negocio.",
    },
    features: [
      { en: "Web Applications", es: "Aplicaciones web" },
      { en: "SaaS Development", es: "Desarrollo SaaS" },
      { en: "API Integrations", es: "Integraciones de API" },
      { en: "Custom Software", es: "Software a la medida" },
    ],
    color: "purple",
  },

  {
    icon: Smartphone,
    title: { en: "Mobile Application\nDevelopment", es: "Desarrollo de\naplicaciones móviles" },
    description: {
      en: "High-performance iOS and Android applications with modern architecture.",
      es: "Aplicaciones para iOS y Android de alto rendimiento, con arquitectura moderna.",
    },
    features: [
      { en: "iOS & Android Apps", es: "Apps para iOS y Android" },
      { en: "Cross-Platform Solutions", es: "Soluciones multiplataforma" },
      { en: "App Design & Development", es: "Diseño y desarrollo de apps" },
      { en: "Maintenance & Support", es: "Mantenimiento y soporte" },
    ],
    color: "yellow",
  },


  {
    icon: Lightbulb,
    title: { en: "Technology\nConsulting", es: "Consultoría\ntecnológica" },
    description: {
      en: "Strategic guidance to help your business choose and scale the right technology.",
      es: "Asesoría estratégica para que tu negocio elija y escale la tecnología adecuada.",
    },
    features: [
      { en: "Technology Strategy", es: "Estrategia tecnológica" },
      { en: "Architecture Planning", es: "Planeación de arquitectura" },
      { en: "Process Optimization", es: "Optimización de procesos" },
      { en: "Team Guidance", es: "Acompañamiento a equipos" },
    ],
    color: "pink",
  },
];

type ColorKey = "blue" | "purple" | "yellow" | "cyan" | "pink";

// Base colors (border + icon color)
const colors = {
  blue: "border-blue-500/40 text-blue-500",
  purple: "border-purple-500/40 text-purple-400",
  yellow: "border-yellow-400/40 text-yellow-300",
  cyan: "border-cyan-400/40 text-cyan-400",
  pink: "border-pink-500/40 text-pink-400",
};

// Brighter border on hover
const hoverBorder = {
  blue: "hover:border-blue-500",
  purple: "hover:border-purple-500",
  yellow: "hover:border-yellow-400",
  cyan: "hover:border-cyan-400",
  pink: "hover:border-pink-500",
};

// Full border when the card is selected
const selectedBorder = {
  blue: "border-blue-500 text-blue-500",
  purple: "border-purple-500 text-purple-400",
  yellow: "border-yellow-400 text-yellow-300",
  cyan: "border-cyan-400 text-cyan-400",
  pink: "border-pink-500 text-pink-400",
};

// RGB values used for the glow shadows
const rgb = {
  blue: "59,130,246",
  purple: "168,85,247",
  yellow: "250,204,21",
  cyan: "34,211,238",
  pink: "236,72,153",
};

// Soft glow blob in the corner of each card
const glowColors = {
  blue: "bg-blue-500/20",
  purple: "bg-purple-500/20",
  yellow: "bg-yellow-400/20",
  cyan: "bg-cyan-400/20",
  pink: "bg-pink-500/20",
};

// Title color when hovered or selected
const titleHover = {
  blue: "group-hover:text-blue-500",
  purple: "group-hover:text-purple-400",
  yellow: "group-hover:text-yellow-300",
  cyan: "group-hover:text-cyan-400",
  pink: "group-hover:text-pink-400",
};

const titleOn = {
  blue: "text-blue-500",
  purple: "text-purple-400",
  yellow: "text-yellow-300",
  cyan: "text-cyan-400",
  pink: "text-pink-400",
};

// Plus button color when hovered or selected
const plusHover = {
  blue: "group-hover:border-blue-500 group-hover:text-blue-500",
  purple: "group-hover:border-purple-400 group-hover:text-purple-400",
  yellow: "group-hover:border-yellow-300 group-hover:text-yellow-300",
  cyan: "group-hover:border-cyan-400 group-hover:text-cyan-400",
  pink: "group-hover:border-pink-400 group-hover:text-pink-400",
};

const plusOn = {
  blue: "border-blue-500 text-blue-500",
  purple: "border-purple-400 text-purple-400",
  yellow: "border-yellow-300 text-yellow-300",
  cyan: "border-cyan-400 text-cyan-400",
  pink: "border-pink-400 text-pink-400",
};

const bulletColors = {
  blue: "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]",
  purple: "bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]",
  yellow: "bg-yellow-300 shadow-[0_0_8px_rgba(253,224,71,0.8)]",
  cyan: "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]",
  pink: "bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.8)]",
};

const dotColors = {
  blue: "bg-blue-500",
  purple: "bg-purple-400",
  yellow: "bg-yellow-300",
  cyan: "bg-cyan-400",
  pink: "bg-pink-400",
};

type Service = (typeof services)[number];

function ServiceCard({
  service,
  index,
  selected,
  dimmed,
  onSelect,
}: {
  service: Service;
  index: number;
  selected: boolean;
  dimmed: boolean;
  onSelect: () => void;
}) {
  const { t } = useLang();
  const key = service.color as ColorKey;
  const Icon = service.icon;

  /* 3D tilt that follows the mouse */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), {
    stiffness: 150,
    damping: 18,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    // Outer wrapper: controls the width (selected card gets wider)
    <motion.div
      initial={false}
      animate={{
        flexGrow: selected ? 1.5 : 1,
        opacity: dimmed ? 0.5 : 1,
        scale: dimmed ? 0.96 : 1,
      }}
      transition={{ type: "spring", stiffness: 140, damping: 20 }}
      className={`min-w-0 flex-1 basis-0 ${selected ? "relative z-20" : ""}`}
    >
      {/* Inner card: floats, tilts and glows */}
      <motion.div
        data-cursor
        onClick={onSelect}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        whileHover={{
          scale: selected ? 1.04 : 1.04,
          boxShadow: `0 0 40px -10px rgba(${rgb[key]},0.55)`,
        }}
        whileTap={{ scale: 0.98 }}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        animate={{
          y: selected ? -8 : [0, -10, 0],
          scale: selected ? 1.04 : 1,
          boxShadow: selected
            ? `0 0 70px -8px rgba(${rgb[key]},0.6)`
            : `0 0 0px 0px rgba(${rgb[key]},0)`,
        }}
        transition={{
          y: selected
            ? { duration: 0.4 }
            : {
                duration: 4.5 + (index % 3) * 0.9,
                delay: index * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              },
          scale: { duration: 0.4 },
          boxShadow: { duration: 0.4 },
        }}
        className={`
          group
          relative
          flex
          h-full
          min-h-[330px]
          cursor-pointer
          flex-col
          overflow-hidden
          rounded-xl
          border
          bg-[#080808]
          p-5
          pb-12
          transition-colors
          duration-300
          ${selected ? selectedBorder[key] : `${colors[key]} ${hoverBorder[key]}`}
        `}
      >
        {/* Corner glow */}
        <motion.div
          animate={{ scale: selected ? 2 : 1 }}
          transition={{ duration: 0.6 }}
          className={`
            pointer-events-none
            absolute
            -right-8
            -top-8
            h-32
            w-32
            rounded-full
            blur-3xl
            ${glowColors[key]}
          `}
        />

        {/* CONTENT */}

        <div className="relative flex flex-1 flex-col">
          {/* ICON */}

          <motion.div
            animate={{ scale: selected ? 1.2 : 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className={`
              mb-4
              flex
              h-9
              w-9
              origin-left
              items-center
              justify-center
              rounded-md
              bg-white/[0.05]
              ${colors[key]}
            `}
          >
            <Icon size={20} />
          </motion.div>

          {/* TITLE */}

          <h3
            className={`
              whitespace-pre-line
              text-sm
              font-semibold
              leading-tight
              transition-colors
              duration-300
              ${selected ? titleOn[key] : `text-white ${titleHover[key]}`}
            `}
          >
            {t(service.title)}
          </h3>

          {/* DESCRIPTION */}

          <p className="mt-3 text-sm leading-relaxed text-zinc-300">
            {t(service.description)}
          </p>

          {/* FEATURES */}

          <ul className="mt-5 space-y-2.5">
            {service.features.map((feature, i) => (
              <motion.li
                key={feature.en}
                animate={{ x: selected ? [0, 6, 0] : 0 }}
                transition={{ delay: selected ? i * 0.06 : 0, duration: 0.4 }}
                className="flex items-center gap-2.5 text-xs font-medium text-zinc-300"
              >
                <span
                  className={`
                    relative
                    flex
                    h-2.5
                    w-2.5
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    ${bulletColors[key]}
                  `}
                >
                  <span className="h-1 w-1 rounded-full bg-black/40" />
                </span>

                <span>{t(feature)}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* PLUS BUTTON (turns into an X when the card is selected) */}

        <motion.span
          animate={{ rotate: selected ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 250, damping: 18 }}
          className={`
            absolute
            bottom-3
            left-5
            z-10
            flex
            h-6
            w-6
            items-center
            justify-center
            rounded-full
            border
            bg-black
            transition-colors
            duration-300
            ${
              selected
                ? plusOn[key]
                : `border-white/20 text-white ${plusHover[key]}`
            }
          `}
        >
          <Plus size={12} />
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const { t, tr, lang } = useLang();
  const [selected, setSelected] = useState<number | null>(null);

  const total = services.length;

  const toggle = (i: number) => setSelected(selected === i ? null : i);

  const next = () =>
    setSelected(selected === null ? 0 : (selected + 1) % total);

  const prev = () =>
    setSelected(selected === null ? total - 1 : (selected - 1 + total) % total);

  return (
    <section className="bg-black px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}

        <div className="mb-8">
          <p className="text-xs tracking-[0.4em] text-zinc-400">{tr("OUR SERVICES", "NUESTROS SERVICIOS")}</p>

          <h2 className="mt-4 max-w-5xl text-3xl font-semibold leading-tight text-white sm:text-4xl md:whitespace-nowrap md:text-5xl">
            {lang === "es" ? (
              <>
                <span className="text-blue-500">Soluciones tecnológicas</span>{" "}
                integrales
                <br />
                para empresas modernas.
              </>
            ) : (
              <>
                End-to-End{" "}
                <span className="text-blue-500">Technology Solutions</span>
                <br />
                for Modern Businesses.
              </>
            )}
          </h2>
        </div>

        {/* CARDS (carousel) */}

        <div className="flex flex-col gap-3 py-4 lg:flex-row">
          {services.map((service, i) => (
            <ServiceCard
              key={service.title.en}
              service={service}
              index={i}
              selected={selected === i}
              dimmed={selected !== null && selected !== i}
              onSelect={() => toggle(i)}
            />
          ))}
        </div>

        {/* Carousel controls */}

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            aria-label={tr("Previous service", "Servicio anterior")}
            onClick={prev}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-zinc-300 transition hover:border-white/40 hover:text-white"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {services.map((service, i) => (
              <button
                key={service.title.en}
                aria-label={`${tr("Select", "Seleccionar")} ${t(service.title).replace("\n", " ")}`}
                onClick={() => toggle(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  selected === i
                    ? `w-8 ${dotColors[service.color as ColorKey]}`
                    : "w-2 bg-zinc-700 hover:bg-zinc-500"
                }`}
              />
            ))}
          </div>

          <button
            aria-label={tr("Next service", "Siguiente servicio")}
            onClick={next}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-zinc-300 transition hover:border-white/40 hover:text-white"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}