'use client';

import { useState, useEffect } from 'react';
import { getCarMakesAndModels } from '@/lib/utils';

export default function AnalyzePage() {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [km, setKm] = useState('');
  const [makeToModel, setMakeToModel] = useState(new Map());

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const data = await getCarMakesAndModels();
        setMakeToModel(data); // Ensure `data` is a Map
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };

    fetchCarData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { make, model, year, km });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      <div className="w-full max-w-md bg-black/80 text-white border border-gray-700 rounded-lg shadow-lg backdrop-blur-sm p-8">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Analyze Your Car</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dropdown for Make */}
          <div className="space-y-2">
            <label
              htmlFor="make"
              className="block text-sm font-medium text-gray-300 uppercase tracking-wide"
            >
              Make
            </label>
            <select
              id="make"
              value={make}
              onChange={(e) => setMake(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            >
              <option value="" disabled>Select Make</option>
              {Array.from(makeToModel.keys()).map((makeOption, index) => (
                <option key={`make-${index}`} value={makeOption}>
                  {makeOption}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown for Model */}
          <div className="space-y-2">
            <label
              htmlFor="model"
              className="block text-sm font-medium text-gray-300 uppercase tracking-wide"
            >
              Model
            </label>
            <select
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
              disabled={!make}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            >
              <option value="" disabled>Select Model</option>
              {(makeToModel.get(make) || []).map((modelOption, index) => (
                <option key={`model-${index}`} value={modelOption}>
                  {modelOption}
                </option>
              ))}
            </select>
          </div>

          {/* Input for Year */}
          <div className="space-y-2">
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-300 uppercase tracking-wide"
            >
              Year
            </label>
            <input
              id="year"
              name="year"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Enter year"
              required
              min={1900}
              max={new Date().getFullYear()}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            />
          </div>

          {/* Input for Kilometers */}
          <div className="space-y-2">
            <label
              htmlFor="km"
              className="block text-sm font-medium text-gray-300 uppercase tracking-wide"
            >
              Kilometers
            </label>
            <input
              id="km"
              name="km"
              type="number"
              value={km}
              onChange={(e) => setKm(e.target.value)}
              placeholder="Enter kilometers"
              required
              min={0}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out transform hover:scale-105"
          >
            Analyze
          </button>
        </form>
      </div>
    </div>
  );
}
