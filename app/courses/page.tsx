"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";

/* ═══════════════════ AREA COLORS ═══════════════════ */
const AREA_COLORS: Record<string, string> = {
  "ML / AI": "#7c3aed",
  "Trading": "#059669",
  "Statistics": "#1e52f3",
  "Optimization": "#2563eb",
  "Theory": "#4f46e5",
  "Finance": "#059669",
  "Research": "#7c3aed",
  "Policy": "#b45309",
  "Applied": "#b45309",
  "Control": "#6d28d9",
  "Modeling": "#1e52f3",
  "Data": "#0891b2",
  "Computation": "#1e52f3",
  "Risk": "#dc2626",
  "Valtic": "#059669",
};

/* ═══════════════════ DATA ═══════════════════ */
const DISCS: Record<string, { label: string; color: string }> = {
  MATH: { label: "Mathematics", color: "#1e52f3" },
  CS:   { label: "CS / ML",     color: "#7c3aed" },
  ECON: { label: "Economics",   color: "#b45309" },
  FIN:  { label: "Finance",     color: "#059669" },
};

interface Node {
  id: string; code: string; n: string; cat: string; lv: string;
  tier: number; col: number; desc: string; areas: string[];
}

const NODES: Node[] = [
  { id:"m1", code:"MATH 226", n:"Calculus II", cat:"MATH", lv:"UG", tier:0, col:0, desc:"Techniques of integration, sequences and series, Taylor and Maclaurin series.", areas:["Theory","Computation","Applied"] },
  { id:"m2", code:"MATH 229", n:"Calculus III", cat:"MATH", lv:"UG", tier:0, col:1, desc:"Multivariable calculus: partial derivatives, multiple integrals, vector calculus.", areas:["Theory","Optimization","Applied"] },
  { id:"m3", code:"MATH 245", n:"Diff. Equations", cat:"MATH", lv:"UG", tier:1, col:0, desc:"ODEs, Laplace transforms, Fourier series, and boundary value problems.", areas:["Modeling","Control","Applied"] },
  { id:"m4", code:"MATH 407", n:"Probability", cat:"MATH", lv:"UG", tier:2, col:0, desc:"Random variables, expectation, MGFs, and classical limit theorems.", areas:["ML / AI","Trading","Statistics"] },
  { id:"m5", code:"MATH 408", n:"Statistics", cat:"MATH", lv:"UG", tier:2, col:1, desc:"Estimation, hypothesis testing, confidence intervals, sufficiency, Bayesian methods.", areas:["Statistics","Research","ML / AI"] },
  { id:"m6", code:"MATH 425", n:"Real Analysis", cat:"MATH", lv:"UG", tier:1, col:1, desc:"Completeness, sequences, continuity, differentiability, Riemann integration.", areas:["Theory","Research","Optimization"] },
  { id:"m7", code:"MATH 471", n:"Linear Algebra", cat:"MATH", lv:"UG", tier:2, col:2, desc:"Canonical forms, spectral theorem, inner product spaces, SVD.", areas:["ML / AI","Computation","Research"] },
  { id:"m8", code:"MATH 467", n:"Optimization", cat:"MATH", lv:"UG", tier:3, col:0, desc:"Convex optimization, duality theory, KKT conditions, numerical algorithms.", areas:["Optimization","ML / AI","Trading"] },
  { id:"m9", code:"MATH 501", n:"Numerical Analysis", cat:"MATH", lv:"GR", tier:3, col:1, desc:"Interpolation, quadrature, ODE/PDE solvers, and error analysis.", areas:["Computation","Modeling","Research"] },
  { id:"m10", code:"MATH 541a", n:"Grad Statistics", cat:"MATH", lv:"GR", tier:3, col:2, desc:"Sufficiency, UMVUE, MLE, and asymptotic theory.", areas:["Statistics","Research","ML / AI"] },
  { id:"m11", code:"MATH 505b", n:"Applied Probability", cat:"MATH", lv:"GR", tier:4, col:0, desc:"Markov processes, martingales, Brownian motion, diffusion.", areas:["Trading","Control","Research"] },
  { id:"m12", code:"MATH 525a", n:"Measure Theory", cat:"MATH", lv:"GR", tier:4, col:1, desc:"Measure and integration, Radon-Nikodym, Fubini, Lp spaces.", areas:["Theory","Research","Statistics"] },

  { id:"c1", code:"CSCI 270", n:"Algorithms", cat:"CS", lv:"UG", tier:0, col:0, desc:"Divide-and-conquer, DP, graph algorithms, NP-completeness.", areas:["Computation","ML / AI","Theory"] },
  { id:"c2", code:"CSCI 567", n:"Machine Learning", cat:"CS", lv:"GR", tier:1, col:0, desc:"Supervised/unsupervised learning, kernels, neural nets, ensembles.", areas:["ML / AI","Data","Research"] },
  { id:"c3", code:"CSCI 573", n:"Probabilistic Reasoning", cat:"CS", lv:"GR", tier:1, col:1, desc:"Bayesian nets, MRFs, variational inference, MCMC.", areas:["ML / AI","Statistics","Research"] },
  { id:"c4", code:"EE 556", n:"Stochastic RL", cat:"CS", lv:"GR", tier:2, col:0, desc:"MDPs, dynamic programming, Kalman filtering, RL.", areas:["Control","Trading","ML / AI"] },
  { id:"c5", code:"ISE 615", n:"RL & Control", cat:"CS", lv:"GR", tier:2, col:1, desc:"Stochastic control, RL theory, game theory, mean-field.", areas:["Control","ML / AI","Theory"] },
  { id:"c6", code:"ISE 662", n:"Decision Theory", cat:"CS", lv:"GR", tier:3, col:0, desc:"Utility, copulas, multiattribute utility, game theory.", areas:["Trading","Theory","Policy"] },

  { id:"e1", code:"ECON 303", n:"Microeconomics", cat:"ECON", lv:"UG", tier:1, col:0, desc:"Consumer/producer theory, market structures, equilibrium, welfare.", areas:["Policy","Theory","Trading"] },
  { id:"e2", code:"ECON 305", n:"Macroeconomics", cat:"ECON", lv:"UG", tier:2, col:0, desc:"IS-LM, monetary/fiscal policy, growth, business cycles.", areas:["Policy","Finance","Modeling"] },

  { id:"f1", code:"ACCT 410", n:"Accounting", cat:"FIN", lv:"UG", tier:1, col:0, desc:"Financial statements, accrual accounting, GAAP, reporting.", areas:["Finance","Applied","Modeling"] },
  { id:"f2", code:"BUAD 308", n:"Corporate Finance", cat:"FIN", lv:"UG", tier:2, col:0, desc:"Capital budgeting, WACC, capital structure, valuation.", areas:["Finance","Trading","Modeling"] },
  { id:"f3", code:"FBE 423", n:"VC & PE", cat:"FIN", lv:"UG", tier:3, col:0, desc:"Fund structures, due diligence, term sheets, exits.", areas:["Finance","Applied","Risk"] },
  { id:"f4", code:"FBE 435", n:"Fixed Income", cat:"FIN", lv:"UG", tier:3, col:1, desc:"Bond pricing, yield curves, duration/convexity, MBS.", areas:["Trading","Risk","Finance"] },
];

