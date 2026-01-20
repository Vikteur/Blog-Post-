import { formatDate } from '../utils/formatDate';
import { useNavigate } from 'react-router-dom';
import { BlogPost } from '../types';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

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
  return <Card className="group overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border-2 hover:border-primary/50">
      {post.image && <div className="h-48 overflow-hidden relative">
          <img 
            src={post.image} 
            alt={post.title ? `Featured image for ${post.title}` : ''} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>}
      <CardContent className="p-5">
        <div className="mb-3 flex items-center gap-2">
          <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
            {post.topic}
          </Badge>
          <time dateTime={new Date(post.date).toISOString()} className="text-muted-foreground text-sm">
            {formatDate(new Date(post.date))}
          </time>
        </div>
        <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
        <p className="text-muted-foreground mb-4 line-clamp-3">{post.summary}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-5 pt-0">
        <span className="text-sm text-muted-foreground">By {post.author}</span>
        <Button onClick={handleReadMore} variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors" aria-label={`Read more about ${post.title}`}>
          Read More
        </Button>
      </CardFooter>
    </Card>;
}