'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

const Navbar = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    // Render a placeholder while the user state is loading
    return <div className="h-16 bg-black" />;
  }

  return (
    <nav className="top-0 fixed w-full z-50 bg-black/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-white text-lg font-semibold flex items-center gap-2">
              <Image
                src="/sell_smart_logo_no_text.png" // Path relative to the public folder
                alt="Company Logo"
                width={20} // Adjust dimensions as needed
                height={20}
              />
              SellSmartAI
            </span>
          </div>
          <div className="flex">
            {user ? (
              <>
                <Link
                  href="/analyze"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Analyze
                </Link>
                <Link
                  href="/analyze/history"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  History
                </Link>
                <Link
                  href="/api/auth/logout"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Logout
                </Link>
              </>
            ) : (
              <Link
                href="/api/auth/login"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
