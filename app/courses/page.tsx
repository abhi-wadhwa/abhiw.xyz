"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";

/* ═══════════════════ COLORS ═══════════════════ */
const DISC: Record<string, { label: string; c: string }> = {
  MATH: { label: "Mathematics", c: "#1e52f3" },
  CS:   { label: "CS / ML",     c: "#7c3aed" },
  ECON: { label: "Economics",   c: "#b45309" },
  FIN:  { label: "Finance",     c: "#059669" },
};

const AC: Record<string, string> = {
  "ML/AI":"#7c3aed","Trading":"#059669","Statistics":"#1e52f3",
  "Optimization":"#2563eb","Theory":"#4f46e5","Finance":"#059669",
  "Research":"#7c3aed","Policy":"#b45309","Applied":"#b45309",
  "Control":"#6d28d9","Modeling":"#1e52f3","Data":"#0891b2",
  "Computation":"#1e52f3","Risk":"#dc2626",
};

/* ═══════════════════ DATA ═══════════════════ */
interface N { id:string; code:string; n:string; cat:string; lv:string; tier:number; col:number; desc:string; areas:string[]; sem?:string; book?:string }

const NODES: N[] = [
  {id:"m1",code:"MATH 226",n:"Calculus II",cat:"MATH",lv:"UG",tier:0,col:0,desc:"Techniques of integration, sequences and series, Taylor series.",areas:["Theory","Computation","Applied"],sem:"Fall 2023"},
  {id:"m2",code:"MATH 229",n:"Calculus III",cat:"MATH",lv:"UG",tier:0,col:1,desc:"Multivariable calculus: partial derivatives, integrals, vector calculus.",areas:["Theory","Optimization","Applied"],sem:"Fall 2023"},
  {id:"m3",code:"MATH 245",n:"Diff. Equations",cat:"MATH",lv:"UG",tier:1,col:0,desc:"ODEs, Laplace transforms, Fourier series, boundary value problems.",areas:["Modeling","Control","Applied"],sem:"Spring 2024"},
  {id:"m4",code:"MATH 407",n:"Probability",cat:"MATH",lv:"UG",tier:2,col:0,desc:"Random variables, expectation, MGFs, and classical limit theorems.",areas:["ML/AI","Trading","Statistics"],sem:"Fall 2024",book:"Grimmett"},
  {id:"m5",code:"MATH 408",n:"Statistics",cat:"MATH",lv:"UG",tier:2,col:1,desc:"Estimation, hypothesis testing, confidence intervals, Bayesian methods.",areas:["Statistics","Research","ML/AI"],sem:"Fall 2025",book:"Wackerly"},
  {id:"m6",code:"MATH 425",n:"Real Analysis",cat:"MATH",lv:"UG",tier:1,col:1,desc:"Completeness, sequences, continuity, differentiability, Riemann integration.",areas:["Theory","Research","Optimization"],sem:"Fall 2025",book:"Rudin"},
  {id:"m7",code:"MATH 471",n:"Linear Algebra",cat:"MATH",lv:"UG",tier:2,col:2,desc:"Canonical forms, spectral theorem, inner product spaces, SVD.",areas:["ML/AI","Computation","Research"],sem:"Spring 2025",book:"Horn & Garcia"},
  {id:"m8",code:"MATH 467",n:"Optimization",cat:"MATH",lv:"UG",tier:3,col:0,desc:"Convex optimization, duality theory, KKT conditions, gradient methods.",areas:["Optimization","ML/AI","Trading"],sem:"Fall 2025",book:"Chong & Zak"},
  {id:"m9",code:"MATH 501",n:"Numerical Analysis",cat:"MATH",lv:"GR",tier:3,col:1,desc:"Interpolation, quadrature, ODE/PDE solvers, error analysis.",areas:["Computation","Modeling","Research"],sem:"Spring 2026"},
  {id:"m10",code:"MATH 541a",n:"Grad Statistics",cat:"MATH",lv:"GR",tier:3,col:2,desc:"Sufficiency, UMVUE, MLE, asymptotic theory.",areas:["Statistics","Research","ML/AI"],sem:"Spring 2026",book:"Casella & Berger"},
  {id:"m11",code:"MATH 505b",n:"Applied Probability",cat:"MATH",lv:"GR",tier:4,col:0,desc:"Markov processes, martingales, Brownian motion, diffusion.",areas:["Trading","Control","Research"],sem:"Spring 2025",book:"Grimmett 6-13"},
  {id:"m12",code:"MATH 525a",n:"Measure Theory",cat:"MATH",lv:"GR",tier:4,col:1,desc:"Measure and integration, Radon-Nikodym, Fubini, Lp spaces.",areas:["Theory","Research","Statistics"],sem:"Fall 2026",book:"Folland & Rudin"},

  {id:"c1",code:"CSCI 270",n:"Algorithms",cat:"CS",lv:"UG",tier:0,col:0,desc:"Divide-and-conquer, DP, graph algorithms, NP-completeness.",areas:["Computation","ML/AI","Theory"]},
  {id:"c2",code:"CSCI 567",n:"Machine Learning",cat:"CS",lv:"GR",tier:1,col:0,desc:"Supervised/unsupervised learning, kernels, neural nets, ensembles.",areas:["ML/AI","Data","Research"],sem:"Spring 2027"},
  {id:"c3",code:"CSCI 573",n:"Probabilistic Reasoning",cat:"CS",lv:"GR",tier:1,col:1,desc:"Bayesian nets, MRFs, variational inference, MCMC.",areas:["ML/AI","Statistics","Research"],sem:"Spring 2027"},
  {id:"c4",code:"EE 556",n:"Stochastic RL",cat:"CS",lv:"GR",tier:2,col:0,desc:"MDPs, dynamic programming, Kalman filtering, reinforcement learning.",areas:["Control","Trading","ML/AI"],sem:"Spring 2027"},
  {id:"c5",code:"ISE 615",n:"RL & Control",cat:"CS",lv:"GR",tier:2,col:1,desc:"Stochastic control, RL theory, game theory, mean-field analysis.",areas:["Control","ML/AI","Theory"],sem:"Spring 2026"},
  {id:"c6",code:"ISE 662",n:"Decision Theory",cat:"CS",lv:"GR",tier:3,col:0,desc:"Utility functions, copulas, multiattribute utility, game theory.",areas:["Trading","Theory","Policy"],sem:"Spring 2027"},

  {id:"e1",code:"ECON 303",n:"Microeconomics",cat:"ECON",lv:"UG",tier:1,col:0,desc:"Consumer/producer theory, market structures, equilibrium, welfare.",areas:["Policy","Theory","Trading"],sem:"Fall 2024"},
  {id:"e2",code:"ECON 305",n:"Macroeconomics",cat:"ECON",lv:"UG",tier:2,col:0,desc:"IS-LM, monetary/fiscal policy, growth, business cycles.",areas:["Policy","Finance","Modeling"],sem:"Spring 2024"},

  {id:"f1",code:"ACCT 410",n:"Accounting",cat:"FIN",lv:"UG",tier:1,col:0,desc:"Financial statements, accrual accounting, GAAP.",areas:["Finance","Applied","Modeling"],sem:"Spring 2025"},
  {id:"f2",code:"BUAD 308",n:"Corporate Finance",cat:"FIN",lv:"UG",tier:2,col:0,desc:"Capital budgeting, WACC, capital structure, valuation.",areas:["Finance","Trading","Modeling"],sem:"Fall 2024"},
  {id:"f3",code:"FBE 423",n:"VC & PE",cat:"FIN",lv:"UG",tier:3,col:0,desc:"Fund structures, due diligence, term sheets, exits.",areas:["Finance","Applied","Risk"],sem:"Spring 2025"},
  {id:"f4",code:"FBE 435",n:"Fixed Income",cat:"FIN",lv:"UG",tier:3,col:1,desc:"Bond pricing, yield curves, duration/convexity, MBS.",areas:["Trading","Risk","Finance"],sem:"Spring 2025"},
];

