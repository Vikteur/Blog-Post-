import React, { useEffect, useState } from 'react';
import { BlogPostCard, BlogPost } from '../components/BlogPostCard';
// Mock data for blog posts
const mockPosts: BlogPost[] = [{
  id: '1',
  title: 'Getting Started with React Hooks',
  excerpt: 'Learn how to use React Hooks to simplify your functional components and manage state effectively.',
  date: 'May 15, 2023',
  topic: 'React',
  author: 'Jane Doe',
  image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
}, {
  id: '2',
  title: 'The Future of Web Development',
  excerpt: 'Exploring upcoming trends and technologies that will shape the future of web development.',
  date: 'May 10, 2023',
  topic: 'Web Dev',
  author: 'John Smith',
  image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
}, {
  id: '3',
  title: 'Mastering CSS Grid Layout',
  excerpt: 'A comprehensive guide to creating complex layouts with CSS Grid.',
  date: 'May 5, 2023',
  topic: 'CSS',
  author: 'Emma Wilson',
  image: 'https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
}, {
  id: '4',
  title: 'Building Accessible Web Applications',
  excerpt: 'Why accessibility matters and how to implement it in your web projects.',
  date: 'April 28, 2023',
  topic: 'Accessibility',
  author: 'Alex Johnson',
  image: 'https://images.unsplash.com/photo-1583339793403-3d9b001b6008?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
}, {
  id: '5',
  title: 'Introduction to TypeScript',
  excerpt: 'Learn the basics of TypeScript and how it can improve your JavaScript development.',
  date: 'April 20, 2023',
  topic: 'TypeScript',
  author: 'Michael Brown',
  image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
}, {
  id: '6',
  title: 'Optimizing React Performance',
  excerpt: 'Tips and tricks to make your React applications faster and more efficient.',
  date: 'April 15, 2023',
  topic: 'React',
  author: 'Sarah Miller',
  image: 'https://images.unsplash.com/photo-1552308995-2baac1ad5490?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
}];
export function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  useEffect(() => {
    // In a real app, this would be an API call
    setPosts(mockPosts);
  }, []);
  return <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Latest Posts</h2>
        <p className="text-gray-600 mt-1">
          Discover the latest articles and insights
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => <BlogPostCard key={post.id} post={post} />)}
      </div>
    </div>;
}