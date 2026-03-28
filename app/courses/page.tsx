"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
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
          <h1 className="page-title">Coursework</h1>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
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

          <motion.div layout className="course-grid">
            <AnimatePresence mode="popLayout">
              {filtered.map((course) => (
                <motion.div
                  key={course.code}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="course-card"
                >
                  <div className="course-top">
                    <span className="course-code">{course.code}</span>
                    {course.level === "graduate" && (
                      <span className="course-badge">Grad</span>
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
