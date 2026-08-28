import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Check, X, Lightbulb } from "lucide-react";
import { Container, Section, Badge, Card, Prose } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AnswerBlock } from "@/components/sections/AnswerBlock";
import { FAQList } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PrimarySources } from "@/components/sections/PrimarySources";
import { CodeIndex } from "@/components/sections/CodeIndex";
import { JsonLd, breadcrumbSchema, faqSchema, webPageSchema, techArticleSchema, ENTITIES } from "@/lib/schema";
import { modifiers, getModifier } from "@/lib/content/modifiers";
import { refsForModifier } from "@/lib/content/citations";
import { getDenialCode } from "@/lib/content/denial-codes";
import { getDenialDetail } from "@/lib/content/denial-code-details";
import { getTerm } from "@/lib/content/glossary";
import { getService } from "@/lib/content/services";
import { pageMeta } from "@/lib/seo";
import { LAST_UPDATED } from "@/lib/utils";
import { PageTransition } from "@/components/motion/ViewTransition";
import { site } from "@/lib/content/site";

/**
 * A page exists only where long-form content has been written, same rule as
 * the denial-code route: params come from `modifiers`, and every entry in
 * that array carries a worked example, context and its own FAQ block.
 */
export function generateStaticParams() {
  return modifiers.map((m) => ({ modifier: m.code.toLowerCase() }));
}

