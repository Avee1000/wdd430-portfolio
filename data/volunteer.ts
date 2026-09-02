export interface Volunteer {
  id: string;
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  skills: string[];
}

export const volunteerWork: Volunteer[] = [
  {
    id: "software-developer",
    title: "Web Developer and Designer",
    organization: "Power Changes Lives",
    location: "Morris Plains, New Jersey",
    startDate: "2024",
    endDate: "2025",
    description: [
      "Contributed to the web development and design department for an organization dedicated to aiding underserved communities and creating sustainable futures.",
      "Collaborated remotely with a diverse team on website overhaul projects, including the maintenance and development of company digital assets.",
      "Participated in strategic planning and team meetings to align project milestones with the organization's mission-focused goals.",
      "Managed technical tasks independently, including setting up collaborative Microsoft environments and ensuring consistent communication within the team via Teams and email.",
      "Developed fluency in intercultural communication by serving diverse populations and learning local customs across West Africa.",
    ],
    skills: [
      "Web development",
      "Web design",
      "Team collaboration",
      "Strategic planning",
      "Remote project management",
      "Interpersonal communication"
    ]
  },
  {
    id: "lds-missionary",
    title: "Full-Time Missionary",
    organization: "The Church of Jesus Christ of Latter-day Saints",
    location: "Ghana, Accra West & Nigeria, Enugu",
    startDate: "2020",
    endDate: "2022",
    description: [
      "Served a two-year full-time mission across Ghana and Nigeria, dedicating daily effort to community service and faith-based outreach.",
      "Taught gospel lessons to local families and provided practical support to those in need.",
      "Organized collaborative service projects that brought volunteers together to benefit under-served communities in multiple cities.",
      "Managed personal finances and logistics independently while adhering to a strict code of conduct and schedule.",
      "Developed fluency in intercultural communication by serving diverse populations and learning local customs across West Africa.",
    ],
    skills: [
      "Community service",
      "Faith-based outreach",
      "Communication",
      "Team leadership",
      "Team collaboration",
      "Planning",
    ],
  },
];
