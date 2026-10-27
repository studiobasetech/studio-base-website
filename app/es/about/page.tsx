import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

// Spanish version of app/about/page.tsx (served at /es/about/).
export { default } from "../../about/page";

export const metadata: Metadata = pageMetadata({
  lang: "es",
  title: "Sobre nosotros: firma tecnológica de IA y software",
  description:
    "Studio Base es una firma tecnológica con una red remota de expertos en inteligencia artificial, ingeniería de software, desarrollo móvil y diseño UI/UX.",
  path: "/about/",
  keywords: [
    "firma tecnológica",
    "empresa de inteligencia artificial",
    "empresa de desarrollo de software",
    "equipo remoto de desarrollo",
    "consultoría de transformación digital",
  ],
});
