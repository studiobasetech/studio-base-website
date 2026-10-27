"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { localizeHref, useLang } from "@/lib/i18n";
import { track } from "@/lib/analytics";

/**
 * Drop-in replacement for next/link: on Spanish pages, internal links
 * ("/contact") point to the Spanish version ("/es/contact") automatically.
 */
export default function Link({ href, onClick, ...rest }: ComponentProps<typeof NextLink>) {
  const { lang } = useLang();
  return (
    <NextLink
      href={typeof href === "string" ? localizeHref(href, lang) : href}
      onClick={(e) => {
        // count "Book a Consultation" clicks in Google Analytics
        if (typeof href === "string" && href.includes("#contact-form")) track("consultation_click");
        onClick?.(e);
      }}
      {...rest}
    />
  );
}
