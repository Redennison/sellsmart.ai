'use client';

import { useState, useEffect } from 'react';
import { getCarMakesAndModels, getCurrentFormattedDate, capitalizeFirstLetter } from '@/lib/utils';
import { useRouter } from 'next/navigation'
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '@/app/firebase/config'

export default function AnalyzePage() {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [km, setKm] = useState('');
  const [makeToModel, setMakeToModel] = useState(new Map());
  const [user] = useAuthState(auth)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const data = await getCarMakesAndModels();
        setMakeToModel(data); // Ensure `data` is a Map
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };

    console.log(user)

    fetchCarData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    // Write to history
    const historyRef = collection(db, "history")

    // Create a query against the collection.
    const q = query(historyRef, where("email", "==", user?.email));
    const querySnapshot = await getDocs(q);

    const newCarObject = {
      'km': km,
      'car_make': make,
      'car_model': model,
      'year': year,
      'date': getCurrentFormattedDate()
    }

    const document = querySnapshot.docs[0];
    const userCarHistory = document.data().cars || []; // Get existing cars or default to an empty array
    const docId = document.id; // Get the document ID

    // Update the document
    await setDoc(doc(historyRef, docId), {
      email: user?.email,
      cars: [newCarObject, ...userCarHistory], // Add the new car at the front of the array
    });

    setLoading(false)

    router.push(`/analysis?make=${make}&model=${model}&year=${year}&km=${km}`)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      <div className="w-full max-w-2xl bg-black/80 text-white border border-gray-700 rounded-lg shadow-lg backdrop-blur-sm p-8 my-16">
        <h1 className="text-3xl font-bold text-center text-[#6AA84F] mb-6">Analyze Your Car</h1>
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
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700 transition-colors"
            >
              <option value="" disabled>Select Make</option>
              {Array.from(makeToModel.keys()).sort().map((makeOption, index) => (
                <option key={`make-${index}`} value={makeOption}>
                  {capitalizeFirstLetter(makeOption)}
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
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700 transition-colors"
            >
              <option value="" disabled>Select Model</option>
              {(makeToModel.get(make) || []).sort().map((modelOption, index) => (
                <option key={`model-${index}`} value={modelOption}>
                  {capitalizeFirstLetter(modelOption)}
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
            <select
              id="year"
              name="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700 transition-colors"
            >
              <option value="" disabled>Select Year</option>
              {Array.from({ length: new Date().getFullYear() - 1979 }, (_, i) => 1980 + i).reverse().map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>

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
              type="text"
              value={km ? Number(km.replace(/,/g, '')).toLocaleString() : ''}
              onChange={(e) => {
                const inputValue = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                setKm(inputValue); // Update the state with the raw numeric value
              }}
              placeholder="Enter kilometers"
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700 transition-colors"
            />
          </div>

        <button
            disabled={loading}
            type="submit"
            className="w-full bg-[#6AA84F] hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out transform hover:scale-105"
          >
            { loading ? "Analyzing..." : "Analyze" }
          </button>
        </form>
      </div>
    </div>
  );
}
