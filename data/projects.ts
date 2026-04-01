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
  { name: "Market Making Game", repo: "market-making-game", desc: "interactive market-making simulator built on the Glosten-Milgrom model. quote spreads, manage inventory, learn about adverse selection.", category: "Finance", lang: "Python" },
  { name: "Limit Order Book", repo: "limit-order-book", desc: "limit order book simulator with price-time priority matching, Avellaneda-Stoikov market making, and microstructure analytics.", category: "Finance", lang: "Python" },
  { name: "Options Pricing Trainer", repo: "options-pricing-trainer", desc: "learn options pricing by doing — Black-Scholes, binomial trees, Monte Carlo, and the Greeks, all interactive.", category: "Finance", lang: "Python" },
  { name: "Put-Call Parity", repo: "put-call-parity", desc: "put-call parity visualized. spot the arbitrage before the market does.", category: "Finance", lang: "JavaScript" },
  { name: "Alpha Engine", repo: "alpha-engine", desc: "proprietary alpha signal research and systematic strategy development. the stuff that doesn't go on GitHub.", category: "Finance", lang: "TypeScript", private: true },

  // ── Economics & Mechanism Design ─────────────────────
  { name: "Arrow-Debreu Equilibrium", repo: "arrow-debreu-equilibrium", desc: "computing walrasian equilibria in exchange economies. the kind of thing that won arrow and debreu a nobel prize.", category: "Economics & Mechanism Design", lang: "Python" },
  { name: "Signaling Game", repo: "signaling-game", desc: "signaling game analyzer — Spence job market, Crawford-Sobel cheap talk, Beer-Quiche. separating vs pooling, solved.", category: "Economics & Mechanism Design", lang: "Python" },
  { name: "Adverse Selection", repo: "adverse-selection", desc: "principal-agent screening under adverse selection. optimal contracts, Rothschild-Stiglitz insurance, the lemons problem formalized.", category: "Economics & Mechanism Design", lang: "Python" },
  { name: "VCG Mechanism", repo: "vcg-mechanism", desc: "the vickrey-clarke-groves mechanism — the closest thing mechanism design has to a silver bullet. truthful, efficient, elegant.", category: "Economics & Mechanism Design", lang: "Python" },
  { name: "Stable Matching", repo: "stable-matching", desc: "gale-shapley and friends. the algorithm that matches residents to hospitals and earned shapley a nobel prize.", category: "Economics & Mechanism Design", lang: "Python" },
  { name: "Rubinstein Bargaining", repo: "rubinstein-bargaining", desc: "rubinstein's alternating-offers model. turns out patience is a bargaining weapon — this proves it formally.", category: "Economics & Mechanism Design", lang: "Python" },
  { name: "Combinatorial Auction", repo: "combinatorial-auction", desc: "combinatorial auction simulator — winner determination via ILP, VCG payments, core pricing. how the FCC sells spectrum.", category: "Economics & Mechanism Design", lang: "Python" },

  // ── Game Theory & AI ─────────────────────────────────
  { name: "Nash & Correlated Equilibrium", repo: "nash-correlated-equilibrium", desc: "compute nash equilibria and correlated equilibria for any normal-form game. the fundamental solution concepts.", category: "Game Theory & AI", lang: "Python" },
  { name: "Poker CFR Solver", repo: "poker-cfr-solver", desc: "counterfactual regret minimization for poker. the algorithm that solved heads-up limit hold'em and powers every modern poker AI.", category: "Game Theory & AI", lang: "Python" },
  { name: "Extensive Form Solver", repo: "extensive-form-solver", desc: "represent, analyze, and solve extensive-form games. game trees, backward induction, sequence-form LPs.", category: "Game Theory & AI", lang: "Python" },
  { name: "Stackelberg Solver", repo: "stackelberg-solver", desc: "compute stackelberg equilibria in sequential games. the math behind airport security and every leader-follower problem.", category: "Game Theory & AI", lang: "Python" },
  { name: "Mean Field Game Solver", repo: "mean-field-game-solver", desc: "solve mean field game systems — coupled HJB-FP PDEs for when you have a million agents and can't track them all.", category: "Game Theory & AI", lang: "Python" },
  { name: "Replicator Dynamics", repo: "replicator-dynamics", desc: "evolutionary game dynamics on the simplex. replicator equations, ESS analysis, Moran process — natural selection as a dynamical system.", category: "Game Theory & AI", lang: "Python" },
  { name: "Fictitious Play", repo: "fictitious-play", desc: "fictitious play learning dynamics. agents that best-respond to history — simple, old, and still surprisingly powerful.", category: "Game Theory & AI", lang: "Python" },
  { name: "AlphaZero Engine", repo: "alphazero-engine", desc: "the alphazero algorithm from scratch. self-play reinforcement learning with neural-guided MCTS for board games.", category: "Game Theory & AI", lang: "Python" },
  { name: "Chain Reaction", repo: "chain-reaction", desc: "multi-agent AI platform for chain reaction. 5 AI agents, a tournament system, and an RL training pipeline.", category: "Game Theory & AI", lang: "Python" },
  { name: "Multi-Agent RL", repo: "multi-agent-rl", desc: "multi-agent reinforcement learning — independent learners, MAPPO, communication channels. watch cooperation emerge from self-interest.", category: "Game Theory & AI", lang: "Python" },
  { name: "POMCP Neural Search", repo: "pomcp-neural-search", desc: "POMCP with neural heuristics. planning when you can't see the full state — learned rollout policies for partially observable worlds.", category: "Game Theory & AI", lang: "Python" },
  { name: "ISMCTS", repo: "ismcts", desc: "information set MCTS for imperfect-information games. determinized search and strategy fusion — play well without knowing what cards they hold.", category: "Game Theory & AI", lang: "Python" },
  { name: "Bayesian Opponent Modeling", repo: "bayesian-opponent-modeling", desc: "bayesian opponent modeling — infer their type, adapt your strategy, think one level deeper than they do.", category: "Game Theory & AI", lang: "Python" },
  { name: "Distributed Self-Play", repo: "distributed-self-play", desc: "scalable distributed self-play training. actor-learner architecture so your agents can get smarter in parallel.", category: "Game Theory & AI", lang: "Python" },
  { name: "LLM Adversarial Arena", repo: "llm-adversarial-arena", desc: "pit language models against each other in structured adversarial games. debate, negotiation, bluffing — with ELO ratings.", category: "Game Theory & AI", lang: "Python" },
  { name: "Multiplayer Strategy", repo: "multiplayer-strategy", desc: "web-based multiplayer strategy games — Colonel Blotto, Public Goods, Prisoner's Dilemma. play the classics against real opponents.", category: "Game Theory & AI", lang: "Python" },

  // ── Debate ───────────────────────────────────────────
  { name: "Veritas Ledger", repo: "veritas-ledger", desc: "keyboard-native BP debate flowing app. track arguments, clashes, and drops in real-time without touching the mouse.", category: "Debate", lang: "TypeScript" },
  { name: "Debate Flow Analyzer", repo: "debate-flow-analyzer", desc: "AI-powered debate analysis — feed it a round, get back structured flows and every dropped argument highlighted.", category: "Debate", lang: "Python" },
  { name: "Tournament System", repo: "tournament-system", desc: "tournament management for British Parliamentary. Swiss pairing, tab generation, judge allocation — the whole pipeline.", category: "Debate", lang: "Python" },
  { name: "Double Blind Review", repo: "double-blind-review", desc: "anonymized evaluation platform. double-blind review with structured rubrics and calibrated scoring — bias doesn't stand a chance.", category: "Debate", lang: "Python" },
  { name: "BP Break Calculator", repo: "bp-break-calculator", desc: "break calculator for BP tournaments. plug in the tab, find out who's through.", category: "Debate", lang: "Python" },
];
