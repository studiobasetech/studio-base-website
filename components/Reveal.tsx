"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Wrap any section or block with <Reveal> and it will fade, rise and
 * un-blur as it scrolls into view.
 *
 *   <Reveal><Products /></Reveal>
 *   <Reveal delay={0.15}><Process /></Reveal>
 */
export default function Reveal({
  children,
  delay = 0,
  y = 50,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Thin blue bar at the top of the page that fills as you scroll.
 * Place it once, at the top of your page.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[100] h-[2px] origin-left bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]"
    />
  );
}
