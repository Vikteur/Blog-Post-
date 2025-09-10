import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidenav } from './components/Sidenav';
import { Home } from './pages/Home';
import { Portfolio } from './pages/Portfolio';
import { SkipToContent } from './components/SkipToContent';
interface AppProps {
  page?: string;
}
export function App({
  page = 'home'
}: AppProps) {
  const [sidenavOpen, setSidenavOpen] = useState(false);
  return <div className="flex flex-col min-h-screen bg-gray-50">
      <SkipToContent />
      <Header onMenuClick={() => setSidenavOpen(true)} />
      <Sidenav isOpen={sidenavOpen} onClose={() => setSidenavOpen(false)} />
      <main id="main-content" className="flex-1 px-4 py-8 md:px-6 lg:px-8" tabIndex={-1}>
        {page === 'portfolio' ? <Portfolio /> : <Home />}
      </main>
    </div>;
}