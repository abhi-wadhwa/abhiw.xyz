"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import { research } from "@/data/research";
import { FileText, ExternalLink, X } from "lucide-react";

export default function ResearchPage() {
  const [openPaper, setOpenPaper] = useState<string | null>(null);

  return (
    <>
      <div className="section-header">
        <div className="container">
          <TextReveal as="h1" className="section-title">
            Research
          </TextReveal>
          <Reveal delay={0.2}>
            <p className="section-desc">
              Random matrix theory, stochastic control, optimization, and behavioral economics.
            </p>
          </Reveal>
          <Reveal delay={0.4} variant="scale">
            <div className="section-header-line" />
          </Reveal>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="res-list">
            {research.map((item, i) => (
              <Reveal key={`${item.institution}-${item.advisor}`} delay={i * 0.12}>
                <article className="res-paper">
                  {/* Decorative math symbol */}
                  <div className="res-symbol">{item.symbol}</div>

                  {/* Title */}
                  <h2 className="res-title">{item.title}</h2>

                  {/* Metadata bar */}
                  <div className="res-meta-bar">
                    <div className="res-meta-left">
                      <img
                        src={item.logo}
                        alt={item.institution}
                        className="res-meta-logo"
                        loading="lazy"
                      />
                      <span className="res-meta-text">
                        {item.institution} &mdash; {item.department}
                      </span>
                    </div>
                    <span className="res-meta-text">
                      Advisor: {item.advisor}
                    </span>
                    <span className="res-meta-text">
                      {item.location} &middot; {item.year}
                    </span>
                  </div>

                  {/* Narrative */}
                  <p className="res-narrative">{item.narrative}</p>

                  {/* Keywords as simple italic text */}
                  <p className="res-keywords">
                    {item.tags.join(" · ")}
                  </p>

                  {/* Action buttons */}
                  <div className="res-actions">
                    <button
                      className="res-action-btn"
                      onClick={() =>
                        setOpenPaper(openPaper === item.paperUrl ? null : item.paperUrl)
                      }
                    >
                      <FileText size={16} />
                      {openPaper === item.paperUrl ? "Hide Paper" : "View Paper"}
                    </button>
                    <a
                      href={item.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="res-action-btn"
                    >
                      <ExternalLink size={16} />
                      GitHub
                    </a>
                  </div>

                  {/* Inline PDF viewer */}
                  {openPaper === item.paperUrl && (
                    <div className="res-pdf-viewer">
                      <div className="res-pdf-header">
                        <span className="res-pdf-title">
                          <FileText size={14} />
                          {item.title}
                        </span>
                        <button
                          className="res-pdf-close"
                          onClick={() => setOpenPaper(null)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <iframe
                        src={item.paperUrl}
                        className="res-pdf-frame"
                        title={`${item.title} — Paper`}
                      />
                    </div>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
