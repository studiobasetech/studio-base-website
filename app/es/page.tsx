import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

// Spanish version of app/page.tsx (served at /es/).
export { default } from "../page";

export const metadata: Metadata = pageMetadata({
  lang: "es",
  title: "Automatización con IA y desarrollo de software a la medida | Studio Base",
  absoluteTitle: true,
  description:
    "Studio Base es una firma tecnológica que desarrolla productos con IA, software a la medida e infraestructura digital para automatizar, escalar y crecer.",
  path: "/",
  keywords: [
    "agencia de inteligencia artificial",
    "automatización con IA para empresas",
    "agentes de IA para negocios",
    "recepcionista con IA",
    "chatbot con IA para WhatsApp",
    "desarrollo de software a la medida",
    "desarrollo de aplicaciones móviles",
    "empresa de desarrollo web",
    "transformación digital",
  ],
});
