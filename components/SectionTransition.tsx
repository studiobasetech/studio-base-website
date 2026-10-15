"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * Wrap a page section to give it a premium scroll transition:
 * it rises and expands from a slightly smaller, rounded card into
 * full width as it scrolls into view. A thin gold divider draws in
 * above it.
 *
 *   <SectionTransition><Products /></SectionTransition>
 *   <SectionTransition divider={false}><CTA /></SectionTransition>
 */
export default function SectionTransition({
  children,
  divider = true,
}: {
  children: ReactNode;
  divider?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // 0 = section top reaches the bottom of the screen
  // 1 = section top reaches 30% from the top of the screen
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.3"],
  });

  // Smooth the scroll value so movement feels weighty, not jittery
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });

  const scale = useTransform(progress, [0, 1], [0.92, 1]);
  const y = useTransform(progress, [0, 1], [80, 0]);
  const opacity = useTransform(progress, [0, 0.6], [0.2, 1]);
  const radius = useTransform(progress, [0, 1], [48, 0]);
  const lineScale = useTransform(progress, [0.1, 0.9], [0, 1]);
  const lightX = useTransform(progress, [0.1, 1], ["-10%", "110%"]);

  if (reduceMotion) return <div>{children}</div>;

  return (
    <div ref={ref} className="relative">
      {divider && (
        <div className="pointer-events-none relative z-20 mx-auto h-px max-w-7xl px-6 lg:px-12">
          {/* gold line drawing out from the center */}
          <motion.div
            style={{ scaleX: lineScale }}
            className="h-px w-full origin-center bg-gradient-to-r from-transparent via-yellow-400/70 to-transparent"
          />
          {/* small light travelling along the line */}
          <motion.div
            style={{ left: lightX }}
            className="absolute -top-[3px] h-[7px] w-24 -translate-x-1/2 rounded-full bg-yellow-300/80 blur-[6px]"
          />
        </div>
      )}

      <motion.div
        style={{ scale, y, opacity, borderRadius: radius }}
        className="origin-top overflow-hidden will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
