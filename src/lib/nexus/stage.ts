import { think, authorize } from "./engine.ts";
import { parseRestock, parseTrade } from "./pathways.ts";
import type { Proposal, ProvenanceEntry, RoleId } from "./types.ts";

export type StagerId = "nyx" | "rix" | "vex" | "hal" | "molt";

export type StageOrigin = "exchange" | "arcade" | "compute" | "office";

export type StageCtx = {
  stock?: number;
  sku?: string;
  cabinetId?: string;
};

export type PolicyRule = {
  id: string;
  title: string;
  pathway: string;
  signed: boolean;
  cap?: { restockQty?: number; tradeQty?: number };
};

export type StagePacket = {
  id: string;
  ts: number;
  stager: StagerId;
  origin: StageOrigin;
  goal: string;
  pathway: string;
  title: string;
  reason: string;
  proposal: Proposal;
  payload: Record<string, unknown>;
  policyId: string | null;
  hash: string;
  autoAuth: boolean;
  requiresCommit: true;
};

export type StageDraft = {
  packet: StagePacket;
  thinkLog: ProvenanceEntry;
  authLog: ProvenanceEntry;
};

export type GovernTint = "gold" | "teal" | "green" | "cream";

export type GovernQueueEvent = {
  event_id: string;
  timestamp: string;
  stager: {
    agent_id: string;
    tint: GovernTint;
    tint_color: string;
    origin_hall: string;
  };
  pipeline: {
    state: "THINK" | "AUTH" | "COMMIT" | "ABORTED";
    auto_auth: boolean;
    requires_commit: true;
  };
  target: {
    hall: string;
    action_type: string;
  };
  payload: Record<string, unknown>;
  security: {
    payload_hash: string;
    agent_signature: string;
  };
};

export const STAGER_ROLE: Record<StagerId, RoleId> = {
  nyx: "qa",
  rix: "engineer",
  vex: "cpo",
  hal: "pm",
  molt: "operator",
};

export const STAGER_NAME: Record<StagerId, string> = {
  nyx: "NYX",
  rix: "RIX",
  vex: "VEX",
  hal: "HAL",
  molt: "MOLT",
};

export const STAGER_TINT: Record<StagerId, GovernTint> = {
  nyx: "gold",
  rix: "teal",
  vex: "cream",
  hal: "green",
  molt: "cream",
};

export const STAGER_HEX: Record<StagerId, string> = {
  nyx: "#C5C0B4",
  rix: "#5D8F76",
  vex: "#E6E1D6",
  hal: "#6B9A6E",
  molt: "#8A8580",
};

export const STAGER_JOB: Record<
  StagerId,
  { origin: StageOrigin; reason: string; hint: (sku: string, qty: number) => string }
> = {
  nyx: {
    origin: "exchange",
    reason: "Ledger drift / plant rule.",
    hint: (sku, qty) => `restock ${qty} units ${sku}`,
  },
  rix: {
    origin: "arcade",
    reason: "LAB tests ready. Sandbox cabinet.",
    hint: () => "ship arcade cabinet",
  },
  vex: {
    origin: "exchange",
    reason: "Paper desk signal.",
    hint: (_sku, _qty) => "scan market BTC",
  },
  hal: {
    origin: "office",
    reason: "Routine cleanup. Oldest hold first.",
    hint: () => "drain held orders",
  },
  molt: {
    origin: "office",
    reason: "Gate packet.",
    hint: () => "assign the objective",
  },
};

const ORIGIN_HALL: Record<StageOrigin, string> = {
  exchange: "DESK",
  arcade: "PLAY",
  compute: "LAB",
  office: "FLOOR",
};

const PATH_HALL: Record<string, string> = {
  arcade_ship: "PLAY",
  restock: "DESK",
  paper_trade: "DESK",
  mean_reversion: "DESK",
  risk_halt: "DESK",
  drain_holds: "DESK",
  shop_publish: "DESK",
  lab_qa: "LAB",
  lab_build: "LAB",
  sesa_cycle: "CORE",
  sesa_revert: "CORE",
};

