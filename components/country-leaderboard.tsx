"use client"

import { useState, useEffect } from "react"
import { Loader2, AlertCircle, ExternalLink } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import CommitChart from "@/components/commit-chart"
import yaml from "js-yaml"

// Import sample data at the top of the file
import { sampleCountryData } from "@/lib/sample-data"

interface CountryUser {
  rank: number
  name: string
  login: string
  avatarUrl: string
  contributions: number
  company?: string
  location?: string
}

interface CountryData {
  name: string
  users: CountryUser[]
}

interface CountryLeaderboardProps {
  country: string
  searchQuery: string
  sortOrder: string
}

export default function CountryLeaderboard({ country, searchQuery, sortOrder }: CountryLeaderboardProps) {
  const [users, setUsers] = useState<CountryUser[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [countryName, setCountryName] = useState<string>("")

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        // Convert country name to lowercase and replace spaces with underscores for URL
        const countrySlug = country.toLowerCase().replace(/\s+/g, "_")
        const url = `https://raw.githubusercontent.com/ashkulz/committers.top/gh-pages/_data/locations/${countrySlug}.yml`

        console.log("Fetching from URL:", url)

        async function fetchWithRetry(url, retries = 3, delay = 1000) {
          for (let i = 0; i < retries; i++) {
            try {
              const response = await fetch(url)
              if (response.ok) return response

              // If we get a 404, try alternative URL formats
              if (response.status === 404 && i === 0) {
                // Try alternative URL format (with dashes instead of underscores)
                const altCountrySlug = countrySlug.replace(/_/g, "-")
                const altUrl = `https://raw.githubusercontent.com/ashkulz/committers.top/gh-pages/_data/locations/${altCountrySlug}.yml`
                console.log("Trying alternative URL:", altUrl)
                const altResponse = await fetch(altUrl)
                if (altResponse.ok) return altResponse

                // Try another alternative with just the first word
                const firstWordSlug = countrySlug.split("_")[0]
                const firstWordUrl = `https://raw.githubusercontent.com/ashkulz/committers.top/gh-pages/_data/locations/${firstWordSlug}.yml`
                console.log("Trying first word URL:", firstWordUrl)
                const firstWordResponse = await fetch(firstWordUrl)
                if (firstWordResponse.ok) return firstWordResponse
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

        // Replace the fetch call with our retry function
        const response = await fetchWithRetry(url)

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const text = await response.text()

        try {
          const data = yaml.load(text) as CountryData
          setCountryName(data.name)
          setUsers(data.users || [])
        } catch (parseError) {
          console.error("YAML Parse Error:", parseError)
          throw new Error(`Failed to parse YAML: ${parseError.message}`)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        setError(error.message)

        // Use sample data as fallback
        console.log("Using sample data as fallback")
        setCountryName(country) // Use the selected country name
        setUsers(sampleCountryData.users)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [country])

  // Filter users based on search query
  const filteredUsers = users.filter((user) => {
    const searchLower = searchQuery.toLowerCase()
    return (
      (user.name && user.name.toLowerCase().includes(searchLower)) ||
      (user.login && user.login.toLowerCase().includes(searchLower)) ||
      (user.company && user.company.toLowerCase().includes(searchLower))
    )
  })

  // Sort users based on sortOrder
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortOrder === "contributions") {
      return b.contributions - a.contributions
    }
    // Default sort by rank
    return a.rank - b.rank
  })

  // Get the maximum contribution count for scaling
  const maxContributions = sortedUsers.length > 0 ? Math.max(...sortedUsers.map((user) => user.contributions)) : 10000

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-green-500 mb-4" />
        <p className="text-slate-400">Loading {country} leaderboard data...</p>
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

  if (sortedUsers.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        {searchQuery ? "No results match your search" : "No data available for this country"}
      </div>
    )
  }

  // Get medal emoji based on rank
  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return "🥇"
    if (rank === 2) return "🥈"
    if (rank === 3) return "🥉"
    return ""
  }

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">
          <span className="text-2xl">{countryName || country}</span> Top Contributors
          <Badge variant="outline" className="ml-2 bg-green-900/20 text-green-400">
            {sortedUsers.length} devs
          </Badge>
        </h2>
      </div>

      <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-800 border-b border-slate-700">
                <th className="py-3 px-4 text-left">Rank</th>
                <th className="py-3 px-4 text-left">User</th>
                <th className="py-3 px-4 text-left hidden md:table-cell">Company</th>
                <th className="py-3 px-4 text-center">Activity</th>
                <th className="py-3 px-4 text-right">Commits</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user) => (
                <tr key={user.login} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                  <td className="py-4 px-4 w-16">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-700/50 text-center">
                      {getMedalEmoji(user.rank) || user.rank}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-slate-600">
                        <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="bg-gradient-to-br from-green-600 to-emerald-600 text-xs">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-lg">{user.name}</div>
                        <a
                          href={`https://github.com/${user.login}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-400 hover:text-green-300 text-sm flex items-center gap-1 group"
                        >
                          @{user.login}
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-300 hidden md:table-cell">{user.company || "-"}</td>
                  <td className="py-4 px-4">
                    <div className="flex justify-center">
                      <CommitChart contributions={user.contributions} maxContributions={maxContributions} />
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right font-bold text-green-400">
                    {user.contributions.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
