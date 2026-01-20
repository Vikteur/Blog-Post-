import { BlogPostCard } from '../components/BlogPostCard';
import { useBlogPosts } from '../hooks/useBlogPosts';
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
      <section aria-labelledby="latest-posts-heading">
        <div className="mb-8">
          <h2 id="latest-posts-heading" className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Latest Posts
          </h2>
          <p className="text-muted-foreground mt-2">
            Discover the latest articles and insights
          </p>
        </div>
        {isLoading && <div className="text-center py-10" aria-live="polite">
            <p className="text-muted-foreground">Loading posts...</p>
          </div>}
        {error && <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg mb-6" role="alert" aria-live="assertive">
            <p>{error}</p>
          </div>}
        {!isLoading && !error && posts.length === 0 && <div className="text-center py-10" aria-live="polite">
            <p className="text-muted-foreground">No posts available.</p>
          </div>}
        {!isLoading && !error && posts.length > 0 && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="feed" aria-busy={isLoading} aria-label="Blog posts">
            {posts.map(post => <BlogPostCard key={post.id} post={post} />)}
          </div>}
      </section>
    </div>
    </>
  );
}