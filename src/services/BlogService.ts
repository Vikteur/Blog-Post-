import { BlogPost } from '../types';
import { IBlogService } from './interfaces';
// Mock data for blog posts
const mockPosts: BlogPost[] = [{
  id: '1',
  title: 'Getting Started with React Hooks',
  content: `React Hooks were introduced in React 16.8 as a way to use state and other React features without writing a class. They allow you to "hook into" React state and lifecycle features from function components.
This is a revolutionary change in how we think about and write React components. Hooks simplify component logic, making it easier to understand, test, and reuse code.
The most commonly used hooks are:
1. useState - For managing state in functional components
2. useEffect - For handling side effects like data fetching, subscriptions, or DOM manipulations
3. useContext - For consuming context in functional components
4. useReducer - For managing more complex state logic
5. useCallback - For memoizing functions
6. useMemo - For memoizing values
7. useRef - For accessing DOM elements directly
Let's look at a simple example using the useState hook:
\`\`\`jsx
import React, { useState } from 'react';
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`
The useEffect hook is used for side effects in your component:
\`\`\`jsx
import React, { useState, useEffect } from 'react';
function Example() {
  const [count, setCount] = useState(0);
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = \`You clicked \${count} times\`;
  });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`
Hooks have rules:
1. Only call hooks at the top level - don't call them inside loops, conditions, or nested functions
2. Only call hooks from React function components or custom hooks
By following these rules, you ensure that hooks are called in the same order each time a component renders, which is important for React to correctly preserve the state of hooks between multiple useState and useEffect calls.
Hooks open up many new possibilities and make it easier to create reusable, composable components without class components or higher-order components.`,
  summary: 'Learn how to use React Hooks to simplify your functional components and manage state effectively.',
  date: '2023-05-15T00:00:00.000Z',
  topic: 'React',
  author: 'Jane Doe',
  authorId: '2',
  image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
}, {
  id: '2',
  title: 'The Future of Web Development',
  content: `The web development landscape is constantly evolving, with new technologies, frameworks, and methodologies emerging at a rapid pace. As we look toward the future, several key trends are likely to shape how we build and experience the web.
## Progressive Web Apps (PWAs)
Progressive Web Apps combine the best of web and mobile apps. They're fast, reliable, and engaging. PWAs work offline, can be installed on home screens, and provide push notifications. As browsers continue to support more native-like features, PWAs will become even more powerful and widespread.
## WebAssembly (Wasm)
WebAssembly allows high-performance code written in languages like C++, Rust, or Go to run in the browser. This opens up possibilities for running computationally intensive applications like games, video editing, or scientific simulations directly in the browser at near-native speed.
## Serverless Architecture
Serverless computing allows developers to build and run applications without thinking about servers. It provides automatic scaling, built-in high availability, and a pay-for-use billing model. This approach will continue to gain popularity as it reduces operational complexity and costs.
## AI and Machine Learning in Web Development
AI is increasingly being integrated into web development, from code completion tools to automated testing and user experience optimization. In the future, we'll likely see more AI-assisted development tools that can generate entire components or applications based on high-level descriptions.
## Low-Code and No-Code Platforms
These platforms allow people with little to no programming experience to build web applications through visual interfaces. While they won't replace traditional development for complex applications, they'll democratize web development and allow more people to bring their ideas to life.
## Micro Frontends
Just as microservices broke down backend monoliths, micro frontends are breaking down frontend monoliths. This architectural style allows teams to work independently on different parts of a web application, using their preferred technologies and releasing on their own schedules.
## The Rise of Edge Computing
Edge computing moves computation closer to the user, reducing latency and improving performance. As CDN providers expand their edge computing capabilities, we'll see more applications leveraging the edge for faster, more reliable experiences.
## Improved Accessibility
Web accessibility is becoming increasingly important, both ethically and legally. Future web development will place greater emphasis on making websites usable by people with disabilities, benefiting all users in the process.
## Sustainability in Web Development
As awareness of climate change grows, so does attention to the environmental impact of web applications. Future web development will likely focus more on energy efficiency, reducing data transfer, and optimizing for lower power consumption.
The future of web development is exciting and full of possibilities. By staying adaptable and continuously learning, web developers can navigate these changes and create even better web experiences for users around the world.`,
  summary: 'Exploring upcoming trends and technologies that will shape the future of web development.',
  date: '2023-05-10T00:00:00.000Z',
  topic: 'Web Dev',
  author: 'John Smith',
  authorId: '3',
  image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
}, {
  id: '3',
  title: 'Mastering CSS Grid Layout',
  content: 'Full content here...',
  summary: 'A comprehensive guide to creating complex layouts with CSS Grid.',
  date: '2023-05-05T00:00:00.000Z',
  topic: 'CSS',
  author: 'Emma Wilson',
  authorId: '4',
  image: 'https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
}, {
  id: '4',
  title: 'Building Accessible Web Applications',
  content: 'Full content here...',
  summary: 'Why accessibility matters and how to implement it in your web projects.',
  date: '2023-04-28T00:00:00.000Z',
  topic: 'Accessibility',
  author: 'Alex Johnson',
  authorId: '5',
  image: 'https://images.unsplash.com/photo-1583339793403-3d9b001b6008?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
}, {
  id: '5',
  title: 'Introduction to TypeScript',
  content: 'Full content here...',
  summary: 'Learn the basics of TypeScript and how it can improve your JavaScript development.',
  date: '2023-04-20T00:00:00.000Z',
  topic: 'TypeScript',
  author: 'Michael Brown',
  authorId: '6',
  image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
}, {
  id: '6',
  title: 'Optimizing React Performance',
  content: 'Full content here...',
  summary: 'Tips and tricks to make your React applications faster and more efficient.',
  date: '2023-04-15T00:00:00.000Z',
  topic: 'React',
  author: 'Sarah Miller',
  authorId: '7',
  image: 'https://images.unsplash.com/photo-1552308995-2baac1ad5490?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
}];
// Implementation of the BlogService
export class BlogService implements IBlogService {
  private posts: BlogPost[] = [...mockPosts];
  async getPosts(): Promise<BlogPost[]> {
    // In a real app, this would fetch from an API
    return Promise.resolve([...this.posts]);
  }
  async getUserPosts(userId: string): Promise<BlogPost[]> {
    // In a real app, this would filter posts by user ID from an API
    return Promise.resolve(this.posts.filter(post => post.authorId === userId));
  }
  async getPost(id: string): Promise<BlogPost | null> {
    const post = this.posts.find(p => p.id === id);
    return Promise.resolve(post || null);
  }
  // This method would be called by a GitHub webhook when a new document is uploaded
  async createPostFromGithub(documentData: {
    title: string;
    content: string;
    topic: string;
    author: string;
    image?: string;
  }): Promise<BlogPost> {
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: documentData.title,
      content: documentData.content,
      summary: documentData.content ? documentData.content.substring(0, 150) + (documentData.content.length > 150 ? '...' : '') : '',
      date: new Date().toISOString(),

      topic: documentData.topic,
      author: documentData.author,
      image: documentData.image
    };
    this.posts.unshift(newPost);
    return Promise.resolve(newPost);
  }
  async updatePost(id: string, postData: Partial<BlogPost>): Promise<BlogPost | null> {
    const index = this.posts.findIndex(p => p.id === id);
    if (index === -1) return Promise.resolve(null);
    const updatedPost = {
      ...this.posts[index],
      ...postData
    };
    this.posts[index] = updatedPost;
    return Promise.resolve(updatedPost);
  }
  async deletePost(id: string): Promise<boolean> {
    const initialLength = this.posts.length;
    this.posts = this.posts.filter(p => p.id !== id);
    return Promise.resolve(this.posts.length < initialLength);
  }
}
// Singleton instance for the application
export const blogService = new BlogService();