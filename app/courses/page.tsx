"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";

/* ═══════════════════ DATA ═══════════════════ */
const DISCS: Record<string, { label: string; color: string }> = {
  MATH: { label: "Mathematics", color: "#1e52f3" },
  CS:   { label: "CS / ML",     color: "#7c3aed" },
  ECON: { label: "Economics",   color: "#b45309" },
  FIN:  { label: "Finance",     color: "#059669" },
};

const NODES = [
  { id:"m1", code:"MATH 226", n:"Calculus II", cat:"MATH", lv:"UG", tier:0, col:0, desc:"Techniques of integration, sequences and series, Taylor and Maclaurin series, parametric equations, and polar coordinates." },
  { id:"m2", code:"MATH 229", n:"Calculus III", cat:"MATH", lv:"UG", tier:0, col:1, desc:"Multivariable calculus: partial derivatives, multiple integrals, vector calculus, Green, Stokes, and Gauss." },
  { id:"m3", code:"MATH 245", n:"Math of Physics & Eng.", cat:"MATH", lv:"UG", tier:1, col:0, desc:"Ordinary differential equations, Laplace transforms, Fourier series, and boundary value problems." },
  { id:"m4", code:"MATH 407", n:"Probability Theory", cat:"MATH", lv:"UG", tier:2, col:0, desc:"Random variables, expectation, moment generating functions, and classical limit theorems." },
  { id:"m5", code:"MATH 408", n:"Mathematical Statistics", cat:"MATH", lv:"UG", tier:2, col:1, desc:"Statistical inference: estimation, hypothesis testing, confidence intervals, sufficiency, and Bayesian methods." },
  { id:"m6", code:"MATH 425", n:"Real Analysis", cat:"MATH", lv:"UG", tier:1, col:1, desc:"Completeness, sequences, continuity, differentiability, and Riemann integration." },
  { id:"m7", code:"MATH 471", n:"Linear Algebra", cat:"MATH", lv:"UG", tier:2, col:2, desc:"Canonical forms, spectral theorem, inner product spaces, and matrix decompositions." },
  { id:"m8", code:"MATH 467", n:"Optimization", cat:"MATH", lv:"UG", tier:3, col:0, desc:"Convex optimization, duality theory, KKT conditions, and numerical algorithms." },
  { id:"m9", code:"MATH 501", n:"Numerical Analysis", cat:"MATH", lv:"GR", tier:3, col:1, desc:"Graduate numerical methods: interpolation, quadrature, ODE/PDE solvers, and error analysis." },
  { id:"m10", code:"MATH 541a", n:"Grad Math Stats", cat:"MATH", lv:"GR", tier:3, col:2, desc:"Sufficiency, completeness, UMVUE, MLE, and asymptotic theory." },
  { id:"m11", code:"MATH 505b", n:"Applied Probability", cat:"MATH", lv:"GR", tier:4, col:0, desc:"Markov processes, renewal theory, martingales, Brownian motion, and diffusion." },
  { id:"m12", code:"MATH 525a", n:"Grad Real Analysis", cat:"MATH", lv:"GR", tier:4, col:1, desc:"Measure and integration, Radon-Nikodym, Fubini, convergence theorems." },

  { id:"c1", code:"CSCI 270", n:"Algorithms", cat:"CS", lv:"UG", tier:0, col:0, desc:"Divide-and-conquer, dynamic programming, graph algorithms, NP-completeness." },
  { id:"c2", code:"CSCI 567", n:"Machine Learning", cat:"CS", lv:"GR", tier:1, col:0, desc:"Supervised/unsupervised learning, kernel methods, neural networks, ensemble methods." },
  { id:"c3", code:"CSCI 573", n:"Probabilistic Reasoning", cat:"CS", lv:"GR", tier:1, col:1, desc:"Bayesian networks, Markov random fields, variational inference, and MCMC." },
  { id:"c4", code:"EE 556", n:"Stochastic Systems & RL", cat:"CS", lv:"GR", tier:2, col:0, desc:"MDPs, dynamic programming, Kalman filtering, and reinforcement learning." },
  { id:"c5", code:"ISE 615", n:"RL & Control Theory", cat:"CS", lv:"GR", tier:2, col:1, desc:"Stochastic control, RL theory, game theory, and mean-field analysis." },
  { id:"c6", code:"ISE 662", n:"Decision Theory", cat:"CS", lv:"GR", tier:3, col:0, desc:"Utility functions, distribution theory, copulas, multiattribute utility, and behavioral research." },

  { id:"e1", code:"ECON 303", n:"Intermediate Micro", cat:"ECON", lv:"UG", tier:1, col:0, desc:"Consumer/producer theory, market structures, general equilibrium, and welfare." },
  { id:"e2", code:"ECON 305", n:"Intermediate Macro", cat:"ECON", lv:"UG", tier:2, col:0, desc:"IS-LM model, monetary/fiscal policy, growth, and business cycles." },

  { id:"f1", code:"ACCT 410", n:"Accounting", cat:"FIN", lv:"UG", tier:1, col:0, desc:"Financial statements, accrual accounting, revenue recognition, and reporting." },
  { id:"f2", code:"BUAD 308", n:"Business Finance", cat:"FIN", lv:"UG", tier:2, col:0, desc:"Capital budgeting, cost of capital, capital structure, and valuation." },
  { id:"f3", code:"FBE 423", n:"VC & Private Equity", cat:"FIN", lv:"UG", tier:3, col:0, desc:"Fund structures, due diligence, term sheets, and exit strategies." },
  { id:"f4", code:"FBE 435", n:"Fixed Income", cat:"FIN", lv:"UG", tier:3, col:1, desc:"Bond pricing, yield curves, duration/convexity, MBS, and rate derivatives." },
];

