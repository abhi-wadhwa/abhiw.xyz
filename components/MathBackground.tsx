"use client";

import { useEffect, useRef } from "react";

/*
  Scroll-driven computational-graph background.

  A neural-network-like graph with:
    – Nodes arranged in loose layers (input → hidden → output)
    – Curved bezier edges between adjacent layers + skip connections
    – Signal dots that flow along edges as the user scrolls
    – Floating research symbols (∇L, Q(s,a), π*(s), V*(s), …)
    – Center-fade so the graph frames content, not competes

  Color-matched to the site's dot grid: rgb(59, 108, 245).
*/

/* ---- PRNG ---- */
function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const BLUE = "59,108,245";
const LAYER_SIZES = [5, 8, 10, 10, 8, 5];

const SYMBOLS = [
  "∇L", "Q(s,a)", "π*(s)", "V*(s)", "σ(z)", "E[U(x)]",
  "P(s'|s,a)", "∂L/∂w", "λ_max", "∫ dμ", "argmax", "∑ᵢ wᵢxᵢ",
];

/* ---- types ---- */

interface Node {
  x0: number; y0: number;
  x1: number; y1: number;
  r: number;
  label?: string;
}

interface Edge {
  from: number;
  to: number;
  weight: number;
  bend: number;
}

interface Signal {
  edge: number;
  offset: number;
  speed: number;
}

/* ---- build graph ---- */

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function buildGraph() {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  let idx = 0;
  for (let layer = 0; layer < LAYER_SIZES.length; layer++) {
    const count = LAYER_SIZES[layer];
    const lx = (layer + 0.5) / LAYER_SIZES.length;

    for (let j = 0; j < count; j++) {
      const ly = (j + 0.5) / count;
      const jx = (rand(idx * 7 + 1) - 0.5) * 0.08;
      const jy = (rand(idx * 13 + 3) - 0.5) * 0.10;
      const dx = (rand(idx * 19 + 5) - 0.5) * 0.12;
      const dy = (rand(idx * 23 + 7) - 0.5) * 0.14;

      nodes.push({
        x0: clamp(lx + jx, 0.04, 0.96),
        y0: clamp(ly + jy, 0.06, 0.94),
        x1: clamp(lx + jx + dx, 0.04, 0.96),
        y1: clamp(ly + jy + dy, 0.06, 0.94),
        r: 2 + rand(idx * 31 + 9) * 2,
        label: rand(idx * 37 + 11) < 0.26
          ? SYMBOLS[idx % SYMBOLS.length]
          : undefined,
      });
      idx++;
    }
  }

  // Feed-forward edges + skip connections
  let offset = 0;
  for (let layer = 0; layer < LAYER_SIZES.length - 1; layer++) {
    const curSize = LAYER_SIZES[layer];
    const nextSize = LAYER_SIZES[layer + 1];
    const nextOff = offset + curSize;

    for (let i = 0; i < curSize; i++) {
      for (let j = 0; j < nextSize; j++) {
        if (rand(offset + i * 100 + j * 7) < 0.35) {
          edges.push({
            from: offset + i,
            to: nextOff + j,
            weight: 0.3 + rand(offset + i * 200 + j * 13) * 0.7,
            bend: (rand(offset + i * 250 + j * 29) - 0.5) * 0.3,
          });
        }
      }
    }

    if (layer < LAYER_SIZES.length - 2) {
      const skipSize = LAYER_SIZES[layer + 2];
      const skipOff = nextOff + nextSize;
      for (let i = 0; i < curSize; i++) {
        for (let j = 0; j < skipSize; j++) {
          if (rand(offset + i * 300 + j * 17) < 0.05) {
            edges.push({
              from: offset + i,
              to: skipOff + j,
              weight: 0.15 + rand(offset + i * 400 + j * 19) * 0.25,
              bend: (rand(offset + i * 450 + j * 31) - 0.5) * 0.4,
            });
          }
        }
      }
    }

    offset += curSize;
  }

  // Signals
  const signalCount = Math.min(edges.length, 25);
  const signals: Signal[] = [];
  for (let i = 0; i < signalCount; i++) {
    signals.push({
      edge: Math.floor(rand(i * 53 + 1) * edges.length),
      offset: rand(i * 59 + 3),
      speed: 2 + rand(i * 61 + 5) * 3,
    });
  }

  return { nodes, edges, signals };
}

/* ---- center fade ---- */

function centerFade(px: number, w: number): number {
  const d = Math.abs(px / w - 0.5) * 2;
  return 0.45 + 0.55 * Math.pow(d, 1.3);
}

/* ---- bezier point ---- */

