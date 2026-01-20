import { formatDate } from '../utils/formatDate';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, UserIcon, CalendarIcon, TagIcon } from 'lucide-react';
import { useBlogPost } from '../hooks/useBlogPost';
import { SEO } from '../components/SEO';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
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
      <nav aria-label="Breadcrumb" className="mb-6">
        <Button
          asChild
          variant="default"
          size="sm"
          className="bg-primary hover:bg-primary/90 shadow-lg"
        >
          <Link to="/" aria-label="Back to all posts">
            <ArrowLeftIcon className="h-4 w-4 mr-2" aria-hidden="true" />
            Back to all posts
          </Link>
        </Button>
      </nav>
      {isLoading && <div className="text-center py-10" role="status" aria-live="polite">
          <p className="text-muted-foreground">Loading post...</p>
        </div>}
      {error && <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg mb-6" role="alert" aria-live="assertive">
          <p>{error}</p>
        </div>}
      {!isLoading && !error && post && <article aria-labelledby="post-title" className="bg-card rounded-xl shadow-2xl overflow-hidden border-2 border-primary/10">
          {post.image && <figure className="mb-0 h-72 md:h-96 relative overflow-hidden">
              <img src={post.image} alt={`Featured image for ${post.title}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </figure>}
          <div className="p-6 md:p-8 lg:p-12">
            <header className="mb-8">
              <h1 id="post-title" className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4" aria-hidden="true" />
                  <span>By {post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" aria-hidden="true" />
                  <time dateTime={new Date(post.date).toISOString()}>
                    {formatDate(new Date(post.date))}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <TagIcon className="h-4 w-4" aria-hidden="true" />
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {post.topic}
                  </Badge>
                </div>
              </div>
              <Separator className="bg-primary/20" />
            </header>
            <section className="prose prose-lg max-w-none mt-6">
              <p className="whitespace-pre-line leading-relaxed">
                {post.content}
              </p>
            </section>
          </div>
        </article>}
    </div>;
}