const EDGES: [string, string][] = [
  ["m1","m3"],["m2","m3"],["m3","m4"],["m3","m6"],["m4","m5"],["m6","m7"],
  ["m5","m10"],["m7","m8"],["m6","m9"],["m4","m8"],["m4","m11"],["m6","m12"],
  ["m7","m9"],["m11","m12"],["m8","m9"],
  ["c1","c2"],["c2","c3"],["c2","c4"],["c3","c5"],["c4","c6"],["c5","c6"],["c4","c5"],
  ["m4","c2"],["m4","c3"],["m8","c4"],["m7","c2"],["m11","c4"],["m5","c3"],
  ["m6","e1"],["m4","e1"],
  ["e1","e2"],["e1","f2"],["e2","f2"],
  ["f1","f2"],["f2","f3"],["f2","f4"],["f4","m11"],
];

/* ═══════════════════ LAYOUT ═══════════════════ */
const DISC_ORDER = ["MATH","CS","ECON","FIN"];
const TIER_GAP = 190;
const COL_GAP = 200;
const DISC_GAP = 100;
const R_OUTER = 44;
const R_INNER = 27;
const TOP_PAD = 65;

function computePositions() {
  const discWidths: Record<string, number> = {};
  const discX: Record<string, number> = {};
  DISC_ORDER.forEach(d => {
    const maxCol = Math.max(...NODES.filter(n => n.cat === d).map(n => n.col), 0);
    discWidths[d] = (maxCol + 1) * COL_GAP;
  });
  let xOff = 90;
  DISC_ORDER.forEach(d => { discX[d] = xOff; xOff += discWidths[d] + DISC_GAP; });
  const pos: Record<string, { x: number; y: number }> = {};
  NODES.forEach(n => { pos[n.id] = { x: discX[n.cat] + n.col * COL_GAP, y: TOP_PAD + n.tier * TIER_GAP }; });
  const maxT = Math.max(...NODES.map(n => n.tier));
  return { pos, totalW: xOff + 50, totalH: TOP_PAD + maxT * TIER_GAP + 110, discX, discWidths };
}

