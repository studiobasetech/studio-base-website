/* ------------------------------------------------------------------ */
/*  ORBIT DEFENSE — game engine (plain TypeScript + <canvas>).         */
/*                                                                    */
/*  Targets: asteroids, UFOs (shoot back), comets, cosmic jellyfish,  */
/*  derelict satellites (drop power-ups) and a Mothership boss.       */
/*  Catch drifting astronauts to rescue them. A black hole            */
/*  appears from time to time and pulls everything in.                */
/* ------------------------------------------------------------------ */

export type Phase = "ready" | "countdown" | "playing" | "over";
export type HudState = {
  score: number;
  lives: number;
  wave: number;
  mult: number;
  shield: boolean;
  triple: number;
  boss: number | null; // boss health 0..1 or null
  rescued: number;
};
export type GameLang = "en" | "es";
/** Text drawn on the canvas: same in both languages, or translated. */
type GText = string | { en: string; es: string };
type Callbacks = {
  onHud: (h: HudState) => void;
  onPhase: (p: Phase) => void;
  onOver: (score: number) => void;
  /** Read on every frame, so switching language mid-game updates the canvas text. */
  getLang?: () => GameLang;
};

type Kind = "rock" | "ufo" | "comet" | "jelly" | "sat" | "boss";
type Enemy = {
  kind: Kind;
  x: number; y: number; vx: number; vy: number; r: number;
  hp: number; maxHp: number; t: number; rot: number; vr: number; flash: number;
  shape: number[]; craters: [number, number, number][];
  fireCd: number; baseX: number; seed: number;
};
type Shot = { x: number; y: number; vx: number; vy: number; enemy: boolean };
type Particle = { x: number; y: number; vx: number; vy: number; life: number; max: number; color: string; size: number };
type Ring = { x: number; y: number; r: number; max: number; life: number; color: string };
type Popup = { x: number; y: number; text: GText; life: number; color: string; big?: boolean };
type PickKind = "core" | "plasma" | "astro";
type Pickup = { x: number; y: number; vx: number; vy: number; kind: PickKind; t: number };
type Star = { x: number; y: number; z: number };
type Hole = { x: number; y: number; t: number; dur: number } | null;

const WAVES = [
  { en: "ASTEROID BELT", es: "CINTURÓN DE ASTEROIDES" },
  { en: "UFO PATROL", es: "PATRULLA OVNI" },
  { en: "COMET STORM", es: "TORMENTA DE COMETAS" },
  { en: "NEBULA DRIFTERS", es: "ERRANTES DE LA NEBULOSA" },
  { en: "SATELLITE GRAVEYARD", es: "CEMENTERIO DE SATÉLITES" },
  { en: "MOTHERSHIP INBOUND", es: "NAVE NODRIZA EN CAMINO" },
  { en: "DEEP SPACE", es: "ESPACIO PROFUNDO" },
];
const POINTS: Record<Kind, number> = { rock: 60, ufo: 250, comet: 200, jelly: 180, sat: 150, boss: 3000 };

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(arr: [T, number][]): T => {
  const tot = arr.reduce((s, [, w]) => s + w, 0);
  let r = Math.random() * tot;
  for (const [v, w] of arr) {
    r -= w;
    if (r <= 0) return v;
  }
  return arr[0][0];
};

