import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import type { Metadata } from "next";
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

export const metadata: Metadata = {
  // Each page sets its own title; it shows as "Portfolio | Studio Base".
  title: {
    default: "Studio Base | Technology & Creative Studio",
    template: "%s | Studio Base",
  },
  description:
    "Studio Base is a multidisciplinary studio combining strategy, design, technology and AI: digital infrastructure, branding, interior & spatial design, and AI automation.",
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
