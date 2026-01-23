import { formatDate } from '../utils/formatDate';
import { useNavigate } from 'react-router-dom';
import { BlogPost } from '../types';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, ArrowRight } from 'lucide-react';

interface FeaturedBlogCardProps {
  post: BlogPost;
}

export function FeaturedBlogCard({ post }: FeaturedBlogCardProps) {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-elevated transition-all duration-300 border-l-4 border-l-primary border border-border/50 hover:border-primary/30 bg-card/80 backdrop-blur-sm col-span-1 md:col-span-2">
      <div className="flex flex-col md:flex-row">
        {post.image && (
          <div className="h-56 md:h-auto md:w-2/5 overflow-hidden relative">
            <img
              src={post.image}
              alt={post.title ? `Featured image for ${post.title}` : ''}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-4 left-4">
              <Badge className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1">
                Featured
              </Badge>
            </div>
          </div>
        )}
        <CardContent className="p-6 md:p-8 flex-1 flex flex-col justify-center">
          <div className="mb-4 flex items-center gap-3 flex-wrap">
            <Badge variant="secondary" className="tag text-xs py-1">
              {post.topic}
            </Badge>
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
              <Clock className="h-4 w-4" />
              <time dateTime={new Date(post.date).toISOString()}>
                {formatDate(new Date(post.date))}
              </time>
            </div>
          </div>
          <h2 className="text-xl md:text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-200 leading-tight tracking-tight">
            {post.title}
          </h2>
          <p className="text-muted-foreground mb-6 text-base leading-relaxed line-clamp-3">
            {post.summary}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground text-sm font-semibold">
                {post.author[0]}
              </div>
              <span className="font-medium text-foreground/80">{post.author}</span>
            </div>
            <Button
              onClick={handleReadMore}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg hover:shadow-primary/25 transition-all duration-200 font-medium group/btn"
              aria-label={`Read more about ${post.title}`}
            >
              <span>Read Article</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
