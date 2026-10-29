import { DRAWDOWN_LIMIT, bollinger, hashFiles, macdCrosses, parseOrder, parseTicket, remember, rsi, supplierQuotes, synthBars } from "./adapters.ts";
import { fetchLiveSpot, fetchSpot, hydrateBiz, offeringPrice, runLabTests, shopFiles, type BizState } from "./business.ts";
import { sha256Hex, shortHash } from "./hash.ts";
import {
  COMPLIANCE_NOTIONAL,
  PATHWAYS,
  RESTOCK_UNIT_COST,
  TRADE_QTY_CAP,
  byId,
  matchPathway,
  parseRestock,
  parseTrade,
  registeredPathway,
  type Pathway,
} from "./pathways.ts";
import { crewForPathway } from "./crew.ts";
import { CABINET_CAP, hydrateCabinets, nextCabinet } from "./arcade.ts";
import { matchDemo } from "./demos.ts";
import { applySunder, renderScan, renderSunder, scanLab } from "./sunder.ts";
import { matchRoadmap, renderBoard } from "./horizon.ts";
import type { PlanStep } from "./knowledge.ts";
import type { Proposal, RoleId } from "./types.ts";
import { commitCycle, hydrateSesa, parseSesaGoal, proposeCycle, revertVerified, setSesaLock } from "./sesa.ts";

export type PipeStep = { name: string; ok: boolean; note: string };

export type RunRecord = {
  id: string;
  ts: number;
  pathway: string;
  title: string;
  goal: string;
  hash: string;
  ok: boolean;
  detail: string;
  steps: PipeStep[];
  working: RoleId[];
  overlay: "ide" | "files" | "plan" | "biz" | null;
};

export type World = {
  gold: number;
  biz: BizState;
  files: Record<string, string>;
  logTail: { kind: string; ts: number; proposalId: string }[];
};

export type RunEffects = {
  gold?: number;
  biz?: BizState;
  files?: Record<string, string>;
  plan?: PlanStep[];
};

export type RuntimeResult = {
  run: RunRecord;
  effects: RunEffects;
};

function uid() {
  return Math.random().toString(16).slice(2, 12);
}

function pushMemory(biz: BizState, rec: { key: string; hash: string; ts: number; body: string }): BizState {
  return { ...biz, memory: [rec, ...(biz.memory ?? [])].slice(0, 24) };
}

function markPeak(biz: BizState, gold: number): BizState {
  const peak = Math.max(biz.peakGold ?? gold, gold);
  const drawdown = peak > 0 ? Math.max(0, (peak - gold) / peak) : 0;
  return {
    ...biz,
    peakGold: peak,
    drawdown,
    halted: biz.halted || drawdown > DRAWDOWN_LIMIT,
  };
}

export function inspectPathways() {
  return PATHWAYS.map((p) => `${p.id} · ${p.title} · owner ${p.owner} · ${p.claim} · try: ${p.hint}`).join("\n");
}

export function preflight(proposal: Proposal, raw: World): string | null {
  if (!proposal.authorized) return "GATE refused — unauthorized";
  const pathway = registeredPathway(proposal.pathway ?? "") ?? matchPathway(proposal.goal);
  const world: World = {
    gold: raw.gold,
    biz: hydrateBiz(raw.biz),
    files: raw.files ?? {},
    logTail: raw.logTail ?? [],
  };
  return gate(pathway, proposal.goal, world);
}