export const DEFAULT_POLICIES: PolicyRule[] = [
  { id: "restock-cache", title: "Cached restock ≤ 10", pathway: "restock", signed: false, cap: { restockQty: 10 } },
  { id: "drain-hold", title: "Drain a hold", pathway: "drain_holds", signed: false },
  { id: "lab-qa", title: "Lab TEST", pathway: "lab_qa", signed: false },
  { id: "scan-tick", title: "Market scan", pathway: "market_scan", signed: false },
];

export const LOCAL_SHIFT = ["restock-cache", "drain-hold", "lab-qa", "scan-tick"] as const;

/** AUTO signs only the local shift. Live orders, paper tickets, cabinets, and the shop stay unsigned. */
export function armLocalShift(policies: PolicyRule[]): PolicyRule[] {
  const ids = new Set<string>(LOCAL_SHIFT);
  return hydratePolicies(policies).map((p) => (ids.has(p.id) ? { ...p, signed: true } : p));
}

export function localRestockGoal(sku: string, wanted: number, policies: PolicyRule[]) {
  const cap = policies.find((p) => p.pathway === "restock")?.cap?.restockQty ?? 10;
  const qty = Math.max(1, Math.min(wanted, cap || 10));
  return `restock ${qty} units ${sku}`;
}

const NEVER_AUTO = new Set([
  "arcade_ship",
  "paper_trade",
  "mean_reversion",
  "risk_halt",
  "shop_publish",
  "lab_build",
  "sesa_cycle",
  "sesa_revert",
]);

export function hydratePolicies(raw?: PolicyRule[] | null): PolicyRule[] {
  const have = new Map((raw ?? []).map((p) => [p.id, p]));
  return DEFAULT_POLICIES.map((d) => {
    const row = have.get(d.id);
    return row ? { ...d, signed: !!row.signed, cap: { ...d.cap, ...row.cap } } : { ...d };
  });
}

export function hydrateQueue(raw?: StagePacket[] | null): StagePacket[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((p) => p && p.proposal && !p.proposal.executed)
    .slice(0, 8)
    .map((p) => ({
      ...p,
      autoAuth: p.autoAuth !== false,
      requiresCommit: true as const,
      payload: p.payload && typeof p.payload === "object" ? p.payload : { goal: p.goal },
    }));
}

export function stagerSignature(stager: StagerId, pathway: string) {
  if (stager === "rix" && pathway === "arcade_ship") return "AUTH_RIX_SANDBOX";
  return `AUTH_${STAGER_NAME[stager]}_DRAFT`;
}

export function stagePayload(goal: string, pathway: string, ctx: StageCtx = {}): Record<string, unknown> {
  if (pathway === "restock") {
    const r = parseRestock(goal);
    return {
      resource: r.sku || ctx.sku || "offer-1",
      amount: r.qty,
      trigger_reason: "INVENTORY_BELOW_THRESHOLD",
      current_stock: ctx.stock ?? 0,
    };
  }
  if (pathway === "arcade_ship") {
    return {
      cabinet_id: ctx.cabinetId ?? "pending",
      sandbox: true,
      pass_rate: 1,
      test_suite: "lab_qa",
    };
  }
  if (pathway === "drain_holds") {
    return { action: "DRAIN_HOLDS", oldest_first: true };
  }
  if (pathway === "paper_trade" || pathway === "mean_reversion" || pathway === "market_scan") {
    return { desk: "paper", goal };
  }
  return { goal };
}

export function alreadyQueued(queue: StagePacket[], stager: StagerId, pathway: string) {
  return queue.some((p) => p.stager === stager && p.pathway === pathway && !p.proposal.executed);
}

