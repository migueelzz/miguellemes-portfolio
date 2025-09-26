import { useEffect, useState } from "react"
import { Clock } from "lucide-react"

export function LocationTime() {
  const [time, setTime] = useState<string>("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const brazilTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Sao_Paulo",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }).format(now)
      setTime(brazilTime)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex-shrink-0 inline-flex items-center gap-2 text-caption text-muted-foreground font-sans text-xs lg:text-base">
      <Clock size={14} strokeWidth={1.5} />
      <span>Lins, Brazil • GMT-3 • {time}</span>
    </div>
  )
}