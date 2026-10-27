"use client";

import Image from "next/image";
import Link from "@/components/LangLink";
import { ArrowUpRight, Clock } from "lucide-react";
import { TiltCard } from "@/components/Effects";
import { categoryLabel, formatDate, localizePost, readingTime, type Post } from "@/data/blog";
import { useLang } from "@/lib/i18n";

/*
 * Hover colours, the same set as the "End-to-End Technology Solutions"
 * cards on Home. Cards cycle through them in order.
 * (Class names are written out in full so Tailwind can find them.)
 */
const ACCENTS = [
  {
    rgb: "59,130,246",
    border: "border-blue-500/25 hover:border-blue-500",
    title: "group-hover:text-blue-500",
    chip: "border-blue-500/40 text-blue-400",
    arrow: "group-hover:border-blue-500 group-hover:bg-blue-500 group-hover:text-white",
    glow: "bg-blue-500/25",
  },
  {
    rgb: "168,85,247",
    border: "border-purple-500/25 hover:border-purple-500",
    title: "group-hover:text-purple-400",
    chip: "border-purple-400/40 text-purple-300",
    arrow: "group-hover:border-purple-500 group-hover:bg-purple-500 group-hover:text-white",
    glow: "bg-purple-500/25",
  },
  {
    rgb: "250,204,21",
    border: "border-yellow-400/25 hover:border-yellow-400",
    title: "group-hover:text-yellow-300",
    chip: "border-yellow-300/40 text-yellow-200",
    arrow: "group-hover:border-yellow-400 group-hover:bg-yellow-400 group-hover:text-black",
    glow: "bg-yellow-400/25",
  },
  {
    rgb: "34,211,238",
    border: "border-cyan-400/25 hover:border-cyan-400",
    title: "group-hover:text-cyan-400",
    chip: "border-cyan-400/40 text-cyan-300",
    arrow: "group-hover:border-cyan-400 group-hover:bg-cyan-400 group-hover:text-black",
    glow: "bg-cyan-400/25",
  },
  {
    rgb: "236,72,153",
    border: "border-pink-500/25 hover:border-pink-500",
    title: "group-hover:text-pink-400",
    chip: "border-pink-400/40 text-pink-300",
    arrow: "group-hover:border-pink-500 group-hover:bg-pink-500 group-hover:text-white",
    glow: "bg-pink-500/25",
  },
];

/** Article card used in the blog grid and in "Up next". */
export default function PostCard({ post: original, index = 0 }: { post: Post; index?: number }) {
  const { lang } = useLang();
  const post = localizePost(original, lang);
  const a = ACCENTS[index % ACCENTS.length];

  return (
    <TiltCard
      tilt={5}
      rgb={a.rgb}
      className={`group overflow-hidden rounded-xl border bg-[#07070a] transition-colors duration-500 ${a.border}`}
    >
      {/* corner glow that lights up on hover */}
      <div
        className={`pointer-events-none absolute -right-12 -top-12 z-[2] h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${a.glow}`}
      />

      <Link href={`/blog/${post.slug}`} className="relative z-10 flex h-full flex-col">
        {/* image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

          {/* number */}
          <span className="absolute left-4 top-4 rounded-full bg-black/40 px-2 py-0.5 font-mono text-[11px] tracking-[0.2em] text-white/80 backdrop-blur-sm">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* category */}
          <span
            className={`absolute bottom-3 left-4 rounded-full border bg-black/60 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] backdrop-blur-sm ${a.chip}`}
          >
            {categoryLabel(post.category, lang)}
          </span>
        </div>

        {/* text */}
        <div className="flex flex-1 flex-col p-5 md:p-6">
          <h3 className={`text-lg font-semibold leading-snug text-white transition-colors duration-300 ${a.title}`}>
            {post.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-400">{post.excerpt}</p>

          <div className="mt-auto flex items-center justify-between pt-6 text-xs text-zinc-400">
            <span className="flex items-center gap-3">
              <span>{formatDate(post.date, lang)}</span>
              <span className="h-1 w-1 rounded-full bg-zinc-600" />
              <span className="flex items-center gap-1">
                <Clock size={12} /> {readingTime(post)} min
              </span>
            </span>
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 group-hover:rotate-45 ${a.arrow}`}
            >
              <ArrowUpRight size={15} />
            </span>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}
