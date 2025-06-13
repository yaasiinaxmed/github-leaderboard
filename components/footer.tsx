import { Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="mt-12 py-6 border-t border-slate-700/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-slate-400 text-sm">© {new Date().getFullYear()} GitHub Leaderboard</div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-sm">Made with 💚 by</span>
            <a
              href="https://x.com/yasindev25"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-green-400 hover:text-green-300 transition-colors font-medium group"
            >
              YasinDev
             
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
