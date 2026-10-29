import { useEffect, useRef, useState } from "react";

import { matchRoom, requestDeck } from "@/lib/nexus/campus";
import { matchClub } from "@/lib/nexus/club";
import { useNexus } from "@/lib/nexus/store";
import { PIPE, PATHWAYS, PATHWAY_GROUPS } from "@/lib/nexus/pathways";
import { WATCH_DEFS } from "@/lib/nexus/watches";
import { ROLES } from "@/lib/nexus/types";
import { STAGER_NAME, stagerClass } from "@/lib/nexus/stage";
import { GateCrew, PacketInspect } from "@/components/office/GovernGate";
import { JOBS } from "@/lib/nexus/product";
import { DESK_CHIPS, stageDesk } from "@/lib/nexus/desk";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "chat", label: "CHAT" },
  { id: "lab", label: "LAB" },
  { id: "govern", label: "GOVERN" },
] as const;

const ASK = [
  { id: "write", label: "Write", verb: "Write this clearly:\n" },
  { id: "sum", label: "Sum", verb: "Summarize this:\n" },
  { id: "explain", label: "Explain", verb: "Explain this plainly:\n" },
  { id: "translate", label: "Translate", verb: "Translate this to English:\n" },
  { id: "code", label: "Code", verb: "Write the code. Short and complete:\n" },
  { id: "draw", label: "Draw", verb: "Draw this:\n" },
  { id: "clip", label: "Clip", verb: "Clip this:\n" },
];

const STARTERS = [
  ...JOBS.map((job) => ({ label: job.title, deck: job.deck, tab: job.tab })),
  { label: "What can you do?", send: "What can this office actually do right now?" },
];

