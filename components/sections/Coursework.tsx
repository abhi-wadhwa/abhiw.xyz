"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/layout/Section";
import { courses, Course } from "@/data/courses";

type Filter =
  | "all"
  | "math"
  | "cs"
  | "economics"
  | "finance"
  | "graduate"
  | "undergraduate";

const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Mathematics", value: "math" },
  { label: "CS / ML", value: "cs" },
  { label: "Economics", value: "economics" },
  { label: "Finance", value: "finance" },
  { label: "Graduate", value: "graduate" },
  { label: "Undergraduate", value: "undergraduate" },
];

function filterCourses(list: Course[], filter: Filter): Course[] {
  if (filter === "all") return list;
  if (filter === "graduate" || filter === "undergraduate") {
    return list.filter((c) => c.level === filter);
  }
  return list.filter((c) => c.category === filter);
}

export default function Coursework() {
  const [active, setActive] = useState<Filter>("all");
  const filtered = filterCourses(courses, active);

  return (
    <Section id="courses" num="05" title="Coursework">
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
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
    </Section>
  );
}
