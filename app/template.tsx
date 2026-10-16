"use client";

import { motion } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Runs every time you open a page: a black curtain with a thin blue
 * edge slides up and away, and the new page fades in underneath it.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Curtain */}
      <motion.div
        aria-hidden="true"
        initial={{ y: "0%" }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        className="pointer-events-none fixed inset-0 z-[60] bg-black"
      >
        {/* blue edge along the bottom of the curtain */}
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_20px_rgba(59,130,246,0.8)]" />

        {/* logo in the middle while the curtain is up */}
        <motion.img
          src="/images/studio-base-logo-sb.png"
          alt=""
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute left-1/2 top-1/2 h-12 w-auto -translate-x-1/2 -translate-y-1/2"
        />
      </motion.div>

      {/* Page content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
      >
        {children}
      </motion.div>
    </>
  );
}
