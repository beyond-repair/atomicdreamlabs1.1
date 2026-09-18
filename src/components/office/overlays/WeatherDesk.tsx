import { useEffect, useState } from "react";
import { fetchWeather, type WeatherSnap } from "@/lib/nexus/room";
import { useNexus } from "@/lib/nexus/store";
import { DeskSheet } from "./DeskSheet";

export function WeatherDesk({ onClose }: { onClose: () => void }) {
  const send = useNexus((s) => s.send);
  const grantFeat = useNexus((s) => s.grantFeat);
  const [place, setPlace] = useState("Nassau Bahamas");
  const [snap, setSnap] = useState<WeatherSnap | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function load(q: string) {
    setBusy(true);
    setErr(null);
    try {
      setSnap(await fetchWeather(q));
      grantFeat("sky");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Weather failed");
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    void load(place);
    // first look only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DeskSheet title="Outside window" kicker="LIVE SKY" onClose={onClose}>
      <form
        className="flex flex-col gap-2 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          void load(place);
        }}
      >
        <label className="sr-only" htmlFor="wx-place">
          Place
        </label>
        <input
          id="wx-place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          className="min-h-12 flex-1 border-2 border-ink bg-cream px-3 font-body text-2xl text-ink outline-none"
        />
        <button type="submit" disabled={busy} className="min-h-12 bg-gold px-4 font-pixel text-[10px] text-ink disabled:opacity-50">
          LOOK
        </button>
      </form>
      {busy ? <p className="mt-3 font-body text-xl text-muted">Looking outside…</p> : null}
      {err ? <p className="mt-3 font-body text-xl text-danger">{err}</p> : null}
      {snap ? (
        <div className="mt-4 border-2 border-ink bg-ink p-3">
          <p className="font-pixel text-[10px] text-gold">
            {snap.place}, {snap.country}
          </p>
          <p className="mt-2 font-pixel text-3xl tabular-nums text-cream">{Math.round(snap.temp)}°C</p>
          <p className="mt-2 font-body text-2xl text-cream">{snap.label}</p>
          <p className="mt-1 font-body text-xl text-muted">Wind {Math.round(snap.wind)} km/h</p>
        </div>
      ) : null}
      <button
        type="button"
        className="mt-4 min-h-11 bg-wood px-4 font-pixel text-[10px] text-cream"
        onClick={() => {
          onClose();
          void send(`How's the weather in ${place}?`);
        }}
      >
        ASK RECEPTION TOO
      </button>
    </DeskSheet>
  );
}
