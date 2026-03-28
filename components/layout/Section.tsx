import { ReactNode } from "react";

interface SectionProps {
  id: string;
  num: string;
  title: string;
  children: ReactNode;
}

export default function Section({ id, num, title, children }: SectionProps) {
  return (
    <section id={id} className="section">
      <div className="section-header reveal">
        <span className="section-num">{num}</span>
        <h2 className="section-title">{title}</h2>
      </div>
      {children}
    </section>
  );
}
