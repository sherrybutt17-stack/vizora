import { AlertTriangle } from "lucide-react";
import { Container, Section, SectionHead } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { lastUpdated, formatDate } from "@/lib/utils";
import { PageTransition } from "@/components/motion/ViewTransition";

export type LegalSection = { heading: string; body: string[] };

/**
 * Shared shell for the four legal pages. The reference site shipped all four
 * as dead href="#" stubs.
 *
 * The substance below is a good-faith structural outline of what each document
 * should cover — it is NOT legal advice and NOT enforceable text. Binding
 * language has to come from the client's counsel. The notice at the top of
 * each page says so plainly rather than letting a placeholder pass as a real
 * policy, which would be worse than having no page at all.
 */
export function LegalPage({
  title,
  intro,
  sections,
  path,
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
  path: string;
}) {
  const crumbs = [{ name: "Home", path: "/" }, { name: title, path }];
  return (
    <PageTransition>
      <Breadcrumbs items={crumbs} />
      <Section className="pt-4">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionHead as="h1" align="left" title={title} lead={intro} />
            <p className="mt-5 text-sm text-faint">Last updated {formatDate(lastUpdated("legal"))}</p>

            <div className="mt-8 flex gap-3 rounded-xl border border-warning/30 bg-warning/[0.06] p-5">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
              <p className="text-sm leading-relaxed text-muted">
                <strong className="text-ink">Draft — not yet legally reviewed.</strong> This page
                sets out the structure and subject matter the final document should cover. It is not
                legal advice and is not binding. Before launch, it must be replaced with text
                prepared or approved by qualified counsel familiar with HIPAA and your state&rsquo;s
                requirements.
              </p>
            </div>

            <div className="mt-12 space-y-10">
              {sections.map((s) => (
                <section key={s.heading}>
                  <h2 className="text-xl font-600 leading-snug">{s.heading}</h2>
                  <div className="mt-4 space-y-4 leading-relaxed text-muted">
                    {s.body.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </PageTransition>
  );
}
