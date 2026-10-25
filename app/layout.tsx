import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import CookieConsent from "@/components/CookieConsent";
import { HtmlLang } from "@/lib/i18n";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  DEFAULT_KEYWORDS,
  DEFAULT_OG_IMAGE,
  GOOGLE_SITE_VERIFICATION,
  SITE_EMAIL,
  SITE_LOGO,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_TITLE = "AI Automation & Custom Software Development | Studio Base";
const SITE_DESCRIPTION =
  "Studio Base is a tech firm building AI-powered products, custom software and digital infrastructure that help businesses automate, scale and grow.";

/*
 * Browser tab title, Google result and link previews (WhatsApp, iMessage,
 * LinkedIn, X...). The icons are app/favicon.ico, app/icon.png and
 * app/apple-icon.png; the link-preview image is public/images/share/studio-base-preview-2026.png (see lib/seo.ts).
 * Shared SEO settings (site URL, keywords, Google verification) live in lib/seo.ts.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Each page sets its own title; it shows as "Portfolio | Studio Base".
  title: {
    default: SITE_TITLE,
    template: "%s | Studio Base",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: DEFAULT_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    alternateLocale: ["es_US"],
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
  // Added only once a token is pasted into lib/seo.ts
  ...(GOOGLE_SITE_VERIFICATION ? { verification: { google: GOOGLE_SITE_VERIFICATION } } : {}),
};

/*
 * Structured data (JSON-LD) that tells Google who Studio Base is: the
 * company, the services it offers, where it works and the website itself.
 * No social profiles (sameAs) yet: add them here once the accounts exist.
 */
const SERVICES: { name: string; description: string }[] = [
  {
    name: "AI Solutions & Business Automation",
    description: "AI agents, AI voice agents and process automation that take repetitive work off your team.",
  },
  {
    name: "Custom Software Engineering",
    description: "SaaS products, APIs and internal systems built around how your business works.",
  },
  {
    name: "Mobile & Web App Development",
    description: "iOS, Android and web applications designed, built and launched end to end.",
  },
  {
    name: "Digital Platforms & Web Engineering",
    description: "Corporate websites, e-commerce stores and customer or partner portals.",
  },
  {
    name: "Cloud Deployment & Integration",
    description: "Cloud infrastructure, deployment and integrations between the tools you already use.",
  },
  {
    name: "Business Intelligence & Analytics",
    description: "Dashboards, reporting and data pipelines that turn business data into decisions.",
  },
  {
    name: "Technology Strategy & AI Consulting",
    description: "Roadmaps, AI readiness and digital transformation consulting.",
  },
];

const PRODUCTS: { name: string; description: string }[] = [
  { name: "HCRM AI", description: "AI-powered CRM by Studio Base." },
  { name: "BaseLead AI", description: "AI lead generation platform by Studio Base." },
];

const ORG_ID = `${SITE_URL}/#organization`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: SITE_LOGO },
      email: SITE_EMAIL,
      address: {
        "@type": "PostalAddress",
        streetAddress: "5900 Balcones Drive # 34618",
        addressLocality: "Austin",
        addressRegion: "TX",
        postalCode: "78731",
        addressCountry: "US",
      },
      areaServed: ["United States", "Latin America"],
      knowsLanguage: ["en", "es"],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      image: SITE_LOGO,
      logo: SITE_LOGO,
      email: SITE_EMAIL,
      parentOrganization: { "@id": ORG_ID },
      address: {
        "@type": "PostalAddress",
        streetAddress: "5900 Balcones Drive # 34618",
        addressLocality: "Austin",
        addressRegion: "TX",
        postalCode: "78731",
        addressCountry: "US",
      },
      areaServed: [
        { "@type": "Country", name: "United States" },
        { "@type": "Place", name: "Latin America" },
      ],
      knowsLanguage: ["en", "es"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Technology services and AI products",
        itemListElement: [
          ...SERVICES.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.name, description: s.description, provider: { "@id": ORG_ID } },
          })),
          ...PRODUCTS.map((p) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "SoftwareApplication",
              name: p.name,
              description: p.description,
              applicationCategory: "BusinessApplication",
            },
          })),
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: ["en", "es"],
      publisher: { "@id": ORG_ID },
    },
  ],
};

// Colors the phone's browser bar black to match the site
export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

/**
 * Shared shell for every page: the Navbar and Footer live here, so each
 * page only needs its own content.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-black text-white">
        {/* Structured data for Google; "<" is escaped so the JSON can never close the tag early */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        <HtmlLang />
        <CustomCursor />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
