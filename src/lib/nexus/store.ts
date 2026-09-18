import { create } from "zustand";
import { persist } from "zustand/middleware";
import { runNexusTurn, type ChatWire, type ToolEvent } from "./chat";
import { authorize as doAuth, commit as doCommit, think as doThink } from "./engine";
import type { PlanStep } from "./knowledge";
import { DEFAULT_BIZ, fetchSpot, hydrateBiz, runLabTests as testLab, shopFiles, type BizState } from "./business";
import { DRAWDOWN_LIMIT } from "./adapters";
import { crewForPathway, CREW, CREW_DESK } from "./crew";

import { OBJECT_HINT, OBJECT_TAB, type ObjectId, type OverlayId } from "./room";
import { CABINET_CAP, hydrateCabinets } from "./arcade";
import { OBJECT_ROOM, ROOMS, canonicalRoom, isRoomId, matchRoom, type RoomId } from "./campus";
import {
  CLUB_SPEECH,
  DEFAULT_CLUB,
  hydrateClub,
  matchClub,
  pushDuel,
  pushScore,
  type ClubDuel,
  type ClubScore,
  type ClubState,
  type ClubZone,
} from "./club";
import { executeAuthorized, type RunRecord } from "./runtime";
import { sha256Hex } from "./hash";
import { tryLocalTurn } from "./localTurn";
import { FLOOR_LINE, type Proposal, type ProvenanceEntry, type RealityState, type RoleId, type WorkforceTask } from "./types";
import { FEATS, featTitle } from "./codex";
import { WATCH_DEFS, evaluateWatches, hydrateRules, hydrateWatches, inboundHint, type PlantRules } from "./watches";
import { hydrateSesa, loadFrame, previewBind, rememberSymbol, setPair } from "./sesa";
import {
  alreadyQueued,
  canAutoCommit,
  draftStage,
  hydratePolicies,
  hydrateQueue,
  STAGER_JOB,
  STAGER_NAME,
  STAGER_ROLE,
  type PolicyRule,
  type StagePacket,
  type StagerId,
} from "./stage";

export type ChatMessage = ChatWire & { id: string; ts: number };

const DEFAULT_FILES: Record<string, string> = {
  "index.html": `<!doctype html>
<html>
  <head>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>NEXUS lab</h1>
    <p>Idle. Reception will send engineering here when a build starts.</p>
    <script src="main.js"></script>
  </body>
</html>`,
  "styles.css": `body { font-family: ui-sans-serif; background: #1c120c; color: #f6ead0; padding: 24px; }`,
  "main.js": `console.log("NEXUS lab ready");`,
};

type NexusState = {
  gold: number;
  selectedRole: RoleId;
  goalDraft: string;
  speech: string;
  lastReality: RealityState | null;
  activeProposal: Proposal | null;
  log: ProvenanceEntry[];
  tasks: WorkforceTask[];
  lastError: string | null;
  busy: boolean;
  working: RoleId[];
  messages: ChatMessage[];
  files: Record<string, string>;
  activeFile: string;
  events: ToolEvent[];
  overlay: OverlayId | null;
  dim: boolean;
  light: "on" | "dim" | "ops";
  feats: string[];
  crewGold: number;
  briefed: boolean;
  plan: PlanStep[];

  checks: string[];
  view: "command" | "floor";
  selectedNode: string | null;
  biz: BizState;
  labPane: "edit" | "test" | "run";
  dockTab: "chat" | "lab" | "govern";
  lastRun: RunRecord | null;
  runs: RunRecord[];
  lastWatchAt: number;
  labDirtyAt: number;
  room: RoomId;
  playingId: string | null;
  club: ClubState;
  queue: StagePacket[];
  policies: PolicyRule[];
  grantFeat: (id: string) => void;
  meetCrew: (r: RoleId) => void;
  dismissBrief: () => void;
  setGoalDraft: (v: string) => void;

  selectRole: (r: RoleId) => void;
  openOverlay: (id: OverlayId) => void;
  closeOverlay: () => void;
  tapObject: (id: ObjectId) => void;
  addGold: (n: number) => void;
  setActiveFile: (path: string) => void;
  setFileContent: (path: string, content: string) => void;
  send: (forced?: string) => Promise<void>;
  think: (goal?: string) => void;
  authorize: () => void;
  commit: () => Promise<void>;
  resetCycle: () => void;
  setView: (v: "command" | "floor") => void;
  selectNode: (id: string | null) => void;
  spawnWorker: (role: RoleId) => void;
  setBiz: (p: Partial<BizState>) => void;
  setRules: (p: Partial<PlantRules>) => void;
  setLabPane: (p: "edit" | "test" | "run") => void;
  setDockTab: (t: "chat" | "lab" | "govern") => void;
  publishShop: () => void;
  runLabTests: () => void;
  paperFill: (symbol: string, side: "buy" | "sell", qty: number) => Promise<void>;
  armWatch: (id: string, armed: boolean) => void;
  inbound: (qty?: number) => Promise<void>;
  tickPlant: () => Promise<void>;
  setRoom: (r: RoomId) => void;
  playCabinet: (id: string) => void;
  closeCabinet: () => void;
  tickArcade: () => Promise<void>;
  tickHal: () => Promise<void>;
  tickLab: () => void;
  setClubZone: (z: ClubZone) => void;
  setTube: (id: string | null) => void;
  setTune: (id: string | null) => void;
  recordScore: (row: Omit<ClubScore, "ts">) => void;
  recordDuel: (row: ClubDuel) => void;
  stageCrew: (stager: StagerId, goal?: string) => Promise<void>;
  pickPacket: (id: string) => void;
  commitPacket: (id: string) => Promise<void>;
  commitAll: () => Promise<void>;
  authAll: () => void;
  dropPacket: (id: string) => void;
  signPolicy: (id: string, signed: boolean) => void;
  clearQueue: () => void;
  toggleAuto: () => void;
  encodeSesa: (key: string) => void;
  previewSesa: (intent?: string, action?: string) => void;
  pickSesa: (intent: string, action: string) => void;
  replaySesa: (idx: number) => void;
};

