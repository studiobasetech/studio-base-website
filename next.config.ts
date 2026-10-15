import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Builds a fully static site into the "out" folder (required for GitHub Pages)
  output: "export",

  // GitHub Pages cannot optimize images on the fly
  images: { unoptimized: true },

  // Makes /about work as /about/index.html on GitHub Pages
  trailingSlash: true,
};

export default nextConfig;
