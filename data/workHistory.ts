export interface Work {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  skills: string[];
}

export const workHistory: Work[] = [
  {
    title: "Quality Assurance Agent",
    company: "BYU-Pathway Worldwide - Springboard",
    startDate: "September 2025",
    endDate: "February 2026",
    description: [
      "Validate Academic Exception cases to ensure deadline accuracy, documentation completeness, and policy compliance.",
      "Review case documentation for correct deadlines, submission date, term alignment, and exception types.",
      "Ensure all templates, transcripts, and screenshots are properly added.",
      "Verify data across systems to ensure consistency and eliminate discrepancies.",
      "Send clear feedback to agents on what needs to be fixed or improved.",
      "Reviewed time-sensitive academic exception cases to ensure accurate processing within strict institutional deadlines.",
    ].join(" "),
    skills: [
      "Quality assurance",
      "Policy compliance",
      "Documentation review",
      "Data verification",
      "Feedback communication",
    ],
  },
  {
    title: "Transcript Agent",
    company: "BYU-Pathway Worldwide - Springboard",
    startDate: "April 2025",
    endDate: "September 2025",
    description: [
      "Ensure official transcripts are accurately sequenced in accordance with the unofficial transcripts.",
      "Verify that all transcript information aligns with official school records.",
      "Scrutinize transcripts for discrepancies, inconsistencies, or missing data.",
      "Maintain up-to-date documentation of transcript reviews and status reports.",
      "Handle confidential academic records with discretion and in compliance with data protection policies.",
    ].join(" "),
    skills: [
      "Transcript verification",
      "Records accuracy",
      "Confidential data handling",
      "Documentation",
      "Attention to detail",
    ],
  },
  {
    title: "Media Relations Specialist Intern",
    company: "SolaceVR",
    startDate: "November 2024",
    endDate: "August 2025",
    description: [
      "Conduct research to identify blogs, podcasts, digital publications, and other media outlets that focus on spirituality and technology.",
      "Assist in drafting outreach emails to influencers, media contacts, and content providers.",
      "Manage and update media outreach tracking spreadsheets and databases.",
      "Monitor social media and online channels for relevant conversations and mentions.",
      "Develop supporting materials such as presentations, media kits, and pitch documents.",
    ].join(" "),
    skills: [
      "Media research",
      "Outreach copywriting",
      "Spreadsheet / database management",
      "Social listening",
      "Pitch deck development",
    ],
  },
  {
    title: "Indexer / Data Entry Clerk",
    company: "Family Search Contributor (Bloom and Crescendo / Global Managed Services / Springboard)",
    startDate: "February 2024",
    endDate: "February 2025",
    description: [
      "Curate and transcribe information from over 2000 historical documents to enable others to search for their ancestors.",
      "Help others learn about their ancestors by comparing and attaching records gotten from historical documents to Family.",
      "Work and learn collaboratively as part of a team to meet the company's target.",
      "Participated in a work-study program, enhancing technical proficiency and job readiness by 40%.",
    ].join(" "),
    skills: [
      "Historical document transcription",
      "Genealogical research",
      "Data entry",
      "Team collaboration",
      "Work-study program",
    ],
  },
];
