import type { OverlayId } from "./room";

export type CodexTier = 1 | 2 | 3 | 4 | 5;
export type CodexStatus = "live" | "local" | "capped";

export type CodexItem = {
  id: string;
  tier: CodexTier;
  title: string;
  status: CodexStatus;
  object: string;
  claim: string;
  overlay?: OverlayId;
  think?: string;
  send?: string;
  feat?: string;
};

export type FeatDef = { id: string; title: string; gold: number };

export const FEATS: FeatDef[] = [
  { id: "sip", title: "First sip", gold: 1 },
  { id: "timer", title: "Stopwatch", gold: 2 },
  { id: "sky", title: "Looked outside", gold: 2 },
  { id: "commit", title: "First commit", gold: 5 },
  { id: "build", title: "Shipped a lab demo", gold: 8 },
  { id: "sunder", title: "SCAN SNAP SUNDER", gold: 5 },
  { id: "horizon", title: "Horizon locked", gold: 5 },
  { id: "drain", title: "Drained a hold", gold: 5 },
  { id: "shop", title: "Shop in the lab", gold: 5 },
  { id: "qa", title: "QA signed", gold: 3 },
  { id: "paper", title: "Paper fill", gold: 3 },
  { id: "arcade", title: "Arcade coin", gold: 2 },
  { id: "cabinet", title: "Shipped a cabinet", gold: 8 },
  { id: "watch", title: "Armed a watch", gold: 3 },
  { id: "show", title: "First tape", gold: 2 },
  { id: "tube", title: "First portal", gold: 2 },
  { id: "duel", title: "Sat across the board", gold: 3 },
  { id: "bout", title: "Crew bout", gold: 5 },
  { id: "champ", title: "Beat an agent", gold: 8 },
  { id: "tune", title: "Jukebox drop", gold: 2 },
  { id: "steam", title: "Lounge handoff", gold: 2 },
  { id: "rat", title: "Arcade rat", gold: 5 },
  { id: "proof", title: "Opened the gate", gold: 2 },
  { id: "stage", title: "Crew staged a packet", gold: 3 },
  { id: "policy", title: "Signed a standing rule", gold: 5 },
  { id: "sesa", title: "SESA cycle", gold: 8 },
  { id: "merkle", title: "Merkle checkpoint", gold: 5 },
];

