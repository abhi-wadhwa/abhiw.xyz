import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import { research } from "@/data/research";

export default function ResearchPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <TextReveal as="h1" className="page-title">
            Research
          </TextReveal>
          <Reveal delay={0.2}>
            <p className="page-subtitle">
              Investigating problems in random matrix theory, stochastic control,
              optimization, and behavioral economics.
            </p>
          </Reveal>
          <Reveal delay={0.3} variant="scale">
            <span className="page-header-line" />
          </Reveal>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="research-grid">
            {research.map((item, i) => (
              <Reveal
                key={`${item.institution}-${item.advisor}`}
                delay={i * 0.12}
                variant="scale"
              >
                <div
                  className="research-card"
                  style={{
                    "--card-accent": item.accentColor,
                    "--card-accent-glow": `${item.accentColor}20`,
                  } as React.CSSProperties}
                >
                  <div className="research-card-header">
                    <div className="research-card-info">
                      <div className="research-role">{item.role}</div>
                      <div className="research-org">
                        {item.institution} &mdash; {item.department}
                      </div>
                      <div className="research-meta">
                        Advisor: {item.advisor} &middot; {item.location}
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                      <div className="research-logo">
                        <img
                          src={item.logo}
                          alt={item.institution}
                          loading="lazy"
                        />
                      </div>
                      <span className="research-year">{item.year}</span>
                    </div>
                  </div>
                  <ul className="research-bullets">
                    {item.bullets.map((bullet, j) => (
                      <li key={j}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
