"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Footer from "@/components/Footer";
import TextReveal from "@/components/TextReveal";
import Reveal from "@/components/Reveal";
import { projects, type Project } from "@/data/projects";

const CATEGORIES = [
  "Finance",
  "Economics & Mechanism Design",
  "Game Theory & AI",
  "Debate",
] as const;

const CATEGORY_COLORS: Record<string, string> = {
  Finance: "#1e52f3",
  "Economics & Mechanism Design": "#b45309",
  "Game Theory & AI": "#7c3aed",
  Debate: "#059669",
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export default function ProjectsPage() {
  const [activeSection, setActiveSection] = useState(slugify(CATEGORIES[0]));
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const grouped = useMemo(() => {
    const map: Record<string, Project[]> = {};
    for (const cat of CATEGORIES) map[cat] = [];
    for (const p of projects) map[p.category]?.push(p);
    return map;
  }, []);

  // Intersection observer for sticky nav highlight
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    for (const el of Object.values(sectionRefs.current)) {
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const scrollTo = (slug: string) => {
    const el = sectionRefs.current[slug];
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="section-header">
        <div className="container">
          <TextReveal as="h1" className="section-title">
            Projects
          </TextReveal>
          <Reveal delay={0.2}>
            <p className="section-desc">
              {projects.length} repositories across finance, economics, game theory, and debate.
            </p>
          </Reveal>
          <Reveal delay={0.3} variant="scale">
            <div className="section-header-line" />
          </Reveal>
        </div>
      </div>

      {/* Sticky jump-to nav */}
      <div className="pj-nav-rail">
        <nav className="pj-nav">
          {CATEGORIES.map((cat) => {
            const slug = slugify(cat);
            const count = grouped[cat].length;
            return (
              <button
                key={slug}
                className={`pj-nav-item ${activeSection === slug ? "pj-nav-active" : ""}`}
                onClick={() => scrollTo(slug)}
              >
                <span className="pj-nav-label">{cat}</span>
                <span
                  className="pj-nav-count"
                  style={{
                    color: activeSection === slug ? CATEGORY_COLORS[cat] : undefined,
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="page-content">
        <div className="container">
          {CATEGORIES.map((cat, ci) => {
            const slug = slugify(cat);
            const items = grouped[cat];
            return (
              <section
                key={slug}
                id={slug}
                ref={(el) => { sectionRefs.current[slug] = el; }}
                className="pj-section"
              >
                <Reveal delay={ci * 0.08}>
                  <div className="pj-section-header">
                    <h2
                      className="pj-section-title"
                      style={{ color: CATEGORY_COLORS[cat] }}
                    >
                      {cat}
                    </h2>
                    <span className="pj-section-count">
                      {items.length} project{items.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </Reveal>

                <div className="pj-grid">
                  {items.map((p, i) => (
                    <Reveal key={p.repo} delay={i * 0.06}>
                      {p.private ? (
                        <div className="pj-card">
                          <div className="pj-card-top">
                            <span className="pj-card-lang">{p.lang}</span>
                            <span className="pj-card-private">Private</span>
                          </div>
                          <h3 className="pj-card-name">{p.name}</h3>
                          <p className="pj-card-desc">{p.desc}</p>
                        </div>
                      ) : (
                        <a
                          href={`https://github.com/abhi-wadhwa/${p.repo}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pj-card pj-card-link"
                        >
                          <div className="pj-card-top">
                            <span className="pj-card-lang">{p.lang}</span>
                            <span className="pj-card-arrow">&rarr;</span>
                          </div>
                          <h3 className="pj-card-name">{p.name}</h3>
                          <p className="pj-card-desc">{p.desc}</p>
                        </a>
                      )}
                    </Reveal>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <Footer />
    </>
  );
}
