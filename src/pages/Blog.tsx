import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { getAllPosts, type PostMeta } from "@/lib/posts";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CalendarDays, ArrowUpRight, Tag } from "lucide-react";
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

function PostCard({ post, lang }: { post: PostMeta; lang: string }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className={cn(
          "group flex flex-col gap-3 p-5 rounded-xl",
          "border border-border bg-card",
          "hover:border-border/60 hover:shadow-md hover:shadow-black/5",
          "dark:hover:shadow-black/30",
          "transition-all duration-200"
        )}
      >
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
          <CalendarDays className="size-3" />
          {formatDate(post.date, lang)}
        </div>

        <div className="flex items-start justify-between gap-3">
          <h3 className="font-medium text-foreground leading-snug group-hover:text-foreground/80 transition-colors">
            {post.title}
          </h3>
          <ArrowUpRight className="size-4 text-muted-foreground flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {post.description && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {post.description}
          </p>
        )}

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs font-normal px-2 py-0.5 rounded-full"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </Link>
    </motion.div>
  );
}

export default function BlogPage() {
  const { t, i18n } = useTranslation();
  const allPosts = useMemo(() => getAllPosts(), []);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    allPosts.forEach((p) => p.tags.forEach((tag) => set.add(tag)));
    return Array.from(set).sort();
  }, [allPosts]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return allPosts.filter((post) => {
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q));
      const matchesTag = !activeTag || post.tags.includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [allPosts, query, activeTag]);

  const resultCount = filtered.length;
  const postWord = resultCount === 1 ? t("blog.post") : t("blog.posts");

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <Link
              to="/"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors mb-6 inline-flex items-center gap-1"
            >
              ← {t("blog.backHome")}
            </Link>
            <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-2 mt-2">
              {t("blog.title")}
            </h1>
            <p className="text-muted-foreground text-sm">
              {allPosts.length} {allPosts.length === 1 ? t("blog.post") : t("blog.posts")} — {t("blog.subtitle")}
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-4"
          >
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder={t("blog.searchPlaceholder")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={cn(
                "w-full pl-10 pr-4 py-2.5 rounded-xl text-sm",
                "bg-card border border-border",
                "text-foreground placeholder:text-muted-foreground/60",
                "focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-border/60",
                "transition-all duration-200"
              )}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors text-xs"
              >
                ✕
              </button>
            )}
          </motion.div>

          {/* Tag filter pills */}
          {allTags.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="flex flex-wrap gap-1.5 mb-8"
            >
              <button
                onClick={() => setActiveTag(null)}
                className={cn(
                  "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-all duration-200",
                  !activeTag
                    ? "bg-foreground text-background"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-accent border border-transparent hover:border-border"
                )}
              >
                {t("blog.allTags")}
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={cn(
                    "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-all duration-200",
                    activeTag === tag
                      ? "bg-foreground text-background"
                      : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-accent border border-transparent hover:border-border"
                  )}
                >
                  <Tag className="size-2.5" />
                  {tag}
                </button>
              ))}
            </motion.div>
          )}

          {/* Results feedback */}
          {(query || activeTag) && (
            <p className="text-xs text-muted-foreground mb-4">
              {resultCount} {postWord}
              {query && ` — ${t("blog.resultsFor")} "${query}"`}
              {activeTag && ` — ${t("blog.taggedWith")} "${activeTag}"`}
            </p>
          )}

          {/* Posts grid */}
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filtered.map((post) => (
                  <PostCard key={post.slug} post={post} lang={i18n.language} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 text-center"
              >
                <p className="text-muted-foreground text-sm">{t("blog.noResults")}</p>
                <button
                  onClick={() => { setQuery(""); setActiveTag(null); }}
                  className="mt-3 text-xs text-foreground underline underline-offset-4"
                >
                  {t("blog.clearFilters")}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </>
  );
}
