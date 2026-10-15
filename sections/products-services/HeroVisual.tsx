"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";

/**
 * The Products & Services hero artwork, built in code (no image file):
 * a gold gyroscope of orbiting rings around a glowing core, with a
 * wireframe globe inside and a gold grid floor fading into black.
 * Tilts gently with the mouse (nx / ny go from -0.5 to 0.5).
 */

// Orbit rings: size (% of the box), tilt, seconds per turn, direction
const rings = [
  { size: 100, tiltX: 74, tiltY: -18, speed: 28, dir: 1, dot: true },
  { size: 82, tiltX: 66, tiltY: 32, speed: 20, dir: -1, dot: true },
  { size: 64, tiltX: 80, tiltY: 4, speed: 14, dir: 1, dot: false },
];

// Lines of longitude for the wireframe globe
const meridians = [0, 30, 60, 90, 120, 150];

function Ring({
  size,
  tiltX,
  tiltY,
  speed,
  dir,
  dot,
  index,
}: (typeof rings)[number] & { index: number }) {
  const id = `hero-ring-${index}`;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        width: `${size}%`,
        height: `${size}%`,
        x: "-50%",
        y: "-50%",
        rotateX: tiltX,
        rotateY: tiltY,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        animate={{ rotateZ: 360 * dir }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="relative h-full w-full"
      >
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 h-full w-full overflow-visible"
        >
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fde68a" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#facc15" stopOpacity="0.3" />
              <stop offset="70%" stopColor="#a855f7" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#fde68a" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          {/* soft glow copy of the ring */}
          <circle
            cx="100"
            cy="100"
            r="98"
            fill="none"
            stroke={`url(#${id})`}
            strokeWidth="3"
            opacity="0.35"
            style={{ filter: "blur(3px)" }}
          />
          {/* crisp ring */}
          <circle
            cx="100"
            cy="100"
            r="98"
            fill="none"
            stroke={`url(#${id})`}
            strokeWidth="0.8"
          />
          {/* fine tick marks */}
          <circle
            cx="100"
            cy="100"
            r="92"
            fill="none"
            stroke="#facc15"
            strokeOpacity="0.25"
            strokeWidth="0.6"
            strokeDasharray="0.6 5.5"
          />
        </svg>

        {/* orbiting light */}
        {dot && (
          <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-100 shadow-[0_0_12px_4px_rgba(250,204,21,0.9),0_0_40px_10px_rgba(250,204,21,0.4)]" />
        )}
      </motion.div>
    </motion.div>
  );
}

export default function HeroVisual({
  nx,
  ny,
}: {
  nx: MotionValue<number>;
  ny: MotionValue<number>;
}) {
  // the whole piece tilts a little toward the mouse
  const rotateY = useTransform(nx, [-0.5, 0.5], [-12, 12]);
  const rotateX = useTransform(ny, [-0.5, 0.5], [10, -10]);

  return (
    <div
      className="pointer-events-none relative aspect-square w-full"
      style={{ perspective: 1400 }}
    >
      {/* ambient light behind everything */}
      <motion.div
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-[5%] rounded-full bg-[radial-gradient(circle,rgba(250,204,21,0.22)_0%,rgba(168,85,247,0.12)_40%,transparent_70%)] blur-2xl"
      />

      {/* light beam from above */}
      <div className="absolute left-1/2 top-[-15%] h-[70%] w-[40%] -translate-x-1/2 bg-[linear-gradient(to_bottom,rgba(253,230,138,0.16),transparent)] blur-2xl [clip-path:polygon(40%_0,60%_0,100%_100%,0_100%)]" />

      {/* gold grid floor, moving toward you */}
      <div
        className="absolute inset-x-[-25%] bottom-[-4%] h-[40%] overflow-hidden"
        style={{ perspective: 500 }}
      >
        <motion.div
          animate={{ backgroundPositionY: ["0px", "40px"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          className="h-full w-full origin-bottom [mask-image:radial-gradient(ellipse_at_50%_100%,black_15%,transparent_70%)]"
          style={{
            rotateX: 65,
            backgroundImage:
              "linear-gradient(rgba(250,204,21,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(250,204,21,0.35) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* the gyroscope */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="absolute inset-[8%]"
      >
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {rings.map((r, i) => (
            <Ring key={i} {...r} index={i} />
          ))}

          {/* wireframe globe */}
          <div className="absolute left-1/2 top-1/2 h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2" style={{ transformStyle: "preserve-3d" }}>
            <motion.div
              animate={{ rotateY: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="relative h-full w-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              {meridians.map((deg) => (
                <div
                  key={deg}
                  className="absolute inset-0 rounded-full border border-yellow-300/25"
                  style={{ transform: `rotateY(${deg}deg)` }}
                />
              ))}
              <div
                className="absolute inset-0 rounded-full border border-yellow-300/20"
                style={{ transform: "rotateX(90deg)" }}
              />
            </motion.div>
          </div>

          {/* glowing core */}
          <div className="absolute left-1/2 top-1/2 h-[18%] w-[18%] -translate-x-1/2 -translate-y-1/2">
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                boxShadow: [
                  "0 0 40px 10px rgba(250,204,21,0.35), 0 0 120px 40px rgba(250,204,21,0.15)",
                  "0 0 60px 16px rgba(250,204,21,0.55), 0 0 160px 60px rgba(250,204,21,0.22)",
                  "0 0 40px 10px rgba(250,204,21,0.35), 0 0 120px 40px rgba(250,204,21,0.15)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="h-full w-full rounded-full bg-[radial-gradient(circle_at_35%_30%,#fffbeb_0%,#fde68a_18%,#facc15_45%,#a16207_80%,#1c1300_100%)]"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
