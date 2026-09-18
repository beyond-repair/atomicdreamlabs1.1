import { sha256Hex } from "./hash.ts";

export const DRAWDOWN_LIMIT = 0.05;

export type Quote = { vendor: string; unit: number; etaDays: number };

export type MemoryRecord = {
  key: string;
  hash: string;
  ts: number;
  body: string;
};

export function synthBars(spot: number, n = 60, seed = 7): number[] {
  const bars = [spot];
  let x = seed >>> 0;
  for (let i = 1; i < n; i++) {
    x = (Math.imul(x, 1103515245) + 12345) >>> 0;
    const wiggle = ((x % 1000) / 1000 - 0.5) * 0.012;
    bars.push(bars[i - 1] * (1 + wiggle));
  }
  return bars;
}

export function rsi(bars: number[], period = 14): number {
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

export function bollinger(bars: number[], period = 20) {
  const slice = bars.slice(-Math.min(period, bars.length));
  const mean = slice.reduce((a, b) => a + b, 0) / slice.length;
  const variance = slice.reduce((a, b) => a + (b - mean) ** 2, 0) / slice.length;
  const sd = Math.sqrt(variance);
  return {
    mean: round2(mean),
    upper: round2(mean + 2 * sd),
    lower: round2(mean - 2 * sd),
  };
}

function ema(bars: number[], period: number) {
  const k = 2 / (period + 1);
  let e = bars[0];
  const out = [e];
  for (let i = 1; i < bars.length; i++) {
    e = bars[i] * k + e * (1 - k);
    out.push(e);
  }
  return out;
}

export function macdCrosses(bars: number[]): { crosses: number; last: "buy" | "sell" | "none" } {
  const line = ema(bars, 12).map((v, i) => v - ema(bars, 26)[i]);
  const signal = ema(line, 9);
  let crosses = 0;
  let last: "buy" | "sell" | "none" = "none";
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
  return { crosses, last };
}

export function supplierQuotes(sku: string): Quote[] {
  const seed = Array.from(sku).reduce((a, c) => a + c.charCodeAt(0), 0);
  return [
    { vendor: "Supplier X", unit: 8 + (seed % 5), etaDays: 5 },
    { vendor: "Supplier Y", unit: 7 + ((seed * 3) % 6), etaDays: 8 },
    { vendor: "Supplier Z", unit: 9 + ((seed * 7) % 4), etaDays: 3 },
  ].sort((a, b) => a.unit - b.unit || a.etaDays - b.etaDays);
}

export async function remember(key: string, body: unknown): Promise<MemoryRecord> {
  const text = typeof body === "string" ? body : JSON.stringify(body);
  const hash = await sha256Hex(text);
  return { key, hash, ts: Date.now(), body: text.slice(0, 480) };
}

export async function hashFiles(files: Record<string, string>): Promise<string> {
  const blob = Object.keys(files)
    .sort()
    .map((k) => `${k}\n${files[k]}`)
    .join("\n--\n");
  return sha256Hex(blob || "empty-lab");
}

export function parseTicket(goal: string): { kind: string; route: "qa" | "cpo" | "ceo" } {
  const t = goal.toLowerCase();
  if (/\brefund|chargeback\b/.test(t)) return { kind: "refund", route: "qa" };
  if (/\b(legal|compliance|regulator)\b/.test(t)) return { kind: "compliance", route: "ceo" };
  return { kind: "support", route: "cpo" };
}

export function parseOrder(goal: string): { qty: number; sku: string } {
  const m = goal.match(/(\d+)\s*(units|pcs|unit)?/i);
  const qty = m ? Math.max(1, Number(m[1])) : 1;
  const sku = /rasp|pi|offer-1/i.test(goal) ? "offer-1" : /scan|desk|offer-2/i.test(goal) ? "offer-2" : "offer-1";
  return { qty, sku };
}

export function bookPositions(
  fills: { symbol: string; side: "buy" | "sell"; qty: number; price: number }[],
): { symbol: string; qty: number; avg: number }[] {
  const map = new Map<string, { qty: number; notional: number }>();
  for (const f of [...fills].reverse()) {
    const row = map.get(f.symbol) ?? { qty: 0, notional: 0 };
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
  return [...map.entries()]
    .filter(([, r]) => Math.abs(r.qty) > 1e-8)
    .map(([symbol, r]) => ({
      symbol,
      qty: Math.round(r.qty * 1e6) / 1e6,
      avg: r.qty !== 0 ? Math.round((r.notional / Math.abs(r.qty)) * 100) / 100 : 0,
    }));
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}


