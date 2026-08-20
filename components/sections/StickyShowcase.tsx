"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { CountUp } from "@/components/motion";
import { cn } from "@/lib/utils";

export type ShowcaseStep = {
  eyebrow: string;
  title: string;
  body: string;
  metric?: { value: string; label: string };
};

/**
 * Scroll-pinned narrative section.
 *
 * A visual holds position while the text steps past it. The constraint that
 * shaped this implementation: every step's copy is always rendered and always
 * legible. Only emphasis changes with scroll — the border, the eyebrow colour
 * and a rail indicator. Nothing is hidden and nothing depends on an observer
 * firing, so a coalesced callback during a fast scroll costs you a highlight,
 * never a paragraph.
 *
 * Below `lg` it degrades to a plain stacked list, because pinning on a short
 * viewport fights the user for control of the scroll.
 */
export function StickyShowcase({
  steps,
  visual,
  className,
}: {
  steps: ShowcaseStep[];
  visual: ReactNode;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const nodes = refs.current.filter(Boolean) as HTMLLIElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Take the entry closest to the vertical centre rather than the first
        // intersecting one — with tall steps, several qualify at once.
        let best: { index: number; distance: number } | null = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = nodes.indexOf(entry.target as HTMLLIElement);
          if (index < 0) continue;
          const rect = entry.boundingClientRect;
          const distance = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
          if (!best || distance < best.distance) best = { index, distance };
        }
        if (best) setActive(best.index);
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: [0, 0.5, 1] },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [steps.length]);

  return (
    <div className={cn("grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16", className)}>
      {/* Copy rail */}
      <div className="order-2 lg:order-1">
        <ol className="relative space-y-10 lg:space-y-24">
          {/* Continuous rail behind the steps */}
          <span
            aria-hidden="true"
            className="absolute left-0 top-2 hidden h-[calc(100%-1rem)] w-px bg-border lg:block"
          />
          {steps.map((step, i) => {
            const on = i === active;
            return (
              <li
                key={step.title}
                ref={(el) => { refs.current[i] = el; }}
                className="relative lg:pl-8"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-0 top-2 hidden h-6 w-px origin-top transition-all duration-500 lg:block",
                    on ? "scale-y-100 bg-accent" : "scale-y-0 bg-accent",
                  )}
                />
                <p
                  className={cn(
                    "font-mono text-[0.68rem] font-600 uppercase tracking-[0.2em] transition-colors duration-500",
                    on ? "text-accent" : "text-faint",
                  )}
                >
                  {step.eyebrow}
                </p>
                <h3 className="mt-3 text-display-sm font-600 text-ink">{step.title}</h3>
                <p className="measure mt-3 leading-relaxed text-muted">{step.body}</p>
                {step.metric && (
                  <p className="mt-5 flex items-baseline gap-3">
                    <span className="metric text-2xl text-accent">
                      <CountUp value={step.metric.value} />
                    </span>
                    <span className="text-sm text-faint">{step.metric.label}</span>
                  </p>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Pinned visual */}
      <div className="order-1 lg:order-2">
        {/* Pinned to just below the sticky header and centred in the space
            that is actually visible. `top-28` pinned it to the top of a column
            far taller than the diagram, which left a large dead band beneath
            it as the steps scrolled past. The 4.5rem matches the header's
            h-[4.5rem] in components/layout/Header.tsx. */}
        <div className="lg:sticky lg:top-[4.5rem] lg:flex lg:h-[calc(100vh-4.5rem)] lg:items-center">
          {visual}
        </div>
      </div>
    </div>
  );
}
