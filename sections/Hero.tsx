"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";

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
/*  Particle network (canvas) drawn over the video                     */
/* ------------------------------------------------------------------ */

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };

    let w = 0;
    let h = 0;
    let frame = 0;

    type Particle = { x: number; y: number; vx: number; vy: number; r: number };
    let particles: Particle[] = [];

    const build = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = w < 768 ? 35 : 80;

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.4 + 0.5,
      }));
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const LINK = 130;
    const MOUSE_LINK = 180;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const mdx = mouse.x - p.x;
        const mdy = mouse.y - p.y;
        const md = Math.hypot(mdx, mdy);

        if (md < MOUSE_LINK) {
          p.x += mdx * 0.004;
          p.y += mdy * 0.004;

          ctx.strokeStyle = `rgba(250, 204, 21, ${(1 - md / MOUSE_LINK) * 0.5})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        ctx.fillStyle = "rgba(250, 204, 21, 0.7)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);

          if (d < LINK) {
            ctx.strokeStyle = `rgba(250, 204, 21, ${(1 - d / LINK) * 0.2})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      frame = requestAnimationFrame(draw);
    };

    build();
    draw();

    window.addEventListener("resize", build);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", build);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

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
