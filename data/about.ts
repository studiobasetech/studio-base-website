/**
 * About Studio Base page content. Edit the text here.
 */
import type { Tone } from "@/sections/about/palette";

export const pillars: { id: string; title: string; text: string; icon: "target" | "eye" | "chart"; tone: Tone }[] = [
  {
    id: "mission",
    title: "Our Mission",
    text: "To empower businesses through intelligent technology solutions that drive efficiency, innovation, and sustainable growth.",
    icon: "target",
    tone: "blue",
  },
  {
    id: "vision",
    title: "Our Vision",
    text: "To be a global technology partner recognized for creating innovative solutions that transform industries and shape a more connected, human-centered future.",
    icon: "eye",
    tone: "purple",
  },
  {
    id: "approach",
    title: "Our Approach",
    text: "We combine technology, creativity, and strategic thinking with a flexible network of specialized professionals to deliver high-quality, scalable solutions that create real business impact.",
    icon: "chart",
    tone: "cyan",
  },
];

export const values: { title: string; text: string; icon: "bulb" | "users" | "focus" | "shield" | "heart"; tone: Tone }[] = [
  { title: "INNOVATION", text: "We embrace new ideas and technologies.", icon: "bulb", tone: "blue" },
  { title: "COLLABORATION", text: "We work together to achieve more.", icon: "users", tone: "purple" },
  { title: "FOCUSED", text: "We prioritize what truly matters.", icon: "focus", tone: "cyan" },
  { title: "RELIABLE", text: "We deliver with integrity and quality.", icon: "shield", tone: "yellow" },
  { title: "PEOPLE FIRST", text: "We build long-term relationships.", icon: "heart", tone: "pink" },
];

/**
 * Expert categories in the Studio Base contractor network (from the
 * "Project-Based Technical Resource Network" document). `slots` is how
 * many profile cards to show for that category (generic avatars for now).
 */
export const expertCategories: {
  id: string;
  label: string;
  icon: "brain" | "code" | "phone" | "shield" | "pen" | "sales";
  tone: Tone;
  slots: number;
}[] = [
  { id: "ai", label: "AI Engineers", icon: "brain", tone: "purple", slots: 2 },
  { id: "fullstack", label: "Full-Stack Developers", icon: "code", tone: "yellow", slots: 2 },
  { id: "mobile", label: "Mobile Developers", icon: "phone", tone: "cyan", slots: 2 },
  { id: "security", label: "Cybersecurity Engineers", icon: "shield", tone: "blue", slots: 2 },
  { id: "design", label: "UI/UX Designers", icon: "pen", tone: "pink", slots: 1 },
  { id: "sales", label: "Sales Executives", icon: "sales", tone: "green", slots: 5 },
];
