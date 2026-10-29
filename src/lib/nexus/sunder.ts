export type Finding = {
  kind: "dead" | "unused" | "missing" | "note";
  note: string;
};

const FN_RE = /function\s+([A-Za-z_]\w*)/g;

export function scanLab(files: Record<string, string>): Finding[] {
  const html = files["index.html"] ?? "";
  const css = files["styles.css"] ?? "";
  const js = files["main.js"] ?? "";
  const blob = `${html}\n${css}\n${js}`;
  const findings: Finding[] = [];

  if (/oldAPICall|legacyFn|TODO crash|throw new Error\("fail"\)/.test(blob)) {
    findings.push({ kind: "dead", note: "Dead marker in the lab (oldAPICall / fail throw)." });
  }

  const names = [...js.matchAll(FN_RE)].map((m) => m[1]);
  for (const name of names) {
    const rest = js.replace(new RegExp(`function\\s+${name}\\b[\\s\\S]*?\\n\\}`), "");
    const used = rest.includes(name) || html.includes(name);
    if (!used && name !== "paint" && name !== "openTape" && name !== "showGrid") {
      findings.push({ kind: "unused", note: `Unused function ${name}()` });
    }
  }

  if (/NEXUS lab/.test(html) && /Idle\./.test(html)) {
    findings.push({ kind: "missing", note: "Lab is still the idle stub. No product shipped." });
  }
  if (/FLOORCAST|Floorcast|tape-card|id="grid"/.test(blob) && !/Comments|id="comments"/.test(blob)) {
    findings.push({ kind: "missing", note: "Video grid is missing comments." });
  }
  if (/<h1/i.test(html) && !/<(article|button)/i.test(html) && !/FLOORCAST/.test(blob)) {
    findings.push({ kind: "missing", note: "Page has a heading but no action." });
  }
  if (!findings.length) findings.push({ kind: "note", note: "No dead code. Lab is tight." });
  return findings;
}

export function applySunder(files: Record<string, string>, findings: Finding[]): Record<string, string> {
  const next = { ...files };
  let js = next["main.js"] ?? "";
  let html = next["index.html"] ?? "";

  js = js.replace(/function\s+oldAPICall\s*\([^)]*\)\s*\{[\s\S]*?\}/g, "");
  js = js.replace(/function\s+legacyFn\s*\([^)]*\)\s*\{[\s\S]*?\}/g, "");
  js = js.replace(/throw new Error\("fail"\);?/g, "");

  for (const finding of findings) {
    const name = finding.kind === "unused" ? finding.note.match(/Unused function (\w+)\(\)/)?.[1] : "";
    if (!name) continue;
    const re = new RegExp(`function\\s+${name}\\s*\\([^)]*\\)\\s*\\{[\\s\\S]*?\\}`, "g");
    const stripped = js.replace(re, "");
    if (stripped === js) {
      finding.note = `${finding.note} Reported. Not cut. The body did not match a simple function.`;
    } else {
      js = stripped;
    }
  }

  if (findings.some((f) => f.kind === "missing" && /idle stub/.test(f.note))) {
    html = html.replace(
      /<p>Idle\.[^<]*<\/p>/,
      `<section class="cards"><article><h2>Think</h2></article><article><h2>Authorize</h2></article><article><h2>Commit</h2></article></section><button type="button" id="go">Arm the desk</button><p id="status">Idle.</p>`,
    );
    if (!/getElementById\("go"\)/.test(js)) {
      js += `\nconst b=document.getElementById("go");if(b){b.onclick=()=>{const s=document.getElementById("status");if(s)s.textContent="Desk armed. You still own the key.";};}`;
    }
  }

  if (findings.some((f) => /missing comments/.test(f.note)) && !/id="comments"/.test(html)) {
    html = html.replace(
      "</body>",
      `<section id="comments-wrap"><h2>Comments</h2><ul id="comments"><li>NYX: first note.</li></ul></section></body>`,
    );
  }

  next["index.html"] = html;
  next["main.js"] = js;
  return next;
}

export function renderScan(findings: Finding[]) {
  return [
    "# NEXUS SCAN",
    ...findings.map((f) => `- ${f.kind}: ${f.note}`),
    "",
    "Claim: local lab grep. Not a GitHub org rewrite. No external Sunder process was started.",
  ].join("\n");
}

export function renderSunder(findings: Finding[], changed: boolean) {
  return [
    "# NEXUS SUNDER",
    changed ? "Wrote a local patch into the lab." : "Nothing to cut.",
    ...findings.map((f) => `- ${f.kind}: ${f.note}`),
    "",
    "Status: executed locally inside the lab files. Not detected-only. Not an external adapter.",
    "Claim: lab rewrite only. Sibling repos are not touched.",
  ].join("\n");
}
