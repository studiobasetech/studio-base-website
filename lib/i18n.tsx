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
const pageTitles: Record<string, Bi> = {
  "/": {
    en: "Studio Base - Technology Solutions & Digital Transformation",
    es: "Studio Base - Soluciones tecnológicas y transformación digital",
  },
  "/products-services": { en: "Products & Services | Studio Base", es: "Productos y Servicios | Studio Base" },
  "/portfolio": { en: "Portfolio | Studio Base", es: "Portafolio | Studio Base" },
  "/about": { en: "About Studio Base | Studio Base", es: "Sobre Studio Base | Studio Base" },
  "/blog": { en: "Blog | Studio Base", es: "Blog | Studio Base" },
  "/contact": { en: "Contact | Studio Base", es: "Contacto | Studio Base" },
};

/** Keeps <html lang> and the browser-tab title in sync with the chosen language. */
export function HtmlLang() {
  const { lang } = useLang();
  const pathname = usePathname();
  useEffect(() => {
    document.documentElement.lang = lang;
    const key = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
    const title = pageTitles[key];
    if (title) document.title = title[lang];
  }, [lang, pathname]);
  return null;
}
