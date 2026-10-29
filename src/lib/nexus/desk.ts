import { sha256Hex } from "./hash.ts";
import { LAB_APPS, type LabAppId } from "./labApps.ts";

/** Exact desk jobs. No model, no COMMIT. The answer is the answer. */

export type DeskChip = { id: string; label: string; verb: string };

export const DESK_CHIPS: DeskChip[] = [
  { id: "b64", label: "Base64", verb: "base64 encode " },
  { id: "b64d", label: "Decode", verb: "base64 decode " },
  { id: "hash", label: "Hash", verb: "sha256 " },
  { id: "json", label: "JSON", verb: "json pretty " },
  { id: "count", label: "Count", verb: "count " },
  { id: "calc", label: "Calc", verb: "calc " },
];

export function stageDesk(verb: string, draft: string): { text: string; ready: boolean } {
  const body = draft.trim();
  const lead = verb.trim().toLowerCase();
  if (!body) return { text: verb, ready: false };
  if (body.toLowerCase().startsWith(lead)) return { text: body, ready: true };
  return { text: `${verb}${body}`, ready: true };
}

export type DeskAnswer = { title: string; body: string };

type Kind =
  | "b64enc"
  | "b64dec"
  | "hexenc"
  | "hexdec"
  | "urlenc"
  | "urldec"
  | "sha"
  | "jsonpretty"
  | "jsonmin"
  | "count"
  | "slug"
  | "uuid"
  | "time"
  | "upper"
  | "lower"
  | "title"
  | "calc"
  | "sort"
  | "uniq"
  | "reverse"
  | "date"
  | "jwt"
  | "escape"
  | "unescape";

const RULES: [RegExp, Kind][] = [
  [/^(?:base64|b64)\s+decode\s+([\s\S]+)$/i, "b64dec"],
  [/^(?:decode\s+(?:base64|b64))\s+([\s\S]+)$/i, "b64dec"],
  [/^(?:encode\s+(?:base64|b64))\s+([\s\S]+)$/i, "b64enc"],
  [/^(?:base64|b64)\s+(?:encode\s+)?([\s\S]+)$/i, "b64enc"],
  [/^hex\s+decode\s+([\s\S]+)$/i, "hexdec"],
  [/^decode\s+hex\s+([\s\S]+)$/i, "hexdec"],
  [/^hex\s+(?:encode\s+)?([\s\S]+)$/i, "hexenc"],
  [/^(?:url|percent)\s+decode\s+([\s\S]+)$/i, "urldec"],
  [/^decode\s+url\s+([\s\S]+)$/i, "urldec"],
  [/^(?:url|percent)\s+(?:encode\s+)?([\s\S]+)$/i, "urlenc"],
  [/^(?:sha-?256|hash)\s+([\s\S]+)$/i, "sha"],
  [/^json\s+pretty\s+([\s\S]+)$/i, "jsonpretty"],
  [/^json\s+minify\s+([\s\S]+)$/i, "jsonmin"],
  [/^(?:count|wc)\s+([\s\S]+)$/i, "count"],
  [/^slug(?:ify)?\s+([\s\S]+)$/i, "slug"],
  [/^(?:upper|uppercase)\s+([\s\S]+)$/i, "upper"],
  [/^(?:lower|lowercase)\s+([\s\S]+)$/i, "lower"],
  [/^(?:title|titlecase)\s+([\s\S]+)$/i, "title"],
  [/^(?:calc|calculate|math)\s+([\s\S]+)$/i, "calc"],
  [/^sort(?:\s+lines)?\s+([\s\S]+)$/i, "sort"],
  [/^(?:unique|uniq|dedupe)\s+([\s\S]+)$/i, "uniq"],
  [/^reverse\s+([\s\S]+)$/i, "reverse"],
  [/^(?:date|from\s+unix)\s+(\d{1,13})$/i, "date"],
  [/^jwt\s+(\S+)$/i, "jwt"],
  [/^html\s+unescape\s+([\s\S]+)$/i, "unescape"],
  [/^html\s+escape\s+([\s\S]+)$/i, "escape"],
  [/^(?:uuid|guid)$/i, "uuid"],
  [/^(?:now|time|unix)$/i, "time"],
];

export async function matchDesk(text: string): Promise<DeskAnswer | null> {
  const raw = text.trim();
  if (!raw || raw.length > 8000) return null;
  for (const [re, kind] of RULES) {
    const hit = raw.match(re);
    if (!hit) continue;
    const payload = (hit[1] ?? "").trim();
    return runKind(kind, payload);
  }
  return null;
}

