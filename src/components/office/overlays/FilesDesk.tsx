import { useNexus } from "@/lib/nexus/store";
import { DeskSheet } from "./DeskSheet";

export function FilesDesk({ onClose }: { onClose: () => void }) {
  const log = useNexus((s) => s.log);
  const tasks = useNexus((s) => s.tasks);
  const events = useNexus((s) => s.events);
  const lastRun = useNexus((s) => s.lastRun);
  const memory = useNexus((s) => s.biz.memory ?? []);
  const versions = useNexus((s) => s.biz.versions ?? []);
  const files = useNexus((s) => s.files);
  const scan = files["SCAN.md"];
  const sunder = files["SUNDER.md"];

  return (
    <DeskSheet title="Provenance cabinet" kicker="FILE DRAWERS" onClose={onClose}>
      {lastRun ? (
        <section className="mb-4">
          <h3 className="font-pixel text-[8px] text-gold">LAST HASH</h3>
          <p className="mt-2 break-all font-body text-xl text-cream">{lastRun.hash}</p>
          <p className="mt-1 font-body text-lg text-muted">
            {lastRun.title} · {lastRun.ok ? "ok" : "refused"} · {lastRun.detail}
          </p>
        </section>
      ) : null}
      {scan || sunder ? (
        <section className="mb-4">
          <h3 className="font-pixel text-[8px] text-gold">SCAN / SUNDER</h3>
          <pre className="mt-2 whitespace-pre-wrap font-body text-lg text-cream">{(sunder || scan || "").slice(0, 600)}</pre>
        </section>
      ) : null}
      {versions.length ? (
        <section className="mb-4">
          <h3 className="font-pixel text-[8px] text-gold">DESIGN VERSIONS</h3>
          <ul className="mt-2 space-y-1 font-body text-xl text-cream">
            {versions.map((v) => (
              <li key={v.hash} className="break-all">
                {v.hash.slice(0, 16)} · {v.files.length} files
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {memory.length ? (
        <section className="mb-4">
          <h3 className="font-pixel text-[8px] text-gold">CLEAN ROOM</h3>
          <ul className="mt-2 space-y-1 font-body text-xl text-muted">
            {memory.slice(0, 8).map((m) => (
              <li key={m.hash} className="break-all">
                {m.key} · {m.hash.slice(0, 12)}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {tasks.length ? (
        <section>
          <h3 className="font-pixel text-[8px] text-gold">ASSIGNMENTS</h3>
          <ul className="mt-2 space-y-1 font-body text-xl text-cream">
            {tasks.map((t) => (
              <li key={t.id}>
                {t.status} · {t.role} · {t.goal}
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <p className="font-body text-xl text-muted">No committed work yet. Whiteboard first.</p>
      )}
      {log.length ? (
        <section className="mt-4">
          <h3 className="font-pixel text-[8px] text-gold">LEDGER</h3>
          <ul className="mt-2 space-y-1 font-body text-xl text-cream">
            {log
              .slice()
              .reverse()
              .slice(0, 12)
              .map((e) => (
                <li key={e.id}>
                  {e.kind} · {new Date(e.ts).toTimeString().slice(0, 8)} · {e.proposalId.slice(0, 8)}
                </li>
              ))}
          </ul>
        </section>
      ) : null}
      {events.length ? (
        <section className="mt-4">
          <h3 className="font-pixel text-[8px] text-gold">TOOL TRACE</h3>
          <ul className="mt-2 space-y-1 font-body text-xl text-muted">
            {events.slice(-10).map((e, i) => (
              <li key={`${e.name}-${i}`}>
                {e.actor} · {e.name} · {e.detail}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </DeskSheet>
  );
}
