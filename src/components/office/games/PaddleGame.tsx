import { useEffect, useRef, useState } from "react";
import { beep, isMuted, setMuted } from "@/components/office/games/beep";
import { useNexus } from "@/lib/nexus/store";
import { heroSprite } from "@/lib/nexus/arcade";
import { CREW_FILTER } from "@/lib/nexus/crew";
import type { RoleId } from "@/lib/nexus/types";
import { bindCanvas, blitHero, loadHero, runLoop } from "./canvas";

const INK = "#1c120c";
const CREAM = "#f6ead0";
const GOLD = "#efc84a";
const OK = "#3d8f6e";
const DANGER = "#c45c3a";

type Brick = { x: number; y: number; w: number; h: number; hp: number; alive: boolean };
type Spark = { x: number; y: number; vx: number; vy: number; life: number };

export function PaddleGame({ hero = "engineer", onHi }: { hero?: RoleId; onHi?: (n: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const addGold = useNexus((s) => s.addGold);
  const [hud, setHud] = useState({ score: 0, lives: 3, hi: 0, state: "ready" });
  const [paused, setPaused] = useState(false);
  const [quiet, setQuiet] = useState(isMuted());
  const pausedRef = useRef(false);
  const keysRef = useRef(new Set<string>());
  const serveRef = useRef<() => void>(() => {});
  const goldRef = useRef(addGold);
  goldRef.current = addGold;
  const hiRef = useRef(onHi);
  hiRef.current = onHi;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const bound = bindCanvas(canvas);
    if (!bound) return;
    const { ctx, size, disconnect } = bound;
    const heroImg = loadHero(heroSprite(hero));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let hi = Number(localStorage.getItem("nexus-paddle-hi") || 0);
    const paddle = { x: 0.5, w: 0.2 };
    const ball = { x: 0.5, y: 0.72, vx: 0.38, vy: -0.46, r: 0.016 };
    let bricks: Brick[] = [];
    const sparks: Spark[] = [];
    let score = 0;
    let lives = 3;
    let state: "ready" | "run" | "win" | "lose" = "ready";
    let trauma = 0;
    let flash = 0;
    const keys = keysRef.current;
    let lastHud = "";

    function seed() {
      bricks = [];
      const cols = 7;
      const rows = 5;
      const gap = 0.012;
      const w = (1 - gap * (cols + 1)) / cols;
      const h = 0.055;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          bricks.push({
            x: gap + c * (w + gap),
            y: 0.08 + r * (h + gap),
            w,
            h,
            hp: r === 0 ? 2 : 1,
            alive: true,
          });
        }
      }
    }
    function resetBall(serve = false) {
      ball.x = paddle.x;
      ball.y = 0.72;
      ball.vx = serve ? (Math.random() > 0.5 ? 0.38 : -0.38) : 0;
      ball.vy = serve ? -0.46 : 0;
    }
    seed();
    resetBall(false);

    window.__controlsTest = {
      getYaw: () => paddle.x,
      getSpeed: () => Math.abs(ball.vx) + Math.abs(ball.vy),
      setKeys: (codes) => {
        keys.clear();
        for (const c of codes) keys.add(c);
      },
    };

    function serve() {
      if (state === "ready") {
        state = "run";
        resetBall(true);
      } else if (state === "win" || state === "lose") {
        score = 0;
        lives = 3;
        state = "ready";
        seed();
        resetBall(false);
      }
      setHud({ score, lives, hi, state });
    }
    serveRef.current = serve;

    function step(dt: number) {
      if (keys.has("KeyA") || keys.has("ArrowLeft")) paddle.x = Math.max(paddle.w / 2, paddle.x - 0.9 * dt);
      if (keys.has("KeyD") || keys.has("ArrowRight")) paddle.x = Math.min(1 - paddle.w / 2, paddle.x + 0.9 * dt);
      if (state === "ready") ball.x = paddle.x;
      if (pausedRef.current) return;
      trauma = Math.max(0, trauma - dt * 2.4);
      flash = Math.max(0, flash - dt * 4);
      for (const s of sparks) {
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.vy += 0.9 * dt;
        s.life -= dt;
      }
      for (let i = sparks.length - 1; i >= 0; i--) if (sparks[i].life <= 0) sparks.splice(i, 1);
      if (state !== "run") return;
      ball.x += ball.vx * dt;
      ball.y += ball.vy * dt;
      if (ball.x < ball.r) {
        ball.x = ball.r;
        ball.vx *= -1;
      }
      if (ball.x > 1 - ball.r) {
        ball.x = 1 - ball.r;
        ball.vx *= -1;
      }
      if (ball.y < ball.r) {
        ball.y = ball.r;
        ball.vy *= -1;
      }
      const py = 0.9;
      const half = paddle.w / 2;
      if (ball.vy > 0 && ball.y + ball.r >= py && Math.abs(ball.x - paddle.x) < half + ball.r) {
        const hit = (ball.x - paddle.x) / half;
        ball.vy = -Math.abs(ball.vy);
        ball.vx = hit * 0.62;
        const spd = Math.min(0.95, Math.hypot(ball.vx, ball.vy) * 1.03);
        const ang = Math.atan2(ball.vy, ball.vx);
        ball.vx = Math.cos(ang) * spd;
        ball.vy = Math.sin(ang) * spd;
        ball.y = py - ball.r;
        beep(520, 0.04);
      }
      for (const b of bricks) {
        if (!b.alive) continue;
        if (ball.x > b.x && ball.x < b.x + b.w && ball.y > b.y && ball.y < b.y + b.h) {
          b.hp -= 1;
          if (b.hp <= 0) {
            b.alive = false;
            score += 10;
            goldRef.current(2);
            sparks.push(
              { x: b.x + b.w / 2, y: b.y, vx: 0.3, vy: -0.4, life: 0.3 },
              { x: b.x + b.w / 2, y: b.y, vx: -0.3, vy: -0.3, life: 0.3 },
            );
          } else score += 4;
          ball.vy *= -1;
          trauma = Math.min(1, trauma + 0.35);
          flash = 0.18;
          if (score > hi) {
            hi = score;
            localStorage.setItem("nexus-paddle-hi", String(hi));
            hiRef.current?.(hi);
          }
          break;
        }
      }
      if (bricks.every((b) => !b.alive)) {
        state = "win";
        goldRef.current(50);
      }
      if (ball.y > 1.05) {
        lives -= 1;
        trauma = 0.8;
        if (lives <= 0) state = "lose";
        else {
          state = "ready";
          resetBall(false);
        }
      }
      const snap = `${score}|${lives}|${state}`;
      if (snap !== lastHud) {
        lastHud = snap;
        setHud({ score, lives, hi, state });
      }
    }

    function draw() {
      const { w, h } = size;
      const shake = reduce ? 0 : trauma * trauma * 8;
      ctx.save();
      ctx.fillStyle = INK;
      ctx.fillRect(0, 0, w, h);
      ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
      if (flash > 0) {
        ctx.fillStyle = `rgba(246,234,208,${flash * 0.3})`;
        ctx.fillRect(0, 0, w, h);
      }
      for (const b of bricks) {
        if (!b.alive) continue;
        ctx.fillStyle = b.hp > 1 ? GOLD : OK;
        ctx.fillRect(b.x * w, b.y * h, b.w * w, b.h * h);
      }
      ctx.fillStyle = CREAM;
      ctx.fillRect((paddle.x - paddle.w / 2) * w, 0.9 * h, paddle.w * w, 0.028 * h);
      blitHero(ctx, heroImg, paddle.x * w, 0.9 * h + 2, 28, 36, CREW_FILTER[hero]);
      ctx.fillStyle = DANGER;
      ctx.beginPath();
      ctx.arc(ball.x * w, ball.y * h, ball.r * w, 0, Math.PI * 2);
      ctx.fill();
      for (const s of sparks) {
        ctx.globalAlpha = Math.max(0, s.life * 3);
        ctx.fillStyle = GOLD;
        ctx.fillRect(s.x * w, s.y * h, 3, 3);
        ctx.globalAlpha = 1;
      }
      if (state !== "run") {
        ctx.fillStyle = "rgba(28,18,12,0.7)";
        ctx.fillRect(0, h * 0.4, w, 36);
        ctx.fillStyle = GOLD;
        ctx.font = "10px 'Press Start 2P', monospace";
        const msg = state === "win" ? "SEALED" : state === "lose" ? "LEAK" : "TAP / A D";
        ctx.fillText(msg, 12, h * 0.4 + 24);
      }
      ctx.restore();
    }

    const stop = runLoop(step, draw);
    const pointer = (clientX: number) => {
      const rect = canvas.getBoundingClientRect();
      paddle.x = Math.min(1 - paddle.w / 2, Math.max(paddle.w / 2, (clientX - rect.left) / rect.width));
    };
    const onMove = (e: PointerEvent) => pointer(e.clientX);
    const onDown = (e: PointerEvent) => {
      pointer(e.clientX);
      serve();
    };
    const onKey = (e: KeyboardEvent) => {
      if (["KeyA", "KeyD", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
        e.preventDefault();
        keys.add(e.code);
        if (e.code === "Space") serve();
      }
    };
    const onUp = (e: KeyboardEvent) => keys.delete(e.code);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("keyup", onUp, true);
    window.addEventListener("blur", () => keys.clear());
    return () => {
      stop();
      disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey, true);
      window.removeEventListener("keyup", onUp, true);
      if (window.__controlsTest) delete window.__controlsTest;
    };
  }, [hero]);

  return (
    <div>
      <p className="font-pixel text-[11px] text-gold">
        PADDLE · {hud.score} · LIVES {hud.lives} · BEST {hud.hi}
        {paused ? " · PAUSED" : ""}
      </p>
      <div className="paddle-controls">
        <button type="button" aria-label="Move left" onPointerDown={() => keysRef.current.add("ArrowLeft")} onPointerUp={() => keysRef.current.delete("ArrowLeft")} onPointerLeave={() => keysRef.current.delete("ArrowLeft")}>
          LEFT
        </button>
        <button type="button" onClick={() => serveRef.current()}>
          SERVE
        </button>
        <button
          type="button"
          onClick={() => {
            pausedRef.current = !pausedRef.current;
            setPaused(pausedRef.current);
          }}
        >
          {paused ? "RESUME" : "PAUSE"}
        </button>
        <button
          type="button"
          onClick={() => {
            const next = !quiet;
            setQuiet(next);
            setMuted(next);
            if (!next) beep(520, 0.05);
          }}
        >
          {quiet ? "SOUND" : "MUTE"}
        </button>
        <button type="button" aria-label="Move right" onPointerDown={() => keysRef.current.add("ArrowRight")} onPointerUp={() => keysRef.current.delete("ArrowRight")} onPointerLeave={() => keysRef.current.delete("ArrowRight")}>
          RIGHT
        </button>
      </div>
      <canvas
        ref={canvasRef}
        className="game-canvas"
        style={{ touchAction: "none" }}
        aria-label="Packet Paddle. Arrows or A and D move. Space serves."
      />
    </div>
  );
}
