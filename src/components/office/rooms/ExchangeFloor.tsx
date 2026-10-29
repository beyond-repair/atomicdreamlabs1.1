import { useEffect, useState } from "react";
import { CampusFrame } from "@/components/office/CampusFrame";
import { StationBot } from "@/components/office/rooms/StationBot";
import { DRAWDOWN_LIMIT } from "@/lib/nexus/adapters";
import { EXCHANGE_MACHINES } from "@/lib/nexus/campus";
import { bookPositions } from "@/lib/nexus/adapters";
import { cashAppHref, fetchLiveSpot, paypalHref, venmoHref } from "@/lib/nexus/business";
import { readBalances, readDeskKeys, readLiveCap } from "@/lib/nexus/broker";
import { listShopOrders, markShopOrder, readHeldDesk, type PaidOrder } from "@/lib/nexus/orders";
import { useNexus } from "@/lib/nexus/store";
import { plantStats } from "@/lib/nexus/watches";
import { cn } from "@/lib/utils";

export function ExchangeFloor({ embedded, lane = "all" }: { embedded?: boolean; lane?: "all" | "plant" | "trade" }) {
  const think = useNexus((s) => s.think);
  const stageCrew = useNexus((s) => s.stageCrew);
  const toggleAuto = useNexus((s) => s.toggleAuto);
  const biz = useNexus((s) => s.biz);
  const gold = useNexus((s) => s.gold);
  const setBiz = useNexus((s) => s.setBiz);
  const stats = plantStats(biz);
  const book = bookPositions(biz.fills ?? []);
  const [cap, setCap] = useState("25");
  const [cashNote, setCashNote] = useState("");
  const [reading, setReading] = useState(false);
  const [deskKey, setDeskKey] = useState("");
  const [paid, setPaid] = useState<PaidOrder[]>([]);
  const [paidNote, setPaidNote] = useState("");

  useEffect(() => {
    setCap(String(readLiveCap()));
    const saved = window.localStorage.getItem("nexus-desk-key") ?? "";
    if (saved) setDeskKey(saved);
    void readHeldDesk({ data: {} }).then((res) => {
      if (!res.key) return;
      setDeskKey(res.key);
      window.localStorage.setItem("nexus-desk-key", res.key);
    });
  }, []);

  useEffect(() => {
    if (lane === "trade") return;
    let stop = false;
    const load = () => {
      void listShopOrders({ data: { deskKey } }).then((res) => {
        if (stop) return;
        if (!res.ok) {
          setPaidNote(res.error);
          return;
        }
        setPaid(res.orders);
        const open = res.orders.filter((o) => o.status === "open").length;
        setPaidNote(`${open} open. The book and the key stay on this machine.`);
      });
    };
    load();
    const id = window.setInterval(load, 30000);
    return () => {
      stop = true;
      window.clearInterval(id);
    };
  }, [lane, deskKey]);

  async function mark(id: string, status: "paid" | "done" | "void") {
    const res = await markShopOrder({ data: { id, status, deskKey } });
    if (!res.ok) {
      setPaidNote(res.error);
      return;
    }
    setPaid((rows) => rows.map((o) => (o.id === id ? { ...o, status: res.status } : o)));
  }

  useEffect(() => {
    let stop = false;
    void fetchLiveSpot("BTC").then((mark) => {
      if (stop || !mark.live) return;
      setBiz({ lastSpot: { symbol: "BTC", price: mark.price, ts: Date.now(), live: true } });
    });
    return () => {
      stop = true;
    };
  }, [setBiz]);

  const machines = EXCHANGE_MACHINES.filter((m) => {
    if (lane === "plant") return m.id === "restock";
    if (lane === "trade") return m.id !== "restock";
    return true;
  });
  const kicker =
    lane === "plant"
      ? "Stock and orders. Restock stages a packet. You still COMMIT. This desk does not take a payment."
      : lane === "trade"
        ? `Paper tickets stay local. STAGE 0.001 BTC is a real Coinbase order and does not send until you COMMIT. The cap defaults to $25 and cannot pass $500.`
        : `Dropship ledger is local. Bitcoin mark is live Coinbase when it loads. Fills stay paper until you COMMIT, and the desk halts at a ${(DRAWDOWN_LIMIT * 100).toFixed(0)}% loss cap.`;

  const body = (
    <>
      <p className="campus-kicker">{kicker}</p>
      {lane !== "plant" ? (
        <section>
          <h3 className="path-kind">LIVE ORDER</h3>
          <p className="font-body text-lg text-muted">
            Real money. Paste the Coinbase key in Accounts. Nothing sends until you COMMIT, and it never sends on its own.
          </p>
          <label className="font-body text-base text-muted">
            Cap in dollars
            <input
              className="dock-input"
              inputMode="decimal"
              value={cap}
              onChange={(e) => {
                const next = e.target.value.replace(/[^\d.]/g, "").slice(0, 6);
                setCap(next);
                const n = Number(next);
                if (n >= 1) window.localStorage.setItem("nexus-live-cap", String(Math.min(500, n)));
              }}
            />
          </label>
          <div className="proof-actions">
            <button type="button" className="arcade-back" onClick={() => think("live buy 0.001 BTC")}>
              STAGE 0.001 BTC
            </button>
            <button
              type="button"
              className="arcade-back"
              disabled={reading}
              onClick={() => {
                setReading(true);
                void readBalances({ data: readDeskKeys() })
                  .then((res) => setCashNote(res.ok ? res.lines.join(" · ") : res.error))
                  .finally(() => setReading(false));
              }}
            >
              {reading ? "READING" : "BALANCES"}
            </button>
          </div>
          {cashNote ? <p className="font-body text-lg text-cream">{cashNote}</p> : null}
        </section>
      ) : null}
      <ul className="machine-row">
        {machines.map((m) => (
          <li key={m.id}>
            <button
              type="button"
              className={cn("machine", m.id === "auto" && biz.autoOps && "on")}
              onClick={() => {
                if (m.kind === "toggle") {
                  toggleAuto();
                  return;
                }
                if (m.id === "restock") {
                  void stageCrew("nyx", m.hint);
                  return;
                }
                if (m.hint) think(m.hint);
              }}
              aria-label={m.title}
            >
              <StationBot pose={m.pose} name={m.chip} role={m.id === "auto" ? "operator" : m.id === "trade" ? "cpo" : m.id === "scan" ? "qa" : "engineer"} />
              <span className="cab-marquee">{m.title}</span>
              <span className="cab-bezel">{m.id === "auto" ? (biz.autoOps ? "AUTO ON" : "ARM AUTO") : m.id === "restock" ? "NYX" : "THINK"}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="exchange-ledgers">
        {lane !== "trade" ? (
        <section>
          <h3 className="path-kind">STOCK</h3>
          <p className="font-body text-xl text-cream">
            {biz.halted ? "HALTED. " : ""}
            {stats.sku.toUpperCase()} {stats.stock}
            {stats.low ? " · LOW" : ""} · HOLD {stats.holds}
          </p>
        </section>
        ) : null}
        {lane !== "plant" ? (
        <section>
          <h3 className="path-kind">MARK</h3>
          {biz.lastSpot ? (
            <p className="font-body text-lg text-cream">
              {biz.lastSpot.live ? "LIVE Coinbase" : "LOCAL mark"} {biz.lastSpot.symbol} @ {biz.lastSpot.price.toFixed(2)}
              {biz.lastScan ? ` · RSI ${biz.lastScan.rsi}` : ""} · fills are PAPER · DD {((biz.drawdown ?? 0) * 100).toFixed(1)}%
            </p>
          ) : (
            <p className="font-body text-lg text-muted">Waiting on Coinbase for a live BTC mark. No fake price until it answers.</p>
          )}
        </section>
        ) : null}
        {lane !== "plant" ? (
        <section>
          <h3 className="path-kind">BOOK</h3>
          {book.length ? (
            <ul className="font-body text-lg text-cream">
              {book.map((p) => (
                <li key={p.symbol}>
                  {p.symbol} · {p.qty} @ {p.avg}
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-body text-lg text-muted">Empty book. Paper fills and live orders show here after COMMIT.</p>
          )}
        </section>
        ) : null}
        {lane !== "trade" ? (
        <section>
          <h3 className="path-kind">YOUR RAILS</h3>
          <p className="font-body text-lg text-muted">{biz.name || "Unnamed shop"} · buyers pay at /shop. Cash App takes the money. This office does not.</p>
          <div className="flex flex-col gap-2 mt-2">
            {biz.offerings.map((o) => {
              const href = cashAppHref(biz.rails.cashApp, o.price);
              return href ? (
                <a key={o.id} className="rail-link" href={href} target="_blank" rel="noreferrer">
                  {o.name} · ${o.price}
                </a>
              ) : null;
            })}
            <a className="rail-link" href="/shop">
              Open the public shop
            </a>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            {(
              [
                ["cashApp", "Cash App"],
                ["paypal", "PayPal"],
                ["venmo", "Venmo"],
              ] as const
            ).map(([field, label]) => (
              <label key={field} className="font-body text-base text-muted">
                {label}
                <input
                  className="dock-input"
                  value={biz.rails[field]}
                  autoComplete="off"
                  placeholder={field === "cashApp" ? "$name" : "name"}
                  onChange={(e) => setBiz({ rails: { ...biz.rails, [field]: e.target.value.slice(0, 64) } })}
                />
              </label>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {biz.rails.cashApp ? (
              <a className="rail-link" href={cashAppHref(biz.rails.cashApp)} target="_blank" rel="noreferrer">
                Cash App · {biz.rails.cashApp}
              </a>
            ) : null}
            {biz.rails.paypal ? (
              <a className="rail-link" href={paypalHref(biz.rails.paypal)} target="_blank" rel="noreferrer">
                PayPal
              </a>
            ) : null}
            {biz.rails.venmo ? (
              <a className="rail-link" href={venmoHref(biz.rails.venmo)} target="_blank" rel="noreferrer">
                Venmo
              </a>
            ) : null}
          </div>
          {!biz.rails.cashApp && !biz.rails.paypal && !biz.rails.venmo ? (
            <p className="font-body text-base text-muted">No payout handle. This office does not take the payment.</p>
          ) : null}
          <h3 className="path-kind">ORDERS · {paid.filter((o) => o.status === "open").length} OPEN</h3>
          <p className="font-body text-lg text-muted">Requests refresh on their own. Mark paid only after you see the money in Cash App. The note stays folded.</p>
          <label className="font-body text-base text-muted">
            Desk key
            <input
              className="dock-input"
              type="password"
              value={deskKey}
              autoComplete="off"
              spellCheck={false}
              onChange={(e) => {
                const v = e.target.value.slice(0, 80);
                setDeskKey(v);
                window.localStorage.setItem("nexus-desk-key", v);
              }}
            />
          </label>
          <button
            type="button"
            className="rail-link"
            onClick={() => {
              setPaidNote("");
              void listShopOrders({ data: { deskKey } }).then((res) => {
                if (!res.ok) {
                  setPaidNote(res.error);
                  return;
                }
                setPaid(res.orders);
                setPaidNote(res.locked ? `${res.orders.length} on the book. This host wants the desk key.` : `${res.orders.length} on the book. Set NEXUS_DESK_KEY before you publish.`);
              });
            }}
          >
            Load orders
          </button>
          {paidNote ? <p className="font-body text-base text-muted">{paidNote}</p> : null}
          <ul className="font-body text-lg text-cream">
            {paid.map((o) => (
              <li key={o.id}>
                <details>
                  <summary>
                    {o.id} · {o.name} · ${o.price} · {o.status}
                    {o.buyer ? ` · ${o.buyer}` : ""}
                    {o.intact ? "" : " · seal broken"}
                  </summary>
                  <p>{o.note || "No note."}</p>
                  <span className="flex flex-wrap gap-2 mt-1">
                    {o.status === "open" ? (
                      <button type="button" className="rail-link" onClick={() => void mark(o.id, "paid")}>
                        Paid
                      </button>
                    ) : null}
                    {o.status === "paid" ? (
                      <button type="button" className="rail-link" onClick={() => void mark(o.id, "done")}>
                        Done
                      </button>
                    ) : null}
                    {o.status === "open" || o.status === "paid" ? (
                      <button type="button" className="rail-link" onClick={() => void mark(o.id, "void")}>
                        Void
                      </button>
                    ) : null}
                  </span>
                </details>
              </li>
            ))}
          </ul>
        </section>
        ) : null}
      </div>
    </>
  );

  if (embedded) return <div className="hq-desk">{body}</div>;
  return (
    <CampusFrame
      kicker="PAPER · LOCAL"
      title="Business desk"
      extra={
        <p className="font-pixel text-[8px] text-muted">
          GOLD <span className="text-cream tabular-nums">{gold}</span>
        </p>
      }
    >
      {body}
    </CampusFrame>
  );
}
