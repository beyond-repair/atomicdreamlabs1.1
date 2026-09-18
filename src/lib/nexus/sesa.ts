import { sha256Hex } from "./hash.ts";

/** Spec D = 10_000 bipolar. Real vectors, not a toy dim. */
export const HYPER_DIM = 10_000;
export const COHESION_THRESHOLD = 0.95;
export const RING_CAP = 64;
export const SYMBOL_CAP = 32;

export const DEFAULT_SYMBOLS = [
  "INTENT",
  "ACTION",
  "GATE",
  "AUTH",
  "COMMIT",
  "HASH",
  "VSA",
  "SMT",
  "CREW",
  "PAPER",
  "HALT",
  "CORE",
] as const;

export const LIFECYCLE = [
  { id: "encode", title: "1 ENCODE", note: "Perception · D=10,000 bipolar" },
  { id: "bind", title: "2 BIND", note: "Hadamard association" },
  { id: "smt", title: "3 SMT", note: "AC-3 · cohesion ≥ 0.95" },
  { id: "dispatch", title: "4 DISPATCH", note: "Ring · GOVERN COMMIT" },
  { id: "check", title: "5 CHECK", note: "Local merkle · governor you" },
] as const;

export type Hypervector = Int8Array;

export type SesaInvariant = { id: string; ok: boolean; note: string };

export type EventFrame = {
  ts: number;
  idx: number;
  intent: string;
  action: string;
  cohesion: number;
  ok: boolean;
  leaf: string;
  fingerprint: string;
};

export type SesaPreview = {
  intent: string;
  action: string;
  cohesion: number;
  ok: boolean;
  pruned: string[];
  invariants: SesaInvariant[];
  fingerprint: string;
};

export type SesaState = {
  symbols: string[];
  intent: string;
  action: string;
  preview: SesaPreview | null;
  ring: EventFrame[];
  cursor: number;
  merkleRoot: string;
  lock: boolean;
  lastVerifiedIdx: number;
  telemetry: string[];
};

const EMPTY_ROOT = "0".repeat(64);

export const DEFAULT_SESA: SesaState = {
  symbols: [...DEFAULT_SYMBOLS],
  intent: "GATE",
  action: "COMMIT",
  preview: null,
  ring: [],
  cursor: 0,
  merkleRoot: EMPTY_ROOT,
  lock: false,
  lastVerifiedIdx: -1,
  telemetry: [],
};

export function sanitizeSymbol(raw: string) {
  return raw
    .toUpperCase()
    .replace(/[^A-Z0-9_]/g, "")
    .slice(0, 16);
}

export function hydrateSesa(raw?: Partial<SesaState> | null): SesaState {
  const symbols = (raw?.symbols ?? DEFAULT_SESA.symbols)
    .map(sanitizeSymbol)
    .filter(Boolean)
    .filter((k, i, a) => a.indexOf(k) === i)
    .slice(0, SYMBOL_CAP);
  return {
    ...DEFAULT_SESA,
    ...raw,
    symbols: symbols.length ? symbols : [...DEFAULT_SYMBOLS],
    intent: sanitizeSymbol(raw?.intent ?? "GATE") || "GATE",
    action: sanitizeSymbol(raw?.action ?? "COMMIT") || "COMMIT",
    preview: raw?.preview ?? null,
    ring: Array.isArray(raw?.ring) ? raw!.ring.slice(-RING_CAP) : [],
    cursor: Math.max(0, raw?.cursor ?? 0),
    merkleRoot: raw?.merkleRoot || EMPTY_ROOT,
    lock: !!raw?.lock,
    lastVerifiedIdx: raw?.lastVerifiedIdx ?? -1,
    telemetry: Array.isArray(raw?.telemetry) ? raw!.telemetry.slice(0, 24) : [],
  };
}

