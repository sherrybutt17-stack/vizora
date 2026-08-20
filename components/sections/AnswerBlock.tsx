import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The answer-first block.
 *
 * Two jobs. For a reader it puts the direct answer above everything else, so
 * the page is useful in three seconds rather than three paragraphs. For an
 * answer engine it isolates a self-contained 40-60 word passage that survives
 * extraction — which is the unit AI systems actually quote, since they pull
 * passages rather than pages.
 *
 * `data-answer` is deliberate: it gives the speakable/CSS selector in the
 * page's JSON-LD something stable to point at.
 */
export function AnswerBlock({
  question,
  children,
  className,
  as = "div",
}: {
  question?: string;
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
}) {
  const As = as;
  return (
    <As
      data-answer=""
      className={cn(
        "relative overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/[0.07] via-surface to-surface p-6 sm:p-7",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-accent/10 blur-3xl"
      />
      <div className="relative">
        {question && (
          <p className="font-mono text-[0.68rem] font-600 uppercase tracking-[0.18em] text-accent">
            {question}
          </p>
        )}
        <div className={cn("text-[1.06rem] leading-[1.7] text-ink-2", question && "mt-3")}>
          {children}
        </div>
      </div>
    </As>
  );
}

/** Compact key-fact strip. Used where a page needs a scannable summary row. */
export function KeyFacts({ facts }: { facts: { label: string; value: ReactNode }[] }) {
  return (
    <dl className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {facts.map((f) => (
        <div key={f.label} className="bg-surface p-5">
          <dt className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-faint">{f.label}</dt>
          <dd className="mt-2 text-sm leading-snug text-ink">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}
