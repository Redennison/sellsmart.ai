"use client"

import Link from "next/link"
import Features from "@/components/landing-page/features"
import HowItWorks from "@/components/landing-page/howItWorks"
import CallToAction from "@/components/landing-page/callToAction"
import Landing from "@/components/landing-page/hero"
import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/app/firebase/config'
import FooterModal from "@/components/modals/footerModal"

export default function LandingPage() {
  const [user] = useAuthState(auth)
  const router = useRouter()
  const [showAboutModal, setShowAboutModal] = useState(false)
  const [showFeaturesModal, setShowFeaturesModal] = useState(false)
  const [showPricingModal, setShowPricingModal] = useState(false)

  useEffect(() => {
    // Check if running in the browser
    if (user && router) {
      // router.push('/analyze')
    }
  }, [user, router]);

  // Reference for the target div
  const learnMoreRef = useRef(null);
  const getStartedRef = useRef(null);

  // Scroll to the target div when button is clicked
  const scrollToTarget = (targetDivRef) => {
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
      <div ref={learnMoreRef}>
        <Features />
      </div>

      {/* How It Works Section */}
      <HowItWorks />

      {/* CTA Section */}
      <div ref={getStartedRef}>
        <CallToAction />
      </div>

      {/* About Modal */}
      {showAboutModal && 
        <FooterModal 
          title="About Us"
          description={<>
            At SellSmartAI, we leverage our own <strong>cutting-edge artificial intelligence</strong> to analyze <strong>real-time vehicle depreciation rates</strong> with plans to soon market trends analysis, buyer demand, and seasonal fluctuations - giving you the best possible time to sell your car for top dollar.
            
            <br/><br/>
            
            Our <strong>AI-driven platform</strong> takes the guesswork out of selling by providing <strong>data-backed insights</strong> tailored to your car's make, model, and mileage. Whether you're looking to sell fast or optimize for the highest offer, SellSmartAI empowers you with <strong>precise predictions</strong> and <strong>actionable recommendations</strong>.
          </>}
          setShowFooterModal={setShowAboutModal} 
        />
      }

      {/* Features Modal */}
      {showFeaturesModal &&
        <FooterModal
          title="Our Features"
          description={<>
            <strong>Real-Time Price Predictions:</strong> Get data-driven price estimates based on your car's make, model, and mileage with plans to expand in the future - so you can set the right asking price.
            <br/><br/>
            <strong>Instant Vehicle Valuation:</strong> Enter your car's details and receive an instant valuation, giving you a clear picture of its worth in today's market.
            <br/><br/>
            <strong>Maximize Your Profits:</strong> With our sell-smart recommendations, you'll know whether to wait for a better market or sell now for a great price.
            <br/><br/>
            <strong>Sell Smarter, Not Harder:</strong> No more guesswork, endless research, or underpricing your car. SellSmartAI does the heavy lifting so you can sell with confidence.
          </>}
          setShowFooterModal={setShowFeaturesModal}
        />
      }
      {/* Pricing Modal */}
      {showPricingModal &&
        <FooterModal
          title="Pricing Plans"
          description={<>
            <strong>Currently Free:</strong> All features are completely free to use! We're working on advanced analysis features that will be available through a premium plan in the future.
            <br/><br/>
            <strong>Future Premium Plan:</strong> Advanced market analytics and enhanced features are in development. Pricing details will be announced as these features are completed.
            <br/><br/>
            <strong>Support Our Work:</strong> If you find our service valuable, you can support us through our "Buy us a coffee" donation model. We greatly appreciate any contributions!
          </>}
          setShowFooterModal={setShowPricingModal}
        />
      }

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
                <button onClick={() => setShowAboutModal(true)} className="hover:text-white">
                  About
                </button>
                <button onClick={() => setShowFeaturesModal(true)} className="hover:text-white">
                  Features
                </button>
                <button onClick={() => setShowPricingModal(true)} className="hover:text-white">
                  Pricing
                </button>
                <Link href="https://mail.google.com/mail/u/0/?fs=1&to=sellsmart.ai@gmail.com&tf=cm" target="_blank"
                  className="hover:text-white">
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
