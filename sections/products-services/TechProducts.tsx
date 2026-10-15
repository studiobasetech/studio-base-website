import Link from "next/link";
import { ArrowRight, Check, Cpu, Crosshair } from "lucide-react";
import Reveal from "@/components/Reveal";
import { techProducts } from "@/data/services";
import { accents } from "./accents";
import SectionIntro from "./SectionIntro";

const icons = {
  "hcrm-ai": Cpu,
  "baselead-ai": Crosshair,
};

export default function TechProducts() {
  return (
    <section id="our-products" className="scroll-mt-20 bg-black px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="OUR TECHNOLOGY PRODUCTS"
          title="Proprietary AI Solutions for Modern Businesses."
          side={
            <p>
              Powerful AI platforms designed to automate operations, acquire
              more clients, and drive business growth.
            </p>
          }
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {techProducts.map((product, i) => {
            const a = accents[product.accent];
            const Icon = icons[product.id as keyof typeof icons] ?? Cpu;

            return (
              <Reveal key={product.id} delay={i * 0.12} className="h-full">
                <article
                  className={`group relative grid h-full overflow-hidden rounded-xl border bg-[#07070a] transition-all duration-500 hover:-translate-y-1 sm:grid-cols-[1.15fr_1fr] ${a.border} ${a.borderHover}`}
                  style={{ boxShadow: `0 0 50px -20px rgba(${a.rgb},0.45)` }}
                >
                  {/* Glow */}
                  <div
                    className={`pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full blur-3xl ${a.glow}`}
                  />

                  {/* TEXT */}
                  <div className="relative z-10 flex flex-col p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      <span
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border ${a.iconBox}`}
                      >
                        <Icon size={24} />
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold text-white md:text-2xl">
                          {product.title}
                        </h3>
                        <p className="mt-1 text-sm text-zinc-300">
                          {product.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="mt-5 text-xs leading-relaxed text-zinc-400 md:text-sm">
                      {product.description}
                    </p>

                    {/* CORE CAPABILITIES */}
                    <div className="mt-6 flex items-center gap-3">
                      <p className={`text-[10px] font-semibold tracking-[0.3em] ${a.text}`}>
                        CORE CAPABILITIES
                      </p>
                      <span
                        className={`h-px flex-1 bg-gradient-to-r to-transparent ${a.line}`}
                      />
                    </div>

                    <ul className="mt-4 space-y-2.5">
                      {product.capabilities.map((c) => (
                        <li
                          key={c}
                          className="flex items-center gap-2.5 text-xs text-zinc-200"
                        >
                          <span
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${a.check}`}
                          >
                            <Check size={10} strokeWidth={3} />
                          </span>
                          {c}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={product.href}
                      className={`mt-8 inline-flex w-fit items-center gap-2 rounded-full px-6 py-2.5 text-xs font-semibold transition-colors ${a.button}`}
                    >
                      Learn More
                      <ArrowRight size={14} />
                    </Link>
                  </div>

                  {/* IMAGE (below the text on phones, on the right on larger screens) */}
                  <div className="relative h-64 overflow-hidden sm:h-auto">
                    <img
                      src={product.image}
                      alt={`${product.title} dashboard`}
                      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#07070a] via-transparent to-transparent sm:bg-gradient-to-r" />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
