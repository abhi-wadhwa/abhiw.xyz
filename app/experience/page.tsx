"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import { experiences } from "@/data/experience";

function ExperienceCard({
  exp,
  index,
  isOpen,
  anyOpen,
  onToggle,
}: {
  exp: (typeof experiences)[0];
  index: number;
  isOpen: boolean;
  anyOpen: boolean;
  onToggle: () => void;
}) {
  const dimmed = anyOpen && !isOpen;

  return (
    <Reveal delay={index * 0.1}>
      <div
        className={`exp-card ${isOpen ? "exp-card-open" : ""}`}
        style={{
          opacity: dimmed ? 0.3 : 1,
          transform: dimmed ? "scale(0.97)" : "scale(1)",
          filter: dimmed ? "blur(1px)" : "blur(0px)",
        }}
        onClick={onToggle}
      >
        <div className="exp-header">
          <div className={`exp-logo ${isOpen ? "exp-logo-lg" : ""}`}>
            <img src={exp.logo} alt={exp.company} loading="lazy" />
          </div>
          <div className="exp-header-info">
            <div className="exp-role">{exp.role}</div>
            <div className="exp-company">{exp.company}</div>
            <div className="exp-meta">
              {exp.location} &middot; {exp.dateRange}
            </div>
          </div>
          <div className={`exp-toggle ${isOpen ? "exp-toggle-open" : ""}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" className="exp-toggle-vert" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
        </div>

        {!isOpen && <p className="exp-summary">{exp.summary}</p>}

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="exp-body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="exp-body-inner">
                <div className="exp-section">
                  <h3 className="exp-section-title">About {exp.company}</h3>
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
      </div>
    </Reveal>
  );
}

export default function ExperiencePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="section-header">
        <div className="container">
          <TextReveal as="h1" className="section-title">
            Experience
          </TextReveal>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="exp-list">
            {experiences.map((exp, i) => (
              <ExperienceCard
                key={exp.company}
                exp={exp}
                index={i}
                isOpen={openIndex === i}
                anyOpen={openIndex !== null}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
