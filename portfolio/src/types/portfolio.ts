export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  [key: string]: string | undefined;
}

export interface HeroData {
  name: string;
  role: string;
  tagline: string;
  social: SocialLinks;
}

export interface AboutData {
  description: string;
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface ExperienceData {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface AchievementData {
  id: string;
  title: string;
  date: string;
  description: string;
}

export interface PortfolioData {
  hero: HeroData;
  about: AboutData;
  projects: ProjectData[];
  experience: ExperienceData[];
  achievements: AchievementData[];
}
