"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Link2 } from "lucide-react";
import { headingId, type Post } from "@/data/blog";

/** Share buttons: copy link, LinkedIn, X. */
export function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = `https://studiobase.tech/blog/${slug}/`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available */
    }
  };

  const enc = encodeURIComponent;
  const btn =
    "flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-zinc-300 transition-colors hover:border-yellow-400 hover:text-yellow-300";

  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={copy} aria-label="Copy link" className={btn}>
        {copied ? <Check size={16} className="text-yellow-300" /> : <Link2 size={16} />}
      </button>
      <a
        aria-label="Share on LinkedIn"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`}
        className={btn}
      >
        <span className="text-sm font-semibold">in</span>
      </a>
      <a
        aria-label="Share on X"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`}
        className={btn}
      >
        <span className="text-sm">𝕏</span>
      </a>
      {copied && <span className="text-xs text-yellow-300">Link copied</span>}
    </div>
  );
}

/** Sticky sidebar: reading progress, table of contents, share. */
export default function ArticleAside({ post }: { post: Post }) {
  const headings = post.body.flatMap((b) => (b.type === "h2" ? [b.text] : []));
  const [active, setActive] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  // highlight the section currently being read
  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(headingId(h)))
      .filter((e): e is HTMLElement => !!e);

    const onScroll = () => {
      let current: string | null = null;
      for (const el of els) {
        if (el.getBoundingClientRect().top < 160) current = el.id;
      }
      setActive(current);

      const body = document.getElementById("article-body");
      if (body) {
        const r = body.getBoundingClientRect();
        const total = r.height - window.innerHeight * 0.6;
        setProgress(Math.min(1, Math.max(0, -r.top / Math.max(1, total))));
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.slug]);

  return (
    <div className="sticky top-28 space-y-8">
      {/* progress */}
      <div>
        <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
          <span>Reading</span>
          <span className="text-yellow-300">{Math.round(progress * 100)}%</span>
        </div>
        <div className="mt-2 h-px bg-white/10">
          <motion.div
            className="h-px bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.8)]"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      {/* contents */}
      <nav aria-label="Contents">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">In this article</p>
        <ol className="mt-4 space-y-1 border-l border-white/10">
          {headings.map((h, i) => {
            const id = headingId(h);
            const on = active === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`relative -ml-px flex gap-3 border-l py-1.5 pl-4 text-[13px] leading-snug transition-colors ${
                    on
                      ? "border-yellow-400 text-white"
                      : "border-transparent text-zinc-500 hover:text-zinc-200"
                  }`}
                >
                  <span className={`font-mono text-[11px] ${on ? "text-yellow-400" : "text-zinc-600"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {h}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      <div>
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Share</p>
        <ShareButtons title={post.title} slug={post.slug} />
      </div>
    </div>
  );
}
