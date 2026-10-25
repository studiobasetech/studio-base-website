import type { MetadataRoute } from "next";

// Lets phones save the site to the home screen with the Studio Base icon.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Studio Base",
    short_name: "Studio Base",
    description:
      "Studio Base is a tech firm building AI-powered products, custom software and digital infrastructure that help businesses automate, scale and grow.",
    start_url: "/",
    display: "browser",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
