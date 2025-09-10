import { ProfileInfo } from '../types';
import { IProfileService } from './interfaces';
// Mock profile data
const mockProfile: ProfileInfo = {
  id: '1',
  name: 'John Doe',
  title: 'Senior Software Developer',
  email: 'john.doe@example.com',
  location: 'San Francisco, CA',
  birthDate: 'January 15, 1990',
  about: "I'm a passionate software developer with over 8 years of experience building web applications and services. I enjoy solving complex problems and learning new technologies. When I'm not coding, you can find me hiking or reading about the latest tech trends.",
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  skills: [{
    name: 'JavaScript',
    level: 95,
    category: 'language'
  }, {
    name: 'TypeScript',
    level: 90,
    category: 'language'
  }, {
    name: 'Python',
    level: 80,
    category: 'language'
  }, {
    name: 'Java',
    level: 75,
    category: 'language'
  }, {
    name: 'HTML/CSS',
    level: 95,
    category: 'language'
  }, {
    name: 'React',
    level: 90,
    category: 'framework'
  }, {
    name: 'Node.js',
    level: 85,
    category: 'framework'
  }, {
    name: 'AWS',
    level: 80,
    category: 'tool'
  }, {
    name: 'Docker',
    level: 75,
    category: 'tool'
  }, {
    name: 'Git',
    level: 95,
    category: 'tool'
  }],
  workExperience: [{
    id: '1',
    title: 'Senior Software Developer',
    company: 'Tech Innovations Inc.',
    startDate: 'Jan 2020',
    endDate: 'Present',
    description: 'Lead developer for multiple client projects, managing a team of 5 developers. Implemented CI/CD pipelines that reduced deployment time by 40%. Architected and built a scalable microservices platform using React, Node.js, and AWS.'
  }, {
    id: '2',
    title: 'Full Stack Developer',
    company: 'Web Solutions Co.',
    startDate: 'Mar 2016',
    endDate: 'Dec 2019',
    description: 'Developed and maintained multiple client websites and web applications. Implemented responsive designs and improved site performance by 60%. Collaborated with design and marketing teams to deliver integrated solutions.'
  }],
  projects: [{
    id: '1',
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with inventory management, payment processing, and analytics dashboard.',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'Node.js', 'MongoDB']
  }, {
    id: '2',
    title: 'Analytics Dashboard',
    description: 'Real-time analytics dashboard for monitoring application performance and user behavior.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['Vue.js', 'D3.js', 'Firebase']
  }],
  certificates: [{
    id: '1',
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: 'Jun 2022'
  }, {
    id: '2',
    title: 'Professional Scrum Master I',
    issuer: 'Scrum.org',
    date: 'Mar 2021'
  }, {
    id: '3',
    title: 'Google Cloud Professional Developer',
    issuer: 'Google Cloud',
    date: 'Nov 2020'
  }, {
    id: '4',
    title: 'React Certification',
    issuer: 'Meta (formerly Facebook)',
    date: 'Aug 2019'
  }]
};
// Implementation of the ProfileService
export class ProfileService implements IProfileService {
  private profiles: Map<string, ProfileInfo> = new Map([['1', mockProfile]]);
  async getProfileInfo(userId: string): Promise<ProfileInfo | null> {
    // In a real app, this would fetch from an API
    return Promise.resolve(this.profiles.get(userId) || null);
  }
  async updateProfileInfo(userId: string, info: Partial<ProfileInfo>): Promise<ProfileInfo | null> {
    const existingProfile = this.profiles.get(userId);
    if (!existingProfile) return Promise.resolve(null);
    const updatedProfile = {
      ...existingProfile,
      ...info
    };
    this.profiles.set(userId, updatedProfile);
    return Promise.resolve(updatedProfile);
  }
}
// Singleton instance for the application
export const profileService = new ProfileService();