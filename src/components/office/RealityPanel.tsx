import { useNexus } from "@/lib/nexus/store";
import { cn } from "@/lib/utils";

export function RealityPanel({ embedded = false }: { embedded?: boolean }) {
  const reality = useNexus((s) => s.lastReality);
  const proposal = useNexus((s) => s.activeProposal);
  const events = useNexus((s) => s.events);
  const resetCycle = useNexus((s) => s.resetCycle);
  const working = useNexus((s) => s.working);
  const plan = useNexus((s) => s.plan);
  const checks = useNexus((s) => s.checks);

  return (
    <aside className={cn(embedded ? "w-full" : "pixel-border hidden w-72 shrink-0 overflow-y-auto bg-panel p-3 lg:block")}>
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-pixel text-[10px] text-gold">Horizon</h2>
        <button type="button" onClick={resetCycle} className="min-h-11 px-2 font-pixel text-[8px] text-muted">
          CLEAR
        </button>
      </div>
      <p className="mt-2 font-body text-lg text-cream">
        {working.length ? `Working: ${working.join(", ")}` : "Idle — still listening."}
      </p>
      {plan.length ? (
        <ol className="mt-3 list-decimal space-y-1 pl-4 font-body text-lg">
          {plan.map((s) => (
            <li key={s.id} className={s.done ? "text-ok" : "text-cream"}>
              {s.done ? "done" : "open"} · {s.title} ({s.owner})
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-3 font-body text-lg text-muted">No long-horizon plan yet. A build will lock one.</p>
      )}
      {checks.length ? (
        <ul className="mt-3 space-y-1 font-body text-lg">
          {checks.slice(-8).map((c, i) => (
            <li key={i} className={c.startsWith("PASS") ? "text-ok" : "text-danger"}>
              {c}
            </li>
          ))}
        </ul>
      ) : null}
      {events.length ? (
        <ul className="mt-3 space-y-1 font-body text-lg text-muted">
          {events.slice(-6).map((e, i) => (
            <li key={`${e.name}-${i}`}>
              {e.actor} · {e.name}
            </li>
          ))}
        </ul>
      ) : null}
      {reality && proposal ? (
        <div className="mt-4 border-t-2 border-ink pt-3">
          <p className="font-pixel text-[8px] uppercase text-gold">{reality.scenarioType}</p>
          <p className="mt-1 font-pixel text-[8px] text-cream">
            {proposal.pathwayTitle ?? proposal.pathway ?? "assign"} · {proposal.status}
          </p>
          <p className="mt-1 font-body text-lg">{reality.whatIf}</p>
        </div>
      ) : null}
    </aside>
  );
}
