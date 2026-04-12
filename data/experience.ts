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
    summary: "Generating alpha through systematic options strategies and proprietary volatility models at a top-tier global market maker.",
    companyDesc: "Optiver is a global market maker founded in Amsterdam, trading on every major exchange. They provide liquidity across equities, options, fixed income, and commodities — processing millions of trades daily with a focus on pricing efficiency and execution speed.",
    narrative: "Over the first four weeks I built deep intuition around options pricing, liquidity, and execution dynamics through intensive simulation trading. I then pivoted to researching and testing hypotheses to generate alpha for systematic single stock options strategies. I modeled volatility and constructed vol surfaces that fed directly into proprietary market making strategies used by discretionary traders to size and manage positions.",
  },
  {
    company: "Citadel Securities",
    logo: "/assets/citsec.png",
    role: "Trader Invitational",
    location: "Miami, FL",
    dateRange: "Apr 2026",
    summary: "Competed in real-time market-making simulations against top quantitative talent nationwide.",
    companyDesc: "Citadel Securities is one of the world's largest market makers, handling roughly a quarter of all U.S. equity trading volume. Founded by Ken Griffin and headquartered in Miami, the firm uses advanced quantitative strategies and technology to provide liquidity across equities, options, fixed income, and ETFs on exchanges worldwide.",
    narrative: "I priced instruments, managed portfolio risk in real-time, and adapted to rapidly shifting market conditions in a series of high-pressure simulated trading challenges. The invitational is one of the most selective undergraduate trading competitions in the country, drawing the strongest quantitative minds from universities nationwide. The experience sharpened my ability to make fast, probabilistically sound decisions under uncertainty.",
  },
  {
    company: "Iron Pillar Fund",
    logo: "/assets/Ironpillar.jpg",
    role: "Private Equity Intern",
    location: "Dubai, UAE",
    dateRange: "Jun 2025 — Aug 2025",
    summary: "Sourced 30+ deals and built operating models targeting 25–30% IRR for a $500MM growth-stage tech fund.",
    companyDesc: "Iron Pillar is a growth-stage venture fund based across Dubai and Mumbai, managing over $500 million focused on late-stage technology companies operating in the US-India corridor and diaspora markets.",
    narrative: "I sourced over 30 investment opportunities and built operating models targeting 25–30% IRR benchmarks. I developed detailed projections incorporating SaaS metrics — ARR, churn, LTV/CAC — to evaluate growth synergies in late-stage ventures. I also designed a go-to-market strategy for portfolio companies targeting the US-India corridor, working directly with partners on scaling and execution.",
  },
  {
    company: "The World Bank",
    logo: "/assets/worldbank.jpeg",
    role: "Machine Learning Researcher",
    location: "Los Angeles, CA",
    dateRange: "Oct 2024 — Apr 2025",
    summary: "Improved census model accuracy by 30% through spatial alignment models and 300K+ record data pipelines.",
    companyDesc: "The World Bank is an international financial institution that provides loans, grants, and technical assistance to developing countries for infrastructure, education, health, and governance projects worldwide.",
    narrative: "I engineered a spatial alignment model in TensorFlow to reconcile district boundary inconsistencies that had been degrading the Bank's economic analyses for years. I architected pipelines to process and standardize over 300,000 records for downstream modeling. I deployed a PostgreSQL schema that doubled available data volume through dataset integration, improving model accuracy by 30% (MSE).",
  },
  {
    company: "RBC Capital Markets",
    logo: "/assets/rbc.jpeg",
    role: "Markets Apprentice",
    location: "New York City, NY",
    dateRange: "Sep 2024 — Feb 2025",
    summary: "Ranked #1/40 in an operating-model competition and generated 2% uncorrelated alpha on a long/short equity strategy.",
    companyDesc: "RBC Capital Markets is the investment banking arm of the Royal Bank of Canada, one of North America's largest financial institutions. They provide advisory, sales & trading, and research services across global markets.",
    narrative: "I built a long/short equity strategy on NVDA and TSLA driven by political sentiment analysis and fundamental valuation, generating 2% uncorrelated alpha. I ranked first out of 40 participants in a high-pressure operating-model competition, building financial simulations from scratch and diagnosing errors in model templates.",
  },
];
