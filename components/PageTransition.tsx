"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";

const SYMBOLS = [
  "∑", "∫", "∇", "λ", "π", "σ²", "Δ", "∞", "∂", "ℝ",
  "∈", "⊂", "∀", "∃", "⟨·⟩", "≈", "⊗", "→", "⇒", "∝",
  "ℂ", "ℤ", "∅", "⊕", "≡", "∧", "∨", "¬", "μ", "ε",
  "θ", "Ω", "φ", "ψ", "α", "β", "γ", "δ", "ζ", "η",
];

function generateGrid() {
  const cols = 14;
  const rows = 8;
  const cells = [];
  for (let i = 0; i < cols * rows; i++) {
    cells.push({
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      delay: Math.random() * 0.35,
      duration: 0.3 + Math.random() * 0.2,
    });
  }
  return { cells, cols, rows };
}

export default function PageTransition() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [grid, setGrid] = useState(() => generateGrid());
  const prevPath = useRef(pathname);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      prevPath.current = pathname;
      return;
    }

    if (prevPath.current !== pathname) {
      prevPath.current = pathname;
      setGrid(generateGrid());
      setActive(true);
      const timer = setTimeout(() => setActive(false), 700);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  if (!active) return null;

  return (
    <div className="ptr" key={pathname}>
      <div className="ptr-bg">
        <div
          className="ptr-grid"
          style={{
            gridTemplateColumns: `repeat(${grid.cols}, 1fr)`,
            gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
          }}
        >
          {grid.cells.map((cell, i) => (
            <span
              key={i}
              className="ptr-cell"
              style={{
                animationDelay: `${cell.delay * 0.6}s`,
                animationDuration: `${cell.duration * 0.7}s`,
              }}
            >
              {cell.symbol}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
