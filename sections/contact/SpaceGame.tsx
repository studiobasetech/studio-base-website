"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Gamepad2, Play, RotateCcw, Trophy } from "lucide-react";
import { LightSweep, ShimmerText } from "@/components/Effects";

/* ------------------------------------------------------------------ */
/*  ORBIT DEFENSE: a small arcade game drawn on a <canvas>.           */
/*  Move the ship with the mouse, a finger or the arrow keys; it      */
/*  fires on its own. Destroy asteroids, collect energy cores, and    */
/*  survive as the waves speed up.                                    */
/* ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as const;
const BLUE = "59,130,246";
const BEST_KEY = "sb-orbit-best";

type Asteroid = { x: number; y: number; r: number; vx: number; vy: number; rot: number; vr: number; hp: number; shape: number[] };
type Bullet = { x: number; y: number; vy: number; vx: number };
type Particle = { x: number; y: number; vx: number; vy: number; life: number; max: number; color: string; size: number };
type Pickup = { x: number; y: number; vy: number; kind: "core" | "triple"; t: number };
type Star = { x: number; y: number; z: number };

type Phase = "ready" | "playing" | "over";

const readBest = () => {
  try {
    return Number(window.localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
};
const saveBest = (v: number) => {
  try {
    window.localStorage.setItem(BEST_KEY, String(v));
  } catch {
    /* storage not available */
  }
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};

