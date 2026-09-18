import { useEffect, useRef, useState } from "react";
import { useNexus } from "@/lib/nexus/store";
import { heroName, heroSprite } from "@/lib/nexus/arcade";
import { CREW_FILTER } from "@/lib/nexus/crew";
import type { RoleId } from "@/lib/nexus/types";
import { beep } from "./beep";
import { bindCanvas, blitHero, runLoop } from "./canvas";
import { TouchPad } from "./TouchPad";

const INK = "#111110";
const CREAM = "#e6e1d6";
const DANGER = "#b85c4a";
const MUTED = "#8a8580";

type Gap = { x: number; w: number; scored: boolean };

export function HopGame({ hero, title, seed, onHi }: { hero: RoleId; title: string; seed: number; onHi?: (n: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dirRef = useRef(0);
  const jumpRef = useRef(false);
  const addGold = useNexus((s) => s.addGold);
  const goldRef = useRef(addGold);
  goldRef.current = addGold;
  const hiRef = useRef(onHi);
  hiRef.current = onHi;
  const [hud, setHud] = useState({ score: 0, lives: 3, state: "ready" });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const bound = bindCanvas(canvas);
    if (!bound) return;
    const { ctx, size, disconnect } = bound;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = heroSprite(hero);

    const p = { x: 0.22, y: 0.72, vy: 0, on: true };
    const keys = new Set<string>();
    const gaps: Gap[] = [];
    let score = 0;
    let lives = 3;
    let state: "ready" | "run" | "lose" = "ready";
    let t = seed * 0.01;
    let cool = 0;
    let lastHud = "";
    let hi = Number(localStorage.getItem(`nexus-hop-hi-${hero}`) || 0);
    const ground = 0.78;

    function spawn(x: number) {
      const w = 0.08 + ((seed + Math.floor(x * 10)) % 5) * 0.012;
      gaps.push({ x, w, scored: false });
    }

    function resetRun() {
      p.x = 0.22;
      p.y = ground;
      p.vy = 0;
      p.on = true;
      gaps.length = 0;
      spawn(1.15);
      spawn(1.7);
      spawn(2.28);
    }
    resetRun();

    window.__controlsTest = {
      getYaw: () => p.x,
      getSpeed: () => (state === "run" ? 1 : 0),
      setKeys: (codes: string[]) => {
        keys.clear();
        for (const c of codes) keys.add(c);
      },
    };

    function step(dt: number) {
      let steer = dirRef.current;
      if (keys.has("KeyA") || keys.has("ArrowLeft")) steer = -1;
      if (keys.has("KeyD") || keys.has("ArrowRight")) steer = 1;
      const wantJump =
        jumpRef.current || keys.has("Space") || keys.has("KeyW") || keys.has("ArrowUp");
      jumpRef.current = false;

      if (state === "ready") {
        if (steer !== 0 || wantJump) state = "run";
        return;
      }
      if (state !== "run") return;

      t += dt;
      p.x = Math.min(0.55, Math.max(0.1, p.x + steer * 0.38 * dt));
      if (wantJump && p.on && cool <= 0) {
        p.vy = -1.15;
        p.on = false;
        cool = 0.12;
        beep(520, 0.05, 0.03);
      }
      cool = Math.max(0, cool - dt);
      p.vy += 2.8 * dt;
      p.y += p.vy * dt;

      const overGap = gaps.some((g) => p.x > g.x && p.x < g.x + g.w);
      if (p.y >= ground) {
        if (overGap) {
          lives -= 1;
          beep(180, 0.08, 0.05);
          if (lives <= 0) {
            state = "lose";
            if (score > hi) {
              hi = score;
              localStorage.setItem(`nexus-hop-hi-${hero}`, String(hi));
              hiRef.current?.(hi);
            }
            goldRef.current(Math.min(12, Math.floor(score / 4)));
          } else {
            p.y = ground;
            p.vy = 0;
            p.on = true;
            p.x = 0.18;
          }
        } else {
          p.y = ground;
          p.vy = 0;
          p.on = true;
        }
      }

      const speed = 0.22 + Math.min(0.22, score * 0.006);
      for (const g of gaps) {
        g.x -= speed * dt;
        if (!g.scored && g.x + g.w < p.x) {
          g.scored = true;
          score += 1;
          if (score > hi) {
            hi = score;
            hiRef.current?.(hi);
          }
        }
      }
      while (gaps.length && gaps[0].x + gaps[0].w < -0.1) gaps.shift();
      const last = gaps[gaps.length - 1];
      if (!last || last.x < 1.05) spawn((last?.x ?? 1) + 0.42 + (t % 0.25));
    }

    function draw() {
      const w = size.w;
      const h = size.h;
      ctx.fillStyle = INK;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = MUTED;
      ctx.fillRect(0, ground * h, w, 3);
      ctx.fillStyle = CREAM;
      ctx.fillRect(0, ground * h + 3, w, h);

      for (const g of gaps) {
        ctx.fillStyle = INK;
        ctx.fillRect(g.x * w, ground * h - 2, g.w * w, 18);
        ctx.fillStyle = DANGER;
        ctx.fillRect(g.x * w, ground * h + 3, g.w * w, h);
      }

      const hx = p.x * w;
      const hy = p.y * h;
      blitHero(ctx, img, hx, hy + 6, 44, 56, CREW_FILTER[hero]);

      ctx.fillStyle = CREAM;
      ctx.font = "12px ui-monospace, monospace";
      ctx.fillText(title, 10, 18);
      ctx.fillStyle = MUTED;
      ctx.fillText(`${heroName(hero)}  ${score}  HI ${hi}`, 10, 34);
      if (state !== "run") {
        ctx.fillStyle = CREAM;
        ctx.fillText(state === "ready" ? "TAP / JUMP" : "DOWN — TAP", 10, 52);
      }
    }

    const stop = runLoop(step, () => {
      const line = `${score}|${lives}|${state}`;
      if (line !== lastHud) {
        lastHud = line;
        setHud({ score, lives, state });
      }
      draw();
    });

    const onKey = (e: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "Space", "KeyA", "KeyD", "KeyW"].includes(e.code)) e.preventDefault();
      if (e.type === "keydown") keys.add(e.code);
      else keys.delete(e.code);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);

    return () => {
      stop();
      disconnect();
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
      if (window.__controlsTest) delete window.__controlsTest;
    };
  }, [hero, title, seed]);

  return (
    <div>
      <p className="mb-1 font-pixel text-[8px] text-muted">
        {heroName(hero)} · {hud.state.toUpperCase()} · {hud.score} · L{hud.lives}
      </p>
      <canvas
        ref={canvasRef}
        className="game-canvas"
        onPointerDown={() => {
          jumpRef.current = true;
        }}
      />
      <TouchPad
        onDir={(x, y) => {
          dirRef.current = x;
          if (y < 0) jumpRef.current = true;
        }}
        onFire={() => {
          jumpRef.current = true;
        }}
        fire="JUMP"
      />
    </div>
  );
}
