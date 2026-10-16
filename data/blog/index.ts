/**
 * All blog articles. To add one: create post-20.ts (copy an existing
 * file as a template), add its image to public/images/blog/, and add
 * it to the list below. Newest articles appear first automatically.
 */
import type { Block, Post } from "./types";
import p01 from "./post-01";
import p02 from "./post-02";
import p03 from "./post-03";
import p04 from "./post-04";
import p05 from "./post-05";
import p06 from "./post-06";
import p07 from "./post-07";
import p08 from "./post-08";
import p09 from "./post-09";
import p11 from "./post-11";
import p12 from "./post-12";
import p13 from "./post-13";
import p14 from "./post-14";
import p15 from "./post-15";
import p16 from "./post-16";
import p17 from "./post-17";
import p18 from "./post-18";
import p19 from "./post-19";

export type { Block, Post };

export const posts: Post[] = [
  p01, p02, p03, p04, p05, p06, p07, p08, p09,
  p11, p12, p13, p14, p15, p16, p17, p18, p19,
].sort(
  (a, b) => b.date.localeCompare(a.date),
);

export const categories = Array.from(new Set(posts.map((p) => p.category)));

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

/** Words in an article (used for reading time). */
function wordCount(post: Post) {
  const text = post.body
    .map((b) =>
      b.type === "list" ? b.items.join(" ") : b.type === "callout" ? `${b.title} ${b.text}` : b.text,
    )
    .join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

/** Estimated minutes to read, at about 220 words per minute. */
export function readingTime(post: Post) {
  return Math.max(1, Math.round(wordCount(post) / 220));
}

/** "2026-10-06" → "October 6, 2026" */
export function formatDate(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Turns a heading into an id for the table of contents: "Where agents shine" → "where-agents-shine" */
export function headingId(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Previous/next articles and related ones (same category first). */
export function relatedPosts(post: Post, count = 3) {
  const same = posts.filter((p) => p.slug !== post.slug && p.category === post.category);
  const others = posts.filter((p) => p.slug !== post.slug && p.category !== post.category);
  return [...same, ...others].slice(0, count);
}
