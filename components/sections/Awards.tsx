import Section from "@/components/layout/Section";
import { awards } from "@/data/awards";

interface AwardItemProps {
  title: string;
  organization: string;
  year?: string;
}

function AwardItem({ title, organization, year }: AwardItemProps) {
  return (
    <div className="award-item">
      <div>
        <div className="award-title">{title}</div>
        <div className="award-org">{organization}</div>
      </div>
      {year && <span className="award-year">{year}</span>}
    </div>
  );
}

export default function Awards() {
  return (
    <Section id="awards" num="04" title="Awards & Honors">
      <div className="awards-grid reveal">
        {/* Left column: Debate */}
        <div>
          <div className="award-group">
            <div className="award-group-title">Debate — Collegiate</div>
            <div className="award-list">
              {awards.debate.collegiate.map((a) => (
                <AwardItem key={a.title} {...a} />
              ))}
            </div>
          </div>
          <div className="award-group">
            <div className="award-group-title">
              Debate — High School &amp; International
            </div>
            <div className="award-list">
              {awards.debate.highSchool.map((a) => (
                <AwardItem key={a.title} {...a} />
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Math + Scholarships */}
        <div>
          <div className="award-group">
            <div className="award-group-title">Mathematics</div>
            <div className="award-list">
              {awards.mathematics.map((a) => (
                <AwardItem key={a.title} {...a} />
              ))}
            </div>
          </div>
          <div className="award-group">
            <div className="award-group-title">Scholarships</div>
            <div className="award-list">
              {awards.scholarships.map((a) => (
                <AwardItem key={a.title} {...a} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
