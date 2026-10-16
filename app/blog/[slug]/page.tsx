import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPost, posts, relatedPosts } from "@/data/blog";
import ArticleHero from "@/sections/blog/ArticleHero";
import ArticleBody from "@/sections/blog/ArticleBody";
import ArticleAside, { ShareButtons } from "@/sections/blog/ArticleAside";
import PostCard from "@/sections/blog/PostCard";
import Reveal from "@/components/Reveal";

// Every article is generated ahead of time (the site is a static export).
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      images: [{ url: post.image, width: 1600, height: 900, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = relatedPosts(post);

  return (
    <>
      <ArticleHero post={post} />

      <section className="relative bg-black px-6 pb-20 pt-12 lg:px-12 lg:pt-16">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-16">
          <article id="article-body" className="mx-auto w-full max-w-[720px] lg:mx-0">
            <ArticleBody post={post} />

            {/* share + back (also useful on phones, where the sidebar is hidden) */}
            <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-8">
              <ShareButtons title={post.title} slug={post.slug} />
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-blue-400"
              >
                <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
                All articles
              </Link>
            </div>
          </article>

          <aside className="hidden lg:block">
            <ArticleAside post={post} />
          </aside>
        </div>
      </section>

      {/* up next */}
      <section className="relative border-t border-white/10 bg-black px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10">
            <p className="text-[10px] tracking-[0.45em] text-zinc-400">KEEP READING</p>
            <h2 className="mt-3 text-2xl font-medium text-white md:text-3xl">Up next</h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Reveal key={p.slug} className="h-full">
                <PostCard post={p} index={posts.indexOf(p)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
