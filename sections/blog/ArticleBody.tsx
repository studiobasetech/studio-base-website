import { Lightbulb, Quote, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import { headingId, type Post } from "@/data/blog";

/** Renders an article's blocks with the site's typography. */
export default function ArticleBody({ post }: { post: Post }) {
  // which paragraph gets the drop cap, and the number shown on each heading
  const firstP = post.body.findIndex((b) => b.type === "p");
  const sectionNo = post.body.map(
    (_, i) => post.body.slice(0, i + 1).filter((b) => b.type === "h2").length,
  );

  return (
    <div className="text-[17px] leading-[1.85] text-zinc-300">
      {post.body.map((b, i) => {
        switch (b.type) {
          case "p": {
            return i === firstP ? (
              <p
                key={i}
                className="mb-7 text-lg leading-[1.8] text-zinc-200 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-6xl first-letter:font-semibold first-letter:leading-[0.85] first-letter:text-yellow-400 md:text-xl"
              >
                {b.text}
              </p>
            ) : (
              <p key={i} className="mb-7">
                {b.text}
              </p>
            );
          }

          case "h2": {
            return (
              <Reveal key={i} y={24}>
                <h2
                  id={headingId(b.text)}
                  className="mb-6 mt-16 flex scroll-mt-28 items-baseline gap-4 text-2xl font-semibold leading-snug text-white md:text-3xl"
                >
                  <span className="font-mono text-sm font-normal text-yellow-400">
                    {String(sectionNo[i]).padStart(2, "0")}
                  </span>
                  {b.text}
                </h2>
              </Reveal>
            );
          }

          case "quote":
            return (
              <Reveal key={i} y={24}>
                <blockquote className="relative my-12 overflow-hidden rounded-xl border border-yellow-400/25 bg-gradient-to-br from-yellow-400/10 via-transparent to-yellow-400/[0.03] px-7 py-8 md:px-10">
                  <Quote size={40} className="absolute -right-1 -top-1 text-yellow-400/15" />
                  <p className="relative text-xl font-medium leading-relaxed text-white md:text-2xl">
                    {b.text}
                  </p>
                  <span className="mt-5 block h-px w-16 bg-yellow-400" />
                </blockquote>
              </Reveal>
            );

          case "list":
            return (
              <ul key={i} className="mb-8 space-y-4">
                {b.items.map((item, j) => {
                  // "Label: rest of sentence" → bold label
                  const k = item.indexOf(": ");
                  const label = k > 0 && k < 40 ? item.slice(0, k) : null;
                  const rest = label ? item.slice(k + 2) : item;
                  return (
                    <li key={j} className="flex gap-4">
                      <span className="mt-[11px] h-2 w-2 shrink-0 rotate-45 bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.7)]" />
                      <span>
                        {label && <strong className="font-semibold text-white">{label}: </strong>}
                        {rest}
                      </span>
                    </li>
                  );
                })}
              </ul>
            );

          case "callout":
            return (
              <Reveal key={i} y={24}>
                <aside className="my-10 flex gap-4 rounded-xl border border-white/15 bg-white/[0.04] p-6">
                  <Lightbulb size={22} className="mt-1 shrink-0 text-yellow-300" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-300">
                      {b.title}
                    </p>
                    <p className="mt-2 text-base leading-relaxed text-zinc-200">{b.text}</p>
                  </div>
                </aside>
              </Reveal>
            );
        }
      })}

      {/* key takeaways */}
      <Reveal y={30}>
        <section className="relative mt-16 overflow-hidden rounded-2xl border border-yellow-400/40 bg-[#0a0904] p-7 shadow-[0_0_60px_-25px_rgba(250,204,21,0.6)] md:p-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-yellow-400/15 blur-3xl" />
          <p className="relative flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-yellow-300">
            <Sparkles size={14} /> Key takeaways
          </p>
          <ol className="relative mt-6 space-y-4">
            {post.takeaways.map((t, j) => (
              <li key={j} className="flex gap-4 text-base leading-relaxed text-zinc-100">
                <span className="font-mono text-sm text-yellow-400">{String(j + 1).padStart(2, "0")}</span>
                {t}
              </li>
            ))}
          </ol>
        </section>
      </Reveal>
    </div>
  );
}
