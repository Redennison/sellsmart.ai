'use client';

import LineChart from '@/components/chart/lineChart';
import NumberSelect from '../../components/number-select/numberSelect';
import DoubleSlider from '../../components/sliding-bar/doubleSlidingBar';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingSpinner from "../../components/loading-spinner/loadingSpinner"
import { formatNumber, countMatches, confidenceRating, calcIdxOfGreatestValueDrop, filterXAndYAxisValues } from '../../lib/utils';
import { GrCircleQuestion } from "react-icons/gr";

const MAX_KM = 200000
const MIN_STEP = 2500
const MAX_STEP = 10000

export default function AnalysisPage() {
  const router = useRouter();
  const [queryParams, setQueryParams] = useState({});
  const [doubleSliderValues, setDoubleSliderValues] = useState(null);
  const [numberSelectValue, setNumberSelectValue] = useState(MAX_STEP);
  const [matches, setMatches] = useState(null);
  const [loading, setLoading] = useState(true);
  const [curXAxisValues, setCurXAxisValues] = useState(null);
  const [curYAxisValues, setCurYAxisValues] = useState(null);
  const [allXAxisValues, setAllXAxisValues] = useState(null);
  const [allYAxisValues, setAllYAxisValues] = useState(null);
  const [idxOfGreatestValueDrop, setIdxOfGreatestValueDrop] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(searchParams.entries());
        params.km = Number(params.km);
        params.year = Number(params.year);

        const response = await fetch('http://127.0.0.1:5000/predict', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
          mode: 'cors'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        let xAxisValues = [];
        let yAxisValues = [];
        data.received_data.forEach(([km, price]) => {
          xAxisValues.push(km)
          yAxisValues.push(price)
        })
        setAllXAxisValues(xAxisValues)
        setAllYAxisValues(yAxisValues)

        const [filteredXAxisValues, filteredYAxisValues] = filterXAndYAxisValues(xAxisValues, yAxisValues, MAX_STEP, params.km, MAX_KM)

        setCurXAxisValues(filteredXAxisValues)
        setCurYAxisValues(filteredYAxisValues)
        setIdxOfGreatestValueDrop(calcIdxOfGreatestValueDrop(yAxisValues))

        setQueryParams(params);
        setDoubleSliderValues([params.km, MAX_KM]);

        const fetchedMatches = await countMatches(params.make, params.model, params.km, params.year);
        setMatches(fetchedMatches);
      } finally {
        setLoading(false)
      }
    };
    setLoading(true);
    fetchData();
  }, []);

  useEffect(() => {
    if (!doubleSliderValues || !numberSelectValue) {
      return
    }

    const [filteredXAxisValues, filteredYAxisValues] = filterXAndYAxisValues(allXAxisValues, allYAxisValues, numberSelectValue, doubleSliderValues[0], doubleSliderValues[1])

    setCurXAxisValues(filteredXAxisValues)
    setCurYAxisValues(filteredYAxisValues)
    setIdxOfGreatestValueDrop(calcIdxOfGreatestValueDrop(filteredYAxisValues))
  }, [doubleSliderValues, numberSelectValue])

  // useEffect(() => {
  //   if (queryParams && matches && curXAxisValues && curYAxisValues && idxOfGreatestValueDrop) {
  //     setLoading(false);
  //   }
  // }, [queryParams, matches, curXAxisValues, curYAxisValues, idxOfGreatestValueDrop]);

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
      {!loading ? (
        <div className="mt-[4rem] flex flex-col xl:grid xl:grid-cols-7 h-full max-h-[calc(100vh-4rem)]">
          {/* LEFT 80% (Chart & Bottom Controls) */}
          <div className="xl:col-span-5 grid grid-rows-[4fr_1fr] max-h-[calc(100vh-4rem)]">
            {/* Top half (Chart) */}
            <div className="text-white py-8 px-4 overflow-y-auto">
              <LineChart
                maxKm={doubleSliderValues[1]}
                curKm={doubleSliderValues[0]}
                step={numberSelectValue}
                xAxisValues={curXAxisValues}
                yAxisValues={curYAxisValues}
                idxOfGreatestValueDrop={idxOfGreatestValueDrop}
              />
            </div>

            {/* Bottom half (Controls) */}
            <div className="bg-gray-900 text-white px-4 py-8">
              <div className="
                w-full
                max-w-4xl
                mx-auto
                flex
                flex-col
                items-center
                xl:flex-row
                xl:justify-evenly
                xl:items-start
                xl:gap-4
              ">
                {/* Kilometer Range Selection */}
                <div className="w-full xl:w-3/4 flex flex-col items-center mb-8 xl:mb-0">
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
                    max={MAX_KM}
                    onChange={(newSliderValues) => {
                      setDoubleSliderValues(newSliderValues);
                    }}
                  />
                </div>

                {/* Step Size Adjustment */}
                <div className="w-full xl:w-1/4 flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="group relative">
                      <GrCircleQuestion className="text-gray-400 text-lg cursor-help" />
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity w-64 text-center">
                        Adjust the interval between data points on the graph for more or less detailed analysis
                      </div>
                    </div>
                    <h3 className="text-gray-400 font-semibold text-lg">Step Size Adjustment</h3>
                  </div>
                  <NumberSelect
                    min={MIN_STEP}
                    max={MAX_STEP}
                    step={2500}
                    onChange={(newNumberSelectValue) => {
                      setNumberSelectValue(newNumberSelectValue);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT 20% (Sidebar) */}
          {/* Same padding on all screen sizes */}
          <div className="
            xl:col-span-2
            text-white
            bg-[#080f18]
            py-10
            px-14
            flex flex-col
            justify-evenly
            space-y-6
          ">
            <div>
              <h2 className="text-xl font-semibold text-[#6AA84F] mb-2">
                Optimal Sell Recommendation
              </h2>
              <p className="text-gray-400 leading-6">
                Assuming you want to drive your current vehicle for as long as possible, we recommend selling at
                <span className="text-[#6AA84F] font-bold"> {formatNumber(curXAxisValues[idxOfGreatestValueDrop])} km</span>.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#6AA84F] mb-2">Data Analysis</h2>
              <p className="text-gray-400 leading-6">To make this prediction, we analyzed:</p>
              <ul className="list-disc list-inside text-gray-400 mt-2">
                <li>{matches?.exactMatches} exact matches</li>
                <li>{matches?.similarMatches} similar vehicles</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#6AA84F] mb-2">Confidence Rating</h2>
              <p className="text-gray-400 leading-6">
                We achieved a confidence rating of:
                <span className="text-[#6AA84F] font-bold"> {confidenceRating(matches?.similarMatches)}%</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}
