"use client";

import { useState, useRef, useCallback } from "react";
import Footer from "@/components/Footer";

/* ═══════════════════ DATA ═══════════════════ */
const DISCS: Record<string, { label: string; color: string; glow: string }> = {
  MATH: { label: "Mathematics", color: "#1e52f3", glow: "rgba(30,82,243,0.5)" },
  CS:   { label: "CS / ML",     color: "#7c3aed", glow: "rgba(124,58,237,0.5)" },
  ECON: { label: "Economics",   color: "#b45309", glow: "rgba(180,83,9,0.5)" },
  FIN:  { label: "Finance",     color: "#059669", glow: "rgba(5,150,105,0.5)" },
};

const NODES = [
  { id:"m1", code:"MATH 226", n:"Calculus II", cat:"MATH", lv:"UG", tier:0, col:0, desc:"Techniques of integration, sequences and series, Taylor and Maclaurin series, parametric equations, and polar coordinates.", topics:["Integration","Infinite Series","Taylor Series","Convergence","Polar Coordinates"] },
  { id:"m2", code:"MATH 229", n:"Calculus III", cat:"MATH", lv:"UG", tier:0, col:1, desc:"Multivariable calculus: partial derivatives, multiple integrals, vector calculus, Green, Stokes, and Gauss.", topics:["Partial Derivatives","Multiple Integrals","Vector Fields","Stokes' Theorem","Divergence"] },
  { id:"m3", code:"MATH 245", n:"Math of Physics & Eng.", cat:"MATH", lv:"UG", tier:1, col:0, desc:"Ordinary differential equations, Laplace transforms, Fourier series, and boundary value problems.", topics:["ODEs","Laplace Transforms","Fourier Series","Boundary Problems","Linear Systems"] },
  { id:"m4", code:"MATH 407", n:"Probability Theory", cat:"MATH", lv:"UG", tier:2, col:0, desc:"Random variables, expectation, moment generating functions, and classical limit theorems.", topics:["Distributions","Expectation","MGFs","Law of Large Numbers","CLT"] },
  { id:"m5", code:"MATH 408", n:"Mathematical Statistics", cat:"MATH", lv:"UG", tier:2, col:1, desc:"Statistical inference: estimation, hypothesis testing, confidence intervals, sufficiency, and Bayesian methods.", topics:["Estimation","Hypothesis Testing","Confidence Intervals","Sufficiency","Bayesian"] },
  { id:"m6", code:"MATH 425", n:"Real Analysis", cat:"MATH", lv:"UG", tier:1, col:1, desc:"Completeness, sequences, continuity, differentiability, and Riemann integration.", topics:["Sequences","Metric Spaces","Continuity","Differentiation","Riemann Integration"] },
  { id:"m7", code:"MATH 471", n:"Linear Algebra", cat:"MATH", lv:"UG", tier:2, col:2, desc:"Canonical forms, spectral theorem, inner product spaces, and matrix decompositions.", topics:["Eigentheory","Spectral Theorem","Jordan Form","SVD","Inner Products"] },
  { id:"m8", code:"MATH 467", n:"Optimization", cat:"MATH", lv:"UG", tier:3, col:0, desc:"Convex optimization, duality theory, KKT conditions, and numerical algorithms.", topics:["Linear Programming","Convexity","Duality","KKT","Gradient Methods"] },
  { id:"m9", code:"MATH 501", n:"Numerical Analysis", cat:"MATH", lv:"GR", tier:3, col:1, desc:"Graduate numerical methods: interpolation, quadrature, ODE/PDE solvers, and error analysis.", topics:["Interpolation","Quadrature","Iterative Solvers","Error Analysis","Stability"] },
  { id:"m10", code:"MATH 541a", n:"Grad Math Stats", cat:"MATH", lv:"GR", tier:3, col:2, desc:"Sufficiency, completeness, UMVUE, MLE, and asymptotic theory.", topics:["Sufficiency","UMVUE","MLE","Asymptotic Theory","Exponential Families"] },
  { id:"m11", code:"MATH 505b", n:"Applied Probability", cat:"MATH", lv:"GR", tier:4, col:0, desc:"Markov processes, renewal theory, martingales, Brownian motion, and diffusion.", topics:["Markov Chains","Renewal Theory","Martingales","Brownian Motion","Diffusion"] },
  { id:"m12", code:"MATH 525a", n:"Grad Real Analysis", cat:"MATH", lv:"GR", tier:4, col:1, desc:"Measure and integration, Radon-Nikodym, Fubini, convergence theorems.", topics:["Measure Theory","Lebesgue Integration","Radon-Nikodym","Fubini","Lp Spaces"] },

  { id:"c1", code:"CSCI 270", n:"Algorithms", cat:"CS", lv:"UG", tier:0, col:0, desc:"Divide-and-conquer, dynamic programming, graph algorithms, NP-completeness.", topics:["Divide & Conquer","DP","Graph Algorithms","NP-Completeness","Greedy"] },
  { id:"c2", code:"CSCI 567", n:"Machine Learning", cat:"CS", lv:"GR", tier:1, col:0, desc:"Supervised/unsupervised learning, kernel methods, neural networks, ensemble methods.", topics:["Supervised Learning","Kernels","Neural Nets","Ensembles","Model Selection"] },
  { id:"c3", code:"CSCI 573", n:"Probabilistic Reasoning", cat:"CS", lv:"GR", tier:1, col:1, desc:"Bayesian networks, Markov random fields, variational inference, and MCMC.", topics:["Bayesian Networks","MRFs","Variational Inference","MCMC","EM Algorithm"] },
  { id:"c4", code:"EE 556", n:"Stochastic Systems & RL", cat:"CS", lv:"GR", tier:2, col:0, desc:"MDPs, dynamic programming, Kalman filtering, and reinforcement learning.", topics:["MDPs","Dynamic Programming","Kalman Filter","Policy Optimization","TD Learning"] },
  { id:"c5", code:"ISE 615", n:"RL & Control Theory", cat:"CS", lv:"GR", tier:2, col:1, desc:"Stochastic control, RL theory, game theory, and mean-field analysis.", topics:["Stochastic Control","RL Theory","Game Theory","Mean-Field","Policy Gradient"] },
  { id:"c6", code:"ISE 662", n:"Decision Theory", cat:"CS", lv:"GR", tier:3, col:0, desc:"Utility functions, distribution theory, copulas, multiattribute utility, and behavioral research.", topics:["Utility Theory","Copulas","Value of Information","Game Theory","Behavioral"] },

  { id:"e1", code:"ECON 303", n:"Intermediate Micro", cat:"ECON", lv:"UG", tier:1, col:0, desc:"Consumer/producer theory, market structures, general equilibrium, and welfare.", topics:["Consumer Theory","Producer Theory","Equilibrium","Welfare","Game Theory"] },
  { id:"e2", code:"ECON 305", n:"Intermediate Macro", cat:"ECON", lv:"UG", tier:2, col:0, desc:"IS-LM model, monetary/fiscal policy, growth, and business cycles.", topics:["IS-LM","Monetary Policy","Fiscal Policy","Growth Models","Business Cycles"] },

  { id:"f1", code:"ACCT 410", n:"Accounting", cat:"FIN", lv:"UG", tier:1, col:0, desc:"Financial statements, accrual accounting, revenue recognition, and reporting.", topics:["Financial Statements","Accrual","GAAP","Ratio Analysis","Cash Flow"] },
  { id:"f2", code:"BUAD 308", n:"Business Finance", cat:"FIN", lv:"UG", tier:2, col:0, desc:"Capital budgeting, cost of capital, capital structure, and valuation.", topics:["Capital Budgeting","WACC","Capital Structure","Valuation","Dividends"] },
  { id:"f3", code:"FBE 423", n:"VC & Private Equity", cat:"FIN", lv:"UG", tier:3, col:0, desc:"Fund structures, due diligence, term sheets, and exit strategies.", topics:["Fund Structure","Due Diligence","Term Sheets","Valuation","Exits"] },
  { id:"f4", code:"FBE 435", n:"Fixed Income", cat:"FIN", lv:"UG", tier:3, col:1, desc:"Bond pricing, yield curves, duration/convexity, MBS, and rate derivatives.", topics:["Bond Pricing","Yield Curves","Duration","MBS","Derivatives"] },
];

