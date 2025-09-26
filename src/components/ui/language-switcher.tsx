import { useTranslation } from 'react-i18next'
import { FlagIcon } from './flag-icon'
import { cn } from '@/lib/utils'

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'pt' ? 'en' : 'pt'
    i18n.changeLanguage(newLang)
  }

  const currentCountry = i18n.language === 'pt' ? 'br' : 'us'

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        "size-10 inline-flex items-center justify-center rounded-xl",
        "bg-transparent border-2 border-zinc-300/20 hover:scale-105 transition-all duration-200",
        "text-foreground hover:bg-muted hover:text-foreground/80",
      )}
    >
      <FlagIcon country={currentCountry} />
    </button>
  )
}
