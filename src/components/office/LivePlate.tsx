import { useEffect, useRef } from "react";
import { useNexus } from "@/lib/nexus/store";

type Kind = "ops" | "mesh" | "cells" | "spark" | "rain" | "pong" | "banner" | "stage" | "transport";

/** Worded panels, in image space. The picture stays. These holes get a live feed. */
const WINDOWS: Record<string, [number, number, number, number, Kind][]> = {
  core: [
    [0.08, 0.03, 0.84, 0.13, "banner"],
    [0.09, 0.17, 0.24, 0.4, "cells"],
    [0.34, 0.17, 0.34, 0.32, "ops"],
    [0.69, 0.17, 0.23, 0.38, "cells"],
    [0.34, 0.5, 0.3, 0.2, "rain"],
    [0.04, 0.58, 0.34, 0.34, "mesh"],
    [0.39, 0.54, 0.3, 0.24, "ops"],
  ],
  proof: [
    [0.03, 0.03, 0.94, 0.1, "banner"],
    [0.04, 0.15, 0.22, 0.72, "cells"],
    [0.28, 0.15, 0.42, 0.38, "ops"],
    [0.72, 0.15, 0.24, 0.72, "rain"],
    [0.28, 0.55, 0.42, 0.38, "transport"],
  ],
  lab: [
    [0.02, 0.0, 0.96, 0.09, "banner"],
    [0.15, 0.12, 0.44, 0.26, "mesh"],
    [0.61, 0.12, 0.32, 0.24, "cells"],
    [0.24, 0.64, 0.5, 0.28, "rain"],
  ],
  stacks: [
    [0.0, 0.0, 1, 0.18, "banner"],
    [0.04, 0.56, 0.36, 0.26, "rain"],
    [0.58, 0.52, 0.38, 0.28, "rain"],
    [0.02, 0.84, 0.96, 0.15, "transport"],
  ],
  plant: [
    [0.0, 0.18, 0.12, 0.5, "spark"],
    [0.1, 0.16, 0.28, 0.3, "spark"],
    [0.62, 0.14, 0.34, 0.28, "mesh"],
  ],
  trade: [
    [0.0, 0.0, 1, 0.08, "banner"],
    [0.02, 0.09, 0.22, 0.28, "spark"],
    [0.52, 0.08, 0.46, 0.34, "ops"],
    [0.16, 0.4, 0.3, 0.16, "mesh"],
    [0.1, 0.86, 0.8, 0.12, "banner"],
  ],
  arcade: [
    [0.06, 0.0, 0.88, 0.12, "banner"],
    [0.02, 0.2, 0.14, 0.24, "pong"],
    [0.18, 0.24, 0.1, 0.16, "pong"],
    [0.3, 0.24, 0.1, 0.16, "cells"],
    [0.42, 0.3, 0.14, 0.2, "pong"],
    [0.6, 0.22, 0.12, 0.16, "spark"],
    [0.74, 0.22, 0.12, 0.16, "cells"],
    [0.04, 0.86, 0.92, 0.13, "banner"],
  ],
  lounge: [
    [0.0, 0.0, 0.34, 0.2, "banner"],
    [0.3, 0.08, 0.32, 0.32, "stage"],
    [0.02, 0.2, 0.12, 0.22, "pong"],
    [0.5, 0.78, 0.48, 0.18, "banner"],
  ],
  lobby: [
    [0.52, 0.36, 0.24, 0.16, "mesh"],
    [0.16, 0.4, 0.1, 0.16, "pong"],
    [0.76, 0.46, 0.12, 0.2, "pong"],
  ],
};

const INK = "#0a0a0a";
const CREAM = "#f7f7f7";
const GOLD = "#e10600";
const OK = "#f7f7f7";
const TEAL = "#e10600";

