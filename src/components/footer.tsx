import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <span>
          © {new Date().getFullYear()} Miguel Lemes. {t("footer.builtWith")}
        </span>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/migueelzz"
            target="_blank"
            rel="noopener noreferrer"
            className={cn("hover:text-foreground transition-colors")}
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/migueelzz"
            target="_blank"
            rel="noopener noreferrer"
            className={cn("hover:text-foreground transition-colors")}
          >
            LinkedIn
          </a>
          <a
            href="https://x.com/_migueelzz"
            target="_blank"
            rel="noopener noreferrer"
            className={cn("hover:text-foreground transition-colors")}
          >
            X / Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}
