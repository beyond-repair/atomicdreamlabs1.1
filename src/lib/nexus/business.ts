import { hydrateCabinets, STARTER_CABINETS, type Cabinet } from "./arcade.ts";
import type { MemoryRecord } from "./adapters";
import { defaultWatchState, hydrateWatches, hydrateRules, type WatchState, type PlantRules } from "./watches.ts";
import { DEFAULT_SESA, hydrateSesa, type SesaState } from "./sesa.ts";

export type Rails = {
  cashApp: string;
  paypal: string;
  venmo: string;
  wallet: string;
};

export type Offering = { id: string; name: string; price: string; note: string };

export type PaperFill = {
  id: string;
  symbol: string;
  side: "buy" | "sell";
  qty: number;
  price: number;
  ts: number;
};

export type LabCheck = { name: string; ok: boolean };

export type ShopOrder = {
  id: string;
  sku: string;
  qty: number;
  remaining: number;
  ts: number;
  status: "filled" | "held";
};

export type SupportTicket = {
  id: string;
  kind: string;
  route: string;
  goal: string;
  status: "open" | "routed";
  ts: number;
};

export type DesignVersion = {
  hash: string;
  ts: number;
  files: string[];
  snapshot: Record<string, string>;
};

export type BizState = {
  name: string;
  pitch: string;
  rails: Rails;
  offerings: Offering[];
  autoOps: boolean;
  fills: PaperFill[];
  lastSpot: { symbol: string; price: number; ts: number; live?: boolean } | null;
  lastTest: { ok: boolean; checks: LabCheck[]; ts: number } | null;
  stock: Record<string, number>;
  halted: boolean;
  peakGold: number;
  drawdown: number;
  orders: ShopOrder[];
  tickets: SupportTicket[];
  memory: MemoryRecord[];
  versions: DesignVersion[];
  lastScan: { symbol: string; rsi: number; note: string; ts: number } | null;
  watches: WatchState;
  rules: PlantRules;
  cabinets: Cabinet[];
  lastCabinetAt: number;
  sesa: SesaState;
};

export const DEFAULT_BIZ: BizState = {
  name: "Atomic Dream Labs",
  pitch: "Pay on Cash App. The office does not hold the money.",
  rails: { cashApp: "$AtomicDreamLabs", paypal: "", venmo: "", wallet: "" },
  offerings: [
    { id: "offer-1", name: "Custom build", price: "150", note: "Lab page, tested, launched here" },
    { id: "offer-2", name: "Paper desk scan", price: "25", note: "BTC mark + a written plan" },
  ],
  autoOps: false,
  fills: [],
  lastSpot: null,
  lastTest: null,
  stock: { "offer-1": 40, "offer-2": 12 },
  halted: false,
  peakGold: 25000,
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
  sesa: { ...DEFAULT_SESA },
};

export function hydrateBiz(b?: Partial<BizState> | null): BizState {
  return {
    ...DEFAULT_BIZ,
    ...b,
    name: b?.name?.trim() || DEFAULT_BIZ.name,
    rails: {
      ...DEFAULT_BIZ.rails,
      ...(b?.rails ?? {}),
      cashApp: b?.rails?.cashApp?.trim() || DEFAULT_BIZ.rails.cashApp,
    },
    offerings: b?.offerings?.length ? b.offerings : DEFAULT_BIZ.offerings,
    fills: b?.fills ?? [],
    stock: { ...DEFAULT_BIZ.stock, ...(b?.stock ?? {}) },
    halted: b?.halted ?? false,
    peakGold: b?.peakGold ?? DEFAULT_BIZ.peakGold,
    drawdown: b?.drawdown ?? 0,
    orders: (b?.orders ?? []).map((o) => ({ ...o, status: o.status === "held" ? "held" : "filled" })),
    tickets: b?.tickets ?? [],
    memory: b?.memory ?? [],
    versions: b?.versions ?? [],
    lastScan: b?.lastScan ?? null,
    watches: hydrateWatches(b?.watches),
    rules: hydrateRules(b?.rules),
    cabinets: hydrateCabinets(b?.cabinets),
    lastCabinetAt: b?.lastCabinetAt ?? 0,
    sesa: hydrateSesa(b?.sesa),
  };
}

export function offeringPrice(biz: BizState, sku: string): number {
  const n = Number(biz.offerings.find((o) => o.id === sku)?.price);
  return Number.isFinite(n) && n > 0 ? n : 50;
}

export function cleanHandle(v: string) {
  return v.replace(/[^A-Za-z0-9._$@/-]/g, "").slice(0, 64);
}

export function cashAppHref(tag: string, amount?: string | number) {
  const t = cleanHandle(tag).replace(/^\$/, "");
  if (!t) return "";
  const base = `https://cash.app/$${t}`;
  const n = typeof amount === "number" ? amount : Number(String(amount ?? "").replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(n) || n <= 0 || n > 10000) return base;
  const shown = Math.abs(n - Math.round(n)) < 0.001 ? String(Math.round(n)) : n.toFixed(2);
  return `${base}/${shown}`;
}

