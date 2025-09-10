import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidenav } from './components/Sidenav';
import { Home } from './pages/Home';
export function App() {
  const [sidenavOpen, setSidenavOpen] = useState(false);
  return <div className="flex flex-col min-h-screen bg-gray-50">
      <Header onMenuClick={() => setSidenavOpen(true)} />
      <Sidenav isOpen={sidenavOpen} onClose={() => setSidenavOpen(false)} />
      <main className="flex-1 px-4 py-8 md:px-6 lg:px-8">
        <Home />
      </main>
    </div>;
}