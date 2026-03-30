"use client";

import { useRef, ReactNode, CSSProperties } from "react";
import { motion, useInView, type TargetAndTransition } from "framer-motion";

type Variant = "fade" | "scale" | "blur" | "slide";
type Direction = "up" | "down" | "left" | "right";

interface RevealProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  direction?: Direction;
  variant?: Variant;
  duration?: number;
  once?: boolean;
}

interface MotionState {
  opacity: number;
  x?: number;
  y?: number;
  scale?: number;
  filter?: string;
}

function getInitial(variant: Variant, direction: Direction): MotionState {
  const offsets: Record<Direction, { x?: number; y?: number }> = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: -50 },
    right: { x: 50 },
  };

  switch (variant) {
    case "scale":
      return { opacity: 0, scale: 0.9, filter: "blur(6px)" };
    case "blur":
      return { opacity: 0, filter: "blur(10px)", y: 10 };
    case "slide":
      return { opacity: 0, ...offsets[direction] };
    default:
      return { opacity: 0, ...offsets[direction] };
  }
}

const animate = { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" };

export default function Reveal({
  children,
  className,
  style,
  delay = 0,
  direction = "up",
  variant = "fade",
  duration = 0.7,
  once = true,
}: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px 0px" });
  const initial = getInitial(variant, direction);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={initial as TargetAndTransition}
      animate={(isInView ? animate : initial) as TargetAndTransition}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
