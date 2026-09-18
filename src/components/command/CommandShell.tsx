import { useEffect, useMemo, useState } from "react";
import { DecisionPanel } from "@/components/command/DecisionPanel";
import { KnowledgeGraph, NodeHint } from "@/components/command/KnowledgeGraph";
import { OfficeOverlay } from "@/components/office/overlays/OfficeOverlay";
import {
  DECISIONS,
  FEED,
  INTEGRATIONS,
  OBJECTIVES,
  WORKERS,
} from "@/lib/nexus/command";
import { useNexus } from "@/lib/nexus/store";
import { LOOP, ROLES } from "@/lib/nexus/types";
import { cn } from "@/lib/utils";

type Pane = "graph" | "objectives" | "workforce" | "feed";

export function CommandShell() {
  const setView = useNexus((s) => s.setView);
  const selected = useNexus((s) => s.selectedNode);
  const selectNode = useNexus((s) => s.selectNode);
  const decisionOpen = !!(selected && (DECISIONS[selected] || selected.startsWith("live-")));
  const [pane, setPane] = useState<Pane>("graph");

  return (
    <div className="command relative flex h-dvh flex-col overflow-hidden bg-cmd text-cmd-fg pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      <TopBar onFloor={() => setView("floor")} />
      <Alerts />
      <div className={cn("relative flex min-h-0 flex-1 flex-col md:flex-row", decisionOpen && "md:pr-0")}>
        <div className={cn("flex min-h-0 min-w-0 flex-1 flex-col", decisionOpen && "opacity-40")}>
          <div className="flex gap-1 border-b border-cmd-line px-2 py-1 md:hidden">
            {(["graph", "objectives", "workforce", "feed"] as Pane[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPane(p)}
                className={cn(
                  "min-h-11 flex-1 px-2 text-[11px] uppercase tracking-wide",
                  pane === p ? "bg-cmd-elev text-cmd-accent" : "text-cmd-mute",
                )}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="flex min-h-0 flex-1">
            <div className={cn("hidden w-72 shrink-0 overflow-y-auto border-r border-cmd-line md:block", pane === "objectives" && "block")}>
              <ObjectiveTree />
            </div>
            <div className={cn("min-h-0 min-w-0 flex-1 flex-col", pane === "graph" ? "flex" : "hidden md:flex")}>
              <KnowledgeGraph />
              <NodeHint />
            </div>
            <div className={cn("hidden w-72 shrink-0 overflow-y-auto border-l border-cmd-line md:block", pane === "workforce" && "block w-full")}>
              <WorkforcePanel />
            </div>
          </div>
          <div className={cn(pane === "feed" ? "block" : "hidden md:block")}>
            <ActivityFeed highlight={selected} />
          </div>
        </div>
        {decisionOpen ? <DecisionPanel /> : null}
      </div>
      <Monitors />
      <CommandBar />
      {decisionOpen ? (
        <button
          type="button"
          className="absolute inset-0 z-10 bg-cmd/40 md:hidden"
          aria-label="Dismiss decision"
          onClick={() => selectNode(null)}
        />
      ) : null}
      <OfficeOverlay />
    </div>
  );
}

function TopBar({ onFloor }: { onFloor: () => void }) {
  const [time, setTime] = useState("--:--");
  const busy = useNexus((s) => s.busy);
  useEffect(() => {
    const tick = () => setTime(new Date().toTimeString().slice(0, 5));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <header className="flex flex-wrap items-center justify-between gap-2 border-b border-cmd-line px-3 py-2">
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-cmd-mute">ADL NEXUS</p>
        <h1 className="text-sm font-medium">Command graph · same office</h1>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className={cn("px-2 py-1 text-[11px] uppercase", busy ? "bg-cmd-accent text-cmd" : "border border-cmd-line text-cmd-mute")}>
          {busy ? "Working" : "Idle"}
        </span>
        <span className="hidden px-2 py-1 text-[11px] text-cmd-mute sm:inline tabular-nums">{time}</span>
        <span className="hidden gap-1 md:flex">
          {LOOP.map((l) => (
            <span key={l} className="border border-cmd-line px-1.5 py-0.5 text-[9px] text-cmd-mute">
              {l.slice(0, 3)}
            </span>
          ))}
        </span>
        <button type="button" onClick={onFloor} className="min-h-11 border border-cmd-line px-3 text-[11px] uppercase">
          Floor
        </button>
      </div>
    </header>
  );
}

function Alerts() {
  const err = useNexus((s) => s.lastError);
  const reality = useNexus((s) => s.lastReality);
  const items = [
    err ? { id: "e", level: "danger" as const, text: `Policy: ${err}` } : null,
    { id: "s", level: "ok" as const, text: "Execution sandbox ready (lab IDE, local files)" },
    reality
      ? { id: "r", level: "warn" as const, text: "New evidence gathered — Reality State on the board" }
      : { id: "g", level: "ok" as const, text: "Governance-3 idle — no deviation" },
  ].filter(Boolean) as { id: string; level: "ok" | "warn" | "danger"; text: string }[];
  return (
    <ul className="flex gap-2 overflow-x-auto border-b border-cmd-line px-3 py-1.5">
      {items.map((a) => (
        <li
          key={a.id}
          className={cn(
            "shrink-0 px-2 py-1 text-[11px]",
            a.level === "danger" ? "bg-danger/20 text-danger" : a.level === "warn" ? "text-cmd-accent" : "text-cmd-mute",
          )}
        >
          {a.text}
        </li>
      ))}
    </ul>
  );
}

function ObjectiveTree() {
  const selectNode = useNexus((s) => s.selectNode);
  const plan = useNexus((s) => s.plan);
  return (
    <section className="p-3">
      <h2 className="text-[11px] font-medium tracking-wide text-cmd-mute">OBJECTIVE TREE</h2>
      <ul className="mt-3 space-y-4">
        {OBJECTIVES.map((o) => (
          <li key={o.id}>
            <button type="button" onClick={() => selectNode(o.id)} className="w-full text-left">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium">{o.title}</span>
                <span className="text-[11px] tabular-nums text-cmd-mute">{o.progress}%</span>
              </div>
              <div className="mt-1 h-1 bg-cmd-line">
                <div className="h-1 bg-cmd-accent" style={{ width: `${o.progress}%` }} />
              </div>
              <p className="mt-1 text-[11px] uppercase text-cmd-mute">risk {o.risk}</p>
            </button>
            <ul className="mt-2 space-y-1 pl-2">
              {o.children.map((c) => (
                <li key={c.id} className={cn("text-[12px]", c.done ? "text-ok" : "text-cmd-mute")}>
                  {c.done ? "done" : "open"} · {c.title}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {plan.length ? (
        <div className="mt-4 border-t border-cmd-line pt-3">
          <p className="text-[11px] text-cmd-mute">LIVE PLAN</p>
          <ol className="mt-2 list-decimal space-y-1 pl-4 text-[12px]">
            {plan.map((s) => (
              <li key={s.id} className={s.done ? "text-ok" : ""}>
                {s.title} · {s.owner}
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </section>
  );
}

function WorkforcePanel() {
  const working = useNexus((s) => s.working);
  const tasks = useNexus((s) => s.tasks);
  const spawn = useNexus((s) => s.spawnWorker);
  const selectRole = useNexus((s) => s.selectRole);
  return (
    <section className="p-3">
      <div className="flex items-center justify-between">
        <h2 className="text-[11px] font-medium tracking-wide text-cmd-mute">WORKFORCE</h2>
        <button
          type="button"
          onClick={() => spawn("engineer")}
          className="min-h-11 border border-cmd-line px-2 text-[11px] uppercase"
        >
          Spawn
        </button>
      </div>
      <ul className="mt-3 space-y-2">
        {WORKERS.map((w) => {
          const live = working.includes(w.role) ? "active" : w.status;
          return (
            <li key={w.id}>
              <button
                type="button"
                onClick={() => selectRole(w.role)}
                className="w-full border border-cmd-line px-2 py-2 text-left"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm">{w.name}</span>
                  <span className={cn("text-[10px] uppercase", live === "active" ? "text-cmd-accent" : live === "blocked" ? "text-danger" : "text-cmd-mute")}>
                    {live}
                  </span>
                </div>
                <p className="text-[11px] text-cmd-mute">
                  {w.title} · {ROLES[w.role].label}
                </p>
                <p className="mt-1 line-clamp-2 text-[12px]">{w.assignment}</p>
                <p className="mt-1 tabular-nums text-[11px] text-cmd-mute">
                  {w.tokens.toLocaleString()} tok · load {w.load}%
                </p>
              </button>
            </li>
          );
        })}
      </ul>
      {tasks.length ? (
        <div className="mt-3 border-t border-cmd-line pt-3">
          <p className="text-[11px] text-cmd-mute">ASSIGNED</p>
          {tasks.slice(-4).map((t) => (
            <p key={t.id} className="mt-1 text-[12px]">
              {t.status} · {t.role} · {t.goal}
            </p>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function ActivityFeed({ highlight }: { highlight: string | null }) {
  const events = useNexus((s) => s.events);
  const log = useNexus((s) => s.log);
  const selectNode = useNexus((s) => s.selectNode);
  const items = useMemo(() => {
    const live = [
      ...log.slice(-6).map((e) => ({
        id: e.id,
        source: "system" as const,
        title: `${e.kind} · ${e.proposalId.slice(0, 8)}`,
        ts: e.ts,
        nodeId: "dec-horizon",
      })),
      ...events.slice(-6).map((e, i) => ({
        id: `ev-${i}-${e.name}`,
        source: "system" as const,
        title: `${e.actor} · ${e.name} · ${e.detail}`.slice(0, 88),
        ts: Date.now(),
        nodeId: "repo-nexus",
      })),
    ];
    return [...live, ...FEED].sort((a, b) => b.ts - a.ts).slice(0, 8);
  }, [events, log]);
  return (
    <section className="border-t border-cmd-line">
      <header className="flex items-center justify-between px-3 py-1.5">
        <h2 className="text-[11px] font-medium tracking-wide text-cmd-mute">ACTIVITY FEED</h2>
        <ul className="hidden gap-2 text-[10px] uppercase text-cmd-mute lg:flex">
          {INTEGRATIONS.map((i) => (
            <li key={i.id} className="flex items-center gap-1" title={`${i.label} ${i.state}`}>
              <span
                className={cn(
                  "inline-block h-1.5 w-1.5 rounded-full",
                  i.state === "live" ? "bg-ok" : i.state === "local" ? "bg-cmd-accent" : "bg-cmd-mute",
                )}
              />
              {i.label}
            </li>
          ))}
        </ul>
      </header>
      <ul className="max-h-28 overflow-y-auto px-3 pb-2">
        {items.map((f) => (
          <li key={f.id}>
            <button
              type="button"
              onClick={() => f.nodeId && selectNode(f.nodeId)}
              className={cn(
                "flex w-full items-baseline justify-between gap-3 py-1 text-left text-[12px]",
                highlight && f.nodeId === highlight && "text-cmd-accent",
              )}
            >
              <span>
                <span className="text-[10px] uppercase text-cmd-mute">{f.source}</span> {f.title}
              </span>
              <span className="shrink-0 tabular-nums text-[10px] text-cmd-mute">
                {new Date(f.ts).toTimeString().slice(0, 5)}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Monitors() {
  const gold = useNexus((s) => s.gold);
  const log = useNexus((s) => s.log);
  const lastRun = useNexus((s) => s.lastRun);
  const halted = useNexus((s) => s.biz.halted);
  const autoOps = useNexus((s) => s.biz.autoOps);
  const holds = useNexus((s) => (s.biz.orders ?? []).filter((o) => o.status === "held").length);
  const last = log.at(-1);
  const spend = Math.max(0, 18000 - gold);
  return (
    <div className="grid grid-cols-2 gap-px border-t border-cmd-line bg-cmd-line md:grid-cols-4">
      <Monitor label="Cost guardrail" value={`${gold.toLocaleString()} remaining`} sub={`spent ${spend.toLocaleString()}`} />
      <Monitor label="Audit trail" value={last ? last.kind : "empty"} sub={`${log.length} entries · hashed`} />
      <Monitor label="Last hash" value={lastRun ? lastRun.hash.slice(0, 12) : "none"} sub={lastRun ? lastRun.title : "no execute yet"} />
      <Monitor
        label="Desk"
        value={halted ? "HALTED" : autoOps ? "AUTO OPS" : lastRun?.ok === false ? "refused" : "paper"}
        sub={holds ? `${holds} hold(s) parked` : "AUTO AUTH · policy COMMIT"}
      />
    </div>
  );
}

function Monitor({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-cmd px-3 py-2">
      <p className="text-[10px] uppercase tracking-wide text-cmd-mute">{label}</p>
      <p className="text-sm tabular-nums">{value}</p>
      <p className="text-[11px] text-cmd-mute">{sub}</p>
    </div>
  );
}

function CommandBar() {
  const draft = useNexus((s) => s.goalDraft);
  const setGoalDraft = useNexus((s) => s.setGoalDraft);
  const send = useNexus((s) => s.send);
  const think = useNexus((s) => s.think);
  const authorize = useNexus((s) => s.authorize);
  const commit = useNexus((s) => s.commit);
  const openOverlay = useNexus((s) => s.openOverlay);
  const proposal = useNexus((s) => s.activeProposal);
  const busy = useNexus((s) => s.busy);
  const err = useNexus((s) => s.lastError);
  const canAuth = !!proposal && !proposal.authorized;
  const canCommit = !!proposal && proposal.authorized && !proposal.executed;

  return (
    <footer className="shrink-0 border-t border-cmd-line bg-cmd-elev p-2">
      <div className="mb-2 flex flex-nowrap gap-2 overflow-x-auto">
        <BarBtn onClick={() => think()} label="Execute work" id="btn-think" />
        <BarBtn onClick={() => openOverlay("files")} label="Query memory" />
        <BarBtn onClick={() => openOverlay("plan")} label="Manage projects" />
        <BarBtn onClick={() => openOverlay("files")} label="Review governance" />
        <BarBtn onClick={authorize} label="Authorize" disabled={!canAuth} />
        <BarBtn onClick={() => void commit()} label="Commit" disabled={!canCommit} primary />
      </div>
      <div className="flex gap-2">
        <label className="sr-only" htmlFor="nexus-goal">
          Command
        </label>
        <input
          id="nexus-goal"
          value={draft}
          onChange={(e) => setGoalDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") void send();
          }}
          placeholder="Objective, query, or order…"
          disabled={busy}
          className="min-h-12 min-w-0 flex-1 border border-cmd-line bg-cmd px-3 text-base text-cmd-fg outline-none placeholder:text-cmd-mute disabled:opacity-50"
        />
        <button
          type="button"
          id="btn-send"
          onClick={() => void send()}
          disabled={busy}
          className="min-h-12 bg-cmd-accent px-4 text-[11px] uppercase text-cmd disabled:opacity-40"
        >
          Send
        </button>
      </div>
      {err ? <p className="mt-1 text-sm text-danger">{err}</p> : null}
    </footer>
  );
}

function BarBtn({
  onClick,
  label,
  disabled,
  primary,
  id,
}: {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  primary?: boolean;
  id?: string;
}) {
  return (
    <button
      type="button"
      id={id}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "min-h-11 px-3 text-[11px] uppercase tracking-wide disabled:opacity-40",
        primary ? "bg-cmd-accent text-cmd" : "border border-cmd-line text-cmd-fg",
      )}
    >
      {label}
    </button>
  );
}
