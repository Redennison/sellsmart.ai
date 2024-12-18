import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HistoryPage() {
  // This would typically fetch data from an API or database
  const analysisHistory = [
    { id: 1, make: 'Toyota', model: 'Corolla', year: 2020, km: 30000, date: '2023-05-15' },
    { id: 2, make: 'Honda', model: 'Civic', year: 2019, km: 45000, date: '2023-05-10' },
    { id: 3, make: 'Ford', model: 'Focus', year: 2021, km: 15000, date: '2023-05-05' },
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <Card className="w-full max-w-4xl bg-black/80 text-white border-gray-700 shadow-lg backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl font-bold text-center text-white">Analysis History</CardTitle>
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
                {analysisHistory.map((item) => (
                  <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-800">
                    <td className="px-6 py-4">{item.date}</td>
                    <td className="px-6 py-4">{item.make}</td>
                    <td className="px-6 py-4">{item.model}</td>
                    <td className="px-6 py-4">{item.year}</td>
                    <td className="px-6 py-4">{item.km}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

