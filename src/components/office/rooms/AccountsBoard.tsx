import { useCallback, useEffect, useState } from "react";
import { redirectToLoginIfRequired } from "@/lib/app-data/login";
import { useRefetchWhenConnectorReady } from "@/lib/app-data/use-connector-readiness";
import { pullAccounts, type AccountLane } from "@/lib/nexus/accounts";
import { downloadCarry, unpackCarry, writeCarry } from "@/lib/nexus/carry";
import { keyBag, readKeyedAccounts, type KeyBag } from "@/lib/nexus/vault-keys";

const KEYS = "nexus-vault-keys";

const EMPTY: KeyBag = { github: "", notion: "", slack: "", steamKey: "", steamId: "", coinbaseKey: "", coinbaseSecret: "" };

function storedKeys(): KeyBag {
  try {
    return keyBag(JSON.parse(window.localStorage.getItem(KEYS) || "{}") as Partial<KeyBag>);
  } catch {
    return EMPTY;
  }
}

export function AccountsBoard() {
  const [lanes, setLanes] = useState<AccountLane[] | null>(null);
  const [error, setError] = useState("");
  const [keys, setKeys] = useState<KeyBag>(EMPTY);
  const [busy, setBusy] = useState(false);
  const [carryNote, setCarryNote] = useState("");

  const load = useCallback(async (bag?: KeyBag) => {
    setError("");
    const next = bag ?? storedKeys();
    try {
      const steam = window.localStorage.getItem("nexus-steam-name") ?? "";
      const [pub, keyed] = await Promise.all([
        pullAccounts({ data: { steam } }),
        next.github || next.notion || next.slack || next.steamKey || next.coinbaseKey
          ? readKeyedAccounts({ data: next })
          : Promise.resolve({ lanes: [] as AccountLane[] }),
      ]);
      const kit = pub.lanes.filter((lane) => lane.id === "kit");
      const rest = pub.lanes.filter((lane) => lane.id !== "kit");
      setLanes([...rest, ...keyed.lanes, ...kit]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Accounts did not load.");
    }
  }, []);

  useEffect(() => {
    const saved = storedKeys();
    setKeys(saved);
    void load(saved);
  }, [load]);

  const pending = lanes?.some((lane) => lane.state === "pending") ?? false;
  useRefetchWhenConnectorReady(pending, () => load(keys));

  function save(field: keyof KeyBag, value: string) {
    const next = { ...keys, [field]: value };
    setKeys(next);
    window.localStorage.setItem(KEYS, JSON.stringify(next));
  }

  return (
    <section className="account-board" aria-label="Accounts">
      <p className="font-body text-lg text-cream">Your accounts</p>
      <p className="font-body text-base text-muted">
        Drive and Calendar use Grok. A GitHub token lists repos, other branches, latest commits, and your open pull requests. It does not push. Notion, Slack, Steam, and Coinbase stay read-only.
      </p>
      <details className="account-lane">
        <summary className="font-body text-lg text-cream">Keys on this device</summary>
        {(
          [
            ["github", "GitHub token"],
            ["notion", "Notion integration token"],
            ["slack", "Slack bot token"],
            ["steamKey", "Steam Web API key"],
            ["steamId", "SteamID64"],
            ["coinbaseKey", "Coinbase API key"],
            ["coinbaseSecret", "Coinbase secret"],
          ] as const
        ).map(([field, label]) => (
          <label key={field} className="account-row">
            <span className="font-body text-base text-muted">{label}</span>
            <input
              className="dock-input"
              type={field === "steamId" ? "text" : "password"}
              value={keys[field]}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              onChange={(e) => save(field, e.target.value)}
            />
          </label>
        ))}
        <button
          type="button"
          className="deck-station"
          disabled={busy}
          onClick={() => {
            setBusy(true);
            void load(keys).finally(() => setBusy(false));
          }}
        >
          {busy ? "READING" : "READ THESE"}
        </button>
      </details>
      <section className="account-lane" aria-label="Carry this office">
        <p className="font-body text-lg text-cream">Carry this office</p>
        <p className="font-body text-base text-muted">
          Save a copy, then open it in another browser. The file has the counter and the lab. Tokens stay on this device.
        </p>
        <div className="lab-inventory">
          <button
            type="button"
            className="deck-station"
            onClick={() => {
              try {
                downloadCarry();
                setCarryNote("Copy saved. Tokens were not included.");
              } catch (e) {
                setCarryNote(e instanceof Error ? e.message : "Could not save a copy.");
              }
            }}
          >
            SAVE A COPY
          </button>
          <label className="deck-station">
            OPEN A COPY
            <input
              type="file"
              accept="application/json,.json"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0];
                e.target.value = "";
                if (!file) return;
                void file.text().then((text) => {
                  const next = unpackCarry(text);
                  if (!next) {
                    setCarryNote("That file is not an office copy.");
                    return;
                  }
                  writeCarry(next);
                  window.location.reload();
                });
              }}
            />
          </label>
        </div>
        {carryNote ? <p className="font-body text-base text-cream">{carryNote}</p> : null}
      </section>
      {error ? <p className="font-body text-base text-danger">{error}</p> : null}
      {!lanes && !error ? <p className="font-body text-base text-muted">Reading the grant…</p> : null}
      {lanes?.map((lane) => (
        <article key={lane.id} className="account-lane">
          <header>
            <span className="font-body text-base text-gold">{lane.label}</span>
            <span className="font-body text-base text-muted">{lane.state.toUpperCase()}</span>
          </header>
          <p className="font-body text-base text-muted">{lane.note}</p>
          {lane.rows.map((row) =>
            row.href && /^https:\/\//.test(row.href) ? (
              <a key={`${lane.id}-${row.title}`} className="account-row" href={row.href} target="_blank" rel="noopener noreferrer">
                <span className="font-body text-lg text-cream">{row.title}</span>
                {row.detail ? <span className="font-body text-base text-muted">{row.detail}</span> : null}
              </a>
            ) : row.href?.startsWith("steam://run/") ? (
              <a key={`${lane.id}-${row.title}`} className="account-row" href={row.href}>
                <span className="font-body text-lg text-cream">{row.title}</span>
                {row.detail ? <span className="font-body text-base text-muted">{row.detail}</span> : null}
              </a>
            ) : (
              <p key={`${lane.id}-${row.title}`} className="account-row">
                <span className="font-body text-lg text-cream">{row.title}</span>
                {row.detail ? <span className="font-body text-base text-muted">{row.detail}</span> : null}
              </p>
            ),
          )}
          {lane.state === "login" && lane.loginUrl ? (
            <button
              type="button"
              className="deck-station"
              onClick={() => redirectToLoginIfRequired({ ok: false, data: null, loginRequired: true, loginUrl: lane.loginUrl })}
            >
              CONTINUE WITH GROK
            </button>
          ) : null}
        </article>
      ))}
      <button type="button" className="deck-station" onClick={() => void load(keys)}>
        READ AGAIN
      </button>
    </section>
  );
}
