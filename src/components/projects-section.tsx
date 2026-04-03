import { projects } from "@/data/projects";
import { AnimatedSection, StaggerChildren, fadeUpItem } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export function ProjectsSection() {
  const { t } = useTranslation();
  const featured = projects.filter((p) => p.featured);

  return (
    <AnimatedSection id="projects" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4 flex-1">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground">
              {t("sections.projects")}
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <a
            href="https://github.com/migueelzz?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "ml-4 flex-shrink-0 flex items-center gap-1.5 text-sm text-muted-foreground",
              "hover:text-foreground transition-colors duration-200"
            )}
          >
            {t("sections.viewAll")}
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featured.map((project) => (
            <motion.div
              key={project.title}
              variants={fadeUpItem}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "group relative flex flex-col rounded-xl overflow-hidden",
                "border border-border bg-card",
                "hover:border-border/80 hover:shadow-lg hover:shadow-black/10",
                "dark:hover:shadow-black/40 transition-all duration-300"
              )}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-muted/30">
                <img
                  src={project.thumb}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay with links */}
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium",
                        "bg-foreground text-background hover:bg-foreground/90 transition-colors"
                      )}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="size-3" />
                      Live Demo
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium",
                      "bg-accent text-foreground hover:bg-accent/80 border border-border transition-colors"
                    )}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="size-3" />
                    GitHub
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-4 gap-3">
                <div>
                  <h3 className="font-medium text-foreground text-sm leading-snug mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 mt-auto pt-1">
                  {project.tech.slice(0, 4).map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-[11px] font-normal px-1.5 py-0 rounded-full"
                    >
                      {tech}
                    </Badge>
                  ))}
                  {project.tech.length > 4 && (
                    <Badge
                      variant="secondary"
                      className="text-[11px] font-normal px-1.5 py-0 rounded-full text-muted-foreground"
                    >
                      +{project.tech.length - 4}
                    </Badge>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerChildren>

        {/* View all CTA */}
        <div className="mt-8 flex justify-center">
          <a
            href="https://github.com/migueelzz?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium",
              "border border-border text-muted-foreground",
              "hover:border-foreground/40 hover:text-foreground hover:bg-accent",
              "transition-all duration-200"
            )}
          >
            <Github className="size-4" />
            {t("sections.viewAllGithub")}
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}
