import type { OverlayId } from "./room.ts";
import type { RoleId } from "./types.ts";

export type Beat = {
  from: RoleId;
  to: RoleId;
  phase: string;
  text: string;
  reply: string;
};

export type CrewSoul = {
  name: string;
  title: string;
  job: string;
  tag: string;
  tap: string;
  work: string;
};

export const CREW: Record<RoleId, CrewSoul> = {
  operator: {
    name: "MOLT",
    title: "Operator / Reception",
    job: "Gate",
    tag: "MOLT",
    tap: "You hold the key. GOVERN is THINK → AUTH → COMMIT.",
    work: "Routing. Not executing.",
  },
  engineer: {
    name: "RIX",
    title: "Engineer",
    job: "Lab",
    tag: "RIX",
    tap: "I compile and AUTH the sandbox. GOVERN still ships.",
    work: "On the files.",
  },
  cpo: {
    name: "VEX",
    title: "Chief Product Officer",
    job: "Plant / scope",
    tag: "VEX",
    tap: "Smallest ship that still sells. Paper / local.",
    work: "Cutting scope.",
  },
  pm: {
    name: "HAL",
    title: "Project Manager",
    job: "Board",
    tag: "HAL",
    tap: "Owners first. Then the board. Nothing silent.",
    work: "Owners on the board.",
  },
  qa: {
    name: "NYX",
    title: "Quality Assurance",
    job: "Proof",
    tag: "NYX",
    tap: "I stage the packet. You COMMIT. Signed cache can run itself.",
    work: "Checking the hash.",
  },
  ceo: {
    name: "ASH",
    title: "Chief Executive Officer",
    job: "Horizon",
    tag: "ASH",
    tap: "You own COMMIT. I don't.",
    work: "Watching the gate.",
  },
  cto: {
    name: "KITE",
    title: "Chief Technology Officer",
    job: "Version",
    tag: "KITE",
    tap: "Hash the lab. Rollback is local.",
    work: "Versioning.",
  },
};

export const CREW_CLASS: Record<RoleId, string> = {
  operator: "crew-molt",
  engineer: "crew-rix",
  cpo: "crew-vex",
  pm: "crew-hal",
  qa: "crew-nyx",
  ceo: "crew-ash",
  cto: "crew-kite",
};

export const CREW_FILTER: Record<RoleId, string> = {
  operator: "saturate(0.4) brightness(1.06)",
  engineer: "hue-rotate(155deg) saturate(0.72)",
  cpo: "hue-rotate(-16deg) saturate(0.88)",
  pm: "hue-rotate(88deg) saturate(0.62)",
  qa: "hue-rotate(36deg) saturate(0.92) brightness(1.05)",
  ceo: "hue-rotate(205deg) saturate(0.5)",
  cto: "hue-rotate(255deg) saturate(0.52)",
};

export const FLOOR_LINE: Record<RoleId, string> = {
  operator: CREW.operator.tap,
  engineer: CREW.engineer.tap,
  cpo: CREW.cpo.tap,
  pm: CREW.pm.tap,
  qa: CREW.qa.tap,
  ceo: CREW.ceo.tap,
  cto: CREW.cto.tap,
};

export const CREW_DESK: Record<RoleId, OverlayId | null> = {
  operator: null,
  engineer: "ide",
  cpo: "sim",
  pm: "plan",
  qa: "files",
  ceo: "plan",
  cto: "files",
};

export const COMPANY: Beat[] = [
  {
    from: "pm",
    to: "cpo",
    phase: "idle",
    text: "Board's quiet. What's the smallest ship?",
    reply: "Whatever they can COMMIT today.",
  },
  {
    from: "cpo",
    to: "engineer",
    phase: "idle",
    text: "Don't wait on a spec that isn't written.",
    reply: "Lab is idle. Send AUTH.",
  },
  {
    from: "engineer",
    to: "qa",
    phase: "idle",
    text: "Files are local. No twin.",
    reply: "I'll hash whatever you actually wrote.",
  },
  {
    from: "qa",
    to: "pm",
    phase: "idle",
    text: "No hash, no ship.",
    reply: "Owners stay on the board.",
  },
  {
    from: "pm",
    to: "qa",
    phase: "idle",
    text: "Arcade hall is RIX. Cabinets need COMMIT.",
    reply: "Play is local. I'll still sign the drop.",
  },
];

