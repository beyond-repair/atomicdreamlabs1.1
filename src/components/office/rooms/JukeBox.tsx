import { useEffect, useRef, useState } from "react";
import { TRACKS, type Track } from "@/lib/nexus/club";
import { useNexus } from "@/lib/nexus/store";
import { cn } from "@/lib/utils";

const SCALE = [0, 3, 5, 7, 10, 12, 15, 17];

export function JukeBox() {
  const lastTune = useNexus((s) => s.club.lastTune);
  const setTune = useNexus((s) => s.setTune);
  const grantFeat = useNexus((s) => s.grantFeat);
  const [on, setOn] = useState<string | null>(lastTune);
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => () => stopRef.current?.(), []);

  function play(track: Track) {
    stopRef.current?.();
    const started = startTrack(track);
    if (!started) return;
    stopRef.current = started;
    setOn(track.id);
    setTune(track.id);
    grantFeat("tune");
  }

  function halt() {
    stopRef.current?.();
    stopRef.current = null;
    setOn(null);
  }

  return (
    <div className="theater-stage">
      <div className="theater-screen" data-playing={on ? "1" : "0"}>
        <p className="font-body text-xl text-cream">
          {on ? TRACKS.find((t) => t.id === on)?.title : "Original chips. No licensed catalog."}
        </p>
        <p className="theater-note">{on ? "Playing in this tab." : "Pick a side. Volume stays modest."}</p>
        {on ? (
          <button type="button" className="arcade-back" onClick={halt}>
            STOP
          </button>
        ) : null}
      </div>
      <ul className="tape-row">
        {TRACKS.map((t) => (
          <li key={t.id}>
            <button
              type="button"
              className={cn("tape-card", on === t.id && "on")}
              onClick={() => play(t)}
              aria-label={`Play ${t.title}`}
            >
              <span className="cab-marquee">{t.title}</span>
              <span className="cab-bezel">
                {t.bpm} BPM · {t.note}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function startTrack(track: Track) {
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  const ctx = new AC();
  void ctx.resume();
  const master = ctx.createGain();
  master.gain.value = 0.08;
  master.connect(ctx.destination);
  const step = 60 / track.bpm / 2;
  let i = 0;
  let timer = 0;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = track.seed % 2 === 0 ? "square" : "triangle";
  osc.connect(gain);
  gain.connect(master);
  gain.gain.value = 0;
  osc.start();

  function tick() {
    const note = SCALE[(i * track.seed + (i % 3)) % SCALE.length];
    const base = 110 * (track.seed === 3 ? 2 : 1);
    osc.frequency.setValueAtTime(base * 2 ** (note / 12), ctx.currentTime);
    gain.gain.cancelScheduledValues(ctx.currentTime);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.9, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + step * 0.9);
    i += 1;
    timer = window.setTimeout(tick, step * 1000);
  }
  tick();
  return () => {
    window.clearTimeout(timer);
    try {
      osc.stop();
      void ctx.close();
    } catch {
      /* already closed */
    }
  };
}
