import {
  Atom,
  ChartColumnIncreasing,
  Globe,
  Handshake,
  Sparkle,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { reasons } from "@/data/services";
import { accents } from "./accents";
import SectionIntro from "./SectionIntro";

const icons: Record<string, LucideIcon> = {
  innovation: Atom,
  results: ChartColumnIncreasing,
  expertise: Handshake,
  scalable: Globe,
};

export default function WhyStudioBase() {
  return (
    <section className="bg-black px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="WHY STUDIO BASE"
          title={
            <>
              More Than a Technology Provider.
              <br />
              <span className="text-yellow-400">
                A Strategic Partner for Growth.
              </span>
            </>
          }
          side={
            <>
              <p>
                Studio Base combines proprietary artificial intelligence
                products with advanced software engineering and cybersecurity
                expertise to help businesses operate smarter, faster, and more
                efficiently.
              </p>
              <p>
                We don&apos;t just build software. We create intelligent
                technology solutions that help companies automate, scale, and
                grow.
              </p>
            </>
          }
        />

        <div className="grid grid-cols-2 gap-y-10 border-b border-white/10 pb-14 lg:grid-cols-4">
          {reasons.map((r, i) => {
            const a = accents[r.accent];
            const Icon = icons[r.icon] ?? Atom;

            return (
              <Reveal
                key={r.title}
                delay={i * 0.1}
                className={`px-4 text-center ${i > 0 ? "lg:border-l lg:border-white/10" : ""} ${i % 2 === 1 ? "border-l border-white/10 lg:border-l" : ""}`}
              >
                <Sparkle size={12} className={`mx-auto mb-4 ${a.text}`} />

                <div className="flex items-center justify-center gap-3">
                  <Icon size={30} strokeWidth={1.5} className={a.text} />
                  <h3 className="whitespace-pre-line text-left text-sm font-semibold leading-snug text-white">
                    {r.title}
                  </h3>
                </div>

                <p className="mx-auto mt-4 max-w-[200px] text-xs leading-relaxed text-zinc-400">
                  {r.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
