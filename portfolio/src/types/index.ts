export interface Hero {
    name: string;
    title: string;
    avatar: string;
    description: string;
}

export interface Contact {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
}

export interface About {
    summary: string;
}

export interface Experience {
    role: string;
    company: string;
    duration: string;
    details: string[];
}

export interface Project {
    title: string;
    description: string;
    tech: string[];
    link: string;
    image: string;
}

export interface Achievement {
    title: string;
    image: string;
}

export interface PortfolioData {
    hero: Hero;
    contact: Contact;
    about: About;
    skills: string[];
    experience: Experience[];
    projects: Project[];
    achievements: Achievement[];
}
