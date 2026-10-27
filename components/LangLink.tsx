"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { localizeHref, useLang } from "@/lib/i18n";

/**
 * Drop-in replacement for next/link: on Spanish pages, internal links
 * ("/contact") point to the Spanish version ("/es/contact") automatically.
 */
export default function Link({ href, ...rest }: ComponentProps<typeof NextLink>) {
  const { lang } = useLang();
  return <NextLink href={typeof href === "string" ? localizeHref(href, lang) : href} {...rest} />;
}
