export type WatchId = "stock_low" | "rsi_band" | "scan_tick" | "drain";

export type WatchDef = {
  id: WatchId;
  title: string;
  chip: string;
  cooldown: number;
  claim: string;
};

export type WatchRow = { armed: boolean; lastFire: number; lastReason: string };

export type WatchState = Record<string, WatchRow>;

export type WatchFire = { id: WatchId; hint: string; reason: string };

export type PlantRules = {
  sku: string;
  lowAt: number;
  restockQty: number;
  inboundQty: number;
  symbol: string;
};

export const DEFAULT_RULES: PlantRules = {
  sku: "offer-1",
  lowAt: 20,
  restockQty: 40,
  inboundQty: 25,
  symbol: "BTC",
};

export const WATCH_DEFS: WatchDef[] = [
  {
    id: "stock_low",
    title: "Low stock",
    chip: "LOW",
    cooldown: 20_000,
    claim: "Local ledger. No supplier API.",
  },
  {
    id: "drain",
    title: "Drain holds",
    chip: "HOLD",
    cooldown: 15_000,
    claim: "Fills parked orders after restock. Local only.",
  },
  {
    id: "rsi_band",
    title: "RSI band",
    chip: "RSI",
    cooldown: 35_000,
    claim: "Paper fill only. Not a live broker.",
  },
  {
    id: "scan_tick",
    title: "Scan cadence",
    chip: "TICK",
    cooldown: 40_000,
    claim: "Spot mark + local indicators.",
  },
];

function clampInt(n: unknown, min: number, max: number, fallback: number) {
  const v = Number(n);
  if (!Number.isFinite(v)) return fallback;
  return Math.min(max, Math.max(min, Math.round(v)));
}

export function hydrateRules(raw?: Partial<PlantRules> | null): PlantRules {
  const sku = raw?.sku === "offer-2" ? "offer-2" : "offer-1";
  const symbol = String(raw?.symbol ?? "BTC")
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .slice(0, 5);
  return {
    sku,
    lowAt: clampInt(raw?.lowAt, 1, 500, DEFAULT_RULES.lowAt),
    restockQty: clampInt(raw?.restockQty, 1, 500, DEFAULT_RULES.restockQty),
    inboundQty: clampInt(raw?.inboundQty, 1, 500, DEFAULT_RULES.inboundQty),
    symbol: symbol.length >= 2 ? symbol : "BTC",
  };
}

export function watchCopy(id: WatchId, rules: PlantRules): { when: string; hint: string } {
  if (id === "stock_low") {
    return {
      when: `${rules.sku} on hand < ${rules.lowAt}`,
      hint: `restock ${rules.restockQty} units ${rules.sku}`,
    };
  }
  if (id === "drain") {
    return { when: "held order and stock covers it", hint: "drain held orders" };
  }
  if (id === "rsi_band") {
    return {
      when: `last ${rules.symbol} RSI < 30 or > 70`,
      hint: `run mean reversion on ${rules.symbol}`,
    };
  }
  return { when: `every ~40s ${rules.symbol}`, hint: `scan market ${rules.symbol}` };
}

export function defaultWatchState(): WatchState {
  return Object.fromEntries(WATCH_DEFS.map((w) => [w.id, { armed: false, lastFire: 0, lastReason: "" }]));
}

export function hydrateWatches(raw?: WatchState | null): WatchState {
  const base = defaultWatchState();
  if (!raw) return base;
  for (const def of WATCH_DEFS) {
    const row = raw[def.id];
    if (row) base[def.id] = { armed: !!row.armed, lastFire: row.lastFire ?? 0, lastReason: row.lastReason ?? "" };
  }
  return base;
}

export function plantStats(biz: {
  stock?: Record<string, number>;
  orders?: { status?: string; qty: number; sku: string }[];
  rules?: Partial<PlantRules> | null;
  halted?: boolean;
  autoOps?: boolean;
  lastScan?: { rsi: number; symbol: string } | null;
}) {
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
    low: stock < rules.lowAt,
  };
}

export function evaluateWatches(args: {
  stock: Record<string, number>;
  lastScan: { rsi: number } | null;
  watches: WatchState;
  rules?: Partial<PlantRules> | null;
  holds?: { sku: string; qty: number; status?: string }[];
  now: number;
  halted: boolean;
}): WatchFire[] {
  const watches = hydrateWatches(args.watches);
  const rules = hydrateRules(args.rules);
  const holds = args.holds ?? [];
  const out: WatchFire[] = [];
  for (const def of WATCH_DEFS) {
    const st = watches[def.id];
    if (!st.armed) continue;
    if (args.now - st.lastFire < def.cooldown) continue;
    const copy = watchCopy(def.id, rules);
    if (def.id === "stock_low") {
      const n = args.stock[rules.sku] ?? 0;
      if (n < rules.lowAt && !args.halted) {
        out.push({ id: def.id, hint: copy.hint, reason: `${rules.sku} on hand ${n} < ${rules.lowAt}` });
      }
    } else if (def.id === "drain") {
      const oldest = [...holds].reverse().find((h) => h.status === "held");
      if (oldest && !args.halted && (args.stock[oldest.sku] ?? 0) >= oldest.qty) {
        out.push({ id: def.id, hint: copy.hint, reason: `cover ${oldest.qty} ${oldest.sku}` });
      }
    } else if (def.id === "rsi_band") {
      const r = args.lastScan?.rsi;
      if (r != null && (r < 30 || r > 70) && !args.halted) {
        out.push({ id: def.id, hint: copy.hint, reason: `RSI ${r}` });
      }
    } else if (def.id === "scan_tick") {
      out.push({ id: def.id, hint: copy.hint, reason: "cadence" });
    }
  }
  return out;
}

export function inspectWatches(state?: WatchState | null, rules?: Partial<PlantRules> | null) {
  const st = hydrateWatches(state);
  const r = hydrateRules(rules);
  return WATCH_DEFS.map((w) => {
    const row = st[w.id];
    const copy = watchCopy(w.id, r);
    return `${w.id} · ${row.armed ? "ARMED" : "cold"} · ${copy.when} · ${w.claim} · fire: ${copy.hint}`;
  }).join("\n");
}

export function inboundHint(qty: number, sku = DEFAULT_RULES.sku) {
  const n = Math.max(1, Math.floor(qty));
  return `new order ${n} units ${sku}`;
}
