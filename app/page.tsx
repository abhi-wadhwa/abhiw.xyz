"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useCallback } from "react";
import Navigation from "@/components/layout/Navigation";
import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import Research from "@/components/sections/Research";
import Awards from "@/components/sections/Awards";
import Coursework from "@/components/sections/Coursework";
import Personal from "@/components/sections/Personal";
import Footer from "@/components/layout/Footer";

const BackgroundCanvas = dynamic(
  () => import("@/components/three/BackgroundCanvas"),
  { ssr: false }
);

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    setMousePos({ x, y });
  }, []);

  // Konami code easter egg
  useEffect(() => {
    const code = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
      "KeyB", "KeyA",
    ];
    let index = 0;

    const handleKey = (e: KeyboardEvent) => {
      if (e.code === code[index]) {
        index++;
        if (index === code.length) {
          index = 0;
          // Rainbow flash
          document.body.style.transition = "filter 0.3s ease";
          document.body.style.filter = "hue-rotate(360deg) saturate(2)";
          // Toast
          const toast = document.createElement("div");
          toast.textContent = "You found it. Hire me?";
          toast.style.cssText = `
            position: fixed; bottom: 40px; left: 50%; transform: translateX(-50%);
            padding: 12px 24px; border-radius: 12px; z-index: 9999;
            background: rgba(110,142,251,0.2); backdrop-filter: blur(20px);
            border: 1px solid rgba(110,142,251,0.3); color: #e8e8ed;
            font-family: var(--font-mono); font-size: 14px;
            animation: fadeInUp 0.3s ease;
          `;
          document.body.appendChild(toast);
          setTimeout(() => {
            document.body.style.filter = "none";
            toast.style.opacity = "0";
            toast.style.transition = "opacity 0.5s ease";
            setTimeout(() => toast.remove(), 500);
          }, 2000);
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener("keydown", handleKey);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <>
      {/* Animated void background */}
      <div className="bg-void-animated" />

      {/* Ambient cursor light */}
      <div
        className="ambient-light"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}% ${mousePos.y}%, rgba(110, 142, 251, 0.03), transparent)`,
        }}
      />

      {/* Three.js background */}
      <BackgroundCanvas />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="relative z-10">
        <Hero />
        <Experience />
        <Research />
        <Awards />
        <Coursework />
        <Personal />
        <Footer />
      </main>
    </>
  );
}
