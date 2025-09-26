import { US, BR } from 'country-flag-icons/react/3x2'
import { cn } from '@/lib/utils'

interface FlagIconProps {
  country: 'us' | 'br'
  className?: string
}

export function FlagIcon({ country, className }: FlagIconProps) {
  const FlagComponent = country === 'us' ? US : BR
  
  return (
    <FlagComponent 
      className={cn(
        "w-5 h-4 object-cover rounded-sm",
        "border border-zinc-200/50",
        className
      )} 
    />
  )
}
