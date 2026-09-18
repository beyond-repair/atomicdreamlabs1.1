import { useState } from "react";
import { useNexus } from "@/lib/nexus/store";
import { cashAppHref, paypalHref, venmoHref } from "@/lib/nexus/business";
import { bookPositions } from "@/lib/nexus/adapters";
import { DeskSheet } from "./DeskSheet";

export function BizDesk({ onClose }: { onClose: () => void }) {
  const biz = useNexus((s) => s.biz);
  const setBiz = useNexus((s) => s.setBiz);
  const publishShop = useNexus((s) => s.publishShop);
  const paperFill = useNexus((s) => s.paperFill);
  const runLabTests = useNexus((s) => s.runLabTests);
  const lastTest = biz.lastTest;
  const positions = bookPositions(biz.fills ?? []);
  const [qty, setQty] = useState("0.01");
  const [symbol, setSymbol] = useState("BTC");
  const [busy, setBusy] = useState(false);

  const scan = async (side: "buy" | "sell") => {
    setBusy(true);
    try {
      await paperFill(symbol, side, Number(qty) || 0.01);
    } finally {
      setBusy(false);
    }
  };

  return (
    <DeskSheet title="Shop & paper desk" kicker="BUSINESS RAILS" onClose={onClose}>
      <p className="font-body text-xl text-muted">
        Drop YOUR Cash App / PayPal / Venmo. Publish writes a shop into the lab, then Test and Run it here. Paper
        trades mark BTC — not a live broker. Nothing ships until you say so.
      </p>

      <label className="mt-3 block font-pixel text-[8px] text-gold">
        BUSINESS NAME
        <input
          value={biz.name}
          onChange={(e) => setBiz({ name: e.target.value })}
          className="mt-1 min-h-11 w-full border-2 border-ink bg-cream px-2 font-body text-xl text-ink"
          placeholder="Atomic Dream Labs"
        />
      </label>
      <label className="mt-2 block font-pixel text-[8px] text-gold">
        PITCH
        <textarea
          value={biz.pitch}
          onChange={(e) => setBiz({ pitch: e.target.value })}
          className="mt-1 min-h-16 w-full border-2 border-ink bg-cream px-2 py-1 font-body text-xl text-ink"
          placeholder="What you sell"
        />
      </label>

      <h3 className="mt-4 font-pixel text-[8px] text-gold">PAYOUT HANDLES</h3>
      <div className="mt-2 grid gap-2 md:grid-cols-2">
        <Rail
          label="CASH APP $CASHTAG"
          value={biz.rails.cashApp}
          placeholder="$yourcashtag"
          onChange={(cashApp) => setBiz({ rails: { ...biz.rails, cashApp } })}
          href={cashAppHref(biz.rails.cashApp)}
        />
        <Rail
          label="PAYPAL.ME OR EMAIL"
          value={biz.rails.paypal}
          placeholder="paypal.me/you"
          onChange={(paypal) => setBiz({ rails: { ...biz.rails, paypal } })}
          href={paypalHref(biz.rails.paypal)}
        />
        <Rail
          label="VENMO"
          value={biz.rails.venmo}
          placeholder="username"
          onChange={(venmo) => setBiz({ rails: { ...biz.rails, venmo } })}
          href={venmoHref(biz.rails.venmo)}
        />
        <Rail
          label="WALLET (OPTIONAL)"
          value={biz.rails.wallet}
          placeholder="0x…"
          onChange={(wallet) => setBiz({ rails: { ...biz.rails, wallet } })}
        />
      </div>

      <h3 className="mt-4 font-pixel text-[8px] text-gold">OFFERINGS</h3>
      <ul className="mt-2 space-y-2">
        {biz.offerings.map((o, i) => (
          <li key={o.id} className="grid grid-cols-[1fr_5rem] gap-2 md:grid-cols-[1fr_5rem_1fr]">
            <input
              value={o.name}
              aria-label="Offering name"
              onChange={(e) => {
                const offerings = biz.offerings.map((x, j) => (j === i ? { ...x, name: e.target.value } : x));
                setBiz({ offerings });
              }}
              className="min-h-11 border-2 border-ink bg-cream px-2 font-body text-xl text-ink"
            />
            <input
              value={o.price}
              aria-label="Price"
              onChange={(e) => {
                const offerings = biz.offerings.map((x, j) => (j === i ? { ...x, price: e.target.value } : x));
                setBiz({ offerings });
              }}
              className="min-h-11 border-2 border-ink bg-cream px-2 font-body text-xl text-ink"
            />
            <input
              value={o.note}
              aria-label="Note"
              onChange={(e) => {
                const offerings = biz.offerings.map((x, j) => (j === i ? { ...x, note: e.target.value } : x));
                setBiz({ offerings });
              }}
              className="col-span-2 min-h-11 border-2 border-ink bg-cream px-2 font-body text-xl text-ink md:col-span-1"
            />
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={publishShop} className="min-h-11 bg-gold px-3 font-pixel text-[8px] text-ink">
          PUBLISH SHOP
        </button>
        <button type="button" onClick={runLabTests} className="min-h-11 bg-cream px-3 font-pixel text-[8px] text-ink">
          TEST LAB
        </button>
        <label className="flex min-h-11 items-center gap-2 bg-wood px-3 font-pixel text-[8px] text-cream">
          <input
            type="checkbox"
            checked={biz.autoOps}
            onChange={(e) => setBiz({ autoOps: e.target.checked })}
          />
          AUTO OPS
        </label>
      </div>
      {lastTest ? (
        <ul className="mt-2 font-body text-lg">
          {lastTest.checks.map((c) => (
            <li key={c.name} className={c.ok ? "text-ok" : "text-danger"}>
              {c.ok ? "PASS" : "FAIL"} · {c.name}
            </li>
          ))}
        </ul>
      ) : null}

      <h3 className="mt-5 font-pixel text-[8px] text-gold">PAPER TRADE</h3>
      <p className="font-body text-lg text-muted">
        Marks Coinbase BTC/ETH spot when the net is up, otherwise a local walk. Fills change GOLD on this floor only.
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        <input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          aria-label="Symbol"
          className="min-h-11 w-20 border-2 border-ink bg-cream px-2 font-body text-xl text-ink"
        />
        <input
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          aria-label="Quantity"
          className="min-h-11 w-24 border-2 border-ink bg-cream px-2 font-body text-xl text-ink"
        />
        <button
          type="button"
          disabled={busy}
          onClick={() => void scan("buy")}
          className="min-h-11 bg-ok px-3 font-pixel text-[8px] text-cream disabled:opacity-40"
        >
          PAPER BUY
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => void scan("sell")}
          className="min-h-11 bg-danger px-3 font-pixel text-[8px] text-cream disabled:opacity-40"
        >
          PAPER SELL
        </button>
      </div>
      {biz.lastSpot ? (
        <p className="mt-2 font-body text-xl text-cream">
          {biz.lastSpot.symbol} · {biz.lastSpot.price.toFixed(2)}
          {biz.lastScan ? ` · RSI ${biz.lastScan.rsi}` : ""}
        </p>
      ) : null}
      {positions.length ? (
        <ul className="mt-2 font-body text-lg text-cream">
          {positions.map((p) => (
            <li key={p.symbol}>
              BOOK {p.symbol} · {p.qty} @ {p.avg}
            </li>
          ))}
        </ul>
      ) : null}
      {biz.fills.length ? (
        <ul className="mt-2 max-h-28 overflow-y-auto font-body text-lg text-muted">
          {biz.fills.slice(0, 8).map((f) => (
            <li key={f.id}>
              {f.side.toUpperCase()} {f.qty} {f.symbol} @ {f.price.toFixed(2)}
            </li>
          ))}
        </ul>
      ) : null}

      <h3 className="mt-5 font-pixel text-[8px] text-gold">LEDGER</h3>
      <p className="font-body text-lg text-muted">
        {biz.halted ? "HALTED. " : ""}
        Drawdown {((biz.drawdown ?? 0) * 100).toFixed(1)}%. Local stock and orders only.
      </p>
      <ul className="mt-2 font-body text-lg text-cream">
        {Object.entries(biz.stock ?? {}).map(([sku, n]) => (
          <li key={sku}>
            {sku} · {n} on hand
          </li>
        ))}
      </ul>
      {(biz.orders ?? []).length ? (
        <ul className="mt-2 max-h-24 overflow-y-auto font-body text-lg text-muted">
          {biz.orders.slice(0, 6).map((o) => (
            <li key={o.id}>
              {o.status === "held" ? "HELD" : "ORDER"} {o.qty} {o.sku} · left {o.remaining}
            </li>
          ))}
        </ul>
      ) : null}
      {(biz.tickets ?? []).length ? (
        <ul className="mt-2 font-body text-lg text-muted">
          {biz.tickets.slice(0, 4).map((t) => (
            <li key={t.id}>
              {t.kind} → {t.route.toUpperCase()} · {t.status}
            </li>
          ))}
        </ul>
      ) : null}
    </DeskSheet>
  );
}

function Rail({
  label,
  value,
  placeholder,
  onChange,
  href,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
  href?: string;
}) {
  return (
    <label className="block font-pixel text-[8px] text-gold">
      {label}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 min-h-11 w-full border-2 border-ink bg-cream px-2 font-body text-xl text-ink"
      />
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block font-body text-lg text-ok">
          Open rail
        </a>
      ) : null}
    </label>
  );
}
