import type { RoleId } from "./types.ts";

export type ClubZone = "tapes" | "tube" | "duel" | "tune" | "steam" | "bout";

export const CLUB_ZONES: { id: ClubZone; chip: string; label: string }[] = [
  { id: "tapes", chip: "TAPE", label: "Floorcast" },
  { id: "tube", chip: "TUBE", label: "YouTube" },
  { id: "duel", chip: "DUEL", label: "Chess" },
  { id: "bout", chip: "BOUT", label: "Tourney" },
  { id: "tune", chip: "TUNE", label: "Jukebox" },
  { id: "steam", chip: "STEAM", label: "Lounge" },
];

export const CLUB_SPEECH: Record<ClubZone, string> = {
  tapes: "Local tapes. Crew on the glass. Not a stream.",
  tube: "YouTube portal. Official embed. Paste a public URL. We don't host the file.",
  duel: "Chess. You vs crew, or WATCH two agents. Search depth is honest.",
  bout: "Packet bout. Two crew, first to 3. The hash is the scoreboard.",
  tune: "Jukebox. Original chips. No licensed catalog.",
  steam: "Steam is a handoff. Nexus does not ship their binaries or bypass DRM.",
};

export type ClubScore = {
  game: string;
  title: string;
  hero: RoleId;
  score: number;
  ts: number;
};

export type ClubDuel = {
  id: string;
  white: string;
  black: string;
  result: "1-0" | "0-1" | "1/2-1/2";
  ply: number;
  ts: number;
};

export type ClubState = {
  zone: ClubZone;
  scores: ClubScore[];
  duels: ClubDuel[];
  plays: number;
  tubeId: string | null;
  lastTune: string | null;
};

export const DEFAULT_CLUB: ClubState = {
  zone: "tapes",
  scores: [],
  duels: [],
  plays: 0,
  tubeId: null,
  lastTune: null,
};

export function isClubZone(v: string): v is ClubZone {
  return CLUB_ZONES.some((z) => z.id === v);
}

export function hydrateClub(raw?: Partial<ClubState> | null): ClubState {
  const zone = raw?.zone && isClubZone(raw.zone) ? raw.zone : "tapes";
  return {
    zone,
    scores: Array.isArray(raw?.scores) ? raw.scores.slice(0, 16) : [],
    duels: Array.isArray(raw?.duels) ? raw.duels.slice(0, 16) : [],
    plays: Math.max(0, Number(raw?.plays) || 0),
    tubeId: typeof raw?.tubeId === "string" ? raw.tubeId : null,
    lastTune: typeof raw?.lastTune === "string" ? raw.lastTune : null,
  };
}

/** Chess / YouTube / jukebox / Steam — entertainment verbs, not GOVERN. */
export function matchClub(text: string): ClubZone | null {
  const t = text.toLowerCase();
  if (/\b(chess|duel|challenge)\b/.test(t)) return "duel";
  if (/\b(tournament|tourney|bout|packet pong|agent vs agent)\b/.test(t)) return "bout";
  if (/\b(youtube|yt\b|watch (a )?(video|film)|video portal|tube)\b/.test(t)) return "tube";
  if (/\b(jukebox|music lounge|chiptune|play (a )?track)\b/.test(t)) return "tune";
  if (/\b(steam|gaming lounge)\b/.test(t)) return "steam";
  return null;
}

export function youtubeSearchEmbed(query: string) {
  return `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(query.trim())}`;
}

const YT_ID = /^[A-Za-z0-9_-]{11}$/;

export function parseYouTubeId(input: string): string | null {
  const raw = input.trim();
  if (!raw) return null;
  if (YT_ID.test(raw)) return raw;
  try {
    const url = new URL(raw.startsWith("http") ? raw : `https://${raw}`);
    const host = url.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0] ?? "";
      return YT_ID.test(id) ? id : null;
    }
    if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
      const v = url.searchParams.get("v");
      if (v && YT_ID.test(v)) return v;
      const parts = url.pathname.split("/").filter(Boolean);
      if ((parts[0] === "embed" || parts[0] === "shorts" || parts[0] === "live") && parts[1] && YT_ID.test(parts[1])) {
        return parts[1];
      }
    }
  } catch {
    return null;
  }
  return null;
}

export const TUBE_REELS: { id: string; title: string; note: string }[] = [
  { id: "aircAruvnKk", title: "Neural net", note: "3Blue1Brown · public YouTube" },
  { id: "DHjqpvDnNGE", title: "JavaScript in 100s", note: "Fireship · public YouTube" },
  { id: "fNk_zzaMoSs", title: "Linear algebra", note: "3Blue1Brown · public YouTube" },
];

export function youtubeEmbed(id: string) {
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
}

export function youtubeWatch(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}

export const TUBE_LINKS: { title: string; href: string; note: string }[] = [
  { title: "Sign in on YouTube", href: "https://www.youtube.com/signin", note: "Google's page. Nexus never sees the password." },
  { title: "Your YouTube", href: "https://www.youtube.com/", note: "That tab can use your session. This player stays a public embed." },
];

export const STEAM_LINKS: { title: string; href: string; note: string }[] = [
  { title: "Sign in on Steam", href: "https://store.steampowered.com/login/", note: "Valve's page. Nexus never sees the password." },
  { title: "Open Steam", href: "steam://open/main", note: "Hands off to the Steam app if it is installed." },
  { title: "Steam Store", href: "https://store.steampowered.com/", note: "Opens Valve. Not this floor." },
  { title: "Your library", href: "https://steamcommunity.com/my/games", note: "Needs the Steam session in that tab." },
];

export type Track = { id: string; title: string; bpm: number; seed: number; note: string };

export const TRACKS: Track[] = [
  { id: "gate", title: "Gate Closed", bpm: 92, seed: 1, note: "Fail-closed ostinato" },
  { id: "paper", title: "Paper Desk", bpm: 110, seed: 2, note: "Mark, not money" },
  { id: "night", title: "Night Floor", bpm: 74, seed: 3, note: "Ops phosphor" },
  { id: "hash", title: "Hash Hop", bpm: 128, seed: 4, note: "If it isn't hashed" },
];

export const DUELISTS: RoleId[] = ["engineer", "qa", "cpo", "pm", "operator"];

/** Honest search depth. Not a rating of intelligence. */
export const DUEL_DEPTH: Record<RoleId, number> = {
  operator: 1,
  pm: 1,
  ceo: 1,
  cpo: 2,
  engineer: 2,
  cto: 2,
  qa: 2,
};

export function pushScore(club: ClubState, row: ClubScore): ClubState {
  const scores = [...club.scores.filter((s) => !(s.game === row.game && s.hero === row.hero && s.score <= row.score)), row]
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);
  return { ...club, scores };
}

export function pushDuel(club: ClubState, row: ClubDuel): ClubState {
  return { ...club, duels: [row, ...club.duels].slice(0, 12) };
}

export function boardRows(club: ClubState) {
  return [...club.scores].sort((a, b) => b.score - a.score).slice(0, 8);
}
