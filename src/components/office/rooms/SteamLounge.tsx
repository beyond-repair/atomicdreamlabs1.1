import { useEffect, useState } from "react";
import { STEAM_LINKS } from "@/lib/nexus/club";
import { loadSteamLibrary, type SteamGame } from "@/lib/nexus/steam";
import { useNexus } from "@/lib/nexus/store";

const NAME_KEY = "nexus-steam-name";

export function SteamLounge() {
  const grantFeat = useNexus((s) => s.grantFeat);
  const [name, setName] = useState("");
  const [games, setGames] = useState<SteamGame[]>([]);
  const [status, setStatus] = useState("NOT CONNECTED");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    grantFeat("steam");
    const saved = localStorage.getItem(NAME_KEY);
    if (saved) setName(saved);
  }, [grantFeat]);

  async function load(e?: { preventDefault: () => void }) {
    e?.preventDefault();
    const vanity = name.trim();
    if (!vanity) {
      setErr("Type the public Steam name, not a password.");
      return;
    }
    setBusy(true);
    setErr(null);
    const result = await loadSteamLibrary({ data: { vanity } });
    setBusy(false);
    if (!result.ok) {
      setGames([]);
      setStatus("NOT CONNECTED");
      setErr(result.error);
      return;
    }
    localStorage.setItem(NAME_KEY, result.name);
    setGames(result.games);
    setStatus("LIVE");
  }

  return (
    <div className="theater-stage">
      <p className="campus-kicker">
        {status === "LIVE" ? "LIVE public Steam library. Launch opens Steam on this device." : "NOT CONNECTED. Type a public Steam name. This is not a local game list."}
      </p>
      <form className="lib-search px-1" onSubmit={(e) => void load(e)}>
        <label className="font-pixel text-[11px] text-gold" htmlFor="steam-name">
          PUBLIC STEAM NAME
        </label>
        <div className="dock-compose px-0">
          <input
            id="steam-name"
            className="dock-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Public name"
            autoComplete="off"
          />
          <button type="submit" className="dock-send" disabled={busy}>
            {busy ? "…" : "LOAD"}
          </button>
        </div>
        {err ? <p className="font-body text-lg text-danger">{err}</p> : null}
      </form>
      {games.length ? (
        <ul className="tape-row">
          {games.map((g) => (
            <li key={g.appId}>
              <a className="tape-card" href={`steam://run/${g.appId}`}>
                <span className="cab-marquee">{g.name}</span>
                <span className="cab-bezel">LAUNCH</span>
              </a>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="flex flex-wrap justify-center gap-2">
        {STEAM_LINKS.map((l) => (
          <a key={l.href} className="rail-link" href={l.href} target="_blank" rel="noopener noreferrer">
            {l.title.toUpperCase()}
          </a>
        ))}
      </div>
    </div>
  );
}