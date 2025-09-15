import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, UserIcon, CalendarIcon, TagIcon } from 'lucide-react';
import { useBlogPost } from '../hooks/useBlogPost';
export function BlogPostDetail() {
  const {
    postId
  } = useParams<{
    postId: string;
  }>();
  const {
    post,
    isLoading,
    error
  } = useBlogPost(postId);
  return <div className="max-w-4xl mx-auto">
      <Link to="/" className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1">
        <ArrowLeftIcon className="h-4 w-4 mr-2" aria-hidden="true" />
        Back to all posts
      </Link>
      {isLoading && <div className="text-center py-10" aria-live="polite">
          <p className="text-gray-500">Loading post...</p>
        </div>}
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert" aria-live="assertive">
          <p>{error}</p>
        </div>}
      {!isLoading && !error && post && <article>
          {post.image && <div className="mb-8 rounded-lg overflow-hidden h-72 md:h-96">
              <img src={post.image} alt={`Featured image for ${post.title}`} className="w-full h-full object-cover" />
            </div>}
          <header className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center text-gray-600 mb-6">
              <div className="flex items-center mr-6 mb-2">
                <UserIcon className="h-4 w-4 mr-2" aria-hidden="true" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center mr-6 mb-2">
                <CalendarIcon className="h-4 w-4 mr-2" aria-hidden="true" />
                <time dateTime={new Date(post.date).toISOString()}>
                  {post.date}
                </time>
              </div>
              <div className="flex items-center mb-2">
                <TagIcon className="h-4 w-4 mr-2" aria-hidden="true" />
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {post.topic}
                </span>
              </div>
            </div>
          </header>
          <div className="prose max-w-none">
            <p className="whitespace-pre-line text-gray-700 leading-relaxed">
              {post.content}
            </p>
          </div>
        </article>}
    </div>;
}