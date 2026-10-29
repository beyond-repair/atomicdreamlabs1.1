import { useEffect, useState, useSyncExternalStore } from "react";
import { Dwellers } from "@/components/office/Dwellers";
import { LivePlate } from "@/components/office/LivePlate";
import { RoomInterior } from "@/components/office/RoomInterior";
import {
  DECK_HALL,
  VAULT_FLOORS,
  deckRequest,
  requestDeck,
  subscribeDeck,
  type DeckId,
} from "@/lib/nexus/campus";
import { CREW } from "@/lib/nexus/crew";
import { armTeleport, facilityNow, facilityTick, subscribeFacility } from "@/lib/nexus/lift";
import { useNexus } from "@/lib/nexus/store";
import { fetchLiveSpot } from "@/lib/nexus/business";
import { plantStats } from "@/lib/nexus/watches";
import { cn } from "@/lib/utils";

function useFacilityTick() {
  return useSyncExternalStore(subscribeFacility, facilityTick, () => 0);
}

function liveLine(
  deck: DeckId,
  ctx: { stock: string; low: boolean; cabinets: number; waiting: number; zone: string; halted: boolean; spot: string },
) {
  if (deck === "trade") return ctx.halted ? "HELD" : ctx.spot ? `BTC ${ctx.spot}` : "PAPER";
  if (deck === "plant") return ctx.low ? `${ctx.stock} LOW` : `${ctx.stock} STOCK`;
  if (deck === "arcade") return `${ctx.cabinets} CABS`;
  if (deck === "lounge") return ctx.zone === "tapes" ? "TUBE" : ctx.zone.toUpperCase();
  if (deck === "proof") return ctx.waiting ? `QUEUE ${ctx.waiting}` : "CLEAR";
  if (deck === "core") return ctx.waiting ? `QUEUE ${ctx.waiting}` : "RING";
  if (deck === "lobby") return "CHAT";
  if (deck === "service") return ctx.halted ? "HALT" : "BAY";
  if (deck === "lab") return "BENCH";
  if (deck === "stacks") return "BOOKS";
  return "LIVE";
}

export function VaultFloor() {
  const setRoom = useNexus((s) => s.setRoom);
  const setDockTab = useNexus((s) => s.setDockTab);
  const setClubZone = useNexus((s) => s.setClubZone);
  const zone = useNexus((s) => s.club.zone);
  const biz = useNexus((s) => s.biz);
  const setBiz = useNexus((s) => s.setBiz);
  const queue = useNexus((s) => s.queue);
  const [open, setOpen] = useState<DeckId | null>(null);
  const [fault, setFault] = useState("");
  useFacilityTick();
  const deckN = useSyncExternalStore(subscribeDeck, () => deckRequest().n, () => 0);
  const snap = facilityNow();
  const stats = plantStats(biz);
  const waiting = queue.filter((p) => !p.proposal.executed).length;
  const ctx = {
    stock: String(stats.stock),
    low: stats.low,
    cabinets: (biz.cabinets ?? []).length,
    waiting,
    zone,
    halted: !!biz.halted,
    spot: biz.lastSpot?.price ? (biz.lastSpot.price >= 1000 ? `${Math.round(biz.lastSpot.price / 1000)}k` : String(Math.round(biz.lastSpot.price))) : "",
  };

  useEffect(() => {
    if (biz.lastSpot?.live) return;
    let stop = false;
    void fetchLiveSpot("BTC").then((mark) => {
      if (stop || !mark.live) return;
      setBiz({ lastSpot: { symbol: "BTC", price: mark.price, ts: Date.now(), live: true } });
    });
    return () => {
      stop = true;
    };
  }, [biz.lastSpot?.live, setBiz]);

  useEffect(() => {
    if (!deckN) return;
    const req = deckRequest();
    enter(req.deck, req.station);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckN]);

  function enter(deck: DeckId, station = "") {
    const res = armTeleport(deck, { halted: !!biz.halted });
    setFault(res.reason);
    if (!res.ok) return;
    if (deck === "lobby") {
      setOpen("lobby");
      setRoom("office");
      setDockTab("chat");
      document.getElementById("nexus-goal")?.focus();
      return;
    }
    const hall = DECK_HALL[deck];
    setRoom(hall);
    if (deck === "plant" || deck === "trade" || deck === "proof" || deck === "core") setDockTab("govern");
    else if (deck !== "lab" && deck !== "stacks" && deck !== "service") setDockTab("chat");
    if (deck === "lounge") setClubZone(station === "steam" ? "steam" : "tube");
    if (deck === "arcade") setClubZone("tapes");
    setOpen(deck);
  }

  return (
    <div className="decks">
      <div className="deck-shaft" aria-label="Teleporter">
        <p className={cn("gate-read", fault && "fault", snap?.car.status)}>
          {fault || (open ? (VAULT_FLOORS.flatMap((f) => f.rooms).find((r) => r.deck === open)?.name ?? "GATE") : "GATE")}
        </p>
        {VAULT_FLOORS.map((floor, index) => {
          const here = floor.rooms.some((r) => r.deck === open);
          const hot = snap?.car && Math.round(snap.car.pos) === index && (snap.car.status === "arm" || snap.car.status === "jump");
          return (
            <button
              key={floor.id}
              type="button"
              className={cn("deck-call", snap?.calls.includes(floor.id) && "on", here && "here", hot && "hot")}
              onClick={() => requestDeck(floor.rooms[0]?.deck ?? "lobby")}
              aria-label={`Jump to ${floor.label}`}
            >
              <span className="deck-call-no">{floor.mark}</span>
              <span className="deck-call-name">{floor.label}</span>
              {hot ? <span className="gate-charge" style={{ transform: `scaleX(${snap?.car.door ?? 0})` }} /> : null}
            </button>
          );
        })}
      </div>
      <div className="deck-stack">
        {VAULT_FLOORS.map((floor) => (
          <section key={floor.id} className={cn("deck-floor", floor.rooms.length > 2 && "triple", floor.rooms.length === 1 && "single")}>
            {floor.rooms.map((cell) => {
              const staff = (snap?.riders ?? []).filter((r) => r.dest === cell.deck || r.visit === cell.deck);
              return (
                <div
                  key={cell.deck}
                  id={`vault-room-${cell.deck}`}
                  className={cn("deck-cell", cell.hatch && "hatch", open === cell.deck && "on", cell.deck === "trade" && biz.halted && "held")}
                >
                  {cell.art ? <LivePlate src={`${cell.art}?v=live`} deck={cell.deck} /> : null}
                  <span className="deck-shade" />
                  <button type="button" className="deck-open" onClick={() => requestDeck(cell.deck)} aria-label={cell.name}>
                    <span className="deck-plate">
                      <span className="deck-name">{cell.name}</span>
                      <span className="deck-live">{liveLine(cell.deck, ctx)}</span>
                    </span>
                  </button>
                  <span className="deck-note">
                    {cell.deck === "lobby" && snap?.line
                      ? snap.line
                      : staff.length
                        ? staff
                            .map((r) =>
                              r.locked && r.task !== "Staffing" && r.task !== "Counter"
                                ? `${CREW[r.id].tag} ${r.task}`
                                : CREW[r.id].tag,
                            )
                            .join(" ")
                        : cell.blurb}
                  </span>
                </div>
              );
            })}
          </section>
        ))}
      </div>
      <Dwellers open={open} />
      {open ? <RoomInterior deck={open} onClose={() => setOpen(null)} /> : null}
    </div>
  );
}
