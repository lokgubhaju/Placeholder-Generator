'use client';

import React from 'react';
import Image from 'next/image';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Image
              src="/placeholder_final_logo.png"
              alt="Placeholder Generator Logo"
              width={200}
              height={200}
              priority
              className="h-auto max-h-20 w-auto"
              style={{ maxHeight: '100px', height: 'auto', width: 'auto' }}
            />
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:inline">
              Generate custom placeholder assets
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};
