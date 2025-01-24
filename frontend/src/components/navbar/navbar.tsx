'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/app/firebase/config'
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const [user] = useAuthState(auth)

    const router = useRouter();

  return (
    <nav className="top-0 fixed w-full z-50 bg-black/80 backdrop-blur-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <span className="text-white text-lg font-semibold flex items-center gap-2">
                <Image
                  src="/sell_smart_logo_no_text.png" // Path relative to the public folder
                  alt="Company Logo"
                  width={20} // Adjust dimensions as needed
                  height={20}
                />
                SellSmartAI
              </span>
            </Link>
          </div>
          <div className="flex">
            {user ? (
              <>
                <Link
                  href="/analyze"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white ml-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Analyze
                </Link>
                <Link
                  href="/history"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white ml-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  History
                </Link>
                <button
                  onClick={() => {
                    signOut(auth)
                    sessionStorage.removeItem('user')
                    return router.push('/')
                  }}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white ml-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white ml-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="text-black bg-[#6AA84F] hover:bg-green-700 ml-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
