import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

// Spanish version of app/blog/page.tsx (served at /es/blog/).
export { default } from "../../blog/page";

export const metadata: Metadata = pageMetadata({
  lang: "es",
  title: "Blog: IA, automatización, datos y web",
  description:
    "Artículos prácticos sobre agentes de IA, automatización de negocios, datos, nube y desarrollo web para quienes construyen y dirigen negocios modernos.",
  path: "/blog/",
  keywords: [
    "blog de inteligencia artificial",
    "automatización de negocios",
    "agentes de IA",
    "datos y nube",
    "consejos de desarrollo web",
  ],
});
