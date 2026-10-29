import { createServerFn } from "@tanstack/react-start";
import { parseTrade } from "./pathways.ts";

/** A live order the operator sized. The hard ceiling is enforced on the server. */
export const LIVE_CAP_MAX = 500;
export const LIVE_QTY_CAP = 0.05;

export function liveNotionalOk(qty: number, price: number, cap: number): string | null {
  if (!(qty > 0) || !(price > 0)) return "Need a size and a live price.";
  if (qty > LIVE_QTY_CAP) return `Live size cap is ${LIVE_QTY_CAP}.`;
  const limit = Math.min(LIVE_CAP_MAX, Math.max(1, cap));
  const notional = qty * price;
  if (notional > limit) return `That ticket is $${notional.toFixed(2)}. The cap is $${limit.toFixed(0)}.`;
  return null;
}

export function readDeskKeys(): { key: string; secret: string } {
  try {
    const bag = JSON.parse(localStorage.getItem("nexus-vault-keys") || "{}") as { coinbaseKey?: string; coinbaseSecret?: string };
    return { key: String(bag.coinbaseKey ?? ""), secret: String(bag.coinbaseSecret ?? "") };
  } catch {
    return { key: "", secret: "" };
  }
}

export function readLiveCap() {
  const n = Number(localStorage.getItem("nexus-live-cap") || "25");
  if (!Number.isFinite(n) || n < 1) return 25;
  return Math.min(LIVE_CAP_MAX, n);
}

type OrderResult = { ok: true; orderId: string; price: number } | { ok: false; error: string };

export const placeLiveOrder = createServerFn({ method: "POST" })
  .validator((input: { key?: string; secret?: string; goal?: string; cap?: number }) => ({
    key: String(input?.key ?? "").trim().slice(0, 400),
    secret: String(input?.secret ?? "").trim().slice(0, 8000),
    goal: String(input?.goal ?? "").trim().slice(0, 200),
    cap: Number(input?.cap ?? 25),
  }))
  .handler(async ({ data }): Promise<OrderResult> => {
    if (!data.key || !data.secret) {
      return { ok: false, error: "No Coinbase key on this device. Paste it in Accounts. Nothing was sent." };
    }
    const { side, qty, symbol } = parseTrade(data.goal);
    let price = 0;
    try {
      const spot = await fetch(`https://api.coinbase.com/v2/prices/${encodeURIComponent(symbol)}-USD/spot`);
      const json = (await spot.json()) as { data?: { amount?: string } };
      price = Number(json.data?.amount);
    } catch {
      price = 0;
    }
    const blocked = liveNotionalOk(qty, price, data.cap);
    if (blocked) return { ok: false, error: blocked };
    const path = "/api/v3/brokerage/orders";
    const body = JSON.stringify({
      client_order_id: `nexus-${Date.now()}`,
      product_id: `${symbol}-USD`,
      side: side.toUpperCase(),
      order_configuration: { market_market_ioc: { base_size: qty.toFixed(8).replace(/0+$/, "").replace(/\.$/, "") } },
    });
    try {
      const headers = await coinbaseHeaders(data.key, data.secret, "POST", path, body);
      const res = await fetch(`https://api.coinbase.com${path}`, { method: "POST", headers, body });
      const json = (await res.json()) as {
        success?: boolean;
        success_response?: { order_id?: string };
        error_response?: { message?: string; error?: string };
        message?: string;
      };
      if (!res.ok || json.success === false) {
        const why = json.error_response?.message || json.error_response?.error || json.message || `Coinbase refused (${res.status}).`;
        return { ok: false, error: `Coinbase did not take the order. ${why} Nothing was filled here.` };
      }
      const orderId = json.success_response?.order_id;
      if (!orderId) return { ok: false, error: "Coinbase answered without an order id. Check the exchange before you try again." };
      return { ok: true, orderId, price };
    } catch {
      return { ok: false, error: "Coinbase did not answer. Nothing was filled here." };
    }
  });

