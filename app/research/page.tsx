import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import { research } from "@/data/research";

export default function ResearchPage() {
  return (
    <>
      <div className="res-page-header">
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
          <div className="res-list">
            {research.map((item, i) => (
              <Reveal key={`${item.institution}-${item.advisor}`} delay={i * 0.12}>
                <article className="res-entry">
                  <div className="res-entry-head">
                    <span className="res-symbol-inline">{item.symbol}</span>
                    <h2 className="res-title">{item.title}</h2>
                  </div>

                  <p className="res-attribution">
                    {item.institution} &mdash; {item.department}
                    <span className="res-sep">/</span>
                    Advisor: {item.advisor}
                    <span className="res-sep">/</span>
                    {item.year}
                  </p>

                  <p className="res-narrative">{item.narrative}</p>

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
