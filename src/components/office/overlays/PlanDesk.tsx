import { RealityPanel } from "@/components/office/RealityPanel";
import { CODEX, FEATS, liveCount, type CodexItem } from "@/lib/nexus/codex";
import { useNexus } from "@/lib/nexus/store";
import { cn } from "@/lib/utils";
import { DeskSheet } from "./DeskSheet";

export function PlanDesk({ onClose }: { onClose: () => void }) {
  const think = useNexus((s) => s.think);
  const authorize = useNexus((s) => s.authorize);
  const commit = useNexus((s) => s.commit);
  const send = useNexus((s) => s.send);
  const openOverlay = useNexus((s) => s.openOverlay);
  const setView = useNexus((s) => s.setView);
  const proposal = useNexus((s) => s.activeProposal);
  const lastRun = useNexus((s) => s.lastRun);
  const runs = useNexus((s) => s.runs);
  const plan = useNexus((s) => s.plan);
  const feats = useNexus((s) => s.feats);
  const gold = useNexus((s) => s.gold);
  const crewGold = useNexus((s) => s.crewGold);
  const canAuth = !!proposal && !proposal.authorized;
  const canCommit = !!proposal && proposal.authorized && !proposal.executed;

  const thinking = plan.filter((s) => !s.done);
  const authCol = proposal && !proposal.executed ? [proposal] : [];
  const done = (runs ?? []).filter((r) => r.ok).slice(0, 6);

  const runItem = (c: CodexItem) => {
    if (c.status === "capped") return;
    if (c.overlay && c.overlay !== "plan") {
      onClose();
      openOverlay(c.overlay);
      return;
    }
    if (c.send) {
      onClose();
      void send(c.send);
      return;
    }
    if (c.think) think(c.think);
  };

  return (
    <DeskSheet title="Horizon board" kicker="MISSION CORE" onClose={onClose}>
      <p className="font-body text-xl text-muted">
        Tap a live item to open it. GOVERN still holds COMMIT. {liveCount()} live on this floor. T4–T5 are capped.
      </p>

      <div className="kanban mt-3">
        <section className="kanban-col">
          <h3 className="font-pixel text-[8px] text-muted">THINK</h3>
          {thinking.length ? (
            thinking.slice(0, 5).map((s) => (
              <p key={s.id} className="mt-2 font-body text-lg text-cream">
                {s.title} · {s.owner}
              </p>
            ))
          ) : proposal && !proposal.authorized ? (
            <p className="mt-2 font-body text-lg text-cream">{proposal.pathwayTitle ?? proposal.goal.slice(0, 42)}</p>
          ) : (
            <p className="mt-2 font-body text-lg text-muted">Empty. State an objective.</p>
          )}
        </section>
        <section className="kanban-col">
          <h3 className="font-pixel text-[8px] text-muted">AUTH</h3>
          {authCol.map((p) => (
            <p key={p.id} className="mt-2 font-body text-lg text-cream">
              {p.authorized ? "Authorized" : "Waiting"} · {(p.pathwayTitle ?? p.pathway ?? "assign").toUpperCase()}
            </p>
          ))}
          {!authCol.length ? <p className="mt-2 font-body text-lg text-muted">Gate closed.</p> : null}
        </section>
        <section className="kanban-col">
          <h3 className="font-pixel text-[8px] text-muted">COMMIT</h3>
          {done.length ? (
            done.map((r) => (
              <p key={r.id} className="mt-2 font-body text-lg text-cream">
                {r.title} · {r.hash.slice(0, 8)}
              </p>
            ))
          ) : lastRun ? (
            <p className="mt-2 font-body text-lg text-cream">
              {lastRun.title} · {lastRun.hash.slice(0, 8)}
            </p>
          ) : (
            <p className="mt-2 font-body text-lg text-muted">No hashed run yet.</p>
          )}
        </section>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={() => think()} className="min-h-11 bg-cream px-4 font-pixel text-[10px] text-ink">
          THINK
        </button>
        <button
          type="button"
          onClick={authorize}
          disabled={!canAuth}
          className="min-h-11 bg-cream px-4 font-pixel text-[10px] text-ink disabled:opacity-40"
        >
          AUTHORIZE
        </button>
        <button
          type="button"
          onClick={() => void commit()}
          disabled={!canCommit}
          className="min-h-11 bg-ok px-4 font-pixel text-[10px] text-cream disabled:opacity-40"
        >
          COMMIT
        </button>
        <button
          type="button"
          onClick={() => {
            onClose();
            setView("command");
          }}
          className="min-h-11 px-4 font-pixel text-[10px] text-muted"
        >
          GRAPH
        </button>
      </div>

      <h3 className="mt-5 font-pixel text-[8px] text-gold">LIVE MAP</h3>
      <p className="mt-1 font-body text-lg text-muted">
        YOU {gold.toLocaleString()} · CREW {crewGold} · FEATS {(feats ?? []).length}/{FEATS.length}
      </p>
      <p className="mt-1 font-body text-lg text-muted">Missions are live capabilities. XP is hashed COMMITs, not talk.</p>
      <ul className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2">
        {CODEX.filter((c) => c.tier <= 3).map((c) => (
          <li key={c.id}>
            <button
              type="button"
              onClick={() => runItem(c)}
              className={cn(
                "flex min-h-11 w-full items-center justify-between gap-2 px-2 text-left",
                c.status === "capped" ? "text-muted" : "text-cream",
              )}
            >
              <span className="font-body text-lg">
                T{c.tier} · {c.title}
              </span>
              <span className="font-pixel text-[7px] text-muted">{c.status}</span>
            </button>
          </li>
        ))}
      </ul>
      <h3 className="mt-4 font-pixel text-[8px] text-muted">CAPPED</h3>
      <ul className="mt-1 font-body text-lg text-muted">
        {CODEX.filter((c) => c.tier >= 4).map((c) => (
          <li key={c.id}>
            T{c.tier} · {c.title} — {c.claim}
          </li>
        ))}
      </ul>

      <h3 className="mt-4 font-pixel text-[8px] text-gold">ACHIEVEMENTS</h3>
      <ul className="mt-1 grid grid-cols-2 gap-1">
        {FEATS.map((f) => {
          const on = (feats ?? []).includes(f.id);
          return (
            <li key={f.id} className={cn("font-body text-lg", on ? "text-cream" : "text-muted")}>
              {on ? "got" : "—"} {f.title}
            </li>
          );
        })}
      </ul>

      <RealityPanel embedded />
    </DeskSheet>
  );
}
