import { BlogPost, ProfileInfo } from '../types';
// Service interfaces that define the contract for business logic
export interface IBlogService {
  getPosts(): Promise<BlogPost[]>;
  getPost(id: string): Promise<BlogPost | null>;
}
export interface IProfileService {
  getProfileInfo(userId: string): Promise<ProfileInfo | null>;
}