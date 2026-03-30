"use client";

import { useRef, useEffect, useState, useCallback } from "react";

const NODE_COUNT = 130;
const CONNECT_DIST = 140;
const MOUSE_RADIUS = 260;

const SYMBOL_TEXTS = [
  "\u03BB\u2098\u2090\u2093", "\u2207f(x)", "\u03C3\u00B2(t)",
  "E[U(x)]", "\u03C0*(s)", "\u222B d\u03BC",
  "P(s'|s,a)", "V*(s)",
];

interface Node {
  ratioX: number;
  ratioY: number;
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
  spawnDelay: number;
}

interface SymbolNode {
  node: Node;
  text: string;
  ratioX: number;
  ratioY: number;
}

export default function HeroIntro() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);
  const [nameVisible, setNameVisible] = useState(false);
  const [subVisible, setSubVisible] = useState(false);
  const [skipVisible, setSkipVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const exitedRef = useRef(false);
  const animatingRef = useRef(true);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const nodesRef = useRef<Node[]>([]);
  const symbolsRef = useRef<SymbolNode[]>([]);
  const startTimeRef = useRef<number | null>(null);
  const sizeRef = useRef({ w: 0, h: 0 });

  // Check first visit
  useEffect(() => {
    const seen = sessionStorage.getItem("heroSeen");
    if (!seen) {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!prefersReduced) {
        setVisible(true);
        document.body.style.overflow = "hidden";
      }
    }
  }, []);

  const exit = useCallback(() => {
    if (exitedRef.current) return;
    exitedRef.current = true;
    setExiting(true);
    document.body.style.overflow = "";
    sessionStorage.setItem("heroSeen", "1");
    setTimeout(() => {
      animatingRef.current = false;
      setVisible(false);
    }, 1000);
  }, []);

  // Initialize nodes
  useEffect(() => {
    if (!visible) return;

    const nodes: Node[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const rx = Math.random();
      const ry = Math.random();
      nodes.push({
        ratioX: rx, ratioY: ry,
        homeX: rx, homeY: ry,
        x: rx, y: ry,
        vx: 0, vy: 0,
        radius: 1.5 + Math.random(),
        phase: Math.random() * Math.PI * 2,
        spawnDelay: 0,
      });
    }

    const symbols: SymbolNode[] = [];
    const step = Math.floor(NODE_COUNT / SYMBOL_TEXTS.length);
    for (let i = 0; i < SYMBOL_TEXTS.length; i++) {
      const idx = i * step + Math.floor(step / 2);
      if (idx < NODE_COUNT) {
        nodes[idx].radius = 2.5;
        symbols.push({
          node: nodes[idx],
          text: SYMBOL_TEXTS[i],
          ratioX: nodes[idx].ratioX,
          ratioY: nodes[idx].ratioY,
        });
      }
    }

    nodesRef.current = nodes;
    symbolsRef.current = symbols;
  }, [visible]);

  // Canvas animation
  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const nodes = nodesRef.current;
    const symbols = symbolsRef.current;

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas!.width = w;
      canvas!.height = h;
      sizeRef.current = { w, h };
      for (const n of nodes) {
        n.homeX = n.ratioX * w;
        n.homeY = n.ratioY * h;
        n.x = n.homeX;
        n.y = n.homeY;
        n.spawnDelay = Math.sqrt(
          (n.homeX - w / 2) ** 2 + (n.homeY - h / 2) ** 2
        ) * 1.2;
      }
    }

    resize();
    window.addEventListener("resize", resize);

    // Text timing
    const t1 = setTimeout(() => setNameVisible(true), 500);
    const t2 = setTimeout(() => setSubVisible(true), 1100);
    const t3 = setTimeout(() => setSkipVisible(true), 2200);
    const t4 = setTimeout(() => exit(), 4500);

    startTimeRef.current = null;
    animatingRef.current = true;

    function draw(ts: number) {
      if (!animatingRef.current || !ctx || !canvas) return;
      if (startTimeRef.current === null) startTimeRef.current = ts;
      const elapsed = ts - startTimeRef.current;
      const { w: W, h: H } = sizeRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseActive = mouseRef.current.active;

      // Background
      ctx.fillStyle = "#0a1628";
      ctx.fillRect(0, 0, W, H);

      // Radial gradient
      const bgGrad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.55);
      bgGrad.addColorStop(0, "rgba(30,82,243,0.02)");
      bgGrad.addColorStop(1, "rgba(30,82,243,0)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Mouse glow
      if (mouseActive && mx > 0) {
        const glow = ctx.createRadialGradient(mx, my, 0, mx, my, MOUSE_RADIUS);
        glow.addColorStop(0, "rgba(30,82,243,0.05)");
        glow.addColorStop(0.5, "rgba(30,82,243,0.015)");
        glow.addColorStop(1, "rgba(30,82,243,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mx, my, MOUSE_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      // Physics
      for (const n of nodes) {
        n.vx += (n.homeX - n.x) * 0.004;
        n.vy += (n.homeY - n.y) * 0.004;

        if (mouseActive) {
          const dx = mx - n.x, dy = my - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS && dist > 1) {
            const strength = (1 - dist / MOUSE_RADIUS) * 0.55;
            n.vx += (dx / dist) * strength;
            n.vy += (dy / dist) * strength;
          }
        }

        n.vx += (Math.random() - 0.5) * 0.025;
        n.vy += (Math.random() - 0.5) * 0.025;
        n.vx *= 0.94;
        n.vy *= 0.94;
        n.x += n.vx;
        n.y += n.vy;
      }

      function spawnAlpha(n: Node) {
        const t = elapsed - n.spawnDelay;
        return t < 0 ? 0 : Math.min(t / 500, 1);
      }

      // Connections
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const aA = spawnAlpha(a);
        if (aA < 0.01) continue;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const bA = spawnAlpha(b);
          if (bA < 0.01) continue;
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > CONNECT_DIST) continue;
          const edgeFade = 1 - dist / CONNECT_DIST;
          let alpha = edgeFade * 0.12 * Math.min(aA, bA);
          if (mouseActive) {
            const emx = (a.x + b.x) / 2 - mx;
            const emy = (a.y + b.y) / 2 - my;
            const eDist = Math.sqrt(emx * emx + emy * emy);
            if (eDist < MOUSE_RADIUS) {
              alpha += (1 - eDist / MOUSE_RADIUS) * 0.13 * edgeFade;
            }
          }
          ctx.strokeStyle = "rgba(30,82,243," + alpha + ")";
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Particles
      for (const n of nodes) {
        const a = spawnAlpha(n);
        if (a < 0.01) continue;
        const pulse = 1 + 0.12 * Math.sin(elapsed * 0.0015 + n.phase);
        let r = n.radius * pulse;
        let brightness = 0.35;
        if (mouseActive) {
          const dx = n.x - mx, dy = n.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS) {
            const prox = 1 - dist / MOUSE_RADIUS;
            brightness += prox * 0.4;
            r += prox * 1.4;
          }
        }
        ctx.fillStyle = "rgba(30,82,243," + (brightness * a) + ")";
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Symbols
      ctx.font = '12px "JetBrains Mono", monospace';
      for (const s of symbols) {
        const a = spawnAlpha(s.node);
        if (a < 0.01) continue;
        let symAlpha = 0.1 * a;
        if (mouseActive) {
          const dx = s.node.x - mx, dy = s.node.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            symAlpha += (1 - dist / 200) * 0.35 * a;
          }
        }
        ctx.fillStyle = "rgba(30,82,243," + symAlpha + ")";
        ctx.fillText(s.text, s.node.x + s.node.radius + 8, s.node.y + 4);
      }

      requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);

    return () => {
      animatingRef.current = false;
      window.removeEventListener("resize", resize);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [visible, exit]);

  // Mouse tracking
  useEffect(() => {
    if (!visible) return;
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const onLeave = () => { mouseRef.current.active = false; };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") exit(); };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("keydown", onKey);
    };
  }, [visible, exit]);

  if (!visible) return null;

  return (
    <div
      className={`hero-intro${exiting ? " hero-intro-exit" : ""}`}
      onClick={exit}
    >
      <canvas ref={canvasRef} className="hero-intro-canvas" />
      <div className="hero-intro-content">
        <h1 className={`hero-intro-name${nameVisible ? " visible" : ""}`}>
          Abhi Wadhwa
        </h1>
        <p className={`hero-intro-sub${subVisible ? " visible" : ""}`}>
          Applied Mathematics &middot; Game Theory &middot; Optimization
        </p>
      </div>
      <span className={`hero-intro-skip${skipVisible ? " visible" : ""}`}>
        click anywhere to skip
      </span>
    </div>
  );
}
