import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, Minus, AlertTriangle, ArrowUpRight } from "lucide-react";
import { Container, Section, Eyebrow, Card, Prose, Badge } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AnswerBlock } from "@/components/sections/AnswerBlock";
import { FAQList } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import {
  JsonLd, breadcrumbSchema, comparisonSchema, faqSchema, webPageSchema, ENTITIES,
} from "@/lib/schema";
import { getComparison, comparisonSlugs, comparisons } from "@/lib/content/comparisons";
import { pageMeta } from "@/lib/seo";
import { LAST_UPDATED, formatDate } from "@/lib/utils";
import { PageTransition } from "@/components/motion/ViewTransition";

export function generateStaticParams() {
  return comparisonSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) return {};
  return pageMeta({
    title: c.metaTitle,
    description: c.metaDescription,
    path: `/compare/${c.slug}`,
    keywords: c.keywords,
  });
}

/** Column marker. `even` renders a dash rather than nothing, so a reader can
 *  tell "no advantage" apart from "we didn't assess this". */
function Edge({ active, even }: { active: boolean; even?: boolean }) {
  if (even) return <Minus className="h-3.5 w-3.5 text-faint" aria-label="No clear advantage" />;
  if (!active) return null;
  return <Check className="h-3.5 w-3.5 text-accent" aria-label="Advantage" />;
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) notFound();

  const others = comparisons.filter((x) => x.slug !== c.slug);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Compare", path: "/compare" },
    { name: c.title, path: `/compare/${c.slug}` },
  ];

  return (
    <PageTransition>
      <JsonLd data={[
        breadcrumbSchema(crumbs),
        comparisonSchema({ ...c, lastReviewed: LAST_UPDATED }),
        // The headline question joins the FAQ list rather than being emitted
        // as a separate QAPage. QAPage is for user-submitted answers; a single
        // site-written answer is explicitly outside its scope, and emitting
        // both types for the same content also duplicated the pair.
        faqSchema([{ question: c.question, answer: c.answer }, ...c.faqs]),
        webPageSchema({
          name: c.title,
          description: c.metaDescription,
          path: `/compare/${c.slug}`,
          about: [ENTITIES.medicalBilling],
          mentions: [ENTITIES.rcm, ENTITIES.medicalCoding],
          lastReviewed: LAST_UPDATED,
          speakableSelectors: ["[data-answer]"],
        }),
      ]} />
      <Breadcrumbs items={crumbs} />

      <Section className="scroll-rise relative overflow-hidden pt-4 pb-14">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl">
            <Badge tone="accent">Comparison</Badge>
            <h1 className="mt-5 text-[clamp(2rem,4.6vw,3.2rem)] font-600 leading-[1.06]">{c.title}</h1>
            <p className="mt-4 text-lg text-muted">{c.question}</p>
            <AnswerBlock className="mt-8" question="Short answer">{c.answer}</AnswerBlock>
            <Prose className="mt-9">
              {c.intro.map((p, i) => <p key={i}>{p}</p>)}
            </Prose>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------ comparison table */}
      <Section className="scroll-rise border-t border-border py-14">
        <Container>
          <Eyebrow>Side by side</Eyebrow>
          <h2 className="mt-3 text-2xl font-600">{c.labelA} vs {c.labelB}</h2>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[46rem] border-collapse text-sm">
              <caption className="sr-only">
                A comparison of {c.labelA} and {c.labelB} across {c.rows.length} dimensions.
              </caption>
              <thead>
                <tr className="bg-surface-2">
                  <th scope="col" className="px-5 py-4 text-left font-600 text-ink">Dimension</th>
                  <th scope="col" className="px-5 py-4 text-left font-600 text-ink">{c.labelA}</th>
                  <th scope="col" className="px-5 py-4 text-left font-600 text-ink">{c.labelB}</th>
                </tr>
              </thead>
              <tbody>
                {c.rows.map((r) => (
                  <tr key={r.dimension} className="border-t border-border transition-colors hover:bg-surface/60">
                    <th scope="row" className="px-5 py-4 text-left align-top font-500 text-ink">
                      {r.dimension}
                    </th>
                    <td className="px-5 py-4 align-top text-muted">
                      <span className="flex items-start gap-2">
                        <span className="mt-0.5 shrink-0">
                          <Edge active={r.edge === "a"} even={r.edge === "even"} />
                        </span>
                        <span className={r.edge === "a" ? "text-ink-2" : undefined}>{r.a}</span>
                      </span>
                    </td>
                    <td className="px-5 py-4 align-top text-muted">
                      <span className="flex items-start gap-2">
                        <span className="mt-0.5 shrink-0">
                          <Edge active={r.edge === "b"} even={r.edge === "even"} />
                        </span>
                        <span className={r.edge === "b" ? "text-ink-2" : undefined}>{r.b}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------ which, when */}
      <Section className="scroll-rise border-t border-border py-14">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {[c.chooseA, c.chooseB].map((choice) => (
              <Card key={choice.headline} hover={false} className="p-7">
                <h3 className="text-lg font-600 text-ink">{choice.headline}</h3>
                <ul className="mt-5 space-y-3.5">
                  {choice.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <Card hover={false} className="mt-6 border-warning/25 bg-warning/[0.04] p-7">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-4.5 w-4.5 shrink-0 text-warning" />
              <div>
                <h3 className="font-600 text-ink">When this is not the right answer</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-2">{c.caveat}</p>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      <Section className="scroll-rise border-t border-border py-14">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Eyebrow>Questions</Eyebrow>
            <div className="mt-6">
              <FAQList items={c.faqs} />
            </div>
            <p className="mt-8 text-xs text-faint">Last reviewed {formatDate(LAST_UPDATED)}</p>
          </div>
        </Container>
      </Section>

      <Section className="scroll-rise border-t border-border py-14">
        <Container>
          <Eyebrow>Keep reading</Eyebrow>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...c.related, ...others.slice(0, 3).map((o) => ({ label: o.title, href: `/compare/${o.slug}` }))]
              .map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-surface-2"
                >
                  <span className="font-500 text-ink group-hover:text-accent">{l.label}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-accent" />
                </Link>
              ))}
          </div>
        </Container>
      </Section>

      <FinalCTA />
    </PageTransition>
  );
}
