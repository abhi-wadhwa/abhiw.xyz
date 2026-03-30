import Link from "next/link";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

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
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-text">
              <h1 className="hero-name">
                Abhi
                <br />
                Wadhwa<span className="hero-name-dot">.</span>
              </h1>
              <p className="hero-subtitle">Applied Mathematics &middot; USC</p>
              <p className="hero-focus">
                Game Theory &middot; Optimization &middot; Market Design
              </p>
              <p className="hero-desc">
                I study how utility theory and optimization methods enable
                multi-agent systems to model incentives involving uncertainty
                and competition — with applications to market and auction design.
              </p>
              <div className="hero-tags">
                <span className="hero-tag hero-tag-active">Optiver &rsquo;26</span>
                <span className="hero-tag">Random Matrix Theory</span>
                <span className="hero-tag">USC Applied Math</span>
              </div>
            </div>

            <div className="hero-photo-wrap">
              <div className="hero-photo-glow" />
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

      {/* Navigation to sections */}
      <section className="home-nav">
        <div className="container">
          <Reveal>
            <div className="home-nav-divider" />
          </Reveal>
          <div className="home-nav-list">
            {navItems.map((item, i) => (
              <Reveal key={item.href} delay={i * 0.08}>
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
