import type { ChatWire, ToolEvent } from "./chat.ts";
import { runLabTests, type BizState } from "./business.ts";
import { matchDemo } from "./demos.ts";
import { looksLikeCodex, looksLikeHorizon, looksLikeSunder } from "./knowledge.ts";
import { looksLikeArcade } from "./arcade.ts";
import { inspectCatalog, liveCount } from "./codex.ts";
import { productCopy } from "./product.ts";

import { matchDesk } from "./desk.ts";
import { scanLab } from "./sunder.ts";
import { matchRoadmap } from "./horizon.ts";
import type { RoleId } from "./types.ts";
import type { PlanStep } from "./knowledge.ts";

export type LocalTurn = {
  ok: true;
  messages: ChatWire[];
  files: Record<string, string>;
  events: ToolEvent[];
  speaker: RoleId;
  plan: PlanStep[];
  incomplete: false;
  checks: string[];
};

function msg(name: RoleId, content: string) {
  return { role: "assistant" as const, name, content };
}

export async function tryLocalTurn(
  goal: string,
  files: Record<string, string>,
  biz: BizState,
): Promise<LocalTurn | null> {
  const desk = await matchDesk(goal);
  if (desk) {
    return {
      ok: true,
      messages: [msg("operator", desk.body)],
      files,
      events: [{ name: "desk_tool", actor: "operator", detail: desk.title }],
      speaker: "operator",
      plan: [],
      incomplete: false,
      checks: [],
    };
  }

  const demo = matchDemo(goal);
  if (looksLikeArcade(goal)) {
    return {
      ok: true,
      messages: [
        msg(
          "engineer",
          "Forge is the arcade hall. I write a cabinet spec. GOVERN: THINK → AUTH → COMMIT and a new machine drops. You hold the key.",
        ),
      ],
      files,
      events: [{ name: "arcade_spec", actor: "engineer", detail: "cabinet" }],
      speaker: "engineer",
      plan: [],
      incomplete: false,
      checks: [],
    };
  }
  if (demo) {
    const tested = runLabTests({ ...files, ...demo.files }, biz);
    const checks = tested.checks.map((c) => `${c.ok ? "PASS" : "FAIL"} ${c.name}`);
    return {
      ok: true,
      messages: [
        msg("pm", `${demo.title} is a lab build. Chat does not write the bench.`),
        msg("qa", checks.join(" · ") || "No checks."),
        msg("engineer", "THINK staged it. AUTH, then COMMIT, and the files land."),
      ],
      files,
      events: [{ name: "needs_commit", actor: "engineer", detail: "lab_build" }],
      speaker: "engineer",
      plan: [],
      incomplete: false,
      checks,
    };
  }

  if (looksLikeSunder(goal)) {
    const findings = scanLab(files);
    return {
      ok: true,
      messages: [
        msg("cpo", "SCAN stays in chat. SUNDER writes the lab only after COMMIT."),
        msg("qa", findings.map((f) => `${f.kind}: ${f.note}`).join(" · ")),
        msg("cpo", "Sibling repos were not touched. This is a local grep, not an external engine."),
      ],
      files,
      events: [{ name: "needs_commit", actor: "cpo", detail: "sunder" }],
      speaker: "cpo",
      plan: [],
      incomplete: false,
      checks: findings.map((f) => `${f.kind} ${f.note}`),
    };
  }

  if (looksLikeCodex(goal)) {
    const n = liveCount();
    return {
      ok: true,
      messages: [
        msg(
          "operator",
          "Work. Sell. Build. The other rooms support those three.",
        ),
        msg("qa", inspectCatalog()),
        msg(
          "ceo",
          productCopy(),
        ),
      ],
      files,
      events: [{ name: "inspect_codex", actor: "operator", detail: `${n} live` }],
      speaker: "operator",
      plan: [],
      incomplete: false,
      checks: [],
    };
  }

  if (looksLikeHorizon(goal)) {

    const map = matchRoadmap(goal);
    return {
      ok: true,
      messages: [
        msg("pm", `${map.title}: ${map.steps.length} steps. Owners and tests on the board.`),
        msg("cpo", "This is a plan. COMMIT writes BOARD.md. Chat does not."),
      ],
      files,
      events: [{ name: "needs_commit", actor: "pm", detail: "horizon" }],
      speaker: "pm",
      plan: map.steps,
      incomplete: false,
      checks: [],
    };
  }

  return null;
}
