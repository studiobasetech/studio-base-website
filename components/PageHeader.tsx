import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

/**
 * Top banner for inner pages (everything except Home).
 * The top padding leaves room for the fixed Navbar.
 *
 *   <PageHeader eyebrow="OUR WORK" title="Selected" accent="Projects." />
 *
 * For English/Spanish, pass <T en="..." es="..." /> (from @/lib/i18n) as any prop.
 */
export default function PageHeader({
  eyebrow,
  title,
  accent,
  description,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  accent?: ReactNode;
  description?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-36 lg:px-12 lg:pb-24 lg:pt-44">
      {/* Glow */}
      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />

      <Reveal className="relative mx-auto max-w-7xl">
        <p className="text-[10px] tracking-[0.45em] text-zinc-400">{eyebrow}</p>

        <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
          {title}
          {accent && (
            <>
              <br />
              <span className="text-blue-500">{accent}</span>
            </>
          )}
        </h1>

        {description && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400">
            {description}
          </p>
        )}
      </Reveal>
    </section>
  );
}
