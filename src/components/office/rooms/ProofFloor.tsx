import { CampusFrame } from "@/components/office/CampusFrame";
import { GateCrew, PacketInspect } from "@/components/office/GovernGate";
import { StationBot } from "@/components/office/rooms/StationBot";
import { useNexus } from "@/lib/nexus/store";
import { STAGER_NAME, stagerClass } from "@/lib/nexus/stage";
import { hydrateSesa, triage } from "@/lib/nexus/sesa";
import { plantStats } from "@/lib/nexus/watches";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { ledgerRows, renderLedger } from "@/lib/nexus/ledger";
import { sha256Hex } from "@/lib/nexus/hash";

export function ProofFloor() {
  const lastRun = useNexus((s) => s.lastRun);
  const runs = useNexus((s) => s.runs);
  const log = useNexus((s) => s.log);
  const lastTest = useNexus((s) => s.biz.lastTest);
  const files = useNexus((s) => s.files);
  const biz = useNexus((s) => s.biz);
  const tasks = useNexus((s) => s.tasks);
  const events = useNexus((s) => s.events);
  const setLabPane = useNexus((s) => s.setLabPane);
  const runLabTests = useNexus((s) => s.runLabTests);
  const think = useNexus((s) => s.think);
  const grantFeat = useNexus((s) => s.grantFeat);
  const queue = useNexus((s) => s.queue);
  const policies = useNexus((s) => s.policies);
  const signPolicy = useNexus((s) => s.signPolicy);
  const pickPacket = useNexus((s) => s.pickPacket);
  const stageCrew = useNexus((s) => s.stageCrew);
  const dropPacket = useNexus((s) => s.dropPacket);
  const proposal = useNexus((s) => s.activeProposal);
  const stats = plantStats(biz);
  const failed = lastTest && !lastTest.ok;
  const halted = stats.halted;
  const leak = lastRun && !lastRun.ok;
  const memory = biz.memory ?? [];
  const versions = biz.versions ?? [];
  const scan = files["SCAN.md"];
  const sunder = files["SUNDER.md"];
  const audit = files["AUDIT.md"] || files["HOLD.md"] || files["COMPLIANCE.md"];
  const waiting = queue.filter((p) => !p.proposal.executed);
  const picked = waiting.find((p) => p.proposal.id === proposal?.id) ?? waiting[0] ?? null;
  const setRoom = useNexus((s) => s.setRoom);
  const sesa = hydrateSesa(biz.sesa);
  const health = triage(sesa);
  const setFileContent = useNexus((s) => s.setFileContent);
  const rows = ledgerRows({
    events,
    runs,
    policies,
    halted: !!halted,
  });

  async function exportLedger() {
    const body = renderLedger({ events, runs, policies, halted: !!halted });
    const hash = await sha256Hex(body);
    const file = `${body}\nsha256: ${hash}\n`;
    setFileContent("AUDIT.md", file);
    const blob = new Blob([file], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "adl-nexus-ledger.md";
    link.click();
    URL.revokeObjectURL(url);
  }

  useEffect(() => {
    grantFeat("proof");
  }, [grantFeat]);

  return (
    <CampusFrame
      kicker="PROOF · NYX"
      title="Security center"
      extra={
        <div className="flex gap-2">
          <button type="button" id="btn-proof-core" className="arcade-back" onClick={() => setRoom("core")}>
            CORE
          </button>
          <button type="button" id="btn-proof-hold" className="arcade-ship" onClick={() => think("halt all trades")}>
            HALT
          </button>
        </div>
      }
    >
      <div className="proof-hall">
        <StationBot
          pose={failed || leak || halted ? "shake" : lastRun?.ok ? "trophy" : "talk"}
          name="NYX"
          role="qa"
          caption={
            failed
              ? "VERIFICATION FAILED. Repair is the lab. AUTH still lives in GOVERN."
              : leak
                ? "A commit was refused. The hash still happened."
                : halted
                  ? "Desk halted. Resume is a GOVERN order."
                  : "If it isn't hashed, it didn't happen."
          }
        />
        <div className="proof-grid">
          <section className={cn("proof-card", (failed || leak) && "bad")}>
            <h3 className="path-kind">VERIFICATION</h3>
            {lastTest ? (
              <ul className="mt-2 space-y-1 font-body text-lg text-cream">
                {lastTest.checks.map((c) => (
                  <li key={c.name}>
                    {c.ok ? "PASS" : "FAIL"} · {c.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 font-body text-lg text-muted">No lab check yet. TEST in the computer room.</p>
            )}
            <div className="proof-actions">
              {failed ? (
                <button type="button" id="btn-proof-repair" className="arcade-ship" onClick={() => setLabPane("edit")}>
                  REPAIR IN LAB
                </button>
              ) : (
                <button type="button" id="btn-proof-test" className="arcade-back" onClick={() => runLabTests()}>
                  TEST
                </button>
              )}
            </div>
          </section>
          <section className="proof-card">
            <h3 className="path-kind">LAST HASH</h3>
            {lastRun ? (
              <>
                <p className="mt-2 break-all font-body text-xl text-cream">{lastRun.hash}</p>
                <p className="mt-1 font-body text-lg text-muted">
                  {lastRun.title} · {lastRun.ok ? "ok" : "refused"} · {lastRun.detail}
                </p>
              </>
            ) : (
              <p className="mt-2 font-body text-lg text-muted">Nothing committed. GOVERN holds the key.</p>
            )}
          </section>
          <section className={cn("proof-card", halted && "bad")}>
            <h3 className="path-kind">GATE</h3>
            <p className="mt-2 font-body text-xl text-cream">
              {halted ? "HALTED" : stats.holds ? `HOLD ${stats.holds}` : stats.auto ? "AUTO AUTH · policy COMMIT" : "OPERATOR KEY"}
            </p>
            <p className="mt-1 font-body text-lg text-muted">
              {stats.sku.toUpperCase()} {stats.stock}
              {stats.low ? " · LOW" : ""} · DD {((biz.drawdown ?? 0) * 100).toFixed(1)}%
            </p>
            <div className="proof-actions">
              {halted ? (
                <button type="button" id="btn-proof-resume" className="arcade-back" onClick={() => think("resume the desk")}>
                  RESUME
                </button>
              ) : stats.holds ? (
                <button type="button" id="btn-proof-drain" className="arcade-back" onClick={() => void stageCrew("hal", "drain held orders")}>
                  DRAIN
                </button>
              ) : null}
            </div>
          </section>
          <section className="proof-card">
            <h3 className="path-kind">THREAT MODEL</h3>
            <p className="mt-2 font-body text-lg text-cream">Paper / local. No silent execute. No live broker. No twin.</p>
            <p className="mt-1 font-body text-lg text-muted">
              Crew may THINK → AUTH. COMMIT needs you or a signed cap. Cabinets never auto.
            </p>
            <div className="proof-actions">
              <button type="button" id="btn-proof-audit" className="arcade-back" onClick={() => void exportLedger()}>
                EXPORT
              </button>
              <button type="button" className="arcade-back" onClick={() => think("generate audit pack")}>
                STAGE
              </button>
            </div>
            {rows.length ? (
              <ul className="ledger-list">
                {rows.map((row) => (
                  <li key={`${row.what}-${row.detail}`}>
                    <span>{row.what}</span>
                    {row.detail}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 font-body text-lg text-muted">No record yet. The counter writes one as you work.</p>
            )}
          </section>
          <section className={cn("proof-card", sesa.lock && "bad")}>
            <h3 className="path-kind">SESA LEDGER</h3>
            <p className="mt-2 break-all font-body text-lg text-cream">{sesa.merkleRoot}</p>
            <p className="mt-1 font-body text-lg text-muted">
              {health.frames} frame{health.frames === 1 ? "" : "s"} · {sesa.lock ? "LOCKED" : "OPEN"} · local merkle
            </p>
            <div className="proof-actions">
              <button type="button" className="arcade-back" onClick={() => setRoom("core")}>
                OPEN CORE
              </button>
            </div>
          </section>
          <section className="proof-card">
            <h3 className="path-kind">STANDING RULES</h3>
            <ul className="mt-2 space-y-1">
              {policies.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-2">
                  <span className="font-body text-lg text-cream">{p.title}</span>
                  <button
                    type="button"
                    id={`btn-proof-policy-${p.id}`}
                    className={cn("arcade-back", p.signed && "arcade-ship")}
                    onClick={() => signPolicy(p.id, !p.signed)}
                  >
                    {p.signed ? "SIGNED" : "SIGN"}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
        {waiting.length ? (
          <section>
            <p className="font-pixel text-[8px] text-gold">QUEUE</p>
            <GateCrew queue={waiting} onPick={pickPacket} />
            {picked ? <PacketInspect packet={picked} onDrop={() => dropPacket(picked.id)} /> : null}
            <ul className="club-board">
              {waiting.map((p) => (
                <li key={p.id}>
                  <button type="button" className={cn("stage-who", stagerClass(p.stager))} onClick={() => pickPacket(p.id)}>
                    {STAGER_NAME[p.stager]}
                  </button>
                  <span className="font-body text-lg text-cream">{p.title}</span>
                  <span className="font-pixel text-[8px] text-muted">{p.hash.slice(0, 8) || (p.proposal.authorized ? "AUTH" : "THINK")}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        {audit ? (
          <article className="lib-page">
            <h3 className="font-pixel text-[10px] text-gold">{files["AUDIT.md"] ? "AUDIT.md" : files["HOLD.md"] ? "HOLD.md" : "COMPLIANCE.md"}</h3>
            <pre className="mt-2 whitespace-pre-wrap font-body text-lg text-cream">{audit.slice(0, 700)}</pre>
          </article>
        ) : null}
        {scan || sunder ? (
          <article className="lib-page">
            <h3 className="font-pixel text-[10px] text-gold">{sunder ? "SUNDER.md" : "SCAN.md"}</h3>
            <pre className="mt-2 whitespace-pre-wrap font-body text-lg text-cream">{(sunder || scan || "").slice(0, 600)}</pre>
          </article>
        ) : null}
        {versions.length ? (
          <section>
            <p className="font-pixel text-[8px] text-gold">DESIGN VERSIONS</p>
            <ul className="club-board">
              {versions.map((v) => (
                <li key={v.hash}>
                  <span className="font-pixel text-[8px] text-muted">{v.files.length}</span>
                  <span className="font-body text-lg text-cream break-all">{v.hash.slice(0, 16)}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        {memory.length ? (
          <section>
            <p className="font-pixel text-[8px] text-gold">CLEAN ROOM</p>
            <ul className="club-board">
              {memory.slice(0, 6).map((m) => (
                <li key={m.hash}>
                  <span className="font-pixel text-[8px] text-muted">{m.key}</span>
                  <span className="font-body text-lg text-cream break-all">{m.hash.slice(0, 12)}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        {tasks.length ? (
          <section>
            <p className="font-pixel text-[8px] text-gold">ASSIGNMENTS</p>
            <ul className="club-board">
              {tasks.slice(0, 6).map((t) => (
                <li key={t.id}>
                  <span className="font-pixel text-[8px] text-muted">{t.status}</span>
                  <span className="font-body text-lg text-cream">
                    {t.role} · {t.goal}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        {runs.length ? (
          <>
            <p className="font-pixel text-[8px] text-gold">RUNS</p>
            <ul className="club-board">
              {runs.slice(0, 6).map((r, i) => (
                <li key={r.id}>
                  <span className="font-pixel text-[8px] text-muted">{i + 1}</span>
                  <span className="font-body text-lg text-cream">
                    {r.title} · {r.ok ? "ok" : "refused"}
                  </span>
                  <span className="font-pixel text-[8px] text-gold tabular-nums">{r.hash.slice(0, 8)}</span>
                </li>
              ))}
            </ul>
          </>
        ) : null}
        {log.length ? (
          <>
            <p className="font-pixel text-[8px] text-gold">LEDGER</p>
            <ul className="club-board">
              {log
                .slice()
                .reverse()
                .slice(0, 6)
                .map((e, i) => (
                  <li key={e.id}>
                    <span className="font-pixel text-[8px] text-muted">{i + 1}</span>
                    <span className="font-body text-lg text-cream">{e.kind}</span>
                    <span className="font-pixel text-[8px] text-muted">{new Date(e.ts).toTimeString().slice(0, 8)}</span>
                  </li>
                ))}
            </ul>
          </>
        ) : null}
        {events.length ? (
          <section>
            <p className="font-pixel text-[8px] text-gold">TOOL TRACE</p>
            <ul className="club-board">
              {events.slice(-6).map((e, i) => (
                <li key={`${e.name}-${i}`}>
                  <span className="font-pixel text-[8px] text-muted">{e.actor}</span>
                  <span className="font-body text-lg text-cream">{e.name}</span>
                  <span className="font-pixel text-[8px] text-muted">{e.detail}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </CampusFrame>
  );
}
