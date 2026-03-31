"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";

/* ═══════════════════ DISCIPLINE COLORS ═══════════════════ */
const DISCIPLINES: Record<string, { label: string; color: string }> = {
  MATH: { label: "Mathematics", color: "#1e52f3" },
  CS:   { label: "CS / ML",     color: "#7c3aed" },
  ECON: { label: "Economics",   color: "#b45309" },
  FIN:  { label: "Finance",     color: "#059669" },
};

const AREA_COLORS: Record<string, string> = {
  "ML/AI": "#7c3aed", "Trading": "#059669", "Statistics": "#1e52f3",
  "Optimization": "#2563eb", "Theory": "#4f46e5", "Finance": "#059669",
  "Research": "#7c3aed", "Policy": "#b45309", "Applied": "#b45309",
  "Control": "#6d28d9", "Modeling": "#1e52f3", "Data": "#0891b2",
  "Computation": "#1e52f3", "Risk": "#dc2626",
};

const DISCIPLINE_ORDER = ["MATH", "CS", "ECON", "FIN"];
const TIER_LABELS = ["Foundations", "Core", "Intermediate", "Advanced", "Graduate"];

/* ═══════════════════ COURSE DATA ═══════════════════ */
interface CourseNode {
  id: string; code: string; name: string; category: string; level: string;
  tier: number; col: number; desc: string; areas: string[];
  semester?: string; textbook?: string;
}

