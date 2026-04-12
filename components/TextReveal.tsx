"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function TextReveal({
  children,
  className,
  delay = 0,
  as: Tag = "span",
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });
  const words = children.split(" ");

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            overflow: "hidden",
            display: "inline-block",
            marginRight: "0.25em",
          }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", rotateX: 40 }}
            animate={
              isInView
                ? { y: 0, rotateX: 0 }
                : { y: "110%", rotateX: 40 }
            }
            transition={{
              duration: 0.55,
              delay: delay + i * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
