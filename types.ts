export type TTestimonial = {
  id: string;
  position: string;
  name: string;
  company: string;
  message: string | React.ReactElement;
  linkedIn: string;
  avatar: string;
  website?: string;
  company_logo: string;
  company_url: string;
};

export type TTimelineEntry = {
  yearStart: number;
  yearEnd?: number;
  title: string;
  description: string;
};

export type TProgrammingLanguage = {
  name: string;
  icon: string;
};

export type TTechStack = {
  name: string;
  icon: string;
};
