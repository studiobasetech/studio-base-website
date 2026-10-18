"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/lib/i18n";

// Edit this list to match the tools you actually work with.
const technologies = [
  "OpenAI",
  "React",
  "AWS",
  "Anthropic",
  "Next.js",
  "Google Cloud",
  "Google Gemini",
  "Node.js",
  "Microsoft Azure",
  "LangChain",
  "TypeScript",
  "Vercel",
  "ElevenLabs",
  "Python",
  "Cloudflare",
  "PostgreSQL",
  "Docker",
  "Supabase",
  "Kubernetes",
  "Firebase",
  "n8n",
  "React Native",
  "Zapier",
  "Flutter",
  "Twilio",
  "Shopify",
  "HubSpot",
  "WordPress",
  "Stripe",
  "Figma",
];

const SPEED = 40; // pixels per second (higher = faster)
const ARROW_STEP = 320; // pixels moved per arrow click

export default function Technologies() {
  const { tr } = useLang();
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0); // current scroll position in px
  const pending = useRef(0); // distance still to travel after an arrow click

  useEffect(() => {
    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const track = trackRef.current;

      if (track) {
        const dt = Math.min((now - last) / 1000, 0.05);
        const half = track.scrollWidth / 2; // width of one full copy

        // 1) automatic movement
        offset.current += SPEED * dt;

        // 2) smooth movement after pressing an arrow
        if (Math.abs(pending.current) > 0.5) {
          const step = pending.current * 0.12;
          offset.current += step;
          pending.current -= step;
        }

        // 3) keep the loop seamless in both directions
        if (half > 0) {
          offset.current = ((offset.current % half) + half) % half;
        }

        track.style.transform = `translate3d(${-offset.current}px, 0, 0)`;
      }

      last = now;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, []);

  const move = (direction: 1 | -1) => {
    pending.current += direction * ARROW_STEP;
  };

  return (
    <section className="bg-black px-6 py-10 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* TITLE */}

        <p className="mb-8 text-xs tracking-[0.4em] text-zinc-400">
          {tr("TRUSTED TECHNOLOGIES", "TECNOLOGÍAS DE CONFIANZA")}
        </p>

        {/* CAROUSEL */}

        <div className="relative border-y border-white/10 py-8">
          {/* Left arrow */}

          <div className="absolute inset-y-0 left-0 z-10 flex items-center bg-gradient-to-r from-black via-black/90 to-transparent pr-10">
            <button
              type="button"
              aria-label={tr("Previous technologies", "Tecnologías anteriores")}
              onClick={() => move(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black text-zinc-300 transition hover:border-white/40 hover:text-white"
            >
              <ChevronLeft size={18} />
            </button>
          </div>

          {/* Moving track */}

          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex w-max pointer-events-none select-none will-change-transform"
            >
              {[0, 1].map((copy) => (
                <ul
                  key={copy}
                  aria-hidden={copy === 1}
                  className="flex shrink-0 items-center gap-x-14 pr-14"
                >
                  {technologies.map((tech) => (
                    <li
                      key={`${copy}-${tech}`}
                      className="select-none whitespace-nowrap text-sm font-semibold text-zinc-300"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          {/* Right arrow */}

          <div className="absolute inset-y-0 right-0 z-10 flex items-center bg-gradient-to-l from-black via-black/90 to-transparent pl-10">
            <button
              type="button"
              aria-label={tr("Next technologies", "Siguientes tecnologías")}
              onClick={() => move(1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black text-zinc-300 transition hover:border-white/40 hover:text-white"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
