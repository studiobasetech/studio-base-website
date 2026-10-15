"use client";

import { useEffect, useState } from "react";
import { motion, type MotionValue, useTransform } from "framer-motion";
import StarField from "./StarField";

/**
 * Products & Services hero background: a rocket launching from a
 * lunar launch complex. Server towers with blinking status lights and
 * circuit lines carrying pulses of light feed the launch pad. Shooting
 * stars cross the sky. Everything is code, so it stays sharp.
 *
 * nx / ny: mouse position from -0.5 to 0.5 (for parallax).
 */

// One launch cycle in seconds (rocket, flame, smoke and readout stay in sync)
const CYCLE = 9;
// Keyframe times inside a cycle: appear → ignition → liftoff → gone
const TIMES = [0, 0.08, 0.22, 0.3, 1];

// Where the launch pad sits, from the left edge of the scene
const PAD_X = "70%";

/* ------------------------------------------------------------------ */
/*  Rocket                                                             */
/* ------------------------------------------------------------------ */

function Rocket() {
  return (
    <svg viewBox="0 0 60 200" className="h-full w-full overflow-visible">
      <defs>
        <linearGradient id="rk-body" x1="0" x2="1">
          <stop offset="0%" stopColor="#6b6b78" />
          <stop offset="35%" stopColor="#f4f4f5" />
          <stop offset="60%" stopColor="#d4d4d8" />
          <stop offset="100%" stopColor="#3f3f46" />
        </linearGradient>
        <linearGradient id="rk-gold" x1="0" x2="1">
          <stop offset="0%" stopColor="#854d0e" />
          <stop offset="50%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
      </defs>

      {/* fins */}
      <path d="M14 118 L1 158 L1 172 L14 160 Z" fill="url(#rk-gold)" />
      <path d="M46 118 L59 158 L59 172 L46 160 Z" fill="url(#rk-gold)" />

      {/* body */}
      <path
        d="M30 0 C42 18 46 40 46 70 L46 152 L14 152 L14 70 C14 40 18 18 30 0 Z"
        fill="url(#rk-body)"
      />

      {/* nose tip */}
      <path d="M30 0 C35 7 38 14 40 22 L20 22 C22 14 25 7 30 0 Z" fill="url(#rk-gold)" />

      {/* gold bands */}
      <rect x="14" y="100" width="32" height="2.5" fill="url(#rk-gold)" />
      <rect x="14" y="136" width="32" height="2.5" fill="url(#rk-gold)" />

      {/* window */}
      <circle cx="30" cy="62" r="7.5" fill="url(#rk-gold)" />
      <circle cx="30" cy="62" r="5.5" fill="#0b0b14" />
      <circle cx="28" cy="60" r="1.6" fill="#a5b4fc" opacity="0.8" />

      {/* center fin */}
      <rect x="28.5" y="128" width="3" height="34" rx="1" fill="#27272a" />

      {/* nozzle */}
      <path d="M20 152 L40 152 L37 164 L23 164 Z" fill="#27272a" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Launch: rocket + flame + smoke + trail, looping                    */
/* ------------------------------------------------------------------ */

function Launch() {
  const loop = { duration: CYCLE, repeat: Infinity, times: TIMES };

  return (
    <div
      className="absolute bottom-0 -translate-x-1/2"
      style={{ left: PAD_X }}
    >
      {/* light trail left behind the rocket */}
      <motion.div
        animate={{ scaleY: [0, 0, 0, 0.05, 1], opacity: [0, 0, 0, 0.9, 0] }}
        transition={{ ...loop, ease: "easeIn" }}
        className="absolute bottom-6 left-1/2 h-[900px] w-[3px] origin-bottom -translate-x-1/2 bg-gradient-to-t from-yellow-200 via-yellow-400/40 to-transparent blur-[1px]"
      />

      {/* ground flash at ignition */}
      <motion.div
        animate={{ opacity: [0, 0, 1, 0.8, 0], scale: [0.6, 0.6, 1.2, 1.4, 1.8] }}
        transition={loop}
        className="absolute -bottom-6 left-1/2 h-24 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(253,224,71,0.8),rgba(250,204,21,0.25)_40%,transparent_70%)] blur-md"
      />

      {/* exhaust clouds billowing out from the pad */}
      {[-1, -0.5, 0.5, 1, 0].map((dir, i) => (
        <motion.span
          key={i}
          animate={{
            opacity: [0, 0, 0.75, 0.6, 0],
            scale: [0.2, 0.2, 0.9, 1.6, 2.4],
            x: [0, 0, dir * 30, dir * 80, dir * 140],
            y: [0, 0, -6, -14, -26],
          }}
          transition={{ ...loop, delay: i * 0.05 }}
          className="absolute -bottom-3 left-1/2 h-16 w-24 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(228,228,231,0.75),rgba(161,161,170,0.3)_50%,transparent_70%)] blur-md"
        />
      ))}

      {/* the rocket */}
      <motion.div
        animate={{
          y: [0, 0, 0, -6, -1300],
          opacity: [0, 1, 1, 1, 1],
          x: [0, 0, 0, 0, 30],
        }}
        transition={{ ...loop, ease: ["linear", "linear", "linear", "easeIn"] }}
        className="relative h-36 w-11 sm:h-44 sm:w-14 lg:h-52 lg:w-16"
      >
        <Rocket />

        {/* flame */}
        <motion.div
          animate={{ scaleY: [0, 0.3, 0.6, 1.1, 1.4], opacity: [0, 0.6, 1, 1, 1] }}
          transition={loop}
          className="absolute left-1/2 top-[81%] h-[70%] w-[40%] origin-top -translate-x-1/2"
        >
          <motion.div
            animate={{ scaleY: [1, 1.15, 0.92, 1.1, 1], scaleX: [1, 0.92, 1.06, 0.95, 1] }}
            transition={{ duration: 0.18, repeat: Infinity }}
            className="h-full w-full origin-top rounded-b-full bg-[radial-gradient(ellipse_at_50%_0%,#ffffff_0%,#fef9c3_18%,#facc15_42%,rgba(234,88,12,0.7)_65%,transparent_80%)] blur-[1.5px]"
          />
          <div className="absolute inset-0 -z-10 scale-150 rounded-full bg-yellow-400/40 blur-xl" />
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Launch complex: server towers, launch tower, circuit lines         */
/* ------------------------------------------------------------------ */

// Server towers: position from the left, size in px (lg), LED rows
const towers = [
  { left: "55%", h: 150, w: 44, rows: 9 },
  { left: "61%", h: 110, w: 36, rows: 6 },
  { left: "81%", h: 130, w: 40, rows: 8 },
  { left: "87%", h: 90, w: 32, rows: 5 },
];

function ServerTower({ left, h, w, rows, index }: (typeof towers)[number] & { index: number }) {
  return (
    <div
      className="absolute bottom-0 -translate-x-1/2 origin-bottom scale-[0.6] sm:scale-75 lg:scale-100"
      style={{ left, height: h, width: w }}
    >
      {/* rack body */}
      <div className="absolute inset-0 border border-yellow-300/25 bg-gradient-to-b from-zinc-900/90 to-black shadow-[0_0_30px_-8px_rgba(250,204,21,0.35)]">
        {/* slots + LEDs */}
        <div className="flex h-full flex-col justify-evenly px-1.5 py-2">
          {Array.from({ length: rows }).map((_, r) => (
            <div key={r} className="flex items-center gap-1 border-b border-white/5 pb-[2px]">
              {[0, 1, 2].map((c) => (
                <motion.span
                  key={c}
                  animate={{ opacity: [0.15, 1, 0.15] }}
                  transition={{
                    duration: 0.8 + ((r * 3 + c + index) % 5) * 0.35,
                    delay: ((r + c * 2 + index) % 7) * 0.2,
                    repeat: Infinity,
                  }}
                  className={`h-[3px] w-[3px] rounded-full ${
                    (r + c + index) % 4 === 0
                      ? "bg-violet-400 shadow-[0_0_4px_rgba(167,139,250,0.9)]"
                      : "bg-yellow-300 shadow-[0_0_4px_rgba(253,224,71,0.9)]"
                  }`}
                />
              ))}
              <span className="ml-auto h-px w-1/3 bg-white/10" />
            </div>
          ))}
        </div>
      </div>

      {/* data pulse running up the side */}
      <div className="absolute -right-1.5 bottom-0 h-full w-px bg-yellow-300/10">
        <motion.span
          animate={{ y: ["100%", "-100%"], opacity: [0, 1, 0] }}
          transition={{ duration: 1.6 + index * 0.3, repeat: Infinity, ease: "easeIn", delay: index * 0.4 }}
          className="absolute bottom-0 left-0 h-6 w-px bg-yellow-200 shadow-[0_0_6px_rgba(253,224,71,1)]"
        />
      </div>

      {/* antenna light */}
      <motion.span
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 1.2, delay: index * 0.3, repeat: Infinity }}
        className="absolute -top-2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)]"
      />
    </div>
  );
}

function LaunchTower() {
  return (
    <div
      className="absolute bottom-0 origin-bottom scale-[0.6] sm:scale-75 lg:scale-100"
      style={{ left: `calc(${PAD_X} + 34px)` }}
    >
      {/* lattice */}
      <div
        className="h-56 w-4 border-x border-zinc-500/50"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(161,161,170,0.45) 0 1px, transparent 1px 9px), repeating-linear-gradient(-45deg, rgba(161,161,170,0.45) 0 1px, transparent 1px 9px)",
        }}
      />
      {/* arms reaching to the rocket */}
      <div className="absolute bottom-24 right-full h-px w-5 bg-zinc-500/70" />
      <div className="absolute bottom-40 right-full h-px w-5 bg-zinc-500/70" />
      {/* beacon */}
      <motion.span
        animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="absolute -top-2 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-yellow-300 shadow-[0_0_12px_4px_rgba(250,204,21,0.8)]"
      />
    </div>
  );
}