export const readBalances = createServerFn({ method: "POST" })
  .validator((input: { key?: string; secret?: string }) => ({
    key: String(input?.key ?? "").trim().slice(0, 400),
    secret: String(input?.secret ?? "").trim().slice(0, 8000),
  }))
  .handler(async ({ data }): Promise<{ ok: true; lines: string[] } | { ok: false; error: string }> => {
    if (!data.key || !data.secret) return { ok: false, error: "No Coinbase key on this device." };
    const path = "/api/v3/brokerage/accounts?limit=8";
    try {
      const headers = await coinbaseHeaders(data.key, data.secret, "GET", path, "");
      const res = await fetch(`https://api.coinbase.com${path}`, { headers });
      const json = (await res.json()) as {
        accounts?: { available_balance?: { value?: string; currency?: string } }[];
        message?: string;
      };
      if (!res.ok) return { ok: false, error: json.message || `Coinbase refused the balance read (${res.status}).` };
      const lines = (json.accounts ?? [])
        .map((a) => {
          const value = a.available_balance?.value;
          const currency = a.available_balance?.currency;
          if (!value || !currency || Number(value) === 0) return "";
          return `${currency} ${value}`;
        })
        .filter(Boolean)
        .slice(0, 6);
      return { ok: true, lines: lines.length ? lines : ["The key answered. No available balance."] };
    } catch {
      return { ok: false, error: "Coinbase did not answer." };
    }
  });

async function coinbaseHeaders(key: string, secret: string, method: string, path: string, body: string): Promise<Record<string, string>> {
  const { createHmac, createSign, randomBytes } = await import("node:crypto");
  if (secret.includes("BEGIN")) {
    const token = signJwt(key, secret, method, path.split("?")[0], createSign, randomBytes);
    return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
  }
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signedPath = path.split("?")[0];
  const keyBytes = /^[A-Za-z0-9+/=]+$/.test(secret) && secret.length % 4 === 0 ? Buffer.from(secret, "base64") : Buffer.from(secret);
  const sign = createHmac("sha256", keyBytes).update(`${timestamp}${method}${signedPath}${body}`).digest("base64");
  return {
    "CB-ACCESS-KEY": key,
    "CB-ACCESS-SIGN": sign,
    "CB-ACCESS-TIMESTAMP": timestamp,
    "Content-Type": "application/json",
  };
}

function signJwt(
  keyName: string,
  pem: string,
  method: string,
  path: string,
  createSign: (alg: string) => { update(s: string): void; end(): void; sign(key: string): Buffer },
  randomBytes: (n: number) => Buffer,
) {
  const header = { alg: "ES256", kid: keyName, nonce: randomBytes(16).toString("hex"), typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const payload = { iss: "cdp", nbf: now, exp: now + 120, sub: keyName, uri: `${method} api.coinbase.com${path}` };
  const input = `${b64url(Buffer.from(JSON.stringify(header)))}.${b64url(Buffer.from(JSON.stringify(payload)))}`;
  const signer = createSign("SHA256");
  signer.update(input);
  signer.end();
  return `${input}.${b64url(derToJose(signer.sign(pem)))}`;
}

function b64url(buf: Buffer) {
  return buf.toString("base64url");
}

function derToJose(der: Buffer) {
  let offset = 2;
  if (der[1] & 0x80) offset = 2 + (der[1] & 0x7f);
  const rLen = der[offset + 1];
  let r = der.subarray(offset + 2, offset + 2 + rLen);
  offset = offset + 2 + rLen;
  const sLen = der[offset + 1];
  let s = der.subarray(offset + 2, offset + 2 + sLen);
  const trim = (buf: Buffer) => {
    let i = 0;
    while (i < buf.length - 1 && buf[i] === 0) i += 1;
    return buf.subarray(i);
  };
  r = trim(r);
  s = trim(s);
  const out = Buffer.alloc(64);
  r.copy(out, 32 - r.length);
  s.copy(out, 64 - s.length);
  return out;
}
