import { useEffect, useRef, useState } from "react";
import { heroSprite } from "@/lib/nexus/arcade";
import { CREW_FILTER } from "@/lib/nexus/crew";
import type { RoleId } from "@/lib/nexus/types";
import { useNexus } from "@/lib/nexus/store";
import { beep } from "./beep";
import { bindCanvas, blitHero, loadHero, runLoop } from "./canvas";
import { TouchPad } from "./TouchPad";

const INK = "#111110";
const CREAM = "#e6e1d6";
const GOLD = "#c5c0b4";
const DANGER = "#b85c4a";

type Rock = { x: number; y: number; vx: number; vy: number; r: number; alive: boolean };
type Shot = { x: number; y: number; vx: number; vy: number; life: number };

export function DriftGame({ hero = "cpo", onHi }: { hero?: RoleId; onHi?: (n: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const steerRef = useRef(0);
  const thrustRef = useRef(0);
  const fireRef = useRef(false);
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
    const heroImg = loadHero(heroSprite(hero));
    const keys = new Set<string>();
    const ship = { x: 0.5, y: 0.55, yaw: 0, vx: 0, vy: 0 };
    let rocks: Rock[] = [];
    const shots: Shot[] = [];
    let score = 0;
    let lives = 3;
    let cool = 0;
    let state: "ready" | "run" | "win" | "lose" = "ready";
    let hi = Number(localStorage.getItem(`nexus-drift-hi-${hero}`) || 0);
    let lastHud = "";
    let invuln = 0;

    function seed() {
      rocks = [];
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2;
        rocks.push({
          x: 0.5 + Math.cos(a) * 0.38,
          y: 0.5 + Math.sin(a) * 0.32,
          vx: Math.cos(a + 1) * 0.08,
          vy: Math.sin(a + 1) * 0.08,
          r: 0.045,
          alive: true,
        });
      }
      ship.x = 0.5;
      ship.y = 0.55;
      ship.yaw = 0;
      ship.vx = 0;
      ship.vy = 0;
      shots.length = 0;
    }
    seed();

    window.__controlsTest = {
      getYaw: () => ship.yaw,
      getSpeed: () => Math.hypot(ship.vx, ship.vy),
      setKeys: (codes) => {
        keys.clear();
        for (const c of codes) keys.add(c);
      },
    };

    function wrap(v: number) {
      if (v < 0) return v + 1;
      if (v > 1) return v - 1;
      return v;
    }

    function step(dt: number) {
      let steer = steerRef.current;
      if (keys.has("KeyA") || keys.has("ArrowLeft")) steer += 1;
      if (keys.has("KeyD") || keys.has("ArrowRight")) steer -= 1;
      let thrust = thrustRef.current < 0 ? 1 : thrustRef.current > 0 ? 0 : 0;
      if (keys.has("KeyW") || keys.has("ArrowUp")) thrust = 1;
      if (state === "ready") {
        if (steer !== 0 || thrust || keys.has("Space") || fireRef.current) state = "run";
        return;
      }
      if (state !== "run") return;
      ship.yaw += steer * 2.8 * dt;
      const fx = -Math.sin(ship.yaw);
      const fy = -Math.cos(ship.yaw);
      if (thrust) {
        ship.vx += fx * 0.55 * dt;
        ship.vy += fy * 0.55 * dt;
      }
      ship.vx *= 0.992;
      ship.vy *= 0.992;
      ship.x = wrap(ship.x + ship.vx * dt);
      ship.y = wrap(ship.y + ship.vy * dt);
      cool = Math.max(0, cool - dt);
      invuln = Math.max(0, invuln - dt);
      const wantFire = fireRef.current || keys.has("Space");
      fireRef.current = false;
      if (wantFire && cool <= 0) {
        shots.push({ x: ship.x, y: ship.y, vx: fx * 0.9, vy: fy * 0.9, life: 0.9 });
        cool = 0.22;
        beep(720, 0.04, 0.03);
      }
      for (const s of shots) {
        s.x = wrap(s.x + s.vx * dt);
        s.y = wrap(s.y + s.vy * dt);
        s.life -= dt;
      }
      for (let i = shots.length - 1; i >= 0; i--) if (shots[i].life <= 0) shots.splice(i, 1);
      for (const r of rocks) {
        if (!r.alive) continue;
        r.x = wrap(r.x + r.vx * dt);
        r.y = wrap(r.y + r.vy * dt);
        for (const s of shots) {
          if (Math.hypot(s.x - r.x, s.y - r.y) < r.r) {
            r.alive = false;
            s.life = 0;
            score += 10;
            goldRef.current(1);
            beep(420, 0.05, 0.03);
          }
        }
        if (invuln <= 0 && Math.hypot(ship.x - r.x, ship.y - r.y) < r.r + 0.02) {
          lives -= 1;
          invuln = 1.4;
          ship.vx = 0;
          ship.vy = 0;
          beep(160, 0.1, 0.06);
          if (lives <= 0) {
            state = "lose";
            if (score > hi) {
              hi = score;
              localStorage.setItem(`nexus-drift-hi-${hero}`, String(hi));
              hiRef.current?.(hi);
            }
          }
        }
      }
      if (rocks.every((r) => !r.alive)) {
        state = "win";
        if (score > hi) {
          hi = score;
          localStorage.setItem(`nexus-drift-hi-${hero}`, String(hi));
          hiRef.current?.(hi);
        }
        goldRef.current(8);
      }
    }

    function draw() {
      const { w, h } = size;
      ctx.fillStyle = INK;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = DANGER;
      for (const r of rocks) {
        if (!r.alive) continue;
        ctx.beginPath();
        ctx.arc(r.x * w, r.y * h, r.r * w, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = GOLD;
      for (const s of shots) ctx.fillRect(s.x * w - 1, s.y * h - 1, 3, 3);
      const sx = ship.x * w;
      const sy = ship.y * h;
      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(-ship.yaw);
      ctx.fillStyle = CREAM;
      ctx.beginPath();
      ctx.moveTo(0, -12);
      ctx.lineTo(8, 10);
      ctx.lineTo(-8, 10);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      blitHero(ctx, heroImg, sx, sy + 18, 28, 36, CREW_FILTER[hero]);
      ctx.fillStyle = GOLD;
      ctx.font = "8px 'Press Start 2P', monospace";
      ctx.fillText(`${score}  L${lives}  HI ${hi}`, 8, 12);
      if (state !== "run") {
        ctx.fillStyle = "rgba(17,17,16,0.7)";
        ctx.fillRect(0, h * 0.4, w, 36);
        ctx.fillStyle = GOLD;
        ctx.font = "10px 'Press Start 2P', monospace";
        const msg = state === "win" ? "FIELD CLEAR" : state === "lose" ? "HULL GONE" : "A LEFT · D RIGHT · W";
        ctx.fillText(msg, 12, h * 0.4 + 24);
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
      if (["KeyA", "KeyD", "KeyW", "ArrowLeft", "ArrowRight", "ArrowUp", "Space"].includes(e.code)) {
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
        ROCK DRIFT · {hud.score} · L{hud.lives}
      </p>
      <canvas ref={canvasRef} className="game-canvas" style={{ touchAction: "none" }} aria-label="Rock Drift playfield" />
      <TouchPad
        fire="FIRE"
        onDir={(x, y) => {
          steerRef.current = x < 0 ? 1 : x > 0 ? -1 : 0;
          thrustRef.current = y;
        }}
        onFire={() => {
          fireRef.current = true;
        }}
      />
    </div>
  );
}