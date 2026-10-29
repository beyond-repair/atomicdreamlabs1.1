import { a as byId, c as parseTrade, l as registeredPathway, n as PATHWAYS, o as matchPathway, s as parseRestock, t as COMPLIANCE_NOTIONAL } from "./pathways-qAusL2xc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/codex-DnJQJiuP.js
/** Claim-capped operator memory of the beyond-repair / Atomic Dream Labs portfolio.
*  Filenames and READMEs are not capability. Runtime evidence is. */
var PORTFOLIO = `
You work for Atomic Dream Labs (ADL), org beyond-repair on GitHub (~75 public repos).
Operator knowledge — be specific when asked about "our" work. Do not invent live twins or production AGI.

ACTIVE RUNTIME SPINE (treat as the product this floor is):
- ADL-Nexus: request → governance → gate → pathway → hash → memory. Advise first; execute after authority. Paper/local adapters only.
- SESA: VSA D=10000 bipolar bind + SMT cohesion ≥ 0.95 + in-process ring + local merkle. Not Godot. Not a chain. COMMIT still operator.
- sovereign-clean-room: isolation, cryptographic gates, fail-closed. SUPERSEDES Gia AGI claims.
- sovereign-clean-room: isolation, cryptographic gates, fail-closed. SUPERSEDES Gia AGI claims.
- forge-aegis / AEGIS: security/build infrastructure, claim-cap ontology.
- Digital_Double_virtual_workforce: typed virtual workforce, role/queue, assign → complete. No autonomy claim.
- BlockSwarm: multi-agent coordination, authority vs settlement. Solidity + docs.

ABSORBABLE PATTERNS (use as office behavior, not sibling-runtime interop):
- Gia (SUPERSEDED): task decomposition + execute with minimal wait. Historical FastAPI sketch only.
- LegionOS: Founder/Builder/Growth/Ops/Agent Factory holarchy. Idea → plan → build. Public surface, not a live company OS.
- Sunder: SCAN (look up) → SNAP (plan) → SUNDER (write). Local coding agent pattern.
- RealityOS: scenario types, what-if, no live digital twin.
- RepoRover / DevelopTool: repo inspect + IDE. Partial/historical.
- VigilE.S.A.: security vocabulary (zero trust, gates) — not a running enclave here.

RESEARCH (paper/code, not this runtime):
Ware Constant W ≈ 0.08 phenomenology, CFT/IQG, Coherence Drive, Origin Point Hypothesis,
Informational Fork Protocol, Entanglement & Emergence, m2-renormalization-law.

ARCHIVED / DO NOT MERGE:
AtomicNexusAI is a different historical skeleton. Do not conflate with ADL-Nexus.
FortiTrade, Agent-Snake, smart_home_BCI, quantum A.I. optimization — archived experiments.

When the visitor says "our repos", "SEEM", "Digital Double", "Ware Constant", answer from this map first, then search_web only for current public facts.
`.trim();
function looksLikeWeather(text) {
	return /\b(weather|forecast|temperature|temp|humidity|rain|wind)\b/i.test(text);
}
function looksLikeRepos(text) {
	return /\b(repo|github|beyond-repair|our (code|stack|tech|repos?)|SEEM|LegionOS|BlockSwarm|Digital Double|Ware Constant|what can we implement)\b/i.test(text);
}
function looksLikeBuild(text) {
	return /\b(build|clone|make|create|write|app|youtube|website|game|ide|prototype|landing|shop|store|storefront|business|cash.?app|paypal|trade)\b/i.test(text);
}
function looksLikeFactory(text) {
	return /\b(pathways?|automat|workflow|restock|paper trade|audit pack|governance|what can (it|this|the floor|the office) (do|execute|run)|dropship|backtest|mean reversion|supplier|compliance|fulfill|watches?|auto ops|inbound|webhook|held|holds|drain|backorder|plant|low at|tier|capabilit|codex|achievements?)\b/i.test(text);
}
function looksLikeSunder(text) {
	return /\b(sunder|dead code|unused (code|function)|refactor (the )?lab|scan.?snap|audit repos)\b/i.test(text);
}
function looksLikeCodex(text) {
	return /\b(what can (you|it|this office|this floor|the office|the floor|this desk)|what (is|does) this (office|floor|app)|how does (this|the office) work|live map|capabilit(y|ies)|list (all )?(the )?(functions|features|abilities)|functions?,? features?,? and abilities|ability list|feature list)\b/i.test(text);
}
function looksLikeHorizon(text) {
	return /\b(plan a |roadmap|horizon plan|social network|long.?horizon)\b/i.test(text);
}
async function sha256Hex(text) {
	const bytes = new TextEncoder().encode(text);
	const subtle = globalThis.crypto?.subtle;
	if (!subtle) throw new Error("SHA-256 unavailable");
	const buf = await subtle.digest("SHA-256", bytes);
	return hex(new Uint8Array(buf));
}
function hex(bytes) {
	return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
}
function shortHash(hash) {
	return hash.slice(0, 12);
}
var DRAWDOWN_LIMIT = .05;
function synthBars(spot, n = 60, seed = 7) {
	const bars = [spot];
	let x = seed >>> 0;
	for (let i = 1; i < n; i++) {
		x = Math.imul(x, 1103515245) + 12345 >>> 0;
		const wiggle = (x % 1e3 / 1e3 - .5) * .012;
		bars.push(bars[i - 1] * (1 + wiggle));
	}
	return bars;
}
function rsi(bars, period = 14) {
	if (bars.length < period + 1) return 50;
	let gain = 0;
	let loss = 0;
	for (let i = bars.length - period; i < bars.length; i++) {
		const d = bars[i] - bars[i - 1];
		if (d >= 0) gain += d;
		else loss -= d;
	}
	if (loss === 0) return 100;
	const rs = gain / loss;
	return Math.round((100 - 100 / (1 + rs)) * 10) / 10;
}
function bollinger(bars, period = 20) {
	const slice = bars.slice(-Math.min(period, bars.length));
	const mean = slice.reduce((a, b) => a + b, 0) / slice.length;
	const variance = slice.reduce((a, b) => a + (b - mean) ** 2, 0) / slice.length;
	const sd = Math.sqrt(variance);
	return {
		mean: round2(mean),
		upper: round2(mean + 2 * sd),
		lower: round2(mean - 2 * sd)
	};
}
function ema(bars, period) {
	const k = 2 / (period + 1);
	let e = bars[0];
	const out = [e];
	for (let i = 1; i < bars.length; i++) {
		e = bars[i] * k + e * (1 - k);
		out.push(e);
	}
	return out;
}
function macdCrosses(bars) {
	const line = ema(bars, 12).map((v, i) => v - ema(bars, 26)[i]);
	const signal = ema(line, 9);
	let crosses = 0;
	let last = "none";
	for (let i = 1; i < line.length; i++) {
		const prev = line[i - 1] - signal[i - 1];
		const now = line[i] - signal[i];
		if (prev <= 0 && now > 0) {
			crosses += 1;
			last = "buy";
		} else if (prev >= 0 && now < 0) {
			crosses += 1;
			last = "sell";
		}
	}
	return {
		crosses,
		last
	};
}
function supplierQuotes(sku) {
	const seed = Array.from(sku).reduce((a, c) => a + c.charCodeAt(0), 0);
	return [
		{
			vendor: "Supplier X",
			unit: 8 + seed % 5,
			etaDays: 5
		},
		{
			vendor: "Supplier Y",
			unit: 7 + seed * 3 % 6,
			etaDays: 8
		},
		{
			vendor: "Supplier Z",
			unit: 9 + seed * 7 % 4,
			etaDays: 3
		}
	].sort((a, b) => a.unit - b.unit || a.etaDays - b.etaDays);
}
async function remember(key, body) {
	const text = typeof body === "string" ? body : JSON.stringify(body);
	return {
		key,
		hash: await sha256Hex(text),
		ts: Date.now(),
		body: text.slice(0, 480)
	};
}
async function hashFiles(files) {
	return sha256Hex(Object.keys(files).sort().map((k) => `${k}\n${files[k]}`).join("\n--\n") || "empty-lab");
}
function parseTicket(goal) {
	const t = goal.toLowerCase();
	if (/\brefund|chargeback\b/.test(t)) return {
		kind: "refund",
		route: "qa"
	};
	if (/\b(legal|compliance|regulator)\b/.test(t)) return {
		kind: "compliance",
		route: "ceo"
	};
	return {
		kind: "support",
		route: "cpo"
	};
}
function parseOrder(goal) {
	const m = goal.match(/(\d+)\s*(units|pcs|unit)?/i);
	return {
		qty: m ? Math.max(1, Number(m[1])) : 1,
		sku: /rasp|pi|offer-1/i.test(goal) ? "offer-1" : /scan|desk|offer-2/i.test(goal) ? "offer-2" : "offer-1"
	};
}
function bookPositions(fills) {
	const map = /* @__PURE__ */ new Map();
	for (const f of [...fills].reverse()) {
		const row = map.get(f.symbol) ?? {
			qty: 0,
			notional: 0
		};
		if (f.side === "buy") {
			row.notional += f.price * f.qty;
			row.qty += f.qty;
		} else {
			const avg = row.qty !== 0 ? row.notional / row.qty : f.price;
			row.qty -= f.qty;
			row.notional = avg * row.qty;
		}
		map.set(f.symbol, row);
	}
	return [...map.entries()].filter(([, r]) => Math.abs(r.qty) > 1e-8).map(([symbol, r]) => ({
		symbol,
		qty: Math.round(r.qty * 1e6) / 1e6,
		avg: r.qty !== 0 ? Math.round(r.notional / Math.abs(r.qty) * 100) / 100 : 0
	}));
}
function round2(n) {
	return Math.round(n * 100) / 100;
}
var CREW = {
	operator: {
		name: "MOLT",
		title: "Operator / Reception",
		job: "Gate",
		tag: "MOLT",
		tap: "You hold the key. GOVERN is THINK → AUTH → COMMIT.",
		work: "Routing. Not executing."
	},
	engineer: {
		name: "RIX",
		title: "Engineer",
		job: "Lab",
		tag: "RIX",
		tap: "I compile and AUTH the sandbox. GOVERN still ships.",
		work: "On the files."
	},
	cpo: {
		name: "VEX",
		title: "Chief Product Officer",
		job: "Plant / scope",
		tag: "VEX",
		tap: "Smallest ship that still sells. Paper / local.",
		work: "Cutting scope."
	},
	pm: {
		name: "HAL",
		title: "Project Manager",
		job: "Board",
		tag: "HAL",
		tap: "Owners first. Then the board. Nothing silent.",
		work: "Owners on the board."
	},
	qa: {
		name: "NYX",
		title: "Quality Assurance",
		job: "Proof",
		tag: "NYX",
		tap: "I stage the packet. You COMMIT. Signed cache can run itself.",
		work: "Checking the hash."
	},
	ceo: {
		name: "ASH",
		title: "Chief Executive Officer",
		job: "Horizon",
		tag: "ASH",
		tap: "You own COMMIT. I don't.",
		work: "Watching the gate."
	},
	cto: {
		name: "KITE",
		title: "Chief Technology Officer",
		job: "Version",
		tag: "KITE",
		tap: "Hash the lab. Rollback is local.",
		work: "Versioning."
	}
};
var CREW_CLASS = {
	operator: "crew-molt",
	engineer: "crew-rix",
	cpo: "crew-vex",
	pm: "crew-hal",
	qa: "crew-nyx",
	ceo: "crew-ash",
	cto: "crew-kite"
};
var CREW_FILTER = {
	operator: "saturate(0.4) brightness(1.06)",
	engineer: "hue-rotate(155deg) saturate(0.72)",
	cpo: "hue-rotate(-16deg) saturate(0.88)",
	pm: "hue-rotate(88deg) saturate(0.62)",
	qa: "hue-rotate(36deg) saturate(0.92) brightness(1.05)",
	ceo: "hue-rotate(205deg) saturate(0.5)",
	cto: "hue-rotate(255deg) saturate(0.52)"
};
var FLOOR_LINE = {
	operator: CREW.operator.tap,
	engineer: CREW.engineer.tap,
	cpo: CREW.cpo.tap,
	pm: CREW.pm.tap,
	qa: CREW.qa.tap,
	ceo: CREW.ceo.tap,
	cto: CREW.cto.tap
};
var CREW_DESK = {
	operator: null,
	engineer: "ide",
	cpo: "sim",
	pm: "plan",
	qa: "files",
	ceo: "plan",
	cto: "files"
};
var COMPANY = [
	{
		from: "pm",
		to: "cpo",
		phase: "idle",
		text: "Board's quiet. What's the smallest ship?",
		reply: "Whatever they can COMMIT today."
	},
	{
		from: "cpo",
		to: "engineer",
		phase: "idle",
		text: "Don't wait on a spec that isn't written.",
		reply: "Lab is idle. Send AUTH."
	},
	{
		from: "engineer",
		to: "qa",
		phase: "idle",
		text: "Files are local. No twin.",
		reply: "I'll hash whatever you actually wrote."
	},
	{
		from: "qa",
		to: "pm",
		phase: "idle",
		text: "No hash, no ship.",
		reply: "Owners stay on the board."
	},
	{
		from: "pm",
		to: "qa",
		phase: "idle",
		text: "Arcade hall is RIX. Cabinets need COMMIT.",
		reply: "Play is local. I'll still sign the drop."
	}
];
var RUN_LINE = {
	paper_trade: {
		instruct: "Hal: paper desk. Cap 2. Coinbase mark, local fill.",
		design: "Vex: not a live broker. Size the ticket.",
		code: "Rix: fill is local. I don't touch an exchange.",
		review: "Nyx: hash the fill or it didn't happen."
	},
	mean_reversion: {
		instruct: "Hal: mean-reversion sketch. Paper only.",
		design: "Vex: RSI band. Tiny size.",
		code: "Rix: walking the synthetic book.",
		review: "Nyx: no live order. Hash the note."
	},
	market_scan: {
		instruct: "Hal: scan the mark. Indicators only.",
		design: "Vex: RSI + Bollinger. No trade yet.",
		code: "Rix: pulling the spot, writing the scan.",
		review: "Nyx: numbers in the clean room."
	},
	backtest: {
		instruct: "Hal: MACD on a synthetic walk.",
		design: "Vex: no live tape. Local bars.",
		code: "Rix: running the walk.",
		review: "Nyx: I'll sign the BACKTEST pack."
	},
	restock: {
		instruct: "Hal: restock the ledger. CPO owns inventory.",
		design: "Vex: units in, gold out. No supplier API.",
		code: "Rix: stock file is in the lab.",
		review: "Nyx: count it, then hash."
	},
	dropship_order: {
		instruct: "Hal: fulfill against on-hand. Don't oversell.",
		design: "Vex: local order. Not Shopify.",
		code: "Rix: writing ORDER.md.",
		review: "Nyx: stock must drop. I'll check."
	},
	drain_holds: {
		instruct: "Hal: drain held orders. Oldest first.",
		design: "Vex: only if on-hand covers it.",
		code: "Rix: flipping HELD to filled.",
		review: "Nyx: hash the drain."
	},
	supplier_quote: {
		instruct: "Hal: three local quotes. Pick cheapest.",
		design: "Vex: no Alibaba call. Deterministic vendors.",
		code: "Rix: QUOTES.md on the desk.",
		review: "Nyx: cheapest wins. Hash it."
	},
	support_route: {
		instruct: "Hal: refund language — route to Nyx.",
		design: "Vex: don't argue. Ticket it.",
		code: "Rix: TICKET.md in the lab.",
		review: "Nyx: I own refunds. Logged."
	},
	shop_publish: {
		instruct: "Hal: publish the shop into the lab.",
		design: "Vex: their rails. We don't take the money.",
		code: "Rix: writing the storefront.",
		review: "Nyx: TEST before RUN."
	},
	lab_build: {
		instruct: "Hal: ship a local lab demo. Not a live clone.",
		design: "Vex: Floorcast / landing / calc. Smallest ship.",
		code: "Rix: files are in the monitor. Don't wait.",
		review: "Nyx: search, player, comments — I'll break it."
	},
	arcade_ship: {
		instruct: "Hal: RIX forges a cabinet. Hall only. You still COMMIT.",
		design: "Vex: one machine, one hero. Local play.",
		code: "Rix: spec is on the bench. Cabinet drops after AUTH.",
		review: "Nyx: if it isn't hashed, it didn't ship."
	},
	sunder: {
		instruct: "Hal: SCAN the lab. SNAP a hash. SUNDER the dead weight.",
		design: "Vex: sibling repos stay untouched. Lab only.",
		code: "Rix: cutting unused. Patch is local.",
		review: "Nyx: SCAN.md and SUNDER.md or it didn't happen."
	},
	horizon: {
		instruct: "Hal: long horizon. Owners and tests on every step.",
		design: "Vex: cut it until this floor can actually run it.",
		code: "Rix: BOARD.md is the record. I don't start without tests.",
		review: "Nyx: supervised. Not a 24-hour unsupervised run."
	},
	lab_qa: {
		instruct: "Hal: Nyx owns this. Don't skip checks.",
		design: "Vex: if it fails, we don't ship.",
		code: "Rix: files are on the desk.",
		review: "Nyx: running checks now."
	},
	design_version: {
		instruct: "Hal: hash the lab. Version or rollback.",
		design: "Vex: firmware-style. Local only.",
		code: "Rix: snapshotting files.",
		review: "Nyx: SHA-256 or it didn't happen."
	},
	risk_halt: {
		instruct: "Hal: kill switch. Fail closed.",
		design: "Vex: paper desk freezes. Resume is a new commit.",
		code: "Rix: I stop touching fills.",
		review: "Nyx: halt is on the ledger."
	},
	risk_resume: {
		instruct: "Hal: operator override. Still paper.",
		design: "Vex: reopen the desk. Cap holds.",
		code: "Rix: desk is live-local.",
		review: "Nyx: I'll watch the next fill."
	},
	audit_pack: {
		instruct: "Hal: provenance pack. Nyx writes it.",
		design: "Vex: local proof. Not a filing.",
		code: "Rix: dumping the ledger into the lab.",
		review: "Nyx: hashed. AUDIT.md is the record."
	},
	compliance_scan: {
		instruct: "Hal: size-cap scan. Flag fat tickets.",
		design: "Vex: we don't file this. We remember it.",
		code: "Rix: COMPLIANCE.md on the desk.",
		review: "Nyx: I'll sign the flag."
	}
};
function workBeats(pathway, goal, mode) {
	const pack = RUN_LINE[pathway] ?? {
		instruct: `Hal: objective — ${goal.slice(0, 42)}. Owners on the board.`,
		design: "Vex: cut it to what this floor can actually run.",
		code: "Rix: I'll take the lab if you authorize.",
		review: "Nyx: no hash, no ship."
	};
	if (mode === "refuse") return [{
		from: "pm",
		to: "qa",
		phase: "instruct",
		text: pack.instruct,
		reply: "Gate stays closed."
	}, {
		from: "qa",
		to: "pm",
		phase: "review",
		text: pack.review,
		reply: "No AUTH, no ship."
	}];
	if (mode === "advise") return [{
		from: "pm",
		to: "cpo",
		phase: "instruct",
		text: pack.instruct,
		reply: "Scope it. Then AUTH."
	}, {
		from: "cpo",
		to: "engineer",
		phase: "design",
		text: pack.design,
		reply: "I won't touch files until COMMIT."
	}];
	return [
		{
			from: "pm",
			to: "cpo",
			phase: "instruct",
			text: pack.instruct,
			reply: "Cut it. Then go."
		},
		{
			from: "cpo",
			to: "engineer",
			phase: "design",
			text: pack.design,
			reply: "Spec is tight."
		},
		{
			from: "engineer",
			to: "qa",
			phase: "code",
			text: pack.code,
			reply: "I'll break it."
		},
		{
			from: "qa",
			to: "pm",
			phase: "review",
			text: pack.review,
			reply: "Signed."
		}
	];
}
function crewForPathway(pathway) {
	if ([
		"paper_trade",
		"live_trade",
		"mean_reversion",
		"market_scan",
		"backtest"
	].includes(pathway)) return [
		"cpo",
		"qa",
		"pm"
	];
	if ([
		"restock",
		"dropship_order",
		"drain_holds",
		"supplier_quote"
	].includes(pathway)) return ["cpo", "pm"];
	if ([
		"shop_publish",
		"lab_qa",
		"design_version",
		"lab_build",
		"arcade_ship"
	].includes(pathway)) return [
		"engineer",
		"qa",
		"pm"
	];
	if (["sunder", "horizon"].includes(pathway)) return [
		"cpo",
		"engineer",
		"qa",
		"pm"
	];
	if (["risk_halt", "risk_resume"].includes(pathway)) return [
		"operator",
		"qa",
		"pm"
	];
	if ([
		"audit_pack",
		"compliance_scan",
		"support_route",
		"sesa_cycle",
		"sesa_revert"
	].includes(pathway)) return [
		"qa",
		"cto",
		"pm"
	];
	return ["pm", "engineer"];
}
var ROLES = {
	ceo: {
		label: "CEO",
		title: "Chief Executive Officer",
		rail: true
	},
	cpo: {
		label: "CPO",
		title: "Chief Product Officer",
		sprite: "/office/bot/idle.png?v=unit",
		rail: true
	},
	cto: {
		label: "CTO",
		title: "Chief Technology Officer",
		rail: true
	},
	qa: {
		label: "QA",
		title: "Quality Assurance",
		sprite: "/office/bot/idle.png?v=unit",
		rail: true
	},
	operator: {
		label: "OPS",
		title: "Operator / Reception",
		sprite: "/office/bot/idle.png?v=unit",
		sit: "/office/bot/sit-desk.png?v=unit",
		rail: true
	},
	engineer: {
		label: "ENG",
		title: "Engineer",
		sprite: "/office/bot/idle.png?v=unit",
		sit: "/office/bot/sit.png?v=unit",
		rail: false
	},
	pm: {
		label: "PM",
		title: "Project Manager Agent",
		sprite: "/office/bot/idle.png?v=unit",
		rail: false
	}
};
var LOOP = [
	"IDENTITY",
	"MEMORY",
	"REALITY",
	"WORKFORCE",
	"SIMULATION",
	"GOVERNANCE",
	"SANDBOX",
	"PROOF",
	"LEARNING"
];
var HEROES = [
	"engineer",
	"qa",
	"cpo",
	"pm",
	"operator"
];
var STARTER_CABINETS = [
	{
		id: "cab-paddle",
		title: "PACKET PADDLE",
		engine: "paddle",
		hero: "engineer",
		blurb: "RIX keeps the packet in. Drag or L/R.",
		seed: 1,
		skin: 0,
		hi: 0,
		ts: 0
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
		ts: 0
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
		ts: 0
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
		ts: 0
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
		ts: 0
	}
];
var FORGE = [
	{
		title: "GATE HOP",
		engine: "hop",
		hero: "operator",
		blurb: "MOLT hops the leak. Tap jump. A/D in air."
	},
	{
		title: "PROOF HOLD",
		engine: "hold",
		hero: "qa",
		blurb: "NYX. Hold the gate. First targeting."
	},
	{
		title: "ROCK DRIFT",
		engine: "drift",
		hero: "cpo",
		blurb: "VEX. A left. D right. W thrust. FIRE."
	},
	{
		title: "HASH SNAKE",
		engine: "snake",
		hero: "qa",
		blurb: "NYX. Eat. Don't loop."
	},
	{
		title: "PROOF RAID",
		engine: "raid",
		hero: "qa",
		blurb: "NYX. A left. D right. FIRE."
	},
	{
		title: "SCOPE PADDLE",
		engine: "paddle",
		hero: "cpo",
		blurb: "VEX keeps the packet in."
	},
	{
		title: "BOARD HOP",
		engine: "hop",
		hero: "pm",
		blurb: "HAL. Owners first. Then jump."
	},
	{
		title: "LAB DRIFT",
		engine: "drift",
		hero: "engineer",
		blurb: "RIX. Spec first. Then burn."
	},
	{
		title: "LAB RAID",
		engine: "raid",
		hero: "engineer",
		blurb: "RIX. Spec first. Then fire."
	},
	{
		title: "KEY SNAKE",
		engine: "snake",
		hero: "operator",
		blurb: "MOLT routes the wire."
	},
	{
		title: "HASH HOP",
		engine: "hop",
		hero: "qa",
		blurb: "If it isn't hashed, it didn't hop."
	},
	{
		title: "KEY PADDLE",
		engine: "paddle",
		hero: "operator",
		blurb: "MOLT on the gate. Don't drop it."
	},
	{
		title: "SCOPE PELLET",
		engine: "pellet",
		hero: "cpo",
		blurb: "Smallest maze that still sells."
	},
	{
		title: "GATE DRIFT",
		engine: "drift",
		hero: "operator",
		blurb: "MOLT. Nose left on A."
	},
	{
		title: "LAB HOP",
		engine: "hop",
		hero: "engineer",
		blurb: "RIX. Jump the gap. Tests after."
	},
	{
		title: "PROOF PADDLE",
		engine: "paddle",
		hero: "qa",
		blurb: "NYX. Miss it and it didn't happen."
	},
	{
		title: "BOARD RAID",
		engine: "raid",
		hero: "pm",
		blurb: "HAL. Clear the sky. Then the board."
	},
	{
		title: "GATE PELLET",
		engine: "pellet",
		hero: "operator",
		blurb: "MOLT routes. You eat."
	}
];
function heroSprite(hero) {
	const role = ROLES[hero];
	return role?.sprite || role?.sit || "/office/bot/idle.png?v=unit";
}
function heroName(hero) {
	return {
		operator: "MOLT",
		engineer: "RIX",
		cpo: "VEX",
		pm: "HAL",
		qa: "NYX",
		ceo: "ASH",
		cto: "KITE"
	}[hero];
}
function looksLikeArcade(text) {
	return /\b(arcade|cabinet|new game|ship (a )?cabinet|forge (a )?(game|cabinet)|build (a )?(cabinet|arcade game))\b/i.test(text);
}
function slug(title, n) {
	return `cab-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${n.toString(16)}`;
}
function nextCabinet(existing) {
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
		ts: Date.now()
	};
}
function hydrateCabinets(raw) {
	if (!raw?.length) return STARTER_CABINETS.map((c) => ({ ...c }));
	const have = new Set(raw.map((c) => c.id));
	return [...STARTER_CABINETS.filter((s) => !have.has(s.id)).map((c) => ({ ...c })), ...raw].filter((c, i, all) => all.findIndex((x) => x.id === c.id) === i).slice(0, 16);
}
var DEFAULT_RULES = {
	sku: "offer-1",
	lowAt: 20,
	restockQty: 40,
	inboundQty: 25,
	symbol: "BTC"
};
var WATCH_DEFS = [
	{
		id: "stock_low",
		title: "Low stock",
		chip: "LOW",
		cooldown: 2e4,
		claim: "Local ledger. No supplier API."
	},
	{
		id: "drain",
		title: "Drain holds",
		chip: "HOLD",
		cooldown: 15e3,
		claim: "Fills parked orders after restock. Local only."
	},
	{
		id: "rsi_band",
		title: "RSI band",
		chip: "RSI",
		cooldown: 35e3,
		claim: "Paper fill only. Not a live broker."
	},
	{
		id: "scan_tick",
		title: "Scan cadence",
		chip: "TICK",
		cooldown: 4e4,
		claim: "Spot mark + local indicators."
	}
];
function clampInt(n, min, max, fallback) {
	const v = Number(n);
	if (!Number.isFinite(v)) return fallback;
	return Math.min(max, Math.max(min, Math.round(v)));
}
function hydrateRules(raw) {
	const sku = raw?.sku === "offer-2" ? "offer-2" : "offer-1";
	const symbol = String(raw?.symbol ?? "BTC").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 5);
	return {
		sku,
		lowAt: clampInt(raw?.lowAt, 1, 500, DEFAULT_RULES.lowAt),
		restockQty: clampInt(raw?.restockQty, 1, 500, DEFAULT_RULES.restockQty),
		inboundQty: clampInt(raw?.inboundQty, 1, 500, DEFAULT_RULES.inboundQty),
		symbol: symbol.length >= 2 ? symbol : "BTC"
	};
}
function watchCopy(id, rules) {
	if (id === "stock_low") return {
		when: `${rules.sku} on hand < ${rules.lowAt}`,
		hint: `restock ${rules.restockQty} units ${rules.sku}`
	};
	if (id === "drain") return {
		when: "held order and stock covers it",
		hint: "drain held orders"
	};
	if (id === "rsi_band") return {
		when: `last ${rules.symbol} RSI < 30 or > 70`,
		hint: `run mean reversion on ${rules.symbol}`
	};
	return {
		when: `every ~40s ${rules.symbol}`,
		hint: `scan market ${rules.symbol}`
	};
}
function defaultWatchState() {
	return Object.fromEntries(WATCH_DEFS.map((w) => [w.id, {
		armed: false,
		lastFire: 0,
		lastReason: ""
	}]));
}
function hydrateWatches(raw) {
	const base = defaultWatchState();
	if (!raw) return base;
	for (const def of WATCH_DEFS) {
		const row = raw[def.id];
		if (row) base[def.id] = {
			armed: !!row.armed,
			lastFire: row.lastFire ?? 0,
			lastReason: row.lastReason ?? ""
		};
	}
	return base;
}
function plantStats(biz) {
	const rules = hydrateRules(biz.rules);
	const stock = biz.stock?.[rules.sku] ?? 0;
	const holds = (biz.orders ?? []).filter((o) => o.status === "held");
	return {
		sku: rules.sku,
		stock,
		lowAt: rules.lowAt,
		restockQty: rules.restockQty,
		inboundQty: rules.inboundQty,
		symbol: rules.symbol,
		holds: holds.length,
		heldQty: holds.reduce((a, o) => a + o.qty, 0),
		halted: !!biz.halted,
		auto: !!biz.autoOps,
		rsi: biz.lastScan?.rsi ?? null,
		scanSymbol: biz.lastScan?.symbol ?? rules.symbol,
		low: stock < rules.lowAt
	};
}
function evaluateWatches(args) {
	const watches = hydrateWatches(args.watches);
	const rules = hydrateRules(args.rules);
	const holds = args.holds ?? [];
	const out = [];
	for (const def of WATCH_DEFS) {
		const st = watches[def.id];
		if (!st.armed) continue;
		if (args.now - st.lastFire < def.cooldown) continue;
		const copy = watchCopy(def.id, rules);
		if (def.id === "stock_low") {
			const n = args.stock[rules.sku] ?? 0;
			if (n < rules.lowAt && !args.halted) out.push({
				id: def.id,
				hint: copy.hint,
				reason: `${rules.sku} on hand ${n} < ${rules.lowAt}`
			});
		} else if (def.id === "drain") {
			const oldest = [...holds].reverse().find((h) => h.status === "held");
			if (oldest && !args.halted && (args.stock[oldest.sku] ?? 0) >= oldest.qty) out.push({
				id: def.id,
				hint: copy.hint,
				reason: `cover ${oldest.qty} ${oldest.sku}`
			});
		} else if (def.id === "rsi_band") {
			const r = args.lastScan?.rsi;
			if (r != null && (r < 30 || r > 70) && !args.halted) out.push({
				id: def.id,
				hint: copy.hint,
				reason: `RSI ${r}`
			});
		} else if (def.id === "scan_tick") out.push({
			id: def.id,
			hint: copy.hint,
			reason: "cadence"
		});
	}
	return out;
}
function inspectWatches(state, rules) {
	const st = hydrateWatches(state);
	const r = hydrateRules(rules);
	return WATCH_DEFS.map((w) => {
		const row = st[w.id];
		const copy = watchCopy(w.id, r);
		return `${w.id} · ${row.armed ? "ARMED" : "cold"} · ${copy.when} · ${w.claim} · fire: ${copy.hint}`;
	}).join("\n");
}
function inboundHint(qty, sku = DEFAULT_RULES.sku) {
	return `new order ${Math.max(1, Math.floor(qty))} units ${sku}`;
}
/** Spec D = 10_000 bipolar. Real vectors, not a toy dim. */
var HYPER_DIM = 1e4;
var COHESION_THRESHOLD = .95;
var DEFAULT_SYMBOLS = [
	"INTENT",
	"ACTION",
	"GATE",
	"AUTH",
	"COMMIT",
	"HASH",
	"VSA",
	"SMT",
	"CREW",
	"PAPER",
	"HALT",
	"CORE"
];
var LIFECYCLE = [
	{
		id: "encode",
		title: "1 ENCODE",
		note: "Perception · D=10,000 bipolar"
	},
	{
		id: "bind",
		title: "2 BIND",
		note: "Hadamard association"
	},
	{
		id: "smt",
		title: "3 SMT",
		note: "AC-3 · cohesion ≥ 0.95"
	},
	{
		id: "dispatch",
		title: "4 DISPATCH",
		note: "Ring · GOVERN COMMIT"
	},
	{
		id: "check",
		title: "5 CHECK",
		note: "Local merkle · governor you"
	}
];
var EMPTY_ROOT = "0".repeat(64);
var DEFAULT_SESA = {
	symbols: [...DEFAULT_SYMBOLS],
	intent: "GATE",
	action: "COMMIT",
	preview: null,
	ring: [],
	cursor: 0,
	merkleRoot: EMPTY_ROOT,
	lock: false,
	lastVerifiedIdx: -1,
	telemetry: []
};
function sanitizeSymbol(raw) {
	return raw.toUpperCase().replace(/[^A-Z0-9_]/g, "").slice(0, 16);
}
function hydrateSesa(raw) {
	const symbols = (raw?.symbols ?? DEFAULT_SESA.symbols).map(sanitizeSymbol).filter(Boolean).filter((k, i, a) => a.indexOf(k) === i).slice(0, 32);
	return {
		...DEFAULT_SESA,
		...raw,
		symbols: symbols.length ? symbols : [...DEFAULT_SYMBOLS],
		intent: sanitizeSymbol(raw?.intent ?? "GATE") || "GATE",
		action: sanitizeSymbol(raw?.action ?? "COMMIT") || "COMMIT",
		preview: raw?.preview ?? null,
		ring: Array.isArray(raw?.ring) ? raw.ring.slice(-64) : [],
		cursor: Math.max(0, raw?.cursor ?? 0),
		merkleRoot: raw?.merkleRoot || EMPTY_ROOT,
		lock: !!raw?.lock,
		lastVerifiedIdx: raw?.lastVerifiedIdx ?? -1,
		telemetry: Array.isArray(raw?.telemetry) ? raw.telemetry.slice(0, 24) : []
	};
}
function fnv1a(text) {
	let h = 2166136261;
	for (let i = 0; i < text.length; i++) {
		h ^= text.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}
function xorshift(seed) {
	let x = seed || 1;
	return () => {
		x ^= x << 13;
		x ^= x >>> 17;
		x ^= x << 5;
		return x >>> 0;
	};
}
/** Deterministic bipolar encoder. Same key → same vector. Replayable. */
function encodeSymbol(key) {
	const rng = xorshift(fnv1a(sanitizeSymbol(key) || "NULL") || 1);
	const v = new Int8Array(HYPER_DIM);
	for (let i = 0; i < HYPER_DIM; i++) v[i] = rng() & 1 ? 1 : -1;
	return v;
}
/** Hadamard bind. Involution: (a * b) * a = b. */
function bind(a, b) {
	const out = new Int8Array(HYPER_DIM);
	for (let i = 0; i < HYPER_DIM; i++) out[i] = a[i] * b[i];
	return out;
}
var unbind = bind;
/** Cosine on the bipolar sphere = dot / D. */
function similarity(a, b) {
	let dot = 0;
	for (let i = 0; i < HYPER_DIM; i++) dot += a[i] * b[i];
	return dot / HYPER_DIM;
}
function vectorFingerprint(v) {
	let h = 2166136261;
	for (let i = 0; i < v.length; i += 16) {
		h ^= v[i] + 1;
		h = Math.imul(h, 16777619);
	}
	return (h >>> 0).toString(16).padStart(8, "0");
}
function sliceBarcode(v, n = 128) {
	const out = [];
	const step = Math.max(1, Math.floor(HYPER_DIM / n));
	for (let i = 0; i < n; i++) out.push(v[i * step] ?? 1);
	return out;
}
/** Pairwise FNV fold. Paper merkle — not keccak, not a chain. */
function pairHash(a, b) {
	const h = fnv1a(`${a}|${b}`);
	const g = fnv1a(`${b}|${a}|${h}`);
	return h.toString(16).padStart(8, "0") + g.toString(16).padStart(8, "0");
}
function merkleRootOf(leaves) {
	if (!leaves.length) return EMPTY_ROOT;
	let layer = leaves.slice();
	while (layer.length > 1) {
		if (layer.length % 2) layer.push(layer[layer.length - 1]);
		const next = [];
		for (let i = 0; i < layer.length; i += 2) next.push(pairHash(layer[i], layer[i + 1]));
		layer = next;
	}
	return layer[0];
}
function merkleProofOf(leaves, index) {
	if (!leaves.length || index < 0 || index >= leaves.length) return [];
	const proof = [];
	let layer = leaves.slice();
	let idx = index;
	while (layer.length > 1) {
		if (layer.length % 2) layer.push(layer[layer.length - 1]);
		const sib = idx % 2 === 0 ? layer[idx + 1] : layer[idx - 1];
		proof.push(sib);
		const next = [];
		for (let i = 0; i < layer.length; i += 2) next.push(pairHash(layer[i], layer[i + 1]));
		layer = next;
		idx = Math.floor(idx / 2);
	}
	return proof;
}
function verifyMerkleProof(leaf, proof, root, index) {
	let hash = leaf;
	let idx = index;
	for (const sib of proof) {
		hash = idx % 2 === 0 ? pairHash(hash, sib) : pairHash(sib, hash);
		idx = Math.floor(idx / 2);
	}
	return hash === root;
}
/** AC-3 style prune: drop "pass" if any hard invariant fails. */
function ac3(payload, knownIntent, knownAction) {
	const invariants = [
		{
			id: "intent",
			ok: knownIntent,
			note: knownIntent ? "intent in item memory" : "intent unknown — encode first"
		},
		{
			id: "action",
			ok: knownAction,
			note: knownAction ? "action in item memory" : "action unknown — encode first"
		},
		{
			id: "lock",
			ok: !payload.execution_lock,
			note: payload.execution_lock ? "execution lock — resume first" : "lock open"
		},
		{
			id: "cohesion",
			ok: Number.isFinite(payload.cohesion) && payload.cohesion >= .95,
			note: Number.isFinite(payload.cohesion) ? `cohesion ${payload.cohesion.toFixed(4)} ${payload.cohesion >= .95 ? "≥" : "<"} ${COHESION_THRESHOLD}` : "cohesion not finite"
		}
	];
	const pruned = invariants.filter((i) => !i.ok).map((i) => i.note);
	return {
		ok: pruned.length === 0,
		pruned,
		invariants
	};
}
function parseSesaGoal(goal) {
	const t = goal.trim();
	if (/\b(sesa revert|revert token|snap (to )?(the )?verified|rollback sesa)\b/i.test(t)) return {
		intent: "GATE",
		action: "COMMIT",
		admit: false,
		revert: true
	};
	const encode = t.match(/\bencode(?:\s+symbol)?\s+([A-Za-z0-9_]+)/i);
	if (encode) {
		const k = sanitizeSymbol(encode[1]) || "SYMBOL";
		return {
			intent: k,
			action: k,
			admit: true,
			revert: false
		};
	}
	const bindMatch = t.match(/\bbind\s+([A-Za-z0-9_]+)\s+to\s+([A-Za-z0-9_]+)/i);
	if (bindMatch) return {
		intent: sanitizeSymbol(bindMatch[1]) || "GATE",
		action: sanitizeSymbol(bindMatch[2]) || "COMMIT",
		admit: false,
		revert: false
	};
	const cycle = t.match(/\b(?:sesa cycle|vsa cycle|run sesa)\s+([A-Za-z0-9_]+)\s+([A-Za-z0-9_]+)/i);
	if (cycle) return {
		intent: sanitizeSymbol(cycle[1]) || "GATE",
		action: sanitizeSymbol(cycle[2]) || "COMMIT",
		admit: false,
		revert: false
	};
	return {
		intent: "GATE",
		action: "COMMIT",
		admit: false,
		revert: false
	};
}
function log(state, line) {
	return {
		...state,
		telemetry: [`${(/* @__PURE__ */ new Date()).toISOString().slice(11, 19)} ${line}`, ...state.telemetry].slice(0, 24)
	};
}
function rememberSymbol(state, key) {
	const k = sanitizeSymbol(key);
	if (!k) return log(state, "ENCODE refused — empty symbol");
	if (state.symbols.includes(k)) return log(state, `ENCODE ${k} already in item memory`);
	if (state.symbols.length >= 32) return log(state, "ENCODE refused — item memory full");
	return log({
		...state,
		symbols: [...state.symbols, k]
	}, `ENCODE ${k} · workspace only`);
}
function setPair(state, intent, action) {
	return {
		...state,
		intent: sanitizeSymbol(intent) || state.intent,
		action: sanitizeSymbol(action) || state.action
	};
}
function proposeCycle(state, intent = state.intent, action = state.action, admit = false) {
	const i = sanitizeSymbol(intent) || "GATE";
	const a = sanitizeSymbol(action) || "COMMIT";
	const knownI = admit || state.symbols.includes(i);
	const knownA = admit || state.symbols.includes(a);
	const vi = knownI ? encodeSymbol(i) : encodeSymbol(`∅-${i}`);
	const va = knownA ? encodeSymbol(a) : encodeSymbol(`∅-${a}`);
	const bound = bind(vi, va);
	const extracted = unbind(bound, vi);
	const cohesion = knownI && knownA ? similarity(extracted, va) : 0;
	const checked = ac3({
		state_id: Date.now(),
		cohesion,
		execution_lock: state.lock
	}, knownI, knownA);
	return {
		intent: i,
		action: a,
		cohesion,
		ok: checked.ok,
		pruned: checked.pruned,
		invariants: checked.invariants,
		fingerprint: vectorFingerprint(bound)
	};
}
function previewBind(state, intent = state.intent, action = state.action) {
	const preview = proposeCycle(state, intent, action, false);
	const line = preview.ok ? `SMT pass · ${preview.intent}⊗${preview.action} · ${preview.cohesion.toFixed(4)}` : `SMT refuse · ${preview.pruned.join("; ")}`;
	return log({
		...state,
		intent: preview.intent,
		action: preview.action,
		preview
	}, line);
}
async function commitCycle(state, intent, action, admit = false) {
	const preview = proposeCycle(state, intent ?? state.intent, action ?? state.action, admit);
	if (!preview.ok) return {
		ok: false,
		state: log({
			...state,
			preview
		}, `SMT refuse · not dispatched · ${preview.pruned.join("; ")}`),
		error: `SMT refuse · ${preview.pruned.join("; ")}`
	};
	const idx = state.cursor;
	const ts = Date.now();
	const leaf = await sha256Hex(JSON.stringify({
		idx,
		ts,
		intent: preview.intent,
		action: preview.action,
		cohesion: preview.cohesion,
		fp: preview.fingerprint
	}));
	const frame = {
		ts,
		idx,
		intent: preview.intent,
		action: preview.action,
		cohesion: preview.cohesion,
		ok: true,
		leaf,
		fingerprint: preview.fingerprint
	};
	const symbols = state.symbols.includes(preview.intent) ? state.symbols : [...state.symbols, preview.intent];
	const withAction = symbols.includes(preview.action) ? symbols : [...symbols, preview.action];
	const ring = [...state.ring, frame].slice(-64);
	const merkleRoot = merkleRootOf(ring.map((f) => f.leaf));
	return {
		ok: true,
		state: log({
			...state,
			symbols: withAction.slice(0, 32),
			intent: preview.intent,
			action: preview.action,
			preview,
			ring,
			cursor: idx + 1,
			merkleRoot,
			lastVerifiedIdx: idx
		}, `DISPATCH ${idx} · ${preview.intent}⊗${preview.action} · ${leaf.slice(0, 12)}`),
		frame
	};
}
function revertVerified(state) {
	if (!state.ring.length) return {
		ok: false,
		state: log(state, "REVERT refused — no verified manifold"),
		error: "No verified manifold to snap back to."
	};
	const keep = state.ring.slice(0, -1);
	const last = keep[keep.length - 1] ?? null;
	const merkleRoot = merkleRootOf(keep.map((f) => f.leaf));
	return {
		ok: true,
		state: log({
			...state,
			ring: keep,
			cursor: (last?.idx ?? -1) + 1,
			merkleRoot,
			lastVerifiedIdx: last?.idx ?? -1,
			preview: null
		}, `REVERT · snapped to frame ${last?.idx ?? "none"} · ${merkleRoot.slice(0, 12)}`)
	};
}
function replayFrame(state, idx) {
	return state.ring.find((f) => f.idx === idx) ?? null;
}
function setSesaLock(state, lock) {
	return log({
		...state,
		lock
	}, lock ? "LOCK · execution frozen" : "UNLOCK · lock lifted");
}
function lifeLit(state) {
	return {
		encode: state.symbols.length ? "ok" : "off",
		bind: state.preview ? "ok" : "off",
		smt: !state.preview ? "off" : state.preview.ok ? "ok" : "bad",
		dispatch: state.ring.length ? "ok" : "off",
		check: state.merkleRoot !== EMPTY_ROOT ? "ok" : "off"
	};
}
/** Associative recall against item memory. Self-similarity is 1. */
function nearest(state, probe, k = 4) {
	const v = typeof probe === "string" ? encodeSymbol(sanitizeSymbol(probe) || "NULL") : probe;
	return state.symbols.map((key) => ({
		key,
		sim: similarity(v, encodeSymbol(key))
	})).sort((a, b) => b.sim - a.sim).slice(0, Math.max(1, k));
}
function recallPair(state) {
	const vi = encodeSymbol(state.intent);
	const bound = bind(vi, encodeSymbol(state.action));
	const extracted = unbind(bound, vi);
	return {
		intent: nearest(state, vi, 3),
		action: nearest(state, extracted, 3),
		bound
	};
}
function dualReality(state) {
	return {
		governor: "operator",
		workspace: {
			symbols: state.symbols,
			intent: state.intent,
			action: state.action,
			cohesion: state.preview?.cohesion ?? null,
			ok: state.preview?.ok ?? null,
			fingerprint: state.preview?.fingerprint ?? null,
			pruned: state.preview?.pruned ?? []
		},
		verified: {
			frames: state.ring.map((f) => ({
				idx: f.idx,
				pair: `${f.intent}⊗${f.action}`,
				cohesion: f.cohesion,
				leaf: f.leaf.slice(0, 12)
			})),
			merkleRoot: state.merkleRoot,
			lastVerifiedIdx: state.lastVerifiedIdx
		}
	};
}
/** Replay a dispatched frame into the workspace. Does not mutate the ring. */
function loadFrame(state, idx) {
	const f = replayFrame(state, idx);
	if (!f) return log(state, `REPLAY refused · no frame ${idx}`);
	const preview = proposeCycle(state, f.intent, f.action, false);
	return log({
		...state,
		intent: f.intent,
		action: f.action,
		preview
	}, `REPLAY ${idx} · ${f.intent}⊗${f.action} · workspace only`);
}
function triage(state) {
	const last = state.ring[state.ring.length - 1] ?? null;
	const bytes = state.symbols.length * HYPER_DIM + state.ring.length * 180;
	const notes = [
		`VSA D=${HYPER_DIM} bipolar`,
		`item memory ${state.symbols.length}/32`,
		`ring ${state.ring.length}/64 · cursor ${state.cursor}`,
		`merkle ${state.merkleRoot.slice(0, 16)}`,
		state.lock ? "execution lock ON" : "lock open",
		last ? `last cohesion ${last.cohesion.toFixed(4)}` : "no dispatched frame",
		"governor operator · local only",
		"in-process ring. not mmap. not a chain."
	];
	return {
		ok: !state.lock && (!last || last.ok),
		bytes,
		frames: state.ring.length,
		lock: state.lock,
		cohesion: last?.cohesion ?? null,
		merkleRoot: state.merkleRoot,
		notes
	};
}
var DEFAULT_BIZ = {
	name: "",
	pitch: "",
	rails: {
		cashApp: "",
		paypal: "",
		venmo: "",
		wallet: ""
	},
	offerings: [{
		id: "offer-1",
		name: "Custom build",
		price: "150",
		note: "Lab page, tested, launched here"
	}, {
		id: "offer-2",
		name: "Paper desk scan",
		price: "25",
		note: "BTC mark + a written plan"
	}],
	autoOps: false,
	fills: [],
	lastSpot: null,
	lastTest: null,
	stock: {
		"offer-1": 40,
		"offer-2": 12
	},
	halted: false,
	peakGold: 25e3,
	drawdown: 0,
	orders: [],
	tickets: [],
	memory: [],
	versions: [],
	lastScan: null,
	watches: defaultWatchState(),
	rules: hydrateRules(),
	cabinets: STARTER_CABINETS.map((c) => ({ ...c })),
	lastCabinetAt: 0,
	sesa: { ...DEFAULT_SESA }
};
function hydrateBiz(b) {
	return {
		...DEFAULT_BIZ,
		...b,
		rails: {
			...DEFAULT_BIZ.rails,
			...b?.rails ?? {}
		},
		offerings: b?.offerings?.length ? b.offerings : DEFAULT_BIZ.offerings,
		fills: b?.fills ?? [],
		stock: {
			...DEFAULT_BIZ.stock,
			...b?.stock ?? {}
		},
		halted: b?.halted ?? false,
		peakGold: b?.peakGold ?? DEFAULT_BIZ.peakGold,
		drawdown: b?.drawdown ?? 0,
		orders: (b?.orders ?? []).map((o) => ({
			...o,
			status: o.status === "held" ? "held" : "filled"
		})),
		tickets: b?.tickets ?? [],
		memory: b?.memory ?? [],
		versions: b?.versions ?? [],
		lastScan: b?.lastScan ?? null,
		watches: hydrateWatches(b?.watches),
		rules: hydrateRules(b?.rules),
		cabinets: hydrateCabinets(b?.cabinets),
		lastCabinetAt: b?.lastCabinetAt ?? 0,
		sesa: hydrateSesa(b?.sesa)
	};
}
function offeringPrice(biz, sku) {
	const n = Number(biz.offerings.find((o) => o.id === sku)?.price);
	return Number.isFinite(n) && n > 0 ? n : 50;
}
function cleanHandle(v) {
	return v.replace(/[^A-Za-z0-9._$@/-]/g, "").slice(0, 64);
}
function cashAppHref(tag) {
	const t = cleanHandle(tag).replace(/^\$/, "");
	if (!t) return "";
	return `https://cash.app/$${t}`;
}
function paypalHref(v) {
	const s = v.trim();
	if (!s) return "";
	if (/^https?:\/\//i.test(s)) return s.slice(0, 120);
	if (s.includes("@")) return `mailto:${cleanHandle(s)}`;
	const h = cleanHandle(s).replace(/^@/, "");
	return h ? `https://www.paypal.me/${h}` : "";
}
function venmoHref(v) {
	const h = cleanHandle(v).replace(/^@/, "");
	return h ? `https://venmo.com/u/${h}` : "";
}
function shopFiles(biz) {
	const name = biz.name.trim() || "Atomic Dream Labs shop";
	const pitch = biz.pitch.trim() || "Built on this floor. Pay the operator on their rails — we do not take the money.";
	const cash = cashAppHref(biz.rails.cashApp);
	const pay = paypalHref(biz.rails.paypal);
	const ven = venmoHref(biz.rails.venmo);
	const wallet = cleanHandle(biz.rails.wallet);
	const offers = biz.offerings.filter((o) => o.name.trim()).map((o) => `<article class="card"><h2>${esc(o.name)}</h2><p class="price">$${esc(o.price)}</p><p>${esc(o.note)}</p></article>`).join("");
	const payBtns = [
		cash ? `<a class="pay cash" href="${esc(cash)}" target="_blank" rel="noopener">Pay Cash App</a>` : "",
		pay ? `<a class="pay pal" href="${esc(pay)}" target="_blank" rel="noopener">Pay Pal / PayPal</a>` : "",
		ven ? `<a class="pay ven" href="${esc(ven)}" target="_blank" rel="noopener">Venmo</a>` : ""
	].filter(Boolean).join("");
	return {
		"index.html": `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(name)}</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <header>
      <p class="kicker">ADL NEXUS · SHOP</p>
      <h1>${esc(name)}</h1>
      <p>${esc(pitch)}</p>
    </header>
    <section class="grid">${offers || "<p>No offerings yet. Add them on the shop desk.</p>"}</section>
    <section class="rails">
      <h2>Pay the operator</h2>
      <p class="fine">These buttons open YOUR Cash App / PayPal / Venmo. This lab does not process cards or move funds.</p>
      <div class="row">${payBtns || "<p>Drop a Cash App $cashtag or PayPal handle on the shop desk, then publish again.</p>"}</div>
      ${wallet ? `<p class="wallet">Wallet <code>${esc(wallet)}</code></p>` : ""}
    </section>
    <p id="status">Shop ready.</p>
    <script src="main.js"><\/script>
  </body>
</html>`,
		"styles.css": `*{box-sizing:border-box}body{margin:0;font-family:ui-sans-serif,system-ui,sans-serif;background:#1c120c;color:#f6ead0;padding:20px}
.kicker{letter-spacing:.12em;font-size:11px;color:#efc84a}
h1{font-size:28px;margin:6px 0 10px}
.grid{display:grid;gap:12px;margin:18px 0}
.card{background:#3b2418;padding:14px;border:2px solid #1c120c}
.price{color:#efc84a;font-weight:700}
.row{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
.pay{display:inline-block;min-height:44px;line-height:44px;padding:0 16px;background:#efc84a;color:#1c120c;text-decoration:none;font-weight:700}
.pay.pal{background:#3d8f6e;color:#f6ead0}
.pay.ven{background:#8fd0c8;color:#1c120c}
.fine,.wallet{color:#b8a48a;font-size:13px}
code{color:#efc84a}`,
		"main.js": `const s=document.getElementById("status");
if(s) s.textContent="Shop launched in the lab. Payment links open the operator's rails.";
console.log("NEXUS shop ready");`
	};
}
function runLabTests(files, biz) {
	const html = files["index.html"] ?? "";
	const css = files["styles.css"] ?? "";
	const js = files["main.js"] ?? "";
	const blob = `${html}\n${css}\n${js}`;
	const checks = [
		{
			name: "Pass 1 · the page exists",
			ok: html.length > 40 && /<html/i.test(html) && /<h1/i.test(html)
		},
		{
			name: "Pass 2 · the script parses",
			ok: scriptParses(js)
		},
		{
			name: "Pass 3 · styles are real rules",
			ok: css.length > 20 && css.includes("{") && css.includes("}")
		},
		{
			name: "Pass 4 · a preview can be built",
			ok: html.length + css.length + js.length > 80 && !/TODO crash|throw new Error\("fail"\)/.test(blob)
		}
	];
	const tag = cleanHandle(biz.rails.cashApp).replace(/^\$/, "");
	if (tag) checks.push({
		name: "Cash App handle in the lab",
		ok: /cash\.app/i.test(blob) && blob.toLowerCase().includes(tag.toLowerCase())
	});
	const pal = biz.rails.paypal.trim();
	if (pal) checks.push({
		name: "PayPal handle in the lab",
		ok: blob.toLowerCase().includes(pal.toLowerCase().slice(0, 12)) || /paypal/i.test(blob)
	});
	if (/FLOORCAST|id="grid"|tape grid/i.test(blob)) checks.push({
		name: "Search bar",
		ok: /id="q"|type="search"/i.test(html)
	}, {
		name: "Tape grid",
		ok: /id="grid"/i.test(html)
	}, {
		name: "Player stage",
		ok: /id="player"|id="stage"/i.test(html)
	}, {
		name: "Related sidebar",
		ok: /id="related"|Related/i.test(blob)
	}, {
		name: "Comments",
		ok: /id="comments"|Comments/i.test(blob)
	});
	if (/Arm the desk|cards/i.test(blob) && /<h1/i.test(html)) checks.push({
		name: "Working button",
		ok: /<button/i.test(html) && /getElementById\("go"\)/.test(js)
	});
	return {
		ok: checks.every((c) => c.ok),
		checks
	};
}
function scriptParses(js) {
	if (js.trim().length < 5) return false;
	try {
		new Function(js);
		return true;
	} catch {
		return false;
	}
}
async function fetchLiveSpot(symbol) {
	const s = symbol.toUpperCase().trim() || "BTC";
	if (s === "BTC" || s === "ETH") try {
		const json = await (await fetch(`https://api.coinbase.com/v2/prices/${s === "ETH" ? "ETH-USD" : "BTC-USD"}/spot`)).json();
		const n = Number(json.data?.amount);
		if (Number.isFinite(n) && n > 0) return {
			price: n,
			live: true
		};
	} catch {}
	const seed = Array.from(s).reduce((a, c) => a + c.charCodeAt(0), 0);
	return {
		price: Math.round((80 + seed % 40 + Math.random() * 6) * 100) / 100,
		live: false
	};
}
async function fetchSpot(symbol) {
	return (await fetchLiveSpot(symbol)).price;
}
function esc(v) {
	return v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
var VIDEO_HTML = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Floorcast</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <header class="bar">
      <p class="mark">FLOORCAST</p>
      <input id="q" type="search" placeholder="Search tapes" aria-label="Search tapes" />
    </header>
    <main>
      <section id="grid" class="grid" aria-label="Tape grid"></section>
      <aside id="player" class="player" hidden>
        <button type="button" id="back" class="ghost">Back to grid</button>
        <div id="stage" class="stage" data-playing="0"><span id="glyph">▶</span></div>
        <h1 id="title">Tape</h1>
        <p id="meta" class="muted"></p>
        <button type="button" id="play">Play</button>
        <h2>Related</h2>
        <ul id="related" class="side"></ul>
        <h2>Comments</h2>
        <form id="comment">
          <input id="note" maxlength="80" placeholder="Leave a note" aria-label="Comment" />
          <button type="submit">Post</button>
        </form>
        <ul id="comments"></ul>
      </aside>
    </main>
    <script src="main.js"><\/script>
  </body>
</html>`;
var VIDEO_CSS = `*{box-sizing:border-box}
body{margin:0;font-family:ui-sans-serif,system-ui,sans-serif;background:#111110;color:#e6e1d6}
.bar{display:flex;gap:12px;align-items:center;padding:12px 16px;border-bottom:1px solid #2a2824;position:sticky;top:0;background:#111110}
.mark{margin:0;letter-spacing:.18em;font-size:11px;color:#c5c0b4}
#q{flex:1;min-height:44px;border:1px solid #2a2824;background:#1a1916;color:#e6e1d6;padding:0 12px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;padding:16px}
.card{background:#1a1916;border:1px solid #2a2824;padding:0;text-align:left;min-height:44px;color:inherit}
.thumb{height:88px;display:grid;place-items:center;font-size:28px}
.card h3,.card p{margin:8px 10px;font-size:14px}
.card p{color:#8a8580;font-size:12px}
.player{padding:16px}
.stage{height:180px;display:grid;place-items:center;background:#23211e;border:1px solid #2a2824;margin:12px 0}
.stage[data-playing="1"]{animation:roll 1.2s linear infinite}
@keyframes roll{from{filter:hue-rotate(0)}to{filter:hue-rotate(360deg)}}
.ghost,button{min-height:44px;padding:0 14px;border:0;background:#c5c0b4;color:#111110;font-weight:700}
.ghost{background:transparent;color:#c5c0b4;padding:0}
.side,.player ul{list-style:none;margin:0;padding:0}
.side button,.player li{display:block;width:100%;text-align:left;background:#1a1916;color:#e6e1d6;margin:6px 0;padding:10px;border:1px solid #2a2824}
#comment{display:flex;gap:8px;margin:8px 0}
#note{flex:1;min-height:44px;border:1px solid #2a2824;background:#1a1916;color:#e6e1d6;padding:0 10px}
.muted{color:#8a8580}
h1{font-size:22px;margin:8px 0}
h2{font-size:13px;letter-spacing:.12em;color:#c5c0b4}`;
var VIDEO_JS = `const TAPES=[
  {id:"w",title:"Ware Constant walk",ch:"KITE",views:"1.2k",hue:28,note:"Phenomenology, not this runtime."},
  {id:"g",title:"Gate fail-closed",ch:"NYX",views:"880",hue:150,note:"No silent execute."},
  {id:"s",title:"SCAN SNAP SUNDER",ch:"VEX",views:"640",hue:200,note:"Look up, plan, write."},
  {id:"p",title:"Paper desk",ch:"ASH",views:"410",hue:42,note:"Coinbase mark. Local fill."},
  {id:"l",title:"Lab night shift",ch:"RIX",views:"990",hue:310,note:"Edit, TEST, RUN."},
  {id:"h",title:"Holds and drains",ch:"HAL",views:"220",hue:90,note:"Oldest first."},
  {id:"a",title:"Arcade idle",ch:"MOLT",views:"1.8k",hue:0,note:"Paddle stays local."},
  {id:"c",title:"Clean room hash",ch:"NYX",views:"70",hue:170,note:"If it isn't hashed it didn't happen."}
];
const grid=document.getElementById("grid");
const player=document.getElementById("player");
const q=document.getElementById("q");
const comments=document.getElementById("comments");
const related=document.getElementById("related");
const stage=document.getElementById("stage");
const play=document.getElementById("play");
let current=TAPES[0];
function paint(list){
  grid.innerHTML=list.map(t=>'<button class="card" data-id="'+t.id+'"><div class="thumb" style="background:hsl('+t.hue+' 18% 22%)">▶</div><h3>'+t.title+'</h3><p>'+t.ch+' · '+t.views+'</p></button>').join("")||"<p class='muted'>No tapes match.</p>";
}
function openTape(id){
  current=TAPES.find(t=>t.id===id)||TAPES[0];
  grid.hidden=true;
  player.hidden=false;
  document.getElementById("title").textContent=current.title;
  document.getElementById("meta").textContent=current.ch+" · "+current.views+" · "+current.note;
  stage.style.background="hsl("+current.hue+" 18% 22%)";
  stage.dataset.playing="0";
  play.textContent="Play";
  related.innerHTML=TAPES.filter(t=>t.id!==current.id).slice(0,3).map(t=>'<li><button type="button" data-id="'+t.id+'">'+t.title+'</button></li>').join("");
  comments.innerHTML="<li>"+current.ch+": first note on this tape.</li>";
}
function showGrid(){
  player.hidden=true;
  grid.hidden=false;
  stage.dataset.playing="0";
}
paint(TAPES);
q.addEventListener("input",()=>{
  const n=q.value.trim().toLowerCase();
  showGrid();
  paint(TAPES.filter(t=>!n||t.title.toLowerCase().includes(n)||t.ch.toLowerCase().includes(n)));
});
grid.addEventListener("click",e=>{
  const b=e.target.closest("[data-id]");
  if(b) openTape(b.getAttribute("data-id"));
});
related.addEventListener("click",e=>{
  const b=e.target.closest("[data-id]");
  if(b) openTape(b.getAttribute("data-id"));
});
document.getElementById("back").onclick=showGrid;
play.onclick=()=>{
  const on=stage.dataset.playing==="1";
  stage.dataset.playing=on?"0":"1";
  play.textContent=on?"Play":"Pause";
};
document.getElementById("comment").onsubmit=e=>{
  e.preventDefault();
  const v=document.getElementById("note").value.trim();
  if(!v) return;
  const li=document.createElement("li");
  li.textContent="YOU: "+v;
  comments.prepend(li);
  document.getElementById("note").value="";
};`;
var LANDING_HTML = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>NEXUS landing</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <p class="kicker">ADL NEXUS</p>
    <h1>The office is the product</h1>
    <p class="lede">Tap the floor. Crew walks. You hold COMMIT.</p>
    <section class="cards">
      <article><h2>Think</h2><p>Reality state before anyone moves.</p></article>
      <article><h2>Authorize</h2><p>Fail-closed. AI advises.</p></article>
      <article><h2>Commit</h2><p>Named pathway. Hashed memory.</p></article>
    </section>
    <button type="button" id="go">Arm the desk</button>
    <p id="status">Idle.</p>
    <script src="main.js"><\/script>
  </body>
</html>`;
var LANDING_CSS = `*{box-sizing:border-box}
body{margin:0;padding:28px;font-family:ui-sans-serif,system-ui,sans-serif;background:#111110;color:#e6e1d6}
.kicker{letter-spacing:.16em;font-size:11px;color:#c5c0b4}
h1{font-size:32px;margin:8px 0}
.lede{color:#8a8580;max-width:28rem}
.cards{display:grid;gap:12px;margin:24px 0}
article{background:#1a1916;border:1px solid #2a2824;padding:16px}
button{min-height:44px;padding:0 18px;border:0;background:#3d8f6e;color:#e6e1d6;font-weight:700}
#status{color:#c5c0b4}`;
var LANDING_JS = `const b=document.getElementById("go");
const s=document.getElementById("status");
let on=false;
b.onclick=()=>{
  on=!on;
  b.textContent=on?"Desk armed":"Arm the desk";
  s.textContent=on?"Standing authorize is local. You still own the key.":"Idle.";
};`;
var CALC_HTML = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Lab calc</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>Lab calc</h1>
    <p id="out">0</p>
    <div id="pad" class="pad"></div>
    <script src="main.js"><\/script>
  </body>
</html>`;
var CALC_CSS = `body{margin:0;padding:24px;font-family:ui-monospace,monospace;background:#111110;color:#e6e1d6}
#out{font-size:36px;min-height:48px}
.pad{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;max-width:280px}
.pad button{min-height:44px;border:1px solid #2a2824;background:#1a1916;color:#e6e1d6}`;
var CALC_JS = `const keys=["7","8","9","/","4","5","6","*","1","2","3","-","0",".","=","+","C"];
const pad=document.getElementById("pad");
const out=document.getElementById("out");
let expr="";
pad.innerHTML=keys.map(k=>'<button type="button" data-k="'+k+'">'+k+"</button>").join("");
pad.onclick=e=>{
  const k=e.target.getAttribute("data-k");
  if(!k) return;
  if(k==="C"){expr="";out.textContent="0";return;}
  if(k==="="){
    try{expr=String(Function('"use strict";return ('+expr+")")());}
    catch{expr="";out.textContent="err";return;}
    out.textContent=expr||"0";
    return;
  }
  expr+=k;
  out.textContent=expr;
};`;
function steps$1(rows) {
	return rows.map((r, i) => ({
		id: `s${i + 1}`,
		title: r[0],
		owner: r[1],
		test: r[2],
		done: true
	}));
}
var DEMOS = {
	video: {
		id: "video",
		title: "Floorcast",
		files: {
			"index.html": VIDEO_HTML,
			"styles.css": VIDEO_CSS,
			"main.js": VIDEO_JS
		},
		plan: steps$1([
			[
				"Header + search",
				"pm",
				"search input exists"
			],
			[
				"Tape grid",
				"cpo",
				"grid of local tapes"
			],
			[
				"Player stage",
				"engineer",
				"click-to-play"
			],
			[
				"Related sidebar",
				"engineer",
				"related list"
			],
			[
				"Comments",
				"qa",
				"post a note"
			],
			[
				"QA sign-off",
				"qa",
				"lab tests pass"
			]
		]),
		summary: "Floorcast is in the lab. Search, grid, player, related, comments. Local tapes — not YouTube."
	},
	landing: {
		id: "landing",
		title: "Landing",
		files: {
			"index.html": LANDING_HTML,
			"styles.css": LANDING_CSS,
			"main.js": LANDING_JS
		},
		plan: steps$1([
			[
				"Heading",
				"pm",
				"h1 on the page"
			],
			[
				"Three cards",
				"cpo",
				"Think / Authorize / Commit"
			],
			[
				"Working button",
				"engineer",
				"toggles status"
			],
			[
				"QA sign-off",
				"qa",
				"lab tests pass"
			]
		]),
		summary: "Landing page in the lab. Heading, three cards, working button."
	},
	calc: {
		id: "calc",
		title: "Calc",
		files: {
			"index.html": CALC_HTML,
			"styles.css": CALC_CSS,
			"main.js": CALC_JS
		},
		plan: steps$1([
			[
				"Pad layout",
				"pm",
				"digit keys"
			],
			[
				"Evaluate",
				"engineer",
				"equals works"
			],
			[
				"Clear",
				"qa",
				"C resets"
			]
		]),
		summary: "Lab calculator shipped. Local only."
	}
};
function matchDemo(goal) {
	const t = goal.toLowerCase();
	if (/\b(youtube|video grid|floorcast|home feed|tape grid)\b/.test(t)) return DEMOS.video;
	if (/\b(player.{0,24}sidebar|sidebar.{0,24}comments)\b/.test(t)) return DEMOS.video;
	if (/\blanding\b/.test(t)) return DEMOS.landing;
	if (/\b(calculator|\bcalc\b)\b/.test(t)) return DEMOS.calc;
	return null;
}
var FN_RE = /function\s+([A-Za-z_]\w*)/g;
function scanLab(files) {
	const html = files["index.html"] ?? "";
	const css = files["styles.css"] ?? "";
	const js = files["main.js"] ?? "";
	const blob = `${html}\n${css}\n${js}`;
	const findings = [];
	if (/oldAPICall|legacyFn|TODO crash|throw new Error\("fail"\)/.test(blob)) findings.push({
		kind: "dead",
		note: "Dead marker in the lab (oldAPICall / fail throw)."
	});
	const names = [...js.matchAll(FN_RE)].map((m) => m[1]);
	for (const name of names) if (!(js.replace(new RegExp(`function\\s+${name}\\b[\\s\\S]*?\\n\\}`), "").includes(name) || html.includes(name)) && name !== "paint" && name !== "openTape" && name !== "showGrid") findings.push({
		kind: "unused",
		note: `Unused function ${name}()`
	});
	if (/NEXUS lab/.test(html) && /Idle\./.test(html)) findings.push({
		kind: "missing",
		note: "Lab is still the idle stub. No product shipped."
	});
	if (/FLOORCAST|Floorcast|tape-card|id="grid"/.test(blob) && !/Comments|id="comments"/.test(blob)) findings.push({
		kind: "missing",
		note: "Video grid is missing comments."
	});
	if (/<h1/i.test(html) && !/<(article|button)/i.test(html) && !/FLOORCAST/.test(blob)) findings.push({
		kind: "missing",
		note: "Page has a heading but no action."
	});
	if (!findings.length) findings.push({
		kind: "note",
		note: "No dead code. Lab is tight."
	});
	return findings;
}
function applySunder(files, findings) {
	const next = { ...files };
	let js = next["main.js"] ?? "";
	let html = next["index.html"] ?? "";
	js = js.replace(/function\s+oldAPICall\s*\([^)]*\)\s*\{[\s\S]*?\}/g, "");
	js = js.replace(/function\s+legacyFn\s*\([^)]*\)\s*\{[\s\S]*?\}/g, "");
	js = js.replace(/throw new Error\("fail"\);?/g, "");
	for (const finding of findings) {
		const name = finding.kind === "unused" ? finding.note.match(/Unused function (\w+)\(\)/)?.[1] : "";
		if (!name) continue;
		const re = new RegExp(`function\\s+${name}\\s*\\([^)]*\\)\\s*\\{[\\s\\S]*?\\}`, "g");
		const stripped = js.replace(re, "");
		if (stripped === js) finding.note = `${finding.note} Reported. Not cut. The body did not match a simple function.`;
		else js = stripped;
	}
	if (findings.some((f) => f.kind === "missing" && /idle stub/.test(f.note))) {
		html = html.replace(/<p>Idle\.[^<]*<\/p>/, `<section class="cards"><article><h2>Think</h2></article><article><h2>Authorize</h2></article><article><h2>Commit</h2></article></section><button type="button" id="go">Arm the desk</button><p id="status">Idle.</p>`);
		if (!/getElementById\("go"\)/.test(js)) js += `\nconst b=document.getElementById("go");if(b){b.onclick=()=>{const s=document.getElementById("status");if(s)s.textContent="Desk armed. You still own the key.";};}`;
	}
	if (findings.some((f) => /missing comments/.test(f.note)) && !/id="comments"/.test(html)) html = html.replace("</body>", `<section id="comments-wrap"><h2>Comments</h2><ul id="comments"><li>NYX: first note.</li></ul></section></body>`);
	next["index.html"] = html;
	next["main.js"] = js;
	return next;
}
function renderScan(findings) {
	return [
		"# NEXUS SCAN",
		...findings.map((f) => `- ${f.kind}: ${f.note}`),
		"",
		"Claim: local lab grep. Not a GitHub org rewrite. No external Sunder process was started."
	].join("\n");
}
function renderSunder(findings, changed) {
	return [
		"# NEXUS SUNDER",
		changed ? "Wrote a local patch into the lab." : "Nothing to cut.",
		...findings.map((f) => `- ${f.kind}: ${f.note}`),
		"",
		"Status: executed locally inside the lab files. Not detected-only. Not an external adapter.",
		"Claim: lab rewrite only. Sibling repos are not touched."
	].join("\n");
}
function steps(rows) {
	return rows.map((r, i) => ({
		id: `h${i + 1}`,
		title: r[0],
		owner: r[1],
		test: r[2],
		done: false
	}));
}
function matchRoadmap(goal) {
	const t = goal.toLowerCase();
	if (/\b(social|network|friends)\b/.test(t)) return {
		title: "Social network (local demo)",
		steps: steps([
			[
				"Identity stub",
				"cpo",
				"profile card in the lab"
			],
			[
				"Feed layout",
				"engineer",
				"list of posts"
			],
			[
				"Compose",
				"engineer",
				"local post form"
			],
			[
				"Follow graph",
				"cpo",
				"static following list"
			],
			[
				"Search people",
				"engineer",
				"filter the list"
			],
			[
				"QA the feed",
				"qa",
				"lab tests pass"
			],
			[
				"Hash the design",
				"cto",
				"VERSION.md"
			],
			[
				"Operator review",
				"pm",
				"AUTH before any public claim"
			]
		])
	};
	if (/\b(youtube|video|floorcast|tape)\b/.test(t)) return {
		title: "Floorcast",
		steps: steps([
			[
				"Search bar",
				"pm",
				"input#q"
			],
			[
				"Tape grid",
				"engineer",
				"local catalog"
			],
			[
				"Player",
				"engineer",
				"click to play"
			],
			[
				"Sidebar",
				"cpo",
				"related tapes"
			],
			[
				"Comments",
				"qa",
				"post a note"
			],
			[
				"QA sign-off",
				"qa",
				"lab tests pass"
			]
		])
	};
	if (/\b(music|player|radio)\b/.test(t)) return {
		title: "Music player (local)",
		steps: steps([
			[
				"Track list",
				"cpo",
				"local titles"
			],
			[
				"Transport",
				"engineer",
				"play / pause"
			],
			[
				"Scrub",
				"engineer",
				"position control"
			],
			[
				"QA",
				"qa",
				"lab tests pass"
			]
		])
	};
	const g = goal.replace(/\b(plan|roadmap|horizon)\b/gi, "").trim().slice(0, 48) || "objective";
	return {
		title: g,
		steps: steps([
			[
				`Scope ${g}`,
				"cpo",
				"smallest ship named"
			],
			[
				"Owners on the board",
				"pm",
				"every step has an owner"
			],
			[
				"Write the lab",
				"engineer",
				"index.html exists"
			],
			[
				"QA the lab",
				"qa",
				"checks pass"
			],
			[
				"Hash + memory",
				"cto",
				"design version stored"
			]
		])
	};
}
function renderBoard(map) {
	return [
		`# ${map.title}`,
		...map.steps.map((s, i) => `${i + 1}. [${s.done ? "x" : " "}] ${s.title} · ${s.owner} · test: ${s.test}`),
		"",
		"Claim: supervised board. Not unsupervised AGI."
	].join("\n");
}
function uid() {
	return Math.random().toString(16).slice(2, 12);
}
function pushMemory(biz, rec) {
	return {
		...biz,
		memory: [rec, ...biz.memory ?? []].slice(0, 24)
	};
}
function markPeak(biz, gold) {
	const peak = Math.max(biz.peakGold ?? gold, gold);
	const drawdown = peak > 0 ? Math.max(0, (peak - gold) / peak) : 0;
	return {
		...biz,
		peakGold: peak,
		drawdown,
		halted: biz.halted || drawdown > .05
	};
}
function inspectPathways() {
	return PATHWAYS.map((p) => `${p.id} · ${p.title} · owner ${p.owner} · ${p.claim} · try: ${p.hint}`).join("\n");
}
function preflight(proposal, raw) {
	if (!proposal.authorized) return "GATE refused — unauthorized";
	const pathway = registeredPathway(proposal.pathway ?? "") ?? matchPathway(proposal.goal);
	const world = {
		gold: raw.gold,
		biz: hydrateBiz(raw.biz),
		files: raw.files ?? {},
		logTail: raw.logTail ?? []
	};
	return gate(pathway, proposal.goal, world);
}
async function executeAuthorized(proposal, raw) {
	const world = {
		gold: raw.gold,
		biz: hydrateBiz(raw.biz),
		files: raw.files ?? {},
		logTail: raw.logTail ?? []
	};
	const requested = proposal.pathway?.trim() ?? "";
	const registered = requested ? registeredPathway(requested) : null;
	const steps = [
		{
			name: "REQUEST",
			ok: true,
			note: proposal.goal.slice(0, 80)
		},
		{
			name: "GOVERN",
			ok: proposal.authorized,
			note: proposal.authorized ? "operator authorized" : "missing authorize"
		},
		{
			name: "GATE",
			ok: true,
			note: "fail-closed · local adapters only"
		}
	];
	if (!proposal.authorized) return seal(proposal, registered ?? byId("assign"), world, steps, false, "GATE refused — unauthorized", {});
	if (requested && !registered) {
		steps[2] = {
			name: "GATE",
			ok: false,
			note: "unregistered pathway"
		};
		return seal(proposal, {
			id: requested,
			title: "Unregistered",
			kind: "audit",
			owner: "qa",
			claim: "Not in the pathway registry.",
			hint: "",
			chip: "NONE"
		}, world, steps, false, `unregistered pathway ${requested}`, {});
	}
	const pathway = registered ?? matchPathway(proposal.goal);
	const gated = gate(pathway, proposal.goal, world);
	if (gated) {
		steps[2] = {
			name: "GATE",
			ok: false,
			note: gated
		};
		return seal(proposal, pathway, world, steps, false, gated, {});
	}
	const invoked = await invoke(pathway, proposal.goal, world);
	if (invoked.ok === false) {
		steps.push({
			name: "PATHWAY",
			ok: false,
			note: pathway.id
		});
		return seal(proposal, pathway, world, steps, false, invoked.detail, {});
	}
	steps.push({
		name: "PATHWAY",
		ok: true,
		note: pathway.id
	});
	return seal(proposal, pathway, world, steps, true, invoked.detail, invoked.effects, invoked.overlay);
}
var RISK_LOCKED = /* @__PURE__ */ new Set([
	"paper_trade",
	"live_trade",
	"mean_reversion",
	"restock",
	"dropship_order",
	"drain_holds"
]);
function gate(pathway, goal, world) {
	const dd = world.biz.drawdown ?? 0;
	if ((world.biz.halted || dd > .05) && RISK_LOCKED.has(pathway.id)) return world.biz.halted ? "desk is halted — resume first" : `drawdown ${(dd * 100).toFixed(1)}% > 5% — halt`;
	if (pathway.id === "paper_trade") {
		const { qty } = parseTrade(goal);
		if (qty > 2) return `position cap 2 (paper)`;
	}
	if (pathway.id === "live_trade") {
		const { qty } = parseTrade(goal);
		if (qty > .05) return "live size cap 0.05";
	}
	if (pathway.id === "restock") {
		const { qty } = parseRestock(goal);
		const cost = qty * 8;
		if (world.gold < cost) return `insufficient working capital (${cost} gold)`;
	}
	if (pathway.id === "design_version" && /\b(rollback|revert)\b/i.test(goal) && !(world.biz.versions ?? []).length) return "no design version to roll back";
	if (pathway.id === "sesa_cycle" || pathway.id === "sesa_revert") {
		const sesa = hydrateSesa(world.biz.sesa);
		if (pathway.id === "sesa_cycle") {
			if (sesa.lock) return "SESA execution lock — resume first";
			const parsed = parseSesaGoal(goal);
			const preview = proposeCycle(sesa, parsed.intent, parsed.action, parsed.admit);
			if (!preview.ok) return `SMT refuse · ${preview.pruned.join("; ")}`;
		}
		if (pathway.id === "sesa_revert" && (sesa.lastVerifiedIdx < 0 || !sesa.ring.length)) return "no verified manifold to snap back to";
	}
	return null;
}
async function invoke(pathway, goal, world) {
	switch (pathway.id) {
		case "paper_trade": {
			const { side, qty, symbol } = parseTrade(goal);
			const mark = await fetchLiveSpot(symbol);
			const price = mark.price;
			const fill = {
				id: uid(),
				symbol,
				side,
				qty,
				price,
				ts: Date.now()
			};
			const goldDelta = side === "sell" ? Math.round(price * qty * .002) : -Math.round(price * qty * .002);
			const gold = Math.max(0, world.gold + goldDelta);
			const rec = await remember("fill", fill);
			return {
				effects: {
					gold,
					biz: markPeak(pushMemory({
						...world.biz,
						lastSpot: {
							symbol,
							price,
							ts: Date.now(),
							live: mark.live
						},
						fills: [fill, ...world.biz.fills].slice(0, 24)
					}, rec), gold)
				},
				detail: `${mark.live ? "Coinbase spot" : "Local mark. Coinbase was not reached"} · paper ${side} ${qty} ${symbol} @ ${price.toFixed(2)}. Not a broker fill.`,
				overlay: "biz"
			};
		}
		case "live_trade": {
			const broker = goal.match(/broker ([A-Za-z0-9_-]+)/);
			const marked = goal.match(/@ ([0-9.]+)/);
			if (!broker) return {
				effects: {},
				ok: false,
				detail: "Live order was not sent. Paste a Coinbase key in Accounts, then COMMIT. Nothing was filled.",
				overlay: "biz"
			};
			const { side, qty, symbol } = parseTrade(goal);
			const price = marked ? Number(marked[1]) : 0;
			const fill = {
				id: broker[1],
				symbol,
				side,
				qty,
				price,
				ts: Date.now()
			};
			return {
				effects: { biz: {
					...world.biz,
					lastSpot: {
						symbol,
						price,
						ts: Date.now(),
						live: true
					},
					fills: [fill, ...world.biz.fills].slice(0, 24)
				} },
				detail: `LIVE ${side} ${qty} ${symbol} @ ${price.toFixed(2)}. Coinbase order ${broker[1]}. Real order. Not a paper fill.`,
				overlay: "biz"
			};
		}
		case "mean_reversion": {
			const { symbol } = parseTrade(goal);
			const price = await fetchSpot(symbol);
			const r = rsi(synthBars(price, 60, symbol.charCodeAt(0)));
			const side = r < 30 ? "buy" : r > 70 ? "sell" : null;
			if (!side) {
				const rec = await remember("rsi", {
					symbol,
					rsi: r,
					price
				});
				return {
					effects: { biz: pushMemory({
						...world.biz,
						lastSpot: {
							symbol,
							price,
							ts: Date.now()
						},
						lastScan: {
							symbol,
							rsi: r,
							note: "no fill",
							ts: Date.now()
						}
					}, rec) },
					detail: `RSI ${r} on ${symbol} — no paper fill. Local walk around spot.`,
					overlay: "biz"
				};
			}
			const qty = .01;
			const fill = {
				id: uid(),
				symbol,
				side,
				qty,
				price,
				ts: Date.now()
			};
			const goldDelta = side === "sell" ? Math.round(price * qty * .002) : -Math.round(price * qty * .002);
			const gold = Math.max(0, world.gold + goldDelta);
			const rec = await remember("mean_reversion", {
				symbol,
				rsi: r,
				fill
			});
			return {
				effects: {
					gold,
					biz: markPeak(pushMemory({
						...world.biz,
						lastSpot: {
							symbol,
							price,
							ts: Date.now()
						},
						lastScan: {
							symbol,
							rsi: r,
							note: `${side} ${qty}`,
							ts: Date.now()
						},
						fills: [fill, ...world.biz.fills].slice(0, 24)
					}, rec), gold)
				},
				detail: `Mean reversion paper ${side} ${qty} ${symbol} @ ${price.toFixed(2)} (RSI ${r}).`,
				overlay: "biz"
			};
		}
		case "market_scan": {
			const { symbol } = parseTrade(goal);
			const price = await fetchSpot(symbol);
			const bars = synthBars(price, 60, symbol.charCodeAt(0) + 3);
			const r = rsi(bars);
			const band = bollinger(bars);
			const rec = await remember("scan", {
				symbol,
				price,
				rsi: r,
				...band
			});
			return {
				effects: { biz: pushMemory({
					...world.biz,
					lastSpot: {
						symbol,
						price,
						ts: Date.now()
					},
					lastScan: {
						symbol,
						rsi: r,
						note: `bb ${band.lower}-${band.upper}`,
						ts: Date.now()
					}
				}, rec) },
				detail: `${symbol} spot ${price.toFixed(2)} · RSI ${r} · BB ${band.lower.toFixed(0)}–${band.upper.toFixed(0)}. Local indicators.`,
				overlay: "biz"
			};
		}
		case "backtest": {
			const { symbol } = parseTrade(goal);
			const price = await fetchSpot(symbol);
			const bars = synthBars(price, 60, 42);
			const { crosses, last } = macdCrosses(bars);
			const body = [
				"# NEXUS backtest",
				`symbol: ${symbol}`,
				`bars: ${bars.length}`,
				`macd_crosses: ${crosses}`,
				`last_signal: ${last}`,
				`spot_mark: ${price.toFixed(2)}`,
				"",
				"Claim: synthetic 60-bar walk around spot. Not exchange history."
			].join("\n");
			const rec = await remember("backtest", {
				symbol,
				crosses,
				last
			});
			return {
				effects: {
					files: {
						...world.files,
						"BACKTEST.md": body
					},
					biz: pushMemory(world.biz, rec)
				},
				detail: `MACD ${crosses} crosses, last ${last}. Written to BACKTEST.md.`,
				overlay: "files"
			};
		}
		case "restock": {
			const { qty, sku } = parseRestock(goal);
			const cost = qty * 8;
			const gold = world.gold - cost;
			const prev = world.biz.stock ?? {};
			const stock = {
				...prev,
				[sku]: (prev[sku] ?? 0) + qty
			};
			const rec = await remember("restock", {
				sku,
				qty,
				stock: stock[sku]
			});
			const held = (world.biz.orders ?? []).filter((o) => o.status === "held").length;
			return {
				effects: {
					gold,
					biz: markPeak(pushMemory({
						...world.biz,
						stock
					}, rec), gold)
				},
				detail: `Restocked ${qty} ${sku}. Stock now ${stock[sku]}.${held ? ` ${held} hold(s) waiting to drain.` : ""} Local ledger only.`,
				overlay: "biz"
			};
		}
		case "dropship_order": {
			const { qty, sku } = parseOrder(goal);
			const prev = world.biz.stock ?? {};
			const have = prev[sku] ?? 0;
			if (have < qty) {
				const order = {
					id: uid(),
					sku,
					qty,
					remaining: qty,
					ts: Date.now(),
					status: "held"
				};
				const rec = await remember("hold", order);
				const body = [
					"# NEXUS hold",
					`id: ${order.id}`,
					`sku: ${sku}`,
					`qty: ${qty}`,
					`on_hand: ${have}`,
					"",
					"Claim: parked. Not a supplier portal. Drain after restock."
				].join("\n");
				return {
					effects: {
						files: {
							...world.files,
							"HOLD.md": body
						},
						biz: pushMemory({
							...world.biz,
							orders: [order, ...world.biz.orders ?? []].slice(0, 24)
						}, rec)
					},
					detail: `HELD ${qty} ${sku}. On hand ${have}. Drain after restock.`,
					overlay: "plan"
				};
			}
			const remaining = have - qty;
			const stock = {
				...prev,
				[sku]: remaining
			};
			const price = offeringPrice(world.biz, sku);
			const gold = world.gold + Math.round(price * qty * .2);
			const order = {
				id: uid(),
				sku,
				qty,
				remaining,
				ts: Date.now(),
				status: "filled"
			};
			const rec = await remember("order", order);
			const body = [
				"# NEXUS order",
				`id: ${order.id}`,
				`sku: ${sku}`,
				`qty: ${qty}`,
				`remaining: ${remaining}`,
				`margin_gold: ${Math.round(price * qty * .2)}`,
				"",
				"Claim: local stock decrement. Not Shopify, not a supplier portal."
			].join("\n");
			return {
				effects: {
					gold,
					files: {
						...world.files,
						"ORDER.md": body
					},
					biz: markPeak(pushMemory({
						...world.biz,
						stock,
						orders: [order, ...world.biz.orders ?? []].slice(0, 24)
					}, rec), gold)
				},
				detail: `Fulfilled ${qty} ${sku}. Stock ${remaining}. Local ledger only.`,
				overlay: "biz"
			};
		}
		case "drain_holds": {
			const orders = [...world.biz.orders ?? []];
			let gold = world.gold;
			const stock = { ...world.biz.stock ?? {} };
			const filled = [];
			for (let i = orders.length - 1; i >= 0; i--) {
				const hold = orders[i];
				if (hold.status !== "held") continue;
				const have = stock[hold.sku] ?? 0;
				if (have < hold.qty) continue;
				const remaining = have - hold.qty;
				stock[hold.sku] = remaining;
				const price = offeringPrice(world.biz, hold.sku);
				gold += Math.round(price * hold.qty * .2);
				orders[i] = {
					...hold,
					remaining,
					status: "filled"
				};
				filled.push(`${hold.qty} ${hold.sku}`);
			}
			if (!filled.length) {
				const oldest = [...orders].reverse().find((o) => o.status === "held");
				if (!oldest) return {
					effects: {},
					detail: "No held orders.",
					overlay: "plan"
				};
				return {
					effects: {},
					detail: `Still short: ${stock[oldest.sku] ?? 0} ${oldest.sku}, hold ${oldest.qty}.`,
					overlay: "plan"
				};
			}
			const rec = await remember("drain", { filled });
			const body = [
				"# NEXUS drain",
				...filled.map((f) => `- ${f}`),
				"",
				"Claim: local ledger. Not a supplier portal."
			].join("\n");
			return {
				effects: {
					gold,
					files: {
						...world.files,
						"DRAIN.md": body
					},
					biz: markPeak(pushMemory({
						...world.biz,
						stock,
						orders
					}, rec), gold)
				},
				detail: `Drained ${filled.length} hold(s): ${filled.join(", ")}.`,
				overlay: "biz"
			};
		}
		case "supplier_quote": {
			const { sku } = parseRestock(goal);
			const quotes = supplierQuotes(sku);
			const best = quotes[0];
			const rec = await remember("quote", {
				sku,
				quotes
			});
			const body = [
				"# NEXUS supplier quotes",
				`sku: ${sku}`,
				...quotes.map((q) => `${q.vendor}: ${q.unit} gold · ETA ${q.etaDays}d`),
				"",
				`pick: ${best.vendor}`,
				"Claim: deterministic local quotes. No live supplier API."
			].join("\n");
			return {
				effects: {
					files: {
						...world.files,
						"QUOTES.md": body
					},
					biz: pushMemory(world.biz, rec)
				},
				detail: `Best ${best.vendor} @ ${best.unit} gold, ETA ${best.etaDays}d. Local quotes.`,
				overlay: "files"
			};
		}
		case "support_route": {
			const parsed = parseTicket(goal);
			const ticket = {
				id: uid(),
				kind: parsed.kind,
				route: parsed.route,
				goal,
				status: "routed",
				ts: Date.now()
			};
			const rec = await remember("ticket", ticket);
			const body = [
				"# NEXUS ticket",
				`id: ${ticket.id}`,
				`kind: ${ticket.kind}`,
				`route: ${ticket.route}`,
				`goal: ${goal}`,
				"",
				"Claim: local queue. Not a helpdesk product."
			].join("\n");
			return {
				effects: {
					files: {
						...world.files,
						"TICKET.md": body
					},
					biz: pushMemory({
						...world.biz,
						tickets: [ticket, ...world.biz.tickets ?? []].slice(0, 24)
					}, rec)
				},
				detail: `Routed ${ticket.kind} → ${ticket.route.toUpperCase()}. Ticket ${ticket.id}.`,
				overlay: "plan"
			};
		}
		case "shop_publish": {
			const files = shopFiles(world.biz);
			const tested = runLabTests(files, world.biz);
			return {
				effects: {
					files: {
						...world.files,
						...files
					},
					biz: {
						...world.biz,
						lastTest: {
							...tested,
							ts: Date.now()
						}
					}
				},
				detail: tested.ok ? "Shop published into the lab. TEST passed." : "Shop published. TEST found gaps.",
				overlay: "ide"
			};
		}
		case "lab_build": {
			const demo = matchDemo(goal) ?? matchDemo("video grid");
			const files = {
				...world.files,
				...demo.files
			};
			const tested = runLabTests(files, world.biz);
			const rec = await remember("lab_build", {
				id: demo.id,
				ok: tested.ok
			});
			return {
				effects: {
					files,
					plan: demo.plan,
					biz: pushMemory({
						...world.biz,
						lastTest: {
							...tested,
							ts: Date.now()
						}
					}, rec)
				},
				detail: tested.ok ? `${demo.title} shipped. QA signed.` : `${demo.title} shipped. QA found gaps.`,
				overlay: "ide"
			};
		}
		case "arcade_ship": {
			const cabinets = hydrateCabinets(world.biz.cabinets);
			if (cabinets.length >= 12) return {
				effects: { biz: {
					...world.biz,
					cabinets,
					lastCabinetAt: Date.now()
				} },
				detail: `Hall is full (12). Play what's on the floor.`,
				overlay: null
			};
			const cab = nextCabinet(cabinets);
			const next = [...cabinets, cab];
			const rec = await remember("arcade", {
				id: cab.id,
				title: cab.title,
				engine: cab.engine,
				hero: cab.hero
			});
			const body = [
				"# NEXUS arcade cabinet",
				`id: ${cab.id}`,
				`title: ${cab.title}`,
				`engine: ${cab.engine}`,
				`hero: ${cab.hero}`,
				`ts: ${new Date(cab.ts).toISOString()}`,
				"",
				"Claim: local play. RIX forges. You still COMMIT."
			].join("\n");
			return {
				effects: {
					files: {
						...world.files,
						"ARCADE.md": body
					},
					biz: pushMemory({
						...world.biz,
						cabinets: next,
						lastCabinetAt: Date.now()
					}, rec)
				},
				detail: `${cab.title} dropped in the hall. ${cab.blurb}`,
				overlay: null
			};
		}
		case "sunder": {
			const findings = scanLab(world.files);
			const patched = applySunder(world.files, findings);
			const hash = await hashFiles(patched);
			const changed = patched["index.html"] !== world.files["index.html"] || patched["main.js"] !== world.files["main.js"];
			const files = {
				...patched,
				"SCAN.md": renderScan(findings),
				"SNAP.md": `# NEXUS SNAP\nstatus: executed-local\nhash: ${hash}\nfiles: ${Object.keys(patched).join(", ")}\nexternal: none\n`,
				"SUNDER.md": renderSunder(findings, changed)
			};
			const rec = await remember("sunder", {
				hash,
				findings
			});
			const version = {
				hash,
				ts: Date.now(),
				files: Object.keys(files),
				snapshot: { ...world.files }
			};
			return {
				effects: {
					files,
					biz: pushMemory({
						...world.biz,
						versions: [version, ...world.biz.versions ?? []].slice(0, 3)
					}, rec)
				},
				detail: changed ? `SUNDER patched the lab. ${findings.length} finding(s). Hash ${hash.slice(0, 12)}.` : `SCAN clean. ${findings[0]?.note ?? "Nothing to cut."}`,
				overlay: "files"
			};
		}
		case "horizon": {
			const map = matchRoadmap(goal);
			const rec = await remember("horizon", {
				title: map.title,
				n: map.steps.length
			});
			return {
				effects: {
					files: {
						...world.files,
						"BOARD.md": renderBoard(map)
					},
					plan: map.steps,
					biz: pushMemory(world.biz, rec)
				},
				detail: `${map.title}: ${map.steps.length} steps on the board. Supervised — not autonomous.`,
				overlay: "plan"
			};
		}
		case "lab_qa": {
			const tested = runLabTests(world.files, world.biz);
			const checks = tested.checks.map((c) => `${c.ok ? "PASS" : "FAIL"} ${c.name}`);
			return {
				effects: { biz: {
					...world.biz,
					lastTest: {
						...tested,
						ts: Date.now()
					}
				} },
				detail: checks.join(" · ") || "No checks.",
				overlay: "ide"
			};
		}
		case "design_version": {
			if (/\b(rollback|revert)\b/i.test(goal)) {
				const last = (world.biz.versions ?? [])[0];
				if (!last) return {
					effects: {},
					detail: "No design version to roll back.",
					overlay: "files"
				};
				return {
					effects: { files: {
						...world.files,
						...last.snapshot
					} },
					detail: `Rolled back to ${last.hash.slice(0, 12)}. Local snapshot.`,
					overlay: "ide"
				};
			}
			const hash = await hashFiles(world.files);
			const version = {
				hash,
				ts: Date.now(),
				files: Object.keys(world.files),
				snapshot: { ...world.files }
			};
			const rec = await remember("version", {
				hash,
				files: version.files
			});
			const body = [
				"# NEXUS design version",
				`hash: ${hash}`,
				`files: ${version.files.join(", ") || "(empty)"}`,
				`ts: ${new Date(version.ts).toISOString()}`,
				"",
				"Claim: SHA-256 of lab files. Not firmware flashing."
			].join("\n");
			return {
				effects: {
					files: {
						...world.files,
						"VERSION.md": body
					},
					biz: pushMemory({
						...world.biz,
						versions: [version, ...world.biz.versions ?? []].slice(0, 3)
					}, rec)
				},
				detail: `Design hash ${hash.slice(0, 12)}. Snapshot stored for rollback.`,
				overlay: "files"
			};
		}
		case "risk_halt": return {
			effects: { biz: {
				...world.biz,
				halted: true,
				sesa: setSesaLock(hydrateSesa(world.biz.sesa), true)
			} },
			detail: "Desk halted. Paper trades, restocks, orders, drains, and SESA cycles refuse until resume.",
			overlay: "plan"
		};
		case "risk_resume": return {
			effects: { biz: {
				...world.biz,
				halted: false,
				drawdown: 0,
				peakGold: Math.max(world.biz.peakGold ?? world.gold, world.gold),
				sesa: setSesaLock(hydrateSesa(world.biz.sesa), false)
			} },
			detail: "Desk resumed. Still paper-only. SESA lock lifted.",
			overlay: "plan"
		};
		case "sesa_cycle": {
			const parsed = parseSesaGoal(goal);
			const result = await commitCycle(hydrateSesa(world.biz.sesa), parsed.intent, parsed.action, parsed.admit);
			if (!result.ok) return {
				effects: { biz: {
					...world.biz,
					sesa: result.state
				} },
				detail: result.error,
				overlay: "files"
			};
			const rec = await remember("sesa", {
				idx: result.frame.idx,
				intent: result.frame.intent,
				action: result.frame.action,
				cohesion: result.frame.cohesion,
				leaf: result.frame.leaf,
				merkle: result.state.merkleRoot
			});
			const body = [
				"# NEXUS SESA cycle",
				`idx: ${result.frame.idx}`,
				`intent: ${result.frame.intent}`,
				`action: ${result.frame.action}`,
				`cohesion: ${result.frame.cohesion.toFixed(6)}`,
				`leaf: ${result.frame.leaf}`,
				`merkle: ${result.state.merkleRoot}`,
				`fingerprint: ${result.frame.fingerprint}`,
				"",
				"Claim: VSA bind + SMT. In-process ring. Local merkle. Not Godot. Not a chain."
			].join("\n");
			return {
				effects: {
					files: {
						...world.files,
						"SESA.md": body
					},
					biz: pushMemory({
						...world.biz,
						sesa: result.state
					}, rec)
				},
				detail: `SESA ${result.frame.intent}⊗${result.frame.action} cohesion ${result.frame.cohesion.toFixed(4)}. Merkle ${result.state.merkleRoot.slice(0, 12)}.`,
				overlay: "files"
			};
		}
		case "sesa_revert": {
			const result = revertVerified(hydrateSesa(world.biz.sesa));
			if (!result.ok) return {
				effects: { biz: {
					...world.biz,
					sesa: result.state
				} },
				detail: result.error,
				overlay: "files"
			};
			const rec = await remember("sesa_revert", {
				merkle: result.state.merkleRoot,
				idx: result.state.lastVerifiedIdx
			});
			const body = [
				"# NEXUS SESA revert",
				`merkle: ${result.state.merkleRoot}`,
				`frame: ${result.state.lastVerifiedIdx}`,
				"",
				"Claim: snapped to last verified manifold. Local only."
			].join("\n");
			return {
				effects: {
					files: {
						...world.files,
						"SESA.md": body
					},
					biz: pushMemory({
						...world.biz,
						sesa: result.state
					}, rec)
				},
				detail: `Snapped to frame ${result.state.lastVerifiedIdx}. Merkle ${result.state.merkleRoot.slice(0, 12)}.`,
				overlay: "files"
			};
		}
		case "audit_pack": {
			const body = [
				"# NEXUS audit pack",
				`ts: ${(/* @__PURE__ */ new Date()).toISOString()}`,
				`goal: ${goal}`,
				`gold: ${world.gold}`,
				`halted: ${world.biz.halted}`,
				`drawdown: ${((world.biz.drawdown ?? 0) * 100).toFixed(2)}%`,
				`stock: ${JSON.stringify(world.biz.stock ?? {})}`,
				`fills: ${world.biz.fills.length}`,
				`orders: ${(world.biz.orders ?? []).length}`,
				`tickets: ${(world.biz.tickets ?? []).length}`,
				`memory: ${(world.biz.memory ?? []).length}`,
				`ledger: ${world.logTail.map((e) => `${e.kind}:${e.proposalId.slice(0, 8)}`).join(", ") || "empty"}`,
				"",
				"Claim: local hashed dump. Not a regulator filing."
			].join("\n");
			const rec = await remember("audit", body);
			return {
				effects: {
					files: {
						...world.files,
						"AUDIT.md": body
					},
					biz: pushMemory(world.biz, rec)
				},
				detail: "Audit pack written to AUDIT.md in the lab.",
				overlay: "files"
			};
		}
		case "compliance_scan": {
			const flags = world.biz.fills.filter((f) => f.qty * f.price >= COMPLIANCE_NOTIONAL);
			const body = [
				"# NEXUS compliance",
				`fills: ${world.biz.fills.length}`,
				`flagged: ${flags.length} (notional ≥ ${COMPLIANCE_NOTIONAL})`,
				...flags.map((f) => `${f.side} ${f.qty} ${f.symbol} @ ${f.price} · ${f.id}`),
				"",
				"Claim: local size flag. Not 2FA, not a regulator."
			].join("\n");
			const rec = await remember("compliance", { flagged: flags.length });
			return {
				effects: {
					files: {
						...world.files,
						"COMPLIANCE.md": body
					},
					biz: pushMemory(world.biz, rec)
				},
				detail: flags.length ? `${flags.length} paper fill(s) over notional cap.` : "No paper fills over the local notional cap.",
				overlay: "files"
			};
		}
		case "assign": return {
			effects: {},
			detail: `Held for ${pathway.owner.toUpperCase()}. Supervised board. Nothing else ran.`,
			overlay: "plan"
		};
		default: return {
			effects: {},
			detail: `unregistered pathway ${pathway.id}`,
			overlay: "plan",
			ok: false
		};
	}
}
async function seal(proposal, pathway, world, steps, ok, detail, effects, overlay = "plan") {
	const ts = Date.now();
	const hash = await sha256Hex(JSON.stringify({
		proposalId: proposal.id,
		goal: proposal.goal,
		pathway: pathway.id,
		ok,
		detail,
		ts
	}));
	steps.push({
		name: "HASH",
		ok: true,
		note: shortHash(hash)
	});
	steps.push({
		name: "MEMORY",
		ok: true,
		note: "clean room · local"
	});
	return {
		run: {
			id: uid(),
			ts,
			pathway: pathway.id,
			title: pathway.title,
			goal: proposal.goal,
			hash,
			ok,
			detail,
			steps,
			working: ok ? crewForPathway(pathway.id) : ["qa"],
			overlay: ok ? overlay : "plan"
		},
		effects
	};
}
var FEATS = [
	{
		id: "sip",
		title: "First sip",
		gold: 1
	},
	{
		id: "timer",
		title: "Stopwatch",
		gold: 2
	},
	{
		id: "sky",
		title: "Looked outside",
		gold: 2
	},
	{
		id: "commit",
		title: "First commit",
		gold: 5
	},
	{
		id: "build",
		title: "Shipped a lab demo",
		gold: 8
	},
	{
		id: "sunder",
		title: "SCAN SNAP SUNDER",
		gold: 5
	},
	{
		id: "horizon",
		title: "Horizon locked",
		gold: 5
	},
	{
		id: "drain",
		title: "Drained a hold",
		gold: 5
	},
	{
		id: "shop",
		title: "Shop in the lab",
		gold: 5
	},
	{
		id: "qa",
		title: "QA signed",
		gold: 3
	},
	{
		id: "paper",
		title: "Paper fill",
		gold: 3
	},
	{
		id: "arcade",
		title: "Arcade coin",
		gold: 2
	},
	{
		id: "cabinet",
		title: "Shipped a cabinet",
		gold: 8
	},
	{
		id: "watch",
		title: "Armed a watch",
		gold: 3
	},
	{
		id: "show",
		title: "First tape",
		gold: 2
	},
	{
		id: "tube",
		title: "First portal",
		gold: 2
	},
	{
		id: "duel",
		title: "Sat across the board",
		gold: 3
	},
	{
		id: "bout",
		title: "Crew bout",
		gold: 5
	},
	{
		id: "champ",
		title: "Beat an agent",
		gold: 8
	},
	{
		id: "tune",
		title: "Jukebox drop",
		gold: 2
	},
	{
		id: "steam",
		title: "Lounge handoff",
		gold: 2
	},
	{
		id: "rat",
		title: "Arcade rat",
		gold: 5
	},
	{
		id: "proof",
		title: "Opened the gate",
		gold: 2
	},
	{
		id: "stage",
		title: "Crew staged a packet",
		gold: 3
	},
	{
		id: "policy",
		title: "Signed a standing rule",
		gold: 5
	},
	{
		id: "sesa",
		title: "SESA cycle",
		gold: 8
	},
	{
		id: "merkle",
		title: "Merkle checkpoint",
		gold: 5
	}
];
var CODEX = [
	{
		id: "time",
		tier: 1,
		title: "Time & date",
		status: "live",
		object: "Clock",
		claim: "Wall clock + world cities.",
		overlay: "clock"
	},
	{
		id: "stopwatch",
		tier: 1,
		title: "Stopwatch",
		status: "live",
		object: "Clock",
		claim: "Start / stop on the clock desk.",
		overlay: "clock",
		feat: "timer"
	},
	{
		id: "weather",
		tier: 1,
		title: "Live weather",
		status: "live",
		object: "Window",
		claim: "Open-Meteo. Default Nassau.",
		overlay: "weather",
		feat: "sky"
	},
	{
		id: "notes",
		tier: 1,
		title: "Notes & net",
		status: "live",
		object: "Books",
		claim: "Shelf + public web search.",
		overlay: "library"
	},
	{
		id: "lamp",
		tier: 1,
		title: "Floor lights",
		status: "live",
		object: "Lamp",
		claim: "On → night → ops phosphor."
	},
	{
		id: "mug",
		tier: 1,
		title: "Sip for gold",
		status: "live",
		object: "Mug",
		claim: "+1 gold. Break authorized.",
		feat: "sip"
	},
	{
		id: "search",
		tier: 1,
		title: "Web search",
		status: "live",
		object: "Books / chat",
		claim: "Reception searches live.",
		overlay: "library"
	},
	{
		id: "board",
		tier: 1,
		title: "Horizon board",
		status: "live",
		object: "Board",
		claim: "THINK / AUTH / COMMIT columns.",
		overlay: "plan"
	},
	{
		id: "ide",
		tier: 1,
		title: "Lab IDE",
		status: "live",
		object: "Monitor",
		claim: "Edit, TEST, RUN in-office.",
		overlay: "ide"
	},
	{
		id: "files",
		tier: 1,
		title: "Provenance",
		status: "live",
		object: "Files",
		claim: "Hashed runs, HOLD.md, AUDIT.md. Own hall.",
		overlay: "files"
	},
	{
		id: "proof",
		tier: 1,
		title: "Security center",
		status: "live",
		object: "Files",
		claim: "Last hash, lab checks, halt. Repair is LAB. AUTH stays in GOVERN.",
		send: "take me to the proof room",
		feat: "proof"
	},
	{
		id: "build",
		tier: 2,
		title: "Build a page",
		status: "live",
		object: "Engineer",
		claim: "Chat: plan, write lab files, QA.",
		send: "Build a landing page in the lab IDE with a heading, three cards, and a working button. Finish the tests."
	},
	{
		id: "assign",
		tier: 2,
		title: "Assign crew",
		status: "live",
		object: "PM",
		claim: "THINK assigns. You still hold COMMIT.",
		think: "assign the objective"
	},
	{
		id: "preview",
		tier: 2,
		title: "Live preview",
		status: "live",
		object: "Monitor",
		claim: "RUN pane renders the lab.",
		overlay: "ide"
	},
	{
		id: "tests",
		tier: 2,
		title: "Lab tests",
		status: "live",
		object: "QA",
		claim: "Deterministic file checks.",
		overlay: "ide"
	},
	{
		id: "handoff",
		tier: 2,
		title: "Agent handoff",
		status: "live",
		object: "Crew",
		claim: "Named crew walks ChatDev beats."
	},
	{
		id: "persist",
		tier: 2,
		title: "Save / load",
		status: "live",
		object: "Desk",
		claim: "Saved on this browser. A carry file moves the desk and the lab. Tokens stay here."
	},
	{
		id: "plant",
		tier: 2,
		title: "Plant board",
		status: "live",
		object: "Hologram",
		claim: "Rules, watches, holds, inbound.",
		overlay: "sim"
	},
	{
		id: "shop",
		tier: 2,
		title: "Publish shop",
		status: "local",
		object: "Phone",
		claim: "Your rails. We don't take money.",
		overlay: "biz",
		feat: "shop"
	},
	{
		id: "youtube",
		tier: 3,
		title: "Local video demo",
		status: "live",
		object: "Engineer",
		claim: "Floorcast in the lab. Not YouTube.",
		send: "Build a video grid demo in the lab IDE with search, a player, a sidebar, and comments. Local sample data. Finish the tests.",
		feat: "build"
	},
	{
		id: "plan",
		tier: 3,
		title: "Long-horizon plan",
		status: "live",
		object: "PM",
		claim: "Owners + tests on the board.",
		send: "plan a social network",
		feat: "horizon"
	},
	{
		id: "collab",
		tier: 3,
		title: "Crew collaboration",
		status: "live",
		object: "Floor",
		claim: "Walk, talk, handoff. Supervised."
	},
	{
		id: "auto",
		tier: 3,
		title: "AUTO OPS",
		status: "local",
		object: "Plant",
		claim: "AUTO may AUTH. COMMIT needs a signed rule or you.",
		overlay: "sim"
	},
	{
		id: "stage",
		tier: 3,
		title: "Crew staging",
		status: "live",
		object: "Govern",
		claim: "NYX and RIX THINK + AUTH. Packets wait in GOVERN unless a signed cap matches.",
		feat: "stage"
	},
	{
		id: "policy",
		tier: 3,
		title: "Standing rules",
		status: "live",
		object: "Govern",
		claim: "Sign a cap. Restock ≤ 10 can auto-COMMIT. Cabinets never do.",
		feat: "policy"
	},
	{
		id: "audit",
		tier: 3,
		title: "Audit pack",
		status: "local",
		object: "QA",
		claim: "Hashed dump. Not a filing.",
		think: "generate audit pack"
	},
	{
		id: "memory",
		tier: 3,
		title: "Clean-room memory",
		status: "local",
		object: "Files",
		claim: "SHA-256 records. Local only.",
		overlay: "files"
	},
	{
		id: "arcade",
		tier: 3,
		title: "Arcade hall",
		status: "live",
		object: "Cabinet",
		claim: "Own room. RIX forges a new machine on COMMIT.",
		overlay: "arcade",
		feat: "arcade"
	},
	{
		id: "holdgate",
		tier: 3,
		title: "Hold the gate",
		status: "live",
		object: "Arcade",
		claim: "NYX. Place towers. Leaks are unauthorized executes.",
		overlay: "arcade"
	},
	{
		id: "theater",
		tier: 3,
		title: "Entertainment wing",
		status: "live",
		object: "Lounge",
		claim: "SHOW: tapes, YouTube portal, chess, jukebox, Steam handoff. Optional.",
		send: "take me to the theater"
	},
	{
		id: "tube",
		tier: 3,
		title: "YouTube portal",
		status: "live",
		object: "Theater",
		claim: "Official embed. Paste a public URL. We don't host the file.",
		send: "open youtube",
		feat: "tube"
	},
	{
		id: "duel",
		tier: 3,
		title: "Chess duel",
		status: "live",
		object: "Theater",
		claim: "Unicode board. You vs an agent. No AUTH.",
		send: "challenge NYX to chess",
		feat: "duel"
	},
	{
		id: "snake",
		tier: 3,
		title: "Wire snake",
		status: "live",
		object: "Arcade",
		claim: "HAL on the wire. A left, D right.",
		overlay: "arcade"
	},
	{
		id: "drift",
		tier: 3,
		title: "Rock drift",
		status: "live",
		object: "Arcade",
		claim: "A yaws left. D yaws right. W thrust. FIRE.",
		overlay: "arcade"
	},
	{
		id: "bout",
		tier: 3,
		title: "Crew tourney",
		status: "live",
		object: "Theater",
		claim: "Packet pong. Two crew, first to 3. Hashed.",
		send: "run a crew tournament",
		feat: "bout"
	},
	{
		id: "jukebox",
		tier: 3,
		title: "Jukebox",
		status: "live",
		object: "Theater",
		claim: "Original chips. No licensed catalog.",
		send: "play the jukebox",
		feat: "tune"
	},
	{
		id: "steam_lounge",
		tier: 3,
		title: "Steam lounge",
		status: "live",
		object: "Theater",
		claim: "Authorized store handoff. Nexus does not ship Steam binaries.",
		send: "steam lounge",
		feat: "steam"
	},
	{
		id: "exchange",
		tier: 3,
		title: "Exchange",
		status: "live",
		object: "Phone",
		claim: "Paper trade + auto plant. AUTH in GOVERN.",
		overlay: "biz"
	},
	{
		id: "study",
		tier: 1,
		title: "Study library",
		status: "live",
		object: "Books",
		claim: "Own room. Shelf + net search.",
		overlay: "library"
	},
	{
		id: "compute",
		tier: 1,
		title: "Computer room",
		status: "live",
		object: "Monitor",
		claim: "Own room. Edit, TEST, RUN.",
		overlay: "ide"
	},
	{
		id: "sesa",
		tier: 2,
		title: "SESA core",
		status: "live",
		object: "CORE",
		claim: "VSA D=10000 bind + SMT cohesion ≥ 0.95. Ring dispatch needs COMMIT.",
		send: "take me to nexus core",
		feat: "sesa"
	},
	{
		id: "vsa",
		tier: 2,
		title: "Hypervector memory",
		status: "live",
		object: "CORE",
		claim: "Bipolar item memory. Encode is workspace. Cycle is the state graph."
	},
	{
		id: "encode",
		tier: 2,
		title: "Encode symbol",
		status: "live",
		object: "CORE",
		claim: "Perception. FNV+xorshift bipolar D=10000. Same key, same vector."
	},
	{
		id: "smt",
		tier: 2,
		title: "SMT / AC-3 gate",
		status: "live",
		object: "CORE",
		claim: "Unknown symbols, lock, or cohesion < 0.95 prune the candidate. Zero silent dispatch."
	},
	{
		id: "recall",
		tier: 2,
		title: "Associative recall",
		status: "live",
		object: "CORE",
		claim: "Cosine nearest-neighbor against item memory after bind."
	},
	{
		id: "dual",
		tier: 2,
		title: "Dual-reality paper",
		status: "local",
		object: "CORE",
		claim: "Workspace vs verified manifold. 2D paper, not Godot DLRSE."
	},
	{
		id: "ring",
		tier: 3,
		title: "IPC ring buffer",
		status: "local",
		object: "CORE",
		claim: "In-process replay. Not mmap, not sub-microsecond. Deterministic on this device."
	},
	{
		id: "replay",
		tier: 3,
		title: "Replay frame",
		status: "local",
		object: "CORE",
		claim: "Tap a ring frame to load it back into the workspace. Ring stays."
	},
	{
		id: "triage",
		tier: 3,
		title: "Triage interceptor",
		status: "local",
		object: "CORE",
		claim: "Memory estimate, lock, cohesion, merkle. Not a process-tree PowerShell."
	},
	{
		id: "merkle",
		tier: 3,
		title: "Revert token",
		status: "local",
		object: "CORE",
		claim: "Local merkle over committed leaves. Not a deployed Solidity contract.",
		think: "sesa revert",
		feat: "merkle"
	},
	{
		id: "godot",
		tier: 4,
		title: "Godot 4 DLRSE",
		status: "capped",
		object: "CORE",
		claim: "Graph kernel is 2D paper. No GDExtension runtime here."
	},
	{
		id: "dao",
		tier: 4,
		title: "On-chain DAO",
		status: "capped",
		object: "CORE",
		claim: "Governor is you. Merkle is local. No live chain."
	},
	{
		id: "refactor",
		tier: 3,
		title: "SCAN SNAP SUNDER",
		status: "local",
		object: "CPO",
		claim: "Lab grep + rewrite. No silent repo rewrite.",
		send: "sunder the lab",
		feat: "sunder"
	},
	{
		id: "fullstack",
		tier: 4,
		title: "Full-stack + auth",
		status: "capped",
		object: "CTO",
		claim: "Lab can edit, test, and run. Account reads need a token you paste. No sign-in that follows you."
	},
	{
		id: "voice",
		tier: 4,
		title: "Voice office",
		status: "capped",
		object: "Reception",
		claim: "Type. No mic runtime here."
	},
	{
		id: "hologram3d",
		tier: 4,
		title: "3D SIM cube",
		status: "capped",
		object: "Hologram",
		claim: "Plant board is 2D. No WebGL twin."
	},
	{
		id: "apk",
		tier: 4,
		title: "Mobile APK",
		status: "capped",
		object: "Monitor",
		claim: "This floor is a web office."
	},
	{
		id: "mltrain",
		tier: 4,
		title: "Train a net",
		status: "capped",
		object: "Monitor",
		claim: "Not TensorFlow. Paper indicators only."
	},
	{
		id: "autonomy",
		tier: 5,
		title: "24h unsupervised",
		status: "capped",
		object: "All",
		claim: "Fail-closed. You hold COMMIT."
	},
	{
		id: "evolve",
		tier: 5,
		title: "Agents rewrite themselves",
		status: "capped",
		object: "CTO",
		claim: "Not this runtime."
	}
];
function inspectCatalog() {
	const halls = [
		"FLOOR · office hub · furniture, crew, reception",
		"PLAY · arcade · cabinets, HOLD the gate, wire snake, rock drift",
		"SHOW · theater · tapes, YouTube portal, chess, jukebox, Steam, crew bout",
		"DESK · exchange · paper trade, restock, AUTO plant",
		"STACK · library · books, net search, SESA spec",
		"LAB · compute · edit, TEST, RUN",
		"PROOF · security · hash, halt, GOVERN inspector, SESA ledger",
		"CORE · SESA · encode, bind, SMT, ring, merkle, dual-reality, triage"
	];
	const desk = [
		"Exact: base64, hash, JSON, JWT, html escape, count, calc, sort, unique, reverse, date. Signature on a JWT is not checked.",
		"Copy keeps the answer. Use puts it back in the box.",
		"Write, Explain, Translate, Code, Draw, and Clip call the model. Draw makes a picture. Clip makes a short video and the link expires. If the model does not answer, Write cleans the text, Explain gives the shape, Code opens a lab page, and Sum returns an extract. Translate will not invent Spanish.",
		"A carry file moves the counter and the lab to another browser. Tokens are not in the file."
	];
	const govern = [
		"THINK → AUTH → COMMIT. CLEAR aborts.",
		"NYX / RIX / HAL stage packets. COMMIT is you unless a signed cap matches.",
		"SESA cycle and SESA revert never auto-COMMIT.",
		"Halt freezes the desk and the SESA lock. Resume lifts both."
	];
	const live = CODEX.filter((c) => c.status === "live");
	const local = CODEX.filter((c) => c.status === "local");
	const capped = CODEX.filter((c) => c.status === "capped");
	return [
		`ADL NEXUS catalog · ${live.length} live · ${local.length} local · ${capped.length} capped`,
		"",
		"HALLS",
		...halls.map((h) => `· ${h}`),
		"",
		"GOVERN",
		...govern.map((g) => `· ${g}`),
		"",
		"DESK",
		...desk.map((d) => `· ${d}`),
		"",
		"LIVE",
		...live.map((c) => `· T${c.tier} ${c.title} — ${c.claim}`),
		"",
		"LOCAL (this device, honest caps)",
		...local.map((c) => `· T${c.tier} ${c.title} — ${c.claim}`),
		"",
		"CAPPED (not this runtime)",
		...capped.map((c) => `· T${c.tier} ${c.title} — ${c.claim}`)
	].join("\n");
}
function liveCount() {
	return CODEX.filter((c) => c.status === "live").length;
}
function featTitle(id) {
	return FEATS.find((f) => f.id === id)?.title ?? id;
}
//#endregion
export { merkleRootOf as $, hydrateBiz as A, liveCount as B, encodeSymbol as C, fetchLiveSpot as D, featTitle as E, inboundHint as F, looksLikeFactory as G, looksLikeArcade as H, inspectCatalog as I, looksLikeSunder as J, looksLikeHorizon as K, inspectPathways as L, hydrateRules as M, hydrateSesa as N, heroName as O, hydrateWatches as P, merkleProofOf as Q, inspectWatches as R, dualReality as S, executeAuthorized as T, looksLikeBuild as U, loadFrame as V, looksLikeCodex as W, matchDemo as X, looksLikeWeather as Y, matchRoadmap as Z, WATCH_DEFS as _, CREW_CLASS as a, rememberSymbol as at, cashAppHref as b, DEFAULT_BIZ as c, setPair as ct, FLOOR_LINE as d, sliceBarcode as dt, paypalHref as et, HYPER_DIM as f, triage as ft, ROLES as g, workBeats as gt, PORTFOLIO as h, watchCopy as ht, CREW as i, recallPair as it, hydrateCabinets as j, heroSprite as k, DRAWDOWN_LIMIT as l, sha256Hex as lt, LOOP as m, verifyMerkleProof as mt, COHESION_THRESHOLD as n, preflight as nt, CREW_DESK as o, runLabTests as ot, LIFECYCLE as p, venmoHref as pt, looksLikeRepos as q, COMPANY as r, previewBind as rt, CREW_FILTER as s, scanLab as st, CODEX as t, plantStats as tt, FEATS as u, shopFiles as ut, bind as v, evaluateWatches as w, crewForPathway as x, bookPositions as y, lifeLit as z };
