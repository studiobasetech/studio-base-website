import type { Metadata } from "next";
import { localizePost, type Post } from "@/data/blog";
import type { Lang } from "@/lib/i18n";
import { OPEN_GRAPH_DEFAULTS, SITE_LOGO, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";

/** Extra search keywords for each blog category (by the English category name). */
const CATEGORY_KEYWORDS: Record<string, { en: string[]; es: string[] }> = {
  "Artificial Intelligence": {
    en: ["AI agents for business", "artificial intelligence for business", "AI automation company"],
    es: ["inteligencia artificial para empresas", "agentes de IA para negocios", "agencia de inteligencia artificial"],
  },
  Automation: {
    en: ["business process automation", "AI automation", "workflow automation"],
    es: ["automatización con IA", "automatización de procesos", "automatizar mi negocio"],
  },
  "Web & Software": {
    en: ["custom software development company", "web development company", "software engineering"],
    es: ["desarrollo de software a la medida", "empresa de desarrollo web", "desarrollo de aplicaciones"],
  },
  Data: {
    en: ["business intelligence and analytics", "data quality", "analytics for growing businesses"],
    es: ["análisis de datos para empresas", "inteligencia de negocios", "calidad de datos"],
  },
  Cloud: {
    en: ["cloud deployment and integration", "cloud migration", "cloud cost optimization"],
    es: ["migración a la nube", "servicios en la nube para empresas", "costos de la nube"],
  },
};

const TITLE_SUFFIX = ` | ${SITE_NAME}`;
const MAX_TITLE = 60;

/** Cuts text at a word boundary so it is at most `max` characters long. */
function cutAtWord(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max + 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : text.slice(0, max)).replace(/[\s,:;.?!¿¡-]+$/, "");
}

/**
 * Search-result title of at most 60 characters. Long article titles are
 * shortened to the part before the colon or question mark; the full title is
 * still used on the page and in previews.
 */
function seoTitle(title: string): Metadata["title"] {
  if (title.length + TITLE_SUFFIX.length <= MAX_TITLE) return title;
  if (title.length <= MAX_TITLE) return { absolute: title };
  const match = title.match(/^(.+?[?:])\s/);
  const head = match ? match[1].replace(/:$/, "").trim() : "";
  if (head.length >= 12) {
    return head.length + TITLE_SUFFIX.length <= MAX_TITLE ? head : { absolute: cutAtWord(head, MAX_TITLE) };
  }
  return { absolute: cutAtWord(title, MAX_TITLE) };
}

/** Meta description of at most 160 characters. */
function seoDescription(text: string) {
  return text.length <= 160 ? text : `${cutAtWord(text, 157)}…`;
}

/** "/blog/x/" in English, "/es/blog/x/" in Spanish */
export const articlePath = (slug: string, lang: Lang) => `${lang === "es" ? "/es" : ""}/blog/${slug}/`;

/** Title, description, keywords, hreflang and previews for one article. */
export function articleMetadata(original: Post, lang: Lang): Metadata {
  const post = localizePost(original, lang);
  const path = articlePath(post.slug, lang);
  const description = seoDescription(post.excerpt);
  const extra = CATEGORY_KEYWORDS[original.category]?.[lang] ?? [];
  const keywords = [post.category, ...extra, lang === "es" ? "blog de Studio Base" : "Studio Base blog"];
  return {
    title: seoTitle(post.title),
    description,
    keywords,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    alternates: {
      canonical: path,
      languages: { en: articlePath(post.slug, "en"), es: articlePath(post.slug, "es"), "x-default": articlePath(post.slug, "en") },
    },
    openGraph: {
      ...OPEN_GRAPH_DEFAULTS,
      locale: lang === "es" ? "es_US" : "en_US",
      alternateLocale: [lang === "es" ? "en_US" : "es_US"],
      type: "article",
      url: path,
      title: post.title,
      description,
      publishedTime: post.date,
      authors: [SITE_NAME],
      section: post.category,
      tags: keywords,
      images: [{ url: post.image, width: 1600, height: 900, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [post.image],
    },
  };
}

/** BlogPosting structured data (JSON-LD) so Google understands the article. */
export function articleJsonLd(original: Post, lang: Lang) {
  const post = localizePost(original, lang);
  const url = absoluteUrl(articlePath(post.slug, lang));
  const organization = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: SITE_LOGO },
  };
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.image),
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: lang,
    articleSection: post.category,
    author: organization,
    publisher: organization,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };
}
