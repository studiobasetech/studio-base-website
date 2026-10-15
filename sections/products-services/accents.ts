import type { Accent } from "@/data/services";

/**
 * Tailwind classes for each accent color, written out in full so
 * Tailwind can find them.
 */
export const accents: Record<
  Accent,
  {
    text: string;
    border: string;
    borderHover: string;
    iconBox: string;
    glow: string;
    button: string;
    check: string;
    line: string;
    rgb: string;
  }
> = {
  yellow: {
    text: "text-yellow-400",
    border: "border-yellow-400/50",
    borderHover: "hover:border-yellow-400",
    iconBox: "border-yellow-400/40 bg-yellow-400/10 text-yellow-400",
    glow: "bg-yellow-400/20",
    button: "bg-yellow-400 text-black hover:bg-yellow-300",
    check: "bg-yellow-400 text-black",
    line: "from-yellow-400",
    rgb: "250,204,21",
  },
  purple: {
    text: "text-purple-400",
    border: "border-purple-500/50",
    borderHover: "hover:border-purple-500",
    iconBox: "border-purple-500/40 bg-purple-500/15 text-purple-300",
    glow: "bg-purple-500/20",
    button: "bg-purple-600 text-white hover:bg-purple-500",
    check: "bg-purple-500 text-white",
    line: "from-purple-500",
    rgb: "168,85,247",
  },
  blue: {
    text: "text-blue-400",
    border: "border-blue-500/50",
    borderHover: "hover:border-blue-500",
    iconBox: "border-blue-500/40 bg-blue-500/10 text-blue-400",
    glow: "bg-blue-500/20",
    button: "bg-blue-600 text-white hover:bg-blue-500",
    check: "bg-blue-500 text-white",
    line: "from-blue-500",
    rgb: "59,130,246",
  },
  cyan: {
    text: "text-cyan-400",
    border: "border-cyan-400/50",
    borderHover: "hover:border-cyan-400",
    iconBox: "border-cyan-400/40 bg-cyan-400/10 text-cyan-400",
    glow: "bg-cyan-400/20",
    button: "bg-cyan-500 text-black hover:bg-cyan-400",
    check: "bg-cyan-400 text-black",
    line: "from-cyan-400",
    rgb: "34,211,238",
  },
};
