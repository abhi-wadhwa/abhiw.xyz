"use client";

import { useState } from "react";
import Section from "@/components/layout/Section";
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
      strokeWidth="2"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function InterestCard({
  interest,
}: {
  interest: (typeof personalData.interests)[0];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="interest-card" onClick={() => setOpen(!open)}>
      <div className="interest-header">
        <h4 className="interest-title">{interest.title}</h4>
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

export default function Personal() {
  const [philOpen, setPhilOpen] = useState(false);

  return (
    <Section id="personal" num="06" title="Personal">
      <div className="personal-grid reveal">
        {/* Left: Bio */}
        <div>
          <h3 className="sub-heading">About</h3>
          {personalData.bio.map((paragraph, i) => (
            <p key={i} className="bio-text">
              {paragraph}
            </p>
          ))}
          <p className="bio-meta">
            Pronunciation: {personalData.pronunciation}
          </p>
          <p className="bio-meta">{personalData.astrology}</p>
        </div>

        {/* Right: Interests */}
        <div>
          <h3 className="sub-heading">Areas of Interest</h3>
          {personalData.interests.map((interest) => (
            <InterestCard key={interest.title} interest={interest} />
          ))}
        </div>
      </div>

      {/* Philosophy */}
      <div
        className="interest-card reveal"
        onClick={() => setPhilOpen(!philOpen)}
        style={{ marginTop: 32 }}
      >
        <div className="interest-header">
          <h3 className="sub-heading" style={{ marginBottom: 0 }}>
            Philosophical Takes
          </h3>
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
    </Section>
  );
}