export const CODEX: CodexItem[] = [
  { id: "time", tier: 1, title: "Time & date", status: "live", object: "Clock", claim: "Wall clock + world cities.", overlay: "clock" },
  { id: "stopwatch", tier: 1, title: "Stopwatch", status: "live", object: "Clock", claim: "Start / stop on the clock desk.", overlay: "clock", feat: "timer" },
  { id: "weather", tier: 1, title: "Live weather", status: "live", object: "Window", claim: "Open-Meteo. Default Nassau.", overlay: "weather", feat: "sky" },
  { id: "notes", tier: 1, title: "Notes & net", status: "live", object: "Books", claim: "Shelf + public web search.", overlay: "library" },
  { id: "lamp", tier: 1, title: "Floor lights", status: "live", object: "Lamp", claim: "On → night → ops phosphor." },
  { id: "mug", tier: 1, title: "Sip for gold", status: "live", object: "Mug", claim: "+1 gold. Break authorized.", feat: "sip" },
  { id: "search", tier: 1, title: "Web search", status: "live", object: "Books / chat", claim: "Reception searches live.", overlay: "library" },
  { id: "board", tier: 1, title: "Horizon board", status: "live", object: "Board", claim: "THINK / AUTH / COMMIT columns.", overlay: "plan" },
  { id: "ide", tier: 1, title: "Lab IDE", status: "live", object: "Monitor", claim: "Edit, TEST, RUN in-office.", overlay: "ide" },
  { id: "files", tier: 1, title: "Provenance", status: "live", object: "Files", claim: "Hashed runs, HOLD.md, AUDIT.md. Own hall.", overlay: "files" },
  { id: "proof", tier: 1, title: "Security center", status: "live", object: "Files", claim: "Last hash, lab checks, halt. Repair is LAB. AUTH stays in GOVERN.", send: "take me to the proof room", feat: "proof" },
  { id: "build", tier: 2, title: "Build a page", status: "live", object: "Engineer", claim: "Chat: plan, write lab files, QA.", send: "Build a landing page in the lab IDE with a heading, three cards, and a working button. Finish the tests." },
  { id: "assign", tier: 2, title: "Assign crew", status: "live", object: "PM", claim: "THINK assigns. You still hold COMMIT.", think: "assign the objective" },
  { id: "preview", tier: 2, title: "Live preview", status: "live", object: "Monitor", claim: "RUN pane renders the lab.", overlay: "ide" },
  { id: "tests", tier: 2, title: "Lab tests", status: "live", object: "QA", claim: "Deterministic file checks.", overlay: "ide" },
  { id: "handoff", tier: 2, title: "Agent handoff", status: "live", object: "Crew", claim: "Named crew walks ChatDev beats." },
  { id: "persist", tier: 2, title: "Save / load", status: "live", object: "Desk", claim: "Saved on this browser. A carry file moves the desk and the lab. Tokens stay here." },
  { id: "plant", tier: 2, title: "Plant board", status: "live", object: "Hologram", claim: "Rules, watches, holds, inbound.", overlay: "sim" },
  { id: "shop", tier: 2, title: "Publish shop", status: "local", object: "Phone", claim: "Your rails. We don't take money.", overlay: "biz", feat: "shop" },
  { id: "youtube", tier: 3, title: "Local video demo", status: "live", object: "Engineer", claim: "Floorcast in the lab. Not YouTube.", send: "Build a video grid demo in the lab IDE with search, a player, a sidebar, and comments. Local sample data. Finish the tests.", feat: "build" },
  { id: "plan", tier: 3, title: "Long-horizon plan", status: "live", object: "PM", claim: "Owners + tests on the board.", send: "plan a social network", feat: "horizon" },
  { id: "collab", tier: 3, title: "Crew collaboration", status: "live", object: "Floor", claim: "Walk, talk, handoff. Supervised." },
  { id: "auto", tier: 3, title: "AUTO OPS", status: "local", object: "Plant", claim: "AUTO may AUTH. COMMIT needs a signed rule or you.", overlay: "sim" },
  { id: "stage", tier: 3, title: "Crew staging", status: "live", object: "Govern", claim: "NYX and RIX THINK + AUTH. Packets wait in GOVERN unless a signed cap matches.", feat: "stage" },
  { id: "policy", tier: 3, title: "Standing rules", status: "live", object: "Govern", claim: "Sign a cap. Restock ≤ 10 can auto-COMMIT. Cabinets never do.", feat: "policy" },
  { id: "audit", tier: 3, title: "Audit pack", status: "local", object: "QA", claim: "Hashed dump. Not a filing.", think: "generate audit pack" },
  { id: "memory", tier: 3, title: "Clean-room memory", status: "local", object: "Files", claim: "SHA-256 records. Local only.", overlay: "files" },
  { id: "arcade", tier: 3, title: "Arcade hall", status: "live", object: "Cabinet", claim: "Own room. RIX forges a new machine on COMMIT.", overlay: "arcade", feat: "arcade" },
  { id: "holdgate", tier: 3, title: "Hold the gate", status: "live", object: "Arcade", claim: "NYX. Place towers. Leaks are unauthorized executes.", overlay: "arcade" },
  { id: "theater", tier: 3, title: "Entertainment wing", status: "live", object: "Lounge", claim: "SHOW: tapes, YouTube portal, chess, jukebox, Steam handoff. Optional.", send: "take me to the theater" },
  { id: "tube", tier: 3, title: "YouTube portal", status: "live", object: "Theater", claim: "Official embed. Paste a public URL. We don't host the file.", send: "open youtube", feat: "tube" },
  { id: "duel", tier: 3, title: "Chess duel", status: "live", object: "Theater", claim: "Unicode board. You vs an agent. No AUTH.", send: "challenge NYX to chess", feat: "duel" },
  { id: "snake", tier: 3, title: "Wire snake", status: "live", object: "Arcade", claim: "HAL on the wire. A left, D right.", overlay: "arcade" },
  { id: "drift", tier: 3, title: "Rock drift", status: "live", object: "Arcade", claim: "A yaws left. D yaws right. W thrust. FIRE.", overlay: "arcade" },
  { id: "bout", tier: 3, title: "Crew tourney", status: "live", object: "Theater", claim: "Packet pong. Two crew, first to 3. Hashed.", send: "run a crew tournament", feat: "bout" },
  { id: "jukebox", tier: 3, title: "Jukebox", status: "live", object: "Theater", claim: "Original chips. No licensed catalog.", send: "play the jukebox", feat: "tune" },
  { id: "steam_lounge", tier: 3, title: "Steam lounge", status: "live", object: "Theater", claim: "Authorized store handoff. Nexus does not ship Steam binaries.", send: "steam lounge", feat: "steam" },
  { id: "exchange", tier: 3, title: "Exchange", status: "live", object: "Phone", claim: "Paper trade + auto plant. AUTH in GOVERN.", overlay: "biz" },
  { id: "study", tier: 1, title: "Study library", status: "live", object: "Books", claim: "Own room. Shelf + net search.", overlay: "library" },
  { id: "compute", tier: 1, title: "Computer room", status: "live", object: "Monitor", claim: "Own room. Edit, TEST, RUN.", overlay: "ide" },
  { id: "sesa", tier: 2, title: "SESA core", status: "live", object: "CORE", claim: "VSA D=10000 bind + SMT cohesion ≥ 0.95. Ring dispatch needs COMMIT.", send: "take me to nexus core", feat: "sesa" },
  { id: "vsa", tier: 2, title: "Hypervector memory", status: "live", object: "CORE", claim: "Bipolar item memory. Encode is workspace. Cycle is the state graph." },
  { id: "encode", tier: 2, title: "Encode symbol", status: "live", object: "CORE", claim: "Perception. FNV+xorshift bipolar D=10000. Same key, same vector." },
  { id: "smt", tier: 2, title: "SMT / AC-3 gate", status: "live", object: "CORE", claim: "Unknown symbols, lock, or cohesion < 0.95 prune the candidate. Zero silent dispatch." },
  { id: "recall", tier: 2, title: "Associative recall", status: "live", object: "CORE", claim: "Cosine nearest-neighbor against item memory after bind." },
  { id: "dual", tier: 2, title: "Dual-reality paper", status: "local", object: "CORE", claim: "Workspace vs verified manifold. 2D paper, not Godot DLRSE." },
  { id: "ring", tier: 3, title: "IPC ring buffer", status: "local", object: "CORE", claim: "In-process replay. Not mmap, not sub-microsecond. Deterministic on this device." },
  { id: "replay", tier: 3, title: "Replay frame", status: "local", object: "CORE", claim: "Tap a ring frame to load it back into the workspace. Ring stays." },
  { id: "triage", tier: 3, title: "Triage interceptor", status: "local", object: "CORE", claim: "Memory estimate, lock, cohesion, merkle. Not a process-tree PowerShell." },
  { id: "merkle", tier: 3, title: "Revert token", status: "local", object: "CORE", claim: "Local merkle over committed leaves. Not a deployed Solidity contract.", think: "sesa revert", feat: "merkle" },
  { id: "godot", tier: 4, title: "Godot 4 DLRSE", status: "capped", object: "CORE", claim: "Graph kernel is 2D paper. No GDExtension runtime here." },
  { id: "dao", tier: 4, title: "On-chain DAO", status: "capped", object: "CORE", claim: "Governor is you. Merkle is local. No live chain." },
  { id: "refactor", tier: 3, title: "SCAN SNAP SUNDER", status: "local", object: "CPO", claim: "Lab grep + rewrite. No silent repo rewrite.", send: "sunder the lab", feat: "sunder" },
  { id: "fullstack", tier: 4, title: "Full-stack + auth", status: "capped", object: "CTO", claim: "Lab can edit, test, and run. Account reads need a token you paste. No sign-in that follows you." },
  { id: "voice", tier: 4, title: "Voice office", status: "capped", object: "Reception", claim: "Type. No mic runtime here." },
  { id: "hologram3d", tier: 4, title: "3D SIM cube", status: "capped", object: "Hologram", claim: "Plant board is 2D. No WebGL twin." },
  { id: "apk", tier: 4, title: "Mobile APK", status: "capped", object: "Monitor", claim: "This floor is a web office." },
  { id: "mltrain", tier: 4, title: "Train a net", status: "capped", object: "Monitor", claim: "Not TensorFlow. Paper indicators only." },
  { id: "autonomy", tier: 5, title: "24h unsupervised", status: "capped", object: "All", claim: "Fail-closed. You hold COMMIT." },
  { id: "evolve", tier: 5, title: "Agents rewrite themselves", status: "capped", object: "CTO", claim: "Not this runtime." },
];

