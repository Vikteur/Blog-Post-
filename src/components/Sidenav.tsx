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
      <div className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm transition-opacity lg:hidden" aria-hidden="true" onClick={onClose} />
      {/* Sidenav */}
      <div ref={sidenavRef} id="site-navigation" role="dialog" aria-modal="true" aria-label="Site navigation" className="fixed top-0 left-0 z-50 h-full w-72 bg-card/95 backdrop-blur-lg shadow-elevated border-r border-border/50 lg:hidden">
        <div className="flex justify-between items-center p-5 border-b border-border/50">
          <h2 className="text-base font-semibold text-foreground tracking-tight">Viktor Van Steenweghen</h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="h-9 w-9 hover:bg-muted/60"
            aria-label="Close navigation menu"
          >
            <XIcon className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
        <nav className="p-4" aria-label="Main navigation">
          <ul className="space-y-1">
            <li>
              <Button
                asChild
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 h-11 font-medium",
                  isActive('/')
                    ? "bg-primary/10 text-primary hover:bg-primary/15"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
                onClick={onClose}
              >
                <Link to="/">
                  <HomeIcon className="h-4 w-4" aria-hidden="true" />
                  <span>Portfolio</span>
                </Link>
              </Button>
            </li>
            <li>
              <Button
                asChild
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 h-11 font-medium",
                  isActive('/blogs')
                    ? "bg-primary/10 text-primary hover:bg-primary/15"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
                onClick={onClose}
              >
                <Link to="/blogs">
                  <BookOpenIcon className="h-4 w-4" aria-hidden="true" />
                  <span>Blog</span>
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-border/50">
          <p className="text-xs text-muted-foreground">{new Date().getFullYear()} Viktor Van Steenweghen</p>
        </div>
      </div>
    </>;
}