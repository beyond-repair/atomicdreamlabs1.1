import { CampusFrame } from "@/components/office/CampusFrame";
import { CabinetPlay } from "@/components/office/games/CabinetPlay";
import { DeskSheet } from "@/components/office/overlays/DeskSheet";
import { DuelBoard } from "@/components/office/rooms/DuelBoard";
import { SteamLounge } from "@/components/office/rooms/SteamLounge";
import { TubePortal } from "@/components/office/rooms/TubePortal";
import { hydrateCabinets, heroName, heroSprite, type Cabinet } from "@/lib/nexus/arcade";
import { CREW_CLASS } from "@/lib/nexus/crew";
import { useNexus } from "@/lib/nexus/store";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const PANES = [
  { id: "cabs", chip: "ARCADE" },
  { id: "tube", chip: "TUBE" },
  { id: "steam", chip: "STEAM" },
  { id: "duel", chip: "CHESS" },
] as const;

type PlayPane = (typeof PANES)[number]["id"];

export function ArcadeFloor({ embedded }: { embedded?: boolean }) {
  const biz = useNexus((s) => s.biz);
  const cabinets = hydrateCabinets(biz.cabinets);
  const playingId = useNexus((s) => s.playingId);
  const play = useNexus((s) => s.playCabinet);
  const close = useNexus((s) => s.closeCabinet);
  const stageCrew = useNexus((s) => s.stageCrew);
  const busy = useNexus((s) => s.busy);
  const working = useNexus((s) => s.working);
  const lastRun = useNexus((s) => s.lastRun);
  const zone = useNexus((s) => s.club.zone);
  const setClubZone = useNexus((s) => s.setClubZone);
  const forging = busy || working.includes("engineer");
  const playing = cabinets.find((c) => c.id === playingId) ?? null;
  const newest = cabinets[cabinets.length - 1]?.id;
  const pane: PlayPane = zone === "tube" || zone === "steam" || zone === "duel" ? zone : "cabs";

  useEffect(() => {
    if (!playing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing, close]);

  const body = (
    <>
      <nav className="club-zones" aria-label="Entertainment">
        {PANES.map((p) => (
          <button
            key={p.id}
            type="button"
            id={p.id === "cabs" ? "btn-club-cabs" : `btn-club-${p.id}`}
            className={cn("room-chip", pane === p.id && "on")}
            onClick={() => setClubZone(p.id === "cabs" ? "tapes" : p.id)}
          >
            {p.chip}
          </button>
        ))}
        <button type="button" id="btn-ship-cab" className="arcade-ship" disabled={busy} onClick={() => void stageCrew("rix", "ship arcade cabinet")}>
          SHIP
        </button>
      </nav>
      {pane === "cabs" ? (
        <>
          <div className="arcade-forge">
            <img
              src={forging ? "/office/bot/carry.png?v=unit" : "/office/bot/idle.png?v=unit"}
              alt=""
              className={cn("forge-rix", CREW_CLASS.engineer, forging && "working")}
            />
            <p className="font-body text-lg text-muted">
              {forging
                ? "RIX is on the cabinet."
                : lastRun?.pathway === "arcade_ship"
                  ? lastRun.detail
                  : "Cabinets are ours. YouTube and Steam are logins. SHIP needs AUTH."}
            </p>
          </div>
          <ul className="arcade-row">
            {cabinets.map((c) => (
              <li key={c.id}>
                <CabinetFace cab={c} fresh={c.id === newest && c.ts > 0} onPlay={() => play(c.id)} />
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {pane === "tube" ? <TubePortal /> : null}
      {pane === "steam" ? <SteamLounge /> : null}
      {pane === "duel" ? <DuelBoard /> : null}
      {playing ? (
        <DeskSheet title={playing.title} kicker={`${heroName(playing.hero)} · ${playing.engine.toUpperCase()}`} onClose={close} wide>
          <CabinetPlay cab={playing} />
        </DeskSheet>
      ) : null}
    </>
  );

  if (embedded) return <div className="hq-play">{body}</div>;
  return (
    <CampusFrame kicker={`PLAY · ${cabinets.length} MACHINES`} title="Entertainment" playing={!!playing}>
      {body}
    </CampusFrame>
  );
}

function CabinetFace({ cab, fresh, onPlay }: { cab: Cabinet; fresh: boolean; onPlay: () => void }) {
  return (
    <button type="button" className={cn("cabinet", `cab-skin-${cab.skin}`, fresh && "fresh")} onClick={onPlay} aria-label={`Play ${cab.title}`}>
      <span className="cab-marquee">{cab.title}</span>
      <span className="cab-screen">
        <img src={heroSprite(cab.hero)} alt="" className={cn("cab-hero", CREW_CLASS[cab.hero])} />
      </span>
      <span className="cab-bezel">
        {heroName(cab.hero)} · HI {cab.hi || "PLAY"}
      </span>
    </button>
  );
}
