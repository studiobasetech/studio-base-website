"use client";

/**
 * English / Spanish support.
 *
 * The chosen language is saved in the visitor's browser, so it stays the
 * same on every page and on their next visit. English is the default.
 *
 * How to use it:
 *  - In a client component:  const { tr, t, lang } = useLang();
 *      tr("Hello", "Hola")        → text in the current language
 *      t({ en: "Hello", es: "Hola" }) → same, for text stored in data files
 *  - Anywhere (also server components):  <T en="Hello" es="Hola" />
 */

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useSyncExternalStore, type ReactNode } from "react";

export type Lang = "en" | "es";
export type Bi = { en: string; es: string };
/** Text that may be the same in both languages (plain string) or translated. */
export type Text = string | Bi;

const STORAGE_KEY = "sb-lang";
const EVENT = "sb-lang-change";

function readLang(): Lang {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "es" ? "es" : "en";
  } catch {
    return "en";
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function setLanguage(lang: Lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* private mode: the choice just isn't remembered */
  }
  window.dispatchEvent(new Event(EVENT));
}

/** Pick the right language from a Text value. */
export function pick(text: Text, lang: Lang): string {
  return typeof text === "string" ? text : text[lang];
}

export function useLang() {
  const lang = useSyncExternalStore<Lang>(subscribe, readLang, () => "en");
  const tr = useCallback((en: string, es: string) => (lang === "es" ? es : en), [lang]);
  const t = useCallback((text: Text) => pick(text, lang), [lang]);
  return { lang, setLang: setLanguage, tr, t };
}

/** Inline translated text: <T en="Contact" es="Contacto" /> */
export function T({ en, es }: { en: ReactNode; es: ReactNode }) {
  const { lang } = useLang();
  return <>{lang === "es" ? es : en}</>;
}

/* Browser-tab titles per page (blog articles set their own in ArticleBody). */
const pageTitles: Record<string, string> = {
  "/": "Automatización con IA y desarrollo de software a la medida | Studio Base",
  "/products-services": "Servicios de automatización con IA y desarrollo de software | Studio Base",
  "/portfolio": "Portafolio: proyectos de IA, software y apps | Studio Base",
  "/about": "Sobre nosotros: firma tecnológica de IA y software | Studio Base",
  "/blog": "Blog: IA, automatización, datos y web | Studio Base",
  "/contact": "Contáctanos: expertos en IA y software | Studio Base",
  "/privacy": "Aviso de privacidad | Studio Base",
};

/*
 * Tab titles: the English ones come from each page's SEO metadata (what Google
 * sees). In Spanish we swap in a translated title and put the English one back
 * when the visitor switches to English again.
 */
const spanishTitles = new Set<string>();

export function useLocalizedTitle(esTitle: string | undefined, active = true) {
  const { lang } = useLang();
  const pathname = usePathname();
  useEffect(() => {
    if (!active) return;
    const root = document.documentElement;
    if (!spanishTitles.has(document.title)) root.dataset.titleEn = document.title;
    if (lang === "es" && esTitle) {
      spanishTitles.add(esTitle);
      document.title = esTitle;
    } else if (root.dataset.titleEn) {
      document.title = root.dataset.titleEn;
    }
  }, [lang, esTitle, pathname, active]);
}

/** Keeps <html lang> and the browser-tab title in sync with the chosen language. */
export function HtmlLang() {
  const { lang } = useLang();
  const pathname = usePathname();
  const key = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  useLocalizedTitle(pageTitles[key], key in pageTitles);
  return null;
}