export async function executeAuthorized(proposal: Proposal, raw: World): Promise<RuntimeResult> {
  const world: World = {
    gold: raw.gold,
    biz: hydrateBiz(raw.biz),
    files: raw.files ?? {},
    logTail: raw.logTail ?? [],
  };
  const requested = proposal.pathway?.trim() ?? "";
  const registered = requested ? registeredPathway(requested) : null;
  const steps: PipeStep[] = [
    { name: "REQUEST", ok: true, note: proposal.goal.slice(0, 80) },
    { name: "GOVERN", ok: proposal.authorized, note: proposal.authorized ? "operator authorized" : "missing authorize" },
    { name: "GATE", ok: true, note: "fail-closed · local adapters only" },
  ];

  if (!proposal.authorized) {
    const named = registered ?? byId("assign");
    return seal(proposal, named, world, steps, false, "GATE refused — unauthorized", {});
  }

  if (requested && !registered) {
    steps[2] = { name: "GATE", ok: false, note: "unregistered pathway" };
    return seal(
      proposal,
      {
        id: requested,
        title: "Unregistered",
        kind: "audit",
        owner: "qa",
        claim: "Not in the pathway registry.",
        hint: "",
        chip: "NONE",
      },
      world,
      steps,
      false,
      `unregistered pathway ${requested}`,
      {},
    );
  }

  const pathway = registered ?? matchPathway(proposal.goal);

  const gated = gate(pathway, proposal.goal, world);
  if (gated) {
    steps[2] = { name: "GATE", ok: false, note: gated };
    return seal(proposal, pathway, world, steps, false, gated, {});
  }

  const invoked = await invoke(pathway, proposal.goal, world);
  if (invoked.ok === false) {
    steps.push({ name: "PATHWAY", ok: false, note: pathway.id });
    return seal(proposal, pathway, world, steps, false, invoked.detail, {});
  }
  steps.push({ name: "PATHWAY", ok: true, note: pathway.id });
  return seal(proposal, pathway, world, steps, true, invoked.detail, invoked.effects, invoked.overlay);
}

const RISK_LOCKED = new Set(["paper_trade", "live_trade", "mean_reversion", "restock", "dropship_order", "drain_holds"]);

function gate(pathway: Pathway, goal: string, world: World): string | null {
  const dd = world.biz.drawdown ?? 0;
  if ((world.biz.halted || dd > DRAWDOWN_LIMIT) && RISK_LOCKED.has(pathway.id)) {
    return world.biz.halted ? "desk is halted — resume first" : `drawdown ${(dd * 100).toFixed(1)}% > 5% — halt`;
  }
  if (pathway.id === "paper_trade") {
    const { qty } = parseTrade(goal);
    if (qty > TRADE_QTY_CAP) return `position cap ${TRADE_QTY_CAP} (paper)`;
  }
  if (pathway.id === "live_trade") {
    const { qty } = parseTrade(goal);
    if (qty > 0.05) return "live size cap 0.05";
  }
  if (pathway.id === "restock") {
    const { qty } = parseRestock(goal);
    const cost = qty * RESTOCK_UNIT_COST;
    if (world.gold < cost) return `insufficient working capital (${cost} gold)`;
  }
  if (pathway.id === "design_version" && /\b(rollback|revert)\b/i.test(goal) && !(world.biz.versions ?? []).length) {
    return "no design version to roll back";
  }
  if (pathway.id === "sesa_cycle" || pathway.id === "sesa_revert") {
    const sesa = hydrateSesa(world.biz.sesa);
    if (pathway.id === "sesa_cycle") {
      if (sesa.lock) return "SESA execution lock — resume first";
      const parsed = parseSesaGoal(goal);
      const preview = proposeCycle(sesa, parsed.intent, parsed.action, parsed.admit);
      if (!preview.ok) return `SMT refuse · ${preview.pruned.join("; ")}`;
    }
    if (pathway.id === "sesa_revert" && (sesa.lastVerifiedIdx < 0 || !sesa.ring.length)) {
      return "no verified manifold to snap back to";
    }
  }
  return null;
}

