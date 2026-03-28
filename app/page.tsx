"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Experience from "@/components/sections/Experience";
import Research from "@/components/sections/Research";
import Awards from "@/components/sections/Awards";
import Coursework from "@/components/sections/Coursework";
import Personal from "@/components/sections/Personal";

const sections = [
  { id: "about", label: "About", num: "01" },
  { id: "experience", label: "Experience", num: "02" },
  { id: "research", label: "Research", num: "03" },
  { id: "awards", label: "Awards", num: "04" },
  { id: "courses", label: "Coursework", num: "05" },
  { id: "personal", label: "Personal", num: "06" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");

  // Track active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px" }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll-triggered reveal animations
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid-frame">
      <Sidebar sections={sections} activeSection={activeSection} />
      <main className="col-right">
        <section id="about" className="section">
          <p className="intro-text">
            I study Applied Mathematics at USC on scholarship. I work on how
            utility theory and optimization methods enable multi-agent systems
            to model incentives involving uncertainty and competition — with
            applications to market and auction design.
          </p>
        </section>

        <Experience />
        <Research />
        <Awards />
        <Coursework />
        <Personal />

        <footer className="site-footer">
          <p className="footer-text">&copy; 2026 Abhi Wadhwa</p>
        </footer>
      </main>
    </div>
  );
}
