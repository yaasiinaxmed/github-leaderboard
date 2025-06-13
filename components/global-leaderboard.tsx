"use client"

import { useState, useEffect } from "react"
import { Loader2, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import UserCard from "@/components/user-card"

// Import sample data at the top of the file
import { sampleGlobalData } from "@/lib/sample-data"

interface Committer {
  name: string
  fullname: string
  location: string
  contributions: number
  login?: string
  avatarUrl?: string
  company?: string
}

interface GlobalLeaderboardProps {
  timeframe: string
  searchQuery: string
  sortOrder: string
}

export default function GlobalLeaderboard({ timeframe, searchQuery, sortOrder }: GlobalLeaderboardProps) {
  const [committers, setCommitters] = useState<Committer[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        let url
        if (timeframe === "this_week") {
          url = "https://raw.githubusercontent.com/ashkulz/committers.top/gh-pages/data/this_week.json"
        } else if (timeframe === "last_month") {
          url = "https://raw.githubusercontent.com/ashkulz/committers.top/gh-pages/data/last_month.json"
        } else {
          url = "https://raw.githubusercontent.com/ashkulz/committers.top/gh-pages/data/all_time.json"
        }

        console.log("Fetching from URL:", url)

        async function fetchWithRetry(url, retries = 3, delay = 1000) {
          for (let i = 0; i < retries; i++) {
            try {
              const response = await fetch(url)
              if (response.ok) return response

              // If we get a 404, try an alternative URL format
              if (response.status === 404 && i === 0) {
                // Try alternative URL format (without underscores)
                const altTimeframe = timeframe.replace("_", "")
                const altUrl = `https://raw.githubusercontent.com/ashkulz/committers.top/gh-pages/data/${altTimeframe}.json`
                console.log("Trying alternative URL:", altUrl)
                const altResponse = await fetch(altUrl)
                if (altResponse.ok) return altResponse
              }

              console.log(`Attempt ${i + 1} failed, retrying in ${delay}ms...`)
              await new Promise((resolve) => setTimeout(resolve, delay))
            } catch (error) {
              console.error(`Attempt ${i + 1} error:`, error)
              if (i === retries - 1) throw error
              await new Promise((resolve) => setTimeout(resolve, delay))
            }
          }
          throw new Error(`Failed after ${retries} retries`)
        }

        const response = await fetchWithRetry(url)

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const text = await response.text()

        try {
          const data = JSON.parse(text)

          // Enhance the data with GitHub usernames as login if not present
          const enhancedData = data.map((committer: Committer, index: number) => ({
            ...committer,
            login: committer.login || committer.name,
            rank: index + 1,
          }))

          setCommitters(enhancedData)
        } catch (parseError) {
          console.error("JSON Parse Error:", parseError)
          throw new Error(`Failed to parse JSON: ${parseError.message}`)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        setError(error.message)

        // Use sample data as fallback
        console.log("Using sample data as fallback")
        setCommitters(sampleGlobalData)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [timeframe])

  // Filter committers based on search query
  const filteredCommitters = committers.filter((committer) => {
    const searchLower = searchQuery.toLowerCase()
    return (
      (committer.name && committer.name.toLowerCase().includes(searchLower)) ||
      (committer.fullname && committer.fullname.toLowerCase().includes(searchLower)) ||
      (committer.login && committer.login.toLowerCase().includes(searchLower))
    )
  })

  // Sort committers based on sortOrder
  const sortedCommitters = [...filteredCommitters].sort((a, b) => {
    if (sortOrder === "contributions") {
      return b.contributions - a.contributions
    }
    // Default sort by rank
    return (a.rank || 0) - (b.rank || 0)
  })

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-4" />
        <p className="text-slate-400">Loading global leaderboard data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="bg-red-900/20 border-red-900 text-red-300">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Error loading leaderboard: {error}</AlertDescription>
      </Alert>
    )
  }

  if (sortedCommitters.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        {searchQuery ? "No results match your search" : "No data available"}
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        {timeframe === "this_week" ? "This Week" : timeframe === "last_month" ? "Last Month" : "All Time"} Top
        Contributors
        <Badge variant="outline" className="ml-2 bg-blue-900/20">
          {sortedCommitters.length} developers
        </Badge>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedCommitters.map((committer, index) => (
          <UserCard
            key={committer.name}
            rank={committer.rank || index + 1}
            name={committer.fullname || committer.name}
            login={committer.login || committer.name}
            avatarUrl={committer.avatarUrl}
            company={committer.company}
            location={committer.location}
            contributions={committer.contributions}
          />
        ))}
      </div>
    </div>
  )
}
