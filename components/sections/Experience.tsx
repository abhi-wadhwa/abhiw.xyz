import Section from "@/components/layout/Section";
import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <Section id="experience" num="02" title="Professional Experience">
      <div className="feed-list">
        {experiences.map((exp) => (
          <div key={exp.company} className="feed-entry reveal">
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
    </Section>
  );
}
