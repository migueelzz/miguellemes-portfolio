import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useTranslation } from "react-i18next";

const SECTION_IDS = ["about", "experience", "projects"] as const;

function scrollToSection(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useScrollSpy() {
  const [active, setActive] = useState<string>("about");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return active;
}

export function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const isBlogArea = location.pathname.startsWith("/blog");
  const isBlogPost = location.pathname.startsWith("/blog/");
  const scrollActive = useScrollSpy();

  const NAV_ITEMS = [
    { label: t("nav.about"), href: "#about", id: "about", type: "anchor" as const },
    { label: t("nav.experience"), href: "#experience", id: "experience", type: "anchor" as const },
    { label: t("nav.projects"), href: "#projects", id: "projects", type: "anchor" as const },
    { label: t("nav.blog"), href: "/blog", id: "blog", type: "link" as const },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  function handleNavClick(item: (typeof NAV_ITEMS)[number]) {
    if (item.type === "link") {
      navigate(item.href);
      return;
    }
    if (isHome) {
      scrollToSection(item.href);
    } else {
      navigate("/");
      setTimeout(() => scrollToSection(item.href), 200);
    }
  }

  function isActive(item: (typeof NAV_ITEMS)[number]): boolean {
    if (item.type === "link") return isBlogArea;
    if (!isHome) return false;
    return scrollActive === item.id;
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/60 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
        {/* Logo — fades in when scrolled on homepage; always visible on sub-pages */}
        <Link
          to="/"
          className={cn(
            "font-serif text-base font-semibold transition-all duration-300 flex-shrink-0",
            isHome && !scrolled
              ? "opacity-0 pointer-events-none"
              : "text-foreground hover:text-muted-foreground"
          )}
        >
          Miguel Lemes
        </Link>

        {/* Nav links */}
        {!isBlogPost && (
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item)}
                className={cn(
                  "relative px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200",
                  isActive(item)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {item.label}
                {/* Active dot indicator */}
                {isActive(item) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-md bg-accent -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>
        )}

        {/* Right side controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
