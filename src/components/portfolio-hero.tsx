import { SocialIcon } from "@/components/ui/social-icon";
import { ClickableEmail } from "@/components/ui/clickable-email";
import { AvailabilityIndicator } from "@/components/ui/availability-indicator";
import { ArrowUpRight } from "lucide-react";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";
import { IconBrandX, IconBrandLinkedin, IconBrandGithub } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import BlurText from "@/components/BlurText";
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

export function PortfolioHero() {
  const { t, i18n } = useTranslation();

  const handleDownloadCV = () => {
    const cvFiles = {
      en: { href: "/cv-miguel-lemes-en.pdf", download: "Miguel-Lemes-CV-English.pdf" },
      pt: { href: "/cv-miguel-lemes-pt.pdf", download: "Miguel-Lemes-CV-Portugues.pdf" },
    };

    const currentLang = i18n.language as "en" | "pt";
    const cvFile = cvFiles[currentLang] || cvFiles.en;

    try {
      const link = document.createElement("a");
      link.href = cvFile.href;
      link.download = cvFile.download;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      window.open(cvFile.href, "_blank");
    }
  };

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col"
    >
      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-6 pt-20 pb-12">
        <div className="w-full max-w-3xl mx-auto">
          <div className="select-none flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between gap-10">
            {/* Avatar */}
            <motion.div
              className="flex justify-center lg:justify-start flex-shrink-0"
              {...fadeUp(0.1)}
            >
              <div className="relative">
                <img
                  src="https://github.com/migueelzz.png"
                  alt="Miguel Lemes"
                  className="size-32 rounded-[28px] object-cover border border-border/50 shadow-xl shadow-black/10"
                />
                {/* Subtle glow */}
                <div className="absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/10" />
              </div>
            </motion.div>

            {/* Content */}
            <div className="flex flex-col items-center lg:items-start gap-6 flex-1">
              <div className="space-y-3 text-center lg:text-left w-full">
                {/* Availability Indicator */}
                <motion.div {...fadeUp(0.15)}>
                  <AvailabilityIndicator />
                </motion.div>

                {/* Name / Title with BlurText */}
                <BlurText
                  text={t("hero.title")}
                  delay={60}
                  animateBy="words"
                  direction="top"
                  className="font-serif text-headline lg:text-display text-foreground justify-center lg:justify-start"
                />

                <motion.p
                  className="text-body text-muted-foreground leading-relaxed font-sans font-light"
                  {...fadeUp(0.4)}
                >
                  {t("hero.description")
                    .split("miguellemes005@gmail.com")
                    .map((part, index) => (
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
                </motion.p>
              </div>

              <motion.div
                className="flex flex-col lg:flex-row items-center gap-6 lg:gap-4 w-full pb-4"
                {...fadeUp(0.5)}
              >
                {/* Resume CV Button */}
                <button
                  onClick={handleDownloadCV}
                  className={cn(
                    "relative flex-shrink-0 inline-flex items-center justify-center px-8 py-3 rounded-[2rem]",
                    "bg-gradient-to-b from-zinc-800 to-zinc-900 text-white font-medium text-base",
                    "dark:from-zinc-100 dark:to-zinc-200 dark:text-zinc-900",
                    "shadow-[0_4px_16px_0_rgba(0,0,0,0.15)]",
                    "border border-zinc-700/50 dark:border-zinc-300/50",
                    "hover:shadow-[0_6px_20px_0_rgba(0,0,0,0.20)] hover:scale-[1.02]",
                    "transition-all duration-200 ease-out",
                    "before:content-[''] before:absolute before:inset-0 before:rounded-[2rem] before:bg-gradient-to-b before:from-white/10 before:to-transparent before:opacity-50",
                    "active:scale-[0.98] w-full lg:w-auto"
                  )}
                >
                  <span className="relative z-10 font-medium tracking-wide">
                    {t("hero.resumeButton")}
                  </span>
                  <ArrowUpRight className="size-4 ml-2 relative z-10" />
                </button>

                {/* Desktop Separator */}
                <div className="hidden lg:flex h-8 items-center">
                  <Separator orientation="vertical" className="h-full w-px bg-border/40" />
                </div>

                {/* Social Icons */}
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start w-full lg:w-auto">
                  <SocialIcon
                    icon={IconBrandX}
                    href="https://x.com/_migueelzz"
                    label={t("hero.social.twitter")}
                  />
                  <SocialIcon
                    icon={IconBrandLinkedin}
                    href="https://www.linkedin.com/in/migueelzz"
                    label={t("hero.social.linkedin")}
                  />
                  <SocialIcon
                    icon={IconBrandGithub}
                    href="https://github.com/migueelzz"
                    label={t("hero.social.github")}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Scroll indicator */}
      <motion.div
        className="flex justify-center pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5"
        >
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-border" />
          <div className="size-1 rounded-full bg-border" />
        </motion.div>
      </motion.div>
    </section>
  );
}
