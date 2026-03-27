"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import LiquidBlob from "./LiquidBlob";

export default function BackgroundCanvas() {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (!mounted || reducedMotion || isMobile) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        dpr={Math.min(window.devicePixelRatio, 2)}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        }}
        frameloop="always"
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <LiquidBlob />
        </Suspense>
      </Canvas>
    </div>
  );
}
