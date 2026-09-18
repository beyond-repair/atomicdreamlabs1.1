import type { PlanStep } from "./knowledge.ts";

export type Roadmap = { title: string; steps: PlanStep[] };

function steps(rows: [string, string, string][]): PlanStep[] {
  return rows.map((r, i) => ({
    id: `h${i + 1}`,
    title: r[0],
    owner: r[1],
    test: r[2],
    done: false,
  }));
}

export function matchRoadmap(goal: string): Roadmap {
  const t = goal.toLowerCase();
  if (/\b(social|network|friends)\b/.test(t)) {
    return {
      title: "Social network (local demo)",
      steps: steps([
        ["Identity stub", "cpo", "profile card in the lab"],
        ["Feed layout", "engineer", "list of posts"],
        ["Compose", "engineer", "local post form"],
        ["Follow graph", "cpo", "static following list"],
        ["Search people", "engineer", "filter the list"],
        ["QA the feed", "qa", "lab tests pass"],
        ["Hash the design", "cto", "VERSION.md"],
        ["Operator review", "pm", "AUTH before any public claim"],
      ]),
    };
  }
  if (/\b(youtube|video|floorcast|tape)\b/.test(t)) {
    return {
      title: "Floorcast",
      steps: steps([
        ["Search bar", "pm", "input#q"],
        ["Tape grid", "engineer", "local catalog"],
        ["Player", "engineer", "click to play"],
        ["Sidebar", "cpo", "related tapes"],
        ["Comments", "qa", "post a note"],
        ["QA sign-off", "qa", "lab tests pass"],
      ]),
    };
  }
  if (/\b(music|player|radio)\b/.test(t)) {
    return {
      title: "Music player (local)",
      steps: steps([
        ["Track list", "cpo", "local titles"],
        ["Transport", "engineer", "play / pause"],
        ["Scrub", "engineer", "position control"],
        ["QA", "qa", "lab tests pass"],
      ]),
    };
  }
  const g = goal.replace(/\b(plan|roadmap|horizon)\b/gi, "").trim().slice(0, 48) || "objective";
  return {
    title: g,
    steps: steps([
      [`Scope ${g}`, "cpo", "smallest ship named"],
      ["Owners on the board", "pm", "every step has an owner"],
      ["Write the lab", "engineer", "index.html exists"],
      ["QA the lab", "qa", "checks pass"],
      ["Hash + memory", "cto", "design version stored"],
    ]),
  };
}

export function renderBoard(map: Roadmap) {
  return [
    `# ${map.title}`,
    ...map.steps.map((s, i) => `${i + 1}. [${s.done ? "x" : " "}] ${s.title} · ${s.owner} · test: ${s.test}`),
    "",
    "Claim: supervised board. Not unsupervised AGI.",
  ].join("\n");
}
