import { useEffect, useRef, useState } from "react";
import { StationBot } from "@/components/office/rooms/StationBot";
import { bindCanvas, runLoop } from "@/components/office/games/canvas";
import { createBout, resultOfBout, stepBout, type BoutState } from "@/lib/nexus/bout";
import { DUELISTS } from "@/lib/nexus/club";
import { CREW } from "@/lib/nexus/crew";
import { heroName } from "@/lib/nexus/arcade";
import { useNexus } from "@/lib/nexus/store";
import type { RoleId } from "@/lib/nexus/types";
import { cn } from "@/lib/utils";

const INK = "#111110";
const CREAM = "#e6e1d6";
const GOLD = "#c5c0b4";
const WOOD = "#23211e";

export function BoutBoard() {
  const recordDuel = useNexus((s) => s.recordDuel);
  const grantFeat = useNexus((s) => s.grantFeat);
  const duels = useNexus((s) => s.club.duels);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [left, setLeft] = useState<RoleId>("engineer");
  const [right, setRight] = useState<RoleId>("qa");
  const [note, setNote] = useState("WATCH two crew play packet pong. First to 3. Depth is honest.");
  const [score, setScore] = useState("0 – 0");
  const stateRef = useRef<BoutState | null>(null);
  const pairRef = useRef({ left, right });
  const logged = useRef(false);
  pairRef.current = { left, right };

  function boot(nextL: RoleId, nextR: RoleId) {
    setLeft(nextL);
    setRight(nextR);
    pairRef.current = { left: nextL, right: nextR };
    stateRef.current = createBout((Date.now() % 97) + 1);
    logged.current = false;
    grantFeat("bout");
    setNote(`${CREW[nextL].name} vs ${CREW[nextR].name}. First to 3.`);
    setScore("0 – 0");
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const bound = bindCanvas(canvas);
    if (!bound) return;
    const { ctx, size, disconnect } = bound;

    const stop = runLoop((dt) => {
      const s = stateRef.current;
      if (!s || s.over) return;
      const next = stepBout(s, pairRef.current.left, pairRef.current.right, dt);
      stateRef.current = next;
      if (next.scoreL !== s.scoreL || next.scoreR !== s.scoreR) {
        setScore(`${next.scoreL} – ${next.scoreR}`);
      }
      if (next.over && !logged.current) {
        logged.current = true;
        const end = resultOfBout(next, pairRef.current.left, pairRef.current.right);
        recordDuel({
          id: `bout-${Date.now().toString(16)}`,
          white: end.left,
          black: end.right,
          result: end.result,
          ply: end.ply,
          ts: Date.now(),
        });
        setNote(`${end.left} ${end.scoreL}–${end.scoreR} ${end.right} · ${end.ply} ply`);
        setScore(`${end.scoreL} – ${end.scoreR}`);
      }
    }, () => {
      const s = stateRef.current;
      const { w, h } = size;
      ctx.fillStyle = INK;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = WOOD;
      ctx.fillRect(w / 2 - 1, 0, 2, h);
      if (!s) {
        ctx.fillStyle = GOLD;
        ctx.font = "10px 'Press Start 2P', monospace";
        ctx.fillText("RUN A BOUT", 16, h / 2);
        return;
      }
      ctx.fillStyle = CREAM;
      ctx.fillRect(8, s.leftY * h - 22, 6, 44);
      ctx.fillRect(w - 14, s.rightY * h - 22, 6, 44);
      ctx.fillStyle = GOLD;
      ctx.beginPath();
      ctx.arc(s.ballX * w, s.ballY * h, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = "10px 'Press Start 2P', monospace";
      ctx.fillText(`${s.scoreL}   ${s.scoreR}`, w / 2 - 28, 18);
      if (s.over) {
        ctx.fillStyle = CREAM;
        ctx.fillText("HASHED", 16, h - 16);
      }
    });
    return () => {
      stop();
      disconnect();
    };
  }, [recordDuel]);

  return (
    <div className="theater-stage">
      <div className="duel-head">
        <div className="duel-seat">
          <StationBot pose="idle" name={heroName(left)} role={left} />
          <p className="font-pixel text-[7px] text-muted">LEFT · {CREW[left].job}</p>
        </div>
        <p className="font-pixel text-[8px] text-muted">{score}</p>
        <div className="duel-seat">
          <StationBot pose="idle" name={heroName(right)} role={right} flip />
          <p className="font-pixel text-[7px] text-muted">RIGHT · {CREW[right].job}</p>
        </div>
      </div>
      <p className="theater-note">{note}</p>
      <canvas ref={canvasRef} className="game-canvas" aria-label="Packet bout" />
      <div className="club-zones">
        <button type="button" id="btn-bout-run" className="room-chip on" onClick={() => boot(left, right)}>
          RUN
        </button>
        <button type="button" className="room-chip" onClick={() => boot("engineer", "qa")}>
          RIX VS NYX
        </button>
        <button type="button" className="room-chip" onClick={() => boot("cpo", "pm")}>
          VEX VS HAL
        </button>
        {DUELISTS.filter((r) => r !== left).slice(0, 3).map((r) => (
          <button key={r} type="button" className="room-chip" onClick={() => boot(left, r)}>
            vs {CREW[r].name}
          </button>
        ))}
      </div>
      {duels[0] ? (
        <p className="font-body text-lg text-muted">
          Last {duels[0].white} vs {duels[0].black} · {duels[0].result} · {duels[0].ply} ply
        </p>
      ) : null}
    </div>
  );
}