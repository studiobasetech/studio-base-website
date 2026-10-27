"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Respects the visitor's "reduce motion" setting (accessibility): when it's on
 * in their device settings, framer-motion animations are toned down site-wide.
 */
export default function MotionPrefs({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
