import { Link } from "react-router-dom";
import { getAllPosts } from "@/lib/posts";
import { AnimatedSection, StaggerChildren, fadeUpItem } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

function formatDate(dateStr: string, lang: string): string {
  if (!dateStr) return "";
  try {
    return new Intl.DateTimeFormat(lang === "pt" ? "pt-BR" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(dateStr + "T00:00:00"));
  } catch {
    return dateStr;
  }
}

export function BlogSection() {
  const { t, i18n } = useTranslation();
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <AnimatedSection id="blog" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4 flex-1">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground">
              {t("sections.writing")}
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <Link
            to="/blog"
            className={cn(
              "ml-4 flex-shrink-0 flex items-center gap-1.5 text-sm text-muted-foreground",
              "hover:text-foreground transition-colors duration-200"
            )}
          >
            {t("sections.viewAll")}
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>

        <StaggerChildren className="space-y-3">
          {posts.map((post) => (
            <motion.div key={post.slug} variants={fadeUpItem}>
              <Link
                to={`/blog/${post.slug}`}
                className={cn(
                  "group flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6",
                  "p-4 rounded-xl border border-transparent",
                  "hover:border-border hover:bg-card",
                  "transition-all duration-200"
                )}
              >
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono whitespace-nowrap pt-0.5 min-w-[90px]">
                  <CalendarDays className="size-3" />
                  {formatDate(post.date, i18n.language)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-foreground text-sm leading-snug group-hover:text-foreground/80 transition-colors">
                      {post.title}
                    </h3>
                    <ArrowUpRight className="size-3.5 text-muted-foreground flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  {post.description && (
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {post.description}
                    </p>
                  )}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-[11px] font-normal px-1.5 py-0 rounded-full"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </StaggerChildren>

        <div className="mt-8 flex justify-center">
          <Link
            to="/blog"
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium",
              "border border-border text-muted-foreground",
              "hover:border-foreground/40 hover:text-foreground hover:bg-accent",
              "transition-all duration-200"
            )}
          >
            {t("sections.readAllPosts")}
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
