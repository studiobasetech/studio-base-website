"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";

import ParticleField from "@/components/ParticleField";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

// Headline split into two lines; the second line is yellow.
const headlineLines = [
  { words: ["Technology", "Solutions"], accent: false },
  { words: ["for", "a", "Smarter", "Future."], accent: true },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const word: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export default function Hero() {
  const mx = useMotionValue(0); // mouse in px (spotlight)
  const my = useMotionValue(0);
  const nx = useMotionValue(0); // mouse from -0.5 to 0.5 (parallax)
  const ny = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 120, damping: 24 });
  const sy = useSpring(my, { stiffness: 120, damping: 24 });

  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, rgba(250,204,21,0.14), transparent 65%)`;

  const spring = { stiffness: 50, damping: 20 };

  // Video drifts slightly opposite to the mouse, for depth
  const videoX = useSpring(useTransform(nx, [-0.5, 0.5], [18, -18]), spring);
  const videoY = useSpring(useTransform(ny, [-0.5, 0.5], [12, -12]), spring);

  useEffect(() => {
    mx.set(window.innerWidth * 0.6);
    my.set(window.innerHeight * 0.4);
  }, [mx, my]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    mx.set(px);
    my.set(py);
    nx.set(px / rect.width - 0.5);
    ny.set(py / rect.height - 0.5);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-black text-white"
    >
      {/* Background Video (parallax + slow zoom) */}
      <motion.div
        style={{ x: videoX, y: videoY }}
        className="absolute inset-0"
      >
        <motion.div
          animate={{ scale: [1.08, 1.16, 1.08] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="h-full w-full"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </motion.div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Extra Gradient for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      {/* Particle network */}
      <ParticleField />

      {/* Cursor spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlight }}
      />

      {/* Drifting glow behind the text */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-24 top-1/3 h-[420px] w-[420px] rounded-full bg-yellow-400/10 blur-[120px]"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 lg:px-12">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-xl"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-sm tracking-[0.4em] text-yellow-400"
          >
            TECHNOLOGY. STRATEGY. REAL IMPACT.
          </motion.p>

          <motion.h1
            variants={container}
            className="text-5xl font-semibold leading-tight md:text-7xl"
          >
            {headlineLines.map((line, li) => (
              <span key={li} className="block">
                {line.words.map((w, wi) => (
                  <motion.span
                    key={wi}
                    variants={word}
                    className="inline-block"
                    style={{ marginRight: "0.3em" }}
                  >
                    {line.accent ? (
                      <motion.span
                        animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                        }}
                        className="inline-block bg-gradient-to-r from-yellow-400 via-yellow-100 to-yellow-400 bg-[length:200%_100%] bg-clip-text text-transparent"
                      >
                        {w}
                      </motion.span>
                    ) : (
                      w
                    )}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-lg leading-relaxed text-zinc-300"
          >
            Studio Base develops AI-powered products, custom software
            solutions, cybersecurity, and digital infrastructure that help
            businesses automate, scale, and grow.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(250,204,21,0.5)",
                  "0 0 0 18px rgba(250,204,21,0)",
                ],
              }}
              transition={{
                boxShadow: { duration: 1.8, repeat: Infinity, ease: "easeOut" },
              }}
              className="relative overflow-hidden rounded-full bg-yellow-400 px-8 py-3 font-medium text-black transition-colors hover:bg-yellow-300"
            >
              {/* Light sweep across the button */}
              <motion.span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                animate={{ x: ["-120%", "420%"] }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  repeatDelay: 2.2,
                  ease: "easeInOut",
                }}
              />
              <span className="relative">Book a Consultation →</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-full border border-zinc-600 px-8 py-3 transition-colors hover:border-yellow-400 hover:text-yellow-400"
            >
              Explore Our Services
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Glowing line at the bottom edge */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex justify-center">
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-6 justify-center rounded-full border border-white/30 pt-2"
        >
          <span className="h-2 w-1 rounded-full bg-yellow-400" />
        </motion.div>
      </div>
    </section>
  );
}
