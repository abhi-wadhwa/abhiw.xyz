"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { courses, Course } from "@/data/courses";

type Filter = "all" | "math" | "cs" | "economics" | "finance" | "graduate" | "undergraduate";

const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Mathematics", value: "math" },
  { label: "CS / ML", value: "cs" },
  { label: "Economics", value: "economics" },
  { label: "Finance", value: "finance" },
  { label: "Graduate", value: "graduate" },
  { label: "Undergraduate", value: "undergraduate" },
];

function filterCourses(list: Course[], f: Filter): Course[] {
  if (f === "all") return list;
  if (f === "graduate" || f === "undergraduate") return list.filter((c) => c.level === f);
  return list.filter((c) => c.category === f);
}

export default function CoursesPage() {
  const [active, setActive] = useState<Filter>("all");
  const filtered = filterCourses(courses, active);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <Reveal>
            <h1 className="page-title">Coursework</h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="page-subtitle">
              {courses.filter((c) => c.level === "graduate").length} graduate
              and {courses.filter((c) => c.level === "undergraduate").length} undergraduate
              courses spanning pure mathematics, machine learning, economics,
              and quantitative finance.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <Reveal>
            <div className="filter-bar">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActive(f.value)}
                  className={`filter-pill ${active === f.value ? "active" : ""}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </Reveal>

          <motion.div layout className="course-grid">
            <AnimatePresence mode="popLayout">
              {filtered.map((course) => (
                <motion.div
                  key={course.code}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                  className={`course-card ${course.level === "graduate" ? "course-card-grad" : ""}`}
                >
                  <div className="course-top">
                    <span className="course-code">{course.code}</span>
                    {course.level === "graduate" && (
                      <span className="course-badge">Graduate</span>
                    )}
                  </div>
                  <div className="course-name">{course.name}</div>
                  <p className="course-desc">{course.description}</p>
                  <span className="course-semester">{course.semester}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
