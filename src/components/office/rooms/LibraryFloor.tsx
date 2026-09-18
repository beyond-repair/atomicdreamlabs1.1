import { useState } from "react";
import { CampusFrame } from "@/components/office/CampusFrame";
import { StationBot } from "@/components/office/rooms/StationBot";
import { LIBRARY } from "@/lib/nexus/room";
import { useNexus } from "@/lib/nexus/store";
import { cn } from "@/lib/utils";

export function LibraryFloor() {
  const send = useNexus((s) => s.send);
  const setGoalDraft = useNexus((s) => s.setGoalDraft);
  const [openId, setOpenId] = useState(LIBRARY[0]?.id ?? "");
  const [q, setQ] = useState("");
  const book = LIBRARY.find((b) => b.id === openId) ?? LIBRARY[0];

  return (
    <CampusFrame kicker="STUDY · STACK" title="Library">
      <div className="library-hall">
        <StationBot pose="talk" name="HAL" role="pm" caption="Owners first. Then the shelf." />
        <ul className="spine-row">
          {LIBRARY.map((b) => (
            <li key={b.id}>
              <button
                type="button"
                className={cn("spine", openId === b.id && "on")}
                onClick={() => setOpenId(b.id)}
              >
                {b.title}
              </button>
            </li>
          ))}
        </ul>
        {book ? (
          <article className="lib-page">
            <h3 className="font-pixel text-[10px] text-gold">{book.title}</h3>
            {book.pages.map((p) => (
              <p key={p} className="mt-2 font-body text-xl leading-6 text-pretty text-cream">
                {p}
              </p>
            ))}
            {book.ask ? (
              <button
                type="button"
                className="mt-3 min-h-11 bg-cream px-4 font-pixel text-[10px] text-ink"
                onClick={() => {
                  void send(book.ask);
                }}
              >
                ASK RECEPTION
              </button>
            ) : null}
          </article>
        ) : null}
        <form
          className="lib-search"
          onSubmit={(e) => {
            e.preventDefault();
            const text = q.trim();
            if (!text) return;
            void send(`Look this up on the internet: ${text}`);
          }}
        >
          <label className="font-pixel text-[8px] text-gold" htmlFor="lib-hall-q">
            SEARCH THE NET
          </label>
          <input
            id="lib-hall-q"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setGoalDraft(e.target.value);
            }}
            placeholder="Ask the public web…"
            className="dock-input mt-1 w-full"
          />
          <button type="submit" className="mt-2 min-h-11 bg-ok px-4 font-pixel text-[10px] text-cream">
            SEND TO NET
          </button>
        </form>
      </div>
    </CampusFrame>
  );
}
