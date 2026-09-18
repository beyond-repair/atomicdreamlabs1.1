import { useEffect, useRef, useState } from "react";
import { heroSprite } from "@/lib/nexus/arcade";
import { CREW_FILTER } from "@/lib/nexus/crew";
import type { RoleId } from "@/lib/nexus/types";
import { useNexus } from "@/lib/nexus/store";
import { beep } from "./beep";
import { bindCanvas, blitHero, loadHero, runLoop } from "./canvas";

const COLS = 12;
const ROWS = 8;
const INK = "#111110";
const CREAM = "#e6e1d6";
const GOLD = "#c5c0b4";
const OK = "#5d8f76";
const DANGER = "#b85c4a";
const WOOD = "#23211e";
const COST = 20;
const RANGE2 = 0.09;

const PATH: Array<[number, number]> = [
  [0, 4],
  [1, 4],
  [2, 4],
  [3, 4],
  [3, 3],
  [3, 2],
  [4, 2],
  [5, 2],
  [6, 2],
  [7, 2],
  [7, 3],
  [7, 4],
  [7, 5],
  [8, 5],
  [9, 5],
  [10, 5],
  [11, 5],
];

const PATH_SET = new Set(PATH.map(([c, r]) => `${c},${r}`));

const WAVES = [
  { n: 4, hp: 3, spd: 0.38, gap: 0.72 },
  { n: 6, hp: 4, spd: 0.42, gap: 0.58 },
  { n: 8, hp: 5, spd: 0.46, gap: 0.5 },
  { n: 8, hp: 7, spd: 0.5, gap: 0.46 },
  { n: 10, hp: 8, spd: 0.54, gap: 0.4 },
  { n: 12, hp: 10, spd: 0.58, gap: 0.36 },
];

type Mob = { i: number; hp: number; max: number; spd: number };
type Shot = { x: number; y: number; tx: number; ty: number; life: number };
type Tower = { c: number; r: number; cool: number };

function along(i: number) {
  const a = PATH[Math.max(0, Math.min(PATH.length - 1, Math.floor(i)))];
  const b = PATH[Math.max(0, Math.min(PATH.length - 1, Math.floor(i) + 1))];
  const t = i - Math.floor(i);
  return { x: (a[0] + (b[0] - a[0]) * t + 0.5) / COLS, y: (a[1] + (b[1] - a[1]) * t + 0.5) / ROWS };
}

