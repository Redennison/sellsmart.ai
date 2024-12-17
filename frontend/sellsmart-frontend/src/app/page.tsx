import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Car, Clock, DollarSign, LineChart } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Features from "./features"
import HowItWorks from "./howItWorks"
import CallToAction from "./callToAction"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="h-[100vh] relative overflow-hidden px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-slate-900" />
        <div className="relative mx-auto max-w-7xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 animate-fadeInText opacity-1">
            Sell Your Car at the Perfect Time
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-3xl mx-auto">
            SellSmart.ai uses advanced AI to analyze market trends, vehicle condition, and optimal timing to help you get the best price for your car.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 group relative overflow-hidden"
            >
              Get Started
              <ArrowRight
                className="ml-2 h-4 w-4 transition-transform group-hover:rotate-90"
              />
            </Button>
            <Button variant="link" className="text-gray-300 hover:text-white">
              Learn more
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* How It Works Section */}
      <HowItWorks />

      {/* CTA Section */}
      <CallToAction />

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black flex items-center justify-center">
        <div className="container px-4 md:px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 text-xl font-bold text-white">
              <Car className="h-6 w-6" />
              SellSmart.ai
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
            © {new Date().getFullYear()} SellSmart.ai. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

