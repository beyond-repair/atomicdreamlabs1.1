import { useState } from "react";
import { TUBE_REELS, parseYouTubeId, youtubeEmbed, youtubeWatch } from "@/lib/nexus/club";
import { useNexus } from "@/lib/nexus/store";
import { cn } from "@/lib/utils";

export function TubePortal() {
  const club = useNexus((s) => s.club);
  const setTube = useNexus((s) => s.setTube);
  const grantFeat = useNexus((s) => s.grantFeat);
  const [draft, setDraft] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const id = club.tubeId;

  function play(raw: string) {
    const next = parseYouTubeId(raw);
    if (!next) {
      setErr("Need a public YouTube URL or 11-character id.");
      return;
    }
    setErr(null);
    setTube(next);
    grantFeat("tube");
  }

  return (
    <div className="theater-stage">
      <div className="theater-screen" data-playing={id ? "1" : "0"}>
        {id ? (
          <>
            <div className="tube-frame">
              <iframe
                title="YouTube"
                src={youtubeEmbed(id)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <a className="rail-link" href={youtubeWatch(id)} target="_blank" rel="noopener noreferrer">
              OPEN ON YOUTUBE
            </a>
            <button type="button" className="arcade-back" onClick={() => setTube(null)}>
              STOP
            </button>
          </>
        ) : (
          <p className="font-body text-xl text-muted">
            Official YouTube embed. Paste a public URL. We don't scrape, host, or bypass anything.
          </p>
        )}
      </div>
      <form
        className="lib-search px-1"
        onSubmit={(e) => {
          e.preventDefault();
          play(draft);
        }}
      >
        <label className="font-pixel text-[8px] text-gold" htmlFor="tube-q">
          PASTE URL
        </label>
        <div className="dock-compose px-0">
          <input
            id="tube-q"
            className="dock-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="youtube.com/watch?v=…"
            autoComplete="off"
            inputMode="url"
          />
          <button type="submit" className="dock-send">
            PLAY
          </button>
        </div>
        {err ? <p className="font-body text-lg text-danger">{err}</p> : null}
      </form>
      <ul className="tape-row">
        {TUBE_REELS.map((r) => (
          <li key={r.id}>
            <button
              type="button"
              className={cn("tape-card", id === r.id && "on")}
              onClick={() => play(r.id)}
              aria-label={`Play ${r.title}`}
            >
              <span className="cab-marquee">{r.title}</span>
              <span className="cab-bezel">{r.note}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
