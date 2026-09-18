import { CREW_CLASS } from "@/lib/nexus/crew";
import type { RoleId } from "@/lib/nexus/types";
import { cn } from "@/lib/utils";

export type BotPose =
  | "idle"
  | "talk"
  | "work"
  | "carry"
  | "cheer"
  | "trophy"
  | "wave"
  | "sit"
  | "sit-desk"
  | "run"
  | "shake";

export function StationBot({
  pose,
  name,
  flip,
  caption,
  role,
}: {
  pose: BotPose;
  name: string;
  flip?: boolean;
  caption?: string;
  role?: RoleId;
}) {
  return (
    <div className="station-bot">
      <img
        src={`/office/bot/${pose}.png?v=unit`}
        alt=""
        className={cn("station-sprite", flip && "is-flip", role && CREW_CLASS[role])}
        draggable={false}
      />
      <span className="agent-tag on">{name}</span>
      {caption ? <p className="station-cap">{caption}</p> : null}
    </div>
  );
}