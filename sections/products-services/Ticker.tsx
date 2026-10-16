"use client";

import { motion } from "framer-motion";
import { Sparkle } from "lucide-react";

// Words that scroll across the strip. Edit freely.
const words = [
  "Artificial Intelligence",
  "Automation",
  "Software Engineering",
  "Mobile Apps",
  "Web Platforms",
  "Cybersecurity",
  "Cloud",
  "Analytics",
  "AI Consulting",
];

/** Endless scrolling strip of service names. */
export default function Ticker() {
  const row = [...words, ...words];

  return (
    <div className="relative overflow-hidden bg-black">
      <div className="border-y border-blue-500/30 bg-blue-500/[0.04] py-3.5">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="flex w-max items-center gap-8"
        >
          {row.map((w, i) => (
            <span
              key={i}
              className="flex items-center gap-8 whitespace-nowrap text-sm font-medium uppercase tracking-[0.3em] text-zinc-300"
            >
              {w}
              <Sparkle size={12} className="text-blue-500" />
            </span>
          ))}
        </motion.div>
      </div>

      {/* fade at the edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent" />
    </div>
  );
}
