import { DUEL_DEPTH } from "./club.ts";
import { heroName } from "./arcade.ts";
import type { RoleId } from "./types.ts";

export type BoutState = {
  ballX: number;
  ballY: number;
  vx: number;
  vy: number;
  leftY: number;
  rightY: number;
  scoreL: number;
  scoreR: number;
  ply: number;
  over: boolean;
};

export type BoutResult = {
  left: string;
  right: string;
  scoreL: number;
  scoreR: number;
  ply: number;
  result: "1-0" | "0-1" | "1/2-1/2";
};

const TO = 3;
const SPEED = 0.55;

export function createBout(seed = 1): BoutState {
  const dir = seed % 2 === 0 ? 1 : -1;
  return {
    ballX: 0.5,
    ballY: 0.5,
    vx: SPEED * dir,
    vy: SPEED * 0.35 * (seed % 3 === 0 ? -1 : 1),
    leftY: 0.5,
    rightY: 0.5,
    scoreL: 0,
    scoreR: 0,
    ply: 0,
    over: false,
  };
}

function chase(y: number, target: number, max: number, dt: number) {
  const d = target - y;
  const step = Math.max(-max, Math.min(max, d)) * dt * 6;
  return Math.max(0.12, Math.min(0.88, y + step));
}

export function stepBout(s: BoutState, left: RoleId, right: RoleId, dt: number): BoutState {
  if (s.over) return s;
  const next = { ...s };
  const lMax = 0.28 + DUEL_DEPTH[left] * 0.12;
  const rMax = 0.28 + DUEL_DEPTH[right] * 0.12;
  next.leftY = chase(s.leftY, s.ballY, lMax, dt);
  next.rightY = chase(s.rightY, s.ballY, rMax, dt);
  next.ballX = s.ballX + s.vx * dt;
  next.ballY = s.ballY + s.vy * dt;
  next.ply = s.ply + 1;
  if (next.ballY < 0.04) {
    next.ballY = 0.04;
    next.vy = Math.abs(s.vy);
  }
  if (next.ballY > 0.96) {
    next.ballY = 0.96;
    next.vy = -Math.abs(s.vy);
  }
  if (next.ballX < 0.08 && Math.abs(next.ballY - next.leftY) < 0.14) {
    next.ballX = 0.08;
    next.vx = Math.abs(s.vx) * 1.03;
    next.vy = (next.ballY - next.leftY) * 2.4;
  }
  if (next.ballX > 0.92 && Math.abs(next.ballY - next.rightY) < 0.14) {
    next.ballX = 0.92;
    next.vx = -Math.abs(s.vx) * 1.03;
    next.vy = (next.ballY - next.rightY) * 2.4;
  }
  if (next.ballX < 0) {
    next.scoreR += 1;
    next.ballX = 0.5;
    next.ballY = 0.5;
    next.vx = SPEED;
    next.vy = SPEED * 0.4;
  }
  if (next.ballX > 1) {
    next.scoreL += 1;
    next.ballX = 0.5;
    next.ballY = 0.5;
    next.vx = -SPEED;
    next.vy = -SPEED * 0.4;
  }
  if (next.scoreL >= TO || next.scoreR >= TO || next.ply > 2400) next.over = true;
  return next;
}

export function resultOfBout(s: BoutState, left: RoleId, right: RoleId): BoutResult {
  const result: BoutResult["result"] =
    s.scoreL === s.scoreR ? "1/2-1/2" : s.scoreL > s.scoreR ? "1-0" : "0-1";
  return {
    left: heroName(left),
    right: heroName(right),
    scoreL: s.scoreL,
    scoreR: s.scoreR,
    ply: s.ply,
    result,
  };
}

export function playBout(left: RoleId, right: RoleId, seed = 1): BoutResult {
  let s = createBout(seed);
  while (!s.over) s = stepBout(s, left, right, 1 / 60);
  return resultOfBout(s, left, right);
}