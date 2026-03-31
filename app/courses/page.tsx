"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";

/* ═══════════════════ CONFIG ═══════════════════ */
const DISC: Record<string, { label: string; color: string }> = {
  MATH: { label: "Mathematics", color: "#1e52f3" },
  CS: { label: "CS / ML", color: "#7c3aed" },
  ECON: { label: "Economics", color: "#b45309" },
  FIN: { label: "Finance", color: "#059669" },
};

const AREA_COLORS: Record<string, string> = {
  "ML/AI": "#7c3aed", "Trading": "#059669", "Statistics": "#e11d48",
  "Optimization": "#f59e0b", "Theory": "#1e52f3", "Finance": "#10b981",
  "Research": "#8b5cf6", "Policy": "#ea580c", "Applied": "#d97706",
  "Control": "#0891b2", "Modeling": "#6366f1", "Data": "#06b6d4",
  "Computation": "#64748b", "Risk": "#dc2626",
};

interface Course {
  code: string; name: string; cat: string; level: string;
  desc: string; areas: string[]; sem?: string; book?: string;
}

const COURSES: Course[] = [
  { code: "MATH 226", name: "Calculus II", cat: "MATH", level: "UG", desc: "Techniques of integration, sequences and series, Taylor and Maclaurin series.", areas: ["Theory", "Computation", "Applied"], sem: "Fall 2023" },
  { code: "MATH 229", name: "Calculus III", cat: "MATH", level: "UG", desc: "Multivariable calculus: partial derivatives, multiple integrals, vector calculus.", areas: ["Theory", "Optimization", "Applied"], sem: "Fall 2023" },
  { code: "MATH 245", name: "Diff. Equations", cat: "MATH", level: "UG", desc: "ODEs, Laplace transforms, Fourier series, and boundary value problems.", areas: ["Modeling", "Control", "Applied"], sem: "Spring 2024" },
  { code: "MATH 407", name: "Probability Theory", cat: "MATH", level: "UG", desc: "Random variables, expectation, moment generating functions, and classical limit theorems.", areas: ["ML/AI", "Trading", "Statistics"], sem: "Fall 2024", book: "Grimmett" },
  { code: "MATH 408", name: "Mathematical Statistics", cat: "MATH", level: "UG", desc: "Estimation, hypothesis testing, confidence intervals, sufficiency, and Bayesian methods.", areas: ["Statistics", "Research", "ML/AI"], sem: "Fall 2025", book: "Wackerly" },
  { code: "MATH 425", name: "Real Analysis", cat: "MATH", level: "UG", desc: "Completeness, sequences, continuity, differentiability, and Riemann integration.", areas: ["Theory", "Research", "Optimization"], sem: "Fall 2025", book: "Rudin" },
  { code: "MATH 471", name: "Linear Algebra", cat: "MATH", level: "UG", desc: "Canonical forms, spectral theorem, inner product spaces, and SVD.", areas: ["ML/AI", "Computation", "Research"], sem: "Spring 2025", book: "Horn & Garcia" },
  { code: "MATH 467", name: "Optimization", cat: "MATH", level: "UG", desc: "Convex optimization, duality theory, KKT conditions, and gradient methods.", areas: ["Optimization", "ML/AI", "Trading"], sem: "Fall 2025", book: "Chong & Zak" },
  { code: "MATH 501", name: "Numerical Analysis", cat: "MATH", level: "GR", desc: "Interpolation, quadrature, ODE/PDE solvers, and error analysis.", areas: ["Computation", "Modeling", "Research"], sem: "Spring 2026" },
  { code: "MATH 541a", name: "Graduate Statistics", cat: "MATH", level: "GR", desc: "Sufficiency, completeness, UMVUE, MLE, and asymptotic theory.", areas: ["Statistics", "Research", "ML/AI"], sem: "Spring 2026", book: "Casella & Berger" },
  { code: "MATH 505b", name: "Applied Probability", cat: "MATH", level: "GR", desc: "Markov processes, martingales, Brownian motion, and diffusion theory.", areas: ["Trading", "Control", "Research"], sem: "Spring 2025", book: "Grimmett 6–13" },
  { code: "MATH 525a", name: "Measure Theory", cat: "MATH", level: "GR", desc: "Measure and integration, Radon-Nikodym, Fubini, and Lp spaces.", areas: ["Theory", "Research", "Statistics"], sem: "Fall 2026", book: "Folland & Rudin" },
  { code: "CSCI 270", name: "Algorithms", cat: "CS", level: "UG", desc: "Divide-and-conquer, dynamic programming, graph algorithms, NP-completeness.", areas: ["Computation", "ML/AI", "Theory"] },
  { code: "CSCI 567", name: "Machine Learning", cat: "CS", level: "GR", desc: "Supervised and unsupervised learning, kernel methods, neural networks, and ensembles.", areas: ["ML/AI", "Data", "Research"], sem: "Spring 2027" },
  { code: "CSCI 573", name: "Probabilistic Reasoning", cat: "CS", level: "GR", desc: "Bayesian networks, Markov random fields, variational inference, and MCMC.", areas: ["ML/AI", "Statistics", "Research"], sem: "Spring 2027" },
  { code: "EE 556", name: "Stochastic Systems & RL", cat: "CS", level: "GR", desc: "MDPs, dynamic programming, Kalman filtering, and reinforcement learning.", areas: ["Control", "Trading", "ML/AI"], sem: "Spring 2027" },
  { code: "ISE 615", name: "RL & Control Theory", cat: "CS", level: "GR", desc: "Stochastic control, RL theory, game theory, and mean-field analysis.", areas: ["Control", "ML/AI", "Theory"], sem: "Spring 2026" },
  { code: "ISE 662", name: "Decision Theory", cat: "CS", level: "GR", desc: "Utility functions, copulas, multiattribute utility, and game theory.", areas: ["Trading", "Theory", "Policy"], sem: "Spring 2027" },
  { code: "ECON 303", name: "Microeconomics", cat: "ECON", level: "UG", desc: "Consumer and producer theory, market structures, equilibrium, and welfare.", areas: ["Policy", "Theory", "Trading"], sem: "Fall 2024" },
  { code: "ECON 305", name: "Macroeconomics", cat: "ECON", level: "UG", desc: "IS-LM model, monetary and fiscal policy, growth, and business cycles.", areas: ["Policy", "Finance", "Modeling"], sem: "Spring 2024" },
  { code: "ACCT 410", name: "Accounting", cat: "FIN", level: "UG", desc: "Financial statements, accrual accounting, revenue recognition, and GAAP.", areas: ["Finance", "Applied", "Modeling"], sem: "Spring 2025" },
  { code: "BUAD 308", name: "Corporate Finance", cat: "FIN", level: "UG", desc: "Capital budgeting, cost of capital, capital structure, and valuation.", areas: ["Finance", "Trading", "Modeling"], sem: "Fall 2024" },
  { code: "FBE 423", name: "VC & Private Equity", cat: "FIN", level: "UG", desc: "Fund structures, due diligence, term sheets, and exit strategies.", areas: ["Finance", "Applied", "Risk"], sem: "Spring 2025" },
  { code: "FBE 435", name: "Fixed Income", cat: "FIN", level: "UG", desc: "Bond pricing, yield curves, duration and convexity, MBS, and rate derivatives.", areas: ["Trading", "Risk", "Finance"], sem: "Spring 2025" },
];

