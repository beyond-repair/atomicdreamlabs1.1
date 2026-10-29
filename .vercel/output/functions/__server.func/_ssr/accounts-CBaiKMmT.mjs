import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/accounts-CBaiKMmT.js
var NOT_IN_KIT = {
	id: "kit",
	label: "Not in this kit",
	state: "closed",
	note: "Gmail, Outlook, and Teams connect in Grok, and this office has no tool name for them, so it will not fake an inbox. A bank password is not accepted.",
	rows: []
};
function textOf(value) {
	if (typeof value === "string" || typeof value === "number") return String(value);
	if (value && typeof value === "object") {
		const row = value;
		if (typeof row.dateTime === "string") return row.dateTime;
		if (typeof row.date === "string") return row.date;
	}
	return "";
}
function rowsFrom(data) {
	const bag = data && typeof data === "object" ? data : null;
	const list = Array.isArray(data) ? data : bag ? bag.files ?? bag.items ?? bag.events ?? bag.calendars ?? bag.results ?? bag.data : null;
	const source = Array.isArray(list) ? list : bag ? [bag] : [];
	const rows = [];
	for (const item of source) {
		if (!item || typeof item !== "object") continue;
		const row = item;
		const title = textOf(row.name ?? row.title ?? row.summary ?? row.id).slice(0, 96);
		if (!title) continue;
		const detail = textOf(row.mimeType ?? row.start ?? row.updated ?? row.description).slice(0, 96);
		rows.push({
			title,
			detail
		});
		if (rows.length === 6) break;
	}
	return rows;
}
function laneFrom(id, label, result) {
	if (result.ok) {
		const rows = rowsFrom(result.data);
		return {
			id,
			label,
			state: rows.length ? "live" : "empty",
			note: rows.length ? "Read from your account." : "Connected. Nothing matched.",
			rows
		};
	}
	if (result.pending) return {
		id,
		label,
		state: "pending",
		note: "Connecting…",
		rows: []
	};
	if (result.loginRequired && result.loginUrl) return {
		id,
		label,
		state: "login",
		note: "Continue with Grok to load this.",
		rows: [],
		loginUrl: result.loginUrl
	};
	const raw = (result.errorMessage ?? "").toLowerCase();
	if (raw.includes("not_connected") || raw.includes("failed_precondition")) return {
		id,
		label,
		state: "closed",
		note: "Not granted. Connect it in Grok, then reopen this room.",
		rows: []
	};
	if (raw.includes("missing_connector_token")) return {
		id,
		label,
		state: "closed",
		note: "Open this office from Grok. A direct tab has no account token.",
		rows: []
	};
	return {
		id,
		label,
		state: "closed",
		note: result.errorMessage || "Could not read this account.",
		rows: []
	};
}
async function publicGithub() {
	try {
		const res = await fetch("https://api.github.com/users/beyond-repair/repos?per_page=6&sort=updated&type=public", { headers: {
			accept: "application/vnd.github+json",
			"user-agent": "NEXUS-Office"
		} });
		if (!res.ok) return {
			id: "github",
			label: "GitHub",
			state: "closed",
			note: "The public org did not answer. This is not your private account.",
			rows: []
		};
		const rows = (await res.json()).filter((r) => r.name && r.html_url?.startsWith("https://")).slice(0, 6).map((r) => ({
			title: r.name ?? "",
			detail: (r.description ?? "Public repo").slice(0, 80),
			href: r.html_url
		}));
		return {
			id: "github",
			label: "GitHub",
			state: rows.length ? "live" : "empty",
			note: "Public beyond-repair repos. Not your private repos, branches, or pull requests.",
			rows
		};
	} catch {
		return {
			id: "github",
			label: "GitHub",
			state: "closed",
			note: "GitHub did not answer. This is not your private account.",
			rows: []
		};
	}
}
async function publicSpot() {
	try {
		const res = await fetch("https://api.coinbase.com/v2/prices/BTC-USD/spot");
		const json = await res.json();
		const n = Number(json.data?.amount);
		if (!res.ok || !Number.isFinite(n) || n <= 0) return {
			id: "coinbase",
			label: "Coinbase",
			state: "closed",
			note: "No live mark. No balance and no order.",
			rows: []
		};
		return {
			id: "coinbase",
			label: "Coinbase",
			state: "live",
			note: "Public BTC mark. No balance and no live order.",
			rows: [{
				title: `BTC ${n.toFixed(0)}`,
				detail: "USD spot"
			}]
		};
	} catch {
		return {
			id: "coinbase",
			label: "Coinbase",
			state: "closed",
			note: "Coinbase did not answer. No fake price.",
			rows: []
		};
	}
}
async function publicSteam(vanity) {
	const { readPublicSteam } = await import("./steam-DthFImZa.mjs").then((n) => n.r).then((n) => n.n);
	if (!vanity.trim()) return {
		id: "steam",
		label: "Steam",
		state: "empty",
		note: "Type a public Steam name in the lounge. Not a signed-in library.",
		rows: []
	};
	const result = await readPublicSteam(vanity);
	if (!result.ok) return {
		id: "steam",
		label: "Steam",
		state: "closed",
		note: result.error,
		rows: []
	};
	return {
		id: "steam",
		label: "Steam",
		state: "live",
		note: `Public library for ${result.name}. Launch opens Steam on this device.`,
		rows: result.games.slice(0, 6).map((g) => ({
			title: g.name,
			detail: "Launch",
			href: `steam://run/${g.appId}`
		}))
	};
}
var pullAccounts_createServerFn_handler = createServerRpc({
	id: "0b57fac9d34201aa50f30cd5d276494b930d7a647e81e41983d5a9e43f1fe6fe",
	name: "pullAccounts",
	filename: "src/lib/nexus/accounts.ts"
}, (opts) => pullAccounts.__executeServer(opts));
var pullAccounts = createServerFn({ method: "POST" }).validator((v) => ({ steam: String(v?.steam ?? "").slice(0, 64) })).handler(pullAccounts_createServerFn_handler, async ({ data }) => {
	const { callTool } = await import("./client.server-DudwToMs.mjs");
	const { ConnectorType, GoogleCalendarTools, GoogleDriveTools } = await import("./types-BdKBULy9.mjs").then((n) => n.s);
	const now = /* @__PURE__ */ new Date();
	const week = new Date(now.getTime() + 6048e5);
	const [drive, calendars, events, github, spot, steam] = await Promise.all([
		callTool(GoogleDriveTools.search, { q: "trashed = false" }, { connectorType: ConnectorType.GoogleDrive }),
		callTool(GoogleCalendarTools.listCalendars, {}, { connectorType: ConnectorType.GoogleCalendar }),
		callTool(GoogleCalendarTools.search, {
			timeMin: now.toISOString(),
			timeMax: week.toISOString()
		}, { connectorType: ConnectorType.GoogleCalendar }),
		publicGithub(),
		publicSpot(),
		publicSteam(data.steam)
	]);
	return { lanes: [
		laneFrom("drive", "Google Drive", drive),
		laneFrom("calendar", "Google Calendar", events.ok ? events : calendars),
		github,
		steam,
		spot,
		NOT_IN_KIT
	] };
});
//#endregion
export { pullAccounts_createServerFn_handler };
