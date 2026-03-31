"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";

/* ═══════════════════ CONFIG ═══════════════════ */
const DISCIPLINES: Record<string, { label: string; color: string }> = {
  MATH: { label: "Mathematics", color: "#1e52f3" },
  CS:   { label: "CS / ML",     color: "#7c3aed" },
  ECON: { label: "Economics",   color: "#b45309" },
  FIN:  { label: "Finance",     color: "#059669" },
};

// Maximally differentiated colors — no two areas look alike
const AREA_COLORS: Record<string, string> = {
  "ML/AI":"#7c3aed","Trading":"#059669","Statistics":"#e11d48",
  "Optimization":"#f59e0b","Theory":"#1e52f3","Finance":"#10b981",
  "Research":"#8b5cf6","Policy":"#ea580c","Applied":"#d97706",
  "Control":"#0891b2","Modeling":"#6366f1","Data":"#06b6d4",
  "Computation":"#64748b","Risk":"#dc2626",
};

const DISC_ORDER = ["MATH","CS","ECON","FIN"];

/* ═══════════════════ DATA ═══════════════════ */
interface CourseNode {
  id:string; code:string; name:string; category:string; level:string;
  tier:number; col:number; desc:string; areas:string[];
  semester?:string; textbook?:string;
}

const COURSES: CourseNode[] = [
  {id:"m1",code:"MATH 226",name:"Calculus II",category:"MATH",level:"UG",tier:0,col:0,desc:"Techniques of integration, sequences and series, Taylor series.",areas:["Theory","Computation","Applied"],semester:"Fall 2023"},
  {id:"m2",code:"MATH 229",name:"Calculus III",category:"MATH",level:"UG",tier:0,col:1,desc:"Multivariable calculus: partial derivatives, integrals, vector calculus.",areas:["Theory","Optimization","Applied"],semester:"Fall 2023"},
  {id:"m3",code:"MATH 245",name:"Diff. Equations",category:"MATH",level:"UG",tier:1,col:0,desc:"ODEs, Laplace transforms, Fourier series, boundary value problems.",areas:["Modeling","Control","Applied"],semester:"Spring 2024"},
  {id:"m4",code:"MATH 407",name:"Probability",category:"MATH",level:"UG",tier:2,col:0,desc:"Random variables, expectation, MGFs, and classical limit theorems.",areas:["ML/AI","Trading","Statistics"],semester:"Fall 2024",textbook:"Grimmett"},
  {id:"m5",code:"MATH 408",name:"Statistics",category:"MATH",level:"UG",tier:2,col:1,desc:"Estimation, hypothesis testing, confidence intervals, Bayesian methods.",areas:["Statistics","Research","ML/AI"],semester:"Fall 2025",textbook:"Wackerly"},
  {id:"m6",code:"MATH 425",name:"Real Analysis",category:"MATH",level:"UG",tier:1,col:1,desc:"Completeness, sequences, continuity, differentiability, Riemann integration.",areas:["Theory","Research","Optimization"],semester:"Fall 2025",textbook:"Rudin"},
  {id:"m7",code:"MATH 471",name:"Linear Algebra",category:"MATH",level:"UG",tier:2,col:2,desc:"Canonical forms, spectral theorem, inner product spaces, SVD.",areas:["ML/AI","Computation","Research"],semester:"Spring 2025",textbook:"Horn & Garcia"},
  {id:"m8",code:"MATH 467",name:"Optimization",category:"MATH",level:"UG",tier:3,col:0,desc:"Convex optimization, duality theory, KKT conditions, gradient methods.",areas:["Optimization","ML/AI","Trading"],semester:"Fall 2025",textbook:"Chong & Zak"},
  {id:"m9",code:"MATH 501",name:"Numerical Analysis",category:"MATH",level:"GR",tier:3,col:1,desc:"Interpolation, quadrature, ODE/PDE solvers, error analysis.",areas:["Computation","Modeling","Research"],semester:"Spring 2026"},
  {id:"m10",code:"MATH 541a",name:"Grad Statistics",category:"MATH",level:"GR",tier:3,col:2,desc:"Sufficiency, UMVUE, MLE, asymptotic theory.",areas:["Statistics","Research","ML/AI"],semester:"Spring 2026",textbook:"Casella & Berger"},
  {id:"m11",code:"MATH 505b",name:"Applied Probability",category:"MATH",level:"GR",tier:4,col:0,desc:"Markov processes, martingales, Brownian motion, diffusion.",areas:["Trading","Control","Research"],semester:"Spring 2025",textbook:"Grimmett 6-13"},
  {id:"m12",code:"MATH 525a",name:"Measure Theory",category:"MATH",level:"GR",tier:4,col:1,desc:"Measure and integration, Radon-Nikodym, Fubini, Lp spaces.",areas:["Theory","Research","Statistics"],semester:"Fall 2026",textbook:"Folland & Rudin"},
  {id:"c1",code:"CSCI 270",name:"Algorithms",category:"CS",level:"UG",tier:0,col:0,desc:"Divide-and-conquer, DP, graph algorithms, NP-completeness.",areas:["Computation","ML/AI","Theory"]},
  {id:"c2",code:"CSCI 567",name:"Machine Learning",category:"CS",level:"GR",tier:1,col:0,desc:"Supervised/unsupervised learning, kernels, neural nets, ensembles.",areas:["ML/AI","Data","Research"],semester:"Spring 2027"},
  {id:"c3",code:"CSCI 573",name:"Probabilistic Reasoning",category:"CS",level:"GR",tier:1,col:1,desc:"Bayesian nets, MRFs, variational inference, MCMC.",areas:["ML/AI","Statistics","Research"],semester:"Spring 2027"},
  {id:"c4",code:"EE 556",name:"Stochastic RL",category:"CS",level:"GR",tier:2,col:0,desc:"MDPs, dynamic programming, Kalman filtering, reinforcement learning.",areas:["Control","Trading","ML/AI"],semester:"Spring 2027"},
  {id:"c5",code:"ISE 615",name:"RL & Control",category:"CS",level:"GR",tier:2,col:1,desc:"Stochastic control, RL theory, game theory, mean-field analysis.",areas:["Control","ML/AI","Theory"],semester:"Spring 2026"},
  {id:"c6",code:"ISE 662",name:"Decision Theory",category:"CS",level:"GR",tier:3,col:0,desc:"Utility functions, copulas, multiattribute utility, game theory.",areas:["Trading","Theory","Policy"],semester:"Spring 2027"},
  {id:"e1",code:"ECON 303",name:"Microeconomics",category:"ECON",level:"UG",tier:1,col:0,desc:"Consumer/producer theory, market structures, equilibrium, welfare.",areas:["Policy","Theory","Trading"],semester:"Fall 2024"},
  {id:"e2",code:"ECON 305",name:"Macroeconomics",category:"ECON",level:"UG",tier:2,col:0,desc:"IS-LM, monetary/fiscal policy, growth, business cycles.",areas:["Policy","Finance","Modeling"],semester:"Spring 2024"},
  {id:"f1",code:"ACCT 410",name:"Accounting",category:"FIN",level:"UG",tier:1,col:0,desc:"Financial statements, accrual accounting, GAAP.",areas:["Finance","Applied","Modeling"],semester:"Spring 2025"},
  {id:"f2",code:"BUAD 308",name:"Corporate Finance",category:"FIN",level:"UG",tier:2,col:0,desc:"Capital budgeting, WACC, capital structure, valuation.",areas:["Finance","Trading","Modeling"],semester:"Fall 2024"},
  {id:"f3",code:"FBE 423",name:"VC & PE",category:"FIN",level:"UG",tier:3,col:0,desc:"Fund structures, due diligence, term sheets, exits.",areas:["Finance","Applied","Risk"],semester:"Spring 2025"},
  {id:"f4",code:"FBE 435",name:"Fixed Income",category:"FIN",level:"UG",tier:3,col:1,desc:"Bond pricing, yield curves, duration/convexity, MBS.",areas:["Trading","Risk","Finance"],semester:"Spring 2025"},
];

