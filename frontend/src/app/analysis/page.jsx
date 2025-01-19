'use client';

import LineChart from '@/components/chart/lineChart';
import SlidingBar from '@/components/sliding-bar/slidingBar';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingSpinner from "../../components/loading-spinner/loadingSpinner"

export default function AnalysisPage() {
  const router = useRouter();
  const [queryParams, setQueryParams] = useState({});

  const [slider1Value, setSlider1Value] = useState(5000);
  const [slider2Value, setSlider2Value] = useState(2500);
  const [loading, setLoading] = useState(true)

  // Token check
  // Token decrement
  // ML CALL

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search); // Parse the query params
    const params = Object.fromEntries(searchParams.entries());
    params.km = Number(params.km)
    params.year = Number(params.year)
    setQueryParams(params);
  }, []);

  useEffect(() => {
    if (queryParams.km) {
      setLoading(false)
    } else {
      setLoading(true)
    }
  }, [queryParams])

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
      {
        !loading ? 
          <div className="mt-[4rem] flex flex-col lg:grid lg:grid-cols-7 h-full max-h-[calc(100vh-4rem)]">
            {/* Left 80% split into two halves */}
            <div className="lg:col-span-5 grid grid-rows-[3fr_2fr] max-h-[calc(100vh-4rem)]">
              {/* Top half */}
              <div className="text-white pt-8 pr-8 p-4 overflow-y-auto">
                <LineChart 
                  maxKm = {slider1Value + queryParams.km} 
                  curKm = {queryParams.km}
                  step = {slider2Value} 
                />
              </div>
              {/* Bottom half */}
              <div className="flex flex-col items-center justify-evenly bg-gray-900 text-white p-4">
                <SlidingBar 
                  id="1" 
                  title="Future Kilometers for SellSmartAI to Analyze" 
                  unit="km" 
                  onValueChange={setSlider1Value}
                  valid={(updatedValue) => {
                    return updatedValue >= slider2Value
                  }}
                />
                <SlidingBar 
                  id="2" 
                  title="Kilometer Increment for Analyzing Value Changes" 
                  min={2500} 
                  max={10000} 
                  step={2500} 
                  onValueChange={setSlider2Value}
                  valid={(updatedValue) => {
                    return updatedValue <= slider1Value
                  }}
                />
              </div>
            </div>
            {/* Right 20% */}
            <div className="lg:col-span-2 text-white bg-[#080f18] py-20 lg:py-10 px-14 flex flex-col justify-evenly space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-purple-300 mb-2">Optimal Sell Recommendation</h2>
                <p className="text-gray-400 leading-6">
                  Assuming you want to drive your current vehicle for as long as possible, we recommend selling at
                  <span className="text-purple-300 font-bold"> {queryParams.km} km</span>.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-purple-300 mb-2">Data Analysis</h2>
                <p className="text-gray-400 leading-6">To make this prediction, we analyzed:</p>
                <ul className="list-disc list-inside text-gray-400 mt-2">
                  <li>238 exact matches</li>
                  <li>2137 similar vehicles</li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-purple-300 mb-2">Confidence Rating</h2>
                <p className="text-gray-400 leading-6">
                  We achieved a confidence rating of:
                  <span className="text-purple-300 font-bold"> 93%</span>.
                </p>
              </div>
            </div>
          </div>
        : <LoadingSpinner /> 
      }
    </div>
  );
}
