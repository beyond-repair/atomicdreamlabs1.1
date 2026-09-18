import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bollinger, bookPositions, macdCrosses, rsi, supplierQuotes, synthBars } from "./adapters.ts";
import { DEFAULT_BIZ, hydrateBiz } from "./business.ts";
import { authorize, buildReality, classifyScenario, commit, think } from "./engine.ts";
import { sha256Hex } from "./hash.ts";
import { looksLikeBuild, looksLikeCodex, looksLikeFactory, looksLikeHorizon, looksLikeSunder, looksLikeWeather } from "./knowledge.ts";
import { nextCabinet, STARTER_CABINETS } from "./arcade.ts";
import { CREW, CREW_CLASS, CREW_DESK } from "./crew.ts";
import { OBJECT_TAB } from "./room.ts";
import { matchRoom, OBJECT_ROOM, ROOMS, TAPES, EXCHANGE_MACHINES, VAULT_FLOORS } from "./campus.ts";
import { hydrateClub, matchClub, parseYouTubeId } from "./club.ts";
import { pickMove } from "./chessAi.ts";



import { CODEX, FEATS, inspectCatalog, inspectCodex, liveCount } from "./codex.ts";
import { matchPathway, parseTrade, parseRestock } from "./pathways.ts";
import { executeAuthorized } from "./runtime.ts";
import { matchDemo } from "./demos.ts";
import { scanLab, applySunder } from "./sunder.ts";
import { tryLocalTurn } from "./localTurn.ts";
import { evaluateWatches, hydrateWatches, inboundHint, DEFAULT_RULES } from "./watches.ts";
import {
  asGovernEvent,
  canAutoCommit,
  draftStage,
  hydratePolicies,
  matchPolicy,
  STAGER_HEX,
  STAGER_JOB,
  STAGER_TINT,
  stagerClass,
  waitingCrew,
} from "./stage.ts";
import {
  HYPER_DIM,
  bind,
  commitCycle,
  encodeSymbol,
  dualReality,
  hydrateSesa,
  loadFrame,
  merkleProofOf,
  merkleRootOf,
  nearest,
  parseSesaGoal,
  proposeCycle,
  rememberSymbol,
  revertVerified,
  setSesaLock,
  similarity,
  unbind,
  verifyMerkleProof,
} from "./sesa.ts";

function world(over: Partial<{ gold: number; biz: typeof DEFAULT_BIZ; files: Record<string, string> }> = {}) {
  return {
    gold: over.gold ?? 25000,
    biz: hydrateBiz(over.biz ?? DEFAULT_BIZ),
    files: over.files ?? {},
    logTail: [] as { kind: string; ts: number; proposalId: string }[],
  };
}

async function runGoal(goal: string, w = world()) {
  const { proposal } = think(goal);
  const auth = authorize(proposal);
  if (!("proposal" in auth)) throw new Error("auth failed");
  return executeAuthorized(auth.proposal, w);
}

describe("nexus engine 0.5", () => {
  it("classifies scenario types", () => {
    assert.equal(classifyScenario("run a physics experiment"), "research");
    assert.equal(classifyScenario("build a prototype"), "technical");
    assert.equal(classifyScenario("lock the sandbox gate"), "security");
    assert.equal(classifyScenario("buy 0.1 btc"), "resource");
  });

  it("think does not execute", () => {
    const { proposal, reality } = think("analyze repository");
    assert.equal(proposal.authorized, false);
    assert.equal(proposal.executed, false);
    assert.equal(reality.constraints.executeRequiresAuthorize, true);
    assert.equal(reality.constraints.liveTwin, false);
  });

  it("think matches a pathway", () => {
    const { proposal } = think("paper buy 0.1 BTC");
    assert.equal(proposal.pathway, "paper_trade");
    assert.equal(proposal.workforceHint, "cpo");
  });

  it("refuses commit without authorize", () => {
    const { proposal } = think("build a prototype");
    const denied = commit(proposal);
    assert.equal("error" in denied, true);
    if ("error" in denied) {
      assert.match(denied.error, /unauthorized/);
    }
  });

  it("authorize then commit assigns", () => {
    const { proposal } = think("build a prototype");
    const auth = authorize(proposal);
    assert.equal("proposal" in auth, true);
    if (!("proposal" in auth)) return;
    const done = commit(auth.proposal);
    assert.equal("proposal" in done, true);
    if ("proposal" in done) {
      assert.equal(done.proposal.executed, true);
      assert.equal(done.task.status, "pending");
    }
  });

  it("reality enrichment carries scenario type", () => {
    const r = buildReality("what if we hire two researchers");
    assert.equal(r.scenarioType, "organizational");
    assert.ok(r.whatIf.includes("What happens if"));
  });
});

