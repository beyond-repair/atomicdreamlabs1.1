/** A file the operator can move. Tokens are not in it. */

const OFFICE_KEY = "adl-nexus";
const TUBE_KEY = "nexus-tube-queue";

export function packCarry(officeRaw: string, tubeRaw: string | null) {
  const office = JSON.parse(officeRaw) as unknown;
  if (!officeOk(office)) throw new Error("This browser has no office to carry.");
  return JSON.stringify({ office, tube: tubeRaw ? JSON.parse(tubeRaw) : [] });
}

export function unpackCarry(text: string): { office: string; tube: string } | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return null;
  }
  if (!parsed || typeof parsed !== "object") return null;
  const bag = parsed as { office?: unknown; tube?: unknown };
  if (!officeOk(bag.office)) return null;
  const tube = Array.isArray(bag.tube) ? bag.tube : [];
  return { office: JSON.stringify(bag.office), tube: JSON.stringify(tube) };
}

function officeOk(value: unknown): value is { state: Record<string, unknown> } {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const state = (value as { state?: unknown }).state;
  if (!state || typeof state !== "object" || Array.isArray(state)) return false;
  const keys = Object.keys(state as object);
  if (keys.some((key) => /token|secret|github|coinbase/i.test(key))) return false;
  return keys.some((key) => key === "files" || key === "messages" || key === "biz");
}

export function readCarrySources() {
  return {
    office: window.localStorage.getItem(OFFICE_KEY),
    tube: window.localStorage.getItem(TUBE_KEY),
  };
}

export function writeCarry(next: { office: string; tube: string }) {
  window.localStorage.setItem(OFFICE_KEY, next.office);
  window.localStorage.setItem(TUBE_KEY, next.tube);
}

export function downloadCarry() {
  const { office, tube } = readCarrySources();
  if (!office) throw new Error("Nothing to carry yet. Use the desk once, then save a copy.");
  const body = packCarry(office, tube);
  const blob = new Blob([body], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "adl-nexus.json";
  link.click();
  URL.revokeObjectURL(url);
}
