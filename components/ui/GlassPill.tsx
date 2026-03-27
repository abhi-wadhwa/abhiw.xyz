"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassPillProps {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function GlassPill({
  children,
  active = false,
  onClick,
  className = "",
}: GlassPillProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative px-4 py-1.5 rounded-full text-sm font-mono
        border transition-all duration-300 ease-out
        ${
          active
            ? "bg-[rgba(110,142,251,0.15)] border-[rgba(110,142,251,0.3)] text-[#6e8efb] shadow-[0_0_20px_rgba(110,142,251,0.15)]"
            : "bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.08)] text-[#8b8b9e] hover:bg-[rgba(255,255,255,0.08)] hover:text-[#e8e8ed]"
        }
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}
