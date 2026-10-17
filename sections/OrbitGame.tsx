"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Cpu, Gauge, Play, RotateCcw, Shield, Trophy, Zap } from "lucide-react";
import { LightSweep, ShimmerText } from "@/components/Effects";
import { consultationHref } from "@/data/site";

/* ------------------------------------------------------------------ */
/*  ORBIT DEFENSE — a small arcade game drawn on a <canvas>.           */
/*  Steer with the mouse, a finger or the arrow keys; the ship fires  */
/*  on its own. Chain kills for a score multiplier, grab energy cores */
/*  (shield) and plasma cells (triple shot), survive the waves.       */
/* ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as const;
const BEST_KEY = "sb-orbit-best";

type Asteroid = {
  x: number; y: number; r: number; vx: number; vy: number; rot: number; vr: number;
  hp: number; flash: number; shape: number[]; craters: [number, number, number][];
};
type Bullet = { x: number; y: number; vx: number; vy: number };
type Particle = { x: number; y: number; vx: number; vy: number; life: number; max: number; color: string; size: number };
type Ring = { x: number; y: number; r: number; max: number; life: number; color: string };
type Popup = { x: number; y: number; text: string; life: number; color: string };
type Pickup = { x: number; y: number; vy: number; kind: "core" | "plasma"; t: number };
type Star = { x: number; y: number; z: number };
type Phase = "ready" | "countdown" | "playing" | "over";
type Hud = { score: number; lives: number; level: number; mult: number; shield: boolean; triple: number };

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

/* HUD corner bracket */
function Corner({ className }: { className: string }) {
  return <span className={`pointer-events-none absolute h-6 w-6 border-blue-400/80 ${className}`} />;
}

