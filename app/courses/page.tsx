"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import { courses, Course } from "@/data/courses";

const LANES: { key: string; label: string; color: string }[] = [
  { key: "math", label: "Mathematics", color: "#1e52f3" },
  { key: "cs", label: "CS / ML", color: "#7c3aed" },
  { key: "economics", label: "Economics", color: "#b45309" },
  { key: "finance", label: "Finance", color: "#059669" },
];

function sortCourses(list: Course[]): Course[] {
  return [...list].sort((a, b) => {
    if (a.level !== b.level) return a.level === "undergraduate" ? -1 : 1;
    return a.code.localeCompare(b.code);
  });
}

export default function CoursesPage() {
  const [selected, setSelected] = useState<Course | null>(null);

  const gradCount = courses.filter((c) => c.level === "graduate").length;
  const undergradCount = courses.filter((c) => c.level === "undergraduate").length;

  return (
    <>
      <div className="section-header">
        <div className="container">
          <TextReveal as="h1" className="section-title">
            Coursework
          </TextReveal>
          <Reveal delay={0.2}>
            <p className="section-desc">
              {gradCount} graduate + {undergradCount} undergraduate across four disciplines.
            </p>
          </Reveal>
          <Reveal delay={0.3} variant="scale">
            <div className="section-header-line" />
          </Reveal>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          {/* Legend */}
          <Reveal>
            <div className="tree-legend">
              <span className="tree-legend-item">
                <span className="tree-legend-dot" /> Undergraduate
              </span>
              <span className="tree-legend-item">
                <span className="tree-legend-dot tree-legend-dot-grad" /> Graduate
              </span>
            </div>
          </Reveal>

          {/* Lanes */}
          <div className="tree-map">
            {LANES.map((lane, li) => {
              const laneCourses = sortCourses(
                courses.filter((c) => c.category === lane.key)
              );
              if (laneCourses.length === 0) return null;

              return (
                <Reveal key={lane.key} delay={li * 0.1}>
                  <div className="tree-lane">
                    <div
                      className="tree-lane-label"
                      style={{ color: lane.color }}
                    >
                      {lane.label}
                    </div>
                    <div className="tree-track">
                      {/* The line */}
                      <div
                        className="tree-line"
                        style={{ background: lane.color }}
                      />
                      {/* Stations */}
                      <div className="tree-stations">
                        {laneCourses.map((c) => {
                          const isActive = selected?.code === c.code;
                          const isGrad = c.level === "graduate";
                          return (
                            <button
                              key={c.code}
                              className={`tree-station ${isActive ? "tree-station-active" : ""} ${isGrad ? "tree-station-grad" : ""}`}
                              style={{
                                "--station-color": lane.color,
                              } as React.CSSProperties}
                              onClick={() =>
                                setSelected(isActive ? null : c)
                              }
                            >
                              <span className="tree-dot" />
                              <span className="tree-station-name">
                                {c.name}
                              </span>
                              <span className="tree-station-code">
                                {c.code}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Detail panel */}
          <AnimatePresence>
            {selected && (
              <motion.div
                key={selected.code}
                className="tree-detail"
                initial={{ opacity: 0, y: 16, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="tree-detail-inner">
                  <div className="tree-detail-head">
                    <div>
                      <span className="tree-detail-code">{selected.code}</span>
                      {selected.level === "graduate" && (
                        <span className="tree-detail-grad">Graduate</span>
                      )}
                    </div>
                    <span className="tree-detail-sem">{selected.semester}</span>
                  </div>
                  <h3 className="tree-detail-name">{selected.name}</h3>
                  <p className="tree-detail-desc">{selected.description}</p>
                  {selected.textbook && (
                    <span className="tree-detail-book">
                      Textbook: {selected.textbook}
                    </span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </>
  );
}
