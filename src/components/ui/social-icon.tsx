import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface SocialIconProps {
  icon: React.ComponentType<any>
  href: string
  label: string
  className?: string
}

export function SocialIcon({ 
  icon: Icon, 
  href, 
  label,
  className 
}: SocialIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "size-11 inline-flex items-center justify-center rounded-xl",
        "bg-transparent border-2 border-zinc-300/20",
        "text-foreground hover:bg-muted hover:border-zinc-300/40",
        "transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-95",
        "[&>svg]:transition-transform [&>svg]:duration-200 hover:[&>svg]:scale-110",
        className
      )}
    >
      <Icon className="size-5" />
    </a>
  )
}