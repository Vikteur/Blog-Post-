import React, { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { BlogPostCard, BlogPost } from '../components/BlogPostCard';
import { CreateBlogPostModal } from '../components/CreateBlogPostModal';
import { useAuth } from '../contexts/AuthContext';
// Mock user posts
const userPosts: BlogPost[] = [{
  id: '7',
  title: 'My Journey in Web Development',
  excerpt: 'Personal reflections on learning web development and growing as a developer over the years.',
  date: 'May 20, 2023',
  topic: 'Personal',
  author: 'Your Name',
  image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
}, {
  id: '8',
  title: 'Building My First React App',
  excerpt: 'The challenges and lessons learned while building my first application with React.',
  date: 'May 1, 2023',
  topic: 'React',
  author: 'Your Name',
  image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
}];
export function Profile() {
  const {
    user,
    isAuthenticated
  } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>(userPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCreatePost = (newPost: BlogPost) => {
    // Update with current user name if authenticated
    const authorName = user?.name || 'Anonymous';
    const postWithAuthor = {
      ...newPost,
      author: authorName
    };
    setPosts([postWithAuthor, ...posts]);
    setIsModalOpen(false);
  };
  return <div className="max-w-7xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6">
            <img src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'} alt={user?.name || 'Profile'} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900">
              {user?.name || 'Guest User'}
            </h2>
            <p className="text-gray-600 mt-1">
              {isAuthenticated ? 'Blog writer and technology enthusiast' : 'Please login to manage your profile'}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Member since {isAuthenticated ? 'January 2023' : 'N/A'}
            </p>
          </div>
          {isAuthenticated && <button onClick={() => setIsModalOpen(true)} className="mt-4 md:mt-0 px-4 py-2 flex items-center bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              <PlusIcon className="h-5 w-5 mr-2" />
              Create Blog Post
            </button>}
        </div>
      </div>
      {/* User's Blog Posts */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {isAuthenticated ? 'My Blog Posts' : 'Sample Blog Posts'}
        </h3>
        {posts.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => <BlogPostCard key={post.id} post={post} />)}
          </div> : <p className="text-gray-500">
            No posts yet. Create your first blog post!
          </p>}
      </div>
      {/* Create Blog Post Modal */}
      <CreateBlogPostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreatePost={handleCreatePost} />
    </div>;
}