"use client";

import Link from "next/link";
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
                      <div className="status-item">
                        <span className="status-label">currently</span>
                        <span className="status-value">
                          incoming @{" "}
                          <Link href="/experience" className="status-link">Optiver</Link>
                        </span>
                      </div>
                      <div className="status-item">
                        <span className="status-label">studying</span>
                        <span className="status-value">
                          mathematics @{" "}
                          <Link href="/courses" className="status-link">USC</Link>
                        </span>
                      </div>
                      <div className="status-item">
                        <span className="status-label">from</span>
                        <span className="status-value">
                          <Link href="/personal" className="status-link">Richmond, Mumbai, Dubai, LA</Link>
                        </span>
                      </div>
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
                I trade options at{" "}
                <Link href="/experience" className="about-link">Optiver</Link>{" "}
                this summer in Chicago. Before that I sourced deals at{" "}
                <Link href="/experience" className="about-link">Iron Pillar</Link>{" "}
                in Dubai, built ML pipelines at{" "}
                <Link href="/experience" className="about-link">the World Bank</Link>,
                and won an operating-model competition at{" "}
                <Link href="/experience" className="about-link">RBC</Link>.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="about-para">
                I spend most of my time thinking about random matrices,
                stochastic control, and why people make the decisions they do.
                I&rsquo;ve worked on the Spielman-Teng Conjecture with
                Prof. Zixiang Zhou, convex optimization for dynamic policy
                with Prof. Rodney Ramcharan, and game-theoretic models of
                vaccine hesitancy at{" "}
                <Link href="/research" className="about-link">Berkeley</Link>.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="about-para">
                I{" "}
                <Link href="/awards" className="about-link">debate</Link>{" "}
                competitively &mdash; USUDC quarterfinals, Berkeley IV semis,
                Team UAE at Worlds. I qualified for the{" "}
                <Link href="/awards" className="about-link">USAMO</Link>{" "}
                and the AIME twice.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="about-para">
                Right now I&rsquo;m doing graduate{" "}
                <Link href="/courses" className="about-link">coursework</Link>{" "}
                in real analysis, probability, stochastic systems, and ML
                alongside my undergrad in applied math on a Dean&rsquo;s Scholarship.
                {" "}I also{" "}
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
