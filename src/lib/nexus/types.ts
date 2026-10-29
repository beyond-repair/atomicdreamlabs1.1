export type ScenarioType =
  | "operational"
  | "technical"
  | "organizational"
  | "resource"
  | "security"
  | "research";

export type RoleId =
  | "ceo"
  | "cpo"
  | "cto"
  | "qa"
  | "operator"
  | "engineer"
  | "pm";

export type ProposalStatus = "proposed" | "authorized" | "committed";

export type SimulatedOutcome = {
  action: string;
  confidence: number;
  cost: string;
  note: string;
};

export type RealityState = {
  claim: string;
  scenarioType: ScenarioType;
  currentState: { goal: string; contextKeys: string[] };
  knownFacts: string[];
  unknownVariables: string[];
  availableResources: { roles: RoleId[]; pathways: string[] };
  constraints: {
    executeRequiresAuthorize: boolean;
    liveTwin: boolean;
    liveAdapters: boolean;
  };
  possibleActions: string[];
  simulatedOutcomes: SimulatedOutcome[];
  riskCostConfidence: { risk: string; cost: string; confidence: number };
  recommendedPath: string[];
  whatIf: string;
};

export type Proposal = {
  id: string;
  goal: string;
  status: ProposalStatus;
  authorized: boolean;
  executed: boolean;
  actor?: string;
  why: string;
  evidence: { realityClaim: string; confidence: number };
  simulatedConsequences: SimulatedOutcome[];
  risk: RealityState["riskCostConfidence"];
  requiredAuthority: string;
  recommendedPath: string[];
  workforceHint: RoleId;
  pathway?: string;
  pathwayTitle?: string;
  /** Binds this approval to the goal, pathway, and owner. Not a signature. */
  seal?: string;
  expiresAt?: number;
  assignment?: { ok: boolean; role: RoleId; taskId: string };
};

export type ProvenanceEntry = {
  id: string;
  kind: "think" | "authorize" | "commit" | "refuse" | "execute";
  ts: number;
  proposalId: string;
  payload: Record<string, unknown>;
};

export type WorkforceTask = {
  id: string;
  role: RoleId;
  goal: string;
  status: "pending" | "complete";
  note: string;
};

export const ROLES: Record<
  RoleId,
  { label: string; title: string; sprite?: string; sit?: string; rail: boolean }
> = {
  ceo: { label: "CEO", title: "Chief Executive Officer", rail: true },
  cpo: { label: "CPO", title: "Chief Product Officer", sprite: "/office/bot/idle.png?v=unit", rail: true },
  cto: { label: "CTO", title: "Chief Technology Officer", rail: true },
  qa: { label: "QA", title: "Quality Assurance", sprite: "/office/bot/idle.png?v=unit", rail: true },
  operator: {
    label: "OPS",
    title: "Operator / Reception",
    sprite: "/office/bot/idle.png?v=unit",
    sit: "/office/bot/sit-desk.png?v=unit",
    rail: true,
  },
  engineer: {
    label: "ENG",
    title: "Engineer",
    sprite: "/office/bot/idle.png?v=unit",
    sit: "/office/bot/sit.png?v=unit",
    rail: false,
  },
  pm: {
    label: "PM",
    title: "Project Manager Agent",
    sprite: "/office/bot/idle.png?v=unit",
    rail: false,
  },
};

export const RAIL_ORDER: RoleId[] = ["ceo", "cpo", "cto", "qa", "operator"];

export const LOOP = [
  "IDENTITY",
  "MEMORY",
  "REALITY",
  "WORKFORCE",
  "SIMULATION",
  "GOVERNANCE",
  "SANDBOX",
  "PROOF",
  "LEARNING",
] as const;

export { FLOOR_LINE } from "./crew.ts";
