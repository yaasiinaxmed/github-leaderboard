"use client"

import { useMemo } from "react"

interface CommitChartProps {
  contributions: number
  maxContributions: number
}

export default function CommitChart({ contributions, maxContributions }: CommitChartProps) {
  // Calculate intensity level (0-4) based on contribution percentage
  const getIntensityLevel = (value: number, max: number): number => {
    const percentage = value / max
    if (percentage < 0.1) return 0
    if (percentage < 0.25) return 1
    if (percentage < 0.5) return 2
    if (percentage < 0.75) return 3
    return 4
  }

  // Generate random-ish but consistent pattern for a user based on their contribution count
  const generateBoxes = useMemo(() => {
    const boxes = []
    const totalBoxes = 20 // Number of boxes to display
    const intensity = getIntensityLevel(contributions, maxContributions)

    // Use contribution count to seed a pseudo-random pattern
    const seed = contributions % 1000

    for (let i = 0; i < totalBoxes; i++) {
      // Generate a value between 0-4 with higher probability for the main intensity level
      let boxIntensity = Math.floor(((seed * (i + 1)) % 100) / 20)

      // Bias towards the main intensity level
      if (Math.random() < 0.7) {
        boxIntensity = Math.min(4, Math.max(0, intensity + Math.floor(Math.random() * 2) - 1))
      }

      boxes.push(boxIntensity)
    }

    return boxes
  }, [contributions, maxContributions])

  // Get color class based on intensity level
  const getColorClass = (level: number): string => {
    switch (level) {
      case 0:
        return "bg-slate-700/50"
      case 1:
        return "bg-green-900/70"
      case 2:
        return "bg-green-700/80"
      case 3:
        return "bg-green-600"
      case 4:
        return "bg-green-500"
      default:
        return "bg-slate-700/50"
    }
  }

  return (
    <div className="flex gap-1 items-center">
      {generateBoxes.map((level, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-sm ${getColorClass(level)}`}
          title={`${level === 0 ? "No" : level} contribution${level !== 1 ? "s" : ""}`}
        />
      ))}
    </div>
  )
}
