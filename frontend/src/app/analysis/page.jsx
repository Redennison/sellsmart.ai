'use client';

import LineChart from '@/components/chart/lineChart';
import SlidingBar from '@/components/sliding-bar/slidingBar';
import DoubleSlider from '../../components/sliding-bar/doubleSlidingBar';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingSpinner from "../../components/loading-spinner/loadingSpinner"
import { formatNumber } from '../../lib/utils';
import { GrCircleQuestion } from "react-icons/gr";

const MAX_KM = 200000
const MIN_STEP = 2500
const MAX_STEP = 10000

export default function AnalysisPage() {
  const router = useRouter();
  const [queryParams, setQueryParams] = useState({});

  const [doubleSliderValues, setDoubleSliderValues] = useState(null);
  const [singleSliderValue, setSingleSliderValue] = useState(null);
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
    setDoubleSliderValues([params.km, MAX_KM])
    setSingleSliderValue(MIN_STEP)
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
                  maxKm = {doubleSliderValues[1]} 
                  curKm = {doubleSliderValues[0]}
                  step = {singleSliderValue} 
                />
              </div>
              {/* Bottom half */}
              <div className="flex flex-col items-center justify-evenly bg-gray-900 text-white p-4">
                <div className="w-full flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="group relative">
                      <GrCircleQuestion className="text-gray-400 text-lg cursor-help" />
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity w-64 text-center">
                        Adjust the range of kilometers to see how your car's value changes over different distances
                      </div>
                    </div>
                    <h3 className="text-gray-400 font-semibold text-lg">Kilometer Range Selection</h3>
                  </div>
                  <DoubleSlider
                    min={queryParams.km}
                    max={200000}
                    onChange={(newSliderValues) => {
                      setDoubleSliderValues(newSliderValues)
                    }}
                  />
                </div>
                <div className="w-full flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="group relative">
                      <GrCircleQuestion className="text-gray-400 text-lg cursor-help" />
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity w-64 text-center">
                        Adjust the interval between data points on the graph for more or less detailed analysis
                      </div>
                    </div>
                    <h3 className="text-gray-400 font-semibold text-lg">Step Size Adjustment</h3>
                  </div>
                  <SlidingBar 
                    min={MIN_STEP}
                    max={MAX_STEP}
                    onChange={(newSliderValue) => {
                      setSingleSliderValue(newSliderValue)
                    }}
                  />
                </div>
              </div>
            </div>
            {/* Right 20% */}
            <div className="lg:col-span-2 text-white bg-[#080f18] py-20 lg:py-10 px-14 flex flex-col justify-evenly space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-[#6AA84F] mb-2">Optimal Sell Recommendation</h2>
                <p className="text-gray-400 leading-6">
                  Assuming you want to drive your current vehicle for as long as possible, we recommend selling at
                  <span className="text-[#6AA84F] font-bold"> {formatNumber(queryParams.km)} km</span>.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#6AA84F] mb-2">Data Analysis</h2>
                <p className="text-gray-400 leading-6">To make this prediction, we analyzed:</p>
                <ul className="list-disc list-inside text-gray-400 mt-2">
                  <li>238 exact matches</li>
                  <li>2137 similar vehicles</li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#6AA84F] mb-2">Confidence Rating</h2>
                <p className="text-gray-400 leading-6">
                  We achieved a confidence rating of:
                  <span className="text-[#6AA84F] font-bold"> 93%</span>.
                </p>
              </div>
            </div>
          </div>
        : <LoadingSpinner /> 
      }
    </div>
  );
}
