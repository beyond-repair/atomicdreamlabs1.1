import { Chess, type Square } from "chess.js";
import { useEffect, useMemo, useRef, useState } from "react";
import { StationBot } from "@/components/office/rooms/StationBot";
import { DUELISTS, boardRows } from "@/lib/nexus/club";
import { depthFor, pickMove, resultOf, type Pick } from "@/lib/nexus/chessAi";
import { CREW } from "@/lib/nexus/crew";
import { heroName } from "@/lib/nexus/arcade";
import { useNexus } from "@/lib/nexus/store";
import type { RoleId } from "@/lib/nexus/types";
import { cn } from "@/lib/utils";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const GLYPH: Record<string, string> = {
  wk: "♔",
  wq: "♕",
  wr: "♖",
  wb: "♗",
  wn: "♘",
  wp: "♙",
  bk: "♚",
  bq: "♛",
  br: "♜",
  bb: "♝",
  bn: "♞",
  bp: "♟",
};

type Mode = "you" | "watch";

export function DuelBoard() {
  const recordDuel = useNexus((s) => s.recordDuel);
  const grantFeat = useNexus((s) => s.grantFeat);
  const duels = useNexus((s) => s.club.duels);
  const scores = useNexus((s) => s.club.scores);
  const gameRef = useRef(new Chess());
  const [fen, setFen] = useState(gameRef.current.fen());
  const [sel, setSel] = useState<Square | null>(null);
  const [mode, setMode] = useState<Mode>("you");
  const [white, setWhite] = useState<RoleId | "you">("you");
  const [black, setBlack] = useState<RoleId>("qa");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("You are white. Tap a piece, then a square.");
  const auto = useRef(false);

  const legal = useMemo(() => {
    const g = gameRef.current;
    if (!sel) return new Set<string>();
    return new Set(g.moves({ square: sel, verbose: true }).map((m) => m.to));
  }, [sel, fen]);

  function snap(msg?: string) {
    const g = gameRef.current;
    setFen(g.fen());
    setSel(null);
    const end = resultOf(g);
    if (end) {
      auto.current = false;
      setBusy(false);
      const wName = white === "you" ? "YOU" : CREW[white].name;
      const bName = CREW[black].name;
      recordDuel({
        id: `duel-${Date.now().toString(16)}`,
        white: wName,
        black: bName,
        result: end,
        ply: g.history().length,
        ts: Date.now(),
      });
      if (white === "you" && end === "1-0") grantFeat("champ");
      setNote(end === "1/2-1/2" ? "Draw. Stalemate or repetition." : end === "1-0" ? `${wName} mates.` : `${bName} mates.`);
      return;
    }
    if (msg) setNote(msg);
  }

  function boot(nextWhite: RoleId | "you", nextBlack: RoleId, nextMode: Mode) {
    gameRef.current.reset();
    auto.current = nextMode === "watch";
    setWhite(nextWhite);
    setBlack(nextBlack);
    setMode(nextMode);
    setBusy(false);
    grantFeat("duel");
    snap(
      nextMode === "watch"
        ? `${CREW[nextWhite as RoleId].name} vs ${CREW[nextBlack].name}. Depth ${depthFor(nextWhite as RoleId)} / ${depthFor(nextBlack)}.`
        : `You vs ${CREW[nextBlack].name}. Depth ${depthFor(nextBlack)}.`,
    );
  }

  function agentTurn() {
    const g = gameRef.current;
    if (g.isGameOver()) return;
    const turn = g.turn() === "w" ? white : black;
    if (turn === "you") return;
    setBusy(true);
    const pick = pickMove(g.fen(), depthFor(turn), g.history().length + 1);
    if (!pick) {
      snap();
      return;
    }
    g.move({ from: pick.from, to: pick.to, promotion: pick.promotion });
    snap(`${CREW[turn].name} ${pick.from}${pick.to}`);
    setBusy(false);
  }

  useEffect(() => {
    if (gameRef.current.isGameOver()) return;
    const turn = gameRef.current.turn() === "w" ? white : black;
    if (turn === "you" && !auto.current) return;
    if (turn === "you") return;
    const id = window.setTimeout(() => agentTurn(), mode === "watch" ? 380 : 220);
    return () => window.clearTimeout(id);
    // fen gates the next ply
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fen, white, black, mode]);

  function tapSquare(sq: Square) {
    const g = gameRef.current;
    if (busy || g.isGameOver()) return;
    const turn = g.turn() === "w" ? white : black;
    if (turn !== "you") return;
    const piece = g.get(sq);
    if (sel && legal.has(sq)) {
      const mv: Pick = { from: sel, to: sq };
      const pawn = g.get(sel)?.type === "p";
      const promoRank = g.turn() === "w" ? "8" : "1";
      if (pawn && sq[1] === promoRank) mv.promotion = "q";
      const ok = g.move(mv);
      if (ok) snap("Your move hashed on the board. Agent thinks.");
      return;
    }
    if (piece && piece.color === g.turn()) {
      setSel(sq);
      return;
    }
    setSel(null);
  }

  const board = gameRef.current.board();
  const boardHi = boardRows({ scores, duels, zone: "duel", plays: 0, tubeId: null, lastTune: null });

  return (
    <div className="theater-stage">
      <div className="duel-head">
        <Seat who={white === "you" ? "YOU" : CREW[white].name} role={white === "you" ? "operator" : white} side="w" />
        <p className="font-pixel text-[8px] text-muted">VS</p>
        <Seat who={CREW[black].name} role={black} side="b" />
      </div>
      <p className="theater-note">{note}</p>
      <div className="chess-wrap">
        <div className="chess-board" role="grid" aria-label="Chess board">
          {board.map((row, r) =>
            row.map((cell, c) => {
              const sq = `${FILES[c]}${8 - r}` as Square;
              const dark = (r + c) % 2 === 1;
              const on = sel === sq;
              const mark = legal.has(sq);
              const king = cell?.type === "k" && gameRef.current.isCheck() && cell.color === gameRef.current.turn();
              return (
                <button
                  key={sq}
                  type="button"
                  className={cn("chess-sq", dark && "dark", on && "on", mark && "mark", king && "check")}
                  onClick={() => tapSquare(sq)}
                  aria-label={sq}
                >
                  {cell ? (
                    <span className={cn("chess-man", cell.color === "w" ? "is-w" : "is-b")}>
                      {GLYPH[`${cell.color}${cell.type}`]}
                    </span>
                  ) : null}
                </button>
              );
            }),
          )}
        </div>
      </div>
      <div className="club-zones">
        <button type="button" className={cn("room-chip", mode === "you" && "on")} onClick={() => boot("you", black, "you")}>
          YOU
        </button>
        {DUELISTS.map((r) => (
          <button
            key={r}
            type="button"
            className={cn("room-chip", mode === "you" && black === r && "on")}
            onClick={() => boot("you", r, "you")}
          >
            {CREW[r].name}
          </button>
        ))}
        <button
          type="button"
          className={cn("room-chip", mode === "watch" && "on")}
          onClick={() => boot("engineer", "qa", "watch")}
        >
          RIX VS NYX
        </button>
        <button type="button" className="room-chip" onClick={() => boot("cpo", "pm", "watch")}>
          VEX VS HAL
        </button>
      </div>
      {duels[0] ? (
        <p className="font-body text-lg text-muted">
          Last {duels[0].white} vs {duels[0].black} · {duels[0].result} · {duels[0].ply} ply
        </p>
      ) : null}
      {boardHi.length ? (
        <ul className="club-board">
          {boardHi.slice(0, 4).map((s, i) => (
            <li key={`${s.game}-${i}`}>
              <span className="font-pixel text-[8px] text-muted">{i + 1}</span>
              <span className="font-body text-lg text-cream">
                {s.title} · {heroName(s.hero)}
              </span>
              <span className="font-pixel text-[8px] text-gold tabular-nums">{s.score}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function Seat({ who, role, side }: { who: string; role: RoleId; side: "w" | "b" }) {
  return (
    <div className="duel-seat">
      <StationBot pose="idle" name={who} role={role} flip={side === "b"} />
      <p className="font-pixel text-[7px] text-muted">{side === "w" ? "WHITE" : "BLACK"} · {CREW[role].job}</p>
    </div>
  );
}
