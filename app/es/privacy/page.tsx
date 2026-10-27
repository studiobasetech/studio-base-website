import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

// Spanish version of app/privacy/page.tsx (served at /es/privacy/).
export { default } from "../../privacy/page";

export const metadata: Metadata = pageMetadata({
  lang: "es",
  title: "Aviso de privacidad",
  description:
    "Cómo Studio Base recopila, utiliza y protege la información que compartes en este sitio web, incluidos el formulario de contacto y tu preferencia de idioma.",
  path: "/privacy/",
  keywords: [
    "aviso de privacidad de Studio Base",
  ],
});
