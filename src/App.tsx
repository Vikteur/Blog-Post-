import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidenav } from './components/Sidenav';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { AuthProvider } from './contexts/AuthContext';
interface AppProps {
  page?: string;
}
export function App({
  page = 'home'
}: AppProps) {
  const [sidenavOpen, setSidenavOpen] = useState(false);
  return <AuthProvider>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header onMenuClick={() => setSidenavOpen(true)} />
        <Sidenav isOpen={sidenavOpen} onClose={() => setSidenavOpen(false)} />
        <main className="flex-1 px-4 py-8 md:px-6 lg:px-8">
          {page === 'profile' ? <Profile /> : <Home />}
        </main>
      </div>
    </AuthProvider>;
}