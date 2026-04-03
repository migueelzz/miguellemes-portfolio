import { experiences } from "@/data/experiences";
import { AnimatedSection, StaggerChildren, fadeUpItem } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export function ExperienceSection() {
  const { t } = useTranslation();

  return (
    <AnimatedSection id="experience" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground">
            {t("sections.experience")}
          </h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        <StaggerChildren className="relative">
          {/* Timeline vertical line */}
          <div className="absolute left-[7px] top-2 bottom-0 w-px bg-border hidden sm:block" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                variants={fadeUpItem}
                className="relative sm:pl-10"
              >
                {/* Timeline dot */}
                <div
                  className={cn(
                    "absolute left-0 top-1.5 size-3.5 rounded-full border-2 hidden sm:block",
                    exp.current
                      ? "bg-foreground border-foreground"
                      : "bg-background border-muted-foreground/40"
                  )}
                />

                <div className="space-y-3">
                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                    <div>
                      <h3 className="font-medium text-foreground leading-snug">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                        {exp.url ? (
                          <a
                            href={exp.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {exp.company} ↗
                          </a>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            {exp.company}
                          </span>
                        )}
                        {exp.via && (
                          <span className="text-xs text-muted-foreground/60">
                            {exp.via}
                          </span>
                        )}
                        <span className="text-muted-foreground/30 text-xs">·</span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground/60">
                          <MapPin className="size-2.5" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* Period + current badge */}
                    <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
                      {exp.current && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                          <span className="relative flex size-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full size-1.5 bg-emerald-500" />
                          </span>
                          {t("sections.current")}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground font-mono whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  {/* Description bullets */}
                  <ul className="space-y-1.5">
                    {exp.description.map((line, j) => (
                      <li
                        key={j}
                        className="text-sm text-muted-foreground leading-relaxed flex gap-2"
                      >
                        <span className="text-border mt-1.5 flex-shrink-0">–</span>
                        {line}
                      </li>
                    ))}
                  </ul>

                  {/* Stack badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.stack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-xs font-normal px-2 py-0.5 rounded-full"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </StaggerChildren>
      </div>
    </AnimatedSection>
  );
}
