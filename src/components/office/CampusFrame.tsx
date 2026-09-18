import type { ReactNode } from "react";
import { useNexus } from "@/lib/nexus/store";
import { cn } from "@/lib/utils";

export function CampusFrame({
  kicker,
  title,
  extra,
  children,
  playing,
}: {
  kicker: string;
  title: string;
  extra?: ReactNode;
  children: ReactNode;
  playing?: boolean;
}) {
  const setRoom = useNexus((s) => s.setRoom);
  return (
    <div className={cn("arcade-hall campus-hall", playing && "is-playing")}>
      <div className="arcade-head">
        <button type="button" id="btn-vault" className="arcade-back" onClick={() => setRoom("office")}>
          LOBBY
        </button>
        <div className="min-w-0">
          <p className="font-pixel text-[8px] text-muted">{kicker}</p>
          <p className="font-body text-xl text-cream">{title}</p>
        </div>
        {extra}
      </div>
      {children}
    </div>
  );
}
