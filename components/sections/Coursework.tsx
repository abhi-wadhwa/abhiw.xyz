"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/layout/Section";
import GlassPill from "@/components/ui/GlassPill";
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

function filterCourses(courses: Course[], filter: Filter): Course[] {
  if (filter === "all") return courses;
  if (filter === "graduate" || filter === "undergraduate") {
    return courses.filter((c) => c.level === filter);
  }
  return courses.filter((c) => c.category === filter);
}

function CourseCard({ course, index }: { course: Course; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      onClick={() => setExpanded(!expanded)}
      className="cursor-pointer rounded-[14px] p-5
        bg-[rgba(255,255,255,0.04)]
        border border-[rgba(255,255,255,0.08)]
        backdrop-blur-[20px] backdrop-saturate-[180%]
        shadow-[0_4px_16px_rgba(0,0,0,0.2)]
        hover:border-[rgba(255,255,255,0.15)]
        hover:-translate-y-1
        transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className="text-xs font-mono text-[#8b8b9e]">{course.code}</span>
        {course.level === "graduate" && (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[rgba(110,142,251,0.3)] text-[#6e8efb] bg-[rgba(110,142,251,0.08)]">
            Graduate
          </span>
        )}
      </div>

      <h4 className="text-[0.95rem] font-medium text-[#e8e8ed] mb-1">
        {course.name}
      </h4>

      <p className="text-[0.8rem] text-[#8b8b9e] leading-[1.5] line-clamp-2">
        {course.description}
      </p>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-[0.8rem] text-[#8b8b9e] leading-[1.5] mt-2">
              {course.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap gap-2 mt-3">
        {course.textbook && (
          <span className="text-[0.7rem] font-mono italic text-[#55556a]">
            {course.textbook}
          </span>
        )}
        <span className="text-[0.7rem] font-mono text-[#55556a] ml-auto">
          {course.semester}
        </span>
      </div>
    </motion.div>
  );
}

export default function Coursework() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const filtered = filterCourses(courses, activeFilter);

  return (
    <Section id="courses" title="Coursework">
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 mb-10">
        {filters.map((f) => (
          <GlassPill
            key={f.value}
            active={activeFilter === f.value}
            onClick={() => setActiveFilter(f.value)}
          >
            {f.label}
          </GlassPill>
        ))}
      </div>

      {/* Course Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((course, i) => (
            <CourseCard key={course.code} course={course} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
