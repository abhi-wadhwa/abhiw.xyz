export interface Project {
  name: string;
  repo: string;
  desc: string;
  category: "Finance" | "Economics & Mechanism Design" | "Game Theory & AI" | "Debate";
  lang: string;
  private?: boolean;
}

export const projects: Project[] = [
  // ── Finance ──────────────────────────────────────────
  { name: "Market Making Game", repo: "market-making-game", desc: "Interactive market-making simulator — quote bid/ask spreads, manage inventory risk, Glosten-Milgrom model.", category: "Finance", lang: "Python" },
  { name: "Limit Order Book", repo: "limit-order-book", desc: "High-fidelity LOB simulation — matching engine, agent-based simulation, execution algorithms, market microstructure.", category: "Finance", lang: "Python" },
  { name: "Options Pricing Trainer", repo: "options-pricing-trainer", desc: "Interactive options pricing education — Black-Scholes, binomial trees, Monte Carlo, Greeks, volatility surface.", category: "Finance", lang: "Python" },
  { name: "Put-Call Parity", repo: "put-call-parity", desc: "Put-call parity visualization and arbitrage detection tool.", category: "Finance", lang: "JavaScript" },
  { name: "Alpha Engine", repo: "alpha-engine", desc: "Proprietary alpha signal research and systematic strategy development platform.", category: "Finance", lang: "TypeScript", private: true },

  // ── Economics & Mechanism Design ─────────────────────
  { name: "Arrow-Debreu Equilibrium", repo: "arrow-debreu-equilibrium", desc: "Compute Walrasian equilibria in Arrow-Debreu exchange economies — Scarf's algorithm, tâtonnement, Edgeworth box.", category: "Economics & Mechanism Design", lang: "Python" },
  { name: "Signaling Game", repo: "signaling-game", desc: "Signaling game analyzer — Spence job market, Crawford-Sobel cheap talk, Beer-Quiche, PBE with refinements.", category: "Economics & Mechanism Design", lang: "Python" },
  { name: "Adverse Selection", repo: "adverse-selection", desc: "Principal-agent screening under adverse selection — optimal contracts, Rothschild-Stiglitz insurance, nonlinear pricing.", category: "Economics & Mechanism Design", lang: "Python" },
  { name: "VCG Mechanism", repo: "vcg-mechanism", desc: "Vickrey-Clarke-Groves mechanism framework — truthful mechanism design for auctions, public goods, and facility location.", category: "Economics & Mechanism Design", lang: "Python" },
  { name: "Stable Matching", repo: "stable-matching", desc: "Gale-Shapley deferred acceptance, stable matching lattice, hospital-resident problem.", category: "Economics & Mechanism Design", lang: "Python" },
  { name: "Rubinstein Bargaining", repo: "rubinstein-bargaining", desc: "Rubinstein alternating-offers bargaining model — SPE computation, finite/infinite horizon, outside options, Nash bargaining.", category: "Economics & Mechanism Design", lang: "Python" },
  { name: "Combinatorial Auction", repo: "combinatorial-auction", desc: "Combinatorial auction simulator — Winner Determination (ILP), VCG payments, core pricing, ascending auction.", category: "Economics & Mechanism Design", lang: "Python" },

  // ── Game Theory & AI ─────────────────────────────────
  { name: "Nash & Correlated Equilibrium", repo: "nash-correlated-equilibrium", desc: "Compute Nash Equilibria (pure/mixed) and Correlated Equilibria for arbitrary normal-form games with interactive visualization.", category: "Game Theory & AI", lang: "Python" },
  { name: "Poker CFR Solver", repo: "poker-cfr-solver", desc: "Counterfactual Regret Minimization (CFR/CFR+/MCCFR) — converges to Nash equilibrium for imperfect-information games.", category: "Game Theory & AI", lang: "Python" },
  { name: "Extensive Form Solver", repo: "extensive-form-solver", desc: "Represent, analyze, and solve extensive-form games — backward induction, sequence-form LP, game tree visualization.", category: "Game Theory & AI", lang: "Python" },
  { name: "Stackelberg Solver", repo: "stackelberg-solver", desc: "Compute Stackelberg equilibria in sequential games — security games, Bayesian Stackelberg, DOBSS algorithm.", category: "Game Theory & AI", lang: "Python" },
  { name: "Mean Field Game Solver", repo: "mean-field-game-solver", desc: "Solve Mean Field Game systems — coupled HJB-FP PDEs describing equilibrium behavior of large interacting agent populations.", category: "Game Theory & AI", lang: "Python" },
  { name: "Replicator Dynamics", repo: "replicator-dynamics", desc: "Simulate evolutionary game dynamics — replicator equations, ESS analysis, Moran process, simplex phase portraits.", category: "Game Theory & AI", lang: "Python" },
  { name: "Fictitious Play", repo: "fictitious-play", desc: "Fictitious Play learning dynamics — classical, smooth, convergence analysis, simplex trajectory visualization.", category: "Game Theory & AI", lang: "Python" },
  { name: "AlphaZero Engine", repo: "alphazero-engine", desc: "AlphaZero algorithm — self-play reinforcement learning with neural-guided MCTS for board games.", category: "Game Theory & AI", lang: "Python" },
  { name: "Chain Reaction", repo: "chain-reaction", desc: "Chain Reaction Multi-Agent AI Platform — game engine, 5 AI agents (including AlphaZero-style Neural MCTS), tournament system.", category: "Game Theory & AI", lang: "Python" },
  { name: "Multi-Agent RL", repo: "multi-agent-rl", desc: "Multi-agent reinforcement learning — independent learners, MAPPO, communication channels, emergent cooperation.", category: "Game Theory & AI", lang: "Python" },
  { name: "POMCP Neural Search", repo: "pomcp-neural-search", desc: "POMCP with neural heuristics — planning in partially observable environments with learned rollout policies.", category: "Game Theory & AI", lang: "Python" },
  { name: "ISMCTS", repo: "ismcts", desc: "Information Set MCTS for imperfect-information games — determinized search, SO-ISMCTS, strategy fusion.", category: "Game Theory & AI", lang: "Python" },
  { name: "Bayesian Opponent Modeling", repo: "bayesian-opponent-modeling", desc: "Bayesian opponent modeling — type inference, adaptive best response, level-k thinking, Thompson sampling.", category: "Game Theory & AI", lang: "Python" },
  { name: "Distributed Self-Play", repo: "distributed-self-play", desc: "Scalable distributed self-play training — actor-learner architecture, Redis communication, model versioning.", category: "Game Theory & AI", lang: "Python" },
  { name: "LLM Adversarial Arena", repo: "llm-adversarial-arena", desc: "Pit LLMs against each other in structured adversarial games — debate, negotiation, bluffing, with ELO ratings.", category: "Game Theory & AI", lang: "Python" },
  { name: "Multiplayer Strategy", repo: "multiplayer-strategy", desc: "Web-based multiplayer strategy games — Colonel Blotto, Public Goods Game, Prisoner's Dilemma tournament.", category: "Game Theory & AI", lang: "Python" },

  // ── Debate ───────────────────────────────────────────
  { name: "Veritas Ledger", repo: "veritas-ledger", desc: "Keyboard-native BP debate flowing app — track arguments, clashes, drops, and prep speeches in real-time.", category: "Debate", lang: "TypeScript" },
  { name: "Debate Flow Analyzer", repo: "debate-flow-analyzer", desc: "AI-powered debate analysis — argument extraction, flow sheet generation, dropped argument detection.", category: "Debate", lang: "Python" },
  { name: "Tournament System", repo: "tournament-system", desc: "Tournament management platform — Swiss pairing, Round Robin, British Parliamentary tabulation, judge allocation.", category: "Debate", lang: "Python" },
  { name: "Double Blind Review", repo: "double-blind-review", desc: "Anonymized evaluation platform — double-blind review with structured rubrics, calibration, score aggregation.", category: "Debate", lang: "Python" },
  { name: "BP Break Calculator", repo: "bp-break-calculator", desc: "Break calculation tool for British Parliamentary debate tournaments.", category: "Debate", lang: "Python" },
];
