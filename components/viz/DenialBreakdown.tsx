"use client";

import { useRef } from "react";
import { useHasBeenSeen } from "@/components/motion/useHasBeenSeen";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { denialCategories as data } from "@/lib/content/stats";
import { cn } from "@/lib/utils";

/**
 * Denial categories, charted.
 *
 * The argument this makes visually: the top three bars are front-end failures
 * — things that happen before a coder ever touches the claim — and together
 * they are larger than everything else combined. Prose states that; a chart
 * makes it obvious at a glance.
 *
 * Bars grow with scaleX from a left origin, which the compositor handles on
 * its own thread. Animating `width` here would relayout the row on every
 * frame, for six rows simultaneously.
 *
 * The percentages are Optum's published category shares and are rendered at
 * full value in the DOM from first paint — the animation only affects the bar
 * geometry, so the numbers are correct and readable even mid-animation, and
 * they survive with motion disabled.
 */
export function DenialBreakdown({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { seen } = useHasBeenSeen(ref, { disabled: reduced });

  const max = Math.max(...data.categories.map((c) => c.share));
  const frontEndTotal = data.categories
    .filter((c) => c.frontEnd)
    .reduce((sum, c) => sum + c.share, 0);

  return (
    <figure
      ref={ref}
      className={cn(
        "surface-raised edge-light overflow-hidden rounded-2xl border border-border-soft",
        className,
      )}
    >
      <div className="border-b border-border-soft px-5 py-4 sm:px-6">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-faint">
          Why claims are denied
        </p>
        <p className="mt-1.5 text-sm font-600 text-ink">
          The three largest categories are all front-end
        </p>
      </div>

      <div className="space-y-4 px-5 py-6 sm:px-6">
        {data.categories.map((c, i) => (
          <div key={c.label}>
            <div className="flex items-baseline justify-between gap-4">
              <p
                className={cn(
                  "text-[0.82rem]",
                  c.frontEnd ? "font-500 text-ink" : "text-muted",
                )}
              >
                {c.label}
              </p>
              <p
                className={cn(
                  "metric shrink-0 text-[0.82rem]",
                  c.frontEnd ? "text-accent" : "text-faint",
                )}
              >
                {c.share.toFixed(2)}%
              </p>
            </div>

            <div className="surface-sunken mt-2 h-2 overflow-hidden rounded-full">
              <div
                className={cn(
                  "h-full origin-left rounded-full",
                  c.frontEnd
                    ? "bg-gradient-to-r from-accent to-accent-2"
                    : "bg-surface-3",
                )}
                style={{
                  width: `${(c.share / max) * 100}%`,
                  transform: seen || reduced ? "scaleX(1)" : "scaleX(0)",
                  transition: reduced
                    ? undefined
                    : `transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.07}s`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <figcaption className="border-t border-border-soft px-5 py-4 text-[0.72rem] leading-relaxed text-faint sm:px-6">
        Front-end categories account for {frontEndTotal.toFixed(1)}% of all denials — registration,
        eligibility and authorization failures that occur before coding.
        <span className="ml-1 text-muted">
          ({data.source}, {data.dataYear})
        </span>
      </figcaption>
    </figure>
  );
}