const EDGES: [string,string][] = [
  ["m1","m3"],["m2","m3"],["m3","m4"],["m3","m6"],["m4","m5"],["m6","m7"],
  ["m5","m10"],["m7","m8"],["m6","m9"],["m4","m8"],["m4","m11"],["m6","m12"],
  ["m7","m9"],["m11","m12"],["m8","m9"],
  ["c1","c2"],["c2","c3"],["c2","c4"],["c3","c5"],["c4","c6"],["c5","c6"],["c4","c5"],
  ["m4","c2"],["m4","c3"],["m8","c4"],["m7","c2"],["m11","c4"],["m5","c3"],
  ["m6","e1"],["m4","e1"],["e1","e2"],["e1","f2"],["e2","f2"],
  ["f1","f2"],["f2","f3"],["f2","f4"],["f4","m11"],
];

/* ═══════════════════ LAYOUT ═══════════════════ */
const DO = ["MATH","CS","ECON","FIN"];
const TG=190, CG=210, DG=100, TP=70;

function layout() {
  const dw: Record<string,number>={}, dx: Record<string,number>={};
  DO.forEach(d=>{dw[d]=(Math.max(...NODES.filter(n=>n.cat===d).map(n=>n.col),0)+1)*CG});
  let x=90; DO.forEach(d=>{dx[d]=x;x+=dw[d]+DG});
  const p: Record<string,{x:number;y:number}>={};
  NODES.forEach(n=>{p[n.id]={x:dx[n.cat]+n.col*CG,y:TP+n.tier*TG}});
  const mt=Math.max(...NODES.map(n=>n.tier));
  return {p,w:x+50,h:TP+mt*TG+120,dx,dw};
}

