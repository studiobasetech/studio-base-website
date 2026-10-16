"use client";

import { useEffect, useRef } from "react";

/**
 * Deep-space starfield drawn on a canvas.
 * - three layers of stars at different depths
 * - stars twinkle and drift slowly
 * - layers shift with the mouse (closer stars move more) for a 3D feel
 * - shooting stars cross every few seconds
 * Fills its `relative` parent.
 *
 *   <StarField />                        // a shooting star every 4–9 s
 *   <StarField meteorEvery={[1200, 3000]} />  // more often
 */
export default function StarField({
  meteorEvery = [4000, 9000],
  density = 1,
  goldOnly = false,
}: {
  /** min and max milliseconds between shooting stars */
  meteorEvery?: [number, number];
  /** 1 = default amount of stars; lower for fewer */
  density?: number;
  /** only white and light-blue stars (no lavender tints) */
  goldOnly?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [minGap, maxGap] = meteorEvery;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Star = {
      x: number;
      y: number;
      r: number;
      depth: number; // 0.2 (far) .. 1 (near)
      phase: number;
      speed: number;
      color: string;
    };

    type Meteor = { x: number; y: number; vx: number; vy: number; life: number };

    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let meteor: Meteor | null = null;
    let nextMeteor = performance.now() + Math.min(2500, minGap);
    let frame = 0;

    // mouse offset, eased
    const target = { x: 0, y: 0 };
    const offset = { x: 0, y: 0 };

    const palette = goldOnly
      ? ["255,255,255", "255,255,255", "255,255,255", "147,197,253", "59,130,246"]
      : [
          "255,255,255",
          "255,255,255",
          "255,255,255",
          "147,197,253", // light blue
          "196,181,253", // lavender
          "165,180,252", // ice blue
        ];

    const build = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(((w * h) / 2600) * density);
      stars = Array.from({ length: count }, () => {
        const depth = [0.2, 0.5, 1][Math.floor(Math.random() * 3)];
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: (Math.random() * 0.8 + 0.3) * (depth === 1 ? 1.6 : depth === 0.5 ? 1.1 : 0.8),
          depth,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 1.5 + 0.5,
          color: palette[Math.floor(Math.random() * palette.length)],
        };
      });
    };

    const onMove = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      offset.x += (target.x - offset.x) * 0.04;
      offset.y += (target.y - offset.y) * 0.04;

      for (const s of stars) {
        // slow drift to the left, faster for nearer stars
        if (!reduceMotion) {
          s.x -= 0.03 * s.depth;
          if (s.x < -5) s.x = w + 5;
        }

        const px = s.x - offset.x * 18 * s.depth;
        const py = s.y - offset.y * 12 * s.depth;
        const twinkle = reduceMotion ? 1 : 0.55 + 0.45 * Math.sin(t / 1000 * s.speed + s.phase);
        const alpha = (0.35 + 0.65 * s.depth) * twinkle;

        ctx.fillStyle = `rgba(${s.color},${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fill();

        // little cross-shaped glint on the brightest near stars
        if (s.depth === 1 && s.r > 1.3 && twinkle > 0.9) {
          ctx.strokeStyle = `rgba(${s.color},${(twinkle - 0.9) * 4})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(px - s.r * 4, py);
          ctx.lineTo(px + s.r * 4, py);
          ctx.moveTo(px, py - s.r * 4);
          ctx.lineTo(px, py + s.r * 4);
          ctx.stroke();
        }
      }

      // shooting star
      if (!reduceMotion) {
        if (!meteor && t > nextMeteor) {
          meteor = {
            x: Math.random() * w * 0.7 + w * 0.2,
            y: Math.random() * h * 0.3,
            vx: -(6 + Math.random() * 4),
            vy: 2.5 + Math.random() * 2,
            life: 1,
          };
        }
        if (meteor) {
          const m = meteor;
          const tail = 14;
          const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * tail, m.y - m.vy * tail);
          grad.addColorStop(0, `rgba(224,236,255,${m.life})`);
          grad.addColorStop(1, "rgba(59,130,246,0)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(m.x - m.vx * tail, m.y - m.vy * tail);
          ctx.stroke();

          m.x += m.vx;
          m.y += m.vy;
          m.life -= 0.012;
          if (m.life <= 0 || m.x < -100 || m.y > h + 100) {
            meteor = null;
            nextMeteor = t + minGap + Math.random() * (maxGap - minGap);
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
  }, [minGap, maxGap, density, goldOnly]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
