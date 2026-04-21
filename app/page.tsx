"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import HeroIntro from "@/components/HeroIntro";

export default function Home() {

  return (
    <>
      <HeroIntro />

      {/* Hero — greeting + status bar + photo */}
      <section className="hero-scroll">
        <div className="container">
          <div className="hero-scroll-grid">
            <div className="hero-scroll-left">
              <div className="hero-scroll-statement">
                <div className="hero-greeting-block">
                  <TextReveal as="h1" className="statement-text" delay={0.15}>
                    Howdy! I'm Abhi.
                  </TextReveal>

                  <Reveal delay={0.35}>
                    <div className="status-bar">
                      <motion.div
                        className="status-item"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <span className="status-label">education</span>
                        <span className="status-value">
                          <span className="status-logo-link">
                            <Link href="/courses" className="status-link status-link-pop">USC</Link>
                            <img src="/assets/USC_square.png" alt="USC" className="status-logo-popup" />
                          </span>
                          {" "}&rsquo;26 &rarr;{" "}
                          <span className="status-logo-link">
                            <Link href="/courses" className="status-link status-link-pop">UChicago</Link>
                            <img src="/assets/uchicago.svg" alt="UChicago" className="status-logo-popup" />
                          </span>
                          {" "}&rsquo;27
                        </span>
                      </motion.div>
                      <motion.div
                        className="status-item"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.65, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <span className="status-label">incoming</span>
                        <span className="status-value">
                          trading @{" "}
                          <span className="status-logo-link">
                            <Link href="/experience" className="status-link status-link-pop">Optiver</Link>
                            <img src="/assets/Optiver_square.png" alt="Optiver" className="status-logo-popup" />
                          </span>
                        </span>
                      </motion.div>
                      <motion.div
                        className="status-item"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <span className="status-label">about</span>
                        <span className="status-value status-value-muted">
                          math, markets &amp; mechanism design
                        </span>
                      </motion.div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>

            <div className="hero-scroll-right">
              <div className="hero-scroll-photo">
                <div className="hero-photo-ring">
                  <img
                    src="/assets/abhi.jpeg"
                    alt="Abhi Wadhwa"
                    className="hero-photo"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About — full width */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <Reveal>
              <p className="about-para">
                I&rsquo;m finishing a bachelor&rsquo;s in applied math at{" "}
                <Link href="/courses" className="about-link">USC</Link>{" "}
                this spring, then starting a master&rsquo;s at{" "}
                <Link href="/courses" className="about-link">UChicago</Link>{" "}
                in the fall. This summer I&rsquo;m at{" "}
                <Link href="/experience" className="about-link">Optiver</Link>{" "}
                in Chicago trading options. I&rsquo;ve also spent time at{" "}
                <Link href="/experience" className="about-link">Iron Pillar</Link>{" "}
                and{" "}
                <Link href="/experience" className="about-link">the World Bank</Link>{" "}
                &mdash; click for more.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="about-para">
                I&rsquo;m drawn to questions about probability, market structure,
                and how rational behavior breaks down when information is incomplete.
                I&rsquo;ve been lucky enough to explore this through{" "}
                <Link href="/research" className="about-link">research</Link>{" "}
                &mdash; on random matrix theory, optimization in policy systems,
                and why people make the decisions they do around public health.
                Most of my{" "}
                <Link href="/projects" className="about-link">side projects</Link>{" "}
                come from the same itch: building things to understand them better.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="about-para">
                Outside of that, I{" "}
                <Link href="/awards" className="about-link">debate</Link>{" "}
                competitively on the BP circuit and spent a lot of my teens doing
                math olympiads &mdash; two things that taught me more about
                how to think than almost anything else. I care a lot about{" "}
                <Link href="/personal" className="about-link">public goods</Link>,
                economic development, and why institutions work in some places
                and fall apart in others. And I{" "}
                <span
                  className="about-link easter-egg-link"
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent("easter-egg-music"));
                  }}
                >
                  like electronic music
                </span>.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
