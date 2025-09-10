import React from 'react';
export function SkipToContent() {
  return <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-700 focus:text-white focus:rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-blue-500">
      Skip to main content
    </a>;
}