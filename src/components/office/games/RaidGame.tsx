import { useEffect, useRef, useState } from "react";
import { useNexus } from "@/lib/nexus/store";
import { heroSprite } from "@/lib/nexus/arcade";
import { CREW_FILTER } from "@/lib/nexus/crew";
import type { RoleId } from "@/lib/nexus/types";
import { beep } from "./beep";
import { bindCanvas, blitHero, loadHero, runLoop } from "./canvas";
import { TouchPad } from "./TouchPad";

const INK = "#1c120c";
const CREAM = "#f6ead0";
const GOLD = "#efc84a";
const OK = "#3d8f6e";
const DANGER = "#c45c3a";

type Alien = { x: number; y: number; alive: boolean };
type Shot = { x: number; y: number; vy: number; from: "p" | "a" };

export function RaidGame({ hero = "cpo", onHi }: { hero?: RoleId; onHi?: (n: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dirRef = useRef(0);
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

    const ship = { x: 0.5, w: 0.08 };
    let aliens: Alien[] = [];
    const shots: Shot[] = [];
    let dir = 1;
    let score = 0;
    let lives = 3;
    let state: "ready" | "run" | "win" | "lose" = "ready";
    let cool = 0;
    let hi = Number(localStorage.getItem("nexus-raid-hi") || 0);
    let lastHud = "";
    const keys = new Set<string>();
    let drop = 0.012;

    function seed() {
      aliens = [];
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 8; c++) {
          aliens.push({ x: 0.12 + c * 0.1, y: 0.12 + r * 0.08, alive: true });
        }
      }
      ship.x = 0.5;
      shots.length = 0;
      dir = 1;
      drop = 0.012;
    }
    seed();

    window.__controlsTest = {
      getYaw: () => ship.x,
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
      if (state === "ready") {
        if (steer !== 0 || fireRef.current || keys.has("Space")) {
          state = "run";
          fireRef.current = false;
        }
        return;
      }
      if (state !== "run") return;

      ship.x = Math.min(0.94, Math.max(0.06, ship.x + steer * 0.7 * dt));
      cool = Math.max(0, cool - dt);
      const wantFire = fireRef.current || keys.has("Space");
      fireRef.current = false;
      if (wantFire && cool <= 0) {
        shots.push({ x: ship.x, y: 0.88, vy: -0.9, from: "p" });
        cool = 0.28;
        beep(640, 0.04, 0.03);
      }

      const live = aliens.filter((a) => a.alive);
      let hitEdge = false;
      for (const a of live) {
        a.x += dir * (0.08 + (32 - live.length) * 0.004) * dt;
        if (a.x < 0.06 || a.x > 0.94) hitEdge = true;
      }
      if (hitEdge) {
        dir *= -1;
        for (const a of live) a.y += drop;
      }

      if (Math.random() < dt * 0.6 && live.length) {
        const shooter = live[Math.floor(Math.random() * live.length)];
        shots.push({ x: shooter.x, y: shooter.y + 0.03, vy: 0.45, from: "a" });
      }

      for (const s of shots) s.y += s.vy * dt;
      for (let i = shots.length - 1; i >= 0; i--) {
        const s = shots[i];
        if (s.y < 0 || s.y > 1) {
          shots.splice(i, 1);
          continue;
        }
        if (s.from === "p") {
          for (const a of live) {
            if (Math.abs(a.x - s.x) < 0.04 && Math.abs(a.y - s.y) < 0.03) {
              a.alive = false;
              shots.splice(i, 1);
              score += 15;
              goldRef.current(3);
              beep(220, 0.06, 0.04);
              if (score > hi) {
                hi = score;
                localStorage.setItem("nexus-raid-hi", String(hi));
                hiRef.current?.(hi);
              }
              break;
            }
          }
        } else if (Math.abs(s.x - ship.x) < ship.w / 2 && s.y > 0.88) {
          shots.splice(i, 1);
          lives -= 1;
          beep(90, 0.18, 0.05);
          if (lives <= 0) state = "lose";
        }
      }

      if (aliens.every((a) => !a.alive)) {
        state = "win";
        goldRef.current(50);
      }
      if (live.some((a) => a.y > 0.82)) state = "lose";
      const snap = `${score}|${lives}|${state}`;
      if (snap !== lastHud) {
        lastHud = snap;
        setHud({ score, lives, state });
      }
    }

    function draw() {
      const { w, h } = size;
      ctx.fillStyle = INK;
      ctx.fillRect(0, 0, w, h);
      for (const a of aliens) {
        if (!a.alive) continue;
        ctx.fillStyle = OK;
        const ax = a.x * w;
        const ay = a.y * h;
        ctx.fillRect(ax - 8, ay, 16, 10);
        ctx.fillStyle = GOLD;
        ctx.fillRect(ax - 5, ay + 3, 3, 3);
        ctx.fillRect(ax + 2, ay + 3, 3, 3);
      }
      ctx.fillStyle = CREAM;
      ctx.fillRect(ship.x * w - 12, 0.9 * h, 24, 8);
      blitHero(ctx, heroImg, ship.x * w, 0.9 * h + 4, 36, 44, CREW_FILTER[hero]);
      for (const s of shots) {
        ctx.fillStyle = s.from === "p" ? GOLD : DANGER;
        ctx.fillRect(s.x * w - 1, s.y * h, 3, 8);
      }
      ctx.fillStyle = GOLD;
      ctx.font = "8px 'Press Start 2P', monospace";
      ctx.fillText(`${score}  L${lives}  HI ${hi}`, 8, 12);
      if (state !== "run") {
        ctx.fillStyle = "rgba(28,18,12,0.7)";
        ctx.fillRect(0, h * 0.4, w, 36);
        ctx.fillStyle = GOLD;
        ctx.font = "10px 'Press Start 2P', monospace";
        const msg = state === "win" ? "SKY CLEAR" : state === "lose" ? "BREACH" : "A/D · FIRE";
        ctx.fillText(msg, 12, h * 0.4 + 24);
      }
    }

    const stop = runLoop(step, draw);
    const onKey = (e: KeyboardEvent) => {
      if (["KeyA", "KeyD", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
        e.preventDefault();
        keys.add(e.code);
      }
    };
    const onUp = (e: KeyboardEvent) => keys.delete(e.code);
    const clear = () => keys.clear();
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onUp);
    window.addEventListener("blur", clear);
    return () => {
      stop();
      disconnect();
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onUp);
      window.removeEventListener("blur", clear);
      if (window.__controlsTest) delete window.__controlsTest;
    };
  }, [hero]);

  return (
    <div>
      <p className="font-pixel text-[8px] text-gold">
        SKY RAID · {hud.score} · L{hud.lives}
      </p>
      <canvas
        ref={canvasRef}
        className="game-canvas"
        style={{ touchAction: "none" }}
        aria-label="Sky Raid playfield"
      />
      <TouchPad
        fire="FIRE"
        onDir={(x) => (dirRef.current = x)}
        onFire={() => {
          fireRef.current = true;
        }}
      />
    </div>
  );
}