const COURSES: CourseNode[] = [
  { id:"m1",code:"MATH 226",name:"Calculus II",category:"MATH",level:"UG",tier:0,col:0,desc:"Techniques of integration, sequences and series, Taylor series.",areas:["Theory","Computation","Applied"],semester:"Fall 2023" },
  { id:"m2",code:"MATH 229",name:"Calculus III",category:"MATH",level:"UG",tier:0,col:1,desc:"Multivariable calculus: partial derivatives, integrals, vector calculus.",areas:["Theory","Optimization","Applied"],semester:"Fall 2023" },
  { id:"m3",code:"MATH 245",name:"Diff. Equations",category:"MATH",level:"UG",tier:1,col:0,desc:"ODEs, Laplace transforms, Fourier series, boundary value problems.",areas:["Modeling","Control","Applied"],semester:"Spring 2024" },
  { id:"m4",code:"MATH 407",name:"Probability",category:"MATH",level:"UG",tier:2,col:0,desc:"Random variables, expectation, MGFs, and classical limit theorems.",areas:["ML/AI","Trading","Statistics"],semester:"Fall 2024",textbook:"Grimmett" },
  { id:"m5",code:"MATH 408",name:"Statistics",category:"MATH",level:"UG",tier:2,col:1,desc:"Estimation, hypothesis testing, confidence intervals, Bayesian methods.",areas:["Statistics","Research","ML/AI"],semester:"Fall 2025",textbook:"Wackerly" },
  { id:"m6",code:"MATH 425",name:"Real Analysis",category:"MATH",level:"UG",tier:1,col:1,desc:"Completeness, sequences, continuity, differentiability, Riemann integration.",areas:["Theory","Research","Optimization"],semester:"Fall 2025",textbook:"Rudin" },
  { id:"m7",code:"MATH 471",name:"Linear Algebra",category:"MATH",level:"UG",tier:2,col:2,desc:"Canonical forms, spectral theorem, inner product spaces, SVD.",areas:["ML/AI","Computation","Research"],semester:"Spring 2025",textbook:"Horn & Garcia" },
  { id:"m8",code:"MATH 467",name:"Optimization",category:"MATH",level:"UG",tier:3,col:0,desc:"Convex optimization, duality theory, KKT conditions, gradient methods.",areas:["Optimization","ML/AI","Trading"],semester:"Fall 2025",textbook:"Chong & Zak" },
  { id:"m9",code:"MATH 501",name:"Numerical Analysis",category:"MATH",level:"GR",tier:3,col:1,desc:"Interpolation, quadrature, ODE/PDE solvers, error analysis.",areas:["Computation","Modeling","Research"],semester:"Spring 2026" },
  { id:"m10",code:"MATH 541a",name:"Grad Statistics",category:"MATH",level:"GR",tier:3,col:2,desc:"Sufficiency, UMVUE, MLE, asymptotic theory.",areas:["Statistics","Research","ML/AI"],semester:"Spring 2026",textbook:"Casella & Berger" },
  { id:"m11",code:"MATH 505b",name:"Applied Probability",category:"MATH",level:"GR",tier:4,col:0,desc:"Markov processes, martingales, Brownian motion, diffusion.",areas:["Trading","Control","Research"],semester:"Spring 2025",textbook:"Grimmett 6-13" },
  { id:"m12",code:"MATH 525a",name:"Measure Theory",category:"MATH",level:"GR",tier:4,col:1,desc:"Measure and integration, Radon-Nikodym, Fubini, Lp spaces.",areas:["Theory","Research","Statistics"],semester:"Fall 2026",textbook:"Folland & Rudin" },

  { id:"c1",code:"CSCI 270",name:"Algorithms",category:"CS",level:"UG",tier:0,col:0,desc:"Divide-and-conquer, DP, graph algorithms, NP-completeness.",areas:["Computation","ML/AI","Theory"] },
  { id:"c2",code:"CSCI 567",name:"Machine Learning",category:"CS",level:"GR",tier:1,col:0,desc:"Supervised/unsupervised learning, kernels, neural nets, ensembles.",areas:["ML/AI","Data","Research"],semester:"Spring 2027" },
  { id:"c3",code:"CSCI 573",name:"Probabilistic Reasoning",category:"CS",level:"GR",tier:1,col:1,desc:"Bayesian nets, MRFs, variational inference, MCMC.",areas:["ML/AI","Statistics","Research"],semester:"Spring 2027" },
  { id:"c4",code:"EE 556",name:"Stochastic RL",category:"CS",level:"GR",tier:2,col:0,desc:"MDPs, dynamic programming, Kalman filtering, reinforcement learning.",areas:["Control","Trading","ML/AI"],semester:"Spring 2027" },
  { id:"c5",code:"ISE 615",name:"RL & Control",category:"CS",level:"GR",tier:2,col:1,desc:"Stochastic control, RL theory, game theory, mean-field analysis.",areas:["Control","ML/AI","Theory"],semester:"Spring 2026" },
  { id:"c6",code:"ISE 662",name:"Decision Theory",category:"CS",level:"GR",tier:3,col:0,desc:"Utility functions, copulas, multiattribute utility, game theory.",areas:["Trading","Theory","Policy"],semester:"Spring 2027" },

  { id:"e1",code:"ECON 303",name:"Microeconomics",category:"ECON",level:"UG",tier:1,col:0,desc:"Consumer/producer theory, market structures, equilibrium, welfare.",areas:["Policy","Theory","Trading"],semester:"Fall 2024" },
  { id:"e2",code:"ECON 305",name:"Macroeconomics",category:"ECON",level:"UG",tier:2,col:0,desc:"IS-LM, monetary/fiscal policy, growth, business cycles.",areas:["Policy","Finance","Modeling"],semester:"Spring 2024" },

  { id:"f1",code:"ACCT 410",name:"Accounting",category:"FIN",level:"UG",tier:1,col:0,desc:"Financial statements, accrual accounting, GAAP.",areas:["Finance","Applied","Modeling"],semester:"Spring 2025" },
  { id:"f2",code:"BUAD 308",name:"Corporate Finance",category:"FIN",level:"UG",tier:2,col:0,desc:"Capital budgeting, WACC, capital structure, valuation.",areas:["Finance","Trading","Modeling"],semester:"Fall 2024" },
  { id:"f3",code:"FBE 423",name:"VC & PE",category:"FIN",level:"UG",tier:3,col:0,desc:"Fund structures, due diligence, term sheets, exits.",areas:["Finance","Applied","Risk"],semester:"Spring 2025" },
  { id:"f4",code:"FBE 435",name:"Fixed Income",category:"FIN",level:"UG",tier:3,col:1,desc:"Bond pricing, yield curves, duration/convexity, MBS.",areas:["Trading","Risk","Finance"],semester:"Spring 2025" },
];

