import { DECK_FLOOR, SPOT, type DeckId } from "./campus.ts";

/** Bands top → bottom. Index 0 is the top of the stack. Agents jump between bands. */
export const LIFT_FLOORS = ["core", "lab", "desk", "play", "lobby"] as const;
export type LiftFloor = (typeof LIFT_FLOORS)[number];

export type AgentId = "engineer" | "cpo" | "pm" | "qa";

export type Phase = "walk" | "wait" | "ride" | "leave";

export type Rider = {
  id: AgentId;
  floor: LiftFloor;
  x: number;
  y: number;
  phase: Phase;
  flip: boolean;
  frame: number;
  dest: DeckId;
  task: string;
  locked: boolean;
  wait: number;
  wander: number;
  visit: DeckId | null;
  lane: number;
};

export type GateStatus = "idle" | "arm" | "jump" | "fault";

export type Car = {
  pos: number;
  /** Charge, 0–1. Not a door. */
  door: number;
  dir: -1 | 0 | 1;
  /** Agents inside the field. They are not riding a car. */
  inside: AgentId[];
  status: GateStatus;
  fault: string;
  target: LiftFloor | null;
  locus: DeckId | null;
};

export const DOOR_X = 8;
export const CAPACITY = 2;

const NEIGHBORS: Record<DeckId, DeckId[]> = {
  lobby: ["arcade", "plant"],
  arcade: ["lounge", "lobby"],
  lounge: ["arcade", "trade"],
  plant: ["trade", "lab"],
  trade: ["plant", "lounge"],
  lab: ["stacks", "core", "plant"],
  stacks: ["lab", "service"],
  service: ["stacks"],
  core: ["proof", "lab"],
  proof: ["core", "stacks"],
};

const calls = new Set<LiftFloor>();
let userTarget: DeckId | null = null;
let userFault = "";
let faultAge = 0;
let interrupt = false;
let snapTick = 0;
let snap: FacilitySnap | null = null;
const subs = new Set<() => void>();
let emitAcc = 0;

export type FacilitySnap = {
  riders: Rider[];
  car: Car;
  calls: LiftFloor[];
  line: string;
};

export function floorIndex(floor: LiftFloor) {
  return LIFT_FLOORS.indexOf(floor);
}

export function createCar(): Car {
  return {
    pos: floorIndex("lobby"),
    door: 0,
    dir: 0,
    inside: [],
    status: "idle",
    fault: "",
    target: null,
    locus: null,
  };
}

export function createRiders(): Rider[] {
  const ids: AgentId[] = ["qa", "engineer", "pm", "cpo"];
  const lanes = [82, 90, 86, 78];
  return ids.map((id, i) => ({
    id,
    floor: "lobby",
    x: 28 + i * 14,
    y: lanes[i],
    phase: "walk",
    flip: false,
    frame: i,
    dest: "lobby",
    task: "Counter",
    locked: false,
    wait: 0,
    wander: 5 + i * 1.4,
    visit: null,
    lane: lanes[i],
  }));
}

export function goalOf(r: Rider): DeckId {
  return r.visit ?? r.dest;
}

export function callLift(floor: LiftFloor) {
  calls.add(floor);
}

const KNOWN_DECK = new Set<string>(Object.keys(DECK_FLOOR));

/** A locus the gate can lock. Trade is held while the desk is halted. */
export function destinationState(deck: string, ctx: { halted: boolean }): { ok: boolean; reason: string } {
  if (!KNOWN_DECK.has(deck)) return { ok: false, reason: "No such locus" };
  if (deck === "trade" && ctx.halted) return { ok: false, reason: "Desk halted. Resume at the gate." };
  return { ok: true, reason: "" };
}

/** Lock a destination. A second lock during a charge interrupts the first. */
export function armTeleport(deck: string, ctx: { halted: boolean }): { ok: boolean; reason: string } {
  const state = destinationState(deck, ctx);
  if (!state.ok) {
    userFault = state.reason;
    faultAge = 0;
    return state;
  }
  const id = deck as DeckId;
  if (userTarget && userTarget !== id) {
    interrupt = true;
    userFault = "Jump interrupted";
    faultAge = 0;
  } else if (!interrupt) {
    userFault = "";
  }
  userTarget = id;
  calls.add(DECK_FLOOR[id]);
  return { ok: true, reason: userFault };
}

