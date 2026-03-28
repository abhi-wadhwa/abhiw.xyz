import Footer from "@/components/Footer";
import { awards } from "@/data/awards";

function AwardItem({ title, organization, year }: { title: string; organization: string; year?: string }) {
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

export default function AwardsPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Awards &amp; Honors</h1>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="awards-columns">
            {/* Left: Debate */}
            <div>
              <div className="award-group">
                <div className="award-group-title">Debate — Collegiate</div>
                {awards.debate.collegiate.map((a) => (
                  <AwardItem key={a.title} {...a} />
                ))}
              </div>
              <div className="award-group">
                <div className="award-group-title">Debate — High School &amp; International</div>
                {awards.debate.highSchool.map((a) => (
                  <AwardItem key={a.title} {...a} />
                ))}
              </div>
            </div>

            {/* Right: Math + Scholarships */}
            <div>
              <div className="award-group">
                <div className="award-group-title">Mathematics</div>
                {awards.mathematics.map((a) => (
                  <AwardItem key={a.title} {...a} />
                ))}
              </div>
              <div className="award-group">
                <div className="award-group-title">Scholarships</div>
                {awards.scholarships.map((a) => (
                  <AwardItem key={a.title} {...a} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
