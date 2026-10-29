//#region node_modules/.nitro/vite/services/ssr/assets/pathways-qAusL2xc.js
var PIPE = [
	"REQUEST",
	"GOVERN",
	"GATE",
	"PATHWAY",
	"HASH",
	"MEMORY"
];
var PATHWAY_GROUPS = [
	{
		kind: "trade",
		label: "TRADE"
	},
	{
		kind: "ops",
		label: "OPS"
	},
	{
		kind: "lab",
		label: "LAB"
	},
	{
		kind: "audit",
		label: "AUDIT"
	},
	{
		kind: "assign",
		label: "PLAN"
	}
];
var PATHWAYS = [
	{
		id: "paper_trade",
		title: "Paper trade",
		kind: "trade",
		owner: "cpo",
		claim: "Coinbase spot mark, local fill. Not a live broker.",
		hint: "paper buy 0.1 BTC",
		chip: "PAPER"
	},
	{
		id: "live_trade",
		title: "Live trade",
		kind: "trade",
		owner: "cpo",
		claim: "Coinbase market order. Only after you COMMIT. Never automatic. Capped.",
		hint: "live buy 0.001 BTC",
		chip: "LIVE"
	},
	{
		id: "mean_reversion",
		title: "Mean reversion",
		kind: "trade",
		owner: "cpo",
		claim: "Local RSI on a synthetic walk around spot. Paper fill only.",
		hint: "run mean reversion on ETH",
		chip: "REVERT"
	},
	{
		id: "market_scan",
		title: "Market scan",
		kind: "trade",
		owner: "cpo",
		claim: "Spot + local RSI/Bollinger. Stored in Clean Room. Not a feed.",
		hint: "scan market BTC",
		chip: "SCAN"
	},
	{
		id: "backtest",
		title: "Backtest MACD",
		kind: "trade",
		owner: "cto",
		claim: "Deterministic 60-bar sketch. Not historical exchange data.",
		hint: "backtest MACD on BTC",
		chip: "BTST"
	},
	{
		id: "restock",
		title: "Inventory restock",
		kind: "ops",
		owner: "cpo",
		claim: "Local stock ledger. No supplier API.",
		hint: "restock 25 units",
		chip: "STOCK"
	},
	{
		id: "dropship_order",
		title: "Fulfill order",
		kind: "ops",
		owner: "cpo",
		claim: "Decrements local stock. Not Shopify, not AliExpress.",
		hint: "new order 2 units offer-1",
		chip: "ORDER"
	},
	{
		id: "drain_holds",
		title: "Drain holds",
		kind: "ops",
		owner: "cpo",
		claim: "Fills parked orders against on-hand. Local ledger.",
		hint: "drain held orders",
		chip: "DRAIN"
	},
	{
		id: "supplier_quote",
		title: "Supplier quote",
		kind: "ops",
		owner: "cpo",
		claim: "Three deterministic local quotes. No Digi-Key / Mouser.",
		hint: "quote suppliers for offer-1",
		chip: "QUOTE"
	},
	{
		id: "support_route",
		title: "Support route",
		kind: "ops",
		owner: "qa",
		claim: "Tickets to QA/CPO/CEO. Local queue only.",
		hint: "customer mentions refund",
		chip: "TICKET"
	},
	{
		id: "risk_halt",
		title: "Halt desk",
		kind: "ops",
		owner: "ceo",
		claim: "Fail-closed. Paper desk stops until resume.",
		hint: "halt all trades",
		chip: "HALT"
	},
	{
		id: "risk_resume",
		title: "Resume desk",
		kind: "ops",
		owner: "ceo",
		claim: "Operator override. Desk is paper only.",
		hint: "resume the desk",
		chip: "RESUME"
	},
	{
		id: "shop_publish",
		title: "Publish shop",
		kind: "lab",
		owner: "engineer",
		claim: "Writes the lab storefront. Payment links are yours.",
		hint: "publish the shop",
		chip: "SHOP"
	},
	{
		id: "lab_build",
		title: "Ship lab demo",
		kind: "lab",
		owner: "engineer",
		claim: "Deterministic Floorcast / landing / calc. Not a live clone of someone else's product.",
		hint: "build a video grid demo",
		chip: "REEL"
	},
	{
		id: "arcade_ship",
		title: "Ship arcade cabinet",
		kind: "lab",
		owner: "engineer",
		claim: "RIX forges a new machine in the hall. Local play. You still COMMIT.",
		hint: "ship arcade cabinet",
		chip: "CAB"
	},
	{
		id: "sunder",
		title: "SCAN SNAP SUNDER",
		kind: "lab",
		owner: "cpo",
		claim: "Local lab grep + rewrite. Sibling repos are not touched.",
		hint: "sunder the lab",
		chip: "SUNDER"
	},
	{
		id: "horizon",
		title: "Horizon plan",
		kind: "assign",
		owner: "pm",
		claim: "Owners and tests on the board. Supervised.",
		hint: "plan a social network",
		chip: "PLAN"
	},
	{
		id: "lab_qa",
		title: "Lab QA",
		kind: "lab",
		owner: "qa",
		claim: "Deterministic file checks. Not a live twin.",
		hint: "run lab tests",
		chip: "QA"
	},
	{
		id: "design_version",
		title: "Design hash",
		kind: "lab",
		owner: "cto",
		claim: "SHA-256 of lab files. Rollback is local snapshot only.",
		hint: "hash the design files",
		chip: "VER"
	},
	{
		id: "audit_pack",
		title: "Audit pack",
		kind: "audit",
		owner: "qa",
		claim: "Hashed ledger dump into the lab. Local proof.",
		hint: "generate audit pack",
		chip: "AUDIT"
	},
	{
		id: "compliance_scan",
		title: "Compliance scan",
		kind: "audit",
		owner: "qa",
		claim: "Flags paper fills over the local size cap. Not a filing.",
		hint: "flag suspicious trades",
		chip: "FLAG"
	},
	{
		id: "sesa_cycle",
		title: "SESA cycle",
		kind: "audit",
		owner: "qa",
		claim: "VSA bind then SMT. Ring dispatch only if cohesion ≥ 0.95. Not Godot. Not a chain.",
		hint: "bind GATE to COMMIT",
		chip: "SESA"
	},
	{
		id: "sesa_revert",
		title: "SESA revert",
		kind: "audit",
		owner: "cto",
		claim: "Snap the ring to the last verified manifold. Local merkle. Not a DAO.",
		hint: "sesa revert",
		chip: "SNAP"
	},
	{
		id: "assign",
		title: "Assign workforce",
		kind: "assign",
		owner: "pm",
		claim: "Supervised board only. No silent autonomy.",
		hint: "assign the objective",
		chip: "ASSIGN"
	}
];
function matchPathway(goal) {
	const t = goal.toLowerCase();
	if (/\b(sesa revert|revert token|snap (to )?(the )?verified|rollback sesa)\b/.test(t)) return byId("sesa_revert");
	if (/\b(sesa|hypervector|vsa cycle|smt cycle|bind \w+ to \w+|encode symbol)\b/.test(t)) return byId("sesa_cycle");
	if (/\b(halt|kill switch|stop (all )?trades|drawdown|freeze desk)\b/.test(t)) return byId("risk_halt");
	if (/\b(resume|unhalt|reopen desk|lift halt)\b/.test(t)) return byId("risk_resume");
	if (/\b(backtest|macd crossover|historical)\b/.test(t)) return byId("backtest");
	if (/\b(mean.?reversion|over.?sold|over.?bought)\b/.test(t)) return byId("mean_reversion");
	if (/\b(market scan|scan market|bollinger|indicators?|\brsi\b)\b/.test(t)) return byId("market_scan");
	if (/\b(compliance|suspicious|flag trade|regulator|2fa approval)\b/.test(t)) return byId("compliance_scan");
	if (/\b(audit|provenance pack|decision hash)\b/.test(t) && !/\b(dead code|unused|sunder|refactor)\b/.test(t)) return byId("audit_pack");
	if (/\b(sunder|dead code|unused (code|function)|refactor (the )?lab|scan.?snap|audit repos)\b/.test(t)) return byId("sunder");
	if (/\b(plan a |roadmap|horizon plan|social network|long.?horizon)\b/.test(t)) return byId("horizon");
	if (/\b(arcade|cabinet|new game|ship (a )?cabinet|forge (a )?(game|cabinet)|build (a )?(cabinet|arcade game))\b/.test(t)) return byId("arcade_ship");
	if (/\b(youtube|video grid|floorcast|landing page|calculator|\bcalc\b|home feed)\b/.test(t)) return byId("lab_build");
	if (/\b(refund|support ticket|escalate|customer mentions)\b/.test(t)) return byId("support_route");
	if (/\b(version|firmware hash|design hash|hash the design|rollback|pcb|schematic)\b/.test(t)) return byId("design_version");
	if (/\b(supplier|quote|digi-?key|mouser|aliexpress)\b/.test(t)) return byId("supplier_quote");
	if (/\b(drain|held order|backorder|holds)\b/.test(t)) return byId("drain_holds");
	if (/\b(new order|dropship|fulfill|shipment)\b/.test(t)) return byId("dropship_order");
	if (/\b(publish.{0,12}shop|shop.{0,12}publish|storefront)\b/.test(t)) return byId("shop_publish");
	if (/\b(lab test|run tests|qa the lab|run_checks)\b/.test(t)) return byId("lab_qa");
	if (/\b(restock|reorder|inventory)\b/.test(t) || /\bstock\b/.test(t) && /\b(buy|order|low)\b/.test(t)) return byId("restock");
	if (/\border\b/.test(t) && !/\bborder\b/.test(t)) return byId("dropship_order");
	if (/\blive (buy|sell)\b/.test(t)) return byId("live_trade");
	if (/\b(buy|sell|long|short|paper trade|btc|eth)\b/.test(t) && /\b(trade|buy|sell|btc|eth|position|paper)\b/.test(t)) return byId("paper_trade");
	return byId("assign");
}
function registeredPathway(id) {
	return PATHWAYS.find((p) => p.id === id) ?? null;
}
/** Unmatched goals become supervised assign. A named id that is not registered does not. */
function byId(id) {
	return registeredPathway(id) ?? PATHWAYS[PATHWAYS.length - 1];
}
function parseTrade(goal) {
	const t = goal.toLowerCase();
	const side = /\bsell|short\b/.test(t) ? "sell" : "buy";
	const qtyMatch = t.match(/(\d+(?:\.\d+)?)\s*(btc|eth|[a-z]{2,6})?/);
	const symMatch = t.match(/\b(btc|eth|[a-z]{3,5})\b/);
	const qty = qtyMatch ? Number(qtyMatch[1]) : .1;
	const symbol = (qtyMatch?.[2] || symMatch?.[1] || "BTC").toUpperCase();
	return {
		side,
		qty: Number.isFinite(qty) && qty > 0 ? qty : .1,
		symbol: symbol === "BITCOIN" ? "BTC" : symbol
	};
}
function parseRestock(goal) {
	const buy = goal.match(/(?:buy|restock|reorder)\s+(\d+)/i);
	const units = goal.match(/(\d+)\s*(units|pcs|unit)/i);
	const nums = [...goal.matchAll(/(\d+)/g)].map((m) => Number(m[1]));
	const qty = buy ? Number(buy[1]) : units ? Number(units[1]) : nums.length ? nums[nums.length - 1] : 25;
	const sku = /rasp|pi|offer-1/i.test(goal) ? "offer-1" : /scan|offer-2/i.test(goal) ? "offer-2" : "offer-1";
	return {
		qty: Number.isFinite(qty) && qty > 0 ? Math.max(1, Math.round(qty)) : 25,
		sku
	};
}
var COMPLIANCE_NOTIONAL = 1e4;
//#endregion
export { byId as a, parseTrade as c, PIPE as i, registeredPathway as l, PATHWAYS as n, matchPathway as o, PATHWAY_GROUPS as r, parseRestock as s, COMPLIANCE_NOTIONAL as t };
