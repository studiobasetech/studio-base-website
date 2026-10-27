import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/data/blog";
import { articleMetadata } from "@/lib/blogSeo";
import ArticleView from "@/sections/blog/ArticleView";

// Every article is generated ahead of time (the site is a static export).
// Spanish version of app/blog/[slug]/page.tsx (served at /es/blog/<slug>/).
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post ? articleMetadata(post, "es") : {};
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  return <ArticleView post={post} lang="es" />;
}
