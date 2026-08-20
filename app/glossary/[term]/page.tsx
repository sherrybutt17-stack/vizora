import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Lightbulb } from "lucide-react";
import { Container, Section, Badge, Eyebrow, Card, Prose } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AnswerBlock } from "@/components/sections/AnswerBlock";
import { FinalCTA } from "@/components/sections/FinalCTA";
import {
  JsonLd, breadcrumbSchema, definedTermSchema, webPageSchema, qaPageSchema, ENTITIES,
} from "@/lib/schema";
import {
  getTerm, glossarySlugs, glossaryCategories, resolveRelated, termsInCategory,
} from "@/lib/content/glossary";
import { pageMeta } from "@/lib/seo";
import { LAST_UPDATED, formatDate } from "@/lib/utils";
import { PageTransition } from "@/components/motion/ViewTransition";
import { site } from "@/lib/content/site";

/** Trim to a length without cutting a word in half. */
function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).replace(/[,;:]$/, "")}…`;
}


export function generateStaticParams() {
  return glossarySlugs.map((term) => ({ term }));
}

export async function generateMetadata({ params }: { params: Promise<{ term: string }> }) {
  const { term } = await params;
  const t = getTerm(term);
  if (!t) return {};
  return pageMeta({
    // Kept short deliberately: with the brand suffix appended by the root
    // layout template, the longer form pushed 19 glossary titles past the
    // ~60-character point where Google truncates.
    title: `What Is ${t.term}?`,
    // Trimmed at a word boundary rather than mid-word, and inside the ~160
    // characters a description gets before it is cut.
    description: truncate(t.answer, 155),
    path: `/glossary/${t.slug}`,
    keywords: [
      `what is ${t.term.toLowerCase()}`,
      `${t.term.toLowerCase()} definition`,
      `${t.term.toLowerCase()} medical billing`,
      `${t.term.toLowerCase()} meaning`,
      ...(t.aliases ?? []),
    ],
  });
}

export default async function GlossaryTermPage({ params }: { params: Promise<{ term: string }> }) {
  const { term } = await params;
  const t = getTerm(term);
  if (!t) notFound();

  const category = glossaryCategories.find((c) => c.id === t.category)!;
  const related = resolveRelated(t.related);
  const siblings = termsInCategory(t.category).filter((s) => s.slug !== t.slug).slice(0, 6);
  const question = `What is ${t.term.toLowerCase()} in medical billing?`;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Glossary", path: "/glossary" },
    { name: t.term, path: `/glossary/${t.slug}` },
  ];

  return (
    <PageTransition>
      <JsonLd data={[
        breadcrumbSchema(crumbs),
        definedTermSchema(t),
        qaPageSchema({ question, answer: t.answer, path: `/glossary/${t.slug}` }),
        webPageSchema({
          name: `What is ${t.term}?`,
          description: t.answer,
          path: `/glossary/${t.slug}`,
          about: [{ name: t.term, url: `${site.url}/glossary/${t.slug}` }],
          mentions: [ENTITIES.medicalBilling, ENTITIES.rcm],
          lastReviewed: LAST_UPDATED,
          speakableSelectors: ["[data-answer]"],
        }),
      ]} />
      <Breadcrumbs items={crumbs} />

      <Section className="scroll-rise relative overflow-hidden pt-4 pb-14">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl">
            <Badge tone="accent">{category.title}</Badge>
            <h1 className="mt-5 text-[clamp(2rem,4.6vw,3.1rem)] font-600 leading-[1.06]">
              What is {t.term}?
            </h1>
            {t.aliases?.length ? (
              <p className="mt-3 text-sm text-faint">
                Also called: {t.aliases.join(" · ")}
              </p>
            ) : null}

            <AnswerBlock className="mt-8">{t.answer}</AnswerBlock>

            <Prose className="mt-9">
              {t.body.map((p, i) => <p key={i}>{p}</p>)}
            </Prose>

            {t.example && (
              <Card hover={false} className="mt-8 border-accent/20 bg-accent/[0.04]">
                <div className="flex items-start gap-3">
                  <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <div>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-accent">Example</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-2">{t.example}</p>
                  </div>
                </div>
              </Card>
            )}

            {t.services?.length ? (
              <div className="mt-10 rounded-2xl border border-border bg-surface p-6">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-faint">
                  Where Vizora handles this
                </p>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {t.services.map((s) => (
                    <li key={s.href}>
                      <Link
                        href={s.href}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-4 py-2 text-sm text-ink-2 transition-colors hover:border-accent/40 hover:text-accent"
                      >
                        {s.label}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <p className="mt-8 text-xs text-faint">Last reviewed {formatDate(LAST_UPDATED)}</p>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section className="scroll-rise border-t border-border py-14">
          <Container>
            <Eyebrow>Related terms</Eyebrow>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/glossary/${r.slug}`}
                  className="group rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-surface-2"
                >
                  <p className="font-500 text-ink group-hover:text-accent">{r.term}</p>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">{r.answer}</p>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {siblings.length > 0 && (
        <Section className="scroll-rise border-t border-border py-12">
          <Container>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-faint">
              More in {category.title}
            </p>
            <ul className="link-list mt-4 flex flex-wrap gap-x-5 gap-y-2.5">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <Link href={`/glossary/${s.slug}`} className="text-sm text-muted transition-colors hover:text-accent">
                    {s.term}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/glossary" className="text-sm font-500 text-accent underline underline-offset-4">
                  All terms
                </Link>
              </li>
            </ul>
          </Container>
        </Section>
      )}

      <FinalCTA />
    </PageTransition>
  );
}
