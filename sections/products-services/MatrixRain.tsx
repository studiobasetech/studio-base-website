"use client";

import { useEffect, useRef } from "react";

/**
 * Matrix-style "code rain": streams of characters falling down the
 * screen, each with a bright leading character and a fading trail.
 * Gold to match the brand. Streams near the mouse light up.
 * Fills its `relative` parent. Pauses for people who prefer less motion.
 */

// Characters used in the streams: katakana, digits, hex and code symbols
const CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン" +
  "0123456789ABCDEF{}<>/=;:+*#$&[]()";

export default function MatrixRain({
  color = "250, 204, 21",
  fontSize = 15,
  opacity = 0.55,
}: {
  /** "r, g, b" of the characters */
  color?: string;
  fontSize?: number;
  /** overall strength of the effect, 0–1 */
  opacity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pick = () => CHARS[Math.floor(Math.random() * CHARS.length)];

    type Stream = {
      x: number;
      y: number; // head position, in rows
      speed: number; // rows per frame
      length: number; // trail length, in rows
      chars: string[];
      active: boolean;
      delay: number; // frames to wait before restarting
    };

    let w = 0;
    let h = 0;
    let rows = 0;
    let streams: Stream[] = [];
    let frame = 0;
    let tick = 0;
    const mouse = { x: -9999, y: -9999 };

    const newStream = (x: number, startAbove = true): Stream => {
      const length = 8 + Math.floor(Math.random() * 20);
      return {
        x,
        y: startAbove ? -Math.random() * rows : Math.random() * rows,
        speed: 0.18 + Math.random() * 0.35,
        length,
        chars: Array.from({ length: rows + length + 2 }, pick),
        active: Math.random() < 0.8, // leave gaps so it never looks like a wall
        delay: Math.floor(Math.random() * 120),
      };
    };

    const build = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";

      rows = Math.ceil(h / fontSize) + 1;
      const cols = Math.floor(w / (fontSize * 1.15));
      const gap = w / cols;
      streams = Array.from({ length: cols }, (_, i) => newStream(i * gap + gap / 2, false));
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const draw = () => {
      tick++;
      // ~30 fps is plenty for this effect and kinder to laptops/phones
      if (tick % 2 === 0) {
        ctx.clearRect(0, 0, w, h);

        for (const s of streams) {
          if (!s.active) {
            if (s.delay-- <= 0) Object.assign(s, newStream(s.x), { active: true });
            continue;
          }

          // brighter near the mouse
          const near = Math.max(0, 1 - Math.abs(mouse.x - s.x) / 140);
          const head = Math.floor(s.y);

          for (let k = 0; k < s.length; k++) {
            const row = head - k;
            if (row < 0 || row > rows) continue;
            const fade = 1 - k / s.length;
            const y = row * fontSize;

            if (k === 0) {
              // leading character: almost white, with a glow
              ctx.shadowColor = `rgba(${color}, 0.9)`;
              ctx.shadowBlur = 8;
              ctx.fillStyle = `rgba(255, 248, 220, ${Math.min(1, opacity * 1.6 + near * 0.4)})`;
            } else {
              ctx.shadowBlur = 0;
              ctx.fillStyle = `rgba(${color}, ${Math.min(1, fade ** 1.6 * (opacity + near * 0.5))})`;
            }
            ctx.fillText(s.chars[row % s.chars.length], s.x, y);
          }
          ctx.shadowBlur = 0;

          // characters flicker / change as they fall
          if (Math.random() < 0.3) {
            s.chars[Math.floor(Math.random() * s.chars.length)] = pick();
          }

          if (!reduceMotion) s.y += s.speed * 2;

          // finished: rest for a moment, then fall again
          if ((head - s.length) * fontSize > h) {
            s.active = false;
            s.delay = 20 + Math.floor(Math.random() * 160);
          }
        }
      }
      frame = requestAnimationFrame(draw);
    };

    build();
    frame = requestAnimationFrame(draw);
    window.addEventListener("resize", build);
    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", build);
      window.removeEventListener("mousemove", onMove);
    };
  }, [color, fontSize, opacity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