export function HoldGame({ hero = "qa", onHi }: { hero?: RoleId; onHi?: (n: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const addGold = useNexus((s) => s.addGold);
  const goldRef = useRef(addGold);
  goldRef.current = addGold;
  const hiRef = useRef(onHi);
  hiRef.current = onHi;
  const [hud, setHud] = useState({ gold: 60, lives: 8, wave: 0, state: "ready", score: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const bound = bindCanvas(canvas);
    if (!bound) return;
    const { ctx, size, disconnect } = bound;
    const heroImg = loadHero(heroSprite(hero));
    const towers: Tower[] = [];
    const mobs: Mob[] = [];
    const shots: Shot[] = [];
    let purse = 60;
    let lives = 8;
    let wave = 0;
    let score = 0;
    let spawnLeft = 0;
    let spawnGap = 0;
    let spawnHp = 3;
    let spawnSpd = 0.38;
    let state: "ready" | "build" | "wave" | "win" | "lose" = "ready";
    let hi = Number(localStorage.getItem(`nexus-hold-hi-${hero}`) || 0);
    let lastHud = "";

    function reset() {
      towers.length = 0;
      mobs.length = 0;
      shots.length = 0;
      purse = 60;
      lives = 8;
      wave = 0;
      score = 0;
      spawnLeft = 0;
      spawnGap = 0;
      state = "ready";
    }

    function startWave() {
      if (state === "win" || state === "lose") reset();
      if (state === "ready") state = "build";
      if (state !== "build" || wave >= WAVES.length) return;
      const w = WAVES[wave];
      wave += 1;
      spawnLeft = w.n;
      spawnGap = 0;
      spawnHp = w.hp;
      spawnSpd = w.spd;
      state = "wave";
    }

    function cellAt(px: number, py: number) {
      const c = Math.floor((px / size.w) * COLS);
      const r = Math.floor((py / size.h) * ROWS);
      return { c, r };
    }

    function place(c: number, r: number) {
      if (state === "lose" || state === "win") reset();
      if (c < 0 || r < 0 || c >= COLS || r >= ROWS) return;
      if (PATH_SET.has(`${c},${r}`)) return;
      if (towers.some((t) => t.c === c && t.r === r)) return;
      if (purse < COST) return;
      if (state === "ready") state = "build";
      purse -= COST;
      towers.push({ c, r, cool: 0 });
      beep(420, 0.05, 0.03);
    }

    function onPtr(e: PointerEvent) {
      const node = canvasRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const { c, r } = cellAt(e.clientX - rect.left, e.clientY - rect.top);
      place(c, r);
    }

    canvas.addEventListener("pointerdown", onPtr);

    window.__controlsTest = {
      getYaw: () => towers[0]?.c ?? 0,
      getSpeed: () => (state === "wave" ? 1 : 0),
      setKeys: (codes: string[] = []) => {
        if (codes.includes("KeyW") || codes.includes("Space")) startWave();
      },
    };

    function step(dt: number) {
      if (state !== "wave") return;
      spawnGap -= dt;
      if (spawnLeft > 0 && spawnGap <= 0) {
        mobs.push({ i: 0, hp: spawnHp, max: spawnHp, spd: spawnSpd });
        spawnLeft -= 1;
        spawnGap = WAVES[Math.max(0, wave - 1)].gap;
      }
      for (const m of mobs) {
        if (m.hp <= 0) continue;
        m.i += m.spd * dt;
        if (m.i >= PATH.length - 1) {
          m.hp = 0;
          lives -= 1;
          beep(160, 0.08, 0.05);
          if (lives <= 0) {
            state = "lose";
            goldRef.current(Math.min(12, Math.floor(score / 4)));
            if (score > hi) {
              hi = score;
              localStorage.setItem(`nexus-hold-hi-${hero}`, String(hi));
              hiRef.current?.(hi);
            }
          }
        }
      }
      for (const t of towers) {
        t.cool = Math.max(0, t.cool - dt);
        if (t.cool > 0) continue;
        const tx = (t.c + 0.5) / COLS;
        const ty = (t.r + 0.5) / ROWS;
        let best: Mob | null = null;
        let bestI = -1;
        for (const m of mobs) {
          if (m.hp <= 0) continue;
          const p = along(m.i);
          const d2 = (p.x - tx) ** 2 + (p.y - ty) ** 2;
          if (d2 <= RANGE2 && m.i > bestI) {
            best = m;
            bestI = m.i;
          }
        }
        if (best) {
          best.hp -= 1;
          t.cool = 0.42;
          const p = along(best.i);
          shots.push({ x: tx, y: ty, tx: p.x, ty: p.y, life: 0.12 });
          beep(640, 0.03, 0.02);
          if (best.hp <= 0) {
            score += 1;
            purse += 4;
            if (score > hi) {
              hi = score;
              hiRef.current?.(hi);
            }
          }
        }
      }
      for (const s of shots) s.life -= dt;
      for (let i = shots.length - 1; i >= 0; i--) if (shots[i].life <= 0) shots.splice(i, 1);
      const live = mobs.some((m) => m.hp > 0);
      if (!live && spawnLeft <= 0 && state === "wave") {
        mobs.length = 0;
        if (wave >= WAVES.length) {
          state = "win";
          goldRef.current(18);
          if (score > hi) {
            hi = score;
            localStorage.setItem(`nexus-hold-hi-${hero}`, String(hi));
            hiRef.current?.(hi);
          }
        } else {
          state = "build";
          purse += 12;
        }
      }
    }

    function draw() {
      const w = size.w;
      const h = size.h;
      const cw = w / COLS;
      const ch = h / ROWS;
      ctx.fillStyle = INK;
      ctx.fillRect(0, 0, w, h);
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const path = PATH_SET.has(`${c},${r}`);
          ctx.fillStyle = path ? WOOD : r % 2 === c % 2 ? "#161615" : "#121211";
          ctx.fillRect(c * cw, r * ch, cw - 1, ch - 1);
        }
      }
      ctx.strokeStyle = GOLD;
      ctx.globalAlpha = 0.22;
      ctx.lineWidth = 1;
      const rx = Math.sqrt(RANGE2) * w;
      const ry = Math.sqrt(RANGE2) * h;
      for (const t of towers) {
        ctx.beginPath();
        ctx.ellipse((t.c + 0.5) * cw, (t.r + 0.5) * ch, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      for (const t of towers) {
        ctx.fillStyle = OK;
        ctx.fillRect(t.c * cw + 4, t.r * ch + 4, cw - 8, ch - 8);
      }
      for (const m of mobs) {
        if (m.hp <= 0) continue;
        const p = along(m.i);
        ctx.fillStyle = DANGER;
        ctx.fillRect(p.x * w - 6, p.y * h - 6, 12, 12);
        ctx.fillStyle = GOLD;
        ctx.fillRect(p.x * w - 6, p.y * h - 9, 12 * (m.hp / m.max), 2);
      }
      ctx.strokeStyle = GOLD;
      ctx.lineWidth = 1;
      for (const s of shots) {
        ctx.globalAlpha = Math.max(0, s.life / 0.12);
        ctx.beginPath();
        ctx.moveTo(s.x * w, s.y * h);
        ctx.lineTo(s.tx * w, s.ty * h);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
      const base = along(PATH.length - 1);
      blitHero(ctx, heroImg, base.x * w, base.y * h + 8, 28, 36, CREW_FILTER[hero]);
      ctx.fillStyle = CREAM;
      ctx.font = "10px ui-monospace, monospace";
      const line =
        state === "ready"
          ? "TAP a pad to place. START WAVE holds the gate."
          : state === "lose"
            ? "LEAK. Unauthorized execute. TAP a pad / REBUILD."
            : state === "win"
              ? "GATE HELD. All waves hashed."
              : `W${wave}/${WAVES.length}  G${purse}  L${lives}  ${score}`;
      ctx.fillText(line, 8, 14);
    }

    const stop = runLoop(step, () => {
      const line = `${purse}|${lives}|${wave}|${state}|${score}`;
      if (line !== lastHud) {
        lastHud = line;
        setHud({ gold: purse, lives, wave, state, score });
      }
      draw();
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "KeyW") {
        e.preventDefault();
        startWave();
      }
    };
    window.addEventListener("keydown", onKey);

    (canvas as HTMLCanvasElement & { __startWave?: () => void; __place?: (c: number, r: number) => void }).__startWave = startWave;
    (canvas as HTMLCanvasElement & { __place?: (c: number, r: number) => void }).__place = place;

    return () => {
      stop();
      disconnect();
      canvas.removeEventListener("pointerdown", onPtr);
      window.removeEventListener("keydown", onKey);
      if (window.__controlsTest) delete window.__controlsTest;
    };
  }, [hero]);

  const waveLabel = hud.state === "lose" ? "REBUILD" : hud.state === "win" ? "AGAIN" : "START WAVE";

  return (
    <div>
      <p className="mb-1 font-pixel text-[8px] text-muted">
        {hud.state.toUpperCase()} · WAVE {hud.wave}/{WAVES.length} · G{hud.gold} · L{hud.lives} · {hud.score}
      </p>
      <canvas
        ref={canvasRef}
        id="hold-canvas"
        className="game-canvas"
        style={{ touchAction: "none" }}
        aria-label="Hold the Gate playfield"
      />
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          id="btn-hold-wave"
          className="arcade-ship"
          disabled={hud.state === "wave"}
          onClick={() => {
            const el = canvasRef.current as (HTMLCanvasElement & { __startWave?: () => void }) | null;
            el?.__startWave?.();
          }}
        >
          {waveLabel}
        </button>
        <p className="font-body text-lg text-muted">Tap a dark pad · {COST} gold a tower · First targeting</p>
      </div>
    </div>
  );
}