function fnv1a(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function xorshift(seed: number) {
  let x = seed || 1;
  return () => {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return x >>> 0;
  };
}

/** Deterministic bipolar encoder. Same key → same vector. Replayable. */
export function encodeSymbol(key: string): Hypervector {
  const rng = xorshift(fnv1a(sanitizeSymbol(key) || "NULL") || 1);
  const v = new Int8Array(HYPER_DIM);
  for (let i = 0; i < HYPER_DIM; i++) v[i] = rng() & 1 ? 1 : -1;
  return v;
}

/** Hadamard bind. Involution: (a * b) * a = b. */
export function bind(a: Hypervector, b: Hypervector): Hypervector {
  const out = new Int8Array(HYPER_DIM);
  for (let i = 0; i < HYPER_DIM; i++) out[i] = (a[i] * b[i]) as -1 | 1;
  return out;
}

export const unbind = bind;

/** Cosine on the bipolar sphere = dot / D. */
export function similarity(a: Hypervector, b: Hypervector): number {
  let dot = 0;
  for (let i = 0; i < HYPER_DIM; i++) dot += a[i] * b[i];
  return dot / HYPER_DIM;
}

/** Majority bundle (superposition). Ties stay +1. */
export function bundle(vecs: Hypervector[]): Hypervector {
  const acc = new Int32Array(HYPER_DIM);
  for (const v of vecs) {
    for (let i = 0; i < HYPER_DIM; i++) acc[i] += v[i];
  }
  const out = new Int8Array(HYPER_DIM);
  for (let i = 0; i < HYPER_DIM; i++) out[i] = acc[i] >= 0 ? 1 : -1;
  return out;
}

/** Rotate for sequencing. */
export function permute(v: Hypervector, k = 1): Hypervector {
  const n = HYPER_DIM;
  const s = ((k % n) + n) % n;
  const out = new Int8Array(n);
  out.set(v.subarray(n - s), 0);
  out.set(v.subarray(0, n - s), s);
  return out;
}

export function vectorFingerprint(v: Hypervector) {
  let h = 2166136261;
  for (let i = 0; i < v.length; i += 16) {
    h ^= v[i] + 1;
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

export function sliceBarcode(v: Hypervector, n = 128): number[] {
  const out: number[] = [];
  const step = Math.max(1, Math.floor(HYPER_DIM / n));
  for (let i = 0; i < n; i++) out.push(v[i * step] ?? 1);
  return out;
}

/** Pairwise FNV fold. Paper merkle — not keccak, not a chain. */
export function pairHash(a: string, b: string) {
  const h = fnv1a(`${a}|${b}`);
  const g = fnv1a(`${b}|${a}|${h}`);
  return h.toString(16).padStart(8, "0") + g.toString(16).padStart(8, "0");
}

export function merkleRootOf(leaves: string[]): string {
  if (!leaves.length) return EMPTY_ROOT;
  let layer = leaves.slice();
  while (layer.length > 1) {
    if (layer.length % 2) layer.push(layer[layer.length - 1]);
    const next: string[] = [];
    for (let i = 0; i < layer.length; i += 2) next.push(pairHash(layer[i], layer[i + 1]));
    layer = next;
  }
  return layer[0];
}

export function merkleProofOf(leaves: string[], index: number): string[] {
  if (!leaves.length || index < 0 || index >= leaves.length) return [];
  const proof: string[] = [];
  let layer = leaves.slice();
  let idx = index;
  while (layer.length > 1) {
    if (layer.length % 2) layer.push(layer[layer.length - 1]);
    const sib = idx % 2 === 0 ? layer[idx + 1] : layer[idx - 1];
    proof.push(sib);
    const next: string[] = [];
    for (let i = 0; i < layer.length; i += 2) next.push(pairHash(layer[i], layer[i + 1]));
    layer = next;
    idx = Math.floor(idx / 2);
  }
  return proof;
}

export function verifyMerkleProof(leaf: string, proof: string[], root: string, index: number) {
  let hash = leaf;
  let idx = index;
  for (const sib of proof) {
    hash = idx % 2 === 0 ? pairHash(hash, sib) : pairHash(sib, hash);
    idx = Math.floor(idx / 2);
  }
  return hash === root;
}

export type StatePayload = {
  state_id: number;
  cohesion: number;
  execution_lock: boolean;
};

/** AC-3 style prune: drop "pass" if any hard invariant fails. */
export function ac3(
  payload: StatePayload,
  knownIntent: boolean,
  knownAction: boolean,
): { ok: boolean; pruned: string[]; invariants: SesaInvariant[] } {
  const invariants: SesaInvariant[] = [
    {
      id: "intent",
      ok: knownIntent,
      note: knownIntent ? "intent in item memory" : "intent unknown — encode first",
    },
    {
      id: "action",
      ok: knownAction,
      note: knownAction ? "action in item memory" : "action unknown — encode first",
    },
    {
      id: "lock",
      ok: !payload.execution_lock,
      note: payload.execution_lock ? "execution lock — resume first" : "lock open",
    },
    {
      id: "cohesion",
      ok: Number.isFinite(payload.cohesion) && payload.cohesion >= COHESION_THRESHOLD,
      note: Number.isFinite(payload.cohesion)
        ? `cohesion ${payload.cohesion.toFixed(4)} ${payload.cohesion >= COHESION_THRESHOLD ? "≥" : "<"} ${COHESION_THRESHOLD}`
        : "cohesion not finite",
    },
  ];
  const pruned = invariants.filter((i) => !i.ok).map((i) => i.note);
  return { ok: pruned.length === 0, pruned, invariants };
}

export function parseSesaGoal(goal: string): { intent: string; action: string; admit: boolean; revert: boolean } {
  const t = goal.trim();
  if (/\b(sesa revert|revert token|snap (to )?(the )?verified|rollback sesa)\b/i.test(t)) {
    return { intent: "GATE", action: "COMMIT", admit: false, revert: true };
  }
  const encode = t.match(/\bencode(?:\s+symbol)?\s+([A-Za-z0-9_]+)/i);
  if (encode) {
    const k = sanitizeSymbol(encode[1]) || "SYMBOL";
    return { intent: k, action: k, admit: true, revert: false };
  }
  const bindMatch = t.match(/\bbind\s+([A-Za-z0-9_]+)\s+to\s+([A-Za-z0-9_]+)/i);
  if (bindMatch) {
    return {
      intent: sanitizeSymbol(bindMatch[1]) || "GATE",
      action: sanitizeSymbol(bindMatch[2]) || "COMMIT",
      admit: false,
      revert: false,
    };
  }
  const cycle = t.match(/\b(?:sesa cycle|vsa cycle|run sesa)\s+([A-Za-z0-9_]+)\s+([A-Za-z0-9_]+)/i);
  if (cycle) {
    return {
      intent: sanitizeSymbol(cycle[1]) || "GATE",
      action: sanitizeSymbol(cycle[2]) || "COMMIT",
      admit: false,
      revert: false,
    };
  }
  return { intent: "GATE", action: "COMMIT", admit: false, revert: false };
}

function log(state: SesaState, line: string): SesaState {
  return { ...state, telemetry: [`${new Date().toISOString().slice(11, 19)} ${line}`, ...state.telemetry].slice(0, 24) };
}

export function rememberSymbol(state: SesaState, key: string): SesaState {
  const k = sanitizeSymbol(key);
  if (!k) return log(state, "ENCODE refused — empty symbol");
  if (state.symbols.includes(k)) return log(state, `ENCODE ${k} already in item memory`);
  if (state.symbols.length >= SYMBOL_CAP) return log(state, "ENCODE refused — item memory full");
  return log({ ...state, symbols: [...state.symbols, k] }, `ENCODE ${k} · workspace only`);
}

export function setPair(state: SesaState, intent: string, action: string): SesaState {
  return {
    ...state,
    intent: sanitizeSymbol(intent) || state.intent,
    action: sanitizeSymbol(action) || state.action,
  };
}

export function proposeCycle(state: SesaState, intent = state.intent, action = state.action, admit = false): SesaPreview {
  const i = sanitizeSymbol(intent) || "GATE";
  const a = sanitizeSymbol(action) || "COMMIT";
  const knownI = admit || state.symbols.includes(i);
  const knownA = admit || state.symbols.includes(a);
  const vi = knownI ? encodeSymbol(i) : encodeSymbol(`∅-${i}`);
  const va = knownA ? encodeSymbol(a) : encodeSymbol(`∅-${a}`);
  const bound = bind(vi, va);
  const extracted = unbind(bound, vi);
  const cohesion = knownI && knownA ? similarity(extracted, va) : 0;
  const payload: StatePayload = {
    state_id: Date.now(),
    cohesion,
    execution_lock: state.lock,
  };
  const checked = ac3(payload, knownI, knownA);
  return {
    intent: i,
    action: a,
    cohesion,
    ok: checked.ok,
    pruned: checked.pruned,
    invariants: checked.invariants,
    fingerprint: vectorFingerprint(bound),
  };
}

export function previewBind(state: SesaState, intent = state.intent, action = state.action): SesaState {
  const preview = proposeCycle(state, intent, action, false);
  const line = preview.ok
    ? `SMT pass · ${preview.intent}⊗${preview.action} · ${preview.cohesion.toFixed(4)}`
    : `SMT refuse · ${preview.pruned.join("; ")}`;
  return log({ ...state, intent: preview.intent, action: preview.action, preview }, line);
}

export async function commitCycle(
  state: SesaState,
  intent?: string,
  action?: string,
  admit = false,
): Promise<{ ok: true; state: SesaState; frame: EventFrame } | { ok: false; state: SesaState; error: string }> {
  const preview = proposeCycle(state, intent ?? state.intent, action ?? state.action, admit);
  if (!preview.ok) {
    const next = log({ ...state, preview }, `SMT refuse · not dispatched · ${preview.pruned.join("; ")}`);
    return { ok: false, state: next, error: `SMT refuse · ${preview.pruned.join("; ")}` };
  }
  const idx = state.cursor;
  const ts = Date.now();
  const leaf = await sha256Hex(
    JSON.stringify({ idx, ts, intent: preview.intent, action: preview.action, cohesion: preview.cohesion, fp: preview.fingerprint }),
  );
  const frame: EventFrame = {
    ts,
    idx,
    intent: preview.intent,
    action: preview.action,
    cohesion: preview.cohesion,
    ok: true,
    leaf,
    fingerprint: preview.fingerprint,
  };
  const symbols = state.symbols.includes(preview.intent) ? state.symbols : [...state.symbols, preview.intent];
  const withAction = symbols.includes(preview.action) ? symbols : [...symbols, preview.action];
  const ring = [...state.ring, frame].slice(-RING_CAP);
  const merkleRoot = merkleRootOf(ring.map((f) => f.leaf));
  const next = log(
    {
      ...state,
      symbols: withAction.slice(0, SYMBOL_CAP),
      intent: preview.intent,
      action: preview.action,
      preview,
      ring,
      cursor: idx + 1,
      merkleRoot,
      lastVerifiedIdx: idx,
    },
    `DISPATCH ${idx} · ${preview.intent}⊗${preview.action} · ${leaf.slice(0, 12)}`,
  );
  return { ok: true, state: next, frame };
}

export function revertVerified(state: SesaState): { ok: true; state: SesaState } | { ok: false; state: SesaState; error: string } {
  if (!state.ring.length) {
    const next = log(state, "REVERT refused — no verified manifold");
    return { ok: false, state: next, error: "No verified manifold to snap back to." };
  }
  const keep = state.ring.slice(0, -1);
  const last = keep[keep.length - 1] ?? null;
  const merkleRoot = merkleRootOf(keep.map((f) => f.leaf));
  const next = log(
    {
      ...state,
      ring: keep,
      cursor: (last?.idx ?? -1) + 1,
      merkleRoot,
      lastVerifiedIdx: last?.idx ?? -1,
      preview: null,
    },
    `REVERT · snapped to frame ${last?.idx ?? "none"} · ${merkleRoot.slice(0, 12)}`,
  );
  return { ok: true, state: next };
}

export function replayFrame(state: SesaState, idx: number): EventFrame | null {
  return state.ring.find((f) => f.idx === idx) ?? null;
}

export function setSesaLock(state: SesaState, lock: boolean): SesaState {
  return log({ ...state, lock }, lock ? "LOCK · execution frozen" : "UNLOCK · lock lifted");
}

export type LifeLit = "off" | "ok" | "bad";

export function lifeLit(state: SesaState): Record<(typeof LIFECYCLE)[number]["id"], LifeLit> {
  return {
    encode: state.symbols.length ? "ok" : "off",
    bind: state.preview ? "ok" : "off",
    smt: !state.preview ? "off" : state.preview.ok ? "ok" : "bad",
    dispatch: state.ring.length ? "ok" : "off",
    check: state.merkleRoot !== EMPTY_ROOT ? "ok" : "off",
  };
}

export type RecallHit = { key: string; sim: number };

/** Associative recall against item memory. Self-similarity is 1. */
export function nearest(state: SesaState, probe: string | Hypervector, k = 4): RecallHit[] {
  const v = typeof probe === "string" ? encodeSymbol(sanitizeSymbol(probe) || "NULL") : probe;
  return state.symbols
    .map((key) => ({ key, sim: similarity(v, encodeSymbol(key)) }))
    .sort((a, b) => b.sim - a.sim)
    .slice(0, Math.max(1, k));
}

export function recallPair(state: SesaState) {
  const vi = encodeSymbol(state.intent);
  const va = encodeSymbol(state.action);
  const bound = bind(vi, va);
  const extracted = unbind(bound, vi);
  return {
    intent: nearest(state, vi, 3),
    action: nearest(state, extracted, 3),
    bound,
  };
}

export function dualReality(state: SesaState) {
  return {
    governor: "operator" as const,
    workspace: {
      symbols: state.symbols,
      intent: state.intent,
      action: state.action,
      cohesion: state.preview?.cohesion ?? null,
      ok: state.preview?.ok ?? null,
      fingerprint: state.preview?.fingerprint ?? null,
      pruned: state.preview?.pruned ?? [],
    },
    verified: {
      frames: state.ring.map((f) => ({
        idx: f.idx,
        pair: `${f.intent}⊗${f.action}`,
        cohesion: f.cohesion,
        leaf: f.leaf.slice(0, 12),
      })),
      merkleRoot: state.merkleRoot,
      lastVerifiedIdx: state.lastVerifiedIdx,
    },
  };
}

/** Replay a dispatched frame into the workspace. Does not mutate the ring. */
export function loadFrame(state: SesaState, idx: number): SesaState {
  const f = replayFrame(state, idx);
  if (!f) return log(state, `REPLAY refused · no frame ${idx}`);
  const preview = proposeCycle(state, f.intent, f.action, false);
  return log(
    { ...state, intent: f.intent, action: f.action, preview },
    `REPLAY ${idx} · ${f.intent}⊗${f.action} · workspace only`,
  );
}

export function triage(state: SesaState) {
  const last = state.ring[state.ring.length - 1] ?? null;
  const bytes = state.symbols.length * HYPER_DIM + state.ring.length * 180;
  const notes = [
    `VSA D=${HYPER_DIM} bipolar`,
    `item memory ${state.symbols.length}/${SYMBOL_CAP}`,
    `ring ${state.ring.length}/${RING_CAP} · cursor ${state.cursor}`,
    `merkle ${state.merkleRoot.slice(0, 16)}`,
    state.lock ? "execution lock ON" : "lock open",
    last ? `last cohesion ${last.cohesion.toFixed(4)}` : "no dispatched frame",
    "governor operator · local only",
    "in-process ring. not mmap. not a chain.",
  ];
  return {
    ok: !state.lock && (!last || last.ok),
    bytes,
    frames: state.ring.length,
    lock: state.lock,
    cohesion: last?.cohesion ?? null,
    merkleRoot: state.merkleRoot,
    notes,
  };
}

export function looksLikeSesa(text: string) {
  return /\b(sesa|vsa|hypervector|smt kernel|nexus core|revert token|bind \w+ to \w+)\b/i.test(text);
}
