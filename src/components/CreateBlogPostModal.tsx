import { useState } from 'react';
import { formatDate } from '../utils/formatDate';
import { BlogPost } from '../types';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

interface CreateBlogPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePost: (post: BlogPost) => void;
}

export function CreateBlogPostModal({
  isOpen,
  onClose,
  onCreatePost
}: CreateBlogPostModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [topic, setTopic] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const modalRef = useFocusTrap<HTMLDivElement>(isOpen);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create a new blog post
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title,
      content, 
      summary: content.substring(0, 150) + (content.length > 150 ? '...' : ''),
  date: formatDate(new Date()),
      topic,
      author: 'Your Name',
      image: imageUrl || undefined
    };
    onCreatePost(newPost);
    // Reset form
    setTitle('');
    setContent('');
    setTopic('');
    setImageUrl('');
    onClose();
  };

  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Blog Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span aria-label="required" className="text-destructive">*</span>
            </Label>
            <Input 
              type="text" 
              id="title" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              required 
              aria-required="true" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="topic">
              Topic <span aria-label="required" className="text-destructive">*</span>
            </Label>
            <Input 
              type="text" 
              id="topic" 
              value={topic} 
              onChange={e => setTopic(e.target.value)} 
              required 
              aria-required="true" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">
              Image URL <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <Input 
              type="url" 
              id="image" 
              value={imageUrl} 
              onChange={e => setImageUrl(e.target.value)} 
              aria-describedby="image-help" 
            />
            <p id="image-help" className="text-xs text-muted-foreground">
              Provide a URL to an image for your blog post
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">
              Content <span aria-label="required" className="text-destructive">*</span>
            </Label>
            <Textarea 
              id="content" 
              value={content} 
              onChange={e => setContent(e.target.value)} 
              rows={6} 
              required 
              aria-required="true" 
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button type="submit">
              Publish Post
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>;
}