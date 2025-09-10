import React from 'react';
import { BlogPostCard } from '../components/BlogPostCard';
import { useBlogPosts } from '../hooks/useBlogPosts';
export function Home() {
  const {
    posts,
    isLoading,
    error
  } = useBlogPosts();
  return <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Latest Posts</h2>
        <p className="text-gray-600 mt-1">
          Discover the latest articles and insights
        </p>
      </div>
      {isLoading && <div className="text-center py-10">
          <p className="text-gray-500">Loading posts...</p>
        </div>}
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert">
          <p>{error}</p>
        </div>}
      {!isLoading && !error && posts.length === 0 && <div className="text-center py-10">
          <p className="text-gray-500">No posts available.</p>
        </div>}
      {!isLoading && !error && posts.length > 0 && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => <BlogPostCard key={post.id} post={post} />)}
        </div>}
    </div>;
}