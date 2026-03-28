import Section from "@/components/layout/Section";
import { research } from "@/data/research";

export default function Research() {
  return (
    <Section id="research" num="03" title="Academic Research">
      <div className="feed-list">
        {research.map((item) => (
          <div
            key={`${item.institution}-${item.advisor}`}
            className="feed-entry reveal"
            style={{ borderLeft: `3px solid ${item.accentColor}` }}
          >
            <div className="logo-frame">
              <img
                src={item.logo}
                alt={item.institution}
                className="logo-img"
                loading="lazy"
              />
            </div>
            <div>
              <div className="feed-role">{item.role}</div>
              <div className="feed-org">
                {item.institution} {item.department}
              </div>
              <div className="feed-location">
                Advisor: {item.advisor} &middot; {item.location}
              </div>
              <ul className="feed-bullets">
                {item.bullets.map((bullet, j) => (
                  <li key={j}>{bullet}</li>
                ))}
              </ul>
            </div>
            <div className="feed-date">{item.year}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
