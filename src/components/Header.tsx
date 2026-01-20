import { MenuIcon, HomeIcon, BookOpenIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onMenuClick: () => void;
  isMenuOpen: boolean;
}

export function Header({
  onMenuClick,
  isMenuOpen
}: HeaderProps) {
  const location = useLocation();
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path === '/blogs' && (location.pathname === '/blogs' || location.pathname.startsWith('/post/'))) return true;
    return false;
  };

  return <header className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 md:px-6 md:py-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Mobile menu button - only show on small screens */}
          <Button 
            onClick={onMenuClick}
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Open navigation menu" 
            aria-expanded={isMenuOpen}
            aria-controls="site-navigation"
          >
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </Button>

          {/* Logo/Title */}
          <h1 className="text-base md:text-xl font-bold lg:static absolute left-1/2 lg:left-0 transform -translate-x-1/2 lg:transform-none whitespace-nowrap">
            Viktor Van Steenweghen
          </h1>

          {/* Desktop Navigation - only show on large screens */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className={cn(
                "gap-2",
                isActive('/') && "bg-primary/10 text-primary hover:bg-primary/20"
              )}
            >
              <Link to="/">
                <HomeIcon className="h-4 w-4" aria-hidden="true" />
                Home
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className={cn(
                "gap-2",
                isActive('/blogs') && "bg-primary/10 text-primary hover:bg-primary/20"
              )}
            >
              <Link to="/blogs">
                <BookOpenIcon className="h-4 w-4" aria-hidden="true" />
                Blogs
              </Link>
            </Button>
          </nav>

          {/* Spacer for mobile layout */}
          <div className="lg:hidden invisible" aria-hidden="true">
            <div className="w-10 h-10"></div>
          </div>
        </div>
      </div>
    </header>;
}