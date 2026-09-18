import { useEffect, useState } from "react";
import { CampusFrame } from "@/components/office/CampusFrame";
import { BoutBoard } from "@/components/office/rooms/BoutBoard";
import { DuelBoard } from "@/components/office/rooms/DuelBoard";
import { JukeBox } from "@/components/office/rooms/JukeBox";
import { StationBot } from "@/components/office/rooms/StationBot";
import { SteamLounge } from "@/components/office/rooms/SteamLounge";
import { TubePortal } from "@/components/office/rooms/TubePortal";
import { CLUB_ZONES } from "@/lib/nexus/club";
import { TAPES, type Tape } from "@/lib/nexus/campus";
import { CREW } from "@/lib/nexus/crew";
import { useNexus } from "@/lib/nexus/store";
import { cn } from "@/lib/utils";

export function TheaterFloor() {
  const zone = useNexus((s) => s.club.zone);
  const setClubZone = useNexus((s) => s.setClubZone);
  const setRoom = useNexus((s) => s.setRoom);
  const playing = zone === "tube" || zone === "duel" || zone === "tune" || zone === "tapes" || zone === "bout";

  return (
    <CampusFrame
      kicker="CLUB · OPTIONAL"
      title="Entertainment wing"
      playing={playing}
      extra={
        <button type="button" className="arcade-back" onClick={() => setRoom("arcade")}>
          PLAY
        </button>
      }
    >
      <nav className="club-zones" aria-label="Entertainment zones">
        {CLUB_ZONES.map((z) => (
          <button
            key={z.id}
            type="button"
            id={`btn-club-${z.id}`}
            className={cn("room-chip", zone === z.id && "on")}
            onClick={() => setClubZone(z.id)}
            aria-label={z.label}
          >
            {z.chip}
          </button>
        ))}
      </nav>
      {zone === "tapes" ? <TapeStage /> : null}
      {zone === "tube" ? <TubePortal /> : null}
      {zone === "duel" ? <DuelBoard /> : null}
      {zone === "bout" ? <BoutBoard /> : null}
      {zone === "tune" ? <JukeBox /> : null}
      {zone === "steam" ? <SteamLounge /> : null}
    </CampusFrame>
  );
}

function TapeStage() {
  const [tape, setTape] = useState<Tape | null>(null);
  const [t, setT] = useState(0);
  const grantFeat = useNexus((s) => s.grantFeat);

  useEffect(() => {
    if (!tape) return;
    setT(0);
    const id = window.setInterval(() => {
      setT((n) => {
        if (n + 1 >= tape.runtime) {
          window.clearInterval(id);
          return tape.runtime;
        }
        return n + 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [tape]);

  function play(next: Tape) {
    setTape(next);
    grantFeat("show");
  }

  const done = tape ? t >= tape.runtime : false;

  return (
    <div className="theater-stage">
      <div className="theater-screen" data-playing={tape ? "1" : "0"}>
        {tape ? (
          <>
            <StationBot pose={done ? "trophy" : tape.pose} name={CREW[tape.hero].name} role={tape.hero} caption={tape.title} />
            <p className="theater-note">{done ? "End card. Local only." : tape.note}</p>
            <div className="tape-bar" aria-hidden>
              <span style={{ width: `${(t / tape.runtime) * 100}%` }} />
            </div>
            <button type="button" className="arcade-back" onClick={() => setTape(null)}>
              {done ? "CLOSE" : "STOP"}
            </button>
          </>
        ) : (
          <p className="font-body text-xl text-muted">Pick a tape. Local Floorcast — not YouTube. TUBE is the portal.</p>
        )}
      </div>
      <ul className="tape-row">
        {TAPES.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={cn("tape-card", tape?.id === item.id && "on")}
              onClick={() => play(item)}
              aria-label={`Play ${item.title}`}
            >
              <StationBot pose={item.pose} name={CREW[item.hero].name} role={item.hero} />
              <span className="cab-marquee">{item.title}</span>
              <span className="cab-bezel">{item.runtime}s · PLAY</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