const RUN_LINE: Record<string, { instruct: string; design: string; code: string; review: string }> = {
  paper_trade: {
    instruct: "Hal: paper desk. Cap 2. Coinbase mark, local fill.",
    design: "Vex: not a live broker. Size the ticket.",
    code: "Rix: fill is local. I don't touch an exchange.",
    review: "Nyx: hash the fill or it didn't happen.",
  },
  mean_reversion: {
    instruct: "Hal: mean-reversion sketch. Paper only.",
    design: "Vex: RSI band. Tiny size.",
    code: "Rix: walking the synthetic book.",
    review: "Nyx: no live order. Hash the note.",
  },
  market_scan: {
    instruct: "Hal: scan the mark. Indicators only.",
    design: "Vex: RSI + Bollinger. No trade yet.",
    code: "Rix: pulling the spot, writing the scan.",
    review: "Nyx: numbers in the clean room.",
  },
  backtest: {
    instruct: "Hal: MACD on a synthetic walk.",
    design: "Vex: no live tape. Local bars.",
    code: "Rix: running the walk.",
    review: "Nyx: I'll sign the BACKTEST pack.",
  },
  restock: {
    instruct: "Hal: restock the ledger. CPO owns inventory.",
    design: "Vex: units in, gold out. No supplier API.",
    code: "Rix: stock file is in the lab.",
    review: "Nyx: count it, then hash.",
  },
  dropship_order: {
    instruct: "Hal: fulfill against on-hand. Don't oversell.",
    design: "Vex: local order. Not Shopify.",
    code: "Rix: writing ORDER.md.",
    review: "Nyx: stock must drop. I'll check.",
  },
  drain_holds: {
    instruct: "Hal: drain held orders. Oldest first.",
    design: "Vex: only if on-hand covers it.",
    code: "Rix: flipping HELD to filled.",
    review: "Nyx: hash the drain.",
  },
  supplier_quote: {
    instruct: "Hal: three local quotes. Pick cheapest.",
    design: "Vex: no Alibaba call. Deterministic vendors.",
    code: "Rix: QUOTES.md on the desk.",
    review: "Nyx: cheapest wins. Hash it.",
  },
  support_route: {
    instruct: "Hal: refund language — route to Nyx.",
    design: "Vex: don't argue. Ticket it.",
    code: "Rix: TICKET.md in the lab.",
    review: "Nyx: I own refunds. Logged.",
  },
  shop_publish: {
    instruct: "Hal: publish the shop into the lab.",
    design: "Vex: their rails. We don't take the money.",
    code: "Rix: writing the storefront.",
    review: "Nyx: TEST before RUN.",
  },
  lab_build: {
    instruct: "Hal: ship a local lab demo. Not a live clone.",
    design: "Vex: Floorcast / landing / calc. Smallest ship.",
    code: "Rix: files are in the monitor. Don't wait.",
    review: "Nyx: search, player, comments — I'll break it.",
  },
  arcade_ship: {
    instruct: "Hal: RIX forges a cabinet. Hall only. You still COMMIT.",
    design: "Vex: one machine, one hero. Local play.",
    code: "Rix: spec is on the bench. Cabinet drops after AUTH.",
    review: "Nyx: if it isn't hashed, it didn't ship.",
  },
  sunder: {
    instruct: "Hal: SCAN the lab. SNAP a hash. SUNDER the dead weight.",
    design: "Vex: sibling repos stay untouched. Lab only.",
    code: "Rix: cutting unused. Patch is local.",
    review: "Nyx: SCAN.md and SUNDER.md or it didn't happen.",
  },
  horizon: {
    instruct: "Hal: long horizon. Owners and tests on every step.",
    design: "Vex: cut it until this floor can actually run it.",
    code: "Rix: BOARD.md is the record. I don't start without tests.",
    review: "Nyx: supervised. Not a 24-hour unsupervised run.",
  },
  lab_qa: {
    instruct: "Hal: Nyx owns this. Don't skip checks.",
    design: "Vex: if it fails, we don't ship.",
    code: "Rix: files are on the desk.",
    review: "Nyx: running checks now.",
  },
  design_version: {
    instruct: "Hal: hash the lab. Version or rollback.",
    design: "Vex: firmware-style. Local only.",
    code: "Rix: snapshotting files.",
    review: "Nyx: SHA-256 or it didn't happen.",
  },
  risk_halt: {
    instruct: "Hal: kill switch. Fail closed.",
    design: "Vex: paper desk freezes. Resume is a new commit.",
    code: "Rix: I stop touching fills.",
    review: "Nyx: halt is on the ledger.",
  },
  risk_resume: {
    instruct: "Hal: operator override. Still paper.",
    design: "Vex: reopen the desk. Cap holds.",
    code: "Rix: desk is live-local.",
    review: "Nyx: I'll watch the next fill.",
  },
  audit_pack: {
    instruct: "Hal: provenance pack. Nyx writes it.",
    design: "Vex: local proof. Not a filing.",
    code: "Rix: dumping the ledger into the lab.",
    review: "Nyx: hashed. AUDIT.md is the record.",
  },
  compliance_scan: {
    instruct: "Hal: size-cap scan. Flag fat tickets.",
    design: "Vex: we don't file this. We remember it.",
    code: "Rix: COMPLIANCE.md on the desk.",
    review: "Nyx: I'll sign the flag.",
  },
};

