import { ProfileInfo } from '../types';
import { IProfileService } from './interfaces';
// Mock profile data
const mockProfile: ProfileInfo = {
  id: '1',
  name: 'Viktor Van Steenweghen',
  title: 'Software Developer',
  email: 'vansteenweghenviktor@gmail.com',
  location: 'Rotselaar, Belgium',
  birthDate: new Date('1998-08-12'),
  about: "I’m a software developer with 2.5 years of experience delivering scalable web applications and services, continuously learning modern tech and leveraging AI to boost productivity and quality.",
  avatar: '/Zelfportret.jpg',
  
  workExperience: [{
    id: '1',
    title: 'Software Developer',
    company: 'Sopra Steria',
    companyUrl: 'https://www.soprasteria.com/',
  startDate: '2023-09-01T00:00:00.000Z',
  endDate: '',
  description: 'Consulting for various clients, developing web applications and services using modern technologies like Java, Angular, Spring Boot and AWS.'
    }],
  projects: [{
    id: '1',
    title: 'MijnGezondheid.be',
    description: 'MijnGezondheid.be is a secure digital platform in Belgium where citizens can access and manage their personal health information and share it with healthcare providers.',
    image: '/mijngezondheid.png',
    technologies: ['Java', 'Spring Boot', 'Angular', 'AWS'],
    url: 'https://www.mijngezondheid.belgie.be/'
  }, {
    id: '2',
    title: 'IDEWE',
    description: 'A Belgian external service for prevention and protection at work, offering occupational health, safety, and wellbeing support for employers and employees.',
    image: '/edezwe.png',
    technologies: ['Java', 'Spring Boot', 'Angular'],
    url: 'https://www.idewe.be/'
  }],
  certificates: [{
    id: '1',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
  date: '2024-01-01T00:00:00.000Z'
  }],

  skills: [
   {
    name: 'Java',
    level: 75,
    category: 'language'
  },{
    name: 'Spring Boot',
    level: 70,
    category: 'framework'
  },{
    name: 'Angular',
    level: 60,
    category: 'language'
  },{
    name: 'Docker',
    level: 70,
    category: 'tools'
  }, {
    name: 'Git',
    level: 80,
    category: 'tools'
  },{
    name: 'HTML/CSS',
    level: 70,
    category: 'language'
  }, 
   {
    name: 'AWS',
    level: 60,
    category: 'tools'
  }],
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