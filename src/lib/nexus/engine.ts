import { matchPathway } from "./pathways.ts";
import type {
  Proposal,
  ProvenanceEntry,
  RealityState,
  ScenarioType,
  SimulatedOutcome,
  WorkforceTask,
} from "./types";

function uid(n = 10) {
  return Math.random().toString(16).slice(2, 2 + n);
}

export function classifyScenario(goal: string): ScenarioType {
  const t = goal.toLowerCase();
  if (/\b(hypothes|research|experiment|falsif|physics|ware)\b/.test(t)) return "research";
  if (/\b(secur|sandbox|clean.?room|aegis|auth|gate|threat|halt|audit)\b/.test(t)) return "security";
  if (/\b(budget|gold|capital|spend|liquid|cost|pay|cash.?app|paypal|trade|btc|eth|restock|inventory)\b/.test(t))
    return "resource";
  if (/\b(org|team|staff|role|workforce|hire|holarch)\b/.test(t)) return "organizational";
  if (/\b(code|repo|build|prototype|api|refactor|ship|deploy|bug|shop|lab)\b/.test(t)) return "technical";
  return "operational";
}

const PATH_BY_TYPE: Record<ScenarioType, string[]> = {
  operational: ["inspect", "plan", "simulate", "assign"],
  technical: ["inspect", "plan", "simulate", "assign"],
  organizational: ["inspect", "propose", "simulate"],
  resource: ["inspect", "simulate", "propose"],
  security: ["inspect", "simulate", "propose"],
  research: ["inspect", "propose", "simulate", "assign"],
};

export function buildReality(goal: string, context: Record<string, string> = {}): RealityState {
  const scenarioType = classifyScenario(goal);
  const known = Object.keys(context);
  const unknownPool = ["market", "competitors", "capital", "live_org", "latency", "headcount"];
  const unknownVariables = unknownPool.filter((k) => !(k in context));
  const possibleActions = PATH_BY_TYPE[scenarioType];
  const confidence =
    scenarioType === "research" ? 0.38 : scenarioType === "security" ? 0.42 : 0.48;
  const simulatedOutcomes: SimulatedOutcome[] = possibleActions.map((action) => ({
    action,
    confidence: action === "simulate" ? confidence - 0.08 : confidence + 0.06,
    cost: "unmeasured",
    note:
      action === "assign"
        ? "Supervised board only — no autonomy"
        : action === "simulate"
          ? "Local deterministic sketch, not a live twin"
          : "Local inspection of declared state",
  }));
  return {
    claim: "local Reality State — RealityOS scenario types only; not a live digital twin",
    scenarioType,
    currentState: { goal: goal.trim(), contextKeys: known.sort() },
    knownFacts: known.length ? known : ["operator_present", "build_cycle=alpha"],
    unknownVariables,
    availableResources: {
      roles: ["ceo", "cpo", "cto", "qa", "operator", "engineer", "pm"],
      pathways: [matchPathway(goal).id, "reality", "workforce", "runtime", "governance", "provenance"],
    },
    constraints: {
      executeRequiresAuthorize: true,
      liveTwin: false,
      liveAdapters: false,
    },
    possibleActions,
    simulatedOutcomes,
    riskCostConfidence: {
      risk: "unvalidated alternatives",
      cost: "unmeasured",
      confidence,
    },
    recommendedPath: possibleActions,
    whatIf: `What happens if we pursue “${goal.trim()}” under ${scenarioType} constraints?`,
  };
}

export function think(
  goal: string,
  context: Record<string, string> = {},
): { reality: RealityState; proposal: Proposal; provenance: ProvenanceEntry } {
  const reality = buildReality(goal, context);
  const path = matchPathway(goal);
  const id = uid(12);
  const proposal: Proposal = {
    id,
    goal: goal.trim(),
    status: "proposed",
    authorized: false,
    executed: false,
    why: "reality constructed before action",
    evidence: { realityClaim: reality.claim, confidence: reality.riskCostConfidence.confidence },
    simulatedConsequences: reality.simulatedOutcomes,
    risk: reality.riskCostConfidence,
    requiredAuthority: "operator authorize",
    recommendedPath: reality.recommendedPath,
    workforceHint: path.owner,
    pathway: path.id,
    pathwayTitle: path.title,
  };
  const provenance: ProvenanceEntry = {
    id: uid(12),
    kind: "think",
    ts: Date.now(),
    proposalId: id,
    payload: { goal: proposal.goal, scenarioType: reality.scenarioType, pathway: path.id },
  };
  return { reality, proposal, provenance };
}

const AUTH_MS = 12 * 60 * 60 * 1000;

/** Bind an approval to the exact proposal. Changing the goal or pathway breaks it. */
export function proposalSeal(p: Pick<Proposal, "id" | "goal" | "pathway" | "workforceHint" | "actor">) {
  const body = [p.id, p.goal, p.pathway ?? "", p.workforceHint, p.actor ?? "operator"].join("|");
  let h = 2166136261;
  for (let i = 0; i < body.length; i += 1) {
    h ^= body.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

export function authorize(
  proposal: Proposal,
  actor = "operator",
  now = Date.now(),
): { proposal: Proposal; provenance: ProvenanceEntry } | { error: string } {
  if (proposal.status === "committed" || proposal.executed) return { error: "already committed" };
  const next: Proposal = {
    ...proposal,
    authorized: true,
    status: "authorized",
    actor: actor.trim() || "operator",
    expiresAt: now + AUTH_MS,
  };
  next.seal = proposalSeal(next);
  return {
    proposal: next,
    provenance: {
      id: uid(12),
      kind: "authorize",
      ts: now,
      proposalId: proposal.id,
      payload: { actor: next.actor, seal: next.seal, expiresAt: next.expiresAt },
    },
  };
}

export function commit(
  proposal: Proposal,
  now = Date.now(),
):
  | { proposal: Proposal; task: WorkforceTask; provenance: ProvenanceEntry }
  | { error: string; provenance: ProvenanceEntry } {
  const refuse = (reason: string) => ({
    error: reason,
    provenance: {
      id: uid(12),
      kind: "refuse" as const,
      ts: now,
      proposalId: proposal.id,
      payload: { reason },
    },
  });
  if (proposal.executed || proposal.status === "committed") return refuse("already committed");
  if (!proposal.authorized || proposal.status !== "authorized") {
    return refuse("unauthorized — AI advises, it cannot execute");
  }
  if (!proposal.seal || proposal.seal !== proposalSeal(proposal)) {
    return refuse("Authorize again. The proposal changed after it was approved.");
  }
  if (proposal.expiresAt == null || now > proposal.expiresAt) {
    return refuse("Authorization expired. THINK and AUTH again.");
  }
  const task: WorkforceTask = {
    id: uid(10),
    role: proposal.workforceHint,
    goal: proposal.goal,
    status: "pending",
    note: "from objective.commit",
  };
  const next: Proposal = {
    ...proposal,
    executed: true,
    status: "committed",
    assignment: { ok: true, role: task.role, taskId: task.id },
  };
  return {
    proposal: next,
    task,
    provenance: {
      id: uid(12),
      kind: "commit",
      ts: now,
      proposalId: proposal.id,
      payload: { taskId: task.id, role: task.role, pathway: proposal.pathway ?? "assign" },
    },
  };
}
