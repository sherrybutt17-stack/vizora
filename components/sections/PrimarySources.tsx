import { ExternalLink } from "@/components/ui/ExternalLink";
import { getRefs } from "@/lib/content/external";
import { cn } from "@/lib/utils";

/**
 * The primary sources a page rests on, as real outbound links.
 *
 * This exists because 177 content pages on this site cited nothing while
 * `external.ts` sat on the resources page holding 43 curated primary sources.
 * A page that asserts how a denial is adjudicated and does not link to the
 * manual that governs it is asking to be taken on trust.
 *
 * Renders nothing when there are no refs, so a template can call it
 * unconditionally without guarding.
 */
export function PrimarySources({
  ids,
  className,
  heading = "Primary sources",
  note,
}: {
  ids: readonly string[];
  className?: string;
  heading?: string;
  note?: string;
}) {
  const refs = getRefs(ids);
  if (!refs.length) return null;

  return (
    <div className={cn("mt-12 rounded-xl border border-border bg-surface/40 p-6", className)}>
      <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-faint">{heading}</h2>
      {note && <p className="mt-2 text-sm text-muted">{note}</p>}
      <ul className="mt-4 space-y-4">
        {refs.map((r) => (
          <li key={r.id}>
            <ExternalLink href={r.url} className="font-500 text-ink no-underline hover:text-accent">
              {r.label}
            </ExternalLink>
            <p className="mt-1 text-sm text-muted">
              <span className="text-faint">{r.publisher}</span> — {r.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
