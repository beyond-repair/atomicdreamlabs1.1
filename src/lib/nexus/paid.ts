import { DEFAULT_BIZ, cashAppHref } from "./business.ts";

export type PaidStatus = "open" | "paid" | "done" | "void";

export type PaidQuote = {
  id: string;
  name: string;
  price: string;
  note: string;
  href: string;
};

export function offerQuote(offerId: string): PaidQuote | null {
  const o = DEFAULT_BIZ.offerings.find((x) => x.id === offerId);
  if (!o) return null;
  const n = Number(o.price);
  if (!Number.isFinite(n) || n <= 0) return null;
  const href = cashAppHref(DEFAULT_BIZ.rails.cashApp, o.price);
  if (!href) return null;
  return { id: o.id, name: o.name, price: o.price, note: o.note, href };
}

export function newOrderId() {
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  const hex = [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();
  return `ADL-${hex}`;
}

export function isOrderId(id: string) {
  return /^ADL-[A-F0-9]{8,16}$/.test(id);
}

/** Production refuses the book when the host has no desk key. Preview stays open. */
export function deskAllows(key: string, envKey: string | undefined, production: boolean) {
  const need = envKey?.trim() ?? "";
  if (!need) return !production;
  return key.trim() === need;
}

export type OrderHit = { key: string; ts: number };

/** Four tries for one name and offer, forty for the whole shop, inside ten minutes. */
export function allowOrder(hits: OrderHit[], keys: string[], now: number): { ok: boolean; hits: OrderHit[] } {
  const windowMs = 10 * 60 * 1000;
  const kept = hits.filter((h) => now - h.ts < windowMs);
  for (const key of keys) {
    const max = key === "*" ? 40 : 4;
    if (kept.filter((h) => h.key === key).length >= max) return { ok: false, hits: kept };
  }
  return { ok: true, hits: [...kept, ...keys.map((key) => ({ key, ts: now }))] };
}

export function sealText(id: string, offerId: string, price: string, buyer: string, note: string, status: string) {
  return `${id}|${offerId}|${price}|${buyer}|${note}|${status}`;
}

export function publicSlip(order: { id: string; name: string; price: string; status: string }) {
  return { id: order.id, name: order.name, price: order.price, status: order.status };
}

export function nextPaidStatus(from: string, to: string): PaidStatus | null {
  if (from === "open" && (to === "paid" || to === "void")) return to;
  if (from === "paid" && (to === "done" || to === "void")) return to;
  return null;
}

export function cleanBuyer(v: string) {
  return v.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim().slice(0, 80);
}

export function cleanOrderNote(v: string) {
  return v.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim().slice(0, 500);
}