const EDGES: [string, string][] = [
  ["m1","m3"],["m2","m3"],["m3","m4"],["m3","m6"],["m4","m5"],["m6","m7"],
  ["m5","m10"],["m7","m8"],["m6","m9"],["m4","m8"],["m4","m11"],["m6","m12"],
  ["c1","c2"],["c2","c3"],["c2","c4"],["c3","c5"],["c4","c6"],["c5","c6"],
  ["e1","e2"],
  ["f1","f2"],["f2","f3"],["f2","f4"],
];

/* ═══════════════════ LAYOUT ═══════════════════ */
const DISC_ORDER = ["MATH","CS","ECON","FIN"];
const TIER_GAP = 120;
const COL_GAP = 155;
const DISC_GAP = 70;
const NODE_R = 18;
const TOP_PAD = 50;

function computePositions() {
  const discWidths: Record<string, number> = {};
  const discX: Record<string, number> = {};

  DISC_ORDER.forEach(d => {
    const ns = NODES.filter(n => n.cat === d);
    const maxCol = Math.max(...ns.map(n => n.col), 0);
    discWidths[d] = (maxCol + 1) * COL_GAP;
  });

  let xOffset = 70;
  DISC_ORDER.forEach(d => {
    discX[d] = xOffset;
    xOffset += discWidths[d] + DISC_GAP;
  });

  const totalW = xOffset + 30;
  const pos: Record<string, { x: number; y: number }> = {};
  NODES.forEach(n => {
    pos[n.id] = {
      x: discX[n.cat] + n.col * COL_GAP,
      y: TOP_PAD + n.tier * TIER_GAP,
    };
  });

  const maxTier = Math.max(...NODES.map(n => n.tier));
  const totalH = TOP_PAD + maxTier * TIER_GAP + 90;

  return { pos, totalW, totalH, discX, discWidths };
}

