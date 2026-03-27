"use client";

import Section from "@/components/layout/Section";
import GlassCard from "@/components/ui/GlassCard";
import GlassDivider from "@/components/ui/GlassDivider";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { awards } from "@/data/awards";

function AwardList({
  items,
  title,
  delay = 0,
}: {
  items: { title: string; organization: string; year?: string }[];
  title?: string;
  delay?: number;
}) {
  return (
    <div>
      {title && (
        <h4 className="text-xs font-mono uppercase tracking-wider text-[#55556a] mb-4">
          {title}
        </h4>
      )}
      <div className="flex flex-col gap-2">
        {items.map((award, i) => (
          <ScrollReveal key={award.title} delay={delay + i * 0.05}>
            <div className="flex items-baseline justify-between gap-4 py-2 border-b border-[rgba(255,255,255,0.04)] last:border-0">
              <div>
                <span className="text-[0.95rem] font-medium text-[#e8e8ed]">
                  {award.title}
                </span>
                <span className="text-[0.85rem] text-[#8b8b9e] ml-3">
                  {award.organization}
                </span>
              </div>
              {award.year && (
                <span className="text-xs font-mono text-[#55556a] whitespace-nowrap">
                  {award.year}
                </span>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

export default function Awards() {
  return (
    <Section id="awards" title="Awards & Honors">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8">
        {/* Debate Column */}
        <GlassCard delay={0}>
          <h3
            className="text-xl font-normal text-[#e8e8ed] mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Debate
          </h3>
          <AwardList
            items={awards.debate.collegiate}
            title="Collegiate (USC)"
            delay={0.1}
          />
          <div className="mt-6">
            <AwardList
              items={awards.debate.highSchool}
              title="High School & International"
              delay={0.2}
            />
          </div>
        </GlassCard>

        {/* Vertical Divider - hidden on mobile */}
        <div className="hidden lg:flex items-center">
          <GlassDivider orientation="vertical" />
        </div>

        {/* Math + Scholarships Column */}
        <div className="flex flex-col gap-6">
          <GlassCard delay={0.1}>
            <h3
              className="text-xl font-normal text-[#e8e8ed] mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Mathematics
            </h3>
            <AwardList items={awards.mathematics} delay={0.15} />
          </GlassCard>

          <GlassCard delay={0.2}>
            <h3
              className="text-xl font-normal text-[#e8e8ed] mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Scholarships
            </h3>
            <AwardList items={awards.scholarships} delay={0.25} />
          </GlassCard>
        </div>
      </div>
    </Section>
  );
}
