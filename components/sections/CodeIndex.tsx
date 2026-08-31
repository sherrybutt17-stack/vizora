import Link from "next/link";

/**
 * The full index of reference pages, grouped by category.
 *
 * Presented as what it is — an index — rather than dressed up as "related
 * codes". A reference site earns its keep by letting someone who arrived
 * looking for one code reach any other in a click, and a biller working a
 * remittance is usually holding more than one code.
 *
 * It also closes a measured gap: the pages outranking ours carry 70+ internal
 * links to sibling codes while ours carried three. Category siblings alone did
 * not get there, because the categories are small.
 */
export function CodeIndex<T extends { code: string; label: string; category: string }>({
  items,
  currentCode,
  basePath,
  title,
}: {
  items: T[];
  currentCode: string;
  basePath: string;
  title: string;
}) {
  const byCategory = new Map<string, T[]>();
  for (const item of items) {
    const list = byCategory.get(item.category) ?? [];
    list.push(item);
    byCategory.set(item.category, list);
  }
  const categories = [...byCategory.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  if (!categories.length) return null;

  /**
   * A <nav>, not a <div>, because that is what it is.
   *
   * Measured 2026-09-01: the index adds 10-20 points of 8-word shingle overlap
   * between any two code pages, because 53 code+label pairs repeat on every
   * one. Body-only overlap is 1.8-15.8%, so the unique content is genuinely
   * unique — this is boilerplate, and marking it as navigation is how a parser
   * is supposed to be told that.
   */
  return (
    <nav aria-label={title} className="mt-12 border-t border-border pt-8">
      <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-faint">{title}</h2>
      <div className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(([category, list]) => (
          <div key={category}>
            <p className="text-xs font-500 text-ink">{category}</p>
            <ul className="mt-2 space-y-1.5">
              {list.map((item) => {
                const isCurrent = item.code === currentCode;
                return (
                  <li key={item.code}>
                    {isCurrent ? (
                      <span className="text-sm text-faint">
                        <span className="font-mono">{item.code}</span>
                        <span className="ml-2">{item.label}</span>
                      </span>
                    ) : (
                      <Link
                        href={`${basePath}/${item.code.toLowerCase()}`}
                        className="text-sm text-muted transition-colors hover:text-accent"
                      >
                        <span className="font-mono text-accent">{item.code}</span>
                        <span className="ml-2">{item.label}</span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
