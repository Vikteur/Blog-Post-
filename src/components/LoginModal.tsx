import React, { useState } from 'react';
import { XIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({
  isOpen,
  onClose
}: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useFocusTrap<HTMLDivElement>(isOpen);
  const {
    login
  } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        onClose();
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="login-modal-title">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} aria-hidden="true"></div>
        <div ref={modalRef} className="relative bg-white rounded-lg max-w-md w-full mx-auto shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 id="login-modal-title" className="text-xl font-bold text-gray-900">Log In</h3>
            <button onClick={onClose} className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" aria-label="Close login modal">
              <XIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md" role="alert" aria-live="assertive" aria-atomic="true">
              {error}
            </div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span aria-label="required">*</span>
              </label>
              <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required aria-required="true" autoComplete="email" />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password <span aria-label="required">*</span>
              </label>
              <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required aria-required="true" autoComplete="current-password" />
            </div>
            <button type="submit" disabled={isLoading} className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" aria-busy={isLoading}>
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        </div>
      </div>
    </div>;
}