import { useState } from 'react';
import { Header } from './components/Header';
import { Sidenav } from './components/Sidenav';
import { Home } from './pages/Home';
import { Portfolio } from './pages/Portfolio';
import { SkipToContent } from './components/SkipToContent';
import { Footer } from './components/Footer';
interface AppProps {
  page?: string;
}
export function App({
  page = 'home'
}: AppProps) {
  const [sidenavOpen, setSidenavOpen] = useState(false);
  return <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-primary/5 to-purple-500/10 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-pink-500/5 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        <SkipToContent />
        <Header onMenuClick={() => setSidenavOpen(true)} isMenuOpen={sidenavOpen} />
        <Sidenav isOpen={sidenavOpen} onClose={() => setSidenavOpen(false)} />
        <main id="main-content" className="flex-1 px-4 py-8 md:px-6 lg:px-8">
          {page === 'blogs' ? <Home /> : <Portfolio />}
        </main>
        <Footer />
      </div>
    </div>;
}