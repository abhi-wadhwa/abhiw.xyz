"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/layout/Section";
import GlassCard from "@/components/ui/GlassCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { personalData } from "@/data/personal";
import { ChevronDown } from "lucide-react";

function InterestCard({
  interest,
  delay,
}: {
  interest: { title: string; body: string; references: { title: string; author: string }[] };
  delay: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <GlassCard delay={delay} variant="interactive" onClick={() => setOpen(!open)}>
      <div className="flex items-center justify-between">
        <h4 className="text-[0.95rem] font-medium text-[#e8e8ed]">
          {interest.title}
        </h4>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={16} className="text-[#8b8b9e]" />
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-[0.85rem] text-[#8b8b9e] leading-[1.7] mt-4">
              {interest.body}
            </p>
            <div className="mt-3 flex flex-col gap-1">
              {interest.references.map((ref) => (
                <span
                  key={ref.title}
                  className="text-xs text-[#55556a] italic"
                >
                  {ref.title} — {ref.author}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}

export default function Personal() {
  const [philOpen, setPhilOpen] = useState(false);

  return (
    <Section id="personal" title="Personal">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10">
        {/* Left: Bio */}
        <ScrollReveal>
          <div className="flex flex-col gap-4">
            <h3
              className="text-lg text-[#e8e8ed]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              About
            </h3>
            {personalData.bio.map((paragraph, i) => (
              <p
                key={i}
                className="text-[0.9rem] text-[#8b8b9e] leading-[1.7]"
              >
                {paragraph}
              </p>
            ))}
            <p className="text-xs font-mono text-[#55556a] mt-2">
              Pronunciation: {personalData.pronunciation}
            </p>
            <p className="text-xs font-mono text-[#55556a]">
              {personalData.astrology}
            </p>
          </div>
        </ScrollReveal>

        {/* Right: Interest Cards */}
        <div className="flex flex-col gap-4">
          <h3
            className="text-lg text-[#e8e8ed]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Areas of Interest
          </h3>
          {personalData.interests.map((interest, i) => (
            <InterestCard
              key={interest.title}
              interest={interest}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="mt-16">
        <GlassCard variant="interactive" onClick={() => setPhilOpen(!philOpen)}>
          <div className="flex items-center justify-between">
            <h3
              className="text-lg text-[#e8e8ed]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Philosophical Takes
            </h3>
            <motion.div
              animate={{ rotate: philOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={18} className="text-[#8b8b9e]" />
            </motion.div>
          </div>

          <AnimatePresence>
            {philOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-6 flex flex-col gap-3">
                  {personalData.philosophy.map((item) => (
                    <div
                      key={item.topic}
                      className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-2 border-b border-[rgba(255,255,255,0.04)] last:border-0"
                    >
                      <span className="text-[0.9rem] font-medium text-[#e8e8ed] min-w-[140px]">
                        {item.topic}
                      </span>
                      <span className="text-[0.85rem] text-[#8b8b9e]">
                        {item.position}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      </div>
    </Section>
  );
}
