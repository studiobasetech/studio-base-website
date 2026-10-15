import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { consultationHref } from "@/data/site";

// Swap this for the laptop image from the mockup once it's in public/images.
const CTA_IMAGE = "/images/products-hero.png";

export default function ProductsCTA() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-20 lg:px-12 lg:py-24">
      {/* Background image on the right */}
      <div
        className="absolute inset-0 bg-cover bg-[position:80%_center] opacity-60 lg:bg-right lg:opacity-100"
        style={{ backgroundImage: `url('${CTA_IMAGE}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/10" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />

      <Reveal className="relative z-10 mx-auto max-w-7xl">
        <div className="max-w-xl">
          <p className="text-[10px] tracking-[0.45em] text-zinc-300">
            LET&apos;S BUILD TOGETHER
          </p>

          <h2 className="mt-4 text-3xl font-medium leading-tight text-white md:text-5xl">
            Ready to Transform
            <br />
            Your Business with Technology?
          </h2>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-zinc-300">
            Partner with Studio Base and turn your ideas into powerful
            technology solutions that drive real business growth.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={consultationHref}
              className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-7 py-3 text-sm font-semibold text-black transition-colors hover:bg-yellow-300"
            >
              Book a Consultation
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-white/40 px-9 py-3 text-sm font-semibold text-white transition-colors hover:border-yellow-400 hover:text-yellow-400"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
