import { BlogPostCard } from '../components/BlogPostCard';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { SearchBar } from '../components/SearchBar';
import { SEO } from '../components/SEO';
export function Home() {
  const {
    posts,
    isLoading,
    error
  } = useBlogPosts();
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Viktor Van Steenweghen's Blog",
    "description": "Latest articles and insights on web development, software engineering, and technology",
    "url": "https://viktorvansteenweghen.com/blogs",
    "author": {
      "@type": "Person",
      "name": "Viktor Van Steenweghen",
      "url": "https://www.linkedin.com/in/viktorvansteenweghen/"
    },
    "blogPost": posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "datePublished": post.date,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "url": `https://viktorvansteenweghen.com/post/${post.id}`
    }))
  };
  
  return (
    <>
      <SEO
        title="Blog"
        description="Discover the latest articles and insights on web development, software engineering, React, TypeScript, and modern technology by Viktor Van Steenweghen."
        canonicalUrl="https://viktorvansteenweghen.com/blogs"
        ogType="website"
        structuredData={structuredData}
      />
      <div className="max-w-7xl mx-auto">
      <div className="mb-8 max-w-lg mx-auto">
        <SearchBar />
      </div>
      <section aria-labelledby="latest-posts-heading">
        <div className="mb-8">
          <h2 id="latest-posts-heading" className="text-2xl font-bold text-gray-900">
            Latest Posts
          </h2>
          <p className="text-gray-600 mt-1">
            Discover the latest articles and insights
          </p>
        </div>
        {isLoading && <div className="text-center py-10" aria-live="polite">
            <p className="text-gray-500">Loading posts...</p>
          </div>}
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert" aria-live="assertive">
            <p>{error}</p>
          </div>}
        {!isLoading && !error && posts.length === 0 && <div className="text-center py-10" aria-live="polite">
            <p className="text-gray-500">No posts available.</p>
          </div>}
        {!isLoading && !error && posts.length > 0 && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="feed" aria-busy={isLoading} aria-label="Blog posts">
            {posts.map(post => <BlogPostCard key={post.id} post={post} />)}
          </div>}
      </section>
    </div>
    </>
  );
}