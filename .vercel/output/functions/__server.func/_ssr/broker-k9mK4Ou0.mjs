import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { c as parseTrade } from "./pathways-qAusL2xc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/broker-k9mK4Ou0.js
/** A live order the operator sized. The hard ceiling is enforced on the server. */
var LIVE_CAP_MAX = 500;
var LIVE_QTY_CAP = .05;
function liveNotionalOk(qty, price, cap) {
	if (!(qty > 0) || !(price > 0)) return "Need a size and a live price.";
	if (qty > LIVE_QTY_CAP) return `Live size cap is ${LIVE_QTY_CAP}.`;
	const limit = Math.min(LIVE_CAP_MAX, Math.max(1, cap));
	const notional = qty * price;
	if (notional > limit) return `That ticket is $${notional.toFixed(2)}. The cap is $${limit.toFixed(0)}.`;
	return null;
}
var placeLiveOrder_createServerFn_handler = createServerRpc({
	id: "71d48cf8e242c464a7575dc3b7ba1f5ea43bdf652560ddbed957dc74b58dceed",
	name: "placeLiveOrder",
	filename: "src/lib/nexus/broker.ts"
}, (opts) => placeLiveOrder.__executeServer(opts));
var placeLiveOrder = createServerFn({ method: "POST" }).validator((input) => ({
	key: String(input?.key ?? "").trim().slice(0, 400),
	secret: String(input?.secret ?? "").trim().slice(0, 8e3),
	goal: String(input?.goal ?? "").trim().slice(0, 200),
	cap: Number(input?.cap ?? 25)
})).handler(placeLiveOrder_createServerFn_handler, async ({ data }) => {
	if (!data.key || !data.secret) return {
		ok: false,
		error: "No Coinbase key on this device. Paste it in Accounts. Nothing was sent."
	};
	const { side, qty, symbol } = parseTrade(data.goal);
	let price = 0;
	try {
		const json = await (await fetch(`https://api.coinbase.com/v2/prices/${encodeURIComponent(symbol)}-USD/spot`)).json();
		price = Number(json.data?.amount);
	} catch {
		price = 0;
	}
	const blocked = liveNotionalOk(qty, price, data.cap);
	if (blocked) return {
		ok: false,
		error: blocked
	};
	const path = "/api/v3/brokerage/orders";
	const body = JSON.stringify({
		client_order_id: `nexus-${Date.now()}`,
		product_id: `${symbol}-USD`,
		side: side.toUpperCase(),
		order_configuration: { market_market_ioc: { base_size: qty.toFixed(8).replace(/0+$/, "").replace(/\.$/, "") } }
	});
	try {
		const headers = await coinbaseHeaders(data.key, data.secret, "POST", path, body);
		const res = await fetch(`https://api.coinbase.com${path}`, {
			method: "POST",
			headers,
			body
		});
		const json = await res.json();
		if (!res.ok || json.success === false) return {
			ok: false,
			error: `Coinbase did not take the order. ${json.error_response?.message || json.error_response?.error || json.message || `Coinbase refused (${res.status}).`} Nothing was filled here.`
		};
		const orderId = json.success_response?.order_id;
		if (!orderId) return {
			ok: false,
			error: "Coinbase answered without an order id. Check the exchange before you try again."
		};
		return {
			ok: true,
			orderId,
			price
		};
	} catch {
		return {
			ok: false,
			error: "Coinbase did not answer. Nothing was filled here."
		};
	}
});
var readBalances_createServerFn_handler = createServerRpc({
	id: "ac3f969becf73808d44b2fe74f8f6b1f5d30be9260d799ed5e88d779d558b710",
	name: "readBalances",
	filename: "src/lib/nexus/broker.ts"
}, (opts) => readBalances.__executeServer(opts));
var readBalances = createServerFn({ method: "POST" }).validator((input) => ({
	key: String(input?.key ?? "").trim().slice(0, 400),
	secret: String(input?.secret ?? "").trim().slice(0, 8e3)
})).handler(readBalances_createServerFn_handler, async ({ data }) => {
	if (!data.key || !data.secret) return {
		ok: false,
		error: "No Coinbase key on this device."
	};
	const path = "/api/v3/brokerage/accounts?limit=8";
	try {
		const headers = await coinbaseHeaders(data.key, data.secret, "GET", path, "");
		const res = await fetch(`https://api.coinbase.com${path}`, { headers });
		const json = await res.json();
		if (!res.ok) return {
			ok: false,
			error: json.message || `Coinbase refused the balance read (${res.status}).`
		};
		const lines = (json.accounts ?? []).map((a) => {
			const value = a.available_balance?.value;
			const currency = a.available_balance?.currency;
			if (!value || !currency || Number(value) === 0) return "";
			return `${currency} ${value}`;
		}).filter(Boolean).slice(0, 6);
		return {
			ok: true,
			lines: lines.length ? lines : ["The key answered. No available balance."]
		};
	} catch {
		return {
			ok: false,
			error: "Coinbase did not answer."
		};
	}
});
async function coinbaseHeaders(key, secret, method, path, body) {
	const { createHmac, createSign, randomBytes } = await import("node:crypto");
	if (secret.includes("BEGIN")) return {
		Authorization: `Bearer ${signJwt(key, secret, method, path.split("?")[0], createSign, randomBytes)}`,
		"Content-Type": "application/json"
	};
	const timestamp = Math.floor(Date.now() / 1e3).toString();
	const signedPath = path.split("?")[0];
	return {
		"CB-ACCESS-KEY": key,
		"CB-ACCESS-SIGN": createHmac("sha256", /^[A-Za-z0-9+/=]+$/.test(secret) && secret.length % 4 === 0 ? Buffer.from(secret, "base64") : Buffer.from(secret)).update(`${timestamp}${method}${signedPath}${body}`).digest("base64"),
		"CB-ACCESS-TIMESTAMP": timestamp,
		"Content-Type": "application/json"
	};
}
function signJwt(keyName, pem, method, path, createSign, randomBytes) {
	const header = {
		alg: "ES256",
		kid: keyName,
		nonce: randomBytes(16).toString("hex"),
		typ: "JWT"
	};
	const now = Math.floor(Date.now() / 1e3);
	const payload = {
		iss: "cdp",
		nbf: now,
		exp: now + 120,
		sub: keyName,
		uri: `${method} api.coinbase.com${path}`
	};
	const input = `${b64url(Buffer.from(JSON.stringify(header)))}.${b64url(Buffer.from(JSON.stringify(payload)))}`;
	const signer = createSign("SHA256");
	signer.update(input);
	signer.end();
	return `${input}.${b64url(derToJose(signer.sign(pem)))}`;
}
function b64url(buf) {
	return buf.toString("base64url");
}
function derToJose(der) {
	let offset = 2;
	if (der[1] & 128) offset = 2 + (der[1] & 127);
	const rLen = der[offset + 1];
	let r = der.subarray(offset + 2, offset + 2 + rLen);
	offset = offset + 2 + rLen;
	const sLen = der[offset + 1];
	let s = der.subarray(offset + 2, offset + 2 + sLen);
	const trim = (buf) => {
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
//#endregion
export { placeLiveOrder_createServerFn_handler, readBalances_createServerFn_handler };
