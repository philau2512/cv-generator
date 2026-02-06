export interface CVData {
  personalInfo: PersonalInfo;
  objective: string;
  education: Education[];
  skills: string;
  experience: Experience[];
  projects: Project[];
  achievements: Achievement[];
  interests: string;
  settings: CVSettings;
  sectionOrder: string[];
  hiddenSections: string[];
}

export interface CVSettings {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  primaryColor: string;
}

export const DEFAULT_SETTINGS: CVSettings = {
  fontFamily: "Inter",
  fontSize: 14,
  lineHeight: 1.5,
  primaryColor: "#1e40af", // blue-800
};

export const FONT_OPTIONS = [
  { name: "Inter", value: "Inter, sans-serif" },
  { name: "Roboto", value: "Roboto, sans-serif" },
  { name: "Open Sans", value: "'Open Sans', sans-serif" },
  { name: "Lato", value: "Lato, sans-serif" },
  { name: "Merriweather", value: "Merriweather, serif" },
  { name: "Times New Roman", value: "'Times New Roman', serif" },
];

export const DEFAULT_SECTION_ORDER = [
  "objective",
  "education",
  "skills",
  "experience",
  "projects",
  "achievements",
  "interests",
];

export interface PersonalInfo {
  fullName: string;
  title: string;
  avatar?: string;
  address: string;
  phone: string;
  birthDate: string;
  email: string;
  github: string;
}

export interface Education {
  school: string;
  major: string;
  duration: string;
  description: string;
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  project: string;
  description: string;
}

export interface Project {
  name: string;
  description: string;
}

export interface Achievement {
  title: string;
  date: string;
}
