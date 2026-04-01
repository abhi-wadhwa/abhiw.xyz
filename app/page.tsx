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

      {/* Hero — statement + sticky photo */}
      <section className="hero-scroll">
        <div className="container">
          <div className="hero-scroll-grid">
            <div className="hero-scroll-left">
              <div className="hero-scroll-statement">
                <TextReveal as="h1" className="statement-text" delay={0.15}>
                  I am Abhi Wadhwa, a Quant Trader at Optiver and applied mathematician studying game theory, optimization, and market design at USC.
                </TextReveal>
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
                This summer I&rsquo;m joining{" "}
                <Link href="/experience" className="about-link">Optiver</Link>{" "}
                as a Quantitative Trader intern in Chicago, building models
                and generating alpha for systematic options strategies.
                Previously, I sourced deals at{" "}
                <Link href="/experience" className="about-link">Iron Pillar Fund</Link>{" "}
                in Dubai, built ML pipelines at{" "}
                <Link href="/experience" className="about-link">The World Bank</Link>,
                and ranked first in an operating-model competition at{" "}
                <Link href="/experience" className="about-link">RBC Capital Markets</Link>.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="about-para">
                My{" "}
                <Link href="/research" className="about-link">research</Link>{" "}
                spans random matrix theory, stochastic control, and behavioral
                economics. I&rsquo;ve investigated the Spielman-Teng Conjecture
                in SVD under Prof. Zixiang Zhou, applied convex optimization to
                dynamic policy systems with Prof. Rodney Ramcharan, and modeled
                vaccine hesitancy using game-theoretic incentives at{" "}
                <Link href="/research" className="about-link">UC Berkeley</Link>.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="about-para">
                I compete in parliamentary{" "}
                <Link href="/awards" className="about-link">debate</Link>{" "}
                &mdash; a USUDC quarterfinalist, UC Berkeley IV semifinalist,
                and former member of Team UAE at the World Schools Debate
                Championships. In mathematics, I qualified for the{" "}
                <Link href="/awards" className="about-link">USAMO</Link>,
                earned distinction in the British Mathematical Olympiad, and
                qualified twice for the AIME.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="about-para">
                I&rsquo;m completing graduate-level{" "}
                <Link href="/courses" className="about-link">coursework</Link>{" "}
                in measure-theoretic real analysis, probability theory,
                stochastic systems &amp; reinforcement learning, and machine
                learning &mdash; alongside my undergraduate degree in applied
                mathematics at USC on a Dean&rsquo;s Scholarship.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="about-para">
                Beyond academics, I care deeply about{" "}
                <Link href="/personal" className="about-link">public goods provision</Link>,
                institutional trust, and economic development. I grew up across{" "}
                <Link href="/personal" className="about-link">Richmond, Mumbai, Dubai, and Los Angeles</Link>{" "}
                &mdash; and that background shapes how I think about incentives,
                policy, and markets.
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

      {/* Currently */}
      <section className="now-section">
        <div className="container">
          <Reveal>
            <div className="now-label">
              <span className="now-dot" />
              Currently
            </div>
          </Reveal>

          <div className="now-grid">
            <Reveal delay={0.05}>
              <div className="now-item">
                <span className="now-category">Building</span>
                <span className="now-desc">Volatility surfaces and systematic single-stock options strategies at Optiver Chicago</span>
              </div>
            </Reveal>
            <Reveal delay={0.10}>
              <div className="now-item">
                <span className="now-category">Researching</span>
                <span className="now-desc">Smoothed analysis of singular values &mdash; the Spielman-Teng Conjecture</span>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="now-item">
                <span className="now-category">Taking</span>
                <span className="now-desc">MATH 501 &middot; MATH 541a &middot; ISE 615 &middot; MATH 525a</span>
              </div>
            </Reveal>
            <Reveal delay={0.20}>
              <div className="now-item">
                <span className="now-category">Reading</span>
                <span className="now-desc">Algorithmic Game Theory &mdash; Nisan, Roughgarden, Tardos &amp; Vazirani</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