export function LivePlate({ src, deck }: { src: string; deck: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const price = useNexus((s) => s.biz.lastSpot?.price ?? 0);
  const stock = useNexus((s) => {
    const bag = s.biz.stock ?? {};
    const first = Object.values(bag)[0];
    return typeof first === "number" ? first : 0;
  });
  const queue = useNexus((s) => s.queue.reduce((n, p) => n + (p.proposal.executed ? 0 : 1), 0));
  const gold = useNexus((s) => s.gold);
  const live = useRef({ price, stock, queue, gold, x: 0.5, y: 0.5 });
  live.current = { price, stock, queue, gold, x: live.current.x, y: live.current.y };

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new Image();
    img.src = src;
    const spark = Array.from({ length: 48 }, (_, i) => 0.5 + Math.sin(i / 4) * 0.2);
    const aim = live.current;
    let raf = 0;
    let last = performance.now();
    const parent = canvas.parentElement;

    const fit = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = canvas.clientWidth || 320;
      const h = canvas.clientHeight || 120;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      aim.x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      aim.y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    };
    parent?.addEventListener("pointermove", onMove);

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const w = canvas.clientWidth || 320;
      const h = canvas.clientHeight || 120;
      ctx.clearRect(0, 0, w, h);
      if (img.complete && img.naturalWidth) {
        const ir = img.naturalWidth / img.naturalHeight;
        const cr = w / Math.max(1, h);
        let dw: number;
        let dh: number;
        let ox: number;
        let oy: number;
        if (ir > cr) {
          dh = h;
          dw = h * ir;
          ox = (w - dw) / 2;
          oy = 0;
        } else {
          dw = w;
          dh = w / ir;
          ox = 0;
          oy = (h - dh) / 2;
        }
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, ox, oy, dw, dh);
        const wins = WINDOWS[deck] ?? [];
        for (const [fx, fy, fw, fh, kind] of wins) {
          const rx = ox + fx * dw;
          const ry = oy + fy * dh;
          const rw = fw * dw;
          const rh = fh * dh;
          if (rw < 4 || rh < 4) continue;
          ctx.save();
          ctx.beginPath();
          ctx.rect(rx, ry, rw, rh);
          ctx.clip();
          ctx.fillStyle = INK;
          ctx.fillRect(rx, ry, rw, rh);
          paint(ctx, kind, rx, ry, rw, rh, now / 1000, aim, spark, dt);
          ctx.strokeStyle = "rgba(230,225,214,0.35)";
          ctx.strokeRect(rx + 0.5, ry + 0.5, rw - 1, rh - 1);
          ctx.restore();
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      parent?.removeEventListener("pointermove", onMove);
    };
  }, [src, deck]);

  return <canvas ref={ref} className="deck-art live-plate" aria-hidden />;
}

