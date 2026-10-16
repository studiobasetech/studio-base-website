"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";
import ParticleField from "@/components/ParticleField";
import StarField from "./StarField";

/**
 * Products & Services hero background.
 *
 * A rendered spiral galaxy (public/images/galaxy-hero.jpg) with live
 * layers on top: twinkling stars and shooting stars, a gold
 * constellation network, and a thin gold "observatory" HUD locked onto
 * the galaxy core (tilted orbit rings, a radar sweep, brackets and
 * readouts). Slow zoom + mouse parallax for depth.
 *
 * nx / ny: mouse position from -0.5 to 0.5.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

// Where the galaxy core sits inside galaxy-hero.jpg (fractions of the image)
const CORE_X = 66;
const CORE_Y = 46;
// The galaxy's tilt in the image, so the rings line up with its disk
const DISK_ROTATE = -22;
const DISK_SQUASH = 0.46;

/* Tilted rings that follow the plane of the galaxy */
function OrbitRings() {
  const rings = [
    { size: 40, dash: "2 10", speed: 80, color: "rgba(250,204,21,0.45)", width: 0.35 },
    { size: 56, dash: "60 30 4 30", speed: 120, color: "rgba(253,230,138,0.35)", width: 0.3 },
    { size: 76, dash: "1 6", speed: 160, color: "rgba(196,181,253,0.25)", width: 0.3 },
  ];

  return (
    <div
      className="absolute left-0 top-0"
      style={{
        transform: `rotate(${DISK_ROTATE}deg) scaleY(${DISK_SQUASH})`,
      }}
    >
      {rings.map((r, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 100 100"
          animate={{ rotate: i % 2 ? -360 : 360 }}
          transition={{ duration: r.speed, repeat: Infinity, ease: "linear" }}
          className="absolute"
          style={{
            width: `${r.size}cqw`,
            height: `${r.size}cqw`,
            left: `-${r.size / 2}cqw`,
            top: `-${r.size / 2}cqw`,
          }}
        >
          <circle
            cx="50"
            cy="50"
            r="49"
            fill="none"
            stroke={r.color}
            strokeWidth={r.width}
            strokeDasharray={r.dash}
            vectorEffect="non-scaling-stroke"
          />
        </motion.svg>
      ))}

      {/* radar sweep around the core */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute rounded-full"
        style={{
          width: "56cqw",
          height: "56cqw",
          left: "-28cqw",
          top: "-28cqw",
          background:
            "conic-gradient(from 0deg, rgba(250,204,21,0.16), rgba(250,204,21,0) 50deg, transparent 360deg)",
          maskImage: "radial-gradient(circle, black 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 70%)",
        }}
      />
    </div>
  );
}

/* Brackets + readouts locked on the core */
function CoreLock() {
  return (
    <div className="absolute left-0 top-0">
      {/* pulsing target brackets */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-10 -top-10 h-20 w-20 sm:-left-14 sm:-top-14 sm:h-28 sm:w-28"
      >
        {[
          "left-0 top-0 border-l border-t",
          "right-0 top-0 border-r border-t",
          "bottom-0 left-0 border-b border-l",
          "bottom-0 right-0 border-b border-r",
        ].map((pos) => (
          <span key={pos} className={`absolute h-3 w-3 border-yellow-300/80 sm:h-4 sm:w-4 ${pos}`} />
        ))}
      </motion.div>

      {/* leader line + label */}
      <div className="absolute left-12 top-[-70px] hidden sm:block lg:left-16 lg:top-[-96px]">
        <svg width="90" height="60" className="absolute -left-12 top-6 overflow-visible lg:-left-16 lg:top-9">
          <motion.path
            d="M0 58 L40 10 L90 10"
            fill="none"
            stroke="rgba(253,224,71,0.6)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, delay: 1.6, ease: EASE }}
          />
        </svg>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          className="ml-12 border-l border-yellow-300/50 bg-black/30 py-1.5 pl-3 pr-4 font-mono text-[10px] uppercase tracking-[0.22em] backdrop-blur-sm"
        >
          <p className="flex items-center gap-2 text-yellow-200">
            <motion.span
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.9)]"
            />
            Core locked
          </p>
          <p className="mt-1 text-zinc-400">SB-01 · Spiral class</p>
        </motion.div>
      </div>
    </div>
  );
}