describe("pathways", () => {
  it("matches the factory catalog", () => {
    assert.equal(matchPathway("restock 25 units").id, "restock");
    assert.equal(matchPathway("halt all trades").id, "risk_halt");
    assert.equal(matchPathway("generate audit pack").id, "audit_pack");
    assert.equal(matchPathway("new order 2 units offer-1").id, "dropship_order");
    assert.equal(matchPathway("run mean reversion on ETH").id, "mean_reversion");
    assert.equal(matchPathway("scan market BTC").id, "market_scan");
    assert.equal(matchPathway("backtest MACD on BTC").id, "backtest");
    assert.equal(matchPathway("quote suppliers for offer-1").id, "supplier_quote");
    assert.equal(matchPathway("customer mentions refund").id, "support_route");
    assert.equal(matchPathway("hash the design files").id, "design_version");
    assert.equal(matchPathway("flag suspicious trades").id, "compliance_scan");
    assert.equal(matchPathway("drain held orders").id, "drain_holds");
    assert.equal(matchPathway("build a video grid demo").id, "lab_build");
    assert.equal(matchPathway("ship arcade cabinet").id, "arcade_ship");
    assert.equal(matchPathway("forge a new game").id, "arcade_ship");
    assert.equal(matchPathway("sunder the lab").id, "sunder");
    assert.equal(matchPathway("plan a social network").id, "horizon");
    assert.equal(matchPathway("build a prototype").id, "assign");
  });

  it("parses paper trades", () => {
    const t = parseTrade("paper buy 0.1 BTC");
    assert.equal(t.side, "buy");
    assert.equal(t.qty, 0.1);
    assert.equal(t.symbol, "BTC");
  });

  it("parses restock buy qty, not the threshold", () => {
    const r = parseRestock("If Raspberry Pi stock < 100, buy 200");
    assert.equal(r.qty, 200);
    assert.equal(r.sku, "offer-1");
  });

  it("hashes deterministically", async () => {
    const a = await sha256Hex("nexus");
    const b = await sha256Hex("nexus");
    assert.equal(a, b);
    assert.equal(a.length, 64);
  });

  it("runtime refuses unauthorized", async () => {
    const { proposal } = think("paper buy 0.1 BTC");
    const { run } = await executeAuthorized(proposal, world());
    assert.equal(run.ok, false);
  });

  it("runtime restocks after authorize", async () => {
    const { run, effects } = await runGoal("restock 10 units", world({ biz: { ...DEFAULT_BIZ, stock: { "offer-1": 40 } } }));
    assert.equal(run.ok, true);
    assert.equal(effects.biz?.stock["offer-1"], 50);
    assert.equal(run.hash.length, 64);
  });

  it("halt then trade is gated", async () => {
    const { run } = await runGoal("paper buy 0.1 BTC", world({ biz: { ...DEFAULT_BIZ, halted: true } }));
    assert.equal(run.ok, false);
    assert.match(run.detail, /halted/);
  });

  it("fulfills a local order and decrements stock", async () => {
    const { run, effects } = await runGoal("new order 2 units offer-1");
    assert.equal(run.ok, true);
    assert.equal(effects.biz?.stock["offer-1"], 38);
    assert.equal(effects.biz?.orders?.[0]?.qty, 2);
    assert.ok(effects.files?.["ORDER.md"]);
  });

  it("parks a held order when stock is short", async () => {
    const { run, effects } = await runGoal(
      "new order 99 units offer-1",
      world({ biz: { ...DEFAULT_BIZ, stock: { "offer-1": 1, "offer-2": 0 } } }),
    );
    assert.equal(run.ok, true);
    assert.equal(effects.biz?.orders?.[0]?.status, "held");
    assert.equal(effects.biz?.stock?.["offer-1"], 1);
    assert.ok(effects.files?.["HOLD.md"]);
    assert.match(run.detail, /HELD/);
  });

  it("drains held orders after restock covers them", async () => {
    const held = [
      { id: "new", sku: "offer-2", qty: 5, remaining: 5, ts: 2, status: "held" as const },
      { id: "old", sku: "offer-1", qty: 10, remaining: 10, ts: 1, status: "held" as const },
    ];
    const { run, effects } = await runGoal(
      "drain held orders",
      world({
        biz: { ...DEFAULT_BIZ, stock: { "offer-1": 12, "offer-2": 8 }, orders: held },
      }),
    );
    assert.equal(run.ok, true);
    assert.equal(effects.biz?.orders?.every((o) => o.status === "filled"), true);
    assert.equal(effects.biz?.stock?.["offer-1"], 2);
    assert.equal(effects.biz?.stock?.["offer-2"], 3);
    assert.ok(effects.files?.["DRAIN.md"]);
  });

  it("quotes a cheapest local supplier", async () => {
    const { run, effects } = await runGoal("quote suppliers for offer-1");
    assert.equal(run.ok, true);
    assert.ok(effects.files?.["QUOTES.md"]?.includes("Supplier"));
    const q = supplierQuotes("offer-1");
    assert.equal(q[0].unit <= q[1].unit, true);
  });

  it("routes a refund ticket to QA", async () => {
    const { run, effects } = await runGoal("customer mentions refund");
    assert.equal(run.ok, true);
    assert.equal(effects.biz?.tickets?.[0]?.route, "qa");
    assert.ok(effects.files?.["TICKET.md"]);
  });

  it("hashes lab files into a version", async () => {
    const { run, effects } = await runGoal("hash the design files", world({ files: { "index.html": "<html><h1>x</h1></html>" } }));
    assert.equal(run.ok, true);
    assert.equal(effects.biz?.versions?.[0]?.hash.length, 64);
    assert.ok(effects.files?.["VERSION.md"]);
  });

  it("writes a compliance pack", async () => {
    const { run, effects } = await runGoal("flag suspicious trades");
    assert.equal(run.ok, true);
    assert.ok(effects.files?.["COMPLIANCE.md"]);
  });

  it("ships a new arcade cabinet on commit", async () => {
    const start = STARTER_CABINETS.length;
    const { run, effects } = await runGoal("ship arcade cabinet");
    assert.equal(run.ok, true);
    assert.equal(effects.biz?.cabinets?.length, start + 1);
    assert.ok(effects.files?.["ARCADE.md"]);
    const extra = nextCabinet(effects.biz?.cabinets ?? []);
    assert.ok(extra.id);
    assert.notEqual(extra.id, effects.biz?.cabinets?.at(-1)?.id);
  });
});