export default function SpaceGame() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<Phase>("ready");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  // everything the game loop needs lives in one mutable object
  const g = useRef({
    w: 800,
    h: 460,
    dpr: 1,
    phase: "ready" as Phase,
    ship: { x: 400, y: 400, tx: 400, vx: 0 },
    keys: { left: false, right: false },
    bullets: [] as Bullet[],
    asteroids: [] as Asteroid[],
    particles: [] as Particle[],
    pickups: [] as Pickup[],
    stars: [] as Star[],
    score: 0,
    lives: 3,
    time: 0,
    fireCd: 0,
    spawnCd: 0,
    pickupCd: 6,
    triple: 0,
    shield: 0,
    hurt: 0,
    shake: 0,
    visible: true,
    onOver: (() => {}) as (final: number) => void,
  });

  /* ---------- setup / resize ---------- */
  const resize = useCallback(() => {
    const c = canvasRef.current;
    const wrap = wrapRef.current;
    if (!c || !wrap) return;
    const s = g.current;
    s.dpr = Math.min(window.devicePixelRatio || 1, 2);
    s.w = wrap.clientWidth;
    s.h = wrap.clientHeight;
    c.width = Math.round(s.w * s.dpr);
    c.height = Math.round(s.h * s.dpr);
    s.ship.y = s.h - 60;
    if (s.stars.length === 0) {
      for (let i = 0; i < 140; i++) s.stars.push({ x: Math.random() * s.w, y: Math.random() * s.h, z: Math.random() });
    }
  }, []);

  const reset = useCallback(() => {
    const s = g.current;
    s.bullets = [];
    s.asteroids = [];
    s.particles = [];
    s.pickups = [];
    s.score = 0;
    s.lives = 3;
    s.time = 0;
    s.fireCd = 0;
    s.spawnCd = 0.6;
    s.pickupCd = 6;
    s.triple = 0;
    s.shield = 2;
    s.hurt = 0;
    s.ship.x = s.ship.tx = s.w / 2;
  }, []);

  const start = useCallback(() => {
    reset();
    g.current.phase = "playing";
    setScore(0);
    setPhase("playing");
    canvasRef.current?.focus();
  }, [reset]);

  /* ---------- main loop ---------- */
  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const s = g.current;
    s.onOver = (final: number) => {
      const prev = readBest();
      if (final > prev) saveBest(final);
      setBest(Math.max(prev, final));
      setScore(final);
      setPhase("over");
    };
    resize();
    setBestFromStorage();

    function setBestFromStorage() {
      // read in a callback so it never runs during render
      requestAnimationFrame(() => setBest(readBest()));
    }

    const ro = new ResizeObserver(resize);
    if (wrapRef.current) ro.observe(wrapRef.current);
    const io = new IntersectionObserver(([e]) => (s.visible = e.isIntersecting), { threshold: 0.1 });
    if (wrapRef.current) io.observe(wrapRef.current);

    const burst = (x: number, y: number, color: string, n: number, speed: number) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const v = speed * (0.3 + Math.random());
        const life = 0.4 + Math.random() * 0.6;
        s.particles.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life, max: life, color, size: 1 + Math.random() * 2.5 });
      }
    };

    const makeAsteroid = (x: number, y: number, r: number, speed: number): Asteroid => {
      const pts = 9 + Math.floor(Math.random() * 4);
      return {
        x,
        y,
        r,
        vx: (Math.random() - 0.5) * 40,
        vy: speed,
        rot: Math.random() * 6,
        vr: (Math.random() - 0.5) * 1.6,
        hp: Math.ceil(r / 14),
        shape: Array.from({ length: pts }, () => 0.72 + Math.random() * 0.36),
      };
    };

    let last = performance.now();
    let raf = 0;
    let scoreTick = 0;

    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      const dt = Math.min((now - last) / 1000, 0.033);
      last = now;
      if (!s.visible) return;
      const { w, h } = s;
      const playing = s.phase === "playing";

      /* ---- update ---- */
      // background stars always drift
      for (const st of s.stars) {
        st.y += (20 + st.z * 90) * dt * (playing ? 1.6 : 0.6);
        if (st.y > h) {
          st.y = -2;
          st.x = Math.random() * w;
        }
      }

      if (playing) {
        s.time += dt;
        const level = 1 + s.time / 20;

        // ship movement
        if (s.keys.left) s.ship.tx -= 520 * dt;
        if (s.keys.right) s.ship.tx += 520 * dt;
        s.ship.tx = Math.max(24, Math.min(w - 24, s.ship.tx));
        const prevX = s.ship.x;
        s.ship.x += (s.ship.tx - s.ship.x) * Math.min(1, dt * 12);
        s.ship.vx = (s.ship.x - prevX) / Math.max(dt, 0.001);

        // auto fire
        s.fireCd -= dt;
        if (s.fireCd <= 0) {
          s.fireCd = 0.16;
          s.bullets.push({ x: s.ship.x, y: s.ship.y - 18, vy: -620, vx: 0 });
          if (s.triple > 0) {
            s.bullets.push({ x: s.ship.x - 8, y: s.ship.y - 12, vy: -600, vx: -110 });
            s.bullets.push({ x: s.ship.x + 8, y: s.ship.y - 12, vy: -600, vx: 110 });
          }
        }
        s.triple = Math.max(0, s.triple - dt);
        s.shield = Math.max(0, s.shield - dt);
        s.hurt = Math.max(0, s.hurt - dt);

        // spawn asteroids
        s.spawnCd -= dt;
        if (s.spawnCd <= 0) {
          s.spawnCd = Math.max(0.28, 1.1 / level) * (0.6 + Math.random() * 0.8);
          const r = 14 + Math.random() * 26;
          s.asteroids.push(makeAsteroid(r + Math.random() * (w - 2 * r), -r, r, 70 + Math.random() * 60 * level + 25 * level));
        }

        // spawn pickups
        s.pickupCd -= dt;
        if (s.pickupCd <= 0) {
          s.pickupCd = 7 + Math.random() * 6;
          s.pickups.push({ x: 30 + Math.random() * (w - 60), y: -20, vy: 110, kind: Math.random() < 0.6 ? "core" : "triple", t: 0 });
        }

        // bullets
        for (const b of s.bullets) {
          b.y += b.vy * dt;
          b.x += b.vx * dt;
        }
        s.bullets = s.bullets.filter((b) => b.y > -20 && b.x > -20 && b.x < w + 20);

        // asteroids
        for (const a of s.asteroids) {
          a.x += a.vx * dt;
          a.y += a.vy * dt;
          a.rot += a.vr * dt;
          if (a.x < a.r || a.x > w - a.r) a.vx *= -1;
        }

        // bullet hits
        const born: Asteroid[] = [];
        for (const a of s.asteroids) {
          for (const b of s.bullets) {
            if (b.y < -10) continue;
            if (a.hp > 0 && (b.x - a.x) ** 2 + (b.y - a.y) ** 2 < a.r * a.r) {
              burst(b.x, b.y, `rgba(${BLUE},1)`, 3, 80);
              b.y = -999;
              a.hp -= 1;
              if (a.hp <= 0) {
                s.score += Math.round(60 - a.r);
                burst(a.x, a.y, "rgba(147,197,253,1)", 18, 160);
                burst(a.x, a.y, "rgba(255,255,255,1)", 8, 90);
                s.shake = Math.min(8, s.shake + a.r / 10);
                if (a.r > 26) {
                  born.push(makeAsteroid(a.x - 8, a.y, a.r * 0.55, a.vy * 1.1));
                  born.push(makeAsteroid(a.x + 8, a.y, a.r * 0.55, a.vy * 1.1));
                }
              }
            }
          }
        }
        s.asteroids = s.asteroids.filter((a) => a.hp > 0 && a.y < h + a.r + 10).concat(born);

        // pickups
        for (const p of s.pickups) {
          p.y += p.vy * dt;
          p.t += dt;
          if ((p.x - s.ship.x) ** 2 + (p.y - s.ship.y) ** 2 < 30 * 30) {
            burst(p.x, p.y, p.kind === "core" ? "rgba(250,204,21,1)" : "rgba(168,85,247,1)", 20, 140);
            p.y = h + 999;
            if (p.kind === "core") {
              s.score += 150;
              s.shield = 3;
            } else {
              s.triple = 8;
            }
          }
        }
        s.pickups = s.pickups.filter((p) => p.y < h + 30);

        // ship collisions
        if (s.shield <= 0 && s.hurt <= 0) {
          for (const a of s.asteroids) {
            if ((a.x - s.ship.x) ** 2 + (a.y - s.ship.y) ** 2 < (a.r + 12) ** 2) {
              a.hp = 0;
              s.lives -= 1;
              s.hurt = 1.6;
              s.shake = 12;
              burst(s.ship.x, s.ship.y, "rgba(236,72,153,1)", 30, 200);
              if (s.lives <= 0) {
                s.phase = "over";
                burst(s.ship.x, s.ship.y, "rgba(255,255,255,1)", 60, 260);
                s.onOver(Math.floor(s.score));
              }
              break;
            }
          }
          s.asteroids = s.asteroids.filter((a) => a.hp > 0);
        }

        s.score += dt * 5;
        scoreTick += dt;
        if (scoreTick > 0.25) {
          scoreTick = 0;
          setScore(Math.floor(s.score));
        }
      }

      for (const p of s.particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.life -= dt;
      }
      s.particles = s.particles.filter((p) => p.life > 0);
      s.shake = Math.max(0, s.shake - dt * 30);

      /* ---- draw ---- */
      ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const sx = (Math.random() - 0.5) * s.shake;
      const sy = (Math.random() - 0.5) * s.shake;
      ctx.save();
      ctx.translate(sx, sy);

      // stars
      for (const st of s.stars) {
        ctx.fillStyle = `rgba(${st.z > 0.7 ? "191,219,254" : "255,255,255"},${0.25 + st.z * 0.6})`;
        const len = playing ? 1 + st.z * 5 : 1;
        ctx.fillRect(st.x, st.y, 1 + st.z, len + st.z);
      }

      // pickups
      for (const p of s.pickups) {
        const col = p.kind === "core" ? "250,204,21" : "168,85,247";
        const pulse = 1 + Math.sin(p.t * 6) * 0.15;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.t * 1.5);
        ctx.shadowColor = `rgba(${col},1)`;
        ctx.shadowBlur = 18;
        ctx.strokeStyle = `rgba(${col},1)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2;
          ctx.lineTo(Math.cos(a) * 10 * pulse, Math.sin(a) * 10 * pulse);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = `rgba(${col},0.35)`;
        ctx.fill();
        ctx.restore();
      }

      // asteroids
      for (const a of s.asteroids) {
        ctx.save();
        ctx.translate(a.x, a.y);
        ctx.rotate(a.rot);
        ctx.beginPath();
        a.shape.forEach((k, i) => {
          const ang = (i / a.shape.length) * Math.PI * 2;
          ctx.lineTo(Math.cos(ang) * a.r * k, Math.sin(ang) * a.r * k);
        });
        ctx.closePath();
        const grad = ctx.createRadialGradient(-a.r * 0.3, -a.r * 0.3, 2, 0, 0, a.r);
        grad.addColorStop(0, "#3a4357");
        grad.addColorStop(1, "#11151f");
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = `rgba(${BLUE},0.55)`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
      }

      // bullets
      ctx.shadowColor = `rgba(${BLUE},1)`;
      ctx.shadowBlur = 12;
      ctx.fillStyle = "#bfdbfe";
      for (const b of s.bullets) ctx.fillRect(b.x - 1.5, b.y - 7, 3, 12);
      ctx.shadowBlur = 0;

      // ship
      if (s.phase !== "over" && !(s.hurt > 0 && Math.floor(s.hurt * 12) % 2 === 0)) {
        const { x, y, vx } = s.ship;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.max(-0.35, Math.min(0.35, vx / 1600)));
        // thruster flame
        const fl = 10 + Math.random() * 8;
        const fg = ctx.createLinearGradient(0, 10, 0, 10 + fl);
        fg.addColorStop(0, "rgba(147,197,253,0.95)");
        fg.addColorStop(1, "rgba(59,130,246,0)");
        ctx.fillStyle = fg;
        ctx.beginPath();
        ctx.moveTo(-6, 10);
        ctx.lineTo(0, 12 + fl);
        ctx.lineTo(6, 10);
        ctx.fill();
        // hull
        ctx.shadowColor = `rgba(${BLUE},1)`;
        ctx.shadowBlur = 20;
        ctx.fillStyle = "#e0ecff";
        ctx.beginPath();
        ctx.moveTo(0, -20);
        ctx.lineTo(14, 12);
        ctx.lineTo(0, 6);
        ctx.lineTo(-14, 12);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(${BLUE},1)`;
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.lineTo(5, 4);
        ctx.lineTo(-5, 4);
        ctx.closePath();
        ctx.fill();
        // shield bubble
        if (s.shield > 0) {
          ctx.strokeStyle = `rgba(250,204,21,${0.35 + 0.35 * Math.sin(s.time * 10)})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(0, -2, 26, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }

      // particles
      for (const p of s.particles) {
        ctx.globalAlpha = Math.max(0, p.life / p.max);
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }
      ctx.globalAlpha = 1;
      ctx.restore();

      // HUD
      if (playing) {
        ctx.font = "600 13px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.fillStyle = "rgba(191,219,254,0.9)";
        ctx.textAlign = "left";
        ctx.fillText(`SCORE ${String(Math.floor(s.score)).padStart(5, "0")}`, 16, 26);
        ctx.textAlign = "right";
        ctx.fillText(`LVL ${Math.floor(1 + s.time / 20)}`, w - 16, 26);
        for (let i = 0; i < 3; i++) {
          ctx.fillStyle = i < s.lives ? "rgba(59,130,246,1)" : "rgba(255,255,255,0.15)";
          ctx.beginPath();
          const lx = w - 20 - i * 18;
          ctx.moveTo(lx, 36);
          ctx.lineTo(lx + 6, 48);
          ctx.lineTo(lx - 6, 48);
          ctx.closePath();
          ctx.fill();
        }
        if (s.triple > 0) {
          ctx.textAlign = "left";
          ctx.fillStyle = "rgba(196,181,253,0.95)";
          ctx.fillText(`TRIPLE SHOT ${s.triple.toFixed(1)}s`, 16, 46);
        }
      }
    };
    raf = requestAnimationFrame(step);

    // keyboard (only while the game is being played)
    const key = (down: boolean) => (e: KeyboardEvent) => {
      if (s.phase !== "playing") return;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        s.keys.left = down;
        e.preventDefault();
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        s.keys.right = down;
        e.preventDefault();
      }
    };
    const kd = key(true);
    const ku = key(false);
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("keydown", kd);
      window.removeEventListener("keyup", ku);
    };
  }, [resize]);

  // pointer / touch steering
  const onPointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    g.current.ship.tx = e.clientX - r.left;
  };

  return (
    <section className="relative overflow-hidden bg-black px-6 py-16 lg:px-12">
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-0 top-10 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-center">
        {/* TEXT */}
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p variants={fadeUp} className="flex items-center gap-3 text-[10px] tracking-[0.45em] text-zinc-400">
            <span className="h-px w-8 bg-blue-500" />
            MISSION CONTROL
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-medium leading-tight text-white md:text-5xl">
            Take a Break.
            <br />
            <ShimmerText>Defend the Orbit.</ShimmerText>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 max-w-md text-sm leading-relaxed text-zinc-400 md:text-base">
            A small game built by our team, right here in your browser. Steer
            your ship, clear the asteroid field and collect energy cores.
            The kind of interactive experience we bring to every digital
            product.
          </motion.p>
          <motion.ul variants={fadeUp} className="mt-6 space-y-2 text-xs text-zinc-400">
            <li className="flex items-center gap-3">
              <span className="rounded border border-white/15 px-2 py-0.5 font-mono text-[10px] text-blue-300">MOUSE / TOUCH</span>
              or
              <span className="rounded border border-white/15 px-2 py-0.5 font-mono text-[10px] text-blue-300">← →</span>
              to steer · firing is automatic
            </li>
            <li className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rotate-45 bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.9)]" /> Energy core: +150 and a shield
            </li>
            <li className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rotate-45 bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.9)]" /> Triple shot for 8 seconds
            </li>
          </motion.ul>
          {best > 0 && (
            <motion.p variants={fadeUp} className="mt-6 flex items-center gap-2 text-xs text-zinc-300">
              <Trophy size={14} className="text-yellow-300" /> Your best: <span className="font-semibold text-white">{best}</span>
            </motion.p>
          )}
        </motion.div>

        {/* GAME */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.97, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className="relative overflow-hidden rounded-2xl border border-blue-500/50 bg-[#03050b] shadow-[0_0_80px_-20px_rgba(59,130,246,0.6)]"
        >
          {/* top bar */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
            <span className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.3em] text-zinc-400">
              <Gamepad2 size={14} className="text-blue-400" /> ORBIT DEFENSE
            </span>
            <span className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] text-zinc-500">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                className={`h-1.5 w-1.5 rounded-full ${phase === "playing" ? "bg-green-400" : "bg-blue-400"}`}
              />
              {phase === "playing" ? "LIVE" : "STANDBY"}
            </span>
          </div>

          <div ref={wrapRef} className="relative h-[420px] w-full sm:h-[460px]">
            <canvas
              ref={canvasRef}
              tabIndex={0}
              aria-label="Orbit Defense game"
              onPointerMove={onPointer}
              onPointerDown={onPointer}
              className={`absolute inset-0 h-full w-full outline-none ${phase === "playing" ? "cursor-crosshair touch-none" : ""}`}
            />

            {/* overlays */}
            {phase !== "playing" && (
              <motion.div
                key={phase}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/55 px-6 text-center backdrop-blur-[2px]"
              >
                {phase === "ready" ? (
                  <>
                    <p className="text-[10px] tracking-[0.45em] text-blue-300">READY FOR LAUNCH</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white md:text-3xl">Orbit Defense</h3>
                    <p className="mt-2 max-w-xs text-sm text-zinc-400">Survive the asteroid field as long as you can.</p>
                  </>
                ) : (
                  <>
                    <p className="text-[10px] tracking-[0.45em] text-pink-300">MISSION COMPLETE</p>
                    <h3 className="mt-3 text-4xl font-semibold text-white md:text-5xl">{score}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.25em] text-zinc-400">
                      points {score >= best && score > 0 ? "· new best!" : `· best ${best}`}
                    </p>
                    <a
                      href="#contact-form"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 underline-offset-4 hover:underline"
                    >
                      Like what you see? Let&apos;s build your project
                      <ArrowRight size={14} />
                    </a>
                  </>
                )}
                <motion.button
                  type="button"
                  onClick={start}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ boxShadow: ["0 0 0 0 rgba(59,130,246,0.5)", "0 0 0 18px rgba(59,130,246,0)"] }}
                  transition={{ boxShadow: { duration: 1.8, repeat: Infinity, ease: "easeOut" } }}
                  className="group relative mt-6 inline-flex items-center gap-2 overflow-hidden rounded-full bg-blue-500 px-8 py-3 text-sm font-semibold text-white hover:bg-blue-400"
                >
                  <LightSweep />
                  {phase === "ready" ? <Play size={16} className="relative" /> : <RotateCcw size={16} className="relative" />}
                  <span className="relative">{phase === "ready" ? "Start Mission" : "Play Again"}</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