const EDGES: [string, string][] = [
  ["m1","m3"],["m2","m3"],["m3","m4"],["m3","m6"],["m4","m5"],["m6","m7"],
  ["m5","m10"],["m7","m8"],["m6","m9"],["m4","m8"],["m4","m11"],["m6","m12"],
  ["m7","m9"],["m11","m12"],["m8","m9"],
  ["c1","c2"],["c2","c3"],["c2","c4"],["c3","c5"],["c4","c6"],["c5","c6"],["c4","c5"],
  ["m4","c2"],["m4","c3"],["m8","c4"],["m7","c2"],["m11","c4"],["m5","c3"],
  ["m6","e1"],["m4","e1"],["e1","e2"],["e1","f2"],["e2","f2"],
  ["f1","f2"],["f2","f3"],["f2","f4"],["f4","m11"],
];

/* ═══════════════════ LAYOUT (computed once) ═══════════════════ */
const TIER_GAP = 200;
const COL_GAP = 220;
const DISC_GAP = 110;
const TOP_PAD = 80;
const NODE_SIZE = 130;

const LAYOUT = (() => {
  const discWidths: Record<string, number> = {};
  const discX: Record<string, number> = {};
  DISCIPLINE_ORDER.forEach(d => {
    discWidths[d] = (Math.max(...COURSES.filter(n => n.category === d).map(n => n.col), 0) + 1) * COL_GAP;
  });
  let x = 100;
  DISCIPLINE_ORDER.forEach(d => { discX[d] = x; x += discWidths[d] + DISC_GAP; });
  const positions: Record<string, { x: number; y: number }> = {};
  COURSES.forEach(n => {
    positions[n.id] = { x: discX[n.category] + n.col * COL_GAP, y: TOP_PAD + n.tier * TIER_GAP };
  });
  const maxTier = Math.max(...COURSES.map(n => n.tier));
  return { positions, width: x + 60, height: TOP_PAD + maxTier * TIER_GAP + 140, discX, discWidths };
})();

function bezierCurve(x1: number, y1: number, x2: number, y2: number) {
  const midY = (y1 + y2) / 2;
  return `M${x1},${y1} C${x1},${midY} ${x2},${midY} ${x2},${y2}`;
}

function buildConicGradient(areas: string[]) {
  const count = areas.length;
  const gapDeg = 4;
  const sliceDeg = 360 / count;
  const stops: string[] = [];
  areas.forEach((area, i) => {
    const color = AREA_COLORS[area] || "#888";
    const start = i * sliceDeg + gapDeg;
    const end = (i + 1) * sliceDeg - gapDeg;
    stops.push(`transparent ${start}deg`, `${color} ${start}deg ${end}deg`, `transparent ${end}deg`);
  });
  return `conic-gradient(from -90deg, ${stops.join(", ")})`;
}

