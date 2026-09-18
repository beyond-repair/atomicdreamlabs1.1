import { Chess, type Move, type Square } from "chess.js";
import type { RoleId } from "./types.ts";
import { DUEL_DEPTH } from "./club.ts";

const VALUE: Record<string, number> = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 };

export type Pick = { from: Square; to: Square; promotion?: "q" };

export function depthFor(role: RoleId) {
  return DUEL_DEPTH[role] ?? 1;
}

export function pickMove(fen: string, depth: number, seed = 1): Pick | null {
  const game = new Chess(fen);
  const moves = game.moves({ verbose: true }) as Move[];
  if (!moves.length) return null;
  const d = Math.max(1, Math.min(3, depth));
  let best = moves[seed % moves.length];
  let bestScore = -Infinity;
  const side = game.turn() === "w" ? 1 : -1;
  for (let i = 0; i < moves.length; i++) {
    const m = moves[(i + seed) % moves.length];
    game.move(m);
    const score = -minimax(game, d - 1, -Infinity, Infinity, -side);
    game.undo();
    const jitter = ((seed * 13 + i * 7) % 5) - 2;
    if (score + jitter > bestScore) {
      bestScore = score + jitter;
      best = m;
    }
  }
  return {
    from: best.from as Square,
    to: best.to as Square,
    promotion: best.promotion ? "q" : undefined,
  };
}

function minimax(game: Chess, depth: number, alpha: number, beta: number, side: number): number {
  if (depth <= 0 || game.isGameOver()) return side * evaluate(game);
  const moves = game.moves({ verbose: true }) as Move[];
  let best = -Infinity;
  for (const m of moves) {
    game.move(m);
    const score = -minimax(game, depth - 1, -beta, -alpha, -side);
    game.undo();
    if (score > best) best = score;
    if (score > alpha) alpha = score;
    if (alpha >= beta) break;
  }
  return best;
}

function evaluate(game: Chess): number {
  if (game.isCheckmate()) return game.turn() === "w" ? -20000 : 20000;
  if (game.isDraw()) return 0;
  let score = 0;
  const board = game.board();
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (!p) continue;
      const v = VALUE[p.type] ?? 0;
      const center = (3.5 - Math.abs(c - 3.5)) + (3.5 - Math.abs(r - 3.5));
      score += (p.color === "w" ? 1 : -1) * (v + center);
    }
  }
  score += (game.moves().length * (game.turn() === "w" ? 1 : -1)) / 4;
  return score;
}

export function resultOf(game: Chess): "1-0" | "0-1" | "1/2-1/2" | null {
  if (!game.isGameOver()) return null;
  if (game.isCheckmate()) return game.turn() === "w" ? "0-1" : "1-0";
  return "1/2-1/2";
}
