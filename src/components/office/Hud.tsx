import { useEffect, useState } from "react";
import { ROOM_ORDER, ROOMS } from "@/lib/nexus/campus";
import { useNexus } from "@/lib/nexus/store";
import { plantStats } from "@/lib/nexus/watches";
import { cn } from "@/lib/utils";

function clock() {
  const d = new Date();
  return d.toTimeString().slice(0, 5);
}

export function Hud() {
  const gold = useNexus((s) => s.gold);
  const crewGold = useNexus((s) => s.crewGold);
  const tap = useNexus((s) => s.tapObject);
  const biz = useNexus((s) => s.biz);
  const lastRun = useNexus((s) => s.lastRun);
  const overlay = useNexus((s) => s.overlay);
  const briefed = useNexus((s) => s.briefed);
  const room = useNexus((s) => s.room);
  const playingId = useNexus((s) => s.playingId);
  const setRoom = useNexus((s) => s.setRoom);
  const queue = useNexus((s) => s.queue);
  const setDockTab = useNexus((s) => s.setDockTab);
  const pickPacket = useNexus((s) => s.pickPacket);
  const [time, setTime] = useState("");
  const stats = plantStats(biz);
  const pulse = stats.halted || stats.holds > 0 || stats.low;
  const quiet = !!overlay || !briefed || !!playingId;
  const waiting = queue.filter((p) => !p.proposal.executed);
  const waitingCount = waiting.length;

  useEffect(() => {
    setTime(clock());
    const id = window.setInterval(() => setTime(clock()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <header className={cn("office-hud", quiet && "quiet")}>
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
        <div className="flex flex-wrap items-end gap-x-5 gap-y-1">
          <p className="font-pixel text-[10px] text-cream md:text-[12px]">NEXUS</p>
          <p className="font-pixel text-[10px] text-muted md:text-[12px]">
            GOLD <span className="tabular-nums text-cream">{gold}</span>
            {crewGold ? (
              <span className="text-muted">
                {" "}
                CREW <span className="tabular-nums text-cream">{crewGold}</span>
              </span>
            ) : null}
          </p>
          <p className="font-pixel text-[10px] text-muted md:text-[12px]">
            {stats.sku.toUpperCase()} <span className="tabular-nums text-cream">{stats.stock}</span>
          </p>
          {waitingCount ? (
            <button
              type="button"
              id="hud-queue"
              onClick={() => {
                const first = waiting[0];
                if (first) pickPacket(first.id);
                else setDockTab("govern");
              }}
              className="font-pixel text-[10px] hud-pulse text-gold md:text-[12px]"
              aria-label={`${waitingCount} staged packets waiting in GOVERN`}
            >
              QUEUE <span className="tabular-nums text-cream">{waitingCount}</span>
            </button>
          ) : pulse ? (
            <p className={cn("font-pixel text-[10px] md:text-[12px]", stats.halted ? "hud-pulse text-danger" : "hud-pulse text-gold")}>
              {stats.halted ? "HALTED" : stats.holds ? `HOLD ${stats.holds}` : "LOW"}
            </p>
          ) : stats.auto ? (
            <p className="font-pixel text-[10px] text-muted md:text-[12px]">AUTO</p>
          ) : null}
          {time ? (
            <button
              type="button"
              onClick={() => tap("clock")}
              className="font-pixel text-[10px] text-muted md:text-[12px]"
              aria-label="Open clock"
            >
              <span className="tabular-nums text-cream" suppressHydrationWarning>
                {time}
              </span>
            </button>
          ) : null}
        </div>
      </div>
      <nav className="room-rail" aria-label="Rooms">
        {ROOM_ORDER.map((id) => (
          <button
            key={id}
            type="button"
            id={`btn-room-${id}`}
            onClick={() => setRoom(id)}
            className={cn("room-chip", room === id && "on")}
            aria-label={ROOMS[id].label}
          >
            {ROOMS[id].chip}
          </button>
        ))}
      </nav>
      {lastRun ? (
        <p className="hud-cycle mt-1 font-pixel text-[7px] text-muted md:text-[9px]">
          {lastRun.title.toUpperCase()} <span className="tabular-nums text-cream">{lastRun.hash.slice(0, 8)}</span>
        </p>
      ) : null}
    </header>
  );
}