/* ═══════════════════ PAGE ═══════════════════ */
export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<CourseNode | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(1200);

  useEffect(() => {
    const measure = () => { if (viewportRef.current) setViewportWidth(viewportRef.current.offsetWidth); };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Escape key to deselect
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelectedCourse(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const hoveredCategory = hoveredId ? COURSES.find(c => c.id === hoveredId)?.category : null;

  const connectedIds = useMemo(() => {
    const set = new Set<string>();
    if (hoveredId) {
      EDGES.forEach(([a, b]) => {
        if (a === hoveredId || b === hoveredId) { set.add(a); set.add(b); }
      });
    }
    return set;
  }, [hoveredId]);

  const { positions, width: canvasWidth, height: canvasHeight } = LAYOUT;
  const selectedPos = selectedCourse ? positions[selectedCourse.id] : null;
  const fitScale = Math.min(1, viewportWidth / canvasWidth);
  const panelWidth = selectedCourse ? 380 : 0;
  const availableWidth = viewportWidth - panelWidth;

  const zoomScale = selectedCourse ? 1.5 : fitScale;
  const zoomX = selectedCourse && selectedPos
    ? -selectedPos.x * zoomScale + availableWidth * 0.5
    : -(canvasWidth * fitScale - viewportWidth) / 2;
  const zoomY = selectedCourse && selectedPos
    ? -selectedPos.y * zoomScale + 320
    : 0;

  return (
    <>
      <style>{STYLES}</style>

      <div className="ct-header">
        <div className="container">
          <h1 className="ct-title">Coursework</h1>
          <p className="ct-sub">
            {COURSES.filter(c => c.level === "GR").length} graduate + {COURSES.filter(c => c.level === "UG").length} undergraduate.
            Hover to explore connections, click to zoom in.
          </p>
        </div>
      </div>

      <div className="ct-legend">
        <div className="container" style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
          {DISCIPLINE_ORDER.map(d => (
            <span key={d} className="ct-leg">
              <span className="ct-leg-dot" style={{ background: DISCIPLINES[d].color }} />
              {DISCIPLINES[d].label}
            </span>
          ))}
          <span className="ct-leg-sep">|</span>
          {["ML/AI", "Trading", "Statistics", "Optimization", "Theory", "Policy"].map(a => (
            <span key={a} className="ct-leg">
              <span className="ct-leg-dot" style={{ background: AREA_COLORS[a] }} />
              {a}
            </span>
          ))}
        </div>
      </div>

      <div className="ct-viewport" ref={viewportRef}>
        <motion.div
          className="ct-canvas"
          style={{ width: canvasWidth, height: canvasHeight }}
          animate={{ scale: zoomScale, x: zoomX, y: zoomY }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => setSelectedCourse(null)}
        >
          {/* Tier labels */}
          {TIER_LABELS.map((label, i) => (
            <div key={i} className="ct-tier-label" style={{ top: TOP_PAD + i * TIER_GAP }}>
              {label}
            </div>
          ))}

          {/* SVG edges */}
          <svg className="ct-edge-layer" width={canvasWidth} height={canvasHeight}>
            {EDGES.map(([fromId, toId], i) => {
              const from = positions[fromId];
              const to = positions[toId];
              if (!from || !to) return null;
              const fromNode = COURSES.find(c => c.id === fromId);
              const toNode = COURSES.find(c => c.id === toId);
              const isCross = fromNode?.category !== toNode?.category;
              const edgeColor = isCross ? "#bbb" : DISCIPLINES[fromNode?.category || "MATH"].color;
              const isDimmed = hoveredCategory && fromNode?.category !== hoveredCategory && toNode?.category !== hoveredCategory;
              const isHighlighted = hoveredId && (fromId === hoveredId || toId === hoveredId);
              return (
                <motion.path key={i}
                  d={bezierCurve(from.x, from.y, to.x, to.y)}
                  fill="none" stroke={edgeColor}
                  strokeWidth={isHighlighted ? 2.5 : isCross ? 0.8 : 1.2}
                  strokeDasharray={isCross ? "6 6" : "none"}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: 1,
                    opacity: isDimmed ? 0.02 : isHighlighted ? 0.55 : isCross ? 0.06 : 0.16,
                  }}
                  transition={{
                    pathLength: { duration: 1.5, delay: 0.4 + (fromNode?.tier || 0) * 0.2, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.3 },
                    strokeWidth: { duration: 0.25 },
                  }}
                />
              );
            })}
          </svg>

          {/* HTML course nodes */}
          {COURSES.map((course) => {
            const nodePos = positions[course.id];
            if (!nodePos) return null;
            const discColor = DISCIPLINES[course.category].color;
            const isHovered = hoveredId === course.id;
            const isSelected = selectedCourse?.id === course.id;
            const isActive = isHovered || isSelected;
            const isDimmed = !!(hoveredCategory && course.category !== hoveredCategory && !connectedIds.has(course.id));

            return (
              <motion.div key={course.id} className="ct-node"
                style={{ left: nodePos.x, top: nodePos.y }}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{
                  opacity: isDimmed ? 0.1 : 1,
                  scale: isDimmed ? 0.88 : isActive ? 1.15 : 1,
                  filter: isDimmed ? "blur(2px)" : "blur(0px)",
                }}
                transition={{
                  scale: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.25 },
                  filter: { duration: 0.25 },
                  // Stagger entry by tier
                  ...(course.tier >= 0 ? { delay: 0.15 + course.tier * 0.12 } : {}),
                }}
                onMouseEnter={() => setHoveredId(course.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={(e) => { e.stopPropagation(); setSelectedCourse(isSelected ? null : course); }}
              >
                {/* Glow */}
                <div className="ct-glow" style={{
                  opacity: isActive ? 1 : 0,
                  boxShadow: `0 0 28px ${discColor}20, 0 0 56px ${discColor}10`,
                }} />

                {/* Outer ring (area segments) */}
                <div className="ct-ring" style={{
                  background: buildConicGradient(course.areas),
                  opacity: isActive ? 0.55 : 0.25,
                }} />

                {/* White gap */}
                <div className="ct-gap" />

                {/* Inner circle */}
                <div className="ct-inner" style={{ background: discColor, borderColor: isActive ? "#fff3" : discColor }}>
                  <span className="ct-course-name">{course.name}</span>
                  <span className="ct-course-code">{course.code}</span>
                </div>

                {/* Grad marker */}
                {course.level === "GR" && <div className="ct-grad-star" style={{ color: discColor }}>&#9733;</div>}

                {/* Area labels — positioned as absolute pixel offsets */}
                <AnimatePresence>
                  {isActive && course.areas.map((area, areaIdx) => {
                    const angleDeg = -90 + (areaIdx + 0.5) * (360 / course.areas.length);
                    const angleRad = angleDeg * Math.PI / 180;
                    const labelRadius = NODE_SIZE / 2 + 22;
                    const labelX = Math.cos(angleRad) * labelRadius;
                    const labelY = Math.sin(angleRad) * labelRadius;
                    return (
                      <motion.div key={area} className="ct-area-pill"
                        style={{
                          left: `calc(50% + ${labelX}px)`,
                          top: `calc(50% + ${labelY}px)`,
                          background: AREA_COLORS[area] || "#888",
                        }}
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.2, delay: areaIdx * 0.05 }}
                      >
                        {area}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Detail panel — slides from right */}
        <AnimatePresence>
          {selectedCourse && (
            <motion.div className="ct-panel"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <button className="ct-panel-close" onClick={() => setSelectedCourse(null)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <div className="ct-panel-badge" style={{
                color: DISCIPLINES[selectedCourse.category].color,
                borderColor: DISCIPLINES[selectedCourse.category].color + "44",
                background: DISCIPLINES[selectedCourse.category].color + "08",
              }}>
                {DISCIPLINES[selectedCourse.category].label}
              </div>
              {selectedCourse.level === "GR" && <span className="ct-panel-grad">Graduate</span>}
              <div className="ct-panel-code" style={{ color: DISCIPLINES[selectedCourse.category].color }}>
                {selectedCourse.code}
              </div>
              <h2 className="ct-panel-title">{selectedCourse.name}</h2>
              <p className="ct-panel-desc">{selectedCourse.desc}</p>
              {selectedCourse.semester && <div className="ct-panel-meta">{selectedCourse.semester}</div>}
              {selectedCourse.textbook && <div className="ct-panel-meta" style={{ fontStyle: "italic" }}>Textbook: {selectedCourse.textbook}</div>}
              <div className="ct-panel-areas">
                {selectedCourse.areas.map(area => (
                  <span key={area} className="ct-panel-area" style={{
                    color: AREA_COLORS[area],
                    borderColor: (AREA_COLORS[area] || "#888") + "33",
                    background: (AREA_COLORS[area] || "#888") + "08",
                  }}>{area}</span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </>
  );
}

/* ═══════════════════ STYLES ═══════════════════ */
const STYLES = `
.ct-header { padding: 120px 0 20px; background: var(--bg); }
.ct-title { font-size: clamp(40px, 6vw, 64px); font-weight: 800; color: var(--text-primary); letter-spacing: -0.03em; }
.ct-sub { font-size: 15px; color: var(--text-tertiary); margin-top: 8px; }

.ct-legend { padding: 12px 0 8px; }
.ct-leg { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; color: var(--text-tertiary); }
.ct-leg-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
.ct-leg-sep { color: var(--border-hover); font-size: 14px; }

/* Viewport — clips the zoomable canvas */
.ct-viewport {
  position: relative;
  overflow: hidden;
  height: calc(100vh - 180px);
  min-height: 520px;
}

/* Canvas — transformed by Framer Motion */
.ct-canvas {
  position: relative;
  transform-origin: 0 0;
  will-change: transform;
}

/* Tier labels */
.ct-tier-label {
  position: absolute;
  left: 12px;
  transform: translateY(-50%);
  font-size: 10px;
  font-weight: 700;
  color: var(--text-tertiary);
  opacity: 0.3;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  writing-mode: vertical-lr;
  text-orientation: mixed;
}

/* Edge SVG layer */
.ct-edge-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

/* ── Node ── */
.ct-node {
  position: absolute;
  width: ${NODE_SIZE}px;
  height: ${NODE_SIZE}px;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 2;
}

.ct-glow {
  position: absolute;
  inset: -12px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  transition: opacity 0.35s;
}

.ct-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  transition: opacity 0.35s, box-shadow 0.35s;
  z-index: 1;
  box-shadow: 0 3px 16px rgba(0,0,0,0.05);
}

.ct-gap {
  position: absolute;
  inset: 10px;
  border-radius: 50%;
  background: #fff;
  z-index: 2;
}

.ct-inner {
  position: absolute;
  inset: 14px;
  border-radius: 50%;
  border: 2px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 3;
  transition: border-color 0.3s, background 0.3s;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

.ct-course-name {
  font-size: 11px;
  font-weight: 800;
  text-align: center;
  line-height: 1.25;
  padding: 0 8px;
  letter-spacing: -0.01em;
  color: #fff;
}

.ct-course-code {
  font-size: 8.5px;
  font-weight: 600;
  color: rgba(255,255,255,0.6);
  font-family: 'JetBrains Mono', monospace;
  margin-top: 2px;
  letter-spacing: 0.3px;
}

.ct-grad-star {
  position: absolute;
  top: -4px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
  z-index: 4;
}

/* Area pills — positioned with calc() for pixel-accurate placement */
.ct-area-pill {
  position: absolute;
  transform: translate(-50%, -50%);
  font-size: 8px;
  font-weight: 700;
  color: #fff;
  padding: 3px 8px;
  border-radius: 5px;
  white-space: nowrap;
  z-index: 5;
  pointer-events: none;
  letter-spacing: 0.2px;
}

/* ── Right detail panel ── */
.ct-panel {
  position: absolute;
  right: 0;
  top: 0;
  width: 380px;
  height: 100%;
  background: #fff;
  border-left: 1px solid var(--border);
  padding: 40px 32px;
  overflow-y: auto;
  z-index: 10;
  box-shadow: -16px 0 56px rgba(0,0,0,0.06);
}

.ct-panel-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-tertiary);
  transition: all 0.2s;
}
.ct-panel-close:hover { color: var(--text-primary); background: var(--surface); }

.ct-panel-badge {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 5px;
  border: 1px solid;
  display: inline-block;
  margin-bottom: 14px;
}

.ct-panel-grad {
  font-size: 10px;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-left: 10px;
  padding: 3px 8px;
  border: 1px solid var(--accent);
  border-radius: 4px;
}

.ct-panel-code {
  font-size: 14px;
  font-weight: 700;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}

.ct-panel-title {
  font-size: 26px;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.5px;
  margin-bottom: 14px;
  line-height: 1.2;
}

.ct-panel-desc {
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 16px;
}

.ct-panel-meta {
  font-size: 13px;
  color: var(--text-tertiary);
  margin-bottom: 6px;
  font-weight: 600;
}

.ct-panel-areas {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 14px;
}

.ct-panel-area {
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 5px;
  border: 1px solid;
}

@media (max-width: 900px) {
  .ct-viewport { height: auto; min-height: auto; overflow-x: auto; overflow-y: visible; }
  .ct-canvas { transform: none !important; }
  .ct-tier-label { display: none; }
  .ct-panel {
    position: fixed;
    width: 100%;
    height: auto;
    max-height: 60vh;
    bottom: 0;
    top: auto;
    border-left: none;
    border-top: 1px solid var(--border);
    border-radius: 16px 16px 0 0;
  }
}
`;
