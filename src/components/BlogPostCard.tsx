import { formatDate } from '../utils/formatDate';
import { useNavigate } from 'react-router-dom';
import { BlogPost } from '../types';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, ArrowRight } from 'lucide-react';

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
  return <Card className="group overflow-hidden hover:shadow-elevated transition-all duration-300 border border-border/50 hover:border-primary/30 bg-card/80 backdrop-blur-sm h-full flex flex-col">
      {post.image && <div className="h-44 overflow-hidden relative">
          <img
            src={post.image}
            alt={post.title ? `Featured image for ${post.title}` : ''}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>}
      <CardContent className="p-5 flex-1 flex flex-col">
        <div className="mb-3 flex items-center gap-2.5 flex-wrap">
          <Badge variant="secondary" className="tag text-[10px] py-0.5">
            {post.topic}
          </Badge>
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <Clock className="h-3 w-3" />
            <time dateTime={new Date(post.date).toISOString()}>
              {formatDate(new Date(post.date))}
            </time>
          </div>
        </div>
        <h2 className="text-base font-semibold mb-2.5 text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2 leading-snug tracking-tight">
          {post.title}
        </h2>
        <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed flex-1">
          {post.summary}
        </p>
        <div className="flex items-center gap-2.5 text-xs text-muted-foreground mt-auto pt-3 border-t border-border/30">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground text-[10px] font-semibold">
            {post.author[0]}
          </div>
          <span className="font-medium text-foreground/80">{post.author}</span>
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Button
          onClick={handleReadMore}
          size="sm"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg hover:shadow-primary/25 transition-all duration-200 font-medium text-sm group/btn"
          aria-label={`Read more about ${post.title}`}
        >
          <span>Read Article</span>
          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
        </Button>
      </CardFooter>
    </Card>;
}