async function runKind(kind: Kind, payload: string): Promise<DeskAnswer> {
  try {
    if (kind === "b64enc") return { title: "base64", body: b64encode(payload) };
    if (kind === "b64dec") return { title: "base64", body: b64decode(payload) };
    if (kind === "hexenc") return { title: "hex", body: hexEncode(payload) };
    if (kind === "hexdec") return { title: "hex", body: hexDecode(payload) };
    if (kind === "urlenc") return { title: "url", body: encodeURIComponent(payload) };
    if (kind === "urldec") return { title: "url", body: decodeURIComponent(payload) };
    if (kind === "sha") return { title: "sha256", body: await sha256Hex(payload) };
    if (kind === "jsonpretty") return { title: "json", body: jsonFormat(payload, true) };
    if (kind === "jsonmin") return { title: "json", body: jsonFormat(payload, false) };
    if (kind === "count") return { title: "count", body: countText(payload) };
    if (kind === "slug") return { title: "slug", body: slugify(payload) };
    if (kind === "upper") return { title: "case", body: payload.toUpperCase() };
    if (kind === "lower") return { title: "case", body: payload.toLowerCase() };
    if (kind === "title") return { title: "case", body: toTitle(payload) };
    if (kind === "calc") return { title: "calc", body: String(calculate(payload)) };
    if (kind === "sort") return { title: "sort", body: sortLines(payload) };
    if (kind === "uniq") return { title: "unique", body: uniqueLines(payload) };
    if (kind === "reverse") return { title: "reverse", body: reverseText(payload) };
    if (kind === "date") return { title: "date", body: fromUnix(payload) };
    if (kind === "jwt") return { title: "jwt", body: readJwt(payload) };
    if (kind === "escape") return { title: "html", body: htmlEscape(payload) };
    if (kind === "unescape") return { title: "html", body: htmlUnescape(payload) };
    if (kind === "uuid") {
      const id = globalThis.crypto?.randomUUID?.() ?? fallbackUuid();
      return { title: "uuid", body: id };
    }
    const ms = Date.now();
    return { title: "time", body: `${new Date(ms).toISOString()}\n${Math.floor(ms / 1000)}` };
  } catch (e) {
    const line = e instanceof Error ? e.message : "That did not parse.";
    return { title: kind, body: line };
  }
}

function bytesOf(s: string) {
  return new TextEncoder().encode(s);
}

function textOf(bytes: Uint8Array) {
  return new TextDecoder().decode(bytes);
}

function b64encode(s: string) {
  if (!s) throw new Error("Nothing to encode.");
  let bin = "";
  for (const b of bytesOf(s)) bin += String.fromCharCode(b);
  return btoa(bin);
}

function b64decode(s: string) {
  const clean = s.replace(/\s/g, "");
  if (!clean || clean.length % 4 !== 0 || !/^[A-Za-z0-9+/]+={0,2}$/.test(clean)) {
    throw new Error("That is not valid base64.");
  }
  let bin: string;
  try {
    bin = atob(clean);
  } catch {
    throw new Error("That is not valid base64.");
  }
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return textOf(bytes);
}

