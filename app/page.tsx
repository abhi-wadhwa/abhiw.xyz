"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";

const navItems = [
  {
    title: "Experience",
    href: "/experience",
    desc: "Optiver, Iron Pillar Fund, The World Bank, RBC Capital Markets",
  },
  {
    title: "Research",
    href: "/research",
    desc: "SVD Theory, Random Matrix Theory, Stochastic Control, Behavioral Economics",
  },
  {
    title: "Awards",
    href: "/awards",
    desc: "USAMO, British Mathematical Olympiad, National Debate",
  },
  {
    title: "Coursework",
    href: "/courses",
    desc: "22 courses across Mathematics, CS/ML, Economics, and Finance",
  },
  {
    title: "Personal",
    href: "/personal",
    desc: "Richmond, Mumbai, Dubai, Los Angeles — the full story",
  },
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* Hero */}
      <section className="hero" ref={heroRef}>
        <motion.div className="container" style={{ opacity: heroOpacity }}>
          <div className="hero-inner">
            <div className="hero-text">
              <h1 className="hero-name">
                <TextReveal className="hero-name" delay={0.1}>
                  Abhi
                </TextReveal>
                <br />
                <TextReveal className="hero-name" delay={0.25}>
                  Wadhwa
                </TextReveal>
                <motion.span
                  className="hero-name-dot"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  .
                </motion.span>
              </h1>
              <Reveal delay={0.35}>
                <p className="hero-subtitle">Applied Mathematics &middot; USC</p>
              </Reveal>
              <Reveal delay={0.45}>
                <p className="hero-focus">
                  Game Theory &middot; Optimization &middot; Market Design
                </p>
              </Reveal>
              <Reveal delay={0.55}>
                <p className="hero-desc">
                  I study how utility theory and optimization methods enable
                  multi-agent systems to model incentives involving uncertainty
                  and competition — with applications to market and auction design.
                </p>
              </Reveal>
              <Reveal delay={0.7}>
                <div className="hero-tags">
                  <span className="hero-tag hero-tag-active">Optiver &rsquo;26</span>
                  <span className="hero-tag">Random Matrix Theory</span>
                  <span className="hero-tag">USC Applied Math</span>
                </div>
              </Reveal>
            </div>

            <motion.div
              className="hero-photo-wrap"
              style={{ y: photoY, scale: photoScale }}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="hero-photo-glow" />
              <div className="hero-photo-ring">
                <img
                  src="/assets/abhi.jpeg"
                  alt="Abhi Wadhwa"
                  className="hero-photo"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Navigation to sections */}
      <section className="home-nav">
        <div className="container">
          <Reveal variant="scale">
            <div className="home-nav-divider" />
          </Reveal>
          <div className="home-nav-list">
            {navItems.map((item, i) => (
              <Reveal
                key={item.href}
                delay={i * 0.1}
                direction={i % 2 === 0 ? "left" : "right"}
                variant="slide"
              >
                <Link href={item.href} className="home-nav-item">
                  <span className="home-nav-title">
                    {item.title}
                    <span className="home-nav-arrow">&rarr;</span>
                  </span>
                  <span className="home-nav-desc">{item.desc}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
