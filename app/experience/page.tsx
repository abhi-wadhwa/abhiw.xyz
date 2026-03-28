import Footer from "@/components/Footer";
import { experiences } from "@/data/experience";

export default function ExperiencePage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Professional Experience</h1>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="feed-list">
            {experiences.map((exp) => (
              <div key={exp.company} className="feed-entry">
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
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