function paint(
  ctx: CanvasRenderingContext2D,
  kind: Kind,
  x: number,
  y: number,
  w: number,
  h: number,
  t: number,
  aim: { price: number; stock: number; queue: number; gold: number; x: number; y: number },
  spark: number[],
  dt: number,
) {
  if (kind === "banner") {
    const n = 8;
    for (let i = 0; i < n; i++) {
      const px = ((i / n + t * 0.08) % 1) * w;
      ctx.fillStyle = i % 2 ? GOLD : TEAL;
      ctx.globalAlpha = 0.85;
      ctx.fillRect(x + px, y + h * 0.28, Math.max(6, w * 0.08), h * 0.44);
    }
    ctx.globalAlpha = 1;
    return;
  }
  if (kind === "mesh") {
    const cx = x + w * (0.42 + aim.x * 0.16);
    const cy = y + h * (0.48 + aim.y * 0.08);
    const r = Math.min(w, h) * 0.38;
    ctx.strokeStyle = TEAL;
    ctx.fillStyle = GOLD;
    const pts: [number, number][] = [];
    for (let i = 0; i < 8; i++) {
      const a = t * 0.7 + (i / 8) * Math.PI * 2;
      const rad = r * (i % 2 ? 0.55 : 1);
      pts.push([cx + Math.cos(a) * rad, cy + Math.sin(a) * rad * 0.72]);
    }
    ctx.beginPath();
    pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
    ctx.closePath();
    ctx.stroke();
    for (let i = 0; i < pts.length; i++) {
      ctx.beginPath();
      ctx.moveTo(pts[i][0], pts[i][1]);
      ctx.lineTo(pts[(i + 3) % pts.length][0], pts[(i + 3) % pts.length][1]);
      ctx.stroke();
    }
    for (const p of pts) {
      ctx.beginPath();
      ctx.arc(p[0], p[1], 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
    return;
  }
  if (kind === "cells") {
    const cols = Math.max(4, Math.floor(w / 10));
    const rows = Math.max(3, Math.floor(h / 10));
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const on = Math.sin(t * 1.4 + c * 0.7 + r + aim.queue) > 0.2;
        ctx.fillStyle = on ? (c % 3 === 0 ? GOLD : OK) : "#1c2422";
        ctx.fillRect(x + 2 + (c * w) / cols, y + 2 + (r * h) / rows, w / cols - 2, h / rows - 2);
      }
    }
    return;
  }
  if (kind === "spark") {
    const sample = aim.price > 0 ? (aim.price % 200) / 200 : 0.5 + Math.sin(t) * 0.15 + aim.stock / 200;
    spark.push(Math.max(0.05, Math.min(0.95, sample)));
    if (spark.length > 48) spark.shift();
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    spark.forEach((v, i) => {
      const px = x + (i / (spark.length - 1)) * w;
      const py = y + h - v * h;
      if (i) ctx.lineTo(px, py);
      else ctx.moveTo(px, py);
    });
    ctx.stroke();
    ctx.lineWidth = 1;
    void dt;
    return;
  }
  if (kind === "rain") {
    const cols = Math.max(4, Math.floor(w / 8));
    for (let c = 0; c < cols; c++) {
      const drop = ((t * (0.4 + (c % 5) * 0.12) + c * 0.17) % 1) * h;
      ctx.fillStyle = c % 4 === 0 ? GOLD : TEAL;
      ctx.fillRect(x + (c * w) / cols + 1, y + drop, 2, Math.min(14, h * 0.35));
    }
    return;
  }
  if (kind === "pong") {
    const bx = x + ((t * 0.35 + aim.x) % 1) * (w - 6);
    const by = y + (0.5 + Math.sin(t * 2.2) * 0.4) * (h - 6);
    ctx.fillStyle = CREAM;
    ctx.fillRect(x + aim.x * (w - 16), y + h - 5, 16, 3);
    ctx.fillStyle = GOLD;
    ctx.fillRect(bx, by, 4, 4);
    return;
  }
  if (kind === "stage") {
    const sx = x + w * (0.3 + 0.4 * (0.5 + Math.sin(t * 0.8) * 0.5));
    const g = ctx.createRadialGradient(sx, y + h * 0.45, 4, sx, y + h * 0.45, w * 0.28);
    g.addColorStop(0, "rgba(239,200,74,0.85)");
    g.addColorStop(1, "rgba(16,22,20,0)");
    ctx.fillStyle = g;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = CREAM;
    const bob = Math.sin(t * 3) * 2;
    ctx.fillRect(x + w * 0.32, y + h * 0.45 + bob, 8, h * 0.4);
    ctx.fillRect(x + w * 0.58, y + h * 0.45 - bob, 8, h * 0.4);
    return;
  }
  if (kind === "transport") {
    ctx.fillStyle = "#24302c";
    ctx.fillRect(x + 4, y + h * 0.42, w - 8, 4);
    const head = ((t * 0.15) % 1) * (w - 16);
    ctx.fillStyle = GOLD;
    ctx.fillRect(x + 4 + head, y + h * 0.28, 8, h * 0.44);
    return;
  }
  const nodes = 5 + (aim.queue % 4);
  const pts: [number, number][] = [];
  for (let i = 0; i < nodes; i++) {
    const a = t * 0.35 + (i / nodes) * Math.PI * 2;
    pts.push([x + w * 0.5 + Math.cos(a) * w * 0.32, y + h * 0.5 + Math.sin(a * 1.3) * h * 0.28]);
  }
  ctx.strokeStyle = TEAL;
  ctx.beginPath();
  pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
  ctx.stroke();
  const token = pts[Math.floor(t * 2) % pts.length];
  ctx.fillStyle = GOLD;
  if (token) {
    ctx.beginPath();
    ctx.arc(token[0], token[1], 3, 0, Math.PI * 2);
    ctx.fill();
  }
}