/* Circuit lines across the moon surface, carrying light into the pad */
const traces = [
  "M0 120 L180 120 L260 70 L560 70 L640 22 L700 6",
  "M0 160 L320 160 L380 110 L600 110 L680 30 L700 8",
  "M1000 140 L880 140 L820 90 L760 90 L720 20 L702 6",
  "M1000 100 L930 100 L860 50 L740 50 L705 6",
  "M120 190 L460 190 L540 140 L640 140 L690 40",
];

function CircuitLines() {
  return (
    <svg
      viewBox="0 0 1000 200"
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 h-full w-full"
    >
      {traces.map((d, i) => (
        <g key={i}>
          <path d={d} fill="none" stroke="rgba(250,204,21,0.18)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <motion.path
            d={d}
            fill="none"
            stroke="#fde047"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0.06, pathOffset: 0 }}
            animate={{ pathOffset: [0, 0.94] }}
            transition={{ duration: 2.4 + i * 0.4, delay: i * 0.5, repeat: Infinity, ease: "linear" }}
            style={{ filter: "drop-shadow(0 0 4px rgba(253,224,71,0.9))" }}
          />
          {/* node dots at the corners */}
          {d
            .split(/[ML]/)
            .filter(Boolean)
            .slice(1, -1)
            .map((pt, j) => {
              const [x, y] = pt.trim().split(" ").map(Number);
              return <circle key={j} cx={x} cy={y} r="2.2" fill="rgba(253,224,71,0.5)" />;
            })}
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Moon surface                                                       */
/* ------------------------------------------------------------------ */

function Moon() {
  return (
    <div
      className="absolute -translate-x-1/2 rounded-[50%] bottom-[-1290px] h-[1400px] w-[300%] sm:bottom-[-1250px] lg:bottom-[-1210px] lg:w-[190%]"
      style={{
        left: PAD_X,
        background:
          "radial-gradient(ellipse at 50% 0%, #55506a 0%, #2c2838 10%, #15131c 24%, #07060a 45%)",
        boxShadow:
          "inset 0 2px 0 rgba(254,240,138,0.55), 0 -2px 30px rgba(253,224,71,0.35), 0 -30px 120px rgba(250,204,21,0.12)",
      }}
    >
      {/* craters */}
      {[
        { l: "38%", t: "1.5%", w: 140, h: 20 },
        { l: "44%", t: "4%", w: 70, h: 10 },
        { l: "57%", t: "2.5%", w: 100, h: 14 },
        { l: "30%", t: "5%", w: 180, h: 26 },
        { l: "64%", t: "6%", w: 120, h: 18 },
        { l: "50%", t: "8%", w: 220, h: 30 },
      ].map((c, i) => (
        <span
          key={i}
          className="absolute rounded-[50%]"
          style={{
            left: c.l,
            top: c.t,
            width: c.w,
            height: c.h,
            background: "radial-gradient(ellipse at 50% 70%, rgba(0,0,0,0.55), rgba(0,0,0,0.15) 60%, transparent 72%)",
            boxShadow: "inset 0 -1px 0 rgba(255,255,255,0.06)",
          }}
        />
      ))}

      {/* tech grid on the surface */}
      <div
        className="absolute inset-x-0 top-0 h-[16%] opacity-40 [mask-image:radial-gradient(ellipse_at_50%_0%,black_10%,transparent_60%)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(250,204,21,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(250,204,21,0.25) 1px, transparent 1px)",
          backgroundSize: "48px 24px",
        }}
      />

      {/* scanning line sweeping across the surface */}
      <motion.div
        animate={{ left: ["30%", "70%"] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute top-0 h-[10%] w-px bg-gradient-to-b from-yellow-200 to-transparent shadow-[0_0_10px_rgba(253,224,71,0.8)]"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Telemetry readout                                                  */
/* ------------------------------------------------------------------ */

function Telemetry() {
  const [t, setT] = useState(0); // 0..1 position in the launch cycle

  useEffect(() => {
    const start = performance.now();
    const id = setInterval(() => {
      setT(((performance.now() - start) / 1000 / CYCLE) % 1);
    }, 100);
    return () => clearInterval(id);
  }, []);

  const flying = t > TIMES[3];
  const p = flying ? (t - TIMES[3]) / (1 - TIMES[3]) : 0;
  const altitude = (p * p * 118).toFixed(1);
  const velocity = (p * 7.8).toFixed(2);
  const countdown = Math.max(0, Math.ceil((TIMES[3] - t) * CYCLE));
  const status = flying ? "Ascent nominal" : t > TIMES[2] ? "Ignition" : `T-${countdown}`;

  return (
    <div className="w-56 border-l border-yellow-300/40 bg-black/30 py-2 pl-4 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm">
      <p className="flex items-center gap-2 text-yellow-200/80">
        <motion.span
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="h-1.5 w-1.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.9)]"
        />
        Launch sequence
      </p>
      <p className="mt-2 text-zinc-400">
        Status <span className="float-right pr-2 text-white">{status}</span>
      </p>
      <p className="mt-1 text-zinc-400">
        Alt km <span className="float-right pr-2 text-white">{altitude}</span>
      </p>
      <p className="mt-1 text-zinc-400">
        Vel km/s <span className="float-right pr-2 text-white">{velocity}</span>
      </p>
      {/* progress bar */}
      <div className="mt-2 mr-2 h-px bg-white/10">
        <div className="h-px bg-yellow-400 shadow-[0_0_6px_rgba(250,204,21,0.9)]" style={{ width: `${p * 100}%` }} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene                                                              */
/* ------------------------------------------------------------------ */

export default function LaunchScene({
  nx,
  ny,
}: {
  nx: MotionValue<number>;
  ny: MotionValue<number>;
}) {
  // parallax: nearer things move more
  const nebulaX = useTransform(nx, [-0.5, 0.5], [12, -12]);
  const nebulaY = useTransform(ny, [-0.5, 0.5], [8, -8]);
  const groundX = useTransform(nx, [-0.5, 0.5], [-16, 16]);
  const groundY = useTransform(ny, [-0.5, 0.5], [-6, 6]);
  const hudX = useTransform(nx, [-0.5, 0.5], [-24, 24]);
  const hudY = useTransform(ny, [-0.5, 0.5], [-14, 14]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#020107]">
      <StarField meteorEvery={[1200, 3200]} />

      {/* nebula */}
      <motion.div style={{ x: nebulaX, y: nebulaY }} className="absolute inset-0">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[10%] top-[-15%] h-[480px] w-[620px] rounded-full bg-violet-700/20 blur-[130px]"
        />
        <motion.div
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[20%] h-[320px] w-[520px] rounded-full bg-yellow-500/10 blur-[120px]"
        />
      </motion.div>

      {/* STAGE: the top part on phones, the whole hero on desktop */}
      <div className="absolute inset-x-0 top-0 h-[420px] sm:h-[500px] lg:inset-0 lg:h-auto">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <motion.div style={{ x: groundX, y: groundY }} className="absolute -inset-x-8 inset-y-0">
            <Moon />

            {/* everything standing on the surface */}
            <div className="absolute inset-x-0 bottom-[104px] h-0 sm:bottom-[144px] lg:bottom-[184px]">
              {towers.map((tw, i) => (
                <ServerTower key={tw.left} {...tw} index={i} />
              ))}
              <LaunchTower />
              <Launch />
            </div>

            {/* circuit lines on the surface */}
            <div className="absolute inset-x-0 bottom-0 h-[110px] sm:h-[150px] lg:h-[190px]">
              <CircuitLines />
            </div>
          </motion.div>
        </motion.div>

        {/* telemetry readout */}
        <motion.div
          style={{ x: hudX, y: hudY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute right-6 top-24 hidden sm:block lg:right-12 lg:top-32"
        >
          <Telemetry />
        </motion.div>
      </div>

      {/* readability: darken behind the text */}
      <div className="absolute inset-x-0 bottom-0 top-[340px] bg-gradient-to-b from-transparent via-black/85 to-black sm:top-[420px] lg:hidden" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-black/85 via-black/25 to-transparent lg:block" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent" />
    </div>
  );
}
