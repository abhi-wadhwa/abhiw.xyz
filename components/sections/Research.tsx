"use client";

import Image from "next/image";
import Section from "@/components/layout/Section";
import GlassCard from "@/components/ui/GlassCard";
import { research } from "@/data/research";

export default function Research() {
  return (
    <Section id="research" title="Research">
      <div className="flex flex-col gap-6">
        {research.map((item, i) => (
          <GlassCard
            key={`${item.institution}-${item.advisor}`}
            delay={i * 0.1}
            glow
            accentBorder={item.accentColor}
          >
            <div className="flex gap-5">
              {/* Logo */}
              <div className="flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-white/90 flex items-center justify-center shadow-sm border border-[rgba(255,255,255,0.1)]">
                <Image
                  src={item.logo}
                  alt={item.institution}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h3 className="text-[1.1rem] font-medium text-[#e8e8ed]">
                      {item.institution} {item.department}
                    </h3>
                    <p className="text-[#8b8b9e] text-sm">{item.role}</p>
                    <p className="text-[#8b8b9e] text-sm italic">
                      Advisor: {item.advisor}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#55556a] whitespace-nowrap pt-1">
                    {item.year}
                  </span>
                </div>

                <ul className="mt-4 flex flex-col gap-2">
                  {item.bullets.map((bullet, j) => (
                    <li
                      key={j}
                      className="text-[0.9rem] text-[#8b8b9e] leading-[1.6] pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-[#55556a]"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
