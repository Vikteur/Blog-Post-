// Domain models that represent the core business entities
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  topic: string;
  author: string;
  authorId?: string;
  image?: string;
}
export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
}
export interface Skill {
  name: string;
  level: number;
  category: 'language' | 'framework' | 'tool' | 'other';
}
export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  url?: string;
}
export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
}
export interface ProfileInfo {
  id: string;
  name: string;
  title: string;
  email: string;
  location: string;
  birthDate: string;
  about: string;
  avatar: string;
  skills: Skill[];
  workExperience: WorkExperience[];
  projects: Project[];
  certificates: Certificate[];
}