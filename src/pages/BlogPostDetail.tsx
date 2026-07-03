import { formatDate } from '../utils/formatDate';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, UserIcon, CalendarIcon, TagIcon } from 'lucide-react';
import { useBlogPost } from '../hooks/useBlogPost';
import { SEO } from '../components/SEO';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
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
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://viktorvansteenweghen.com/#viktor",
        "name": "Viktor Van Steenweghen",
        "url": "https://viktorvansteenweghen.com/",
        "sameAs": [
          "https://www.linkedin.com/in/viktorvansteenweghen/"
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
        "isPartOf": {
          "@id": "https://viktorvansteenweghen.com/#website"
        },
        "publisher": {
          "@id": "https://viktorvansteenweghen.com/#viktor"
        }
      },
      {
        "@type": "BlogPosting",
        "@id": `https://viktorvansteenweghen.com/post/${postId}#article`,
        "headline": post.title,
        "description": post.content.substring(0, 200),
        "image": post.image ? {
          "@type": "ImageObject",
          "url": post.image
        } : undefined,
        "datePublished": new Date(post.date).toISOString(),
        "author": {
          "@id": "https://viktorvansteenweghen.com/#viktor"
        },
        "publisher": {
          "@id": "https://viktorvansteenweghen.com/#viktor"
        },
        "isPartOf": {
          "@id": "https://viktorvansteenweghen.com/blogs#blog"
        },
        "mainEntityOfPage": {
          "@id": `https://viktorvansteenweghen.com/post/${postId}#webpage`
        },
        "keywords": post.topic,
        "inLanguage": "en-US",
        "url": `https://viktorvansteenweghen.com/post/${postId}`
      },
      {
        "@type": "WebPage",
        "@id": `https://viktorvansteenweghen.com/post/${postId}#webpage`,
        "url": `https://viktorvansteenweghen.com/post/${postId}`,
        "name": post.title,
        "isPartOf": {
          "@id": "https://viktorvansteenweghen.com/#website"
        },
        "mainEntity": {
          "@id": `https://viktorvansteenweghen.com/post/${postId}#article`
        },
        "inLanguage": "en-US"
      }
    ]
  } : undefined;

  return <div className="max-w-3xl mx-auto">
      {post && (
        <SEO
          title={post.title}
          description={post.content.substring(0, 160)}
          canonicalUrl={`https://viktorvansteenweghen.com/post/${postId}`}
          ogType="article"
          ogImage={
            post.image
              ? 'https://viktorvansteenweghen.com' +
                (post.image.endsWith('.svg') ? post.image.replace(/\.svg$/, '.png') : post.image)
              : undefined
          }
          article={{
            publishedTime: new Date(post.date).toISOString(),
            author: post.author,
            tags: [post.topic]
          }}
          structuredData={structuredData}
        />
      )}
      <nav aria-label="Breadcrumb" className="mb-8">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground gap-2"
        >
          <Link to="/blogs" aria-label="Back to all posts">
            <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            Back to articles
          </Link>
        </Button>
      </nav>
      {isLoading && <div className="text-center py-16" role="status" aria-live="polite">
          <p className="text-muted-foreground text-sm">Loading article...</p>
        </div>}
      {error && <div className="bg-destructive/10 border border-destructive/30 text-destructive px-5 py-4 rounded-xl mb-6" role="alert" aria-live="assertive">
          <p className="text-sm font-medium">{error}</p>
        </div>}
      {!isLoading && !error && post && <article aria-labelledby="post-title" className="section-card">
          {post.image && <figure className="-mx-8 -mt-8 md:-mx-10 md:-mt-10 mb-8 h-64 md:h-80 relative overflow-hidden">
              <img src={post.image} alt={`Featured image for ${post.title}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
            </figure>}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-5">
              <Badge variant="secondary" className="tag">
                {post.topic}
              </Badge>
              <span className="text-muted-foreground text-sm">
                <time dateTime={new Date(post.date).toISOString()}>
                  {formatDate(new Date(post.date))}
                </time>
              </span>
            </div>
            <h1 id="post-title" className="text-2xl md:text-4xl font-bold mb-5 text-foreground leading-tight tracking-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground text-sm font-semibold">
                {post.author[0]}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{post.author}</p>
                <p className="text-xs text-muted-foreground">Author</p>
              </div>
            </div>
          </header>
          <Separator className="bg-border/50 my-8" />
          <section className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground prose-blockquote:text-muted-foreground prose-blockquote:border-primary/50 prose-code:text-primary prose-pre:bg-muted prose-pre:text-foreground prose-a:text-primary prose-li:text-foreground/90 prose-hr:border-border/50 prose-hr:my-6 prose-h2:mt-8 prose-h2:mb-4 prose-h3:mt-6 prose-h3:mb-3">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {post.content}
            </ReactMarkdown>
          </section>
        </article>}
    </div>;
}