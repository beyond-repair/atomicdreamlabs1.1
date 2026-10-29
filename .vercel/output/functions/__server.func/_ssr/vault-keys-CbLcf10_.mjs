import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vault-keys-CbLcf10_.js
function clip(value, max) {
	return String(value ?? "").trim().slice(0, max);
}
function keyBag(value) {
	return {
		github: clip(value?.github, 255),
		notion: clip(value?.notion, 255),
		slack: clip(value?.slack, 255),
		steamKey: clip(value?.steamKey, 80).replace(/[^A-Za-z0-9]/g, ""),
		steamId: clip(value?.steamId, 20).replace(/\D/g, ""),
		coinbaseKey: clip(value?.coinbaseKey, 255),
		coinbaseSecret: clip(value?.coinbaseSecret, 255)
	};
}
function refused(id, label, status) {
	return {
		id,
		label,
		state: "closed",
		note: status === 401 || status === 403 ? "The key was refused. Nothing was changed." : "The service did not answer.",
		rows: []
	};
}
function ghHeaders(token) {
	return {
		accept: "application/vnd.github+json",
		authorization: `Bearer ${token}`,
		"user-agent": "NEXUS-Office"
	};
}
function repoPath(full) {
	const [owner, repo] = full.split("/");
	if (!owner || !repo || !/^[A-Za-z0-9_.-]+$/.test(owner) || !/^[A-Za-z0-9_.-]+$/.test(repo)) return "";
	return `${owner}/${repo}`;
}
async function repoTrail(token, full, branch) {
	const name = repoPath(full);
	if (!name) return [];
	const short = name.split("/")[1] ?? name;
	const headers = ghHeaders(token);
	const [commitRes, branchRes] = await Promise.all([fetch(`https://api.github.com/repos/${name}/commits?per_page=2`, { headers }).catch(() => null), fetch(`https://api.github.com/repos/${name}/branches?per_page=8`, { headers }).catch(() => null)]);
	const rows = [];
	if (commitRes?.ok) {
		const commits = await commitRes.json();
		if (Array.isArray(commits)) for (const commit of commits.slice(0, 2)) {
			const title = (commit.commit?.message ?? "").split("\n")[0]?.trim().slice(0, 72);
			if (!title || !commit.html_url?.startsWith("https://github.com/")) continue;
			rows.push({
				title,
				detail: `Commit · ${short}`,
				href: commit.html_url
			});
		}
	}
	if (branchRes?.ok) {
		const branches = await branchRes.json();
		if (Array.isArray(branches)) {
			let shown = 0;
			for (const item of branches) {
				if (!item.name || item.name === branch || !/^[A-Za-z0-9_./-]+$/.test(item.name)) continue;
				rows.push({
					title: item.name.slice(0, 60),
					detail: `Branch · ${short}`,
					href: `https://github.com/${name}/tree/${item.name.split("/").map(encodeURIComponent).join("/")}`
				});
				shown += 1;
				if (shown === 2) break;
			}
		}
	}
	return rows;
}
async function githubLane(token) {
	if (!token) return null;
	try {
		const headers = ghHeaders(token);
		const res = await fetch("https://api.github.com/user/repos?per_page=6&sort=updated&affiliation=owner,collaborator,organization_member", { headers });
		if (!res.ok) return refused("github-you", "Your GitHub", res.status);
		const [who, pulls] = await Promise.all([fetch("https://api.github.com/user", { headers }).then(async (r) => r.ok ? await r.json() : null).catch(() => null), fetch("https://api.github.com/search/issues?q=is:open+is:pr+author:@me&sort=updated&per_page=5", { headers }).then(async (r) => r.ok ? await r.json() : null).catch(() => null)]);
		const data = await res.json();
		const repos = (Array.isArray(data) ? data : []).filter((r) => r.full_name && r.html_url?.startsWith("https://github.com/")).slice(0, 6);
		const trails = await Promise.all(repos.slice(0, 3).map((r) => repoTrail(token, r.full_name ?? "", r.default_branch ?? "")));
		const rows = [];
		repos.forEach((r, i) => {
			rows.push({
				title: r.full_name ?? "",
				detail: `${r.private ? "Private" : "Public"}${r.default_branch ? ` · ${r.default_branch}` : ""}`,
				href: r.html_url
			});
			if (trails[i]) rows.push(...trails[i]);
		});
		for (const item of pulls?.items ?? []) {
			if (!item.title || !item.html_url?.startsWith("https://")) continue;
			rows.push({
				title: item.title.slice(0, 80),
				detail: item.number ? `PR #${item.number}` : "Pull request",
				href: item.html_url
			});
		}
		return {
			id: "github-you",
			label: "Your GitHub",
			state: rows.length ? "live" : "empty",
			note: who?.login && /^[A-Za-z0-9-]+$/.test(who.login) ? `Signed in as ${who.login}. Repos, branches, latest commits, and open pull requests. This office does not push.` : "Repos, branches, latest commits, and open pull requests. This office does not push.",
			rows
		};
	} catch {
		return refused("github-you", "Your GitHub", 0);
	}
}
async function notionLane(token) {
	if (!token) return null;
	try {
		const res = await fetch("https://api.notion.com/v1/search", {
			method: "POST",
			headers: {
				authorization: `Bearer ${token}`,
				"notion-version": "2022-06-28",
				"content-type": "application/json"
			},
			body: JSON.stringify({ page_size: 6 })
		});
		if (!res.ok) return refused("notion", "Notion", res.status);
		const json = await res.json();
		const rows = [];
		for (const item of json.results ?? []) {
			let title = "";
			for (const prop of Object.values(item.properties ?? {})) {
				const text = prop.title?.[0]?.plain_text;
				if (text) {
					title = text;
					break;
				}
			}
			if (!title) title = "Untitled page";
			rows.push({
				title: title.slice(0, 80),
				detail: "Page",
				href: item.url?.startsWith("https://") ? item.url : void 0
			});
			if (rows.length === 6) break;
		}
		return {
			id: "notion",
			label: "Notion",
			state: rows.length ? "live" : "empty",
			note: "Pages your integration can see. Share a page with the integration or this stays empty.",
			rows
		};
	} catch {
		return refused("notion", "Notion", 0);
	}
}
async function slackLane(token) {
	if (!token) return null;
	try {
		const res = await fetch("https://slack.com/api/conversations.list?limit=8&exclude_archived=true", { headers: { authorization: `Bearer ${token}` } });
		const json = await res.json();
		if (!res.ok || json.ok === false) return refused("slack", "Slack", res.ok ? 403 : res.status);
		const rows = (json.channels ?? []).filter((c) => c.name).slice(0, 6).map((c) => ({
			title: `#${c.name}`,
			detail: typeof c.num_members === "number" ? `${c.num_members} people` : "Channel"
		}));
		return {
			id: "slack",
			label: "Slack",
			state: rows.length ? "live" : "empty",
			note: "Channels this token can list. The office does not post.",
			rows
		};
	} catch {
		return refused("slack", "Slack", 0);
	}
}
async function steamLane(key, steamId) {
	if (!key && !steamId) return null;
	if (!key || !steamId) return {
		id: "steam-you",
		label: "Your Steam",
		state: "closed",
		note: "Need both a Web API key and your SteamID64.",
		rows: []
	};
	try {
		const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${encodeURIComponent(key)}&steamid=${encodeURIComponent(steamId)}&include_appinfo=1&format=json`;
		const res = await fetch(url);
		if (!res.ok) return refused("steam-you", "Your Steam", res.status);
		const rows = ((await res.json()).response?.games ?? []).filter((g) => g.appid && g.name).slice(0, 6).map((g) => ({
			title: g.name ?? "",
			detail: "Launch",
			href: `steam://run/${g.appid}`
		}));
		return {
			id: "steam-you",
			label: "Your Steam",
			state: rows.length ? "live" : "empty",
			note: rows.length ? "Owned games from your key. Launch opens Steam on this device." : "The key answered, and the library was empty or private to that key.",
			rows
		};
	} catch {
		return refused("steam-you", "Your Steam", 0);
	}
}
async function coinbaseLane(key, secret) {
	if (!key && !secret) return null;
	if (!key || !secret) return {
		id: "coinbase-you",
		label: "Coinbase balance",
		state: "closed",
		note: "Need both the API key and the secret. No order was sent.",
		rows: []
	};
	try {
		const { createHmac } = await import("node:crypto");
		const timestamp = Math.floor(Date.now() / 1e3).toString();
		const path = "/v2/accounts";
		const sign = createHmac("sha256", secret).update(timestamp + "GET/v2/accounts").digest("hex");
		const res = await fetch(`https://api.coinbase.com${path}`, { headers: {
			"CB-ACCESS-KEY": key,
			"CB-ACCESS-SIGN": sign,
			"CB-ACCESS-TIMESTAMP": timestamp,
			"CB-VERSION": "2021-04-07"
		} });
		if (!res.ok) return refused("coinbase-you", "Coinbase balance", res.status);
		const json = await res.json();
		const rows = (json.data ?? []).map((a) => ({
			title: `${a.balance?.currency ?? "?"} ${a.balance?.amount ?? "0"}`,
			detail: (a.name ?? "Account").slice(0, 48)
		})).filter((r) => !r.title.endsWith(" 0") && !r.title.endsWith(" 0.00")).slice(0, 6);
		return {
			id: "coinbase-you",
			label: "Coinbase balance",
			state: rows.length ? "live" : "empty",
			note: "Balances only. This office still does not place a live order.",
			rows: rows.length ? rows : (json.data ?? []).slice(0, 4).map((a) => ({
				title: `${a.balance?.currency ?? "?"} ${a.balance?.amount ?? "0"}`,
				detail: a.name ?? "Account"
			}))
		};
	} catch {
		return refused("coinbase-you", "Coinbase balance", 0);
	}
}
var readKeyedAccounts_createServerFn_handler = createServerRpc({
	id: "8d63efc9c5ccda5d8e36edea803a16f6d016689662829302da638b3c7f3df29a",
	name: "readKeyedAccounts",
	filename: "src/lib/nexus/vault-keys.ts"
}, (opts) => readKeyedAccounts.__executeServer(opts));
var readKeyedAccounts = createServerFn({ method: "POST" }).validator((v) => keyBag(v)).handler(readKeyedAccounts_createServerFn_handler, async ({ data }) => {
	return { lanes: (await Promise.all([
		githubLane(data.github),
		notionLane(data.notion),
		slackLane(data.slack),
		steamLane(data.steamKey, data.steamId),
		coinbaseLane(data.coinbaseKey, data.coinbaseSecret)
	])).filter((lane) => !!lane) };
});
var hostLabPage_createServerFn_handler = createServerRpc({
	id: "bfadfa1d4084be4ac3a1432c7027f4f3d38c92f55d7f681b94ea7cf3dfad346d",
	name: "hostLabPage",
	filename: "src/lib/nexus/vault-keys.ts"
}, (opts) => hostLabPage.__executeServer(opts));
var hostLabPage = createServerFn({ method: "POST" }).validator((v) => ({
	token: clip(v?.token, 200),
	html: clip(v?.html, 4e5)
})).handler(hostLabPage_createServerFn_handler, async ({ data }) => {
	if (!data.token) return {
		ok: false,
		error: "Paste a Vercel token. Nothing was hosted."
	};
	if (data.html.length < 40) return {
		ok: false,
		error: "The page is empty. Seed one first."
	};
	const bytes = new TextEncoder().encode(data.html);
	let bin = "";
	for (const b of bytes) bin += String.fromCharCode(b);
	try {
		const res = await fetch("https://api.vercel.com/v13/deployments", {
			method: "POST",
			headers: {
				authorization: `Bearer ${data.token}`,
				"content-type": "application/json"
			},
			body: JSON.stringify({
				name: "nexus-lab",
				files: [{
					file: "index.html",
					data: btoa(bin),
					encoding: "base64"
				}],
				projectSettings: { framework: null }
			})
		});
		const json = await res.json().catch(() => null);
		if (!res.ok) return {
			ok: false,
			error: json?.error?.message?.slice(0, 160) || "Vercel refused the page. Nothing was hosted."
		};
		const host = json?.url ?? "";
		if (!/^[a-z0-9.-]+$/i.test(host)) return {
			ok: false,
			error: "Vercel did not return a host."
		};
		return {
			ok: true,
			url: `https://${host}`
		};
	} catch {
		return {
			ok: false,
			error: "Vercel did not answer. Nothing was hosted."
		};
	}
});
//#endregion
export { hostLabPage_createServerFn_handler, readKeyedAccounts_createServerFn_handler };
