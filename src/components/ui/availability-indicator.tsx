import { useTranslation } from 'react-i18next'

export function AvailabilityIndicator() {
  const { t } = useTranslation()

  return (
    <div className="flex items-center justify-center lg:justify-start">
      <div className="flex items-center gap-2">
        {/* Pulsing dot */}
        <div className="relative">
          <div className="size-2 bg-green-500 rounded-full"></div>
          <div className="absolute inset-0 size-2 bg-green-500 rounded-full animate-ping opacity-75"></div>
        </div>
        
        {/* Text */}
        <span className="text-sm font-medium text-muted-foreground">
          {t('hero.availability')}
        </span>
      </div>
    </div>
  )
}
