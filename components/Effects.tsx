"use client";

import type { CSSProperties, ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

/* ------------------------------------------------------------------ */
/*  TiltCard: tilts in 3D toward the mouse, with a glow that follows   */
/*  the cursor. Same feel as the cards on the Home page.               */
/* ------------------------------------------------------------------ */

export function TiltCard({
  children,
  className = "",
  style,
  rgb = "59,130,246",
  tilt = 8,
  float = false,
  floatDelay = 0,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** glow color as "r,g,b" */
  rgb?: string;
  /** max tilt in degrees */
  tilt?: number;
  /** gently bob up and down while idle */
  float?: boolean;
  floatDelay?: number;
  onClick?: () => void;
}) {
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const px = useMotionValue(-999);
  const py = useMotionValue(-999);

  const spring = { stiffness: 150, damping: 18 };
  const rotateX = useSpring(useTransform(ny, [-0.5, 0.5], [tilt, -tilt]), spring);
  const rotateY = useSpring(useTransform(nx, [-0.5, 0.5], [-tilt, tilt]), spring);

  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${px}px ${py}px, rgba(${rgb},0.16), transparent 70%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    px.set(x);
    py.set(y);
    nx.set(x / rect.width - 0.5);
    ny.set(y / rect.height - 0.5);
  };

  const handleLeave = () => {
    nx.set(0);
    ny.set(0);
    px.set(-999);
    py.set(-999);
  };

  return (
    <motion.div
      animate={float ? { y: [0, -8, 0] } : undefined}
      transition={
        float
          ? { duration: 5 + floatDelay, delay: floatDelay, repeat: Infinity, ease: "easeInOut" }
          : undefined
      }
      className="h-full"
      style={{ perspective: 1000 }}
    >
      <motion.div
        data-cursor
        onClick={onClick}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        whileHover={{ scale: 1.02, boxShadow: `0 0 60px -12px rgba(${rgb},0.6)` }}
        whileTap={onClick ? { scale: 0.98 } : undefined}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{ ...style, rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative h-full ${className}`}
      >
        {/* cursor glow */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit]"
          style={{ background: spotlight }}
        />
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  ShimmerText: yellow text with a light moving across it             */
/* ------------------------------------------------------------------ */

export function ShimmerText({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.span
      animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      className={`inline-block bg-gradient-to-r from-blue-500 via-blue-200 to-blue-500 bg-[length:200%_100%] bg-clip-text text-transparent ${className}`}
    >
      {children}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  LightSweep: a shine that passes across a button every few seconds  */
/*  Put it inside an element with `relative overflow-hidden`.          */
/* ------------------------------------------------------------------ */

export function LightSweep({
  className = "via-white/60",
  delay = 2.2,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent to-transparent ${className}`}
      animate={{ x: ["-120%", "420%"] }}
      transition={{ duration: 1.4, repeat: Infinity, repeatDelay: delay, ease: "easeInOut" }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  GlowLine: pulsing yellow line along the bottom of a section        */
/* ------------------------------------------------------------------ */

export function GlowLine({ className = "bottom-0" }: { className?: string }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 z-10 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent ${className}`}
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
