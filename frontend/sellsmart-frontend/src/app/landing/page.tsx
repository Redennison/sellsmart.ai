"use client"

import Link from "next/link"
import Features from "@/components/ui/features"
import HowItWorks from "@/components/ui/howItWorks"
import CallToAction from "@/components/ui/callToAction"
import Landing from "@/components/ui/hero"
import { useRef, useEffect } from "react"
import Image from "next/image"
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function LandingPage() {

  const { user, error, isLoading } = useUser();

  const router = useRouter();

  useEffect(() => {
    // If user is logged in, redirect to analyze page
    if (user) {
      router.push('/analyze')
    } 
  })

  console.log(user);

  // Reference for the target div
  const learnMoreRef = useRef<HTMLDivElement | null>(null);
  const getStartedRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the target div when button is clicked
  const scrollToTarget = (targetDivRef: React.RefObject<HTMLDivElement | null>) => {
    if (targetDivRef.current) {
      targetDivRef.current.scrollIntoView({
        behavior: "smooth", // Enables smooth scrolling
        block: "start", // Aligns the top of the div with the viewport
      });
    }
  };

  return (

    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <Landing scrollToTarget={scrollToTarget} learnMoreRef={learnMoreRef} getStartedRef={getStartedRef} />

      {/* Features Section */}
      <Features ref={learnMoreRef} />

      {/* How It Works Section */}
      <HowItWorks />

      {/* CTA Section */}
      <CallToAction ref={getStartedRef} />

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black flex items-center justify-center">
        <div className="container px-4 md:px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 text-xl font-bold text-white">
              <Image
                src="/sell_smart_logo_no_text.png" // Path relative to the public folder
                alt="Company Logo"
                width={20} // Adjust dimensions as needed
                height={20}
              />
              SellSmartAI
            </div>
            <div className="mt-6 md:mt-0">
              <nav className="flex gap-8 text-sm text-gray-400">
                <Link href="#" className="hover:text-white">
                  About
                </Link>
                <Link href="#" className="hover:text-white">
                  Features
                </Link>
                <Link href="#" className="hover:text-white">
                  Pricing
                </Link>
                <Link href="#" className="hover:text-white">
                  Contact
                </Link>
              </nav>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} SellSmartAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
