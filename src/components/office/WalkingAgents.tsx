import { useEffect, useRef, useState } from "react";
import { beatLabel, CREW, CREW_CLASS, COMPANY, workBeats, type Beat } from "@/lib/nexus/crew";
import { GATE_WAIT, HOME, TALK_R, resolveOpen, stationWalk, walkableSpot } from "@/lib/nexus/floor";
import { STAGER_ROLE, hydrateQueue } from "@/lib/nexus/stage";
import { canonicalRoom, crewHall, type HallId } from "@/lib/nexus/campus";
import { useNexus } from "@/lib/nexus/store";
import { ROLES, type RoleId } from "@/lib/nexus/types";

type Agent = {
  id: Exclude<RoleId, "ceo" | "cto" | "operator">;
  x: number;
  y: number;
  tx: number;
  ty: number;
  flip: boolean;
  frame: number;
  stuck: number;
  patrol: number;
};

type Talk = { beat: Beat; phase: "approach" | "speak" } | null;

const START: Agent[] = (Object.keys(HOME) as Array<keyof typeof HOME>).map((id) => ({
  id,
  x: HOME[id].x,
  y: HOME[id].y,
  tx: HOME[id].x,
  ty: HOME[id].y,
  flip: HOME[id].flip,
  frame: 0,
  stuck: 0,
  patrol: 0,
}));

const VER = "unit";
const BOT = "/office/bot";
const IDLE = `${BOT}/idle.png?v=${VER}`;
const SIT = `${BOT}/sit.png?v=${VER}`;
const TALK = `${BOT}/talk.png?v=${VER}`;
const CARRY = `${BOT}/carry.png?v=${VER}`;
const CHEER = `${BOT}/cheer.png?v=${VER}`;
const WAVE = `${BOT}/wave.png?v=${VER}`;
const SHAKE = `${BOT}/shake.png?v=${VER}`;
const WALK = [0, 1, 2, 3].map((i) => `${BOT}/walk-${i}.png?v=${VER}`);

