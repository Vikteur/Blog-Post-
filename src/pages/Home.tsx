import { BlogPostCard } from '../components/BlogPostCard';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { SEO } from '../components/SEO';
import { Sparkles, TrendingUp } from 'lucide-react';
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
      {/* Hero Section */}
      <div className="relative overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-blue-500/20 to-cyan-500/20 blur-3xl opacity-50 animate-pulse" />
        <div className="relative max-w-4xl mx-auto text-center py-16 px-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-bounce">
            <Sparkles className="h-4 w-4" />
            <span>Fresh Content Weekly</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-primary via-blue-500 to-cyan-500 bg-clip-text text-transparent leading-tight">
            Discover Amazing Stories
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Dive into a world of cutting-edge web development, software engineering insights, and technology trends that shape the future.
          </p>
          <div className="flex items-center justify-center gap-2 mt-8 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="font-medium">{posts.length} articles and counting</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <section aria-labelledby="latest-posts-heading">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 id="latest-posts-heading" className="text-3xl md:text-4xl font-black mb-2 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Latest Posts
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-blue-600 rounded-full" />
          </div>
        </div>
        {isLoading && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-live="polite" aria-label="Loading posts">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-2xl border-2 border-border/50 bg-card/50 backdrop-blur-sm p-6 animate-pulse">
                <div className="h-56 bg-muted rounded-lg mb-4" />
                <div className="h-4 bg-muted rounded w-1/4 mb-3" />
                <div className="h-6 bg-muted rounded w-3/4 mb-3" />
                <div className="h-4 bg-muted rounded w-full mb-2" />
                <div className="h-4 bg-muted rounded w-5/6" />
              </div>
            ))}
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