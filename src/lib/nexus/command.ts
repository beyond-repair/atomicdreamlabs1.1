import type { RoleId } from "./types";

export type NodeKind = "objective" | "project" | "decision" | "repo" | "research" | "document" | "task";

export type GraphNode = {
  id: string;
  kind: NodeKind;
  label: string;
  x: number;
  y: number;
  detail: string;
};

export type GraphEdge = { from: string; to: string; rel: string };

export type Objective = {
  id: string;
  title: string;
  progress: number;
  risk: "low" | "watch" | "high";
  children: { id: string; title: string; done: boolean }[];
};

export type Worker = {
  id: string;
  name: string;
  role: RoleId;
  title: string;
  status: "active" | "idle" | "blocked";
  assignment: string;
  tokens: number;
  load: number;
};

export type FeedItem = {
  id: string;
  source: "github" | "slack" | "calendar" | "notion" | "system" | "mail";
  title: string;
  ts: number;
  nodeId?: string;
};

export type Alert = {
  id: string;
  level: "ok" | "warn" | "danger";
  text: string;
};

export type DecisionRecord = {
  id: string;
  title: string;
  problem: string;
  options: string[];
  plan: string;
  research: string;
  evidence: string[];
  confidence: number;
  approver: string;
  actions: string[];
  outcomes: string[];
  workflow: { agent: string; output: string; status: string }[];
};

export const GRAPH_NODES: GraphNode[] = [
  { id: "obj-os", kind: "objective", label: "Sovereign Work OS", x: 400, y: 40, detail: "Long-horizon mission: persistent executive intelligence." },
  { id: "obj-launch", kind: "objective", label: "Launch NEXUS 1.0", x: 220, y: 120, detail: "Closed loop: identity → memory → reality → workforce → proof." },
  { id: "proj-alpha", kind: "project", label: "Project Alpha", x: 400, y: 150, detail: "ADL NEXUS command + floor. Local-first runtime." },
  { id: "dec-horizon", kind: "decision", label: "Decision · Horizon", x: 580, y: 120, detail: "Ship advise/authorize/commit before any silent execute." },
  { id: "dec-floor", kind: "decision", label: "Decision · Floor first", x: 700, y: 210, detail: "Pixel office as workforce surface; command as executive layer." },
  { id: "repo-nexus", kind: "repo", label: "Code Repo · Nexus", x: 250, y: 250, detail: "Active runtime. Not AtomicNexusAI." },
  { id: "doc-doctrine", kind: "document", label: "Doctrine", x: 120, y: 180, detail: "AI advises. Human or policy authorizes. Fail closed." },
  { id: "res-ware", kind: "research", label: "Research · Ware", x: 80, y: 300, detail: "W ≈ 0.08 phenomenology. Paper, not this runtime." },
  { id: "task-graph", kind: "task", label: "Task · Memory graph", x: 480, y: 280, detail: "Institutional memory: decisions, repos, objectives." },
  { id: "task-qa", kind: "task", label: "Task · QA gates", x: 620, y: 320, detail: "run_checks before complete_goal." },
  { id: "proj-clean", kind: "project", label: "Clean-Room / Aegis", x: 360, y: 360, detail: "Isolation and claim-cap. Absorbed as governance, not a twin." },
];

export const GRAPH_EDGES: GraphEdge[] = [
  { from: "obj-os", to: "obj-launch", rel: "decomposes" },
  { from: "obj-os", to: "proj-alpha", rel: "owns" },
  { from: "obj-launch", to: "dec-horizon", rel: "constrained by" },
  { from: "proj-alpha", to: "dec-horizon", rel: "decided" },
  { from: "proj-alpha", to: "repo-nexus", rel: "implements" },
  { from: "dec-horizon", to: "dec-floor", rel: "follows" },
  { from: "doc-doctrine", to: "dec-horizon", rel: "governs" },
  { from: "doc-doctrine", to: "obj-os", rel: "defines" },
  { from: "res-ware", to: "doc-doctrine", rel: "cited" },
  { from: "repo-nexus", to: "task-graph", rel: "tracks" },
  { from: "dec-horizon", to: "task-qa", rel: "requires" },
  { from: "proj-alpha", to: "proj-clean", rel: "absorbs" },
  { from: "task-graph", to: "proj-alpha", rel: "feeds" },
];

export const OBJECTIVES: Objective[] = [
  {
    id: "obj-os",
    title: "Sovereign Work OS",
    progress: 62,
    risk: "watch",
    children: [
      { id: "c1", title: "Identity & mission core", done: true },
      { id: "c2", title: "Persistent memory graph", done: true },
      { id: "c3", title: "Workforce orchestration", done: true },
      { id: "c4", title: "Execution via lab IDE", done: true },
      { id: "c5", title: "Governance before commit", done: true },
      { id: "c6", title: "Reality State engine", done: true },
      { id: "c7", title: "Factory pathways + hashed ledger", done: true },
      { id: "c8", title: "Continuous improvement loop", done: false },
    ],
  },
  {
    id: "obj-launch",
    title: "Launch NEXUS 1.0",
    progress: 48,
    risk: "low",
    children: [
      { id: "l1", title: "Command interface", done: true },
      { id: "l2", title: "Pixel workforce floor", done: true },
      { id: "l3", title: "Advise → authorize → commit", done: true },
      { id: "l4", title: "Live weather / web tools", done: true },
      { id: "l5", title: "Paper factory (trade / ops / lab / audit)", done: true },
    ],
  },
];