export function createGame(canvas: HTMLCanvasElement, cb: Callbacks) {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no canvas");

  /** Resolve canvas text in the current language (checked at draw time). */
  const txt = (t: GText) => (typeof t === "string" ? t : t[cb.getLang?.() ?? "en"]);

  const s = {
    w: 960, h: 540, dpr: 1,
    phase: "ready" as Phase,
    ship: { x: 480, y: 470, tx: 480, vx: 0 },
    keys: { left: false, right: false },
    shots: [] as Shot[],
    enemies: [] as Enemy[],
    particles: [] as Particle[],
    rings: [] as Ring[],
    popups: [] as Popup[],
    pickups: [] as Pickup[],
    stars: [] as Star[],
    trail: [] as { x: number; y: number }[],
    bg: null as HTMLCanvasElement | null,
    hole: null as Hole,
    score: 0, lives: 3, time: 0, count: 0, wave: 0, rescued: 0,
    fireCd: 0, spawnCd: 0, pickupCd: 6, astroCd: 10, holeCd: 30,
    triple: 0, shield: 0, hurt: 0, shake: 0, flash: 0,
    mult: 1, comboT: 0, gridOff: 0, banner: 0, bannerText: "" as GText,
    visible: true, hudT: 0,
  };

  /* ---------------- helpers ---------------- */
  const burst = (x: number, y: number, color: string, n: number, speed: number, size = 2.5) => {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const v = speed * (0.25 + Math.random());
      const life = 0.35 + Math.random() * 0.7;
      s.particles.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life, max: life, color, size: 0.8 + Math.random() * size });
    }
  };
  const ring = (x: number, y: number, max: number, color: string) => s.rings.push({ x, y, r: 4, max, life: 1, color });
  const popup = (x: number, y: number, text: GText, color: string, big = false) =>
    s.popups.push({ x, y, text, life: big ? 1.8 : 1, color, big });

  const make = (kind: Kind, x: number, y: number, extra: Partial<Enemy> = {}): Enemy => {
    const lvl = 1 + s.time / 30;
    const base: Enemy = {
      kind, x, y, vx: 0, vy: 0, r: 20, hp: 1, maxHp: 1, t: 0, rot: rand(0, 6), vr: rand(-1.2, 1.2), flash: 0,
      shape: [], craters: [], fireCd: rand(1, 2.5), baseX: x, seed: Math.random() * 100,
    };
    if (kind === "rock") {
      base.r = rand(13, 40);
      base.vx = rand(-25, 25);
      base.vy = rand(70, 130) * lvl;
      base.shape = Array.from({ length: 11 + Math.floor(Math.random() * 4) }, () => rand(0.74, 1.06));
      base.craters = Array.from({ length: 2 + Math.floor(base.r / 10) }, () => [
        rand(-0.55, 0.55) * base.r, rand(-0.55, 0.55) * base.r, base.r * rand(0.1, 0.26),
      ]);
      base.hp = Math.ceil(base.r / 13);
    } else if (kind === "ufo") {
      base.r = 22; base.vy = rand(45, 65) * Math.sqrt(lvl); base.hp = 4; base.vr = 0;
    } else if (kind === "comet") {
      base.r = 11; base.vx = rand(-160, 160); base.vy = rand(260, 340) * Math.sqrt(lvl); base.hp = 2;
    } else if (kind === "jelly") {
      base.r = 20; base.vy = rand(40, 60); base.hp = 3; base.vr = 0;
    } else if (kind === "sat") {
      base.r = 24; base.vy = rand(55, 80); base.vx = rand(-30, 30); base.hp = 3; base.vr = rand(-0.8, 0.8);
    } else if (kind === "boss") {
      base.r = 70; base.vy = 40; base.hp = 60 + s.wave * 8; base.vr = 0; base.fireCd = 1.5;
    }
    base.maxHp = base.hp;
    return Object.assign(base, extra);
  };

  /* ---------------- background (painted once per resize) ---------------- */
  const paintBg = () => {
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
    neb(s.w * 0.8, s.h * 0.2, s.w * 0.45, "rgba(59,130,246,0.22)");
    neb(s.w * 0.12, s.h * 0.3, s.w * 0.35, "rgba(168,85,247,0.12)");
    neb(s.w * 0.45, s.h * 0.05, s.w * 0.25, "rgba(236,72,153,0.07)");
    neb(s.w * 0.5, s.h * 1.05, s.w * 0.6, "rgba(56,189,248,0.16)");
    for (let i = 0; i < 300; i++) {
      c.fillStyle = `rgba(200,220,255,${Math.random() * 0.35})`;
      c.fillRect(Math.random() * s.w, Math.random() * s.h, 1, 1);
    }
    s.bg = bg;
  };

  const resize = (w: number, h: number) => {
    s.dpr = Math.min(window.devicePixelRatio || 1, 2);
    s.w = w;
    s.h = h;
    canvas.width = Math.round(w * s.dpr);
    canvas.height = Math.round(h * s.dpr);
    s.ship.y = h - 70;
    if (s.phase !== "playing") s.ship.x = s.ship.tx = w / 2;
    if (s.stars.length === 0) for (let i = 0; i < 180; i++) s.stars.push({ x: Math.random() * w, y: Math.random() * h, z: Math.random() });
    paintBg();
  };

  const hud = () =>
    cb.onHud({
      score: Math.floor(s.score),
      lives: s.lives,
      wave: s.wave,
      mult: s.mult,
      shield: s.shield > 0,
      triple: s.triple,
      boss: (() => {
        const b = s.enemies.find((e) => e.kind === "boss");
        return b ? Math.max(0, b.hp / b.maxHp) : null;
      })(),
      rescued: s.rescued,
    });

  const start = () => {
    Object.assign(s, {
      shots: [], enemies: [], particles: [], rings: [], popups: [], pickups: [], trail: [], hole: null,
      score: 0, lives: 3, time: 0, count: 3.2, wave: 0, rescued: 0,
      fireCd: 0, spawnCd: 0.8, pickupCd: 7, astroCd: 9, holeCd: 28,
      triple: 0, shield: 2.5, hurt: 0, mult: 1, comboT: 0, banner: 0,
      phase: "countdown" as Phase,
    });
    s.ship.x = s.ship.tx = s.w / 2;
    cb.onPhase("countdown");
    hud();
  };

  /* ---------------- kill / damage ---------------- */
  const destroy = (e: Enemy, byPlayer: boolean) => {
    e.hp = 0;
    if (byPlayer) {
      s.mult = Math.min(5, s.comboT > 0 ? s.mult + 1 : 1);
      s.comboT = 1.6;
      const base = e.kind === "rock" ? Math.round(POINTS.rock - e.r) : POINTS[e.kind];
      const pts = base * s.mult;
      s.score += pts;
      popup(e.x, e.y, `+${pts}${s.mult > 1 ? `  x${s.mult}` : ""}`, s.mult > 2 ? "253,224,71" : "191,219,254", e.kind === "boss");
    }
    const col: Record<Kind, string> = {
      rock: "96,165,250", ufo: "34,211,238", comet: "191,219,254", jelly: "236,72,153", sat: "250,204,21", boss: "168,85,247",
    };
    const c = col[e.kind];
    burst(e.x, e.y, `rgba(${c},1)`, e.kind === "boss" ? 120 : 24, e.kind === "boss" ? 360 : 190);
    burst(e.x, e.y, "rgba(255,255,255,1)", e.kind === "boss" ? 40 : 10, 110);
    ring(e.x, e.y, e.kind === "boss" ? 260 : e.r * 2.6, c);
    if (e.kind === "boss") {
      ring(e.x, e.y, 380, "96,165,250");
      s.flash = 0.5;
      s.banner = 2.4;
      s.bannerText = { en: "MOTHERSHIP DESTROYED", es: "NAVE NODRIZA DESTRUIDA" };
    }
    s.shake = Math.min(e.kind === "boss" ? 20 : 9, s.shake + e.r / 9);
    if (e.kind === "rock" && e.r > 25) {
      s.enemies.push(make("rock", e.x - 10, e.y, { r: e.r * 0.56, hp: 2, vy: e.vy * 1.1, vx: -60 }));
      s.enemies.push(make("rock", e.x + 10, e.y, { r: e.r * 0.56, hp: 2, vy: e.vy * 1.1, vx: 60 }));
    }
    if (e.kind === "sat" && byPlayer && Math.random() < 0.7) {
      s.pickups.push({ x: e.x, y: e.y, vx: 0, vy: 90, kind: Math.random() < 0.5 ? "core" : "plasma", t: 0 });
    }
    if (e.kind === "boss") {
      for (let i = 0; i < 3; i++) s.pickups.push({ x: e.x + (i - 1) * 50, y: e.y, vx: (i - 1) * 30, vy: 90, kind: i === 1 ? "core" : "plasma", t: 0 });
    }
  };

  const hitPlayer = () => {
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
      hud();
      cb.onOver(Math.floor(s.score));
    }
  };

  /* ---------------- update ---------------- */
  const update = (dt: number) => {
    const { w, h } = s;
    const active = s.phase === "playing" || s.phase === "countdown";
    const playing = s.phase === "playing";
    const speedUp = playing ? Math.min(1.8, 1 + s.time / 60) : 0.5;

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
        cb.onPhase("playing");
      }
    }

    if (active) {
      if (s.keys.left) s.ship.tx -= 560 * dt;
      if (s.keys.right) s.ship.tx += 560 * dt;
      // black hole tugs the ship
      if (s.hole) s.ship.tx += Math.sign(s.hole.x - s.ship.x) * 70 * dt;
      s.ship.tx = Math.max(26, Math.min(w - 26, s.ship.tx));
      const prevX = s.ship.x;
      s.ship.x += (s.ship.tx - s.ship.x) * Math.min(1, dt * 11);
      s.ship.vx = (s.ship.x - prevX) / Math.max(dt, 0.001);
      s.trail.push({ x: s.ship.x, y: s.ship.y + 14 });
      if (s.trail.length > 18) s.trail.shift();
    }

    if (playing) {
      s.time += dt;
      // waves every 20 s
      const wave = 1 + Math.floor(s.time / 20);
      if (wave !== s.wave) {
        s.wave = wave;
        s.banner = 2.4;
        s.bannerText = {
          en: `WAVE ${wave} · ${WAVES[(wave - 1) % WAVES.length].en}`,
          es: `OLEADA ${wave} · ${WAVES[(wave - 1) % WAVES.length].es}`,
        };
        if (wave % 3 === 0 && !s.enemies.some((e) => e.kind === "boss")) {
          s.enemies.push(make("boss", w / 2, -90));
        }
      }
      const lvl = 1 + s.time / 30;
      const bossUp = s.enemies.some((e) => e.kind === "boss");

      // auto fire
      s.fireCd -= dt;
      if (s.fireCd <= 0) {
        s.fireCd = 0.14;
        s.shots.push({ x: s.ship.x, y: s.ship.y - 22, vx: 0, vy: -720, enemy: false });
        if (s.triple > 0) {
          s.shots.push({ x: s.ship.x - 10, y: s.ship.y - 10, vx: -150, vy: -690, enemy: false });
          s.shots.push({ x: s.ship.x + 10, y: s.ship.y - 10, vx: 150, vy: -690, enemy: false });
        }
      }
      s.triple = Math.max(0, s.triple - dt);
      s.shield = Math.max(0, s.shield - dt);
      s.hurt = Math.max(0, s.hurt - dt);
      s.comboT -= dt;
      if (s.comboT <= 0) s.mult = 1;

      // spawn enemies (mix grows with the waves)
      s.spawnCd -= dt;
      if (s.spawnCd <= 0) {
        s.spawnCd = Math.max(0.3, 1.1 / lvl) * rand(0.6, 1.4) * (bossUp ? 1.8 : 1);
        const kind = pick<Kind>([
          ["rock", 6],
          ["sat", s.wave >= 1 ? 1.2 : 0],
          ["ufo", s.wave >= 2 ? 2 : 0],
          ["comet", s.wave >= 3 ? 1.6 : 0.3],
          ["jelly", s.wave >= 4 ? 1.8 : s.wave >= 2 ? 0.5 : 0],
        ]);
        const x = rand(40, w - 40);
        s.enemies.push(make(kind, kind === "comet" ? rand(w * 0.2, w * 0.8) : x, -40));
      }

      // pickups, astronauts, black hole
      s.pickupCd -= dt;
      if (s.pickupCd <= 0) {
        s.pickupCd = rand(8, 13);
        s.pickups.push({ x: rand(40, w - 40), y: -20, vx: 0, vy: 115, kind: Math.random() < 0.55 ? "core" : "plasma", t: 0 });
      }
      s.astroCd -= dt;
      if (s.astroCd <= 0) {
        s.astroCd = rand(12, 18);
        s.pickups.push({ x: rand(60, w - 60), y: -30, vx: rand(-20, 20), vy: 70, kind: "astro", t: 0 });
      }
      s.holeCd -= dt;
      if (s.holeCd <= 0 && !s.hole && !bossUp) {
        s.holeCd = rand(30, 40);
        s.hole = { x: rand(w * 0.25, w * 0.75), y: rand(h * 0.25, h * 0.45), t: 0, dur: 7 };
        s.banner = 2;
        s.bannerText = { en: "⚠ GRAVITY ANOMALY DETECTED", es: "⚠ ANOMALÍA GRAVITACIONAL DETECTADA" };
      }
      if (s.hole) {
        s.hole.t += dt;
        if (s.hole.t > s.hole.dur) {
          ring(s.hole.x, s.hole.y, 160, "168,85,247");
          s.hole = null;
        }
      }

      // shots
      for (const b of s.shots) {
        b.x += b.vx * dt;
        b.y += b.vy * dt;
      }
      s.shots = s.shots.filter((b) => b.y > -30 && b.y < h + 30 && b.x > -30 && b.x < w + 30);

      // enemies move + behave
      for (const e of s.enemies) {
        e.t += dt;
        e.flash = Math.max(0, e.flash - dt * 6);
        e.rot += e.vr * dt;
        if (e.kind === "ufo") {
          e.x = e.baseX + Math.sin(e.t * 1.6 + e.seed) * 120;
          e.y += e.vy * dt;
          e.fireCd -= dt;
          if (e.fireCd <= 0 && e.y > 20 && e.y < h * 0.6) {
            e.fireCd = rand(1.4, 2.4);
            const a = Math.atan2(s.ship.y - e.y, s.ship.x - e.x);
            s.shots.push({ x: e.x, y: e.y + 10, vx: Math.cos(a) * 230, vy: Math.sin(a) * 230, enemy: true });
          }
        } else if (e.kind === "jelly") {
          e.x = e.baseX + Math.sin(e.t * 2.2 + e.seed) * 50;
          e.y += e.vy * (0.6 + 0.6 * Math.max(0, Math.sin(e.t * 3))) * dt * 1.6;
        } else if (e.kind === "boss") {
          e.y += (70 - e.y) * dt * 1.2;
          e.x = w / 2 + Math.sin(e.t * 0.7) * (w * 0.32);
          e.fireCd -= dt;
          if (e.fireCd <= 0 && e.y > 40) {
            e.fireCd = Math.max(0.9, 1.8 - s.wave * 0.08);
            for (let k = -2; k <= 2; k++) {
              const a = Math.PI / 2 + k * 0.22;
              s.shots.push({ x: e.x, y: e.y + 30, vx: Math.cos(a) * 210, vy: Math.sin(a) * 210, enemy: true });
            }
          }
        } else {
          e.x += e.vx * dt;
          e.y += e.vy * dt;
          if (e.kind !== "comet" && (e.x < e.r || e.x > w - e.r)) e.vx *= -1;
        }
        // black hole gravity: pull and swallow
        if (s.hole && e.kind !== "boss") {
          const dx = s.hole.x - e.x;
          const dy = s.hole.y - e.y;
          const d = Math.max(20, Math.hypot(dx, dy));
          const f = 90000 / (d * d);
          e.x += (dx / d) * f * dt * 3;
          e.y += (dy / d) * f * dt * 3;
          if (d < 28) {
            s.score += 25;
            popup(e.x, e.y, "+25", "196,181,253");
            burst(e.x, e.y, "rgba(168,85,247,1)", 10, 80);
            e.hp = 0;
          }
        }
      }

      // player shots hit enemies / astronauts
      for (const b of s.shots) {
        if (b.enemy || b.y < -20) continue;
        for (const e of s.enemies) {
          if (e.hp <= 0) continue;
          const rr = e.kind === "boss" ? e.r * 0.85 : e.r;
          if ((b.x - e.x) ** 2 + ((b.y - e.y) * (e.kind === "ufo" || e.kind === "boss" ? 1.6 : 1)) ** 2 < rr * rr) {
            burst(b.x, b.y, "rgba(147,197,253,1)", 4, 90, 1.5);
            b.y = -999;
            e.hp -= 1;
            e.flash = 1;
            if (e.hp <= 0) destroy(e, true);
            break;
          }
        }
      }
      s.enemies = s.enemies.filter((e) => e.hp > 0 && e.y < h + e.r + 40 && e.x > -120 && e.x < w + 120);

      // pickups + rescue
      for (const p of s.pickups) {
        p.t += dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.kind === "astro") p.vy += (70 - p.vy) * dt;
        if ((p.x - s.ship.x) ** 2 + (p.y - s.ship.y) ** 2 < 34 * 34) {
          const col = p.kind === "core" ? "250,204,21" : p.kind === "plasma" ? "168,85,247" : "255,255,255";
          burst(p.x, p.y, `rgba(${col},1)`, 26, 170);
          ring(p.x, p.y, 70, col);
          if (p.kind === "core") {
            s.score += 150;
            s.shield = 3.5;
            popup(p.x, p.y - 10, { en: "SHIELD +150", es: "ESCUDO +150" }, col);
          } else if (p.kind === "plasma") {
            s.triple = 8;
            popup(p.x, p.y - 10, { en: "TRIPLE SHOT", es: "DISPARO TRIPLE" }, col);
          } else {
            s.score += 300;
            s.rescued += 1;
            if (s.lives < 3 && s.rescued % 3 === 0) {
              s.lives += 1;
              popup(p.x, p.y - 26, { en: "+1 HULL", es: "+1 CASCO" }, "96,165,250");
            }
            popup(p.x, p.y - 10, { en: "ASTRONAUT RESCUED +300", es: "ASTRONAUTA RESCATADO +300" }, "191,219,254");
          }
          p.y = h + 999;
        }
      }
      s.pickups = s.pickups.filter((p) => p.y < h + 40);

      // collisions with the ship
      const shielded = s.shield > 0;
      if (s.hurt <= 0) {
        for (const b of s.shots) {
          if (!b.enemy) continue;
          if ((b.x - s.ship.x) ** 2 + (b.y - s.ship.y) ** 2 < (shielded ? 32 : 13) ** 2) {
            b.y = h + 999;
            if (shielded) burst(b.x, b.y, "rgba(250,204,21,1)", 8, 100);
            else {
              hitPlayer();
              break;
            }
          }
        }
        if (s.phase === "playing") {
          for (const e of s.enemies) {
            const rr = e.kind === "boss" ? e.r * 0.8 : e.r;
            if ((e.x - s.ship.x) ** 2 + (e.y - s.ship.y) ** 2 < (rr + (shielded ? 30 : 13)) ** 2) {
              if (shielded && e.kind !== "boss") destroy(e, true);
              else if (!shielded) {
                if (e.kind !== "boss") destroy(e, false);
                hitPlayer();
                break;
              }
            }
          }
          s.enemies = s.enemies.filter((e) => e.hp > 0);
        }
      }

      s.score += dt * 6;
      s.hudT += dt;
      if (s.hudT > 0.2) {
        s.hudT = 0;
        hud();
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
    if (s.particles.length > 900) s.particles.splice(0, s.particles.length - 900);
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
    s.banner = Math.max(0, s.banner - dt);
  };

  /* ---------------- drawing: objects ---------------- */
  const drawRock = (e: Enemy) => {
    ctx.save();
    ctx.translate(e.x, e.y);
    ctx.rotate(e.rot);
    ctx.beginPath();
    e.shape.forEach((k, i) => {
      const a = (i / e.shape.length) * Math.PI * 2;
      ctx.lineTo(Math.cos(a) * e.r * k, Math.sin(a) * e.r * k);
    });
    ctx.closePath();
    const g = ctx.createRadialGradient(-e.r * 0.35, -e.r * 0.4, e.r * 0.1, 0, 0, e.r * 1.1);
    g.addColorStop(0, "#5b6578");
    g.addColorStop(0.55, "#262d3b");
    g.addColorStop(1, "#0b0e15");
    ctx.fillStyle = g;
    ctx.fill();
    ctx.save();
    ctx.clip();
    for (const [cx, cy, cr] of e.craters) {
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
    ctx.shadowColor = "rgba(59,130,246,0.8)";
    ctx.shadowBlur = 10;
    ctx.strokeStyle = `rgba(96,165,250,${0.55 + e.flash * 0.45})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.shadowBlur = 0;
    if (e.flash > 0) {
      ctx.fillStyle = `rgba(219,234,254,${e.flash * 0.45})`;
      ctx.fill();
    }
    ctx.restore();
  };

  const drawUfo = (e: Enemy, scale = 1) => {
    ctx.save();
    ctx.translate(e.x, e.y);
    ctx.scale(scale, scale);
    ctx.rotate(Math.sin(e.t * 3) * 0.08);
    // beam glow under the saucer
    ctx.globalCompositeOperation = "lighter";
    const beam = ctx.createLinearGradient(0, 4, 0, 46);
    beam.addColorStop(0, "rgba(34,211,238,0.35)");
    beam.addColorStop(1, "rgba(34,211,238,0)");
    ctx.fillStyle = beam;
    ctx.beginPath();
    ctx.moveTo(-8, 4);
    ctx.lineTo(8, 4);
    ctx.lineTo(18, 46);
    ctx.lineTo(-18, 46);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
    // dome
    const dome = ctx.createRadialGradient(-4, -12, 1, 0, -6, 14);
    dome.addColorStop(0, "rgba(224,255,255,0.95)");
    dome.addColorStop(1, "rgba(34,211,238,0.35)");
    ctx.fillStyle = dome;
    ctx.beginPath();
    ctx.ellipse(0, -5, 11, 10, 0, Math.PI, 0);
    ctx.fill();
    // hull
    const hull = ctx.createLinearGradient(0, -6, 0, 8);
    hull.addColorStop(0, e.flash > 0 ? "#ffffff" : "#c7d2fe");
    hull.addColorStop(0.5, "#475569");
    hull.addColorStop(1, "#0f172a");
    ctx.fillStyle = hull;
    ctx.beginPath();
    ctx.ellipse(0, 0, 26, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(34,211,238,0.7)";
    ctx.lineWidth = 1;
    ctx.stroke();
    // lights
    for (let i = 0; i < 6; i++) {
      const on = Math.floor(e.t * 8 + i) % 3 === 0;
      ctx.fillStyle = on ? "#facc15" : "#22d3ee";
      ctx.beginPath();
      ctx.arc(-18 + i * 7.2, 2, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  };

  const drawComet = (e: Enemy) => {
    const sp = Math.hypot(e.vx, e.vy);
    const ux = e.vx / sp;
    const uy = e.vy / sp;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    const L = 120;
    const tg = ctx.createLinearGradient(e.x, e.y, e.x - ux * L, e.y - uy * L);
    tg.addColorStop(0, "rgba(191,219,254,0.9)");
    tg.addColorStop(0.3, "rgba(56,189,248,0.4)");
    tg.addColorStop(1, "rgba(59,130,246,0)");
    ctx.fillStyle = tg;
    ctx.beginPath();
    const nx = -uy;
    const ny = ux;
    ctx.moveTo(e.x + nx * e.r, e.y + ny * e.r);
    ctx.lineTo(e.x - ux * L + nx * 3, e.y - uy * L + ny * 3);
    ctx.lineTo(e.x - ux * L - nx * 3, e.y - uy * L - ny * 3);
    ctx.lineTo(e.x - nx * e.r, e.y - ny * e.r);
    ctx.fill();
    const core = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r * 2.2);
    core.addColorStop(0, "rgba(255,255,255,1)");
    core.addColorStop(0.35, "rgba(147,197,253,0.9)");
    core.addColorStop(1, "rgba(59,130,246,0)");
    ctx.fillStyle = core;
    ctx.beginPath();
    ctx.arc(e.x, e.y, e.r * 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const drawJelly = (e: Enemy) => {
    ctx.save();
    ctx.translate(e.x, e.y);
    const pulse = 1 + Math.sin(e.t * 6) * 0.08;
    ctx.globalCompositeOperation = "lighter";
    // tentacles
    ctx.lineWidth = 2;
    for (let i = 0; i < 5; i++) {
      const x0 = -12 + i * 6;
      ctx.strokeStyle = `rgba(236,72,153,${0.45 - i * 0.03})`;
      ctx.beginPath();
      ctx.moveTo(x0, 4);
      for (let k = 1; k <= 6; k++) ctx.lineTo(x0 + Math.sin(e.t * 5 + i + k) * 4, 4 + k * 6);
      ctx.stroke();
    }
    const halo = ctx.createRadialGradient(0, -2, 0, 0, -2, 34);
    halo.addColorStop(0, "rgba(236,72,153,0.4)");
    halo.addColorStop(1, "rgba(236,72,153,0)");
    ctx.fillStyle = halo;
    ctx.fillRect(-34, -36, 68, 68);
    ctx.globalCompositeOperation = "source-over";
    const bell = ctx.createRadialGradient(-5, -10, 2, 0, -2, 22);
    bell.addColorStop(0, e.flash > 0 ? "rgba(255,255,255,0.95)" : "rgba(251,207,232,0.9)");
    bell.addColorStop(0.6, "rgba(236,72,153,0.55)");
    bell.addColorStop(1, "rgba(168,85,247,0.25)");
    ctx.fillStyle = bell;
    ctx.beginPath();
    ctx.ellipse(0, 0, 20 * pulse, 17 / pulse, 0, Math.PI, 0);
    ctx.quadraticCurveTo(10, 8, 0, 5);
    ctx.quadraticCurveTo(-10, 8, -20 * pulse, 0);
    ctx.fill();
    ctx.restore();
  };

  const drawSat = (e: Enemy) => {
    ctx.save();
    ctx.translate(e.x, e.y);
    ctx.rotate(e.rot);
    // panels
    for (const side of [-1, 1]) {
      ctx.fillStyle = "#1e3a8a";
      ctx.fillRect(side > 0 ? 8 : -30, -7, 22, 14);
      ctx.strokeStyle = "rgba(147,197,253,0.8)";
      ctx.lineWidth = 0.8;
      ctx.strokeRect(side > 0 ? 8 : -30, -7, 22, 14);
      ctx.beginPath();
      for (let k = 1; k < 4; k++) {
        const x = (side > 0 ? 8 : -30) + k * 5.5;
        ctx.moveTo(x, -7);
        ctx.lineTo(x, 7);
      }
      ctx.moveTo(side > 0 ? 8 : -30, 0);
      ctx.lineTo(side > 0 ? 30 : -8, 0);
      ctx.stroke();
    }
    // body (gold foil)
    const body = ctx.createLinearGradient(-8, -9, 8, 9);
    body.addColorStop(0, e.flash > 0 ? "#ffffff" : "#fde68a");
    body.addColorStop(1, "#a16207");
    ctx.fillStyle = body;
    ctx.fillRect(-8, -9, 16, 18);
    // dish
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(0, -14, 6, Math.PI * 0.1, Math.PI * 0.9);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -9);
    ctx.lineTo(0, -14);
    ctx.stroke();
    const blink = Math.sin(e.t * 8) > 0.6;
    ctx.fillStyle = blink ? "#ef4444" : "#7f1d1d";
    ctx.beginPath();
    ctx.arc(0, 4, 1.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const drawBoss = (e: Enemy) => {
    ctx.save();
    ctx.translate(e.x, e.y);
    ctx.globalCompositeOperation = "lighter";
    const aura = ctx.createRadialGradient(0, 0, 20, 0, 0, 120);
    aura.addColorStop(0, "rgba(168,85,247,0.35)");
    aura.addColorStop(1, "rgba(168,85,247,0)");
    ctx.fillStyle = aura;
    ctx.fillRect(-120, -120, 240, 240);
    ctx.globalCompositeOperation = "source-over";
    // rotating ring
    ctx.save();
    ctx.rotate(e.t * 0.8);
    ctx.strokeStyle = "rgba(196,181,253,0.6)";
    ctx.setLineDash([10, 8]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(0, 0, 92, 30, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
    // hull
    const hull = ctx.createLinearGradient(0, -30, 0, 26);
    hull.addColorStop(0, e.flash > 0 ? "#ffffff" : "#e9d5ff");
    hull.addColorStop(0.4, "#6d28d9");
    hull.addColorStop(1, "#1e1b4b");
    ctx.fillStyle = hull;
    ctx.beginPath();
    ctx.ellipse(0, 0, 80, 22, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(216,180,254,0.9)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    // dome + eye
    const dome = ctx.createRadialGradient(-8, -26, 2, 0, -14, 34);
    dome.addColorStop(0, "rgba(255,255,255,0.95)");
    dome.addColorStop(1, "rgba(168,85,247,0.4)");
    ctx.fillStyle = dome;
    ctx.beginPath();
    ctx.ellipse(0, -10, 34, 26, 0, Math.PI, 0);
    ctx.fill();
    const eye = 6 + Math.sin(e.t * 4) * 2;
    ctx.fillStyle = "#ec4899";
    ctx.shadowColor = "#ec4899";
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(0, -16, eye, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    // lights
    for (let i = 0; i < 12; i++) {
      const on = Math.floor(e.t * 10 + i) % 4 === 0;
      ctx.fillStyle = on ? "#facc15" : "#a855f7";
      ctx.beginPath();
      ctx.arc(-66 + i * 12, 6, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  };

  const drawAstro = (p: Pickup) => {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(Math.sin(p.t * 1.5) * 0.6 + p.t * 0.4);
    ctx.globalCompositeOperation = "lighter";
    const halo = ctx.createRadialGradient(0, 0, 0, 0, 0, 30);
    halo.addColorStop(0, "rgba(191,219,254,0.35)");
    halo.addColorStop(1, "rgba(191,219,254,0)");
    ctx.fillStyle = halo;
    ctx.fillRect(-30, -30, 60, 60);
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#f1f5f9";
    // backpack
    ctx.fillStyle = "#cbd5e1";
    ctx.fillRect(-7, -6, 14, 12);
    // body + limbs
    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.ellipse(0, 2, 6, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineCap = "round";
    ctx.strokeStyle = "#f8fafc";
    ctx.lineWidth = 3.5;
    const wave = Math.sin(p.t * 6) * 0.5;
    ctx.beginPath();
    ctx.moveTo(-5, -1);
    ctx.lineTo(-11, -7 + wave * 6);
    ctx.moveTo(5, -1);
    ctx.lineTo(11, -4 - wave * 6);
    ctx.moveTo(-3, 9);
    ctx.lineTo(-5, 15);
    ctx.moveTo(3, 9);
    ctx.lineTo(5, 15);
    ctx.stroke();
    // helmet + visor
    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.arc(0, -9, 6, 0, Math.PI * 2);
    ctx.fill();
    const visor = ctx.createLinearGradient(-4, -12, 4, -6);
    visor.addColorStop(0, "#60a5fa");
    visor.addColorStop(1, "#1e3a8a");
    ctx.fillStyle = visor;
    ctx.beginPath();
    ctx.ellipse(0.5, -9, 4, 3.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    // SOS tag (unrotated)
    if (Math.floor(p.t * 3) % 2 === 0) {
      ctx.font = "700 9px ui-monospace, Menlo, monospace";
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(191,219,254,0.95)";
      ctx.fillText("SOS", p.x, p.y - 22);
    }
  };

  const drawHole = (hole: NonNullable<Hole>) => {
    const grow = Math.min(1, hole.t / 0.8, (hole.dur - hole.t) / 0.8);
    const R = 70 * grow;
    if (R <= 1) return;
    ctx.save();
    ctx.translate(hole.x, hole.y);
    ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < 3; i++) {
      ctx.save();
      ctx.rotate(hole.t * (1.2 + i * 0.5));
      ctx.scale(1, 0.42);
      const g = ctx.createRadialGradient(0, 0, R * 0.35, 0, 0, R * (1.3 + i * 0.25));
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(0.5, i === 1 ? "rgba(236,72,153,0.35)" : "rgba(168,85,247,0.45)");
      g.addColorStop(0.75, "rgba(59,130,246,0.25)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(0, 0, R * (1.3 + i * 0.25), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#000";
    ctx.shadowColor = "rgba(168,85,247,1)";
    ctx.shadowBlur = 30;
    ctx.beginPath();
    ctx.arc(0, 0, R * 0.38, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(233,213,255,0.9)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
  };

  const drawShip = () => {
    const { x, y, vx } = s.ship;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.max(-0.38, Math.min(0.38, vx / 1500)));
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
    ctx.fillStyle = "#0b1b3f";
    ctx.beginPath();
    ctx.ellipse(0, -6, 3, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(147,197,253,0.9)";
    ctx.fillRect(-1, -11, 1.5, 5);
    const blink = Math.sin(performance.now() / 160) > 0;
    ctx.fillStyle = blink ? "#f472b6" : "#4b1d3a";
    ctx.fillRect(-21, 11, 3, 3);
    ctx.fillStyle = blink ? "#4ade80" : "#14532d";
    ctx.fillRect(18, 11, 3, 3);
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
  };

  /* ---------------- drawing: frame ---------------- */
  const draw = () => {
    const { w, h } = s;
    const playing = s.phase === "playing";
    const speedUp = playing ? Math.min(1.8, 1 + s.time / 60) : 0.5;
    ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
    if (s.bg) ctx.drawImage(s.bg, 0, 0, w, h);
    ctx.save();
    ctx.translate((Math.random() - 0.5) * s.shake, (Math.random() - 0.5) * s.shake);

    // grid floor
    const hz = h * 0.62;
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

    for (const st of s.stars) {
      const len = 1 + st.z * (playing ? Math.min(4.5, 3 * speedUp) : 1.5);
      ctx.fillStyle = `rgba(${st.z > 0.75 ? "191,219,254" : "255,255,255"},${0.2 + st.z * 0.7})`;
      ctx.fillRect(st.x, st.y, st.z > 0.85 ? 2 : 1, len);
    }

    if (s.hole) drawHole(s.hole);

    // pickups
    ctx.globalCompositeOperation = "lighter";
    for (const p of s.pickups) {
      if (p.kind === "astro") continue;
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
    ctx.globalCompositeOperation = "source-over";
    for (const p of s.pickups) if (p.kind === "astro") drawAstro(p);

    // shots
    ctx.globalCompositeOperation = "lighter";
    for (const b of s.shots) {
      if (b.enemy) {
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, 10);
        g.addColorStop(0, "rgba(255,255,255,1)");
        g.addColorStop(0.35, "rgba(236,72,153,0.9)");
        g.addColorStop(1, "rgba(236,72,153,0)");
        ctx.fillStyle = g;
        ctx.fillRect(b.x - 10, b.y - 10, 20, 20);
        continue;
      }
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

    // enemies
    for (const e of s.enemies) {
      if (e.kind === "rock") drawRock(e);
      else if (e.kind === "ufo") drawUfo(e);
      else if (e.kind === "comet") drawComet(e);
      else if (e.kind === "jelly") drawJelly(e);
      else if (e.kind === "sat") drawSat(e);
      else drawBoss(e);
    }

    if (s.phase !== "over" && !(s.hurt > 0 && Math.floor(s.hurt * 14) % 2 === 0)) drawShip();

    // effects
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
    for (const p of s.popups) {
      ctx.font = p.big ? "800 22px ui-monospace, Menlo, monospace" : "700 12px ui-monospace, Menlo, monospace";
      ctx.fillStyle = `rgba(${p.color},${Math.min(1, p.life * 1.5)})`;
      ctx.fillText(txt(p.text), p.x, p.y);
    }
    ctx.restore();

    if (s.flash > 0) {
      ctx.fillStyle = `rgba(236,72,153,${s.flash * 0.25})`;
      ctx.fillRect(0, 0, w, h);
    }

    // wave / event banner
    if (s.banner > 0 && s.phase === "playing") {
      const a = Math.min(1, s.banner * 2, (2.4 - s.banner) * 4);
      ctx.save();
      ctx.globalAlpha = Math.max(0, a);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const bw = Math.min(w - 40, 520);
      const grad = ctx.createLinearGradient(w / 2 - bw / 2, 0, w / 2 + bw / 2, 0);
      grad.addColorStop(0, "rgba(59,130,246,0)");
      grad.addColorStop(0.5, "rgba(59,130,246,0.28)");
      grad.addColorStop(1, "rgba(59,130,246,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(w / 2 - bw / 2, h * 0.3 - 26, bw, 52);
      ctx.font = "700 18px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.shadowColor = "rgba(59,130,246,1)";
      ctx.shadowBlur = 18;
      const banner = txt(s.bannerText);
      // longer (e.g. Spanish) banners shrink to fit narrow screens
      const fit = ctx.measureText(banner).width;
      if (fit > bw - 16) ctx.font = `700 ${Math.max(11, Math.floor((18 * (bw - 16)) / fit))}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.fillStyle = banner.startsWith("⚠") ? "#f0abfc" : "#e0ecff";
      ctx.fillText(banner, w / 2, h * 0.3);
      ctx.restore();
    }

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
      ctx.fillText(n > 0 ? String(n) : txt({ en: "GO", es: "¡YA!" }), w / 2, h * 0.42);
      ctx.restore();
    }
  };

  /* ---------------- loop ---------------- */
  let last = performance.now();
  let raf = 0;
  let visT = 0;
  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min((now - last) / 1000, 0.033);
    last = now;
    visT -= dt;
    if (visT <= 0) {
      visT = 0.25;
      const r = canvas.getBoundingClientRect();
      s.visible = r.bottom > 0 && r.top < window.innerHeight;
    }
    if (!s.visible) return;
    update(dt);
    draw();
  };
  raf = requestAnimationFrame(frame);

  return {
    resize,
    start,
    setTarget: (x: number) => {
      s.ship.tx = x;
    },
    setKey: (key: "left" | "right", down: boolean) => {
      s.keys[key] = down;
    },
    isLive: () => s.phase === "playing" || s.phase === "countdown",
    destroy: () => cancelAnimationFrame(raf),
    debug: s,
  };
}