const DISC_ORDER = ["MATH", "CS", "ECON", "FIN"];

function conicGrad(areas: string[]) {
  const n = areas.length, g = 5, s = 360 / n, stops: string[] = [];
  areas.forEach((a, i) => {
    const c = AREA_COLORS[a] || "#888";
    const st = i * s + g, en = (i + 1) * s - g;
    stops.push(`transparent ${st}deg`, `${c} ${st}deg ${en}deg`, `transparent ${en}deg`);
  });
  return `conic-gradient(from -90deg, ${stops.join(", ")})`;
}

/* ═══════════════════ COURSE NODE ═══════════════════ */
function CourseNode({ course, index, isOpen, anyOpen, onToggle }: {
  course: Course; index: number; isOpen: boolean; anyOpen: boolean; onToggle: () => void;
}) {
  const dc = DISC[course.cat].color;
  const dimmed = anyOpen && !isOpen;

  return (
    <Reveal delay={index * 0.04}>
      <motion.div
        className={`cn ${isOpen ? "cn-open" : ""}`}
        style={{
          "--dc": dc,
          opacity: dimmed ? 0.2 : 1,
          transform: dimmed ? "scale(0.92)" : "scale(1)",
        } as React.CSSProperties}
        layout
        onClick={onToggle}
        transition={{ layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
      >
        {/* Outer ring — always visible */}
        <div className="cn-ring" style={{ background: conicGrad(course.areas), opacity: isOpen ? 0.6 : 0.4 }} />
        <div className="cn-gap" />

        {/* Inner — circle when closed, expands when open */}
        <div className="cn-inner" style={{ background: dc }}>
          {/* Always: name + code */}
          <div className="cn-head">
            <span className="cn-name">{course.name}</span>
            <span className="cn-code">{course.code}</span>
            {course.level === "GR" && <span className="cn-grad">GRAD</span>}
          </div>

          {/* Expanded: description + metadata inside the node */}
          <AnimatePresence>
            {isOpen && (
              <motion.div className="cn-body"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="cn-desc">{course.desc}</p>
                <div className="cn-meta">
                  {course.sem && <span>{course.sem}</span>}
                  {course.book && <span>Textbook: {course.book}</span>}
                </div>
                <div className="cn-areas">
                  {course.areas.map(a => (
                    <span key={a} className="cn-area" style={{ color: AREA_COLORS[a], borderColor: (AREA_COLORS[a]) + "44", background: (AREA_COLORS[a]) + "0a" }}>
                      {a}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </Reveal>
  );
}

/* ═══════════════════ PAGE ═══════════════════ */
export default function CoursesPage() {
  const [openCode, setOpenCode] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? COURSES : COURSES.filter(c => c.cat === filter);

  return (
    <>
      <style>{CSS}</style>

      <div className="section-header">
        <div className="container">
          <TextReveal as="h1" className="section-title">Coursework</TextReveal>
          <Reveal delay={0.3} variant="scale">
            <div className="section-header-line" />
          </Reveal>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          {/* Filters */}
          <Reveal>
            <div className="cn-filters">
              <button className={`cn-fbtn ${filter === "all" ? "cn-fbtn-on" : ""}`} onClick={() => { setFilter("all"); setOpenCode(null); }}>
                All ({COURSES.length})
              </button>
              {DISC_ORDER.map(d => (
                <button key={d}
                  className={`cn-fbtn ${filter === d ? "cn-fbtn-on" : ""}`}
                  style={filter === d ? { color: DISC[d].color, borderColor: DISC[d].color } : {}}
                  onClick={() => { setFilter(d); setOpenCode(null); }}>
                  {DISC[d].label} ({COURSES.filter(c => c.cat === d).length})
                </button>
              ))}
            </div>
          </Reveal>

          {/* Grid of nodes */}
          <div className="cn-grid">
            <AnimatePresence>
              {filtered.map((course, i) => (
                <CourseNode
                  key={course.code}
                  course={course}
                  index={i}
                  isOpen={openCode === course.code}
                  anyOpen={openCode !== null}
                  onToggle={() => setOpenCode(openCode === course.code ? null : course.code)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

/* ═══════════════════ CSS ═══════════════════ */
const CSS = `
/* Filters */
.cn-filters { display: flex; gap: 6px; margin-bottom: 36px; flex-wrap: wrap; }
.cn-fbtn { padding: 8px 18px; border-radius: 100px; border: 1px solid var(--border);
  font-size: 13px; font-weight: 600; color: var(--text-tertiary);
  transition: all 0.25s ease; }
.cn-fbtn:hover { border-color: var(--border-hover); color: var(--text-secondary); }
.cn-fbtn-on { border-color: var(--accent); color: var(--accent); background: var(--accent-glow); }

/* Grid */
.cn-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 20px; }

/* Node container */
.cn {
  position: relative;
  cursor: pointer;
  transition: opacity 0.4s, transform 0.4s var(--ease-out);
}

/* When open, span full width */
.cn-open {
  grid-column: 1 / -1;
  max-width: 700px;
}

/* Outer ring */
.cn-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  transition: opacity 0.4s, border-radius 0.5s var(--ease-out);
}
.cn-open .cn-ring {
  border-radius: 20px;
}

/* Gap between ring and inner */
.cn-gap {
  position: absolute;
  inset: 8px;
  border-radius: 50%;
  background: var(--bg);
  transition: border-radius 0.5s var(--ease-out), inset 0.5s var(--ease-out);
}
.cn-open .cn-gap {
  border-radius: 16px;
  inset: 6px;
}

/* Inner circle / card */
.cn-inner {
  position: relative;
  margin: 12px;
  border-radius: 50%;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  transition: border-radius 0.5s var(--ease-out), aspect-ratio 0.5s var(--ease-out), padding 0.4s;
  overflow: hidden;
  z-index: 1;
}
.cn-open .cn-inner {
  border-radius: 14px;
  aspect-ratio: auto;
  padding: 28px;
  align-items: flex-start;
}

/* Head — name, code, grad badge */
.cn-head {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  transition: align-items 0.3s;
}
.cn-open .cn-head {
  align-items: flex-start;
  margin-bottom: 12px;
}

.cn-name {
  font-size: 13px;
  font-weight: 800;
  color: #fff;
  text-align: center;
  line-height: 1.3;
  padding: 0 12px;
  transition: font-size 0.4s var(--ease-out), text-align 0.3s;
}
.cn-open .cn-name {
  font-size: 22px;
  text-align: left;
  padding: 0;
}

.cn-code {
  font-size: 10px;
  font-weight: 600;
  color: rgba(255,255,255,0.55);
  font-family: 'JetBrains Mono', monospace;
  transition: font-size 0.4s var(--ease-out);
}
.cn-open .cn-code {
  font-size: 13px;
}

.cn-grad {
  font-size: 8px;
  font-weight: 700;
  color: rgba(255,255,255,0.7);
  letter-spacing: 1px;
  padding: 1px 6px;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 3px;
  margin-top: 2px;
  transition: font-size 0.4s;
}
.cn-open .cn-grad {
  font-size: 10px;
}

/* Expanded body */
.cn-body { overflow: hidden; width: 100%; }

.cn-desc {
  font-size: 15px;
  line-height: 1.75;
  color: rgba(255,255,255,0.8);
  margin-bottom: 12px;
}

.cn-meta {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: rgba(255,255,255,0.5);
  font-weight: 600;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.cn-areas {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.cn-area {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 100px;
  border: 1px solid;
  background: rgba(255,255,255,0.08) !important;
  color: #fff !important;
  border-color: rgba(255,255,255,0.2) !important;
}

/* Hover effect on closed nodes */
.cn:not(.cn-open):hover .cn-ring { opacity: 0.55 !important; }
.cn:not(.cn-open):hover { transform: scale(1.05) !important; }

@media (max-width: 600px) {
  .cn-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 14px; }
  .cn-name { font-size: 11px; }
  .cn-open .cn-name { font-size: 18px; }
  .cn-open .cn-inner { padding: 20px; }
  .cn-desc { font-size: 14px; }
}
`;