/* Edges: within + cross-discipline */
const EDGES: [string, string][] = [
  // Math internal
  ["m1","m3"],["m2","m3"],["m3","m4"],["m3","m6"],["m4","m5"],["m6","m7"],
  ["m5","m10"],["m7","m8"],["m6","m9"],["m4","m8"],["m4","m11"],["m6","m12"],
  ["m7","m9"],["m11","m12"],
  // CS internal
  ["c1","c2"],["c2","c3"],["c2","c4"],["c3","c5"],["c4","c6"],["c5","c6"],
  // Cross: Math → CS
  ["m4","c2"],["m4","c3"],["m8","c4"],["m7","c2"],["m11","c4"],
  // Cross: Math → Econ
  ["m6","e1"],
  // Econ internal + cross
  ["e1","e2"],["e1","f2"],
  // Finance internal
  ["f1","f2"],["f2","f3"],["f2","f4"],
];

/* ═══════════════════ LAYOUT ═══════════════════ */
const DISC_ORDER = ["MATH","CS","ECON","FIN"];
const TIER_GAP = 125;
const COL_GAP = 160;
const DISC_GAP = 80;
const NODE_R = 20;
const TOP_PAD = 55;

function computePositions() {
  const discWidths: Record<string, number> = {};
  const discX: Record<string, number> = {};

  DISC_ORDER.forEach(d => {
    const ns = NODES.filter(n => n.cat === d);
    const maxCol = Math.max(...ns.map(n => n.col), 0);
    discWidths[d] = (maxCol + 1) * COL_GAP;
  });

  let xOffset = 80;
  DISC_ORDER.forEach(d => {
    discX[d] = xOffset;
    xOffset += discWidths[d] + DISC_GAP;
  });

  const pos: Record<string, { x: number; y: number }> = {};
  NODES.forEach(n => {
    pos[n.id] = { x: discX[n.cat] + n.col * COL_GAP, y: TOP_PAD + n.tier * TIER_GAP };
  });

  const maxTier = Math.max(...NODES.map(n => n.tier));
  return { pos, totalW: xOffset + 40, totalH: TOP_PAD + maxTier * TIER_GAP + 100, discX, discWidths };
}

function curvePath(x1: number, y1: number, x2: number, y2: number) {
  const midY = (y1 + y2) / 2;
  return `M${x1},${y1} C${x1},${midY} ${x2},${midY} ${x2},${y2}`;
}