export function ReceptionDesk() {
  const messages = useNexus((s) => s.messages);
  const busy = useNexus((s) => s.busy);
  const draft = useNexus((s) => s.goalDraft);
  const setGoalDraft = useNexus((s) => s.setGoalDraft);
  const send = useNexus((s) => s.send);
  const think = useNexus((s) => s.think);
  const authorize = useNexus((s) => s.authorize);
  const commit = useNexus((s) => s.commit);
  const resetCycle = useNexus((s) => s.resetCycle);
  const proposal = useNexus((s) => s.activeProposal);
  const err = useNexus((s) => s.lastError);
  const overlay = useNexus((s) => s.overlay);
  const closeOverlay = useNexus((s) => s.closeOverlay);
  const setLabPane = useNexus((s) => s.setLabPane);
  const labPane = useNexus((s) => s.labPane);
  const runLabTests = useNexus((s) => s.runLabTests);
  const tab = useNexus((s) => s.dockTab);
  const setDockTab = useNexus((s) => s.setDockTab);
  const selected = useNexus((s) => s.selectedRole);
  const selectRole = useNexus((s) => s.selectRole);
  const lastRun = useNexus((s) => s.lastRun);
  const halted = useNexus((s) => s.biz.halted);
  const drawdown = useNexus((s) => s.biz.drawdown ?? 0);
  const autoOps = useNexus((s) => s.biz.autoOps);
  const watches = useNexus((s) => s.biz.watches);
  const armWatch = useNexus((s) => s.armWatch);
  const inbound = useNexus((s) => s.inbound);
  const speech = useNexus((s) => s.speech);
  const briefed = useNexus((s) => s.briefed);
  const clearTalk = useNexus((s) => s.clearTalk);
  const holds = useNexus((s) => (s.biz.orders ?? []).filter((o) => o.status === "held").length);
  const queue = useNexus((s) => s.queue);
  const policies = useNexus((s) => s.policies);
  const stageCrew = useNexus((s) => s.stageCrew);
  const pickPacket = useNexus((s) => s.pickPacket);
  const commitPacket = useNexus((s) => s.commitPacket);
  const commitAll = useNexus((s) => s.commitAll);
  const authAll = useNexus((s) => s.authAll);
  const signPolicy = useNexus((s) => s.signPolicy);
  const clearQueue = useNexus((s) => s.clearQueue);
  const dropPacket = useNexus((s) => s.dropPacket);
  const toggleAuto = useNexus((s) => s.toggleAuto);
  const [paths, setPaths] = useState(false);
  const [copied, setCopied] = useState(false);

  const thread = messages.filter((m) => m.id !== "hello").slice(-10);

  const canAuth = !!proposal && !proposal.authorized;
  const canCommit = !!proposal && proposal.authorized && !proposal.executed;
  const asked = thread.length > 0;
  const reply = [...thread].reverse().find((m) => m.role !== "user");
  const pending = busy && thread.at(-1)?.role === "user";
  const log = thread.slice(-6);
  const logEnd = useRef<HTMLDivElement>(null);
  useEffect(() => {
    logEnd.current?.scrollIntoView({ block: "end" });
  }, [log.length, pending, reply?.content]);
  const plantOpen = overlay === "sim";
  const waiting = queue.filter((p) => !p.proposal.executed);
  const picked = waiting.find((p) => p.proposal.id === proposal?.id) ?? waiting[0] ?? null;
  const canAuthAll = canAuth || waiting.some((p) => !p.proposal.authorized);
  const canCommitAll = waiting.some((p) => p.proposal.authorized && !p.proposal.executed) || canCommit;

  const gateLine = waiting.length
    ? `${waiting.length} staged. AUTH done. COMMIT is you unless a signed cap matches.`
    : !proposal
      ? "Type an order, then THINK. Nothing runs until you COMMIT."
      : !proposal.authorized
        ? `${proposal.pathwayTitle ?? "Pathway"} ready. AUTH opens the gate.`
        : proposal.executed
          ? lastRun
            ? `${lastRun.title} · ${lastRun.ok ? "done" : "refused"}.`
            : "Cycle complete."
          : "Authorized. COMMIT executes and hashes.";

  function goTab(id: (typeof TABS)[number]["id"]) {
    setDockTab(id);
    if (id === "chat") {
      closeOverlay();
      requestDeck("lobby");
    }
    if (id === "govern" && overlay !== "sim") closeOverlay();
    if (id === "lab") {
      if (overlay !== "ide" && overlay !== "files") closeOverlay();
      requestDeck("lab");
    }
  }

  return (
    <section className="floor-dock">
      <div className="desk-top">
        <button
          type="button"
          data-agent="operator"
          className={cn("desk-host", selected === "operator" && "on")}
          onClick={() => selectRole("operator")}
          aria-label="Operator / Reception"
        >
          <img src={ROLES.operator.sit} alt="" className="desk-sitter crew-molt" draggable={false} />
        </button>
        {speech && !overlay && tab === "chat" && briefed ? <p className="desk-bubble">{speech}</p> : null}
      </div>

      <nav className="dock-tabs" aria-label="Desk">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => goTab(t.id)}
            className={cn("dock-tab", tab === t.id && "on")}
          >
            {t.label}
            {t.id === "govern" && waiting.length ? <span className="tab-count">{waiting.length}</span> : null}
          </button>
        ))}
      </nav>
      <p className="desk-posture">
        {halted ? "Desk halted" : "Work · Sell · Build"} · <strong>You hold COMMIT</strong>
      </p>

      {tab === "chat" ? (
        <>
          {!briefed || asked ? null : (
            <div className="dock-starters" aria-label="Start here">
              {STARTERS.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  className="dock-starter"
                  onClick={() => {
                    if ("deck" in s && s.deck) {
                      setDockTab(s.tab);
                      requestDeck(s.deck);
                      return;
                    }
                    if ("send" in s && s.send) {
                      if (tab === "chat" && !matchClub(s.send) && !matchRoom(s.send)) requestDeck("lobby");
                      void send(s.send);
                    }
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
          {asked ? (
            <div className="dock-peek">
              <div className="dock-peek-bar">
                <span>{pending ? "WORKING" : "COUNTER"}</span>
                {reply && !pending ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        const text = reply.content;
                        void navigator.clipboard.writeText(text).then(
                          () => {
                            setCopied(true);
                            window.setTimeout(() => setCopied(false), 1200);
                          },
                          () => setGoalDraft(text),
                        );
                      }}
                    >
                      {copied ? "Copied" : "Copy"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setGoalDraft(reply.content);
                        document.getElementById("nexus-goal")?.focus();
                      }}
                    >
                      Use
                    </button>
                    <button type="button" onClick={() => clearTalk()}>
                      Clear
                    </button>
                  </>
                ) : null}
              </div>
              <div className="dock-answer" role="log">
                {log.map((m) => (
                  <p key={m.id} className={m.role === "user" ? "mine" : ""}>
                    <span>{m.role === "user" ? "YOU" : "COUNTER"}</span>
                    {m.content}
                    {m.image ? <img className="dock-picture" src={m.image} alt="" /> : null}
                    {m.video && /^https:\/\//.test(m.video) ? (
                      <video className="dock-picture" src={m.video} controls playsInline />
                    ) : null}
                  </p>
                ))}
                {pending ? <p className="waiting">Working.</p> : null}
                <div ref={logEnd} />
              </div>
            </div>
          ) : (
            <p className="dock-peek">
              <span className="font-body text-base text-cream">
                Type here. Base64, hash, JSON, JWT, and math answer on their own. Write, Explain, Translate, Code, Draw, and Clip call the model.
              </span>
            </p>
          )}
        </>
      ) : null}

      {tab === "lab" ? (
        <div className="dock-actions">
          <Action on={labPane === "edit"} onClick={() => setLabPane("edit")} label="IDE" />
          <Action on={labPane === "test"} onClick={() => runLabTests()} label="TEST" />
          <Action on={labPane === "run"} onClick={() => setLabPane("run")} label="RUN" />
        </div>
      ) : null}

      {tab === "govern" ? (
        <div className="govern-pane">
          {halted ? <p className="halt-banner">DESK HALTED · resume before trade / stock / orders</p> : null}
          {!halted && holds ? <p className="hold-banner">HOLD {holds} · restock then DRAIN, or arm HOLD</p> : null}
          <p className="dock-whisper govern-next">{gateLine} Red marks a live step. You still hold COMMIT.</p>
          {!plantOpen && waiting.length ? <GateCrew queue={waiting} onPick={pickPacket} /> : null}
          {!plantOpen && waiting.length ? (
            <ul className="stage-list" aria-label="Staged packets">
              {waiting.map((p) => {
                const on = proposal?.id === p.proposal.id;
                return (
                  <li key={p.id}>
                    <button
                      type="button"
                      id={`stage-row-${p.id}`}
                      className={cn("stage-row", stagerClass(p.stager), on && "on")}
                      onClick={() => pickPacket(p.id)}
                    >
                      <span className="stage-who">{STAGER_NAME[p.stager]}</span>
                      <span className="stage-what">{p.title}</span>
                      <span className="stage-state">{p.proposal.authorized ? "AUTH" : "THINK"}</span>
                    </button>
                    <button
                      type="button"
                      className="stage-go"
                      disabled={!p.proposal.authorized || busy}
                      onClick={() => void commitPacket(p.id)}
                    >
                      COMMIT
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : null}
          {!plantOpen && picked ? <PacketInspect packet={picked} onDrop={() => dropPacket(picked.id)} /> : null}
          {!plantOpen && !waiting.length ? (
            lastRun ? (
              <p className="dock-whisper">
                <span className="font-pixel text-[7px] text-gold">{lastRun.hash.slice(0, 8)}</span>{" "}
                <span className="font-body text-base text-muted">{lastRun.detail}</span>
              </p>
            ) : (
              <p className="dock-whisper">
                <span className="font-body text-base text-muted">Paper / local. Drawdown {(drawdown * 100).toFixed(1)}%.</span>
              </p>
            )
          ) : null}
          {!plantOpen && !waiting.length ? (
            <ol className="pipe-row" aria-label="Automation pipeline">
              {PIPE.map((s) => {
                const step = lastRun?.steps.find((x) => x.name === s);
                return (
                  <li key={s} className={cn("pipe-step", step?.ok && "ok", step && !step.ok && "bad")}>
                    {s}
                  </li>
                );
              })}
            </ol>
          ) : null}
          <div className="dock-actions">
            <Action id="btn-think" on={!!proposal && !proposal.authorized} onClick={() => think()} label="THINK" title={draft.trim() ? "Stage this order" : "Type an order in the box first"} />
            <Action id="btn-authorize" on={canAuth} onClick={authorize} label="AUTH" disabled={!canAuth} />
            <Action
              id="btn-commit"
              on={canCommit}
              onClick={() => void commit()}
              label="COMMIT"
              disabled={!canCommit}
              ok={canCommit}
            />
            <Action id="btn-clear" on={false} onClick={resetCycle} label="CLEAR" disabled={!proposal} />
            {!plantOpen ? (
              <>
                <Action
                  id="btn-auto"
                  on={autoOps}
                  onClick={toggleAuto}
                  label={autoOps ? "AUTO ON" : "AUTO"}
                />
                <Action id="btn-inbound" on={false} onClick={() => void inbound()} label="ORDER" />
                <Action on={paths} onClick={() => setPaths((v) => !v)} label="PATHS" />
              </>
            ) : null}
          </div>
          {!plantOpen ? (
            <>
              <p className="path-kind">CREW STAGES. YOU COMMIT.</p>
              <div className="dock-actions govern-chips">
                <Action
                  id="btn-stage-nyx"
                  className="stage-nyx"
                  on={waiting.some((p) => p.stager === "nyx")}
                  onClick={() => void stageCrew("nyx")}
                  label="NYX"
                  title="Stage a cached restock. AUTH_NYX_DRAFT. COMMIT is you unless signed ≤ 10."
                />
                <Action
                  id="btn-stage-rix"
                  className="stage-rix"
                  on={waiting.some((p) => p.stager === "rix")}
                  onClick={() => void stageCrew("rix")}
                  label="RIX"
                  title="Stage a sandbox cabinet. AUTH_RIX_DRAFT. Cabinets never auto-COMMIT."
                />
                <Action
                  id="btn-stage-hal"
                  className="stage-hal"
                  on={waiting.some((p) => p.stager === "hal")}
                  onClick={() => void stageCrew("hal")}
                  label="HAL"
                  title="Stage a drain. AUTH_HAL_DRAFT. COMMIT is you unless drain-hold is signed."
                />
                <Action
                  id="btn-stage-vex"
                  className="stage-vex"
                  on={waiting.some((p) => p.stager === "vex")}
                  onClick={() => void stageCrew("vex")}
                  label="VEX"
                  title="Stage a paper scan. AUTH_VEX_DRAFT. Trades never auto-COMMIT."
                />
                <Action id="btn-auth-all" on={canAuthAll} onClick={authAll} label="AUTH ALL" disabled={!canAuthAll} />
                <Action
                  id="btn-commit-all"
                  on={canCommitAll}
                  onClick={() => void commitAll()}
                  label="COMMIT ALL"
                  disabled={!canCommitAll || busy}
                  ok={canCommitAll}
                />
                <Action id="btn-queue-drop" on={false} onClick={clearQueue} label="DROP" disabled={!waiting.length} />
              </div>
              <p className="path-kind">SIGNED RULES · AUTO COMMIT ONLY INSIDE A CAP</p>
              <div className="dock-actions govern-chips">
                {policies.map((p) => (
                  <Action
                    key={p.id}
                    id={`btn-policy-${p.id}`}
                    on={p.signed}
                    onClick={() => signPolicy(p.id, !p.signed)}
                    label={p.title}
                    title={p.signed ? "Signed. AUTO may COMMIT inside this cap." : "Unsigned. AUTO AUTH only."}
                  />
                ))}
              </div>
              <p className="path-kind">ARM WATCHES</p>
              <div className="dock-actions govern-chips">
                {WATCH_DEFS.map((w) => (
                  <Action
                    key={w.id}
                    on={!!watches?.[w.id]?.armed}
                    onClick={() => armWatch(w.id, !watches?.[w.id]?.armed)}
                    label={w.chip}
                    title={w.title}
                  />
                ))}
              </div>
              {paths
                ? PATHWAY_GROUPS.map((g) => {
                    const rows = PATHWAYS.filter((p) => p.kind === g.kind && p.id !== "assign");
                    if (!rows.length) return null;
                    return (
                      <div key={g.kind}>
                        <p className="path-kind">{g.label}</p>
                        <div className="dock-actions govern-chips">
                          {rows.map((p) => (
                            <Action
                              key={p.id}
                              on={proposal?.pathway === p.id || lastRun?.pathway === p.id}
                              onClick={() => think(p.hint)}
                              label={p.chip}
                              title={p.title}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })
                : null}
            </>
          ) : null}
        </div>
      ) : null}

      {tab === "chat" ? (
        <div className="dock-tools" aria-label="Desk tools">
          {DESK_CHIPS.map((chip) => (
            <button
              key={chip.id}
              type="button"
              className="dock-tool"
              disabled={busy}
              onClick={() => {
                const next = stageDesk(chip.verb, draft);
                if (!next.ready) {
                  setGoalDraft(next.text);
                  document.getElementById("nexus-goal")?.focus();
                  return;
                }
                setGoalDraft("");
                if (!matchClub(next.text) && !matchRoom(next.text)) requestDeck("lobby");
                void send(next.text);
              }}
            >
              {chip.label}
            </button>
          ))}
          {ASK.map((chip) => (
            <button
              key={chip.id}
              type="button"
              className="dock-tool ask"
              disabled={busy}
              onClick={() => {
                const next = stageDesk(chip.verb, draft);
                if (!next.ready) {
                  setGoalDraft(next.text);
                  document.getElementById("nexus-goal")?.focus();
                  return;
                }
                setGoalDraft("");
                void send(next.text);
              }}
            >
              {chip.label}
            </button>
          ))}
        </div>
      ) : null}

      <form
        className="dock-compose"
        onSubmit={(e) => {
          e.preventDefault();
          if (tab === "chat" && draft.trim() && !matchClub(draft) && !matchRoom(draft)) requestDeck("lobby");
          void send();
        }}
      >
        <label className="sr-only" htmlFor="nexus-goal">
          Message reception
        </label>
        <input
          id="nexus-goal"
          value={draft}
          onChange={(e) => setGoalDraft(e.target.value)}
          placeholder={busy ? "Working…" : tab === "govern" ? "Type the order, then THINK" : "Type at the counter"}
          disabled={busy}
          autoComplete="off"
          enterKeyHint="send"
          className="dock-input"
          suppressHydrationWarning
        />
        {tab === "govern" ? (
          <button
            type="button"
            id="btn-think-send"
            disabled={busy}
            className="dock-send"
            onClick={() => think()}
          >
            THINK
          </button>
        ) : (
          <button type="submit" id="btn-send" disabled={busy || !draft.trim()} className="dock-send">
            SEND
          </button>
        )}
      </form>
      {err ? <p className="px-3 pb-2 font-body text-base text-danger">{err}</p> : null}
    </section>
  );
}

function Action({
  label,
  onClick,
  on,
  disabled,
  ok,
  id,
  title,
  className,
}: {
  label: string;
  onClick: () => void;
  on: boolean;
  disabled?: boolean;
  ok?: boolean;
  id?: string;
  title?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      id={id}
      title={title ?? label}
      onClick={onClick}
      disabled={disabled}
      className={cn("dock-action", on && "on", ok && "ok", className)}
    >
      {label}
    </button>
  );
}
