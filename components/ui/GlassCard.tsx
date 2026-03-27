"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  variant?: "default" | "elevated" | "interactive" | "highlight";
  glow?: boolean;
  delay?: number;
  className?: string;
  accentBorder?: string;
  onClick?: () => void;
}

const variantStyles = {
  default: "",
  elevated: "shadow-[0_12px_40px_rgba(0,0,0,0.3)]",
  interactive: "cursor-pointer",
  highlight: "border-[rgba(110,142,251,0.2)]",
};

export default function GlassCard({
  children,
  variant = "default",
  glow = false,
  delay = 0,
  className = "",
  accentBorder,
  onClick,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={
        variant === "interactive" || glow
          ? {
              y: -4,
              transition: { duration: 0.3 },
            }
          : undefined
      }
      onClick={onClick}
      className={`
        relative rounded-[20px] p-6
        bg-[rgba(255,255,255,0.04)]
        border border-[rgba(255,255,255,0.08)]
        shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(255,255,255,0.05)]
        backdrop-blur-[20px] backdrop-saturate-[180%]
        transition-all duration-300 ease-out
        hover:border-[rgba(255,255,255,0.15)]
        ${glow ? "hover:shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.1),0_0_30px_rgba(110,142,251,0.15)]" : ""}
        ${variantStyles[variant]}
        ${className}
      `}
      style={accentBorder ? { borderLeft: `3px solid ${accentBorder}` } : undefined}
    >
      {children}
    </motion.div>
  );
}
