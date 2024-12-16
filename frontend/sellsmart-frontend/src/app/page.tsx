import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Car, Clock, DollarSign, LineChart } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="h-[100vh] relative overflow-hidden px-4 sm:px-6 lg:px-8 flex items-center justify-center">
  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-slate-900" />
  <div className="relative mx-auto max-w-7xl text-center">
    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 animate-fadeIn opacity-1">
      Sell Your Car at the Perfect Time
    </h1>
    <p className="mt-6 text-lg leading-8 text-gray-300 max-w-3xl mx-auto">
      SellSmart.ai uses advanced AI to analyze market trends, vehicle condition, and optimal timing to help you get the best price for your car.
    </p>
    <div className="mt-10 flex items-center justify-center gap-x-6">
      <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
        Get Started <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      <Button variant="link" className="text-gray-300 hover:text-white">
        Learn more
      </Button>
    </div>
  </div>
</section>






      {/* Features Section */}
      <section className="py-24 bg-slate-900">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <LineChart className="h-10 w-10 text-purple-500" />
                <CardTitle className="text-white mt-4">Market Analysis</CardTitle>
                <CardDescription className="text-gray-400">
                  Real-time market data analysis to determine the optimal selling price
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <Clock className="h-10 w-10 text-purple-500" />
                <CardTitle className="text-white mt-4">Perfect Timing</CardTitle>
                <CardDescription className="text-gray-400">
                  AI-powered predictions for the best time to sell your vehicle
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <DollarSign className="h-10 w-10 text-purple-500" />
                <CardTitle className="text-white mt-4">Value Optimization</CardTitle>
                <CardDescription className="text-gray-400">
                  Personalized recommendations to maximize your car's resale value
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-black">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            How SellSmart.ai Works
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="relative pl-16">
              <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Enter Your Car Details</h3>
              <p className="text-gray-400">
                Provide basic information about your vehicle including make, model, year, and condition.
              </p>
            </div>
            <div className="relative pl-16">
              <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Get AI Analysis</h3>
              <p className="text-gray-400">
                Our AI analyzes market trends, seasonal patterns, and local demand to determine the best time to sell.
              </p>
            </div>
            <div className="relative pl-16">
              <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Maximize Your Sale</h3>
              <p className="text-gray-400">
                Receive detailed recommendations and timing advice to get the best possible price for your car.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900">
        <div className="container px-4 md:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-purple-600">
            <div className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
              <div className="relative mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Ready to Get the Best Value for Your Car?
                </h2>
                <p className="mt-6 text-lg leading-8 text-purple-100">
                  Join thousands of smart sellers who use SellSmart.ai to time their car sales perfectly.
                </p>
                <div className="mt-10">
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                    Start Your Free Analysis
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black">
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