describe("indicators", () => {
  it("computes rsi and macd on a synthetic walk", () => {
    const bars = synthBars(50000, 60, 7);
    assert.equal(bars.length, 60);
    const r = rsi(bars);
    assert.ok(r >= 0 && r <= 100);
    const { crosses } = macdCrosses(bars);
    assert.ok(crosses >= 0);
    const band = bollinger(bars);
    assert.ok(band.upper >= band.lower);
  });

  it("books net paper positions", () => {
    const book = bookPositions([
      { symbol: "BTC", side: "sell", qty: 0.05, price: 100 },
      { symbol: "BTC", side: "buy", qty: 0.1, price: 90 },
    ]);
    assert.equal(book.length, 1);
    assert.equal(book[0].symbol, "BTC");
    assert.ok(Math.abs(book[0].qty - 0.05) < 1e-9);
  });
});

describe("watches", () => {
  it("stays cold until armed", () => {
    const fires = evaluateWatches({
      stock: { "offer-1": 5 },
      lastScan: null,
      watches: hydrateWatches(),
      rules: DEFAULT_RULES,
      holds: [],
      now: 1_000,
      halted: false,
    });
    assert.equal(fires.length, 0);
  });

  it("fires low stock when armed and under the line", () => {
    const watches = hydrateWatches();
    watches.stock_low.armed = true;
    const fires = evaluateWatches({
      stock: { "offer-1": 5 },
      lastScan: null,
      watches,
      rules: DEFAULT_RULES,
      holds: [],
      now: 50_000,
      halted: false,
    });
    assert.equal(fires[0]?.id, "stock_low");
    assert.match(inboundHint(25), /new order 25/);
  });

  it("uses plant rules for the low-stock line", () => {
    const watches = hydrateWatches();
    watches.stock_low.armed = true;
    const fires = evaluateWatches({
      stock: { "offer-1": 50 },
      lastScan: null,
      watches,
      rules: { ...DEFAULT_RULES, lowAt: 100, restockQty: 200 },
      holds: [],
      now: 50_000,
      halted: false,
    });
    assert.equal(fires[0]?.id, "stock_low");
    assert.match(fires[0]?.hint ?? "", /200/);
  });

  it("fires drain when stock covers a hold", () => {
    const watches = hydrateWatches();
    watches.drain.armed = true;
    const fires = evaluateWatches({
      stock: { "offer-1": 40 },
      lastScan: null,
      watches,
      rules: DEFAULT_RULES,
      holds: [{ sku: "offer-1", qty: 10, status: "held" }],
      now: 50_000,
      halted: false,
    });
    assert.equal(fires[0]?.id, "drain");
  });

  it("does not fire low stock while halted", () => {
    const watches = hydrateWatches();
    watches.stock_low.armed = true;
    const fires = evaluateWatches({
      stock: { "offer-1": 5 },
      lastScan: null,
      watches,
      rules: DEFAULT_RULES,
      holds: [],
      now: 50_000,
      halted: true,
    });
    assert.equal(fires.length, 0);
  });

  it("respects cooldown", () => {
    const watches = hydrateWatches();
    watches.stock_low.armed = true;
    watches.stock_low.lastFire = 45_000;
    const fires = evaluateWatches({
      stock: { "offer-1": 5 },
      lastScan: null,
      watches,
      rules: DEFAULT_RULES,
      holds: [],
      now: 50_000,
      halted: false,
    });
    assert.equal(fires.length, 0);
  });
});

