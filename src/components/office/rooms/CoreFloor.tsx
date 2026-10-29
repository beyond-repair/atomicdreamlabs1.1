import { useMemo, useState } from "react";
import { CampusFrame } from "@/components/office/CampusFrame";
import { StationBot } from "@/components/office/rooms/StationBot";
import { useNexus } from "@/lib/nexus/store";
import {
  COHESION_THRESHOLD,
  HYPER_DIM,
  LIFECYCLE,
  dualReality,
  encodeSymbol,
  hydrateSesa,
  bind,
  lifeLit,
  merkleProofOf,
  merkleRootOf,
  recallPair,
  sliceBarcode,
  triage,
  verifyMerkleProof,
} from "@/lib/nexus/sesa";
import { cn } from "@/lib/utils";

export function CoreFloor() {
  const biz = useNexus((s) => s.biz);
  const sesa = hydrateSesa(biz.sesa);
  const encodeSesa = useNexus((s) => s.encodeSesa);
  const pickSesa = useNexus((s) => s.pickSesa);
  const previewSesa = useNexus((s) => s.previewSesa);
  const replaySesa = useNexus((s) => s.replaySesa);
  const stageCrew = useNexus((s) => s.stageCrew);
  const think = useNexus((s) => s.think);
  const busy = useNexus((s) => s.busy);
  const [draft, setDraft] = useState("");
  const [pickStep, setPickStep] = useState<"intent" | "action">("intent");
  const health = triage(sesa);
  const preview = sesa.preview;
  const lit = lifeLit(sesa);
  const dual = dualReality(sesa);
  const bound = useMemo(() => bind(encodeSymbol(sesa.intent), encodeSymbol(sesa.action)), [sesa.intent, sesa.action]);
  const bar = sliceBarcode(bound, 96);
  const recall = useMemo(() => recallPair(sesa), [sesa.intent, sesa.action, sesa.symbols.join("|")]);
  const last = sesa.ring[sesa.ring.length - 1] ?? null;
  const proofOk = last
    ? verifyMerkleProof(
        last.leaf,
        merkleProofOf(
          sesa.ring.map((f) => f.leaf),
          sesa.ring.length - 1,
        ),
        merkleRootOf(sesa.ring.map((f) => f.leaf)),
        sesa.ring.length - 1,
      )
    : false;

  return (
    <CampusFrame
      kicker={`SESA · D=${HYPER_DIM}`}
      title="Nexus core"
      extra={
        <button
          type="button"
          id="btn-sesa-revert"
          className="arcade-back"
          disabled={busy || sesa.lastVerifiedIdx < 0}
          onClick={() => think("sesa revert")}
        >
          SNAP
        </button>
      }
    >
      <div className="core-hall">
        <StationBot
          pose={sesa.lock ? "shake" : preview?.ok ? "trophy" : last ? "work" : "talk"}
          name="KITE"
          role="cto"
          caption={
            sesa.lock
              ? "Execution lock. Resume is GOVERN."
              : preview?.ok
                ? "SMT pass. COMMIT still lives in GOVERN."
                : "Encode. Bind. SMT. You hold COMMIT."
          }
        />
        <p className="campus-kicker">
          Type a symbol and press ENCODE. Pick an intent, then an action. A green step passed. SNAP undoes the last frame. COMMIT is still yours.
        </p>
        <p className="font-body text-base leading-5 text-muted">
          The vectors are bipolar and {HYPER_DIM.toLocaleString()} long. A bind is kept only if cohesion is at least {COHESION_THRESHOLD}. The ring and the hash stay in this browser.
        </p>
        <div className="pipe-row" id="sesa-lifecycle" aria-label="SESA lifecycle">
          {LIFECYCLE.map((step) => (
            <span
              key={step.id}
              className={cn("pipe-step", lit[step.id] === "ok" && "ok", lit[step.id] === "bad" && "bad")}
              title={step.note}
            >
              {step.title}
            </span>
          ))}
        </div>
        <div className="dual-graph" id="sesa-dual">
          <section className="proof-card">
            <h3 className="path-kind">WORKSPACE</h3>
            <div className="dual-bind mt-2">
              <span className="room-chip on">{dual.workspace.intent}</span>
              <i className="dual-edge" aria-hidden />
              <span className="room-chip on">{dual.workspace.action}</span>
            </div>
            <p className="mt-2 font-body text-lg text-muted">
              Candidate only. Encode and BIND live here. Nothing is global until COMMIT.
            </p>
            {preview ? (
              <p className={cn("mt-1 font-body text-lg", preview.ok ? "text-ok" : "text-danger")}>
                {preview.ok ? "SMT manifold holds" : preview.pruned[0]}
              </p>
            ) : (
              <p className="mt-1 font-body text-lg text-muted">No bind yet.</p>
            )}
          </section>
          <section className="proof-card">
            <h3 className="path-kind">VERIFIED</h3>
            <p className="mt-2 font-body text-xl text-cream">
              {dual.verified.frames.length} FRAME{dual.verified.frames.length === 1 ? "" : "S"}
            </p>
            <p className="mt-1 break-all font-body text-lg text-muted">
              root {dual.verified.merkleRoot.slice(0, 16)}
            </p>
            <p className="mt-1 font-body text-lg text-muted">Governor {dual.governor}. SNAP undoes the last dispatch.</p>
          </section>
        </div>
        <div className="proof-grid">
          <section className={cn("proof-card", preview && !preview.ok && "bad")}>
            <h3 className="path-kind">VSA BIND</h3>
            <p className="mt-2 font-body text-xl text-cream">
              {sesa.intent} ⊗ {sesa.action}
            </p>
            <div className="vsa-bar" aria-hidden>
              {bar.map((bit, i) => (
                <i key={i} className={bit > 0 ? "on" : undefined} />
              ))}
            </div>
            <p className="path-kind mt-3">RECALL</p>
            <ul className="mt-1 space-y-1 font-body text-lg text-cream">
              {recall.intent.slice(0, 2).map((h) => (
                <li key={`i-${h.key}`}>
                  INTENT {h.key} · {h.sim.toFixed(3)}
                </li>
              ))}
              {recall.action.slice(0, 2).map((h) => (
                <li key={`a-${h.key}`}>
                  ACTION {h.key} · {h.sim.toFixed(3)}
                </li>
              ))}
            </ul>
            <label className="lib-search mt-3">
              <span className="sr-only">New symbol</span>
              <input
                id="sesa-symbol"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="ENCODE a symbol…"
                className="dock-input"
                autoComplete="off"
              />
            </label>
            <div className="proof-actions">
              <button
                type="button"
                id="btn-sesa-encode"
                className="arcade-back"
                onClick={() => {
                  encodeSesa(draft);
                  setDraft("");
                }}
              >
                ENCODE
              </button>
              <button type="button" id="btn-sesa-bind" className="arcade-back" onClick={() => previewSesa()}>
                BIND
              </button>
              <button
                type="button"
                id="btn-sesa-stage"
                className="arcade-ship"
                disabled={busy}
                onClick={() => void stageCrew("nyx", `bind ${sesa.intent} to ${sesa.action}`)}
              >
                STAGE
              </button>
            </div>
          </section>
          <section className={cn("proof-card", preview && (preview.ok ? "" : "bad"))}>
            <h3 className="path-kind">SMT / AC-3</h3>
            {preview ? (
              <ul className="mt-2 space-y-1 font-body text-lg text-cream">
                {preview.invariants.map((inv) => (
                  <li key={inv.id}>
                    {inv.ok ? "PASS" : "FAIL"} · {inv.note}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 font-body text-lg text-muted">BIND a pair. Nothing dispatches until SMT and COMMIT.</p>
            )}
            <div className="cohesion-meter mt-3" aria-label="Cohesion">
              <span
                style={{ width: `${Math.max(2, Math.min(100, ((preview?.cohesion ?? 0) + 1) * 50))}%` }}
                className={cn(preview?.ok && "ok", preview && !preview.ok && "bad")}
              />
            </div>
            <p className="mt-1 font-pixel text-[8px] text-muted">
              COHESION{" "}
              <span className="tabular-nums text-cream">{preview ? preview.cohesion.toFixed(4) : "—"}</span>
              {" · "}GATE {COHESION_THRESHOLD}
            </p>
          </section>
          <section className={cn("proof-card", sesa.lock && "bad")}>
            <h3 className="path-kind">IPC RING</h3>
            <p className="mt-2 font-body text-xl text-cream">
              {health.frames} FRAME{health.frames === 1 ? "" : "S"} · CUR {sesa.cursor}
            </p>
            <p className="mt-1 font-body text-lg text-muted">
              {sesa.lock ? "LOCKED" : "OPEN"} · last verified {sesa.lastVerifiedIdx < 0 ? "none" : sesa.lastVerifiedIdx}
            </p>
            <ul className="club-board mt-2">
              {sesa.ring
                .slice()
                .reverse()
                .slice(0, 6)
                .map((f) => (
                  <li key={f.idx}>
                    <button
                      type="button"
                      className="replay-frame"
                      onClick={() => replaySesa(f.idx)}
                      id={f === last ? "btn-sesa-replay" : undefined}
                    >
                      <span className="font-pixel text-[8px] text-muted">{f.idx}</span>
                      <span className="font-body text-lg text-cream">
                        {f.intent}⊗{f.action}
                      </span>
                      <span className="font-pixel text-[8px] text-gold tabular-nums">{f.cohesion.toFixed(3)}</span>
                    </button>
                  </li>
                ))}
            </ul>
            <p className="mt-2 font-body text-lg text-muted">Tap a frame to REPLAY it into the workspace.</p>
          </section>
          <section className="proof-card">
            <h3 className="path-kind">REVERT TOKEN</h3>
            <p className="mt-2 break-all font-body text-lg text-cream">{sesa.merkleRoot}</p>
            <p className="mt-1 font-body text-lg text-muted">
              {last
                ? `leaf ${last.leaf.slice(0, 12)} · proof ${proofOk ? "holds" : "pending"}`
                : "No committed root. Governor is you."}
            </p>
            <p className="mt-1 font-body text-lg text-muted">Local SHA / FNV fold. Not a deployed contract.</p>
          </section>
          <section className={cn("proof-card", !health.ok && "bad")}>
            <h3 className="path-kind">TRIAGE</h3>
            <ul className="mt-2 space-y-1 font-body text-lg text-cream">
              {health.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </section>
        </div>
        <section>
          <p className="path-kind">ITEM MEMORY</p>
          <div className="club-zones mt-2">
            {sesa.symbols.map((k) => (
              <button
                key={k}
                type="button"
                className={cn("room-chip", (k === sesa.intent || k === sesa.action) && "on")}
                onClick={() => {
                  if (pickStep === "intent") {
                    pickSesa(k, sesa.action);
                    setPickStep("action");
                  } else {
                    pickSesa(sesa.intent, k);
                    setPickStep("intent");
                  }
                }}
              >
                {k}
              </button>
            ))}
          </div>
          <p className="mt-2 font-body text-lg text-muted">
            Tap {pickStep === "intent" ? "INTENT" : "ACTION"}, then BIND, then STAGE. COMMIT is you.
          </p>
        </section>
      </div>
    </CampusFrame>
  );
}
