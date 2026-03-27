"use client";

import { ReactNode } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlassDivider from "@/components/ui/GlassDivider";

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ id, title, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative py-[clamp(80px,12vh,160px)] px-6 ${className}`}
    >
      <div className="max-w-[1200px] mx-auto">
        <ScrollReveal>
          <h2
            className="text-[clamp(1.5rem,3vw,2.5rem)] font-normal tracking-tight text-[#e8e8ed] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h2>
          <GlassDivider className="mb-12" />
        </ScrollReveal>
        {children}
      </div>
    </section>
  );
}
