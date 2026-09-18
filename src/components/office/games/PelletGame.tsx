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
const WALL = "#2f5f5b";

const MAZE = [
  "###################",
  "#o.......#.......o#",
  "#.##.###.#.###.##.#",
  "#.................#",
  "#.##.#.#####.#.##.#",
  "#....#...P...#....#",
  "#.##.#.#####.#.##.#",
  "#.................#",
  "#.##.###.#.###.##.#",
  "#o.......#.......o#",
  "###################",
];

const ROWS = MAZE.length;
const COLS = MAZE[0].length;
const DIRS: [number, number][] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function open(c: number, r: number) {
  return MAZE[r]?.[c] !== "#";
}

export function PelletGame({ hero = "qa", onHi }: { hero?: RoleId; onHi?: (n: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dirRef = useRef({ x: 0, y: 0 });
  const addGold = useNexus((s) => s.addGold);
  const goldRef = useRef(addGold);
  goldRef.current = addGold;
  const hiRef = useRef(onHi);
  hiRef.current = onHi;
  const [hud, setHud] = useState({ score: 0, lives: 3, left: 0, state: "ready" });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const bound = bindCanvas(canvas);
    if (!bound) return;
    const { ctx, size, disconnect } = bound;
    const heroImg = loadHero(heroSprite(hero));

    type Ghost = { c: number; r: number; dc: number; dr: number; color: string };
    let player = { c: 9, r: 5, dc: 0, dr: 0, next: [0, 0] as [number, number] };
    let ghosts: Ghost[] = [];
    const dots = new Set<string>();
    let power = 0;
    let score = 0;
    let lives = 3;
    let state: "ready" | "run" | "win" | "lose" = "ready";
    let hi = Number(localStorage.getItem("nexus-pellet-hi") || 0);
    let lastHud = "";
    const keys = new Set<string>();

    function seed() {
      dots.clear();
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const ch = MAZE[r][c];
          if (ch === "." || ch === "o") dots.add(`${c},${r},${ch}`);
        }
      }
      player = { c: 9, r: 5, dc: 0, dr: 0, next: [0, 0] };
      ghosts = [
        { c: 1, r: 1, dc: 1, dr: 0, color: DANGER },
        { c: 17, r: 1, dc: -1, dr: 0, color: OK },
        { c: 1, r: 9, dc: 0, dr: -1, color: GOLD },
      ];
    }
    seed();

    function wantDir(): [number, number] {
      if (keys.has("KeyA") || keys.has("ArrowLeft") || dirRef.current.x < 0) return [-1, 0];
      if (keys.has("KeyD") || keys.has("ArrowRight") || dirRef.current.x > 0) return [1, 0];
      if (keys.has("KeyW") || keys.has("ArrowUp") || dirRef.current.y < 0) return [0, -1];
      if (keys.has("KeyS") || keys.has("ArrowDown") || dirRef.current.y > 0) return [0, 1];
      return [0, 0];
    }

    function stepGhost(g: Ghost) {
      const options = DIRS.filter(([dc, dr]) => open(g.c + dc, g.r + dr) && !(dc === -g.dc && dr === -g.dr));
      const pool = options.length ? options : DIRS.filter(([dc, dr]) => open(g.c + dc, g.r + dr));
      if (!pool.length) return;
      let best = pool[0];
      let bestScore = power > 0 ? -1e9 : 1e9;
      for (const [dc, dr] of pool) {
        const d = Math.abs(g.c + dc - player.c) + Math.abs(g.r + dr - player.r);
        if (power > 0) {
          if (d > bestScore) {
            bestScore = d;
            best = [dc, dr];
          }
        } else if (d < bestScore) {
          bestScore = d;
          best = [dc, dr];
        }
      }
      g.dc = best[0];
      g.dr = best[1];
      if (open(g.c + g.dc, g.r + g.dr)) {
        g.c += g.dc;
        g.r += g.dr;
      }
    }

    let moveAcc = 0;
    let ghostAcc = 0;

    function step(dt: number) {
      const wdir = wantDir();
      if (wdir[0] || wdir[1]) player.next = wdir;
      if (state === "ready") {
        if (wdir[0] || wdir[1]) {
          state = "run";
          player.dc = wdir[0];
          player.dr = wdir[1];
        }
        return;
      }
      if (state !== "run") return;
      power = Math.max(0, power - dt);
      moveAcc += dt;
      const pSpeed = 0.09;
      while (moveAcc >= pSpeed) {
        moveAcc -= pSpeed;
        const [nc, nr] = player.next;
        if ((nc || nr) && open(player.c + nc, player.r + nr)) {
          player.dc = nc;
          player.dr = nr;
        }
        if (open(player.c + player.dc, player.r + player.dr)) {
          player.c += player.dc;
          player.r += player.dr;
        }
        const k = `${player.c},${player.r}`;
        for (const d of [...dots]) {
          if (d.startsWith(k + ",")) {
            dots.delete(d);
            const powerDot = d.endsWith(",o");
            score += powerDot ? 20 : 5;
            goldRef.current(powerDot ? 4 : 1);
            beep(powerDot ? 520 : 880, 0.04, 0.03);
            if (powerDot) power = 6;
            if (score > hi) {
              hi = score;
              localStorage.setItem("nexus-pellet-hi", String(hi));
              hiRef.current?.(hi);
            }
          }
        }
      }
      ghostAcc += dt;
      const gSpeed = power > 0 ? 0.16 : 0.12;
      while (ghostAcc >= gSpeed) {
        ghostAcc -= gSpeed;
        for (const g of ghosts) stepGhost(g);
      }
      for (const g of ghosts) {
        if (g.c === player.c && g.r === player.r) {
          if (power > 0) {
            g.c = 9;
            g.r = 1;
            score += 40;
            goldRef.current(8);
            beep(200, 0.1, 0.05);
          } else {
            lives -= 1;
            beep(110, 0.2, 0.06);
            player = { c: 9, r: 5, dc: 0, dr: 0, next: [0, 0] };
            if (lives <= 0) state = "lose";
            else state = "ready";
          }
        }
      }
      if (dots.size === 0) {
        state = "win";
        goldRef.current(50);
      }
      const snap = `${score}|${lives}|${state}|${dots.size}`;
      if (snap !== lastHud) {
        lastHud = snap;
        setHud({ score, lives, left: dots.size, state });
      }
    }

    function draw() {
      const { w, h } = size;
      const tw = w / COLS;
      const th = h / ROWS;
      ctx.fillStyle = INK;
      ctx.fillRect(0, 0, w, h);
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (MAZE[r][c] === "#") {
            ctx.fillStyle = WALL;
            ctx.fillRect(c * tw, r * th, tw - 1, th - 1);
          }
        }
      }
      for (const d of dots) {
        const [cs, rs, kind] = d.split(",");
        const x = Number(cs) * tw + tw / 2;
        const y = Number(rs) * th + th / 2;
        ctx.fillStyle = CREAM;
        ctx.beginPath();
        ctx.arc(x, y, kind === "o" ? 5 : 2, 0, Math.PI * 2);
        ctx.fill();
      }
      const px = player.c * tw + tw / 2;
      const py = player.r * th + th / 2;
      blitHero(ctx, heroImg, px, py + th * 0.35, tw * 0.95, th * 1.15, CREW_FILTER[hero]);
      for (const g of ghosts) {
        ctx.fillStyle = power > 0 ? "#3a5a9a" : g.color;
        const gx = g.c * tw + 2;
        const gy = g.r * th + 2;
        ctx.fillRect(gx, gy, tw - 4, th - 6);
        ctx.fillStyle = CREAM;
        ctx.fillRect(gx + 3, gy + 4, 4, 4);
        ctx.fillRect(gx + tw - 11, gy + 4, 4, 4);
      }
      ctx.fillStyle = GOLD;
      ctx.font = "8px 'Press Start 2P', monospace";
      ctx.fillText(`${score}  L${lives}  HI ${hi}`, 8, 12);
      if (state !== "run") {
        ctx.fillStyle = "rgba(28,18,12,0.7)";
        ctx.fillRect(0, h * 0.4, w, 36);
        ctx.fillStyle = GOLD;
        ctx.font = "10px 'Press Start 2P', monospace";
        const msg = state === "win" ? "CLEARED" : state === "lose" ? "CAUGHT" : "SWIPE / WASD";
        ctx.fillText(msg, 12, h * 0.4 + 24);
      }
    }

    window.__controlsTest = {
      getYaw: () => player.c,
      getSpeed: () => Math.abs(player.dc) + Math.abs(player.dr),
      setKeys: (codes: string[]) => {
        keys.clear();
        for (const c of codes) keys.add(c);
      },
    };

    const stop = runLoop(step, draw);
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "KeyW", "KeyA", "KeyS", "KeyD", "Space"].includes(e.code)) {
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
        SPEED PELLET · {hud.score} · L{hud.lives} · {hud.left} left
      </p>
      <canvas
        ref={canvasRef}
        className="game-canvas"
        style={{ touchAction: "none" }}
        aria-label="Speed Pellet maze"
      />
      <TouchPad onDir={(x, y) => (dirRef.current = { x, y })} />
    </div>
  );
}
