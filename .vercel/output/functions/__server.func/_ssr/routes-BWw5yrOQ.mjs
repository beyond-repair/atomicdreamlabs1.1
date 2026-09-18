import { i as __toESM } from "../_runtime.mjs";
import { R as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { $ as paypalHref, A as hydrateCabinets, B as looksLikeArcade, C as executeAuthorized, D as heroName, E as hashFiles, F as inspectCatalog, H as looksLikeCodex, J as matchDemo, K as looksLikeSunder, M as hydrateSesa, N as hydrateWatches, O as heroSprite, P as inboundHint, Q as parseTrade, R as liveCount, S as evaluateWatches, T as fetchSpot, W as looksLikeHorizon, X as matchRoadmap, Y as matchPathway, Z as parseRestock, _ as applySunder, a as CREW_DESK, at as renderSunder, b as cashAppHref, c as FEATS, ct as setPair, d as PATHWAYS, dt as venmoHref, et as plantStats, f as PATHWAY_GROUPS, ft as watchCopy, g as WATCH_DEFS, h as ROLES, i as CREW_CLASS, it as renderScan, j as hydrateRules, k as hydrateBiz, l as FLOOR_LINE, lt as sha256Hex, n as COMPANY, nt as rememberSymbol, o as CREW_FILTER, ot as runLabTests, p as PIPE, pt as workBeats, r as CREW, rt as renderBoard, s as DEFAULT_BIZ, st as scanLab, t as CODEX, tt as previewBind, u as LOOP, ut as shopFiles, v as beatLabel, w as featTitle, x as crewForPathway, y as bookPositions, z as loadFrame } from "./codex-BS3DrQtl.mjs";
import { t as X } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Chess } from "../_libs/chess.js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BWw5yrOQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var GRAPH_NODES = [
	{
		id: "obj-os",
		kind: "objective",
		label: "Sovereign Work OS",
		x: 400,
		y: 40,
		detail: "Long-horizon mission: persistent executive intelligence."
	},
	{
		id: "obj-launch",
		kind: "objective",
		label: "Launch NEXUS 1.0",
		x: 220,
		y: 120,
		detail: "Closed loop: identity → memory → reality → workforce → proof."
	},
	{
		id: "proj-alpha",
		kind: "project",
		label: "Project Alpha",
		x: 400,
		y: 150,
		detail: "ADL NEXUS command + floor. Local-first runtime."
	},
	{
		id: "dec-horizon",
		kind: "decision",
		label: "Decision · Horizon",
		x: 580,
		y: 120,
		detail: "Ship advise/authorize/commit before any silent execute."
	},
	{
		id: "dec-floor",
		kind: "decision",
		label: "Decision · Floor first",
		x: 700,
		y: 210,
		detail: "Pixel office as workforce surface; command as executive layer."
	},
	{
		id: "repo-nexus",
		kind: "repo",
		label: "Code Repo · Nexus",
		x: 250,
		y: 250,
		detail: "Active runtime. Not AtomicNexusAI."
	},
	{
		id: "doc-doctrine",
		kind: "document",
		label: "Doctrine",
		x: 120,
		y: 180,
		detail: "AI advises. Human or policy authorizes. Fail closed."
	},
	{
		id: "res-ware",
		kind: "research",
		label: "Research · Ware",
		x: 80,
		y: 300,
		detail: "W ≈ 0.08 phenomenology. Paper, not this runtime."
	},
	{
		id: "task-graph",
		kind: "task",
		label: "Task · Memory graph",
		x: 480,
		y: 280,
		detail: "Institutional memory: decisions, repos, objectives."
	},
	{
		id: "task-qa",
		kind: "task",
		label: "Task · QA gates",
		x: 620,
		y: 320,
		detail: "run_checks before complete_goal."
	},
	{
		id: "proj-clean",
		kind: "project",
		label: "Clean-Room / Aegis",
		x: 360,
		y: 360,
		detail: "Isolation and claim-cap. Absorbed as governance, not a twin."
	}
];
var GRAPH_EDGES = [
	{
		from: "obj-os",
		to: "obj-launch",
		rel: "decomposes"
	},
	{
		from: "obj-os",
		to: "proj-alpha",
		rel: "owns"
	},
	{
		from: "obj-launch",
		to: "dec-horizon",
		rel: "constrained by"
	},
	{
		from: "proj-alpha",
		to: "dec-horizon",
		rel: "decided"
	},
	{
		from: "proj-alpha",
		to: "repo-nexus",
		rel: "implements"
	},
	{
		from: "dec-horizon",
		to: "dec-floor",
		rel: "follows"
	},
	{
		from: "doc-doctrine",
		to: "dec-horizon",
		rel: "governs"
	},
	{
		from: "doc-doctrine",
		to: "obj-os",
		rel: "defines"
	},
	{
		from: "res-ware",
		to: "doc-doctrine",
		rel: "cited"
	},
	{
		from: "repo-nexus",
		to: "task-graph",
		rel: "tracks"
	},
	{
		from: "dec-horizon",
		to: "task-qa",
		rel: "requires"
	},
	{
		from: "proj-alpha",
		to: "proj-clean",
		rel: "absorbs"
	},
	{
		from: "task-graph",
		to: "proj-alpha",
		rel: "feeds"
	}
];
var OBJECTIVES = [{
	id: "obj-os",
	title: "Sovereign Work OS",
	progress: 62,
	risk: "watch",
	children: [
		{
			id: "c1",
			title: "Identity & mission core",
			done: true
		},
		{
			id: "c2",
			title: "Persistent memory graph",
			done: true
		},
		{
			id: "c3",
			title: "Workforce orchestration",
			done: true
		},
		{
			id: "c4",
			title: "Execution via lab IDE",
			done: true
		},
		{
			id: "c5",
			title: "Governance before commit",
			done: true
		},
		{
			id: "c6",
			title: "Reality State engine",
			done: true
		},
		{
			id: "c7",
			title: "Factory pathways + hashed ledger",
			done: true
		},
		{
			id: "c8",
			title: "Continuous improvement loop",
			done: false
		}
	]
}, {
	id: "obj-launch",
	title: "Launch NEXUS 1.0",
	progress: 48,
	risk: "low",
	children: [
		{
			id: "l1",
			title: "Command interface",
			done: true
		},
		{
			id: "l2",
			title: "Pixel workforce floor",
			done: true
		},
		{
			id: "l3",
			title: "Advise → authorize → commit",
			done: true
		},
		{
			id: "l4",
			title: "Live weather / web tools",
			done: true
		},
		{
			id: "l5",
			title: "Paper factory (trade / ops / lab / audit)",
			done: true
		}
	]
}];
var WORKERS = [
	{
		id: "w-res",
		name: "Researcher-1",
		role: "cpo",
		title: "Research Analyst",
		status: "active",
		assignment: "Link Ware notes to doctrine, not runtime",
		tokens: 12400,
		load: 41
	},
	{
		id: "w-eng",
		name: "Engineer-2",
		role: "engineer",
		title: "Software Engineer",
		status: "active",
		assignment: "Lab IDE — index.html / styles / main",
		tokens: 38200,
		load: 73
	},
	{
		id: "w-gov",
		name: "Governance-3",
		role: "ceo",
		title: "Governance Officer",
		status: "idle",
		assignment: "Awaiting authorize on next proposal",
		tokens: 2100,
		load: 8
	},
	{
		id: "w-arch",
		name: "Architect-1",
		role: "cto",
		title: "Systems Architect",
		status: "idle",
		assignment: "Spine: Nexus, clean-room, Aegis",
		tokens: 6800,
		load: 22
	},
	{
		id: "w-qa",
		name: "Tester-1",
		role: "qa",
		title: "Testing Agent",
		status: "blocked",
		assignment: "run_checks after next write_file",
		tokens: 4400,
		load: 15
	},
	{
		id: "w-ops",
		name: "Ops-1",
		role: "operator",
		title: "Operations Coordinator",
		status: "active",
		assignment: "Reception + activity feed",
		tokens: 9900,
		load: 36
	},
	{
		id: "w-pm",
		name: "PM-1",
		role: "pm",
		title: "Product Manager",
		status: "idle",
		assignment: "Horizon plan owners",
		tokens: 3300,
		load: 11
	}
];
var FEED = [
	{
		id: "f1",
		source: "github",
		title: "PR merged · lab preview shell",
		ts: Date.now() - 108e4,
		nodeId: "repo-nexus"
	},
	{
		id: "f2",
		source: "system",
		title: "Reality State constructed · operational",
		ts: Date.now() - 252e4,
		nodeId: "dec-horizon"
	},
	{
		id: "f3",
		source: "calendar",
		title: "Milestone · NEXUS 1.0 closed loop",
		ts: Date.now() - 54e5,
		nodeId: "obj-launch"
	},
	{
		id: "f4",
		source: "notion",
		title: "Doctrine page updated · fail closed",
		ts: Date.now() - 84e5,
		nodeId: "doc-doctrine"
	},
	{
		id: "f5",
		source: "slack",
		title: "Ops: visitor on the floor",
		ts: Date.now() - 48e4,
		nodeId: "proj-alpha"
	},
	{
		id: "f6",
		source: "mail",
		title: "Evidence pack queued for authorize",
		ts: Date.now() - 36e4,
		nodeId: "dec-horizon"
	}
];
var INTEGRATIONS = [
	{
		id: "github",
		label: "GitHub",
		state: "live"
	},
	{
		id: "web",
		label: "Browser",
		state: "live"
	},
	{
		id: "spot",
		label: "Spot mark",
		state: "live"
	},
	{
		id: "factory",
		label: "Factory",
		state: "local"
	},
	{
		id: "ledger",
		label: "Ledger",
		state: "local"
	},
	{
		id: "shop",
		label: "Shop",
		state: "local"
	},
	{
		id: "broker",
		label: "Broker",
		state: "idle"
	}
];
var DECISIONS = {
	"dec-horizon": {
		id: "dec-horizon",
		title: "Horizon protocol",
		problem: "Agents were able to act as if execute were free. That violates sovereignty.",
		options: [
			"Silent auto-commit after a plan",
			"Advise only, never execute",
			"THINK → AUTHORIZE → COMMIT with fail-closed refuse"
		],
		plan: "Construct a Reality State, require operator authorize, then assign a supervised workforce task. Refuse if unauthorized.",
		research: "Digital Double queue pattern. RealityOS scenario types. ADL-Governance claim-cap.",
		evidence: [
			"executeRequiresAuthorize = true",
			"No live twin, no live adapters",
			"Provenance written on think / authorize / commit / refuse"
		],
		confidence: .48,
		approver: "Operator (you)",
		actions: [
			"think()",
			"authorize()",
			"commit() assigns Engineer or PM"
		],
		outcomes: ["Unauthorized commit is refused and logged", "Authorized commit opens the provenance cabinet"],
		workflow: [
			{
				agent: "Ops-1",
				output: "Intake objective",
				status: "complete"
			},
			{
				agent: "Researcher-1",
				output: "Reality State + risk",
				status: "complete"
			},
			{
				agent: "Governance-3",
				output: "Await human authorize",
				status: "active"
			},
			{
				agent: "Engineer-2",
				output: "Blocked until commit",
				status: "idle"
			}
		]
	},
	"dec-floor": {
		id: "dec-floor",
		title: "Floor first, then command",
		problem: "An OS with no body is a dashboard. A floor with no command is a toy.",
		options: [
			"Dashboard only",
			"Pixel office only",
			"Command as executive layer, floor as workforce"
		],
		plan: "Ship the ChatDev floor as the living office; command as the panoramic intelligence view. Switch, don't merge.",
		research: "ChatDev virtual office. LegionOS holarchy. Gia decompose-and-act.",
		evidence: ["Floor hotspots map to tools", "Command graph maps to the same loop"],
		confidence: .55,
		approver: "Operator (you)",
		actions: ["FLOOR view", "COMMAND view"],
		outcomes: ["Crew still walks and talks", "Decision nodes open this panel"],
		workflow: [
			{
				agent: "PM-1",
				output: "Scope both surfaces",
				status: "complete"
			},
			{
				agent: "Engineer-2",
				output: "Wire view switch",
				status: "complete"
			},
			{
				agent: "Tester-1",
				output: "A/D games + graph click",
				status: "active"
			}
		]
	}
};
var KIND_COLOR = {
	objective: "#6a96c4",
	project: "#4aa3a0",
	decision: "#c4a15a",
	repo: "#8aa0b8",
	research: "#7a9e8a",
	document: "#9aa7b5",
	task: "#6d8f9e"
};
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var runNexusTurn = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("3eec4faaba8d4d037ad85ff649c4a8db441893813c485d8393ec322c80176cbf"));
function uid(n = 10) {
	return Math.random().toString(16).slice(2, 2 + n);
}
function classifyScenario(goal) {
	const t = goal.toLowerCase();
	if (/\b(hypothes|research|experiment|falsif|physics|ware)\b/.test(t)) return "research";
	if (/\b(secur|sandbox|clean.?room|aegis|auth|gate|threat|halt|audit)\b/.test(t)) return "security";
	if (/\b(budget|gold|capital|spend|liquid|cost|pay|cash.?app|paypal|trade|btc|eth|restock|inventory)\b/.test(t)) return "resource";
	if (/\b(org|team|staff|role|workforce|hire|holarch)\b/.test(t)) return "organizational";
	if (/\b(code|repo|build|prototype|api|refactor|ship|deploy|bug|shop|lab)\b/.test(t)) return "technical";
	return "operational";
}
var PATH_BY_TYPE = {
	operational: [
		"inspect",
		"plan",
		"simulate",
		"assign"
	],
	technical: [
		"inspect",
		"plan",
		"simulate",
		"assign"
	],
	organizational: [
		"inspect",
		"propose",
		"simulate"
	],
	resource: [
		"inspect",
		"simulate",
		"propose"
	],
	security: [
		"inspect",
		"simulate",
		"propose"
	],
	research: [
		"inspect",
		"propose",
		"simulate",
		"assign"
	]
};
function buildReality(goal, context = {}) {
	const scenarioType = classifyScenario(goal);
	const known = Object.keys(context);
	const unknownVariables = [
		"market",
		"competitors",
		"capital",
		"live_org",
		"latency",
		"headcount"
	].filter((k) => !(k in context));
	const possibleActions = PATH_BY_TYPE[scenarioType];
	const confidence = scenarioType === "research" ? .38 : scenarioType === "security" ? .42 : .48;
	const simulatedOutcomes = possibleActions.map((action) => ({
		action,
		confidence: action === "simulate" ? confidence - .08 : confidence + .06,
		cost: "unmeasured",
		note: action === "assign" ? "Supervised board only — no autonomy" : action === "simulate" ? "Local deterministic sketch, not a live twin" : "Local inspection of declared state"
	}));
	return {
		claim: "local Reality State — RealityOS scenario types only; not a live digital twin",
		scenarioType,
		currentState: {
			goal: goal.trim(),
			contextKeys: known.sort()
		},
		knownFacts: known.length ? known : ["operator_present", "build_cycle=alpha"],
		unknownVariables,
		availableResources: {
			roles: [
				"ceo",
				"cpo",
				"cto",
				"qa",
				"operator",
				"engineer",
				"pm"
			],
			pathways: [
				matchPathway(goal).id,
				"reality",
				"workforce",
				"runtime",
				"governance",
				"provenance"
			]
		},
		constraints: {
			executeRequiresAuthorize: true,
			liveTwin: false,
			liveAdapters: false
		},
		possibleActions,
		simulatedOutcomes,
		riskCostConfidence: {
			risk: "unvalidated alternatives",
			cost: "unmeasured",
			confidence
		},
		recommendedPath: possibleActions,
		whatIf: `What happens if we pursue “${goal.trim()}” under ${scenarioType} constraints?`
	};
}
function think(goal, context = {}) {
	const reality = buildReality(goal, context);
	const path = matchPathway(goal);
	const id = uid(12);
	const proposal = {
		id,
		goal: goal.trim(),
		status: "proposed",
		authorized: false,
		executed: false,
		why: "reality constructed before action",
		evidence: {
			realityClaim: reality.claim,
			confidence: reality.riskCostConfidence.confidence
		},
		simulatedConsequences: reality.simulatedOutcomes,
		risk: reality.riskCostConfidence,
		requiredAuthority: "operator authorize",
		recommendedPath: reality.recommendedPath,
		workforceHint: path.owner,
		pathway: path.id,
		pathwayTitle: path.title
	};
	return {
		reality,
		proposal,
		provenance: {
			id: uid(12),
			kind: "think",
			ts: Date.now(),
			proposalId: id,
			payload: {
				goal: proposal.goal,
				scenarioType: reality.scenarioType,
				pathway: path.id
			}
		}
	};
}
function authorize(proposal, actor = "operator") {
	if (proposal.status === "committed") return { error: "already committed" };
	return {
		proposal: {
			...proposal,
			authorized: true,
			status: "authorized",
			actor
		},
		provenance: {
			id: uid(12),
			kind: "authorize",
			ts: Date.now(),
			proposalId: proposal.id,
			payload: { actor }
		}
	};
}
function commit(proposal) {
	if (!proposal.authorized) return {
		error: "unauthorized — AI advises, it cannot execute",
		provenance: {
			id: uid(12),
			kind: "refuse",
			ts: Date.now(),
			proposalId: proposal.id,
			payload: { reason: "missing authorize" }
		}
	};
	const task = {
		id: uid(10),
		role: proposal.workforceHint,
		goal: proposal.goal,
		status: "pending",
		note: "from objective.commit"
	};
	return {
		proposal: {
			...proposal,
			executed: true,
			status: "committed",
			assignment: {
				ok: true,
				role: task.role,
				taskId: task.id
			}
		},
		task,
		provenance: {
			id: uid(12),
			kind: "commit",
			ts: Date.now(),
			proposalId: proposal.id,
			payload: {
				taskId: task.id,
				role: task.role,
				pathway: proposal.pathway ?? "assign"
			}
		}
	};
}
/** Furniture → the dock room that makes the tap make sense. */
var OBJECT_TAB = {
	sim: "govern",
	ide: "lab",
	files: "govern",
	coffee: "chat",
	plant: "chat"
};
var OBJECT_HINT = {
	clock: "Wall clock. World time and a stopwatch.",
	library: "Shelf is live. Open a book, or ask the net from here.",
	arcade: "Arcade hall. RIX forges cabinets. Tap a machine. SHIP needs AUTH.",
	weather: "Window looks outside. Live weather — no waiting on chat.",
	files: "Security center. Last hash, lab checks, halt. Repair is LAB. You still hold COMMIT.",
	plan: "Horizon board. THINK / AUTH / COMMIT plus the live map. T4–T5 are capped.",
	ide: "Engineer's monitor. Edit, TEST, RUN. This office, not a cloud IDE.",
	sim: "Plant board. LOW AT / BUY. Short inbound parks a HOLD. AUTO AUTH. COMMIT needs a signed rule or you.",
	biz: "Shop desk. Your Cash App / PayPal / Venmo. We don't take money.",
	coffee: "Sip taken. Gold +1. Break authorized.",
	plant: "Fern is fine. The plant board is the center table — STOCK, rules, HOLD.",
	lamp: "Lights: on, night, ops phosphor.",
	phone: "Shop rails. Drop a handle, then publish into the lab."
};
var SKY = {
	0: "Clear",
	1: "Mainly clear",
	2: "Partly cloudy",
	3: "Overcast",
	45: "Fog",
	48: "Rime fog",
	51: "Light drizzle",
	61: "Rain",
	63: "Rain",
	65: "Heavy rain",
	71: "Snow",
	80: "Showers",
	95: "Thunder"
};
function skyLabel(code) {
	if (SKY[code]) return SKY[code];
	if (code >= 51 && code < 68) return "Rain";
	if (code >= 71 && code < 78) return "Snow";
	if (code >= 80 && code < 83) return "Showers";
	if (code >= 95) return "Thunder";
	return "Sky " + code;
}
async function fetchWeather(place) {
	const q = place.trim() || "Nassau";
	const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=1`);
	if (!geoRes.ok) throw new Error("Geocoding failed");
	const hit = (await geoRes.json()).results?.[0];
	if (!hit) throw new Error(`No place named ${q}`);
	const wxRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${hit.latitude}&longitude=${hit.longitude}&current=temperature_2m,weather_code,wind_speed_10m`);
	if (!wxRes.ok) throw new Error("Forecast failed");
	const cur = (await wxRes.json()).current;
	if (!cur) throw new Error("No current weather");
	return {
		place: hit.name,
		country: hit.country,
		temp: cur.temperature_2m,
		wind: cur.wind_speed_10m,
		code: cur.weather_code,
		label: skyLabel(cur.weather_code),
		time: cur.time
	};
}
var WORLD_CLOCKS = [
	{
		id: "nassau",
		label: "Nassau",
		tz: "America/Nassau"
	},
	{
		id: "utc",
		label: "UTC",
		tz: "UTC"
	},
	{
		id: "tokyo",
		label: "Tokyo",
		tz: "Asia/Tokyo"
	},
	{
		id: "london",
		label: "London",
		tz: "Europe/London"
	}
];
var STAGER_ROLE = {
	nyx: "qa",
	rix: "engineer",
	vex: "cpo",
	hal: "pm",
	molt: "operator"
};
var STAGER_NAME = {
	nyx: "NYX",
	rix: "RIX",
	vex: "VEX",
	hal: "HAL",
	molt: "MOLT"
};
var STAGER_TINT = {
	nyx: "gold",
	rix: "teal",
	vex: "cream",
	hal: "green",
	molt: "cream"
};
var STAGER_HEX = {
	nyx: "#C5C0B4",
	rix: "#5D8F76",
	vex: "#E6E1D6",
	hal: "#6B9A6E",
	molt: "#8A8580"
};
var STAGER_JOB = {
	nyx: {
		origin: "exchange",
		reason: "Ledger drift / plant rule.",
		hint: (sku, qty) => `restock ${qty} units ${sku}`
	},
	rix: {
		origin: "arcade",
		reason: "LAB tests ready. Sandbox cabinet.",
		hint: () => "ship arcade cabinet"
	},
	vex: {
		origin: "exchange",
		reason: "Paper desk signal.",
		hint: (_sku, _qty) => "scan market BTC"
	},
	hal: {
		origin: "office",
		reason: "Routine cleanup. Oldest hold first.",
		hint: () => "drain held orders"
	},
	molt: {
		origin: "office",
		reason: "Gate packet.",
		hint: () => "assign the objective"
	}
};
var ORIGIN_HALL = {
	exchange: "DESK",
	arcade: "PLAY",
	compute: "LAB",
	office: "FLOOR"
};
var PATH_HALL = {
	arcade_ship: "PLAY",
	restock: "DESK",
	paper_trade: "DESK",
	mean_reversion: "DESK",
	risk_halt: "DESK",
	drain_holds: "DESK",
	shop_publish: "DESK",
	lab_qa: "LAB",
	lab_build: "LAB",
	sesa_cycle: "CORE",
	sesa_revert: "CORE"
};
var DEFAULT_POLICIES = [
	{
		id: "restock-cache",
		title: "Cached restock ≤ 10",
		pathway: "restock",
		signed: false,
		cap: { restockQty: 10 }
	},
	{
		id: "drain-hold",
		title: "Drain a hold",
		pathway: "drain_holds",
		signed: false
	},
	{
		id: "lab-qa",
		title: "Lab TEST",
		pathway: "lab_qa",
		signed: false
	}
];
var NEVER_AUTO = /* @__PURE__ */ new Set([
	"arcade_ship",
	"paper_trade",
	"mean_reversion",
	"risk_halt",
	"shop_publish",
	"lab_build",
	"sesa_cycle",
	"sesa_revert"
]);
function hydratePolicies(raw) {
	const have = new Map((raw ?? []).map((p) => [p.id, p]));
	return DEFAULT_POLICIES.map((d) => {
		const row = have.get(d.id);
		return row ? {
			...d,
			signed: !!row.signed,
			cap: {
				...d.cap,
				...row.cap
			}
		} : { ...d };
	});
}
function hydrateQueue(raw) {
	if (!Array.isArray(raw)) return [];
	return raw.filter((p) => p && p.proposal && !p.proposal.executed).slice(0, 8).map((p) => ({
		...p,
		autoAuth: p.autoAuth !== false,
		requiresCommit: true,
		payload: p.payload && typeof p.payload === "object" ? p.payload : { goal: p.goal }
	}));
}
function stagerSignature(stager, pathway) {
	if (stager === "rix" && pathway === "arcade_ship") return "AUTH_RIX_SANDBOX";
	return `AUTH_${STAGER_NAME[stager]}_DRAFT`;
}
function stagePayload(goal, pathway, ctx = {}) {
	if (pathway === "restock") {
		const r = parseRestock(goal);
		return {
			resource: r.sku || ctx.sku || "offer-1",
			amount: r.qty,
			trigger_reason: "INVENTORY_BELOW_THRESHOLD",
			current_stock: ctx.stock ?? 0
		};
	}
	if (pathway === "arcade_ship") return {
		cabinet_id: ctx.cabinetId ?? "pending",
		sandbox: true,
		pass_rate: 1,
		test_suite: "lab_qa"
	};
	if (pathway === "drain_holds") return {
		action: "DRAIN_HOLDS",
		oldest_first: true
	};
	if (pathway === "paper_trade" || pathway === "mean_reversion" || pathway === "market_scan") return {
		desk: "paper",
		goal
	};
	return { goal };
}
function alreadyQueued(queue, stager, pathway) {
	return queue.some((p) => p.stager === stager && p.pathway === pathway && !p.proposal.executed);
}
function matchPolicy(goal, pathway, policies) {
	if (NEVER_AUTO.has(pathway)) return null;
	for (const p of policies) {
		if (!p.signed || p.pathway !== pathway) continue;
		if (pathway === "restock") {
			if (parseRestock(goal).qty <= (p.cap?.restockQty ?? 0)) return p;
			continue;
		}
		if (pathway === "paper_trade") {
			if (parseTrade(goal).qty <= (p.cap?.tradeQty ?? 0)) return p;
			continue;
		}
		return p;
	}
	return null;
}
function canAutoCommit(goal, pathway, policies, autoOps) {
	return !!autoOps && !!matchPolicy(goal, pathway, policies);
}
function draftStage(goal, stager, reason, origin, policies, ctx = {}) {
	const { proposal, provenance } = think(goal, {
		path: "stage",
		stager
	});
	const pathway = proposal.pathway ?? "assign";
	const auth = authorize(proposal, stagerSignature(stager, pathway));
	if ("error" in auth) return { error: auth.error };
	const policy = matchPolicy(goal, pathway, policies);
	const payload = stagePayload(goal, pathway, ctx);
	return {
		packet: {
			id: `stg-${proposal.id}`,
			ts: Date.now(),
			stager,
			origin,
			goal: proposal.goal,
			pathway,
			title: proposal.pathwayTitle ?? "Pathway",
			reason,
			proposal: auth.proposal,
			payload,
			policyId: policy?.id ?? null,
			hash: "",
			autoAuth: true,
			requiresCommit: true
		},
		thinkLog: provenance,
		authLog: auth.provenance
	};
}
function stagerClass(id) {
	return `stage-${id}`;
}
function waitingCrew(queue) {
	const seen = /* @__PURE__ */ new Set();
	const first = [];
	for (const p of queue) {
		if (p.proposal.executed || seen.has(p.stager)) continue;
		seen.add(p.stager);
		first.push(p);
	}
	return first;
}
function asGovernEvent(packet) {
	const executed = !!packet.proposal.executed;
	const authorized = !!packet.proposal.authorized;
	return {
		event_id: packet.id,
		timestamp: new Date(packet.ts).toISOString(),
		stager: {
			agent_id: STAGER_NAME[packet.stager],
			tint: STAGER_TINT[packet.stager],
			tint_color: STAGER_HEX[packet.stager],
			origin_hall: ORIGIN_HALL[packet.origin]
		},
		pipeline: {
			state: executed ? "COMMIT" : authorized ? "AUTH" : "THINK",
			auto_auth: packet.autoAuth !== false,
			requires_commit: true
		},
		target: {
			hall: PATH_HALL[packet.pathway] ?? "GOVERN",
			action_type: packet.pathway
		},
		payload: packet.payload ?? { goal: packet.goal },
		security: {
			payload_hash: packet.hash,
			agent_signature: stagerSignature(packet.stager, packet.pathway)
		}
	};
}
var ROOMS = {
	office: {
		chip: "LOBBY",
		label: "Lobby",
		kicker: "COUNTER",
		speech: "Talk at the counter. Crew walks the job. You COMMIT.",
		dock: "chat"
	},
	arcade: {
		chip: "PLAY",
		label: "Entertainment",
		kicker: "HALL",
		speech: "Arcade, YouTube, Steam. Play here. SHIP still needs AUTH.",
		dock: "chat"
	},
	theater: {
		chip: "PLAY",
		label: "Entertainment",
		kicker: "CLUB",
		speech: "Arcade, YouTube, Steam. Play here. SHIP still needs AUTH.",
		dock: "chat"
	},
	exchange: {
		chip: "DESK",
		label: "Business",
		kicker: "PAPER",
		speech: "Plant, dropship, paper trade. Live market needs your keys. COMMIT is you.",
		dock: "govern"
	},
	library: {
		chip: "LOBBY",
		label: "Lobby",
		kicker: "STUDY",
		speech: "Talk at the counter. Books live in chat.",
		dock: "chat"
	},
	compute: {
		chip: "LOBBY",
		label: "Lobby",
		kicker: "MONITORS",
		speech: "Lab is the COUNTER tab. Nothing ships without COMMIT.",
		dock: "lab"
	},
	proof: {
		chip: "LOBBY",
		label: "Lobby",
		kicker: "GATE",
		speech: "GOVERN is the gate. You still hold COMMIT.",
		dock: "govern"
	},
	core: {
		chip: "LOBBY",
		label: "Lobby",
		kicker: "SESA",
		speech: "SESA is a GOVERN job. Ring dispatch needs COMMIT.",
		dock: "govern"
	}
};
var ROOM_ORDER = [
	"office",
	"arcade",
	"exchange"
];
function canonicalRoom(r) {
	if (r === "arcade" || r === "theater") return "arcade";
	if (r === "exchange") return "exchange";
	return "office";
}
/** Furniture that leaves the lobby and enters a hall. */
var OBJECT_ROOM = {
	arcade: "arcade",
	library: "office",
	phone: "exchange",
	biz: "exchange",
	ide: "office",
	files: "office"
};
/** Fallout Shelter cutaway — three workplaces. */
var VAULT_FLOORS = [
	{
		id: "desk",
		label: "BUSINESS",
		mark: "2F",
		rooms: [{
			room: "exchange",
			art: "/vault/office-core.png",
			name: "VEX",
			role: "cpo",
			pose: "work",
			blurb: "Plant. Dropship. Paper trade.",
			span: 2
		}]
	},
	{
		id: "play",
		label: "PLAY",
		mark: "1F",
		rooms: [{
			room: "arcade",
			art: "/vault/arcade-hall.png",
			name: "RIX",
			role: "engineer",
			pose: "cheer",
			blurb: "Arcade. Tube. Steam.",
			span: 2
		}]
	},
	{
		id: "lobby",
		label: "LOBBY",
		mark: "0F",
		rooms: [{
			room: "office",
			art: "/vault/lounge-cell.png",
			name: "MOLT",
			role: "operator",
			pose: "talk",
			blurb: "The counter is chat.",
			span: 2
		}]
	}
];
var VAULT_STAGER_ROOM = {
	nyx: "exchange",
	rix: "arcade",
	vex: "exchange",
	hal: "office",
	molt: "office"
};
function crewHall(role, args) {
	const staged = args.queue.find((p) => !p.proposal.executed && STAGER_ROLE[p.stager] === role);
	if (staged) return VAULT_STAGER_ROOM[staged.stager] ?? "office";
	if (args.working.includes(role)) {
		if (role === "engineer") return "arcade";
		if (role === "cpo" || role === "qa") return "exchange";
	}
	if (args.viewing === "arcade" && role === "engineer") return "arcade";
	if (args.viewing === "exchange" && (role === "cpo" || role === "qa")) return "exchange";
	return "office";
}
function isRoomId(v) {
	return Object.prototype.hasOwnProperty.call(ROOMS, v);
}
/** Navigate. Forge-a-game stays with looksLikeArcade. */
function matchRoom(text) {
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
var EXCHANGE_MACHINES = [
	{
		id: "trade",
		chip: "TRADE",
		title: "Paper ticket",
		hint: "paper buy 0.01 BTC",
		pose: "work",
		kind: "think"
	},
	{
		id: "restock",
		chip: "SHIP",
		title: "Dropship restock",
		hint: "restock 40 units",
		pose: "carry",
		kind: "think"
	},
	{
		id: "scan",
		chip: "SCAN",
		title: "Mark scan",
		hint: "scan the mark",
		pose: "talk",
		kind: "think"
	},
	{
		id: "backtest",
		chip: "TEST",
		title: "MACD walk",
		hint: "backtest MACD",
		pose: "sit",
		kind: "think"
	},
	{
		id: "auto",
		chip: "AUTO",
		title: "AUTO AUTH · policy COMMIT",
		pose: "wave",
		kind: "toggle"
	}
];
var CLUB_ZONES = [
	{
		id: "tapes",
		chip: "TAPE",
		label: "Floorcast"
	},
	{
		id: "tube",
		chip: "TUBE",
		label: "YouTube"
	},
	{
		id: "duel",
		chip: "DUEL",
		label: "Chess"
	},
	{
		id: "bout",
		chip: "BOUT",
		label: "Tourney"
	},
	{
		id: "tune",
		chip: "TUNE",
		label: "Jukebox"
	},
	{
		id: "steam",
		chip: "STEAM",
		label: "Lounge"
	}
];
var CLUB_SPEECH = {
	tapes: "Local tapes. Crew on the glass. Not a stream.",
	tube: "YouTube portal. Official embed. Paste a public URL. We don't host the file.",
	duel: "Chess. You vs crew, or WATCH two agents. Search depth is honest.",
	bout: "Packet bout. Two crew, first to 3. The hash is the scoreboard.",
	tune: "Jukebox. Original chips. No licensed catalog.",
	steam: "Steam is a handoff. Nexus does not ship their binaries or bypass DRM."
};
var DEFAULT_CLUB = {
	zone: "tapes",
	scores: [],
	duels: [],
	plays: 0,
	tubeId: null,
	lastTune: null
};
function isClubZone(v) {
	return CLUB_ZONES.some((z) => z.id === v);
}
function hydrateClub(raw) {
	return {
		zone: raw?.zone && isClubZone(raw.zone) ? raw.zone : "tapes",
		scores: Array.isArray(raw?.scores) ? raw.scores.slice(0, 16) : [],
		duels: Array.isArray(raw?.duels) ? raw.duels.slice(0, 16) : [],
		plays: Math.max(0, Number(raw?.plays) || 0),
		tubeId: typeof raw?.tubeId === "string" ? raw.tubeId : null,
		lastTune: typeof raw?.lastTune === "string" ? raw.lastTune : null
	};
}
/** Chess / YouTube / jukebox / Steam — entertainment verbs, not GOVERN. */
function matchClub(text) {
	const t = text.toLowerCase();
	if (/\b(chess|duel|challenge)\b/.test(t)) return "duel";
	if (/\b(tournament|tourney|bout|packet pong|agent vs agent)\b/.test(t)) return "bout";
	if (/\b(youtube|yt\b|watch (a )?(video|film)|video portal|tube)\b/.test(t)) return "tube";
	if (/\b(jukebox|music lounge|chiptune|play (a )?track)\b/.test(t)) return "tune";
	if (/\b(steam|gaming lounge)\b/.test(t)) return "steam";
	return null;
}
var YT_ID = /^[A-Za-z0-9_-]{11}$/;
function parseYouTubeId(input) {
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
			if ((parts[0] === "embed" || parts[0] === "shorts" || parts[0] === "live") && parts[1] && YT_ID.test(parts[1])) return parts[1];
		}
	} catch {
		return null;
	}
	return null;
}
var TUBE_REELS = [
	{
		id: "aircAruvnKk",
		title: "Neural nets, visually",
		note: "3Blue1Brown · public YouTube"
	},
	{
		id: "DHjqpvDnNGE",
		title: "JavaScript in 100s",
		note: "Fireship · public YouTube"
	},
	{
		id: "fNk_zzaMoSs",
		title: "Linear algebra",
		note: "3Blue1Brown · public YouTube"
	}
];
function youtubeEmbed(id) {
	return `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
}
function youtubeWatch(id) {
	return `https://www.youtube.com/watch?v=${id}`;
}
var STEAM_LINKS = [{
	title: "Steam Store",
	href: "https://store.steampowered.com/",
	note: "Opens Valve. Not this floor."
}, {
	title: "Steam about",
	href: "https://store.steampowered.com/about/",
	note: "Client, library, DRM stay with Steam."
}];
var DUELISTS = [
	"engineer",
	"qa",
	"cpo",
	"pm",
	"operator"
];
/** Honest search depth. Not a rating of intelligence. */
var DUEL_DEPTH = {
	operator: 1,
	pm: 1,
	ceo: 1,
	cpo: 2,
	engineer: 2,
	cto: 2,
	qa: 2
};
function pushScore(club, row) {
	const scores = [...club.scores.filter((s) => !(s.game === row.game && s.hero === row.hero && s.score <= row.score)), row].sort((a, b) => b.score - a.score).slice(0, 12);
	return {
		...club,
		scores
	};
}
function pushDuel(club, row) {
	return {
		...club,
		duels: [row, ...club.duels].slice(0, 12)
	};
}
function boardRows(club) {
	return [...club.scores].sort((a, b) => b.score - a.score).slice(0, 8);
}
function msg(name, content) {
	return {
		role: "assistant",
		name,
		content
	};
}
async function tryLocalTurn(goal, files, biz) {
	const demo = matchDemo(goal);
	if (looksLikeArcade(goal)) return {
		ok: true,
		messages: [msg("engineer", "Forge is the arcade hall. I write a cabinet spec. GOVERN: THINK → AUTH → COMMIT and a new machine drops. You hold the key.")],
		files,
		events: [{
			name: "arcade_spec",
			actor: "engineer",
			detail: "cabinet"
		}],
		speaker: "engineer",
		plan: [],
		incomplete: false,
		checks: []
	};
	if (demo) {
		const next = {
			...files,
			...demo.files
		};
		const checks = runLabTests(next, biz).checks.map((c) => `${c.ok ? "PASS" : "FAIL"} ${c.name}`);
		return {
			ok: true,
			messages: [
				msg("pm", `Plan locked (${demo.plan.length} steps). Floor is executing — not waiting.`),
				msg("engineer", `${demo.title} files are in the monitor.`),
				msg("qa", checks.join(" · ") || "No checks."),
				msg("engineer", demo.summary)
			],
			files: next,
			events: [
				{
					name: "set_plan",
					actor: "pm",
					detail: demo.title
				},
				{
					name: "write_file",
					actor: "engineer",
					detail: "index.html"
				},
				{
					name: "write_file",
					actor: "engineer",
					detail: "styles.css"
				},
				{
					name: "write_file",
					actor: "engineer",
					detail: "main.js"
				},
				{
					name: "run_checks",
					actor: "qa",
					detail: checks.join("; ")
				},
				{
					name: "complete_goal",
					actor: "engineer",
					detail: demo.id
				}
			],
			speaker: "engineer",
			plan: demo.plan,
			incomplete: false,
			checks
		};
	}
	if (looksLikeSunder(goal)) {
		const findings = scanLab(files);
		const patched = applySunder(files, findings);
		const hash = await hashFiles(patched);
		const changed = patched["index.html"] !== files["index.html"] || patched["main.js"] !== files["main.js"];
		const next = {
			...patched,
			"SCAN.md": renderScan(findings),
			"SNAP.md": `# NEXUS SNAP\nhash: ${hash}\n`,
			"SUNDER.md": renderSunder(findings, changed)
		};
		const line = changed ? `SUNDER patched the lab. ${findings.length} finding(s).` : `SCAN clean. ${findings[0]?.note ?? "Nothing to cut."}`;
		return {
			ok: true,
			messages: [
				msg("cpo", "SCAN the lab. SNAP a hash. SUNDER only what this floor owns."),
				msg("qa", findings.map((f) => `${f.kind}: ${f.note}`).join(" · ")),
				msg("cpo", `${line} Sibling repos were not touched.`)
			],
			files: next,
			events: [{
				name: "sunder",
				actor: "cpo",
				detail: hash.slice(0, 12)
			}, {
				name: "write_file",
				actor: "cpo",
				detail: "SUNDER.md"
			}],
			speaker: "cpo",
			plan: [],
			incomplete: false,
			checks: findings.map((f) => `${f.kind} ${f.note}`)
		};
	}
	if (looksLikeCodex(goal)) {
		const n = liveCount();
		return {
			ok: true,
			messages: [
				msg("operator", `This is your sovereign office. ${n} things actually run on this floor. T4–T5 — voice, APK, 24h unsupervised AGI — are capped.`),
				msg("qa", inspectCatalog()),
				msg("ceo", "Tap furniture. Talk to the desk. GOVERN is THINK → AUTH → COMMIT. I advise. You hold the key. Paper / local only.")
			],
			files,
			events: [{
				name: "inspect_codex",
				actor: "operator",
				detail: `${n} live`
			}],
			speaker: "operator",
			plan: [],
			incomplete: false,
			checks: []
		};
	}
	if (looksLikeHorizon(goal)) {
		const map = matchRoadmap(goal);
		return {
			ok: true,
			messages: [
				msg("pm", `${map.title}: ${map.steps.length} steps. Owners and tests on the board.`),
				msg("cpo", "Smallest ship. Cut anything this floor cannot run."),
				msg("pm", "AUTH is still yours. This is a plan, not unsupervised work.")
			],
			files: {
				...files,
				"BOARD.md": renderBoard(map)
			},
			events: [{
				name: "set_plan",
				actor: "pm",
				detail: map.title
			}, {
				name: "write_file",
				actor: "pm",
				detail: "BOARD.md"
			}],
			speaker: "pm",
			plan: map.steps,
			incomplete: false,
			checks: []
		};
	}
	return null;
}
var DEFAULT_FILES = {
	"index.html": `<!doctype html>
<html>
  <head>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>NEXUS lab</h1>
    <p>Idle. Reception will send engineering here when a build starts.</p>
    <script src="main.js"><\/script>
  </body>
</html>`,
	"styles.css": `body { font-family: ui-sans-serif; background: #1c120c; color: #f6ead0; padding: 24px; }`,
	"main.js": `console.log("NEXUS lab ready");`
};
var GREET = "Office is live. Tap a desk, or tell me what to run. GOVERN is THINK → AUTH → COMMIT. You hold the key. Paper / local.";
var HELLO = "Crew is on the floor. You hold the key.";
function nid() {
	return Math.random().toString(16).slice(2, 10);
}
var useNexus = create()(persist((set, get) => {
	const applyRun = async (proposal, extra) => {
		set({
			busy: true,
			lastError: null
		});
		const world = {
			gold: get().gold,
			biz: hydrateBiz(get().biz),
			files: get().files,
			logTail: get().log.slice(-8)
		};
		const { run, effects } = await executeAuthorized(proposal, world);
		const execLog = {
			id: nid(),
			kind: run.ok ? "execute" : "refuse",
			ts: run.ts,
			proposalId: proposal.id,
			payload: {
				pathway: run.pathway,
				hash: run.hash,
				detail: run.detail,
				ok: run.ok
			}
		};
		const keepOverlay = run.ok && (run.pathway === "shop_publish" || run.pathway === "lab_qa" || run.pathway === "lab_build" || run.pathway === "sunder" || run.pathway === "horizon");
		const pathFeat = run.ok && run.pathway === "drain_holds" ? "drain" : run.ok && run.pathway === "shop_publish" ? "shop" : run.ok && run.pathway === "lab_qa" ? "qa" : run.ok && run.pathway === "paper_trade" ? "paper" : run.ok && run.pathway === "lab_build" ? "build" : run.ok && run.pathway === "sunder" ? "sunder" : run.ok && run.pathway === "horizon" ? "horizon" : run.ok && run.pathway === "arcade_ship" ? "cabinet" : run.ok && run.pathway === "sesa_cycle" ? "sesa" : run.ok && run.pathway === "sesa_revert" ? "merkle" : run.ok ? "commit" : null;
		set((s) => {
			const nextFeats = [...s.feats ?? []];
			let gold = effects.gold ?? s.gold + (run.ok ? 25 : 0);
			let crewGold = s.crewGold ?? 0;
			if (proposal.actor === "auto-ops") crewGold += 8;
			if (pathFeat && !nextFeats.includes(pathFeat)) {
				nextFeats.push(pathFeat);
				gold += FEATS.find((f) => f.id === pathFeat)?.gold ?? 3;
			}
			if (run.ok && !nextFeats.includes("commit") && pathFeat !== "commit") {
				nextFeats.push("commit");
				gold += 5;
			}
			const earned = nextFeats.filter((id) => !(s.feats ?? []).includes(id));
			return {
				busy: false,
				activeProposal: {
					...proposal,
					executed: true,
					status: "committed"
				},
				tasks: s.tasks,
				log: [
					...s.log,
					...extra,
					execLog
				],
				gold,
				crewGold,
				feats: nextFeats,
				files: effects.files ?? s.files,
				plan: effects.plan?.length ? effects.plan : s.plan,
				biz: effects.biz ?? s.biz,
				lastRun: run,
				runs: [run, ...s.runs ?? []].slice(0, 16),
				lastError: run.ok ? null : run.detail,
				overlay: keepOverlay ? run.overlay ?? s.overlay : s.overlay,
				room: s.room,
				playingId: s.playingId,
				working: run.working.length ? run.working : crewForPathway(run.pathway),
				speech: run.ok ? `${run.title} committed. ${run.hash.slice(0, 12)} · ${run.detail}${earned.length ? ` · ACHIEVEMENT ${featTitle(earned[0])}` : ""}` : run.detail,
				dockTab: "govern"
			};
		});
		window.setTimeout(() => set({ working: [] }), 3200);
	};
	return {
		gold: 25e3,
		selectedRole: "operator",
		goalDraft: "",
		speech: HELLO,
		lastReality: null,
		activeProposal: null,
		log: [],
		tasks: [],
		lastError: null,
		busy: false,
		working: [],
		messages: [],
		files: DEFAULT_FILES,
		activeFile: "index.html",
		events: [],
		overlay: null,
		dim: false,
		light: "on",
		feats: [],
		crewGold: 0,
		briefed: false,
		plan: [],
		checks: [],
		view: "floor",
		selectedNode: null,
		biz: DEFAULT_BIZ,
		labPane: "edit",
		dockTab: "chat",
		lastRun: null,
		runs: [],
		lastWatchAt: 0,
		labDirtyAt: 0,
		room: "office",
		playingId: null,
		club: { ...DEFAULT_CLUB },
		queue: [],
		policies: hydratePolicies(),
		setGoalDraft: (v) => set({ goalDraft: v }),
		selectRole: (r) => set({
			selectedRole: r,
			speech: CREW[r]?.tap ?? FLOOR_LINE[r]
		}),
		meetCrew: (r) => {
			const desk = CREW_DESK[r];
			const line = CREW[r]?.tap ?? FLOOR_LINE[r];
			if (!desk) {
				set({
					selectedRole: r,
					speech: line,
					overlay: null,
					dockTab: "chat"
				});
				return;
			}
			const dest = OBJECT_ROOM[desk];
			if (dest) {
				set({
					selectedRole: r,
					speech: line
				});
				get().setRoom(dest);
				return;
			}
			set((s) => ({
				selectedRole: r,
				speech: line,
				overlay: desk,
				dockTab: OBJECT_TAB[desk] ?? s.dockTab
			}));
		},
		dismissBrief: () => set({
			briefed: true,
			speech: GREET
		}),
		openOverlay: (id) => {
			const dest = OBJECT_ROOM[id];
			if (dest) {
				get().setRoom(dest);
				return;
			}
			set({
				overlay: id,
				speech: OBJECT_HINT[id],
				dockTab: OBJECT_TAB[id] ?? get().dockTab
			});
		},
		closeOverlay: () => set({ overlay: null }),
		addGold: (n) => set((s) => ({ gold: s.gold + n })),
		tapObject: (id) => {
			const dest = OBJECT_ROOM[id];
			if (dest) {
				const feats = get().feats ?? [];
				const firstArcade = dest === "arcade" && !feats.includes("arcade");
				get().setRoom(dest);
				if (firstArcade) set((s) => ({
					feats: [...s.feats ?? [], "arcade"],
					gold: s.gold + 2
				}));
				return;
			}
			const tab = OBJECT_TAB[id];
			const room = tab ? { dockTab: tab } : {};
			if (id === "lamp") {
				set((s) => {
					const cur = s.light ?? (s.dim ? "dim" : "on");
					const next = cur === "on" ? "dim" : cur === "dim" ? "ops" : "on";
					return {
						light: next,
						dim: next === "dim",
						speech: next === "on" ? "Lights up." : next === "dim" ? "Night floor." : "Ops phosphor on the glass."
					};
				});
				return;
			}
			if (id === "coffee") {
				set((s) => {
					const feats = s.feats ?? [];
					const first = !feats.includes("sip");
					return {
						gold: s.gold + 1,
						feats: first ? [...feats, "sip"] : feats,
						speech: first ? "ACHIEVEMENT · First sip. Gold +1." : OBJECT_HINT.coffee,
						overlay: null,
						...room
					};
				});
				return;
			}
			if (id === "plant") {
				set({
					speech: OBJECT_HINT.plant,
					overlay: null,
					...room
				});
				return;
			}
			set({
				overlay: id,
				speech: OBJECT_HINT[id],
				...room
			});
		},
		grantFeat: (id) => {
			const def = FEATS.find((f) => f.id === id);
			if (!def) return;
			set((s) => {
				if ((s.feats ?? []).includes(id)) return s;
				return {
					feats: [...s.feats ?? [], id],
					gold: s.gold + def.gold,
					speech: `ACHIEVEMENT · ${def.title}.`
				};
			});
		},
		setActiveFile: (path) => set({ activeFile: path }),
		setFileContent: (path, content) => set((s) => ({
			files: {
				...s.files,
				[path]: content
			},
			labDirtyAt: Date.now()
		})),
		send: async (forced) => {
			const text = (forced ?? get().goalDraft).trim();
			if (!text || get().busy) return;
			const clubDest = matchClub(text);
			if (clubDest) {
				const userMsg = {
					id: nid(),
					ts: Date.now(),
					role: "user",
					content: text
				};
				get().setRoom("arcade");
				get().setClubZone(clubDest);
				set((s) => ({
					busy: false,
					working: [],
					goalDraft: forced ? s.goalDraft : "",
					messages: [...s.messages, userMsg],
					lastError: null
				}));
				return;
			}
			const dest = matchRoom(text);
			if (dest) {
				const userMsg = {
					id: nid(),
					ts: Date.now(),
					role: "user",
					content: text
				};
				get().setRoom(dest);
				set((s) => ({
					busy: false,
					working: [],
					goalDraft: forced ? s.goalDraft : "",
					messages: [...s.messages, userMsg],
					lastError: null
				}));
				return;
			}
			const userMsg = {
				id: nid(),
				ts: Date.now(),
				role: "user",
				content: text
			};
			set((s) => ({
				busy: true,
				working: ["operator", "pm"],
				lastError: null,
				goalDraft: forced ? s.goalDraft : "",
				messages: [...s.messages, userMsg],
				speech: "Floor is moving. Not waiting.",
				selectedRole: "operator",
				dockTab: "chat"
			}));
			try {
				const local = await tryLocalTurn(text, get().files, get().biz);
				if (local) {
					const extra = local.messages.map((m) => ({
						...m,
						id: nid(),
						ts: Date.now()
					}));
					const wroteDemo = local.events.some((e) => e.name === "write_file" && e.detail === "index.html");
					const sundered = local.events.some((e) => e.name === "sunder");
					const planned = local.events.some((e) => e.name === "set_plan");
					set((s) => {
						const feats = [...s.feats ?? []];
						let gold = s.gold + (wroteDemo ? 40 : 10);
						let crewGold = s.crewGold ?? 0;
						crewGold += 8;
						const feat = wroteDemo ? "build" : sundered ? "sunder" : planned ? "horizon" : null;
						if (feat && !feats.includes(feat)) {
							feats.push(feat);
							gold += FEATS.find((f) => f.id === feat)?.gold ?? 5;
						}
						return {
							busy: false,
							working: [],
							messages: [...s.messages, ...extra],
							files: local.files ?? s.files,
							events: [...s.events, ...local.events].slice(-40),
							selectedRole: local.speaker,
							speech: extra.at(-1)?.content ?? s.speech,
							gold,
							crewGold,
							feats,
							overlay: wroteDemo ? null : sundered ? "files" : planned ? "plan" : s.overlay,
							labPane: wroteDemo ? "run" : s.labPane,
							plan: local.plan.length ? local.plan : s.plan,
							checks: local.checks.length ? local.checks : s.checks,
							lastError: null,
							dockTab: wroteDemo ? "lab" : "chat",
							activeFile: wroteDemo ? "index.html" : s.activeFile,
							room: wroteDemo ? "compute" : s.room
						};
					});
					const workers = Array.from(new Set(local.events.map((e) => e.actor)));
					if (workers.length) {
						set({ working: workers });
						window.setTimeout(() => set({ working: [] }), 2800);
					}
					if (local.events.some((e) => e.name === "arcade_spec")) get().think("ship arcade cabinet");
					return;
				}
				const result = await runNexusTurn({ data: {
					message: text,
					history: get().messages.filter((m) => m.id !== userMsg.id).map(({ role, name, content }) => ({
						role,
						name,
						content
					})),
					files: get().files,
					plan: get().plan,
					shop: get().biz
				} });
				if (!result.ok) {
					set({
						busy: false,
						working: [],
						lastError: result.error ?? "Turn failed",
						speech: result.error ?? "Something went wrong.",
						dockTab: "chat"
					});
					return;
				}
				const extra = result.messages.map((m) => ({
					...m,
					id: nid(),
					ts: Date.now()
				}));
				const wrote = result.events.some((e) => e.name === "write_file");
				set((s) => ({
					busy: false,
					working: [],
					messages: [...s.messages, ...extra],
					files: result.files ?? s.files,
					events: [...s.events, ...result.events].slice(-40),
					selectedRole: result.speaker,
					speech: extra.at(-1)?.content ?? s.speech,
					gold: s.gold + (wrote ? 40 : 10),
					overlay: wrote ? null : s.overlay,
					labPane: wrote ? "run" : s.labPane,
					room: wrote ? "compute" : s.room,
					dockTab: wrote ? "lab" : s.dockTab,
					plan: result.plan.length ? result.plan : s.plan,
					checks: result.checks.length ? result.checks : s.checks,
					lastError: null
				}));
				const workers = Array.from(new Set(result.events.map((e) => e.actor)));
				if (workers.length) {
					set({ working: workers });
					window.setTimeout(() => set({ working: [] }), 2800);
				}
				if (result.incomplete && !forced) window.setTimeout(() => {
					get().send("Continue the plan until tests pass. Do not wait.");
				}, 400);
			} catch (e) {
				set({
					busy: false,
					working: [],
					lastError: e instanceof Error ? e.message : "Turn failed"
				});
			}
		},
		think: (goalArg) => {
			const goal = goalArg?.trim() || get().goalDraft.trim() || get().messages.filter((m) => m.role === "user").at(-1)?.content;
			if (!goal) {
				set({
					lastError: "State an objective first.",
					speech: "Give me an objective first."
				});
				return;
			}
			const { reality, proposal, provenance } = think(goal, { path: "office" });
			set((s) => ({
				lastReality: reality,
				activeProposal: proposal,
				log: [...s.log, provenance],
				lastError: null,
				overlay: s.overlay,
				selectedNode: get().view === "command" ? "dec-horizon" : s.selectedNode,
				dockTab: "govern",
				goalDraft: "",
				speech: `${proposal.pathwayTitle ?? "Pathway"} ready. AUTH opens the gate.`
			}));
		},
		authorize: () => {
			const p = get().activeProposal;
			if (!p) {
				set({ lastError: "Nothing to authorize. THINK first." });
				return;
			}
			const result = authorize(p, "operator");
			if ("error" in result) {
				set({
					lastError: result.error,
					speech: result.error
				});
				return;
			}
			set((s) => ({
				activeProposal: result.proposal,
				log: [...s.log, result.provenance],
				lastError: null,
				overlay: s.overlay,
				speech: "Authorized. COMMIT executes the pathway — fail-closed, hashed."
			}));
		},
		commit: async () => {
			const p = get().activeProposal;
			if (!p) {
				set({ lastError: "Nothing to commit." });
				return;
			}
			const result = commit(p);
			if ("error" in result) {
				set((s) => ({
					lastError: result.error,
					speech: result.error,
					log: [...s.log, result.provenance]
				}));
				return;
			}
			set((s) => ({ tasks: [...s.tasks, result.task] }));
			await applyRun(result.proposal, [result.provenance]);
			set((s) => ({ queue: hydrateQueue(s.queue).filter((p) => p.proposal.id !== result.proposal.id) }));
		},
		resetCycle: () => set((s) => ({
			activeProposal: null,
			lastReality: null,
			lastError: null,
			speech: "Gate cleared. State a new order.",
			selectedNode: null,
			queue: hydrateQueue(s.queue).filter((p) => p.proposal.id !== s.activeProposal?.id)
		})),
		setView: (v) => set({
			view: v,
			overlay: null,
			selectedNode: null
		}),
		selectNode: (id) => set({ selectedNode: id }),
		spawnWorker: (role) => {
			set({
				selectedRole: role,
				working: [role],
				speech: `${role} spawned onto the objective.`
			});
			window.setTimeout(() => set({ working: [] }), 3200);
		},
		setBiz: (p) => set((s) => ({ biz: hydrateBiz({
			...s.biz,
			...p,
			rails: {
				...s.biz.rails,
				...p.rails ?? {}
			},
			rules: p.rules ? {
				...s.biz.rules,
				...p.rules
			} : s.biz.rules
		}) })),
		setRules: (p) => set((s) => {
			const biz = hydrateBiz(s.biz);
			const rules = hydrateRules({
				...biz.rules,
				...p
			});
			return {
				biz: {
					...biz,
					rules
				},
				speech: `Plant rule · ${rules.sku} LOW AT ${rules.lowAt} BUY ${rules.restockQty} IN ${rules.inboundQty}. Local ledger.`
			};
		}),
		setLabPane: (p) => set({
			labPane: p,
			overlay: "ide",
			dockTab: "lab"
		}),
		setDockTab: (t) => set({ dockTab: t }),
		publishShop: () => {
			const files = shopFiles(get().biz);
			const tested = runLabTests(files, get().biz);
			set({
				files,
				activeFile: "index.html",
				room: "compute",
				overlay: null,
				labPane: "run",
				dockTab: "lab",
				working: ["engineer", "cpo"],
				speech: tested.ok ? "Shop published into the lab. RUN is live. TEST passed." : "Shop published. TEST found gaps — open TEST.",
				biz: {
					...get().biz,
					lastTest: {
						...tested,
						ts: Date.now()
					}
				}
			});
			window.setTimeout(() => set({ working: [] }), 2800);
		},
		runLabTests: () => {
			const tested = runLabTests(get().files, get().biz);
			set({
				room: "compute",
				overlay: null,
				labPane: "test",
				dockTab: "lab",
				checks: tested.checks.map((c) => `${c.ok ? "PASS" : "FAIL"} ${c.name}`),
				biz: {
					...get().biz,
					lastTest: {
						...tested,
						ts: Date.now()
					}
				},
				working: ["qa"],
				speech: tested.ok ? "QA: lab checks passed. You can RUN." : "QA: a check failed. Fix the lab."
			});
			window.setTimeout(() => set({ working: [] }), 2200);
		},
		paperFill: async (symbol, side, qty) => {
			if (get().biz.halted) {
				set({
					lastError: "desk is halted — resume first",
					speech: "Desk is halted. Resume before paper fills."
				});
				return;
			}
			const price = await fetchSpot(symbol);
			const q = Math.max(1e-4, qty);
			const goldDelta = side === "sell" ? Math.round(price * q * .002) : -Math.round(price * q * .002);
			const fill = {
				id: nid(),
				symbol: symbol.toUpperCase(),
				side,
				qty: q,
				price,
				ts: Date.now()
			};
			set((s) => {
				const gold = Math.max(0, s.gold + goldDelta);
				const biz = hydrateBiz(s.biz);
				const peak = Math.max(biz.peakGold ?? gold, gold);
				const drawdown = peak > 0 ? Math.max(0, (peak - gold) / peak) : 0;
				return {
					gold,
					working: ["cpo", "operator"],
					speech: `Paper ${side} ${q} ${symbol.toUpperCase()} @ ${price.toFixed(2)}. Not a live broker.`,
					biz: {
						...biz,
						peakGold: peak,
						drawdown,
						halted: biz.halted || drawdown > .05,
						lastSpot: {
							symbol: symbol.toUpperCase(),
							price,
							ts: Date.now()
						},
						fills: [fill, ...biz.fills].slice(0, 24)
					}
				};
			});
			window.setTimeout(() => set({ working: [] }), 2200);
		},
		armWatch: (id, armed) => {
			const def = WATCH_DEFS.find((w) => w.id === id);
			if (!def) return;
			set((s) => {
				const watches = hydrateWatches(s.biz.watches);
				watches[id] = {
					...watches[id],
					armed,
					lastReason: armed ? "armed" : "cold"
				};
				return {
					biz: {
						...hydrateBiz(s.biz),
						watches
					},
					speech: armed ? `${def.title} armed. ${s.biz.autoOps ? "AUTO AUTH. COMMIT needs a signed rule or you." : "It will stage a packet. AUTH is crew. COMMIT is you unless a signed cap matches."}` : `${def.title} cold.`,
					dockTab: "govern",
					feats: !armed || (s.feats ?? []).includes("watch") ? s.feats : [...s.feats ?? [], "watch"],
					gold: !armed || (s.feats ?? []).includes("watch") ? s.gold : s.gold + 3
				};
			});
		},
		inbound: async (qty) => {
			const biz = hydrateBiz(get().biz);
			const n = Math.max(1, Math.floor(qty ?? biz.rules.inboundQty));
			const hint = inboundHint(n, biz.rules.sku);
			const s = get();
			if (s.busy) return;
			if (s.activeProposal && !s.activeProposal.executed && !s.biz.autoOps) {
				set({
					lastError: "Commit or CLEAR the open proposal first.",
					speech: "A proposal is already on the gate."
				});
				return;
			}
			if (s.biz.autoOps) {
				await get().stageCrew("nyx", hint);
				return;
			}
			get().think(hint);
			set({ speech: `Inbound ${n} ${biz.rules.sku}. AUTH to fulfill. Short parks a HOLD. Not Shopify.` });
		},
		tickPlant: async () => {
			const s = get();
			if (s.busy) return;
			const biz = hydrateBiz(s.biz);
			const hit = evaluateWatches({
				stock: biz.stock,
				lastScan: biz.lastScan,
				watches: biz.watches,
				rules: biz.rules,
				holds: biz.orders ?? [],
				now: Date.now(),
				halted: biz.halted
			})[0];
			if (!hit) {
				set({ lastWatchAt: Date.now() });
				return;
			}
			const stager = hit.id === "stock_low" || hit.id === "drain" ? "nyx" : "vex";
			if (alreadyQueued(hydrateQueue(s.queue), stager, "restock") && hit.id === "stock_low") return;
			const watches = hydrateWatches(biz.watches);
			watches[hit.id] = {
				...watches[hit.id],
				lastFire: Date.now(),
				lastReason: hit.reason
			};
			set({
				biz: {
					...biz,
					watches
				},
				lastWatchAt: Date.now()
			});
			await get().stageCrew(stager, hit.hint);
		},
		setRoom: (r) => {
			const id = canonicalRoom(isRoomId(r) ? r : "office");
			const hall = ROOMS[id];
			const club = hydrateClub(get().club);
			set({
				room: id,
				overlay: null,
				playingId: null,
				speech: hall.speech,
				dockTab: hall.dock,
				club
			});
		},
		playCabinet: (id) => {
			set((s) => {
				const club = hydrateClub(s.club);
				const plays = club.plays + 1;
				const firstRat = plays >= 10 && !(s.feats ?? []).includes("rat");
				return {
					room: "arcade",
					dockTab: "lab",
					playingId: id,
					overlay: null,
					club: {
						...club,
						plays
					},
					feats: firstRat ? [...s.feats ?? [], "rat"] : s.feats,
					gold: firstRat ? s.gold + 5 : s.gold,
					speech: firstRat ? "ACHIEVEMENT · Arcade rat." : s.speech
				};
			});
		},
		closeCabinet: () => set({ playingId: null }),
		setClubZone: (z) => set((s) => ({
			club: {
				...hydrateClub(s.club),
				zone: z
			},
			speech: CLUB_SPEECH[z],
			dockTab: "chat"
		})),
		setTube: (id) => set((s) => ({ club: {
			...hydrateClub(s.club),
			tubeId: id
		} })),
		setTune: (id) => set((s) => ({ club: {
			...hydrateClub(s.club),
			lastTune: id
		} })),
		recordScore: (row) => {
			set((s) => {
				const club = pushScore(hydrateClub(s.club), {
					...row,
					ts: Date.now()
				});
				const cabinets = hydrateCabinets(s.biz.cabinets).map((c) => c.id === row.game || c.engine === row.game ? {
					...c,
					hi: Math.max(c.hi, row.score)
				} : c);
				const firstRat = club.plays >= 10 && !(s.feats ?? []).includes("rat");
				return {
					club,
					biz: {
						...hydrateBiz(s.biz),
						cabinets
					},
					feats: firstRat ? [...s.feats ?? [], "rat"] : s.feats,
					gold: firstRat ? s.gold + 5 : s.gold,
					speech: firstRat ? "ACHIEVEMENT · Arcade rat." : s.speech
				};
			});
		},
		recordDuel: (row) => set((s) => ({ club: pushDuel(hydrateClub(s.club), row) })),
		tickArcade: async () => {
			const s = get();
			if (s.busy) return;
			const biz = hydrateBiz(s.biz);
			if (hydrateCabinets(biz.cabinets).length >= 12) return;
			if (alreadyQueued(hydrateQueue(s.queue), "rix", "arcade_ship")) return;
			const wait = s.room === "arcade" ? 18e3 : 48e3;
			if (!biz.lastCabinetAt) {
				set({ biz: {
					...biz,
					lastCabinetAt: Date.now()
				} });
				return;
			}
			if (Date.now() - biz.lastCabinetAt < wait) return;
			set({ biz: {
				...biz,
				lastCabinetAt: Date.now()
			} });
			await get().stageCrew("rix", "ship arcade cabinet");
		},
		tickHal: async () => {
			const s = get();
			if (s.busy) return;
			if (!(hydrateBiz(s.biz).orders ?? []).filter((o) => o.status === "held").length) return;
			if (alreadyQueued(hydrateQueue(s.queue), "hal", "drain_holds")) return;
			await get().stageCrew("hal", "drain held orders");
		},
		tickLab: () => {
			const s = get();
			if (s.busy || !s.labDirtyAt) return;
			if (Date.now() - s.labDirtyAt < 1400) return;
			const tested = runLabTests(s.files, s.biz);
			set({
				labDirtyAt: 0,
				labPane: "test",
				checks: tested.checks.map((c) => `${c.ok ? "PASS" : "FAIL"} ${c.name}`),
				biz: {
					...hydrateBiz(s.biz),
					lastTest: {
						...tested,
						ts: Date.now()
					}
				},
				working: ["qa"],
				speech: tested.ok ? "NYX: lab checks passed. RIX may stage a sandbox cabinet." : "NYX: a check failed. Repair is LAB. Nothing staged."
			});
			window.setTimeout(() => set({ working: [] }), 2200);
			if (tested.ok) get().stageCrew("rix", "ship arcade cabinet");
		},
		stageCrew: async (stager, goal) => {
			const s = get();
			const biz = hydrateBiz(s.biz);
			const policies = hydratePolicies(s.policies);
			const queue = hydrateQueue(s.queue);
			const job = STAGER_JOB[stager];
			const drafted = draftStage(goal?.trim() || job.hint(biz.rules.sku, biz.rules.restockQty), stager, job.reason, job.origin, policies);
			if ("error" in drafted) {
				set({
					lastError: drafted.error,
					speech: drafted.error
				});
				return;
			}
			if (drafted.packet.pathway === "sesa_cycle" || drafted.packet.pathway === "sesa_revert") {
				drafted.packet.origin = "compute";
				drafted.packet.reason = drafted.packet.pathway === "sesa_revert" ? "Snap to last verified manifold." : "VSA bind. SMT first. Ring waits on COMMIT.";
			}
			if (alreadyQueued(queue, stager, drafted.packet.pathway)) {
				set({ speech: `${STAGER_NAME[stager]} already has a packet on the desk.` });
				return;
			}
			try {
				drafted.packet.hash = await sha256Hex(JSON.stringify({
					goal: drafted.packet.goal,
					pathway: drafted.packet.pathway,
					stager
				}));
			} catch {
				drafted.packet.hash = drafted.packet.id;
			}
			const auto = canAutoCommit(drafted.packet.goal, drafted.packet.pathway, policies, biz.autoOps);
			const occupy = !s.activeProposal || s.activeProposal.executed;
			const nextFeats = [...s.feats ?? []];
			let gold = s.gold;
			if (!nextFeats.includes("stage")) {
				nextFeats.push("stage");
				gold += 3;
			}
			set({
				queue: [...queue, drafted.packet].slice(0, 8),
				log: [
					...s.log,
					drafted.thinkLog,
					drafted.authLog
				],
				activeProposal: occupy ? drafted.packet.proposal : s.activeProposal,
				dockTab: "govern",
				overlay: null,
				selectedRole: STAGER_ROLE[stager],
				working: [STAGER_ROLE[stager]],
				feats: nextFeats,
				gold,
				lastError: null,
				speech: auto ? `${STAGER_NAME[stager]} AUTH. Signed rule ${drafted.packet.policyId}. COMMIT under policy.` : `${STAGER_NAME[stager]} staged ${drafted.packet.title}. AUTH done. GOVERN holds COMMIT.`
			});
			window.setTimeout(() => set({ working: [] }), 2800);
			if (auto) await get().commitPacket(drafted.packet.id);
		},
		pickPacket: (id) => {
			const packet = hydrateQueue(get().queue).find((p) => p.id === id);
			if (!packet) return;
			set({
				activeProposal: packet.proposal,
				dockTab: "govern",
				selectedRole: STAGER_ROLE[packet.stager],
				speech: `${STAGER_NAME[packet.stager]} · ${packet.title}. COMMIT or CLEAR.`
			});
		},
		commitPacket: async (id) => {
			const packet = hydrateQueue(get().queue).find((p) => p.id === id);
			if (!packet) return;
			const done = commit(packet.proposal);
			if ("error" in done) {
				set({
					lastError: done.error,
					speech: done.error
				});
				return;
			}
			set((st) => ({
				tasks: [...st.tasks, done.task],
				queue: hydrateQueue(st.queue).filter((p) => p.id !== id)
			}));
			await applyRun(done.proposal, [done.provenance]);
		},
		commitAll: async () => {
			const s = get();
			const open = hydrateQueue(s.queue).filter((p) => p.proposal.authorized && !p.proposal.executed).slice(0, 4);
			const active = s.activeProposal;
			if (active && active.authorized && !active.executed && !open.some((p) => p.proposal.id === active.id)) await get().commit();
			for (const p of open) {
				if (get().busy) return;
				await get().commitPacket(p.id);
			}
		},
		authAll: () => {
			const s = get();
			const extra = [];
			const queue = hydrateQueue(s.queue).map((p) => {
				if (p.proposal.authorized || p.proposal.executed) return p;
				const auth = authorize(p.proposal, `AUTH_${STAGER_NAME[p.stager]}_DRAFT`);
				if ("error" in auth) return p;
				extra.push(auth.provenance);
				return {
					...p,
					proposal: auth.proposal,
					autoAuth: true
				};
			});
			let active = s.activeProposal;
			if (active && !active.authorized && !active.executed) {
				const auth = authorize(active, "operator");
				if (!("error" in auth)) {
					active = auth.proposal;
					extra.push(auth.provenance);
				}
			}
			set({
				queue,
				activeProposal: active,
				log: extra.length ? [...s.log, ...extra] : s.log,
				lastError: null,
				speech: "AUTH ALL. COMMIT still waits in GOVERN.",
				dockTab: "govern"
			});
		},
		dropPacket: (id) => {
			set((s) => {
				const queue = hydrateQueue(s.queue);
				const dropped = queue.find((p) => p.id === id);
				return {
					queue: queue.filter((p) => p.id !== id),
					activeProposal: dropped && s.activeProposal?.id === dropped.proposal.id ? null : s.activeProposal,
					lastError: null,
					speech: "Packet dropped. Nothing executed."
				};
			});
		},
		signPolicy: (id, signed) => {
			set((s) => {
				const policies = hydratePolicies(s.policies).map((p) => p.id === id ? {
					...p,
					signed
				} : p);
				const nextFeats = [...s.feats ?? []];
				let gold = s.gold;
				if (signed && !nextFeats.includes("policy")) {
					nextFeats.push("policy");
					gold += 5;
				}
				return {
					policies,
					feats: nextFeats,
					gold,
					speech: signed ? `Rule ${id} signed. AUTO may COMMIT only inside this cap.` : `Rule ${id} cold. AUTO AUTH only.`,
					dockTab: "govern"
				};
			});
		},
		clearQueue: () => set({
			queue: [],
			activeProposal: null,
			lastReality: null,
			lastError: null,
			speech: "Queue cleared. You hold the key."
		}),
		toggleAuto: () => set((s) => {
			const biz = hydrateBiz(s.biz);
			const on = !biz.autoOps;
			return {
				biz: {
					...biz,
					autoOps: on
				},
				speech: on ? "AUTO AUTH. COMMIT only inside a signed cap. Cabinets never auto." : "AUTO off. Crew can still stage. You COMMIT.",
				dockTab: "govern"
			};
		}),
		encodeSesa: (key) => set((s) => {
			const biz = hydrateBiz(s.biz);
			const sesa = rememberSymbol(hydrateSesa(biz.sesa), key);
			return {
				biz: {
					...biz,
					sesa
				},
				speech: sesa.telemetry[0] ?? `Encoded ${key}. Workspace only.`,
				room: "core",
				dockTab: "govern"
			};
		}),
		pickSesa: (intent, action) => set((s) => {
			const biz = hydrateBiz(s.biz);
			const sesa = setPair(hydrateSesa(biz.sesa), intent, action);
			return {
				biz: {
					...biz,
					sesa
				},
				room: "core"
			};
		}),
		previewSesa: (intent, action) => set((s) => {
			const biz = hydrateBiz(s.biz);
			const cur = hydrateSesa(biz.sesa);
			const sesa = previewBind(cur, intent ?? cur.intent, action ?? cur.action);
			return {
				biz: {
					...biz,
					sesa
				},
				speech: sesa.preview?.ok ? `SMT pass · ${sesa.preview.intent}⊗${sesa.preview.action} · ${sesa.preview.cohesion.toFixed(4)}. STAGE to GOVERN.` : sesa.preview?.pruned.join("; ") ?? "SMT refuse.",
				room: "core",
				dockTab: "govern"
			};
		}),
		replaySesa: (idx) => set((s) => {
			const biz = hydrateBiz(s.biz);
			const sesa = loadFrame(hydrateSesa(biz.sesa), idx);
			return {
				biz: {
					...biz,
					sesa
				},
				speech: sesa.telemetry[0] ?? `Replayed frame ${idx}. Workspace only.`,
				room: "core",
				dockTab: "govern"
			};
		})
	};
}, {
	name: "adl-nexus",
	partialize: (s) => ({
		gold: s.gold,
		files: s.files,
		activeFile: s.activeFile,
		log: s.log.slice(-40),
		tasks: s.tasks,
		plan: s.plan,
		messages: s.messages.slice(-24),
		biz: s.biz,
		lastRun: s.lastRun ?? null,
		runs: (s.runs ?? []).slice(0, 12),
		feats: (s.feats ?? []).slice(0, 32),
		crewGold: s.crewGold ?? 0,
		light: s.light ?? "on",
		briefed: s.briefed ?? false,
		club: s.club,
		queue: hydrateQueue(s.queue),
		policies: hydratePolicies(s.policies)
	}),
	merge: (persisted, current) => {
		const p = persisted ?? {};
		const light = p.light ?? (p.dim ? "dim" : "on");
		return {
			...current,
			...p,
			biz: hydrateBiz(p.biz),
			feats: p.feats ?? [],
			crewGold: p.crewGold ?? 0,
			briefed: p.briefed ?? false,
			club: hydrateClub(p.club),
			queue: hydrateQueue(p.queue),
			policies: hydratePolicies(p.policies),
			light,
			dim: light === "dim"
		};
	}
}));
function DecisionPanel() {
	const id = useNexus((s) => s.selectedNode);
	const close = useNexus((s) => s.selectNode);
	const proposal = useNexus((s) => s.activeProposal);
	const reality = useNexus((s) => s.lastReality);
	const rec = id ? DECISIONS[id] : void 0;
	const live = id?.startsWith("live-") && proposal;
	if (!id || !rec && !live && GRAPH_NODES.find((n) => n.id === id)?.kind !== "decision") return null;
	const title = rec?.title ?? proposal?.goal ?? "Decision";
	const problem = rec?.problem ?? reality?.whatIf ?? "Constructed from the last THINK.";
	const options = rec?.options ?? reality?.possibleActions ?? [];
	const evidence = rec?.evidence ?? (reality ? reality.knownFacts : []);
	const confidence = rec?.confidence ?? proposal?.evidence.confidence ?? 0;
	const workflow = rec?.workflow ?? [{
		agent: proposal?.workforceHint ?? "ops",
		output: proposal?.goal ?? "",
		status: proposal?.status ?? "proposed"
	}];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "absolute inset-y-0 right-0 z-20 flex w-full max-w-md flex-col border-l border-cmd-line bg-cmd-elev shadow-[0_0_0_1px_#1e2a36] md:w-[26rem]",
		role: "dialog",
		"aria-label": "Decision history",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-start justify-between gap-3 border-b border-cmd-line px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] uppercase tracking-wide text-cmd-mute",
				children: "Decision history"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 text-lg font-medium text-cmd-fg",
				children: title
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => close(null),
				className: "min-h-11 min-w-11 text-cmd-mute",
				"aria-label": "Close decision",
				children: "Close"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-3 text-sm text-cmd-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
					kicker: "Problem",
					body: problem
				}),
				options.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-wide text-cmd-mute",
					children: "Options considered"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-1 list-disc space-y-1 pl-4",
					children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: o }, o))
				})] }) : null,
				rec ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
					kicker: "Plan / code",
					body: rec.plan
				}) : null,
				rec ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
					kicker: "Research",
					body: rec.research
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] uppercase tracking-wide text-cmd-mute",
						children: "Reality evidence"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 tabular-nums text-cmd-accent",
						children: [
							"confidence ",
							(confidence * 100).toFixed(0),
							"%"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-1 list-disc space-y-1 pl-4",
						children: evidence.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: e }, e))
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
					kicker: "Human approver",
					body: rec?.approver ?? "Operator — authorize required"
				}),
				rec?.actions.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-wide text-cmd-mute",
					children: "Actions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-1 list-disc space-y-1 pl-4",
					children: rec.actions.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: a }, a))
				})] }) : null,
				rec?.outcomes.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-wide text-cmd-mute",
					children: "Outcomes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-1 list-disc space-y-1 pl-4",
					children: rec.outcomes.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: a }, a))
				})] }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-wide text-cmd-mute",
					children: "Execution workflow"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-2 space-y-2",
					children: workflow.map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "border border-cmd-line px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] text-cmd-accent",
							children: [
								w.agent,
								" · ",
								w.status
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5",
							children: w.output
						})]
					}, `${w.agent}-${i}`))
				})] })
			]
		})]
	});
}
function Block({ kicker, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-[11px] uppercase tracking-wide text-cmd-mute",
		children: kicker
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1 leading-5",
		children: body
	})] });
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function KnowledgeGraph() {
	const selected = useNexus((s) => s.selectedNode);
	const selectNode = useNexus((s) => s.selectNode);
	const proposal = useNexus((s) => s.activeProposal);
	const [pan, setPan] = (0, import_react.useState)({
		x: 0,
		y: 0,
		k: 1
	});
	const drag = (0, import_react.useRef)(null);
	const nodes = (0, import_react.useMemo)(() => {
		const extra = [];
		if (proposal) extra.push({
			id: `live-${proposal.id}`,
			kind: "decision",
			label: "Decision · live",
			x: 500,
			y: 400,
			detail: proposal.goal
		});
		return [...GRAPH_NODES, ...extra];
	}, [proposal]);
	const onWheel = (e) => {
		const next = Math.min(2.2, Math.max(.55, pan.k * (e.deltaY > 0 ? .92 : 1.08)));
		setPan((p) => ({
			...p,
			k: next
		}));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative flex min-h-0 min-w-0 flex-1 flex-col border border-cmd-line bg-cmd-elev",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between border-b border-cmd-line px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-[11px] font-medium tracking-wide text-cmd-mute",
					children: "MEMORY MAP"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-cmd-mute",
					children: "scroll to zoom · drag canvas · click a node"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				viewBox: "0 0 800 460",
				className: "min-h-0 flex-1 touch-none",
				onWheel,
				onPointerDown: (e) => {
					if (e.target.dataset.node) return;
					drag.current = {
						x: pan.x,
						y: pan.y,
						px: e.clientX,
						py: e.clientY
					};
					e.currentTarget.setPointerCapture(e.pointerId);
				},
				onPointerMove: (e) => {
					if (!drag.current) return;
					setPan({
						...pan,
						x: drag.current.x + (e.clientX - drag.current.px),
						y: drag.current.y + (e.clientY - drag.current.py)
					});
				},
				onPointerUp: () => {
					drag.current = null;
				},
				role: "img",
				"aria-label": "Knowledge graph",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					transform: `translate(${pan.x} ${pan.y}) scale(${pan.k})`,
					children: [GRAPH_EDGES.map((e) => {
						const a = nodes.find((n) => n.id === e.from);
						const b = nodes.find((n) => n.id === e.to);
						if (!a || !b) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: a.x,
							y1: a.y,
							x2: b.x,
							y2: b.y,
							stroke: "#1e2a36",
							strokeWidth: "1.5"
						}) }, `${e.from}-${e.to}`);
					}), nodes.map((n) => {
						const on = selected === n.id;
						const r = n.kind === "decision" ? 16 : 12;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
							"data-node": "1",
							transform: `translate(${n.x} ${n.y})`,
							className: "cursor-pointer",
							onClick: (ev) => {
								ev.stopPropagation();
								selectNode(n.id);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								r: on ? r + 4 : r,
								fill: KIND_COLOR[n.kind],
								opacity: on ? 1 : .88,
								stroke: on ? "#e6eef4" : "#07090c",
								strokeWidth: on ? 2 : 1
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
								y: r + 14,
								textAnchor: "middle",
								fill: "#c5d0db",
								fontSize: "10",
								fontFamily: "ui-sans-serif, system-ui, sans-serif",
								children: n.label
							})]
						}, n.id);
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-wrap gap-3 border-t border-cmd-line px-3 py-1.5 text-[10px] text-cmd-mute",
				children: Object.entries(KIND_COLOR).map(([k, c]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-block h-2 w-2 rounded-full",
						style: { background: c }
					}), k]
				}, k))
			})
		]
	});
}
function NodeHint() {
	const selected = useNexus((s) => s.selectedNode);
	const node = GRAPH_NODES.find((n) => n.id === selected);
	if (!node || node.kind === "decision") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: cn("border-t border-cmd-line px-3 py-2 text-sm text-cmd-fg"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[11px] uppercase tracking-wide text-cmd-mute",
			children: node.kind
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-1 block",
			children: node.detail
		})]
	});
}
function DeskSheet({ title, kicker, onClose, children, wide, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("desk-veil", className),
		role: "dialog",
		"aria-modal": "true",
		"aria-label": title,
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("sheet-card pixel-border", wide && "sheet-wide"),
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between gap-3 border-b border-cream/15 px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-pixel text-[8px] text-muted",
						children: kicker
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-body text-2xl leading-7 text-cream",
						children: title
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					className: "flex min-h-11 min-w-11 shrink-0 items-center justify-center text-cream",
					"aria-label": "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-y-auto p-3",
				children
			})]
		})
	});
}
function analogParts(d) {
	const h = d.getHours() % 12;
	const m = d.getMinutes();
	const s = d.getSeconds();
	return {
		hour: h * 30 + m * .5,
		min: m * 6,
		sec: s * 6,
		digital: d.toTimeString().slice(0, 8)
	};
}
function AnalogClock({ className }) {
	const [now, setNow] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setNow(analogParts(/* @__PURE__ */ new Date()));
		const id = window.setInterval(() => setNow(analogParts(/* @__PURE__ */ new Date())), 1e3);
		return () => window.clearInterval(id);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "clock-face mx-auto",
			children: now ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "clock-hand",
					style: {
						height: "28%",
						width: "4px",
						transform: `translateX(-50%) rotate(${now.hour}deg)`
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "clock-hand",
					style: {
						height: "38%",
						width: "3px",
						transform: `translateX(-50%) rotate(${now.min}deg)`
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "clock-hand bg-danger",
					style: {
						height: "42%",
						width: "2px",
						transform: `translateX(-50%) rotate(${now.sec}deg)`
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "clock-hub" })
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "clock-hub" })
		})
	});
}
function tzTime(tz, d) {
	return new Intl.DateTimeFormat("en-GB", {
		timeZone: tz,
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false
	}).format(d);
}
function ClockDesk({ onClose }) {
	const grantFeat = useNexus((s) => s.grantFeat);
	const [now, setNow] = (0, import_react.useState)(null);
	const [running, setRunning] = (0, import_react.useState)(false);
	const [elapsed, setElapsed] = (0, import_react.useState)(0);
	const [origin, setOrigin] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		setNow(/* @__PURE__ */ new Date());
		const id = window.setInterval(() => setNow(/* @__PURE__ */ new Date()), 1e3);
		return () => window.clearInterval(id);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!running) return;
		let raf = 0;
		const loop = (t) => {
			setElapsed(t - origin);
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, [running, origin]);
	const secs = Math.floor(elapsed / 1e3);
	const ms = Math.floor(elapsed % 1e3).toString().padStart(3, "0");
	const stamp = `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}.${ms}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DeskSheet, {
		title: "Operations clock",
		kicker: "WALL CLOCK",
		onClose,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 md:grid-cols-[9rem_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalogClock, { className: "w-36" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-pixel text-lg tabular-nums text-gold",
					children: now ? now.toTimeString().slice(0, 8) : "--:--:--"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-body text-xl text-cream",
					children: now ? now.toDateString() : "Syncing"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 grid grid-cols-2 gap-2",
					children: WORLD_CLOCKS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "border-2 border-ink bg-ink px-2 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-pixel text-[8px] text-gold",
							children: c.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-body text-2xl tabular-nums leading-7 text-cream",
							children: now ? tzTime(c.tz, now) : "--:--:--"
						})]
					}, c.id))
				})
			] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 border-t-2 border-ink pt-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-pixel text-[8px] text-gold",
					children: "STOPWATCH"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-pixel text-xl tabular-nums text-cream",
					children: stamp
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 bg-gold px-4 font-pixel text-[10px] text-ink",
						onClick: () => {
							if (running) setRunning(false);
							else {
								setOrigin(performance.now() - elapsed);
								setRunning(true);
								grantFeat("timer");
							}
						},
						children: running ? "STOP" : "START"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 bg-cream px-4 font-pixel text-[10px] text-ink",
						onClick: () => {
							setRunning(false);
							setElapsed(0);
						},
						children: "RESET"
					})]
				})
			]
		})]
	});
}
function FilesDesk({ onClose }) {
	const log = useNexus((s) => s.log);
	const tasks = useNexus((s) => s.tasks);
	const events = useNexus((s) => s.events);
	const lastRun = useNexus((s) => s.lastRun);
	const memory = useNexus((s) => s.biz.memory ?? []);
	const versions = useNexus((s) => s.biz.versions ?? []);
	const files = useNexus((s) => s.files);
	const scan = files["SCAN.md"];
	const sunder = files["SUNDER.md"];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DeskSheet, {
		title: "Provenance cabinet",
		kicker: "FILE DRAWERS",
		onClose,
		children: [
			lastRun ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-pixel text-[8px] text-gold",
						children: "LAST HASH"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 break-all font-body text-xl text-cream",
						children: lastRun.hash
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 font-body text-lg text-muted",
						children: [
							lastRun.title,
							" · ",
							lastRun.ok ? "ok" : "refused",
							" · ",
							lastRun.detail
						]
					})
				]
			}) : null,
			scan || sunder ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-pixel text-[8px] text-gold",
					children: "SCAN / SUNDER"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "mt-2 whitespace-pre-wrap font-body text-lg text-cream",
					children: (sunder || scan || "").slice(0, 600)
				})]
			}) : null,
			versions.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-pixel text-[8px] text-gold",
					children: "DESIGN VERSIONS"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-1 font-body text-xl text-cream",
					children: versions.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "break-all",
						children: [
							v.hash.slice(0, 16),
							" · ",
							v.files.length,
							" files"
						]
					}, v.hash))
				})]
			}) : null,
			memory.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-pixel text-[8px] text-gold",
					children: "CLEAN ROOM"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-1 font-body text-xl text-muted",
					children: memory.slice(0, 8).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "break-all",
						children: [
							m.key,
							" · ",
							m.hash.slice(0, 12)
						]
					}, m.hash))
				})]
			}) : null,
			tasks.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-pixel text-[8px] text-gold",
				children: "ASSIGNMENTS"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 space-y-1 font-body text-xl text-cream",
				children: tasks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					t.status,
					" · ",
					t.role,
					" · ",
					t.goal
				] }, t.id))
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-body text-xl text-muted",
				children: "No committed work yet. Whiteboard first."
			}),
			log.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-pixel text-[8px] text-gold",
					children: "LEDGER"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-1 font-body text-xl text-cream",
					children: log.slice().reverse().slice(0, 12).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						e.kind,
						" · ",
						new Date(e.ts).toTimeString().slice(0, 8),
						" · ",
						e.proposalId.slice(0, 8)
					] }, e.id))
				})]
			}) : null,
			events.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-pixel text-[8px] text-gold",
					children: "TOOL TRACE"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-1 font-body text-xl text-muted",
					children: events.slice(-10).map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						e.actor,
						" · ",
						e.name,
						" · ",
						e.detail
					] }, `${e.name}-${i}`))
				})]
			}) : null
		]
	});
}
function RealityPanel({ embedded = false }) {
	const reality = useNexus((s) => s.lastReality);
	const proposal = useNexus((s) => s.activeProposal);
	const events = useNexus((s) => s.events);
	const resetCycle = useNexus((s) => s.resetCycle);
	const working = useNexus((s) => s.working);
	const plan = useNexus((s) => s.plan);
	const checks = useNexus((s) => s.checks);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: cn(embedded ? "w-full" : "pixel-border hidden w-72 shrink-0 overflow-y-auto bg-panel p-3 lg:block"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-pixel text-[10px] text-gold",
					children: "Horizon"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: resetCycle,
					className: "min-h-11 px-2 font-pixel text-[8px] text-muted",
					children: "CLEAR"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-body text-lg text-cream",
				children: working.length ? `Working: ${working.join(", ")}` : "Idle — still listening."
			}),
			plan.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-3 list-decimal space-y-1 pl-4 font-body text-lg",
				children: plan.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: s.done ? "text-ok" : "text-cream",
					children: [
						s.done ? "done" : "open",
						" · ",
						s.title,
						" (",
						s.owner,
						")"
					]
				}, s.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-body text-lg text-muted",
				children: "No long-horizon plan yet. A build will lock one."
			}),
			checks.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-1 font-body text-lg",
				children: checks.slice(-8).map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: c.startsWith("PASS") ? "text-ok" : "text-danger",
					children: c
				}, i))
			}) : null,
			events.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-1 font-body text-lg text-muted",
				children: events.slice(-6).map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					e.actor,
					" · ",
					e.name
				] }, `${e.name}-${i}`))
			}) : null,
			reality && proposal ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 border-t-2 border-ink pt-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-pixel text-[8px] uppercase text-gold",
						children: reality.scenarioType
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 font-pixel text-[8px] text-cream",
						children: [
							proposal.pathwayTitle ?? proposal.pathway ?? "assign",
							" · ",
							proposal.status
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-body text-lg",
						children: reality.whatIf
					})
				]
			}) : null
		]
	});
}
function PlanDesk({ onClose }) {
	const think = useNexus((s) => s.think);
	const authorize = useNexus((s) => s.authorize);
	const commit = useNexus((s) => s.commit);
	const send = useNexus((s) => s.send);
	const openOverlay = useNexus((s) => s.openOverlay);
	const setView = useNexus((s) => s.setView);
	const proposal = useNexus((s) => s.activeProposal);
	const lastRun = useNexus((s) => s.lastRun);
	const runs = useNexus((s) => s.runs);
	const plan = useNexus((s) => s.plan);
	const feats = useNexus((s) => s.feats);
	const gold = useNexus((s) => s.gold);
	const crewGold = useNexus((s) => s.crewGold);
	const canAuth = !!proposal && !proposal.authorized;
	const canCommit = !!proposal && proposal.authorized && !proposal.executed;
	const thinking = plan.filter((s) => !s.done);
	const authCol = proposal && !proposal.executed ? [proposal] : [];
	const done = (runs ?? []).filter((r) => r.ok).slice(0, 6);
	const runItem = (c) => {
		if (c.status === "capped") return;
		if (c.overlay && c.overlay !== "plan") {
			onClose();
			openOverlay(c.overlay);
			return;
		}
		if (c.send) {
			onClose();
			send(c.send);
			return;
		}
		if (c.think) think(c.think);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DeskSheet, {
		title: "Horizon board",
		kicker: "MISSION CORE",
		onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-body text-xl text-muted",
				children: [
					"Tap a live item to open it. GOVERN still holds COMMIT. ",
					liveCount(),
					" live on this floor. T4–T5 are capped."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "kanban mt-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "kanban-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-pixel text-[8px] text-muted",
							children: "THINK"
						}), thinking.length ? thinking.slice(0, 5).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 font-body text-lg text-cream",
							children: [
								s.title,
								" · ",
								s.owner
							]
						}, s.id)) : proposal && !proposal.authorized ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-body text-lg text-cream",
							children: proposal.pathwayTitle ?? proposal.goal.slice(0, 42)
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-body text-lg text-muted",
							children: "Empty. State an objective."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "kanban-col",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-pixel text-[8px] text-muted",
								children: "AUTH"
							}),
							authCol.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 font-body text-lg text-cream",
								children: [
									p.authorized ? "Authorized" : "Waiting",
									" · ",
									(p.pathwayTitle ?? p.pathway ?? "assign").toUpperCase()
								]
							}, p.id)),
							!authCol.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-body text-lg text-muted",
								children: "Gate closed."
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "kanban-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-pixel text-[8px] text-muted",
							children: "COMMIT"
						}), done.length ? done.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 font-body text-lg text-cream",
							children: [
								r.title,
								" · ",
								r.hash.slice(0, 8)
							]
						}, r.id)) : lastRun ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 font-body text-lg text-cream",
							children: [
								lastRun.title,
								" · ",
								lastRun.hash.slice(0, 8)
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-body text-lg text-muted",
							children: "No hashed run yet."
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => think(),
						className: "min-h-11 bg-cream px-4 font-pixel text-[10px] text-ink",
						children: "THINK"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: authorize,
						disabled: !canAuth,
						className: "min-h-11 bg-cream px-4 font-pixel text-[10px] text-ink disabled:opacity-40",
						children: "AUTHORIZE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => void commit(),
						disabled: !canCommit,
						className: "min-h-11 bg-ok px-4 font-pixel text-[10px] text-cream disabled:opacity-40",
						children: "COMMIT"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							onClose();
							setView("command");
						},
						className: "min-h-11 px-4 font-pixel text-[10px] text-muted",
						children: "GRAPH"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-5 font-pixel text-[8px] text-gold",
				children: "LIVE MAP"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 font-body text-lg text-muted",
				children: [
					"YOU ",
					gold.toLocaleString(),
					" · CREW ",
					crewGold,
					" · FEATS ",
					(feats ?? []).length,
					"/",
					FEATS.length
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-body text-lg text-muted",
				children: "Missions are live capabilities. XP is hashed COMMITs, not talk."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2",
				children: CODEX.filter((c) => c.tier <= 3).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => runItem(c),
					className: cn("flex min-h-11 w-full items-center justify-between gap-2 px-2 text-left", c.status === "capped" ? "text-muted" : "text-cream"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-body text-lg",
						children: [
							"T",
							c.tier,
							" · ",
							c.title
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-pixel text-[7px] text-muted",
						children: c.status
					})]
				}) }, c.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-4 font-pixel text-[8px] text-muted",
				children: "CAPPED"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-1 font-body text-lg text-muted",
				children: CODEX.filter((c) => c.tier >= 4).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					"T",
					c.tier,
					" · ",
					c.title,
					" — ",
					c.claim
				] }, c.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-4 font-pixel text-[8px] text-gold",
				children: "ACHIEVEMENTS"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-1 grid grid-cols-2 gap-1",
				children: FEATS.map((f) => {
					const on = (feats ?? []).includes(f.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: cn("font-body text-lg", on ? "text-cream" : "text-muted"),
						children: [
							on ? "got" : "—",
							" ",
							f.title
						]
					}, f.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RealityPanel, { embedded: true })
		]
	});
}
function SimDesk({ onClose }) {
	const biz = useNexus((s) => s.biz);
	const gold = useNexus((s) => s.gold);
	const runs = useNexus((s) => s.runs);
	const setRules = useNexus((s) => s.setRules);
	const armWatch = useNexus((s) => s.armWatch);
	const inbound = useNexus((s) => s.inbound);
	const think = useNexus((s) => s.think);
	const toggleAuto = useNexus((s) => s.toggleAuto);
	const rules = hydrateRules(biz.rules);
	const stats = plantStats(biz);
	const positions = bookPositions(biz.fills ?? []);
	const holds = (biz.orders ?? []).filter((o) => o.status === "held");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DeskSheet, {
		title: "Plant board",
		kicker: "FACTORY",
		onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-body text-xl text-muted",
				children: "Set LOW AT / BUY. A short inbound parks a HOLD. Arm watches here. AUTO AUTH. COMMIT needs a signed cap or you."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 font-body text-xl text-cream",
				children: [
					biz.halted ? "HALTED. " : "LIVE-LOCAL. ",
					"Gold ",
					gold.toLocaleString(),
					" · DD ",
					((biz.drawdown ?? 0) * 100).toFixed(1),
					"% · AUTO ",
					biz.autoOps ? "ON" : "off",
					" · HOLD",
					" ",
					stats.holds
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						id: "btn-plant-auto",
						onClick: toggleAuto,
						className: cn("min-h-11 px-3 font-pixel text-[8px]", biz.autoOps ? "bg-cream text-ink" : "text-cream"),
						children: biz.autoOps ? "AUTO ON" : "AUTO OPS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						id: "btn-plant-inbound",
						onClick: () => void inbound(),
						className: "min-h-11 bg-cream px-3 font-pixel text-[8px] text-ink",
						children: ["ORDER ", rules.inboundQty]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						id: "btn-plant-drain",
						onClick: () => think("drain held orders"),
						className: "min-h-11 bg-wood px-3 font-pixel text-[8px] text-cream",
						children: "DRAIN"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-4 font-pixel text-[8px] text-gold",
				children: "RULES"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-body text-lg text-muted",
				children: `If ${rules.sku} on hand < ${rules.lowAt}, buy ${rules.restockQty}.`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rule-grid mt-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "font-pixel text-[8px] text-gold",
						children: ["SKU", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: rules.sku,
							onChange: (e) => setRules({ sku: e.target.value }),
							className: "mt-1 min-h-11 w-full border-2 border-ink bg-cream px-2 font-body text-xl text-ink",
							children: (biz.offerings ?? []).map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: o.id,
								children: [
									o.id,
									" · ",
									o.name
								]
							}, o.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "font-pixel text-[8px] text-gold",
						children: ["LOW AT", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: 1,
							max: 500,
							value: rules.lowAt,
							onChange: (e) => setRules({ lowAt: Number(e.target.value) }),
							className: "mt-1 min-h-11 w-full border-2 border-ink bg-cream px-2 font-body text-xl text-ink"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "font-pixel text-[8px] text-gold",
						children: ["BUY", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: 1,
							max: 500,
							value: rules.restockQty,
							onChange: (e) => setRules({ restockQty: Number(e.target.value) }),
							className: "mt-1 min-h-11 w-full border-2 border-ink bg-cream px-2 font-body text-xl text-ink"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "font-pixel text-[8px] text-gold",
						children: ["IN", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: 1,
							max: 500,
							value: rules.inboundQty,
							onChange: (e) => setRules({ inboundQty: Number(e.target.value) }),
							className: "mt-1 min-h-11 w-full border-2 border-ink bg-cream px-2 font-body text-xl text-ink"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-4 font-pixel text-[8px] text-gold",
				children: "WATCHES"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 divide-y divide-cream/10",
				children: WATCH_DEFS.map((w) => {
					const row = biz.watches?.[w.id];
					const on = !!row?.armed;
					const copy = watchCopy(w.id, rules);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-2 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-pixel text-[8px] text-gold",
								children: [
									w.chip,
									" · ",
									w.title
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-body text-lg text-muted",
								children: row?.lastReason || copy.when
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => armWatch(w.id, !on),
							className: cn("min-h-11 min-w-16 px-2 font-pixel text-[8px]", on ? "bg-cream text-ink" : "text-cream ring-1 ring-cream/20"),
							children: on ? "ARMED" : "ARM"
						})]
					}, w.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-4 font-pixel text-[8px] text-gold",
				children: "STOCK"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-1 font-body text-xl text-cream",
				children: Object.entries(biz.stock ?? {}).map(([sku, n]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: sku === rules.sku && n < rules.lowAt ? "text-gold" : void 0,
					children: [
						sku,
						" · ",
						n,
						" on hand",
						sku === rules.sku && n < rules.lowAt ? " · LOW" : ""
					]
				}, sku))
			}),
			holds.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-4 font-pixel text-[8px] text-gold",
				children: "HOLDS"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-1 font-body text-xl text-cream",
				children: holds.slice(0, 8).map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					"HELD ",
					o.qty,
					" ",
					o.sku,
					" · owed ",
					o.remaining
				] }, o.id))
			})] }) : null,
			positions.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-4 font-pixel text-[8px] text-gold",
				children: "PAPER BOOK"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-1 font-body text-xl text-cream",
				children: positions.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					p.symbol,
					" · ",
					p.qty,
					" @ ",
					p.avg
				] }, p.symbol))
			})] }) : null,
			runs?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-4 font-pixel text-[8px] text-gold",
				children: "RUNS"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-1 max-h-28 overflow-y-auto font-body text-lg text-muted",
				children: runs.slice(0, 8).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					r.ok ? "ok" : "no",
					" · ",
					r.hash.slice(0, 12),
					" · ",
					r.title
				] }, r.id))
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-4 min-h-11 bg-wood px-3 font-pixel text-[8px] text-cream",
				onClick: () => think(`scan market ${rules.symbol}`),
				children: "SCAN NOW"
			})
		]
	});
}
function WeatherDesk({ onClose }) {
	const send = useNexus((s) => s.send);
	const grantFeat = useNexus((s) => s.grantFeat);
	const [place, setPlace] = (0, import_react.useState)("Nassau Bahamas");
	const [snap, setSnap] = (0, import_react.useState)(null);
	const [err, setErr] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function load(q) {
		setBusy(true);
		setErr(null);
		try {
			setSnap(await fetchWeather(q));
			grantFeat("sky");
		} catch (e) {
			setErr(e instanceof Error ? e.message : "Weather failed");
		} finally {
			setBusy(false);
		}
	}
	(0, import_react.useEffect)(() => {
		load(place);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DeskSheet, {
		title: "Outside window",
		kicker: "LIVE SKY",
		onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-2 sm:flex-row",
				onSubmit: (e) => {
					e.preventDefault();
					load(place);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "sr-only",
						htmlFor: "wx-place",
						children: "Place"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "wx-place",
						value: place,
						onChange: (e) => setPlace(e.target.value),
						className: "min-h-12 flex-1 border-2 border-ink bg-cream px-3 font-body text-2xl text-ink outline-none"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: busy,
						className: "min-h-12 bg-gold px-4 font-pixel text-[10px] text-ink disabled:opacity-50",
						children: "LOOK"
					})
				]
			}),
			busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-body text-xl text-muted",
				children: "Looking outside…"
			}) : null,
			err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-body text-xl text-danger",
				children: err
			}) : null,
			snap ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 border-2 border-ink bg-ink p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-pixel text-[10px] text-gold",
						children: [
							snap.place,
							", ",
							snap.country
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 font-pixel text-3xl tabular-nums text-cream",
						children: [Math.round(snap.temp), "°C"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-body text-2xl text-cream",
						children: snap.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 font-body text-xl text-muted",
						children: [
							"Wind ",
							Math.round(snap.wind),
							" km/h"
						]
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-4 min-h-11 bg-wood px-4 font-pixel text-[10px] text-cream",
				onClick: () => {
					onClose();
					send(`How's the weather in ${place}?`);
				},
				children: "ASK RECEPTION TOO"
			})
		]
	});
}
/** Desks that live on the office floor. Rooms (arcade, library, compute, exchange) are halls, not sheets. */
function OfficeOverlay() {
	const overlay = useNexus((s) => s.overlay);
	const close = useNexus((s) => s.closeOverlay);
	(0, import_react.useEffect)(() => {
		if (!overlay) return;
		const onKey = (e) => {
			if (e.key === "Escape") close();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [overlay, close]);
	if (!overlay) return null;
	if (overlay === "clock") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClockDesk, { onClose: close });
	if (overlay === "weather") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeatherDesk, { onClose: close });
	if (overlay === "files") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilesDesk, { onClose: close });
	if (overlay === "plan") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanDesk, { onClose: close });
	if (overlay === "sim") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimDesk, { onClose: close });
	return null;
}
function CommandShell() {
	const setView = useNexus((s) => s.setView);
	const selected = useNexus((s) => s.selectedNode);
	const selectNode = useNexus((s) => s.selectNode);
	const decisionOpen = !!(selected && (DECISIONS[selected] || selected.startsWith("live-")));
	const [pane, setPane] = (0, import_react.useState)("graph");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "command relative flex h-dvh flex-col overflow-hidden bg-cmd text-cmd-fg pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, { onFloor: () => setView("floor") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alerts, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("relative flex min-h-0 flex-1 flex-col md:flex-row", decisionOpen && "md:pr-0"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("flex min-h-0 min-w-0 flex-1 flex-col", decisionOpen && "opacity-40"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-1 border-b border-cmd-line px-2 py-1 md:hidden",
							children: [
								"graph",
								"objectives",
								"workforce",
								"feed"
							].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setPane(p),
								className: cn("min-h-11 flex-1 px-2 text-[11px] uppercase tracking-wide", pane === p ? "bg-cmd-elev text-cmd-accent" : "text-cmd-mute"),
								children: p
							}, p))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-h-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("hidden w-72 shrink-0 overflow-y-auto border-r border-cmd-line md:block", pane === "objectives" && "block"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ObjectiveTree, {})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: cn("min-h-0 min-w-0 flex-1 flex-col", pane === "graph" ? "flex" : "hidden md:flex"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KnowledgeGraph, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NodeHint, {})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("hidden w-72 shrink-0 overflow-y-auto border-l border-cmd-line md:block", pane === "workforce" && "block w-full"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkforcePanel, {})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn(pane === "feed" ? "block" : "hidden md:block"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityFeed, { highlight: selected })
						})
					]
				}), decisionOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DecisionPanel, {}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitors, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandBar, {}),
			decisionOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "absolute inset-0 z-10 bg-cmd/40 md:hidden",
				"aria-label": "Dismiss decision",
				onClick: () => selectNode(null)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfficeOverlay, {})
		]
	});
}
function TopBar({ onFloor }) {
	const [time, setTime] = (0, import_react.useState)("--:--");
	const busy = useNexus((s) => s.busy);
	(0, import_react.useEffect)(() => {
		const tick = () => setTime((/* @__PURE__ */ new Date()).toTimeString().slice(0, 5));
		tick();
		const id = window.setInterval(tick, 1e3);
		return () => window.clearInterval(id);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex flex-wrap items-center justify-between gap-2 border-b border-cmd-line px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] uppercase tracking-[0.2em] text-cmd-mute",
			children: "ADL NEXUS"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-sm font-medium",
			children: "Command graph · same office"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("px-2 py-1 text-[11px] uppercase", busy ? "bg-cmd-accent text-cmd" : "border border-cmd-line text-cmd-mute"),
					children: busy ? "Working" : "Idle"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden px-2 py-1 text-[11px] text-cmd-mute sm:inline tabular-nums",
					children: time
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden gap-1 md:flex",
					children: LOOP.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "border border-cmd-line px-1.5 py-0.5 text-[9px] text-cmd-mute",
						children: l.slice(0, 3)
					}, l))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onFloor,
					className: "min-h-11 border border-cmd-line px-3 text-[11px] uppercase",
					children: "Floor"
				})
			]
		})]
	});
}
function Alerts() {
	const err = useNexus((s) => s.lastError);
	const reality = useNexus((s) => s.lastReality);
	const items = [
		err ? {
			id: "e",
			level: "danger",
			text: `Policy: ${err}`
		} : null,
		{
			id: "s",
			level: "ok",
			text: "Execution sandbox ready (lab IDE, local files)"
		},
		reality ? {
			id: "r",
			level: "warn",
			text: "New evidence gathered — Reality State on the board"
		} : {
			id: "g",
			level: "ok",
			text: "Governance-3 idle — no deviation"
		}
	].filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "flex gap-2 overflow-x-auto border-b border-cmd-line px-3 py-1.5",
		children: items.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
			className: cn("shrink-0 px-2 py-1 text-[11px]", a.level === "danger" ? "bg-danger/20 text-danger" : a.level === "warn" ? "text-cmd-accent" : "text-cmd-mute"),
			children: a.text
		}, a.id))
	});
}
function ObjectiveTree() {
	const selectNode = useNexus((s) => s.selectNode);
	const plan = useNexus((s) => s.plan);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-[11px] font-medium tracking-wide text-cmd-mute",
				children: "OBJECTIVE TREE"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-4",
				children: OBJECTIVES.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => selectNode(o.id),
					className: "w-full text-left",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium",
								children: o.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[11px] tabular-nums text-cmd-mute",
								children: [o.progress, "%"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 h-1 bg-cmd-line",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-1 bg-cmd-accent",
								style: { width: `${o.progress}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-[11px] uppercase text-cmd-mute",
							children: ["risk ", o.risk]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-1 pl-2",
					children: o.children.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: cn("text-[12px]", c.done ? "text-ok" : "text-cmd-mute"),
						children: [
							c.done ? "done" : "open",
							" · ",
							c.title
						]
					}, c.id))
				})] }, o.id))
			}),
			plan.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 border-t border-cmd-line pt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-cmd-mute",
					children: "LIVE PLAN"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-2 list-decimal space-y-1 pl-4 text-[12px]",
					children: plan.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: s.done ? "text-ok" : "",
						children: [
							s.title,
							" · ",
							s.owner
						]
					}, s.id))
				})]
			}) : null
		]
	});
}
function WorkforcePanel() {
	const working = useNexus((s) => s.working);
	const tasks = useNexus((s) => s.tasks);
	const spawn = useNexus((s) => s.spawnWorker);
	const selectRole = useNexus((s) => s.selectRole);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-[11px] font-medium tracking-wide text-cmd-mute",
					children: "WORKFORCE"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => spawn("engineer"),
					className: "min-h-11 border border-cmd-line px-2 text-[11px] uppercase",
					children: "Spawn"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2",
				children: WORKERS.map((w) => {
					const live = working.includes(w.role) ? "active" : w.status;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => selectRole(w.role),
						className: "w-full border border-cmd-line px-2 py-2 text-left",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: w.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("text-[10px] uppercase", live === "active" ? "text-cmd-accent" : live === "blocked" ? "text-danger" : "text-cmd-mute"),
									children: live
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-cmd-mute",
								children: [
									w.title,
									" · ",
									ROLES[w.role].label
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 line-clamp-2 text-[12px]",
								children: w.assignment
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 tabular-nums text-[11px] text-cmd-mute",
								children: [
									w.tokens.toLocaleString(),
									" tok · load ",
									w.load,
									"%"
								]
							})
						]
					}) }, w.id);
				})
			}),
			tasks.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 border-t border-cmd-line pt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-cmd-mute",
					children: "ASSIGNED"
				}), tasks.slice(-4).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-[12px]",
					children: [
						t.status,
						" · ",
						t.role,
						" · ",
						t.goal
					]
				}, t.id))]
			}) : null
		]
	});
}
function ActivityFeed({ highlight }) {
	const events = useNexus((s) => s.events);
	const log = useNexus((s) => s.log);
	const selectNode = useNexus((s) => s.selectNode);
	const items = (0, import_react.useMemo)(() => {
		return [...[...log.slice(-6).map((e) => ({
			id: e.id,
			source: "system",
			title: `${e.kind} · ${e.proposalId.slice(0, 8)}`,
			ts: e.ts,
			nodeId: "dec-horizon"
		})), ...events.slice(-6).map((e, i) => ({
			id: `ev-${i}-${e.name}`,
			source: "system",
			title: `${e.actor} · ${e.name} · ${e.detail}`.slice(0, 88),
			ts: Date.now(),
			nodeId: "repo-nexus"
		}))], ...FEED].sort((a, b) => b.ts - a.ts).slice(0, 8);
	}, [events, log]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "border-t border-cmd-line",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between px-3 py-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-[11px] font-medium tracking-wide text-cmd-mute",
				children: "ACTIVITY FEED"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "hidden gap-2 text-[10px] uppercase text-cmd-mute lg:flex",
				children: INTEGRATIONS.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-1",
					title: `${i.label} ${i.state}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("inline-block h-1.5 w-1.5 rounded-full", i.state === "live" ? "bg-ok" : i.state === "local" ? "bg-cmd-accent" : "bg-cmd-mute") }), i.label]
				}, i.id))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "max-h-28 overflow-y-auto px-3 pb-2",
			children: items.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => f.nodeId && selectNode(f.nodeId),
				className: cn("flex w-full items-baseline justify-between gap-3 py-1 text-left text-[12px]", highlight && f.nodeId === highlight && "text-cmd-accent"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] uppercase text-cmd-mute",
						children: f.source
					}),
					" ",
					f.title
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shrink-0 tabular-nums text-[10px] text-cmd-mute",
					children: new Date(f.ts).toTimeString().slice(0, 5)
				})]
			}) }, f.id))
		})]
	});
}
function Monitors() {
	const gold = useNexus((s) => s.gold);
	const log = useNexus((s) => s.log);
	const lastRun = useNexus((s) => s.lastRun);
	const halted = useNexus((s) => s.biz.halted);
	const autoOps = useNexus((s) => s.biz.autoOps);
	const holds = useNexus((s) => (s.biz.orders ?? []).filter((o) => o.status === "held").length);
	const last = log.at(-1);
	const spend = Math.max(0, 18e3 - gold);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-2 gap-px border-t border-cmd-line bg-cmd-line md:grid-cols-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, {
				label: "Cost guardrail",
				value: `${gold.toLocaleString()} remaining`,
				sub: `spent ${spend.toLocaleString()}`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, {
				label: "Audit trail",
				value: last ? last.kind : "empty",
				sub: `${log.length} entries · hashed`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, {
				label: "Last hash",
				value: lastRun ? lastRun.hash.slice(0, 12) : "none",
				sub: lastRun ? lastRun.title : "no execute yet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, {
				label: "Desk",
				value: halted ? "HALTED" : autoOps ? "AUTO OPS" : lastRun?.ok === false ? "refused" : "paper",
				sub: holds ? `${holds} hold(s) parked` : "AUTO AUTH · policy COMMIT"
			})
		]
	});
}
function Monitor({ label, value, sub }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-cmd px-3 py-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] uppercase tracking-wide text-cmd-mute",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm tabular-nums",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-cmd-mute",
				children: sub
			})
		]
	});
}
function CommandBar() {
	const draft = useNexus((s) => s.goalDraft);
	const setGoalDraft = useNexus((s) => s.setGoalDraft);
	const send = useNexus((s) => s.send);
	const think = useNexus((s) => s.think);
	const authorize = useNexus((s) => s.authorize);
	const commit = useNexus((s) => s.commit);
	const openOverlay = useNexus((s) => s.openOverlay);
	const proposal = useNexus((s) => s.activeProposal);
	const busy = useNexus((s) => s.busy);
	const err = useNexus((s) => s.lastError);
	const canAuth = !!proposal && !proposal.authorized;
	const canCommit = !!proposal && proposal.authorized && !proposal.executed;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "shrink-0 border-t border-cmd-line bg-cmd-elev p-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex flex-nowrap gap-2 overflow-x-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BarBtn, {
						onClick: () => think(),
						label: "Execute work",
						id: "btn-think"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BarBtn, {
						onClick: () => openOverlay("files"),
						label: "Query memory"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BarBtn, {
						onClick: () => openOverlay("plan"),
						label: "Manage projects"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BarBtn, {
						onClick: () => openOverlay("files"),
						label: "Review governance"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BarBtn, {
						onClick: authorize,
						label: "Authorize",
						disabled: !canAuth
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BarBtn, {
						onClick: () => void commit(),
						label: "Commit",
						disabled: !canCommit,
						primary: true
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "sr-only",
						htmlFor: "nexus-goal",
						children: "Command"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "nexus-goal",
						value: draft,
						onChange: (e) => setGoalDraft(e.target.value),
						onKeyDown: (e) => {
							if (e.key === "Enter") send();
						},
						placeholder: "Objective, query, or order…",
						disabled: busy,
						className: "min-h-12 min-w-0 flex-1 border border-cmd-line bg-cmd px-3 text-base text-cmd-fg outline-none placeholder:text-cmd-mute disabled:opacity-50"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						id: "btn-send",
						onClick: () => void send(),
						disabled: busy,
						className: "min-h-12 bg-cmd-accent px-4 text-[11px] uppercase text-cmd disabled:opacity-40",
						children: "Send"
					})
				]
			}),
			err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-danger",
				children: err
			}) : null
		]
	});
}
function BarBtn({ onClick, label, disabled, primary, id }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		id,
		onClick,
		disabled,
		className: cn("min-h-11 px-3 text-[11px] uppercase tracking-wide disabled:opacity-40", primary ? "bg-cmd-accent text-cmd" : "border border-cmd-line text-cmd-fg"),
		children: label
	});
}
function clock() {
	return (/* @__PURE__ */ new Date()).toTimeString().slice(0, 5);
}
function Hud() {
	const gold = useNexus((s) => s.gold);
	const crewGold = useNexus((s) => s.crewGold);
	const tap = useNexus((s) => s.tapObject);
	const biz = useNexus((s) => s.biz);
	const lastRun = useNexus((s) => s.lastRun);
	const overlay = useNexus((s) => s.overlay);
	const briefed = useNexus((s) => s.briefed);
	const room = useNexus((s) => s.room);
	const playingId = useNexus((s) => s.playingId);
	const setRoom = useNexus((s) => s.setRoom);
	const queue = useNexus((s) => s.queue);
	const setDockTab = useNexus((s) => s.setDockTab);
	const pickPacket = useNexus((s) => s.pickPacket);
	const [time, setTime] = (0, import_react.useState)("");
	const stats = plantStats(biz);
	const pulse = stats.halted || stats.holds > 0 || stats.low;
	const quiet = !!overlay || !briefed || !!playingId;
	const waiting = queue.filter((p) => !p.proposal.executed);
	const waitingCount = waiting.length;
	(0, import_react.useEffect)(() => {
		setTime(clock());
		const id = window.setInterval(() => setTime(clock()), 1e3);
		return () => window.clearInterval(id);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: cn("office-hud", quiet && "quiet"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap items-end justify-between gap-x-4 gap-y-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end gap-x-5 gap-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-pixel text-[10px] text-cream md:text-[12px]",
							children: "NEXUS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-pixel text-[10px] text-muted md:text-[12px]",
							children: [
								"GOLD ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums text-cream",
									children: gold
								}),
								crewGold ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted",
									children: [
										" ",
										"CREW ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "tabular-nums text-cream",
											children: crewGold
										})
									]
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-pixel text-[10px] text-muted md:text-[12px]",
							children: [
								stats.sku.toUpperCase(),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums text-cream",
									children: stats.stock
								})
							]
						}),
						waitingCount ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							id: "hud-queue",
							onClick: () => {
								const first = waiting[0];
								if (first) pickPacket(first.id);
								else setDockTab("govern");
							},
							className: "font-pixel text-[10px] hud-pulse text-gold md:text-[12px]",
							"aria-label": `${waitingCount} staged packets waiting in GOVERN`,
							children: ["QUEUE ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums text-cream",
								children: waitingCount
							})]
						}) : pulse ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: cn("font-pixel text-[10px] md:text-[12px]", stats.halted ? "hud-pulse text-danger" : "hud-pulse text-gold"),
							children: stats.halted ? "HALTED" : stats.holds ? `HOLD ${stats.holds}` : "LOW"
						}) : stats.auto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-pixel text-[10px] text-muted md:text-[12px]",
							children: "AUTO"
						}) : null,
						time ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => tap("clock"),
							className: "font-pixel text-[10px] text-muted md:text-[12px]",
							"aria-label": "Open clock",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums text-cream",
								suppressHydrationWarning: true,
								children: time
							})
						}) : null
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "room-rail",
				"aria-label": "Rooms",
				children: ROOM_ORDER.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					id: `btn-room-${id}`,
					onClick: () => setRoom(id),
					className: cn("room-chip", room === id && "on"),
					"aria-label": ROOMS[id].label,
					children: ROOMS[id].chip
				}, id))
			}),
			lastRun ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "hud-cycle mt-1 font-pixel text-[7px] text-muted md:text-[9px]",
				children: [
					lastRun.title.toUpperCase(),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums text-cream",
						children: lastRun.hash.slice(0, 8)
					})
				]
			}) : null
		]
	});
}
function OfficeBriefing() {
	const briefed = useNexus((s) => s.briefed);
	const dismiss = useNexus((s) => s.dismissBrief);
	if (briefed) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DeskSheet, {
		title: "How it works",
		kicker: "ADL NEXUS",
		onClose: dismiss,
		className: "brief-veil",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-body text-xl text-cream",
				children: "ChatDev company. Three rooms. The counter is chat. You hold COMMIT."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				className: "brief-steps mt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-pixel text-[8px] text-gold",
						children: "1"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-body text-xl text-cream",
						children: "LOBBY — talk at the counter. Crew walks the job, rides the lift."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-pixel text-[8px] text-gold",
						children: "2"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-body text-xl text-cream",
						children: "PLAY — arcade, YouTube, Steam. DESK — dropship and paper trade."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-pixel text-[8px] text-gold",
						children: "3"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-body text-xl text-cream",
						children: "THINK → AUTH → COMMIT. Crew stages. Nothing executes without you."
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				id: "btn-enter",
				onClick: dismiss,
				className: "mt-5 min-h-12 w-full bg-cream px-4 font-pixel text-[10px] text-ink",
				children: "ENTER"
			})
		]
	});
}
function CampusFrame({ kicker, title, extra, children, playing }) {
	const setRoom = useNexus((s) => s.setRoom);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("arcade-hall campus-hall", playing && "is-playing"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "arcade-head",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					id: "btn-vault",
					className: "arcade-back",
					onClick: () => setRoom("office"),
					children: "LOBBY"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-pixel text-[8px] text-muted",
						children: kicker
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-body text-xl text-cream",
						children: title
					})]
				}),
				extra
			]
		}), children]
	});
}
function bindCanvas(canvas) {
	const ctx = canvas.getContext("2d");
	if (!ctx) return null;
	const size = {
		w: canvas.clientWidth || 320,
		h: canvas.clientHeight || 220
	};
	const fit = () => {
		const dpr = Math.min(2, window.devicePixelRatio || 1);
		size.w = canvas.clientWidth || 320;
		size.h = canvas.clientHeight || 220;
		canvas.width = Math.floor(size.w * dpr);
		canvas.height = Math.floor(size.h * dpr);
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
	};
	fit();
	const ro = new ResizeObserver(fit);
	ro.observe(canvas);
	return {
		ctx,
		size,
		disconnect: () => ro.disconnect()
	};
}
function runLoop(step, draw) {
	let last = performance.now();
	let acc = 0;
	let raf = 0;
	const STEP = 1 / 60;
	const loop = (t) => {
		const dt = Math.min(.1, (t - last) / 1e3);
		last = t;
		acc += dt;
		while (acc >= STEP) {
			step(STEP);
			acc -= STEP;
		}
		draw();
		raf = requestAnimationFrame(loop);
	};
	raf = requestAnimationFrame(loop);
	return () => cancelAnimationFrame(raf);
}
function loadHero(src) {
	const img = new Image();
	img.crossOrigin = "anonymous";
	img.src = src;
	return img;
}
function blitHero(ctx, img, x, y, w, h, filter = "none") {
	ctx.imageSmoothingEnabled = false;
	ctx.filter = filter;
	if (img.complete && img.naturalWidth) ctx.drawImage(img, x - w / 2, y - h, w, h);
	else {
		ctx.fillStyle = "#e6e1d6";
		ctx.fillRect(x - w / 2, y - h, w, h);
	}
	ctx.filter = "none";
}
var INK$6 = "#1c120c";
var CREAM$6 = "#f6ead0";
var GOLD$5 = "#efc84a";
var OK$4 = "#3d8f6e";
var DANGER$6 = "#c45c3a";
function PaddleGame({ hero = "engineer", onHi }) {
	const canvasRef = (0, import_react.useRef)(null);
	const addGold = useNexus((s) => s.addGold);
	const [hud, setHud] = (0, import_react.useState)({
		score: 0,
		lives: 3,
		hi: 0,
		state: "ready"
	});
	const goldRef = (0, import_react.useRef)(addGold);
	goldRef.current = addGold;
	const hiRef = (0, import_react.useRef)(onHi);
	hiRef.current = onHi;
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const bound = bindCanvas(canvas);
		if (!bound) return;
		const { ctx, size, disconnect } = bound;
		const heroImg = loadHero(heroSprite(hero));
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		let hi = Number(localStorage.getItem("nexus-paddle-hi") || 0);
		const paddle = {
			x: .5,
			w: .2
		};
		const ball = {
			x: .5,
			y: .72,
			vx: .38,
			vy: -.46,
			r: .016
		};
		let bricks = [];
		const sparks = [];
		let score = 0;
		let lives = 3;
		let state = "ready";
		let trauma = 0;
		let flash = 0;
		const keys = /* @__PURE__ */ new Set();
		let lastHud = "";
		function seed() {
			bricks = [];
			const cols = 7;
			const rows = 5;
			const gap = .012;
			const w = (1 - gap * 8) / cols;
			const h = .055;
			for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) bricks.push({
				x: gap + c * .14114285714285715,
				y: .08 + r * .067,
				w,
				h,
				hp: r === 0 ? 2 : 1,
				alive: true
			});
		}
		function resetBall(serve = false) {
			ball.x = paddle.x;
			ball.y = .72;
			ball.vx = serve ? Math.random() > .5 ? .38 : -.38 : 0;
			ball.vy = serve ? -.46 : 0;
		}
		seed();
		resetBall(false);
		window.__controlsTest = {
			getYaw: () => paddle.x,
			getSpeed: () => Math.abs(ball.vx) + Math.abs(ball.vy),
			setKeys: (codes) => {
				keys.clear();
				for (const c of codes) keys.add(c);
			}
		};
		function serve() {
			if (state === "ready") {
				state = "run";
				resetBall(true);
			} else if (state === "win" || state === "lose") {
				score = 0;
				lives = 3;
				state = "ready";
				seed();
				resetBall(false);
			}
			setHud({
				score,
				lives,
				hi,
				state
			});
		}
		function step(dt) {
			if (keys.has("KeyA") || keys.has("ArrowLeft")) paddle.x = Math.max(paddle.w / 2, paddle.x - .9 * dt);
			if (keys.has("KeyD") || keys.has("ArrowRight")) paddle.x = Math.min(1 - paddle.w / 2, paddle.x + .9 * dt);
			if (state === "ready") ball.x = paddle.x;
			trauma = Math.max(0, trauma - dt * 2.4);
			flash = Math.max(0, flash - dt * 4);
			for (const s of sparks) {
				s.x += s.vx * dt;
				s.y += s.vy * dt;
				s.vy += .9 * dt;
				s.life -= dt;
			}
			for (let i = sparks.length - 1; i >= 0; i--) if (sparks[i].life <= 0) sparks.splice(i, 1);
			if (state !== "run") return;
			ball.x += ball.vx * dt;
			ball.y += ball.vy * dt;
			if (ball.x < ball.r) {
				ball.x = ball.r;
				ball.vx *= -1;
			}
			if (ball.x > 1 - ball.r) {
				ball.x = 1 - ball.r;
				ball.vx *= -1;
			}
			if (ball.y < ball.r) {
				ball.y = ball.r;
				ball.vy *= -1;
			}
			const py = .9;
			const half = paddle.w / 2;
			if (ball.vy > 0 && ball.y + ball.r >= py && Math.abs(ball.x - paddle.x) < half + ball.r) {
				const hit = (ball.x - paddle.x) / half;
				ball.vy = -Math.abs(ball.vy);
				ball.vx = hit * .62;
				const spd = Math.min(.95, Math.hypot(ball.vx, ball.vy) * 1.03);
				const ang = Math.atan2(ball.vy, ball.vx);
				ball.vx = Math.cos(ang) * spd;
				ball.vy = Math.sin(ang) * spd;
				ball.y = py - ball.r;
			}
			for (const b of bricks) {
				if (!b.alive) continue;
				if (ball.x > b.x && ball.x < b.x + b.w && ball.y > b.y && ball.y < b.y + b.h) {
					b.hp -= 1;
					if (b.hp <= 0) {
						b.alive = false;
						score += 10;
						goldRef.current(2);
						sparks.push({
							x: b.x + b.w / 2,
							y: b.y,
							vx: .3,
							vy: -.4,
							life: .3
						}, {
							x: b.x + b.w / 2,
							y: b.y,
							vx: -.3,
							vy: -.3,
							life: .3
						});
					} else score += 4;
					ball.vy *= -1;
					trauma = Math.min(1, trauma + .35);
					flash = .18;
					if (score > hi) {
						hi = score;
						localStorage.setItem("nexus-paddle-hi", String(hi));
						hiRef.current?.(hi);
					}
					break;
				}
			}
			if (bricks.every((b) => !b.alive)) {
				state = "win";
				goldRef.current(50);
			}
			if (ball.y > 1.05) {
				lives -= 1;
				trauma = .8;
				if (lives <= 0) state = "lose";
				else {
					state = "ready";
					resetBall(false);
				}
			}
			const snap = `${score}|${lives}|${state}`;
			if (snap !== lastHud) {
				lastHud = snap;
				setHud({
					score,
					lives,
					hi,
					state
				});
			}
		}
		function draw() {
			const { w, h } = size;
			const shake = reduce ? 0 : trauma * trauma * 8;
			ctx.save();
			ctx.fillStyle = INK$6;
			ctx.fillRect(0, 0, w, h);
			ctx.translate((Math.random() - .5) * shake, (Math.random() - .5) * shake);
			if (flash > 0) {
				ctx.fillStyle = `rgba(246,234,208,${flash * .3})`;
				ctx.fillRect(0, 0, w, h);
			}
			for (const b of bricks) {
				if (!b.alive) continue;
				ctx.fillStyle = b.hp > 1 ? GOLD$5 : OK$4;
				ctx.fillRect(b.x * w, b.y * h, b.w * w, b.h * h);
			}
			ctx.fillStyle = CREAM$6;
			ctx.fillRect((paddle.x - paddle.w / 2) * w, .9 * h, paddle.w * w, .028 * h);
			blitHero(ctx, heroImg, paddle.x * w, .9 * h + 2, 28, 36, CREW_FILTER[hero]);
			ctx.fillStyle = DANGER$6;
			ctx.beginPath();
			ctx.arc(ball.x * w, ball.y * h, ball.r * w, 0, Math.PI * 2);
			ctx.fill();
			for (const s of sparks) {
				ctx.globalAlpha = Math.max(0, s.life * 3);
				ctx.fillStyle = GOLD$5;
				ctx.fillRect(s.x * w, s.y * h, 3, 3);
				ctx.globalAlpha = 1;
			}
			if (state !== "run") {
				ctx.fillStyle = "rgba(28,18,12,0.7)";
				ctx.fillRect(0, h * .4, w, 36);
				ctx.fillStyle = GOLD$5;
				ctx.font = "10px 'Press Start 2P', monospace";
				const msg = state === "win" ? "SEALED" : state === "lose" ? "LEAK" : "TAP / A D";
				ctx.fillText(msg, 12, h * .4 + 24);
			}
			ctx.restore();
		}
		const stop = runLoop(step, draw);
		const pointer = (clientX) => {
			const rect = canvas.getBoundingClientRect();
			paddle.x = Math.min(1 - paddle.w / 2, Math.max(paddle.w / 2, (clientX - rect.left) / rect.width));
		};
		const onMove = (e) => pointer(e.clientX);
		const onDown = (e) => {
			pointer(e.clientX);
			serve();
		};
		const onKey = (e) => {
			if ([
				"KeyA",
				"KeyD",
				"ArrowLeft",
				"ArrowRight",
				"Space"
			].includes(e.code)) {
				e.preventDefault();
				keys.add(e.code);
				if (e.code === "Space") serve();
			}
		};
		const onUp = (e) => keys.delete(e.code);
		canvas.addEventListener("pointermove", onMove);
		canvas.addEventListener("pointerdown", onDown);
		window.addEventListener("keydown", onKey);
		window.addEventListener("keyup", onUp);
		window.addEventListener("blur", () => keys.clear());
		return () => {
			stop();
			disconnect();
			canvas.removeEventListener("pointermove", onMove);
			canvas.removeEventListener("pointerdown", onDown);
			window.removeEventListener("keydown", onKey);
			window.removeEventListener("keyup", onUp);
			if (window.__controlsTest) delete window.__controlsTest;
		};
	}, [hero]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "font-pixel text-[8px] text-gold",
		children: [
			"PADDLE · ",
			hud.score,
			" · L",
			hud.lives,
			" · HI ",
			hud.hi
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		className: "game-canvas",
		style: { touchAction: "none" },
		"aria-label": "Packet Paddle playfield"
	})] });
}
var ctx = null;
function beep(freq, dur = .05, gain = .04) {
	try {
		ctx ??= new AudioContext();
		if (ctx.state === "suspended") ctx.resume();
		const o = ctx.createOscillator();
		const g = ctx.createGain();
		o.type = "square";
		o.frequency.value = freq;
		g.gain.value = gain;
		o.connect(g);
		g.connect(ctx.destination);
		o.start();
		o.stop(ctx.currentTime + dur);
	} catch {}
}
function TouchPad({ onDir, onFire, fire = "FIRE" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-2 flex items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-3 gap-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "min-h-11 min-w-11 bg-wood font-pixel text-[10px] text-cream",
					onPointerDown: () => onDir(0, -1),
					onPointerUp: () => onDir(0, 0),
					onPointerCancel: () => onDir(0, 0),
					"aria-label": "Up",
					children: "U"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "min-h-11 min-w-11 bg-wood font-pixel text-[10px] text-cream",
					onPointerDown: () => onDir(-1, 0),
					onPointerUp: () => onDir(0, 0),
					onPointerCancel: () => onDir(0, 0),
					"aria-label": "Left",
					children: "L"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "min-h-11 min-w-11 bg-wood font-pixel text-[10px] text-cream",
					onPointerDown: () => onDir(1, 0),
					onPointerUp: () => onDir(0, 0),
					onPointerCancel: () => onDir(0, 0),
					"aria-label": "Right",
					children: "R"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "min-h-11 min-w-11 bg-wood font-pixel text-[10px] text-cream",
					onPointerDown: () => onDir(0, 1),
					onPointerUp: () => onDir(0, 0),
					onPointerCancel: () => onDir(0, 0),
					"aria-label": "Down",
					children: "D"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
			]
		}), onFire ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "min-h-14 min-w-20 bg-gold px-4 font-pixel text-[10px] text-ink",
			onPointerDown: (e) => {
				e.preventDefault();
				onFire();
			},
			children: fire
		}) : null]
	});
}
var INK$5 = "#1c120c";
var CREAM$5 = "#f6ead0";
var GOLD$4 = "#efc84a";
var OK$3 = "#3d8f6e";
var DANGER$5 = "#c45c3a";
var WALL = "#2f5f5b";
var MAZE = [
	"###################",
	"#o.......#.......o#",
	"#.##.###.#.###.##.#",
	"#.................#",
	"#.##.#.#####.#.##.#",
	"#....#...P...#....#",
	"#.##.#.#####.#.##.#",
	"#.................#",
	"#.##.###.#.###.##.#",
	"#o.......#.......o#",
	"###################"
];
var ROWS$2 = MAZE.length;
var COLS$2 = MAZE[0].length;
var DIRS = [
	[1, 0],
	[-1, 0],
	[0, 1],
	[0, -1]
];
function open(c, r) {
	return MAZE[r]?.[c] !== "#";
}
function PelletGame({ hero = "qa", onHi }) {
	const canvasRef = (0, import_react.useRef)(null);
	const dirRef = (0, import_react.useRef)({
		x: 0,
		y: 0
	});
	const addGold = useNexus((s) => s.addGold);
	const goldRef = (0, import_react.useRef)(addGold);
	goldRef.current = addGold;
	const hiRef = (0, import_react.useRef)(onHi);
	hiRef.current = onHi;
	const [hud, setHud] = (0, import_react.useState)({
		score: 0,
		lives: 3,
		left: 0,
		state: "ready"
	});
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const bound = bindCanvas(canvas);
		if (!bound) return;
		const { ctx, size, disconnect } = bound;
		const heroImg = loadHero(heroSprite(hero));
		let player = {
			c: 9,
			r: 5,
			dc: 0,
			dr: 0,
			next: [0, 0]
		};
		let ghosts = [];
		const dots = /* @__PURE__ */ new Set();
		let power = 0;
		let score = 0;
		let lives = 3;
		let state = "ready";
		let hi = Number(localStorage.getItem("nexus-pellet-hi") || 0);
		let lastHud = "";
		const keys = /* @__PURE__ */ new Set();
		function seed() {
			dots.clear();
			for (let r = 0; r < ROWS$2; r++) for (let c = 0; c < COLS$2; c++) {
				const ch = MAZE[r][c];
				if (ch === "." || ch === "o") dots.add(`${c},${r},${ch}`);
			}
			player = {
				c: 9,
				r: 5,
				dc: 0,
				dr: 0,
				next: [0, 0]
			};
			ghosts = [
				{
					c: 1,
					r: 1,
					dc: 1,
					dr: 0,
					color: DANGER$5
				},
				{
					c: 17,
					r: 1,
					dc: -1,
					dr: 0,
					color: OK$3
				},
				{
					c: 1,
					r: 9,
					dc: 0,
					dr: -1,
					color: GOLD$4
				}
			];
		}
		seed();
		function wantDir() {
			if (keys.has("KeyA") || keys.has("ArrowLeft") || dirRef.current.x < 0) return [-1, 0];
			if (keys.has("KeyD") || keys.has("ArrowRight") || dirRef.current.x > 0) return [1, 0];
			if (keys.has("KeyW") || keys.has("ArrowUp") || dirRef.current.y < 0) return [0, -1];
			if (keys.has("KeyS") || keys.has("ArrowDown") || dirRef.current.y > 0) return [0, 1];
			return [0, 0];
		}
		function stepGhost(g) {
			const options = DIRS.filter(([dc, dr]) => open(g.c + dc, g.r + dr) && !(dc === -g.dc && dr === -g.dr));
			const pool = options.length ? options : DIRS.filter(([dc, dr]) => open(g.c + dc, g.r + dr));
			if (!pool.length) return;
			let best = pool[0];
			let bestScore = power > 0 ? -1e9 : 1e9;
			for (const [dc, dr] of pool) {
				const d = Math.abs(g.c + dc - player.c) + Math.abs(g.r + dr - player.r);
				if (power > 0) {
					if (d > bestScore) {
						bestScore = d;
						best = [dc, dr];
					}
				} else if (d < bestScore) {
					bestScore = d;
					best = [dc, dr];
				}
			}
			g.dc = best[0];
			g.dr = best[1];
			if (open(g.c + g.dc, g.r + g.dr)) {
				g.c += g.dc;
				g.r += g.dr;
			}
		}
		let moveAcc = 0;
		let ghostAcc = 0;
		function step(dt) {
			const wdir = wantDir();
			if (wdir[0] || wdir[1]) player.next = wdir;
			if (state === "ready") {
				if (wdir[0] || wdir[1]) {
					state = "run";
					player.dc = wdir[0];
					player.dr = wdir[1];
				}
				return;
			}
			if (state !== "run") return;
			power = Math.max(0, power - dt);
			moveAcc += dt;
			const pSpeed = .09;
			while (moveAcc >= pSpeed) {
				moveAcc -= pSpeed;
				const [nc, nr] = player.next;
				if ((nc || nr) && open(player.c + nc, player.r + nr)) {
					player.dc = nc;
					player.dr = nr;
				}
				if (open(player.c + player.dc, player.r + player.dr)) {
					player.c += player.dc;
					player.r += player.dr;
				}
				const k = `${player.c},${player.r}`;
				for (const d of [...dots]) if (d.startsWith(k + ",")) {
					dots.delete(d);
					const powerDot = d.endsWith(",o");
					score += powerDot ? 20 : 5;
					goldRef.current(powerDot ? 4 : 1);
					beep(powerDot ? 520 : 880, .04, .03);
					if (powerDot) power = 6;
					if (score > hi) {
						hi = score;
						localStorage.setItem("nexus-pellet-hi", String(hi));
						hiRef.current?.(hi);
					}
				}
			}
			ghostAcc += dt;
			const gSpeed = power > 0 ? .16 : .12;
			while (ghostAcc >= gSpeed) {
				ghostAcc -= gSpeed;
				for (const g of ghosts) stepGhost(g);
			}
			for (const g of ghosts) if (g.c === player.c && g.r === player.r) {
				if (power > 0) {
					g.c = 9;
					g.r = 1;
					score += 40;
					goldRef.current(8);
					beep(200, .1, .05);
				} else {
					lives -= 1;
					beep(110, .2, .06);
					player = {
						c: 9,
						r: 5,
						dc: 0,
						dr: 0,
						next: [0, 0]
					};
					if (lives <= 0) state = "lose";
					else state = "ready";
				}
			}
			if (dots.size === 0) {
				state = "win";
				goldRef.current(50);
			}
			const snap = `${score}|${lives}|${state}|${dots.size}`;
			if (snap !== lastHud) {
				lastHud = snap;
				setHud({
					score,
					lives,
					left: dots.size,
					state
				});
			}
		}
		function draw() {
			const { w, h } = size;
			const tw = w / COLS$2;
			const th = h / ROWS$2;
			ctx.fillStyle = INK$5;
			ctx.fillRect(0, 0, w, h);
			for (let r = 0; r < ROWS$2; r++) for (let c = 0; c < COLS$2; c++) if (MAZE[r][c] === "#") {
				ctx.fillStyle = WALL;
				ctx.fillRect(c * tw, r * th, tw - 1, th - 1);
			}
			for (const d of dots) {
				const [cs, rs, kind] = d.split(",");
				const x = Number(cs) * tw + tw / 2;
				const y = Number(rs) * th + th / 2;
				ctx.fillStyle = CREAM$5;
				ctx.beginPath();
				ctx.arc(x, y, kind === "o" ? 5 : 2, 0, Math.PI * 2);
				ctx.fill();
			}
			const px = player.c * tw + tw / 2;
			const py = player.r * th + th / 2;
			blitHero(ctx, heroImg, px, py + th * .35, tw * .95, th * 1.15, CREW_FILTER[hero]);
			for (const g of ghosts) {
				ctx.fillStyle = power > 0 ? "#3a5a9a" : g.color;
				const gx = g.c * tw + 2;
				const gy = g.r * th + 2;
				ctx.fillRect(gx, gy, tw - 4, th - 6);
				ctx.fillStyle = CREAM$5;
				ctx.fillRect(gx + 3, gy + 4, 4, 4);
				ctx.fillRect(gx + tw - 11, gy + 4, 4, 4);
			}
			ctx.fillStyle = GOLD$4;
			ctx.font = "8px 'Press Start 2P', monospace";
			ctx.fillText(`${score}  L${lives}  HI ${hi}`, 8, 12);
			if (state !== "run") {
				ctx.fillStyle = "rgba(28,18,12,0.7)";
				ctx.fillRect(0, h * .4, w, 36);
				ctx.fillStyle = GOLD$4;
				ctx.font = "10px 'Press Start 2P', monospace";
				const msg = state === "win" ? "CLEARED" : state === "lose" ? "CAUGHT" : "SWIPE / WASD";
				ctx.fillText(msg, 12, h * .4 + 24);
			}
		}
		window.__controlsTest = {
			getYaw: () => player.c,
			getSpeed: () => Math.abs(player.dc) + Math.abs(player.dr),
			setKeys: (codes) => {
				keys.clear();
				for (const c of codes) keys.add(c);
			}
		};
		const stop = runLoop(step, draw);
		const onKey = (e) => {
			if ([
				"ArrowUp",
				"ArrowDown",
				"ArrowLeft",
				"ArrowRight",
				"KeyW",
				"KeyA",
				"KeyS",
				"KeyD",
				"Space"
			].includes(e.code)) {
				e.preventDefault();
				keys.add(e.code);
			}
		};
		const onUp = (e) => keys.delete(e.code);
		const clear = () => keys.clear();
		window.addEventListener("keydown", onKey);
		window.addEventListener("keyup", onUp);
		window.addEventListener("blur", clear);
		return () => {
			stop();
			disconnect();
			window.removeEventListener("keydown", onKey);
			window.removeEventListener("keyup", onUp);
			window.removeEventListener("blur", clear);
			if (window.__controlsTest) delete window.__controlsTest;
		};
	}, [hero]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "font-pixel text-[8px] text-gold",
			children: [
				"SPEED PELLET · ",
				hud.score,
				" · L",
				hud.lives,
				" · ",
				hud.left,
				" left"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			className: "game-canvas",
			style: { touchAction: "none" },
			"aria-label": "Speed Pellet maze"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchPad, { onDir: (x, y) => dirRef.current = {
			x,
			y
		} })
	] });
}
var INK$4 = "#1c120c";
var CREAM$4 = "#f6ead0";
var GOLD$3 = "#efc84a";
var OK$2 = "#3d8f6e";
var DANGER$4 = "#c45c3a";
function RaidGame({ hero = "cpo", onHi }) {
	const canvasRef = (0, import_react.useRef)(null);
	const dirRef = (0, import_react.useRef)(0);
	const fireRef = (0, import_react.useRef)(false);
	const addGold = useNexus((s) => s.addGold);
	const goldRef = (0, import_react.useRef)(addGold);
	goldRef.current = addGold;
	const hiRef = (0, import_react.useRef)(onHi);
	hiRef.current = onHi;
	const [hud, setHud] = (0, import_react.useState)({
		score: 0,
		lives: 3,
		state: "ready"
	});
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const bound = bindCanvas(canvas);
		if (!bound) return;
		const { ctx, size, disconnect } = bound;
		const heroImg = loadHero(heroSprite(hero));
		const ship = {
			x: .5,
			w: .08
		};
		let aliens = [];
		const shots = [];
		let dir = 1;
		let score = 0;
		let lives = 3;
		let state = "ready";
		let cool = 0;
		let hi = Number(localStorage.getItem("nexus-raid-hi") || 0);
		let lastHud = "";
		const keys = /* @__PURE__ */ new Set();
		let drop = .012;
		function seed() {
			aliens = [];
			for (let r = 0; r < 4; r++) for (let c = 0; c < 8; c++) aliens.push({
				x: .12 + c * .1,
				y: .12 + r * .08,
				alive: true
			});
			ship.x = .5;
			shots.length = 0;
			dir = 1;
			drop = .012;
		}
		seed();
		window.__controlsTest = {
			getYaw: () => ship.x,
			getSpeed: () => state === "run" ? 1 : 0,
			setKeys: (codes) => {
				keys.clear();
				for (const c of codes) keys.add(c);
			}
		};
		function step(dt) {
			let steer = dirRef.current;
			if (keys.has("KeyA") || keys.has("ArrowLeft")) steer = -1;
			if (keys.has("KeyD") || keys.has("ArrowRight")) steer = 1;
			if (state === "ready") {
				if (steer !== 0 || fireRef.current || keys.has("Space")) {
					state = "run";
					fireRef.current = false;
				}
				return;
			}
			if (state !== "run") return;
			ship.x = Math.min(.94, Math.max(.06, ship.x + steer * .7 * dt));
			cool = Math.max(0, cool - dt);
			const wantFire = fireRef.current || keys.has("Space");
			fireRef.current = false;
			if (wantFire && cool <= 0) {
				shots.push({
					x: ship.x,
					y: .88,
					vy: -.9,
					from: "p"
				});
				cool = .28;
				beep(640, .04, .03);
			}
			const live = aliens.filter((a) => a.alive);
			let hitEdge = false;
			for (const a of live) {
				a.x += dir * (.08 + (32 - live.length) * .004) * dt;
				if (a.x < .06 || a.x > .94) hitEdge = true;
			}
			if (hitEdge) {
				dir *= -1;
				for (const a of live) a.y += drop;
			}
			if (Math.random() < dt * .6 && live.length) {
				const shooter = live[Math.floor(Math.random() * live.length)];
				shots.push({
					x: shooter.x,
					y: shooter.y + .03,
					vy: .45,
					from: "a"
				});
			}
			for (const s of shots) s.y += s.vy * dt;
			for (let i = shots.length - 1; i >= 0; i--) {
				const s = shots[i];
				if (s.y < 0 || s.y > 1) {
					shots.splice(i, 1);
					continue;
				}
				if (s.from === "p") {
					for (const a of live) if (Math.abs(a.x - s.x) < .04 && Math.abs(a.y - s.y) < .03) {
						a.alive = false;
						shots.splice(i, 1);
						score += 15;
						goldRef.current(3);
						beep(220, .06, .04);
						if (score > hi) {
							hi = score;
							localStorage.setItem("nexus-raid-hi", String(hi));
							hiRef.current?.(hi);
						}
						break;
					}
				} else if (Math.abs(s.x - ship.x) < ship.w / 2 && s.y > .88) {
					shots.splice(i, 1);
					lives -= 1;
					beep(90, .18, .05);
					if (lives <= 0) state = "lose";
				}
			}
			if (aliens.every((a) => !a.alive)) {
				state = "win";
				goldRef.current(50);
			}
			if (live.some((a) => a.y > .82)) state = "lose";
			const snap = `${score}|${lives}|${state}`;
			if (snap !== lastHud) {
				lastHud = snap;
				setHud({
					score,
					lives,
					state
				});
			}
		}
		function draw() {
			const { w, h } = size;
			ctx.fillStyle = INK$4;
			ctx.fillRect(0, 0, w, h);
			for (const a of aliens) {
				if (!a.alive) continue;
				ctx.fillStyle = OK$2;
				const ax = a.x * w;
				const ay = a.y * h;
				ctx.fillRect(ax - 8, ay, 16, 10);
				ctx.fillStyle = GOLD$3;
				ctx.fillRect(ax - 5, ay + 3, 3, 3);
				ctx.fillRect(ax + 2, ay + 3, 3, 3);
			}
			ctx.fillStyle = CREAM$4;
			ctx.fillRect(ship.x * w - 12, .9 * h, 24, 8);
			blitHero(ctx, heroImg, ship.x * w, .9 * h + 4, 36, 44, CREW_FILTER[hero]);
			for (const s of shots) {
				ctx.fillStyle = s.from === "p" ? GOLD$3 : DANGER$4;
				ctx.fillRect(s.x * w - 1, s.y * h, 3, 8);
			}
			ctx.fillStyle = GOLD$3;
			ctx.font = "8px 'Press Start 2P', monospace";
			ctx.fillText(`${score}  L${lives}  HI ${hi}`, 8, 12);
			if (state !== "run") {
				ctx.fillStyle = "rgba(28,18,12,0.7)";
				ctx.fillRect(0, h * .4, w, 36);
				ctx.fillStyle = GOLD$3;
				ctx.font = "10px 'Press Start 2P', monospace";
				const msg = state === "win" ? "SKY CLEAR" : state === "lose" ? "BREACH" : "A/D · FIRE";
				ctx.fillText(msg, 12, h * .4 + 24);
			}
		}
		const stop = runLoop(step, draw);
		const onKey = (e) => {
			if ([
				"KeyA",
				"KeyD",
				"ArrowLeft",
				"ArrowRight",
				"Space"
			].includes(e.code)) {
				e.preventDefault();
				keys.add(e.code);
			}
		};
		const onUp = (e) => keys.delete(e.code);
		const clear = () => keys.clear();
		window.addEventListener("keydown", onKey);
		window.addEventListener("keyup", onUp);
		window.addEventListener("blur", clear);
		return () => {
			stop();
			disconnect();
			window.removeEventListener("keydown", onKey);
			window.removeEventListener("keyup", onUp);
			window.removeEventListener("blur", clear);
			if (window.__controlsTest) delete window.__controlsTest;
		};
	}, [hero]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "font-pixel text-[8px] text-gold",
			children: [
				"SKY RAID · ",
				hud.score,
				" · L",
				hud.lives
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			className: "game-canvas",
			style: { touchAction: "none" },
			"aria-label": "Sky Raid playfield"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchPad, {
			fire: "FIRE",
			onDir: (x) => dirRef.current = x,
			onFire: () => {
				fireRef.current = true;
			}
		})
	] });
}
var INK$3 = "#111110";
var CREAM$3 = "#e6e1d6";
var DANGER$3 = "#b85c4a";
var MUTED = "#8a8580";
function HopGame({ hero, title, seed, onHi }) {
	const canvasRef = (0, import_react.useRef)(null);
	const dirRef = (0, import_react.useRef)(0);
	const jumpRef = (0, import_react.useRef)(false);
	const addGold = useNexus((s) => s.addGold);
	const goldRef = (0, import_react.useRef)(addGold);
	goldRef.current = addGold;
	const hiRef = (0, import_react.useRef)(onHi);
	hiRef.current = onHi;
	const [hud, setHud] = (0, import_react.useState)({
		score: 0,
		lives: 3,
		state: "ready"
	});
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const bound = bindCanvas(canvas);
		if (!bound) return;
		const { ctx, size, disconnect } = bound;
		const img = new Image();
		img.crossOrigin = "anonymous";
		img.src = heroSprite(hero);
		const p = {
			x: .22,
			y: .72,
			vy: 0,
			on: true
		};
		const keys = /* @__PURE__ */ new Set();
		const gaps = [];
		let score = 0;
		let lives = 3;
		let state = "ready";
		let t = seed * .01;
		let cool = 0;
		let lastHud = "";
		let hi = Number(localStorage.getItem(`nexus-hop-hi-${hero}`) || 0);
		const ground = .78;
		function spawn(x) {
			const w = .08 + (seed + Math.floor(x * 10)) % 5 * .012;
			gaps.push({
				x,
				w,
				scored: false
			});
		}
		function resetRun() {
			p.x = .22;
			p.y = ground;
			p.vy = 0;
			p.on = true;
			gaps.length = 0;
			spawn(1.15);
			spawn(1.7);
			spawn(2.28);
		}
		resetRun();
		window.__controlsTest = {
			getYaw: () => p.x,
			getSpeed: () => state === "run" ? 1 : 0,
			setKeys: (codes) => {
				keys.clear();
				for (const c of codes) keys.add(c);
			}
		};
		function step(dt) {
			let steer = dirRef.current;
			if (keys.has("KeyA") || keys.has("ArrowLeft")) steer = -1;
			if (keys.has("KeyD") || keys.has("ArrowRight")) steer = 1;
			const wantJump = jumpRef.current || keys.has("Space") || keys.has("KeyW") || keys.has("ArrowUp");
			jumpRef.current = false;
			if (state === "ready") {
				if (steer !== 0 || wantJump) state = "run";
				return;
			}
			if (state !== "run") return;
			t += dt;
			p.x = Math.min(.55, Math.max(.1, p.x + steer * .38 * dt));
			if (wantJump && p.on && cool <= 0) {
				p.vy = -1.15;
				p.on = false;
				cool = .12;
				beep(520, .05, .03);
			}
			cool = Math.max(0, cool - dt);
			p.vy += 2.8 * dt;
			p.y += p.vy * dt;
			const overGap = gaps.some((g) => p.x > g.x && p.x < g.x + g.w);
			if (p.y >= ground) {
				if (overGap) {
					lives -= 1;
					beep(180, .08, .05);
					if (lives <= 0) {
						state = "lose";
						if (score > hi) {
							hi = score;
							localStorage.setItem(`nexus-hop-hi-${hero}`, String(hi));
							hiRef.current?.(hi);
						}
						goldRef.current(Math.min(12, Math.floor(score / 4)));
					} else {
						p.y = ground;
						p.vy = 0;
						p.on = true;
						p.x = .18;
					}
				} else {
					p.y = ground;
					p.vy = 0;
					p.on = true;
				}
			}
			const speed = .22 + Math.min(.22, score * .006);
			for (const g of gaps) {
				g.x -= speed * dt;
				if (!g.scored && g.x + g.w < p.x) {
					g.scored = true;
					score += 1;
					if (score > hi) {
						hi = score;
						hiRef.current?.(hi);
					}
				}
			}
			while (gaps.length && gaps[0].x + gaps[0].w < -.1) gaps.shift();
			const last = gaps[gaps.length - 1];
			if (!last || last.x < 1.05) spawn((last?.x ?? 1) + .42 + t % .25);
		}
		function draw() {
			const w = size.w;
			const h = size.h;
			ctx.fillStyle = INK$3;
			ctx.fillRect(0, 0, w, h);
			ctx.fillStyle = MUTED;
			ctx.fillRect(0, ground * h, w, 3);
			ctx.fillStyle = CREAM$3;
			ctx.fillRect(0, ground * h + 3, w, h);
			for (const g of gaps) {
				ctx.fillStyle = INK$3;
				ctx.fillRect(g.x * w, ground * h - 2, g.w * w, 18);
				ctx.fillStyle = DANGER$3;
				ctx.fillRect(g.x * w, ground * h + 3, g.w * w, h);
			}
			const hx = p.x * w;
			const hy = p.y * h;
			blitHero(ctx, img, hx, hy + 6, 44, 56, CREW_FILTER[hero]);
			ctx.fillStyle = CREAM$3;
			ctx.font = "12px ui-monospace, monospace";
			ctx.fillText(title, 10, 18);
			ctx.fillStyle = MUTED;
			ctx.fillText(`${heroName(hero)}  ${score}  HI ${hi}`, 10, 34);
			if (state !== "run") {
				ctx.fillStyle = CREAM$3;
				ctx.fillText(state === "ready" ? "TAP / JUMP" : "DOWN — TAP", 10, 52);
			}
		}
		const stop = runLoop(step, () => {
			const line = `${score}|${lives}|${state}`;
			if (line !== lastHud) {
				lastHud = line;
				setHud({
					score,
					lives,
					state
				});
			}
			draw();
		});
		const onKey = (e) => {
			if ([
				"ArrowLeft",
				"ArrowRight",
				"ArrowUp",
				"Space",
				"KeyA",
				"KeyD",
				"KeyW"
			].includes(e.code)) e.preventDefault();
			if (e.type === "keydown") keys.add(e.code);
			else keys.delete(e.code);
		};
		window.addEventListener("keydown", onKey);
		window.addEventListener("keyup", onKey);
		return () => {
			stop();
			disconnect();
			window.removeEventListener("keydown", onKey);
			window.removeEventListener("keyup", onKey);
			if (window.__controlsTest) delete window.__controlsTest;
		};
	}, [
		hero,
		title,
		seed
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-1 font-pixel text-[8px] text-muted",
			children: [
				heroName(hero),
				" · ",
				hud.state.toUpperCase(),
				" · ",
				hud.score,
				" · L",
				hud.lives
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			className: "game-canvas",
			onPointerDown: () => {
				jumpRef.current = true;
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchPad, {
			onDir: (x, y) => {
				dirRef.current = x;
				if (y < 0) jumpRef.current = true;
			},
			onFire: () => {
				jumpRef.current = true;
			},
			fire: "JUMP"
		})
	] });
}
var COLS$1 = 16;
var ROWS$1 = 10;
var INK$2 = "#111110";
var CREAM$2 = "#e6e1d6";
var GOLD$2 = "#c5c0b4";
var OK$1 = "#5d8f76";
var DANGER$2 = "#b85c4a";
function SnakeGame({ hero = "pm", onHi }) {
	const canvasRef = (0, import_react.useRef)(null);
	const dirRef = (0, import_react.useRef)({
		x: 1,
		y: 0
	});
	const addGold = useNexus((s) => s.addGold);
	const goldRef = (0, import_react.useRef)(addGold);
	goldRef.current = addGold;
	const hiRef = (0, import_react.useRef)(onHi);
	hiRef.current = onHi;
	const [hud, setHud] = (0, import_react.useState)({
		score: 0,
		state: "ready"
	});
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const bound = bindCanvas(canvas);
		if (!bound) return;
		const { ctx, size, disconnect } = bound;
		const heroImg = loadHero(heroSprite(hero));
		const keys = /* @__PURE__ */ new Set();
		let body = [{
			c: 4,
			r: 5
		}];
		let dir = {
			x: 1,
			y: 0
		};
		let queued = {
			x: 1,
			y: 0
		};
		let food = {
			c: 10,
			r: 4
		};
		let score = 0;
		let acc = 0;
		let state = "ready";
		let hi = Number(localStorage.getItem(`nexus-snake-hi-${hero}`) || 0);
		let lastHud = "";
		function spawnFood() {
			for (let n = 0; n < 80; n++) {
				const c = (food.c * 7 + n * 3 + 5) % COLS$1;
				const r = (food.r * 5 + n * 2 + 3) % ROWS$1;
				if (!body.some((b) => b.c === c && b.r === r)) {
					food = {
						c,
						r
					};
					return;
				}
			}
		}
		window.__controlsTest = {
			getYaw: () => body[0].c / COLS$1,
			getSpeed: () => state === "run" ? 1 : 0,
			setKeys: (codes) => {
				keys.clear();
				for (const c of codes) keys.add(c);
			}
		};
		function turn(x, y) {
			if (dir.x === -x && dir.y === -y) return;
			queued = {
				x,
				y
			};
		}
		function step(dt) {
			if (keys.has("KeyA") || keys.has("ArrowLeft")) turn(-1, 0);
			if (keys.has("KeyD") || keys.has("ArrowRight")) turn(1, 0);
			if (keys.has("KeyW") || keys.has("ArrowUp")) turn(0, -1);
			if (keys.has("KeyS") || keys.has("ArrowDown")) turn(0, 1);
			const pad = dirRef.current;
			if (pad.x || pad.y) turn(Math.sign(pad.x), Math.sign(pad.y));
			if (state === "ready") {
				if (keys.size || pad.x || pad.y) state = "run";
				return;
			}
			if (state !== "run") return;
			acc += dt;
			const interval = Math.max(.09, .18 - score * .004);
			if (acc < interval) return;
			acc = 0;
			dir = queued;
			const head = {
				c: body[0].c + dir.x,
				r: body[0].r + dir.y
			};
			if (head.c < 0 || head.r < 0 || head.c >= COLS$1 || head.r >= ROWS$1 || body.some((b) => b.c === head.c && b.r === head.r)) {
				state = "lose";
				beep(180, .1, .05);
				if (score > hi) {
					hi = score;
					localStorage.setItem(`nexus-snake-hi-${hero}`, String(hi));
					hiRef.current?.(hi);
				}
				goldRef.current(Math.min(12, score));
				return;
			}
			body = [head, ...body];
			if (head.c === food.c && head.r === food.r) {
				score += 1;
				beep(640, .04, .03);
				spawnFood();
			} else body.pop();
		}
		function draw() {
			const { w, h } = size;
			const cw = w / COLS$1;
			const rh = h / ROWS$1;
			ctx.fillStyle = INK$2;
			ctx.fillRect(0, 0, w, h);
			ctx.fillStyle = OK$1;
			ctx.fillRect(food.c * cw + 2, food.r * rh + 2, cw - 4, rh - 4);
			body.forEach((b, i) => {
				ctx.fillStyle = i === 0 ? CREAM$2 : GOLD$2;
				ctx.fillRect(b.c * cw + 1, b.r * rh + 1, cw - 2, rh - 2);
			});
			const head = body[0];
			blitHero(ctx, heroImg, head.c * cw + cw / 2, head.r * rh + rh, cw, rh * 1.4, CREW_FILTER[hero]);
			ctx.fillStyle = GOLD$2;
			ctx.font = "8px 'Press Start 2P', monospace";
			ctx.fillText(`${score}  HI ${hi}`, 8, 12);
			if (state !== "run") {
				ctx.fillStyle = "rgba(17,17,16,0.7)";
				ctx.fillRect(0, h * .4, w, 36);
				ctx.fillStyle = state === "lose" ? DANGER$2 : CREAM$2;
				ctx.font = "10px 'Press Start 2P', monospace";
				ctx.fillText(state === "lose" ? "BITTEN" : "A/D · EAT", 12, h * .4 + 24);
			}
		}
		const stop = runLoop(step, () => {
			const line = `${score}|${state}`;
			if (line !== lastHud) {
				lastHud = line;
				setHud({
					score,
					state
				});
			}
			draw();
		});
		const onKey = (e) => {
			if ([
				"KeyA",
				"KeyD",
				"KeyW",
				"KeyS",
				"ArrowLeft",
				"ArrowRight",
				"ArrowUp",
				"ArrowDown"
			].includes(e.code)) {
				e.preventDefault();
				keys.add(e.code);
			}
		};
		const onUp = (e) => keys.delete(e.code);
		window.addEventListener("keydown", onKey);
		window.addEventListener("keyup", onUp);
		window.addEventListener("blur", () => keys.clear());
		return () => {
			stop();
			disconnect();
			window.removeEventListener("keydown", onKey);
			window.removeEventListener("keyup", onUp);
			if (window.__controlsTest) delete window.__controlsTest;
		};
	}, [hero]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "font-pixel text-[8px] text-gold",
			children: [
				"WIRE SNAKE · ",
				hud.score,
				" · ",
				hud.state.toUpperCase()
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			className: "game-canvas",
			style: { touchAction: "none" },
			"aria-label": "Wire Snake playfield"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchPad, { onDir: (x, y) => dirRef.current = {
			x,
			y
		} })
	] });
}
var INK$1 = "#111110";
var CREAM$1 = "#e6e1d6";
var GOLD$1 = "#c5c0b4";
var DANGER$1 = "#b85c4a";
function DriftGame({ hero = "cpo", onHi }) {
	const canvasRef = (0, import_react.useRef)(null);
	const steerRef = (0, import_react.useRef)(0);
	const thrustRef = (0, import_react.useRef)(0);
	const fireRef = (0, import_react.useRef)(false);
	const addGold = useNexus((s) => s.addGold);
	const goldRef = (0, import_react.useRef)(addGold);
	goldRef.current = addGold;
	const hiRef = (0, import_react.useRef)(onHi);
	hiRef.current = onHi;
	const [hud, setHud] = (0, import_react.useState)({
		score: 0,
		lives: 3,
		state: "ready"
	});
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const bound = bindCanvas(canvas);
		if (!bound) return;
		const { ctx, size, disconnect } = bound;
		const heroImg = loadHero(heroSprite(hero));
		const keys = /* @__PURE__ */ new Set();
		const ship = {
			x: .5,
			y: .55,
			yaw: 0,
			vx: 0,
			vy: 0
		};
		let rocks = [];
		const shots = [];
		let score = 0;
		let lives = 3;
		let cool = 0;
		let state = "ready";
		let hi = Number(localStorage.getItem(`nexus-drift-hi-${hero}`) || 0);
		let lastHud = "";
		let invuln = 0;
		function seed() {
			rocks = [];
			for (let i = 0; i < 5; i++) {
				const a = i / 5 * Math.PI * 2;
				rocks.push({
					x: .5 + Math.cos(a) * .38,
					y: .5 + Math.sin(a) * .32,
					vx: Math.cos(a + 1) * .08,
					vy: Math.sin(a + 1) * .08,
					r: .045,
					alive: true
				});
			}
			ship.x = .5;
			ship.y = .55;
			ship.yaw = 0;
			ship.vx = 0;
			ship.vy = 0;
			shots.length = 0;
		}
		seed();
		window.__controlsTest = {
			getYaw: () => ship.yaw,
			getSpeed: () => Math.hypot(ship.vx, ship.vy),
			setKeys: (codes) => {
				keys.clear();
				for (const c of codes) keys.add(c);
			}
		};
		function wrap(v) {
			if (v < 0) return v + 1;
			if (v > 1) return v - 1;
			return v;
		}
		function step(dt) {
			let steer = steerRef.current;
			if (keys.has("KeyA") || keys.has("ArrowLeft")) steer += 1;
			if (keys.has("KeyD") || keys.has("ArrowRight")) steer -= 1;
			let thrust = thrustRef.current < 0 ? 1 : thrustRef.current > 0 ? 0 : 0;
			if (keys.has("KeyW") || keys.has("ArrowUp")) thrust = 1;
			if (state === "ready") {
				if (steer !== 0 || thrust || keys.has("Space") || fireRef.current) state = "run";
				return;
			}
			if (state !== "run") return;
			ship.yaw += steer * 2.8 * dt;
			const fx = -Math.sin(ship.yaw);
			const fy = -Math.cos(ship.yaw);
			if (thrust) {
				ship.vx += fx * .55 * dt;
				ship.vy += fy * .55 * dt;
			}
			ship.vx *= .992;
			ship.vy *= .992;
			ship.x = wrap(ship.x + ship.vx * dt);
			ship.y = wrap(ship.y + ship.vy * dt);
			cool = Math.max(0, cool - dt);
			invuln = Math.max(0, invuln - dt);
			const wantFire = fireRef.current || keys.has("Space");
			fireRef.current = false;
			if (wantFire && cool <= 0) {
				shots.push({
					x: ship.x,
					y: ship.y,
					vx: fx * .9,
					vy: fy * .9,
					life: .9
				});
				cool = .22;
				beep(720, .04, .03);
			}
			for (const s of shots) {
				s.x = wrap(s.x + s.vx * dt);
				s.y = wrap(s.y + s.vy * dt);
				s.life -= dt;
			}
			for (let i = shots.length - 1; i >= 0; i--) if (shots[i].life <= 0) shots.splice(i, 1);
			for (const r of rocks) {
				if (!r.alive) continue;
				r.x = wrap(r.x + r.vx * dt);
				r.y = wrap(r.y + r.vy * dt);
				for (const s of shots) if (Math.hypot(s.x - r.x, s.y - r.y) < r.r) {
					r.alive = false;
					s.life = 0;
					score += 10;
					goldRef.current(1);
					beep(420, .05, .03);
				}
				if (invuln <= 0 && Math.hypot(ship.x - r.x, ship.y - r.y) < r.r + .02) {
					lives -= 1;
					invuln = 1.4;
					ship.vx = 0;
					ship.vy = 0;
					beep(160, .1, .06);
					if (lives <= 0) {
						state = "lose";
						if (score > hi) {
							hi = score;
							localStorage.setItem(`nexus-drift-hi-${hero}`, String(hi));
							hiRef.current?.(hi);
						}
					}
				}
			}
			if (rocks.every((r) => !r.alive)) {
				state = "win";
				if (score > hi) {
					hi = score;
					localStorage.setItem(`nexus-drift-hi-${hero}`, String(hi));
					hiRef.current?.(hi);
				}
				goldRef.current(8);
			}
		}
		function draw() {
			const { w, h } = size;
			ctx.fillStyle = INK$1;
			ctx.fillRect(0, 0, w, h);
			ctx.fillStyle = DANGER$1;
			for (const r of rocks) {
				if (!r.alive) continue;
				ctx.beginPath();
				ctx.arc(r.x * w, r.y * h, r.r * w, 0, Math.PI * 2);
				ctx.fill();
			}
			ctx.fillStyle = GOLD$1;
			for (const s of shots) ctx.fillRect(s.x * w - 1, s.y * h - 1, 3, 3);
			const sx = ship.x * w;
			const sy = ship.y * h;
			ctx.save();
			ctx.translate(sx, sy);
			ctx.rotate(-ship.yaw);
			ctx.fillStyle = CREAM$1;
			ctx.beginPath();
			ctx.moveTo(0, -12);
			ctx.lineTo(8, 10);
			ctx.lineTo(-8, 10);
			ctx.closePath();
			ctx.fill();
			ctx.restore();
			blitHero(ctx, heroImg, sx, sy + 18, 28, 36, CREW_FILTER[hero]);
			ctx.fillStyle = GOLD$1;
			ctx.font = "8px 'Press Start 2P', monospace";
			ctx.fillText(`${score}  L${lives}  HI ${hi}`, 8, 12);
			if (state !== "run") {
				ctx.fillStyle = "rgba(17,17,16,0.7)";
				ctx.fillRect(0, h * .4, w, 36);
				ctx.fillStyle = GOLD$1;
				ctx.font = "10px 'Press Start 2P', monospace";
				const msg = state === "win" ? "FIELD CLEAR" : state === "lose" ? "HULL GONE" : "A LEFT · D RIGHT · W";
				ctx.fillText(msg, 12, h * .4 + 24);
			}
		}
		const stop = runLoop(step, () => {
			const line = `${score}|${lives}|${state}`;
			if (line !== lastHud) {
				lastHud = line;
				setHud({
					score,
					lives,
					state
				});
			}
			draw();
		});
		const onKey = (e) => {
			if ([
				"KeyA",
				"KeyD",
				"KeyW",
				"ArrowLeft",
				"ArrowRight",
				"ArrowUp",
				"Space"
			].includes(e.code)) {
				e.preventDefault();
				keys.add(e.code);
			}
		};
		const onUp = (e) => keys.delete(e.code);
		window.addEventListener("keydown", onKey);
		window.addEventListener("keyup", onUp);
		window.addEventListener("blur", () => keys.clear());
		return () => {
			stop();
			disconnect();
			window.removeEventListener("keydown", onKey);
			window.removeEventListener("keyup", onUp);
			if (window.__controlsTest) delete window.__controlsTest;
		};
	}, [hero]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "font-pixel text-[8px] text-gold",
			children: [
				"ROCK DRIFT · ",
				hud.score,
				" · L",
				hud.lives
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			className: "game-canvas",
			style: { touchAction: "none" },
			"aria-label": "Rock Drift playfield"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchPad, {
			fire: "FIRE",
			onDir: (x, y) => {
				steerRef.current = x < 0 ? 1 : x > 0 ? -1 : 0;
				thrustRef.current = y;
			},
			onFire: () => {
				fireRef.current = true;
			}
		})
	] });
}
var COLS = 12;
var ROWS = 8;
var INK = "#111110";
var CREAM = "#e6e1d6";
var GOLD = "#c5c0b4";
var OK = "#5d8f76";
var DANGER = "#b85c4a";
var WOOD = "#23211e";
var COST = 20;
var RANGE2 = .09;
var PATH = [
	[0, 4],
	[1, 4],
	[2, 4],
	[3, 4],
	[3, 3],
	[3, 2],
	[4, 2],
	[5, 2],
	[6, 2],
	[7, 2],
	[7, 3],
	[7, 4],
	[7, 5],
	[8, 5],
	[9, 5],
	[10, 5],
	[11, 5]
];
var PATH_SET = new Set(PATH.map(([c, r]) => `${c},${r}`));
var WAVES = [
	{
		n: 4,
		hp: 3,
		spd: .38,
		gap: .72
	},
	{
		n: 6,
		hp: 4,
		spd: .42,
		gap: .58
	},
	{
		n: 8,
		hp: 5,
		spd: .46,
		gap: .5
	},
	{
		n: 8,
		hp: 7,
		spd: .5,
		gap: .46
	},
	{
		n: 10,
		hp: 8,
		spd: .54,
		gap: .4
	},
	{
		n: 12,
		hp: 10,
		spd: .58,
		gap: .36
	}
];
function along(i) {
	const a = PATH[Math.max(0, Math.min(PATH.length - 1, Math.floor(i)))];
	const b = PATH[Math.max(0, Math.min(PATH.length - 1, Math.floor(i) + 1))];
	const t = i - Math.floor(i);
	return {
		x: (a[0] + (b[0] - a[0]) * t + .5) / COLS,
		y: (a[1] + (b[1] - a[1]) * t + .5) / ROWS
	};
}
function HoldGame({ hero = "qa", onHi }) {
	const canvasRef = (0, import_react.useRef)(null);
	const addGold = useNexus((s) => s.addGold);
	const goldRef = (0, import_react.useRef)(addGold);
	goldRef.current = addGold;
	const hiRef = (0, import_react.useRef)(onHi);
	hiRef.current = onHi;
	const [hud, setHud] = (0, import_react.useState)({
		gold: 60,
		lives: 8,
		wave: 0,
		state: "ready",
		score: 0
	});
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const bound = bindCanvas(canvas);
		if (!bound) return;
		const { ctx, size, disconnect } = bound;
		const heroImg = loadHero(heroSprite(hero));
		const towers = [];
		const mobs = [];
		const shots = [];
		let purse = 60;
		let lives = 8;
		let wave = 0;
		let score = 0;
		let spawnLeft = 0;
		let spawnGap = 0;
		let spawnHp = 3;
		let spawnSpd = .38;
		let state = "ready";
		let hi = Number(localStorage.getItem(`nexus-hold-hi-${hero}`) || 0);
		let lastHud = "";
		function reset() {
			towers.length = 0;
			mobs.length = 0;
			shots.length = 0;
			purse = 60;
			lives = 8;
			wave = 0;
			score = 0;
			spawnLeft = 0;
			spawnGap = 0;
			state = "ready";
		}
		function startWave() {
			if (state === "win" || state === "lose") reset();
			if (state === "ready") state = "build";
			if (state !== "build" || wave >= WAVES.length) return;
			const w = WAVES[wave];
			wave += 1;
			spawnLeft = w.n;
			spawnGap = 0;
			spawnHp = w.hp;
			spawnSpd = w.spd;
			state = "wave";
		}
		function cellAt(px, py) {
			return {
				c: Math.floor(px / size.w * COLS),
				r: Math.floor(py / size.h * ROWS)
			};
		}
		function place(c, r) {
			if (state === "lose" || state === "win") reset();
			if (c < 0 || r < 0 || c >= COLS || r >= ROWS) return;
			if (PATH_SET.has(`${c},${r}`)) return;
			if (towers.some((t) => t.c === c && t.r === r)) return;
			if (purse < COST) return;
			if (state === "ready") state = "build";
			purse -= COST;
			towers.push({
				c,
				r,
				cool: 0
			});
			beep(420, .05, .03);
		}
		function onPtr(e) {
			const node = canvasRef.current;
			if (!node) return;
			const rect = node.getBoundingClientRect();
			const { c, r } = cellAt(e.clientX - rect.left, e.clientY - rect.top);
			place(c, r);
		}
		canvas.addEventListener("pointerdown", onPtr);
		window.__controlsTest = {
			getYaw: () => towers[0]?.c ?? 0,
			getSpeed: () => state === "wave" ? 1 : 0,
			setKeys: (codes = []) => {
				if (codes.includes("KeyW") || codes.includes("Space")) startWave();
			}
		};
		function step(dt) {
			if (state !== "wave") return;
			spawnGap -= dt;
			if (spawnLeft > 0 && spawnGap <= 0) {
				mobs.push({
					i: 0,
					hp: spawnHp,
					max: spawnHp,
					spd: spawnSpd
				});
				spawnLeft -= 1;
				spawnGap = WAVES[Math.max(0, wave - 1)].gap;
			}
			for (const m of mobs) {
				if (m.hp <= 0) continue;
				m.i += m.spd * dt;
				if (m.i >= PATH.length - 1) {
					m.hp = 0;
					lives -= 1;
					beep(160, .08, .05);
					if (lives <= 0) {
						state = "lose";
						goldRef.current(Math.min(12, Math.floor(score / 4)));
						if (score > hi) {
							hi = score;
							localStorage.setItem(`nexus-hold-hi-${hero}`, String(hi));
							hiRef.current?.(hi);
						}
					}
				}
			}
			for (const t of towers) {
				t.cool = Math.max(0, t.cool - dt);
				if (t.cool > 0) continue;
				const tx = (t.c + .5) / COLS;
				const ty = (t.r + .5) / ROWS;
				let best = null;
				let bestI = -1;
				for (const m of mobs) {
					if (m.hp <= 0) continue;
					const p = along(m.i);
					if ((p.x - tx) ** 2 + (p.y - ty) ** 2 <= RANGE2 && m.i > bestI) {
						best = m;
						bestI = m.i;
					}
				}
				if (best) {
					best.hp -= 1;
					t.cool = .42;
					const p = along(best.i);
					shots.push({
						x: tx,
						y: ty,
						tx: p.x,
						ty: p.y,
						life: .12
					});
					beep(640, .03, .02);
					if (best.hp <= 0) {
						score += 1;
						purse += 4;
						if (score > hi) {
							hi = score;
							hiRef.current?.(hi);
						}
					}
				}
			}
			for (const s of shots) s.life -= dt;
			for (let i = shots.length - 1; i >= 0; i--) if (shots[i].life <= 0) shots.splice(i, 1);
			if (!mobs.some((m) => m.hp > 0) && spawnLeft <= 0 && state === "wave") {
				mobs.length = 0;
				if (wave >= WAVES.length) {
					state = "win";
					goldRef.current(18);
					if (score > hi) {
						hi = score;
						localStorage.setItem(`nexus-hold-hi-${hero}`, String(hi));
						hiRef.current?.(hi);
					}
				} else {
					state = "build";
					purse += 12;
				}
			}
		}
		function draw() {
			const w = size.w;
			const h = size.h;
			const cw = w / COLS;
			const ch = h / ROWS;
			ctx.fillStyle = INK;
			ctx.fillRect(0, 0, w, h);
			for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
				const path = PATH_SET.has(`${c},${r}`);
				ctx.fillStyle = path ? WOOD : r % 2 === c % 2 ? "#161615" : "#121211";
				ctx.fillRect(c * cw, r * ch, cw - 1, ch - 1);
			}
			ctx.strokeStyle = GOLD;
			ctx.globalAlpha = .22;
			ctx.lineWidth = 1;
			const rx = Math.sqrt(RANGE2) * w;
			const ry = Math.sqrt(RANGE2) * h;
			for (const t of towers) {
				ctx.beginPath();
				ctx.ellipse((t.c + .5) * cw, (t.r + .5) * ch, rx, ry, 0, 0, Math.PI * 2);
				ctx.stroke();
			}
			ctx.globalAlpha = 1;
			for (const t of towers) {
				ctx.fillStyle = OK;
				ctx.fillRect(t.c * cw + 4, t.r * ch + 4, cw - 8, ch - 8);
			}
			for (const m of mobs) {
				if (m.hp <= 0) continue;
				const p = along(m.i);
				ctx.fillStyle = DANGER;
				ctx.fillRect(p.x * w - 6, p.y * h - 6, 12, 12);
				ctx.fillStyle = GOLD;
				ctx.fillRect(p.x * w - 6, p.y * h - 9, 12 * (m.hp / m.max), 2);
			}
			ctx.strokeStyle = GOLD;
			ctx.lineWidth = 1;
			for (const s of shots) {
				ctx.globalAlpha = Math.max(0, s.life / .12);
				ctx.beginPath();
				ctx.moveTo(s.x * w, s.y * h);
				ctx.lineTo(s.tx * w, s.ty * h);
				ctx.stroke();
				ctx.globalAlpha = 1;
			}
			const base = along(PATH.length - 1);
			blitHero(ctx, heroImg, base.x * w, base.y * h + 8, 28, 36, CREW_FILTER[hero]);
			ctx.fillStyle = CREAM;
			ctx.font = "10px ui-monospace, monospace";
			const line = state === "ready" ? "TAP a pad to place. START WAVE holds the gate." : state === "lose" ? "LEAK. Unauthorized execute. TAP a pad / REBUILD." : state === "win" ? "GATE HELD. All waves hashed." : `W${wave}/${WAVES.length}  G${purse}  L${lives}  ${score}`;
			ctx.fillText(line, 8, 14);
		}
		const stop = runLoop(step, () => {
			const line = `${purse}|${lives}|${wave}|${state}|${score}`;
			if (line !== lastHud) {
				lastHud = line;
				setHud({
					gold: purse,
					lives,
					wave,
					state,
					score
				});
			}
			draw();
		});
		const onKey = (e) => {
			if (e.code === "Space" || e.code === "KeyW") {
				e.preventDefault();
				startWave();
			}
		};
		window.addEventListener("keydown", onKey);
		canvas.__startWave = startWave;
		canvas.__place = place;
		return () => {
			stop();
			disconnect();
			canvas.removeEventListener("pointerdown", onPtr);
			window.removeEventListener("keydown", onKey);
			if (window.__controlsTest) delete window.__controlsTest;
		};
	}, [hero]);
	const waveLabel = hud.state === "lose" ? "REBUILD" : hud.state === "win" ? "AGAIN" : "START WAVE";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-1 font-pixel text-[8px] text-muted",
			children: [
				hud.state.toUpperCase(),
				" · WAVE ",
				hud.wave,
				"/",
				WAVES.length,
				" · G",
				hud.gold,
				" · L",
				hud.lives,
				" · ",
				hud.score
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			id: "hold-canvas",
			className: "game-canvas",
			style: { touchAction: "none" },
			"aria-label": "Hold the Gate playfield"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				id: "btn-hold-wave",
				className: "arcade-ship",
				disabled: hud.state === "wave",
				onClick: () => {
					canvasRef.current?.__startWave?.();
				},
				children: waveLabel
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-body text-lg text-muted",
				children: [
					"Tap a dark pad · ",
					COST,
					" gold a tower · First targeting"
				]
			})]
		})
	] });
}
function CabinetPlay({ cab }) {
	const recordScore = useNexus((s) => s.recordScore);
	const onHi = (score) => recordScore({
		game: cab.id,
		title: cab.title,
		hero: cab.hero,
		score
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "cab-play-hero",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: heroSprite(cab.hero),
				alt: "",
				className: cn("cab-play-face", CREW_CLASS[cab.hero])
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-body text-lg text-muted",
				children: [
					heroName(cab.hero),
					" · ",
					cab.blurb
				]
			})]
		}),
		cab.engine === "paddle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaddleGame, {
			hero: cab.hero,
			onHi
		}) : null,
		cab.engine === "pellet" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PelletGame, {
			hero: cab.hero,
			onHi
		}) : null,
		cab.engine === "raid" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RaidGame, {
			hero: cab.hero,
			onHi
		}) : null,
		cab.engine === "hop" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HopGame, {
			hero: cab.hero,
			title: cab.title,
			seed: cab.seed,
			onHi
		}) : null,
		cab.engine === "snake" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SnakeGame, {
			hero: cab.hero,
			onHi
		}) : null,
		cab.engine === "drift" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DriftGame, {
			hero: cab.hero,
			onHi
		}) : null,
		cab.engine === "hold" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoldGame, {
			hero: cab.hero,
			onHi
		}) : null
	] });
}
function StationBot({ pose, name, flip, caption, role }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "station-bot",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: `/office/bot/${pose}.png?v=unit`,
				alt: "",
				className: cn("station-sprite", flip && "is-flip", role && CREW_CLASS[role]),
				draggable: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "agent-tag on",
				children: name
			}),
			caption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "station-cap",
				children: caption
			}) : null
		]
	});
}
var VALUE = {
	p: 100,
	n: 320,
	b: 330,
	r: 500,
	q: 900,
	k: 0
};
function depthFor(role) {
	return DUEL_DEPTH[role] ?? 1;
}
function pickMove(fen, depth, seed = 1) {
	const game = new Chess(fen);
	const moves = game.moves({ verbose: true });
	if (!moves.length) return null;
	const d = Math.max(1, Math.min(3, depth));
	let best = moves[seed % moves.length];
	let bestScore = -Infinity;
	const side = game.turn() === "w" ? 1 : -1;
	for (let i = 0; i < moves.length; i++) {
		const m = moves[(i + seed) % moves.length];
		game.move(m);
		const score = -minimax(game, d - 1, -Infinity, Infinity, -side);
		game.undo();
		const jitter = (seed * 13 + i * 7) % 5 - 2;
		if (score + jitter > bestScore) {
			bestScore = score + jitter;
			best = m;
		}
	}
	return {
		from: best.from,
		to: best.to,
		promotion: best.promotion ? "q" : void 0
	};
}
function minimax(game, depth, alpha, beta, side) {
	if (depth <= 0 || game.isGameOver()) return side * evaluate(game);
	const moves = game.moves({ verbose: true });
	let best = -Infinity;
	for (const m of moves) {
		game.move(m);
		const score = -minimax(game, depth - 1, -beta, -alpha, -side);
		game.undo();
		if (score > best) best = score;
		if (score > alpha) alpha = score;
		if (alpha >= beta) break;
	}
	return best;
}
function evaluate(game) {
	if (game.isCheckmate()) return game.turn() === "w" ? -2e4 : 2e4;
	if (game.isDraw()) return 0;
	let score = 0;
	const board = game.board();
	for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
		const p = board[r][c];
		if (!p) continue;
		const v = VALUE[p.type] ?? 0;
		const center = 3.5 - Math.abs(c - 3.5) + (3.5 - Math.abs(r - 3.5));
		score += (p.color === "w" ? 1 : -1) * (v + center);
	}
	score += game.moves().length * (game.turn() === "w" ? 1 : -1) / 4;
	return score;
}
function resultOf(game) {
	if (!game.isGameOver()) return null;
	if (game.isCheckmate()) return game.turn() === "w" ? "0-1" : "1-0";
	return "1/2-1/2";
}
var FILES = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h"
];
var GLYPH = {
	wk: "♔",
	wq: "♕",
	wr: "♖",
	wb: "♗",
	wn: "♘",
	wp: "♙",
	bk: "♚",
	bq: "♛",
	br: "♜",
	bb: "♝",
	bn: "♞",
	bp: "♟"
};
function DuelBoard() {
	const recordDuel = useNexus((s) => s.recordDuel);
	const grantFeat = useNexus((s) => s.grantFeat);
	const duels = useNexus((s) => s.club.duels);
	const scores = useNexus((s) => s.club.scores);
	const gameRef = (0, import_react.useRef)(new Chess());
	const [fen, setFen] = (0, import_react.useState)(gameRef.current.fen());
	const [sel, setSel] = (0, import_react.useState)(null);
	const [mode, setMode] = (0, import_react.useState)("you");
	const [white, setWhite] = (0, import_react.useState)("you");
	const [black, setBlack] = (0, import_react.useState)("qa");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [note, setNote] = (0, import_react.useState)("You are white. Tap a piece, then a square.");
	const auto = (0, import_react.useRef)(false);
	const legal = (0, import_react.useMemo)(() => {
		const g = gameRef.current;
		if (!sel) return /* @__PURE__ */ new Set();
		return new Set(g.moves({
			square: sel,
			verbose: true
		}).map((m) => m.to));
	}, [sel, fen]);
	function snap(msg) {
		const g = gameRef.current;
		setFen(g.fen());
		setSel(null);
		const end = resultOf(g);
		if (end) {
			auto.current = false;
			setBusy(false);
			const wName = white === "you" ? "YOU" : CREW[white].name;
			const bName = CREW[black].name;
			recordDuel({
				id: `duel-${Date.now().toString(16)}`,
				white: wName,
				black: bName,
				result: end,
				ply: g.history().length,
				ts: Date.now()
			});
			if (white === "you" && end === "1-0") grantFeat("champ");
			setNote(end === "1/2-1/2" ? "Draw. Stalemate or repetition." : end === "1-0" ? `${wName} mates.` : `${bName} mates.`);
			return;
		}
		if (msg) setNote(msg);
	}
	function boot(nextWhite, nextBlack, nextMode) {
		gameRef.current.reset();
		auto.current = nextMode === "watch";
		setWhite(nextWhite);
		setBlack(nextBlack);
		setMode(nextMode);
		setBusy(false);
		grantFeat("duel");
		snap(nextMode === "watch" ? `${CREW[nextWhite].name} vs ${CREW[nextBlack].name}. Depth ${depthFor(nextWhite)} / ${depthFor(nextBlack)}.` : `You vs ${CREW[nextBlack].name}. Depth ${depthFor(nextBlack)}.`);
	}
	function agentTurn() {
		const g = gameRef.current;
		if (g.isGameOver()) return;
		const turn = g.turn() === "w" ? white : black;
		if (turn === "you") return;
		setBusy(true);
		const pick = pickMove(g.fen(), depthFor(turn), g.history().length + 1);
		if (!pick) {
			snap();
			return;
		}
		g.move({
			from: pick.from,
			to: pick.to,
			promotion: pick.promotion
		});
		snap(`${CREW[turn].name} ${pick.from}${pick.to}`);
		setBusy(false);
	}
	(0, import_react.useEffect)(() => {
		if (gameRef.current.isGameOver()) return;
		const turn = gameRef.current.turn() === "w" ? white : black;
		if (turn === "you" && !auto.current) return;
		if (turn === "you") return;
		const id = window.setTimeout(() => agentTurn(), mode === "watch" ? 380 : 220);
		return () => window.clearTimeout(id);
	}, [
		fen,
		white,
		black,
		mode
	]);
	function tapSquare(sq) {
		const g = gameRef.current;
		if (busy || g.isGameOver()) return;
		if ((g.turn() === "w" ? white : black) !== "you") return;
		const piece = g.get(sq);
		if (sel && legal.has(sq)) {
			const mv = {
				from: sel,
				to: sq
			};
			const pawn = g.get(sel)?.type === "p";
			const promoRank = g.turn() === "w" ? "8" : "1";
			if (pawn && sq[1] === promoRank) mv.promotion = "q";
			if (g.move(mv)) snap("Your move hashed on the board. Agent thinks.");
			return;
		}
		if (piece && piece.color === g.turn()) {
			setSel(sq);
			return;
		}
		setSel(null);
	}
	const board = gameRef.current.board();
	const boardHi = boardRows({
		scores,
		duels,
		zone: "duel",
		plays: 0,
		tubeId: null,
		lastTune: null
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "theater-stage",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "duel-head",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Seat, {
						who: white === "you" ? "YOU" : CREW[white].name,
						role: white === "you" ? "operator" : white,
						side: "w"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-pixel text-[8px] text-muted",
						children: "VS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Seat, {
						who: CREW[black].name,
						role: black,
						side: "b"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "theater-note",
				children: note
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "chess-wrap",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "chess-board",
					role: "grid",
					"aria-label": "Chess board",
					children: board.map((row, r) => row.map((cell, c) => {
						const sq = `${FILES[c]}${8 - r}`;
						const dark = (r + c) % 2 === 1;
						const on = sel === sq;
						const mark = legal.has(sq);
						const king = cell?.type === "k" && gameRef.current.isCheck() && cell.color === gameRef.current.turn();
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: cn("chess-sq", dark && "dark", on && "on", mark && "mark", king && "check"),
							onClick: () => tapSquare(sq),
							"aria-label": sq,
							children: cell ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("chess-man", cell.color === "w" ? "is-w" : "is-b"),
								children: GLYPH[`${cell.color}${cell.type}`]
							}) : null
						}, sq);
					}))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "club-zones",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: cn("room-chip", mode === "you" && "on"),
						onClick: () => boot("you", black, "you"),
						children: "YOU"
					}),
					DUELISTS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: cn("room-chip", mode === "you" && black === r && "on"),
						onClick: () => boot("you", r, "you"),
						children: CREW[r].name
					}, r)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: cn("room-chip", mode === "watch" && "on"),
						onClick: () => boot("engineer", "qa", "watch"),
						children: "RIX VS NYX"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "room-chip",
						onClick: () => boot("cpo", "pm", "watch"),
						children: "VEX VS HAL"
					})
				]
			}),
			duels[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-body text-lg text-muted",
				children: [
					"Last ",
					duels[0].white,
					" vs ",
					duels[0].black,
					" · ",
					duels[0].result,
					" · ",
					duels[0].ply,
					" ply"
				]
			}) : null,
			boardHi.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "club-board",
				children: boardHi.slice(0, 4).map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-pixel text-[8px] text-muted",
						children: i + 1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-body text-lg text-cream",
						children: [
							s.title,
							" · ",
							heroName(s.hero)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-pixel text-[8px] text-gold tabular-nums",
						children: s.score
					})
				] }, `${s.game}-${i}`))
			}) : null
		]
	});
}
function Seat({ who, role, side }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "duel-seat",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StationBot, {
			pose: "idle",
			name: who,
			role,
			flip: side === "b"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "font-pixel text-[7px] text-muted",
			children: [
				side === "w" ? "WHITE" : "BLACK",
				" · ",
				CREW[role].job
			]
		})]
	});
}
function SteamLounge() {
	const raw = useNexus((s) => s.biz.cabinets);
	const cabinets = (0, import_react.useMemo)(() => hydrateCabinets(raw), [raw]);
	const play = useNexus((s) => s.playCabinet);
	const grantFeat = useNexus((s) => s.grantFeat);
	const scores = useNexus((s) => s.club.scores);
	(0, import_react.useEffect)(() => {
		grantFeat("steam");
	}, [grantFeat]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "theater-stage",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "theater-screen",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-body text-xl text-cream",
						children: "Steam lounge"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "theater-note",
						children: "Authorized handoff. Nexus does not copy, stream, or crack Steam games. The cabinets below are ours."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap justify-center gap-2",
						children: STEAM_LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "rail-link",
							href: l.href,
							target: "_blank",
							rel: "noopener noreferrer",
							children: l.title.toUpperCase()
						}, l.href))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-pixel text-[8px] text-gold",
				children: "NEXUS LIBRARY"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "tape-row",
				children: cabinets.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "tape-card",
					onClick: () => play(c.id),
					"aria-label": `Play ${c.title}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: heroSprite(c.hero),
							alt: "",
							className: cn("station-sprite", CREW_CLASS[c.hero]),
							draggable: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "cab-marquee",
							children: c.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "cab-bezel",
							children: [
								heroName(c.hero),
								" · HI ",
								c.hi || 0
							]
						})
					]
				}) }, c.id))
			}),
			scores.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-pixel text-[8px] text-gold",
				children: "BOARD"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "club-board",
				children: scores.slice(0, 6).map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-pixel text-[8px] text-muted",
						children: i + 1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-body text-lg text-cream",
						children: [
							s.title,
							" · ",
							heroName(s.hero)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-pixel text-[8px] text-gold tabular-nums",
						children: s.score
					})
				] }, `${s.game}-${s.ts}-${i}`))
			})] }) : null
		]
	});
}
function TubePortal() {
	const club = useNexus((s) => s.club);
	const setTube = useNexus((s) => s.setTube);
	const grantFeat = useNexus((s) => s.grantFeat);
	const [draft, setDraft] = (0, import_react.useState)("");
	const [err, setErr] = (0, import_react.useState)(null);
	const id = club.tubeId;
	function play(raw) {
		const next = parseYouTubeId(raw);
		if (!next) {
			setErr("Need a public YouTube URL or 11-character id.");
			return;
		}
		setErr(null);
		setTube(next);
		grantFeat("tube");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "theater-stage",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "theater-screen",
				"data-playing": id ? "1" : "0",
				children: id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "tube-frame",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
							title: "YouTube",
							src: youtubeEmbed(id),
							allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen",
							allowFullScreen: true,
							referrerPolicy: "strict-origin-when-cross-origin"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "rail-link",
						href: youtubeWatch(id),
						target: "_blank",
						rel: "noopener noreferrer",
						children: "OPEN ON YOUTUBE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "arcade-back",
						onClick: () => setTube(null),
						children: "STOP"
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-body text-xl text-muted",
					children: "Official YouTube embed. Paste a public URL. We don't scrape, host, or bypass anything."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "lib-search px-1",
				onSubmit: (e) => {
					e.preventDefault();
					play(draft);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "font-pixel text-[8px] text-gold",
						htmlFor: "tube-q",
						children: "PASTE URL"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dock-compose px-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "tube-q",
							className: "dock-input",
							value: draft,
							onChange: (e) => setDraft(e.target.value),
							placeholder: "youtube.com/watch?v=…",
							autoComplete: "off",
							inputMode: "url"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "dock-send",
							children: "PLAY"
						})]
					}),
					err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-body text-lg text-danger",
						children: err
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "tape-row",
				children: TUBE_REELS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: cn("tape-card", id === r.id && "on"),
					onClick: () => play(r.id),
					"aria-label": `Play ${r.title}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "cab-marquee",
						children: r.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "cab-bezel",
						children: r.note
					})]
				}) }, r.id))
			})
		]
	});
}
var PANES = [
	{
		id: "cabs",
		chip: "ARCADE"
	},
	{
		id: "tube",
		chip: "TUBE"
	},
	{
		id: "steam",
		chip: "STEAM"
	},
	{
		id: "duel",
		chip: "CHESS"
	}
];
function ArcadeFloor({ embedded }) {
	const biz = useNexus((s) => s.biz);
	const cabinets = hydrateCabinets(biz.cabinets);
	const playingId = useNexus((s) => s.playingId);
	const play = useNexus((s) => s.playCabinet);
	const close = useNexus((s) => s.closeCabinet);
	const stageCrew = useNexus((s) => s.stageCrew);
	const busy = useNexus((s) => s.busy);
	const working = useNexus((s) => s.working);
	const lastRun = useNexus((s) => s.lastRun);
	const zone = useNexus((s) => s.club.zone);
	const setClubZone = useNexus((s) => s.setClubZone);
	const forging = busy || working.includes("engineer");
	const playing = cabinets.find((c) => c.id === playingId) ?? null;
	const newest = cabinets[cabinets.length - 1]?.id;
	const pane = zone === "tube" || zone === "steam" || zone === "duel" ? zone : "cabs";
	(0, import_react.useEffect)(() => {
		if (!playing) return;
		const onKey = (e) => {
			if (e.key === "Escape") close();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [playing, close]);
	const body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "club-zones",
			"aria-label": "Entertainment",
			children: [PANES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				id: p.id === "cabs" ? "btn-club-cabs" : `btn-club-${p.id}`,
				className: cn("room-chip", pane === p.id && "on"),
				onClick: () => setClubZone(p.id === "cabs" ? "tapes" : p.id),
				children: p.chip
			}, p.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				id: "btn-ship-cab",
				className: "arcade-ship",
				disabled: busy,
				onClick: () => void stageCrew("rix", "ship arcade cabinet"),
				children: "SHIP"
			})]
		}),
		pane === "cabs" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "arcade-forge",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: forging ? "/office/bot/carry.png?v=unit" : "/office/bot/idle.png?v=unit",
				alt: "",
				className: cn("forge-rix", CREW_CLASS.engineer, forging && "working")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-body text-lg text-muted",
				children: forging ? "RIX is on the cabinet." : lastRun?.pathway === "arcade_ship" ? lastRun.detail : "Cabinets are ours. YouTube and Steam are logins. SHIP needs AUTH."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "arcade-row",
			children: cabinets.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CabinetFace, {
				cab: c,
				fresh: c.id === newest && c.ts > 0,
				onPlay: () => play(c.id)
			}) }, c.id))
		})] }) : null,
		pane === "tube" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TubePortal, {}) : null,
		pane === "steam" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SteamLounge, {}) : null,
		pane === "duel" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DuelBoard, {}) : null,
		playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskSheet, {
			title: playing.title,
			kicker: `${heroName(playing.hero)} · ${playing.engine.toUpperCase()}`,
			onClose: close,
			wide: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CabinetPlay, { cab: playing })
		}) : null
	] });
	if (embedded) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "hq-play",
		children: body
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CampusFrame, {
		kicker: `PLAY · ${cabinets.length} MACHINES`,
		title: "Entertainment",
		playing: !!playing,
		children: body
	});
}
function CabinetFace({ cab, fresh, onPlay }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: cn("cabinet", `cab-skin-${cab.skin}`, fresh && "fresh"),
		onClick: onPlay,
		"aria-label": `Play ${cab.title}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "cab-marquee",
				children: cab.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "cab-screen",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: heroSprite(cab.hero),
					alt: "",
					className: cn("cab-hero", CREW_CLASS[cab.hero])
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "cab-bezel",
				children: [
					heroName(cab.hero),
					" · HI ",
					cab.hi || "PLAY"
				]
			})
		]
	});
}
/** Furniture + walls in percent of the office stage. Feet collide at (x, y). */
var BLOCKS = [
	{
		x: 0,
		y: 0,
		w: 100,
		h: 28
	},
	{
		x: 0,
		y: 0,
		w: 8,
		h: 100
	},
	{
		x: 93,
		y: 0,
		w: 7,
		h: 100
	},
	{
		x: 0,
		y: 88,
		w: 100,
		h: 12
	},
	{
		x: 14,
		y: 32,
		w: 14,
		h: 18
	},
	{
		x: 30,
		y: 30,
		w: 16,
		h: 20
	},
	{
		x: 48,
		y: 50,
		w: 15,
		h: 14
	},
	{
		x: 78,
		y: 28,
		w: 16,
		h: 18
	},
	{
		x: 78,
		y: 54,
		w: 18,
		h: 24
	},
	{
		x: 37,
		y: 48,
		w: 8,
		h: 7
	}
];
var RADIUS = 3.4;
function overlap(a, b) {
	return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}
function blocked(x, y, r = RADIUS) {
	const me = {
		x: x - r,
		y: y - r * .55,
		w: r * 2,
		h: r * 1.1
	};
	return BLOCKS.some((b) => overlap(me, b));
}
function clampWalk(x, y) {
	return {
		x: Math.min(90, Math.max(12, x)),
		y: Math.min(84, Math.max(32, y))
	};
}
/** Open hall — no furniture collision. Lift is x≈18. */
function resolveOpen(_x, _y, nx, ny) {
	return {
		x: Math.min(88, Math.max(18, nx)),
		y: Math.min(82, Math.max(36, ny))
	};
}
function walkableSpot(x, y) {
	const c = clampWalk(x, y);
	if (!blocked(c.x, c.y)) return c;
	for (let i = 0; i < 12; i++) {
		const a = i / 12 * Math.PI * 2;
		const p = clampWalk(c.x + Math.cos(a) * 8, c.y + Math.sin(a) * 6);
		if (!blocked(p.x, p.y)) return p;
	}
	return {
		x: 54,
		y: 70
	};
}
var HOME = {
	engineer: {
		x: 44.6,
		y: 56.8,
		flip: false,
		sit: true,
		patrol: []
	},
	cpo: {
		x: 50,
		y: 64,
		flip: false,
		patrol: [
			[50, 64],
			[56, 72],
			[62, 60]
		]
	},
	pm: {
		x: 60,
		y: 44,
		flip: true,
		patrol: [
			[52, 44],
			[60, 44],
			[66, 52]
		]
	},
	qa: {
		x: 64,
		y: 66,
		flip: true,
		patrol: [
			[64, 66],
			[58, 74],
			[72, 58]
		]
	}
};
/** Stagers with a packet sit under the GATE CRT until COMMIT. */
var GATE_WAIT = {
	qa: walkableSpot(70, 36),
	engineer: walkableSpot(62, 36),
	pm: walkableSpot(74, 40),
	cpo: walkableSpot(54, 38)
};
var CORRIDOR = [
	[50, 42],
	[62, 40],
	[44, 68],
	[54, 72],
	[66, 72],
	[72, 58],
	[36, 64],
	[42, 58],
	[48, 78],
	[64, 48]
];
function stationWalk(id, except) {
	const home = HOME[id];
	const pts = (home.patrol.length ? home.patrol : CORRIDOR).map(([x, y]) => walkableSpot(x, y));
	const pool = except ? pts.filter((p) => Math.hypot(p.x - except.x, p.y - except.y) > 6) : pts;
	return (pool.length ? pool : pts)[Math.floor(Math.random() * (pool.length ? pool.length : pts.length))] ?? {
		x: home.x,
		y: home.y
	};
}
var START = Object.keys(HOME).map((id) => ({
	id,
	x: HOME[id].x,
	y: HOME[id].y,
	tx: HOME[id].x,
	ty: HOME[id].y,
	flip: HOME[id].flip,
	frame: 0,
	stuck: 0,
	patrol: 0
}));
var VER = "unit";
var BOT = "/office/bot";
var IDLE = `${BOT}/idle.png?v=${VER}`;
var SIT = `${BOT}/sit.png?v=${VER}`;
var TALK = `${BOT}/talk.png?v=${VER}`;
var CARRY = `${BOT}/carry.png?v=${VER}`;
var CHEER = `${BOT}/cheer.png?v=${VER}`;
var WAVE = `${BOT}/wave.png?v=${VER}`;
var SHAKE = `${BOT}/shake.png?v=${VER}`;
var WALK = [
	0,
	1,
	2,
	3
].map((i) => `${BOT}/walk-${i}.png?v=${VER}`);
function dist(a, b) {
	return Math.hypot(a.x - b.x, a.y - b.y);
}
function depthScale(y) {
	return .62 + y / 100 * .2;
}
function standNear(from, to) {
	const left = walkableSpot(to.x - 9, to.y + 1);
	const right = walkableSpot(to.x + 9, to.y + 1);
	return dist(from, left) <= dist(from, right) ? left : right;
}
function WalkingAgents({ floor = "office" }) {
	const meetCrew = useNexus((s) => s.meetCrew);
	const selected = useNexus((s) => s.selectedRole);
	const working = useNexus((s) => s.working);
	const busy = useNexus((s) => s.busy);
	const proposal = useNexus((s) => s.activeProposal);
	const lastRun = useNexus((s) => s.lastRun);
	const overlay = useNexus((s) => s.overlay);
	const briefed = useNexus((s) => s.briefed);
	const queue = useNexus((s) => s.queue);
	const viewing = canonicalRoom(useNexus((s) => s.room));
	const veiled = !!overlay || !briefed;
	const agents = (0, import_react.useRef)(START.map((a) => ({ ...a })));
	const nodes = (0, import_react.useRef)({});
	const [lines, setLines] = (0, import_react.useState)({});
	const [arrow, setArrow] = (0, import_react.useState)(null);
	const [caption, setCaption] = (0, import_react.useState)("");
	const talk = (0, import_react.useRef)(null);
	const talkClock = (0, import_react.useRef)(0);
	const beatIdx = (0, import_react.useRef)(0);
	const nextTalk = (0, import_react.useRef)(1.6);
	const skipSel = (0, import_react.useRef)(true);
	const frameAcc = (0, import_react.useRef)(0);
	const script = (0, import_react.useRef)(COMPANY);
	const veiledRef = (0, import_react.useRef)(veiled);
	veiledRef.current = veiled;
	const linesRef = (0, import_react.useRef)(lines);
	linesRef.current = lines;
	const workingRef = (0, import_react.useRef)(working);
	workingRef.current = working;
	const lastRunRef = (0, import_react.useRef)(lastRun);
	lastRunRef.current = lastRun;
	const selectedRef = (0, import_react.useRef)(selected);
	selectedRef.current = selected;
	const queueRef = (0, import_react.useRef)(queue);
	queueRef.current = queue;
	const floorRef = (0, import_react.useRef)(floor);
	floorRef.current = floor;
	const viewingRef = (0, import_react.useRef)(viewing);
	viewingRef.current = viewing;
	const arrived = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	(0, import_react.useEffect)(() => {
		if (proposal?.executed && lastRun) script.current = workBeats(lastRun.pathway, lastRun.goal, lastRun.ok ? "run" : "refuse");
		else if (proposal && !proposal.executed) script.current = workBeats(proposal.pathway ?? "assign", proposal.goal, "advise");
		else script.current = COMPANY;
		beatIdx.current = 0;
		nextTalk.current = .4;
	}, [
		proposal?.id,
		proposal?.status,
		lastRun?.id
	]);
	(0, import_react.useEffect)(() => {
		if (skipSel.current) {
			skipSel.current = false;
			return;
		}
		if (selected === "operator" || selected === "ceo" || selected === "cto") return;
		setLines({ [selected]: CREW[selected].tap });
		talk.current = null;
		setArrow(null);
		talkClock.current = 3.6;
		nextTalk.current = 5;
		setCaption(`${CREW[selected].name} · ${CREW[selected].job}`);
	}, [selected]);
	(0, import_react.useEffect)(() => {
		if (!busy && working.length === 0) return;
		const ids = working.filter((id) => id in HOME);
		setLines((prev) => {
			const next = { ...prev };
			for (const id of ids) next[id] = CREW[id].work;
			return next;
		});
		talkClock.current = 2.2;
	}, [busy, working]);
	(0, import_react.useEffect)(() => {
		let last = performance.now();
		let raf = 0;
		const loop = (t) => {
			const dt = Math.min(.08, (t - last) / 1e3);
			last = t;
			const list = agents.current;
			const onJob = busy || working.length > 0;
			const speaking = talk.current?.phase === "speak";
			const gateRoles = new Set(hydrateQueue(queueRef.current).filter((p) => !p.proposal.executed).map((p) => STAGER_ROLE[p.stager]));
			const here = floorRef.current;
			const onFloor = (id) => crewHall(id, {
				queue: hydrateQueue(queueRef.current),
				working: workingRef.current,
				viewing: viewingRef.current
			}) === here;
			if (onJob || gateRoles.size) list.forEach((a) => {
				if (gateRoles.has(a.id)) {
					const gate = GATE_WAIT[a.id];
					a.tx = gate.x;
					a.ty = gate.y;
					return;
				}
				const home = HOME[a.id];
				a.tx = home.x;
				a.ty = home.y;
			});
			frameAcc.current += dt;
			const step = frameAcc.current > .14;
			if (step) frameAcc.current = 0;
			for (const a of list) {
				if (!onFloor(a.id)) {
					arrived.current.delete(a.id);
					const el = nodes.current[a.id];
					if (el) el.style.display = "none";
					continue;
				}
				if (!arrived.current.has(a.id)) {
					arrived.current.add(a.id);
					a.x = 20;
					a.y = 56;
					a.tx = HOME[a.id].x;
					a.ty = HOME[a.id].y;
				}
				const elHide = nodes.current[a.id];
				if (elHide) elHide.style.display = "";
				const home = HOME[a.id];
				const atGate = gateRoles.has(a.id);
				if (home.sit && !atGate) {
					a.x += (home.x - a.x) * Math.min(1, 6 * dt);
					a.y += (home.y - a.y) * Math.min(1, 6 * dt);
					a.flip = home.flip;
					a.stuck = 0;
				} else {
					const dx = a.tx - a.x;
					const dy = a.ty - a.y;
					const m = Math.hypot(dx, dy);
					if (m < .55) {
						a.stuck = 0;
						if (!onJob && !talk.current && !atGate) {
							a.patrol = (a.patrol + 1) % Math.max(1, home.patrol.length);
							const spot = stationWalk(a.id, {
								x: a.x,
								y: a.y
							});
							a.tx = spot.x;
							a.ty = spot.y;
						}
					} else {
						const spd = talk.current?.phase === "approach" ? 16 : onJob ? 12 : 6.2;
						const nx = a.x + dx / m * spd * dt;
						const ny = a.y + dy / m * spd * dt;
						const moved = resolveOpen(a.x, a.y, nx, ny);
						if (Math.hypot(moved.x - a.x, moved.y - a.y) < spd * dt * .2) {
							a.stuck += dt;
							if (a.stuck > .45) {
								const detour = stationWalk(a.id, {
									x: a.x,
									y: a.y
								});
								a.tx = detour.x;
								a.ty = detour.y;
								a.stuck = 0;
							}
						} else a.stuck = 0;
						a.x = moved.x;
						a.y = moved.y;
						if (Math.abs(dx) > .2) a.flip = dx < 0;
						if (step) a.frame = (a.frame + 1) % 4;
					}
				}
			}
			for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
				const a = list[i];
				const b = list[j];
				const pair = !!talk.current && (talk.current.beat.from === a.id || talk.current.beat.to === a.id) && (talk.current.beat.from === b.id || talk.current.beat.to === b.id);
				const d = dist(a, b);
				const min = pair ? 7.5 : HOME[a.id].sit || HOME[b.id].sit ? 7 : 5.4;
				if (d < min && d > .01) {
					const push = (min - d) / 2 * .65;
					const ux = (a.x - b.x) / d;
					const uy = (a.y - b.y) / d;
					if (!HOME[a.id].sit) {
						const na = resolveOpen(a.x, a.y, a.x + ux * push, a.y + uy * push);
						a.x = na.x;
						a.y = na.y;
					}
					if (!HOME[b.id].sit) {
						const nb = resolveOpen(b.x, b.y, b.x - ux * push, b.y - uy * push);
						b.x = nb.x;
						b.y = nb.y;
					}
				}
			}
			if (talk.current?.phase === "approach") {
				const beat = talk.current.beat;
				const a = list.find((x) => x.id === beat.from);
				const b = list.find((x) => x.id === beat.to);
				talkClock.current -= dt;
				if (a && b && dist(a, b) < 14) {
					talk.current = {
						beat,
						phase: "speak"
					};
					talkClock.current = 3.8;
					a.flip = a.x > b.x;
					b.flip = b.x > a.x;
					setLines({ [beat.from]: beat.text });
					setArrow({
						x1: a.x,
						y1: a.y - 4,
						x2: b.x,
						y2: b.y - 4,
						label: beat.phase
					});
					setCaption(beatLabel(beat));
				} else if (talkClock.current <= 0) {
					talk.current = null;
					setArrow(null);
					nextTalk.current = 1.2;
				}
			} else if (talk.current?.phase === "speak") {
				const beat = talk.current.beat;
				const a = list.find((x) => x.id === beat.from);
				const b = list.find((x) => x.id === beat.to);
				talkClock.current -= dt;
				if (a && b) {
					setArrow({
						x1: a.x,
						y1: a.y - 4,
						x2: b.x,
						y2: b.y - 4,
						label: beat.phase
					});
					if (talkClock.current < 2) setLines({
						[beat.from]: beat.text,
						[beat.to]: beat.reply
					});
				}
				if (talkClock.current <= 0) {
					talk.current = null;
					setLines({});
					setArrow(null);
					setCaption("");
					nextTalk.current = onJob ? 1.1 : 2.2;
				}
			} else {
				nextTalk.current -= dt;
				if (talkClock.current > 0) {
					talkClock.current -= dt;
					if (talkClock.current <= 0) setLines({});
				}
				if (nextTalk.current <= 0 && !speaking) {
					if (veiledRef.current) nextTalk.current = 4;
					else {
						const beats = script.current;
						const beat = beats[beatIdx.current % beats.length];
						beatIdx.current += 1;
						const a = list.find((x) => x.id === beat.from);
						const b = list.find((x) => x.id === beat.to);
						if (a && b && onFloor(a.id) && onFloor(b.id)) {
							if (!HOME[a.id].sit) {
								const meet = standNear(a, b);
								a.tx = meet.x;
								a.ty = meet.y;
							}
							if (!HOME[b.id].sit) {
								const meet = standNear(b, a);
								b.tx = meet.x;
								b.ty = meet.y;
							}
							talk.current = {
								beat,
								phase: "approach"
							};
							talkClock.current = 5.5;
							setCaption(beatLabel(beat));
						}
						nextTalk.current = 8;
					}
				}
			}
			for (const a of list) {
				const el = nodes.current[a.id];
				if (!el) continue;
				const scale = depthScale(a.y);
				el.style.left = `${a.x}%`;
				el.style.top = `${a.y}%`;
				el.style.zIndex = String(8 + Math.floor(a.y / 8));
				el.style.transform = `translate(-50%, -88%) scale(${scale.toFixed(3)})`;
				el.dataset.side = a.x > 62 ? "right" : "left";
				const moving = (!HOME[a.id].sit || gateRoles.has(a.id)) && Math.hypot(a.tx - a.x, a.ty - a.y) > .7;
				el.classList.toggle("is-moving", moving);
				const flipEl = el.querySelector("[data-flip]");
				if (flipEl) flipEl.style.transform = a.flip ? "scaleX(-1)" : "scaleX(1)";
				const img = el.querySelector("img");
				if (img) {
					const atGate = gateRoles.has(a.id);
					const seated = Boolean(HOME[a.id].sit) && !atGate && !moving;
					const said = Boolean(linesRef.current[a.id]);
					const hauling = workingRef.current.includes(a.id);
					const won = Boolean(lastRunRef.current?.ok);
					const picked = selectedRef.current === a.id;
					let tag = "idle";
					let src = IDLE;
					if (seated) {
						tag = "sit";
						src = SIT;
					} else if (atGate && !moving) {
						tag = "sit-gate";
						src = SIT;
					} else if (moving) {
						tag = String(a.frame);
						src = WALK[a.frame] ?? IDLE;
					} else if (said) {
						tag = "talk";
						src = talk.current?.phase === "speak" ? SHAKE : TALK;
					} else if (hauling) {
						tag = "carry";
						src = CARRY;
					} else if (picked) {
						tag = "wave";
						src = WAVE;
					} else if (won) {
						tag = "cheer";
						src = CHEER;
					}
					if (img.dataset.frame !== tag) {
						img.dataset.frame = tag;
						img.src = src;
					}
				}
			}
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, [busy, working]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		caption && !veiled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "crew-beat",
			children: caption
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			className: "talk-svg",
			viewBox: "0 0 100 100",
			preserveAspectRatio: "none",
			"aria-hidden": true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("marker", {
				id: "talk-head",
				markerWidth: "3.2",
				markerHeight: "3.2",
				refX: "3",
				refY: "1.6",
				orient: "auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M0 0 L3.2 1.6 L0 3.2 Z",
					fill: "#fffdf6"
				})
			}) }), arrow ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: arrow.x1,
				y1: arrow.y1,
				x2: arrow.x2,
				y2: arrow.y2,
				className: "talk-arrow",
				markerEnd: "url(#talk-head)"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: (arrow.x1 + arrow.x2) / 2,
				y: (arrow.y1 + arrow.y2) / 2 - 1.8,
				className: "talk-label",
				children: arrow.label
			})] }) : null]
		}),
		START.map((seed) => {
			if (!ROLES[seed.id].sprite) return null;
			const soul = CREW[seed.id];
			const active = selected === seed.id || working.includes(seed.id);
			const seated = Boolean(HOME[seed.id].sit);
			const src = seated ? SIT : IDLE;
			const said = lines[seed.id];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				"data-agent": seed.id,
				ref: (el) => {
					nodes.current[seed.id] = el;
				},
				onClick: () => meetCrew(seed.id),
				style: {
					left: `${seed.x}%`,
					top: `${seed.y}%`,
					width: seated ? "9.2%" : "6.6%",
					transform: "translate(-50%, -88%)"
				},
				className: `agent-wrap${active ? " on" : ""}`,
				"aria-label": `${soul.name}, ${soul.title}`,
				children: [
					said && !veiled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "agent-bubble",
						children: said
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "agent-shadow" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-flip": "1",
						className: "block origin-bottom",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src,
							alt: "",
							className: `agent-sprite-img ${CREW_CLASS[seed.id]} ${seated ? "sit-idle" : ""}`,
							draggable: false
						})
					}),
					!veiled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `agent-tag ${active ? "on" : ""}`,
						children: soul.tag
					}) : null
				]
			}, seed.id);
		})
	] });
}
function ExchangeFloor({ embedded }) {
	const think = useNexus((s) => s.think);
	const stageCrew = useNexus((s) => s.stageCrew);
	const toggleAuto = useNexus((s) => s.toggleAuto);
	const biz = useNexus((s) => s.biz);
	const gold = useNexus((s) => s.gold);
	const stats = plantStats(biz);
	const book = bookPositions(biz.fills ?? []);
	const body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "campus-kicker",
			children: "Dropship and paper trade. Live market needs your keys. Crew AUTH. You COMMIT."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "machine-row",
			children: EXCHANGE_MACHINES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: cn("machine", m.id === "auto" && biz.autoOps && "on"),
				onClick: () => {
					if (m.kind === "toggle") {
						toggleAuto();
						return;
					}
					if (m.id === "restock") {
						stageCrew("nyx", m.hint);
						return;
					}
					if (m.hint) think(m.hint);
				},
				"aria-label": m.title,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StationBot, {
						pose: m.pose,
						name: m.chip,
						role: m.id === "auto" ? "operator" : m.id === "trade" ? "cpo" : m.id === "scan" ? "qa" : "engineer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "cab-marquee",
						children: m.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "cab-bezel",
						children: m.id === "auto" ? biz.autoOps ? "AUTO ON" : "ARM AUTO" : m.id === "restock" ? "NYX" : "THINK"
					})
				]
			}) }, m.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "exchange-ledgers",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "path-kind",
						children: "TICKER"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-body text-xl text-cream",
						children: [
							biz.halted ? "HALTED. " : "",
							stats.sku.toUpperCase(),
							" ",
							stats.stock,
							stats.low ? " · LOW" : "",
							" · HOLD ",
							stats.holds,
							" · DD ",
							((biz.drawdown ?? 0) * 100).toFixed(1),
							"%"
						]
					}),
					biz.lastSpot ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-body text-lg text-muted",
						children: [
							biz.lastSpot.symbol,
							" @ ",
							biz.lastSpot.price.toFixed(2),
							biz.lastScan ? ` · RSI ${biz.lastScan.rsi}` : ""
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-body text-lg text-muted",
						children: "No mark yet. TRADE thinks a paper ticket."
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "path-kind",
					children: "BOOK"
				}), book.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "font-body text-lg text-cream",
					children: book.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						p.symbol,
						" · ",
						p.qty,
						" @ ",
						p.avg
					] }, p.symbol))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-body text-lg text-muted",
					children: "Empty book. Paper only."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "path-kind",
						children: "YOUR RAILS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-body text-lg text-muted",
						children: [biz.name || "Unnamed shop", " · we don't take money."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2 mt-2",
						children: [
							biz.rails.cashApp ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "rail-link",
								href: cashAppHref(biz.rails.cashApp),
								target: "_blank",
								rel: "noreferrer",
								children: "Cash App"
							}) : null,
							biz.rails.paypal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "rail-link",
								href: paypalHref(biz.rails.paypal),
								target: "_blank",
								rel: "noreferrer",
								children: "PayPal"
							}) : null,
							biz.rails.venmo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "rail-link",
								href: venmoHref(biz.rails.venmo),
								target: "_blank",
								rel: "noreferrer",
								children: "Venmo"
							}) : null
						]
					})
				] })
			]
		})
	] });
	if (embedded) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "hq-desk",
		children: body
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CampusFrame, {
		kicker: "PAPER · LOCAL",
		title: "Business desk",
		extra: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "font-pixel text-[8px] text-muted",
			children: ["GOLD ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-cream tabular-nums",
				children: gold
			})]
		}),
		children: body
	});
}
function liveLine(room, ctx) {
	if (room === "exchange") return `${ctx.sku.toUpperCase()} ${ctx.stock}${ctx.low ? " · LOW" : ""}`;
	if (room === "arcade") return ctx.zone === "tapes" ? `${ctx.cabinets} CABINETS` : ctx.zone.toUpperCase();
	return "COUNTER";
}
function VaultFloor() {
	const setRoom = useNexus((s) => s.setRoom);
	const room = canonicalRoom(useNexus((s) => s.room));
	const speech = useNexus((s) => s.speech);
	const biz = useNexus((s) => s.biz);
	const queue = hydrateQueue(useNexus((s) => s.queue));
	const working = useNexus((s) => s.working);
	const club = useNexus((s) => s.club);
	const cabinets = (biz.cabinets ?? []).length;
	const stats = plantStats(biz);
	const pulse = new Set(queue.filter((p) => !p.proposal.executed).map((p) => crewHall(STAGER_ROLE[p.stager], {
		queue,
		working,
		viewing: room
	})));
	const ctx = {
		stock: String(stats.stock),
		sku: stats.sku,
		low: stats.low,
		cabinets,
		zone: club.zone
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "hq",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "vault-kicker",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-pixel text-[8px] text-gold",
				children: "ADL NEXUS"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "campus-kicker",
				children: speech || "Talk at the counter. Crew walks the job."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "hq-stack",
			children: VAULT_FLOORS.map((floor) => {
				const cell = floor.rooms[0];
				const focused = room === cell.room;
				const riding = pulse.has(cell.room);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					id: `vault-floor-${floor.id}`,
					className: cn("hq-floor", focused && "focus", riding && "pulse"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "hq-lift",
						onClick: () => setRoom(cell.room),
						"aria-label": `${floor.mark} ${floor.label}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "vault-mark",
							children: floor.mark
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "vault-lift-name",
							children: floor.label
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hq-chamber",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								id: `vault-room-${cell.room}`,
								className: "hq-enter",
								onClick: () => setRoom(cell.room),
								"aria-label": ROOMS[cell.room].label,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: `${cell.art}?v=hq`,
										alt: "",
										className: "vault-art",
										draggable: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "vault-shade",
										"aria-hidden": true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "vault-plaque",
										children: ROOMS[cell.room].chip
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "vault-live",
										children: liveLine(cell.room, ctx)
									}),
									!focused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "vault-blurb",
										children: cell.blurb
									}) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "agent-layer",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalkingAgents, { floor: cell.room })
							}),
							focused && cell.room === "arcade" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "hq-work",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArcadeFloor, { embedded: true })
							}) : null,
							focused && cell.room === "exchange" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "hq-work",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExchangeFloor, { embedded: true })
							}) : null
						]
					})]
				}, floor.id);
			})
		})]
	});
}
function PlantTicker() {
	const tick = useNexus((s) => s.tickPlant);
	const tickArcade = useNexus((s) => s.tickArcade);
	const tickHal = useNexus((s) => s.tickHal);
	const tickLab = useNexus((s) => s.tickLab);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => {
			tick();
			tickArcade();
			tickHal();
			tickLab();
		}, 8e3);
		return () => window.clearInterval(id);
	}, [
		tick,
		tickArcade,
		tickHal,
		tickLab
	]);
	return null;
}
function GateCrew({ queue, onPick }) {
	const waiting = waitingCrew(queue);
	if (!waiting.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "gate-crew",
		"aria-label": "Crew waiting at GOVERN",
		children: waiting.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			id: `gate-bot-${p.stager}`,
			className: cn("gate-unit", stagerClass(p.stager)),
			onClick: () => onPick(p.id),
			title: `${STAGER_NAME[p.stager]} staged ${p.title}. COMMIT or CLEAR.`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/office/bot/sit-desk.png?v=unit",
				alt: "",
				className: cn("gate-sprite", CREW_CLASS[STAGER_ROLE[p.stager]]),
				draggable: false
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "agent-tag on",
				children: STAGER_NAME[p.stager]
			})]
		}) }, p.stager))
	});
}
function PacketInspect({ packet, onDrop }) {
	const ev = asGovernEvent(packet);
	const hash = packet.hash || "hash pending";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "packet-inspect",
		id: "packet-inspect",
		"aria-label": "Packet inspector",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "path-kind",
				children: [
					"PACKET · ",
					ev.stager.agent_id,
					" · ",
					ev.pipeline.state
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "HASH" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "tabular-nums",
					title: hash,
					children: hash.length > 16 ? hash.slice(0, 16) : hash
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "SIG" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: ev.security.agent_signature })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "WHY" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: packet.reason })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "FROM" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [
					ev.stager.origin_hall,
					" · ",
					packet.pathway
				] })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "CAP" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: packet.policyId ?? "none · COMMIT is you" })] })
			] }),
			onDrop ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				id: "btn-packet-drop",
				className: "packet-drop",
				onClick: onDrop,
				children: "DROP"
			}) : null
		]
	});
}
var TABS = [
	{
		id: "chat",
		label: "CHAT"
	},
	{
		id: "lab",
		label: "LAB"
	},
	{
		id: "govern",
		label: "GOVERN"
	}
];
var STARTERS = [
	{
		label: "What can you do?",
		send: "What can this office actually do right now?"
	},
	{
		label: "Trade",
		send: "paper buy 0.01 BTC"
	},
	{
		label: "Restock",
		send: "restock 40 units"
	},
	{
		label: "Arcade",
		room: "arcade"
	},
	{
		label: "YouTube",
		send: "open YouTube"
	},
	{
		label: "Steam",
		send: "open Steam"
	}
];
function ReceptionDesk() {
	const messages = useNexus((s) => s.messages);
	const busy = useNexus((s) => s.busy);
	const draft = useNexus((s) => s.goalDraft);
	const setGoalDraft = useNexus((s) => s.setGoalDraft);
	const send = useNexus((s) => s.send);
	const think = useNexus((s) => s.think);
	const authorize = useNexus((s) => s.authorize);
	const commit = useNexus((s) => s.commit);
	const resetCycle = useNexus((s) => s.resetCycle);
	const proposal = useNexus((s) => s.activeProposal);
	const err = useNexus((s) => s.lastError);
	const overlay = useNexus((s) => s.overlay);
	const openOverlay = useNexus((s) => s.openOverlay);
	const closeOverlay = useNexus((s) => s.closeOverlay);
	const setLabPane = useNexus((s) => s.setLabPane);
	const labPane = useNexus((s) => s.labPane);
	const runLabTests = useNexus((s) => s.runLabTests);
	const tab = useNexus((s) => s.dockTab);
	const setDockTab = useNexus((s) => s.setDockTab);
	const selected = useNexus((s) => s.selectedRole);
	const selectRole = useNexus((s) => s.selectRole);
	const lastRun = useNexus((s) => s.lastRun);
	const halted = useNexus((s) => s.biz.halted);
	const drawdown = useNexus((s) => s.biz.drawdown ?? 0);
	const autoOps = useNexus((s) => s.biz.autoOps);
	const watches = useNexus((s) => s.biz.watches);
	const armWatch = useNexus((s) => s.armWatch);
	const inbound = useNexus((s) => s.inbound);
	const speech = useNexus((s) => s.speech);
	const briefed = useNexus((s) => s.briefed);
	const setRoom = useNexus((s) => s.setRoom);
	const room = useNexus((s) => s.room);
	const holds = useNexus((s) => (s.biz.orders ?? []).filter((o) => o.status === "held").length);
	const queue = useNexus((s) => s.queue);
	const policies = useNexus((s) => s.policies);
	const stageCrew = useNexus((s) => s.stageCrew);
	const pickPacket = useNexus((s) => s.pickPacket);
	const commitPacket = useNexus((s) => s.commitPacket);
	const commitAll = useNexus((s) => s.commitAll);
	const authAll = useNexus((s) => s.authAll);
	const signPolicy = useNexus((s) => s.signPolicy);
	const clearQueue = useNexus((s) => s.clearQueue);
	const dropPacket = useNexus((s) => s.dropPacket);
	const toggleAuto = useNexus((s) => s.toggleAuto);
	const [paths, setPaths] = (0, import_react.useState)(false);
	const bottom = (0, import_react.useRef)(null);
	const thread = messages.filter((m) => m.id !== "hello").slice(-10);
	const canAuth = !!proposal && !proposal.authorized;
	const canCommit = !!proposal && proposal.authorized && !proposal.executed;
	const asked = thread.length > 0;
	const plantOpen = overlay === "sim";
	const waiting = queue.filter((p) => !p.proposal.executed);
	const picked = waiting.find((p) => p.proposal.id === proposal?.id) ?? waiting[0] ?? null;
	const canAuthAll = canAuth || waiting.some((p) => !p.proposal.authorized);
	const canCommitAll = waiting.some((p) => p.proposal.authorized && !p.proposal.executed) || canCommit;
	const gateLine = waiting.length ? `${waiting.length} staged. AUTH done. COMMIT is you unless a signed cap matches.` : !proposal ? "Type an order, then THINK. Nothing runs until you COMMIT." : !proposal.authorized ? `${proposal.pathwayTitle ?? "Pathway"} ready. AUTH opens the gate.` : proposal.executed ? lastRun ? `${lastRun.title} · ${lastRun.ok ? "done" : "refused"}.` : "Cycle complete." : "Authorized. COMMIT executes and hashes.";
	(0, import_react.useEffect)(() => {
		bottom.current?.scrollIntoView({ behavior: "smooth" });
	}, [
		messages.length,
		busy,
		tab
	]);
	function goTab(id) {
		setDockTab(id);
		if (id === "chat") closeOverlay();
		if (id === "govern" && overlay !== "sim") closeOverlay();
		if (id === "lab" && overlay !== "ide" && overlay !== "files") closeOverlay();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "floor-dock",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "desk-top",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"data-agent": "operator",
					className: cn("desk-host", selected === "operator" && "on"),
					onClick: () => selectRole("operator"),
					"aria-label": "Operator / Reception",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: ROLES.operator.sit,
						alt: "",
						className: "desk-sitter crew-molt",
						draggable: false
					})
				}), speech && !overlay && tab === "chat" && briefed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "desk-bubble",
					children: speech
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "dock-tabs",
				"aria-label": "Desk",
				children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => goTab(t.id),
					className: cn("dock-tab", tab === t.id && "on"),
					children: [t.label, t.id === "govern" && waiting.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tab-count",
						children: waiting.length
					}) : null]
				}, t.id))
			}),
			tab === "chat" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [asked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dock-thread",
				"aria-live": "polite",
				children: [
					thread.map((m) => {
						const mine = m.role === "user";
						const who = mine ? "YOU" : m.name ? ROLES[m.name]?.label ?? m.name : "OPS";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: mine ? "ml-8" : "mr-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-pixel text-[7px] text-gold",
								children: who
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 bg-speech px-2 py-1 font-body text-base leading-5 text-ink",
								children: m.content
							})]
						}, m.id);
					}),
					busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-pixel text-[7px] text-muted",
						children: "On it…"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: bottom })
				]
			}) : null, !asked && !busy && briefed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dock-starters",
				"aria-label": "Start here",
				children: STARTERS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "dock-starter",
					onClick: () => {
						if ("send" in s && s.send) {
							send(s.send);
							return;
						}
						if ("room" in s && s.room) setRoom(s.room);
					},
					children: s.label
				}, s.label))
			}) : null] }) : null,
			tab === "lab" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dock-actions",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
						on: overlay === null && room === "office",
						onClick: () => {
							closeOverlay();
							setRoom("office");
						},
						label: "LOBBY"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
						on: labPane === "edit",
						onClick: () => setLabPane("edit"),
						label: "IDE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
						on: labPane === "test",
						onClick: () => runLabTests(),
						label: "TEST"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
						on: labPane === "run",
						onClick: () => setLabPane("run"),
						label: "RUN"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
						on: room === "arcade",
						onClick: () => setRoom("arcade"),
						label: "PLAY"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
						on: room === "exchange",
						onClick: () => setRoom("exchange"),
						label: "DESK"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
						on: false,
						onClick: () => {
							setDockTab("chat");
							send("Build a video grid demo in the lab IDE with search, a player, a sidebar, and comments.");
						},
						label: "REEL"
					})
				]
			}) : null,
			tab === "lab" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "dock-whisper",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-body text-base text-muted",
					children: "Edit, TEST, RUN at the counter. PLAY is entertainment. DESK is business."
				})
			}) : null,
			tab === "govern" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "govern-pane",
				children: [
					halted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "halt-banner",
						children: "DESK HALTED · resume before trade / stock / orders"
					}) : null,
					!halted && holds ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "hold-banner",
						children: [
							"HOLD ",
							holds,
							" · restock then DRAIN, or arm HOLD"
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "dock-whisper govern-next",
						children: gateLine
					}),
					!plantOpen && waiting.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GateCrew, {
						queue: waiting,
						onPick: pickPacket
					}) : null,
					!plantOpen && waiting.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "stage-list",
						"aria-label": "Staged packets",
						children: waiting.map((p) => {
							const on = proposal?.id === p.proposal.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								id: `stage-row-${p.id}`,
								className: cn("stage-row", stagerClass(p.stager), on && "on"),
								onClick: () => pickPacket(p.id),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "stage-who",
										children: STAGER_NAME[p.stager]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "stage-what",
										children: p.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "stage-state",
										children: p.proposal.authorized ? "AUTH" : "THINK"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "stage-go",
								disabled: !p.proposal.authorized || busy,
								onClick: () => void commitPacket(p.id),
								children: "COMMIT"
							})] }, p.id);
						})
					}) : null,
					!plantOpen && picked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PacketInspect, {
						packet: picked,
						onDrop: () => dropPacket(picked.id)
					}) : null,
					!plantOpen && !waiting.length ? lastRun ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "dock-whisper",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-pixel text-[7px] text-gold",
								children: lastRun.hash.slice(0, 8)
							}),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-body text-base text-muted",
								children: lastRun.detail
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "dock-whisper",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-body text-base text-muted",
							children: [
								"Paper / local. Drawdown ",
								(drawdown * 100).toFixed(1),
								"%."
							]
						})
					}) : null,
					!plantOpen && !waiting.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "pipe-row",
						"aria-label": "Automation pipeline",
						children: PIPE.map((s) => {
							const step = lastRun?.steps.find((x) => x.name === s);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: cn("pipe-step", step?.ok && "ok", step && !step.ok && "bad"),
								children: s
							}, s);
						})
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dock-actions",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
								id: "btn-think",
								on: !!proposal && !proposal.authorized,
								onClick: () => think(),
								label: "THINK"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
								id: "btn-authorize",
								on: canAuth,
								onClick: authorize,
								label: "AUTH",
								disabled: !canAuth
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
								id: "btn-commit",
								on: canCommit,
								onClick: () => void commit(),
								label: "COMMIT",
								disabled: !canCommit,
								ok: canCommit
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
								id: "btn-clear",
								on: false,
								onClick: resetCycle,
								label: "CLEAR",
								disabled: !proposal
							}),
							!plantOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
									id: "btn-auto",
									on: autoOps,
									onClick: toggleAuto,
									label: autoOps ? "AUTO ON" : "AUTO"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
									id: "btn-inbound",
									on: false,
									onClick: () => void inbound(),
									label: "ORDER"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
									on: false,
									onClick: () => openOverlay("sim"),
									label: "PLANT"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
									on: tab === "govern",
									onClick: () => setDockTab("govern"),
									label: "GATE"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
									on: paths,
									onClick: () => setPaths((v) => !v),
									label: "PATHS"
								})
							] }) : null
						]
					}),
					!plantOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "path-kind",
							children: "STAGE · NYX GOLD · RIX TEAL · HAL GREEN"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dock-actions govern-chips",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
									id: "btn-stage-nyx",
									className: "stage-nyx",
									on: waiting.some((p) => p.stager === "nyx"),
									onClick: () => void stageCrew("nyx"),
									label: "NYX",
									title: "Stage a cached restock. AUTH_NYX_DRAFT. COMMIT is you unless signed ≤ 10."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
									id: "btn-stage-rix",
									className: "stage-rix",
									on: waiting.some((p) => p.stager === "rix"),
									onClick: () => void stageCrew("rix"),
									label: "RIX",
									title: "Stage a sandbox cabinet. AUTH_RIX_DRAFT. Cabinets never auto-COMMIT."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
									id: "btn-stage-hal",
									className: "stage-hal",
									on: waiting.some((p) => p.stager === "hal"),
									onClick: () => void stageCrew("hal"),
									label: "HAL",
									title: "Stage a drain. AUTH_HAL_DRAFT. COMMIT is you unless drain-hold is signed."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
									id: "btn-stage-vex",
									className: "stage-vex",
									on: waiting.some((p) => p.stager === "vex"),
									onClick: () => void stageCrew("vex"),
									label: "VEX",
									title: "Stage a paper scan. AUTH_VEX_DRAFT. Trades never auto-COMMIT."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
									id: "btn-auth-all",
									on: canAuthAll,
									onClick: authAll,
									label: "AUTH ALL",
									disabled: !canAuthAll
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
									id: "btn-commit-all",
									on: canCommitAll,
									onClick: () => void commitAll(),
									label: "COMMIT ALL",
									disabled: !canCommitAll || busy,
									ok: canCommitAll
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
									id: "btn-queue-drop",
									on: false,
									onClick: clearQueue,
									label: "DROP",
									disabled: !waiting.length
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "path-kind",
							children: "SIGNED RULES · AUTO COMMIT ONLY INSIDE A CAP"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "dock-actions govern-chips",
							children: policies.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
								id: `btn-policy-${p.id}`,
								on: p.signed,
								onClick: () => signPolicy(p.id, !p.signed),
								label: p.title,
								title: p.signed ? "Signed. AUTO may COMMIT inside this cap." : "Unsigned. AUTO AUTH only."
							}, p.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "path-kind",
							children: "ARM WATCHES"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "dock-actions govern-chips",
							children: WATCH_DEFS.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
								on: !!watches?.[w.id]?.armed,
								onClick: () => armWatch(w.id, !watches?.[w.id]?.armed),
								label: w.chip,
								title: w.title
							}, w.id))
						}),
						paths ? PATHWAY_GROUPS.map((g) => {
							const rows = PATHWAYS.filter((p) => p.kind === g.kind && p.id !== "assign");
							if (!rows.length) return null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "path-kind",
								children: g.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "dock-actions govern-chips",
								children: rows.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
									on: proposal?.pathway === p.id || lastRun?.pathway === p.id,
									onClick: () => think(p.hint),
									label: p.chip,
									title: p.title
								}, p.id))
							})] }, g.kind);
						}) : null
					] }) : null
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "dock-compose",
				onSubmit: (e) => {
					e.preventDefault();
					send();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "sr-only",
						htmlFor: "nexus-goal",
						children: "Message reception"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "nexus-goal",
						value: draft,
						onChange: (e) => setGoalDraft(e.target.value),
						placeholder: busy ? "On it…" : tab === "govern" ? "State an order, then THINK…" : "Ask reception…",
						disabled: busy,
						autoComplete: "off",
						enterKeyHint: "send",
						className: "dock-input",
						suppressHydrationWarning: true
					}),
					tab === "govern" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						id: "btn-think-send",
						disabled: busy || !draft.trim() && !proposal,
						className: "dock-send",
						onClick: () => think(),
						children: "THINK"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						id: "btn-send",
						disabled: busy || !draft.trim(),
						className: "dock-send",
						children: "SEND"
					})
				]
			}),
			err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-3 pb-2 font-body text-base text-danger",
				children: err
			}) : null
		]
	});
}
function Action({ label, onClick, on, disabled, ok, id, title, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		id,
		title: title ?? label,
		onClick,
		disabled,
		className: cn("dock-action", on && "on", ok && "ok", className),
		children: label
	});
}
function CampusShell() {
	if (useNexus((s) => s.view) === "command") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlantTicker, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandShell, {})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlantTicker, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "floor-shell in-campus",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hud, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "floor-stage campus-stage",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VaultFloor, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfficeOverlay, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfficeBriefing, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceptionDesk, {})
		]
	})] });
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CampusShell, {});
}
//#endregion
export { Home as component };
