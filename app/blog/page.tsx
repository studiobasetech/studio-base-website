import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import BlogHero from "@/sections/blog/BlogHero";
import BlogIndex from "@/sections/blog/BlogIndex";

export const metadata: Metadata = pageMetadata({
  title: "Blog: AI, Automation, Data & Web Insights",
  description:
    "Practical articles on AI agents, business automation, data, cloud and web development for teams building and running modern businesses. By Studio Base.",
  path: "/blog/",
  keywords: [
    "AI blog",
    "business automation blog",
    "AI agents",
    "cloud and data insights",
    "web development tips",
    "blog de inteligencia artificial",
  ],
});

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      <BlogIndex />
    </>
  );
}
