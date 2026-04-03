import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostBySlug } from "@/lib/posts";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { ArrowLeft, CalendarDays, Link2, Check, Twitter, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import "highlight.js/styles/github-dark.css";

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateStr + "T00:00:00"));
  } catch {
    return dateStr;
  }
}

function ShareButtons({ title }: { title: string }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const url = window.location.href;

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnX = () => {
    const text = encodeURIComponent(`${title}\n\n${url}`);
    window.open(`https://x.com/intent/tweet?text=${text}`, "_blank");
  };

  const nativeShare = () => {
    if (navigator.share) {
      navigator.share({ title, url });
    }
  };

  const hasNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground flex items-center gap-1.5">
        <Share2 className="size-3.5" />
        {t("blog.share")}
      </span>

      {/* Copy link */}
      <button
        onClick={copyLink}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
          "border border-border text-muted-foreground",
          "hover:border-foreground/30 hover:text-foreground hover:bg-accent"
        )}
        title="Copy link"
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1 text-emerald-500"
            >
              <Check className="size-3" /> {t("blog.copied")}
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1"
            >
              <Link2 className="size-3" /> {t("blog.copyLink")}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Share on X */}
      <button
        onClick={shareOnX}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
          "border border-border text-muted-foreground",
          "hover:border-foreground/30 hover:text-foreground hover:bg-accent"
        )}
        title="Share on X"
      >
        <Twitter className="size-3" />
        X / Twitter
      </button>

      {/* Native share (mobile) */}
      {hasNativeShare && (
        <button
          onClick={nativeShare}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
            "border border-border text-muted-foreground",
            "hover:border-foreground/30 hover:text-foreground hover:bg-accent"
          )}
          title="Share"
        >
          <Share2 className="size-3" />
          {t("blog.share")}
        </button>
      )}
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : null;
  const { t } = useTranslation();

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground">Post not found.</p>
          <Link
            to="/blog"
            className="text-sm text-foreground hover:underline flex items-center gap-1.5"
          >
            <ArrowLeft className="size-3.5" />
            Back to blog
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen pt-24 pb-24 px-6"
      >
        <div className="max-w-2xl mx-auto">
          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
          >
            <ArrowLeft className="size-3.5" />
            {t("blog.allPosts")}
          </Link>

          {/* Header */}
          <header className="mb-10">
            <h1 className="font-serif text-3xl md:text-4xl text-foreground leading-tight mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1.5 font-mono text-xs">
                <CalendarDays className="size-3.5" />
                {formatDate(post.date)}
              </span>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
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
            </div>

            {post.description && (
              <p className="text-base text-muted-foreground leading-relaxed border-l-2 border-border pl-4">
                {post.description}
              </p>
            )}
          </header>

          {/* Divider */}
          <div className="h-px bg-border mb-10" />

          {/* Markdown content */}
          <div className="prose">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                h1: ({ children }) => (
                  <h1 className="font-serif text-2xl md:text-3xl text-foreground mt-10 mb-4 leading-tight">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="font-serif text-xl md:text-2xl text-foreground mt-10 mb-3 leading-tight">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="font-medium text-base text-foreground mt-8 mb-2">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-muted-foreground leading-relaxed mb-5 text-[15px]">
                    {children}
                  </p>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
                  >
                    {children}
                  </a>
                ),
                ul: ({ children }) => (
                  <ul className="my-4 ml-4 space-y-1.5 list-none">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="my-4 ml-4 space-y-1.5 list-decimal list-inside">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-muted-foreground text-[15px] flex gap-2">
                    <span className="text-border mt-1.5 flex-shrink-0">–</span>
                    <span>{children}</span>
                  </li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-foreground">{children}</strong>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-border pl-4 my-6 text-muted-foreground italic">
                    {children}
                  </blockquote>
                ),
                code: ({ className, children, ...props }) => {
                  const isInline = !className;
                  if (isInline) {
                    return (
                      <code
                        className="font-mono text-[13px] bg-muted px-1.5 py-0.5 rounded text-foreground"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => (
                  <pre className="my-6 rounded-xl overflow-x-auto bg-[#0d1117] border border-border text-sm p-4 leading-relaxed">
                    {children}
                  </pre>
                ),
                hr: () => <hr className="my-10 border-border" />,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Footer: share */}
          <div className="mt-14 pt-8 border-t border-border">
            <ShareButtons title={post.title} />
          </div>

          {/* Back */}
          <div className="mt-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              {t("blog.allPosts")}
            </Link>
          </div>
        </div>
      </motion.main>
      <Footer />
    </>
  );
}