/* SVG arc segment for the outer ring */
function arcPath(cx: number, cy: number, r1: number, r2: number, a1: number, a2: number) {
  const gap = 0.04; // small gap between segments
  const sa = a1 + gap, ea = a2 - gap;
  const x1o = cx + r2 * Math.cos(sa), y1o = cy + r2 * Math.sin(sa);
  const x2o = cx + r2 * Math.cos(ea), y2o = cy + r2 * Math.sin(ea);
  const x1i = cx + r1 * Math.cos(ea), y1i = cy + r1 * Math.sin(ea);
  const x2i = cx + r1 * Math.cos(sa), y2i = cy + r1 * Math.sin(sa);
  const lg = ea - sa > Math.PI ? 1 : 0;
  return `M${x1o},${y1o} A${r2},${r2} 0 ${lg} 1 ${x2o},${y2o} L${x1i},${y1i} A${r1},${r1} 0 ${lg} 0 ${x2i},${y2i} Z`;
}

function curvePath(x1: number, y1: number, x2: number, y2: number) {
  const my = (y1 + y2) / 2;
  return `M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`;
}

/* ═══════════════════ NODE COMPONENT ═══════════════════ */
function CourseNode({ node, p, isHov, isSel, dim, onHover, onSelect }: {
  node: Node; p: { x: number; y: number }; isHov: boolean; isSel: boolean; dim: boolean;
  onHover: (id: string | null) => void; onSelect: (n: Node | null) => void;
}) {
  const c = DISCS[node.cat].color;
  const active = isHov || isSel;
  const sliceAngle = (2 * Math.PI) / node.areas.length;

  return (
    <g onClick={() => onSelect(isSel ? null : node)}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      style={{ cursor: "pointer", opacity: dim ? 0.1 : 1, transition: "opacity 0.3s" }}>

      {/* Outer glow on active */}
      {active && (
        <circle cx={p.x} cy={p.y} r={R_OUTER + 8} fill={c} opacity={0.08} />
      )}

      {/* Outer ring segments */}
      {node.areas.map((area, i) => {
        const a1 = -Math.PI / 2 + i * sliceAngle;
        const a2 = a1 + sliceAngle;
        const ac = AREA_COLORS[area] || "#888";
        return (
          <path key={i} d={arcPath(p.x, p.y, R_INNER + 2, R_OUTER, a1, a2)}
            fill={ac} opacity={active ? 0.35 : 0.15}
            style={{ transition: "opacity 0.3s" }} />
        );
      })}

      {/* Inner circle */}
      <circle cx={p.x} cy={p.y} r={R_INNER}
        fill="#fff" stroke={c} strokeWidth={active ? 2 : 1}
        style={{ transition: "all 0.25s" }} />

      {/* Course name inside */}
      <text x={p.x} y={p.y - 4} textAnchor="middle" fontSize="9.5"
        fontWeight="700" fill={c}
        style={{ transition: "all 0.2s" }}>
        {node.n}
      </text>
      <text x={p.x} y={p.y + 8} textAnchor="middle" fontSize="7.5"
        fill="#888" fontFamily="'JetBrains Mono',monospace" letterSpacing="0.3">
        {node.code}
      </text>

      {/* Grad star */}
      {node.lv === "GR" && (
        <text x={p.x} y={p.y - R_INNER - 4} textAnchor="middle"
          fontSize="9" fill={c} opacity="0.6">&#9733;</text>
      )}

      {/* Area labels on hover */}
      {active && node.areas.map((area, i) => {
        const a = -Math.PI / 2 + i * sliceAngle + sliceAngle / 2;
        const lr = R_OUTER + 18;
        const lx = p.x + lr * Math.cos(a);
        const ly = p.y + lr * Math.sin(a);
        const ac = AREA_COLORS[area] || "#888";
        return (
          <g key={i}>
            <rect x={lx - 24} y={ly - 7} width={48} height={14} rx={3}
              fill={ac} opacity={0.9} />
            <text x={lx} y={ly + 3.5} textAnchor="middle" fontSize="7.5"
              fontWeight="700" fill="#fff" letterSpacing="0.3">
              {area}
            </text>
          </g>
        );
      })}
    </g>
  );
}