describe("proactive routing", () => {
  it("detects weather questions", () => {
    assert.equal(looksLikeWeather("how's the weather in the Bahamas"), true);
    assert.equal(looksLikeWeather("tell me about SEEM"), false);
  });

  it("detects build goals", () => {
    assert.equal(looksLikeBuild("make a youtube clone"), true);
    assert.equal(looksLikeBuild("what's our ware constant"), false);
  });

  it("detects factory questions", () => {
    assert.equal(looksLikeFactory("what pathways can it execute"), true);
    assert.equal(looksLikeFactory("run a backtest"), true);
    assert.equal(looksLikeFactory("what can the office do"), true);
    assert.equal(looksLikeFactory("arm auto ops watches"), true);
    assert.equal(looksLikeSunder("audit repos for unused code"), true);
    assert.equal(looksLikeHorizon("plan a social network"), true);
  });
});

describe("codex", () => {
  it("lists live T1 tools and caps T5 autonomy", () => {
    assert.ok(liveCount() >= 16);
    assert.equal(
      CODEX.filter((c) => c.tier === 5).every((c) => c.status === "capped"),
      true,
    );
    assert.match(inspectCodex(), /time · T1 · live/);
    assert.match(inspectCodex(), /autonomy · T5 · capped/);
    assert.match(inspectCodex(), /youtube · T3 · live/);
    assert.match(inspectCodex(), /refactor · T3 · local/);
    assert.match(inspectCatalog(), /HALLS/);
    assert.match(inspectCatalog(), /SESA/);
  });
});