function bezAt(
  ax: number, ay: number,
  cx: number, cy: number,
  bx: number, by: number,
  p: number,
) {
  const q = 1 - p;
  return {
    x: q * q * ax + 2 * q * p * cx + p * p * bx,
    y: q * q * ay + 2 * q * p * cy + p * p * by,
  };
}

/* ---- component ---- */

export default function MathBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { nodes, edges, signals } = buildGraph();

    let raf: number | null = null;
    let dirty = true;

    function fit() {
      const dpr = devicePixelRatio || 1;
      canvas!.width = innerWidth * dpr;
      canvas!.height = innerHeight * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      dirty = true;
      schedule();
    }

    function onScroll() {
      dirty = true;
      schedule();
    }

    function schedule() {
      if (raf !== null) return;
      raf = requestAnimationFrame(render);
    }

    function render() {
      raf = null;
      if (!dirty) return;
      dirty = false;

      const w = innerWidth;
      const h = innerHeight;
      ctx!.clearRect(0, 0, w, h);

      const maxScroll = document.documentElement.scrollHeight - innerHeight || 1;
      const t = scrollY / maxScroll;

      // Interpolated positions
      const pos = nodes.map((n) => {
        const px = (n.x0 + (n.x1 - n.x0) * t) * w;
        const py = (n.y0 + (n.y1 - n.y0) * t) * h;
        return {
          px, py,
          r: n.r * (1 + Math.sin(t * Math.PI * 4 + n.x0 * 20) * 0.35),
          label: n.label,
          fade: centerFade(px, w),
        };
      });

      // --- Edges (curved) ---
      ctx!.lineCap = "round";
      for (const e of edges) {
        const a = pos[e.from];
        const b = pos[e.to];

        const mx = (a.px + b.px) / 2;
        const my = (a.py + b.py) / 2;
        const dx = b.px - a.px;
        const dy = b.py - a.py;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const cpx = mx + (-dy / len) * len * e.bend;
        const cpy = my + (dx / len) * len * e.bend;

        const edgeFade = (a.fade + b.fade) / 2;
        const alpha = e.weight * 0.18 * edgeFade;

        ctx!.beginPath();
        ctx!.strokeStyle = `rgba(${BLUE},${alpha})`;
        ctx!.lineWidth = 1;
        ctx!.moveTo(a.px, a.py);
        ctx!.quadraticCurveTo(cpx, cpy, b.px, b.py);
        ctx!.stroke();
      }

      // --- Signals (soft-glow dots) ---
      for (const sig of signals) {
        const e = edges[sig.edge];
        if (!e) continue;
        const a = pos[e.from];
        const b = pos[e.to];

        const mx = (a.px + b.px) / 2;
        const my = (a.py + b.py) / 2;
        const dx = b.px - a.px;
        const dy = b.py - a.py;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const cpx = mx + (-dy / len) * len * e.bend;
        const cpy = my + (dx / len) * len * e.bend;

        const p = ((t * sig.speed + sig.offset) % 1 + 1) % 1;
        const pt = bezAt(a.px, a.py, cpx, cpy, b.px, b.py, p);
        const fa = centerFade(pt.x, w);

        // Glow
        const gr = ctx!.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 7);
        gr.addColorStop(0, `rgba(${BLUE},${0.45 * fa})`);
        gr.addColorStop(1, `rgba(${BLUE},0)`);
        ctx!.beginPath();
        ctx!.arc(pt.x, pt.y, 7, 0, Math.PI * 2);
        ctx!.fillStyle = gr;
        ctx!.fill();

        // Core
        ctx!.beginPath();
        ctx!.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${BLUE},${0.55 * fa})`;
        ctx!.fill();
      }

      // --- Nodes ---
      for (const n of pos) {
        ctx!.beginPath();
        ctx!.arc(n.px, n.py, n.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${BLUE},${0.25 * n.fade})`;
        ctx!.fill();
        ctx!.strokeStyle = `rgba(${BLUE},${0.30 * n.fade})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }

      // --- Labels ---
      ctx!.font = "10px 'JetBrains Mono', monospace";
      ctx!.textAlign = "center";
      ctx!.textBaseline = "bottom";
      for (const n of pos) {
        if (!n.label) continue;
        ctx!.fillStyle = `rgba(${BLUE},${0.30 * n.fade})`;
        ctx!.fillText(n.label, n.px, n.py - n.r - 3);
      }
    }

    fit();
    addEventListener("resize", fit);
    addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      removeEventListener("resize", fit);
      removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        filter: "blur(1.5px)",
      }}
    />
  );
}
