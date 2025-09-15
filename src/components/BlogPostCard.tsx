import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BlogPost } from '../types';
interface BlogPostCardProps {
  post: BlogPost;
}
export function BlogPostCard({
  post
}: BlogPostCardProps) {
  const navigate = useNavigate();
  const handleReadMore = () => {
    navigate(`/post/${post.id}`);
  };
  return <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {post.image && <div className="h-48 overflow-hidden">
          <img src={post.image} alt={post.title ? `Featured image for ${post.title}` : ''} className="w-full h-full object-cover" />
        </div>}
      <div className="p-5">
        <div className="mb-3">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {post.topic}
          </span>
          <time dateTime={new Date(post.date).toISOString()} className="text-gray-500 text-sm ml-2">
            {post.date}
          </time>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">By {post.author}</span>
          <button onClick={handleReadMore} className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" aria-label={`Read more about ${post.title}`}>
            Read More
          </button>
        </div>
      </div>
    </article>;
}