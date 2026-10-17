import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Built once into out/robots.txt (required for the static export).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
