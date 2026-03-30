"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import TextReveal from "@/components/TextReveal";
import Reveal from "@/components/Reveal";
import { projects } from "@/data/projects";

const FLICKER_COUNT = 5;
const FLICKER_SPEED = 60;
const AUTO_ADVANCE = 5000;

const CATEGORY_COLORS: Record<string, string> = {
  Finance: "#1e52f3",
  "Economics & Mechanism Design": "#b45309",
  "Game Theory & AI": "#7c3aed",
  Debate: "#059669",
};

export default function ProjectsPage() {
  const [index, setIndex] = useState(0);
  const [flickering, setFlickering] = useState(false);
  const [flickerName, setFlickerName] = useState("");
  const [paused, setPaused] = useState(false);
  const targetRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const current = projects[index];

  const flickerTo = useCallback(
    (target: number) => {
      if (flickering) return;
      targetRef.current = target;
      setFlickering(true);
      let count = 0;
      const interval = setInterval(() => {
        setFlickerName(projects[Math.floor(Math.random() * projects.length)].name);
        count++;
        if (count >= FLICKER_COUNT) {
          clearInterval(interval);
          setFlickerName("");
          setIndex(target);
          setFlickering(false);
        }
      }, FLICKER_SPEED);
    },
    [flickering]
  );

  const next = useCallback(() => {
    flickerTo((index + 1) % projects.length);
  }, [index, flickerTo]);

  const prev = useCallback(() => {
    flickerTo((index - 1 + projects.length) % projects.length);
  }, [index, flickerTo]);

  // Auto-advance
  useEffect(() => {
    if (paused || flickering) return;
    timerRef.current = setTimeout(next, AUTO_ADVANCE);
    return () => clearTimeout(timerRef.current);
  }, [index, paused, flickering, next]);

  // Arrow key navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <>
      <div className="section-header">
        <div className="container">
          <TextReveal as="h1" className="section-title">
            Projects
          </TextReveal>
          <Reveal delay={0.2}>
            <p className="section-desc">
              some finance stuff, some econ stuff, some ml stuff
            </p>
          </Reveal>
          <Reveal delay={0.3} variant="scale">
            <div className="section-header-line" />
          </Reveal>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div
            className="proj-stage"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Left arrow */}
            <button className="proj-arrow proj-arrow-left" onClick={prev} aria-label="Previous project">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Right arrow */}
            <button className="proj-arrow proj-arrow-right" onClick={next} aria-label="Next project">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Counter */}
            <div className="proj-counter">
              <span className="proj-counter-current">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="proj-counter-sep">/</span>
              <span className="proj-counter-total">
                {String(projects.length).padStart(2, "0")}
              </span>
            </div>

            {/* Content */}
            <div className="proj-content">
              <AnimatePresence mode="wait">
                {flickering ? (
                  <motion.div
                    key="flicker"
                    className="proj-flicker"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.05 }}
                  >
                    <h2 className="proj-name proj-name-flicker">{flickerName || current.name}</h2>
                  </motion.div>
                ) : (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="proj-category-row">
                      <span
                        className="proj-category"
                        style={{ color: CATEGORY_COLORS[current.category] }}
                      >
                        {current.category}
                      </span>
                      <span className="proj-lang">{current.lang}</span>
                    </div>
                    <h2 className="proj-name">{current.name}</h2>
                    <p className="proj-desc">{current.desc}</p>
                    {current.private ? (
                      <span className="proj-private">Private Repository</span>
                    ) : (
                      <a
                        href={`https://github.com/abhi-wadhwa/${current.repo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="proj-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View on GitHub &rarr;
                      </a>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Progress dots */}
            <div className="proj-dots">
              {projects.map((_, i) => (
                <button
                  key={i}
                  className={`proj-dot ${i === index ? "proj-dot-active" : ""}`}
                  onClick={() => flickerTo(i)}
                  aria-label={`Project ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
