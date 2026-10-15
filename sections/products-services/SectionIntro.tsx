import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

/**
 * Section heading used on the Products & Services page:
 * eyebrow + title on the left, short paragraph on the right.
 */
export default function SectionIntro({
  eyebrow,
  title,
  side,
}: {
  eyebrow: string;
  title: ReactNode;
  side?: ReactNode;
}) {
  return (
    <Reveal className="mb-10 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16">
      <div>
        <p className="text-[10px] tracking-[0.45em] text-zinc-400">{eyebrow}</p>
        <h2 className="mt-4 text-2xl font-medium leading-tight text-white md:text-4xl">
          {title}
        </h2>
      </div>

      {side && (
        <div className="space-y-4 text-sm leading-relaxed text-zinc-400">
          {side}
        </div>
      )}
    </Reveal>
  );
}