export function workBeats(pathway: string, goal: string, mode: "advise" | "run" | "refuse"): Beat[] {
  const pack = RUN_LINE[pathway] ?? {
    instruct: `Hal: objective — ${goal.slice(0, 42)}. Owners on the board.`,
    design: "Vex: cut it to what this floor can actually run.",
    code: "Rix: I'll take the lab if you authorize.",
    review: "Nyx: no hash, no ship.",
  };
  if (mode === "refuse") {
    return [
      {
        from: "pm",
        to: "qa",
        phase: "instruct",
        text: pack.instruct,
        reply: "Gate stays closed.",
      },
      {
        from: "qa",
        to: "pm",
        phase: "review",
        text: pack.review,
        reply: "No AUTH, no ship.",
      },
    ];
  }
  if (mode === "advise") {
    return [
      {
        from: "pm",
        to: "cpo",
        phase: "instruct",
        text: pack.instruct,
        reply: "Scope it. Then AUTH.",
      },
      {
        from: "cpo",
        to: "engineer",
        phase: "design",
        text: pack.design,
        reply: "I won't touch files until COMMIT.",
      },
    ];
  }
  return [
    {
      from: "pm",
      to: "cpo",
      phase: "instruct",
      text: pack.instruct,
      reply: "Cut it. Then go.",
    },
    {
      from: "cpo",
      to: "engineer",
      phase: "design",
      text: pack.design,
      reply: "Spec is tight.",
    },
    {
      from: "engineer",
      to: "qa",
      phase: "code",
      text: pack.code,
      reply: "I'll break it.",
    },
    {
      from: "qa",
      to: "pm",
      phase: "review",
      text: pack.review,
      reply: "Signed.",
    },
  ];
}

export function beatLabel(beat: Beat) {
  return `${CREW[beat.from]?.name ?? beat.from} → ${CREW[beat.to]?.name ?? beat.to} · ${beat.phase}`;
}

export function crewForPathway(pathway: string): RoleId[] {
  if (["paper_trade", "mean_reversion", "market_scan", "backtest"].includes(pathway)) return ["cpo", "qa", "pm"];
  if (["restock", "dropship_order", "drain_holds", "supplier_quote"].includes(pathway)) return ["cpo", "pm"];
  if (["shop_publish", "lab_qa", "design_version", "lab_build", "arcade_ship"].includes(pathway))
    return ["engineer", "qa", "pm"];
  if (["sunder", "horizon"].includes(pathway)) return ["cpo", "engineer", "qa", "pm"];
  if (["risk_halt", "risk_resume"].includes(pathway)) return ["operator", "qa", "pm"];
  if (["audit_pack", "compliance_scan", "support_route", "sesa_cycle", "sesa_revert"].includes(pathway)) return ["qa", "cto", "pm"];
  return ["pm", "engineer"];
}
