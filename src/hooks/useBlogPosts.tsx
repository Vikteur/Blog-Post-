import { useCallback, useEffect, useState } from 'react';
import { BlogPost } from '../types';
import { blogService } from '../services/BlogService';
export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedPosts = await blogService.getPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      setError('Failed to fetch blog posts');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  return {
    posts,
    isLoading,
    error,
    fetchPosts
  };
}