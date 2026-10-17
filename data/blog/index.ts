/**
 * All blog articles. To add one: create post-20.ts (copy an existing
 * file as a template), add its image to public/images/blog/, and add
 * it to the list below. Newest articles appear first automatically.
 */
import type { Block, Post, PostTranslation } from "./types";
import type { Lang } from "@/lib/i18n";
import p01 from "./post-01";
import p02 from "./post-02";
import p03 from "./post-03";
import p04 from "./post-04";
import p06 from "./post-06";
import p07 from "./post-07";
import p08 from "./post-08";
import p09 from "./post-09";
import p11 from "./post-11";
import p12 from "./post-12";
import p15 from "./post-15";
import p16 from "./post-16";
import p17 from "./post-17";
import p18 from "./post-18";
import p19 from "./post-19";

// Spanish versions (data/blog/es/post-XX.ts): same blocks, translated text
import es01 from "./es/post-01";
import es02 from "./es/post-02";
import es03 from "./es/post-03";
import es04 from "./es/post-04";
import es06 from "./es/post-06";
import es07 from "./es/post-07";
import es08 from "./es/post-08";
import es09 from "./es/post-09";
import es11 from "./es/post-11";
import es12 from "./es/post-12";
import es15 from "./es/post-15";
import es16 from "./es/post-16";
import es17 from "./es/post-17";
import es18 from "./es/post-18";
import es19 from "./es/post-19";

export type { Block, Post, PostTranslation };

export const posts: Post[] = [
  p01, p02, p03, p04, p06, p07, p08, p09,
  p11, p12, p15, p16, p17, p18, p19,
].sort(
  (a, b) => b.date.localeCompare(a.date),
);

export const categories = Array.from(new Set(posts.map((p) => p.category)));

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

/** Spanish text for each article, by slug. */
const spanish: Record<string, PostTranslation> = {
  [p01.slug]: es01,
  [p02.slug]: es02,
  [p03.slug]: es03,
  [p04.slug]: es04,
  [p06.slug]: es06,
  [p07.slug]: es07,
  [p08.slug]: es08,
  [p09.slug]: es09,
  [p11.slug]: es11,
  [p12.slug]: es12,
  [p15.slug]: es15,
  [p16.slug]: es16,
  [p17.slug]: es17,
  [p18.slug]: es18,
  [p19.slug]: es19,
};

/**
 * The article in the chosen language. Spanish replaces only the text;
 * slug, date, image and category (the English key used for filtering) stay the same.
 */
export function localizePost(post: Post, lang: Lang): Post {
  if (lang !== "es") return post;
  const es = spanish[post.slug];
  return es ? { ...post, ...es } : post;
}

/** Category names as shown to visitors. The English name stays the key used for filtering. */
const categoryNames: Record<string, string> = {
  "Artificial Intelligence": "Inteligencia artificial",
  Automation: "Automatización",
  "Web & Software": "Web y software",
  Data: "Datos",
  Cloud: "Nube",
};

export function categoryLabel(category: string, lang: Lang) {
  return lang === "es" ? (categoryNames[category] ?? category) : category;
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

/**
 * Estimated minutes to read, at about 220 words per minute.
 * Pass the localized post (localizePost) to count the words of that language.
 */
export function readingTime(post: Post) {
  return Math.max(1, Math.round(wordCount(post) / 220));
}

/** "2026-10-06" → "October 6, 2026" (English) or "6 de octubre de 2026" (Spanish) */
export function formatDate(date: string, lang: Lang = "en") {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Turns a heading into an id for the table of contents: "Where agents shine" → "where-agents-shine".
 * Accents are removed, so Spanish works too: "Dónde brillan hoy" → "donde-brillan-hoy".
 */
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
