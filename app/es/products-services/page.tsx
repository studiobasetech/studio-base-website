import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

// Spanish version of app/products-services/page.tsx (served at /es/products-services/).
export { default } from "../../products-services/page";

export const metadata: Metadata = pageMetadata({
  lang: "es",
  title: "Servicios de automatización con IA y desarrollo de software",
  description:
    "Agentes de IA, agentes de voz y automatización de procesos, software a la medida, apps móviles y web, nube y análisis de datos, además de HCRM AI y BaseLead AI.",
  path: "/products-services/",
  keywords: [
    "servicios de automatización con IA",
    "agentes de IA para empresas",
    "agentes de voz con IA",
    "recepcionista virtual con IA",
    "desarrollo de software a la medida",
    "desarrollo de apps móviles",
    "desarrollo web para empresas",
    "HCRM AI",
    "BaseLead AI",
  ],
});
