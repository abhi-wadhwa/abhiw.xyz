import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { experiences } from "@/data/experience";

export default function ExperiencePage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <Reveal>
            <h1 className="page-title">Experience</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="page-subtitle">
              From quantitative trading to machine learning research — building
              at the intersection of mathematics and markets.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="feed-list">
            {experiences.map((exp, i) => (
              <Reveal key={exp.company} delay={i * 0.08}>
                <div className="feed-entry">
                  <div className="logo-frame">
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      className="logo-img"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <div className="feed-role">{exp.role}</div>
                    <div className="feed-org">{exp.company}</div>
                    <div className="feed-location">{exp.location}</div>
                    <ul className="feed-bullets">
                      {exp.bullets.map((bullet, j) => (
                        <li key={j}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="feed-date">{exp.dateRange}</div>
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
