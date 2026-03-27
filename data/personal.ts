export interface Interest {
  title: string;
  body: string;
  references: { title: string; author: string }[];
}

export interface PhilosophyPosition {
  topic: string;
  position: string;
}

export interface PersonalData {
  bio: string[];
  pronunciation: string;
  background: string;
  astrology: string;
  interests: Interest[];
  philosophy: PhilosophyPosition[];
}

export const personalData: PersonalData = {
  bio: [
    "My actual name is Abhimanyu (after the Mahabharat Character) but I anglicized it to Abhi after too many people couldn't pronounce it.",
    "I was born in Richmond, VA, to two first generation immigrants from India. I moved to Mumbai, India, when I was 5, to live closer to family. I later moved to Dubai, UAE, when I was 8, and my family has been based there since.",
    "I was born July 21st, and my Big Three are Cancer (Sun), Aquarius (Moon), and Capricorn (Rising).",
  ],
  pronunciation: "uh-bhi-MUN-yoo",
  background: "Born in Richmond, VA → Mumbai at 5 → Dubai at 8 → USC",
  astrology: "Cancer Sun · Aquarius Moon · Capricorn Rising",
  interests: [
    {
      title: "Provision of Public Goods",
      body: "I've long believed that certain basic necessities — particularly education and healthcare — should be universally accessible. Yet our current systems face significant structural and political challenges that undermine this goal. What policy design can we use to make these programs legitimate and free of fraud, such that we're not losing money every year? I'm particularly interested in exploring models that have succeeded internationally and understanding what makes public provision politically sustainable.",
      references: [
        { title: "The Healing of America", author: "T.R. Reid" },
        { title: "Why Nations Fail", author: "Daron Acemoglu & James Robinson" },
      ],
    },
    {
      title: "Democratic Backsliding & Institutional Trust",
      body: "The erosion of public confidence in institutions represents one of the defining characteristics of the modern political landscape, and is the cause I perceive for large scale populism growth around the world. I'm drawn to works that explore the disconnect between elite institutions and ordinary citizens. How can institutions become more inclusive and representative in a way that they're not wholly rejected?",
      references: [
        { title: "How Democracies Die", author: "Steven Levitsky & Daniel Ziblatt" },
        { title: "Political Tribes", author: "Amy Chua" },
        { title: "Strangers in Their Own Land", author: "Arlie Hochschild" },
      ],
    },
    {
      title: "Economic Development",
      body: "Growing up visiting my family in India, I've experienced firsthand the cognitive dissonance of extreme poverty persisting alongside rapid growth and wealth. While economic development is complex, emerging evidence from randomized controlled trials and direct cash transfer programs suggests direct aid may be more effective than traditionally assumed. I'm drawn to the rigorous, evidence-based approach of the Effective Altruism movement.",
      references: [
        { title: "Poor Economics", author: "Abhijit Banerjee & Esther Duflo" },
        { title: "Doing Good Better", author: "William MacAskill" },
      ],
    },
  ],
  philosophy: [
    { topic: "Morals", position: "Moral intuitionism — moral facts are first principles known through intuition, not constructed by theory or convention." },
    { topic: "Epistemology", position: "Broadly realist and permissive — knowledge does not require explicit justification; testimony counts as a basic source of belief." },
    { topic: "Metaphysics", position: "Realist — numbers are real entities, personal identity grounded in psychological continuity, especially memory." },
    { topic: "Mind", position: "Rejects reductive physicalism — mental states are not exhausted by physical description, even if they depend on physical substrates." },
    { topic: "Language", position: "Meaning grounded in speaker intent rather than communal use alone — words mean what agents aim to convey." },
    { topic: "Mathematics & Probability", position: "Mathematical realist and Bayesian — mathematical truths exist independently; uncertainty reflects degrees of belief, not frequencies alone." },
  ],
};