function curve(x1:number,y1:number,x2:number,y2:number){const m=(y1+y2)/2;return`M${x1},${y1}C${x1},${m} ${x2},${m} ${x2},${y2}`}

/* ═══════════════════ CONIC GRADIENT ═══════════════════ */
function conicGrad(areas: string[]) {
  const n = areas.length;
  const gap = 3; // degrees
  const slice = 360 / n;
  const stops: string[] = [];
  areas.forEach((a, i) => {
    const c = AC[a] || "#888";
    const s = i * slice + gap;
    const e = (i + 1) * slice - gap;
    stops.push(`transparent ${s}deg`);
    stops.push(`${c} ${s}deg ${e}deg`);
    stops.push(`transparent ${e}deg`);
  });
  return `conic-gradient(from -90deg, ${stops.join(", ")})`;
}

/* ═══════════════════ PAGE ═══════════════════ */
export default function CoursesPage() {
  const [sel, setSel] = useState<N|null>(null);
  const [hov, setHov] = useState<string|null>(null);
  const vpRef = useRef<HTMLDivElement>(null);
  const [vpW, setVpW] = useState(1200);
  const {p,w,h,dx,dw} = layout();

  useEffect(()=>{
    const r=()=>{if(vpRef.current)setVpW(vpRef.current.offsetWidth)};
    r(); window.addEventListener("resize",r);
    return()=>window.removeEventListener("resize",r);
  },[]);

  const hovCat = hov ? NODES.find(n=>n.id===hov)?.cat : null;
  const selP = sel ? p[sel.id] : null;
  const baseScale = Math.min(1, vpW / w);
  const zScale = sel ? 1.5 : baseScale;
  const zX = sel && selP ? -selP.x * zScale + vpW * 0.35 : -(w * baseScale - vpW) / 2;
  const zY = sel && selP ? -selP.y * zScale + 300 : 0;

  const connected = new Set<string>();
  if (hov) EDGES.forEach(([a,b])=>{if(a===hov||b===hov){connected.add(a);connected.add(b)}});

  return (
    <>
      <style>{CSS}</style>

      <div className="ct-header">
        <div className="container">
          <h1 className="ct-title">Coursework</h1>
          <p className="ct-sub">{NODES.filter(n=>n.lv==="GR").length} graduate + {NODES.filter(n=>n.lv==="UG").length} undergraduate. Hover to explore, click to zoom.</p>
        </div>
      </div>

      <div className="ct-legend">
        <div className="container" style={{display:"flex",gap:14,flexWrap:"wrap",alignItems:"center"}}>
          {DO.map(d=><span key={d} className="ct-leg"><span className="ct-leg-dot" style={{background:DISC[d].c}}/>{DISC[d].label}</span>)}
          <span style={{color:"#ccc"}}>|</span>
          {["ML/AI","Trading","Statistics","Optimization","Theory","Policy"].map(a=><span key={a} className="ct-leg"><span className="ct-leg-dot" style={{background:AC[a]}}/>{a}</span>)}
        </div>
      </div>

      <div className="ct-vp" ref={vpRef}>
        <motion.div
          className="ct-canvas"
          style={{width:w,height:h}}
          animate={{scale:zScale,x:zX,y:zY}}
          transition={{duration:0.7,ease:[0.16,1,0.3,1]}}
          onClick={()=>setSel(null)}
        >
          {/* SVG edge layer */}
          <svg className="ct-edges" width={w} height={h}>
            {EDGES.map(([a,b],i)=>{
              const pa=p[a],pb=p[b]; if(!pa||!pb) return null;
              const na=NODES.find(n=>n.id===a),nb=NODES.find(n=>n.id===b);
              const cross=na?.cat!==nb?.cat;
              const c=cross?"#bbb":DISC[na?.cat||"MATH"].c;
              const dim=hovCat&&na?.cat!==hovCat&&nb?.cat!==hovCat;
              const lit=hov&&(a===hov||b===hov);
              return <motion.path key={i} d={curve(pa.x,pa.y,pb.x,pb.y)} fill="none"
                stroke={c} strokeWidth={lit?2.5:cross?0.8:1.2}
                strokeDasharray={cross?"5 5":"none"}
                initial={{pathLength:0,opacity:0}}
                animate={{pathLength:1,opacity:dim?0.02:lit?0.5:cross?0.07:0.15}}
                transition={{pathLength:{duration:1.5,delay:0.3+(na?.tier||0)*0.15,ease:[0.16,1,0.3,1]},opacity:{duration:0.3}}}
              />;
            })}
          </svg>

          {/* HTML nodes */}
          {NODES.map((n,i)=>{
            const np=p[n.id]; if(!np) return null;
            const c=DISC[n.cat].c;
            const isHov=hov===n.id;
            const isSel=sel?.id===n.id;
            const active=isHov||isSel;
            const dim=!!(hovCat&&n.cat!==hovCat&&!connected.has(n.id));
            return (
              <motion.div key={n.id} className="ct-node"
                style={{left:np.x,top:np.y}}
                initial={{opacity:0,scale:0.5}}
                animate={{opacity:dim?0.12:1,scale:dim?0.9:active?1.12:1,filter:dim?"blur(1.5px)":"blur(0px)"}}
                transition={{opacity:{duration:0.3},scale:{duration:0.4,ease:[0.16,1,0.3,1]},
                  ...(i===0?{}:{delay:0}),...({})}}
                whileInView={{opacity:dim?0.12:1,scale:dim?0.9:1}}
                onMouseEnter={()=>setHov(n.id)}
                onMouseLeave={()=>setHov(null)}
                onClick={(e)=>{e.stopPropagation();setSel(isSel?null:n)}}
              >
                {/* Glow ring */}
                {active && <div className="ct-glow" style={{boxShadow:`0 0 30px ${c}25, 0 0 60px ${c}10`}}/>}

                {/* Outer ring */}
                <div className="ct-ring" style={{
                  background:conicGrad(n.areas),
                  opacity:active?0.5:0.2,
                  boxShadow:active?`0 6px 24px rgba(0,0,0,0.08)`:`0 2px 12px rgba(0,0,0,0.04)`,
                }}/>

                {/* Gap ring */}
                <div className="ct-gap"/>

                {/* Inner circle */}
                <div className="ct-inner" style={{borderColor:active?c+"88":c+"22"}}>
                  <span className="ct-name" style={{color:c}}>{n.n}</span>
                  <span className="ct-code">{n.code}</span>
                </div>

                {/* Grad badge */}
                {n.lv==="GR"&&<div className="ct-grad" style={{color:c}}>&#9733;</div>}

                {/* Area labels on hover */}
                <AnimatePresence>
                  {active && n.areas.map((a,ai)=>{
                    const angle = (-90 + (ai + 0.5) * (360 / n.areas.length)) * Math.PI / 180;
                    const r = 62;
                    return (
                      <motion.div key={a} className="ct-area-label"
                        style={{left:50+Math.cos(angle)*r+"%",top:50+Math.sin(angle)*r+"%",background:AC[a]||"#888"}}
                        initial={{opacity:0,scale:0.7}}
                        animate={{opacity:0.95,scale:1}}
                        exit={{opacity:0,scale:0.7}}
                        transition={{duration:0.2,delay:ai*0.05}}
                      >{a}</motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Detail panel — slides in from right */}
        <AnimatePresence>
          {sel && (
            <motion.div className="ct-panel"
              initial={{x:"100%",opacity:0}}
              animate={{x:0,opacity:1}}
              exit={{x:"100%",opacity:0}}
              transition={{duration:0.45,ease:[0.16,1,0.3,1]}}
            >
              <button className="ct-panel-close" onClick={()=>setSel(null)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
              <div className="ct-panel-badge" style={{color:DISC[sel.cat].c,borderColor:DISC[sel.cat].c+"44",background:DISC[sel.cat].c+"08"}}>
                {DISC[sel.cat].label}
              </div>
              {sel.lv==="GR"&&<span className="ct-panel-grad">Graduate</span>}
              <div className="ct-panel-code" style={{color:DISC[sel.cat].c}}>{sel.code}</div>
              <h2 className="ct-panel-name">{sel.n}</h2>
              <p className="ct-panel-desc">{sel.desc}</p>
              {sel.sem&&<div className="ct-panel-meta">{sel.sem}</div>}
              {sel.book&&<div className="ct-panel-meta" style={{fontStyle:"italic"}}>Textbook: {sel.book}</div>}
              <div className="ct-panel-areas">
                {sel.areas.map(a=><span key={a} className="ct-panel-area" style={{color:AC[a],borderColor:(AC[a]||"#888")+"33",background:(AC[a]||"#888")+"08"}}>{a}</span>)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer/>
    </>
  );
}

/* ═══════════════════ CSS ═══════════════════ */
const CSS=`
.ct-header{padding:120px 0 20px;background:var(--bg)}
.ct-title{font-size:clamp(40px,6vw,64px);font-weight:800;color:var(--text-primary);letter-spacing:-0.03em}
.ct-sub{font-size:15px;color:var(--text-tertiary);margin-top:8px}

.ct-legend{padding:12px 0 8px}
.ct-leg{display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;color:var(--text-tertiary)}
.ct-leg-dot{width:7px;height:7px;border-radius:50%}

/* Viewport */
.ct-vp{position:relative;overflow:hidden;height:calc(100vh - 180px);min-height:500px;background:transparent}

/* Canvas (transforms) */
.ct-canvas{position:relative;transform-origin:0 0;will-change:transform}

/* Edge SVG */
.ct-edges{position:absolute;inset:0;pointer-events:none}

/* Node */
.ct-node{position:absolute;width:108px;height:108px;transform:translate(-50%,-50%);cursor:pointer;z-index:2}

.ct-glow{position:absolute;inset:-10px;border-radius:50%;pointer-events:none;z-index:0}

.ct-ring{position:absolute;inset:0;border-radius:50%;transition:opacity 0.35s,box-shadow 0.35s;z-index:1}

.ct-gap{position:absolute;inset:8px;border-radius:50%;background:var(--bg);z-index:2}

.ct-inner{position:absolute;inset:12px;border-radius:50%;background:#fff;border:1.5px solid;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  z-index:3;transition:border-color 0.3s;box-shadow:0 1px 8px rgba(0,0,0,0.04)}

.ct-name{font-size:9.5px;font-weight:800;text-align:center;line-height:1.2;padding:0 6px;letter-spacing:-0.01em}
.ct-code{font-size:7.5px;font-weight:600;color:#999;font-family:'JetBrains Mono',monospace;margin-top:2px;letter-spacing:0.3px}

.ct-grad{position:absolute;top:-2px;left:50%;transform:translateX(-50%);font-size:10px;z-index:4}

/* Area labels */
.ct-area-label{position:absolute;transform:translate(-50%,-50%);
  font-size:7.5px;font-weight:700;color:#fff;padding:2px 7px;border-radius:4px;
  white-space:nowrap;z-index:5;pointer-events:none;letter-spacing:0.2px}

/* Right panel */
.ct-panel{position:absolute;right:0;top:0;width:360px;height:100%;background:#fff;
  border-left:1px solid var(--border);padding:40px 32px;overflow-y:auto;z-index:10;
  box-shadow:-12px 0 48px rgba(0,0,0,0.05)}

.ct-panel-close{position:absolute;top:16px;right:16px;width:32px;height:32px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;color:var(--text-tertiary);transition:all 0.2s}
.ct-panel-close:hover{color:var(--text-primary);background:var(--surface)}

.ct-panel-badge{font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;
  padding:4px 12px;border-radius:5px;border:1px solid;display:inline-block;margin-bottom:12px}

.ct-panel-grad{font-size:10px;font-weight:700;color:var(--accent);letter-spacing:1px;
  text-transform:uppercase;margin-left:10px;padding:3px 8px;border:1px solid var(--accent);border-radius:4px}

.ct-panel-code{font-size:14px;font-weight:700;font-family:'JetBrains Mono',monospace;letter-spacing:0.5px;margin-bottom:6px}
.ct-panel-name{font-size:26px;font-weight:800;color:var(--text-primary);letter-spacing:-0.5px;margin-bottom:14px;line-height:1.2}
.ct-panel-desc{font-size:15px;line-height:1.8;color:var(--text-secondary);margin-bottom:16px}
.ct-panel-meta{font-size:13px;color:var(--text-tertiary);margin-bottom:6px;font-weight:600}
.ct-panel-areas{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}
.ct-panel-area{font-size:11px;font-weight:600;padding:4px 10px;border-radius:5px;border:1px solid}

@media(max-width:900px){
  .ct-vp{height:auto;min-height:auto;overflow-x:auto;overflow-y:visible}
  .ct-canvas{transform:none!important}
  .ct-panel{position:fixed;width:100%;height:auto;max-height:60vh;bottom:0;top:auto;border-left:none;border-top:1px solid var(--border);border-radius:16px 16px 0 0}
}
`;
