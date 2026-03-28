"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import { personalData } from "@/data/personal";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`interest-chevron ${open ? "open" : ""}`}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function InterestCard({ interest }: { interest: (typeof personalData.interests)[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="interest-card" onClick={() => setOpen(!open)}>
      <div className="interest-header">
        <span className="interest-title">{interest.title}</span>
        <Chevron open={open} />
      </div>
      {open && (
        <div>
          <p className="interest-body">{interest.body}</p>
          <div className="interest-refs">
            {interest.references.map((ref) => (
              <span key={ref.title} className="interest-ref">
                {ref.title} — {ref.author}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function PersonalPage() {
  const [philOpen, setPhilOpen] = useState(false);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Personal</h1>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="personal-grid">
            <div>
              <h2 className="sub-heading">About</h2>
              {personalData.bio.map((p, i) => (
                <p key={i} className="bio-text">{p}</p>
              ))}
              <p className="bio-meta">Pronunciation: {personalData.pronunciation}</p>
              <p className="bio-meta">{personalData.astrology}</p>
            </div>

            <div>
              <h2 className="sub-heading">Areas of Interest</h2>
              {personalData.interests.map((interest) => (
                <InterestCard key={interest.title} interest={interest} />
              ))}
            </div>
          </div>

          <div className="interest-card" onClick={() => setPhilOpen(!philOpen)} style={{ marginTop: 48 }}>
            <div className="interest-header">
              <span className="sub-heading" style={{ marginBottom: 0 }}>
                Philosophical Takes
              </span>
              <Chevron open={philOpen} />
            </div>
            {philOpen && (
              <div className="philosophy-grid">
                {personalData.philosophy.map((item) => (
                  <div key={item.topic} className="philosophy-item">
                    <span className="philosophy-topic">{item.topic}</span>
                    <span className="philosophy-position">{item.position}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
