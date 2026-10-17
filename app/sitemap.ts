import type { MetadataRoute } from "next";
import { posts } from "@/data/blog";
import { SITE_URL } from "@/lib/seo";

// Built once into out/sitemap.xml (required for the static export).
export const dynamic = "force-static";

type Entry = MetadataRoute.Sitemap[number];

/** Main pages. URLs end in "/" to match trailingSlash in next.config.ts. */
const pages: {
  path: string;
  priority: number;
  changeFrequency: NonNullable<Entry["changeFrequency"]>;
}[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/products-services/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/portfolio/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog/", priority: 0.8, changeFrequency: "weekly" },
  { path: "/contact/", priority: 0.7, changeFrequency: "yearly" },
  { path: "/privacy/", priority: 0.3, changeFrequency: "yearly" },
];

/** "2026-10-06" → Date at midnight UTC. */
function toDate(date: string) {
  return new Date(`${date}T00:00:00Z`);
}

export default function sitemap(): MetadataRoute.Sitemap {
  // posts is sorted newest first, so posts[0] is the latest article.
  const latestPost = posts[0] ? toDate(posts[0].date) : new Date();
  const now = new Date();

  const pageEntries: MetadataRoute.Sitemap = pages.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: p.path === "/blog/" ? latestPost : now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}/`,
    lastModified: toDate(post.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...pageEntries, ...postEntries];
}
