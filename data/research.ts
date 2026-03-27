export interface Research {
  institution: string;
  department: string;
  logo: string;
  role: string;
  advisor: string;
  location: string;
  year: string;
  bullets: string[];
  accentColor: string;
}

export const research: Research[] = [
  {
    institution: "USC",
    department: "Mathematics Department",
    logo: "/assets/USC.png",
    role: "Undergraduate Researcher",
    advisor: "Zixiang Zhou",
    location: "Los Angeles, CA",
    year: "2025",
    bullets: [
      "Investigated the Spielman-Teng Conjecture in Singular Value Decomposition (SVD)",
      "Applied Random Matrix Theory to analyze high-dimensional noise filtration in machine learning datasets",
    ],
    accentColor: "#6e8efb",
  },
  {
    institution: "USC",
    department: "Marshall School of Business",
    logo: "/assets/USC.jpg",
    role: "Research Assistant",
    advisor: "Rodney Ramcharan",
    location: "Los Angeles, CA",
    year: "2024",
    bullets: [
      "Applied convex optimization techniques to multi-dimensional dynamic policy systems",
      "Engineered propensity score matching (PSM) algorithms to estimate causal impact of social policies across 120 districts",
    ],
    accentColor: "#a78bfa",
  },
  {
    institution: "USC",
    department: "Mathematics Department",
    logo: "/assets/USC.png",
    role: "Undergraduate Researcher",
    advisor: "Yunjie Fan",
    location: "Los Angeles, CA",
    year: "2024",
    bullets: [
      "Developed measure-theoretic frameworks for stochastic control problems",
      "Focused on optimization in Markov Decision Processes (MDPs) under uncertainty",
    ],
    accentColor: "#fb7185",
  },
  {
    institution: "UC Berkeley",
    department: "Haas School of Business",
    logo: "/assets/berkeley.jpeg",
    role: "Research Assistant",
    advisor: "Ganesh Iyer",
    location: "Berkeley, CA (Remote)",
    year: "2021 — 2022",
    bullets: [
      "Studied Behavioral Economics and Utility Theory applications in public health messaging",
      "Modeled decision-making processes to combat vaccine hesitancy using game-theoretic incentives",
    ],
    accentColor: "#4ade80",
  },
];