describe("lab demos", () => {
  it("matches Floorcast and not a generic prototype", () => {
    assert.equal(matchDemo("make a youtube clone")?.id, "video");
    assert.equal(matchDemo("build a landing page")?.id, "landing");
    assert.equal(matchDemo("build a prototype"), null);
  });

  it("commits Floorcast into the lab with QA", async () => {
    const { run, effects } = await runGoal("build a video grid demo");
    assert.equal(run.ok, true);
    assert.equal(run.pathway, "lab_build");
    assert.match(effects.files?.["index.html"] ?? "", /FLOORCAST/);
    assert.match(effects.files?.["main.js"] ?? "", /TAPES/);
    assert.ok(effects.plan?.length);
  });

  it("sunders dead lab code", async () => {
    const { run, effects } = await runGoal(
      "sunder the lab",
      world({
        files: {
          "index.html": "<html><h1>NEXUS lab</h1><p>Idle. Reception will send engineering here when a build starts.</p></html>",
          "main.js": `function oldAPICall(){return 1}\nconsole.log("idle");`,
          "styles.css": "body{color:red}",
        },
      }),
    );
    assert.equal(run.ok, true);
    assert.ok(effects.files?.["SCAN.md"]);
    assert.ok(effects.files?.["SUNDER.md"]);
    assert.equal(/oldAPICall/.test(effects.files?.["main.js"] ?? ""), false);
  });

  it("locks a social-network horizon", async () => {
    const { run, effects } = await runGoal("plan a social network");
    assert.equal(run.ok, true);
    assert.match(effects.files?.["BOARD.md"] ?? "", /Social network/);
    assert.ok((effects.plan?.length ?? 0) >= 6);
  });

  it("strips unused functions in applySunder", () => {
    const files = {
      "index.html": "<html><h1>x</h1></html>",
      "styles.css": "body{}",
      "main.js": "function oldAPICall(){\nreturn 1\n}\nconsole.log(1)",
    };
    const findings = scanLab(files);
    assert.ok(findings.some((f) => f.kind === "dead"));
    const next = applySunder(files, findings);
    assert.equal(/oldAPICall/.test(next["main.js"]), false);
  });

  it("local turn ships Floorcast without a model", async () => {
    const turn = await tryLocalTurn("Build a YouTube clone in the lab", {
      "index.html": "<html></html>",
      "styles.css": "",
      "main.js": "",
    }, DEFAULT_BIZ);
    assert.ok(turn);
    assert.match(turn?.files?.["index.html"] ?? "", /FLOORCAST/);
    assert.equal(turn?.incomplete, false);
  });

  it("catalog question stays local and does not open a plan", async () => {
    assert.equal(looksLikeCodex("What can this office actually do right now?"), true);
    assert.equal(looksLikeCodex("list of all functions features and abilities"), true);
    const turn = await tryLocalTurn("What can this office actually do right now?", {
      "index.html": "<html></html>",
      "styles.css": "",
      "main.js": "",
    }, DEFAULT_BIZ);
    assert.ok(turn);
    assert.equal(turn?.events.some((e) => e.name === "inspect_codex"), true);
    assert.equal(turn?.events.some((e) => e.name === "set_plan"), false);
    assert.match(turn?.messages.map((m) => m.content).join("\n") ?? "", /HALLS/);
    assert.match(turn?.messages[0]?.content ?? "", /capped/i);
  });

  it("crew desks map to stations", () => {
    assert.equal(CREW_DESK.engineer, "ide");
    assert.equal(CREW_DESK.cpo, "sim");
    assert.equal(CREW_DESK.operator, null);
  });

  it("crew tints cover the roster", () => {
    for (const id of Object.keys(CREW) as Array<keyof typeof CREW>) {
      assert.match(CREW_CLASS[id], /^crew-/);
    }
  });

  it("furniture routes to the matching dock", () => {
    assert.equal(OBJECT_TAB.sim, "govern");
    assert.equal(OBJECT_TAB.ide, "lab");
    assert.equal(OBJECT_TAB.coffee, "chat");
    assert.equal(OBJECT_TAB.plant, "chat");
  });

  it("furniture routes to campus rooms", () => {
    assert.equal(OBJECT_ROOM.arcade, "arcade");
    assert.equal(OBJECT_ROOM.library, "office");
    assert.equal(OBJECT_ROOM.phone, "exchange");
    assert.equal(OBJECT_ROOM.biz, "exchange");
    assert.equal(OBJECT_ROOM.ide, "office");
    assert.equal(OBJECT_ROOM.files, "office");
    assert.equal(OBJECT_TAB.files, "govern");
    assert.equal(ROOMS.proof.dock, "govern");
    assert.equal(OBJECT_ROOM.coffee, undefined);
  });

  it("matchRoom navigates halls without thinking", () => {
    assert.equal(matchRoom("take me to the theater"), "arcade");
    assert.equal(matchRoom("business room"), "exchange");
    assert.equal(matchRoom("study room"), "office");
    assert.equal(matchRoom("computer room"), "office");
    assert.equal(matchRoom("open the arcade"), "arcade");
    assert.equal(matchRoom("back to the office"), "office");
    assert.equal(matchRoom("back to the vault"), "office");
    assert.equal(matchRoom("security center"), "office");
    assert.equal(matchRoom("take me to the proof room"), "office");
    assert.equal(matchRoom("take me to nexus core"), "office");
    assert.equal(matchRoom("open SESA"), "office");
    assert.equal(matchRoom("What can this office actually do right now?"), null);
  });

  it("vault cutaway covers every hall", () => {
    const rooms = VAULT_FLOORS.flatMap((f) => f.rooms.map((r) => r.room));
    assert.deepEqual(new Set(rooms), new Set(["arcade", "exchange", "office"]));
    assert.equal(ROOMS.office.chip, "LOBBY");
  });

  it("hold the gate is a starter cabinet", () => {
    assert.ok(STARTER_CABINETS.some((c) => c.id === "cab-hold" && c.engine === "hold"));
    assert.ok(FEATS.some((f) => f.id === "proof"));
    assert.ok(FEATS.some((f) => f.id === "duel"));
    assert.ok(CODEX.some((c) => c.id === "proof"));
    assert.ok(CODEX.some((c) => c.id === "holdgate"));
  });

  it("theater tapes and exchange machines are real catalogs", () => {
    assert.ok(TAPES.length >= 6);
    assert.ok(EXCHANGE_MACHINES.some((m) => m.kind === "think"));
    assert.ok(EXCHANGE_MACHINES.some((m) => m.id === "auto"));
  });

  it("matchClub routes entertainment verbs", () => {
    assert.equal(matchClub("challenge NYX to chess"), "duel");
    assert.equal(matchClub("open youtube"), "tube");
    assert.equal(matchClub("play the jukebox"), "tune");
    assert.equal(matchClub("steam lounge"), "steam");
    assert.equal(matchClub("paper buy 0.1 btc"), null);
  });

  it("parseYouTubeId accepts official urls", () => {
    assert.equal(parseYouTubeId("https://www.youtube.com/watch?v=dQw4w9WgXcQ"), "dQw4w9WgXcQ");
    assert.equal(parseYouTubeId("https://youtu.be/dQw4w9WgXcQ"), "dQw4w9WgXcQ");
    assert.equal(parseYouTubeId("dQw4w9WgXcQ"), "dQw4w9WgXcQ");
    assert.equal(parseYouTubeId("not a video"), null);
  });

  it("hydrateClub fills defaults", () => {
    const c = hydrateClub(null);
    assert.equal(c.zone, "tapes");
    assert.equal(c.plays, 0);
  });

  it("chess AI returns a legal start move", () => {
    const start = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    const m = pickMove(start, 1, 3);
    assert.ok(m);
    assert.match(m?.from ?? "", /^[a-h][1-8]$/);
    assert.match(m?.to ?? "", /^[a-h][1-8]$/);
  });
});

