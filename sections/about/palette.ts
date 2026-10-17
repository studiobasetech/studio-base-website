/**
 * Accent colours used on the About page (written out in full so
 * Tailwind can find the class names). Blue is the main colour; the
 * others are secondary, like on the rest of the site.
 */
export type Tone = "blue" | "purple" | "cyan" | "yellow" | "pink" | "green";

export const tones: Record<
  Tone,
  {
    rgb: string;
    hex: string;
    text: string;
    border: string;
    borderHover: string;
    borderOn: string;
    iconBox: string;
    glow: string;
    fill: string;
    onText: string;
    groupText: string;
  }
> = {
  blue: {
    rgb: "59,130,246", hex: "#3b82f6", text: "text-blue-400",
    border: "border-blue-500/50", borderHover: "hover:border-blue-500", borderOn: "border-blue-500",
    iconBox: "border-blue-500/40 bg-blue-500/10 text-blue-400", glow: "bg-blue-500/25",
    fill: "bg-blue-500", onText: "text-white", groupText: "group-hover:text-blue-400",
  },
  purple: {
    rgb: "168,85,247", hex: "#a855f7", text: "text-purple-400",
    border: "border-purple-500/50", borderHover: "hover:border-purple-500", borderOn: "border-purple-500",
    iconBox: "border-purple-500/40 bg-purple-500/15 text-purple-300", glow: "bg-purple-500/25",
    fill: "bg-purple-500", onText: "text-white", groupText: "group-hover:text-purple-400",
  },
  cyan: {
    rgb: "34,211,238", hex: "#22d3ee", text: "text-cyan-400",
    border: "border-cyan-400/50", borderHover: "hover:border-cyan-400", borderOn: "border-cyan-400",
    iconBox: "border-cyan-400/40 bg-cyan-400/10 text-cyan-400", glow: "bg-cyan-400/25",
    fill: "bg-cyan-400", onText: "text-black", groupText: "group-hover:text-cyan-400",
  },
  yellow: {
    rgb: "250,204,21", hex: "#facc15", text: "text-yellow-300",
    border: "border-yellow-400/50", borderHover: "hover:border-yellow-400", borderOn: "border-yellow-400",
    iconBox: "border-yellow-400/40 bg-yellow-400/10 text-yellow-300", glow: "bg-yellow-400/25",
    fill: "bg-yellow-400", onText: "text-black", groupText: "group-hover:text-yellow-300",
  },
  pink: {
    rgb: "236,72,153", hex: "#ec4899", text: "text-pink-400",
    border: "border-pink-500/50", borderHover: "hover:border-pink-500", borderOn: "border-pink-500",
    iconBox: "border-pink-500/40 bg-pink-500/10 text-pink-400", glow: "bg-pink-500/25",
    fill: "bg-pink-500", onText: "text-white", groupText: "group-hover:text-pink-400",
  },
  green: {
    rgb: "52,211,153", hex: "#34d399", text: "text-emerald-400",
    border: "border-emerald-400/50", borderHover: "hover:border-emerald-400", borderOn: "border-emerald-400",
    iconBox: "border-emerald-400/40 bg-emerald-400/10 text-emerald-400", glow: "bg-emerald-400/25",
    fill: "bg-emerald-400", onText: "text-black", groupText: "group-hover:text-emerald-400",
  },
};
