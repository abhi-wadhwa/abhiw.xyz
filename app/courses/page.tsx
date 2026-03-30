"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import { courses, Course } from "@/data/courses";

type Filter = "all" | "math" | "cs" | "economics" | "finance";

const FILTERS: { label: string; value: Filter; color: string }[] = [
  { label: "All", value: "all", color: "var(--text-primary)" },
  { label: "Mathematics", value: "math", color: "#1e52f3" },
  { label: "CS / ML", value: "cs", color: "#7c3aed" },
  { label: "Economics", value: "economics", color: "#b45309" },
  { label: "Finance", value: "finance", color: "#059669" },
];

const CAT_COLORS: Record<string, string> = {
  math: "#1e52f3",
  cs: "#7c3aed",
  economics: "#b45309",
  finance: "#059669",
};

function filterCourses(list: Course[], f: Filter): Course[] {
  if (f === "all") return list;
  return list.filter((c) => c.category === f);
}

export default function CoursesPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [openCode, setOpenCode] = useState<string | null>(null);
  const filtered = filterCourses(courses, filter);

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
          <Reveal>
            <div className="crs-filters">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  className={`aw-filter ${filter === f.value ? "aw-filter-active" : ""}`}
                  onClick={() => { setFilter(f.value); setOpenCode(null); }}
                  style={filter === f.value && f.value !== "all" ? { color: f.color } : {}}
                >
                  {f.label}
                  {f.value !== "all" && (
                    <span className="aw-filter-count">
                      {courses.filter((c) => c.category === f.value).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="crs-grid">
            <AnimatePresence mode="popLayout">
              {filtered.map((course, i) => {
                const isOpen = openCode === course.code;
                const color = CAT_COLORS[course.category];
                return (
                  <motion.div
                    key={course.code}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: i * 0.02, ease: [0.16, 1, 0.3, 1] }}
                    className={`crs-tile ${isOpen ? "crs-tile-open" : ""} ${course.level === "graduate" ? "crs-tile-grad" : ""}`}
                    style={{ "--crs-accent": color } as React.CSSProperties}
                    onClick={() => setOpenCode(isOpen ? null : course.code)}
                  >
                    <div className="crs-tile-head">
                      <span className="crs-code">{course.code}</span>
                      {course.level === "graduate" && (
                        <span className="crs-grad-badge">GRAD</span>
                      )}
                    </div>
                    <div className="crs-name">{course.name}</div>
                    <div className="crs-semester">{course.semester}</div>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          className="crs-expand"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <p className="crs-desc">{course.description}</p>
                          {course.textbook && (
                            <span className="crs-textbook">Textbook: {course.textbook}</span>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
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
