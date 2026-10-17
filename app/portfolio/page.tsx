import type { Metadata } from "next";
import PortfolioHero from "@/sections/portfolio/PortfolioHero";
import ProjectGrid from "@/sections/portfolio/ProjectGrid";
import Process from "@/sections/Process";
import WhyStudioBase from "@/sections/products-services/WhyStudioBase";
import Technologies from "@/sections/Technologies";
import ProductsCTA from "@/sections/products-services/ProductsCTA";
import SectionTransition from "@/components/SectionTransition";
import { ShimmerText } from "@/components/Effects";
import { T } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected Studio Base projects: AI sales automation, custom software, mobile apps, e-commerce platforms and AI lead generation, with real business results.",
};

export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <SectionTransition><ProjectGrid /></SectionTransition>
      <SectionTransition><Process /></SectionTransition>
      <SectionTransition><WhyStudioBase /></SectionTransition>
      <SectionTransition><Technologies /></SectionTransition>
      <SectionTransition>
        <ProductsCTA
          eyebrow={{ en: "LET'S BUILD YOUR SUCCESS STORY", es: "CONSTRUYAMOS TU HISTORIA DE ÉXITO" }}
          title={
            <T
              en={
                <>
                  Have a <ShimmerText>Project</ShimmerText> in Mind?
                </>
              }
              es={
                <>
                  ¿Tienes un <ShimmerText>proyecto</ShimmerText> en mente?
                </>
              }
            />
          }
          description={{
            en: "Partner with Studio Base and our network of specialized experts to develop innovative technology solutions that drive real results.",
            es: "Trabaja con Studio Base y nuestra red de expertos especializados para desarrollar soluciones tecnológicas innovadoras que generan resultados reales.",
          }}
        />
      </SectionTransition>
    </>
  );
}
