import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { sha256Hex } from "./hash.ts";
import { heldDeskKey } from "./localbox.ts";
import {
  allowOrder,
  cleanBuyer,
  cleanOrderNote,
  deskAllows,
  isOrderId,
  newOrderId,
  nextPaidStatus,
  offerQuote,
  publicSlip,
  sealText,
  type OrderHit,
  type PaidStatus,
} from "./paid.ts";

export type PaidOrder = {
  id: string;
  offerId: string;
  name: string;
  price: string;
  buyer: string;
  note: string;
  status: PaidStatus;
  href: string;
  intact: boolean;
};

const hits: OrderHit[] = [];

async function gate(key: string) {
  return deskAllows(key, await heldDeskKey(), true);
}

function asStatus(v: string): PaidStatus {
  return v === "paid" || v === "done" || v === "void" ? v : "open";
}

export const readHeldDesk = createServerFn({ method: "POST" })
  .validator(() => ({}))
  .handler(async () => ({ key: await heldDeskKey() }));

export const placeShopOrder = createServerFn({ method: "POST" })
  .validator((input: { offerId?: string; buyer?: string; note?: string }) => ({
    offerId: String(input?.offerId ?? "").slice(0, 40),
    buyer: cleanBuyer(String(input?.buyer ?? "")),
    note: cleanOrderNote(String(input?.note ?? "")),
  }))
  .handler(async ({ data }): Promise<{ ok: true; order: PaidOrder } | { ok: false; error: string }> => {
    const quote = offerQuote(data.offerId);
    if (!quote) return { ok: false, error: "That offer is not for sale." };
    const bucket = data.buyer ? `${data.buyer.toLowerCase()}|${quote.id}` : `anon|${quote.id}`;
    const gateHit = allowOrder(hits, [bucket, "*"], Date.now());
    hits.splice(0, hits.length, ...gateHit.hits);
    if (!gateHit.ok) return { ok: false, error: "Too many requests. Wait a few minutes." };
    const sql = await getSql();
    const id = newOrderId();
    const seal = await sha256Hex(sealText(id, quote.id, quote.price, data.buyer, data.note, "open"));
    await sql`insert into shop_orders (id, offer_id, offer_name, price, buyer, note, status, seal)
      values (${id}, ${quote.id}, ${quote.name}, ${quote.price}, ${data.buyer}, ${data.note}, 'open', ${seal})`;
    return {
      ok: true,
      order: {
        id,
        offerId: quote.id,
        name: quote.name,
        price: quote.price,
        buyer: data.buyer,
        note: data.note,
        status: "open",
        href: quote.href,
        intact: true,
      },
    };
  });

export const listShopOrders = createServerFn({ method: "POST" })
  .validator((input: { deskKey?: string }) => ({ deskKey: String(input?.deskKey ?? "").slice(0, 80) }))
  .handler(async ({ data }): Promise<{ ok: true; locked: boolean; orders: PaidOrder[] } | { ok: false; error: string }> => {
    if (!(await gate(data.deskKey))) return { ok: false, error: "Desk key refused." };
    const sql = await getSql();
    const rows = await sql<{
      id: string;
      offer_id: string;
      offer_name: string;
      price: string;
      buyer: string;
      note: string;
      status: string;
      seal: string;
    }>`select id, offer_id, offer_name, price, buyer, note, status, seal from shop_orders order by created_at desc limit 40`;
    const orders: PaidOrder[] = [];
    for (const r of rows) {
      const expect = await sha256Hex(sealText(r.id, r.offer_id, r.price, r.buyer, r.note, asStatus(r.status)));
      orders.push({
        id: r.id,
        offerId: r.offer_id,
        name: r.offer_name,
        price: r.price,
        buyer: r.buyer,
        note: r.note,
        status: asStatus(r.status),
        href: offerQuote(r.offer_id)?.href ?? "",
        intact: !r.seal || r.seal === expect,
      });
    }
    return { ok: true, locked: true, orders };
  });

export const markShopOrder = createServerFn({ method: "POST" })
  .validator((input: { id?: string; status?: string; deskKey?: string }) => ({
    id: String(input?.id ?? "").slice(0, 24),
    status: String(input?.status ?? "").slice(0, 12),
    deskKey: String(input?.deskKey ?? "").slice(0, 80),
  }))
  .handler(async ({ data }): Promise<{ ok: true; status: PaidStatus } | { ok: false; error: string }> => {
    if (!isOrderId(data.id)) return { ok: false, error: "That is not an order id." };
    if (!(await gate(data.deskKey))) return { ok: false, error: "Desk key refused." };
    const sql = await getSql();
    const rows = await sql<{
      offer_id: string;
      price: string;
      buyer: string;
      note: string;
      status: string;
    }>`select offer_id, price, buyer, note, status from shop_orders where id = ${data.id}`;
    const row = rows[0];
    if (!row) return { ok: false, error: "No order with that id." };
    const next = nextPaidStatus(row.status, data.status);
    if (!next) return { ok: false, error: "That order cannot move there." };
    const seal = await sha256Hex(sealText(data.id, row.offer_id, row.price, row.buyer, row.note, next));
    await sql`update shop_orders set status = ${next}, seal = ${seal} where id = ${data.id}`;
    return { ok: true, status: next };
  });

export const readShopOrder = createServerFn({ method: "POST" })
  .validator((input: { id?: string }) => ({ id: String(input?.id ?? "").trim().toUpperCase().slice(0, 24) }))
  .handler(async ({ data }): Promise<{ ok: true; order: ReturnType<typeof publicSlip> } | { ok: false; error: string }> => {
    if (!isOrderId(data.id)) return { ok: false, error: "No order with that id." };
    const sql = await getSql();
    const rows = await sql<{ id: string; offer_name: string; price: string; status: string }>`
      select id, offer_name, price, status from shop_orders where id = ${data.id}`;
    const row = rows[0];
    if (!row) return { ok: false, error: "No order with that id." };
    return { ok: true, order: publicSlip({ id: row.id, name: row.offer_name, price: row.price, status: asStatus(row.status) }) };
  });
