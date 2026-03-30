import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import { research } from "@/data/research";

export default function ResearchPage() {
  return (
    <>
      <div className="section-header">
        <div className="container">
          <div className="section-header-row">
            <TextReveal as="h1" className="section-title">
              Research
            </TextReveal>
            <Reveal delay={0.3} direction="right" variant="slide">
              <span className="section-tagline">Theory &times; Application</span>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="section-desc">
              Random matrix theory, stochastic control, convex optimization, and game-theoretic models of human behavior.
            </p>
          </Reveal>
          <Reveal delay={0.4} variant="scale">
            <div className="section-header-line" />
          </Reveal>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="res-list">
            {research.map((item, i) => (
              <Reveal key={`${item.institution}-${item.advisor}`} delay={i * 0.12}>
                <article className="res-paper">
                  {/* Decorative math symbol */}
                  <div className="res-symbol">{item.symbol}</div>

                  {/* Title */}
                  <h2 className="res-title">{item.title}</h2>

                  {/* Metadata bar */}
                  <div className="res-meta-bar">
                    <div className="res-meta-left">
                      <img
                        src={item.logo}
                        alt={item.institution}
                        className="res-meta-logo"
                        loading="lazy"
                      />
                      <span className="res-meta-text">
                        {item.institution} &mdash; {item.department}
                      </span>
                    </div>
                    <span className="res-meta-text">
                      Advisor: {item.advisor}
                    </span>
                    <span className="res-meta-text">
                      {item.location} &middot; {item.year}
                    </span>
                  </div>

                  {/* Narrative */}
                  <p className="res-narrative">{item.narrative}</p>

                  {/* Keywords as simple italic text */}
                  <p className="res-keywords">
                    {item.tags.join(" · ")}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
