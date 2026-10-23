import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AnimatedSection } from "@/components/animated-section";
import { cn } from "@/lib/utils";

// [date, count, level 0-4], see api/contributions.ts
type Day = [string, number, number];

interface Contributions {
  total: number;
  weeks: Day[][];
}

const CELL = 11;
const GAP = 3;

const LEVEL_CLASSES = [
  "bg-foreground/[0.06]",
  "bg-emerald-500/30",
  "bg-emerald-500/55",
  "bg-emerald-500/80",
  "bg-emerald-500",
];

// How many week columns fit in the container, so phones show the most recent months
// instead of a horizontal scroll.
function useFittingWeeks(ref: React.RefObject<HTMLElement>, max: number) {
  const [weeks, setWeeks] = useState(max);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setWeeks(Math.min(max, Math.floor((entry.contentRect.width + GAP) / (CELL + GAP))));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, max]);

  return weeks;
}

function useCountUp(target: number, active: boolean, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active || !target) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, duration]);

  return value;
}

export function GithubContributions() {
  const { t, i18n } = useTranslation();
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<Day | null>(null);

  const { data, isError } = useQuery<Contributions>({
    queryKey: ["github-contributions"],
    queryFn: async () => {
      const res = await fetch("/api/contributions");
      if (!res.ok) throw new Error(`Failed to load contributions: ${res.status}`);
      return res.json();
    },
    refetchInterval: 10 * 60 * 1000,
    retry: false,
  });

  const allWeeks = data?.weeks ?? [];
  const visibleCount = useFittingWeeks(gridRef, allWeeks.length || 53);
  const weeks = allWeeks.slice(-visibleCount);
  const revealed = inView && weeks.length > 0;
  const total = useCountUp(data?.total ?? 0, revealed);

  const locale = i18n.language === "pt" ? "pt-BR" : "en-US";
  const monthFormat = new Intl.DateTimeFormat(locale, { month: "short" });
  const dayFormat = new Intl.DateTimeFormat(locale, { month: "short", day: "numeric", year: "numeric" });
  const parseDate = (date: string) => new Date(date + "T00:00:00");

  if (isError) return null;

  return (
    <AnimatedSection id="contributions" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4 flex-1">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground">
              {t("sections.contributions")}
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <a
            href="https://github.com/migueelzz"
            target="_blank"
            rel="noopener noreferrer"
            className="group ml-4 flex-shrink-0 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            @migueelzz
            <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div ref={gridRef} className="w-full">
          {/* Month labels, one slot per week column */}
          <div
            className="grid mb-2 h-4 text-xs text-muted-foreground"
            style={{ gridTemplateColumns: `repeat(${weeks.length || 1}, minmax(0, 1fr))`, columnGap: GAP }}
            aria-hidden
          >
            {weeks.map((week, i) => {
              const month = parseDate(week[0][0]).getMonth();
              const isNewMonth = i > 0 && parseDate(weeks[i - 1][0][0]).getMonth() !== month;
              // Label the column where a new month begins.
              return (
                <span key={week[0][0]} className="whitespace-nowrap overflow-visible">
                  {isNewMonth && monthFormat.format(parseDate(week[0][0]))}
                </span>
              );
            })}
          </div>

          <div
            role="img"
            aria-label={t("contributions.summary", { count: data?.total ?? 0 })}
            className="grid"
            style={{ gridTemplateColumns: `repeat(${weeks.length || 1}, minmax(0, 1fr))`, gap: GAP }}
            onMouseLeave={() => setHovered(null)}
          >
            {weeks.length === 0 && (
              <div className="h-[107px] rounded-md bg-foreground/[0.04] animate-pulse col-span-full" />
            )}
            {weeks.map((week, col) => (
              <div key={week[0][0]} className="grid gap-[3px]" style={{ gridTemplateRows: "repeat(7, minmax(0, 1fr))" }}>
                {week.map((day, row) => (
                  <div
                    key={day[0]}
                    data-revealed={revealed}
                    onMouseEnter={() => setHovered(day)}
                    className={cn(
                      "contribution-cell aspect-square w-full rounded-[3px]",
                      LEVEL_CLASSES[day[2]],
                      hovered?.[0] === day[0] && "ring-1 ring-foreground/60 ring-offset-1 ring-offset-background"
                    )}
                    style={{ transitionDelay: revealed ? `${col * 14 + row * 24}ms` : undefined }}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2 min-w-0">
              <span className="relative flex size-1.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full size-1.5 bg-emerald-500" />
              </span>
              <span className="truncate tabular-nums">
                {hovered
                  ? t("contributions.day", { count: hovered[1], date: dayFormat.format(parseDate(hovered[0])) })
                  : t("contributions.summary", { count: total })}
              </span>
            </span>

            <span className="hidden sm:flex items-center gap-1.5 flex-shrink-0 text-xs" aria-hidden>
              {t("contributions.less")}
              {LEVEL_CLASSES.map((cls) => (
                <span key={cls} className={cn("size-[11px] rounded-[3px]", cls)} />
              ))}
              {t("contributions.more")}
            </span>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
