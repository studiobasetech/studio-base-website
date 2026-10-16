import type { Metadata } from "next";
import BlogHero from "@/sections/blog/BlogHero";
import BlogIndex from "@/sections/blog/BlogIndex";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical thinking on artificial intelligence, automation, security, data and design for people who build and run modern businesses.",
};

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      <BlogIndex />
    </>
  );
}
