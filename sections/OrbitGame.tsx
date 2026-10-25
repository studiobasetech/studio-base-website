"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Cpu, Gauge, Play, RotateCcw, Shield, Trophy, Zap } from "lucide-react";
import { LightSweep, ShimmerText } from "@/components/Effects";
import { consultationHref } from "@/data/site";
import type { createGame, HudState, Phase } from "./orbit/engine3d";
import { useLang } from "@/lib/i18n";

/* ------------------------------------------------------------------ */
/*  ORBIT DEFENSE — Home "Interactive Lab". The game itself lives in   */
/*  sections/orbit/engine3d.ts; this file is the console + HUD around it.*/
/* ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as const;
const BEST_KEY = "sb-orbit-best";

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
  const { tr, lang } = useLang();
  // the game engine reads this on every frame, so canvas text follows the language switch
  const langRef = useRef(lang);
  useEffect(() => {
    langRef.current = lang;
  }, [lang]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const game = useRef<ReturnType<typeof createGame> | null>(null);
  const [phase, setPhase] = useState<Phase>("ready");
  const [hud, setHud] = useState<HudState>({ score: 0, lives: 3, wave: 1, mult: 1, shield: false, triple: 0, boss: null, rescued: 0 });
  const [best, setBest] = useState(0);
  const [final, setFinal] = useState(0);

  useEffect(() => {
    const c = canvasRef.current;
    const wrap = wrapRef.current;
    if (!c || !wrap) return;
    // three.js is loaded on demand so it never weighs down the first paint of the home page
    let gm: ReturnType<typeof createGame> | null = null;
    let cancelled = false;
    let ro: ResizeObserver | null = null;
    const key = (down: boolean) => (e: KeyboardEvent) => {
      if (!gm || !gm.isLive()) return;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        gm.setKey("left", down);
        e.preventDefault();
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        gm.setKey("right", down);
        e.preventDefault();
      }
    };
    const kd = key(true);
    const ku = key(false);
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);
    import("./orbit/engine3d").then(({ createGame: create }) => {
      if (cancelled) return;
      const g = create(c, {
        onHud: setHud,
        onPhase: setPhase,
        getLang: () => langRef.current,
        onOver: (score) => {
          const prev = readBest();
          if (score > prev) saveBest(score);
          setBest(Math.max(prev, score));
          setFinal(score);
          setPhase("over");
        },
      });
      gm = g;
      game.current = g;
      const fit = () => g.resize(wrap.clientWidth, wrap.clientHeight);
      fit();
      setBest(readBest());
      ro = new ResizeObserver(fit);
      ro.observe(wrap);
    });
    return () => {
      cancelled = true;
      gm?.destroy();
      game.current = null;
      ro?.disconnect();
      window.removeEventListener("keydown", kd);
      window.removeEventListener("keyup", ku);
    };
  }, []);

  const start = useCallback(() => {
    game.current?.start();
    canvasRef.current?.focus({ preventScroll: true });
  }, []);

  const onPointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    game.current?.setTarget(e.clientX - r.left);
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
            {tr("INTERACTIVE LAB", "LABORATORIO INTERACTIVO")}
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-medium leading-tight text-white md:text-5xl">
            {tr("Built to Engage.", "Diseñado para atraparte.")}{" "}
            <ShimmerText>{tr("Play the Mission.", "Juega la misión.")}</ShimmerText>
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
            {tr(
              "A real-time game engineered by our team and running entirely in your browser. The same craft, performance and attention to detail we bring to every platform we build.",
              "Un juego en tiempo real creado por nuestro equipo que funciona por completo en tu navegador. El mismo oficio, rendimiento y atención al detalle que ponemos en cada plataforma que construimos.",
            )}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-6 flex flex-wrap justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-zinc-400">
            {[
              { icon: Gauge, t: tr("Real-time 3D", "3D en tiempo real") },
              { icon: Cpu, t: tr("Zero downloads", "Sin descargas") },
              { icon: Zap, t: tr("Any device", "Cualquier dispositivo") },
            ].map(({ icon: Icon, t }, k) => (
              <span key={k} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
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
              <span className="flex items-center gap-3 whitespace-nowrap font-mono text-[10px] tracking-[0.3em] text-zinc-400">
                <span className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-pink-500/80" />
                  <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
                  <span className="h-2 w-2 rounded-full bg-blue-500/80" />
                </span>
                {tr("ORBIT DEFENSE", "DEFENSA ORBITAL")}
                <span className="-ml-3 hidden sm:inline">&nbsp;· SB-01</span>
              </span>
              <span className="flex items-center gap-2 whitespace-nowrap font-mono text-[10px] tracking-[0.25em] text-zinc-400">
                <motion.span
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className={`h-1.5 w-1.5 rounded-full ${live ? "bg-green-400 shadow-[0_0_8px_#4ade80]" : "bg-blue-400 shadow-[0_0_8px_#60a5fa]"}`}
                />
                {live ? tr("MISSION LIVE", "EN VIVO") : tr("SYSTEMS ONLINE", "EN LÍNEA")}
              </span>
            </div>

            <div ref={wrapRef} className="relative h-[480px] w-full sm:h-[560px] lg:h-[620px]">
              <canvas
                ref={canvasRef}
                tabIndex={0}
                aria-label={tr("Orbit Defense game", "Juego Defensa Orbital")}
                onPointerMove={onPointer}
                onPointerDown={onPointer}
                className={`absolute inset-0 h-full w-full outline-none ${live ? "cursor-crosshair touch-none" : ""}`}
              />

              {/* cinematic vignette */}
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.6)]" />

              {/* HUD corners */}
              <Corner className="left-4 top-4 border-l-2 border-t-2" />
              <Corner className="right-4 top-4 border-r-2 border-t-2" />
              <Corner className="bottom-4 left-4 border-b-2 border-l-2" />
              <Corner className="bottom-4 right-4 border-b-2 border-r-2" />

              {/* live HUD */}
              {live && (
                <>
                  <div className="pointer-events-none absolute left-8 top-7 rounded-lg border border-blue-400/25 bg-black/40 px-4 py-2 backdrop-blur-md">
                    <p className="font-mono text-[9px] tracking-[0.3em] text-blue-300/80">{tr("SCORE", "PUNTOS")}</p>
                    <p className="font-mono text-2xl font-semibold tabular-nums text-white">{String(hud.score).padStart(6, "0")}</p>
                  </div>
                  <div className="pointer-events-none absolute right-8 top-7 flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 rounded-lg border border-blue-400/25 bg-black/40 px-3 py-2 backdrop-blur-md">
                      <span className="font-mono text-[9px] tracking-[0.3em] text-blue-300/80">{tr("HULL", "CASCO")}</span>
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className={`h-2.5 w-5 rounded-sm transition-colors ${i < hud.lives ? "bg-blue-500 shadow-[0_0_10px_#3b82f6]" : "bg-white/10"}`}
                        />
                      ))}
                    </div>
                    <div className="flex gap-2 font-mono text-[10px] tracking-[0.2em]">
                      <span className="rounded-md border border-white/10 bg-black/40 px-2 py-1 text-zinc-300 backdrop-blur-md">{tr("WAVE", "OLEADA")} {hud.wave}</span>
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
                  {hud.boss !== null && (
                    <div className="pointer-events-none absolute left-1/2 top-7 w-[min(60%,420px)] -translate-x-1/2">
                      <p className="mb-1 text-center font-mono text-[9px] tracking-[0.35em] text-purple-200">{tr("MOTHERSHIP", "NAVE NODRIZA")}</p>
                      <div className="h-2 overflow-hidden rounded-full border border-purple-400/40 bg-black/50">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-[0_0_12px_#a855f7] transition-[width] duration-200"
                          style={{ width: `${hud.boss * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                  <div className="pointer-events-none absolute bottom-7 left-8 flex gap-2 font-mono text-[10px] tracking-[0.2em]">
                    {hud.rescued > 0 && (
                      <span className="rounded-md border border-white/20 bg-black/40 px-2 py-1 text-zinc-200 backdrop-blur-md">
                        {tr("CREW RESCUED", "TRIPULANTES RESCATADOS")} {hud.rescued}
                      </span>
                    )}
                    {hud.shield && (
                      <span className="flex items-center gap-1.5 rounded-md border border-yellow-400/40 bg-black/40 px-2 py-1 text-yellow-200 backdrop-blur-md">
                        <Shield size={11} /> {tr("SHIELD", "ESCUDO")}
                      </span>
                    )}
                    {hud.triple > 0 && (
                      <span className="rounded-md border border-purple-400/40 bg-black/40 px-2 py-1 text-purple-200 backdrop-blur-md">
                        {tr("TRIPLE SHOT", "DISPARO TRIPLE")} {hud.triple.toFixed(1)}s
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
                        {tr("▸ READY FOR LAUNCH", "▸ LISTOS PARA EL DESPEGUE")}
                      </motion.p>
                      <h3 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">
                        {lang === "es" ? (
                          <>
                            DEFENSA <ShimmerText>ORBITAL</ShimmerText>
                          </>
                        ) : (
                          <>
                            ORBIT <ShimmerText>DEFENSE</ShimmerText>
                          </>
                        )}
                      </h3>
                      <p className="mt-3 max-w-md text-sm text-zinc-400">
                        {tr(
                          "Pilot your starfighter through asteroid fields and enemy drone patrols, rescue stranded crew, survive each wave and take down the Mothership.",
                          "Pilotea tu caza estelar entre campos de asteroides y patrullas de drones enemigos, rescata a la tripulación varada, sobrevive cada oleada y derriba la nave nodriza.",
                        )}
                      </p>
                      <div className="mt-6 hidden max-w-lg grid-cols-3 gap-3 text-left sm:grid">
                        {[
                          { k: tr("STEER", "CONTROL"), v: tr("Mouse · touch · ← →", "Mouse · táctil · ← →") },
                          { k: tr("RESCUE", "RESCATE"), v: tr("Fly into escape pods +300", "Recoge cápsulas de escape +300") },
                          { k: tr("POWER", "PODER"), v: tr("Yellow shield · purple triple shot", "Escudo amarillo · disparo triple morado") },
                        ].map((x, k) => (
                          <div key={k} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 backdrop-blur-sm">
                            <p className="font-mono text-[9px] tracking-[0.3em] text-blue-300/80">{x.k}</p>
                            <p className="mt-1 text-[11px] text-zinc-300">{x.v}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="font-mono text-[10px] tracking-[0.5em] text-pink-300">{tr("MISSION REPORT", "INFORME DE MISIÓN")}</p>
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
                        {final >= best && final > 0
                          ? tr("New personal best", "Nuevo récord personal")
                          : tr(`Best ${best}`, `Récord ${best}`)}
                      </p>
                      <p className="mt-6 max-w-sm text-sm text-zinc-300">
                        {tr("Imagine what we could build for your business.", "Imagina lo que podríamos construir para tu negocio.")}
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
                      <span className="relative">{phase === "ready" ? tr("Start Mission", "Iniciar misión") : tr("Play Again", "Jugar de nuevo")}</span>
                    </motion.button>
                    {phase === "over" && (
                      <Link
                        href={consultationHref}
                        className="group inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-blue-400 hover:text-blue-300"
                      >
                        {tr("Book a Consultation", "Agenda una consulta")}
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
          <p className="mt-4 flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.25em] text-zinc-400">
            <Trophy size={12} className="text-yellow-300/80" /> {tr("YOUR BEST:", "TU RÉCORD:")} <span className="text-zinc-200">{best}</span>
          </p>
        )}
      </div>
    </section>
  );
}
