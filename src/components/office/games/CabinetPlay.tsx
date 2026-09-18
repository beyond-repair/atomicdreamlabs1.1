import { PaddleGame } from "./PaddleGame";
import { PelletGame } from "./PelletGame";
import { RaidGame } from "./RaidGame";
import { HopGame } from "./HopGame";
import { SnakeGame } from "./SnakeGame";
import { DriftGame } from "./DriftGame";
import { HoldGame } from "./HoldGame";
import { heroName, heroSprite, type Cabinet } from "@/lib/nexus/arcade";
import { CREW_CLASS } from "@/lib/nexus/crew";
import { useNexus } from "@/lib/nexus/store";
import { cn } from "@/lib/utils";

export function CabinetPlay({ cab }: { cab: Cabinet }) {
  const recordScore = useNexus((s) => s.recordScore);
  const onHi = (score: number) =>
    recordScore({ game: cab.id, title: cab.title, hero: cab.hero, score });
  return (
    <div>
      <div className="cab-play-hero">
        <img src={heroSprite(cab.hero)} alt="" className={cn("cab-play-face", CREW_CLASS[cab.hero])} />
        <p className="font-body text-lg text-muted">
          {heroName(cab.hero)} · {cab.blurb}
        </p>
      </div>
      {cab.engine === "paddle" ? <PaddleGame hero={cab.hero} onHi={onHi} /> : null}
      {cab.engine === "pellet" ? <PelletGame hero={cab.hero} onHi={onHi} /> : null}
      {cab.engine === "raid" ? <RaidGame hero={cab.hero} onHi={onHi} /> : null}
      {cab.engine === "hop" ? <HopGame hero={cab.hero} title={cab.title} seed={cab.seed} onHi={onHi} /> : null}
      {cab.engine === "snake" ? <SnakeGame hero={cab.hero} onHi={onHi} /> : null}
      {cab.engine === "drift" ? <DriftGame hero={cab.hero} onHi={onHi} /> : null}
      {cab.engine === "hold" ? <HoldGame hero={cab.hero} onHi={onHi} /> : null}
    </div>
  );
}