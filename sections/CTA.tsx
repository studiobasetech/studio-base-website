import Link from "next/link";
import ParticleField from "@/components/ParticleField";
import { ArrowRight } from "lucide-react";
import { consultationHref } from "@/data/site";

export default function CTA() {

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
        h-[320px]
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
              "url('/images/cta-mountain.png')",
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
          h-full
          items-center
          px-8
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
              LET'S BUILD TOGETHER
            </p>



            <h2 className="
              mt-4
              text-3xl
              font-semibold
              leading-tight
              text-white
              md:text-5xl
            ">

              Turn Your Ideas

              <br />

              <span className="text-yellow-400">
                Into Real Solutions.
              </span>

            </h2>



            <p className="
              mt-4
              max-w-md
              text-sm
              leading-relaxed
              text-zinc-400
            ">
              Partner with Studio Base and turn your ideas into
              powerful technology solutions that drive real
              business growth.
            </p>



            <div className="
              mt-6
              flex
              gap-4
            ">


              <Link href={consultationHref} className="
                flex
                items-center
                gap-2
                rounded-full
                bg-yellow-400
                px-6
                py-2.5
                text-xs
                font-semibold
                text-black
                transition
                hover:bg-yellow-300
              ">
                Book a Consultation

                <ArrowRight size={14}/>

              </Link>



              <Link href="/contact" className="
                rounded-full
                border
                border-white/30
                px-6
                py-2.5
                text-xs
                font-semibold
                text-white
                transition
                hover:border-yellow-400
                hover:text-yellow-400
              ">
                Contact Us
              </Link>


            </div>


          </div>


        </div>


      </div>


    </section>

  );

}