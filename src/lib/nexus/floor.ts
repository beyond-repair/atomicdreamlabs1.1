import type { RoleId } from "./types";

export type Box = { x: number; y: number; w: number; h: number };
export type Vec = { x: number; y: number };

/** Furniture + walls in percent of the office stage. Feet collide at (x, y). */
export const BLOCKS: Box[] = [
  { x: 0, y: 0, w: 100, h: 28 },
  { x: 0, y: 0, w: 8, h: 100 },
  { x: 93, y: 0, w: 7, h: 100 },
  { x: 0, y: 88, w: 100, h: 12 },
  { x: 14, y: 32, w: 14, h: 18 },
  { x: 30, y: 30, w: 16, h: 20 },
  { x: 48, y: 50, w: 15, h: 14 },
  { x: 78, y: 28, w: 16, h: 18 },
  { x: 78, y: 54, w: 18, h: 24 },
  { x: 37, y: 48, w: 8, h: 7 },
];

const RADIUS = 3.4;

function overlap(a: Box, b: Box) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

export function blocked(x: number, y: number, r = RADIUS) {
  const me = { x: x - r, y: y - r * 0.55, w: r * 2, h: r * 1.1 };
  return BLOCKS.some((b) => overlap(me, b));
}

export function clampWalk(x: number, y: number) {
  return {
    x: Math.min(90, Math.max(12, x)),
    y: Math.min(84, Math.max(32, y)),
  };
}

/** Open hall — no furniture collision. Lift is x≈18. */
export function resolveOpen(_x: number, _y: number, nx: number, ny: number) {
  return {
    x: Math.min(88, Math.max(18, nx)),
    y: Math.min(82, Math.max(36, ny)),
  };
}

/** Move with separate-axis AABB so agents slide along desks instead of tunneling. */
export function resolveMove(x: number, y: number, nx: number, ny: number) {
  const c = clampWalk(nx, y);
  let px = blocked(c.x, c.y) ? x : c.x;
  const d = clampWalk(px, ny);
  let py = blocked(d.x, d.y) ? y : d.y;
  if (px === x && py === y) {
    const step = 4.2;
    const dirs: Vec[] = [
      { x: step, y: 0 },
      { x: -step, y: 0 },
      { x: 0, y: step },
      { x: 0, y: -step },
      { x: step, y: step },
      { x: -step, y: step },
      { x: step, y: -step },
      { x: -step, y: -step },
    ];
    let best = { x, y, score: Infinity };
    const tx = nx;
    const ty = ny;
    for (const dir of dirs) {
      const p = clampWalk(x + dir.x, y + dir.y);
      if (blocked(p.x, p.y)) continue;
      const score = (p.x - tx) ** 2 + (p.y - ty) ** 2;
      if (score < best.score) best = { x: p.x, y: p.y, score };
    }
    px = best.x;
    py = best.y;
  }
  return { x: px, y: py };
}

export function walkableSpot(x: number, y: number) {
  const c = clampWalk(x, y);
  if (!blocked(c.x, c.y)) return c;
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const p = clampWalk(c.x + Math.cos(a) * 8, c.y + Math.sin(a) * 6);
    if (!blocked(p.x, p.y)) return p;
  }
  return { x: 54, y: 70 };
}

export const HOME: Record<
  Exclude<RoleId, "ceo" | "cto" | "operator">,
  { x: number; y: number; flip: boolean; sit?: boolean; patrol: [number, number][] }
> = {
  engineer: { x: 44.6, y: 56.8, flip: false, sit: true, patrol: [] },
  cpo: {
    x: 50,
    y: 64,
    flip: false,
    patrol: [
      [50, 64],
      [56, 72],
      [62, 60],
    ],
  },
  pm: {
    x: 60,
    y: 44,
    flip: true,
    patrol: [
      [52, 44],
      [60, 44],
      [66, 52],
    ],
  },
  qa: {
    x: 64,
    y: 66,
    flip: true,
    patrol: [
      [64, 66],
      [58, 74],
      [72, 58],
    ],
  },
};

/** Stagers with a packet sit under the GATE CRT until COMMIT. */
export const GATE_WAIT: Record<Exclude<RoleId, "ceo" | "cto" | "operator">, Vec> = {
  qa: walkableSpot(70, 36),
  engineer: walkableSpot(62, 36),
  pm: walkableSpot(74, 40),
  cpo: walkableSpot(54, 38),
};

export const CORRIDOR: [number, number][] = [
  [50, 42],
  [62, 40],
  [44, 68],
  [54, 72],
  [66, 72],
  [72, 58],
  [36, 64],
  [42, 58],
  [48, 78],
  [64, 48],
];

export function stationWalk(id: keyof typeof HOME, except?: Vec) {
  const home = HOME[id];
  const pts = (home.patrol.length ? home.patrol : CORRIDOR).map(([x, y]) => walkableSpot(x, y));
  const pool = except ? pts.filter((p) => Math.hypot(p.x - except.x, p.y - except.y) > 6) : pts;
  const pick = (pool.length ? pool : pts)[Math.floor(Math.random() * (pool.length ? pool.length : pts.length))];
  return pick ?? { x: home.x, y: home.y };
}

export function randomWalk(except?: Vec) {
  const open = CORRIDOR.map(([x, y]) => walkableSpot(x, y)).filter((p) => !blocked(p.x, p.y));
  const pool = except ? open.filter((p) => Math.hypot(p.x - except.x, p.y - except.y) > 8) : open;
  const pick = (pool.length ? pool : open)[Math.floor(Math.random() * (pool.length ? pool.length : open.length))];
  return pick ?? { x: 54, y: 70 };
}

export const TALK_R = 14;
