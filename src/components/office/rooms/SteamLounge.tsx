import { hydrateCabinets, heroName, heroSprite } from "@/lib/nexus/arcade";
import { CREW_CLASS } from "@/lib/nexus/crew";
import { STEAM_LINKS } from "@/lib/nexus/club";
import { useNexus } from "@/lib/nexus/store";
import { cn } from "@/lib/utils";
import { useEffect, useMemo } from "react";

export function SteamLounge() {
  const raw = useNexus((s) => s.biz.cabinets);
  const cabinets = useMemo(() => hydrateCabinets(raw), [raw]);
  const play = useNexus((s) => s.playCabinet);
  const grantFeat = useNexus((s) => s.grantFeat);
  const scores = useNexus((s) => s.club.scores);

  useEffect(() => {
    grantFeat("steam");
  }, [grantFeat]);

  return (
    <div className="theater-stage">
      <div className="theater-screen">
        <p className="font-body text-xl text-cream">Steam lounge</p>
        <p className="theater-note">
          Authorized handoff. Nexus does not copy, stream, or crack Steam games. The cabinets below are ours.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {STEAM_LINKS.map((l) => (
            <a key={l.href} className="rail-link" href={l.href} target="_blank" rel="noopener noreferrer">
              {l.title.toUpperCase()}
            </a>
          ))}
        </div>
      </div>
      <p className="font-pixel text-[8px] text-gold">NEXUS LIBRARY</p>
      <ul className="tape-row">
        {cabinets.map((c) => (
          <li key={c.id}>
            <button
              type="button"
              className="tape-card"
              onClick={() => play(c.id)}
              aria-label={`Play ${c.title}`}
            >
              <img src={heroSprite(c.hero)} alt="" className={cn("station-sprite", CREW_CLASS[c.hero])} draggable={false} />
              <span className="cab-marquee">{c.title}</span>
              <span className="cab-bezel">
                {heroName(c.hero)} · HI {c.hi || 0}
              </span>
            </button>
          </li>
        ))}
      </ul>
      {scores.length ? (
        <>
          <p className="font-pixel text-[8px] text-gold">BOARD</p>
          <ul className="club-board">
            {scores.slice(0, 6).map((s, i) => (
              <li key={`${s.game}-${s.ts}-${i}`}>
                <span className="font-pixel text-[8px] text-muted">{i + 1}</span>
                <span className="font-body text-lg text-cream">
                  {s.title} · {heroName(s.hero)}
                </span>
                <span className="font-pixel text-[8px] text-gold tabular-nums">{s.score}</span>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}