"use client";

import { useEffect, useRef } from "react";

/**
 * Floating dots connected by lines that reach toward the mouse.
 * Place inside a `relative` element; it fills it.
 *
 *   <ParticleField />                       // yellow, like the Home hero
 *   <ParticleField color="168, 85, 247" />  // purple
 *   <ParticleField strength={1.8} />          // bolder, for busy backgrounds
 */
export default function ParticleField({
  color = "250, 204, 21",
  density = 1,
  strength = 1,
}: {
  /** "r, g, b" of the dots and lines */
  color?: string;
  /** 1 = same amount as the Home hero */
  density?: number;
  /** 1 = normal; higher = brighter dots and thicker lines */
  strength?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };

    let w = 0;
    let h = 0;
    let frame = 0;

    type Particle = { x: number; y: number; vx: number; vy: number; r: number };
    let particles: Particle[] = [];

    const build = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round((w < 768 ? 35 : 80) * density);

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: (Math.random() * 1.4 + 0.5) * (0.6 + 0.4 * strength),
      }));
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const LINK = 130;
    const MOUSE_LINK = 180;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const mdx = mouse.x - p.x;
        const mdy = mouse.y - p.y;
        const md = Math.hypot(mdx, mdy);

        if (md < MOUSE_LINK) {
          p.x += mdx * 0.004;
          p.y += mdy * 0.004;

          ctx.strokeStyle = `rgba(${color}, ${Math.min(1, (1 - md / MOUSE_LINK) * 0.5 * strength)})`;
          ctx.lineWidth = 0.8 * strength;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        ctx.fillStyle = `rgba(${color}, ${Math.min(1, 0.7 * strength)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);

          if (d < LINK) {
            ctx.strokeStyle = `rgba(${color}, ${Math.min(1, (1 - d / LINK) * 0.2 * strength)})`;
            ctx.lineWidth = 0.6 * Math.sqrt(strength);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      frame = requestAnimationFrame(draw);
    };

    build();
    draw();

    window.addEventListener("resize", build);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", build);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [color, density, strength]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
