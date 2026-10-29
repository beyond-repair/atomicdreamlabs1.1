import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AccountsBoard } from "@/components/office/rooms/AccountsBoard";
import { ArcadeFloor } from "@/components/office/ArcadeFloor";
import { IdePanel } from "@/components/office/IdePanel";
import { CoreFloor } from "@/components/office/rooms/CoreFloor";
import { ExchangeFloor } from "@/components/office/rooms/ExchangeFloor";
import { LibraryFloor } from "@/components/office/rooms/LibraryFloor";
import { ProofFloor } from "@/components/office/rooms/ProofFloor";
import { CREW } from "@/lib/nexus/crew";
import { VAULT_FLOORS, deckRequest, requestDeck, subscribeDeck, type DeckId } from "@/lib/nexus/campus";
import { LAB_APPS, type LabAppId } from "@/lib/nexus/labApps";
import { facilityNow, facilityTick, goalOf, subscribeFacility, type AgentId } from "@/lib/nexus/lift";
import { useNexus } from "@/lib/nexus/store";
import { ROLES } from "@/lib/nexus/types";
import { hostLabPage } from "@/lib/nexus/vault-keys";
import { plantStats } from "@/lib/nexus/watches";

function useFacility() {
  const tick = useSyncExternalStore(subscribeFacility, facilityTick, () => 0);
  void tick;
  return facilityNow();
}

