import { BlogPost, ProfileInfo } from '../types';
// Service interfaces that define the contract for business logic
export interface IBlogService {
  getPosts(): Promise<BlogPost[]>;
  getUserPosts(userId: string): Promise<BlogPost[]>;
  getPost(id: string): Promise<BlogPost | null>;
  updatePost(id: string, post: Partial<BlogPost>): Promise<BlogPost | null>;
  deletePost(id: string): Promise<boolean>;
  createPostFromGithub(documentData: {
    title: string;
    content: string;
    topic: string;
    author: string;
    image?: string;
  }): Promise<BlogPost>;
}
export interface IProfileService {
  getProfileInfo(userId: string): Promise<ProfileInfo | null>;
  updateProfileInfo(userId: string, info: Partial<ProfileInfo>): Promise<ProfileInfo | null>;
}