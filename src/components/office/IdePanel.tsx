import { useMemo } from "react";
import { useNexus } from "@/lib/nexus/store";
import { cn } from "@/lib/utils";

export function IdePanel({ embedded = false }: { embedded?: boolean }) {
  const files = useNexus((s) => s.files);
  const activeFile = useNexus((s) => s.activeFile);
  const setActiveFile = useNexus((s) => s.setActiveFile);
  const setFileContent = useNexus((s) => s.setFileContent);
  const events = useNexus((s) => s.events);
  const pane = useNexus((s) => s.labPane);
  const setLabPane = useNexus((s) => s.setLabPane);
  const runLabTests = useNexus((s) => s.runLabTests);
  const lastTest = useNexus((s) => s.biz.lastTest);
  const checks = useNexus((s) => s.checks);

  const html = files["index.html"] ?? "";
  const css = files["styles.css"] ?? "";
  const js = files["main.js"] ?? "";
  const srcdoc = useMemo(() => {
    if (html.includes("</head>")) {
      return html
        .replace("</head>", `<style>${css}</style></head>`)
        .replace("</body>", `<script>${js}<\/script></body>`);
    }
    return `<!doctype html><style>${css}</style>${html}<script>${js}<\/script>`;
  }, [html, css, js]);

  return (
    <section
      className={cn(
        "grid min-h-64 grid-rows-[auto_auto_1fr]",
        embedded ? "bg-panel" : "pixel-border bg-panel",
      )}
    >
      {embedded ? null : (
        <header className="flex items-center justify-between border-b-2 border-ink bg-black px-3 py-2">
          <h2 className="font-body text-2xl text-cream">Lab</h2>
          <p className="font-body text-lg text-cream">Edit, then TEST, then RUN.</p>
        </header>
      )}
      <div className="flex flex-wrap gap-1 border-b border-neutral-800 p-2">
        {(["edit", "test", "run"] as const).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => (p === "test" ? runLabTests() : setLabPane(p))}
            className={cn("lab-tab", pane === p && "on")}
          >
            {p.toUpperCase()}
          </button>
        ))}
      </div>
      {pane === "edit" ? (
        <div className="grid min-h-0 grid-rows-[auto_1fr] lg:grid-cols-[9rem_1fr]">
          <ul className="flex gap-1 overflow-x-auto border-b-2 border-ink p-2 lg:flex-col lg:border-b-0 lg:border-r-2">
            {Object.keys(files).map((path) => (
              <li key={path}>
                <button
                  type="button"
                  onClick={() => setActiveFile(path)}
                  className={cn("lab-tab", activeFile === path && "on")}
                >
                  {path}
                </button>
              </li>
            ))}
          </ul>
          <textarea
            aria-label="Source"
            value={files[activeFile] ?? ""}
            onChange={(e) => setFileContent(activeFile, e.target.value)}
            spellCheck={false}
            className="min-h-40 w-full resize-none border-0 bg-ink p-3 font-mono text-sm leading-5 text-cream outline-none"
          />
        </div>
      ) : null}
      {pane === "test" ? (
        <div className="min-h-40 overflow-y-auto p-3">
          <p className="font-body text-xl text-cream">QA runs against the lab files in this office — no outside deploy.</p>
          <ul className="mt-3 space-y-1 font-body text-xl">
            {(lastTest?.checks ?? checks.map((c) => ({ name: c, ok: c.startsWith("PASS") }))).map((c) =>
              typeof c === "string" ? (
                <li key={c}>{c}</li>
              ) : (
                <li key={c.name} className={c.ok ? "text-ok" : "text-danger"}>
                  {c.ok ? "PASS" : "FAIL"} · {c.name}
                </li>
              ),
            )}
          </ul>
          {!lastTest && !checks.length ? (
            <p className="mt-2 font-body text-xl text-muted">Hit TEST to inspect the current lab.</p>
          ) : null}
          {events.length ? (
            <p className="mt-3 truncate font-body text-lg text-muted">
              Last tool: {events.at(-1)?.actor} · {events.at(-1)?.name} · {events.at(-1)?.detail}
            </p>
          ) : null}
        </div>
      ) : null}
      {pane === "run" ? (
        <iframe title="Lab run" sandbox="allow-scripts" srcDoc={srcdoc} className="min-h-56 w-full bg-cream" />
      ) : null}
    </section>
  );
}