export function matchPolicy(goal: string, pathway: string, policies: PolicyRule[]): PolicyRule | null {
  if (NEVER_AUTO.has(pathway)) return null;
  for (const p of policies) {
    if (!p.signed || p.pathway !== pathway) continue;
    if (pathway === "restock") {
      const qty = parseRestock(goal).qty;
      if (qty <= (p.cap?.restockQty ?? 0)) return p;
      continue;
    }
    if (pathway === "paper_trade") {
      const t = parseTrade(goal);
      if (t.qty <= (p.cap?.tradeQty ?? 0)) return p;
      continue;
    }
    return p;
  }
  return null;
}

export function canAutoCommit(goal: string, pathway: string, policies: PolicyRule[], autoOps: boolean) {
  if (pathway === "live_trade") return false;
  return !!autoOps && !!matchPolicy(goal, pathway, policies);
}

export function draftStage(
  goal: string,
  stager: StagerId,
  reason: string,
  origin: StageOrigin,
  policies: PolicyRule[],
  ctx: StageCtx = {},
): StageDraft | { error: string } {
  const { proposal, provenance } = think(goal, { path: "stage", stager });
  const pathway = proposal.pathway ?? "assign";
  const auth = authorize(proposal, stagerSignature(stager, pathway));
  if ("error" in auth) return { error: auth.error };
  const policy = matchPolicy(goal, pathway, policies);
  const payload = stagePayload(goal, pathway, ctx);
  return {
    packet: {
      id: `stg-${proposal.id}`,
      ts: Date.now(),
      stager,
      origin,
      goal: proposal.goal,
      pathway,
      title: proposal.pathwayTitle ?? "Pathway",
      reason,
      proposal: auth.proposal,
      payload,
      policyId: policy?.id ?? null,
      hash: "",
      autoAuth: true,
      requiresCommit: true,
    },
    thinkLog: provenance,
    authLog: auth.provenance,
  };
}

export function stagerClass(id: StagerId) {
  return `stage-${id}`;
}

export function waitingCrew(queue: StagePacket[]) {
  const seen = new Set<StagerId>();
  const first: StagePacket[] = [];
  for (const p of queue) {
    if (p.proposal.executed || seen.has(p.stager)) continue;
    seen.add(p.stager);
    first.push(p);
  }
  return first;
}

export function asGovernEvent(packet: StagePacket): GovernQueueEvent {
  const executed = !!packet.proposal.executed;
  const authorized = !!packet.proposal.authorized;
  return {
    event_id: packet.id,
    timestamp: new Date(packet.ts).toISOString(),
    stager: {
      agent_id: STAGER_NAME[packet.stager],
      tint: STAGER_TINT[packet.stager],
      tint_color: STAGER_HEX[packet.stager],
      origin_hall: ORIGIN_HALL[packet.origin],
    },
    pipeline: {
      state: executed ? "COMMIT" : authorized ? "AUTH" : "THINK",
      auto_auth: packet.autoAuth !== false,
      requires_commit: true,
    },
    target: {
      hall: PATH_HALL[packet.pathway] ?? "GOVERN",
      action_type: packet.pathway,
    },
    payload: packet.payload ?? { goal: packet.goal },
    security: {
      payload_hash: packet.hash,
      agent_signature: stagerSignature(packet.stager, packet.pathway),
    },
  };
}

const HASH_OK = /^[a-f0-9]{64}$/;

export function assertGovernEvent(ev: GovernQueueEvent): string[] {
  const miss: string[] = [];
  if (!ev.event_id) miss.push("event_id");
  if (!ev.timestamp) miss.push("timestamp");
  if (!ev.stager?.agent_id) miss.push("stager");
  if (!ev.pipeline) miss.push("pipeline");
  else {
    if (ev.pipeline.requires_commit !== true) miss.push("requires_commit");
    if (typeof ev.pipeline.auto_auth !== "boolean") miss.push("auto_auth");
  }
  if (!ev.target?.action_type) miss.push("target");
  if (!ev.payload || typeof ev.payload !== "object") miss.push("payload");
  if (!ev.security?.agent_signature?.startsWith("AUTH_")) miss.push("agent_signature");
  if (ev.security?.payload_hash && !HASH_OK.test(ev.security.payload_hash)) miss.push("payload_hash");
  return miss;
}