const GREET =
  "Office is live. Tap a desk, or tell me what to run. GOVERN is THINK → AUTH → COMMIT. You hold the key. Paper / local.";
const HELLO = "Crew is on the floor. You hold the key.";

function nid() {
  return Math.random().toString(16).slice(2, 10);
}

export const useNexus = create<NexusState>()(
  persist(
    (set, get) => {
  const applyRun = async (proposal: Proposal, extra: ProvenanceEntry[]) => {
    set({ busy: true, lastError: null });
    const world = {
      gold: get().gold,
      biz: hydrateBiz(get().biz),
      files: get().files,
      logTail: get().log.slice(-8),
    };
    const { run, effects } = await executeAuthorized(proposal, world);
    const execLog: ProvenanceEntry = {
      id: nid(),
      kind: run.ok ? "execute" : "refuse",
      ts: run.ts,
      proposalId: proposal.id,
      payload: { pathway: run.pathway, hash: run.hash, detail: run.detail, ok: run.ok },
    };
    const keepOverlay =
      run.ok &&
      (run.pathway === "shop_publish" ||
        run.pathway === "lab_qa" ||
        run.pathway === "lab_build" ||
        run.pathway === "sunder" ||
        run.pathway === "horizon");
    const pathFeat =
      run.ok && run.pathway === "drain_holds"
        ? "drain"
        : run.ok && run.pathway === "shop_publish"
          ? "shop"
          : run.ok && run.pathway === "lab_qa"
            ? "qa"
            : run.ok && run.pathway === "paper_trade"
              ? "paper"
              : run.ok && run.pathway === "lab_build"
                ? "build"
                : run.ok && run.pathway === "sunder"
                  ? "sunder"
                  : run.ok && run.pathway === "horizon"
                    ? "horizon"
                    : run.ok && run.pathway === "arcade_ship"
                      ? "cabinet"
                      : run.ok && run.pathway === "sesa_cycle"
                      ? "sesa"
                      : run.ok && run.pathway === "sesa_revert"
                        ? "merkle"
                      : run.ok
                        ? "commit"
                        : null;
    set((s) => {
      const nextFeats = [...(s.feats ?? [])];
      let gold = effects.gold ?? s.gold + (run.ok ? 25 : 0);
      let crewGold = s.crewGold ?? 0;
      if (proposal.actor === "auto-ops") crewGold += 8;
      if (pathFeat && !nextFeats.includes(pathFeat)) {
        nextFeats.push(pathFeat);
        gold += FEATS.find((f) => f.id === pathFeat)?.gold ?? 3;
      }
      if (run.ok && !nextFeats.includes("commit") && pathFeat !== "commit") {
        nextFeats.push("commit");
        gold += 5;
      }
      const earned = nextFeats.filter((id) => !(s.feats ?? []).includes(id));
      return {
        busy: false,
        activeProposal: { ...proposal, executed: true, status: "committed" },
        tasks: s.tasks,
        log: [...s.log, ...extra, execLog],
        gold,
        crewGold,
        feats: nextFeats,
        files: effects.files ?? s.files,
        plan: effects.plan?.length ? effects.plan : s.plan,
        biz: effects.biz ?? s.biz,
        lastRun: run,
        runs: [run, ...(s.runs ?? [])].slice(0, 16),
        lastError: run.ok ? null : run.detail,
        overlay: keepOverlay ? (run.overlay ?? s.overlay) : s.overlay,
        room: s.room,
        playingId: s.playingId,
        working: run.working.length ? run.working : crewForPathway(run.pathway),
        speech: run.ok
          ? `${run.title} committed. ${run.hash.slice(0, 12)} · ${run.detail}${earned.length ? ` · ACHIEVEMENT ${featTitle(earned[0])}` : ""}`
          : run.detail,
        dockTab: "govern",
      };
    });
    window.setTimeout(() => set({ working: [] }), 3200);
  };

  return {
  gold: 25000,
  selectedRole: "operator",
  goalDraft: "",
  speech: HELLO,
  lastReality: null,

  activeProposal: null,
  log: [],
  tasks: [],
  lastError: null,
  busy: false,
  working: [],
  messages: [],

  files: DEFAULT_FILES,
  activeFile: "index.html",
  events: [],
  overlay: null,
  dim: false,
  light: "on",
  feats: [],
  crewGold: 0,
  briefed: false,
  plan: [],

  checks: [],
  view: "floor",
  selectedNode: null,
  biz: DEFAULT_BIZ,
  labPane: "edit",
  dockTab: "chat",
  lastRun: null,
  runs: [],
  lastWatchAt: 0,
  labDirtyAt: 0,
  room: "office",
  playingId: null,
  club: { ...DEFAULT_CLUB },
  queue: [],
  policies: hydratePolicies(),
  setGoalDraft: (v) => set({ goalDraft: v }),
  selectRole: (r) =>
    set({
      selectedRole: r,
      speech: CREW[r]?.tap ?? FLOOR_LINE[r],
    }),
  meetCrew: (r) => {
    const desk = CREW_DESK[r];
    const line = CREW[r]?.tap ?? FLOOR_LINE[r];
    if (!desk) {
      set({ selectedRole: r, speech: line, overlay: null, dockTab: "chat" });
      return;
    }
    const dest = OBJECT_ROOM[desk];
    if (dest) {
      set({ selectedRole: r, speech: line });
      get().setRoom(dest);
      return;
    }
    set((s) => ({
      selectedRole: r,
      speech: line,
      overlay: desk,
      dockTab: OBJECT_TAB[desk] ?? s.dockTab,
    }));
  },
  dismissBrief: () => set({ briefed: true, speech: GREET }),

  openOverlay: (id) => {
    const dest = OBJECT_ROOM[id];
    if (dest) {
      get().setRoom(dest);
      return;
    }
    set({
      overlay: id,
      speech: OBJECT_HINT[id],
      dockTab: OBJECT_TAB[id] ?? get().dockTab,
    });
  },
  closeOverlay: () => set({ overlay: null }),
  addGold: (n) => set((s) => ({ gold: s.gold + n })),
  tapObject: (id) => {
    const dest = OBJECT_ROOM[id];
    if (dest) {
      const feats = get().feats ?? [];
      const firstArcade = dest === "arcade" && !feats.includes("arcade");
      get().setRoom(dest);
      if (firstArcade) {
        set((s) => ({
          feats: [...(s.feats ?? []), "arcade"],
          gold: s.gold + 2,
        }));
      }
      return;
    }
    const tab = OBJECT_TAB[id];
    const room = tab ? { dockTab: tab } : {};
    if (id === "lamp") {
      set((s) => {
        const cur = s.light ?? (s.dim ? "dim" : "on");
        const next = cur === "on" ? "dim" : cur === "dim" ? "ops" : "on";
        return {
          light: next,
          dim: next === "dim",
          speech: next === "on" ? "Lights up." : next === "dim" ? "Night floor." : "Ops phosphor on the glass.",
        };
      });
      return;
    }
    if (id === "coffee") {
      set((s) => {
        const feats = s.feats ?? [];
        const first = !feats.includes("sip");
        return {
          gold: s.gold + 1,
          feats: first ? [...feats, "sip"] : feats,
          speech: first ? "ACHIEVEMENT · First sip. Gold +1." : OBJECT_HINT.coffee,
          overlay: null,
          ...room,
        };
      });
      return;
    }
    if (id === "plant") {
      set({ speech: OBJECT_HINT.plant, overlay: null, ...room });
      return;
    }
    set({ overlay: id as OverlayId, speech: OBJECT_HINT[id], ...room });
  },
  grantFeat: (id) => {
    const def = FEATS.find((f) => f.id === id);
    if (!def) return;
    set((s) => {
      if ((s.feats ?? []).includes(id)) return s;
      return {
        feats: [...(s.feats ?? []), id],
        gold: s.gold + def.gold,
        speech: `ACHIEVEMENT · ${def.title}.`,
      };
    });
  },
  setActiveFile: (path) => set({ activeFile: path }),
  setFileContent: (path, content) =>
    set((s) => ({ files: { ...s.files, [path]: content }, labDirtyAt: Date.now() })),
  send: async (forced) => {
    const text = (forced ?? get().goalDraft).trim();
    if (!text || get().busy) return;
    const clubDest = matchClub(text);
    if (clubDest) {
      const userMsg: ChatMessage = {
        id: nid(),
        ts: Date.now(),
        role: "user",
        content: text,
      };
      get().setRoom("arcade");
      get().setClubZone(clubDest);
      set((s) => ({
        busy: false,
        working: [],
        goalDraft: forced ? s.goalDraft : "",
        messages: [...s.messages, userMsg],
        lastError: null,
      }));
      return;
    }
    const dest = matchRoom(text);
    if (dest) {
      const userMsg: ChatMessage = {
        id: nid(),
        ts: Date.now(),
        role: "user",
        content: text,
      };
      get().setRoom(dest);
      set((s) => ({
        busy: false,
        working: [],
        goalDraft: forced ? s.goalDraft : "",
        messages: [...s.messages, userMsg],
        lastError: null,
      }));
      return;
    }
    const userMsg: ChatMessage = {
      id: nid(),
      ts: Date.now(),
      role: "user",
      content: text,
    };
    set((s) => ({
      busy: true,
      working: ["operator", "pm"],
      lastError: null,
      goalDraft: forced ? s.goalDraft : "",
      messages: [...s.messages, userMsg],
      speech: "Floor is moving. Not waiting.",
      selectedRole: "operator",
      dockTab: "chat",
    }));
    try {
      const local = await tryLocalTurn(text, get().files, get().biz);
      if (local) {
        const extra: ChatMessage[] = local.messages.map((m) => ({ ...m, id: nid(), ts: Date.now() }));
        const wroteDemo = local.events.some((e) => e.name === "write_file" && e.detail === "index.html");
        const sundered = local.events.some((e) => e.name === "sunder");
        const planned = local.events.some((e) => e.name === "set_plan");
        set((s) => {
          const feats = [...(s.feats ?? [])];
          let gold = s.gold + (wroteDemo ? 40 : 10);
          let crewGold = s.crewGold ?? 0;
          crewGold += 8;
          const feat = wroteDemo ? "build" : sundered ? "sunder" : planned ? "horizon" : null;
          if (feat && !feats.includes(feat)) {
            feats.push(feat);
            gold += FEATS.find((f) => f.id === feat)?.gold ?? 5;
          }
          return {
            busy: false,
            working: [],
            messages: [...s.messages, ...extra],
            files: local.files ?? s.files,
            events: [...s.events, ...local.events].slice(-40),
            selectedRole: local.speaker,
            speech: extra.at(-1)?.content ?? s.speech,
            gold,
            crewGold,
            feats,
            overlay: wroteDemo ? null : sundered ? "files" : planned ? "plan" : s.overlay,
            labPane: wroteDemo ? "run" : s.labPane,
            plan: local.plan.length ? local.plan : s.plan,
            checks: local.checks.length ? local.checks : s.checks,
            lastError: null,
            dockTab: wroteDemo ? "lab" : "chat",
            activeFile: wroteDemo ? "index.html" : s.activeFile,
            room: wroteDemo ? "compute" : s.room,
          };
        });

        const workers = Array.from(new Set(local.events.map((e) => e.actor)));
        if (workers.length) {
          set({ working: workers });
          window.setTimeout(() => set({ working: [] }), 2800);
        }
        if (local.events.some((e) => e.name === "arcade_spec")) {
          get().think("ship arcade cabinet");
        }
        return;
      }
      const history = get()
        .messages.filter((m) => m.id !== userMsg.id)
        .map(({ role, name, content }) => ({ role, name, content }));
      const result = await runNexusTurn({
        data: {
          message: text,
          history,
          files: get().files,
          plan: get().plan,
          shop: get().biz,
        },
      });
      if (!result.ok) {
        set({
          busy: false,
          working: [],
          lastError: result.error ?? "Turn failed",
          speech: result.error ?? "Something went wrong.",
          dockTab: "chat",
        });
        return;
      }
      const extra: ChatMessage[] = result.messages.map((m) => ({
        ...m,
        id: nid(),
        ts: Date.now(),
      }));
      const wrote = result.events.some((e) => e.name === "write_file");
      set((s) => ({
        busy: false,
        working: [],
        messages: [...s.messages, ...extra],
        files: result.files ?? s.files,
        events: [...s.events, ...result.events].slice(-40),
        selectedRole: result.speaker,
        speech: extra.at(-1)?.content ?? s.speech,
        gold: s.gold + (wrote ? 40 : 10),
        overlay: wrote ? null : s.overlay,
        labPane: wrote ? "run" : s.labPane,
        room: wrote ? "compute" : s.room,
        dockTab: wrote ? "lab" : s.dockTab,
        plan: result.plan.length ? result.plan : s.plan,
        checks: result.checks.length ? result.checks : s.checks,
        lastError: null,
      }));
      const workers = Array.from(new Set(result.events.map((e) => e.actor)));
      if (workers.length) {
        set({ working: workers });
        window.setTimeout(() => set({ working: [] }), 2800);
      }
      if (result.incomplete && !forced) {
        window.setTimeout(() => {
          void get().send("Continue the plan until tests pass. Do not wait.");
        }, 400);
      }
    } catch (e) {
      set({
        busy: false,
        working: [],
        lastError: e instanceof Error ? e.message : "Turn failed",
      });
    }
  },
  think: (goalArg) => {
    const goal =
      goalArg?.trim() ||
      get().goalDraft.trim() ||
      get().messages.filter((m) => m.role === "user").at(-1)?.content;
    if (!goal) {
      set({ lastError: "State an objective first.", speech: "Give me an objective first." });
      return;
    }
    const { reality, proposal, provenance } = doThink(goal, { path: "office" });
    set((s) => ({
      lastReality: reality,
      activeProposal: proposal,
      log: [...s.log, provenance],
      lastError: null,
      overlay: s.overlay,
      selectedNode: get().view === "command" ? "dec-horizon" : s.selectedNode,
      dockTab: "govern",
      goalDraft: "",
      speech: `${proposal.pathwayTitle ?? "Pathway"} ready. AUTH opens the gate.`,
    }));

  },
  authorize: () => {
    const p = get().activeProposal;
    if (!p) {
      set({ lastError: "Nothing to authorize. THINK first." });
      return;
    }
    const result = doAuth(p, "operator");
    if ("error" in result) {
      set({ lastError: result.error, speech: result.error });
      return;
    }
    set((s) => ({
      activeProposal: result.proposal,
      log: [...s.log, result.provenance],
      lastError: null,
      overlay: s.overlay,
      speech: "Authorized. COMMIT executes the pathway — fail-closed, hashed.",
    }));
  },
  commit: async () => {
    const p = get().activeProposal;
    if (!p) {
      set({ lastError: "Nothing to commit." });
      return;
    }
    const result = doCommit(p);
    if ("error" in result) {
      set((s) => ({
        lastError: result.error,
        speech: result.error,
        log: [...s.log, result.provenance],
      }));
      return;
    }
    set((s) => ({ tasks: [...s.tasks, result.task] }));
    await applyRun(result.proposal, [result.provenance]);
    set((s) => ({
      queue: hydrateQueue(s.queue).filter((p) => p.proposal.id !== result.proposal.id),
    }));
  },
  resetCycle: () =>
    set((s) => ({
      activeProposal: null,
      lastReality: null,
      lastError: null,
      speech: "Gate cleared. State a new order.",
      selectedNode: null,
      queue: hydrateQueue(s.queue).filter((p) => p.proposal.id !== s.activeProposal?.id),
    })),
  setView: (v) => set({ view: v, overlay: null, selectedNode: null }),
  selectNode: (id) => set({ selectedNode: id }),
  spawnWorker: (role) => {
    set({ selectedRole: role, working: [role], speech: `${role} spawned onto the objective.` });
    window.setTimeout(() => set({ working: [] }), 3200);
  },
  setBiz: (p) =>
    set((s) => ({
      biz: hydrateBiz({
        ...s.biz,
        ...p,
        rails: { ...s.biz.rails, ...(p.rails ?? {}) },
        rules: p.rules ? { ...s.biz.rules, ...p.rules } : s.biz.rules,
      }),
    })),
  setRules: (p) =>
    set((s) => {
      const biz = hydrateBiz(s.biz);
      const rules = hydrateRules({ ...biz.rules, ...p });
      return {
        biz: { ...biz, rules },
        speech: `Plant rule · ${rules.sku} LOW AT ${rules.lowAt} BUY ${rules.restockQty} IN ${rules.inboundQty}. Local ledger.`,
      };
    }),
  setLabPane: (p) => set({ labPane: p, overlay: "ide", dockTab: "lab" }),
  setDockTab: (t) => set({ dockTab: t }),
  publishShop: () => {
    const files = shopFiles(get().biz);
    const tested = testLab(files, get().biz);
    set({
      files,
      activeFile: "index.html",
      room: "compute",
      overlay: null,
      labPane: "run",
      dockTab: "lab",
      working: ["engineer", "cpo"],
      speech: tested.ok
        ? "Shop published into the lab. RUN is live. TEST passed."
        : "Shop published. TEST found gaps — open TEST.",
      biz: { ...get().biz, lastTest: { ...tested, ts: Date.now() } },
    });
    window.setTimeout(() => set({ working: [] }), 2800);
  },
  runLabTests: () => {
    const tested = testLab(get().files, get().biz);
    set({
      room: "compute",
      overlay: null,
      labPane: "test",
      dockTab: "lab",
      checks: tested.checks.map((c) => `${c.ok ? "PASS" : "FAIL"} ${c.name}`),
      biz: { ...get().biz, lastTest: { ...tested, ts: Date.now() } },
      working: ["qa"],
      speech: tested.ok ? "QA: lab checks passed. You can RUN." : "QA: a check failed. Fix the lab.",
    });
    window.setTimeout(() => set({ working: [] }), 2200);
  },
  paperFill: async (symbol, side, qty) => {
    if (get().biz.halted) {
      set({ lastError: "desk is halted — resume first", speech: "Desk is halted. Resume before paper fills." });
      return;
    }
    const price = await fetchSpot(symbol);
    const q = Math.max(0.0001, qty);
    const goldDelta = side === "sell" ? Math.round(price * q * 0.002) : -Math.round(price * q * 0.002);
    const fill = {
      id: nid(),
      symbol: symbol.toUpperCase(),
      side,
      qty: q,
      price,
      ts: Date.now(),
    };
    set((s) => {
      const gold = Math.max(0, s.gold + goldDelta);
      const biz = hydrateBiz(s.biz);
      const peak = Math.max(biz.peakGold ?? gold, gold);
      const drawdown = peak > 0 ? Math.max(0, (peak - gold) / peak) : 0;
      return {
        gold,
        working: ["cpo", "operator"],
        speech: `Paper ${side} ${q} ${symbol.toUpperCase()} @ ${price.toFixed(2)}. Not a live broker.`,
        biz: {
          ...biz,
          peakGold: peak,
          drawdown,
          halted: biz.halted || drawdown > DRAWDOWN_LIMIT,
          lastSpot: { symbol: symbol.toUpperCase(), price, ts: Date.now() },
          fills: [fill, ...biz.fills].slice(0, 24),
        },
      };
    });
    window.setTimeout(() => set({ working: [] }), 2200);
  },
  armWatch: (id, armed) => {
    const def = WATCH_DEFS.find((w) => w.id === id);
    if (!def) return;
    set((s) => {
      const watches = hydrateWatches(s.biz.watches);
      watches[id] = { ...watches[id], armed, lastReason: armed ? "armed" : "cold" };
      return {
        biz: { ...hydrateBiz(s.biz), watches },
        speech: armed
          ? `${def.title} armed. ${s.biz.autoOps ? "AUTO AUTH. COMMIT needs a signed rule or you." : "It will stage a packet. AUTH is crew. COMMIT is you unless a signed cap matches."}`
          : `${def.title} cold.`,
        dockTab: "govern",
        feats: !armed || (s.feats ?? []).includes("watch") ? s.feats : [...(s.feats ?? []), "watch"],
        gold: !armed || (s.feats ?? []).includes("watch") ? s.gold : s.gold + 3,
      };
    });
  },
  inbound: async (qty) => {
    const biz = hydrateBiz(get().biz);
    const n = Math.max(1, Math.floor(qty ?? biz.rules.inboundQty));
    const hint = inboundHint(n, biz.rules.sku);
    const s = get();
    if (s.busy) return;
    if (s.activeProposal && !s.activeProposal.executed && !s.biz.autoOps) {
      set({ lastError: "Commit or CLEAR the open proposal first.", speech: "A proposal is already on the gate." });
      return;
    }
    if (s.biz.autoOps) {
      await get().stageCrew("nyx", hint);
      return;
    }
    get().think(hint);
    set({ speech: `Inbound ${n} ${biz.rules.sku}. AUTH to fulfill. Short parks a HOLD. Not Shopify.` });
  },
  tickPlant: async () => {
    const s = get();
    if (s.busy) return;
    const biz = hydrateBiz(s.biz);
    const fires = evaluateWatches({
      stock: biz.stock,
      lastScan: biz.lastScan,
      watches: biz.watches,
      rules: biz.rules,
      holds: biz.orders ?? [],
      now: Date.now(),
      halted: biz.halted,
    });
    const hit = fires[0];
    if (!hit) {
      set({ lastWatchAt: Date.now() });
      return;
    }
    const stager: StagerId = hit.id === "stock_low" || hit.id === "drain" ? "nyx" : "vex";
    if (alreadyQueued(hydrateQueue(s.queue), stager, "restock") && hit.id === "stock_low") return;
    const watches = hydrateWatches(biz.watches);
    watches[hit.id] = { ...watches[hit.id], lastFire: Date.now(), lastReason: hit.reason };
    set({ biz: { ...biz, watches }, lastWatchAt: Date.now() });
    await get().stageCrew(stager, hit.hint);
  },
  setRoom: (r) => {
    const raw = isRoomId(r) ? r : "office";
    const id = canonicalRoom(raw);
    const hall = ROOMS[id];
    const club = hydrateClub(get().club);
    set({
      room: id,
      overlay: null,
      playingId: null,
      speech: hall.speech,
      dockTab: hall.dock,
      club,
    });
  },
  playCabinet: (id) => {
    set((s) => {
      const club = hydrateClub(s.club);
      const plays = club.plays + 1;
      const firstRat = plays >= 10 && !(s.feats ?? []).includes("rat");
      return {
        room: "arcade",
        dockTab: "lab",
        playingId: id,
        overlay: null,
        club: { ...club, plays },
        feats: firstRat ? [...(s.feats ?? []), "rat"] : s.feats,
        gold: firstRat ? s.gold + 5 : s.gold,
        speech: firstRat ? "ACHIEVEMENT · Arcade rat." : s.speech,
      };
    });
  },
  closeCabinet: () => set({ playingId: null }),
  setClubZone: (z) =>
    set((s) => ({
      club: { ...hydrateClub(s.club), zone: z },
      speech: CLUB_SPEECH[z],
      dockTab: "chat",
    })),
  setTube: (id) => set((s) => ({ club: { ...hydrateClub(s.club), tubeId: id } })),
  setTune: (id) => set((s) => ({ club: { ...hydrateClub(s.club), lastTune: id } })),
  recordScore: (row) => {
    set((s) => {
      const club = pushScore(hydrateClub(s.club), { ...row, ts: Date.now() });
      const cabinets = hydrateCabinets(s.biz.cabinets).map((c) =>
        c.id === row.game || c.engine === row.game ? { ...c, hi: Math.max(c.hi, row.score) } : c,
      );
      const firstRat = club.plays >= 10 && !(s.feats ?? []).includes("rat");
      return {
        club,
        biz: { ...hydrateBiz(s.biz), cabinets },
        feats: firstRat ? [...(s.feats ?? []), "rat"] : s.feats,
        gold: firstRat ? s.gold + 5 : s.gold,
        speech: firstRat ? "ACHIEVEMENT · Arcade rat." : s.speech,
      };
    });
  },
  recordDuel: (row) => set((s) => ({ club: pushDuel(hydrateClub(s.club), row) })),
  tickArcade: async () => {
    const s = get();
    if (s.busy) return;
    const biz = hydrateBiz(s.biz);
    const cabinets = hydrateCabinets(biz.cabinets);
    if (cabinets.length >= CABINET_CAP) return;
    if (alreadyQueued(hydrateQueue(s.queue), "rix", "arcade_ship")) return;
    const wait = s.room === "arcade" ? 18_000 : 48_000;
    if (!biz.lastCabinetAt) {
      set({ biz: { ...biz, lastCabinetAt: Date.now() } });
      return;
    }
    if (Date.now() - biz.lastCabinetAt < wait) return;
    set({ biz: { ...biz, lastCabinetAt: Date.now() } });
    await get().stageCrew("rix", "ship arcade cabinet");
  },
  tickHal: async () => {
    const s = get();
    if (s.busy) return;
    const biz = hydrateBiz(s.biz);
    const holds = (biz.orders ?? []).filter((o) => o.status === "held");
    if (!holds.length) return;
    if (alreadyQueued(hydrateQueue(s.queue), "hal", "drain_holds")) return;
    await get().stageCrew("hal", "drain held orders");
  },
  tickLab: () => {
    const s = get();
    if (s.busy || !s.labDirtyAt) return;
    if (Date.now() - s.labDirtyAt < 1400) return;
    const tested = testLab(s.files, s.biz);
    set({
      labDirtyAt: 0,
      labPane: "test",
      checks: tested.checks.map((c) => `${c.ok ? "PASS" : "FAIL"} ${c.name}`),
      biz: { ...hydrateBiz(s.biz), lastTest: { ...tested, ts: Date.now() } },
      working: ["qa"],
      speech: tested.ok
        ? "NYX: lab checks passed. RIX may stage a sandbox cabinet."
        : "NYX: a check failed. Repair is LAB. Nothing staged.",
    });
    window.setTimeout(() => set({ working: [] }), 2200);
    if (tested.ok) void get().stageCrew("rix", "ship arcade cabinet");
  },
  stageCrew: async (stager, goal) => {
    const s = get();
    const biz = hydrateBiz(s.biz);
    const policies = hydratePolicies(s.policies);
    const queue = hydrateQueue(s.queue);
    const job = STAGER_JOB[stager];
    const hint = goal?.trim() || job.hint(biz.rules.sku, biz.rules.restockQty);
    const drafted = draftStage(hint, stager, job.reason, job.origin, policies);
    if ("error" in drafted) {
      set({ lastError: drafted.error, speech: drafted.error });
      return;
    }
    if (drafted.packet.pathway === "sesa_cycle" || drafted.packet.pathway === "sesa_revert") {
      drafted.packet.origin = "compute";
      drafted.packet.reason =
        drafted.packet.pathway === "sesa_revert"
          ? "Snap to last verified manifold."
          : "VSA bind. SMT first. Ring waits on COMMIT.";
    }
    if (alreadyQueued(queue, stager, drafted.packet.pathway)) {
      set({ speech: `${STAGER_NAME[stager]} already has a packet on the desk.` });
      return;
    }
    try {
      drafted.packet.hash = await sha256Hex(
        JSON.stringify({ goal: drafted.packet.goal, pathway: drafted.packet.pathway, stager }),
      );
    } catch {
      drafted.packet.hash = drafted.packet.id;
    }
    const auto = canAutoCommit(drafted.packet.goal, drafted.packet.pathway, policies, biz.autoOps);
    const occupy = !s.activeProposal || s.activeProposal.executed;
    const nextFeats = [...(s.feats ?? [])];
    let gold = s.gold;
    if (!nextFeats.includes("stage")) {
      nextFeats.push("stage");
      gold += 3;
    }
    set({
      queue: [...queue, drafted.packet].slice(0, 8),
      log: [...s.log, drafted.thinkLog, drafted.authLog],
      activeProposal: occupy ? drafted.packet.proposal : s.activeProposal,
      dockTab: "govern",
      overlay: null,
      selectedRole: STAGER_ROLE[stager],
      working: [STAGER_ROLE[stager]],
      feats: nextFeats,
      gold,
      lastError: null,
      speech: auto
        ? `${STAGER_NAME[stager]} AUTH. Signed rule ${drafted.packet.policyId}. COMMIT under policy.`
        : `${STAGER_NAME[stager]} staged ${drafted.packet.title}. AUTH done. GOVERN holds COMMIT.`,
    });
    window.setTimeout(() => set({ working: [] }), 2800);
    if (auto) await get().commitPacket(drafted.packet.id);
  },
  pickPacket: (id) => {
    const packet = hydrateQueue(get().queue).find((p) => p.id === id);
    if (!packet) return;
    set({
      activeProposal: packet.proposal,
      dockTab: "govern",
      selectedRole: STAGER_ROLE[packet.stager],
      speech: `${STAGER_NAME[packet.stager]} · ${packet.title}. COMMIT or CLEAR.`,
    });
  },
  commitPacket: async (id) => {
    const s = get();
    const packet = hydrateQueue(s.queue).find((p) => p.id === id);
    if (!packet) return;
    const done = doCommit(packet.proposal);
    if ("error" in done) {
      set({ lastError: done.error, speech: done.error });
      return;
    }
    set((st) => ({
      tasks: [...st.tasks, done.task],
      queue: hydrateQueue(st.queue).filter((p) => p.id !== id),
    }));
    await applyRun(done.proposal, [done.provenance]);
  },
  commitAll: async () => {
    const s = get();
    const open = hydrateQueue(s.queue).filter((p) => p.proposal.authorized && !p.proposal.executed).slice(0, 4);
    const active = s.activeProposal;
    if (active && active.authorized && !active.executed && !open.some((p) => p.proposal.id === active.id)) {
      await get().commit();
    }
    for (const p of open) {
      if (get().busy) return;
      await get().commitPacket(p.id);
    }
  },
  authAll: () => {
    const s = get();
    const extra: ProvenanceEntry[] = [];
    const queue = hydrateQueue(s.queue).map((p) => {
      if (p.proposal.authorized || p.proposal.executed) return p;
      const auth = doAuth(p.proposal, `AUTH_${STAGER_NAME[p.stager]}_DRAFT`);
      if ("error" in auth) return p;
      extra.push(auth.provenance);
      return { ...p, proposal: auth.proposal, autoAuth: true as const };
    });
    let active = s.activeProposal;
    if (active && !active.authorized && !active.executed) {
      const auth = doAuth(active, "operator");
      if (!("error" in auth)) {
        active = auth.proposal;
        extra.push(auth.provenance);
      }
    }
    set({
      queue,
      activeProposal: active,
      log: extra.length ? [...s.log, ...extra] : s.log,
      lastError: null,
      speech: "AUTH ALL. COMMIT still waits in GOVERN.",
      dockTab: "govern",
    });
  },
  dropPacket: (id) => {
    set((s) => {
      const queue = hydrateQueue(s.queue);
      const dropped = queue.find((p) => p.id === id);
      return {
        queue: queue.filter((p) => p.id !== id),
        activeProposal: dropped && s.activeProposal?.id === dropped.proposal.id ? null : s.activeProposal,
        lastError: null,
        speech: "Packet dropped. Nothing executed.",
      };
    });
  },
  signPolicy: (id, signed) => {
    set((s) => {
      const policies = hydratePolicies(s.policies).map((p) => (p.id === id ? { ...p, signed } : p));
      const nextFeats = [...(s.feats ?? [])];
      let gold = s.gold;
      if (signed && !nextFeats.includes("policy")) {
        nextFeats.push("policy");
        gold += 5;
      }
      return {
        policies,
        feats: nextFeats,
        gold,
        speech: signed ? `Rule ${id} signed. AUTO may COMMIT only inside this cap.` : `Rule ${id} cold. AUTO AUTH only.`,
        dockTab: "govern",
      };
    });
  },
  clearQueue: () =>
    set({
      queue: [],
      activeProposal: null,
      lastReality: null,
      lastError: null,
      speech: "Queue cleared. You hold the key.",
    }),
  toggleAuto: () =>
    set((s) => {
      const biz = hydrateBiz(s.biz);
      const on = !biz.autoOps;
      return {
        biz: { ...biz, autoOps: on },
        speech: on
          ? "AUTO AUTH. COMMIT only inside a signed cap. Cabinets never auto."
          : "AUTO off. Crew can still stage. You COMMIT.",
        dockTab: "govern",
      };
    }),
  encodeSesa: (key) =>
    set((s) => {
      const biz = hydrateBiz(s.biz);
      const sesa = rememberSymbol(hydrateSesa(biz.sesa), key);
      return {
        biz: { ...biz, sesa },
        speech: sesa.telemetry[0] ?? `Encoded ${key}. Workspace only.`,
        room: "core",
        dockTab: "govern",
      };
    }),
  pickSesa: (intent, action) =>
    set((s) => {
      const biz = hydrateBiz(s.biz);
      const sesa = setPair(hydrateSesa(biz.sesa), intent, action);
      return { biz: { ...biz, sesa }, room: "core" };
    }),
  previewSesa: (intent, action) =>
    set((s) => {
      const biz = hydrateBiz(s.biz);
      const cur = hydrateSesa(biz.sesa);
      const sesa = previewBind(cur, intent ?? cur.intent, action ?? cur.action);
      return {
        biz: { ...biz, sesa },
        speech: sesa.preview?.ok
          ? `SMT pass · ${sesa.preview.intent}⊗${sesa.preview.action} · ${sesa.preview.cohesion.toFixed(4)}. STAGE to GOVERN.`
          : sesa.preview?.pruned.join("; ") ?? "SMT refuse.",
        room: "core",
        dockTab: "govern",
      };
    }),
  replaySesa: (idx) =>
    set((s) => {
      const biz = hydrateBiz(s.biz);
      const sesa = loadFrame(hydrateSesa(biz.sesa), idx);
      return {
        biz: { ...biz, sesa },
        speech: sesa.telemetry[0] ?? `Replayed frame ${idx}. Workspace only.`,
        room: "core",
        dockTab: "govern",
      };
    }),
  };
    },
    {
      name: "adl-nexus",
      partialize: (s) => ({
        gold: s.gold,
        files: s.files,
        activeFile: s.activeFile,
        log: s.log.slice(-40),
        tasks: s.tasks,
        plan: s.plan,
        messages: s.messages.slice(-24),
        biz: s.biz,
        lastRun: s.lastRun ?? null,
        runs: (s.runs ?? []).slice(0, 12),
        feats: (s.feats ?? []).slice(0, 32),
        crewGold: s.crewGold ?? 0,
        light: s.light ?? "on",
        briefed: s.briefed ?? false,
        club: s.club,
        queue: hydrateQueue(s.queue),
        policies: hydratePolicies(s.policies),

      }),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<NexusState> & { dim?: boolean };
        const light = p.light ?? (p.dim ? "dim" : "on");
        return {
          ...current,
          ...p,
          biz: hydrateBiz(p.biz),
          feats: p.feats ?? [],
          crewGold: p.crewGold ?? 0,
          briefed: p.briefed ?? false,
          club: hydrateClub((p as Partial<NexusState>).club),
          queue: hydrateQueue((p as Partial<NexusState>).queue),
          policies: hydratePolicies((p as Partial<NexusState>).policies),
          light,

          dim: light === "dim",
        };
      },
    },
  ),
);
