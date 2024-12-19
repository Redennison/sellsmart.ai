import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import Link from 'next/link'
import Image from 'next/image'
import { UserProvider } from '@auth0/nextjs-auth0/client';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Car Analysis App',
  description: 'Analyze your car details and view history',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <UserProvider>
            <body className={`${inter.className} bg-gradient-to-br from-black via-gray-900 to-gray-800 min-h-screen`}>
                <nav className="bg-black/80 backdrop-blur-sm border-b border-gray-700">
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
                        <Link href="/analyze" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                        Analyze
                        </Link>
                        <Link href="/analyze/history" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                        History
                        </Link>
                        <Link href="/api/auth/logout" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                        Logout
                        </Link>
                    </div>
                    </div>
                </div>
                </nav>
                <main>{children}</main>
            </body>
        </UserProvider>
    </html>
  )
}