/* ═══════════════════ PAGE ═══════════════════ */
export default function CoursesPage() {
  const [selected, setSelected] = useState<typeof NODES[0] | null>(null);
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
            Click any node.
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
          <span className="sk-leg-hint">&#9733; = graduate</span>
        </div>

        <div className="sk-scroll">
          <svg width={totalW} height={totalH}>
            {/* Disc column labels */}
            {DISC_ORDER.map(d => (
              <text key={d} x={discX[d] + (discWidths[d] - COL_GAP) / 2} y={20}
                fill={DISCS[d].color} fontSize="10" fontWeight="700"
                textAnchor="middle" letterSpacing="3" opacity="0.2"
                style={{ textTransform: "uppercase" } as React.CSSProperties}>
                {DISCS[d].label}
              </text>
            ))}

            {/* Edges — curved bezier */}
            {EDGES.map(([a, b], i) => {
              const pa = pos[a], pb = pos[b];
              if (!pa || !pb) return null;
              const na = NODES.find(n => n.id === a);
              const nb = NODES.find(n => n.id === b);
              const cross = na?.cat !== nb?.cat;
              const c = cross ? "#999" : DISCS[na?.cat || "MATH"].color;
              const dim = hovCat && na?.cat !== hovCat && nb?.cat !== hovCat;
              return (
                <path key={i} d={curvePath(pa.x, pa.y, pb.x, pb.y)}
                  fill="none" stroke={c}
                  strokeWidth={cross ? 1 : 1.5}
                  opacity={dim ? 0.04 : cross ? 0.12 : 0.2}
                  strokeDasharray={cross ? "4 4" : "none"}
                  className="sk-edge" />
              );
            })}

            {/* Nodes */}
            {NODES.map(n => {
              const p = pos[n.id];
              if (!p) return null;
              const c = DISCS[n.cat].color;
              const isHov = hovered === n.id;
              const isSel = selected?.id === n.id;
              const dim = hovCat && n.cat !== hovCat;
              return (
                <g key={n.id}
                  onClick={() => setSelected(isSel ? null : n)}
                  onMouseEnter={() => setHovered(n.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: "pointer", opacity: dim ? 0.12 : 1, transition: "opacity 0.3s" }}>
                  <circle cx={p.x} cy={p.y} r={isHov || isSel ? 30 : 24}
                    fill={c} opacity={isHov || isSel ? 0.1 : 0.03}
                    style={{ transition: "all 0.3s" }} />
                  <circle cx={p.x} cy={p.y} r={NODE_R}
                    fill={n.lv === "GR" ? c + "10" : "#fff"}
                    stroke={c} strokeWidth={isHov || isSel ? 2.5 : 1.5}
                    opacity={isHov || isSel ? 1 : 0.45}
                    style={{ transition: "all 0.25s" }} />
                  <circle cx={p.x} cy={p.y} r={isHov || isSel ? 6 : 4}
                    fill={c} opacity={isHov || isSel ? 1 : 0.6}
                    style={{ transition: "all 0.25s" }} />
                  {n.lv === "GR" && (
                    <text x={p.x} y={p.y - NODE_R - 5} textAnchor="middle"
                      fontSize="9" fill={c} opacity="0.55">&#9733;</text>
                  )}
                  <text x={p.x} y={p.y + NODE_R + 15} textAnchor="middle"
                    fontSize="11" fill={isHov || isSel ? "#252525" : "#555"}
                    fontWeight={isHov || isSel ? "700" : "500"}
                    style={{ transition: "all 0.2s" }}>{n.n}</text>
                  <text x={p.x} y={p.y + NODE_R + 28} textAnchor="middle"
                    fontSize="9" fill="#999" fontFamily="'JetBrains Mono',monospace"
                    letterSpacing="0.5">{n.code}</text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Inline detail panel — like Experience cards */}
        <div className="container">
          <AnimatePresence>
            {selected && (
              <motion.div
                key={selected.id}
                className="sk-detail"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="sk-detail-inner" style={{ borderLeftColor: DISCS[selected.cat].color }}>
                  <div className="sk-detail-head">
                    <div>
                      <span className="sk-detail-code" style={{ color: DISCS[selected.cat].color }}>{selected.code}</span>
                      {selected.lv === "GR" && <span className="sk-detail-grad">Graduate</span>}
                    </div>
                    <button className="sk-detail-close" onClick={() => setSelected(null)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                  <h3 className="sk-detail-name">{selected.n}</h3>
                  <p className="sk-detail-desc">{selected.desc}</p>
                  <span className="sk-detail-cat" style={{ color: DISCS[selected.cat].color }}>{DISCS[selected.cat].label}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </>
  );
}

/* ═══════════════════ CSS ═══════════════════ */
const CSS = `
.sk-header { padding: 120px 0 32px; background: var(--bg); }
.sk-title { font-size: clamp(40px,6vw,64px); font-weight: 800; color: var(--text-primary); letter-spacing: -0.03em; }
.sk-sub { font-size: 16px; color: var(--text-tertiary); margin-top: 8px; }

.sk-body { padding: 0 0 80px; }

.sk-legend { display: flex; gap: 20px; padding: 16px 48px 20px; align-items: center; flex-wrap: wrap; }
.sk-leg { display: flex; align-items: center; gap: 7px; font-size: 12px; font-weight: 600; color: var(--text-tertiary); }
.sk-leg-dot { width: 8px; height: 8px; border-radius: 50%; }
.sk-leg-hint { font-size: 11px; color: var(--text-tertiary); margin-left: auto; opacity: 0.5; }

.sk-scroll { overflow-x: auto; padding: 0 48px 20px; }
.sk-scroll svg { display: block; }

.sk-edge { transition: opacity 0.3s, stroke-width 0.3s; }

/* Detail panel — light, inline */
.sk-detail { overflow: hidden; margin-top: 24px; }
.sk-detail-inner {
  padding: 28px 32px;
  border: 1px solid var(--border);
  border-left: 4px solid;
  border-radius: 14px;
  background: var(--bg);
}
.sk-detail-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.sk-detail-code { font-size: 13px; font-weight: 700; font-family: 'JetBrains Mono',monospace; letter-spacing: 0.04em; }
.sk-detail-grad { font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--accent); margin-left: 12px; padding: 2px 8px; border: 1px solid var(--accent); border-radius: 4px; }
.sk-detail-close { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--text-tertiary); transition: all 0.2s; }
.sk-detail-close:hover { color: var(--text-primary); background: var(--surface); }
.sk-detail-name { font-size: 24px; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em; margin-bottom: 10px; }
.sk-detail-desc { font-size: 16px; line-height: 1.8; color: var(--text-secondary); max-width: 680px; margin-bottom: 12px; }
.sk-detail-cat { font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; }

@media (max-width: 900px) {
  .sk-scroll { padding: 0 16px; }
  .sk-legend { padding: 16px 24px; }
  .sk-detail-inner { padding: 20px 24px; }
  .sk-detail-name { font-size: 20px; }
}
`;
