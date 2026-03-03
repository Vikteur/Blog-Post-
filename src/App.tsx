import { useState } from 'react';
import { Header } from './components/Header';
import { Sidenav } from './components/Sidenav';
import { Home } from './pages/Home';
import { Portfolio } from './pages/Portfolio';
import { BlogPostDetail } from './pages/BlogPostDetail';
import { SkipToContent } from './components/SkipToContent';
import { Footer } from './components/Footer';
interface AppProps {
  page?: string;
}
export function App({
  page = 'home'
}: AppProps) {
  const [sidenavOpen, setSidenavOpen] = useState(false);

  function renderPage() {
    if (page === 'blogs') return <Home />;
    if (page === 'post') return <BlogPostDetail />;
    return <Portfolio />;
  }

  return <div className="flex flex-col min-h-screen bg-background relative overflow-hidden noise-texture">
      {/* Refined decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle gradient orbs */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[100px] animate-subtleGlow" />
        <div className="absolute top-1/3 -left-40 w-[400px] h-[400px] bg-accent/6 rounded-full blur-[80px] animate-subtleGlow" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-40 right-1/4 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[90px] animate-subtleGlow" style={{ animationDelay: '4s' }} />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 dot-pattern opacity-30" />
      </div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <SkipToContent />
        <Header onMenuClick={() => setSidenavOpen(true)} isMenuOpen={sidenavOpen} />
        <Sidenav isOpen={sidenavOpen} onClose={() => setSidenavOpen(false)} />
        <main id="main-content" className="flex-1 px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </div>;
}