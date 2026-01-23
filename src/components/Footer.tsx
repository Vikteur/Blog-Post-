import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="relative mt-20 border-t border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-14 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* About Section */}
            <div>
              <h3 className="text-base font-semibold mb-4 text-foreground tracking-tight">
                Viktor Van Steenweghen
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Full-stack developer passionate about creating elegant solutions and sharing knowledge through writing.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-base font-semibold mb-4 text-foreground tracking-tight">Quick Links</h3>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="/blogs"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                  >
                    Portfolio
                  </a>
                </li>
                <li>
                  <a
                    href="https://jcast.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                  >
                    JCast Podcast
                  </a>
                </li>
              </ul>
            </div>

            {/* Connect Section */}
            <div>
              <h3 className="text-base font-semibold mb-4 text-foreground tracking-tight">Connect</h3>
              <div className="flex gap-2">
                <a
                  href="https://www.linkedin.com/in/viktorvansteenweghen/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="https://github.com/Vikteur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href="mailto:viktor.vansteenweghen@gmail.com"
                  className="p-2.5 rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                  aria-label="Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-border/30 text-center">
            <p className="text-muted-foreground text-xs">
              {new Date().getFullYear()} Viktor Van Steenweghen. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 rounded-full w-11 h-11 p-0 shadow-elevated hover:shadow-glow bg-card border border-border/50 text-foreground hover:text-primary hover:border-primary/30 transition-all duration-200"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}
    </>
  );
}
