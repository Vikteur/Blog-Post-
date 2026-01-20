import { formatDate } from '../utils/formatDate';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, UserIcon, CalendarIcon, TagIcon } from 'lucide-react';
import { useBlogPost } from '../hooks/useBlogPost';
import { SEO } from '../components/SEO';
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

  const structuredData = post ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.content.substring(0, 200),
    "image": post.image || "https://viktorvansteenweghen.com/og-image.jpg",
    "datePublished": new Date(post.date).toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": "https://www.linkedin.com/in/viktorvansteenweghen/"
    },
    "publisher": {
      "@type": "Person",
      "name": "Viktor Van Steenweghen",
      "url": "https://viktorvansteenweghen.com/"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://viktorvansteenweghen.com/post/${postId}`
    },
    "keywords": post.topic
  } : undefined;

  return <div className="max-w-4xl mx-auto">
      {post && (
        <SEO
          title={post.title}
          description={post.content.substring(0, 160)}
          canonicalUrl={`https://viktorvansteenweghen.com/post/${postId}`}
          ogType="article"
          ogImage={post.image || undefined}
          article={{
            publishedTime: new Date(post.date).toISOString(),
            author: post.author,
            tags: [post.topic]
          }}
          structuredData={structuredData}
        />
      )}
      <nav aria-label="Breadcrumb">
        <Link
          to="/"
          className="mb-4 inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-normal rounded border border-blue-200 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-150 shadow"
          aria-label="Back to all posts"
        >
          <ArrowLeftIcon className="h-3 w-3 mr-0.5" aria-hidden="true" />
          <span className="tracking-wide">Back to all posts</span>
        </Link>
      </nav>
      {isLoading && <div className="text-center py-10" role="status" aria-live="polite">
          <p className="text-gray-500">Loading post...</p>
        </div>}
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert" aria-live="assertive">
          <p>{error}</p>
        </div>}
      {!isLoading && !error && post && <article aria-labelledby="post-title">
          {post.image && <figure className="mb-8 rounded-lg overflow-hidden h-72 md:h-96">
              <img src={post.image} alt={`Featured image for ${post.title}`} className="w-full h-full object-cover" />
            </figure>}
          <header className="mb-6">
            <h1 id="post-title" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center text-gray-600 mb-6">
              <div className="flex items-center mr-6 mb-2">
                <UserIcon className="h-4 w-4 mr-2" aria-hidden="true" />
                <span>By {post.author}</span>
              </div>
              <div className="flex items-center mr-6 mb-2">
                <CalendarIcon className="h-4 w-4 mr-2" aria-hidden="true" />
                <time dateTime={new Date(post.date).toISOString()}>
                  {formatDate(new Date(post.date))}
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