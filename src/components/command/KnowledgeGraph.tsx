import { useMemo, useRef, useState, type WheelEvent } from "react";
import { GRAPH_EDGES, GRAPH_NODES, KIND_COLOR, type GraphNode } from "@/lib/nexus/command";
import { useNexus } from "@/lib/nexus/store";
import { cn } from "@/lib/utils";

export function KnowledgeGraph() {
  const selected = useNexus((s) => s.selectedNode);
  const selectNode = useNexus((s) => s.selectNode);
  const proposal = useNexus((s) => s.activeProposal);
  const [pan, setPan] = useState({ x: 0, y: 0, k: 1 });
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null);

  const nodes = useMemo(() => {
    const extra: GraphNode[] = [];
    if (proposal) {
      extra.push({
        id: `live-${proposal.id}`,
        kind: "decision",
        label: "Decision · live",
        x: 500,
        y: 400,
        detail: proposal.goal,
      });
    }
    return [...GRAPH_NODES, ...extra];
  }, [proposal]);

  const onWheel = (e: WheelEvent) => {
    const next = Math.min(2.2, Math.max(0.55, pan.k * (e.deltaY > 0 ? 0.92 : 1.08)));
    setPan((p) => ({ ...p, k: next }));
  };

  return (
    <section className="relative flex min-h-0 min-w-0 flex-1 flex-col border border-cmd-line bg-cmd-elev">
      <header className="flex items-center justify-between border-b border-cmd-line px-3 py-2">
        <h2 className="text-[11px] font-medium tracking-wide text-cmd-mute">MEMORY MAP</h2>
        <p className="text-[11px] text-cmd-mute">scroll to zoom · drag canvas · click a node</p>
      </header>
      <svg
        viewBox="0 0 800 460"
        className="min-h-0 flex-1 touch-none"
        onWheel={onWheel}
        onPointerDown={(e) => {
          if ((e.target as HTMLElement).dataset.node) return;
          drag.current = { x: pan.x, y: pan.y, px: e.clientX, py: e.clientY };
          (e.currentTarget as SVGSVGElement).setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          setPan({
            ...pan,
            x: drag.current.x + (e.clientX - drag.current.px),
            y: drag.current.y + (e.clientY - drag.current.py),
          });
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
        role="img"
        aria-label="Knowledge graph"
      >
        <g transform={`translate(${pan.x} ${pan.y}) scale(${pan.k})`}>
          {GRAPH_EDGES.map((e) => {
            const a = nodes.find((n) => n.id === e.from);
            const b = nodes.find((n) => n.id === e.to);
            if (!a || !b) return null;
            return (
              <g key={`${e.from}-${e.to}`}>
                <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#1e2a36" strokeWidth="1.5" />
              </g>
            );
          })}
          {nodes.map((n) => {
            const on = selected === n.id;
            const r = n.kind === "decision" ? 16 : 12;
            return (
              <g
                key={n.id}
                data-node="1"
                transform={`translate(${n.x} ${n.y})`}
                className="cursor-pointer"
                onClick={(ev) => {
                  ev.stopPropagation();
                  selectNode(n.id);
                }}
              >
                <circle
                  r={on ? r + 4 : r}
                  fill={KIND_COLOR[n.kind]}
                  opacity={on ? 1 : 0.88}
                  stroke={on ? "#e6eef4" : "#07090c"}
                  strokeWidth={on ? 2 : 1}
                />
                <text
                  y={r + 14}
                  textAnchor="middle"
                  fill="#c5d0db"
                  fontSize="10"
                  fontFamily="ui-sans-serif, system-ui, sans-serif"
                >
                  {n.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
      <ul className="flex flex-wrap gap-3 border-t border-cmd-line px-3 py-1.5 text-[10px] text-cmd-mute">
        {Object.entries(KIND_COLOR).map(([k, c]) => (
          <li key={k} className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: c }} />
            {k}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function NodeHint() {
  const selected = useNexus((s) => s.selectedNode);
  const node = GRAPH_NODES.find((n) => n.id === selected);
  if (!node || node.kind === "decision") return null;
  return (
    <p className={cn("border-t border-cmd-line px-3 py-2 text-sm text-cmd-fg")}>
      <span className="text-[11px] uppercase tracking-wide text-cmd-mute">{node.kind}</span>
      <span className="mt-1 block">{node.detail}</span>
    </p>
  );
}
