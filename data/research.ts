export interface Research {
  title: string;
  symbol: string;
  institution: string;
  department: string;
  logo: string;
  advisor: string;
  location: string;
  year: string;
  narrative: string;
  tags: string[];
  accentColor: string;
}

export const research: Research[] = [
  {
    title: "Singular Value Decomposition & Random Matrix Theory",
    symbol: "λ_max",
    institution: "USC",
    department: "Mathematics Department",
    logo: "/assets/USC.png",
    advisor: "Zixiang Zhou",
    location: "Los Angeles, CA",
    year: "2025",
    narrative: "I investigated the Spielman-Teng Conjecture, which concerns the smoothed analysis of singular values — asking how the smallest singular value of a matrix behaves under small random perturbations. This connects directly to questions about numerical stability in large-scale computation. In parallel, I applied Random Matrix Theory to analyze high-dimensional noise filtration in machine learning datasets, exploring how eigenvalue distributions (specifically the Marchenko-Pastur law) can separate signal from noise in sample covariance matrices. The work sits at the intersection of pure linear algebra and practical ML applications.",
    tags: ["SVD", "Random Matrix Theory", "Spectral Analysis", "Marchenko-Pastur"],
    accentColor: "#1e52f3",
  },
  {
    title: "Convex Optimization in Dynamic Policy Systems",
    symbol: "∇f(x)",
    institution: "USC",
    department: "Marshall School of Business",
    logo: "/assets/USC.jpg",
    advisor: "Rodney Ramcharan",
    location: "Los Angeles, CA",
    year: "2024",
    narrative: "I applied convex optimization techniques to multi-dimensional dynamic policy systems, focusing on how governments allocate resources across competing objectives under constraints. A core part of the work involved engineering propensity score matching algorithms to estimate the causal impact of social policies across 120 districts — isolating treatment effects from confounding variables in observational data. The challenge was constructing valid counterfactuals in settings where randomized experiments aren't feasible, requiring careful attention to the overlap and balance conditions that make causal inference credible.",
    tags: ["Convex Optimization", "Causal Inference", "Propensity Score Matching", "Policy"],
    accentColor: "#1e52f3",
  },
  {
    title: "Measure-Theoretic Stochastic Control",
    symbol: "∫dμ",
    institution: "USC",
    department: "Mathematics Department",
    logo: "/assets/USC.png",
    advisor: "Yunjie Fan",
    location: "Los Angeles, CA",
    year: "2024",
    narrative: "I developed measure-theoretic frameworks for stochastic control problems, grounding the analysis in formal probability spaces rather than heuristic approximations. The focus was on optimization in Markov Decision Processes under uncertainty — where the transition dynamics and reward signals are noisy or partially observed. This required working with sigma-algebras, filtrations, and martingale theory to formalize what it means to make \"optimal\" decisions when the state space is continuous and the information structure is complex. The work has natural applications to reinforcement learning and finance.",
    tags: ["Stochastic Control", "Measure Theory", "MDPs", "Martingales"],
    accentColor: "#1e52f3",
  },
  {
    title: "Game-Theoretic Models of Vaccine Hesitancy",
    symbol: "E[U(x)]",
    institution: "UC Berkeley",
    department: "Haas School of Business",
    logo: "/assets/berkeley.jpeg",
    advisor: "Ganesh Iyer",
    location: "Berkeley, CA (Remote)",
    year: "2021 — 2022",
    narrative: "I studied how behavioral economics and utility theory apply to public health messaging — specifically modeling the decision-making processes that drive vaccine hesitancy. Using game-theoretic frameworks, I explored how individual incentive structures interact with herd immunity thresholds: when enough people perceive vaccination as costly (in time, risk, or trust), free-riding on others' immunity becomes a Nash equilibrium, even though universal vaccination is socially optimal. The work modeled these dynamics formally and explored mechanism design approaches to nudge populations toward the cooperative equilibrium.",
    tags: ["Game Theory", "Behavioral Economics", "Mechanism Design", "Public Health"],
    accentColor: "#1e52f3",
  },
];
