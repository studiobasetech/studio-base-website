"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";
import StarField from "./StarField";

/**
 * Background for the Products & Services hero: deep space with a
 * starfield, drifting nebula, a large dark planet with a blue
 * atmosphere, an orbit ring with a satellite, and a thin tech HUD.
 * Everything is code, so it stays sharp on every screen.
 *
 * nx / ny: mouse position from -0.5 to 0.5 (for parallax).
 * variant: "hero" = big planet, "cta" = smaller planet for a closing section.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

// Coordinates shown in the HUD (Cancún, Mexico)
const COORDS = "21.1619° N · 86.8515° W";

/* An elliptical orbit. Rendered twice (behind and in front of the
   planet) so the ring looks like it wraps around it. */
function Orbit({ front }: { front: boolean }) {
  return (
    <div
      className="absolute left-1/2 top-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2"
      style={{
        rotate: "-16deg",
        perspective: 1600,
        // the front copy only keeps the half that passes in front
        clipPath: front ? "inset(50% 0 0 0)" : undefined,
      }}
    >
      <div
        className="h-full w-full"
        style={{ transform: "rotateX(76deg)", transformStyle: "preserve-3d" }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          className="relative h-full w-full rounded-full"
        >
          {/* ring line */}
          <div className="absolute inset-0 rounded-full border border-blue-400/40 shadow-[0_0_24px_rgba(59,130,246,0.25)]" />
          <div className="absolute inset-[3%] rounded-full border border-dashed border-white/10" />

          {/* satellite */}
          <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200 shadow-[0_0_14px_5px_rgba(59,130,246,0.9),0_0_50px_14px_rgba(59,130,246,0.35)]" />
        </motion.div>
      </div>
    </div>
  );
}

function Planet() {
  return (
    <div className="absolute inset-0">
      {/* outer haze */}
      <div className="absolute -inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.10)_45%,rgba(124,58,237,0.10)_58%,transparent_70%)] blur-2xl" />

      {/* blue atmosphere rim (lit side, top-left) */}
      <motion.div
        animate={{ opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-[2.5%] rounded-full [mask-image:linear-gradient(135deg,black_20%,transparent_60%)]"
        style={{
          background:
            "radial-gradient(circle, transparent 47.5%, rgba(147,197,253,0.95) 49%, rgba(59,130,246,0.45) 50.5%, rgba(59,130,246,0.10) 53%, transparent 58%)",
          filter: "blur(1.5px)",
        }}
      />

      {/* planet body */}
      <div
        className="absolute inset-0 overflow-hidden rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 28%, #3b2a63 0%, #1a1238 30%, #0a0718 58%, #020105 80%)",
          boxShadow:
            "inset 22px 18px 50px -12px rgba(96,165,250,0.55), inset -80px -90px 140px rgba(0,0,0,0.95)",
        }}
      >
        {/* slowly rotating surface bands */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
          className="absolute inset-y-0 left-0 w-[200%] opacity-60 mix-blend-screen"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 18% 6% at 20% 30%, rgba(167,139,250,0.35), transparent),
              radial-gradient(ellipse 25% 5% at 60% 55%, rgba(59,130,246,0.18), transparent),
              radial-gradient(ellipse 14% 4% at 85% 70%, rgba(129,140,248,0.3), transparent),
              radial-gradient(ellipse 22% 5% at 40% 78%, rgba(167,139,250,0.22), transparent),
              repeating-linear-gradient(180deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 2px, transparent 2px, transparent 14px)
            `,
            backgroundSize: "50% 100%",
          }}
        />

        {/* tech grid on the planet (latitude / longitude) */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full opacity-[0.12]">
          {[20, 35, 50, 65, 80].map((y) => (
            <ellipse key={`lat-${y}`} cx="50" cy={y} rx={Math.sqrt(2500 - (y - 50) ** 2)} ry="2.2" fill="none" stroke="#93c5fd" strokeWidth="0.25" />
          ))}
          {[12, 26, 40].map((rx) => (
            <ellipse key={`lon-${rx}`} cx="50" cy="50" rx={rx} ry="50" fill="none" stroke="#93c5fd" strokeWidth="0.25" />
          ))}
        </svg>

        {/* city-like lights on the night side */}
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(96,165,250,0.9) 0.6px, transparent 1.2px)",
            backgroundSize: "22px 22px",
            maskImage:
              "radial-gradient(circle at 75% 75%, black 0%, transparent 45%)",
            WebkitMaskImage:
              "radial-gradient(circle at 75% 75%, black 0%, transparent 45%)",
          }}
        />

        {/* night-side shadow */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_28%_25%,transparent_35%,rgba(0,0,0,0.65)_70%,rgba(0,0,0,0.9)_100%)]" />
      </div>
    </div>
  );
}

function Hud() {
  return (
    <div className="absolute -inset-[16%]">
      {/* rotating dashed rings */}
      <motion.svg
        viewBox="0 0 200 200"
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 h-full w-full"
      >
        <circle cx="100" cy="100" r="98" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.3" />
        <circle cx="100" cy="100" r="95" fill="none" stroke="rgba(59,130,246,0.35)" strokeWidth="0.4" strokeDasharray="0.4 3" />
      </motion.svg>

      <motion.svg
        viewBox="0 0 200 200"
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[6%] h-[88%] w-[88%]"
      >
        {/* arc segments */}
        <circle cx="100" cy="100" r="98" fill="none" stroke="rgba(59,130,246,0.55)" strokeWidth="0.6" strokeDasharray="40 120 12 136" strokeLinecap="round" />
        <circle cx="100" cy="100" r="94" fill="none" stroke="rgba(196,181,253,0.35)" strokeWidth="0.4" strokeDasharray="8 30" />
      </motion.svg>

      {/* corner brackets */}
      {[
        "left-0 top-0 border-l border-t",
        "right-0 top-0 border-r border-t",
        "bottom-0 left-0 border-b border-l",
        "bottom-0 right-0 border-b border-r",
      ].map((pos) => (
        <span key={pos} className={`absolute h-5 w-5 border-blue-400/50 ${pos}`} />
      ))}

      {/* labels */}
      <div className="absolute left-[4%] top-[14%] hidden font-mono sm:block text-[9px] uppercase tracking-[0.25em] text-blue-300/70 sm:text-[10px]">
        <p className="flex items-center gap-2">
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.9)]"
          />
          Systems online
        </p>
        <p className="mt-1 text-zinc-500">Orbit 01 · AI Core</p>
      </div>

      <div className="absolute bottom-[12%] right-[6%] hidden text-right font-mono sm:block text-[9px] uppercase tracking-[0.25em] text-zinc-500 sm:text-[10px]">
        <p className="text-blue-300/70">{COORDS}</p>
        <p className="mt-1">Studio Base HQ</p>
      </div>
    </div>
  );
}

// Planet size and position for each variant
const planetPlacement = {
  hero: "right-[-28%] top-[70px] w-[95vw] max-w-[440px] sm:right-[-12%] sm:max-w-[520px] lg:right-[-6%] lg:top-1/2 lg:w-[54vw] lg:max-w-[760px] lg:-translate-y-1/2",
  cta: "right-[-35%] top-[-8%] w-[85vw] max-w-[380px] sm:right-[-12%] lg:right-[-2%] lg:top-1/2 lg:w-[44vw] lg:max-w-[560px] lg:-translate-y-1/2",
};

const textShade = {
  hero: "bg-gradient-to-t from-black via-black/70 to-transparent lg:bg-gradient-to-r lg:from-black/85 lg:via-black/30 lg:to-transparent",
  cta: "bg-gradient-to-r from-black via-black/75 to-black/10",
};

export default function SpaceScene({
  nx,
  ny,
  variant = "hero",
}: {
  nx: MotionValue<number>;
  ny: MotionValue<number>;
  variant?: "hero" | "cta";
}) {
  // parallax: nearer things move more
  const nebulaX = useTransform(nx, [-0.5, 0.5], [12, -12]);
  const nebulaY = useTransform(ny, [-0.5, 0.5], [8, -8]);
  const planetX = useTransform(nx, [-0.5, 0.5], [-22, 22]);
  const planetY = useTransform(ny, [-0.5, 0.5], [-14, 14]);
  const hudX = useTransform(nx, [-0.5, 0.5], [-34, 34]);
  const hudY = useTransform(ny, [-0.5, 0.5], [-22, 22]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#020107]">
      <StarField />

      {/* nebula clouds */}
      <motion.div style={{ x: nebulaX, y: nebulaY }} className="absolute inset-0">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[5%] top-[-10%] h-[520px] w-[620px] rounded-full bg-violet-700/25 blur-[130px]"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20%] right-[25%] h-[460px] w-[520px] rounded-full bg-indigo-800/25 blur-[140px]"
        />
        <motion.div
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[30%] top-[30%] h-[300px] w-[300px] rounded-full bg-blue-600/10 blur-[120px]"
        />
      </motion.div>

      {/* PLANET GROUP: top-right on phones, right side on desktop */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 60 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 2.2, ease: EASE }}
        className={`absolute aspect-square ${planetPlacement[variant]}`}
      >
        <motion.div style={{ x: planetX, y: planetY }} className="relative h-full w-full">
          <Orbit front={false} />
          <Planet />
          <Orbit front />
        </motion.div>

        <motion.div style={{ x: hudX, y: hudY }} className="absolute inset-0">
          <Hud />
        </motion.div>
      </motion.div>

      {/* readability: darken behind the text */}
      <div className={`absolute inset-0 ${textShade[variant]}`} />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent" />
    </div>
  );
}
