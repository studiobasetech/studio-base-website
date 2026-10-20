"use client";

import { useEffect, useRef } from "react";
import { Rocket } from "lucide-react";

/**
 * Replaces the normal mouse pointer with a blue rocket.
 * - It points in the direction you are moving the mouse
 * - A flame grows behind it the faster you move
 * - It grows over links/buttons and shrinks when you click
 * - Touch devices keep their normal behavior (no custom cursor)
 */
export default function CustomCursor() {
  const outer = useRef<HTMLDivElement>(null);
  const scaler = useRef<HTMLDivElement>(null);
  const rotator = useRef<HTMLDivElement>(null);
  const flame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only use the custom cursor on devices with a real mouse
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const o = outer.current;
    const s = scaler.current;
    const r = rotator.current;
    const f = flame.current;
    if (!o || !s || !r || !f) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const HALF = 22; // half of the 44px rocket, to center it on the pointer
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    let angle = 45; // starts pointing up-right
    let speed = 0;
    let started = false;
    let hovering = false;
    let pressed = false;
    let frame = 0;

    const applyScale = () => {
      s.style.transform = `scale(${pressed ? 0.8 : hovering ? 1.35 : 1})`;
    };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;

      if (!started) {
        current.x = target.x;
        current.y = target.y;
        started = true;
        o.style.opacity = "1";
      }
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element | null;

      hovering = !!el?.closest("a, button, [role='button'], [data-cursor]");

      // Hide the rocket over text fields so people can see where they type
      const isTextField = !!el?.closest("input, textarea, select");
      o.style.opacity = isTextField || !started ? "0" : "1";

      applyScale();
    };

    const onDown = () => {
      pressed = true;
      applyScale();
    };

    const onUp = () => {
      pressed = false;
      applyScale();
    };

    const onLeave = () => {
      o.style.opacity = "0";
    };

    const onEnter = () => {
      if (started) o.style.opacity = "1";
    };

    const tick = (time: number) => {
      const dx = target.x - current.x;
      const dy = target.y - current.y;

      // Smooth follow
      current.x += dx * 0.22;
      current.y += dy * 0.22;

      // Speed from 0 (still) to 1 (fast)
      const distance = Math.hypot(dx, dy);
      speed += (Math.min(distance / 40, 1) - speed) * 0.15;

      // Turn toward the direction of travel (smoothly, no spinning jumps)
      if (distance > 1.5) {
        const wanted = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
        const diff = ((((wanted - angle) % 360) + 540) % 360) - 180;
        angle += diff * 0.18;
      }

      o.style.transform = `translate3d(${current.x - HALF}px, ${
        current.y - HALF
      }px, 0)`;
      r.style.transform = `rotate(${angle}deg)`;

      // Flame: grows and flickers with speed
      const flicker = 1 + Math.sin(time / 60) * 0.18;
      f.style.transform = `translateX(-50%) scaleY(${(0.5 + speed * 1.6) * flicker})`;
      f.style.opacity = String(0.35 + speed * 0.65);

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    root.addEventListener("mouseleave", onLeave);
    root.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(frame);
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      root.removeEventListener("mouseleave", onLeave);
      root.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <div
      ref={outer}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-11 w-11 opacity-0 transition-opacity duration-200"
    >
      <div
        ref={scaler}
        className="h-full w-full transition-transform duration-200"
      >
        <div ref={rotator} className="relative h-full w-full">
          {/* Flame (sits behind the rocket) */}
          <div
            ref={flame}
            className="absolute left-1/2 top-full h-9 w-3 origin-top rounded-full bg-gradient-to-b from-blue-300 via-cyan-400 to-transparent blur-[1px]"
          />

          {/* Rocket (the icon points up-right, so it is turned to point up) */}
          <Rocket
            size={50}
            strokeWidth={2}
            className="-rotate-45 text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.9)]"
          />
        </div>
      </div>
    </div>
  );
}