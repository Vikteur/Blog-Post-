import { useEffect } from 'react';
import { XIcon, HomeIcon, BookOpenIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';

interface SidenavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidenav({
  isOpen,
  onClose
}: SidenavProps) {
  const sidenavRef = useFocusTrap<HTMLDivElement>(isOpen);
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path === '/blogs' && (location.pathname === '/blogs' || location.pathname.startsWith('/post/'))) return true;
    return false;
  };

  // Close sidenav when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidenavRef.current && !sidenavRef.current.contains(event.target as Node) && isOpen) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  // Prevent scrolling when sidenav is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  // Handle ESC key to close sidenav
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;

  return <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden" aria-hidden="true" onClick={onClose} />
      {/* Sidenav */}
      <div ref={sidenavRef} id="site-navigation" role="dialog" aria-modal="true" aria-label="Site navigation" className="fixed top-0 left-0 z-30 h-full w-72 bg-card shadow-2xl lg:hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Daily Blog</h2>
          <Button 
            onClick={onClose} 
            variant="ghost" 
            size="icon"
            aria-label="Close navigation menu"
          >
            <XIcon className="h-6 w-6" aria-hidden="true" />
          </Button>
        </div>
        <nav className="p-4" aria-label="Main navigation">
          <ul className="space-y-2">
            <li>
              <Button
                asChild
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 h-12",
                  isActive('/') && "bg-primary/10 text-primary hover:bg-primary/20"
                )}
                onClick={onClose}
              >
                <Link to="/">
                  <HomeIcon className="h-5 w-5" aria-hidden="true" />
                  <span>Home</span>
                </Link>
              </Button>
            </li>
            <li>
              <Button
                asChild
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 h-12",
                  isActive('/blogs') && "bg-primary/10 text-primary hover:bg-primary/20"
                )}
                onClick={onClose}
              >
                <Link to="/blogs">
                  <BookOpenIcon className="h-5 w-5" aria-hidden="true" />
                  <span>Blogs</span>
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t">
          <p className="text-sm text-muted-foreground">© 2026 Viktor Van Steenweghen</p>
        </div>
      </div>
    </>;
}