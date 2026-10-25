/**
 * SEO settings shared by every page: the site address, default keywords,
 * the preview image and a helper that builds each page's metadata.
 *
 * Note: the site is bilingual on the SAME URLs (the language switch happens
 * in the browser, see lib/i18n.tsx), so there are no separate /es/ pages
 * and no hreflang alternates. Spanish keywords are listed alongside English.
 */
import type { Metadata } from "next";

export const SITE_URL = "https://studiobase.tech";
export const SITE_NAME = "Studio Base";
export const SITE_EMAIL = "info@studiobase.tech";
export const SITE_LOGO = `${SITE_URL}/images/studio-base-logo-v2.png`;

/**
 * Google Search Console verification (HTML tag method).
 *
 * In Search Console choose "URL prefix" → https://studiobase.tech → "HTML tag".
 * Google shows something like:
 *   <meta name="google-site-verification" content="AbC123..." />
 * Paste ONLY the value of content (AbC123...) between the quotes below,
 * publish the site, then click "Verify". Leave it empty if you verify with
 * a DNS TXT record instead (recommended: it covers the whole domain).
 */
export const GOOGLE_SITE_VERIFICATION: string = "";

/** Keywords used on every page (pages add their own on top). */
export const DEFAULT_KEYWORDS: string[] = [
  "Studio Base",
  "AI automation company",
  "custom software development company",
  "AI agents for business",
  "AI voice agents",
  "mobile app development company",
  "web development company",
  "digital transformation consulting",
  "business process automation",
  "tech firm",
  "automatización con IA",
  "desarrollo de software a la medida",
  "desarrollo de aplicaciones móviles",
  "agencia de inteligencia artificial",
];

/**
 * Default link-preview image (1200×630). It has a unique file name on purpose:
 * browsers, Google and social apps cache preview images by URL, so a new image
 * must get a NEW name (e.g. ...-2027.png) or they keep showing the old one.
 */
export const DEFAULT_OG_IMAGE = {
  url: "/images/share/studio-base-preview-2026.png",
  width: 1200,
  height: 630,
  alt: "Studio Base - Technology Solutions & Digital Transformation",
};

/** Shared Open Graph fields, so a page's own openGraph does not drop them. */
export const OPEN_GRAPH_DEFAULTS = {
  siteName: SITE_NAME,
  locale: "en_US",
  alternateLocale: ["es_US"],
} as const;

type PageSeo = {
  /** Page title without " | Studio Base" (the layout template adds it). */
  title: string;
  description: string;
  /** Path with a trailing slash, e.g. "/about/". */
  path: string;
  keywords?: string[];
  /** true = use the title as is, without " | Studio Base" (home page). */
  absoluteTitle?: boolean;
};

/** Metadata for a regular page: title, description, keywords, canonical, previews. */
export function pageMetadata({
  title,
  description,
  path,
  keywords = [],
  absoluteTitle = false,
}: PageSeo): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: Array.from(new Set([...keywords, ...DEFAULT_KEYWORDS])),
    alternates: { canonical: path },
    openGraph: {
      ...OPEN_GRAPH_DEFAULTS,
      alternateLocale: [...OPEN_GRAPH_DEFAULTS.alternateLocale],
      type: "website",
      url: path,
      title: fullTitle,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

/** Turns a site path ("/images/x.jpg") into a full URL for structured data. */
export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}
