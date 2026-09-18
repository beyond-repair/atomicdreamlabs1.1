import { ROLES, type RoleId } from "./types.ts";

export type EngineId = "paddle" | "pellet" | "raid" | "hop" | "snake" | "drift" | "hold";

export type Cabinet = {
  id: string;
  title: string;
  engine: EngineId;
  hero: RoleId;
  blurb: string;
  seed: number;
  skin: number;
  hi: number;
  ts: number;
  pending?: boolean;
};

const HEROES: RoleId[] = ["engineer", "qa", "cpo", "pm", "operator"];

export const STARTER_CABINETS: Cabinet[] = [
  {
    id: "cab-paddle",
    title: "PACKET PADDLE",
    engine: "paddle",
    hero: "engineer",
    blurb: "RIX keeps the packet in. Drag or L/R.",
    seed: 1,
    skin: 0,
    hi: 0,
    ts: 0,
  },
  {
    id: "cab-pellet",
    title: "SPEED PELLET",
    engine: "pellet",
    hero: "qa",
    blurb: "NYX eats dots. Hash after.",
    seed: 2,
    skin: 1,
    hi: 0,
    ts: 0,
  },
  {
    id: "cab-raid",
    title: "SKY RAID",
    engine: "raid",
    hero: "cpo",
    blurb: "VEX. A left. D right. FIRE.",
    seed: 3,
    skin: 2,
    hi: 0,
    ts: 0,
  },
  {
    id: "cab-snake",
    title: "WIRE SNAKE",
    engine: "snake",
    hero: "pm",
    blurb: "HAL. A left. D right. Don't bite the hash.",
    seed: 4,
    skin: 3,
    hi: 0,
    ts: 0,
  },
  {
    id: "cab-hold",
    title: "HOLD THE GATE",
    engine: "hold",
    hero: "qa",
    blurb: "NYX. Place towers. Leaks are unauthorized executes.",
    seed: 5,
    skin: 4,
    hi: 0,
    ts: 0,
  },
];

const FORGE: Omit<Cabinet, "id" | "hi" | "ts" | "seed" | "skin">[] = [
  { title: "GATE HOP", engine: "hop", hero: "operator", blurb: "MOLT hops the leak. Tap jump. A/D in air." },
  { title: "PROOF HOLD", engine: "hold", hero: "qa", blurb: "NYX. Hold the gate. First targeting." },
  { title: "ROCK DRIFT", engine: "drift", hero: "cpo", blurb: "VEX. A left. D right. W thrust. FIRE." },
  { title: "HASH SNAKE", engine: "snake", hero: "qa", blurb: "NYX. Eat. Don't loop." },
  { title: "PROOF RAID", engine: "raid", hero: "qa", blurb: "NYX. A left. D right. FIRE." },
  { title: "SCOPE PADDLE", engine: "paddle", hero: "cpo", blurb: "VEX keeps the packet in." },
  { title: "BOARD HOP", engine: "hop", hero: "pm", blurb: "HAL. Owners first. Then jump." },
  { title: "LAB DRIFT", engine: "drift", hero: "engineer", blurb: "RIX. Spec first. Then burn." },
  { title: "LAB RAID", engine: "raid", hero: "engineer", blurb: "RIX. Spec first. Then fire." },
  { title: "KEY SNAKE", engine: "snake", hero: "operator", blurb: "MOLT routes the wire." },
  { title: "HASH HOP", engine: "hop", hero: "qa", blurb: "If it isn't hashed, it didn't hop." },
  { title: "KEY PADDLE", engine: "paddle", hero: "operator", blurb: "MOLT on the gate. Don't drop it." },
  { title: "SCOPE PELLET", engine: "pellet", hero: "cpo", blurb: "Smallest maze that still sells." },
  { title: "GATE DRIFT", engine: "drift", hero: "operator", blurb: "MOLT. Nose left on A." },
  { title: "LAB HOP", engine: "hop", hero: "engineer", blurb: "RIX. Jump the gap. Tests after." },
  { title: "PROOF PADDLE", engine: "paddle", hero: "qa", blurb: "NYX. Miss it and it didn't happen." },
  { title: "BOARD RAID", engine: "raid", hero: "pm", blurb: "HAL. Clear the sky. Then the board." },
  { title: "GATE PELLET", engine: "pellet", hero: "operator", blurb: "MOLT routes. You eat." },
];

export function heroSprite(hero: RoleId) {
  const role = ROLES[hero];
  return role?.sprite || role?.sit || "/office/bot/idle.png?v=unit";
}

export function heroName(hero: RoleId) {
  return (
    {
      operator: "MOLT",
      engineer: "RIX",
      cpo: "VEX",
      pm: "HAL",
      qa: "NYX",
      ceo: "ASH",
      cto: "KITE",
    } as Record<RoleId, string>
  )[hero];
}

export function looksLikeArcade(text: string) {
  return /\b(arcade|cabinet|new game|ship (a )?cabinet|forge (a )?(game|cabinet)|build (a )?(cabinet|arcade game))\b/i.test(
    text,
  );
}

function slug(title: string, n: number) {
  return `cab-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${n.toString(16)}`;
}

export function nextCabinet(existing: Cabinet[]): Cabinet {
  const used = new Set(existing.map((c) => c.title));
  const pick = FORGE.find((f) => !used.has(f.title)) ?? FORGE[existing.length % FORGE.length];
  const n = existing.length + 1;
  return {
    id: slug(pick.title, n + Date.now() % 997),
    title: used.has(pick.title) ? `${pick.title} ${n}` : pick.title,
    engine: pick.engine,
    hero: HEROES.includes(pick.hero) ? pick.hero : "engineer",
    blurb: pick.blurb,
    seed: n * 17 + 3,
    skin: n % 6,
    hi: 0,
    ts: Date.now(),
  };
}

export function hydrateCabinets(raw?: Cabinet[] | null): Cabinet[] {
  if (!raw?.length) return STARTER_CABINETS.map((c) => ({ ...c }));
  const have = new Set(raw.map((c) => c.id));
  const missing = STARTER_CABINETS.filter((s) => !have.has(s.id)).map((c) => ({ ...c }));
  return [...missing, ...raw]
    .filter((c, i, all) => all.findIndex((x) => x.id === c.id) === i)
    .slice(0, 16);
}

export const CABINET_CAP = 12;
