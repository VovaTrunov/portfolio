import {
  TProgrammingLanguage,
  TTechStack,
  TTestimonial,
  TTimelineEntry,
} from "@/types";

export const TESTIMONIALS: TTestimonial[] = [
  {
    id: "2ecfefd2-3dcc-568a-af3a-11ec4298b9c3",
    position: "Co-founder at MySeat Media",
    fullName: "Che Hodgins",
    message:
      "Volodymyr is a talented developer with a keen eye for design. He is a pleasure to work with and always goes above and beyond.",
    linkedIn: "https://www.linkedin.com/in/chehodgins/",
    avatar: "/testimonials/che.png",
  },
  {
    id: "2bff25d4-cb71-5527-b62d-b58b48cd6b7e",
    position: "CEO & Co-founder at Audible Reality",
    fullName: "Matt Boerum",
    message:
      "Vlad’s ability to come up with and later translate complex designs into a real web application are on point!",
    linkedIn: "https://www.linkedin.com/in/mattboerum/",
    website: "https://www.mattboerum.com/",
    avatar: "/testimonials/matt.png",
  },
  {
    id: "519dacea-e3f8-5b0f-85be-af7b00b862e2",
    position: "IP Development at HisTurn Fertility",
    fullName: "Bryan Martin",
    message:
      "Volodymyr's attention to detail and dedication to success are unmatched!",
    linkedIn: "https://www.linkedin.com/in/bryan-martin-46a4294/",
    avatar: "/testimonials/bryan.png",
  },
  {
    id: "oij123o1232-e3f8-5b0f-85be-af7b00b862e2",
    position: "CEO at Lumenalta",
    fullName: "Roy Terry",
    message:
      "Volodymyr's Id velit ad duis voluptate. Pariatur aliquip ex cillum est qui dolore. Qui tempor velit voluptate nisi tempor nulla tempor in nisi minim dolore.",
    linkedIn: "https://www.linkedin.com/in/bryan-martin-46a4294/",
    avatar: "/testimonials/bryan.png",
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
    name: "Tailwind",
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
