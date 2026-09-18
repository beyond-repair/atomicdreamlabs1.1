import type { ChatWire, ToolEvent } from "./chat.ts";
import { runLabTests, type BizState } from "./business.ts";
import { matchDemo } from "./demos.ts";
import { looksLikeCodex, looksLikeHorizon, looksLikeSunder } from "./knowledge.ts";
import { looksLikeArcade } from "./arcade.ts";
import { inspectCatalog, liveCount } from "./codex.ts";

import { hashFiles } from "./adapters.ts";
import { applySunder, renderScan, renderSunder, scanLab } from "./sunder.ts";
import { matchRoadmap, renderBoard } from "./horizon.ts";
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
    const next = { ...files, ...demo.files };
    const tested = runLabTests(next, biz);
    const checks = tested.checks.map((c) => `${c.ok ? "PASS" : "FAIL"} ${c.name}`);
    return {
      ok: true,
      messages: [
        msg("pm", `Plan locked (${demo.plan.length} steps). Floor is executing — not waiting.`),
        msg("engineer", `${demo.title} files are in the monitor.`),
        msg("qa", checks.join(" · ") || "No checks."),
        msg("engineer", demo.summary),
      ],
      files: next,
      events: [
        { name: "set_plan", actor: "pm", detail: demo.title },
        { name: "write_file", actor: "engineer", detail: "index.html" },
        { name: "write_file", actor: "engineer", detail: "styles.css" },
        { name: "write_file", actor: "engineer", detail: "main.js" },
        { name: "run_checks", actor: "qa", detail: checks.join("; ") },
        { name: "complete_goal", actor: "engineer", detail: demo.id },
      ],
      speaker: "engineer",
      plan: demo.plan,
      incomplete: false,
      checks,
    };
  }

  if (looksLikeSunder(goal)) {
    const findings = scanLab(files);
    const patched = applySunder(files, findings);
    const hash = await hashFiles(patched);
    const changed =
      patched["index.html"] !== files["index.html"] || patched["main.js"] !== files["main.js"];
    const next = {
      ...patched,
      "SCAN.md": renderScan(findings),
      "SNAP.md": `# NEXUS SNAP\nhash: ${hash}\n`,
      "SUNDER.md": renderSunder(findings, changed),
    };
    const line = changed
      ? `SUNDER patched the lab. ${findings.length} finding(s).`
      : `SCAN clean. ${findings[0]?.note ?? "Nothing to cut."}`;
    return {
      ok: true,
      messages: [
        msg("cpo", "SCAN the lab. SNAP a hash. SUNDER only what this floor owns."),
        msg("qa", findings.map((f) => `${f.kind}: ${f.note}`).join(" · ")),
        msg("cpo", `${line} Sibling repos were not touched.`),
      ],
      files: next,
      events: [
        { name: "sunder", actor: "cpo", detail: hash.slice(0, 12) },
        { name: "write_file", actor: "cpo", detail: "SUNDER.md" },
      ],
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
          `This is your sovereign office. ${n} things actually run on this floor. T4–T5 — voice, APK, 24h unsupervised AGI — are capped.`,
        ),
        msg("qa", inspectCatalog()),
        msg(
          "ceo",
          "Tap furniture. Talk to the desk. GOVERN is THINK → AUTH → COMMIT. I advise. You hold the key. Paper / local only.",
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
        msg("cpo", "Smallest ship. Cut anything this floor cannot run."),
        msg("pm", "AUTH is still yours. This is a plan, not unsupervised work."),
      ],
      files: { ...files, "BOARD.md": renderBoard(map) },
      events: [
        { name: "set_plan", actor: "pm", detail: map.title },
        { name: "write_file", actor: "pm", detail: "BOARD.md" },
      ],
      speaker: "pm",
      plan: map.steps,
      incomplete: false,
      checks: [],
    };
  }

  return null;
}
