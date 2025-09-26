import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ClickableEmailProps {
  email: string
  className?: string
}

export function ClickableEmail({ email, className }: ClickableEmailProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "inline-block font-semibold text-foreground",
        "border-b border-dotted border-foreground/60 hover:border-foreground",
        "transition-all duration-200",
        "cursor-pointer outline-none",
        "relative group",
        className
      )}
      title={copied ? "Copied!" : "Click to copy email"}
    >
      {email}
      {copied && (
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-2 py-1 rounded text-xs whitespace-nowrap">
          Copied!
        </span>
      )}
    </button>
  )
}
