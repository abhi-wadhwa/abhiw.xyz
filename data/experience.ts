export interface Experience {
  company: string;
  logo: string;
  role: string;
  location: string;
  dateRange: string;
  summary: string;
  companyDesc: string;
  narrative: string;
}

export const experiences: Experience[] = [
  {
    company: "Optiver",
    logo: "/assets/Optiver.jpeg",
    role: "Quantitative Trader Intern",
    location: "Chicago, IL",
    dateRange: "Jun 2026 — Aug 2026",
    summary: "Building systematic options strategies and volatility models at one of the world's largest market makers.",
    companyDesc: "Optiver is a global market maker founded in Amsterdam, trading on every major exchange. They provide liquidity across equities, options, fixed income, and commodities — processing millions of trades daily with a focus on pricing efficiency and execution speed.",
    narrative: "I'm spending my first four weeks manually click-trading single stock options in simulation to build deep intuition around pricing dynamics, liquidity, and execution. From there, I'm building models, researching hypotheses, and generating alpha for systematic strategies focused on single stock options. A major part of the work involves modeling volatility and constructing vol surfaces as part of proprietary market making strategies that discretionary traders use to inform their positions.",
  },
  {
    company: "Iron Pillar Fund",
    logo: "/assets/Ironpillar.jpg",
    role: "Private Equity Intern",
    location: "Dubai, UAE",
    dateRange: "Jun 2025 — Aug 2025",
    summary: "Sourced deals and built operating models for a $500MM growth-stage tech fund targeting the US-India corridor.",
    companyDesc: "Iron Pillar is a growth-stage venture fund based across Dubai and Mumbai, managing over $500 million focused on late-stage technology companies operating in the US-India corridor and diaspora markets.",
    narrative: "I sourced over 30 investment opportunities, developing operating models that targeted 25–30% IRR benchmarks across the portfolio. I built detailed projections incorporating SaaS metrics — ARR, churn, LTV/CAC — to evaluate growth synergies in late-stage ventures. I also designed a go-to-market strategy for portfolio companies targeting the US-India corridor and diaspora markets, working closely with the partners on scaling and growth execution.",
  },
  {
    company: "The World Bank",
    logo: "/assets/worldbank.jpeg",
    role: "Machine Learning Researcher",
    location: "Los Angeles, CA",
    dateRange: "Oct 2024 — Apr 2025",
    summary: "Built ML models and data pipelines to reconcile census data inconsistencies across 300K+ records.",
    companyDesc: "The World Bank is an international financial institution that provides loans, grants, and technical assistance to developing countries for infrastructure, education, health, and governance projects worldwide.",
    narrative: "I engineered a spatial alignment model in TensorFlow using linear regressions to reconcile district boundary inconsistencies across census datasets — a problem that had been creating noise in the Bank's economic analyses for years. I architected data pipelines using pandas to process and standardize over 300,000 records, normalizing them for downstream modeling and statistical inference. I also deployed a PostgreSQL schema that doubled the available data volume by integrating additional datasets, which improved model accuracy by 30% as measured by MSE.",
  },
  {
    company: "RBC Capital Markets",
    logo: "/assets/rbc.jpeg",
    role: "Markets Apprentice",
    location: "New York City, NY",
    dateRange: "Sep 2024 — Feb 2025",
    summary: "Ranked #1 in an operating-model competition and built a long/short equity strategy that generated 2% alpha.",
    companyDesc: "RBC Capital Markets is the investment banking arm of the Royal Bank of Canada, one of North America's largest financial institutions. They provide advisory, sales & trading, and research services across global markets.",
    narrative: "I built a long/short equity strategy on NVDA and TSLA based on political sentiment analysis and fundamental valuation, which yielded 2% uncorrelated alpha over the program period. I also ranked first out of 40 participants in a time-intensive operating-model competition, where I built financial simulations from scratch and diagnosed errors in existing model templates under pressure.",
  },
  {
    company: "Citadel Securities",
    logo: "/assets/citadel.png",
    role: "Trading Invitational Participant",
    location: "Miami, FL",
    dateRange: "2025",
    summary: "Selected for an elite, invite-only trading competition run by one of the world's largest market makers.",
    companyDesc: "Citadel Securities is one of the world's largest market makers, handling roughly a quarter of all U.S. equity trading volume. Founded by Ken Griffin and headquartered in Miami, the firm uses advanced quantitative strategies and technology to provide liquidity across equities, options, fixed income, and ETFs on exchanges worldwide.",
    narrative: "I was selected to participate in the Citadel Securities Trading Invitational, a highly selective competition that draws top quantitative and trading-minded students from universities across the country. The event tested market-making intuition, quantitative reasoning, and decision-making under pressure through simulated trading challenges. Participants had to price instruments, manage risk in real-time, and adapt to shifting market conditions — all while competing against some of the strongest quantitative minds in the undergraduate talent pool.",
  },
];