export function gateFault() {
  return userFault;
}

export function gateLocus() {
  return userTarget;
}

let paused = false;
let spoken = "";

export function setFacilityPaused(next: boolean) {
  paused = next;
}

export function facilityPaused() {
  return paused;
}

export function setFacilityLine(line: string) {
  spoken = line;
}

export function facilityTick() {
  return snapTick;
}

export function facilityNow() {
  return snap;
}

export function subscribeFacility(fn: () => void) {
  subs.add(fn);
  return () => subs.delete(fn);
}

export function resetLift() {
  calls.clear();
  spoken = "";
  userTarget = null;
  userFault = "";
  faultAge = 0;
  interrupt = false;
}

export function publishFacility(riders: Rider[], car: Car, dt: number) {
  emitAcc += dt;
  if (emitAcc < 0.35 && snap) return;
  emitAcc = 0;
  snapTick += 1;
  snap = {
    riders: riders.map((r) => ({ ...r })),
    car: { ...car, inside: [...car.inside] },
    calls: [...calls],
    line: spoken,
  };
  for (const fn of subs) fn();
}

function moveToward(r: Rider, tx: number, dt: number, speed: number) {
  const dx = tx - r.x;
  const ad = Math.abs(dx);
  r.y += (r.lane - r.y) * Math.min(1, dt * 4);
  if (ad < 0.4) {
    r.x = tx;
    return false;
  }
  r.x += Math.sign(dx) * Math.min(ad, speed * dt);
  r.flip = dx < 0;
  r.frame = (r.frame + dt * 9) % 4;
  return true;
}

function pinWaiters(riders: Rider[]) {
  const groups = new Map<LiftFloor, Rider[]>();
  for (const r of riders) {
    if (r.phase !== "wait") continue;
    const list = groups.get(r.floor) ?? [];
    list.push(r);
    groups.set(r.floor, list);
  }
  for (const list of groups.values()) {
    list.sort((a, b) => b.wait - a.wait);
    list.forEach((r, i) => {
      r.x = DOOR_X + Math.min(i, 3) * 6.5;
    });
  }
}

function separate(riders: Rider[]) {
  for (let i = 0; i < riders.length; i++) {
    for (let j = i + 1; j < riders.length; j++) {
      const a = riders[i];
      const b = riders[j];
      if (a.phase === "ride" || b.phase === "ride" || a.phase === "wait" || b.phase === "wait") continue;
      if (a.floor !== b.floor) continue;
      const d = a.x - b.x;
      const ad = Math.abs(d);
      if (ad < 6 && ad > 0.05) {
        const push = (6 - ad) / 2;
        const s = Math.sign(d) || 1;
        a.x += s * push;
        b.x -= s * push;
      }
    }
  }
  for (const r of riders) {
    if (r.phase === "ride") continue;
    r.x = Math.max(5, Math.min(94, r.x));
  }
}

