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
                This summer I&rsquo;m trading options at{" "}
                <Link href="/experience" className="about-link">Optiver</Link>{" "}
                in Chicago. Before that I sourced deals for a $500MM fund at{" "}
                <Link href="/experience" className="about-link">Iron Pillar</Link>{" "}
                in Dubai, built census models at{" "}
                <Link href="/experience" className="about-link">the World Bank</Link>{" "}
                that actually worked 30% better, and somehow placed first out
                of 40 teams at{" "}
                <Link href="/experience" className="about-link">RBC</Link>.
                I also got invited to{" "}
                <Link href="/experience" className="about-link">Citadel Securities</Link>&rsquo;{" "}
                trading invitational, which was mostly me sweating through
                simulations in Miami.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="about-para">
                I do{" "}
                <Link href="/research" className="about-link">research</Link>{" "}
                on things nobody asks me about at parties: random matrix theory,
                stochastic control, why people refuse vaccines even when it&rsquo;s
                free. I&rsquo;ve worked with Prof. Zhou on the Spielman-Teng
                Conjecture, Prof. Ramcharan on optimization for policy, and
                Prof. Iyer at{" "}
                <Link href="/research" className="about-link">Berkeley</Link>{" "}
                on game-theoretic models of public health. I also build things
                &mdash; Nash equilibrium solvers, poker bots, a limit order book
                simulator, an AlphaZero engine, and too many{" "}
                <Link href="/projects" className="about-link">mechanism design toys</Link>{" "}
                to list here.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="about-para">
                I{" "}
                <Link href="/awards" className="about-link">debate</Link>{" "}
                competitively &mdash; USUDC quarterfinals, Berkeley IV semis,
                Team UAE at Worlds. I qualified for the{" "}
                <Link href="/awards" className="about-link">USAMO</Link>,
                the AIME twice, and got distinction in the British Math Olympiad,
                which sounds impressive until you learn how many people take it.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="about-para">
                Right now I&rsquo;m doing graduate{" "}
                <Link href="/courses" className="about-link">coursework</Link>{" "}
                in measure theory, probability, stochastic RL, and ML alongside
                my undergrad on a Dean&rsquo;s Scholarship. I care a lot about{" "}
                <Link href="/personal" className="about-link">public goods</Link>,
                institutional trust, and why some countries figure it out and
                others don&rsquo;t.
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
