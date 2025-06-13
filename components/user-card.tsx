import { ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface UserCardProps {
  rank: number
  name: string
  login: string
  avatarUrl?: string
  company?: string
  location?: string
  contributions: number
}

export default function UserCard({ rank, name, login, avatarUrl, company, location, contributions }: UserCardProps) {
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Get medal emoji based on rank
  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return "🥇"
    if (rank === 2) return "🥈"
    if (rank === 3) return "🥉"
    return ""
  }

  return (
    <Card className="overflow-hidden bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Rank */}
          <div className="flex flex-col items-center justify-center min-w-[40px]">
            <span className="text-2xl font-bold">{getMedalEmoji(rank) || rank}</span>
          </div>

          {/* Avatar */}
          <Avatar className="h-16 w-16 border-2 border-slate-600">
            <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={name} />
            <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>

          {/* User info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <h3 className="font-semibold text-lg truncate">{name}</h3>
            </div>

            <a
              href={`https://github.com/${login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 flex items-center gap-1 group"
            >
              @{login}
              <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            {company && <div className="text-sm text-slate-400 truncate mt-1">🏢 {company}</div>}

            {location && <div className="text-sm text-slate-400 truncate">📍 {location}</div>}

            <div className="mt-2">
              <Badge variant="secondary" className="bg-green-900/20 text-green-400 hover:bg-green-900/30">
                {contributions.toLocaleString()} contributions
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
