/** Claim-capped operator memory of the beyond-repair / Atomic Dream Labs portfolio.
 *  Filenames and READMEs are not capability. Runtime evidence is. */

export const PORTFOLIO = `
You work for Atomic Dream Labs (ADL), org beyond-repair on GitHub (~75 public repos).
Operator knowledge — be specific when asked about "our" work. Do not invent live twins or production AGI.

ACTIVE RUNTIME SPINE (treat as the product this floor is):
- ADL-Nexus: request → governance → gate → pathway → hash → memory. Advise first; execute after authority. Paper/local adapters only.
- SESA: VSA D=10000 bipolar bind + SMT cohesion ≥ 0.95 + in-process ring + local merkle. Not Godot. Not a chain. COMMIT still operator.
- sovereign-clean-room: isolation, cryptographic gates, fail-closed. SUPERSEDES Gia AGI claims.
- sovereign-clean-room: isolation, cryptographic gates, fail-closed. SUPERSEDES Gia AGI claims.
- forge-aegis / AEGIS: security/build infrastructure, claim-cap ontology.
- Digital_Double_virtual_workforce: typed virtual workforce, role/queue, assign → complete. No autonomy claim.
- BlockSwarm: multi-agent coordination, authority vs settlement. Solidity + docs.

ABSORBABLE PATTERNS (use as office behavior, not sibling-runtime interop):
- Gia (SUPERSEDED): task decomposition + execute with minimal wait. Historical FastAPI sketch only.
- LegionOS: Founder/Builder/Growth/Ops/Agent Factory holarchy. Idea → plan → build. Public surface, not a live company OS.
- Sunder: SCAN (look up) → SNAP (plan) → SUNDER (write). Local coding agent pattern.
- RealityOS: scenario types, what-if, no live digital twin.
- RepoRover / DevelopTool: repo inspect + IDE. Partial/historical.
- VigilE.S.A.: security vocabulary (zero trust, gates) — not a running enclave here.

RESEARCH (paper/code, not this runtime):
Ware Constant W ≈ 0.08 phenomenology, CFT/IQG, Coherence Drive, Origin Point Hypothesis,
Informational Fork Protocol, Entanglement & Emergence, m2-renormalization-law.

ARCHIVED / DO NOT MERGE:
AtomicNexusAI is a different historical skeleton. Do not conflate with ADL-Nexus.
FortiTrade, Agent-Snake, smart_home_BCI, quantum A.I. optimization — archived experiments.

When the visitor says "our repos", "SEEM", "Digital Double", "Ware Constant", answer from this map first, then search_web only for current public facts.
`.trim();

export type PlanStep = {
  id: string;
  title: string;
  owner: string;
  done: boolean;
  test: string;
};

export function looksLikeWeather(text: string) {
  return /\b(weather|forecast|temperature|temp|humidity|rain|wind)\b/i.test(text);
}

export function looksLikeRepos(text: string) {
  return /\b(repo|github|beyond-repair|our (code|stack|tech|repos?)|SEEM|LegionOS|BlockSwarm|Digital Double|Ware Constant|what can we implement)\b/i.test(
    text,
  );
}

export function looksLikeBuild(text: string) {
  return /\b(build|clone|make|create|write|app|youtube|website|game|ide|prototype|landing|shop|store|storefront|business|cash.?app|paypal|trade)\b/i.test(
    text,
  );
}

export function looksLikeFactory(text: string) {
  return /\b(pathways?|automat|workflow|restock|paper trade|audit pack|governance|what can (it|this|the floor|the office) (do|execute|run)|dropship|backtest|mean reversion|supplier|compliance|fulfill|watches?|auto ops|inbound|webhook|held|holds|drain|backorder|plant|low at|tier|capabilit|codex|achievements?)\b/i.test(
    text,
  );
}

export function looksLikeSunder(text: string) {
  return /\b(sunder|dead code|unused (code|function)|refactor (the )?lab|scan.?snap|audit repos)\b/i.test(text);
}

export function looksLikeCodex(text: string) {
  return /\b(what can (you|it|this office|this floor|the office|the floor|this desk)|what (is|does) this (office|floor|app)|how does (this|the office) work|live map|capabilit(y|ies)|list (all )?(the )?(functions|features|abilities)|functions?,? features?,? and abilities|ability list|feature list)\b/i.test(
    text,
  );
}


export function looksLikeHorizon(text: string) {
  return /\b(plan a |roadmap|horizon plan|social network|long.?horizon)\b/i.test(text);
}