export function paypalHref(v: string) {
  const s = v.trim();
  if (!s) return "";
  if (/^https?:\/\//i.test(s)) return s.slice(0, 120);
  if (s.includes("@")) return `mailto:${cleanHandle(s)}`;
  const h = cleanHandle(s).replace(/^@/, "");
  return h ? `https://www.paypal.me/${h}` : "";
}

export function venmoHref(v: string) {
  const h = cleanHandle(v).replace(/^@/, "");
  return h ? `https://venmo.com/u/${h}` : "";
}

export function shopFiles(biz: BizState): Record<string, string> {
  const name = biz.name.trim() || "Atomic Dream Labs shop";
  const pitch = biz.pitch.trim() || "Built on this floor. Pay the operator on their rails — we do not take the money.";
  const cash = cashAppHref(biz.rails.cashApp);
  const pay = paypalHref(biz.rails.paypal);
  const ven = venmoHref(biz.rails.venmo);
  const wallet = cleanHandle(biz.rails.wallet);
  const offers = biz.offerings
    .filter((o) => o.name.trim())
    .map((o) => {
      const href = cash ? cashAppHref(biz.rails.cashApp, o.price) : "";
      const pay = href
        ? `<a class="pay cash" href="${esc(href)}" target="_blank" rel="noopener">Pay $${esc(o.price)} on Cash App</a>`
        : "";
      return `<article class="card"><h2>${esc(o.name)}</h2><p class="price">$${esc(o.price)}</p><p>${esc(o.note)}</p>${pay}</article>`;
    })
    .join("");
  const payBtns = [
    cash ? `<a class="pay cash" href="${esc(cash)}" target="_blank" rel="noopener">Pay Cash App</a>` : "",
    pay ? `<a class="pay pal" href="${esc(pay)}" target="_blank" rel="noopener">Pay Pal / PayPal</a>` : "",
    ven ? `<a class="pay ven" href="${esc(ven)}" target="_blank" rel="noopener">Venmo</a>` : "",
  ]
    .filter(Boolean)
    .join("");
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
    <script src="main.js"></script>
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
console.log("NEXUS shop ready");`,
  };
}

export function runLabTests(files: Record<string, string>, biz: BizState): { ok: boolean; checks: LabCheck[] } {
  const html = files["index.html"] ?? "";
  const css = files["styles.css"] ?? "";
  const js = files["main.js"] ?? "";
  const blob = `${html}\n${css}\n${js}`;
  const checks: LabCheck[] = [
    { name: "Pass 1 · the page exists", ok: html.length > 40 && /<html/i.test(html) && /<h1/i.test(html) },
    { name: "Pass 2 · the script parses", ok: scriptParses(js) },
    { name: "Pass 3 · styles are real rules", ok: css.length > 20 && css.includes("{") && css.includes("}") },
    { name: "Pass 4 · a preview can be built", ok: html.length + css.length + js.length > 80 && !/TODO crash|throw new Error\("fail"\)/.test(blob) },
  ];
  const tag = cleanHandle(biz.rails.cashApp).replace(/^\$/, "");
  if (tag) checks.push({ name: "Cash App handle in the lab", ok: /cash\.app/i.test(blob) && blob.toLowerCase().includes(tag.toLowerCase()) });
  const pal = biz.rails.paypal.trim();
  if (pal) checks.push({ name: "PayPal handle in the lab", ok: blob.toLowerCase().includes(pal.toLowerCase().slice(0, 12)) || /paypal/i.test(blob) });
  if (/FLOORCAST|id="grid"|tape grid/i.test(blob)) {
    checks.push(
      { name: "Search bar", ok: /id="q"|type="search"/i.test(html) },
      { name: "Tape grid", ok: /id="grid"/i.test(html) },
      { name: "Player stage", ok: /id="player"|id="stage"/i.test(html) },
      { name: "Related sidebar", ok: /id="related"|Related/i.test(blob) },
      { name: "Comments", ok: /id="comments"|Comments/i.test(blob) },
    );
  }
  if (/Arm the desk|cards/i.test(blob) && /<h1/i.test(html)) {
    checks.push({ name: "Working button", ok: /<button/i.test(html) && /getElementById\("go"\)/.test(js) });
  }
  return { ok: checks.every((c) => c.ok), checks };
}

function scriptParses(js: string) {
  if (js.trim().length < 5) return false;
  try {
    new Function(js);
    return true;
  } catch {
    return false;
  }
}

export async function fetchLiveSpot(symbol: string): Promise<{ price: number; live: boolean }> {
  const s = symbol.toUpperCase().trim() || "BTC";
  if (s === "BTC" || s === "ETH") {
    try {
      const pair = s === "ETH" ? "ETH-USD" : "BTC-USD";
      const res = await fetch(`https://api.coinbase.com/v2/prices/${pair}/spot`);
      const json = (await res.json()) as { data?: { amount?: string } };
      const n = Number(json.data?.amount);
      if (Number.isFinite(n) && n > 0) return { price: n, live: true };
    } catch {
      /* paper fallback below */
    }
  }
  const seed = Array.from(s).reduce((a, c) => a + c.charCodeAt(0), 0);
  return { price: Math.round((80 + (seed % 40) + Math.random() * 6) * 100) / 100, live: false };
}

export async function fetchSpot(symbol: string): Promise<number> {
  return (await fetchLiveSpot(symbol)).price;
}

function esc(v: string) {
  return v
    .replace(/&/g, "&" + "amp;")
    .replace(/</g, "&" + "lt;")
    .replace(/>/g, "&" + "gt;")
    .replace(/"/g, "&" + "quot;");
}
