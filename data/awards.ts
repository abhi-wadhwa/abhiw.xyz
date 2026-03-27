export interface Award {
  title: string;
  organization: string;
  detail?: string;
  year?: string;
}

export interface AwardsData {
  debate: {
    collegiate: Award[];
    highSchool: Award[];
  };
  mathematics: Award[];
  scholarships: Award[];
}

export const awards: AwardsData = {
  debate: {
    collegiate: [
      { title: "USUDC Quarterfinalist", organization: "United States Universities Debating Championship", year: "2025" },
      { title: "UC Berkeley IV — 7th Breaking Team & Semifinalist", organization: "UC Berkeley Intervarsity", year: "2025" },
      { title: "UC Berkeley IV — 15th Speaker", organization: "UC Berkeley Intervarsity", year: "2025" },
      { title: "NAUDC Novice 5th Break & Finalist", organization: "North American Universities Debating Championship", year: "2024" },
      { title: "Hart House IV — 2nd Novice Team & Semifinalist", organization: "Hart House Intervarsity", year: "2024" },
      { title: "UC Berkeley IV — 10th Novice Speaker", organization: "UC Berkeley Intervarsity", year: "2024" },
      { title: "USC IV — 3rd Novice Team & Finalist", organization: "USC Intervarsity", year: "2024" },
    ],
    highSchool: [
      { title: "WSDA Finalist", organization: "World Schools Debate Academy", year: "2020" },
      { title: "Team UAE Debate — 2x Development Team", organization: "World Schools Debate Championships", year: "2020–21" },
      { title: "UAE National Gulf Debates — Winner", organization: "Gulf Debates UAE", year: "2019" },
    ],
  },
  mathematics: [
    { title: "2x BMO Distinction + Qualifier", organization: "British Mathematical Olympiad", year: "2022–23" },
    { title: "USAMO Qualifier", organization: "USA Mathematical Olympiad", year: "2022" },
    { title: "2x AIME Qualifier", organization: "American Invitational Mathematical Examination", year: "2022–23" },
    { title: "5x UKMT Gold Medal + Best in School", organization: "United Kingdom Mathematical Trust", year: "2017–23" },
    { title: "UKMT Intermediate Olympiad Medalist", organization: "United Kingdom Mathematical Trust", year: "2022" },
  ],
  scholarships: [
    { title: "Dean's Scholarship ($70k Merit)", organization: "University of Southern California", year: "2023–" },
    { title: "GEMS Academic Scholarship ($10k Merit)", organization: "GEMS Education", year: "2023–24" },
    { title: "Dean's List (Every Semester)", organization: "University of Southern California", year: "2023–25" },
    { title: "JHU Study of Exceptional Talent", organization: "Johns Hopkins University", year: "2019" },
  ],
};