export const WORKERS: Worker[] = [
  { id: "w-res", name: "Researcher-1", role: "cpo", title: "Research Analyst", status: "active", assignment: "Link Ware notes to doctrine, not runtime", tokens: 12_400, load: 41 },
  { id: "w-eng", name: "Engineer-2", role: "engineer", title: "Software Engineer", status: "active", assignment: "Lab IDE — index.html / styles / main", tokens: 38_200, load: 73 },
  { id: "w-gov", name: "Governance-3", role: "ceo", title: "Governance Officer", status: "idle", assignment: "Awaiting authorize on next proposal", tokens: 2_100, load: 8 },
  { id: "w-arch", name: "Architect-1", role: "cto", title: "Systems Architect", status: "idle", assignment: "Spine: Nexus, clean-room, Aegis", tokens: 6_800, load: 22 },
  { id: "w-qa", name: "Tester-1", role: "qa", title: "Testing Agent", status: "blocked", assignment: "run_checks after next write_file", tokens: 4_400, load: 15 },
  { id: "w-ops", name: "Ops-1", role: "operator", title: "Operations Coordinator", status: "active", assignment: "Reception + activity feed", tokens: 9_900, load: 36 },
  { id: "w-pm", name: "PM-1", role: "pm", title: "Product Manager", status: "idle", assignment: "Horizon plan owners", tokens: 3_300, load: 11 },
];

export const FEED: FeedItem[] = [];

export const INTEGRATIONS: { id: string; label: string; state: "local" | "idle" | "live" }[] = [
  { id: "github", label: "GitHub", state: "idle" },
  { id: "web", label: "Browser", state: "live" },
  { id: "spot", label: "Spot mark", state: "live" },
  { id: "factory", label: "Factory", state: "local" },
  { id: "ledger", label: "Ledger", state: "local" },
  { id: "shop", label: "Shop", state: "local" },
  { id: "broker", label: "Broker", state: "idle" },
];

export const DECISIONS: Record<string, DecisionRecord> = {
  "dec-horizon": {
    id: "dec-horizon",
    title: "Horizon protocol",
    problem: "Agents were able to act as if execute were free. That violates sovereignty.",
    options: [
      "Silent auto-commit after a plan",
      "Advise only, never execute",
      "THINK → AUTHORIZE → COMMIT with fail-closed refuse",
    ],
    plan: "Construct a Reality State, require operator authorize, then assign a supervised workforce task. Refuse if unauthorized.",
    research: "Digital Double queue pattern. RealityOS scenario types. ADL-Governance claim-cap.",
    evidence: [
      "executeRequiresAuthorize = true",
      "No live twin, no live adapters",
      "Provenance written on think / authorize / commit / refuse",
    ],
    confidence: 0.48,
    approver: "Operator (you)",
    actions: ["think()", "authorize()", "commit() assigns Engineer or PM"],
    outcomes: ["Unauthorized commit is refused and logged", "Authorized commit opens the provenance cabinet"],
    workflow: [
      { agent: "Ops-1", output: "Intake objective", status: "complete" },
      { agent: "Researcher-1", output: "Reality State + risk", status: "complete" },
      { agent: "Governance-3", output: "Await human authorize", status: "active" },
      { agent: "Engineer-2", output: "Blocked until commit", status: "idle" },
    ],
  },
  "dec-floor": {
    id: "dec-floor",
    title: "Floor first, then command",
    problem: "An OS with no body is a dashboard. A floor with no command is a toy.",
    options: ["Dashboard only", "Pixel office only", "Command as executive layer, floor as workforce"],
    plan: "Ship the ChatDev floor as the living office; command as the panoramic intelligence view. Switch, don't merge.",
    research: "ChatDev virtual office. LegionOS holarchy. Gia decompose-and-act.",
    evidence: ["Floor hotspots map to tools", "Command graph maps to the same loop"],
    confidence: 0.55,
    approver: "Operator (you)",
    actions: ["FLOOR view", "COMMAND view"],
    outcomes: ["Crew still walks and talks", "Decision nodes open this panel"],
    workflow: [
      { agent: "PM-1", output: "Scope both surfaces", status: "complete" },
      { agent: "Engineer-2", output: "Wire view switch", status: "complete" },
      { agent: "Tester-1", output: "A/D games + graph click", status: "active" },
    ],
  },
};

export const KIND_COLOR: Record<NodeKind, string> = {
  objective: "#6a96c4",
  project: "#4aa3a0",
  decision: "#c4a15a",
  repo: "#8aa0b8",
  research: "#7a9e8a",
  document: "#9aa7b5",
  task: "#6d8f9e",
};
