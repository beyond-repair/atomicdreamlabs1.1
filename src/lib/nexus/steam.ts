import { createServerFn } from "@tanstack/react-start";

export type SteamGame = { appId: string; name: string };

export async function readPublicSteam(vanity: string): Promise<{ ok: true; name: string; games: SteamGame[] } | { ok: false; error: string }> {
  const name = vanity.trim().replace(/[^A-Za-z0-9_-]/g, "").slice(0, 64);
  if (!name) return { ok: false, error: "Type a public Steam name." };
  const url = `https://steamcommunity.com/id/${encodeURIComponent(name)}/games?xml=1`;
  let text = "";
  try {
    const res = await fetch(url, { headers: { accept: "application/xml,text/xml" } });
    text = await res.text();
    if (!res.ok) return { ok: false, error: "Steam did not answer. The library stays disconnected." };
  } catch {
    return { ok: false, error: "Steam did not answer. The library stays disconnected." };
  }
  if (/profile could not be found|The specified profile could not be found/i.test(text)) {
    return { ok: false, error: "No public profile with that name." };
  }
  if (/This profile is private/i.test(text)) {
    return { ok: false, error: "That profile is private. Steam will not show the library." };
  }
  const games: SteamGame[] = [];
  const re = /<appID>(\d+)<\/appID>[\s\S]*?<name><!\[CDATA\[([\s\S]*?)\]\]><\/name>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) && games.length < 24) {
    games.push({ appId: m[1] ?? "", name: (m[2] ?? "").trim() });
  }
  if (!games.length) return { ok: false, error: "No public games on that profile." };
  return { ok: true, name, games };
}

export const loadSteamLibrary = createServerFn({ method: "POST" })
  .validator((v: { vanity: string }) => ({ vanity: String(v?.vanity ?? "") }))
  .handler(async ({ data }) => readPublicSteam(data.vanity));
