/** A read of this office. Not a filing. Tokens never go in. */

export type LedgerEvent = { name: string; actor: string; detail: string };
export type LedgerRun = { ts: number; title: string; ok: boolean; hash: string; detail: string };
export type LedgerPolicy = { title: string; signed: boolean };

export type LedgerInput = {
  events: LedgerEvent[];
  runs: LedgerRun[];
  policies: LedgerPolicy[];
  halted: boolean;
  now?: string;
};

export type LedgerRow = { what: string; detail: string };

export function ledgerRows(input: LedgerInput): LedgerRow[] {
  const fromRuns = input.runs.slice(0, 6).map((run) => ({
    what: run.ok ? "COMMIT" : "REFUSED",
    detail: `${run.title} · ${run.hash.slice(0, 12)} · ${clip(run.detail)}`,
  }));
  const fromEvents = input.events.slice(-8).reverse().map((event) => ({
    what: event.name.replace(/_/g, " ").toUpperCase(),
    detail: `${event.actor} · ${clip(event.detail)}`,
  }));
  return [...fromRuns, ...fromEvents].slice(0, 8);
}

export function renderLedger(input: LedgerInput) {
  const when = input.now ?? new Date().toISOString();
  const rows = ledgerRows(input);
  const rules = input.policies.map((p) => `- ${p.signed ? "SIGNED" : "OPEN"} · ${p.title}`);
  return [
    "# ADL NEXUS ledger",
    `when: ${when}`,
    `posture: ${input.halted ? "HALTED" : "OPEN"} · local · paper · operator holds COMMIT`,
    "",
    "## Record",
    ...(rows.length ? rows.map((row) => `- ${row.what} · ${row.detail}`) : ["- empty"]),
    "",
    "## Rules",
    ...(rules.length ? rules : ["- none"]),
    "",
    "Scope: this browser. Not a regulator filing. Not a live broker. Tokens are not in this file.",
  ].join("\n");
}

function clip(detail: string) {
  return detail.replace(/\b(?:ghp_|github_pat_|sk-|xox[baprs]-)[A-Za-z0-9_-]+/g, "[redacted]").slice(0, 180);
}
