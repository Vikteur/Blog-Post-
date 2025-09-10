import React, { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { BlogPostCard } from '../components/BlogPostCard';
import { CreateBlogPostModal } from '../components/CreateBlogPostModal';
import { useUserBlogPosts } from '../hooks/useBlogPosts';
import { BlogPost } from '../types';
export function Profile() {
  // Always use default user ID '1' since we no longer have authentication
  const userId = '1';
  const {
    posts,
    isLoading: isLoadingPosts,
    error: postsError,
    createPost
  } = useUserBlogPosts(userId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const handleCreatePost = async (postData: Partial<BlogPost>) => {
    setIsCreatingPost(true);
    setCreateError(null);
    try {
      await createPost(postData);
      setIsModalOpen(false);
    } catch (err) {
      setCreateError('Failed to create post. Please try again.');
      console.error(err);
    } finally {
      setIsCreatingPost(false);
    }
  };
  // Default user information
  const defaultUser = {
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
  };
  return <div className="max-w-7xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6">
            <img src={defaultUser.avatar} alt={defaultUser.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900">
              {defaultUser.name}
            </h2>
            <p className="text-gray-600 mt-1">
              Blog writer and technology enthusiast
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Member since January 2023
            </p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="mt-4 md:mt-0 px-4 py-2 flex items-center bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" aria-label="Create new blog post">
            <PlusIcon className="h-5 w-5 mr-2" aria-hidden="true" />
            Create Blog Post
          </button>
        </div>
      </div>
      {/* User's Blog Posts */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">My Blog Posts</h3>
        {isLoadingPosts && <div className="text-center py-10">
            <p className="text-gray-500">Loading posts...</p>
          </div>}
        {postsError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert">
            <p>{postsError}</p>
          </div>}
        {!isLoadingPosts && !postsError && posts.length === 0 && <p className="text-gray-500">
            No posts yet. Create your first blog post!
          </p>}
        {!isLoadingPosts && !postsError && posts.length > 0 && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => <BlogPostCard key={post.id} post={post} />)}
          </div>}
      </div>
      {/* Create Blog Post Modal */}
      <CreateBlogPostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreatePost={handleCreatePost} isLoading={isCreatingPost} error={createError} />
    </div>;
}