function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).replace(/[,;:]$/, "")}…`;
}

export async function generateMetadata({ params }: { params: Promise<{ modifier: string }> }) {
  const { modifier } = await params;
  const m = getModifier(modifier);
  if (!m) return {};
  return pageMeta({
    title: `Modifier ${m.code}: ${m.shortName}`,
    description: truncate(m.summary, 155),
    path: `/modifiers/${m.code.toLowerCase()}`,
    keywords: [
      `modifier ${m.code.toLowerCase()}`,
      `cpt modifier ${m.code.toLowerCase()}`,
      `when to use modifier ${m.code.toLowerCase()}`,
      `modifier ${m.code.toLowerCase()} medical billing`,
      `modifier ${m.code.toLowerCase()} examples`,
    ],
  });
}

export default async function ModifierPage({ params }: { params: Promise<{ modifier: string }> }) {
  const { modifier } = await params;
  const m = getModifier(modifier);
  if (!m) notFound();

  const question = `When should modifier ${m.code} be used?`;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Modifiers", path: "/modifiers" },
    { name: `Modifier ${m.code}`, path: `/modifiers/${m.code.toLowerCase()}` },
  ];

  const related = m.relatedModifiers.map(getModifier).filter(Boolean);
  /**
   * The full modifier index, grouped by category. Same reasoning as the denial
   * code pages: `relatedModifiers` is a short editorial list, this is the index
   * a coder browses when the modifier in front of them is not the right one.
   */
  const allModifierIndex = modifiers.map((x) => ({
    code: x.code,
    label: x.shortName,
    category: x.category,
  }));
  const codes = m.relatedCodes
    .map((c) => ({ code: c, data: getDenialCode(c), detail: getDenialDetail(c) }))
    .filter((r) => r.data);
  const terms = m.relatedTerms.map(getTerm).filter(Boolean);
  const services = m.relatedServices.map(getService).filter(Boolean);

  return (
    <PageTransition>
      <JsonLd data={[
        breadcrumbSchema(crumbs),
        faqSchema([{ question, answer: m.summary }, ...m.faqs]),
        webPageSchema({
          name: `Modifier ${m.code}`,
          description: m.summary,
          path: `/modifiers/${m.code.toLowerCase()}`,
          about: [{ name: `CPT modifier ${m.code}`, url: `${site.url}/modifiers/${m.code.toLowerCase()}` }],
          mentions: [ENTITIES.medicalBilling, ENTITIES.rcm],
          lastReviewed: LAST_UPDATED,
          speakableSelectors: ["[data-answer]"],
        }),
        techArticleSchema({
          headline: `Modifier ${m.code}: ${m.shortName}`,
          description: m.summary,
          path: `/modifiers/${m.code.toLowerCase()}`,
          updated: LAST_UPDATED,
          section: m.category,
        }),
      ]} />
      <Breadcrumbs items={crumbs} />

      <Section className="scroll-rise relative overflow-hidden pt-4 pb-14">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl">
            <Badge tone="accent">{m.category}</Badge>

            <h1 className="mt-5 text-[clamp(2rem,4.6vw,3.1rem)] font-600 leading-[1.06]">
              Modifier {m.code}
            </h1>
            <p className="measure mt-4 text-lg leading-relaxed text-muted">{m.name}</p>

            <AnswerBlock className="mt-8">{m.summary}</AnswerBlock>

            {/* The signature element: the contrast is the whole value of the
                page. Most references list only when a modifier applies, which
                is the half that is easy to guess — the misuse cases are what
                actually cause denials and audit findings. */}
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <Card hover={false} className="border-positive/25 bg-positive/[0.04]">
                <p className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-positive">
                  <Check className="h-3.5 w-3.5" /> Use it when
                </p>
                <ul className="mt-4 space-y-2.5">
                  {m.whenToUse.map((w) => (
                    <li key={w} className="flex gap-2.5 text-sm leading-relaxed text-ink-2">
                      <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-positive" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card hover={false} className="border-danger/25 bg-danger/[0.04]">
                <p className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-danger">
                  <X className="h-3.5 w-3.5" /> Do not use it when
                </p>
                <ul className="mt-4 space-y-2.5">
                  {m.whenNotToUse.map((w) => (
                    <li key={w} className="flex gap-2.5 text-sm leading-relaxed text-ink-2">
                      <X className="mt-1 h-3.5 w-3.5 shrink-0 text-danger" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <h2 className="mt-12 text-display-sm font-600">A worked example</h2>
            <Card hover={false} className="mt-4 border-accent/20 bg-accent/[0.04]">
              <div className="flex items-start gap-3">
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div className="space-y-3">
                  {m.example.map((p, i) => (
                    <p key={i} className="text-sm leading-relaxed text-ink-2">{p}</p>
                  ))}
                </div>
              </div>
            </Card>

            <h2 className="mt-12 text-display-sm font-600">What decides it</h2>
            <Prose className="mt-4">
              {m.context.map((p, i) => <p key={i}>{p}</p>)}
            </Prose>

            {codes.length > 0 && (
              <>
                <h2 className="mt-12 text-display-sm font-600">Denial codes this affects</h2>
                <div className="mt-4 space-y-2">
                  {codes.map((r) => (
                    <Link
                      key={r.code}
                      href={r.detail ? `/denial-codes/${r.code.toLowerCase()}` : "/tools/denial-code-lookup"}
                      className="group flex items-start justify-between gap-4 rounded-lg border border-border px-4 py-3 transition-colors hover:border-accent/40"
                    >
                      <span className="min-w-0">
                        <span className="font-mono text-sm font-600 text-accent">{r.code}</span>
                        <span className="ml-3 text-sm text-muted">{r.data!.title}</span>
                      </span>
                      <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-accent" />
                    </Link>
                  ))}
                </div>
              </>
            )}

            {related.length > 0 && (
              <>
                <h2 className="mt-12 text-display-sm font-600">Modifiers often confused with this one</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {related.map((r) => (
                    <Link
                      key={r!.code}
                      href={`/modifiers/${r!.code.toLowerCase()}`}
                      className="group rounded-lg border border-border p-4 transition-colors hover:border-accent/40"
                    >
                      <span className="font-mono text-sm font-700 text-accent">Modifier {r!.code}</span>
                      <span className="mt-1.5 block text-xs leading-relaxed text-muted">
                        {truncate(r!.name, 70)}
                      </span>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {terms.length > 0 && (
              <p className="mt-10 text-sm text-muted">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-faint">Terms used here — </span>
                {terms.map((t, i) => (
                  <span key={t!.slug}>
                    {i > 0 && " · "}
                    <Link href={`/glossary/${t!.slug}`} className="text-accent hover:underline">{t!.term}</Link>
                  </span>
                ))}
              </p>
            )}

            {services.length > 0 && (
              <p className="mt-2 text-sm text-muted">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-faint">How we handle it — </span>
                {services.map((s, i) => (
                  <span key={s!.slug}>
                    {i > 0 && " · "}
                    <Link href={`/services/${s!.slug}`} className="text-accent hover:underline">{s!.name}</Link>
                  </span>
                ))}
              </p>
            )}

            <CodeIndex
              items={allModifierIndex}
              currentCode={m.code}
              basePath="/modifiers"
              title="Every CPT and HCPCS modifier with a guide"
            />

            <PrimarySources
              ids={refsForModifier(m.code, m.category)}
              note={`What the payers and code-set maintainers actually publish about modifier ${m.code}.`}
            />
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-display-sm font-600">Questions about modifier {m.code}</h2>
            <FAQList items={m.faqs} className="mt-6" />
          </div>
        </Container>
      </Section>

      <FinalCTA />
    </PageTransition>
  );
}
