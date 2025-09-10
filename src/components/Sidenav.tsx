import React, { useEffect, useRef } from 'react';
import { XIcon, HomeIcon, BriefcaseIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
interface SidenavProps {
  isOpen: boolean;
  onClose: () => void;
}
export function Sidenav({
  isOpen,
  onClose
}: SidenavProps) {
  const sidenavRef = useRef<HTMLDivElement>(null);
  // Close sidenav when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidenavRef.current && !sidenavRef.current.contains(event.target as Node) && isOpen) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  // Prevent scrolling when sidenav is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  // Handle ESC key to close sidenav
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);
  return <>
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity" aria-hidden="true" />}
      {/* Sidenav */}
      <div ref={sidenavRef} role="dialog" aria-modal="true" aria-label="Site navigation" className={`fixed top-0 left-0 z-30 h-full w-64 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-900">Daily Blog</h2>
          <button onClick={onClose} className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500" aria-label="Close menu">
            <XIcon className="h-6 w-6" aria-hidden="true" />
            <span className="sr-only">Close menu</span>
          </button>
        </div>
        <nav className="mt-4" aria-label="Main navigation">
          <ul>
            <li>
              <Link to="/" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500" onClick={onClose}>
                <HomeIcon className="h-5 w-5 mr-3 text-gray-500" aria-hidden="true" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/portfolio" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500" onClick={onClose}>
                <BriefcaseIcon className="h-5 w-5 mr-3 text-gray-500" aria-hidden="true" />
                <span>Portfolio</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <p className="text-sm text-gray-500">© 2023 Daily Blog</p>
        </div>
      </div>
    </>;
}