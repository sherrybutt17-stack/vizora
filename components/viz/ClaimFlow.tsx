"use client";

import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { cn } from "@/lib/utils";

const STAGES = [
  {
    label: "Eligibility",
    sub: "Coverage and benefits verified before the visit",
    leak: "24.3% of denials",
    tone: "danger" as const,
  },
  {
    label: "Coding",
    sub: "Documentation translated by a specialty-assigned coder",
    leak: "Undercoding — silent",
    tone: "warning" as const,
  },
  {
    label: "Scrubbing",
    sub: "Checked against payer-specific and NCCI edits",
    leak: "Cheapest fix point",
    tone: "positive" as const,
  },
  {
    label: "Submission",
    sub: "Transmitted electronically, acknowledgements read daily",
    leak: "Silent rejections",
    tone: "warning" as const,
  },
  {
    label: "Payment",
    sub: "Posted, reconciled, and variances challenged",
    leak: "Underpayments",
    tone: "warning" as const,
  },
];

const TONE = {
  danger: "text-danger bg-danger/10 ring-danger/20",
  warning: "text-warning bg-warning/10 ring-warning/20",
  positive: "text-positive bg-positive/10 ring-positive/20",
};

/**
 * Claim lifecycle rail.
 *
 * Laid out vertically rather than as five columns. The horizontal version put
 * a connector between every pair of cards, which meant five different line
 * lengths to keep aligned against circles that moved with the text above them
 * — and the cards ended up ragged because "Electronic" is one line and
 * "Posted & reconciled" is two.
 *
 * A vertical rail has one line, drawn once, behind everything. Alignment is
 * structural rather than something to maintain, rows can be different heights
 * without looking broken, and each stage gets room for the annotation that is
 * the actual point of the diagram: where revenue leaves at that step.
 */
export function ClaimFlow({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <figure
      className={cn(
        "surface-raised edge-light overflow-hidden rounded-2xl border border-border-soft",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-border-soft px-5 py-4 sm:px-6">
        <div>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-faint">
            Claim lifecycle
          </p>
          <p className="mt-1.5 text-sm font-600 text-ink">Five stages, four leak points</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-3 py-1.5 text-[0.65rem] font-500 text-muted ring-1 ring-border">
          <span className="relative flex h-1.5 w-1.5">
            {!reduced && (
              <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-accent" />
            )}
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          5 stages
        </span>
      </div>

      <ol className="relative px-5 py-6 sm:px-6">
        {/* One rail, drawn once, behind every node.
            Geometry: left = horizontal padding + half a node (h-9 = 2.25rem,
            so 1.125rem); top/bottom = vertical padding + half a node. That
            makes the line start at the first node's centre and stop at the
            last one's, instead of running past both. */}
        <span
          aria-hidden="true"
          className="absolute left-[calc(1.25rem+1.125rem)] top-[calc(1.5rem+1.125rem)] bottom-[calc(1.5rem+1.125rem)] w-px bg-border sm:left-[calc(1.5rem+1.125rem)]"
        />

        {/* Travelling pulse. The wrapper carries the rail's exact geometry so
            the animated child can only ever fill the rail — an earlier version
            animated `height` on an element with no `bottom`, which resolved
            100% against the whole list and shot past the last node. scaleY on
            a pinned wrapper is also compositor-only. */}
        {!reduced && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-[calc(1.25rem+1.125rem)] top-[calc(1.5rem+1.125rem)] bottom-[calc(1.5rem+1.125rem)] w-px overflow-hidden sm:left-[calc(1.5rem+1.125rem)]"
          >
            <span className="claimflow-pulse block h-full w-px" />
          </span>
        )}

        {STAGES.map((s, i) => (
          <li key={s.label} className="relative flex gap-4 pb-6 last:pb-0">
            {/* No ring: the node's own gradient is opaque and already hides the
                rail behind it. A ring would need a single flat colour, which
                cannot match the panel's gradient at both the top and bottom of
                the list. */}
            <span
              className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-navy to-accent font-mono text-xs font-700 text-ink"
            >
              {i + 1}
            </span>

            <div className="min-w-0 flex-1 pt-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <p className="text-sm font-600 text-ink">{s.label}</p>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[0.6rem] font-500 ring-1",
                    TONE[s.tone],
                  )}
                >
                  {s.leak}
                </span>
              </div>
              <p className="mt-1 text-[0.78rem] leading-relaxed text-faint">{s.sub}</p>
            </div>
          </li>
        ))}
      </ol>

      <figcaption className="border-t border-border-soft px-5 py-4 text-[0.72rem] leading-relaxed text-faint sm:px-6">
        44% of denials are created in the first two stages — before a claim is ever coded.
        <span className="ml-1 text-muted">(Optum, 2023)</span>
      </figcaption>
    </figure>
  );
}
