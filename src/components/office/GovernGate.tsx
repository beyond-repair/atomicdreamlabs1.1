import { CREW_CLASS } from "@/lib/nexus/crew";
import { asGovernEvent, STAGER_NAME, STAGER_ROLE, stagerClass, waitingCrew, type StagePacket } from "@/lib/nexus/stage";
import { cn } from "@/lib/utils";

export function GateCrew({
  queue,
  onPick,
}: {
  queue: StagePacket[];
  onPick: (id: string) => void;
}) {
  const waiting = waitingCrew(queue);
  if (!waiting.length) return null;
  return (
    <ul className="gate-crew" aria-label="Crew waiting at GOVERN">
      {waiting.map((p) => (
        <li key={p.stager}>
          <button
            type="button"
            id={`gate-bot-${p.stager}`}
            className={cn("gate-unit", stagerClass(p.stager))}
            onClick={() => onPick(p.id)}
            title={`${STAGER_NAME[p.stager]} staged ${p.title}. COMMIT or CLEAR.`}
          >
            <img
              src="/office/bot/sit-desk.png?v=unit"
              alt=""
              className={cn("gate-sprite", CREW_CLASS[STAGER_ROLE[p.stager]])}
              draggable={false}
            />
            <span className="agent-tag on">{STAGER_NAME[p.stager]}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export function PacketInspect({
  packet,
  onDrop,
}: {
  packet: StagePacket;
  onDrop?: () => void;
}) {
  const ev = asGovernEvent(packet);
  const hash = packet.hash || "hash pending";
  return (
    <aside className="packet-inspect" id="packet-inspect" aria-label="Packet inspector">
      <p className="path-kind">
        PACKET · {ev.stager.agent_id} · {ev.pipeline.state}
      </p>
      <dl>
        <div>
          <dt>HASH</dt>
          <dd className="tabular-nums" title={hash}>
            {hash.length > 16 ? hash.slice(0, 16) : hash}
          </dd>
        </div>
        <div>
          <dt>SIG</dt>
          <dd>{ev.security.agent_signature}</dd>
        </div>
        <div>
          <dt>WHY</dt>
          <dd>{packet.reason}</dd>
        </div>
        <div>
          <dt>FROM</dt>
          <dd>
            {ev.stager.origin_hall} · {packet.pathway}
          </dd>
        </div>
        <div>
          <dt>CAP</dt>
          <dd>{packet.policyId ?? "none · COMMIT is you"}</dd>
        </div>
      </dl>
      {onDrop ? (
        <button type="button" id="btn-packet-drop" className="packet-drop" onClick={onDrop}>
          DROP
        </button>
      ) : null}
    </aside>
  );
}
