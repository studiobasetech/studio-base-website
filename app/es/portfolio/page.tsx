import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

// Spanish version of app/portfolio/page.tsx (served at /es/portfolio/).
export { default } from "../../portfolio/page";

export const metadata: Metadata = pageMetadata({
  lang: "es",
  title: "Portafolio: proyectos de IA, software y apps",
  description:
    "Proyectos de Studio Base: automatización de ventas con IA, software a la medida, apps móviles, plataformas de e-commerce y generación de prospectos con IA.",
  path: "/portfolio/",
  keywords: [
    "portafolio de desarrollo de software",
    "casos de automatización con IA",
    "portafolio de apps móviles",
    "desarrollo de e-commerce",
    "generación de prospectos con IA",
  ],
});
