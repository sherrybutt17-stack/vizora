import type { CitedStat } from "@/lib/content/stats";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { cn } from "@/lib/utils";

/**
 * Renders an industry statistic WITH its source, and — where one exists — a
 * link to the publisher.
 *
 * This component is the enforcement mechanism for the rule in
 * lib/content/stats.ts: no external number appears on this site without
 * attribution. The link matters as much as the attribution. A figure you can
 * follow to its publisher is verifiable; a figure with a name next to it is
 * still just an assertion, and both readers and answer engines discount it
 * accordingly.
 */
function Attribution({ stat }: { stat: CitedStat }) {
  const label = `${stat.source}, ${stat.dataYear}`;
  return (
    <>
      Source:{" "}
      {stat.url ? (
        <ExternalLink href={stat.url} className="text-faint hover:text-accent">{label}</ExternalLink>
      ) : (
        label
      )}
    </>
  );
}

export function CitedFigure({ stat, className }: { stat: CitedStat; className?: string }) {
  return (
    <figure
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-surface p-5 transition-colors duration-300 hover:border-accent/25",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/[0.07] blur-2xl transition-opacity duration-500 group-hover:bg-accent/[0.14]"
      />
      <p className="relative font-mono text-3xl font-700 text-accent">{stat.value}</p>
      <p className="relative mt-1.5 text-sm leading-snug text-ink-2">{stat.label}</p>
      <figcaption className="relative mt-3 border-t border-border pt-3 text-[0.7rem] leading-relaxed text-faint">
        <Attribution stat={stat} />
        {stat.basis && <span className="mt-0.5 block">{stat.basis}</span>}
      </figcaption>
    </figure>
  );
}

/** Inline variant for use inside prose. */
export function CitedInline({ stat }: { stat: CitedStat }) {
  return (
    <span>
      <strong className="text-ink">{stat.value}</strong>
      <span className="ml-1 text-[0.72em] text-faint">
        (
        {stat.url ? (
          <ExternalLink href={stat.url} showIcon={false} className="text-faint hover:text-accent">
            {stat.source}, {stat.dataYear}
          </ExternalLink>
        ) : (
          <>{stat.source}, {stat.dataYear}</>
        )}
        )
      </span>
    </span>
  );
}
