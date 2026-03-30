"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const SYMBOLS = ["∑", "∫", "∇", "λ", "π", "σ²", "Δ", "∞", "∂", "ℝ"];

export default function PageTransition() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [symbol, setSymbol] = useState("∑");
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
      setSymbol(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
      setActive(true);
      const timer = setTimeout(() => setActive(false), 900);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  if (!active) return null;

  return (
    <div className="ptr" key={pathname}>
      <div className="ptr-bg" />
      <span className="ptr-symbol">{symbol}</span>
    </div>
  );
}
