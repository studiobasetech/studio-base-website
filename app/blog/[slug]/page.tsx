import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPost, posts, relatedPosts, type Post } from "@/data/blog";
import { OPEN_GRAPH_DEFAULTS, SITE_LOGO, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";
import ArticleHero from "@/sections/blog/ArticleHero";
import ArticleBody from "@/sections/blog/ArticleBody";
import ArticleAside, { ShareButtons } from "@/sections/blog/ArticleAside";
import PostCard from "@/sections/blog/PostCard";
import Reveal from "@/components/Reveal";
import { T } from "@/lib/i18n";

// Every article is generated ahead of time (the site is a static export).
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

/** Extra search keywords for each blog category (English and Spanish). */
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  "Artificial Intelligence": [
    "AI agents for business",
    "artificial intelligence for business",
    "AI automation company",
    "inteligencia artificial para empresas",
  ],
  Automation: [
    "business process automation",
    "AI automation",
    "workflow automation",
    "automatización con IA",
  ],
  "Web & Software": [
    "custom software development company",
    "web development company",
    "software engineering",
    "desarrollo de software a la medida",
  ],
  Data: [
    "business intelligence and analytics",
    "data quality",
    "analytics for growing businesses",
    "análisis de datos para empresas",
  ],
  Cloud: [
    "cloud deployment and integration",
    "cloud migration",
    "cloud cost optimization",
    "migración a la nube",
  ],
};

const TITLE_SUFFIX = ` | ${SITE_NAME}`;
const MAX_TITLE = 60;

/** Cuts text at a word boundary so it is at most `max` characters long. */
function cutAtWord(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max + 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : text.slice(0, max)).replace(/[\s,:;.?!-]+$/, "");
}

/**
 * Search-result title of at most 60 characters. Long article titles are
 * shortened to the part before the colon or question mark ("Cloud Costs
 * Demystified"); the full title is still used on the page and in previews.
 */
function seoTitle(title: string): Metadata["title"] {
  if (title.length + TITLE_SUFFIX.length <= MAX_TITLE) return title;
  if (title.length <= MAX_TITLE) return { absolute: title };
  const match = title.match(/^(.+?[?:])\s/);
  const head = match ? match[1].replace(/:$/, "").trim() : "";
  if (head.length >= 12) {
    return head.length + TITLE_SUFFIX.length <= MAX_TITLE ? head : { absolute: cutAtWord(head, MAX_TITLE) };
  }
  return { absolute: cutAtWord(title, MAX_TITLE) };
}

/** Meta description of at most 160 characters. */
function seoDescription(text: string) {
  return text.length <= 160 ? text : `${cutAtWord(text, 157)}…`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const path = `/blog/${post.slug}/`;
  const description = seoDescription(post.excerpt);
  const keywords = [post.category, ...(CATEGORY_KEYWORDS[post.category] ?? []), "Studio Base blog"];
  return {
    title: seoTitle(post.title),
    description,
    keywords,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    alternates: { canonical: path },
    openGraph: {
      ...OPEN_GRAPH_DEFAULTS,
      alternateLocale: [...OPEN_GRAPH_DEFAULTS.alternateLocale],
      type: "article",
      url: path,
      title: post.title,
      description,
      publishedTime: post.date,
      authors: [SITE_NAME],
      section: post.category,
      tags: keywords,
      images: [{ url: post.image, width: 1600, height: 900, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [post.image],
    },
  };
}

/** BlogPosting structured data (JSON-LD) so Google understands the article. */
function articleJsonLd(post: Post) {
  const url = absoluteUrl(`/blog/${post.slug}/`);
  const organization = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: SITE_LOGO },
  };
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.image),
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en",
    articleSection: post.category,
    author: organization,
    publisher: organization,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(post)).replace(/</g, "\\u003c") }}
      />
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
                <T en="All articles" es="Todos los artículos" />
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
            <p className="text-[10px] tracking-[0.45em] text-zinc-400">
              <T en="KEEP READING" es="SIGUE LEYENDO" />
            </p>
            <h2 className="mt-3 text-2xl font-medium text-white md:text-3xl">
              <T en="Up next" es="A continuación" />
            </h2>
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
