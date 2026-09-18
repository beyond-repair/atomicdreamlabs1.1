import { useState } from "react";
import { PaddleGame } from "@/components/office/games/PaddleGame";
import { PelletGame } from "@/components/office/games/PelletGame";
import { RaidGame } from "@/components/office/games/RaidGame";
import { DeskSheet } from "./DeskSheet";

type Mode = "pick" | "paddle" | "pellet" | "raid";

const GAMES: { id: Mode; title: string; blurb: string }[] = [
  { id: "paddle", title: "PADDLE", blurb: "Brick breaker. Keep the packet in." },
  { id: "pellet", title: "SPEED PELLET", blurb: "Fast maze. Eat dots. Dodge leaks." },
  { id: "raid", title: "SKY RAID", blurb: "A/D to move. FIRE the sky clear." },
];

export function ArcadeDesk({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<Mode>("pick");
  const title = mode === "pick" ? "Arcade" : GAMES.find((g) => g.id === mode)?.title ?? "Arcade";

  return (
    <DeskSheet title={title} kicker="CABINET" onClose={onClose}>
      {mode === "pick" ? (
        <ul className="grid gap-2">
          {GAMES.map((g) => (
            <li key={g.id}>
              <button
                type="button"
                onClick={() => setMode(g.id)}
                className="flex min-h-14 w-full flex-col items-start bg-wood px-3 py-2 text-left"
              >
                <span className="font-pixel text-[10px] text-gold">{g.title}</span>
                <span className="font-body text-xl text-cream">{g.blurb}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <button
            type="button"
            onClick={() => setMode("pick")}
            className="mb-2 min-h-11 bg-wood px-3 font-pixel text-[8px] text-cream"
          >
            GAMES
          </button>
          {mode === "paddle" ? <PaddleGame /> : null}
          {mode === "pellet" ? <PelletGame /> : null}
          {mode === "raid" ? <RaidGame /> : null}
        </div>
      )}
    </DeskSheet>
  );
}
