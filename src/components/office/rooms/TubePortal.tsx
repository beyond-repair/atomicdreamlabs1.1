import { useEffect, useState } from "react";
import { TUBE_LINKS, TUBE_REELS, parseYouTubeId, youtubeEmbed, youtubeSearchEmbed, youtubeWatch } from "@/lib/nexus/club";
import { useNexus } from "@/lib/nexus/store";
import { cn } from "@/lib/utils";

const QUEUE_KEY = "nexus-tube-queue";

type Queued = { id: string; title: string };

function readQueue(): Queued[] {
  try {
    const raw = JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]") as Queued[];
    return Array.isArray(raw) ? raw.filter((q) => q && parseYouTubeId(q.id)).slice(0, 12) : [];
  } catch {
    return [];
  }
}

export function TubePortal() {
  const club = useNexus((s) => s.club);
  const setTube = useNexus((s) => s.setTube);
  const grantFeat = useNexus((s) => s.grantFeat);
  const [draft, setDraft] = useState("");
  const [search, setSearch] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [queue, setQueue] = useState<Queued[]>([]);
  const id = club.tubeId;

  useEffect(() => {
    setQueue(readQueue());
  }, []);

  function save(next: Queued[]) {
    setQueue(next);
    localStorage.setItem(QUEUE_KEY, JSON.stringify(next));
  }

  function play(raw: string, title?: string) {
    const next = parseYouTubeId(raw);
    if (!next) {
      setErr("Paste a YouTube link, or search. Search plays YouTube's own results.");
      return;
    }
    setErr(null);
    setSearch("");
    setTube(next);
    grantFeat("tube");
    const row = { id: next, title: title || next };
    save([row, ...readQueue().filter((q) => q.id !== next)].slice(0, 12));
  }

  function runSearch(q: string) {
    const query = q.trim();
    if (!query) return;
    const asId = parseYouTubeId(query);
    if (asId) {
      play(asId);
      return;
    }
    setErr(null);
    setTube(null);
    setSearch(query);
    grantFeat("tube");
  }

  return (
    <div className="theater-stage">
      <p className="campus-kicker">LIVE YouTube embed. Search and playback are YouTube. The queue is saved on this browser, not your YouTube account.</p>
      <div className="theater-screen" data-playing={id || search ? "1" : "0"}>
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
        ) : search ? (
          <div className="tube-frame">
            <iframe
              title="YouTube search"
              src={youtubeSearchEmbed(search)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        ) : (
          <p className="font-body text-xl text-muted">Search YouTube, or paste a link. Nothing here is a fake player.</p>
        )}
      </div>
      <form
        className="lib-search px-1"
        onSubmit={(e) => {
          e.preventDefault();
          runSearch(draft);
        }}
      >
        <label className="font-body text-lg text-cream" htmlFor="tube-q">
          Search or paste
        </label>
        <div className="dock-compose px-0">
          <input
            id="tube-q"
            className="dock-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Link or search"
            autoComplete="off"
          />
          <button type="submit" className="dock-send">
            PLAY
          </button>
        </div>
        {err ? <p className="font-body text-lg text-danger">{err}</p> : null}
      </form>
      <ul className="tape-row">
        {TUBE_LINKS.map((link) => (
          <li key={link.href}>
            <a className="tape-card" href={link.href} target="_blank" rel="noopener noreferrer">
              <span className="cab-marquee">{link.title}</span>
              <span className="cab-bezel">{link.note}</span>
            </a>
          </li>
        ))}
      </ul>
      {queue.length ? (
        <>
          <p className="font-body text-lg text-cream">Your queue</p>
          <ul className="tape-row">
            {queue.map((q) => (
              <li key={q.id}>
                <button type="button" className={cn("tape-card", id === q.id && "on")} onClick={() => play(q.id, q.title)}>
                  <span className="cab-marquee">{q.title}</span>
                  <span className="cab-bezel">SAVED HERE</span>
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : null}
      <ul className="tape-row">
        {TUBE_REELS.map((r) => (
          <li key={r.id}>
            <button type="button" className="tape-card" onClick={() => play(r.id, r.title)}>
              <span className="cab-marquee">{r.title}</span>
              <span className="cab-bezel">SAMPLE</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
