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
      <footer className="relative mt-16 border-t border-primary/10 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-12 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Section */}
            <div>
              <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Viktor Van Steenweghen
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Full-stack developer passionate about creating elegant solutions and sharing knowledge through writing.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-foreground">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="/blogs" 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a 
                    href="/" 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Portfolio
                  </a>
                </li>
                <li>
                  <a 
                    href="https://jcast.dev/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    JCast Podcast
                  </a>
                </li>
              </ul>
            </div>

            {/* Connect Section */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-foreground">Connect</h3>
              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/in/viktorvansteenweghen/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/Vikteur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="mailto:viktor.vansteenweghen@gmail.com"
                  className="p-2 rounded-lg bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-primary/10 text-center">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Viktor Van Steenweghen. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 rounded-full w-12 h-12 p-0 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </>
  );
}