function dist(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function depthScale(y: number) {
  return 0.62 + (y / 100) * 0.2;
}

function standNear(from: Agent, to: Agent) {
  const left = walkableSpot(to.x - 9, to.y + 1);
  const right = walkableSpot(to.x + 9, to.y + 1);
  const pick = dist(from, left) <= dist(from, right) ? left : right;
  return pick;
}

export function WalkingAgents({ floor = "office" }: { floor?: HallId }) {
  const meetCrew = useNexus((s) => s.meetCrew);
  const selected = useNexus((s) => s.selectedRole);
  const working = useNexus((s) => s.working);
  const busy = useNexus((s) => s.busy);
  const proposal = useNexus((s) => s.activeProposal);
  const lastRun = useNexus((s) => s.lastRun);
  const overlay = useNexus((s) => s.overlay);
  const briefed = useNexus((s) => s.briefed);
  const queue = useNexus((s) => s.queue);
  const viewing = canonicalRoom(useNexus((s) => s.room));
  const veiled = !!overlay || !briefed;

  const agents = useRef<Agent[]>(START.map((a) => ({ ...a })));
  const nodes = useRef<Record<string, HTMLButtonElement | null>>({});
  const [lines, setLines] = useState<Partial<Record<RoleId, string>>>({});
  const [arrow, setArrow] = useState<{ x1: number; y1: number; x2: number; y2: number; label: string } | null>(null);
  const [caption, setCaption] = useState("");

  const talk = useRef<Talk>(null);
  const talkClock = useRef(0);
  const beatIdx = useRef(0);
  const nextTalk = useRef(1.6);
  const skipSel = useRef(true);
  const frameAcc = useRef(0);
  const script = useRef<Beat[]>(COMPANY);
  const veiledRef = useRef(veiled);
  veiledRef.current = veiled;
  const linesRef = useRef(lines);
  linesRef.current = lines;
  const workingRef = useRef(working);
  workingRef.current = working;
  const lastRunRef = useRef(lastRun);
  lastRunRef.current = lastRun;
  const selectedRef = useRef(selected);
  selectedRef.current = selected;
  const queueRef = useRef(queue);
  queueRef.current = queue;
  const floorRef = useRef(floor);
  floorRef.current = floor;
  const viewingRef = useRef(viewing);
  viewingRef.current = viewing;
  const arrived = useRef<Set<string>>(new Set());


  useEffect(() => {
    if (proposal?.executed && lastRun) {
      script.current = workBeats(lastRun.pathway, lastRun.goal, lastRun.ok ? "run" : "refuse");
    } else if (proposal && !proposal.executed) {
      script.current = workBeats(proposal.pathway ?? "assign", proposal.goal, "advise");
    } else {
      script.current = COMPANY;
    }
    beatIdx.current = 0;
    nextTalk.current = 0.4;
  }, [proposal?.id, proposal?.status, lastRun?.id]);

  useEffect(() => {
    if (skipSel.current) {
      skipSel.current = false;
      return;
    }
    if (selected === "operator" || selected === "ceo" || selected === "cto") return;
    setLines({ [selected]: CREW[selected].tap });
    talk.current = null;
    setArrow(null);
    talkClock.current = 3.6;
    nextTalk.current = 5;
    setCaption(`${CREW[selected].name} · ${CREW[selected].job}`);
  }, [selected]);

  useEffect(() => {
    if (!busy && working.length === 0) return;
    const ids = working.filter((id) => id in HOME) as Agent["id"][];
    setLines((prev) => {
      const next = { ...prev };
      for (const id of ids) next[id] = CREW[id].work;
      return next;
    });
    talkClock.current = 2.2;
  }, [busy, working]);

  useEffect(() => {
    let last = performance.now();
    let raf = 0;
    const loop = (t: number) => {
      const dt = Math.min(0.08, (t - last) / 1000);
      last = t;
      const list = agents.current;
      const onJob = busy || working.length > 0;
      const speaking = talk.current?.phase === "speak";
      const gateRoles = new Set(
        hydrateQueue(queueRef.current)
          .filter((p) => !p.proposal.executed)
          .map((p) => STAGER_ROLE[p.stager]),
      );
      const here = floorRef.current;
      const onFloor = (id: RoleId) =>
        crewHall(id, {
          queue: hydrateQueue(queueRef.current),
          working: workingRef.current,
          viewing: viewingRef.current,
        }) === here;

      if (onJob || gateRoles.size) {
        list.forEach((a) => {
          if (gateRoles.has(a.id)) {
            const gate = GATE_WAIT[a.id];
            a.tx = gate.x;
            a.ty = gate.y;
            return;
          }
          const home = HOME[a.id];
          a.tx = home.x;
          a.ty = home.y;
        });
      }

      frameAcc.current += dt;
      const step = frameAcc.current > 0.14;
      if (step) frameAcc.current = 0;

      for (const a of list) {
        if (!onFloor(a.id)) {
          arrived.current.delete(a.id);
          const el = nodes.current[a.id];
          if (el) el.style.display = "none";
          continue;
        }
        if (!arrived.current.has(a.id)) {
          arrived.current.add(a.id);
          a.x = 20;
          a.y = 56;
          a.tx = HOME[a.id].x;
          a.ty = HOME[a.id].y;
        }
        const elHide = nodes.current[a.id];
        if (elHide) elHide.style.display = "";
        const home = HOME[a.id];
        const atGate = gateRoles.has(a.id);
        if (home.sit && !atGate) {
          a.x += (home.x - a.x) * Math.min(1, 6 * dt);
          a.y += (home.y - a.y) * Math.min(1, 6 * dt);
          a.flip = home.flip;
          a.stuck = 0;
        } else {
          const dx = a.tx - a.x;
          const dy = a.ty - a.y;
          const m = Math.hypot(dx, dy);
          if (m < 0.55) {
            a.stuck = 0;
            if (!onJob && !talk.current && !atGate) {
              a.patrol = (a.patrol + 1) % Math.max(1, home.patrol.length);
              const spot = stationWalk(a.id, { x: a.x, y: a.y });
              a.tx = spot.x;
              a.ty = spot.y;
            }
          } else {
            const spd = talk.current?.phase === "approach" ? 16 : onJob ? 12 : 6.2;
            const nx = a.x + (dx / m) * spd * dt;
            const ny = a.y + (dy / m) * spd * dt;
            const moved = resolveOpen(a.x, a.y, nx, ny);
            const traveled = Math.hypot(moved.x - a.x, moved.y - a.y);
            if (traveled < spd * dt * 0.2) {
              a.stuck += dt;
              if (a.stuck > 0.45) {
                const detour = stationWalk(a.id, { x: a.x, y: a.y });
                a.tx = detour.x;
                a.ty = detour.y;
                a.stuck = 0;
              }
            } else {
              a.stuck = 0;
            }
            a.x = moved.x;
            a.y = moved.y;
            if (Math.abs(dx) > 0.2) a.flip = dx < 0;
            if (step) a.frame = (a.frame + 1) % 4;
          }
        }
      }

      for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
          const a = list[i];
          const b = list[j];
          const pair =
            !!talk.current &&
            (talk.current.beat.from === a.id || talk.current.beat.to === a.id) &&
            (talk.current.beat.from === b.id || talk.current.beat.to === b.id);
          const d = dist(a, b);
          const min = pair ? 7.5 : HOME[a.id].sit || HOME[b.id].sit ? 7 : 5.4;
          if (d < min && d > 0.01) {
            const push = ((min - d) / 2) * 0.65;
            const ux = (a.x - b.x) / d;
            const uy = (a.y - b.y) / d;
            if (!HOME[a.id].sit) {
              const na = resolveOpen(a.x, a.y, a.x + ux * push, a.y + uy * push);
              a.x = na.x;
              a.y = na.y;
            }
            if (!HOME[b.id].sit) {
              const nb = resolveOpen(b.x, b.y, b.x - ux * push, b.y - uy * push);
              b.x = nb.x;
              b.y = nb.y;
            }
          }
        }
      }

      if (talk.current?.phase === "approach") {
        const beat = talk.current.beat;
        const a = list.find((x) => x.id === beat.from);
        const b = list.find((x) => x.id === beat.to);
        talkClock.current -= dt;
        if (a && b && dist(a, b) < TALK_R) {
          talk.current = { beat, phase: "speak" };
          talkClock.current = 3.8;
          a.flip = a.x > b.x;
          b.flip = b.x > a.x;
          setLines({ [beat.from]: beat.text });
          setArrow({ x1: a.x, y1: a.y - 4, x2: b.x, y2: b.y - 4, label: beat.phase });
          setCaption(beatLabel(beat));
        } else if (talkClock.current <= 0) {
          talk.current = null;
          setArrow(null);
          nextTalk.current = 1.2;
        }
      } else if (talk.current?.phase === "speak") {
        const beat = talk.current.beat;
        const a = list.find((x) => x.id === beat.from);
        const b = list.find((x) => x.id === beat.to);
        talkClock.current -= dt;
        if (a && b) {
          setArrow({ x1: a.x, y1: a.y - 4, x2: b.x, y2: b.y - 4, label: beat.phase });
          if (talkClock.current < 2) {
            setLines({ [beat.from]: beat.text, [beat.to]: beat.reply });
          }
        }
        if (talkClock.current <= 0) {
          talk.current = null;
          setLines({});
          setArrow(null);
          setCaption("");
          nextTalk.current = onJob ? 1.1 : 2.2;
        }
      } else {
        nextTalk.current -= dt;
        if (talkClock.current > 0) {
          talkClock.current -= dt;
          if (talkClock.current <= 0) setLines({});
        }
        if (nextTalk.current <= 0 && !speaking) {
          if (veiledRef.current) {
            nextTalk.current = 4;
          } else {

          const beats = script.current;
          const beat = beats[beatIdx.current % beats.length];
          beatIdx.current += 1;
          const a = list.find((x) => x.id === beat.from);
          const b = list.find((x) => x.id === beat.to);
          if (a && b && onFloor(a.id) && onFloor(b.id)) {
            if (!HOME[a.id].sit) {
              const meet = standNear(a, b);
              a.tx = meet.x;
              a.ty = meet.y;
            }
            if (!HOME[b.id].sit) {
              const meet = standNear(b, a);
              b.tx = meet.x;
              b.ty = meet.y;
            }
            talk.current = { beat, phase: "approach" };
            talkClock.current = 5.5;
            setCaption(beatLabel(beat));
          }
          nextTalk.current = 8;
          }
        }

      }

      for (const a of list) {
        const el = nodes.current[a.id];
        if (!el) continue;
        const scale = depthScale(a.y);
        el.style.left = `${a.x}%`;
        el.style.top = `${a.y}%`;
        el.style.zIndex = String(8 + Math.floor(a.y / 8));
        el.style.transform = `translate(-50%, -88%) scale(${scale.toFixed(3)})`;
        el.dataset.side = a.x > 62 ? "right" : "left";
        const moving = (!HOME[a.id].sit || gateRoles.has(a.id)) && Math.hypot(a.tx - a.x, a.ty - a.y) > 0.7;
        el.classList.toggle("is-moving", moving);
        const flipEl = el.querySelector<HTMLElement>("[data-flip]");
        if (flipEl) flipEl.style.transform = a.flip ? "scaleX(-1)" : "scaleX(1)";
        const img = el.querySelector("img");
        if (img) {
          const atGate = gateRoles.has(a.id);
          const seated = Boolean(HOME[a.id].sit) && !atGate && !moving;
          const said = Boolean(linesRef.current[a.id]);
          const hauling = workingRef.current.includes(a.id);
          const won = Boolean(lastRunRef.current?.ok);
          const picked = selectedRef.current === a.id;
          let tag = "idle";
          let src = IDLE;
          if (seated) {
            tag = "sit";
            src = SIT;
          } else if (atGate && !moving) {
            tag = "sit-gate";
            src = SIT;
          } else if (moving) {
            tag = String(a.frame);
            src = WALK[a.frame] ?? IDLE;
          } else if (said) {
            tag = "talk";
            src = talk.current?.phase === "speak" ? SHAKE : TALK;
          } else if (hauling) {
            tag = "carry";
            src = CARRY;
          } else if (picked) {
            tag = "wave";
            src = WAVE;
          } else if (won) {
            tag = "cheer";
            src = CHEER;
          }
          if (img.dataset.frame !== tag) {
            img.dataset.frame = tag;
            img.src = src;
          }
        }
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [busy, working]);

  return (
    <>
      {caption && !veiled ? <p className="crew-beat">{caption}</p> : null}

      <svg className="talk-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        <defs>
          <marker id="talk-head" markerWidth="3.2" markerHeight="3.2" refX="3" refY="1.6" orient="auto">
            <path d="M0 0 L3.2 1.6 L0 3.2 Z" fill="#fffdf6" />
          </marker>
        </defs>
        {arrow ? (
          <>
            <line
              x1={arrow.x1}
              y1={arrow.y1}
              x2={arrow.x2}
              y2={arrow.y2}
              className="talk-arrow"
              markerEnd="url(#talk-head)"
            />
            <text x={(arrow.x1 + arrow.x2) / 2} y={(arrow.y1 + arrow.y2) / 2 - 1.8} className="talk-label">
              {arrow.label}
            </text>
          </>
        ) : null}
      </svg>
      {START.map((seed) => {
        const role = ROLES[seed.id];
        if (!role.sprite) return null;
        const soul = CREW[seed.id];
        const active = selected === seed.id || working.includes(seed.id);
        const seated = Boolean(HOME[seed.id].sit);
        const src = seated ? SIT : IDLE;
        const said = lines[seed.id];
        return (
          <button
            key={seed.id}
            type="button"
            data-agent={seed.id}
            ref={(el) => {
              nodes.current[seed.id] = el;
            }}
            onClick={() => meetCrew(seed.id)}

            style={{
              left: `${seed.x}%`,
              top: `${seed.y}%`,
              width: seated ? "9.2%" : "6.6%",
              transform: "translate(-50%, -88%)",
            }}
            className={`agent-wrap${active ? " on" : ""}`}
            aria-label={`${soul.name}, ${soul.title}`}
          >
            {said && !veiled ? <span className="agent-bubble">{said}</span> : null}
            <span className="agent-shadow" />
            <span data-flip="1" className="block origin-bottom">
              <img
                src={src}
                alt=""
                className={`agent-sprite-img ${CREW_CLASS[seed.id]} ${seated ? "sit-idle" : ""}`}
                draggable={false}
              />
            </span>
            {!veiled ? <span className={`agent-tag ${active ? "on" : ""}`}>{soul.tag}</span> : null}
          </button>
        );
      })}
    </>
  );
}
