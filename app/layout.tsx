import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://studiobase.tech";
const SITE_TITLE = "Studio Base - Technology Solutions & Digital Transformation";
const SITE_DESCRIPTION =
  "Studio Base is a technology company specialized in artificial intelligence, software engineering and digital transformation, helping businesses automate, scale and grow.";

/*
 * Browser tab title, Google result and link previews (WhatsApp, iMessage,
 * LinkedIn, X...). The favicon and the preview image are the files
 * app/favicon.ico, app/icon.png, app/apple-icon.png and
 * app/opengraph-image.png; Next.js picks them up automatically.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Each page sets its own title; it shows as "Portfolio | Studio Base".
  title: {
    default: SITE_TITLE,
    template: "%s | Studio Base",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Studio Base",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Studio Base",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
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
        <CustomCursor />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
