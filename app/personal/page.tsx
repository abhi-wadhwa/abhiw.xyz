"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { personalData } from "@/data/personal";

const journey = [
  { place: "Richmond, VA", detail: "Born" },
  { place: "Mumbai", detail: "Age 5" },
  { place: "Dubai", detail: "Age 8" },
  { place: "Los Angeles", detail: "USC" },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`interest-chevron ${open ? "open" : ""}`}
      width="14"
      height="14"
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
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p className="interest-body">{interest.body}</p>
            <div className="interest-refs">
              {interest.references.map((ref) => (
                <span key={ref.title} className="interest-ref">
                  {ref.title} &mdash; {ref.author}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PersonalPage() {
  const [philOpen, setPhilOpen] = useState(false);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <Reveal>
            <h1 className="page-title">Personal</h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="page-subtitle">
              The story behind the math — where I come from, what I care about,
              and how I see the world.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <Reveal>
            <div className="journey-map">
              {journey.map((stop, i) => (
                <div key={stop.place} className="journey-stop">
                  {i < journey.length - 1 && <div className="journey-line" />}
                  <div className="journey-dot" />
                  <span className="journey-label">{stop.place}</span>
                  <span className="journey-detail">{stop.detail}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="personal-grid">
            <div>
              <Reveal>
                <h2 className="sub-heading">About</h2>
              </Reveal>
              {personalData.bio.map((p, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p className="bio-text">{p}</p>
                </Reveal>
              ))}
              <Reveal delay={0.15}>
                <div style={{ marginTop: 4 }}>
                  <span className="bio-meta">
                    {personalData.pronunciation}
                  </span>
                  <span className="bio-meta">Cancer Sun</span>
                  <span className="bio-meta">Aquarius Moon</span>
                  <span className="bio-meta">Capricorn Rising</span>
                </div>
              </Reveal>
            </div>

            <div>
              <Reveal>
                <h2 className="sub-heading">Areas of Interest</h2>
              </Reveal>
              {personalData.interests.map((interest, i) => (
                <Reveal key={interest.title} delay={i * 0.06}>
                  <InterestCard interest={interest} />
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.08}>
            <div
              className="interest-card"
              onClick={() => setPhilOpen(!philOpen)}
              style={{ marginTop: 48 }}
            >
              <div className="interest-header">
                <span className="sub-heading" style={{ marginBottom: 0 }}>
                  Philosophical Takes
                </span>
                <Chevron open={philOpen} />
              </div>
              <AnimatePresence>
                {philOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="philosophy-grid">
                      {personalData.philosophy.map((item) => (
                        <div key={item.topic} className="philosophy-item">
                          <span className="philosophy-topic">{item.topic}</span>
                          <span className="philosophy-position">{item.position}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>

      <Footer />
    </>
  );
}
