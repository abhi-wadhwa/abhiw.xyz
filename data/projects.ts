export interface Project {
  name: string;
  repo: string;
  desc: string;
  category: "Finance" | "Game Theory & AI" | "Debate";
  lang: string;
}

export const projects: Project[] = [
  {
    name: "Market Making Game",
    repo: "market-making-game",
    desc: "Interactive market-making simulator — quote bid/ask spreads, manage inventory risk, Glosten-Milgrom model.",
    category: "Finance",
    lang: "Python",
  },
  {
    name: "Limit Order Book",
    repo: "limit-order-book",
    desc: "High-fidelity LOB simulation — matching engine, agent-based simulation, execution algorithms, market microstructure.",
    category: "Finance",
    lang: "Python",
  },
  {
    name: "Arrow-Debreu Equilibrium",
    repo: "arrow-debreu-equilibrium",
    desc: "Compute Walrasian equilibria in Arrow-Debreu exchange economies — Scarf's algorithm, tatonnement, Edgeworth box.",
    category: "Finance",
    lang: "Python",
  },
  {
    name: "Options Pricing Trainer",
    repo: "options-pricing-trainer",
    desc: "Interactive options pricing education — Black-Scholes, binomial trees, Monte Carlo, Greeks, volatility surface.",
    category: "Finance",
    lang: "Python",
  },
  {
    name: "Fixed Income Toolkit",
    repo: "fixed-income-toolkit",
    desc: "Fixed income analytics — yield curve bootstrapping, bond pricing, duration/convexity, scenario analysis.",
    category: "Finance",
    lang: "Python",
  },
  {
    name: "Multi-Agent RL",
    repo: "multi-agent-rl",
    desc: "Multi-agent reinforcement learning — independent learners, MAPPO, communication channels, emergent cooperation.",
    category: "Game Theory & AI",
    lang: "Python",
  },
  {
    name: "POMCP Neural Search",
    repo: "pomcp-neural-search",
    desc: "POMCP with neural heuristics — planning in partially observable environments with learned rollout policies.",
    category: "Game Theory & AI",
    lang: "Python",
  },
  {
    name: "ISMCTS",
    repo: "ismcts",
    desc: "Information Set MCTS for imperfect-information games — determinized search, SO-ISMCTS, strategy fusion.",
    category: "Game Theory & AI",
    lang: "Python",
  },
  {
    name: "Bayesian Opponent Modeling",
    repo: "bayesian-opponent-modeling",
    desc: "Bayesian opponent modeling — type inference, adaptive best response, level-k thinking, Thompson sampling.",
    category: "Game Theory & AI",
    lang: "Python",
  },
  {
    name: "Distributed Self-Play",
    repo: "distributed-self-play",
    desc: "Scalable distributed self-play training — actor-learner architecture, Redis communication, model versioning.",
    category: "Game Theory & AI",
    lang: "Python",
  },
  {
    name: "LLM Adversarial Arena",
    repo: "llm-adversarial-arena",
    desc: "Pit LLMs against each other in structured adversarial games — debate, negotiation, bluffing, with ELO ratings.",
    category: "Game Theory & AI",
    lang: "Python",
  },
  {
    name: "Multiplayer Strategy",
    repo: "multiplayer-strategy",
    desc: "Web-based multiplayer strategy games — Colonel Blotto, Public Goods Game, Prisoner's Dilemma tournament.",
    category: "Game Theory & AI",
    lang: "Python",
  },
  {
    name: "Veritas Ledger",
    repo: "veritas-ledger",
    desc: "Keyboard-native BP debate flowing app — track arguments, clashes, drops, and prep speeches in real-time.",
    category: "Debate",
    lang: "TypeScript",
  },
  {
    name: "Debate Flow Analyzer",
    repo: "debate-flow-analyzer",
    desc: "AI-powered debate analysis — argument extraction, flow sheet generation, dropped argument detection.",
    category: "Debate",
    lang: "Python",
  },
  {
    name: "Tournament System",
    repo: "tournament-system",
    desc: "Tournament management platform — Swiss pairing, Round Robin, British Parliamentary tabulation, judge allocation.",
    category: "Debate",
    lang: "Python",
  },
  {
    name: "Double Blind Review",
    repo: "double-blind-review",
    desc: "Anonymized evaluation platform — double-blind review with structured rubrics, calibration, score aggregation.",
    category: "Debate",
    lang: "Python",
  },
  {
    name: "BP Break Calculator",
    repo: "bp-break-calculator",
    desc: "Break calculation tool for British Parliamentary debate tournaments.",
    category: "Debate",
    lang: "Python",
  },
];
