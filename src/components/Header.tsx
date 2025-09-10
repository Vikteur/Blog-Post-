import React, { useState } from 'react';
import { MenuIcon, SearchIcon, UserIcon, LogOutIcon } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { useAuth } from '../contexts/AuthContext';
import { LoginModal } from './LoginModal';
interface HeaderProps {
  onMenuClick: () => void;
}
export function Header({
  onMenuClick
}: HeaderProps) {
  const {
    user,
    isAuthenticated,
    logout
  } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  return <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button onClick={onMenuClick} className="p-2 -ml-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500" aria-label="Open menu">
              <MenuIcon className="h-6 w-6" />
            </button>
            <div className="ml-4 md:ml-6">
              <h1 className="text-xl font-bold text-gray-900">Daily Blog</h1>
            </div>
          </div>
          <div className="hidden md:block flex-1 mx-8">
            <SearchBar />
          </div>
          <div className="flex items-center">
            {isAuthenticated ? <div className="flex items-center">
                <div className="mr-3 flex items-center">
                  {user?.avatar ? <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" /> : <UserIcon className="h-6 w-6 text-gray-500" />}
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    {user?.name}
                  </span>
                </div>
                <button onClick={logout} className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  <LogOutIcon className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </div> : <button onClick={() => setIsLoginModalOpen(true)} className="ml-3 -mr-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Login
              </button>}
          </div>
        </div>
        <div className="md:hidden py-3 px-2">
          <SearchBar />
        </div>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </header>;
}