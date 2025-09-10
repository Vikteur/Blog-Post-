import React, { useEffect, useState } from 'react';
import { BlogPost } from '../types';
import { blogService } from '../services/BlogService';
export function useBlogPost(postId: string | undefined) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!postId) return;
    const fetchPost = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedPost = await blogService.getPost(postId);
        setPost(fetchedPost);
        if (!fetchedPost) {
          setError('Blog post not found');
        }
      } catch (err) {
        setError('Failed to fetch blog post');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [postId]);
  return {
    post,
    isLoading,
    error
  };
}