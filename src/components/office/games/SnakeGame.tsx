import { useEffect, useRef, useState } from "react";
import { heroSprite } from "@/lib/nexus/arcade";
import { CREW_FILTER } from "@/lib/nexus/crew";
import type { RoleId } from "@/lib/nexus/types";
import { useNexus } from "@/lib/nexus/store";
import { beep } from "./beep";
import { bindCanvas, blitHero, loadHero, runLoop } from "./canvas";
import { TouchPad } from "./TouchPad";

const COLS = 16;
const ROWS = 10;
const INK = "#111110";
const CREAM = "#e6e1d6";
const GOLD = "#c5c0b4";
const OK = "#5d8f76";
const DANGER = "#b85c4a";

type Cell = { c: number; r: number };

export function SnakeGame({ hero = "pm", onHi }: { hero?: RoleId; onHi?: (n: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dirRef = useRef({ x: 1, y: 0 });
  const addGold = useNexus((s) => s.addGold);
  const goldRef = useRef(addGold);
  goldRef.current = addGold;
  const hiRef = useRef(onHi);
  hiRef.current = onHi;
  const [hud, setHud] = useState({ score: 0, state: "ready" });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const bound = bindCanvas(canvas);
    if (!bound) return;
    const { ctx, size, disconnect } = bound;
    const heroImg = loadHero(heroSprite(hero));
    const keys = new Set<string>();
    let body: Cell[] = [{ c: 4, r: 5 }];
    let dir = { x: 1, y: 0 };
    let queued = { x: 1, y: 0 };
    let food: Cell = { c: 10, r: 4 };
    let score = 0;
    let acc = 0;
    let state: "ready" | "run" | "lose" = "ready";
    let hi = Number(localStorage.getItem(`nexus-snake-hi-${hero}`) || 0);
    let lastHud = "";

    function spawnFood() {
      for (let n = 0; n < 80; n++) {
        const c = (food.c * 7 + n * 3 + 5) % COLS;
        const r = (food.r * 5 + n * 2 + 3) % ROWS;
        if (!body.some((b) => b.c === c && b.r === r)) {
          food = { c, r };
          return;
        }
      }
    }

    window.__controlsTest = {
      getYaw: () => body[0].c / COLS,
      getSpeed: () => (state === "run" ? 1 : 0),
      setKeys: (codes) => {
        keys.clear();
        for (const c of codes) keys.add(c);
      },
    };

    function turn(x: number, y: number) {
      if (dir.x === -x && dir.y === -y) return;
      queued = { x, y };
    }

    function step(dt: number) {
      if (keys.has("KeyA") || keys.has("ArrowLeft")) turn(-1, 0);
      if (keys.has("KeyD") || keys.has("ArrowRight")) turn(1, 0);
      if (keys.has("KeyW") || keys.has("ArrowUp")) turn(0, -1);
      if (keys.has("KeyS") || keys.has("ArrowDown")) turn(0, 1);
      const pad = dirRef.current;
      if (pad.x || pad.y) turn(Math.sign(pad.x), Math.sign(pad.y));
      if (state === "ready") {
        if (keys.size || pad.x || pad.y) state = "run";
        return;
      }
      if (state !== "run") return;
      acc += dt;
      const interval = Math.max(0.09, 0.18 - score * 0.004);
      if (acc < interval) return;
      acc = 0;
      dir = queued;
      const head = { c: body[0].c + dir.x, r: body[0].r + dir.y };
      if (head.c < 0 || head.r < 0 || head.c >= COLS || head.r >= ROWS || body.some((b) => b.c === head.c && b.r === head.r)) {
        state = "lose";
        beep(180, 0.1, 0.05);
        if (score > hi) {
          hi = score;
          localStorage.setItem(`nexus-snake-hi-${hero}`, String(hi));
          hiRef.current?.(hi);
        }
        goldRef.current(Math.min(12, score));
        return;
      }
      body = [head, ...body];
      if (head.c === food.c && head.r === food.r) {
        score += 1;
        beep(640, 0.04, 0.03);
        spawnFood();
      } else {
        body.pop();
      }
    }

    function draw() {
      const { w, h } = size;
      const cw = w / COLS;
      const rh = h / ROWS;
      ctx.fillStyle = INK;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = OK;
      ctx.fillRect(food.c * cw + 2, food.r * rh + 2, cw - 4, rh - 4);
      body.forEach((b, i) => {
        ctx.fillStyle = i === 0 ? CREAM : GOLD;
        ctx.fillRect(b.c * cw + 1, b.r * rh + 1, cw - 2, rh - 2);
      });
      const head = body[0];
      blitHero(ctx, heroImg, head.c * cw + cw / 2, head.r * rh + rh, cw, rh * 1.4, CREW_FILTER[hero]);
      ctx.fillStyle = GOLD;
      ctx.font = "8px 'Press Start 2P', monospace";
      ctx.fillText(`${score}  HI ${hi}`, 8, 12);
      if (state !== "run") {
        ctx.fillStyle = "rgba(17,17,16,0.7)";
        ctx.fillRect(0, h * 0.4, w, 36);
        ctx.fillStyle = state === "lose" ? DANGER : CREAM;
        ctx.font = "10px 'Press Start 2P', monospace";
        ctx.fillText(state === "lose" ? "BITTEN" : "A/D · EAT", 12, h * 0.4 + 24);
      }
    }

    const stop = runLoop(step, () => {
      const line = `${score}|${state}`;
      if (line !== lastHud) {
        lastHud = line;
        setHud({ score, state });
      }
      draw();
    });
    const onKey = (e: KeyboardEvent) => {
      if (["KeyA", "KeyD", "KeyW", "KeyS", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.code)) {
        e.preventDefault();
        keys.add(e.code);
      }
    };
    const onUp = (e: KeyboardEvent) => keys.delete(e.code);
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onUp);
    window.addEventListener("blur", () => keys.clear());
    return () => {
      stop();
      disconnect();
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onUp);
      if (window.__controlsTest) delete window.__controlsTest;
    };
  }, [hero]);

  return (
    <div>
      <p className="font-pixel text-[8px] text-gold">
        WIRE SNAKE · {hud.score} · {hud.state.toUpperCase()}
      </p>
      <canvas ref={canvasRef} className="game-canvas" style={{ touchAction: "none" }} aria-label="Wire Snake playfield" />
      <TouchPad onDir={(x, y) => (dirRef.current = { x, y })} />
    </div>
  );
}