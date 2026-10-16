"use client";

import { Lightbulb, Users, Target, HeartHandshake } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";

const values = [
  {
    icon: Lightbulb,
    title: "Innovative Technology",
    description:
      "Cutting-edge solutions designed to create real business impact.",
    accent: "blue",
    rgb: "59,130,246",
  },
  {
    icon: Users,
    title: "Expert Team",
    description:
      "A network of specialized professionals delivering excellence.",
    accent: "purple",
    rgb: "168,85,247",
  },
  {
    icon: Target,
    title: "Focused on Results",
    description: "Measurable outcomes and solutions built around growth.",
    accent: "cyan",
    rgb: "34,211,238",
  },
  {
    icon: HeartHandshake,
    title: "Committed to Your Success",
    description: "We build long-term partnerships with our clients.",
    accent: "pink",
    rgb: "236,72,153",
  },
];

// Full class names are written out so Tailwind can detect them.
const styles = {
  blue: {
    card: "border-blue-500/40 hover:border-blue-500 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]",
    glow: "bg-blue-500/20",
    icon: "text-blue-500 border-blue-500/50 shadow-blue-500/20",
    title: "group-hover:text-blue-500",
  },
  purple: {
    card: "border-purple-500/40 hover:border-purple-500 hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.55)]",
    glow: "bg-purple-500/20",
    icon: "text-purple-400 border-purple-400/50 shadow-purple-400/20",
    title: "group-hover:text-purple-400",
  },
  cyan: {
    card: "border-cyan-400/40 hover:border-cyan-400 hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.5)]",
    glow: "bg-cyan-400/20",
    icon: "text-cyan-400 border-cyan-400/50 shadow-cyan-400/20",
    title: "group-hover:text-cyan-400",
  },
  pink: {
    card: "border-pink-500/40 hover:border-pink-500 hover:shadow-[0_0_40px_-10px_rgba(236,72,153,0.55)]",
    glow: "bg-pink-500/20",
    icon: "text-pink-400 border-pink-400/50 shadow-pink-400/20",
    title: "group-hover:text-pink-400",
  },
};

const EASE = [0.22, 1, 0.36, 1] as const;

const copyContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const copyItem: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

const cardsContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 36, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

type Value = (typeof values)[number];

function ValueCard({ item, index }: { item: Value; index: number }) {
  const Icon = item.icon;
  const style = styles[item.accent as keyof typeof styles];

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), {
    stiffness: 150,
    damping: 18,
  });

  const sx = useSpring(mx, { stiffness: 120, damping: 24 });
  const sy = useSpring(my, { stiffness: 120, damping: 24 });
  const spotlightX = useTransform(sx, [-0.5, 0.5], ["0%", "100%"]);
  const spotlightY = useTransform(sy, [-0.5, 0.5], ["0%", "100%"]);
  const spotlight = useMotionTemplate`radial-gradient(180px circle at ${spotlightX} ${spotlightY}, rgba(${item.rgb},0.14), transparent 65%)`;

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
    <motion.div
      variants={cardItem}
      data-cursor
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ y: -8 }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={`
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        bg-[#090909]
        p-6
        transition-colors
        duration-300
        ${style.card}
      `}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlight }}
      />

      {/* Background glow */}
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] }}
        transition={{
          duration: 4.5 + index * 0.4,
          delay: index * 0.25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`
          pointer-events-none
          absolute
          -right-8
          -top-8
          h-32
          w-32
          rounded-full
          blur-3xl
          ${style.glow}
        `}
      />

      <div className="relative">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 3.2 + index * 0.35,
            delay: index * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            border
            bg-black
            shadow-lg
            ${style.icon}
          `}
        >
          <motion.div
            whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
            transition={{ duration: 0.55 }}
          >
            <Icon size={28} />
          </motion.div>
        </motion.div>

        <h3
          className={`
            mt-5
            text-sm
            font-semibold
            text-white
            transition
            duration-300
            ${style.title}
          `}
        >
          {item.title}
        </h3>

        <p className="mt-3 text-xs leading-relaxed text-zinc-500 transition duration-300 group-hover:text-zinc-400">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function WhyStudio() {
  return (
    <section className="bg-black px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* LEFT */}

          <motion.div
            variants={copyContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p
              variants={copyItem}
              className="text-xs tracking-[0.4em] text-zinc-500"
            >
              WHY STUDIO BASE
            </motion.p>

            <motion.h2
              variants={copyItem}
              className="mt-5 text-4xl font-semibold leading-tight text-white md:text-6xl"
            >
              More Than a
              <br />
              <motion.span
                animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                className="inline-block bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 bg-[length:200%_100%] bg-clip-text text-transparent"
              >
                Technology Provider.
              </motion.span>
              <br />A Strategic Partner
              <br />
              for Growth.
            </motion.h2>

            <motion.p
              variants={copyItem}
              className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400"
            >
              We combine technology, strategy, and innovation to help
              businesses transform ideas into scalable digital solutions that
              create measurable results.
            </motion.p>
          </motion.div>

          {/* RIGHT */}

          <motion.div
            variants={cardsContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-2 gap-6"
          >
            {values.map((item, index) => (
              <ValueCard key={item.title} item={item} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
