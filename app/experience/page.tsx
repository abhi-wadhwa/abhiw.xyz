"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import { experiences } from "@/data/experience";

function ExperienceCard({
  exp,
  index,
  isOpen,
  onToggle,
}: {
  exp: (typeof experiences)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <Reveal delay={index * 0.1}>
      <motion.div
        layout
        className={`exp-card ${isOpen ? "exp-card-open" : ""}`}
        onClick={onToggle}
        transition={{ layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
      >
        {/* Header */}
        <motion.div layout="position" className="exp-header">
          <motion.div
            className="exp-logo"
            animate={{
              width: isOpen ? 88 : 56,
              height: isOpen ? 88 : 56,
              borderRadius: isOpen ? 20 : 14,
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={exp.logo} alt={exp.company} loading="lazy" />
          </motion.div>
          <div className="exp-header-info">
            <motion.div
              className="exp-role"
              animate={{ fontSize: isOpen ? 28 : 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {exp.role}
            </motion.div>
            <motion.div
              className="exp-company"
              animate={{ fontSize: isOpen ? 18 : 15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {exp.company}
            </motion.div>
            <div className="exp-meta">
              {exp.location} &middot; {exp.dateRange}
            </div>
          </div>
          <div className={`exp-toggle ${isOpen ? "exp-toggle-open" : ""}`}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line
                x1="12"
                y1="5"
                x2="12"
                y2="19"
                className="exp-toggle-vert"
              />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
        </motion.div>

        {/* Summary — only when collapsed */}
        <AnimatePresence>
          {!isOpen && (
            <motion.p
              className="exp-summary"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {exp.summary}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Expanded content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="exp-body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="exp-body-inner">
                <div className="exp-section">
                  <h3 className="exp-section-title">
                    About {exp.company}
                  </h3>
                  <p className="exp-section-text">{exp.companyDesc}</p>
                </div>
                <div className="exp-section">
                  <h3 className="exp-section-title">What I Did</h3>
                  <p className="exp-section-text">{exp.narrative}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Reveal>
  );
}

export default function ExperiencePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="exp-page-header">
        <div className="container">
          <TextReveal as="h1" className="page-title">
            Experience
          </TextReveal>
          <Reveal delay={0.2}>
            <p className="page-subtitle">
              From quantitative trading to machine learning research — building
              at the intersection of mathematics and markets.
            </p>
          </Reveal>
          <Reveal delay={0.3} variant="scale">
            <span className="page-header-line" />
          </Reveal>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <LayoutGroup>
            <div className="exp-list">
              {experiences.map((exp, i) => (
                <ExperienceCard
                  key={exp.company}
                  exp={exp}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={() =>
                    setOpenIndex(openIndex === i ? null : i)
                  }
                />
              ))}
            </div>
          </LayoutGroup>
        </div>
      </div>

      <Footer />
    </>
  );
}
