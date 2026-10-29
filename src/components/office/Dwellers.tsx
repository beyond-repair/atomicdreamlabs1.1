import { useEffect, useRef } from "react";
import { COMPANY, CREW, CREW_CLASS, workBeats, type Beat } from "@/lib/nexus/crew";
import { crewPost, requestDeck, type DeckId } from "@/lib/nexus/campus";
import {
  assignRiders,
  createCar,
  createRiders,
  floorIndex,
  LIFT_FLOORS,
  publishFacility,
  setFacilityLine,
  stepLift,
  goalOf,
  type AgentId,
  type Rider,
} from "@/lib/nexus/lift";
import { hydrateQueue } from "@/lib/nexus/stage";
import { useNexus } from "@/lib/nexus/store";
import { plantStats } from "@/lib/nexus/watches";

const IDS: AgentId[] = ["qa", "engineer", "pm", "cpo"];
const VER = "unit";
const BOT = "/office/bot";
const IDLE = `${BOT}/idle.png?v=${VER}`;
const TALK = `${BOT}/talk.png?v=${VER}`;
const WORK = `${BOT}/work.png?v=${VER}`;
const WALK = [0, 1, 2, 3].map((i) => `${BOT}/walk-${i}.png?v=${VER}`);

export function Dwellers({ open }: { open: DeckId | null }) {
  const meetCrew = useNexus((s) => s.meetCrew);
  const queue = useNexus((s) => s.queue);
  const working = useNexus((s) => s.working);
  const pathway = useNexus((s) => s.activeProposal?.pathway ?? s.lastRun?.pathway ?? null);
  const low = useNexus((s) => plantStats(s.biz).low);
  const holds = useNexus((s) => plantStats(s.biz).holds);
  const playing = useNexus((s) => !!s.playingId);
  const tube = useNexus((s) => !!s.club.tubeId);
  const nodes = useRef<Record<string, HTMLButtonElement | null>>({});
  const carRef = useRef<HTMLDivElement | null>(null);
  const doorRef = useRef<HTMLSpanElement | null>(null);
  const markRef = useRef<HTMLSpanElement | null>(null);
  const whoRef = useRef<HTMLSpanElement | null>(null);
  const destRef = useRef<Record<AgentId, DeckId>>({ qa: "lobby", engineer: "lobby", pm: "lobby", cpo: "lobby" });
  const openRef = useRef(open);
  const queueRef = useRef(queue);
  const workingRef = useRef(working);
  const pathRef = useRef(pathway);
  const needRef = useRef({ low, holds, playing, tube });
  openRef.current = open;
  queueRef.current = queue;
  workingRef.current = working;
  pathRef.current = pathway;
  needRef.current = { low, holds, playing, tube };

  useEffect(() => {
    const riders = createRiders();
    const car = createCar();
    const talk = { beat: null as Beat | null, until: 0, next: 1.4, idx: 0, script: COMPANY as Beat[] };
    let last = performance.now();
    let raf = 0;

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const posts = {} as Record<AgentId, { deck: DeckId; task: string; locked: boolean }>;
      const q = hydrateQueue(queueRef.current);
      for (const id of IDS) {
        posts[id] = crewPost(id, {
          queue: q,
          working: workingRef.current,
          open: openRef.current,
          pathway: pathRef.current,
          low: needRef.current.low,
          holds: needRef.current.holds,
          playing: needRef.current.playing,
          tube: needRef.current.tube,
        });
      }
      assignRiders(riders, posts);
      stepLift(riders, car, dt);
      publishFacility(riders, car, dt);

      const proposalPath = pathRef.current;
      talk.script = proposalPath ? workBeats(proposalPath, proposalPath, "advise") : COMPANY;
      if (talk.beat) {
        talk.until -= dt;
        if (talk.until <= 0) {
          talk.beat = null;
          setFacilityLine("");
        }
      } else {
        talk.next -= dt;
        if (talk.next <= 0) {
          talk.next = 6;
          const beat = talk.script[talk.idx % talk.script.length];
          talk.idx += 1;
          const a = riders.find((r) => r.id === beat.from);
          const b = riders.find((r) => r.id === beat.to);
          if (a && b && a.phase !== "ride" && b.phase !== "ride" && a.floor === b.floor && Math.abs(a.x - b.x) < 28) {
            talk.beat = beat;
            talk.until = 3.4;
            const who = CREW[beat.from].tag;
            setFacilityLine(`${who}: ${beat.text}`);
          }
        }
      }

      const count = LIFT_FLOORS.length;
      if (carRef.current) {
        carRef.current.style.top = `${(car.pos / count) * 100}%`;
        carRef.current.style.height = `${100 / count}%`;
        carRef.current.dataset.status = car.status;
        carRef.current.style.setProperty("--door", car.door.toFixed(3));
      }
      if (markRef.current) {
        markRef.current.textContent =
          car.status === "arm" ? "ARM" : car.status === "jump" ? "JUMP" : car.status === "fault" ? "FAULT" : "GATE";
      }
      if (whoRef.current) {
        whoRef.current.textContent = car.inside.map((id) => CREW[id].tag).join(" ");
      }

      for (const id of IDS) {
        const rider = riders.find((r) => r.id === id) as Rider;
        const el = nodes.current[id];
        const riderImg = carRef.current?.querySelector<HTMLImageElement>(`[data-rider="${id}"]`);
        if (riderImg) riderImg.hidden = rider.phase !== "ride";
        if (!el) continue;
        if (rider.phase === "ride") {
          el.style.display = "none";
          destRef.current[id] = rider.dest;
          continue;
        }
        el.style.display = "";
        const row = floorIndex(rider.floor);
        el.style.top = `${((row + rider.y / 100) / LIFT_FLOORS.length) * 100}%`;
        el.style.left = `${rider.x}%`;
        destRef.current[id] = goalOf(rider);
        const flip = el.querySelector<HTMLElement>("[data-flip]");
        if (flip) flip.style.transform = rider.flip ? "scaleX(-1)" : "";
        const bubble = el.querySelector<HTMLElement>("[data-bubble]");
        const saying = talk.beat && (talk.beat.from === id || (talk.until < 1.6 && talk.beat.to === id));
        if (bubble) {
          if (saying && talk.beat) {
            bubble.hidden = false;
            bubble.textContent = talk.beat.from === id ? talk.beat.text : talk.beat.reply;
          } else bubble.hidden = true;
        }
        const img = el.querySelector("img");
        if (!img) continue;
        const moving = rider.phase === "leave" || rider.phase === "wait";
        const arrived = rider.phase === "walk";
        let src = IDLE;
        let tag = "idle";
        if (moving) {
          src = WALK[Math.floor(rider.frame) % 4] ?? IDLE;
          tag = "walk";
        } else if (saying) {
          src = TALK;
          tag = "talk";
        } else if (rider.locked && arrived) {
          src = WORK;
          tag = "work";
        }
        if (img.dataset.frame !== tag) {
          img.dataset.frame = tag;
          img.src = src;
        }
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <div className="deck-car" ref={carRef} aria-hidden>
        <span className="deck-doors" ref={doorRef} />
        <span className="deck-car-mark" ref={markRef}>
          0
        </span>
        <span className="deck-car-who" ref={whoRef} />
        {IDS.map((id) => (
          <img key={id} data-rider={id} alt="" className={`deck-car-bot ${CREW_CLASS[id]}`} src={IDLE} hidden />
        ))}
      </div>
      <div className="deck-people">
        {IDS.map((id) => (
          <button
            key={id}
            type="button"
            className="deck-bot"
            ref={(el) => {
              nodes.current[id] = el;
            }}
            onClick={() => {
              meetCrew(id);
              requestDeck(destRef.current[id]);
            }}
            aria-label={`${CREW[id].name}. Open what they are working.`}
          >
            <span className="deck-bubble" data-bubble hidden />
            <span data-flip>
              <img src={IDLE} alt="" className={CREW_CLASS[id]} draggable={false} />
            </span>
            <span className="deck-tag">{CREW[id].tag}</span>
          </button>
        ))}
      </div>
    </>
  );
}
