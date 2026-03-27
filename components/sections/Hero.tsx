"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedText from "@/components/ui/AnimatedText";
import { ChevronDown } from "lucide-react";

const currentChips = [
  { label: "Optiver '26", active: true },
  { label: "Random Matrix Theory", active: true },
  { label: "USC Applied Math", active: true },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 md:grid-cols-[55%_45%] gap-12 items-center">
        {/* Left: Text */}
        <div className="flex flex-col gap-6 z-10">
          <div>
            <motion.h1
              className="text-[clamp(3rem,6vw,5.5rem)] font-light tracking-[-0.03em] text-[#e8e8ed] leading-[1.1]"
              style={{ fontFamily: "var(--font-display)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <AnimatedText text="Abhi Wadhwa" delay={0.3} staggerDelay={0.04} />
            </motion.h1>

            {/* Animated gradient underline */}
            <motion.div
              className="h-[2px] mt-2 rounded-full"
              style={{
                background: "linear-gradient(90deg, #6e8efb, #a78bfa, #fb7185, #6e8efb)",
                backgroundSize: "200% 100%",
              }}
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col gap-1"
          >
            <p className="text-[#8b8b9e] text-lg">
              Applied Mathematics · USC
            </p>
            <p className="text-[#55556a] text-base">
              Game Theory · Optimization · Market Design
            </p>
          </motion.div>

          <motion.p
            className="text-[#8b8b9e] text-[0.95rem] leading-[1.7] max-w-[520px]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            I study Applied Mathematics at USC on scholarship. I work on how
            utility theory and optimization methods enable multi-agent systems
            to model incentives involving uncertainty and competition — with
            applications to market and auction design.
          </motion.p>

          {/* Currently chips */}
          <motion.div
            className="flex flex-wrap gap-3 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            {currentChips.map((chip, i) => (
              <motion.div
                key={chip.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + i * 0.1 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full
                  bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)]
                  text-[#8b8b9e] text-xs font-mono"
              >
                {chip.active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
                )}
                {chip.label}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right: Photo */}
        <motion.div
          className="relative flex justify-center md:justify-end z-10"
          initial={{ opacity: 0, x: 40, rotate: 2 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-[24px] overflow-hidden prismatic-border">
            <div className="absolute inset-0 rounded-[24px] overflow-hidden
              bg-[rgba(255,255,255,0.04)] backdrop-blur-[20px]
              border border-[rgba(255,255,255,0.1)]
              shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-2">
              <Image
                src="/assets/abhi.jpeg"
                alt="Abhi Wadhwa"
                fill
                className="object-cover rounded-[18px]"
                priority
                sizes="(max-width: 768px) 280px, 320px"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => {
          const el = document.getElementById("experience");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#55556a] z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 2, duration: 0.5 },
          y: { delay: 2, duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
        aria-label="Scroll down"
      >
        <ChevronDown size={24} />
      </motion.button>
    </section>
  );
}
