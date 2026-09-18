import { useNexus } from "@/lib/nexus/store";

export function CommandDock() {
  const draft = useNexus((s) => s.goalDraft);
  const setGoalDraft = useNexus((s) => s.setGoalDraft);
  const send = useNexus((s) => s.send);
  const think = useNexus((s) => s.think);
  const authorize = useNexus((s) => s.authorize);
  const commit = useNexus((s) => s.commit);
  const proposal = useNexus((s) => s.activeProposal);
  const err = useNexus((s) => s.lastError);
  const busy = useNexus((s) => s.busy);
  const overlay = useNexus((s) => s.overlay);
  const openOverlay = useNexus((s) => s.openOverlay);
  const closeOverlay = useNexus((s) => s.closeOverlay);

  const canAuth = !!proposal && !proposal.authorized;
  const canCommit = !!proposal && proposal.authorized && !proposal.executed;

  return (
    <section className="pixel-border shrink-0 bg-panel p-2">
      <div className="flex gap-2">
        <label className="sr-only" htmlFor="nexus-goal">
          Message reception
        </label>
        <input
          id="nexus-goal"
          value={draft}
          onChange={(e) => setGoalDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") void send();
          }}
          placeholder="I would like to…"
          disabled={busy}
          className="min-h-12 min-w-0 flex-1 border-2 border-ink bg-cream px-3 font-body text-2xl text-ink outline-none placeholder:text-wood disabled:opacity-60"
        />
        <button
          type="button"
          id="btn-send"
          onClick={() => void send()}
          disabled={busy}
          className="min-h-12 shrink-0 bg-gold px-4 font-pixel text-[10px] text-ink disabled:opacity-40"
        >
          SEND
        </button>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={closeOverlay}
          className={`min-h-11 px-3 font-pixel text-[8px] ${overlay === null ? "bg-gold text-ink" : "bg-wood text-cream"}`}
        >
          FLOOR
        </button>
        <button
          type="button"
          onClick={() => openOverlay("ide")}
          className={`min-h-11 px-3 font-pixel text-[8px] ${overlay === "ide" ? "bg-gold text-ink" : "bg-wood text-cream"}`}
        >
          IDE
        </button>
        <button type="button" id="btn-think" onClick={() => think()} className="min-h-11 bg-cream px-3 font-pixel text-[8px] text-ink">
          THINK
        </button>
        <button
          type="button"
          id="btn-authorize"
          onClick={authorize}
          disabled={!canAuth}
          className="min-h-11 bg-cream px-3 font-pixel text-[8px] text-ink disabled:opacity-40"
        >
          AUTH
        </button>
        <button
          type="button"
          id="btn-commit"
          onClick={() => void commit()}
          disabled={!canCommit}
          className="min-h-11 bg-ok px-3 font-pixel text-[8px] text-cream disabled:opacity-40"
        >
          COMMIT
        </button>
      </div>
      {err ? <p className="mt-1 font-body text-lg text-danger">{err}</p> : null}
    </section>
  );
}
