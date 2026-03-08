import React, { useEffect, useState } from "react"
import { db } from "../firebase"
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"

export default function AdminDashboard() {
  const [results, setResults] = useState([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    if (typeof window !== "undefined") {
      const q = query(collection(db, "quizResults"), orderBy("timestamp", "desc"))
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const resultsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setResults(resultsData)
      })

      return () => unsubscribe()
    }
  }, [])

  if (!isClient) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Quiz Results</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {results.map((result) => (
          <div key={result.id} className="bg-white p-4 rounded-lg shadow">
            <p className="text-lg font-semibold mb-2">Result: {result.result}</p>
            <p className="text-sm text-gray-600">
              Time: {result.timestamp && result.timestamp.toDate().toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