async function invoke(
  pathway: Pathway,
  goal: string,
  world: World,
): Promise<{ effects: RunEffects; detail: string; overlay: RunRecord["overlay"]; ok?: boolean }> {
  switch (pathway.id) {
    case "paper_trade": {
      const { side, qty, symbol } = parseTrade(goal);
      const mark = await fetchLiveSpot(symbol);
      const price = mark.price;
      const fill = { id: uid(), symbol, side, qty, price, ts: Date.now() };
      const goldDelta = side === "sell" ? Math.round(price * qty * 0.002) : -Math.round(price * qty * 0.002);
      const gold = Math.max(0, world.gold + goldDelta);
      const rec = await remember("fill", fill);
      const biz = markPeak(
        pushMemory(
          {
            ...world.biz,
            lastSpot: { symbol, price, ts: Date.now(), live: mark.live },
            fills: [fill, ...world.biz.fills].slice(0, 24),
          },
          rec,
        ),
        gold,
      );
      return {
        effects: { gold, biz },
        detail: `${mark.live ? "Coinbase spot" : "Local mark. Coinbase was not reached"} · paper ${side} ${qty} ${symbol} @ ${price.toFixed(2)}. Not a broker fill.`,
        overlay: "biz",
      };
    }
    case "live_trade": {
      const broker = goal.match(/broker ([A-Za-z0-9_-]+)/);
      const marked = goal.match(/@ ([0-9.]+)/);
      if (!broker) {
        return {
          effects: {},
          ok: false,
          detail: "Live order was not sent. Paste a Coinbase key in Accounts, then COMMIT. Nothing was filled.",
          overlay: "biz",
        };
      }
      const { side, qty, symbol } = parseTrade(goal);
      const price = marked ? Number(marked[1]) : 0;
      const fill = { id: broker[1], symbol, side, qty, price, ts: Date.now() };
      return {
        effects: {
          biz: {
            ...world.biz,
            lastSpot: { symbol, price, ts: Date.now(), live: true },
            fills: [fill, ...world.biz.fills].slice(0, 24),
          },
        },
        detail: `LIVE ${side} ${qty} ${symbol} @ ${price.toFixed(2)}. Coinbase order ${broker[1]}. Real order. Not a paper fill.`,
        overlay: "biz",
      };
    }
    case "mean_reversion": {
      const { symbol } = parseTrade(goal);
      const price = await fetchSpot(symbol);
      const bars = synthBars(price, 60, symbol.charCodeAt(0));
      const r = rsi(bars);
      const side: "buy" | "sell" | null = r < 30 ? "buy" : r > 70 ? "sell" : null;
      if (!side) {
        const rec = await remember("rsi", { symbol, rsi: r, price });
        return {
          effects: {
            biz: pushMemory({ ...world.biz, lastSpot: { symbol, price, ts: Date.now() }, lastScan: { symbol, rsi: r, note: "no fill", ts: Date.now() } }, rec),
          },
          detail: `RSI ${r} on ${symbol} — no paper fill. Local walk around spot.`,
          overlay: "biz",
        };
      }
      const qty = 0.01;
      const fill = { id: uid(), symbol, side, qty, price, ts: Date.now() };
      const goldDelta = side === "sell" ? Math.round(price * qty * 0.002) : -Math.round(price * qty * 0.002);
      const gold = Math.max(0, world.gold + goldDelta);
      const rec = await remember("mean_reversion", { symbol, rsi: r, fill });
      const biz = markPeak(
        pushMemory(
          {
            ...world.biz,
            lastSpot: { symbol, price, ts: Date.now() },
            lastScan: { symbol, rsi: r, note: `${side} ${qty}`, ts: Date.now() },
            fills: [fill, ...world.biz.fills].slice(0, 24),
          },
          rec,
        ),
        gold,
      );
      return {
        effects: { gold, biz },
        detail: `Mean reversion paper ${side} ${qty} ${symbol} @ ${price.toFixed(2)} (RSI ${r}).`,
        overlay: "biz",
      };
    }
    case "market_scan": {
      const { symbol } = parseTrade(goal);
      const price = await fetchSpot(symbol);
      const bars = synthBars(price, 60, symbol.charCodeAt(0) + 3);
      const r = rsi(bars);
      const band = bollinger(bars);
      const rec = await remember("scan", { symbol, price, rsi: r, ...band });
      return {
        effects: {
          biz: pushMemory(
            {
              ...world.biz,
              lastSpot: { symbol, price, ts: Date.now() },
              lastScan: { symbol, rsi: r, note: `bb ${band.lower}-${band.upper}`, ts: Date.now() },
            },
            rec,
          ),
        },
        detail: `${symbol} spot ${price.toFixed(2)} · RSI ${r} · BB ${band.lower.toFixed(0)}–${band.upper.toFixed(0)}. Local indicators.`,
        overlay: "biz",
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
        "Claim: synthetic 60-bar walk around spot. Not exchange history.",
      ].join("\n");
      const rec = await remember("backtest", { symbol, crosses, last });
      return {
        effects: {
          files: { ...world.files, "BACKTEST.md": body },
          biz: pushMemory(world.biz, rec),
        },
        detail: `MACD ${crosses} crosses, last ${last}. Written to BACKTEST.md.`,
        overlay: "files",
      };
    }
    case "restock": {
      const { qty, sku } = parseRestock(goal);
      const cost = qty * RESTOCK_UNIT_COST;
      const gold = world.gold - cost;
      const prev = world.biz.stock ?? {};
      const stock = { ...prev, [sku]: (prev[sku] ?? 0) + qty };
      const rec = await remember("restock", { sku, qty, stock: stock[sku] });
      const held = (world.biz.orders ?? []).filter((o) => o.status === "held").length;
      return {
        effects: {
          gold,
          biz: markPeak(pushMemory({ ...world.biz, stock }, rec), gold),
        },
        detail: `Restocked ${qty} ${sku}. Stock now ${stock[sku]}.${held ? ` ${held} hold(s) waiting to drain.` : ""} Local ledger only.`,
        overlay: "biz",
      };
    }
    case "dropship_order": {
      const { qty, sku } = parseOrder(goal);
      const prev = world.biz.stock ?? {};
      const have = prev[sku] ?? 0;
      if (have < qty) {
        const order = { id: uid(), sku, qty, remaining: qty, ts: Date.now(), status: "held" as const };
        const rec = await remember("hold", order);
        const body = [
          "# NEXUS hold",
          `id: ${order.id}`,
          `sku: ${sku}`,
          `qty: ${qty}`,
          `on_hand: ${have}`,
          "",
          "Claim: parked. Not a supplier portal. Drain after restock.",
        ].join("\n");
        return {
          effects: {
            files: { ...world.files, "HOLD.md": body },
            biz: pushMemory({ ...world.biz, orders: [order, ...(world.biz.orders ?? [])].slice(0, 24) }, rec),
          },
          detail: `HELD ${qty} ${sku}. On hand ${have}. Drain after restock.`,
          overlay: "plan",
        };
      }
      const remaining = have - qty;
      const stock = { ...prev, [sku]: remaining };
      const price = offeringPrice(world.biz, sku);
      const gold = world.gold + Math.round(price * qty * 0.2);
      const order = { id: uid(), sku, qty, remaining, ts: Date.now(), status: "filled" as const };
      const rec = await remember("order", order);
      const body = [
        "# NEXUS order",
        `id: ${order.id}`,
        `sku: ${sku}`,
        `qty: ${qty}`,
        `remaining: ${remaining}`,
        `margin_gold: ${Math.round(price * qty * 0.2)}`,
        "",
        "Claim: local stock decrement. Not Shopify, not a supplier portal.",
      ].join("\n");
      return {
        effects: {
          gold,
          files: { ...world.files, "ORDER.md": body },
          biz: markPeak(
            pushMemory({ ...world.biz, stock, orders: [order, ...(world.biz.orders ?? [])].slice(0, 24) }, rec),
            gold,
          ),
        },
        detail: `Fulfilled ${qty} ${sku}. Stock ${remaining}. Local ledger only.`,
        overlay: "biz",
      };
    }
    case "drain_holds": {
      const orders = [...(world.biz.orders ?? [])];
      let gold = world.gold;
      const stock = { ...(world.biz.stock ?? {}) };
      const filled: string[] = [];
      for (let i = orders.length - 1; i >= 0; i--) {
        const hold = orders[i];
        if (hold.status !== "held") continue;
        const have = stock[hold.sku] ?? 0;
        if (have < hold.qty) continue;
        const remaining = have - hold.qty;
        stock[hold.sku] = remaining;
        const price = offeringPrice(world.biz, hold.sku);
        gold += Math.round(price * hold.qty * 0.2);
        orders[i] = { ...hold, remaining, status: "filled" };
        filled.push(`${hold.qty} ${hold.sku}`);
      }
      if (!filled.length) {
        const oldest = [...orders].reverse().find((o) => o.status === "held");
        if (!oldest) return { effects: {}, detail: "No held orders.", overlay: "plan" };
        return {
          effects: {},
          detail: `Still short: ${stock[oldest.sku] ?? 0} ${oldest.sku}, hold ${oldest.qty}.`,
          overlay: "plan",
        };
      }
      const rec = await remember("drain", { filled });
      const body = [
        "# NEXUS drain",
        ...filled.map((f) => `- ${f}`),
        "",
        "Claim: local ledger. Not a supplier portal.",
      ].join("\n");
      return {
        effects: {
          gold,
          files: { ...world.files, "DRAIN.md": body },
          biz: markPeak(pushMemory({ ...world.biz, stock, orders }, rec), gold),
        },
        detail: `Drained ${filled.length} hold(s): ${filled.join(", ")}.`,
        overlay: "biz",
      };
    }
    case "supplier_quote": {
      const { sku } = parseRestock(goal);
      const quotes = supplierQuotes(sku);
      const best = quotes[0];
      const rec = await remember("quote", { sku, quotes });
      const body = [
        "# NEXUS supplier quotes",
        `sku: ${sku}`,
        ...quotes.map((q) => `${q.vendor}: ${q.unit} gold · ETA ${q.etaDays}d`),
        "",
        `pick: ${best.vendor}`,
        "Claim: deterministic local quotes. No live supplier API.",
      ].join("\n");
      return {
        effects: {
          files: { ...world.files, "QUOTES.md": body },
          biz: pushMemory(world.biz, rec),
        },
        detail: `Best ${best.vendor} @ ${best.unit} gold, ETA ${best.etaDays}d. Local quotes.`,
        overlay: "files",
      };
    }
    case "support_route": {
      const parsed = parseTicket(goal);
      const ticket = { id: uid(), kind: parsed.kind, route: parsed.route, goal, status: "routed" as const, ts: Date.now() };
      const rec = await remember("ticket", ticket);
      const body = [
        "# NEXUS ticket",
        `id: ${ticket.id}`,
        `kind: ${ticket.kind}`,
        `route: ${ticket.route}`,
        `goal: ${goal}`,
        "",
        "Claim: local queue. Not a helpdesk product.",
      ].join("\n");
      return {
        effects: {
          files: { ...world.files, "TICKET.md": body },
          biz: pushMemory({ ...world.biz, tickets: [ticket, ...(world.biz.tickets ?? [])].slice(0, 24) }, rec),
        },
        detail: `Routed ${ticket.kind} → ${ticket.route.toUpperCase()}. Ticket ${ticket.id}.`,
        overlay: "plan",
      };
    }
    case "shop_publish": {
      const files = shopFiles(world.biz);
      const tested = runLabTests(files, world.biz);
      return {
        effects: {
          files: { ...world.files, ...files },
          biz: { ...world.biz, lastTest: { ...tested, ts: Date.now() } },
        },
        detail: tested.ok ? "Shop published into the lab. TEST passed." : "Shop published. TEST found gaps.",
        overlay: "ide",
      };
    }
    case "lab_build": {
      const demo = matchDemo(goal) ?? matchDemo("video grid")!;
      const files = { ...world.files, ...demo.files };
      const tested = runLabTests(files, world.biz);
      const rec = await remember("lab_build", { id: demo.id, ok: tested.ok });
      return {
        effects: {
          files,
          plan: demo.plan,
          biz: pushMemory({ ...world.biz, lastTest: { ...tested, ts: Date.now() } }, rec),
        },
        detail: tested.ok ? `${demo.title} shipped. QA signed.` : `${demo.title} shipped. QA found gaps.`,
        overlay: "ide",
      };
    }
    case "arcade_ship": {
      const cabinets = hydrateCabinets(world.biz.cabinets);
      if (cabinets.length >= CABINET_CAP) {
        return {
          effects: { biz: { ...world.biz, cabinets, lastCabinetAt: Date.now() } },
          detail: `Hall is full (${CABINET_CAP}). Play what's on the floor.`,
          overlay: null,
        };
      }
      const cab = nextCabinet(cabinets);
      const next = [...cabinets, cab];
      const rec = await remember("arcade", { id: cab.id, title: cab.title, engine: cab.engine, hero: cab.hero });
      const body = [
        "# NEXUS arcade cabinet",
        `id: ${cab.id}`,
        `title: ${cab.title}`,
        `engine: ${cab.engine}`,
        `hero: ${cab.hero}`,
        `ts: ${new Date(cab.ts).toISOString()}`,
        "",
        "Claim: local play. RIX forges. You still COMMIT.",
      ].join("\n");
      return {
        effects: {
          files: { ...world.files, "ARCADE.md": body },
          biz: pushMemory({ ...world.biz, cabinets: next, lastCabinetAt: Date.now() }, rec),
        },
        detail: `${cab.title} dropped in the hall. ${cab.blurb}`,
        overlay: null,
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
        "SUNDER.md": renderSunder(findings, changed),
      };
      const rec = await remember("sunder", { hash, findings });
      const version = { hash, ts: Date.now(), files: Object.keys(files), snapshot: { ...world.files } };
      return {
        effects: {
          files,
          biz: pushMemory({ ...world.biz, versions: [version, ...(world.biz.versions ?? [])].slice(0, 3) }, rec),
        },
        detail: changed
          ? `SUNDER patched the lab. ${findings.length} finding(s). Hash ${hash.slice(0, 12)}.`
          : `SCAN clean. ${findings[0]?.note ?? "Nothing to cut."}`,
        overlay: "files",
      };
    }
    case "horizon": {
      const map = matchRoadmap(goal);
      const rec = await remember("horizon", { title: map.title, n: map.steps.length });
      return {
        effects: {
          files: { ...world.files, "BOARD.md": renderBoard(map) },
          plan: map.steps,
          biz: pushMemory(world.biz, rec),
        },
        detail: `${map.title}: ${map.steps.length} steps on the board. Supervised — not autonomous.`,
        overlay: "plan",
      };
    }
    case "lab_qa": {
      const tested = runLabTests(world.files, world.biz);
      const checks = tested.checks.map((c) => `${c.ok ? "PASS" : "FAIL"} ${c.name}`);
      return {
        effects: {
          biz: { ...world.biz, lastTest: { ...tested, ts: Date.now() } },
        },
        detail: checks.join(" · ") || "No checks.",
        overlay: "ide",
      };
    }
    case "design_version": {
      if (/\b(rollback|revert)\b/i.test(goal)) {
        const last = (world.biz.versions ?? [])[0];
        if (!last) {
          return { effects: {}, detail: "No design version to roll back.", overlay: "files" };
        }
        return {
          effects: { files: { ...world.files, ...last.snapshot } },
          detail: `Rolled back to ${last.hash.slice(0, 12)}. Local snapshot.`,
          overlay: "ide",
        };
      }
      const hash = await hashFiles(world.files);
      const version = {
        hash,
        ts: Date.now(),
        files: Object.keys(world.files),
        snapshot: { ...world.files },
      };
      const rec = await remember("version", { hash, files: version.files });
      const body = [
        "# NEXUS design version",
        `hash: ${hash}`,
        `files: ${version.files.join(", ") || "(empty)"}`,
        `ts: ${new Date(version.ts).toISOString()}`,
        "",
        "Claim: SHA-256 of lab files. Not firmware flashing.",
      ].join("\n");
      return {
        effects: {
          files: { ...world.files, "VERSION.md": body },
          biz: pushMemory({ ...world.biz, versions: [version, ...(world.biz.versions ?? [])].slice(0, 3) }, rec),
        },
        detail: `Design hash ${hash.slice(0, 12)}. Snapshot stored for rollback.`,
        overlay: "files",
      };
    }
    case "risk_halt":
      return {
        effects: { biz: { ...world.biz, halted: true, sesa: setSesaLock(hydrateSesa(world.biz.sesa), true) } },
        detail: "Desk halted. Paper trades, restocks, orders, drains, and SESA cycles refuse until resume.",
        overlay: "plan",
      };
    case "risk_resume":
      return {
        effects: {
          biz: {
            ...world.biz,
            halted: false,
            drawdown: 0,
            peakGold: Math.max(world.biz.peakGold ?? world.gold, world.gold),
            sesa: setSesaLock(hydrateSesa(world.biz.sesa), false),
          },
        },
        detail: "Desk resumed. Still paper-only. SESA lock lifted.",
        overlay: "plan",
      };
    case "sesa_cycle": {
      const parsed = parseSesaGoal(goal);
      const started = hydrateSesa(world.biz.sesa);
      const result = await commitCycle(started, parsed.intent, parsed.action, parsed.admit);
      if (!result.ok) {
        return {
          effects: { biz: { ...world.biz, sesa: result.state } },
          detail: result.error,
          overlay: "files",
        };
      }
      const rec = await remember("sesa", {
        idx: result.frame.idx,
        intent: result.frame.intent,
        action: result.frame.action,
        cohesion: result.frame.cohesion,
        leaf: result.frame.leaf,
        merkle: result.state.merkleRoot,
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
        "Claim: VSA bind + SMT. In-process ring. Local merkle. Not Godot. Not a chain.",
      ].join("\n");
      return {
        effects: {
          files: { ...world.files, "SESA.md": body },
          biz: pushMemory({ ...world.biz, sesa: result.state }, rec),
        },
        detail: `SESA ${result.frame.intent}⊗${result.frame.action} cohesion ${result.frame.cohesion.toFixed(4)}. Merkle ${result.state.merkleRoot.slice(0, 12)}.`,
        overlay: "files",
      };
    }
    case "sesa_revert": {
      const started = hydrateSesa(world.biz.sesa);
      const result = revertVerified(started);
      if (!result.ok) {
        return { effects: { biz: { ...world.biz, sesa: result.state } }, detail: result.error, overlay: "files" };
      }
      const rec = await remember("sesa_revert", { merkle: result.state.merkleRoot, idx: result.state.lastVerifiedIdx });
      const body = [
        "# NEXUS SESA revert",
        `merkle: ${result.state.merkleRoot}`,
        `frame: ${result.state.lastVerifiedIdx}`,
        "",
        "Claim: snapped to last verified manifold. Local only.",
      ].join("\n");
      return {
        effects: {
          files: { ...world.files, "SESA.md": body },
          biz: pushMemory({ ...world.biz, sesa: result.state }, rec),
        },
        detail: `Snapped to frame ${result.state.lastVerifiedIdx}. Merkle ${result.state.merkleRoot.slice(0, 12)}.`,
        overlay: "files",
      };
    }
    case "audit_pack": {
      const body = [
        "# NEXUS audit pack",
        `ts: ${new Date().toISOString()}`,
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
        "Claim: local hashed dump. Not a regulator filing.",
      ].join("\n");
      const rec = await remember("audit", body);
      return {
        effects: {
          files: { ...world.files, "AUDIT.md": body },
          biz: pushMemory(world.biz, rec),
        },
        detail: "Audit pack written to AUDIT.md in the lab.",
        overlay: "files",
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
        "Claim: local size flag. Not 2FA, not a regulator.",
      ].join("\n");
      const rec = await remember("compliance", { flagged: flags.length });
      return {
        effects: {
          files: { ...world.files, "COMPLIANCE.md": body },
          biz: pushMemory(world.biz, rec),
        },
        detail: flags.length ? `${flags.length} paper fill(s) over notional cap.` : "No paper fills over the local notional cap.",
        overlay: "files",
      };
    }
    case "assign":
      return {
        effects: {},
        detail: `Held for ${pathway.owner.toUpperCase()}. Supervised board. Nothing else ran.`,
        overlay: "plan",
      };
    default:
      return {
        effects: {},
        detail: `unregistered pathway ${pathway.id}`,
        overlay: "plan",
        ok: false,
      };
  }
}

async function seal(
  proposal: Proposal,
  pathway: Pathway,
  world: World,
  steps: PipeStep[],
  ok: boolean,
  detail: string,
  effects: RunEffects,
  overlay: RunRecord["overlay"] = "plan",
): Promise<RuntimeResult> {
  const ts = Date.now();
  const payload = JSON.stringify({
    proposalId: proposal.id,
    goal: proposal.goal,
    pathway: pathway.id,
    ok,
    detail,
    ts,
  });
  const hash = await sha256Hex(payload);
  steps.push({ name: "HASH", ok: true, note: shortHash(hash) });
  steps.push({ name: "MEMORY", ok: true, note: "clean room · local" });
  const run: RunRecord = {
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
    overlay: ok ? overlay : "plan",
  };
  return { run, effects };
}