export function inspectCodex() {
  return CODEX.map((c) => `${c.id} · T${c.tier} · ${c.status} · ${c.title} · ${c.object} · ${c.claim}`).join("\n");
}

export function inspectCatalog() {
  const halls = [
    "WORK · counter · write, check, draw, clip",
    "SELL · plant and /shop · Cash App. Mark paid only after the money is there",
    "BUILD · lab · write and test. Host only when you say so",
    "DESK · trade · paper until COMMIT",
    "SUPPORT · arcade and lounge · play and watch",
    "PROOF · the record",
    "CORE · SESA · a proof when you ask",
  ];
  const desk = [
    "Exact: base64, hash, JSON, JWT, html escape, count, calc, sort, unique, reverse, date. Signature on a JWT is not checked.",
    "Copy keeps the answer. Use puts it back in the box.",
    "Write, Explain, Translate, Code, Draw, and Clip call the model. Draw makes a picture. Clip makes a short video and the link expires. If the model does not answer, Write cleans the text, Explain gives the shape, Code opens a lab page, and Sum returns an extract. Translate will not invent the wording.",
    "A carry file moves the counter and the lab to another browser. Tokens are not in the file.",
  ];
  const govern = [
    "THINK → AUTH → COMMIT. CLEAR aborts.",
    "NYX / RIX / HAL stage packets. COMMIT is you unless a signed cap matches.",
    "SESA cycle and SESA revert never auto-COMMIT.",
    "Halt freezes the desk and the SESA lock. Resume lifts both.",
  ];
  const live = CODEX.filter((c) => c.status === "live");
  const local = CODEX.filter((c) => c.status === "local");
  const capped = CODEX.filter((c) => c.status === "capped");
  return [
    `ADL NEXUS catalog · ${live.length} live · ${local.length} local · ${capped.length} capped`,
    "",
    "HALLS",
    ...halls.map((h) => `· ${h}`),
    "",
    "GOVERN",
    ...govern.map((g) => `· ${g}`),
    "",
    "DESK",
    ...desk.map((d) => `· ${d}`),
    "",
    "LIVE",
    ...live.map((c) => `· T${c.tier} ${c.title} — ${c.claim}`),
    "",
    "LOCAL (this device, honest caps)",
    ...local.map((c) => `· T${c.tier} ${c.title} — ${c.claim}`),
    "",
    "CAPPED (not this runtime)",
    ...capped.map((c) => `· T${c.tier} ${c.title} — ${c.claim}`),
  ].join("\n");
}

export function liveCount() {
  return CODEX.filter((c) => c.status === "live").length;
}

export function featTitle(id: string) {
  return FEATS.find((f) => f.id === id)?.title ?? id;
}
