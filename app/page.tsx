import Link from "next/link";
import Footer from "@/components/Footer";

const navItems = [
  { num: "01", title: "Experience", href: "/experience", desc: "Optiver · Iron Pillar Fund · The World Bank · RBC Capital Markets" },
  { num: "02", title: "Research", href: "/research", desc: "SVD Theory · Random Matrix Theory · Stochastic Control · Behavioral Economics" },
  { num: "03", title: "Awards", href: "/awards", desc: "Debate · Mathematics · Scholarships" },
  { num: "04", title: "Coursework", href: "/courses", desc: "22 courses across Mathematics, CS, Economics, and Finance" },
  { num: "05", title: "Personal", href: "/personal", desc: "Background · Interests · Philosophy" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-text">
              <h1 className="hero-name">Abhi Wadhwa</h1>
              <p className="hero-subtitle">Applied Mathematics &middot; USC</p>
              <p className="hero-focus">
                Game Theory &middot; Optimization &middot; Market Design
              </p>
              <p className="hero-desc">
                I study Applied Mathematics at USC on scholarship. I work on how
                utility theory and optimization methods enable multi-agent
                systems to model incentives involving uncertainty and
                competition — with applications to market and auction design.
              </p>
              <div className="hero-chips">
                <span className="hero-chip">
                  <span className="hero-dot" /> Optiver &rsquo;26
                </span>
                <span className="hero-chip">
                  <span className="hero-dot" /> Random Matrix Theory
                </span>
                <span className="hero-chip">
                  <span className="hero-dot" /> USC Applied Math
                </span>
              </div>
            </div>

            <div className="hero-photo-wrap">
              <img
                src="/assets/abhi.jpeg"
                alt="Abhi Wadhwa"
                className="hero-photo"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Navigation to sections */}
      <section className="home-nav">
        <div className="container">
          <div className="home-nav-list">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="home-nav-item"
              >
                <div className="home-nav-left">
                  <span className="home-nav-num">{item.num}</span>
                  <span className="home-nav-title">
                    {item.title}
                    <span className="home-nav-arrow">&rarr;</span>
                  </span>
                </div>
                <span className="home-nav-desc">{item.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer dark />
    </>
  );
}
