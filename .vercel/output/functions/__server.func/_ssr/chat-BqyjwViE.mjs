import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { G as looksLikeFactory, I as inspectCatalog, L as inspectPathways, R as inspectWatches, U as looksLikeBuild, Y as looksLikeWeather, h as PORTFOLIO, q as looksLikeRepos } from "./codex-DnJQJiuP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat-BqyjwViE.js
var TOOLS = [
	{
		type: "function",
		function: {
			name: "handoff",
			description: "Route to a specialist and keep working. Do not wait for the visitor.",
			parameters: {
				type: "object",
				properties: {
					role: {
						type: "string",
						enum: [
							"ceo",
							"cpo",
							"cto",
							"qa",
							"engineer",
							"pm",
							"operator"
						]
					},
					reason: { type: "string" }
				},
				required: ["role", "reason"]
			}
		}
	},
	{
		type: "function",
		function: {
			name: "scan_repos",
			description: "Search the operator public GitHub org beyond-repair. Use when they ask about our repos, stack, SEEM, LegionOS, BlockSwarm, Digital Double, Ware Constant, or what we can implement.",
			parameters: {
				type: "object",
				properties: { query: { type: "string" } },
				required: ["query"]
			}
		}
	},
	{
		type: "function",
		function: {
			name: "search_web",
			description: "Live internet search. Required for weather, news, current facts.",
			parameters: {
				type: "object",
				properties: { query: { type: "string" } },
				required: ["query"]
			}
		}
	},
	{
		type: "function",
		function: {
			name: "fetch_url",
			description: "Fetch a public http(s) page as plain text.",
			parameters: {
				type: "object",
				properties: { url: { type: "string" } },
				required: ["url"]
			}
		}
	},
	{
		type: "function",
		function: {
			name: "write_file",
			description: "Stage a lab file for COMMIT. It does not land in the IDE until the operator commits. For apps, stage index.html, styles.css, and main.js.",
			parameters: {
				type: "object",
				properties: {
					path: { type: "string" },
					content: { type: "string" }
				},
				required: ["path", "content"]
			}
		}
	},
	{
		type: "function",
		function: {
			name: "set_plan",
			description: "Long-horizon plan with owners and acceptance tests. Call before building.",
			parameters: {
				type: "object",
				properties: {
					goal: { type: "string" },
					steps: {
						type: "array",
						items: {
							type: "object",
							properties: {
								title: { type: "string" },
								owner: { type: "string" },
								test: { type: "string" }
							},
							required: [
								"title",
								"owner",
								"test"
							]
						}
					}
				},
				required: ["goal", "steps"]
			}
		}
	},
	{
		type: "function",
		function: {
			name: "mark_step",
			description: "Mark a plan step done after its test is satisfied.",
			parameters: {
				type: "object",
				properties: {
					index: { type: "number" },
					note: { type: "string" }
				},
				required: ["index"]
			}
		}
	},
	{
		type: "function",
		function: {
			name: "run_checks",
			description: "QA: inspect IDE files against required substrings.",
			parameters: {
				type: "object",
				properties: { must_include: {
					type: "array",
					items: { type: "string" }
				} },
				required: ["must_include"]
			}
		}
	},
	{
		type: "function",
		function: {
			name: "complete_goal",
			description: "Stop only when the goal and tests are actually done.",
			parameters: {
				type: "object",
				properties: { summary: { type: "string" } },
				required: ["summary"]
			}
		}
	},
	{
		type: "function",
		function: {
			name: "inspect_pathways",
			description: "List live automation pathways (paper trade, mean reversion, market scan, backtest, restock, fulfill, drain holds, quote, support, halt, shop, lab QA, design hash, audit, compliance). Use when they ask what the factory can execute.",
			parameters: {
				type: "object",
				properties: {}
			}
		}
	},
	{
		type: "function",
		function: {
			name: "inspect_watches",
			description: "List plant watches (low stock, drain holds, RSI band, scan cadence) and current LOW AT / BUY rules. Use when they ask about AUTO OPS, standing orders, inbound webhooks, held orders, or automation triggers.",
			parameters: {
				type: "object",
				properties: {}
			}
		}
	},
	{
		type: "function",
		function: {
			name: "inspect_codex",
			description: "List the office capability map: live / local / capped across tiers 1–5. Use when they ask what the office can do, which tier is live, or whether voice/APK/AGI is running.",
			parameters: {
				type: "object",
				properties: {}
			}
		}
	}
];
var SYSTEM = `You are NEXUS OPS, receptionist for Atomic Dream Labs.

The visitor already saw your welcome. Do not repeat the full speech unless they ask who you are or what this floor can do.
If they ask: this is a sovereign office + automation factory for a solo operator. Pixel office is the face. Tap furniture. CHAT / LAB / GOVERN. THINK → AUTH → COMMIT (fail-closed). Tap MAP for the live catalog. Tiers 1–3 that are marked live actually run here. T4–T5 (voice, APK, 24h unsupervised AGI, self-rewriting agents) are capped — say so. Set LOW AT / BUY on the plant board. Short inbound parks a HOLD. Arm LOW + HOLD. AUTO may AUTH. COMMIT needs a signed rule or you. NYX and RIX stage packets in GOVERN. Live weather, web search, lab IDE, arcade, shop rails, paper trade. Not Binance, not a live broker, not a regulator filing. Agents are proactive — they do not wait to be told twice.

Be proactive. Do not wait to be told to use tools. Do not ask "would you like me to".
SCAN (search) → SNAP (plan) → SUNDER (write) → QA (run_checks) → complete_goal.
Automation questions: call inspect_pathways, inspect_watches, and inspect_codex. Tell them GOVERN + MAP. Do not claim T4/T5.

Weather / live facts: MUST search_web or fetch_url before answering. Never invent a forecast.
Build / clone / make an app / shop / storefront: MUST set_plan with 4–8 steps and tests, then write_file the complete HTML/CSS/JS. write_file only stages a draft. Say that COMMIT writes the lab. Do not say the files are already in the IDE. Do not stop after a plan.
If the visitor gave Cash App, PayPal, or Venmo handles, put those exact handles into the storefront as links. Never invent payment credentials. This office does not move money or place live broker trades.
YouTube-style demo: this floor ships Floorcast locally (search, grid, player, related, comments). Call write_file only if they ask for something Floorcast is not. Never use YouTube trademarks.
When asked about our repos, technologies, or what we can implement from GitHub, call scan_repos first (org beyond-repair). Then map results onto THIS floor's live tools. Do not claim a sibling repo is running here. Do not merge AtomicNexusAI.
Keep replies spoken and short. No markdown headings.
You may write large files. Prefer one complete index.html + styles.css + main.js.
${PORTFOLIO}`;
function isBlockedHost(hostname) {
	const h = hostname.toLowerCase();
	if (h === "localhost" || h.endsWith(".local") || h.endsWith(".internal")) return true;
	if (h === "0.0.0.0" || h === "::1" || h === "[::1]") return true;
	if (/^127\./.test(h) || /^10\./.test(h) || /^192\.168\./.test(h) || /^169\.254\./.test(h)) return true;
	if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(h)) return true;
	return false;
}
function stripHtml(html) {
	return html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 5e3);
}
async function fetchPublic(url) {
	let parsed;
	try {
		parsed = new URL(url);
	} catch {
		return "invalid url";
	}
	if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return "blocked protocol";
	if (isBlockedHost(parsed.hostname)) return "blocked host";
	const ctrl = new AbortController();
	const t = setTimeout(() => ctrl.abort(), 9e3);
	try {
		const res = await fetch(parsed.toString(), {
			signal: ctrl.signal,
			redirect: "follow",
			headers: {
				"User-Agent": "NEXUS-Office/0.7 (research bot)",
				Accept: "application/json,text/plain,*/*"
			}
		});
		const text = await res.text();
		return `status ${res.status} ${stripHtml(text)}`;
	} catch (e) {
		return `fetch failed: ${e instanceof Error ? e.message : "error"}`;
	} finally {
		clearTimeout(t);
	}
}
function placeFromQuery(q) {
	const m = q.match(/(?:weather|forecast|temperature)\s+(?:in|for|at)\s+(.+)$/i);
	if (m) return m[1].replace(/[?.!]+$/, "").trim();
	return (q.match(/in\s+([A-Za-z][A-Za-z\s]+)$/)?.[1] ?? q).trim();
}
async function liveWeather(place) {
	const loc = place.slice(0, 80) || "Nassau";
	const wttr = await fetchPublic(`https://wttr.in/${encodeURIComponent(loc)}?format=j1`);
	const geoText = await fetchPublic(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(loc)}&count=1`);
	let extra = "";
	try {
		const r = JSON.parse(geoText.replace(/^status \d+\s/, "")).results?.[0];
		if (r) extra = await fetchPublic(`https://api.open-meteo.com/v1/forecast?latitude=${r.latitude}&longitude=${r.longitude}&current_weather=true`);
	} catch {
		extra = "";
	}
	return `wttr: ${wttr}\nopen-meteo: ${extra}`.slice(0, 7e3);
}
async function searchWeb(query) {
	const q = query.slice(0, 180);
	if (looksLikeWeather(q)) return liveWeather(placeFromQuery(q));
	const ddg = `https://api.duckduckgo.com/?q=${encodeURIComponent(q)}&format=json&no_html=1&skip_disambig=1`;
	const wiki = `https://en.wikipedia.org/w/api.php?action=opensearch&limit=3&namespace=0&format=json&origin=*&search=${encodeURIComponent(q)}`;
	const [a, b] = await Promise.all([fetchPublic(ddg), fetchPublic(wiki)]);
	return `duckduckgo: ${a}\nwikipedia: ${b}`.slice(0, 6e3);
}
async function scanRepos(query) {
	const q = `user:beyond-repair ${query}`.trim().slice(0, 180);
	const search = `https://api.github.com/search/repositories?q=${encodeURIComponent(q)}&per_page=8&sort=updated`;
	const [a, b] = await Promise.all([fetchPublic(search), fetchPublic("https://api.github.com/users/beyond-repair/repos?per_page=10&sort=updated&type=public")]);
	return `search ${q}: ${a}\nrecent org: ${b}`.slice(0, 7e3);
}
async function chatXai(messages, maxTokens) {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "AI is not available in this environment"
	};
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			messages,
			max_tokens: maxTokens,
			temperature: .4,
			tools: TOOLS,
			tool_choice: "auto"
		})
	});
	if (!res.ok) {
		const errText = await res.text().catch(() => "");
		return {
			ok: false,
			error: `xAI API error ${res.status} ${errText.slice(0, 200)}`
		};
	}
	return {
		ok: true,
		message: (await res.json()).choices[0]?.message ?? {
			role: "assistant",
			content: ""
		}
	};
}
var runNexusTurn_createServerFn_handler = createServerRpc({
	id: "3eec4faaba8d4d037ad85ff649c4a8db441893813c485d8393ec322c80176cbf",
	name: "runNexusTurn",
	filename: "src/lib/nexus/chat.ts"
}, (opts) => runNexusTurn.__executeServer(opts));
var runNexusTurn = createServerFn({ method: "POST" }).validator((input) => input).handler(runNexusTurn_createServerFn_handler, async ({ data }) => {
	const userText = data.message.trim().slice(0, 2500);
	if (!userText) return {
		ok: false,
		error: "Empty message",
		messages: [],
		events: [],
		speaker: "operator",
		plan: [],
		incomplete: false,
		checks: []
	};
	const files = { ...data.files };
	const events = [];
	const out = [];
	let speaker = "operator";
	let plan = (data.plan ?? []).map((s) => ({ ...s }));
	let complete = false;
	const checks = [];
	const shop = data.shop;
	const shopLine = shop ? `Operator shop rails (use exactly, do not invent): name=${shop.name || "(unset)"} cashApp=${shop.rails.cashApp || "(empty)"} paypal=${shop.rails.paypal || "(empty)"} venmo=${shop.rails.venmo || "(empty)"} wallet=${shop.rails.wallet || "(empty)"}.` : "No payout handles saved yet.";
	const steer = looksLikeWeather(userText) ? "This is a live-data question. Call search_web immediately. Do not guess." : looksLikeRepos(userText) ? "This is a portfolio question. Call scan_repos immediately, then map hits onto this floor. Do not invent live twins." : looksLikeFactory(userText) ? "This is a factory question. Call inspect_pathways, inspect_watches, and inspect_codex. GOVERN + MAP. Do not claim live brokers, Shopify, voice, or unsupervised AGI." : looksLikeBuild(userText) ? "This is a build. Stage the page with write_file. Tell them COMMIT writes the lab. Do not claim it is already running." : "If tools help, use them now.";
	const history = [
		{
			role: "system",
			content: SYSTEM + `\nIDE files: ${Object.keys(files).join(", ")}\n${shopLine}\n${steer}`
		},
		...data.history.slice(-10).map((m) => ({
			role: m.role === "user" ? "user" : "assistant",
			content: (m.name ? `[${m.name}] ` : "") + m.content
		})),
		{
			role: "user",
			content: userText
		}
	];
	const maxRounds = looksLikeBuild(userText) ? 8 : 5;
	const maxTokens = looksLikeBuild(userText) ? 2200 : 900;
	for (let round = 0; round < maxRounds; round++) {
		const result = await chatXai(history, maxTokens);
		if (!result.ok) return {
			ok: false,
			error: result.error,
			messages: out,
			events,
			speaker,
			files,
			plan,
			incomplete: true,
			checks
		};
		const msg = result.message;
		const calls = msg.tool_calls ?? [];
		if (calls.length === 0) {
			const text = (msg.content ?? "").trim();
			if (text) out.push({
				role: "assistant",
				name: speaker,
				content: text
			});
			if (looksLikeBuild(userText) && !complete && Object.keys(files).length > 0 && round < maxRounds - 1 && !text.toLowerCase().includes("done")) {
				history.push({
					role: "user",
					content: "Continue. Finish remaining plan steps, write files, run_checks, complete_goal. Do not wait."
				});
				continue;
			}
			break;
		}
		history.push({
			role: "assistant",
			content: msg.content ?? "",
			tool_calls: calls
		});
		for (const call of calls) {
			let args = {};
			try {
				args = JSON.parse(call.function.arguments || "{}");
			} catch {
				args = {};
			}
			let output = "ok";
			const fname = call.function.name;
			if (fname === "handoff") {
				speaker = String(args.role) || "pm";
				const reason = String(args.reason ?? "");
				output = `Now speaking as ${speaker}. ${reason}`;
				events.push({
					name: "handoff",
					actor: speaker,
					detail: reason
				});
				out.push({
					role: "assistant",
					name: "operator",
					content: `On it — walking this to ${speaker.toUpperCase()}.`
				});
				history.push({
					role: "system",
					content: `You are now ${speaker}. Keep using tools until the goal is done.`
				});
			} else if (fname === "search_web") {
				const q = String(args.query ?? userText);
				events.push({
					name: "search_web",
					actor: speaker,
					detail: q
				});
				output = await searchWeb(q);
			} else if (fname === "scan_repos") {
				const q = String(args.query ?? userText);
				events.push({
					name: "scan_repos",
					actor: speaker,
					detail: q
				});
				output = await scanRepos(q);
			} else if (fname === "inspect_pathways") {
				events.push({
					name: "inspect_pathways",
					actor: "qa",
					detail: "catalog"
				});
				output = inspectPathways();
			} else if (fname === "inspect_watches") {
				events.push({
					name: "inspect_watches",
					actor: "qa",
					detail: "watches"
				});
				output = inspectWatches(data.shop?.watches, data.shop?.rules);
			} else if (fname === "inspect_codex") {
				events.push({
					name: "inspect_codex",
					actor: "qa",
					detail: "codex"
				});
				output = inspectCatalog();
			} else if (fname === "fetch_url") {
				const url = String(args.url ?? "");
				events.push({
					name: "fetch_url",
					actor: speaker,
					detail: url
				});
				output = await fetchPublic(url);
			} else if (fname === "write_file") {
				const path = String(args.path || "untitled.txt").replace(/\.\./g, "").replace(/^\/+/, "");
				const content = String(args.content ?? "").slice(0, 8e4);
				files[path] = content;
				speaker = speaker === "operator" ? "engineer" : speaker;
				events.push({
					name: "write_file",
					actor: "engineer",
					detail: path
				});
				output = `wrote ${path} (${content.length} chars)`;
			} else if (fname === "set_plan") {
				speaker = "pm";
				plan = (Array.isArray(args.steps) ? args.steps : []).slice(0, 12).map((s, i) => {
					const row = s;
					return {
						id: `s${i + 1}`,
						title: String(row.title ?? `step ${i + 1}`),
						owner: String(row.owner ?? "engineer"),
						done: false,
						test: String(row.test ?? "exists")
					};
				});
				events.push({
					name: "set_plan",
					actor: "pm",
					detail: String(args.goal ?? "")
				});
				out.push({
					role: "assistant",
					name: "pm",
					content: `Plan locked (${plan.length} steps). Floor is executing — not waiting.`
				});
				output = JSON.stringify(plan);
			} else if (fname === "mark_step") {
				const idx = Number(args.index) || 0;
				if (plan[idx]) plan[idx] = {
					...plan[idx],
					done: true
				};
				events.push({
					name: "mark_step",
					actor: speaker,
					detail: String(idx)
				});
				output = `step ${idx} done. remaining ${plan.filter((s) => !s.done).length}`;
			} else if (fname === "run_checks") {
				speaker = "qa";
				const needles = Array.isArray(args.must_include) ? args.must_include.map(String) : [];
				const blob = Object.values(files).join("\n");
				const results = needles.map((n) => blob.includes(n) ? `PASS ${n}` : `FAIL ${n}`);
				checks.push(...results);
				events.push({
					name: "run_checks",
					actor: "qa",
					detail: results.join("; ")
				});
				output = results.join("\n") || "no checks";
			} else if (fname === "complete_goal") {
				complete = true;
				events.push({
					name: "complete_goal",
					actor: speaker,
					detail: String(args.summary ?? "")
				});
				out.push({
					role: "assistant",
					name: speaker,
					content: String(args.summary ?? "Goal complete.")
				});
				output = "goal marked complete";
			} else output = `unknown tool ${fname}`;
			history.push({
				role: "tool",
				tool_call_id: call.id,
				content: output.slice(0, 8e3)
			});
		}
		if (complete) break;
	}
	if (out.length === 0) out.push({
		role: "assistant",
		name: "operator",
		content: "Working the floor. Ask again if nothing landed."
	});
	const incomplete = looksLikeBuild(userText) && !complete && plan.some((s) => !s.done);
	return {
		ok: true,
		messages: out,
		files,
		events,
		speaker,
		plan,
		incomplete,
		checks
	};
});
var DESK_SYSTEM = `You are the desk at ADL NEXUS. Do the task in the message. Reply with the result only.
No tour of the office. No THINK, AUTH, or COMMIT unless the text asks about them.
Plain sentences. Use a code block only when they asked for code.
Do not invent prices, weather, account balances, or news. If the task needs a live fact, say this desk cannot see it.`;
var askDesk_createServerFn_handler = createServerRpc({
	id: "2f858d9209938de30a39695ff913da30f05335baa0dc74055c88467fe7419c67",
	name: "askDesk",
	filename: "src/lib/nexus/chat.ts"
}, (opts) => askDesk.__executeServer(opts));
var askDesk = createServerFn({ method: "POST" }).validator((input) => ({ message: String(input?.message ?? "").trim().slice(0, 6e3) })).handler(askDesk_createServerFn_handler, async ({ data }) => {
	if (!data.message) return {
		ok: false,
		error: "Empty message",
		text: ""
	};
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "The model is not connected in this environment.",
		text: ""
	};
	const ctrl = new AbortController();
	const timer = setTimeout(() => ctrl.abort(), 18e3);
	try {
		const res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			signal: ctrl.signal,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-4.5",
				temperature: .3,
				max_tokens: 700,
				messages: [{
					role: "system",
					content: DESK_SYSTEM
				}, {
					role: "user",
					content: data.message
				}]
			})
		});
		if (!res.ok) {
			if (res.status === 402 || res.status === 403) return {
				ok: false,
				error: "The model has no credits here. Base64, hash, JSON, JWT, and math still run on this desk.",
				text: ""
			};
			return {
				ok: false,
				error: `The model refused (${res.status}).`,
				text: ""
			};
		}
		const text = ((await res.json()).choices?.[0]?.message?.content ?? "").trim();
		if (!text) return {
			ok: false,
			error: "The model returned nothing.",
			text: ""
		};
		return {
			ok: true,
			text
		};
	} catch (e) {
		return {
			ok: false,
			error: e instanceof Error && e.name === "AbortError" ? "The desk did not answer in time." : "The model could not be reached.",
			text: ""
		};
	} finally {
		clearTimeout(timer);
	}
});
var askImage_createServerFn_handler = createServerRpc({
	id: "cbb659c6fa0f870cd7adb4db7d3ce7eddf7e0cf258e5b21a63248e80cfe2804a",
	name: "askImage",
	filename: "src/lib/nexus/chat.ts"
}, (opts) => askImage.__executeServer(opts));
var askImage = createServerFn({ method: "POST" }).validator((input) => ({ message: String(input?.message ?? "").trim().slice(0, 500) })).handler(askImage_createServerFn_handler, async ({ data }) => {
	const prompt = data.message.replace(/^(?:draw this:|image:|draw)\s*/i, "").trim();
	if (!prompt) return {
		ok: false,
		error: "Say what to draw.",
		image: ""
	};
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "The picture model is not connected.",
		image: ""
	};
	const ctrl = new AbortController();
	const timer = setTimeout(() => ctrl.abort(), 28e3);
	try {
		const res = await fetch("https://api.x.ai/v1/images/generations", {
			method: "POST",
			signal: ctrl.signal,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-imagine-image",
				prompt,
				n: 1,
				response_format: "b64_json"
			})
		});
		if (!res.ok) {
			if (res.status === 402 || res.status === 403) return {
				ok: false,
				error: "The picture model has no credits here.",
				image: ""
			};
			return {
				ok: false,
				error: `The picture was refused (${res.status}).`,
				image: ""
			};
		}
		const item = (await res.json()).data?.[0];
		const b64 = item?.b64_json ?? "";
		if (!b64) return {
			ok: false,
			error: "The picture model returned nothing.",
			image: ""
		};
		if (b64.length > 28e4) return {
			ok: false,
			error: "That picture was too large to keep on the counter.",
			image: ""
		};
		return {
			ok: true,
			image: `data:${item?.mime_type && /^image\/[a-z0-9.+-]+$/i.test(item.mime_type) ? item.mime_type : "image/jpeg"};base64,${b64}`,
			text: "Picture made. It stays on this counter until you clear the talk."
		};
	} catch (e) {
		return {
			ok: false,
			error: e instanceof Error && e.name === "AbortError" ? "The picture took too long." : "The picture did not come back.",
			image: ""
		};
	} finally {
		clearTimeout(timer);
	}
});
var askVideo_createServerFn_handler = createServerRpc({
	id: "94b4c4dd9bd7d8a603818f929f8469053b4fbd51e866dc685f0af6e862d414e6",
	name: "askVideo",
	filename: "src/lib/nexus/chat.ts"
}, (opts) => askVideo.__executeServer(opts));
var askVideo = createServerFn({ method: "POST" }).validator((input) => ({ message: String(input?.message ?? "").trim().slice(0, 500) })).handler(askVideo_createServerFn_handler, async ({ data }) => {
	const prompt = data.message.replace(/^clip this:\s*/i, "").trim();
	if (!prompt) return {
		ok: false,
		error: "Say what the clip should show."
	};
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "The video model is not connected."
	};
	const ctrl = new AbortController();
	const timer = setTimeout(() => ctrl.abort(), 85e3);
	try {
		const started = await fetch("https://api.x.ai/v1/videos/generations", {
			method: "POST",
			signal: ctrl.signal,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-imagine-video-1.5-lite",
				prompt,
				duration: 4,
				aspect_ratio: "16:9",
				resolution: "480p"
			})
		});
		if (!started.ok) {
			if (started.status === 402 || started.status === 403) return {
				ok: false,
				error: "The video model has no credits here."
			};
			return {
				ok: false,
				error: `The clip was refused (${started.status}).`
			};
		}
		const first = await started.json();
		if (first.video?.url) return {
			ok: true,
			video: first.video.url,
			text: "Clip made. The link expires. It is not saved in the carry file."
		};
		const id = first.request_id;
		if (!id) return {
			ok: false,
			error: "The video model did not start a clip."
		};
		const deadline = Date.now() + 75e3;
		while (Date.now() < deadline) {
			await new Promise((resolve) => setTimeout(resolve, 2500));
			const polled = await fetch(`https://api.x.ai/v1/videos/${id}`, {
				signal: ctrl.signal,
				headers: { Authorization: `Bearer ${apiKey}` }
			});
			if (!polled.ok) continue;
			const json = await polled.json();
			if (json.status === "failed") return {
				ok: false,
				error: "The clip failed."
			};
			if (json.status === "done" && json.video?.url) return {
				ok: true,
				video: json.video.url,
				text: "Clip made. The link expires. It is not saved in the carry file."
			};
		}
		return {
			ok: false,
			error: "The clip is still rendering. Try a shorter one."
		};
	} catch (e) {
		return {
			ok: false,
			error: e instanceof Error && e.name === "AbortError" ? "The clip took too long." : "The clip did not come back."
		};
	} finally {
		clearTimeout(timer);
	}
});
//#endregion
export { askDesk_createServerFn_handler, askImage_createServerFn_handler, askVideo_createServerFn_handler, runNexusTurn_createServerFn_handler };
