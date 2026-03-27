export interface Experience {
  company: string;
  logo: string;
  role: string;
  location: string;
  dateRange: string;
  bullets: string[];
}

export const experiences: Experience[] = [
  {
    company: "Optiver",
    logo: "/assets/Optiver.jpeg",
    role: "Quantitative Trader Intern",
    location: "Chicago, IL",
    dateRange: "Jun 2026 — Aug 2026",
    bullets: [
      "Manually click trading single stock options in simulation for 4 weeks to build intuition around pricing, liquidity, and execution dynamics",
      "Building models, researching and testing hypotheses, and generating alpha for systematic strategies focused on single stock options",
      "Modeling volatility and building vol surfaces as part of proprietary options market making strategies for use by discretionary traders",
    ],
  },
  {
    company: "Iron Pillar Fund",
    logo: "/assets/Ironpillar.jpg",
    role: "Private Equity Intern",
    location: "Dubai, UAE",
    dateRange: "Jun 2025 — Aug 2025",
    bullets: [
      "Sourced 30+ investment opportunities for $500MM growth tech fund, developing operating models to target 25-30% IRR benchmarks",
      "Developed projections incorporating SaaS metrics (ARR, churn, LTV/CAC) for evaluating growth synergies in late stage ventures",
      "Designed go-to-market strategy for PortCos targeting US-India corridor and diaspora markets to achieve growth and scaling targets",
    ],
  },
  {
    company: "The World Bank",
    logo: "/assets/worldbank.jpeg",
    role: "Machine Learning Researcher",
    location: "Los Angeles, CA",
    dateRange: "Oct 2024 — Apr 2025",
    bullets: [
      "Engineered spatial alignment model in TensorFlow using linear regressions to reconcile district boundary inconsistencies in census data",
      "Architected pipelines using pandas to process and standardize 300K+ records to normalize data for modeling and statistical inference",
      "Deployed a PostgreSQL schema to improve accuracy 30% (MSE) through integrating additional datasets to double data volume",
    ],
  },
  {
    company: "RBC Capital Markets",
    logo: "/assets/rbc.jpeg",
    role: "Markets Apprentice",
    location: "New York City, NY",
    dateRange: "Sep 2024 — Feb 2025",
    bullets: [
      "Built long/short equity strategy on NVDA/TSLA on political sentiment and fundamental valuation, yielded 2% uncorrelated alpha",
      "Ranked #1/40 in a time-intensive operating-model competition, building financial simulations and diagnosing errors in model templates",
    ],
  },
];
