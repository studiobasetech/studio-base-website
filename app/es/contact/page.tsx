import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

// Spanish version of app/contact/page.tsx (served at /es/contact/).
export { default } from "../../contact/page";

export const metadata: Metadata = pageMetadata({
  lang: "es",
  title: "Contáctanos: expertos en IA y software",
  description:
    "Cuéntanos sobre tu proyecto o agenda una consulta: automatización con IA, software a la medida, apps móviles y desarrollo web. Respondemos en 24 horas.",
  path: "/contact/",
  keywords: [
    "contratar desarrollo de software",
    "consultoría en inteligencia artificial",
    "cotización de software",
    "contactar a Studio Base",
    "contratar desarrolladores de IA",
  ],
});
