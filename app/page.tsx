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
                Bachelor&rsquo;s in applied math at{" "}
                <Link href="/courses" className="about-link">USC</Link>{" "}
                this spring, then a master&rsquo;s at{" "}
                <Link href="/courses" className="about-link">UChicago</Link>.
                This summer I&rsquo;m trading options at{" "}
                <Link href="/experience" className="about-link">Optiver</Link>{" "}
                in Chicago. Before that: sourcing deals for a $500MM fund at{" "}
                <Link href="/experience" className="about-link">Iron Pillar</Link>{" "}
                in Dubai, building census models at{" "}
                <Link href="/experience" className="about-link">the World Bank</Link>{" "}
                that actually worked 30% better, and placing first out of 40 at{" "}
                <Link href="/experience" className="about-link">RBC</Link>.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="about-para">
                Most of my time goes to probability and why people make bad
                decisions under uncertainty. I&rsquo;ve done{" "}
                <Link href="/research" className="about-link">research</Link>{" "}
                with Prof. Zhou on the Spielman-Teng Conjecture, with
                Prof. Ramcharan on optimization for economic policy, and with
                Prof. Iyer at{" "}
                <Link href="/research" className="about-link">Berkeley</Link>{" "}
                on game-theoretic models of vaccine hesitancy. My{" "}
                <Link href="/projects" className="about-link">projects</Link>{" "}
                are in the same neighborhood &mdash; poker bots, order book
                simulators, equilibrium solvers, an AlphaZero engine.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="about-para">
                I{" "}
                <Link href="/awards" className="about-link">debate</Link>{" "}
                on the BP circuit &mdash; USUDC quarterfinals, Berkeley IV semis,
                Team UAE at Worlds. I qualified for the{" "}
                <Link href="/awards" className="about-link">USAMO</Link>{" "}
                and the AIME twice. I also spend time around early-stage
                startups, care a lot about{" "}
                <Link href="/personal" className="about-link">public goods</Link>{" "}
                and why some countries figure it out and others don&rsquo;t,
                and{" "}
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
