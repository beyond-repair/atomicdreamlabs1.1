import { CampusFrame } from "@/components/office/CampusFrame";
import { StationBot } from "@/components/office/rooms/StationBot";
import { EXCHANGE_MACHINES } from "@/lib/nexus/campus";
import { bookPositions } from "@/lib/nexus/adapters";
import { cashAppHref, paypalHref, venmoHref } from "@/lib/nexus/business";
import { useNexus } from "@/lib/nexus/store";
import { plantStats } from "@/lib/nexus/watches";
import { cn } from "@/lib/utils";

export function ExchangeFloor({ embedded }: { embedded?: boolean }) {
  const think = useNexus((s) => s.think);
  const stageCrew = useNexus((s) => s.stageCrew);
  const toggleAuto = useNexus((s) => s.toggleAuto);
  const biz = useNexus((s) => s.biz);
  const gold = useNexus((s) => s.gold);
  const stats = plantStats(biz);
  const book = bookPositions(biz.fills ?? []);

  const body = (
    <>
      <p className="campus-kicker">
        Dropship and paper trade. Live market needs your keys. Crew AUTH. You COMMIT.
      </p>
      <ul className="machine-row">
        {EXCHANGE_MACHINES.map((m) => (
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
        <section>
          <h3 className="path-kind">TICKER</h3>
          <p className="font-body text-xl text-cream">
            {biz.halted ? "HALTED. " : ""}
            {stats.sku.toUpperCase()} {stats.stock}
            {stats.low ? " · LOW" : ""} · HOLD {stats.holds} · DD {((biz.drawdown ?? 0) * 100).toFixed(1)}%
          </p>
          {biz.lastSpot ? (
            <p className="font-body text-lg text-muted">
              {biz.lastSpot.symbol} @ {biz.lastSpot.price.toFixed(2)}
              {biz.lastScan ? ` · RSI ${biz.lastScan.rsi}` : ""}
            </p>
          ) : (
            <p className="font-body text-lg text-muted">No mark yet. TRADE thinks a paper ticket.</p>
          )}
        </section>
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
            <p className="font-body text-lg text-muted">Empty book. Paper only.</p>
          )}
        </section>
        <section>
          <h3 className="path-kind">YOUR RAILS</h3>
          <p className="font-body text-lg text-muted">{biz.name || "Unnamed shop"} · we don't take money.</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {biz.rails.cashApp ? (
              <a className="rail-link" href={cashAppHref(biz.rails.cashApp)} target="_blank" rel="noreferrer">
                Cash App
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
        </section>
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
