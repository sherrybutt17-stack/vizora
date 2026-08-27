"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, AlertTriangle, ArrowUpRight } from "lucide-react";
import { denialCodes, denialCategories, type DenialCategory } from "@/lib/content/denial-codes";
import { detailedCodes } from "@/lib/content/denial-code-details";
import { Badge, Card } from "@/components/ui";
import { cn } from "@/lib/utils";

/**
 * Deep-linkable via `?q=`.
 *
 * Two reasons. It lets an AI answer or an article point straight at a result —
 * /tools/denial-code-lookup?q=CO-16 — instead of at a search box the reader
 * then has to use. And it gives the site a real search endpoint, which is what
 * the `SearchAction` in `websiteSchema()` refers to; declaring one without a
 * working endpoint behind it would be a fabricated capability.
 *
 * The query seeds initial state rather than controlling it, so typing after
 * arrival behaves normally and does not fight the URL.
 */
function LookupInner() {
  const initialQuery = useSearchParams().get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<DenialCategory | "All">("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return denialCodes.filter((d) => {
      if (category !== "All" && d.category !== category) return false;
      if (!q) return true;
      return (
        d.code.toLowerCase().includes(q) ||
        d.title.toLowerCase().includes(q) ||
        d.meaning.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  return (
    <div>
      <div className="sticky top-[4.5rem] z-10 -mx-1 bg-bg/90 px-1 py-4 backdrop-blur-xl">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a code or a phrase — try CO-16, authorization, or timely filing"
            aria-label="Search denial codes"
            className="h-13 w-full rounded-full border border-border bg-surface pl-11 pr-5 text-[0.95rem] text-ink placeholder:text-faint focus:border-accent/50 focus:outline-none"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {(["All", ...denialCategories] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-500 ring-1 transition-colors",
                category === c
                  ? "bg-accent text-[#04211e] ring-accent"
                  : "bg-surface text-muted ring-border hover:text-ink",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-5 mt-2 text-sm text-faint" aria-live="polite">
        {results.length} {results.length === 1 ? "code" : "codes"}
      </p>

      {results.length === 0 ? (
        <Card hover={false} className="text-center">
          <p className="text-muted">No codes match that search.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {results.map((d) => (
            <Card key={d.code} hover={false} as="article" className="scroll-mt-32">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-mono text-lg font-700 text-accent">{d.code}</h2>
                <Badge>{d.group}</Badge>
                <Badge tone="accent">{d.category}</Badge>
                {d.writeOff && (
                  <Badge className="bg-warning/10 text-warning ring-warning/25">
                    <AlertTriangle className="h-3 w-3" /> Often a write-off
                  </Badge>
                )}
              </div>
              <p className="mt-3 text-[0.95rem] font-500 leading-snug text-ink">{d.title}</p>
              {detailedCodes.includes(d.code) && (
                <Link
                  href={`/denial-codes/${d.code.toLowerCase()}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-500 text-accent hover:underline"
                >
                  Read the full {d.code} guide
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              )}
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-faint">What it means</dt>
                  <dd className="mt-1 leading-relaxed text-muted">{d.meaning}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-faint">How to fix it</dt>
                  <dd className="mt-1 leading-relaxed text-muted">{d.fix}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-faint">How to prevent it</dt>
                  <dd className="mt-1 leading-relaxed text-muted">{d.prevent}</dd>
                </div>
              </dl>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export function DenialCodeLookup() {
  return (
    <Suspense fallback={null}>
      <LookupInner />
    </Suspense>
  );
}
