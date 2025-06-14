"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Github, Search, ArrowUpDown } from "lucide-react"
import CountryLeaderboard from "@/components/country-leaderboard"
import Footer from "@/components/footer"

// Expanded list of countries including Somalia
const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Angola",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahrain",
  "Bangladesh",
  "Belarus",
  "Belgium",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Brazil",
  "Bulgaria",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Chile",
  "China",
  "Colombia",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Estonia",
  "Ethiopia",
  "Finland",
  "France",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Guatemala",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Latvia",
  "Lebanon",
  "Libya",
  "Lithuania",
  "Luxembourg",
  "Macedonia",
  "Madagascar",
  "Malaysia",
  "Malta",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Myanmar",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palestine",
  "Panama",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Romania",
  "Russia",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Somalia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tanzania",
  "Thailand",
  "Tunisia",
  "Turkey",
  "Uganda",
  "Ukraine",
  "UAE",
  "UK",
  "Uruguay",
  "United States",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zimbabwe",
].sort() // Sort alphabetically

export default function LeaderboardPage() {
  const [country, setCountry] = useState("afghanistan") // Default to Afghanistan
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("rank") // "rank" or "contributions"

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 font-mono flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Github className="h-8 w-8" />
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                GitHub Leaderboard
              </h1>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger className="w-full md:w-[200px] bg-slate-800/50 border-slate-700">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {countries.map((c) => (
                  <SelectItem key={c} value={c.toLowerCase()}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by name or username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-700"
              />
            </div>

            <button
              onClick={() => setSortOrder(sortOrder === "rank" ? "contributions" : "rank")}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-md hover:bg-slate-700/50 transition-colors"
            >
              <ArrowUpDown className="h-4 w-4" />
              Sort by {sortOrder === "rank" ? "Rank" : "Contributions"}
            </button>
          </div>

          {/* Content */}
          <CountryLeaderboard country={country} searchQuery={searchQuery} sortOrder={sortOrder} />
        </header>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
