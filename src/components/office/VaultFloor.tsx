import { ArcadeFloor } from "@/components/office/ArcadeFloor";
import { WalkingAgents } from "@/components/office/WalkingAgents";
import { ExchangeFloor } from "@/components/office/rooms/ExchangeFloor";
import { VAULT_FLOORS, canonicalRoom, crewHall, ROOMS, type HallId, type VaultCell } from "@/lib/nexus/campus";
import { STAGER_ROLE, hydrateQueue } from "@/lib/nexus/stage";
import { useNexus } from "@/lib/nexus/store";
import { plantStats } from "@/lib/nexus/watches";
import { cn } from "@/lib/utils";

function liveLine(room: HallId, ctx: { stock: string; sku: string; low: boolean; cabinets: number; zone: string }): string {
  if (room === "exchange") return `${ctx.sku.toUpperCase()} ${ctx.stock}${ctx.low ? " · LOW" : ""}`;
  if (room === "arcade") return ctx.zone === "tapes" ? `${ctx.cabinets} CABINETS` : ctx.zone.toUpperCase();
  return "COUNTER";
}

export function VaultFloor() {
  const setRoom = useNexus((s) => s.setRoom);
  const room = canonicalRoom(useNexus((s) => s.room));
  const speech = useNexus((s) => s.speech);
  const biz = useNexus((s) => s.biz);
  const queue = hydrateQueue(useNexus((s) => s.queue));
  const working = useNexus((s) => s.working);
  const club = useNexus((s) => s.club);
  const cabinets = (biz.cabinets ?? []).length;
  const stats = plantStats(biz);
  const pulse = new Set(
    queue.filter((p) => !p.proposal.executed).map((p) => crewHall(STAGER_ROLE[p.stager], { queue, working, viewing: room })),
  );
  const ctx = {
    stock: String(stats.stock),
    sku: stats.sku,
    low: stats.low,
    cabinets,
    zone: club.zone,
  };

  return (
    <div className="hq">
      <header className="vault-kicker">
        <p className="font-pixel text-[8px] text-gold">ADL NEXUS</p>
        <p className="campus-kicker">{speech || "Talk at the counter. Crew walks the job."}</p>
      </header>
      <div className="hq-stack">
        {VAULT_FLOORS.map((floor) => {
          const cell = floor.rooms[0] as VaultCell;
          const focused = room === cell.room;
          const riding = pulse.has(cell.room);
          return (
            <section key={floor.id} id={`vault-floor-${floor.id}`} className={cn("hq-floor", focused && "focus", riding && "pulse")}>
              <button
                type="button"
                className="hq-lift"
                onClick={() => setRoom(cell.room)}
                aria-label={`${floor.mark} ${floor.label}`}
              >
                <span className="vault-mark">{floor.mark}</span>
                <span className="vault-lift-name">{floor.label}</span>
              </button>
              <div className="hq-chamber">
                <button
                  type="button"
                  id={`vault-room-${cell.room}`}
                  className="hq-enter"
                  onClick={() => setRoom(cell.room)}
                  aria-label={ROOMS[cell.room].label}
                >
                  <img src={`${cell.art}?v=hq`} alt="" className="vault-art" draggable={false} />
                  <span className="vault-shade" aria-hidden />
                  <span className="vault-plaque">{ROOMS[cell.room].chip}</span>
                  <span className="vault-live">{liveLine(cell.room, ctx)}</span>
                  {!focused ? <span className="vault-blurb">{cell.blurb}</span> : null}
                </button>
                <div className="agent-layer">
                  <WalkingAgents floor={cell.room} />
                </div>
                {focused && cell.room === "arcade" ? (
                  <div className="hq-work">
                    <ArcadeFloor embedded />
                  </div>
                ) : null}
                {focused && cell.room === "exchange" ? (
                  <div className="hq-work">
                    <ExchangeFloor embedded />
                  </div>
                ) : null}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