function hexEncode(s: string) {
  if (!s) throw new Error("Nothing to encode.");
  return [...bytesOf(s)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function hexDecode(s: string) {
  const clean = s.replace(/\s/g, "");
  if (!clean || clean.length % 2 !== 0 || !/^[0-9a-fA-F]+$/.test(clean)) {
    throw new Error("That is not valid hex.");
  }
  const bytes = new Uint8Array(clean.length / 2);
  for (let i = 0; i < bytes.length; i++) bytes[i] = Number.parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  return textOf(bytes);
}

function jsonFormat(s: string, pretty: boolean) {
  let value: unknown;
  try {
    value = JSON.parse(s);
  } catch {
    throw new Error("That is not JSON.");
  }
  return pretty ? JSON.stringify(value, null, 2) : JSON.stringify(value);
}

function countText(s: string) {
  const words = s.trim() ? s.trim().split(/\s+/).length : 0;
  const lines = s ? s.split(/\n/).length : 0;
  return `${words} words · ${s.length} characters · ${lines} lines`;
}

function slugify(s: string) {
  const slug = s
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (!slug) throw new Error("Nothing left to slug.");
  return slug;
}

function toTitle(s: string) {
  return s.replace(/\S+/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

function sortLines(s: string) {
  const lines = s.split(/\n/).map((l) => l.trim()).filter(Boolean);
  if (!lines.length) throw new Error("Nothing to sort.");
  return [...lines].sort((a, b) => a.localeCompare(b)).join("\n");
}

function uniqueLines(s: string) {
  const lines = s.split(/\n/).map((l) => l.trim()).filter(Boolean);
  if (!lines.length) throw new Error("Nothing to keep.");
  return [...new Set(lines)].join("\n");
}

function reverseText(s: string) {
  if (!s) throw new Error("Nothing to reverse.");
  if (s.includes("\n")) return s.split(/\n/).reverse().join("\n");
  return [...s].reverse().join("");
}

export function isDeskImage(text: string) {
  return /^(?:draw this:|image:)/i.test(text.trim());
}

export function isDeskClip(text: string) {
  return /^clip this:/i.test(text.trim());
}

export function isDeskAsk(text: string) {
  return /^(?:write this clearly:|summarize this:|explain this plainly:|translate this to (?:spanish|english):|write the code\. short and complete:|summarize\b|explain\b|translate\b|proofread\b|rewrite\b)/i.test(
    text.trim(),
  );
}

export type LocalAsk = { body: string; files?: Record<string, string> };

export function localDeskAsk(text: string): LocalAsk | null {
  const raw = text.trim();
  if (!isDeskAsk(raw)) return null;
  const body = stripAsk(raw);
  if (!body) return null;
  if (/^summarize\b/i.test(raw)) {
    const cut = extractiveSummary(raw);
    if (!cut) return null;
    return { body: `${cut}\n\nExtract, not a model.` };
  }
  if (/^(?:write this clearly:|rewrite\b|proofread\b)/i.test(raw)) {
    return { body: `${clarify(body)}\n\nCleaned on this desk. Not a model rewrite.` };
  }
  if (/^(?:explain this plainly:|explain\b)/i.test(raw)) {
    return { body: explainLocal(body) };
  }
  if (/^(?:translate this to (?:spanish|english):|translate\b)/i.test(raw)) {
    return { body: `${body}\n\nNot translated. The model did not answer, and this desk will not invent the wording.` };
  }
  if (/^write the code\. short and complete:/i.test(raw)) {
    const seed = matchSeed(body);
    if (seed) {
      return {
        body: `Loaded the ${seed.toUpperCase()} page in the lab. The model did not write it. TEST, then RUN. You still hold COMMIT.`,
        files: { ...LAB_APPS[seed].files },
      };
    }
    return {
      body: "The model did not write this. A blank page is in the lab with your request as the heading. Edit it, then TEST and RUN.",
      files: blankPage(body),
    };
  }
  return null;
}

function stripAsk(text: string) {
  return text
    .replace(/^write this clearly:\s*/i, "")
    .replace(/^summarize this:\s*/i, "")
    .replace(/^explain this plainly:\s*/i, "")
    .replace(/^translate this to (?:spanish|english):\s*/i, "")
    .replace(/^write the code\. short and complete:\s*/i, "")
    .replace(/^(?:summarize|explain|translate|proofread|rewrite)\b[:\s]*/i, "")
    .trim();
}

function clarify(body: string) {
  let s = body.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
  if (!s) throw new Error("Nothing to clean.");
  s = s.replace(/\bi\b/g, "I");
  s = s.replace(/(^|[.!?]\s+)([a-z])/g, (_, lead: string, ch: string) => lead + ch.toUpperCase());
  if (!/[.!?]$/.test(s)) s += ".";
  return s;
}

function explainLocal(body: string) {
  const lines = body.split(/\n/).length;
  const words = body.trim() ? body.trim().split(/\s+/).length : 0;
  const names = [...body.matchAll(/\bfunction\s+([A-Za-z_][A-Za-z0-9_]*)/g)].map((m) => m[1]);
  const first = body.trim().split(/(?<=[.!?])\s+/)[0]?.slice(0, 160) ?? "";
  const parts = [`${words} words, ${lines} ${lines === 1 ? "line" : "lines"}.`];
  if (names.length) parts.push(`Functions: ${names.join(", ")}.`);
  if (first) parts.push(`It starts: ${first}`);
  parts.push("Meaning was not written by a model. The model did not answer.");
  return parts.join("\n");
}

function matchSeed(body: string): LabAppId | null {
  const t = body.toLowerCase();
  if (/\bclock\b/.test(t)) return "clock";
  if (/\b(stock|inventory|shop)\b/.test(t)) return "stock";
  if (/\b(list|todo|checklist)\b/.test(t)) return "list";
  if (/\b(counter|calculator)\b/.test(t)) return "counter";
  return null;
}

function blankPage(request: string): Record<string, string> {
  const title = request.split(/\n/)[0].replace(/[<>&]/g, "").slice(0, 80) || "Untitled";
  return {
    "index.html": `<!doctype html>
<html>
<head><meta charset="utf-8"><link rel="stylesheet" href="styles.css"></head>
<body>
  <p class="kicker">NEXUS LAB</p>
  <h1>${title}</h1>
  <p>Edit this page. The model did not write it.</p>
  <script src="main.js"></script>
</body>
</html>`,
    "styles.css": `body{margin:0;background:#111110;color:#e6e1d6;font-family:ui-sans-serif,system-ui,sans-serif;padding:24px}
h1{font-size:32px;margin:8px 0}
.kicker{letter-spacing:.14em;font-size:12px}`,
    "main.js": `document.title = ${JSON.stringify(title)};`,
  };
}

export function extractiveSummary(text: string): string | null {
  if (!/^summarize\b/i.test(text.trim())) return null;
  const body = text.replace(/^summarize(?:\s+this)?:\s*/i, "").trim();
  const sentences = body.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter(Boolean).slice(0, 3);
  if (!sentences.length) return null;
  return sentences.join(" ");
}

function fromUnix(s: string) {
  const n = Number(s);
  if (!Number.isFinite(n)) throw new Error("That is not a unix time.");
  const ms = s.length >= 13 ? n : n * 1000;
  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) throw new Error("That is not a unix time.");
  return d.toISOString();
}

function htmlEscape(s: string) {
  if (!s) throw new Error("Nothing to escape.");
  return s
    .replace(/&/g, "\u0026amp;")
    .replace(/</g, "\u0026lt;")
    .replace(/>/g, "\u0026gt;")
    .replace(/"/g, "\u0026quot;");
}

function htmlUnescape(s: string) {
  if (!s) throw new Error("Nothing to unescape.");
  return s
    .replace(/\u0026quot;/g, '"')
    .replace(/\u0026gt;/g, ">")
    .replace(/\u0026lt;/g, "<")
    .replace(/\u0026amp;/g, "&");
}

function readJwt(token: string) {
  const parts = token.split(".");
  if (parts.length < 2) throw new Error("That is not a JWT. It needs a header and a payload.");
  let header = "";
  let payload = "";
  try {
    header = jsonFormat(b64url(parts[0]), true);
    payload = jsonFormat(b64url(parts[1]), true);
  } catch {
    throw new Error("That JWT payload is not readable JSON.");
  }
  return `Signature was not checked.\n\n${header}\n\n${payload}`;
}

function b64url(s: string) {
  const pad = s.replace(/-/g, "+").replace(/_/g, "/");
  return b64decode(pad + "=".repeat((4 - (pad.length % 4)) % 4));
}

function fallbackUuid() {
  const bytes = new Uint8Array(16);
  globalThis.crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const h = [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

function calculate(expr: string) {
  const src = expr.replace(/\s+/g, "");
  if (!src || src.length > 80 || !/^[\d.+\-*/%()]+$/.test(src)) {
    throw new Error("Calc takes numbers and + - * / % ( ).");
  }
  let i = 0;
  const peek = () => src[i] ?? "";
  const eat = (c: string) => {
    if (peek() !== c) throw new Error("Calc could not read that.");
    i += 1;
  };
  function num(): number {
    const start = i;
    if (peek() === "-") i += 1;
    while (/[\d.]/.test(peek())) i += 1;
    if (i === start || src.slice(start).startsWith("-") && i === start + 1) {
      throw new Error("Calc could not read that.");
    }
    const n = Number(src.slice(start, i));
    if (!Number.isFinite(n)) throw new Error("Calc could not read that.");
    return n;
  }
  function factor(): number {
    if (peek() === "(") {
      eat("(");
      const v = expr2();
      eat(")");
      return v;
    }
    return num();
  }
  function term(): number {
    let v = factor();
    while (peek() === "*" || peek() === "/" || peek() === "%") {
      const op = peek();
      i += 1;
      const r = factor();
      if ((op === "/" || op === "%") && r === 0) throw new Error("Can't divide by zero.");
      v = op === "*" ? v * r : op === "/" ? v / r : v % r;
    }
    return v;
  }
  function expr2(): number {
    let v = term();
    while (peek() === "+" || peek() === "-") {
      const op = peek();
      i += 1;
      const r = term();
      v = op === "+" ? v + r : v - r;
    }
    return v;
  }
  const out = expr2();
  if (i !== src.length || !Number.isFinite(out)) throw new Error("Calc could not read that.");
  return Object.is(out, -0) ? 0 : Math.round(out * 1e10) / 1e10;
}