/* ═══════════════════ PAGE ═══════════════════ */
export default function CoursesPage() {
  const [selected, setSelected] = useState<Node | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const { pos, totalW, totalH, discX, discWidths } = computePositions();
  const hovCat = hovered ? NODES.find(n => n.id === hovered)?.cat : null;

  return (
    <>
      <style>{CSS}</style>

      <div className="sk-header">
        <div className="container">
          <h1 className="sk-title">Coursework</h1>
          <p className="sk-sub">
            {NODES.filter(n => n.lv === "GR").length} graduate + {NODES.filter(n => n.lv === "UG").length} undergraduate.
            Each node shows the course and its areas of relevance. Click to expand.
          </p>
        </div>
      </div>

      <div className="sk-body">
        <div className="sk-legend">
          {DISC_ORDER.map(d => (
            <div key={d} className="sk-leg">
              <div className="sk-leg-dot" style={{ background: DISCS[d].color }} />
              <span>{DISCS[d].label}</span>
            </div>
          ))}
          <span className="sk-leg-sep">|</span>
          {["ML / AI","Trading","Statistics","Theory","Optimization","Policy"].map(a => (
            <div key={a} className="sk-leg">
              <div className="sk-leg-dot" style={{ background: AREA_COLORS[a] }} />
              <span>{a}</span>
            </div>
          ))}
        </div>

        <div className="sk-scroll">
          <svg
            width={totalW}
            height={selected ? totalH + 160 : totalH}
            viewBox={
              selected && pos[selected.id]
                ? `${pos[selected.id].x - 280} ${pos[selected.id].y - 120} 560 400`
                : `0 0 ${totalW} ${totalH}`
            }
            style={{ transition: "viewBox 0.6s", transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
            className={selected ? "sk-svg-zoomed" : ""}
          >
            {/* Click background to deselect */}
            <rect x="0" y="0" width={totalW} height={totalH + 160} fill="transparent"
              onClick={() => setSelected(null)} />

            {/* Disc column labels */}
            {DISC_ORDER.map(d => (
              <text key={d} x={discX[d] + (discWidths[d] - COL_GAP) / 2} y={24}
                fill={DISCS[d].color} fontSize="10" fontWeight="700"
                textAnchor="middle" letterSpacing="3" opacity="0.2"
                style={{ textTransform: "uppercase" } as React.CSSProperties}>
                {DISCS[d].label}
              </text>
            ))}

            {/* Edges */}
            {EDGES.map(([a, b], i) => {
              const pa = pos[a], pb = pos[b];
              if (!pa || !pb) return null;
              const na = NODES.find(n => n.id === a);
              const nb = NODES.find(n => n.id === b);
              const cross = na?.cat !== nb?.cat;
              const c = cross ? "#aaa" : DISCS[na?.cat || "MATH"].color;
              const dim = hovCat && na?.cat !== hovCat && nb?.cat !== hovCat;
              const active = hovered && (a === hovered || b === hovered);
              return (
                <path key={i} d={curvePath(pa.x, pa.y, pb.x, pb.y)}
                  fill="none" stroke={active ? c : c}
                  strokeWidth={active ? 2.5 : cross ? 0.8 : 1.2}
                  opacity={dim ? 0.03 : active ? 0.5 : cross ? 0.08 : 0.14}
                  strokeDasharray={cross ? "4 4" : "none"}
                  style={{ transition: "all 0.3s" }} />
              );
            })}

            {/* Nodes */}
            {NODES.map(n => {
              const p = pos[n.id];
              if (!p) return null;
              const dim = !!(hovCat && n.cat !== hovCat);
              return (
                <CourseNode key={n.id} node={n} p={p}
                  isHov={hovered === n.id} isSel={selected?.id === n.id} dim={dim}
                  onHover={setHovered} onSelect={setSelected} />
              );
            })}
            {/* Inline detail below selected node */}
            {selected && pos[selected.id] && (
              <foreignObject
                x={pos[selected.id].x - 200}
                y={pos[selected.id].y + R_OUTER + 20}
                width={400}
                height={180}
              >
                <div className="sk-inline-detail" style={{ borderColor: DISCS[selected.cat].color + "44" }}>
                  <div className="sk-inline-head">
                    <span style={{ color: DISCS[selected.cat].color, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>
                      {selected.code}
                    </span>
                    {selected.lv === "GR" && (
                      <span style={{ fontSize: 9, fontWeight: 700, color: DISCS[selected.cat].color, letterSpacing: 1, textTransform: "uppercase" as const, marginLeft: 8, padding: "1px 6px", border: `1px solid ${DISCS[selected.cat].color}`, borderRadius: 3 }}>
                        GRAD
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#252525", marginBottom: 6 }}>{selected.n}</div>
                  <div style={{ fontSize: 11, lineHeight: 1.7, color: "#555" }}>{selected.desc}</div>
                  <div style={{ display: "flex", gap: 5, marginTop: 8, flexWrap: "wrap" as const }}>
                    {selected.areas.map(a => (
                      <span key={a} style={{ fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 4, color: AREA_COLORS[a], border: `1px solid ${AREA_COLORS[a]}33`, background: AREA_COLORS[a] + "08" }}>
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </foreignObject>
            )}

          </svg>
        </div>
      </div>

      <Footer />
    </>
  );
}

const CSS = `
.sk-header { padding: 120px 0 24px; background: var(--bg); }
.sk-title { font-size: clamp(40px,6vw,64px); font-weight: 800; color: var(--text-primary); letter-spacing: -0.03em; }
.sk-sub { font-size: 15px; color: var(--text-tertiary); margin-top: 8px; max-width: 600px; line-height: 1.6; }

.sk-body { padding: 0 0 80px; }

.sk-legend { display: flex; gap: 14px; padding: 16px 48px 16px; align-items: center; flex-wrap: wrap; }
.sk-leg { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; color: var(--text-tertiary); }
.sk-leg-dot { width: 7px; height: 7px; border-radius: 50%; }
.sk-leg-sep { color: var(--border-hover); font-size: 14px; }

.sk-scroll { overflow-x: auto; padding: 0 48px 20px; }
.sk-scroll svg { display: block; transition: all 0.6s cubic-bezier(0.16,1,0.3,1); }
.sk-svg-zoomed { cursor: zoom-out; }

.sk-inline-detail {
  background: #fff;
  border: 1px solid;
  border-radius: 10px;
  padding: 14px 18px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  animation: skDetailIn 0.35s cubic-bezier(0.16,1,0.3,1) both;
}
@keyframes skDetailIn {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}


@media (max-width: 900px) {
  .sk-scroll { padding: 0 16px; }
  .sk-legend { padding: 16px 24px; gap: 10px; }
  .sk-detail-inner { padding: 20px 24px; }
  .sk-detail-name { font-size: 20px; }
}
`;