const EDGES:[string,string][]=[
  ["m1","m3"],["m2","m3"],["m3","m4"],["m3","m6"],["m4","m5"],["m6","m7"],
  ["m5","m10"],["m7","m8"],["m6","m9"],["m4","m8"],["m4","m11"],["m6","m12"],
  ["m7","m9"],["m11","m12"],["m8","m9"],
  ["c1","c2"],["c2","c3"],["c2","c4"],["c3","c5"],["c4","c6"],["c5","c6"],["c4","c5"],
  ["m4","c2"],["m4","c3"],["m8","c4"],["m7","c2"],["m11","c4"],["m5","c3"],
  ["m6","e1"],["m4","e1"],["e1","e2"],["e1","f2"],["e2","f2"],
  ["f1","f2"],["f2","f3"],["f2","f4"],["f4","m11"],
];

/* ═══════════════════ LAYOUT ═══════════════════ */
const RENDER_SCALE = 2.5;
const NS = 130 * RENDER_SCALE;

// Manual positions — grouped by discipline, left edge at 200*S
const S = RENDER_SCALE;
const G = 250*S; // column gap (wider)
const R = 220*S; // row gap (taller)
const L = 250*S; // left offset (push right of key)

const MANUAL_POS: Record<string, { x: number; y: number }> = {
  // ═══ MATHEMATICS (left cluster) ═══
  // Foundations row
  m1:  { x: L,       y: R*0.5 },  // Calc II
  m2:  { x: L+G,     y: R*0.5 },  // Calc III
  // Core row
  m3:  { x: L,       y: R*1.5 },  // Diff Eq
  m6:  { x: L+G,     y: R*1.5 },  // Real Analysis
  // Intermediate row
  m4:  { x: L,       y: R*2.5 },  // Probability
  m5:  { x: L+G,     y: R*2.5 },  // Statistics
  m7:  { x: L+G*2,   y: R*2.5 },  // Linear Algebra
  // Advanced row
  m8:  { x: L,       y: R*3.5 },  // Optimization
  m9:  { x: L+G,     y: R*3.5 },  // Numerical Analysis
  m10: { x: L+G*2,   y: R*3.5 },  // Grad Stats
  // Graduate row
  m11: { x: L,       y: R*4.5 },  // Applied Prob
  m12: { x: L+G,     y: R*4.5 },  // Measure Theory

  // ═══ CS / ML (right cluster) ═══
  c1:  { x: L+G*4,   y: R*0.5 },  // Algorithms
  c2:  { x: L+G*4,   y: R*1.5 },  // Machine Learning
  c3:  { x: L+G*5,   y: R*1.5 },  // Probabilistic Reasoning
  c4:  { x: L+G*4,   y: R*2.5 },  // Stochastic RL
  c5:  { x: L+G*5,   y: R*2.5 },  // RL & Control
  c6:  { x: L+G*4.5, y: R*3.5 },  // Decision Theory

  // ═══ ECONOMICS (center-right) ═══
  e1:  { x: L+G*3,   y: R*1.5 },  // Microeconomics
  e2:  { x: L+G*3,   y: R*2.5 },  // Macroeconomics

  // ═══ FINANCE (center-bottom) ═══
  f1:  { x: L+G*3,   y: R*3.5 },  // Accounting
  f2:  { x: L+G*3,   y: R*4.5 },  // Corporate Finance
  f3:  { x: L+G*3.5, y: R*5.5 },  // VC & PE
  f4:  { x: L+G*4.5, y: R*4.5 },  // Fixed Income
};

