import React from 'react';
import { MenuIcon } from 'lucide-react';
interface HeaderProps {
  onMenuClick: () => void;
}
export function Header({
  onMenuClick
}: HeaderProps) {
  return <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="flex-1 max-w-7xl mx-auto px-4 py-4 md:py-6 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <button onClick={onMenuClick} className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" aria-label="Open navigation menu" aria-expanded="false" aria-controls="site-navigation">
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <h1 className="text-xl font-bold text-gray-900 absolute left-1/2 transform -translate-x-1/2">
            Daily Blog
          </h1>
          <div className="invisible" aria-hidden="true">
            {/* This is an invisible element to balance the flex layout */}
            <div className="w-10 h-10"></div>
          </div>
        </div>
      </div>
    </header>;
}