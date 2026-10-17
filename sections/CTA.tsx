"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import ParticleField from "@/components/ParticleField";
import { ArrowRight } from "lucide-react";
import { consultationHref } from "@/data/site";
import { useLang, type Text } from "@/lib/i18n";

/**
 * Closing call to action with the mountain portal image. Text and
 * buttons can be changed per page; defaults are the Home text.
 */
export default function CTA({
  eyebrow = { en: "LET'S BUILD TOGETHER", es: "CONSTRUYAMOS JUNTOS" },
  title,
  description = {
    en: "Partner with Studio Base and turn your ideas into powerful technology solutions that drive real business growth.",
    es: "Trabaja con Studio Base y convierte tus ideas en soluciones tecnológicas sólidas que impulsan el crecimiento real de tu negocio.",
  },
  primary = { label: { en: "Book a Consultation", es: "Agenda una consulta" }, href: consultationHref },
  secondary = { label: { en: "Contact Us", es: "Contáctanos" }, href: "/contact" },
}: {
  eyebrow?: Text;
  title?: ReactNode;
  description?: Text;
  primary?: { label: Text; href: string };
  secondary?: { label: Text; href: string };
} = {}) {
  const { t, tr } = useLang();

  return (

    <section className="
      bg-black
      px-6
      py-16
      lg:px-12
    ">


      <div className="
        relative
        mx-auto
        max-w-7xl
        overflow-hidden
        rounded-xl
        border
        border-white/10
        min-h-[380px]
        md:h-[320px]
        md:min-h-0
      ">


        {/* IMAGE */}

        <div
          className="
            absolute
            inset-0
            bg-cover
            bg-center
          "
          style={{
            backgroundImage:
              "url('/images/cta-mountain-blue-v2.webp')",
          }}
        />


        {/* OVERLAY */}

        <div className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black
          via-black/70
          to-black/20
        "/>


        {/* CONSTELLATION */}

        <ParticleField density={0.5} />


        {/* CONTENT */}

        <div className="
          relative
          z-10
          flex
          min-h-[380px]
          items-center
          px-6
          py-10
          sm:px-8
          md:h-full
          md:min-h-0
          md:py-0
          lg:px-12
        ">


          <div className="
            max-w-xl
          ">


            <p className="
              text-[10px]
              tracking-[0.45em]
              text-zinc-400
            ">
              {t(eyebrow)}
            </p>



            <h2 className="
              mt-4
              text-3xl
              font-semibold
              leading-tight
              text-white
              md:text-5xl
            ">

              {title ?? (

                <>

                  {tr("Turn Your Ideas", "Convierte tus ideas")}

                  <br />

                  <span className="text-blue-500">{tr("Into Real Solutions.", "en soluciones reales.")}</span>

                </>

              )}

            </h2>



            <p className="
              mt-4
              max-w-md
              text-sm
              leading-relaxed
              text-zinc-400
            ">
              {t(description)}
            </p>



            <div className="
              mt-6
              flex
              flex-wrap
              gap-3
              sm:gap-4
            ">


              <Link href={primary.href} className="
                flex
                items-center
                gap-2
                rounded-full
                bg-blue-500
                px-6
                py-2.5
                text-xs
                font-semibold
                text-white
                transition
                hover:bg-blue-400
              ">
                {t(primary.label)}

                <ArrowRight size={14}/>

              </Link>



              <Link href={secondary.href} className="
                rounded-full
                border
                border-white/30
                px-6
                py-2.5
                text-xs
                font-semibold
                text-white
                transition
                hover:border-blue-500
                hover:text-blue-500
              ">
                {t(secondary.label)}
              </Link>


            </div>


          </div>


        </div>


      </div>


    </section>

  );

}