describe("bounded autonomy", () => {
  it("unsigned restock 40 cannot auto-COMMIT", () => {
    const policies = hydratePolicies();
    assert.equal(policies.every((p) => p.signed === false), true);
    assert.equal(canAutoCommit("restock 40 units", "restock", policies, true), false);
    assert.equal(matchPolicy("restock 40 units", "restock", policies), null);
  });

  it("signed cache auto-COMMITs restock ≤ 10 when AUTO is on", () => {
    const policies = hydratePolicies().map((p) => (p.id === "restock-cache" ? { ...p, signed: true } : p));
    assert.equal(canAutoCommit("restock 10 units offer-1", "restock", policies, true), true);
    assert.equal(canAutoCommit("restock 10 units offer-1", "restock", policies, false), false);
    assert.equal(canAutoCommit("restock 40 units offer-1", "restock", policies, true), false);
  });

  it("arcade cabinets never auto-COMMIT", () => {
    const policies = hydratePolicies().map((p) => ({ ...p, signed: true }));
    assert.equal(canAutoCommit("ship arcade cabinet", "arcade_ship", policies, true), false);
    assert.equal(matchPolicy("ship arcade cabinet", "arcade_ship", policies), null);
  });

  it("paper trades never auto-COMMIT", () => {
    const policies = hydratePolicies().map((p) => ({ ...p, signed: true, cap: { ...p.cap, tradeQty: 2 } }));
    assert.equal(canAutoCommit("paper buy 0.1 BTC", "paper_trade", policies, true), false);
  });

  it("NYX draft is AUTH and still requires COMMIT", () => {
    const drafted = draftStage("restock 40 units offer-1", "nyx", "ledger drift", "exchange", hydratePolicies());
    assert.equal("packet" in drafted, true);
    if (!("packet" in drafted)) return;
    assert.equal(drafted.packet.proposal.authorized, true);
    assert.equal(drafted.packet.proposal.executed, false);
    assert.equal(drafted.packet.requiresCommit, true);
    assert.equal(drafted.packet.stager, "nyx");
    assert.equal(drafted.packet.pathway, "restock");
    const event = asGovernEvent(drafted.packet);
    assert.equal(event.pipeline.requires_commit, true);
    assert.equal(event.pipeline.state, "AUTH");
    assert.equal(event.stager.agent_id, "NYX");
    assert.equal(event.stager.tint, "gold");
    assert.equal(event.security.agent_signature, "AUTH_NYX_DRAFT");
  });

  it("RIX draft tints teal and never matches a policy", () => {
    const drafted = draftStage("ship arcade cabinet", "rix", "lab tests ready", "arcade", hydratePolicies().map((p) => ({ ...p, signed: true })));
    assert.equal("packet" in drafted, true);
    if (!("packet" in drafted)) return;
    assert.equal(drafted.packet.pathway, "arcade_ship");
    assert.equal(drafted.packet.policyId, null);
    assert.equal(stagerClass("rix"), "stage-rix");
    const event = asGovernEvent(drafted.packet);
    assert.equal(event.stager.tint, "teal");
    assert.equal(event.target.hall, "PLAY");
    assert.equal(event.pipeline.auto_auth, true);
  });

  it("signed drain rule can auto-COMMIT", () => {
    const policies = hydratePolicies().map((p) => (p.id === "drain-hold" ? { ...p, signed: true } : p));
    assert.equal(canAutoCommit("drain held orders", "drain_holds", policies, true), true);
    assert.equal(canAutoCommit("drain held orders", "drain_holds", policies, false), false);
  });

  it("STAGER_JOB maps origin and HAL drain stays AUTH until COMMIT", () => {
    assert.equal(STAGER_JOB.nyx.origin, "exchange");
    assert.equal(STAGER_JOB.rix.origin, "arcade");
    assert.equal(STAGER_JOB.hal.origin, "office");
    assert.equal(STAGER_TINT.nyx, "gold");
    assert.equal(STAGER_TINT.rix, "teal");
    assert.equal(STAGER_TINT.hal, "green");
    assert.match(STAGER_HEX.nyx, /^#[A-Fa-f0-9]{6}$/);
    const drafted = draftStage(STAGER_JOB.hal.hint("", 0), "hal", STAGER_JOB.hal.reason, STAGER_JOB.hal.origin, hydratePolicies());
    assert.equal("packet" in drafted, true);
    if (!("packet" in drafted)) return;
    assert.equal(drafted.packet.pathway, "drain_holds");
    assert.equal(drafted.packet.proposal.authorized, true);
    assert.equal(drafted.packet.proposal.executed, false);
    assert.equal(drafted.packet.requiresCommit, true);
    const event = asGovernEvent(drafted.packet);
    assert.equal(event.stager.agent_id, "HAL");
    assert.equal(event.stager.tint, "green");
    assert.equal(event.stager.tint_color, STAGER_HEX.hal);
    assert.equal(event.stager.origin_hall, "FLOOR");
    assert.equal(event.pipeline.requires_commit, true);
    assert.equal(event.security.agent_signature, "AUTH_HAL_DRAFT");
    assert.equal(stagerClass("hal"), "stage-hal");
    assert.equal(waitingCrew([drafted.packet]).length, 1);
  });

  it("unsigned restock from NYX hint cannot auto-COMMIT even when AUTO is on", () => {
    const hint = STAGER_JOB.nyx.hint("offer-1", 40);
    const drafted = draftStage(hint, "nyx", STAGER_JOB.nyx.reason, STAGER_JOB.nyx.origin, hydratePolicies());
    assert.equal("packet" in drafted, true);
    if (!("packet" in drafted)) return;
    assert.equal(drafted.packet.stager, "nyx");
    assert.equal(canAutoCommit(drafted.packet.goal, drafted.packet.pathway, hydratePolicies(), true), false);
  });

  it("SESA cycles never auto-COMMIT", () => {
    const policies = hydratePolicies().map((p) => ({ ...p, signed: true }));
    assert.equal(canAutoCommit("bind GATE to COMMIT", "sesa_cycle", policies, true), false);
    assert.equal(canAutoCommit("sesa revert", "sesa_revert", policies, true), false);
    assert.equal(matchPathway("bind GATE to COMMIT").id, "sesa_cycle");
    assert.equal(matchPathway("sesa revert").id, "sesa_revert");
    assert.equal(ROOMS.core.dock, "govern");
  });
});

describe("sesa kernel", () => {
  it("encodes D=10000 bipolar and bind is an involution", () => {
    const a = encodeSymbol("GATE");
    const b = encodeSymbol("COMMIT");
    assert.equal(a.length, HYPER_DIM);
    assert.equal(b.length, HYPER_DIM);
    assert.ok([...a].every((x) => x === 1 || x === -1));
    assert.equal(similarity(a, a), 1);
    const bound = bind(a, b);
    const recovered = unbind(bound, a);
    assert.ok(similarity(recovered, b) > 0.999);
    assert.equal(encodeSymbol("GATE")[0], a[0]);
  });

  it("random item-memory keys stay near-orthogonal", () => {
    const keys = ["GATE", "COMMIT", "VSA", "SMT", "PAPER", "HALT", "CREW", "HASH"];
    const vecs = keys.map(encodeSymbol);
    let acc = 0;
    let n = 0;
    for (let i = 0; i < vecs.length; i++) {
      for (let j = i + 1; j < vecs.length; j++) {
        acc += Math.abs(similarity(vecs[i], vecs[j]));
        n += 1;
      }
    }
    assert.ok(acc / n < 0.08);
  });

  it("SMT passes known bind and refuses unknown or locked", () => {
    const s = hydrateSesa();
    const ok = proposeCycle(s, "GATE", "COMMIT");
    assert.equal(ok.ok, true);
    assert.ok(ok.cohesion >= 0.95);
    const bad = proposeCycle(s, "MISSING", "COMMIT");
    assert.equal(bad.ok, false);
    const locked = proposeCycle(setSesaLock(s, true), "GATE", "COMMIT");
    assert.equal(locked.ok, false);
    assert.ok(locked.pruned.some((p) => /lock/i.test(p)));
  });

  it("commitCycle writes the ring and merkle proof verifies", async () => {
    const started = hydrateSesa();
    const first = await commitCycle(started, "GATE", "COMMIT");
    assert.equal(first.ok, true);
    if (!first.ok) return;
    const second = await commitCycle(first.state, "VSA", "SMT");
    assert.equal(second.ok, true);
    if (!second.ok) return;
    const leaves = second.state.ring.map((f) => f.leaf);
    const root = merkleRootOf(leaves);
    assert.equal(second.state.merkleRoot, root);
    const idx = leaves.length - 1;
    const proof = merkleProofOf(leaves, idx);
    assert.equal(verifyMerkleProof(leaves[idx], proof, root, idx), true);
    assert.equal(verifyMerkleProof("deadbeef", proof, root, idx), false);
  });

  it("revert snaps to the last verified frame", async () => {
    const a = await commitCycle(hydrateSesa(), "GATE", "COMMIT");
    assert.equal(a.ok, true);
    if (!a.ok) return;
    const b = await commitCycle(a.state, "VSA", "SMT");
    assert.equal(b.ok, true);
    if (!b.ok) return;
    assert.equal(b.state.ring.length, 2);
    const snapped = revertVerified(b.state);
    assert.equal(snapped.ok, true);
    if (!snapped.ok) return;
    assert.equal(snapped.state.ring.length, 1);
    assert.equal(snapped.state.ring[0].intent, "GATE");
    const empty = revertVerified(hydrateSesa());
    assert.equal(empty.ok, false);
  });

  it("parseSesaGoal and encode stay local until commit", () => {
    assert.deepEqual(parseSesaGoal("bind HASH to CREW"), {
      intent: "HASH",
      action: "CREW",
      admit: false,
      revert: false,
    });
    assert.equal(parseSesaGoal("encode symbol FOO").admit, true);
    const next = rememberSymbol(hydrateSesa(), "FOO");
    assert.ok(next.symbols.includes("FOO"));
    assert.equal(next.ring.length, 0);
  });

  it("authorized SESA cycle executes and unauthorized does not", async () => {
    const { proposal } = think("bind GATE to COMMIT");
    assert.equal(proposal.pathway, "sesa_cycle");
    const denied = await executeAuthorized(proposal, world());
    assert.equal(denied.run.ok, false);
    const auth = authorize(proposal);
    if (!("proposal" in auth)) throw new Error("auth failed");
    const { run, effects } = await executeAuthorized(auth.proposal, world());
    assert.equal(run.ok, true);
    assert.equal(run.pathway, "sesa_cycle");
    assert.ok(effects.biz?.sesa?.ring.length);
    assert.match(effects.files?.["SESA.md"] ?? "", /cohesion/);
  });

  it("recall ranks the probe first and replay loads a frame", async () => {
    const started = hydrateSesa();
    const self = nearest(started, "GATE", 4);
    assert.equal(self[0]?.key, "GATE");
    assert.ok((self[0]?.sim ?? 0) > 0.999);
    const dual = dualReality(started);
    assert.equal(dual.governor, "operator");
    assert.equal(dual.verified.frames.length, 0);
    const first = await commitCycle(started, "GATE", "COMMIT");
    assert.equal(first.ok, true);
    if (!first.ok) return;
    const loaded = loadFrame(first.state, first.frame.idx);
    assert.equal(loaded.intent, "GATE");
    assert.equal(loaded.action, "COMMIT");
    assert.equal(loaded.ring.length, first.state.ring.length);
    const miss = loadFrame(first.state, 99);
    assert.match(miss.telemetry[0] ?? "", /REPLAY refused/);
  });
});