/** One tick. Agents walk to a pad, the field charges, then they appear on the destination floor. */
export function stepLift(riders: Rider[], car: Car, dt: number) {
  if (paused) return;
  const step = Math.min(0.05, Math.max(0, dt));

  for (const r of riders) {
    if (r.locked || r.phase === "ride" || r.phase === "wait") r.visit = null;
  }

  for (const r of riders) {
    if (r.phase === "ride") continue;
    const goal = goalOf(r);
    const gFloor = DECK_FLOOR[goal];
    if (r.floor !== gFloor) {
      const moving = moveToward(r, DOOR_X, step, r.locked ? 20 : 13);
      if (!moving) {
        r.phase = "wait";
        calls.add(r.floor);
      }
      continue;
    }
    if (r.phase === "wait") r.phase = "leave";
    const mates = riders
      .filter((o) => o.floor === r.floor && o.phase !== "ride" && goalOf(o) === goal)
      .sort((a, b) => a.x - b.x || (a.id < b.id ? -1 : 1));
    const slot = Math.max(0, mates.findIndex((o) => o.id === r.id));
    const tx = Math.max(12, Math.min(90, SPOT[goal] + (slot - (mates.length - 1) / 2) * 7));
    const moving = moveToward(r, tx, step, r.locked ? 16 : 8);
    if (moving) {
      if (r.phase === "walk") r.phase = "leave";
      continue;
    }
    r.phase = "walk";
    if (r.locked) continue;
    r.wander -= step;
    if (r.wander > 0) continue;
    r.wander = 14 + Math.random() * 8;
    const options = NEIGHBORS[r.dest];
    const someoneOut = riders.some((o) => o.id !== r.id && o.visit);
    r.visit = !someoneOut && Math.random() < 0.3 && options.length ? options[Math.floor(Math.random() * options.length)]! : null;
  }

  for (const r of riders) {
    if (r.phase !== "wait") continue;
    r.wait += step;
    calls.add(r.floor);
  }
  for (const floor of [...calls]) {
    if (!riders.some((r) => r.phase === "wait" && r.floor === floor)) calls.delete(floor);
  }

  separate(riders);
  pinWaiters(riders);

  car.locus = userTarget;
  if (userFault) {
    faultAge += step;
    if (faultAge > 1.6) {
      userFault = "";
      faultAge = 0;
    }
  }
  car.fault = userFault;

  if (interrupt) {
    interrupt = false;
    car.status = "fault";
    car.door = 0;
    car.dir = 0;
    car.target = userTarget ? DECK_FLOOR[userTarget] : null;
    if (car.target) car.pos = floorIndex(car.target);
  }

  for (const id of [...car.inside]) {
    const r = riders.find((x) => x.id === id);
    if (!r) {
      car.inside = car.inside.filter((x) => x !== id);
      continue;
    }
    r.wait -= step;
    if (r.wait > 0) continue;
    const dest = DECK_FLOOR[goalOf(r)];
    r.floor = dest;
    r.phase = "leave";
    r.x = DOOR_X + 7;
    r.y = r.lane;
    r.wait = 0;
    car.inside = car.inside.filter((x) => x !== id);
    car.pos = floorIndex(dest);
    car.status = "jump";
    car.target = dest;
  }

  if (car.inside.length) {
    car.status = "jump";
    car.door = 1;
    return;
  }

  const waiting = riders.filter((r) => r.phase === "wait");
  if (!waiting.length) {
    car.status = car.fault ? "fault" : "idle";
    car.door = Math.max(0, car.door - step * 2.2);
    car.dir = 0;
    car.target = userTarget ? DECK_FLOOR[userTarget] : car.target;
    if (car.target && car.status === "idle") car.pos = floorIndex(car.target);
    return;
  }

  const lead = [...waiting].sort((a, b) => b.wait - a.wait)[0]!;
  const dest = DECK_FLOOR[goalOf(lead)];
  car.target = dest;
  car.pos = floorIndex(lead.floor);
  car.status = car.fault ? "fault" : "arm";
  car.door = Math.min(1, car.door + step * 2.4);
  if (car.door < 1) return;

  let room = CAPACITY;
  const board = waiting
    .filter((r) => r.floor === lead.floor && DECK_FLOOR[goalOf(r)] === dest)
    .sort((a, b) => b.wait - a.wait);
  for (const r of board) {
    if (room <= 0) break;
    r.phase = "ride";
    r.wait = 0.16;
    car.inside.push(r.id);
    room -= 1;
  }
  car.status = "jump";
  car.door = 0;
  car.pos = floorIndex(dest);
  if (!riders.some((r) => r.phase === "wait" && r.floor === lead.floor)) calls.delete(lead.floor);
}

export function assignRiders(
  riders: Rider[],
  posts: Record<AgentId, { deck: DeckId; task: string; locked: boolean }>,
) {
  for (const r of riders) {
    const post = posts[r.id];
    if (!post) continue;
    if (r.dest !== post.deck) {
      r.visit = null;
      r.wander = 6;
    }
    r.dest = post.deck;
    r.task = post.task;
    r.locked = post.locked;
  }
}
