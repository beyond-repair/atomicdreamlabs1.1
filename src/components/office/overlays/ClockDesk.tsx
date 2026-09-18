import { useEffect, useState } from "react";
import { WORLD_CLOCKS } from "@/lib/nexus/room";
import { useNexus } from "@/lib/nexus/store";
import { DeskSheet } from "./DeskSheet";

function analogParts(d: Date) {
  const h = d.getHours() % 12;
  const m = d.getMinutes();
  const s = d.getSeconds();
  return {
    hour: h * 30 + m * 0.5,
    min: m * 6,
    sec: s * 6,
    digital: d.toTimeString().slice(0, 8),
  };
}

export function AnalogClock({ className }: { className?: string }) {
  const [now, setNow] = useState<ReturnType<typeof analogParts> | null>(null);
  useEffect(() => {
    setNow(analogParts(new Date()));
    const id = window.setInterval(() => setNow(analogParts(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <div className={className}>
      <div className="clock-face mx-auto">
        {now ? (
          <>
            <span
              className="clock-hand"
              style={{ height: "28%", width: "4px", transform: `translateX(-50%) rotate(${now.hour}deg)` }}
            />
            <span
              className="clock-hand"
              style={{ height: "38%", width: "3px", transform: `translateX(-50%) rotate(${now.min}deg)` }}
            />
            <span
              className="clock-hand bg-danger"
              style={{ height: "42%", width: "2px", transform: `translateX(-50%) rotate(${now.sec}deg)` }}
            />
            <span className="clock-hub" />
          </>
        ) : (
          <span className="clock-hub" />
        )}
      </div>
    </div>
  );
}

function tzTime(tz: string, d: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(d);
}

export function ClockDesk({ onClose }: { onClose: () => void }) {
  const grantFeat = useNexus((s) => s.grantFeat);
  const [now, setNow] = useState<Date | null>(null);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [origin, setOrigin] = useState(0);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    const loop = (t: number) => {
      setElapsed(t - origin);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running, origin]);

  const secs = Math.floor(elapsed / 1000);
  const ms = Math.floor(elapsed % 1000)
    .toString()
    .padStart(3, "0");
  const stamp = `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}.${ms}`;

  return (
    <DeskSheet title="Operations clock" kicker="WALL CLOCK" onClose={onClose}>
      <div className="grid gap-4 md:grid-cols-[9rem_1fr]">
        <AnalogClock className="w-36" />
        <div>
          <p className="font-pixel text-lg tabular-nums text-gold">{now ? now.toTimeString().slice(0, 8) : "--:--:--"}</p>
          <p className="mt-1 font-body text-xl text-cream">{now ? now.toDateString() : "Syncing"}</p>
          <ul className="mt-3 grid grid-cols-2 gap-2">
            {WORLD_CLOCKS.map((c) => (
              <li key={c.id} className="border-2 border-ink bg-ink px-2 py-2">
                <p className="font-pixel text-[8px] text-gold">{c.label}</p>
                <p className="font-body text-2xl tabular-nums leading-7 text-cream">{now ? tzTime(c.tz, now) : "--:--:--"}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-4 border-t-2 border-ink pt-3">
        <p className="font-pixel text-[8px] text-gold">STOPWATCH</p>
        <p className="mt-2 font-pixel text-xl tabular-nums text-cream">{stamp}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            className="min-h-11 bg-gold px-4 font-pixel text-[10px] text-ink"
            onClick={() => {
              if (running) {
                setRunning(false);
              } else {
                setOrigin(performance.now() - elapsed);
                setRunning(true);
                grantFeat("timer");
              }
            }}
          >
            {running ? "STOP" : "START"}
          </button>
          <button
            type="button"
            className="min-h-11 bg-cream px-4 font-pixel text-[10px] text-ink"
            onClick={() => {
              setRunning(false);
              setElapsed(0);
            }}
          >
            RESET
          </button>
        </div>
      </div>
    </DeskSheet>
  );
}
