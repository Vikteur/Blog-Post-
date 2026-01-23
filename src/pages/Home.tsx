import { BlogPostCard } from '../components/BlogPostCard';
import { FeaturedBlogCard } from '../components/FeaturedBlogCard';
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
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://viktorvansteenweghen.com/#viktor",
        "name": "Viktor Van Steenweghen",
        "url": "https://viktorvansteenweghen.com/",
        "sameAs": [
          "https://www.linkedin.com/in/viktorvansteenweghen/",
          "https://jcast.dev/"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://viktorvansteenweghen.com/#website",
        "url": "https://viktorvansteenweghen.com/",
        "name": "Viktor Van Steenweghen",
        "description": "Portfolio and blog of Viktor Van Steenweghen, Full Stack Developer",
        "publisher": {
          "@id": "https://viktorvansteenweghen.com/#viktor"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "Blog",
        "@id": "https://viktorvansteenweghen.com/blogs#blog",
        "url": "https://viktorvansteenweghen.com/blogs",
        "name": "Viktor Van Steenweghen's Blog",
        "description": "Latest articles and insights on web development, software engineering, and technology",
        "isPartOf": {
          "@id": "https://viktorvansteenweghen.com/#website"
        },
        "publisher": {
          "@id": "https://viktorvansteenweghen.com/#viktor"
        },
        "inLanguage": "en-US",
        "blogPost": posts.map(post => ({
          "@type": "BlogPosting",
          "@id": `https://viktorvansteenweghen.com/post/${post.id}#article`,
          "headline": post.title,
          "datePublished": new Date(post.date).toISOString(),
          "author": {
            "@id": "https://viktorvansteenweghen.com/#viktor"
          },
          "url": `https://viktorvansteenweghen.com/post/${post.id}`
        }))
      },
      {
        "@type": "CollectionPage",
        "@id": "https://viktorvansteenweghen.com/blogs#webpage",
        "url": "https://viktorvansteenweghen.com/blogs",
        "name": "Blog",
        "isPartOf": {
          "@id": "https://viktorvansteenweghen.com/#website"
        },
        "mainEntity": {
          "@id": "https://viktorvansteenweghen.com/blogs#blog"
        },
        "inLanguage": "en-US"
      }
    ]
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
        <div className="mb-12 flex items-center gap-4">
          <h2 id="latest-posts-heading" className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            Latest Posts
          </h2>
          <div className="accent-line" />
        </div>
        {isLoading && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-live="polite" aria-label="Loading posts">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm p-5 animate-pulse">
                <div className="h-44 bg-muted rounded-lg mb-4" />
                <div className="h-3 bg-muted rounded w-1/4 mb-3" />
                <div className="h-5 bg-muted rounded w-3/4 mb-3" />
                <div className="h-3 bg-muted rounded w-full mb-2" />
                <div className="h-3 bg-muted rounded w-5/6" />
              </div>
            ))}
          </div>}
        {error && <div className="bg-destructive/10 border border-destructive/30 text-destructive px-5 py-4 rounded-xl mb-6" role="alert" aria-live="assertive">
            <p className="text-sm font-medium">{error}</p>
          </div>}
        {!isLoading && !error && posts.length === 0 && <div className="text-center py-16" aria-live="polite">
            <p className="text-muted-foreground">No posts available yet.</p>
          </div>}
        {!isLoading && !error && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="feed" aria-busy={isLoading} aria-label="Blog posts">
            {posts.map((post, index) =>
              index === 0 ? (
                <FeaturedBlogCard key={post.id} post={post} />
              ) : (
                <BlogPostCard key={post.id} post={post} />
              )
            )}
          </div>
        )}
      </section>
    </div>
    </>
  );
}