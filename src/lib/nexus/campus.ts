import type { DockTab, ObjectId } from "./room.ts";
import type { RoleId } from "./types.ts";
import { STAGER_ROLE, type StagePacket, type StagerId } from "./stage.ts";

export type RoomId = "office" | "arcade" | "theater" | "exchange" | "library" | "compute" | "proof" | "core";

export const ROOMS: Record<
  RoomId,
  { chip: string; label: string; kicker: string; speech: string; dock: DockTab }
> = {
  office: {
    chip: "LOBBY",
    label: "Lobby",
    kicker: "COUNTER",
    speech: "Talk at the counter. Crew walks the job. You COMMIT.",
    dock: "chat",
  },
  arcade: {
    chip: "PLAY",
    label: "Entertainment",
    kicker: "HALL",
    speech: "Arcade, YouTube, Steam. Play here. SHIP still needs AUTH.",
    dock: "chat",
  },
  theater: {
    chip: "PLAY",
    label: "Entertainment",
    kicker: "CLUB",
    speech: "Arcade, YouTube, Steam. Play here. SHIP still needs AUTH.",
    dock: "chat",
  },
  exchange: {
    chip: "DESK",
    label: "Business",
    kicker: "PAPER",
    speech: "Plant, dropship, paper trade. Live market needs your keys. COMMIT is you.",
    dock: "govern",
  },
  library: {
    chip: "LOBBY",
    label: "Lobby",
    kicker: "STUDY",
    speech: "Talk at the counter. Books live in chat.",
    dock: "chat",
  },
  compute: {
    chip: "LOBBY",
    label: "Lobby",
    kicker: "MONITORS",
    speech: "Lab is the COUNTER tab. Nothing ships without COMMIT.",
    dock: "lab",
  },
  proof: {
    chip: "LOBBY",
    label: "Lobby",
    kicker: "GATE",
    speech: "GOVERN is the gate. You still hold COMMIT.",
    dock: "govern",
  },
  core: {
    chip: "LOBBY",
    label: "Lobby",
    kicker: "SESA",
    speech: "SESA is a GOVERN job. Ring dispatch needs COMMIT.",
    dock: "govern",
  },
};

/** The three halls the operator sees. */
export type HallId = "office" | "arcade" | "exchange";

export const ROOM_ORDER: HallId[] = ["office", "arcade", "exchange"];

export function canonicalRoom(r: RoomId | string): HallId {
  if (r === "arcade" || r === "theater") return "arcade";
  if (r === "exchange") return "exchange";
  return "office";
}

/** Furniture that leaves the lobby and enters a hall. */
export const OBJECT_ROOM: Partial<Record<ObjectId, RoomId>> = {
  arcade: "arcade",
  library: "office",
  phone: "exchange",
  biz: "exchange",
  ide: "office",
  files: "office",
};

export type HubTile = {
  room: HallId;
  pose: "cheer" | "talk" | "work" | "sit";
  name: string;
  role: "engineer" | "qa" | "cpo" | "pm" | "operator" | "cto";
  blurb: string;
};

export const HUB_TILES: HubTile[] = [
  { room: "arcade", pose: "cheer", name: "RIX", role: "engineer", blurb: "Arcade. Tube. Steam." },
  { room: "exchange", pose: "work", name: "VEX", role: "cpo", blurb: "Plant. Dropship. Paper trade." },
];

export const HUB_TOOLS: { id: ObjectId; chip: string }[] = [
  { id: "clock", chip: "TIME" },
  { id: "sim", chip: "PLANT" },
  { id: "files", chip: "GATE" },
];

export type VaultPose = "cheer" | "talk" | "work" | "sit" | "trophy" | "wave";

/** Physical rooms the crew can walk to. Several rooms share a floor and a hall. */
export type DeckId =
  | "core"
  | "proof"
  | "lab"
  | "stacks"
  | "service"
  | "plant"
  | "trade"
  | "arcade"
  | "lounge"
  | "lobby";

export type LiftFloorId = "core" | "lab" | "desk" | "play" | "lobby";

export const DECK_FLOOR: Record<DeckId, LiftFloorId> = {
  core: "core",
  proof: "core",
  lab: "lab",
  stacks: "lab",
  service: "lab",
  plant: "desk",
  trade: "desk",
  arcade: "play",
  lounge: "play",
  lobby: "lobby",
};

/** Walk target, percent across the room column. The pad is near 8. */
export const SPOT: Record<DeckId, number> = {
  core: 26,
  proof: 74,
  lab: 20,
  stacks: 50,
  service: 86,
  plant: 28,
  trade: 74,
  arcade: 28,
  lounge: 74,
  lobby: 56,
};

export const DECK_HALL: Record<DeckId, HallId> = {
  core: "office",
  proof: "office",
  lab: "office",
  stacks: "office",
  service: "office",
  plant: "exchange",
  trade: "exchange",
  arcade: "arcade",
  lounge: "arcade",
  lobby: "office",
};

export type VaultCell = {
  deck: DeckId;
  room: HallId;
  art?: string;
  name: string;
  blurb: string;
  hatch?: boolean;
};

