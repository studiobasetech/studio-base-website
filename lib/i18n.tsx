"use client";

/**
 * English / Spanish support.
 *
 * The URL decides the language, so Google can find and index both versions:
 *   English: studiobase.tech/about/      Spanish: studiobase.tech/es/about/
 * The Spanish pages live in app/es/ and reuse the same sections. The EN|ES
 * switch moves between the two URLs, and the last choice is remembered so a
 * returning Spanish visitor lands on the Spanish pages again.
 *
 * How to use it:
 *  - In a client component:  const { tr, t, lang } = useLang();
 *      tr("Hello", "Hola")        → text in the current language
 *      t({ en: "Hello", es: "Hola" }) → same, for text stored in data files
 *  - Anywhere (also server components):  <T en="Hello" es="Hola" />
 *  - Internal links: use Link from "@/components/LangLink" (adds /es/ automatically)
 */

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, type ReactNode } from "react";

export type Lang = "en" | "es";
export type Bi = { en: string; es: string };
/** Text that may be the same in both languages (plain string) or translated. */
export type Text = string | Bi;

const STORAGE_KEY = "sb-lang";

/** "/es/about/" → "es", "/about/" → "en" */
export function langFromPath(path: string | null | undefined): Lang {
  return path === "/es" || !!path?.startsWith("/es/") ? "es" : "en";
}

/** "/es/about/" → "/about/" (the English path) */
export function stripLang(path: string): string {
  if (path === "/es" || path === "/es/") return "/";
  return path.startsWith("/es/") ? path.slice(3) : path;
}

/**
 * An internal link in the given language: "/contact#form" → "/es/contact#form".
 * External links, #anchors, mailto: and files (/images/x.png) are left alone.
 */
export function localizeHref(href: string, lang: Lang): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const hashAt = href.indexOf("#");
  const path = hashAt >= 0 ? href.slice(0, hashAt) : href;
  const hash = hashAt >= 0 ? href.slice(hashAt) : "";
  if (/\.[a-z0-9]{2,5}$/i.test(path)) return href;
  const base = stripLang(path || "/");
  if (lang === "en") return base + hash;
  return (base === "/" ? "/es/" : `/es${base}`) + hash;
}

/** Pick the right language from a Text value. */
export function pick(text: Text, lang: Lang): string {
  return typeof text === "string" ? text : text[lang];
}

function remember(lang: Lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* private mode: the choice just isn't remembered */
  }
}

export function useLang() {
  const pathname = usePathname();
  const router = useRouter();
  const lang = langFromPath(pathname);
  const tr = useCallback((en: string, es: string) => (lang === "es" ? es : en), [lang]);
  const t = useCallback((text: Text) => pick(text, lang), [lang]);
  /** switch language: go to the same page in the other language */
  const setLang = useCallback(
    (next: Lang) => {
      remember(next);
      if (next === lang) return;
      router.push(localizeHref(pathname || "/", next) + window.location.hash, { scroll: false });
    },
    [lang, pathname, router],
  );
  return { lang, setLang, tr, t };
}

/** Inline translated text: <T en="Contact" es="Contacto" /> */
export function T({ en, es }: { en: ReactNode; es: ReactNode }) {
  const { lang } = useLang();
  return <>{lang === "es" ? es : en}</>;
}

/**
 * Kept for older components: page titles now come from each page's metadata
 * (English pages and their /es/ copies), so nothing needs swapping anymore.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useLocalizedTitle(_esTitle?: string, _active = true) {}

/**
 * Keeps <html lang> in sync with the page, and sends returning visitors who
 * chose Spanish before to the Spanish version of the page they opened.
 */
export function HtmlLang() {
  const { lang } = useLang();
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      /* no storage */
    }
    if (saved === "es" && langFromPath(pathname) === "en") {
      router.replace(localizeHref(pathname || "/", "es") + window.location.hash, { scroll: false });
    }
    // only when the visitor first arrives
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