/* ═══════════════════ TRADING CARD ═══════════════════ */
function TradingCard({ node, onClose }: { node: typeof NODES[0]; onClose: () => void }) {
  const disc = DISCS[node.cat];
  const cardRef = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setRot({ x: (y - 0.5) * -20, y: (x - 0.5) * 20 });
    setPos({ x: x * 100, y: y * 100 });
  }, []);

  return (
    <div className="sk-overlay" onClick={onClose}>
      <div className="sk-card-wrap" onClick={e => e.stopPropagation()}>
        <div
          ref={cardRef}
          className="sk-card"
          onMouseMove={handleMove}
          onMouseLeave={() => setRot({ x: 0, y: 0 })}
          style={{
            "--rx": `${rot.x}deg`, "--ry": `${rot.y}deg`,
            "--mx": `${pos.x}%`, "--my": `${pos.y}%`,
            "--card-color": disc.color, "--card-glow": disc.glow,
          } as React.CSSProperties}
        >
          <div className="sk-card-holo" />
          <div className="sk-card-inner">
            <div className="sk-card-head">
              <span className="sk-card-badge" style={{ color: disc.color, borderColor: disc.color + "44", background: disc.color + "12" }}>
                {disc.label}
              </span>
              <span className="sk-card-lv">{node.lv === "GR" ? "GRADUATE" : "UNDERGRADUATE"}</span>
            </div>
            {node.code && <div className="sk-card-code" style={{ color: disc.color }}>{node.code}</div>}
            <h2 className="sk-card-title">{node.n}</h2>
            <div className="sk-card-line" style={{ background: disc.color + "44" }} />
            <p className="sk-card-desc">{node.desc}</p>
            <div className="sk-card-topics">
              {node.topics.map((t, i) => (
                <span key={i} className="sk-card-topic" style={{ color: disc.color, borderColor: disc.color + "30", background: disc.color + "08" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
        <button className="sk-card-close" onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════ PAGE ═══════════════════ */
export default function CoursesPage() {
  const [selected, setSelected] = useState<typeof NODES[0] | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const { pos, totalW, totalH, discX, discWidths } = computePositions();

  const hovCat = hovered ? NODES.find(n => n.id === hovered)?.cat : null;

  return (
    <>
      <style>{INLINE_CSS}</style>

      <div className="sk-header">
        <div className="container">
          <h1 className="sk-title">Coursework</h1>
          <p className="sk-sub">
            {NODES.filter(n => n.lv === "GR").length} graduate + {NODES.filter(n => n.lv === "UG").length} undergraduate across four disciplines. Click any node.
          </p>
        </div>
      </div>

      <div className="sk-body">
        <div className="sk-legend">
          {DISC_ORDER.map(d => (
            <div key={d} className="sk-legend-item">
              <div className="sk-legend-dot" style={{ background: DISCS[d].color }} />
              <span>{DISCS[d].label}</span>
            </div>
          ))}
          <div className="sk-legend-item">
            <div className="sk-legend-dot sk-legend-dot-grad" style={{ background: "#fff", border: "2px solid var(--text-tertiary)" }} />
            <span>Graduate</span>
          </div>
        </div>

        <div className="sk-scroll">
          <svg width={totalW} height={totalH} className="sk-svg">
            {/* Disc labels */}
            {DISC_ORDER.map(d => (
              <text key={d}
                x={discX[d] + (discWidths[d] - COL_GAP) / 2}
                y={22}
                fill={DISCS[d].color}
                fontSize="11" fontWeight="700" textAnchor="middle"
                letterSpacing="3" opacity="0.25"
                style={{ textTransform: "uppercase" } as React.CSSProperties}
              >
                {DISCS[d].label}
              </text>
            ))}

            {/* Edges */}
            {EDGES.map(([a, b], i) => {
              const pa = pos[a], pb = pos[b];
              if (!pa || !pb) return null;
              const cat = NODES.find(n => n.id === a)?.cat;
              const c = DISCS[cat || "MATH"].color;
              const dim = hovCat && cat !== hovCat;
              return (
                <line key={i}
                  x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                  stroke={c} strokeWidth={dim ? 0.5 : 1.5}
                  opacity={dim ? 0.06 : 0.18}
                  strokeDasharray="5 5"
                  className="sk-edge"
                />
              );
            })}

            {/* Nodes */}
            {NODES.map(n => {
              const p = pos[n.id];
              if (!p) return null;
              const c = DISCS[n.cat].color;
              const isHov = hovered === n.id;
              const dim = hovCat && n.cat !== hovCat;
              const isGrad = n.lv === "GR";
              return (
                <g key={n.id}
                  onClick={() => setSelected(n)}
                  onMouseEnter={() => setHovered(n.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: "pointer", opacity: dim ? 0.15 : 1, transition: "opacity 0.3s" }}
                >
                  {/* Glow */}
                  <circle cx={p.x} cy={p.y} r={isHov ? 30 : 24}
                    fill={c} opacity={isHov ? 0.12 : 0.04}
                    style={{ transition: "all 0.3s" }} />
                  {/* Ring */}
                  <circle cx={p.x} cy={p.y} r={NODE_R}
                    fill={isGrad ? c + "12" : "white"}
                    stroke={c}
                    strokeWidth={isHov ? 2.5 : 1.5}
                    opacity={isHov ? 1 : 0.5}
                    style={{ transition: "all 0.25s" }} />
                  {/* Center */}
                  <circle cx={p.x} cy={p.y} r={isHov ? 6 : 4}
                    fill={c} opacity={isHov ? 1 : 0.65}
                    style={{ transition: "all 0.25s", filter: isHov ? `drop-shadow(0 0 6px ${DISCS[n.cat].glow})` : "none" }} />
                  {/* Grad marker */}
                  {isGrad && (
                    <text x={p.x} y={p.y - NODE_R - 6} textAnchor="middle" fontSize="9" fill={c} opacity="0.6">&#9733;</text>
                  )}
                  {/* Label */}
                  <text x={p.x} y={p.y + NODE_R + 15} textAnchor="middle"
                    fontSize="11" fill={isHov ? "var(--text-primary)" : "var(--text-secondary)"}
                    fontWeight={isHov ? "700" : "500"}
                    style={{ transition: "all 0.2s" }}>
                    {n.n}
                  </text>
                  <text x={p.x} y={p.y + NODE_R + 28} textAnchor="middle"
                    fontSize="9" fill="var(--text-tertiary)" fontFamily="'JetBrains Mono', monospace"
                    letterSpacing="0.5">
                    {n.code}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {selected && <TradingCard node={selected} onClose={() => setSelected(null)} />}

      <Footer />
    </>
  );
}

/* ═══════════════════ INLINE CSS ═══════════════════ */
const INLINE_CSS = `
@keyframes skEdgeDraw {
  from { stroke-dashoffset: 200; }
  to { stroke-dashoffset: 0; }
}
@keyframes skCardIn {
  from { opacity: 0; transform: scale(0.88) rotateY(-12deg); }
  to   { opacity: 1; transform: scale(1) rotateY(0); }
}
@keyframes skOverlayIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes skShimmer {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Header */
.sk-header {
  padding: 120px 0 32px;
  background: var(--bg);
}
.sk-title {
  font-size: clamp(40px, 6vw, 64px);
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.03em;
}
.sk-sub {
  font-size: 16px;
  color: var(--text-tertiary);
  margin-top: 8px;
}

/* Body */
.sk-body { padding: 0 0 80px; }

.sk-legend {
  display: flex;
  gap: 20px;
  padding: 16px 48px 20px;
  align-items: center;
  flex-wrap: wrap;
}
.sk-legend-item {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-tertiary);
}
.sk-legend-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
}
.sk-legend-dot-grad {
  width: 10px; height: 10px;
}

/* Tree scroll */
.sk-scroll {
  overflow-x: auto;
  padding: 0 48px 20px;
}
.sk-svg { display: block; }
.sk-edge {
  animation: skEdgeDraw 1.5s ease-out both;
  transition: opacity 0.3s, stroke-width 0.3s;
}

/* ── Trading Card ── */
.sk-overlay {
  position: fixed; inset: 0; z-index: 10000;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(12px);
  display: flex; align-items: center; justify-content: center;
  animation: skOverlayIn 0.2s ease-out both;
}
.sk-card-wrap {
  position: relative;
  animation: skCardIn 0.5s cubic-bezier(0.16,1,0.3,1) both;
}
.sk-card {
  width: 400px;
  border-radius: 18px;
  position: relative;
  overflow: hidden;
  transform: perspective(900px) rotateX(var(--rx)) rotateY(var(--ry));
  transition: transform 0.12s ease-out;
  background: linear-gradient(145deg, #111118, #0c0c14);
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 0 60px rgba(0,0,0,0.5), 0 0 100px var(--card-glow);
}
.sk-card::before {
  content: '';
  position: absolute; inset: -1px; z-index: 0;
  border-radius: 19px;
  background: linear-gradient(135deg, var(--card-color), #ff6b9540, #4ecdc440, var(--card-color));
  background-size: 300% 300%;
  animation: skShimmer 4s ease-in-out infinite;
  opacity: 0.5;
}
.sk-card::after {
  content: '';
  position: absolute; inset: 1px; z-index: 0;
  border-radius: 17px;
  background: linear-gradient(145deg, #111118, #0c0c14);
}
.sk-card-holo {
  position: absolute; inset: 0; z-index: 1; pointer-events: none;
  border-radius: 18px;
  background: radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,0.1), transparent 50%);
  mix-blend-mode: overlay;
}
.sk-card-inner {
  position: relative; z-index: 2;
  padding: 28px;
}
.sk-card-head {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 14px;
}
.sk-card-badge {
  padding: 4px 12px; border-radius: 5px;
  font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
  border: 1px solid;
}
.sk-card-lv {
  font-size: 10px; letter-spacing: 1.5px; color: rgba(255,255,255,0.2); font-weight: 700;
}
.sk-card-code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px; font-weight: 600; letter-spacing: 1px; margin-bottom: 6px;
}
.sk-card-title {
  font-size: 26px; font-weight: 800; letter-spacing: -0.5px;
  line-height: 1.2; color: #fff; margin-bottom: 14px;
}
.sk-card-line { height: 1px; margin-bottom: 14px; }
.sk-card-desc {
  font-size: 14px; line-height: 1.75; color: rgba(255,255,255,0.45);
  margin-bottom: 18px;
}
.sk-card-topics { display: flex; flex-wrap: wrap; gap: 6px; }
.sk-card-topic {
  padding: 4px 10px; border-radius: 5px; font-size: 11px;
  font-weight: 600; border: 1px solid;
}
.sk-card-close {
  position: absolute; top: -12px; right: -12px;
  width: 32px; height: 32px; border-radius: 50%;
  background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.6); display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.2s; backdrop-filter: blur(8px);
}
.sk-card-close:hover { background: rgba(255,255,255,0.2); color: #fff; }

@media (max-width: 900px) {
  .sk-scroll { padding: 0 16px 20px; }
  .sk-legend { padding: 16px 24px; }
  .sk-card { width: 340px; }
  .sk-card-title { font-size: 22px; }
}
`;
