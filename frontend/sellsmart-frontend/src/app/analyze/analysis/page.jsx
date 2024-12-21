'use client';

import LineChart from '@/components/chart/lineChart';
import SlidingBar from '@/components/sliding-bar/slidingBar';
import { getCarMakesAndModels } from '@/lib/utils'

export default function AnalysisPage() {

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
      <div className="mt-[4rem] flex flex-col lg:grid lg:grid-cols-7 h-full max-h-[calc(100vh-4rem)]">
        {/* Left 80% split into two halves */}
        <div className="lg:col-span-5 grid grid-rows-[3fr_2fr] max-h-[calc(100vh-4rem)]">
          {/* Top half */}
          <div className="text-white p-4 overflow-y-auto">
            <LineChart />
          </div>
          {/* Bottom half */}
          <div className="flex flex-col items-center justify-evenly bg-gray-900 text-white p-4">
            <SlidingBar id="1" title="Adjust Slider to Find Optimal Sell Time Within Kilometer Range" unit="km" />
            <SlidingBar id="2" title="Number of Highest Value Drops You Would Like SellSmartAI to Highlight" min={1} max={6} step={1} />
          </div>
        </div>
        {/* Right 20% */}
        <div className="lg:col-span-2 text-white bg-[#080f18] py-20 lg:py-10 px-14 flex flex-col justify-evenly space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-purple-300 mb-2">
              Optimal Sell Recommendation
            </h2>
            <p className="text-gray-400 leading-6">
              Assuming you want to drive your current vehicle for as long as possible, we recommend selling at
              <span className="text-purple-300 font-bold"> 50,000km</span>.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-purple-300 mb-2">
              Data Analysis
            </h2>
            <p className="text-gray-400 leading-6">
              To make this prediction, we analyzed:
            </p>
            <ul className="list-disc list-inside text-gray-400 mt-2">
              <li>238 exact matches</li>
              <li>2137 similar vehicles</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-purple-300 mb-2">
              Confidence Rating
            </h2>
            <p className="text-gray-400 leading-6">
              We achieved a confidence rating of:
              <span className="text-purple-300 font-bold"> 93%</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
