import React, { useState } from 'react';
import { XIcon } from 'lucide-react';
import { BlogPost } from './BlogPostCard';
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create a new blog post
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title,
      excerpt: content.substring(0, 150) + (content.length > 150 ? '...' : ''),
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
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
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
        <div className="relative bg-white rounded-lg max-w-3xl w-full mx-auto shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Create New Blog Post
            </h3>
            <button onClick={onClose} className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100" aria-label="Close">
              <XIcon className="h-5 w-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div className="mb-4">
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
                Topic
              </label>
              <input type="text" id="topic" value={topic} onChange={e => setTopic(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Image URL (optional)
              </label>
              <input type="url" id="image" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea id="content" value={content} onChange={e => setContent(e.target.value)} rows={6} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div className="flex justify-end mt-6">
              <button type="button" onClick={onClose} className="px-4 py-2 mr-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Publish Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>;
}