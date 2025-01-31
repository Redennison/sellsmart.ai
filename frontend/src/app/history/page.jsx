'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '@/app/firebase/config'
import { useState, useEffect } from 'react'
import { capitalizeFirstLetter } from '../../lib/utils'
import LoadingSpinner from "../../components/loading-spinner/loadingSpinner"
import { useRouter } from 'next/navigation'

export default function HistoryPage() {
  const [user] = useAuthState(auth)
  const [userCarHistory, setUserCarHistory] = useState(null)
  const router = useRouter()

  var historyId = 1

  useEffect(() => {
    async function fetchData() {
      if (!user?.email) {
        // Skip fetching if user email is undefined
        console.log("User email is undefined. Skipping Firestore query.");
        return;
      }

      const historyRef = collection(db, "history")

      // Create a query against the collection.
      const q = query(historyRef, where("email", "==", user?.email));
      const querySnapshot = await getDocs(q);
    
      let queryData = [];
      
      // Check if there's a matching document
      if (!querySnapshot.empty) {
        const document = querySnapshot.docs[0];
        queryData = document.data().cars || null; // Get existing cars or default to an empty array
        setUserCarHistory(queryData)
      } else {
        setUserCarHistory(null)
      }
    }

    fetchData()
  }, [user?.email])

  const handleRowClick = (item) => {
    router.push(`/analysis?make=${item.car_make}&model=${item.car_model}&year=${item.year}&km=${item.km}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      {userCarHistory ?
        <Card className="w-full max-w-4xl bg-black/80 text-white border-gray-700 shadow-lg backdrop-blur-sm space-y-6 my-16">
          <CardHeader className="pb-4">
            <CardTitle className="text-3xl font-bold py-3 text-center text-[#6AA84F]">Analysis History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-300">
                <thead className="text-xs uppercase bg-gray-700 text-gray-300">
                  <tr>
                    <th scope="col" className="px-6 py-3">Date</th>
                    <th scope="col" className="px-6 py-3">Make</th>
                    <th scope="col" className="px-6 py-3">Model</th>
                    <th scope="col" className="px-6 py-3">Year</th>
                    <th scope="col" className="px-6 py-3">Kilometers</th>
                  </tr>
                </thead>
                <tbody>
                  {userCarHistory && userCarHistory.map((item, index) => (
                    <tr key={index} className="border-b border-gray-700 hover:bg-gray-800 cursor-pointer" onClick={() => handleRowClick(item)}>
                      <td className="px-6 py-4">{item.date}</td>
                      <td className="px-6 py-4">{capitalizeFirstLetter(item.car_make)}</td>
                      <td className="px-6 py-4">{capitalizeFirstLetter(item.car_model)}</td>
                      <td className="px-6 py-4">{item.year}</td>
                      <td className="px-6 py-4">{Number(item.km.replace(/,/g, '')).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      : <LoadingSpinner />
    }
    </div>
  )
}
