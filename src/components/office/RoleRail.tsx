import { cn } from "@/lib/utils";
import { useNexus } from "@/lib/nexus/store";
import { OBJECT_ROOM } from "@/lib/nexus/campus";
import type { OverlayId } from "@/lib/nexus/room";

const TOOLS: { id: OverlayId; label: string; glyph: string }[] = [
  { id: "plan", label: "Board", glyph: "board" },
  { id: "sim", label: "Plant", glyph: "gears" },
  { id: "ide", label: "Lab", glyph: "terminal" },
  { id: "files", label: "Pack", glyph: "pack" },
  { id: "biz", label: "Shop", glyph: "cash" },
  { id: "arcade", label: "Play", glyph: "play" },
];

export function RoleRail() {
  const tap = useNexus((s) => s.tapObject);
  const overlay = useNexus((s) => s.overlay);
  const briefed = useNexus((s) => s.briefed);
  const room = useNexus((s) => s.room);
  const quiet = !!overlay || !briefed;

  return (
    <nav className={cn("office-rail", quiet && "quiet")} aria-label="Desks">
      {TOOLS.map((t) => {
        const dest = OBJECT_ROOM[t.id];
        const on = overlay === t.id || (!!dest && dest === room);
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => tap(t.id)}
            title={t.label}
            aria-label={t.label}
            className={cn("rail-slot", on && "on")}
          >
            <span className={`px-glyph ${t.glyph}`} />
            <span className="rail-name">{t.label}</span>
          </button>
        );
      })}
    </nav>
  );
}