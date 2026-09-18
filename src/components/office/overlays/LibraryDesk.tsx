import { useState } from "react";
import { LIBRARY } from "@/lib/nexus/room";
import { useNexus } from "@/lib/nexus/store";
import { cn } from "@/lib/utils";
import { DeskSheet } from "./DeskSheet";

export function LibraryDesk({ onClose }: { onClose: () => void }) {
  const send = useNexus((s) => s.send);
  const setGoalDraft = useNexus((s) => s.setGoalDraft);
  const [openId, setOpenId] = useState(LIBRARY[0]?.id ?? "");
  const [q, setQ] = useState("");
  const book = LIBRARY.find((b) => b.id === openId) ?? LIBRARY[0];

  return (
    <DeskSheet title="Operations library" kicker="BOOKSHELF → NET" onClose={onClose}>
      <div className="flex gap-1 overflow-x-auto pb-2">
        {LIBRARY.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => setOpenId(b.id)}
            className={cn(
              "min-h-11 shrink-0 px-3 font-body text-xl",
              openId === b.id ? "bg-gold text-ink" : "bg-wood text-cream",
            )}
          >
            {b.title}
          </button>
        ))}
      </div>
      {book ? (
        <article className="mt-2 border-2 border-ink bg-speech p-3 text-ink">
          <h3 className="font-pixel text-[10px] text-wood">{book.title}</h3>
          {book.pages.map((p) => (
            <p key={p} className="mt-2 font-body text-xl leading-6 text-pretty">
              {p}
            </p>
          ))}
          {book.ask ? (
            <button
              type="button"
              className="mt-3 min-h-11 bg-gold px-4 font-pixel text-[10px] text-ink"
              onClick={() => {
                onClose();
                void send(book.ask);
              }}
            >
              ASK RECEPTION
            </button>
          ) : null}
        </article>
      ) : null}
      <form
        className="mt-4 flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          const text = q.trim();
          if (!text) return;
          onClose();
          void send(`Look this up on the internet: ${text}`);
        }}
      >
        <label className="font-pixel text-[8px] text-gold" htmlFor="lib-q">
          SEARCH THE NET
        </label>
        <input
          id="lib-q"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setGoalDraft(e.target.value);
          }}
          placeholder="Ask the public web…"
          className="min-h-12 border-2 border-ink bg-cream px-3 font-body text-2xl text-ink outline-none placeholder:text-wood"
        />
        <button type="submit" className="min-h-11 self-start bg-ok px-4 font-pixel text-[10px] text-cream">
          SEND TO NET
        </button>
      </form>
    </DeskSheet>
  );
}
