"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  animate,
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

const headline = [
  { text: "Building" },
  { text: "Intelligent" },
  { text: "Technology", accent: true },
  { text: "Solutions", accent: true },
  { text: "for" },
  { text: "the" },
  { text: "Future" },
];

const chips = [
  { label: "AI Agents", pos: "left-0 top-[12%]", duration: 5.5, delay: 0 },
  { label: "Automation", pos: "right-0 top-[20%]", duration: 6.5, delay: 0.8 },
  { label: "Cybersecurity", pos: "left-[2%] bottom-[16%]", duration: 6, delay: 1.4 },
  { label: "Software", pos: "right-[3%] bottom-[8%]", duration: 5, delay: 0.4 },
];

const checks = ["Lead Discovery", "AI Outreach", "Sales Intelligence"];

// Heights (in %) the little chart bars move between
const bars = [
  [30, 70], [50, 90], [25, 60], [60, 100],
  [40, 80], [55, 95], [35, 75], [65, 100],
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
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
/*  Particle network (canvas)                                          */
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

      const count = w < 768 ? 45 : 95;

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 1.5 + 0.6,
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

    const LINK = 130; // distance where two particles get connected
    const MOUSE_LINK = 180; // distance where the cursor connects to particles

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // Gentle pull toward the cursor
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

        ctx.fillStyle = "rgba(250, 204, 21, 0.75)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);

          if (d < LINK) {
            ctx.strokeStyle = `rgba(250, 204, 21, ${(1 - d / LINK) * 0.22})`;
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
/*  Moving perspective grid floor                                      */
/* ------------------------------------------------------------------ */

function GridFloor() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] overflow-hidden"
      style={{
        perspective: 500,
        WebkitMaskImage:
          "linear-gradient(to top, black 0%, black 25%, transparent 100%)",
        maskImage:
          "linear-gradient(to top, black 0%, black 25%, transparent 100%)",
      }}
    >
      <motion.div
        className="absolute -inset-x-[50%] bottom-0 h-[200%] origin-bottom"
        style={{
          rotateX: 62,
          backgroundImage:
            "linear-gradient(rgba(250,204,21,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(250,204,21,0.22) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "0px 64px"] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export default function Hero() {
  /* Mouse position in px (for the spotlight) and -0.5..0.5 (for parallax) */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);

  const spring = { stiffness: 70, damping: 18 };

  const sx = useSpring(mx, { stiffness: 120, damping: 24 });
  const sy = useSpring(my, { stiffness: 120, damping: 24 });

  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, rgba(250,204,21,0.12), transparent 65%)`;

  const visualX = useSpring(useTransform(nx, [-0.5, 0.5], [-22, 22]), spring);
  const visualY = useSpring(useTransform(ny, [-0.5, 0.5], [-22, 22]), spring);
  const glowX = useSpring(useTransform(nx, [-0.5, 0.5], [40, -40]), spring);
  const glowY = useSpring(useTransform(ny, [-0.5, 0.5], [40, -40]), spring);

  // 3D tilt of the card
  const tiltX = useSpring(useTransform(ny, [-0.5, 0.5], [9, -9]), spring);
  const tiltY = useSpring(useTransform(nx, [-0.5, 0.5], [-12, 12]), spring);

  // Count-up number inside the card
  const leads = useMotionValue(0);
  const leadsText = useTransform(leads, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    mx.set(window.innerWidth * 0.65);
    my.set(window.innerHeight * 0.4);

    const controls = animate(leads, 2847, {
      duration: 2.6,
      delay: 1.3,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [mx, my, leads]);

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
      className="relative flex min-h-screen items-center overflow-hidden bg-black px-8 pt-32"
    >
      {/* Layer 1: moving grid floor */}
      <GridFloor />

      {/* Layer 2: particle network */}
      <ParticleField />

      {/* Layer 3: cursor spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlight }}
      />

      {/* Layer 4: drifting glows */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none absolute left-1/2 top-1/2 -ml-[300px] -mt-[300px] h-[600px] w-[600px]"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 70, 0], y: [0, -50, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="h-full w-full rounded-full bg-yellow-400/10 blur-[120px]"
        />
      </motion.div>

      <motion.div
        animate={{ x: [0, -90, 0], y: [0, 70, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-20 top-10 h-[460px] w-[460px] rounded-full bg-purple-500/15 blur-[120px]"
      />

      {/* Fade into the next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-40 bg-gradient-to-t from-black to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* TEXT */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={fadeUp}
            className="mb-6 text-sm uppercase tracking-[0.3em] text-yellow-400"
          >
            Artificial Intelligence • Software • Cybersecurity
          </motion.p>

          <motion.h1
            variants={container}
            className="text-5xl font-bold leading-tight text-white md:text-7xl"
          >
            {headline.map((w, i) => (
              <motion.span
                key={i}
                variants={word}
                className="mr-[0.25em] inline-block"
              >
                {w.accent ? (
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
                    {w.text}
                  </motion.span>
                ) : (
                  w.text
                )}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-xl text-lg text-zinc-400"
          >
            Studio Base helps businesses automate operations, develop scalable
            digital products, and transform ideas into advanced technology
            solutions.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-5">
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
              className="relative overflow-hidden rounded-full bg-yellow-400 px-8 py-4 font-semibold text-black"
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
              <span className="relative">Book a Consultation</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-full border border-white/20 px-8 py-4 text-white transition-colors hover:border-yellow-400 hover:text-yellow-400"
            >
              Explore Solutions
            </motion.button>
          </motion.div>
        </motion.div>

        {/* VISUAL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE }}
          style={{ x: visualX, y: visualY }}
          className="relative flex items-center justify-center"
        >
          <div className="relative flex h-[360px] w-[360px] items-center justify-center sm:h-[500px] sm:w-[500px]">
            {/* Pulsing main circle */}
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="h-[320px] w-[320px] rounded-full border border-yellow-400/20 bg-gradient-to-br from-yellow-400/20 to-transparent blur-sm sm:h-[450px] sm:w-[450px]"
            />

            {/* Rotating dashed ring + orbiting dot */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-yellow-400/30"
            >
              <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400 shadow-[0_0_22px_rgba(250,204,21,0.95)]" />
            </motion.div>

            {/* Counter-rotating inner ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
              className="absolute inset-10 rounded-full border border-white/10"
            >
              <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-purple-400 shadow-[0_0_16px_rgba(192,132,252,0.95)]" />
            </motion.div>

            {/* Floating chips */}
            {chips.map((chip) => (
              <motion.div
                key={chip.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + chip.delay * 0.4, duration: 0.6 }}
                className={`absolute z-20 hidden sm:block ${chip.pos}`}
              >
                <motion.div
                  animate={{ y: [0, -12, 0], x: [0, 4, 0] }}
                  transition={{
                    duration: chip.duration,
                    delay: chip.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-200 backdrop-blur-md"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                  {chip.label}
                </motion.div>
              </motion.div>
            ))}

            {/* Main card: floats + tilts in 3D toward the cursor */}
            <motion.div
              className="absolute z-10"
              style={{
                rotateX: tiltX,
                rotateY: tiltY,
                transformPerspective: 900,
              }}
            >
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative overflow-hidden rounded-3xl p-[1.5px] shadow-[0_0_60px_-10px_rgba(250,204,21,0.35)]"
              >
                {/* Rotating light around the card border */}
                <motion.div
                  aria-hidden="true"
                  className="absolute -inset-[100%]"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0deg, transparent 240deg, rgba(250,204,21,0.9) 320deg, transparent 360deg)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />

                <div className="relative overflow-hidden rounded-[22px] border border-white/5 bg-zinc-950/90 p-8 backdrop-blur-xl sm:p-9">
                  {/* Scan line */}
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-yellow-400/10 to-transparent"
                    animate={{ top: ["-30%", "110%"] }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  <div className="relative">
                    <div className="flex items-center justify-between gap-8">
                      <h3 className="text-2xl font-bold text-white">
                        BaseLead AI
                      </h3>

                      <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-yellow-400">
                        <span className="relative flex h-2 w-2">
                          <motion.span
                            className="absolute inline-flex h-full w-full rounded-full bg-yellow-400"
                            animate={{ scale: [1, 2.6], opacity: [0.7, 0] }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeOut",
                            }}
                          />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow-400" />
                        </span>
                        Live
                      </span>
                    </div>

                    <p className="mt-3 max-w-xs text-sm text-zinc-400">
                      AI-powered client acquisition and sales intelligence
                      platform.
                    </p>

                    {/* Counter + animated bars */}
                    <div className="mt-6 flex items-end justify-between gap-6">
                      <div>
                        <motion.p className="text-3xl font-bold text-white">
                          {leadsText}
                        </motion.p>
                        <p className="mt-1 text-[11px] uppercase tracking-wider text-zinc-500">
                          Leads discovered
                        </p>
                      </div>

                      <div className="flex h-12 items-end gap-1">
                        {bars.map(([min, max], i) => (
                          <motion.span
                            key={i}
                            className="w-1.5 rounded-sm bg-gradient-to-t from-yellow-400/30 to-yellow-400"
                            animate={{ height: [`${min}%`, `${max}%`, `${min}%`] }}
                            transition={{
                              duration: 1.6 + (i % 4) * 0.35,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: i * 0.12,
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 space-y-3 text-sm text-yellow-400">
                      {checks.map((item, i) => (
                        <motion.p
                          key={item}
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.2 + i * 0.25, duration: 0.5 }}
                        >
                          ✓ {item}
                        </motion.p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

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
