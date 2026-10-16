"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { TiltCard } from "@/components/Effects";
import { formatDate, readingTime, type Post } from "@/data/blog";

/** Article card used in the blog grid and in "Up next". */
export default function PostCard({ post, index = 0 }: { post: Post; index?: number }) {
  return (
    <TiltCard
      tilt={5}
      className="group overflow-hidden rounded-xl border border-white/10 bg-[#07070a] transition-colors duration-500 hover:border-yellow-400/50"
    >
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
          <span className="absolute left-4 top-4 font-mono text-[11px] tracking-[0.2em] text-white/60">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* category */}
          <span className="absolute bottom-3 left-4 rounded-full border border-yellow-400/40 bg-black/60 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-yellow-300 backdrop-blur-sm">
            {post.category}
          </span>
        </div>

        {/* text */}
        <div className="flex flex-1 flex-col p-5 md:p-6">
          <h3 className="text-lg font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-yellow-300">
            {post.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-400">
            {post.excerpt}
          </p>

          <div className="mt-auto flex items-center justify-between pt-6 text-xs text-zinc-500">
            <span className="flex items-center gap-3">
              <span>{formatDate(post.date)}</span>
              <span className="h-1 w-1 rounded-full bg-zinc-600" />
              <span className="flex items-center gap-1">
                <Clock size={12} /> {readingTime(post)} min
              </span>
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 group-hover:rotate-45 group-hover:border-yellow-400 group-hover:bg-yellow-400 group-hover:text-black">
              <ArrowUpRight size={15} />
            </span>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}
