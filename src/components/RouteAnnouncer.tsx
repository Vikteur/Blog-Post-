import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Route announcer for screen readers
 * Announces route changes to assistive technology users
 */
export function RouteAnnouncer() {
  const location = useLocation();
  const announceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (announceRef.current) {
      // Determine the page title based on the route
      let announcement = '';
      
      if (location.pathname === '/') {
        announcement = 'Navigated to Home page';
      } else if (location.pathname === '/blogs') {
        announcement = 'Navigated to Blogs page';
      } else if (location.pathname.startsWith('/post/')) {
        announcement = 'Navigated to Blog post details';
      } else {
        announcement = 'Page navigation complete';
      }

      // Clear and set new announcement
      announceRef.current.textContent = '';
      setTimeout(() => {
        if (announceRef.current) {
          announceRef.current.textContent = announcement;
        }
      }, 100);
    }
  }, [location.pathname]);

  return (
    <div
      ref={announceRef}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    />
  );
}