export function RoomInterior({ deck, onClose }: { deck: DeckId; onClose: () => void }) {
  const setClubZone = useNexus((s) => s.setClubZone);
  const setFileContent = useNexus((s) => s.setFileContent);
  const setLabPane = useNexus((s) => s.setLabPane);
  const setActiveFile = useNexus((s) => s.setActiveFile);
  const openOverlay = useNexus((s) => s.openOverlay);
  const biz = useNexus((s) => s.biz);
  const files = useNexus((s) => s.files);
  const snap = useFacility();
  const reqN = useSyncExternalStore(subscribeDeck, () => deckRequest().n, () => 0);
  const cell = VAULT_FLOORS.flatMap((f) => f.rooms).find((r) => r.deck === deck);
  const here = (snap?.riders ?? []).filter((r) => goalOf(r) === deck);
  const names = here.map((r) => CREW[r.id as AgentId].tag).join(" · ");
  const riding = here.some((r) => r.phase === "ride" || r.phase === "wait");

  useEffect(() => {
    const req = deckRequest();
    if (req.deck !== deck) return;
    if (req.station === "seed") build("counter");
    if (req.station === "steam") setClubZone("steam");
    if (req.station === "tube") setClubZone("tube");
    if (req.station === "play") setClubZone("tapes");
    if (req.station === "files") openOverlay("files");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reqN, deck]);

  useEffect(() => {
    if (deck === "lounge") setClubZone("tube");
    if (deck === "arcade") setClubZone("tapes");
  }, [deck, setClubZone]);

  function build(id: LabAppId) {
    const app = LAB_APPS[id];
    for (const [path, content] of Object.entries(app.files)) setFileContent(path, content);
    setActiveFile("index.html");
    setLabPane("run");
  }

  function downloadLab() {
    const html = files["index.html"] ?? "";
    const css = files["styles.css"] ?? "";
    const js = files["main.js"] ?? "";
    const doc = html.includes("</head>")
      ? html.replace("</head>", `<style>${css}</style></head>`).replace("</body>", `<script>${js}<\/script></body>`)
      : `<!doctype html><style>${css}</style>${html}<script>${js}<\/script>`;
    const blob = new Blob([doc], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nexus-lab.html";
    a.click();
    URL.revokeObjectURL(url);
  }

  const stats = plantStats(biz);
  const [hostToken, setHostToken] = useState("");
  const [hostNote, setHostNote] = useState("");
  const [hosting, setHosting] = useState(false);

  useEffect(() => {
    setHostToken(window.localStorage.getItem("nexus-vercel-token") ?? "");
  }, []);

  async function hostLab() {
    const html = files["index.html"] ?? "";
    const css = files["styles.css"] ?? "";
    const js = files["main.js"] ?? "";
    const doc = html.includes("</head>")
      ? html.replace("</head>", `<style>${css}</style></head>`).replace("</body>", `<script>${js}<\/script></body>`)
      : `<!doctype html><style>${css}</style>${html}<script>${js}<\/script>`;
    setHosting(true);
    const result = await hostLabPage({ data: { token: hostToken, html: doc } });
    setHosting(false);
    setHostNote(result.ok ? result.url : result.error);
  }

  return (
    <div className="deck-interior" role="dialog" aria-label={cell?.name ?? deck}>
      <header className="deck-interior-bar">
        <button type="button" className="deck-back" onClick={onClose}>
          VAULT
        </button>
        <div className="min-w-0">
          <p className="font-body text-xl leading-6 text-cream">{cell?.name ?? deck.toUpperCase()}</p>
          <p className="font-body text-base leading-5 text-muted">
            {names
              ? `${names} ${riding ? (names.includes("·") ? "are in the field" : "is in the field") : names.includes("·") ? "are at this system" : "is at this system"}`
              : "Open a room from the vault. The counter stays."}
          </p>
        </div>
      </header>
      <div className="deck-interior-body">
        {deck === "lobby" ? <CounterThread /> : null}
        {deck === "arcade" ? <ArcadeFloor embedded focus="play" /> : null}
        {deck === "lounge" ? <ArcadeFloor embedded focus="club" /> : null}
        {deck === "plant" ? <ExchangeFloor embedded lane="plant" /> : null}
        {deck === "trade" ? <ExchangeFloor embedded lane="trade" /> : null}
        {deck === "lab" ? (
          <div className="deck-lab">
            <p className="font-body text-lg leading-6 text-cream">
              Pick a seed. It loads the page, the style, and the script. EDIT, TEST, then RUN. SAVE downloads it. HOST puts it on Vercel when you paste a token.
            </p>
            <section className="lab-inventory" aria-label="Lab seeds">
              {(Object.keys(LAB_APPS) as LabAppId[]).map((id) => (
                <button key={id} type="button" className="lab-seed" onClick={() => build(id)}>
                  <span className="font-body text-lg text-cream">{LAB_APPS[id].chip}</span>
                  <span className="font-body text-base text-muted">{LAB_APPS[id].blurb}</span>
                </button>
              ))}
              <button type="button" className="lab-seed" onClick={downloadLab}>
                <span className="font-body text-lg text-cream">SAVE</span>
                <span className="font-body text-base text-muted">Download this page</span>
              </button>
            </section>
            <label className="font-body text-base text-muted">
              Vercel token
              <input
                className="dock-input"
                type="password"
                value={hostToken}
                autoComplete="off"
                placeholder="Needed to host. Saved on this device."
                onChange={(e) => {
                  setHostToken(e.target.value);
                  window.localStorage.setItem("nexus-vercel-token", e.target.value);
                }}
              />
            </label>
            <button type="button" className="deck-station" disabled={hosting} onClick={() => void hostLab()}>
              {hosting ? "HOSTING" : "HOST THIS PAGE"}
            </button>
            {hostNote ? (
              hostNote.startsWith("https://") ? (
                <a className="rail-link" href={hostNote} target="_blank" rel="noopener noreferrer">
                  OPEN THE HOST
                </a>
              ) : (
                <p className="font-body text-base text-danger">{hostNote}</p>
              )
            ) : null}
            <section className="lab-files" aria-label="Files on the bench">
              {Object.entries(files).map(([path, content]) => (
                <button
                  key={path}
                  type="button"
                  className="lab-file"
                  onClick={() => {
                    setActiveFile(path);
                    setLabPane("edit");
                  }}
                >
                  {path}
                  <span>{content.split("\n").length === 1 ? "1 line" : `${content.split("\n").length} lines`}</span>
                </button>
              ))}
            </section>
            <p className="font-body text-base leading-5 text-muted">
              Desk stock is separate. {stats.sku.toUpperCase()} has {stats.stock} on hand{stats.low ? ", and it is low" : ""}.
              <button type="button" className="lab-jump" onClick={() => requestDeck("plant")}>
                Open the desk
              </button>
            </p>
            <IdePanel embedded />
          </div>
        ) : null}
        {deck === "stacks" ? <LibraryFloor /> : null}
        {deck === "core" ? <CoreFloor /> : null}
        {deck === "proof" ? <ProofFloor /> : null}
        {deck === "service" ? (
          <div className="deck-service">
            <p className="font-body text-xl text-cream">Accounts</p>
            <p className="font-body text-lg text-muted">
              Drive and Calendar need a Grok grant. GitHub, Steam, and the BTC mark are public reads. The last line is what this office cannot sign into.
            </p>
            <AccountsBoard />
            <div className="deck-stations bay">
              <button type="button" className="deck-station" onClick={() => requestDeck("plant")}>
                STOCK
              </button>
              <button type="button" className="deck-station" onClick={() => requestDeck("proof")}>
                GATE
              </button>
              <button type="button" className="deck-station" onClick={() => requestDeck("core")}>
                SESA
              </button>
              <button type="button" className="deck-station" onClick={() => openOverlay("files")}>
                FILES
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function CounterThread() {
  const messages = useNexus((s) => s.messages);
  const busy = useNexus((s) => s.busy);
  const speech = useNexus((s) => s.speech);
  const bottom = useRef<HTMLDivElement>(null);
  const thread = messages.filter((m) => m.id !== "hello").slice(-12);

  useEffect(() => {
    bottom.current?.scrollIntoView({ block: "end" });
  }, [thread.length, busy]);

  return (
    <div className="counter-thread" aria-live="polite">
      <p className="font-body text-lg text-muted">
        {speech || "The counter is the chat. Crew on this floor hear the order. Type it in the bar."}
      </p>
      {thread.map((m) => {
        const mine = m.role === "user";
        const who = mine ? "YOU" : m.name ? (ROLES[m.name]?.label ?? m.name) : "OPS";
        return (
          <div key={m.id} className={mine ? "counter-line mine" : "counter-line"}>
            <p className="font-pixel text-[10px] text-gold">{who}</p>
            <p className="bg-speech px-2 py-1 font-body text-lg leading-6 text-ink">{m.content}</p>
          </div>
        );
      })}
      {busy ? <p className="font-body text-lg text-muted">Working. If this stalls, the counter frees itself.</p> : null}
      {!thread.length ? (
        <p className="font-body text-lg text-cream">Nothing said yet. The bar under the vault sends the order here.</p>
      ) : null}
      <div ref={bottom} />
    </div>
  );
}
