export interface HeroData {
  name: string;
  title: string;
  avatar: string;
  description: string;
}

export interface ContactData {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

export interface AboutData {
  summary: string;
}

export interface ExperienceData {
  role: string;
  company: string;
  duration: string;
  details: string[];
}

export interface ProjectData {
  title: string;
  description: string;
  tech: string[];
  link: string;
  image: string;
}

export interface AchievementData {
  title: string;
  image: string;
}

export interface PortfolioData {
  hero: HeroData;
  contact: ContactData;
  about: AboutData;
  skills: string[];
  experience: ExperienceData[];
  projects: ProjectData[];
  achievements: AchievementData[];
}
