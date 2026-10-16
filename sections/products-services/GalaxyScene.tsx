"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";
import MatrixRain from "./MatrixRain";
import StarField from "./StarField";

/**
 * Products & Services hero background.
 *
 * A rendered spiral galaxy (public/images/galaxy-hero-blue.jpg) with live
 * layers on top: twinkling stars and shooting stars, gold Matrix-style
 * code rain, and thin gold orbit rings + a radar sweep locked onto the
 * galaxy core. Slow zoom + mouse parallax for depth. (The constellation
 * effect is added in ProductsHero, above the text shading.)
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
    { size: 40, dash: "2 10", speed: 80, color: "rgba(59,130,246,0.45)", width: 0.35 },
    { size: 56, dash: "60 30 4 30", speed: 120, color: "rgba(147,197,253,0.35)", width: 0.3 },
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
            "conic-gradient(from 0deg, rgba(59,130,246,0.16), rgba(59,130,246,0) 50deg, transparent 360deg)",
          maskImage: "radial-gradient(circle, black 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 70%)",
        }}
      />
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
              src="/images/galaxy-hero-blue.jpg"
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
            </motion.div>
          </motion.div>
        </motion.div>

        {/* live stars + shooting stars on top of the image */}
        <StarField meteorEvery={[2500, 6000]} density={0.35} />

        {/* Matrix-style code rain: strongest on the right, fading out
            toward the headline (desktop) / toward the text (phones) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
          className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_55%,transparent)] lg:[mask-image:linear-gradient(to_right,transparent_8%,rgba(0,0,0,0.35)_40%,black_70%)]"
        >
          <MatrixRain opacity={0.65} />
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
