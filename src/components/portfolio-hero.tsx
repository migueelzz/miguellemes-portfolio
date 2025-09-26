import { SocialIcon } from "@/components/ui/social-icon"
import { LocationTime } from "@/components/ui/location-time"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { ClickableEmail } from "@/components/ui/clickable-email"
import { ArrowUpRight } from "lucide-react"
import { Separator } from "./ui/separator"
import { cn } from "@/lib/utils"
import { IconBrandX, IconBrandLinkedin, IconBrandInstagram, IconBrandGithub } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

export function PortfolioHero() {
  const { t, i18n } = useTranslation()
  
  const handleScheduleMeet = () => {
    // Replace with your actual calendar link
    window.open("https://calendly.com/migueelzz", "_blank")
  }

  const handleEmailClick = () => {
    window.location.href = "mailto:miguellemes005@gmail.com"
  }

  const handleDownloadCV = () => {
    // Different CV files based on language
    const cvFiles = {
      en: {
        href: '/cv-miguel-lemes-en.pdf',
        download: 'Miguel-Lemes-CV-English.pdf'
      },
      pt: {
        href: '/cv-miguel-lemes-pt.pdf', 
        download: 'Miguel-Lemes-CV-Portugues.pdf'
      }
    }
    
    const currentLang = i18n.language as 'en' | 'pt'
    const cvFile = cvFiles[currentLang] || cvFiles.en
    
    console.log('Downloading CV:', cvFile)
    
    // Try to download the file
    try {
      const link = document.createElement('a')
      link.href = cvFile.href
      link.download = cvFile.download
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Download failed:', error)
      // Fallback: open in new tab
      window.open(cvFile.href, '_blank')
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex flex-col">
      {/* Header with location/time and language switcher */}
      <header className="w-full px-4 pt-4 lg:px-8 flex justify-end items-center">
        <LanguageSwitcher />
        {/* <LocationTime /> */}
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-xl lg:max-w-3xl mx-auto">
          {/* Unified Layout with Flexbox */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between gap-8 lg:gap-8">
            {/* Avatar */}
            <div className="flex justify-center lg:justify-start">
              <img
                src="https://github.com/migueelzz.png"
                alt="Miguel Lemes"
                className="size-32 flex-shrink-0 rounded-[32px] object-cover border-[5px]"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col items-center lg:items-start gap-6">
              <div className="space-y-4 lg:space-y-6 text-center lg:text-left">
                <h1 className="font-serif text-headline lg:text-display text-foreground">
                  {t('hero.title')}
                </h1>
                
                <p className="text-body text-muted-foreground leading-relaxed font-sans font-light">
                  {t('hero.description').split('miguellemes005@gmail.com').map((part, index) => (
                    <span key={index}>
                      {part}
                      {index === 0 && (
                        <ClickableEmail 
                          email="miguellemes005@gmail.com" 
                          className="text-foreground"
                        />
                      )}
                    </span>
                  ))}
                </p>
              </div>

              <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-4 w-full">
                {/* Resume CV Button */}
                <button
                  onClick={handleDownloadCV}
                  className={cn(
                    "relative flex-shrink-0 inline-flex items-center justify-center px-8 py-3 rounded-[2rem]",
                    "bg-gradient-to-b from-zinc-800 to-zinc-900 text-white font-medium text-base",
                    "shadow-[0_4px_16px_0_rgba(0,0,0,0.15)]",
                    "border border-zinc-700/50",
                    "hover:shadow-[0_6px_20px_0_rgba(0,0,0,0.20)] hover:scale-[1.02]",
                    "transition-all duration-200 ease-out",
                    "before:content-[''] before:absolute before:inset-0 before:rounded-[2rem] before:bg-gradient-to-b before:from-white/10 before:to-transparent before:opacity-50",
                    "active:scale-[0.98] w-full lg:w-auto"
                  )}
                >
                  <span className="relative z-10 text-white/95 font-medium tracking-wide">{t('hero.resumeButton')}</span>
                  <ArrowUpRight className="size-4 ml-2 relative z-10 text-white/90" />
                </button>

                {/* Desktop Separator */}
                <div className="hidden lg:flex h-8 items-center">
                  <Separator orientation="vertical" className="h-full w-px bg-zinc-300/40" />
                </div>

                {/* Social Icons */}
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start w-full lg:w-auto">
                  <SocialIcon
                    icon={IconBrandX}
                    href="https://x.com/_migueelzz"
                    label={t('hero.social.twitter')}
                  />
                  <SocialIcon
                    icon={IconBrandGithub}
                    href="https://github.com/migueelzz"
                    label={t('hero.social.github')}
                  />
                  <SocialIcon
                    icon={IconBrandLinkedin}
                    href="https://www.linkedin.com/in/migueelzz"
                    label={t('hero.social.linkedin')}
                  />
                  <SocialIcon
                    icon={IconBrandInstagram}
                    href="https://www.instagram.com/_migueelzz/"
                    label={t('hero.social.instagram')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}