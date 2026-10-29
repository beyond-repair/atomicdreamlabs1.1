import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/steam-CXqfSKBe.js
async function readPublicSteam(vanity) {
	const name = vanity.trim().replace(/[^A-Za-z0-9_-]/g, "").slice(0, 64);
	if (!name) return {
		ok: false,
		error: "Type a public Steam name."
	};
	const url = `https://steamcommunity.com/id/${encodeURIComponent(name)}/games?xml=1`;
	let text = "";
	try {
		const res = await fetch(url, { headers: { accept: "application/xml,text/xml" } });
		text = await res.text();
		if (!res.ok) return {
			ok: false,
			error: "Steam did not answer. The library stays disconnected."
		};
	} catch {
		return {
			ok: false,
			error: "Steam did not answer. The library stays disconnected."
		};
	}
	if (/profile could not be found|The specified profile could not be found/i.test(text)) return {
		ok: false,
		error: "No public profile with that name."
	};
	if (/This profile is private/i.test(text)) return {
		ok: false,
		error: "That profile is private. Steam will not show the library."
	};
	const games = [];
	const re = /<appID>(\d+)<\/appID>[\s\S]*?<name><!\[CDATA\[([\s\S]*?)\]\]><\/name>/g;
	let m;
	while ((m = re.exec(text)) && games.length < 24) games.push({
		appId: m[1] ?? "",
		name: (m[2] ?? "").trim()
	});
	if (!games.length) return {
		ok: false,
		error: "No public games on that profile."
	};
	return {
		ok: true,
		name,
		games
	};
}
var loadSteamLibrary_createServerFn_handler = createServerRpc({
	id: "f7ed02a369e5a8eef90f2aaba445b4eee031e829b0b3ac54200517f6a1ce497d",
	name: "loadSteamLibrary",
	filename: "src/lib/nexus/steam.ts"
}, (opts) => loadSteamLibrary.__executeServer(opts));
var loadSteamLibrary = createServerFn({ method: "POST" }).validator((v) => ({ vanity: String(v?.vanity ?? "") })).handler(loadSteamLibrary_createServerFn_handler, async ({ data }) => readPublicSteam(data.vanity));
//#endregion
export { loadSteamLibrary_createServerFn_handler };