export default function OrbitGame() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<Phase>("ready");
  const [hud, setHud] = useState<Hud>({ score: 0, lives: 3, level: 1, mult: 1, shield: false, triple: 0 });
  const [best, setBest] = useState(0);
  const [final, setFinal] = useState(0);

  const g = useRef({
    w: 960, h: 540, dpr: 1,
    phase: "ready" as Phase,
    ship: { x: 480, y: 480, tx: 480, vx: 0 },
    keys: { left: false, right: false },
    bullets: [] as Bullet[],
    asteroids: [] as Asteroid[],
    particles: [] as Particle[],
    rings: [] as Ring[],
    popups: [] as Popup[],
    pickups: [] as Pickup[],
    stars: [] as Star[],
    trail: [] as { x: number; y: number }[],
    bg: null as HTMLCanvasElement | null,
    score: 0, lives: 3, time: 0, count: 0,
    fireCd: 0, spawnCd: 0, pickupCd: 6,
    triple: 0, shield: 0, hurt: 0, shake: 0, flash: 0,
    mult: 1, comboT: 0, gridOff: 0,
    visible: true,
    onOver: (() => {}) as (score: number) => void,
    onHud: (() => {}) as () => void,
    onPhase: (() => {}) as (p: Phase) => void,
  });

  /* ---------- background painted once per resize ---------- */
  const paintBg = useCallback(() => {
    const s = g.current;
    const bg = document.createElement("canvas");
    bg.width = Math.round(s.w * s.dpr);
    bg.height = Math.round(s.h * s.dpr);
    const c = bg.getContext("2d");
    if (!c) return;
    c.scale(s.dpr, s.dpr);
    const base = c.createLinearGradient(0, 0, 0, s.h);
    base.addColorStop(0, "#02040b");
    base.addColorStop(0.6, "#050b1d");
    base.addColorStop(1, "#08142f");
    c.fillStyle = base;
    c.fillRect(0, 0, s.w, s.h);
    const neb = (x: number, y: number, r: number, col: string) => {
      const n = c.createRadialGradient(x, y, 0, x, y, r);
      n.addColorStop(0, col);
      n.addColorStop(1, "rgba(0,0,0,0)");
      c.fillStyle = n;
      c.fillRect(0, 0, s.w, s.h);
    };
    neb(s.w * 0.78, s.h * 0.22, s.w * 0.45, "rgba(59,130,246,0.22)");
    neb(s.w * 0.15, s.h * 0.35, s.w * 0.35, "rgba(99,102,241,0.12)");
    neb(s.w * 0.5, s.h * 1.05, s.w * 0.6, "rgba(56,189,248,0.16)");
    // tiny static dust stars
    for (let i = 0; i < 260; i++) {
      c.fillStyle = `rgba(200,220,255,${Math.random() * 0.35})`;
      c.fillRect(Math.random() * s.w, Math.random() * s.h, 1, 1);
    }
    s.bg = bg;
  }, []);

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
    s.ship.y = s.h - 70;
    if (s.phase !== "playing") s.ship.x = s.ship.tx = s.w / 2;
    if (s.stars.length === 0) {
      for (let i = 0; i < 180; i++) s.stars.push({ x: Math.random() * s.w, y: Math.random() * s.h, z: Math.random() });
    }
    paintBg();
  }, [paintBg]);

  const start = useCallback(() => {
    const s = g.current;
    Object.assign(s, {
      bullets: [], asteroids: [], particles: [], rings: [], popups: [], pickups: [], trail: [],
      score: 0, lives: 3, time: 0, count: 3.2, fireCd: 0, spawnCd: 0.8, pickupCd: 6,
      triple: 0, shield: 2.5, hurt: 0, mult: 1, comboT: 0, phase: "countdown" as Phase,
    });
    s.ship.x = s.ship.tx = s.w / 2;
    setPhase("countdown");
    setHud({ score: 0, lives: 3, level: 1, mult: 1, shield: true, triple: 0 });
    canvasRef.current?.focus({ preventScroll: true });
  }, []);

  /* ---------- main loop ---------- */
  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const s = g.current;

    s.onOver = (score: number) => {
      const prev = readBest();
      if (score > prev) saveBest(score);
      setBest(Math.max(prev, score));
      setFinal(score);
      setPhase("over");
    };
    s.onPhase = (p: Phase) => setPhase(p);
    s.onHud = () =>
      setHud({
        score: Math.floor(s.score),
        lives: s.lives,
        level: Math.floor(1 + s.time / 18),
        mult: s.mult,
        shield: s.shield > 0,
        triple: s.triple,
      });

    resize();
    requestAnimationFrame(() => setBest(readBest()));
    const ro = new ResizeObserver(resize);
    if (wrapRef.current) ro.observe(wrapRef.current);

    const burst = (x: number, y: number, color: string, n: number, speed: number, size = 2.5) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const v = speed * (0.25 + Math.random());
        const life = 0.35 + Math.random() * 0.7;
        s.particles.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life, max: life, color, size: 0.8 + Math.random() * size });
      }
    };
    const ring = (x: number, y: number, max: number, color: string) => s.rings.push({ x, y, r: 4, max, life: 1, color });

    const makeAsteroid = (x: number, y: number, r: number, speed: number): Asteroid => ({
      x, y, r,
      vx: (Math.random() - 0.5) * 50,
      vy: speed,
      rot: Math.random() * 6,
      vr: (Math.random() - 0.5) * 1.4,
      hp: Math.ceil(r / 13),
      flash: 0,
      shape: Array.from({ length: 11 + Math.floor(Math.random() * 4) }, () => 0.74 + Math.random() * 0.32),
      craters: Array.from({ length: 2 + Math.floor(r / 10) }, () => [
        (Math.random() - 0.5) * r * 1.1,
        (Math.random() - 0.5) * r * 1.1,
        r * (0.1 + Math.random() * 0.16),
      ]),
    });

    let last = performance.now();
    let raf = 0;
    let hudT = 0;
    let visT = 0;

    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      const dt = Math.min((now - last) / 1000, 0.033);
      last = now;
      // pause while the game is scrolled out of view (checked ~4x per second)
      visT -= dt;
      if (visT <= 0 && wrapRef.current) {
        visT = 0.25;
        const r = wrapRef.current.getBoundingClientRect();
        s.visible = r.bottom > 0 && r.top < window.innerHeight;
      }
      if (!s.visible) return;
      const { w, h } = s;
      const active = s.phase === "playing" || s.phase === "countdown";
      const playing = s.phase === "playing";

      /* ================= UPDATE ================= */
      const speedUp = playing ? 1 + s.time / 40 : 0.5;
      for (const st of s.stars) {
        st.y += (15 + st.z * 110) * dt * speedUp;
        if (st.y > h) {
          st.y = -3;
          st.x = Math.random() * w;
        }
      }
      s.gridOff = (s.gridOff + dt * 60 * speedUp) % 40;

      if (s.phase === "countdown") {
        s.count -= dt;
        if (s.count <= 0) {
          s.phase = "playing";
          s.onPhase("playing");
        }
      }

      if (active) {
        // ship movement
        if (s.keys.left) s.ship.tx -= 560 * dt;
        if (s.keys.right) s.ship.tx += 560 * dt;
        s.ship.tx = Math.max(26, Math.min(w - 26, s.ship.tx));
        const prevX = s.ship.x;
        s.ship.x += (s.ship.tx - s.ship.x) * Math.min(1, dt * 11);
        s.ship.vx = (s.ship.x - prevX) / Math.max(dt, 0.001);
        s.trail.push({ x: s.ship.x, y: s.ship.y + 14 });
        if (s.trail.length > 18) s.trail.shift();
      }

      if (playing) {
        s.time += dt;
        const level = 1 + s.time / 18;

        s.fireCd -= dt;
        if (s.fireCd <= 0) {
          s.fireCd = 0.14;
          s.bullets.push({ x: s.ship.x, y: s.ship.y - 22, vx: 0, vy: -720 });
          if (s.triple > 0) {
            s.bullets.push({ x: s.ship.x - 10, y: s.ship.y - 10, vx: -140, vy: -690 });
            s.bullets.push({ x: s.ship.x + 10, y: s.ship.y - 10, vx: 140, vy: -690 });
          }
        }
        s.triple = Math.max(0, s.triple - dt);
        s.shield = Math.max(0, s.shield - dt);
        s.hurt = Math.max(0, s.hurt - dt);
        s.comboT -= dt;
        if (s.comboT <= 0) s.mult = 1;

        s.spawnCd -= dt;
        if (s.spawnCd <= 0) {
          s.spawnCd = Math.max(0.24, 1.05 / level) * (0.55 + Math.random() * 0.9);
          const r = 13 + Math.random() * 28;
          s.asteroids.push(makeAsteroid(r + Math.random() * (w - 2 * r), -r - 4, r, 70 + Math.random() * 70 * level + 25 * level));
        }

        s.pickupCd -= dt;
        if (s.pickupCd <= 0) {
          s.pickupCd = 7 + Math.random() * 6;
          s.pickups.push({ x: 40 + Math.random() * (w - 80), y: -20, vy: 115, kind: Math.random() < 0.55 ? "core" : "plasma", t: 0 });
        }

        for (const b of s.bullets) {
          b.x += b.vx * dt;
          b.y += b.vy * dt;
        }
        s.bullets = s.bullets.filter((b) => b.y > -30 && b.x > -30 && b.x < w + 30);

        for (const a of s.asteroids) {
          a.x += a.vx * dt;
          a.y += a.vy * dt;
          a.rot += a.vr * dt;
          a.flash = Math.max(0, a.flash - dt * 6);
          if (a.x < a.r || a.x > w - a.r) a.vx *= -1;
        }

        // bullet hits
        const born: Asteroid[] = [];
        for (const a of s.asteroids) {
          for (const b of s.bullets) {
            if (a.hp <= 0 || b.y < -20) continue;
            if ((b.x - a.x) ** 2 + (b.y - a.y) ** 2 < a.r * a.r) {
              burst(b.x, b.y, "rgba(147,197,253,1)", 4, 90, 1.5);
              b.y = -999;
              a.hp -= 1;
              a.flash = 1;
              if (a.hp <= 0) {
                s.mult = Math.min(5, s.comboT > 0 ? s.mult + 1 : 1);
                s.comboT = 1.6;
                const pts = Math.round((60 - a.r) * s.mult);
                s.score += pts;
                s.popups.push({ x: a.x, y: a.y, text: `+${pts}${s.mult > 1 ? `  x${s.mult}` : ""}`, life: 1, color: s.mult > 2 ? "253,224,71" : "191,219,254" });
                burst(a.x, a.y, "rgba(96,165,250,1)", 22, 190);
                burst(a.x, a.y, "rgba(255,255,255,1)", 10, 110);
                burst(a.x, a.y, "rgba(148,163,184,1)", 10, 70, 3.5);
                ring(a.x, a.y, a.r * 2.4, "96,165,250");
                s.shake = Math.min(9, s.shake + a.r / 9);
                if (a.r > 25) {
                  born.push(makeAsteroid(a.x - 10, a.y, a.r * 0.56, a.vy * 1.1));
                  born.push(makeAsteroid(a.x + 10, a.y, a.r * 0.56, a.vy * 1.1));
                }
              }
            }
          }
        }
        s.asteroids = s.asteroids.filter((a) => a.hp > 0 && a.y < h + a.r + 20).concat(born);

        // pickups
        for (const p of s.pickups) {
          p.y += p.vy * dt;
          p.t += dt;
          if ((p.x - s.ship.x) ** 2 + (p.y - s.ship.y) ** 2 < 32 * 32) {
            const col = p.kind === "core" ? "250,204,21" : "168,85,247";
            burst(p.x, p.y, `rgba(${col},1)`, 26, 170);
            ring(p.x, p.y, 70, col);
            s.popups.push({ x: p.x, y: p.y - 10, text: p.kind === "core" ? "SHIELD +150" : "TRIPLE SHOT", life: 1.2, color: col });
            if (p.kind === "core") {
              s.score += 150;
              s.shield = 3.5;
            } else {
              s.triple = 8;
            }
            p.y = h + 999;
          }
        }
        s.pickups = s.pickups.filter((p) => p.y < h + 40);

        // ship hit
        if (s.shield <= 0 && s.hurt <= 0) {
          for (const a of s.asteroids) {
            if ((a.x - s.ship.x) ** 2 + (a.y - s.ship.y) ** 2 < (a.r + 13) ** 2) {
              a.hp = 0;
              s.lives -= 1;
              s.hurt = 1.8;
              s.shake = 14;
              s.flash = 0.6;
              s.mult = 1;
              burst(s.ship.x, s.ship.y, "rgba(236,72,153,1)", 34, 230);
              ring(s.ship.x, s.ship.y, 110, "236,72,153");
              if (s.lives <= 0) {
                s.phase = "over";
                burst(s.ship.x, s.ship.y, "rgba(255,255,255,1)", 70, 300);
                ring(s.ship.x, s.ship.y, 220, "96,165,250");
                s.onOver(Math.floor(s.score));
              }
              break;
            }
          }
          s.asteroids = s.asteroids.filter((a) => a.hp > 0);
        } else if (s.shield > 0) {
          // shield destroys what it touches
          for (const a of s.asteroids) {
            if ((a.x - s.ship.x) ** 2 + (a.y - s.ship.y) ** 2 < (a.r + 30) ** 2) {
              a.hp = 0;
              burst(a.x, a.y, "rgba(250,204,21,1)", 14, 160);
              ring(a.x, a.y, a.r * 2, "250,204,21");
            }
          }
          s.asteroids = s.asteroids.filter((a) => a.hp > 0);
        }

        s.score += dt * 6;
        hudT += dt;
        if (hudT > 0.2) {
          hudT = 0;
          s.onHud();
        }
      }

      for (const p of s.particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.965;
        p.vy *= 0.965;
        p.life -= dt;
      }
      s.particles = s.particles.filter((p) => p.life > 0);
      for (const r of s.rings) {
        r.life -= dt * 2.2;
        r.r += (r.max - r.r) * dt * 7;
      }
      s.rings = s.rings.filter((r) => r.life > 0);
      for (const p of s.popups) {
        p.y -= 40 * dt;
        p.life -= dt;
      }
      s.popups = s.popups.filter((p) => p.life > 0);
      s.shake = Math.max(0, s.shake - dt * 30);
      s.flash = Math.max(0, s.flash - dt * 2);

      /* ================= DRAW ================= */
      ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
      if (s.bg) ctx.drawImage(s.bg, 0, 0, w, h);
      ctx.save();
      ctx.translate((Math.random() - 0.5) * s.shake, (Math.random() - 0.5) * s.shake);

      // perspective grid floor
      const hz = h * 0.62;
      ctx.save();
      const gridFade = ctx.createLinearGradient(0, hz, 0, h);
      gridFade.addColorStop(0, "rgba(59,130,246,0)");
      gridFade.addColorStop(1, "rgba(59,130,246,0.35)");
      ctx.strokeStyle = gridFade;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = -12; i <= 12; i++) {
        ctx.moveTo(w / 2 + i * 26, hz);
        ctx.lineTo(w / 2 + i * w * 0.16, h);
      }
      for (let k = 0; k < 14; k++) {
        const t = ((k * 40 + s.gridOff) / 560) ** 2;
        const y = hz + t * (h - hz);
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();
      ctx.restore();

      // stars (streak when moving fast)
      for (const st of s.stars) {
        const len = 1 + st.z * (playing ? 6 * speedUp : 1.5);
        ctx.fillStyle = `rgba(${st.z > 0.75 ? "191,219,254" : "255,255,255"},${0.2 + st.z * 0.7})`;
        ctx.fillRect(st.x, st.y, st.z > 0.85 ? 2 : 1, len);
      }

      ctx.globalCompositeOperation = "lighter";

      // pickups
      for (const p of s.pickups) {
        const col = p.kind === "core" ? "250,204,21" : "168,85,247";
        const pulse = 1 + Math.sin(p.t * 7) * 0.15;
        const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 34);
        halo.addColorStop(0, `rgba(${col},0.45)`);
        halo.addColorStop(1, `rgba(${col},0)`);
        ctx.fillStyle = halo;
        ctx.fillRect(p.x - 34, p.y - 34, 68, 68);
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.t * 1.6);
        ctx.strokeStyle = `rgba(${col},1)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2;
          ctx.lineTo(Math.cos(a) * 11 * pulse, Math.sin(a) * 11 * pulse);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = `rgba(${col},0.5)`;
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // bullets: plasma bolts with a trail
      for (const b of s.bullets) {
        const tg = ctx.createLinearGradient(b.x, b.y, b.x - b.vx * 0.03, b.y - b.vy * 0.03);
        tg.addColorStop(0, "rgba(219,234,254,1)");
        tg.addColorStop(1, "rgba(59,130,246,0)");
        ctx.strokeStyle = tg;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(b.x - b.vx * 0.03, b.y - b.vy * 0.03);
        ctx.stroke();
        const bg = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, 9);
        bg.addColorStop(0, "rgba(147,197,253,0.9)");
        bg.addColorStop(1, "rgba(59,130,246,0)");
        ctx.fillStyle = bg;
        ctx.fillRect(b.x - 9, b.y - 9, 18, 18);
      }

      // engine trail
      if (s.trail.length > 2) {
        ctx.lineCap = "round";
        for (let i = 1; i < s.trail.length; i++) {
          const a = i / s.trail.length;
          const p0 = s.trail[i - 1];
          const p1 = s.trail[i];
          ctx.strokeStyle = `rgba(96,165,250,${a * 0.28})`;
          ctx.lineWidth = 1 + a * 7;
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y + (s.trail.length - i + 1) * 3);
          ctx.lineTo(p1.x, p1.y + (s.trail.length - i) * 3);
          ctx.stroke();
        }
      }

      ctx.globalCompositeOperation = "source-over";

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
        const body = ctx.createRadialGradient(-a.r * 0.35, -a.r * 0.4, a.r * 0.1, 0, 0, a.r * 1.1);
        body.addColorStop(0, "#5b6578");
        body.addColorStop(0.55, "#262d3b");
        body.addColorStop(1, "#0b0e15");
        ctx.fillStyle = body;
        ctx.fill();
        ctx.save();
        ctx.clip();
        for (const [cx, cy, cr] of a.craters) {
          ctx.fillStyle = "rgba(0,0,0,0.35)";
          ctx.beginPath();
          ctx.arc(cx, cy, cr, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "rgba(255,255,255,0.08)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(cx - 0.6, cy - 0.6, cr, Math.PI * 0.9, Math.PI * 1.8);
          ctx.stroke();
        }
        ctx.restore();
        ctx.strokeStyle = `rgba(96,165,250,${0.55 + a.flash * 0.45})`;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = "rgba(59,130,246,0.8)";
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
        if (a.flash > 0) {
          ctx.fillStyle = `rgba(219,234,254,${a.flash * 0.45})`;
          ctx.fill();
        }
        ctx.restore();
      }

      // ship
      if (s.phase !== "over" && !(s.hurt > 0 && Math.floor(s.hurt * 14) % 2 === 0)) {
        const { x, y, vx } = s.ship;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.max(-0.38, Math.min(0.38, vx / 1500)));
        // engine glow
        ctx.globalCompositeOperation = "lighter";
        for (const ex of [-6, 6]) {
          const fl = 14 + Math.random() * 10;
          const fg = ctx.createLinearGradient(0, 12, 0, 12 + fl);
          fg.addColorStop(0, "rgba(191,219,254,1)");
          fg.addColorStop(0.4, "rgba(59,130,246,0.8)");
          fg.addColorStop(1, "rgba(59,130,246,0)");
          ctx.fillStyle = fg;
          ctx.beginPath();
          ctx.moveTo(ex - 4, 12);
          ctx.quadraticCurveTo(ex, 16 + fl * 1.2, ex + 4, 12);
          ctx.fill();
        }
        const aura = ctx.createRadialGradient(0, 0, 0, 0, 0, 46);
        aura.addColorStop(0, "rgba(59,130,246,0.35)");
        aura.addColorStop(1, "rgba(59,130,246,0)");
        ctx.fillStyle = aura;
        ctx.fillRect(-46, -46, 92, 92);
        ctx.globalCompositeOperation = "source-over";
        // wings
        const wing = ctx.createLinearGradient(-22, 0, 22, 0);
        wing.addColorStop(0, "#1e3a8a");
        wing.addColorStop(0.5, "#60a5fa");
        wing.addColorStop(1, "#1e3a8a");
        ctx.fillStyle = wing;
        ctx.beginPath();
        ctx.moveTo(0, -6);
        ctx.lineTo(22, 12);
        ctx.lineTo(18, 16);
        ctx.lineTo(0, 9);
        ctx.lineTo(-18, 16);
        ctx.lineTo(-22, 12);
        ctx.closePath();
        ctx.fill();
        // hull
        const hull = ctx.createLinearGradient(0, -24, 0, 14);
        hull.addColorStop(0, "#ffffff");
        hull.addColorStop(1, "#93c5fd");
        ctx.fillStyle = hull;
        ctx.beginPath();
        ctx.moveTo(0, -24);
        ctx.quadraticCurveTo(7, -6, 7, 12);
        ctx.lineTo(-7, 12);
        ctx.quadraticCurveTo(-7, -6, 0, -24);
        ctx.fill();
        // cockpit
        ctx.fillStyle = "#0b1b3f";
        ctx.beginPath();
        ctx.ellipse(0, -6, 3, 7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(147,197,253,0.9)";
        ctx.fillRect(-1, -11, 1.5, 5);
        // blinking wing lights
        const blink = Math.sin(performance.now() / 160) > 0;
        ctx.fillStyle = blink ? "#f472b6" : "#4b1d3a";
        ctx.fillRect(-21, 11, 3, 3);
        ctx.fillStyle = blink ? "#4ade80" : "#14532d";
        ctx.fillRect(18, 11, 3, 3);
        // shield
        if (s.shield > 0) {
          ctx.globalCompositeOperation = "lighter";
          const sg = ctx.createRadialGradient(0, -2, 18, 0, -2, 34);
          sg.addColorStop(0, "rgba(250,204,21,0)");
          sg.addColorStop(0.8, `rgba(250,204,21,${0.25 + 0.15 * Math.sin(s.time * 12)})`);
          sg.addColorStop(1, "rgba(250,204,21,0)");
          ctx.fillStyle = sg;
          ctx.beginPath();
          ctx.arc(0, -2, 34, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalCompositeOperation = "source-over";
        }
        ctx.restore();
      }

      // particles, rings, popups
      ctx.globalCompositeOperation = "lighter";
      for (const p of s.particles) {
        ctx.globalAlpha = Math.max(0, p.life / p.max);
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }
      ctx.globalAlpha = 1;
      for (const r of s.rings) {
        ctx.strokeStyle = `rgba(${r.color},${r.life * 0.8})`;
        ctx.lineWidth = 2 * r.life + 0.5;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";
      ctx.textAlign = "center";
      ctx.font = "700 13px ui-monospace, SFMono-Regular, Menlo, monospace";
      for (const p of s.popups) {
        ctx.fillStyle = `rgba(${p.color},${Math.min(1, p.life * 1.5)})`;
        ctx.fillText(p.text, p.x, p.y);
      }
      ctx.restore();

      // hit flash
      if (s.flash > 0) {
        ctx.fillStyle = `rgba(236,72,153,${s.flash * 0.25})`;
        ctx.fillRect(0, 0, w, h);
      }

      // countdown
      if (s.phase === "countdown") {
        const n = Math.ceil(s.count - 0.2);
        const frac = s.count - Math.floor(s.count);
        ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.globalAlpha = Math.min(1, frac * 2);
        ctx.font = `600 ${60 + (1 - frac) * 30}px ui-sans-serif, system-ui, sans-serif`;
        ctx.shadowColor = "rgba(59,130,246,1)";
        ctx.shadowBlur = 30;
        ctx.fillStyle = "#e0ecff";
        ctx.fillText(n > 0 ? String(n) : "GO", w / 2, h * 0.42);
        ctx.restore();
      }
    };
    raf = requestAnimationFrame(step);

    const key = (down: boolean) => (e: KeyboardEvent) => {
      if (s.phase !== "playing" && s.phase !== "countdown") return;
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
      window.removeEventListener("keydown", kd);
      window.removeEventListener("keyup", ku);
    };
  }, [resize]);

  const onPointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    g.current.ship.tx = e.clientX - r.left;
  };

  const live = phase === "playing" || phase === "countdown";

  return (
    <section className="relative overflow-hidden bg-black px-6 py-20 lg:px-12">
      {/* ambient glows */}
      <motion.div
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/15 blur-[140px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* HEADER */}
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p variants={fadeUp} className="text-[10px] tracking-[0.45em] text-zinc-400">
            INTERACTIVE LAB
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-medium leading-tight text-white md:text-5xl">
            Built to Engage. <ShimmerText>Play the Mission.</ShimmerText>
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
            A real-time game engineered by our team and running entirely in your
            browser. The same craft, performance and attention to detail we
            bring to every platform we build.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-6 flex flex-wrap justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-zinc-400">
            {[
              { icon: Gauge, t: "60 FPS engine" },
              { icon: Cpu, t: "Zero downloads" },
              { icon: Zap, t: "Any device" },
            ].map(({ icon: Icon, t }) => (
              <span key={t} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                <Icon size={12} className="text-blue-400" /> {t}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* GAME CONSOLE */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: EASE }}
          className="relative mt-12 rounded-[22px] p-[1.5px]"
        >
          {/* rotating light around the frame */}
          <div className="absolute inset-0 overflow-hidden rounded-[22px]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(59,130,246,0.9)_40deg,transparent_90deg,transparent_180deg,rgba(147,197,253,0.7)_220deg,transparent_270deg)]"
            />
          </div>

          <div className="relative overflow-hidden rounded-[21px] bg-[#02040b] shadow-[0_0_120px_-30px_rgba(59,130,246,0.8)]">
            {/* console top bar */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-5 py-3">
              <span className="flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-zinc-400">
                <span className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-pink-500/80" />
                  <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
                  <span className="h-2 w-2 rounded-full bg-blue-500/80" />
                </span>
                ORBIT DEFENSE · SB-01
              </span>
              <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-zinc-500">
                <motion.span
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className={`h-1.5 w-1.5 rounded-full ${live ? "bg-green-400 shadow-[0_0_8px_#4ade80]" : "bg-blue-400 shadow-[0_0_8px_#60a5fa]"}`}
                />
                {live ? "MISSION LIVE" : "SYSTEMS ONLINE"}
              </span>
            </div>

            <div ref={wrapRef} className="relative h-[480px] w-full sm:h-[560px] lg:h-[620px]">
              <canvas
                ref={canvasRef}
                tabIndex={0}
                aria-label="Orbit Defense game"
                onPointerMove={onPointer}
                onPointerDown={onPointer}
                className={`absolute inset-0 h-full w-full outline-none ${live ? "cursor-crosshair touch-none" : ""}`}
              />

              {/* scanlines + vignette */}
              <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.025)_0px,rgba(255,255,255,0.025)_1px,transparent_1px,transparent_3px)]" />
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_140px_rgba(0,0,0,0.85)]" />

              {/* HUD corners */}
              <Corner className="left-4 top-4 border-l-2 border-t-2" />
              <Corner className="right-4 top-4 border-r-2 border-t-2" />
              <Corner className="bottom-4 left-4 border-b-2 border-l-2" />
              <Corner className="bottom-4 right-4 border-b-2 border-r-2" />

              {/* live HUD */}
              {live && (
                <>
                  <div className="pointer-events-none absolute left-8 top-7 rounded-lg border border-blue-400/25 bg-black/40 px-4 py-2 backdrop-blur-md">
                    <p className="font-mono text-[9px] tracking-[0.3em] text-blue-300/80">SCORE</p>
                    <p className="font-mono text-2xl font-semibold tabular-nums text-white">{String(hud.score).padStart(6, "0")}</p>
                  </div>
                  <div className="pointer-events-none absolute right-8 top-7 flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 rounded-lg border border-blue-400/25 bg-black/40 px-3 py-2 backdrop-blur-md">
                      <span className="font-mono text-[9px] tracking-[0.3em] text-blue-300/80">HULL</span>
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className={`h-2.5 w-5 rounded-sm transition-colors ${i < hud.lives ? "bg-blue-500 shadow-[0_0_10px_#3b82f6]" : "bg-white/10"}`}
                        />
                      ))}
                    </div>
                    <div className="flex gap-2 font-mono text-[10px] tracking-[0.2em]">
                      <span className="rounded-md border border-white/10 bg-black/40 px-2 py-1 text-zinc-300 backdrop-blur-md">LVL {hud.level}</span>
                      {hud.mult > 1 && (
                        <motion.span
                          key={hud.mult}
                          initial={{ scale: 1.5 }}
                          animate={{ scale: 1 }}
                          className="rounded-md border border-yellow-400/50 bg-yellow-400/10 px-2 py-1 text-yellow-200"
                        >
                          COMBO x{hud.mult}
                        </motion.span>
                      )}
                    </div>
                  </div>
                  <div className="pointer-events-none absolute bottom-7 left-8 flex gap-2 font-mono text-[10px] tracking-[0.2em]">
                    {hud.shield && (
                      <span className="flex items-center gap-1.5 rounded-md border border-yellow-400/40 bg-black/40 px-2 py-1 text-yellow-200 backdrop-blur-md">
                        <Shield size={11} /> SHIELD
                      </span>
                    )}
                    {hud.triple > 0 && (
                      <span className="rounded-md border border-purple-400/40 bg-black/40 px-2 py-1 text-purple-200 backdrop-blur-md">
                        TRIPLE SHOT {hud.triple.toFixed(1)}s
                      </span>
                    )}
                  </div>
                </>
              )}

              {/* start / game over screens */}
              {!live && (
                <motion.div
                  key={phase}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-black/40 via-black/60 to-black/80 px-6 text-center"
                >
                  {phase === "ready" ? (
                    <>
                      <motion.p
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="font-mono text-[10px] tracking-[0.5em] text-blue-300"
                      >
                        ▸ READY FOR LAUNCH
                      </motion.p>
                      <h3 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">
                        ORBIT <ShimmerText>DEFENSE</ShimmerText>
                      </h3>
                      <p className="mt-3 max-w-md text-sm text-zinc-400">
                        Clear the asteroid field, chain hits for combos and survive the waves.
                      </p>
                      <div className="mt-6 hidden max-w-lg grid-cols-3 gap-3 text-left sm:grid">
                        {[
                          { k: "STEER", v: "Mouse · touch · ← →" },
                          { k: "SHIELD", v: "Yellow energy core" },
                          { k: "POWER", v: "Purple plasma cell" },
                        ].map((x) => (
                          <div key={x.k} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 backdrop-blur-sm">
                            <p className="font-mono text-[9px] tracking-[0.3em] text-blue-300/80">{x.k}</p>
                            <p className="mt-1 text-[11px] text-zinc-300">{x.v}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="font-mono text-[10px] tracking-[0.5em] text-pink-300">MISSION REPORT</p>
                      <motion.h3
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 14 }}
                        className="mt-3 font-mono text-5xl font-semibold tabular-nums text-white md:text-7xl"
                      >
                        {final}
                      </motion.h3>
                      <p className="mt-2 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-zinc-400">
                        <Trophy size={13} className="text-yellow-300" />
                        {final >= best && final > 0 ? "New personal best" : `Best ${best}`}
                      </p>
                      <p className="mt-6 max-w-sm text-sm text-zinc-300">
                        Imagine what we could build for your business.
                      </p>
                    </>
                  )}

                  <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                    <motion.button
                      type="button"
                      onClick={start}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{ boxShadow: ["0 0 0 0 rgba(59,130,246,0.55)", "0 0 0 20px rgba(59,130,246,0)"] }}
                      transition={{ boxShadow: { duration: 1.8, repeat: Infinity, ease: "easeOut" } }}
                      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-blue-500 px-8 py-3.5 text-sm font-semibold text-white hover:bg-blue-400"
                    >
                      <LightSweep />
                      {phase === "ready" ? <Play size={16} className="relative" /> : <RotateCcw size={16} className="relative" />}
                      <span className="relative">{phase === "ready" ? "Start Mission" : "Play Again"}</span>
                    </motion.button>
                    {phase === "over" && (
                      <Link
                        href={consultationHref}
                        className="group inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-blue-400 hover:text-blue-300"
                      >
                        Book a Consultation
                        <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {best > 0 && (
          <p className="mt-4 flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.25em] text-zinc-500">
            <Trophy size={12} className="text-yellow-300/80" /> YOUR BEST: <span className="text-zinc-200">{best}</span>
          </p>
        )}
      </div>
    </section>
  );
}
