import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <Container>
      <nav aria-label="Breadcrumb" className="py-5">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-faint">
          {items.map((item, i) => {
            const last = i === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1.5">
                {last ? (
                  <span className="text-muted" aria-current="page">{item.name}</span>
                ) : (
                  <>
                    {/* Breadcrumbs always move up the hierarchy, so they carry
                        the back direction: content slides right on the way out.
                        See app/template.tsx. */}
                    <Link
                      href={item.path}
                      transitionTypes={["nav-back"]}
                      className="transition-colors hover:text-accent"
                    >
                      {item.name}
                    </Link>
                    <ChevronRight className="h-3 w-3" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </Container>
  );
}