const LAYOUT = (() => {
  const pos = MANUAL_POS;
  const xs = Object.values(pos).map(p => p.x);
  const ys = Object.values(pos).map(p => p.y);
  const w = Math.max(...xs) + NS + 100*S;
  const h = Math.max(...ys) + NS + 100*S;
  return { pos, w, h };
})();

function bCurve(x1:number,y1:number,x2:number,y2:number){const m=(y1+y2)/2;return`M${x1},${y1}C${x1},${m} ${x2},${m} ${x2},${y2}`}

function conicGrad(areas:string[]){
  const n=areas.length,g=4,s=360/n,stops:string[]=[];
  areas.forEach((a,i)=>{const c=AREA_COLORS[a]||"#888",st=i*s+g,en=(i+1)*s-g;
    stops.push(`transparent ${st}deg`,`${c} ${st}deg ${en}deg`,`transparent ${en}deg`);});
  return`conic-gradient(from 0deg,${stops.join(",")})`;
}

/* ═══════════════════ PAGE ═══════════════════ */
export default function CoursesPage(){
  const[sel,setSel]=useState<CourseNode|null>(null);
  const[hov,setHov]=useState<string|null>(null);
  const vpRef=useRef<HTMLDivElement>(null);
  const[vpW,setVpW]=useState(1200);
  const[vpH,setVpH]=useState(800);
  const[pan,setPan]=useState({x:0,y:0});
  const[manualZoom,setManualZoom]=useState(1.2); // start zoomed in a bit
  const dragRef=useRef({dragging:false,startX:0,startY:0,startPanX:0,startPanY:0});

  useEffect(()=>{
    const m=()=>{if(vpRef.current){setVpW(vpRef.current.offsetWidth);setVpH(vpRef.current.offsetHeight)}};
    m();window.addEventListener("resize",m);return()=>window.removeEventListener("resize",m);
  },[]);

  useEffect(()=>{
    const k=(e:KeyboardEvent)=>{if(e.key==="Escape"){setSel(null);setPan({x:0,y:0})}};
    window.addEventListener("keydown",k);return()=>window.removeEventListener("keydown",k);
  },[]);

  // Scroll to zoom centered on cursor
  const onWheel=(e:React.WheelEvent)=>{
    if(sel)return;
    e.stopPropagation();
    const rect=vpRef.current?.getBoundingClientRect();
    if(!rect)return;
    // Mouse position in viewport
    const mx=e.clientX-rect.left;
    const my=e.clientY-rect.top;
    const oldZ=manualZoom;
    const newZ=Math.max(0.3,Math.min(2.5,oldZ-e.deltaY*0.001));
    const ratio=newZ/oldZ;
    // Pan so cursor point stays fixed: newPan = cursor - (cursor - oldPan) * ratio
    setPan(p=>({
      x: mx - (mx - p.x) * ratio,
      y: my - (my - p.y) * ratio,
    }));
    setManualZoom(newZ);
  };

  // Lock body scroll while on this page
  useEffect(()=>{
    document.body.style.overflow="hidden";
    return()=>{document.body.style.overflow=""};
  },[]);

  // Drag to pan
  const onPointerDown=(e:React.PointerEvent)=>{
    dragRef.current={dragging:true,startX:e.clientX,startY:e.clientY,startPanX:pan.x,startPanY:pan.y};
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove=(e:React.PointerEvent)=>{
    if(!dragRef.current.dragging)return;
    const dx=e.clientX-dragRef.current.startX;
    const dy=e.clientY-dragRef.current.startY;
    setPan({x:dragRef.current.startPanX+dx,y:dragRef.current.startPanY+dy});
  };
  const onPointerUp=()=>{dragRef.current.dragging=false};

  const{pos,w:cW,h:cH}=LAYOUT;
  const fitScale = Math.min(vpW / cW, vpH / cH);

  const hovCat=hov?COURSES.find(c=>c.id===hov)?.category:null;
  const conn=useMemo(()=>{const s=new Set<string>();if(hov)EDGES.forEach(([a,b])=>{if(a===hov||b===hov){s.add(a);s.add(b)}});return s},[hov]);

  const sp=sel?pos[sel.id]:null;
  const browseScale = fitScale * manualZoom;
  const zoomedScale = fitScale * 3;
  const zs = sel ? zoomedScale : browseScale;
  const zx = sel && sp ? vpW/2 - sp.x*zs : (vpW - cW*browseScale)/2 + pan.x;
  const zy = sel && sp ? vpH*0.35 - sp.y*zs : (vpH - cH*browseScale)/2 + pan.y;
  // Where the selected node actually lands on screen:
  const nodeScreenX = sel && sp ? vpW/2 : 0;
  const nodeScreenY = sel && sp ? vpH*0.35 : 0;

  return(
    <>
      <style>{CSS}</style>
      <div className="ct-title-bar">
        <div className="container">
          <h1 className="ct-page-title">Coursework</h1>
        </div>
      </div>

      <div className="ct-page">
        {/* Map key — overlaid on the viewport */}
        <div className="ct-key">
          <div className="ct-key-section">
            <div className="ct-key-label">Disciplines</div>
            {DISC_ORDER.map(d=>(
              <div key={d} className="ct-key-item">
                <span className="ct-key-dot" style={{background:DISCIPLINES[d].color}}/>
                <span>{DISCIPLINES[d].label}</span>
              </div>
            ))}
          </div>
          <div className="ct-key-section">
            <div className="ct-key-label">Areas</div>
            {["ML/AI","Trading","Statistics","Optimization","Theory","Control","Policy","Research"].map(a=>(
              <div key={a} className="ct-key-item">
                <span className="ct-key-dot" style={{background:AREA_COLORS[a]}}/>
                <span>{a}</span>
              </div>
            ))}
          </div>
          <div className="ct-key-section">
            <div className="ct-key-label">Level</div>
            <div className="ct-key-item"><span className="ct-key-dot ct-key-dot-sm"/>Undergraduate</div>
            <div className="ct-key-item"><span className="ct-key-dot ct-key-dot-lg"/>&#9733; Graduate</div>
          </div>
        </div>

        {/* Viewport */}
        <div className="ct-viewport" ref={vpRef}
          onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}
          onWheel={onWheel}
          style={{cursor:dragRef.current.dragging?"grabbing":"grab"}}>
          <motion.div className="ct-canvas" style={{width:cW,height:cH}}
            animate={{scale:zs,x:zx,y:zy}}
            transition={{duration:0.7,ease:[0.16,1,0.3,1]}}
            onClick={()=>{setSel(null);setPan({x:0,y:0})}}>

            {/* Edges */}
            <svg className="ct-edges" width={cW} height={cH}>
              {EDGES.map(([a,b],i)=>{
                const pa=pos[a],pb=pos[b];if(!pa||!pb)return null;
                const na=COURSES.find(c=>c.id===a),nb=COURSES.find(c=>c.id===b);
                const cross=na?.category!==nb?.category;
                const ec=cross?"#bbb":DISCIPLINES[na?.category||"MATH"].color;
                const dim=hovCat&&na?.category!==hovCat&&nb?.category!==hovCat;
                const lit=hov&&(a===hov||b===hov);
                return<motion.path key={i} d={bCurve(pa.x,pa.y,pb.x,pb.y)} fill="none"
                  stroke={ec} strokeWidth={lit?2.5:cross?.8:1.2}
                  strokeDasharray={cross?"6 6":"none"}
                  initial={{pathLength:0,opacity:0}}
                  animate={{pathLength:1,opacity:sel?.02:dim?.02:lit?.55:cross?.06:.16}}
                  transition={{pathLength:{duration:1.5,delay:.4+(na?.tier||0)*.2,ease:[.16,1,.3,1]},opacity:{duration:.3}}}
                />;
              })}
            </svg>

            {/* Nodes */}
            {COURSES.map(course=>{
              const np=pos[course.id];if(!np)return null;
              const dc=DISCIPLINES[course.category].color;
              const isH=hov===course.id,isS=sel?.id===course.id,act=isH||isS;
              const dim=!!(hovCat&&course.category!==hovCat&&!conn.has(course.id))&&!isS;
              return(
                <motion.div key={course.id} className="ct-node" style={{left:np.x-NS/2,top:np.y-NS/2}}
                  initial={{opacity:0,scale:.4}}
                  animate={{
                    opacity: sel&&!isS ? 0.15 : dim ? 0.15 : 1,
                    scale: dim ? 0.92 : act ? 1.12 : 1,
                    filter: sel&&!isS ? "blur(3px)" : "blur(0px)",
                  }}
                  transition={{scale:{duration:.35,ease:[.16,1,.3,1]},opacity:{duration:.3},delay:.15+course.tier*.12}}
                  onMouseEnter={()=>setHov(course.id)} onMouseLeave={()=>setHov(null)}
                  onClick={e=>{e.stopPropagation();setSel(isS?null:course)}}>

                  {act&&<div className="ct-glow" style={{boxShadow:`0 0 28px ${dc}20,0 0 56px ${dc}10`}}/>}
                  <div className="ct-ring" style={{background:conicGrad(course.areas),opacity:act?.75:.45}}/>
                  <div className="ct-gap"/>
                  <div className="ct-inner" style={{background:dc,opacity:act?1:.9,borderColor:act?"#fff3":dc}}>
                    <span className="ct-nm">{course.name}</span>
                    <span className="ct-cd">{course.code}</span>
                  </div>
                  {course.level==="GR"&&<div className="ct-star" style={{color:dc}}>&#9733;</div>}

                  {/* Area pills — positioned to match clockwise conic-gradient */}
                  <AnimatePresence>
                    {act&&course.areas.map((a,ai)=>{
                      // conic-gradient: 0deg = top, goes clockwise.
                      // In screen coords: x = sin(angle), y = -cos(angle)
                      const sliceDeg = 360 / course.areas.length;
                      const cssDeg = ai * sliceDeg + sliceDeg / 2; // center of segment (from top, CW)
                      const rad = cssDeg * Math.PI / 180;
                      // Place pills exactly at the outer edge of the ring
                      const labelR = NS/2 + 4*RENDER_SCALE;
                      // Offset by -NS*0.06 to compensate for scale transform origin
                      const cx = NS * 0.325;
                      const cy = NS * 0.36;
                      const labelR2 = NS/2 + 30*RENDER_SCALE;
                      const px = cx + Math.sin(rad) * labelR2;
                      const py = cy - Math.cos(rad) * labelR2;
                      return<motion.div key={a} className="ct-pill"
                        style={{left:px,top:py,background:AREA_COLORS[a]||"#888"}}
                        initial={{opacity:0,scale:.6}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.6}}
                        transition={{duration:.2,delay:ai*.05}}>
                        {a}
                      </motion.div>;
                    })}
                  </AnimatePresence>

                </motion.div>
              );
            })}
          </motion.div>

          {/* Card — appears after zoom settles, at fixed viewport position */}
          <AnimatePresence>
            {sel&&sp&&(
              <motion.div className="ct-card"
                style={{
                  left: vpW/2,
                  top: vpH*0.35 + (NS/2)*zoomedScale + 14,
                }}
                initial={{opacity:0,y:12}}
                animate={{opacity:1,y:0}}
                exit={{opacity:0,y:12}}
                transition={{duration:.35,delay:.5,ease:[.16,1,.3,1]}}
                onClick={e=>e.stopPropagation()}>
                <div className="ct-card-arrow-top"/>
                <div className="ct-card-code" style={{color:DISCIPLINES[sel.category].color}}>{sel.code}</div>
                <div className="ct-card-name">{sel.name}</div>
                {sel.level==="GR"&&<span className="ct-card-grad">Graduate</span>}
                <p className="ct-card-desc">{sel.desc}</p>
                <div className="ct-card-foot">
                  {sel.semester&&<span>{sel.semester}</span>}
                  {sel.textbook&&<span>Textbook: {sel.textbook}</span>}
                </div>
                <div className="ct-card-areas">
                  {sel.areas.map(a=><span key={a} className="ct-card-area" style={{color:AREA_COLORS[a],background:(AREA_COLORS[a]||"#888")+"10",borderColor:(AREA_COLORS[a]||"#888")+"30"}}>{a}</span>)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer/>
    </>
  );
}

const CSS=`
/* Title bar */
.ct-title-bar{padding:110px 0 20px;background:var(--bg)}
.ct-page-title{font-size:clamp(36px,5vw,56px);font-weight:800;color:var(--text-primary);letter-spacing:-0.03em}

.ct-page{position:relative;height:calc(100vh - 170px);overflow:hidden;background:var(--bg);touch-action:none}
.ct-viewport{overscroll-behavior:none}

/* Map key — floating overlay top-left */
.ct-key{position:absolute;top:16px;left:24px;z-index:20;
  background:rgba(255,255,255,.88);backdrop-filter:blur(16px);
  border:1px solid var(--border);border-radius:14px;
  padding:18px 20px;width:170px;max-height:calc(100% - 32px);overflow-y:auto;
  display:flex;flex-direction:column;gap:14px;
  box-shadow:0 4px 20px rgba(0,0,0,.04)}
.ct-key-section{display:flex;flex-direction:column;gap:3px}
.ct-key-label{font-size:8px;font-weight:700;color:var(--text-tertiary);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:1px}
.ct-key-item{display:flex;align-items:center;gap:6px;font-size:11px;font-weight:500;color:var(--text-secondary)}
.ct-key-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0}
.ct-key-dot-sm{width:5px;height:5px;background:var(--text-tertiary)}
.ct-key-dot-lg{width:8px;height:8px;background:var(--text-tertiary)}

/* Viewport — full page */
.ct-viewport{position:absolute;inset:0;overflow:hidden}
.ct-canvas{position:relative;transform-origin:0 0;will-change:transform}
.ct-edges{position:absolute;inset:0;pointer-events:none;z-index:0}

/* Node */
.ct-node{position:absolute;width:${NS}px;height:${NS}px;cursor:pointer;z-index:2;will-change:transform,opacity;-webkit-backface-visibility:hidden;backface-visibility:hidden}
.ct-glow{position:absolute;inset:${-12*RENDER_SCALE}px;border-radius:50%;pointer-events:none;z-index:0;transition:opacity .35s}
.ct-ring{position:absolute;inset:0;border-radius:50%;transition:opacity .35s;z-index:1;box-shadow:0 ${3*RENDER_SCALE}px ${16*RENDER_SCALE}px rgba(0,0,0,.05)}
.ct-gap{position:absolute;inset:${10*RENDER_SCALE}px;border-radius:50%;background:var(--bg);z-index:2}
.ct-inner{position:absolute;inset:${14*RENDER_SCALE}px;border-radius:50%;border:${2*RENDER_SCALE}px solid;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  z-index:3;transition:all .3s;box-shadow:0 ${2*RENDER_SCALE}px ${12*RENDER_SCALE}px rgba(0,0,0,.08);-webkit-font-smoothing:antialiased}
.ct-nm{font-size:${11*RENDER_SCALE}px;font-weight:800;text-align:center;line-height:1.25;padding:0 ${8*RENDER_SCALE}px;color:#fff}
.ct-cd{font-size:${8.5*RENDER_SCALE}px;font-weight:600;color:rgba(255,255,255,.6);font-family:'JetBrains Mono',monospace;margin-top:${2*RENDER_SCALE}px}
.ct-star{position:absolute;top:${-4*RENDER_SCALE}px;left:50%;transform:translateX(-50%);font-size:${11*RENDER_SCALE}px;z-index:4}
.ct-pill{position:absolute;transform:translate(-50%,-50%);font-size:${8*RENDER_SCALE}px;font-weight:700;color:#fff;
  padding:${3*RENDER_SCALE}px ${8*RENDER_SCALE}px;border-radius:${5*RENDER_SCALE}px;white-space:nowrap;z-index:5;pointer-events:none}

/* Detail card — rendered in viewport space, not inside scaled canvas */
.ct-card{position:absolute;margin-left:-170px;
  width:340px;background:#fff;
  border:1px solid var(--border);border-radius:14px;
  padding:20px 24px;z-index:25;pointer-events:auto;
  box-shadow:0 12px 40px rgba(0,0,0,.1)}
.ct-card-arrow-top{position:absolute;top:-7px;left:50%;transform:translateX(-50%) rotate(45deg);
  width:12px;height:12px;background:#fff;border-left:1px solid var(--border);border-top:1px solid var(--border)}
.ct-card-arrow-bottom{position:absolute;bottom:-7px;left:50%;transform:translateX(-50%) rotate(45deg);
  width:12px;height:12px;background:#fff;border-right:1px solid var(--border);border-bottom:1px solid var(--border)}
.ct-card-code{font-size:12px;font-weight:700;font-family:'JetBrains Mono',monospace;letter-spacing:.5px;margin-bottom:4px}
.ct-card-name{font-size:18px;font-weight:800;color:var(--text-primary);margin-bottom:6px;line-height:1.3}
.ct-card-grad{font-size:10px;font-weight:700;color:var(--accent);letter-spacing:.8px;text-transform:uppercase;
  padding:2px 8px;border:1px solid var(--accent);border-radius:4px;display:inline-block;margin-bottom:8px}
.ct-card-desc{font-size:14px;line-height:1.7;color:var(--text-secondary);margin-bottom:10px}
.ct-card-foot{font-size:12px;color:var(--text-tertiary);font-weight:600;display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px}
.ct-card-areas{display:flex;gap:6px;flex-wrap:wrap}
.ct-card-area{font-size:11px;font-weight:600;padding:3px 10px;border-radius:5px;border:1px solid}

@media(max-width:900px){
  .ct-page{height:auto;min-height:100vh}
  .ct-key{position:relative;top:auto;left:auto;width:100%;border-radius:0;border:none;
    border-bottom:1px solid var(--border);flex-direction:row;flex-wrap:wrap;gap:16px;
    padding:100px 24px 16px;backdrop-filter:none;background:var(--bg)}
  .ct-viewport{position:relative;height:70vh;min-height:400px}
  .ct-canvas{transform:none!important}
}
`;
