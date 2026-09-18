import { DECISIONS, GRAPH_NODES } from "@/lib/nexus/command";
import { useNexus } from "@/lib/nexus/store";

export function DecisionPanel() {
  const id = useNexus((s) => s.selectedNode);
  const close = useNexus((s) => s.selectNode);
  const proposal = useNexus((s) => s.activeProposal);
  const reality = useNexus((s) => s.lastReality);
  const rec = id ? DECISIONS[id] : undefined;
  const live = id?.startsWith("live-") && proposal;

  if (!id || (!rec && !live && GRAPH_NODES.find((n) => n.id === id)?.kind !== "decision")) return null;

  const title = rec?.title ?? proposal?.goal ?? "Decision";
  const problem = rec?.problem ?? reality?.whatIf ?? "Constructed from the last THINK.";
  const options = rec?.options ?? reality?.possibleActions ?? [];
  const evidence = rec?.evidence ?? (reality ? reality.knownFacts : []);
  const confidence = rec?.confidence ?? proposal?.evidence.confidence ?? 0;
  const workflow = rec?.workflow ?? [
    { agent: proposal?.workforceHint ?? "ops", output: proposal?.goal ?? "", status: proposal?.status ?? "proposed" },
  ];

  return (
    <aside
      className="absolute inset-y-0 right-0 z-20 flex w-full max-w-md flex-col border-l border-cmd-line bg-cmd-elev shadow-[0_0_0_1px_#1e2a36] md:w-[26rem]"
      role="dialog"
      aria-label="Decision history"
    >
      <header className="flex items-start justify-between gap-3 border-b border-cmd-line px-4 py-3">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-cmd-mute">Decision history</p>
          <h2 className="mt-1 text-lg font-medium text-cmd-fg">{title}</h2>
        </div>
        <button
          type="button"
          onClick={() => close(null)}
          className="min-h-11 min-w-11 text-cmd-mute"
          aria-label="Close decision"
        >
          Close
        </button>
      </header>
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-3 text-sm text-cmd-fg">
        <Block kicker="Problem" body={problem} />
        {options.length ? (
          <section>
            <p className="text-[11px] uppercase tracking-wide text-cmd-mute">Options considered</p>
            <ul className="mt-1 list-disc space-y-1 pl-4">
              {options.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </section>
        ) : null}
        {rec ? <Block kicker="Plan / code" body={rec.plan} /> : null}
        {rec ? <Block kicker="Research" body={rec.research} /> : null}
        <section>
          <p className="text-[11px] uppercase tracking-wide text-cmd-mute">Reality evidence</p>
          <p className="mt-1 tabular-nums text-cmd-accent">confidence {(confidence * 100).toFixed(0)}%</p>
          <ul className="mt-1 list-disc space-y-1 pl-4">
            {evidence.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </section>
        <Block kicker="Human approver" body={rec?.approver ?? "Operator — authorize required"} />
        {rec?.actions.length ? (
          <section>
            <p className="text-[11px] uppercase tracking-wide text-cmd-mute">Actions</p>
            <ul className="mt-1 list-disc space-y-1 pl-4">
              {rec.actions.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </section>
        ) : null}
        {rec?.outcomes.length ? (
          <section>
            <p className="text-[11px] uppercase tracking-wide text-cmd-mute">Outcomes</p>
            <ul className="mt-1 list-disc space-y-1 pl-4">
              {rec.outcomes.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </section>
        ) : null}
        <section>
          <p className="text-[11px] uppercase tracking-wide text-cmd-mute">Execution workflow</p>
          <ol className="mt-2 space-y-2">
            {workflow.map((w, i) => (
              <li key={`${w.agent}-${i}`} className="border border-cmd-line px-3 py-2">
                <p className="text-[11px] text-cmd-accent">
                  {w.agent} · {w.status}
                </p>
                <p className="mt-0.5">{w.output}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </aside>
  );
}

function Block({ kicker, body }: { kicker: string; body: string }) {
  return (
    <section>
      <p className="text-[11px] uppercase tracking-wide text-cmd-mute">{kicker}</p>
      <p className="mt-1 leading-5">{body}</p>
    </section>
  );
}
