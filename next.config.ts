import type { NextConfig } from "next";

// Set automatically by the GitHub Actions workflow (for example "/my-repo").
// It is empty when you run the site locally.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Builds a fully static site into the "out" folder (required for GitHub Pages)
  output: "export",

  // GitHub Pages cannot optimize images on the fly
  images: { unoptimized: true },

  // Makes /about work as /about/index.html on GitHub Pages
  trailingSlash: true,

  basePath,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
