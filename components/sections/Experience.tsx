"use client";

import Image from "next/image";
import Section from "@/components/layout/Section";
import GlassCard from "@/components/ui/GlassCard";
import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="flex flex-col gap-6">
        {experiences.map((exp, i) => (
          <GlassCard key={exp.company} delay={i * 0.1} glow variant="interactive">
            <div className="flex gap-5">
              {/* Logo */}
              <div className="flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-white/90 flex items-center justify-center shadow-sm border border-[rgba(255,255,255,0.1)]">
                <Image
                  src={exp.logo}
                  alt={exp.company}
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
                      {exp.company}
                    </h3>
                    <p className="text-[#8b8b9e] text-sm">{exp.role}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-md text-xs font-mono text-[#55556a] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]">
                      {exp.location}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#55556a] whitespace-nowrap pt-1">
                    {exp.dateRange}
                  </span>
                </div>

                <ul className="mt-4 flex flex-col gap-2">
                  {exp.bullets.map((bullet, j) => (
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
