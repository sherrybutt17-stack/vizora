import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Section, SectionHead } from "@/components/ui";

export type RelatedLink = { label: string; href: string; description?: string };

/**
 * Data-generated cross-links. Because these come from the shared taxonomy
 * rather than being hand-maintained per page, they cannot rot as content
 * is added — and they are how authority reaches the money pages.
 */
export function RelatedContent({
  title = "Related services",
  lead,
  links,
}: {
  title?: string;
  lead?: string;
  links: RelatedLink[];
}) {
  if (!links.length) return null;
  return (
    <Section className="border-t border-border">
      <Container>
        <SectionHead align="left" title={title} lead={lead} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              transitionTypes={["nav-forward"]}
              className="group rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-surface-2"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-500 text-ink group-hover:text-accent">{l.label}</span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-accent" />
              </div>
              {l.description && (
                <p className="mt-2 text-sm leading-snug text-muted">{l.description}</p>
              )}
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
