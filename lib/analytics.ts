/**
 * Google Analytics 4 settings.
 *
 * 1. In https://analytics.google.com create a GA4 property for studiobase.tech
 *    and a "Web" data stream for https://studiobase.tech.
 * 2. Copy the stream's Measurement ID (it looks like "G-ABC123XYZ9") and
 *    paste it between the quotes below, then publish the site.
 *
 * While the ID is empty, nothing is loaded and no cookie notice is shown.
 * Analytics only starts after a visitor clicks "Accept" in the cookie notice.
 */
export const GA_MEASUREMENT_ID: string = "";

export type Consent = "granted" | "denied";

const CONSENT_KEY = "sb-cookie-consent";
const CONSENT_EVENT = "sb-consent-change";
const OPEN_EVENT = "sb-open-cookie-settings";

export function readConsent(): Consent | null {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function saveConsent(value: Consent) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* private mode: the choice lasts only for this visit */
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function subscribeConsent(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Re-opens the cookie notice (used by the "Cookie settings" link in the footer). */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function subscribeOpenSettings(onOpen: () => void) {
  window.addEventListener(OPEN_EVENT, onOpen);
  return () => window.removeEventListener(OPEN_EVENT, onOpen);
}

/** Stops Google Analytics and removes its cookies when consent is withdrawn. */
export function disableAnalytics() {
  if (!GA_MEASUREMENT_ID) return;
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
  const host = window.location.hostname.replace(/^www\./, "");
  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0].trim();
    if (name === "_ga" || name.startsWith("_ga_")) {
      for (const domain of ["", `; domain=${host}`, `; domain=.${host}`]) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
      }
    }
  });
}