/* Readout panel in the corner */
function DataPanel() {
  const rows = [
    ["Signal", "98.4%"],
    ["Nodes online", "2,048"],
    ["Latency", "12 ms"],
  ];
  return (
    <div className="w-52 border-l border-yellow-300/40 bg-black/30 py-2 pl-4 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm">
      <p className="text-yellow-200/80">Deep-space link</p>
      {rows.map(([k, v], i) => (
        <p key={k} className="mt-1.5 text-zinc-400">
          {k}
          <motion.span
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2 + i * 0.7, repeat: Infinity }}
            className="float-right pr-3 text-white"
          >
            {v}
          </motion.span>
        </p>
      ))}
      {/* signal bars */}
      <div className="mr-3 mt-2 flex h-4 items-end gap-[3px]">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.span
            key={i}
            animate={{ height: ["30%", "100%", "45%", "80%", "30%"] }}
            transition={{ duration: 1.6 + (i % 5) * 0.3, delay: i * 0.08, repeat: Infinity, ease: "easeInOut" }}
            className="w-[3px] bg-yellow-400/70"
          />
        ))}
      </div>
    </div>
  );
}

export default function GalaxyScene({
  nx,
  ny,
}: {
  nx: MotionValue<number>;
  ny: MotionValue<number>;
}) {
  // parallax: the galaxy moves a little, the HUD a little more
  const imgX = useTransform(nx, [-0.5, 0.5], [14, -14]);
  const imgY = useTransform(ny, [-0.5, 0.5], [10, -10]);
  const hudX = useTransform(nx, [-0.5, 0.5], [-10, 10]);
  const hudY = useTransform(ny, [-0.5, 0.5], [-6, 6]);
  const panelX = useTransform(nx, [-0.5, 0.5], [-22, 22]);
  const panelY = useTransform(ny, [-0.5, 0.5], [-14, 14]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-black">
      {/* STAGE: top part on phones, the whole hero on desktop */}
      <div
        className="absolute inset-x-0 top-0 h-[440px] sm:h-[520px] lg:inset-0 lg:h-auto"
        style={{ containerType: "size" }}
      >
        {/* Image box: always covers the stage, keeps the 16:9 shape so the
            HUD stays locked on the galaxy core */}
        <motion.div
          style={{ x: imgX, y: imgY, width: "max(128cqw, 199cqh)", aspectRatio: "16 / 9" }}
          className="absolute left-[34%] top-1/2 -translate-x-1/2 -translate-y-1/2 sm:left-[44%] lg:left-1/2"
        >
          <motion.div
            initial={{ opacity: 0, scale: 1.15, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: [1.0, 1.07, 1.0], filter: "blur(0px)" }}
            transition={{
              opacity: { duration: 2, ease: EASE },
              filter: { duration: 2, ease: EASE },
              scale: { duration: 40, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute inset-0"
            style={{ transformOrigin: `${CORE_X}% ${CORE_Y}%`, containerType: "inline-size" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/galaxy-hero.jpg"
              alt=""
              className="absolute inset-0 h-full w-full select-none"
              draggable={false}
            />

            {/* HUD locked on the core */}
            <motion.div
              style={{ left: `${CORE_X}%`, top: `${CORE_Y}%`, x: hudX, y: hudY }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.6, delay: 1 }}
              className="absolute"
            >
              <OrbitRings />
              <CoreLock />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* live stars + shooting stars on top of the image */}
        <StarField meteorEvery={[2500, 6000]} density={0.35} />

        {/* faint gold constellation network */}
        <div className="absolute inset-0 opacity-60">
          <ParticleField color="253, 224, 71" density={0.35} />
        </div>

        {/* corner readout */}
        <motion.div
          style={{ x: panelX, y: panelY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-10 right-12 hidden lg:block"
        >
          <DataPanel />
        </motion.div>
      </div>

      {/* readability: darken behind the text */}
      <div className="absolute inset-x-0 bottom-0 top-[340px] bg-gradient-to-b from-transparent via-black/85 to-black sm:top-[420px] lg:hidden" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-black/90 via-black/40 to-transparent lg:block" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}