export type VaultFloorDef = {
  id: LiftFloorId;
  label: string;
  mark: string;
  rooms: VaultCell[];
};

/** Cutaway of working rooms. Tap a room. Crew lock a pad and jump. */
export const VAULT_FLOORS: VaultFloorDef[] = [
  {
    id: "core",
    label: "CORE",
    mark: "4",
    rooms: [
      { deck: "core", room: "office", art: "/vault/kernel-room.png", name: "SESA", blurb: "A proof, when you ask." },
      { deck: "proof", room: "office", art: "/vault/kernel-console.png", name: "PROOF", blurb: "The record." },
    ],
  },
  {
    id: "lab",
    label: "LAB",
    mark: "3",
    rooms: [
      { deck: "lab", room: "office", art: "/vault/office-core.png", name: "LAB", blurb: "Build." },
      { deck: "stacks", room: "office", art: "/vault/archive.png", name: "STACKS", blurb: "Notes." },
      { deck: "service", room: "office", name: "ACCOUNTS", blurb: "Keys." },
    ],
  },
  {
    id: "desk",
    label: "DESK",
    mark: "2",
    rooms: [
      { deck: "plant", room: "exchange", art: "/vault/sesa-env.png", name: "PLANT", blurb: "Sell." },
      { deck: "trade", room: "exchange", art: "/vault/wing.png", name: "TRADE", blurb: "Paper, then COMMIT." },
    ],
  },
  {
    id: "play",
    label: "PLAY",
    mark: "1",
    rooms: [
      { deck: "arcade", room: "arcade", art: "/vault/arcade-hall.png", name: "ARCADE", blurb: "Play." },
      { deck: "lounge", room: "arcade", art: "/vault/theater-cell.png", name: "LOUNGE", blurb: "Watch." },
    ],
  },
  {
    id: "lobby",
    label: "LOBBY",
    mark: "0",
    rooms: [{ deck: "lobby", room: "office", art: "/vault/lounge-cell.png", name: "COUNTER", blurb: "Work." }],
  },
];

const JOB_DECK: Record<string, DeckId> = {
  arcade_ship: "arcade",
  restock: "plant",
  paper_trade: "trade",
  mean_reversion: "trade",
  risk_halt: "proof",
  drain_holds: "proof",
  shop_publish: "plant",
  lab_qa: "lab",
  lab_build: "lab",
  sesa_cycle: "core",
  sesa_revert: "core",
};

const STAGER_DECK: Record<string, DeckId> = {
  nyx: "proof",
  rix: "lab",
  vex: "trade",
  hal: "stacks",
  molt: "lobby",
};

/** Opening a room pulls this pair. They ride together and work the tool. */
const ROOM_CREW: Partial<Record<DeckId, RoleId[]>> = {
  arcade: ["engineer", "qa"],
  lounge: ["engineer", "pm"],
  plant: ["cpo", "pm"],
  trade: ["cpo", "qa"],
  lab: ["engineer", "qa"],
  stacks: ["pm", "cpo"],
  core: ["qa", "engineer"],
  proof: ["qa", "pm"],
  service: ["pm", "engineer"],
};

export function crewPost(
  role: RoleId,
  args: {
    queue: StagePacket[];
    working: RoleId[];
    open: DeckId | null;
    pathway?: string | null;
    low?: boolean;
    holds?: number;
    playing?: boolean;
    tube?: boolean;
  },
): { deck: DeckId; task: string; locked: boolean } {
  const staged = args.queue.find((p) => !p.proposal.executed && STAGER_ROLE[p.stager as StagerId] === role);
  if (staged) {
    const deck = JOB_DECK[staged.pathway] ?? STAGER_DECK[staged.stager] ?? "lobby";
    return { deck, task: staged.title.slice(0, 24), locked: true };
  }
  if (args.working.includes(role)) {
    const deck =
      (args.pathway && JOB_DECK[args.pathway]) ||
      (role === "engineer" ? "lab" : role === "cpo" ? "plant" : role === "qa" ? "proof" : "stacks");
    return { deck, task: "On the job", locked: true };
  }
  if (args.open && args.open !== "lobby" && ROOM_CREW[args.open]?.includes(role)) {
    return { deck: args.open, task: "Staffing", locked: true };
  }
  if (role === "cpo" && args.low) return { deck: "plant", task: "Low stock", locked: true };
  if (role === "pm" && (args.holds ?? 0) > 0) return { deck: "proof", task: "Holds", locked: true };
  if (role === "engineer" && args.playing) return { deck: "arcade", task: "Cabinet", locked: true };
  if (role === "pm" && args.tube) return { deck: "lounge", task: "Tube", locked: true };
  return { deck: "lobby", task: "Counter", locked: false };
}

export const VAULT_STAGER_ROOM: Record<string, HallId> = {
  nyx: "exchange",
  rix: "arcade",
  vex: "exchange",
  hal: "office",
  molt: "office",
};

