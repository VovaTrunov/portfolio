export type TTestimonial = {
  id: string;
  position: string;
  fullName: string;
  message: string;
  linkedIn: string;
  avatar: string;
  website?: string;
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
