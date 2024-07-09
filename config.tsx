import {
  TCard,
  TProgrammingLanguage,
  TBreakpointSize,
  TTechStack,
  TTestimonial,
  TTimelineEntry,
} from "@/types";

export const TESTIMONIALS: TTestimonial[] = [
  {
    id: "2ecfefd2-3dcc-568a-af3a-11ec4298b9c3",
    position: "Co-founder",
    name: "Che Hodgins",
    company: "MySeat Media",
    message: (
      <>
        Talented developer with a <span>keen eye for design</span>. Always a
        pleasure to work with!
      </>
    ),
    linkedIn: "https://www.linkedin.com/in/chehodgins/",
    avatar: "/testimonials/che.png",
    company_logo: "/testimonials/myseat-logo.jpg",
    company_url: "https://myseatmedia.com/",
  },
  {
    id: "2bff25d4-cb71-5527-b62d-b58b48cd6b7e",
    position: "CEO & Co-founder",
    name: "Matt Boerum",
    company: "Audible Reality",
    message: (
      <>
        Vlad&apos;s skills and passion make him an{" "}
        <span>invaluable asset to any team</span>.
      </>
    ),
    linkedIn: "https://www.linkedin.com/in/mattboerum/",
    website: "https://www.mattboerum.com/",
    avatar: "/testimonials/matt.png",
    company_logo: "/testimonials/ar-logo.jpg",
    company_url: "https://audiblereality.com/",
  },
  {
    id: "519dacea-e3f8-5b0f-85be-af7b00b862e2",
    position: "IP Development",
    name: "Bryan Martin",
    company: "HisTurn Fertility",
    message: (
      <>
        His attention to detail and <span>dedication to success</span> are
        unmatched!
      </>
    ),
    linkedIn: "https://www.linkedin.com/in/bryan-martin-46a4294/",
    avatar: "/testimonials/bryan.png",
    company_logo: "/testimonials/histurn-logo.jpg",
    company_url: "https://histurnfertility.com/",
  },
  {
    id: "oij123o1232-e3f8-5b0f-85be-af7b00b862e2",
    position: "President",
    name: "Robert Dancik",
    company: "Reel in Motion",
    message: (
      <>
        Unwavering determination with <span>outstanding results</span>.
      </>
    ),
    linkedIn: "https://www.linkedin.com/in/robertdancik/",
    avatar: "/testimonials/robert.jpg",
    company_logo: "/testimonials/rim-logo.jpg",
    company_url: "https://reelinmotion.com/",
  },
];

export const TIMELINE: TTimelineEntry[] = [
  {
    yearStart: 2014,
    yearEnd: 2018,
    title: "McGill University",
    description: "Bachelor Degree",
  },
  {
    yearStart: 2014,
    yearEnd: 2023,
    title: "Audible Reality",
    description: "Founding Developer",
  },
  {
    yearStart: 2023,
    title: "MySeat Media",
    description: "Front-end Engineer",
  },
];

export const PROGRAMMING_LANGUAGES: TProgrammingLanguage[] = [
  {
    name: "TypeScript",
    icon: "/icons/ts.svg",
  },
  {
    name: "JavaScript",
    icon: "/icons/js.svg",
  },
  {
    name: "Python",
    icon: "/icons/python.svg",
  },
];

export const TECH_STACK: TTechStack[] = [
  {
    name: "NextJS",
    icon: "/icons/nextjs.svg",
  },
  {
    name: "React",
    icon: "/icons/react.svg",
  },
  {
    name: "TailwindCSS",
    icon: "/icons/tailwind.svg",
  },
  {
    name: "MobX",
    icon: "/icons/mobx.svg",
  },
  {
    name: "Express",
    icon: "/icons/express.svg",
  },
  {
    name: "MongoDB",
    icon: "/icons/mongodb.svg",
  },
];

export const ANIMATION_QUEUE: { [key in TBreakpointSize]: TCard[] } = {
  lg: [
    "location",
    "contact",
    "social",
    "testimonials",
    "languages",
    "experience",
    "project1",
    "timeline",
    "techstack",
    "project2",
  ],
  md: [
    "experience",
    "contact",
    "techstack",
    "project2",
    "timeline",
    "social",
    "location",
    "languages",
    "testimonials",
    "project1",
  ],
  sm: [
    "contact",
    "experience",
    "techstack",
    "project2",
    "timeline",
    "social",
    "project1",
    "location",
    "languages",
    "testimonials",
  ],
};