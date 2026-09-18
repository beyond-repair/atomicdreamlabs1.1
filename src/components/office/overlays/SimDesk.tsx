import { bookPositions } from "@/lib/nexus/adapters";
import { useNexus } from "@/lib/nexus/store";
import { WATCH_DEFS, hydrateRules, plantStats, watchCopy } from "@/lib/nexus/watches";
import { cn } from "@/lib/utils";
import { DeskSheet } from "./DeskSheet";

export function SimDesk({ onClose }: { onClose: () => void }) {
  const biz = useNexus((s) => s.biz);
  const gold = useNexus((s) => s.gold);
  const runs = useNexus((s) => s.runs);
  const setRules = useNexus((s) => s.setRules);
  const armWatch = useNexus((s) => s.armWatch);
  const inbound = useNexus((s) => s.inbound);
  const think = useNexus((s) => s.think);
  const toggleAuto = useNexus((s) => s.toggleAuto);
  const rules = hydrateRules(biz.rules);
  const stats = plantStats(biz);
  const positions = bookPositions(biz.fills ?? []);
  const holds = (biz.orders ?? []).filter((o) => o.status === "held");

  return (
    <DeskSheet title="Plant board" kicker="FACTORY" onClose={onClose}>
      <p className="font-body text-xl text-muted">
        Set LOW AT / BUY. A short inbound parks a HOLD. Arm watches here. AUTO AUTH. COMMIT needs a signed cap or you.
      </p>

      <p className="mt-2 font-body text-xl text-cream">
        {biz.halted ? "HALTED. " : "LIVE-LOCAL. "}
        Gold {gold.toLocaleString()} · DD {((biz.drawdown ?? 0) * 100).toFixed(1)}% · AUTO {biz.autoOps ? "ON" : "off"} · HOLD{" "}
        {stats.holds}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          id="btn-plant-auto"
          onClick={toggleAuto}
          className={cn(
            "min-h-11 px-3 font-pixel text-[8px]",
            biz.autoOps ? "bg-cream text-ink" : "text-cream",
          )}
        >
          {biz.autoOps ? "AUTO ON" : "AUTO OPS"}
        </button>
        <button
          type="button"
          id="btn-plant-inbound"
          onClick={() => void inbound()}
          className="min-h-11 bg-cream px-3 font-pixel text-[8px] text-ink"
        >
          ORDER {rules.inboundQty}
        </button>
        <button
          type="button"
          id="btn-plant-drain"
          onClick={() => think("drain held orders")}
          className="min-h-11 bg-wood px-3 font-pixel text-[8px] text-cream"
        >
          DRAIN
        </button>
      </div>

      <h3 className="mt-4 font-pixel text-[8px] text-gold">RULES</h3>
      <p className="mt-1 font-body text-lg text-muted">
        {`If ${rules.sku} on hand < ${rules.lowAt}, buy ${rules.restockQty}.`}
      </p>
      <div className="rule-grid mt-2">
        <label className="font-pixel text-[8px] text-gold">
          SKU
          <select
            value={rules.sku}
            onChange={(e) => setRules({ sku: e.target.value })}
            className="mt-1 min-h-11 w-full border-2 border-ink bg-cream px-2 font-body text-xl text-ink"
          >
            {(biz.offerings ?? []).map((o) => (
              <option key={o.id} value={o.id}>
                {o.id} · {o.name}
              </option>
            ))}
          </select>
        </label>
        <label className="font-pixel text-[8px] text-gold">
          LOW AT
          <input
            type="number"
            min={1}
            max={500}
            value={rules.lowAt}
            onChange={(e) => setRules({ lowAt: Number(e.target.value) })}
            className="mt-1 min-h-11 w-full border-2 border-ink bg-cream px-2 font-body text-xl text-ink"
          />
        </label>
        <label className="font-pixel text-[8px] text-gold">
          BUY
          <input
            type="number"
            min={1}
            max={500}
            value={rules.restockQty}
            onChange={(e) => setRules({ restockQty: Number(e.target.value) })}
            className="mt-1 min-h-11 w-full border-2 border-ink bg-cream px-2 font-body text-xl text-ink"
          />
        </label>
        <label className="font-pixel text-[8px] text-gold">
          IN
          <input
            type="number"
            min={1}
            max={500}
            value={rules.inboundQty}
            onChange={(e) => setRules({ inboundQty: Number(e.target.value) })}
            className="mt-1 min-h-11 w-full border-2 border-ink bg-cream px-2 font-body text-xl text-ink"
          />
        </label>
      </div>

      <h3 className="mt-4 font-pixel text-[8px] text-gold">WATCHES</h3>
      <ul className="mt-2 divide-y divide-cream/10">
        {WATCH_DEFS.map((w) => {
          const row = biz.watches?.[w.id];
          const on = !!row?.armed;
          const copy = watchCopy(w.id, rules);
          return (
            <li key={w.id} className="flex items-center justify-between gap-2 py-2">
              <div className="min-w-0">
                <p className="font-pixel text-[8px] text-gold">
                  {w.chip} · {w.title}
                </p>
                <p className="font-body text-lg text-muted">{row?.lastReason || copy.when}</p>
              </div>
              <button
                type="button"
                onClick={() => armWatch(w.id, !on)}
                className={cn(
                  "min-h-11 min-w-16 px-2 font-pixel text-[8px]",
                  on ? "bg-cream text-ink" : "text-cream ring-1 ring-cream/20",
                )}
              >
                {on ? "ARMED" : "ARM"}
              </button>
            </li>
          );
        })}
      </ul>

      <h3 className="mt-4 font-pixel text-[8px] text-gold">STOCK</h3>
      <ul className="mt-1 font-body text-xl text-cream">
        {Object.entries(biz.stock ?? {}).map(([sku, n]) => (
          <li key={sku} className={sku === rules.sku && n < rules.lowAt ? "text-gold" : undefined}>
            {sku} · {n} on hand{sku === rules.sku && n < rules.lowAt ? " · LOW" : ""}
          </li>
        ))}
      </ul>

      {holds.length ? (
        <>
          <h3 className="mt-4 font-pixel text-[8px] text-gold">HOLDS</h3>
          <ul className="mt-1 font-body text-xl text-cream">
            {holds.slice(0, 8).map((o) => (
              <li key={o.id}>
                HELD {o.qty} {o.sku} · owed {o.remaining}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {positions.length ? (
        <>
          <h3 className="mt-4 font-pixel text-[8px] text-gold">PAPER BOOK</h3>
          <ul className="mt-1 font-body text-xl text-cream">
            {positions.map((p) => (
              <li key={p.symbol}>
                {p.symbol} · {p.qty} @ {p.avg}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {runs?.length ? (
        <>
          <h3 className="mt-4 font-pixel text-[8px] text-gold">RUNS</h3>
          <ul className="mt-1 max-h-28 overflow-y-auto font-body text-lg text-muted">
            {runs.slice(0, 8).map((r) => (
              <li key={r.id}>
                {r.ok ? "ok" : "no"} · {r.hash.slice(0, 12)} · {r.title}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <button
        type="button"
        className="mt-4 min-h-11 bg-wood px-3 font-pixel text-[8px] text-cream"
        onClick={() => think(`scan market ${rules.symbol}`)}
      >
        SCAN NOW
      </button>
    </DeskSheet>
  );
}
