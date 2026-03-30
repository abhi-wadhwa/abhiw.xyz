"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import { awards } from "@/data/awards";

type Category = "all" | "mathematics" | "debate" | "scholarships";

const CATEGORY_META: Record<string, { color: string; label: string }> = {
  mathematics: { color: "#1e52f3", label: "Mathematics" },
  debate: { color: "#7c3aed", label: "Debate" },
  scholarships: { color: "#059669", label: "Scholarships" },
};

interface FlatAward {
  title: string;
  organization: string;
  year?: string;
  featured?: boolean;
  category: string;
}

function flatten(): FlatAward[] {
  const all: FlatAward[] = [];
  // Featured first
  for (const a of awards.mathematics) if (a.featured) all.push({ ...a, category: "mathematics" });
  for (const a of awards.scholarships) if (a.featured) all.push({ ...a, category: "scholarships" });
  // Then rest by category
  for (const a of awards.debate.collegiate) all.push({ ...a, category: "debate" });
  for (const a of awards.debate.highSchool) all.push({ ...a, category: "debate" });
  for (const a of awards.mathematics) if (!a.featured) all.push({ ...a, category: "mathematics" });
  for (const a of awards.scholarships) if (!a.featured) all.push({ ...a, category: "scholarships" });
  return all;
}

const ALL_AWARDS = flatten();

const FILTERS: { label: string; value: Category }[] = [
  { label: "All", value: "all" },
  { label: "Mathematics", value: "mathematics" },
  { label: "Debate", value: "debate" },
  { label: "Scholarships", value: "scholarships" },
];

export default function AwardsPage() {
  const [filter, setFilter] = useState<Category>("all");

  const filtered = filter === "all"
    ? ALL_AWARDS
    : ALL_AWARDS.filter((a) => a.category === filter);

  return (
    <>
      <div className="section-header">
        <div className="container">
          <TextReveal as="h1" className="section-title">
            Awards
          </TextReveal>
          <Reveal delay={0.2}>
            <p className="section-desc">
              {ALL_AWARDS.length} honors across competition mathematics, parliamentary debate, and academics.
            </p>
          </Reveal>
          <Reveal delay={0.3} variant="scale">
            <div className="section-header-line" />
          </Reveal>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          {/* Category filters */}
          <Reveal>
            <div className="aw-filters">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  className={`aw-filter ${filter === f.value ? "aw-filter-active" : ""}`}
                  onClick={() => setFilter(f.value)}
                  style={
                    filter === f.value && f.value !== "all"
                      ? { color: CATEGORY_META[f.value]?.color }
                      : {}
                  }
                >
                  {f.label}
                  {f.value !== "all" && (
                    <span className="aw-filter-count">
                      {ALL_AWARDS.filter((a) => a.category === f.value).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Numbered list */}
          <div className="aw-list">
            <AnimatePresence mode="popLayout">
              {filtered.map((award, i) => {
                const meta = CATEGORY_META[award.category];
                return (
                  <motion.div
                    key={award.title}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{
                      duration: 0.35,
                      delay: i * 0.03,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`aw-entry ${award.featured ? "aw-entry-featured" : ""}`}
                  >
                    <span
                      className="aw-num"
                      style={{ color: meta.color }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="aw-info">
                      <div className="aw-title">{award.title}</div>
                      <div className="aw-org">{award.organization}</div>
                    </div>
                    <div className="aw-right">
                      <span
                        className="aw-cat"
                        style={{ color: meta.color }}
                      >
                        {meta.label}
                      </span>
                      {award.year && <span className="aw-year">{award.year}</span>}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
