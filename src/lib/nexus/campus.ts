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

export type VaultCell = {
  room: HallId;
  art: string;
  name: string;
  role: "engineer" | "qa" | "cpo" | "pm" | "operator" | "cto";
  pose: VaultPose;
  blurb: string;
  span?: 1 | 2;
};

export type VaultFloorDef = {
  id: string;
  label: string;
  mark: string;
  rooms: VaultCell[];
};

/** Fallout Shelter cutaway — three workplaces. */
export const VAULT_FLOORS: VaultFloorDef[] = [
  {
    id: "desk",
    label: "BUSINESS",
    mark: "2F",
    rooms: [
      { room: "exchange", art: "/vault/office-core.png", name: "VEX", role: "cpo", pose: "work", blurb: "Plant. Dropship. Paper trade.", span: 2 },
    ],
  },
  {
    id: "play",
    label: "PLAY",
    mark: "1F",
    rooms: [
      { room: "arcade", art: "/vault/arcade-hall.png", name: "RIX", role: "engineer", pose: "cheer", blurb: "Arcade. Tube. Steam.", span: 2 },
    ],
  },
  {
    id: "lobby",
    label: "LOBBY",
    mark: "0F",
    rooms: [
      { room: "office", art: "/vault/lounge-cell.png", name: "MOLT", role: "operator", pose: "talk", blurb: "The counter is chat.", span: 2 },
    ],
  },
];

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
