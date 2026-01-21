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
  return <Card className="group overflow-hidden hover:shadow-2xl hover:shadow-primary/20 hover:scale-[1.03] transition-all duration-500 border-2 hover:border-primary/50 bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-sm h-full flex flex-col">
      {post.image && <div className="h-56 overflow-hidden relative">
          <img 
            src={post.image} 
            alt={post.title ? `Featured image for ${post.title}` : ''} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-xs font-bold shadow-lg transform translate-x-20 group-hover:translate-x-0 transition-transform duration-300">
            NEW
          </div>
        </div>}
      <CardContent className="p-6 flex-1 flex flex-col">
        <div className="mb-4 flex items-center gap-3 flex-wrap">
          <Badge variant="secondary" className="bg-gradient-to-r from-primary/20 to-purple-600/20 text-primary hover:from-primary/30 hover:to-purple-600/30 font-semibold">
            {post.topic}
          </Badge>
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <Clock className="h-3 w-3" />
            <time dateTime={new Date(post.date).toISOString()}>
              {formatDate(new Date(post.date))}
            </time>
          </div>
        </div>
        <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">
          {post.title}
        </h2>
        <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed flex-1">
          {post.summary}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-auto pt-2 border-t">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center text-white text-[10px] font-bold">
            {post.author[0]}
          </div>
          <span className="font-medium">{post.author}</span>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button 
          onClick={handleReadMore} 
          variant="ghost" 
          size="sm" 
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300 font-semibold group/btn" 
          aria-label={`Read more about ${post.title}`}
        >
          <span>Read Article</span>
          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </Button>
      </CardFooter>
    </Card>;
}