export function crewHall(
  role: RoleId,
  args: { queue: StagePacket[]; working: RoleId[]; viewing: HallId },
): HallId {
  const staged = args.queue.find((p) => !p.proposal.executed && STAGER_ROLE[p.stager as StagerId] === role);
  if (staged) return VAULT_STAGER_ROOM[staged.stager] ?? "office";
  if (args.working.includes(role)) {
    if (role === "engineer") return "arcade";
    if (role === "cpo" || role === "qa") return "exchange";
  }
  if (args.viewing === "arcade" && role === "engineer") return "arcade";
  if (args.viewing === "exchange" && (role === "cpo" || role === "qa")) return "exchange";
  return "office";
}

let deckReq = { deck: "lobby" as DeckId, n: 0, station: "" };
const deckSubs = new Set<() => void>();

/** Open a room from the dock or the teleporter. Optional station runs inside that room. */
export function requestDeck(deck: DeckId, station = "") {
  deckReq = { deck, n: deckReq.n + 1, station };
  for (const fn of deckSubs) fn();
}

export function deckRequest() {
  return deckReq;
}

export function subscribeDeck(fn: () => void) {
  deckSubs.add(fn);
  return () => deckSubs.delete(fn);
}

export function isCampus(room: RoomId) {
  return canonicalRoom(room) !== "office";
}

export function isRoomId(v: string): v is RoomId {
  return Object.prototype.hasOwnProperty.call(ROOMS, v);
}

/** Navigate. Forge-a-game stays with looksLikeArcade. */
export function matchRoom(text: string): RoomId | null {
  const t = text.toLowerCase();
  if (/\b(back to (the )?(office|vault|lobby)|main floor|office floor|the vault|the lobby|the counter)\b/.test(t)) return "office";
  if (/\b(theater|theatre|movie|cinema|entertainment|show room|youtube|steam|arcade)\b/.test(t)) return "arcade";
  if (/\b(exchange|trading desk|paper desk|business room|shop rails|dropship|drop ship)\b/.test(t)) return "exchange";
  if (/\b(library|bookshelf|study room|computer room|compute room|workstation|lab room|sesa|vsa|nexus core|security|proof room)\b/.test(t)) return "office";
  if (/\b(open|go to|enter|take me|show me)\b/.test(t) && /\b(play|arcade)\b/.test(t)) return "arcade";
  if (/\b(open|go to|enter|take me|show me)\b/.test(t) && /\b(desk|business)\b/.test(t)) return "exchange";
  if (/\b(open|go to|enter|take me|show me)\b/.test(t) && /\b(office|lobby|vault)\b/.test(t)) return "office";
  return null;
}

export type Tape = {
  id: string;
  title: string;
  hero: "operator" | "engineer" | "cpo" | "pm" | "qa";
  pose: "idle" | "talk" | "work" | "cheer" | "carry" | "trophy";
  note: string;
  runtime: number;
};

export const TAPES: Tape[] = [
  { id: "gate", title: "Gate fail-closed", hero: "qa", pose: "talk", note: "No silent execute. You hold COMMIT.", runtime: 8 },
  { id: "ware", title: "Ware Constant walk", hero: "engineer", pose: "work", note: "Phenomenology. Not this runtime.", runtime: 9 },
  { id: "paper", title: "Paper desk", hero: "cpo", pose: "carry", note: "Coinbase mark. Local fill.", runtime: 7 },
  { id: "sunder", title: "SCAN SNAP SUNDER", hero: "cpo", pose: "work", note: "Look up, plan, write. Lab only.", runtime: 8 },
  { id: "lab", title: "Lab night shift", hero: "engineer", pose: "idle", note: "Edit, TEST, RUN.", runtime: 8 },
  { id: "holds", title: "Holds and drains", hero: "pm", pose: "talk", note: "Oldest first.", runtime: 7 },
  { id: "arcade", title: "Arcade idle", hero: "operator", pose: "cheer", note: "Paddle stays local.", runtime: 6 },
  { id: "hash", title: "Clean room hash", hero: "qa", pose: "trophy", note: "If it isn't hashed it didn't happen.", runtime: 8 },
];

export type Machine = {
  id: string;
  chip: string;
  title: string;
  hint?: string;
  pose: "idle" | "work" | "carry" | "sit" | "wave" | "talk";
  kind: "think" | "toggle" | "pane";
};

export const EXCHANGE_MACHINES: Machine[] = [
  { id: "trade", chip: "TRADE", title: "Paper ticket", hint: "paper buy 0.01 BTC", pose: "work", kind: "think" },
  { id: "restock", chip: "SHIP", title: "Dropship restock", hint: "restock 40 units", pose: "carry", kind: "think" },
  { id: "scan", chip: "SCAN", title: "Mark scan", hint: "scan the mark", pose: "talk", kind: "think" },
  { id: "backtest", chip: "TEST", title: "MACD walk", hint: "backtest MACD", pose: "sit", kind: "think" },
  { id: "auto", chip: "AUTO", title: "AUTO AUTH · policy COMMIT", pose: "wave", kind: "toggle" },
];
