import { useEffect, useRef } from "react";
import { useNexus } from "@/lib/nexus/store";
import { ROLES } from "@/lib/nexus/types";
import { cn } from "@/lib/utils";

export function ReceptionChat() {
  const messages = useNexus((s) => s.messages);
  const busy = useNexus((s) => s.busy);
  const bottom = useRef<HTMLDivElement>(null);
  const welcomeOnly = messages.length === 1 && messages[0]?.id === "hello";
  const shown = welcomeOnly ? messages : messages.slice(-2);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, busy]);

  return (
    <section
      className={cn(
        "pixel-border flex min-h-16 flex-col bg-panel",
        welcomeOnly ? "max-h-44" : "max-h-28",
      )}
    >
      <header className="flex items-center justify-between border-b-2 border-ink bg-wood px-3 py-1">
        <h2 className="font-body text-xl text-gold">Direct interface</h2>
        <p className="font-body text-lg text-cream">{busy ? "Walking the floor…" : "OPS"}</p>
      </header>
      <div className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {shown.map((m) => {
          const mine = m.role === "user";
          const who = mine ? "YOU" : m.name ? (ROLES[m.name]?.label ?? m.name) : "OPS";
          return (
            <div key={m.id} className={mine ? "ml-6" : "mr-6"}>
              <p className="font-pixel text-[8px] text-gold">{who}</p>
              <p
                className={cn(
                  "mt-0.5 bg-speech px-2 py-1 font-body text-lg leading-5 text-ink",
                  welcomeOnly ? "" : "line-clamp-3",
                )}
              >
                {m.content}
              </p>
            </div>
          );
        })}
        <div ref={bottom} />
      </div>
    </section>
  );
}
