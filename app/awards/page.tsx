import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
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

function collectFeatured() {
  const featured = [];
  for (const a of awards.mathematics) if (a.featured) featured.push(a);
  for (const a of awards.scholarships) if (a.featured) featured.push(a);
  return featured;
}

export default function AwardsPage() {
  const featured = collectFeatured();

  return (
    <>
      <div className="page-header">
        <div className="container">
          <TextReveal as="h1" className="page-title">
            Awards &amp; Honors
          </TextReveal>
          <Reveal delay={0.2}>
            <p className="page-subtitle">
              Competition mathematics, parliamentary debate, and academic
              recognition.
            </p>
          </Reveal>
          <Reveal delay={0.3} variant="scale">
            <span className="page-header-line" />
          </Reveal>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          {/* Featured achievements */}
          <div className="awards-featured">
            {featured.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.08} variant="scale">
                <div className="award-featured-card">
                  <div className="award-featured-title">{a.title}</div>
                  <div className="award-featured-org">{a.organization}</div>
                  {a.year && <div className="award-featured-year">{a.year}</div>}
                </div>
              </Reveal>
            ))}
          </div>

          {/* All awards */}
          <div className="awards-columns">
            {/* Left: Debate */}
            <div>
              <Reveal>
                <div className="award-group">
                  <div className="award-group-title">Debate &mdash; Collegiate</div>
                  {awards.debate.collegiate.map((a, i) => (
                    <AwardItem key={a.title} {...a} />
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.15} direction="left" variant="slide">
                <div className="award-group">
                  <div className="award-group-title">Debate &mdash; High School &amp; International</div>
                  {awards.debate.highSchool.map((a) => (
                    <AwardItem key={a.title} {...a} />
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right: Math + Scholarships */}
            <div>
              <Reveal direction="right" variant="slide">
                <div className="award-group">
                  <div className="award-group-title">Mathematics</div>
                  {awards.mathematics.filter((a) => !a.featured).map((a) => (
                    <AwardItem key={a.title} {...a} />
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.15} direction="right" variant="slide">
                <div className="award-group">
                  <div className="award-group-title">Scholarships</div>
                  {awards.scholarships.filter((a) => !a.featured).map((a) => (
                    <AwardItem key={a.title} {...a} />
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
