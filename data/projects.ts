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
  { name: "Market Making Game", repo: "market-making-game", desc: "quote spreads, manage inventory, learn why adverse selection eats your P&L", category: "Finance", lang: "Python" },
  { name: "Limit Order Book", repo: "limit-order-book", desc: "price-time priority matching engine, Avellaneda-Stoikov market making, microstructure analytics", category: "Finance", lang: "Python" },
  { name: "Options Pricing Trainer", repo: "options-pricing-trainer", desc: "learn options pricing by actually doing it. Black-Scholes, binomial trees, Greeks, delta hedging", category: "Finance", lang: "Python" },
  { name: "Put-Call Parity", repo: "put-call-parity", desc: "interactive quiz game for options pricing. hover the formulas if you forget them", category: "Finance", lang: "JavaScript" },
  { name: "Alpha Engine", repo: "alpha-engine", desc: "proprietary alpha signal research and systematic strategy development. the stuff that doesn't go on GitHub.", category: "Finance", lang: "TypeScript", private: true },

  // ── Economics & Mechanism Design ─────────────────────
  { name: "Arrow-Debreu Equilibrium", repo: "arrow-debreu-equilibrium", desc: "find the price vector where every market clears at once. two nobel prizes say this matters", category: "Economics & Mechanism Design", lang: "Python" },
  { name: "Signaling Game", repo: "signaling-game", desc: "why peacocks have absurd tails and people get degrees they don't need. spence, beer-quiche, PBE refinements", category: "Economics & Mechanism Design", lang: "Python" },
  { name: "Adverse Selection", repo: "adverse-selection", desc: "why your insurance has a deductible. screening, rothschild-stiglitz, no distortion at the top", category: "Economics & Mechanism Design", lang: "Python" },
  { name: "VCG Mechanism", repo: "vcg-mechanism", desc: "the mechanism design silver bullet. you pay your externality and lying can't help you", category: "Economics & Mechanism Design", lang: "Python" },
  { name: "Stable Matching", repo: "stable-matching", desc: "gale-shapley and the algorithm that earned shapley a nobel. matches residents to hospitals without drama", category: "Economics & Mechanism Design", lang: "Python" },
  { name: "Rubinstein Bargaining", repo: "rubinstein-bargaining", desc: "two players, a pie, and the ticking clock of impatience. SPE, outside options, nash bargaining", category: "Economics & Mechanism Design", lang: "Python" },
  { name: "Combinatorial Auction", repo: "combinatorial-auction", desc: "bidders want bundles not items. NP-hard winner determination, VCG payments, core pricing", category: "Economics & Mechanism Design", lang: "Python" },

  // ── Game Theory & AI ─────────────────────────────────
  { name: "Nash & Correlated Equilibrium", repo: "nash-correlated-equilibrium", desc: "give it a payoff matrix, it finds every equilibrium worth finding", category: "Game Theory & AI", lang: "Python" },
  { name: "Poker CFR Solver", repo: "poker-cfr-solver", desc: "the algorithm that solved poker, written from scratch. play yourself a million times and converge to nash", category: "Game Theory & AI", lang: "Python" },
  { name: "Extensive Form Solver", repo: "extensive-form-solver", desc: "game trees, backward induction, and sequence-form LPs for when normal form is too expensive", category: "Game Theory & AI", lang: "Python" },
  { name: "Stackelberg Solver", repo: "stackelberg-solver", desc: "commit first, steer the follower's response. the math behind airport security resource allocation", category: "Game Theory & AI", lang: "Python" },
  { name: "Mean Field Game Solver", repo: "mean-field-game-solver", desc: "a million agents optimizing at once is impossible so you solve the PDE system instead", category: "Game Theory & AI", lang: "Python" },
  { name: "Replicator Dynamics", repo: "replicator-dynamics", desc: "populations of strategies competing on the simplex. watch them coexist or drive each other extinct", category: "Game Theory & AI", lang: "Python" },
  { name: "Fictitious Play", repo: "fictitious-play", desc: "the oldest learning algorithm in game theory. beautifully naive and it somehow usually works", category: "Game Theory & AI", lang: "Python" },
  { name: "AlphaZero Engine", repo: "alphazero-engine", desc: "alphazero from scratch. start from random play, bootstrap your way to superhuman. no human games needed", category: "Game Theory & AI", lang: "Python" },
  { name: "Chain Reaction", repo: "chain-reaction", desc: "5 AI agents learning to set off chain explosions on a board game. the neural one wins, obviously", category: "Game Theory & AI", lang: "Python" },
  { name: "Multi-Agent RL", repo: "multi-agent-rl", desc: "what happens when multiple RL agents share an environment and won't stop messing with each other", category: "Game Theory & AI", lang: "Python" },
  { name: "POMCP Neural Search", repo: "pomcp-neural-search", desc: "planning when you can't see the full state. POMCP + neural nets for POMDPs", category: "Game Theory & AI", lang: "Python" },
  { name: "ISMCTS", repo: "ismcts", desc: "MCTS but you can't see your opponent's cards. determinization, strategy fusion, the whole headache", category: "Game Theory & AI", lang: "Python" },
  { name: "Bayesian Opponent Modeling", repo: "bayesian-opponent-modeling", desc: "figure out what your opponent is doing and exploit it. bayes rule + thompson sampling", category: "Game Theory & AI", lang: "Python" },
  { name: "Distributed Self-Play", repo: "distributed-self-play", desc: "actors generate games on CPUs, a single GPU learner trains on the stream. alphazero infra, simplified", category: "Game Theory & AI", lang: "Python" },
  { name: "LLM Adversarial Arena", repo: "llm-adversarial-arena", desc: "LLMs debating, negotiating, and bluffing against each other. they're terrible at bluffing btw", category: "Game Theory & AI", lang: "Python" },
  { name: "Multiplayer Strategy", repo: "multiplayer-strategy", desc: "colonel blotto, public goods, prisoner's dilemma -- playable in the browser against real humans or bots", category: "Game Theory & AI", lang: "Python" },

  // ── Debate ───────────────────────────────────────────
  { name: "Veritas Ledger", repo: "veritas-ledger", desc: "keyboard-native BP debate flowing app. track arguments, clashes, and drops in real-time", category: "Debate", lang: "TypeScript" },
  { name: "Debate Flow Analyzer", repo: "debate-flow-analyzer", desc: "AI extracts arguments from debate speeches, builds flow sheets, and catches the drops you missed", category: "Debate", lang: "Python" },
  { name: "Tournament System", repo: "tournament-system", desc: "runs Swiss, Round Robin, and BP tournaments. handles pairing, rooms, and judge allocation", category: "Debate", lang: "Python" },
  { name: "Double Blind Review", repo: "double-blind-review", desc: "anonymized peer review with structured rubrics and Krippendorff's alpha for inter-rater reliability", category: "Debate", lang: "Python" },
  { name: "BP Break Calculator", repo: "bp-break-calculator", desc: "monte carlo sim for BP debate break odds. scrapes tabbycat live or takes a CSV", category: "Debate", lang: "Python" },
];
