import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import PrivacyPolicy from "@/sections/legal/PrivacyPolicy";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Studio Base collects, uses and protects the information you share through this website, including the contact form and your language preference.",
  path: "/privacy/",
  keywords: [
    "Studio Base privacy policy",
  ],
});

export default function PrivacyPage() {
  return <PrivacyPolicy />;
}
