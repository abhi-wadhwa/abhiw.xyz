import Link from "next/link";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import HeroIntro from "@/components/HeroIntro";

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
  return (
    <>
      <HeroIntro />

      {/* Statement — bottom-left, D.E. Shaw style */}
      <section className="hero-statement">
        <div className="container">
          <div className="hero-statement-inner">
            <div className="hero-statement-text">
              <TextReveal as="h1" className="statement-text" delay={0.15}>
                I am Abhi Wadhwa, a Quant Trader at Optiver and applied mathematician studying game theory, optimization, and market design at USC.
              </TextReveal>
            </div>
            <div className="hero-statement-photo">
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
      </section>

      {/* About — revealed on scroll */}
      <section className="about-section">
        <div className="container">
          <div className="about-inner">
            <div>
              <Reveal>
                <p className="about-desc">
                  I study how utility theory and optimization methods enable
                  multi-agent systems to model incentives involving uncertainty
                  and competition — with applications to market and auction design.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="about-tags">
                  <span className="hero-tag hero-tag-active">Optiver &rsquo;26</span>
                  <span className="hero-tag">Random Matrix Theory</span>
                  <span className="hero-tag">USC Applied Math</span>
                </div>
              </Reveal>
            </div>
            <Reveal variant="scale" delay={0.1}>
              <div className="about-photo">
                <div className="hero-photo-ring">
                  <img
                    src="/assets/abhi.jpeg"
                    alt="Abhi Wadhwa"
                    className="hero-photo"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
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
