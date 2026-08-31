import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, ClipboardCheck, FileWarning, Lightbulb } from "lucide-react";
import { Container, Section, Badge, Card, Prose } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AnswerBlock } from "@/components/sections/AnswerBlock";
import { FAQList } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PrimarySources } from "@/components/sections/PrimarySources";
import { CodeIndex } from "@/components/sections/CodeIndex";
import {
  JsonLd, breadcrumbSchema, faqSchema, webPageSchema, techArticleSchema, ENTITIES,
} from "@/lib/schema";
import { cptCodes, getCptCode } from "@/lib/content/cpt-codes";
import { refsForCptCode } from "@/lib/content/citations";
import { getDenialCode } from "@/lib/content/denial-codes";
import { getDenialDetail } from "@/lib/content/denial-code-details";
import { getModifier } from "@/lib/content/modifiers";
import { getTerm } from "@/lib/content/glossary";
import { getService } from "@/lib/content/services";
import { getSpecialty } from "@/lib/content/specialties";
import { pageMeta } from "@/lib/seo";
import { LAST_UPDATED } from "@/lib/utils";
import { PageTransition } from "@/components/motion/ViewTransition";
import { site } from "@/lib/content/site";

/**
 * A page exists only where long-form content has been written, the same rule
 * the denial-code and modifier routes enforce: params come from `cptCodes`,
 * and every entry there carries billing rules, documentation requirements, a
 * worked example, context and its own FAQ block.
 */
export function generateStaticParams() {
  return cptCodes.map((c) => ({ code: c.code }));
}

function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).replace(/[,;:]$/, "")}…`;
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const c = getCptCode(code);
  if (!c) return {};
  return pageMeta({
    title: `CPT ${c.code}: ${c.shortName}`,
    description: truncate(c.summary, 155),
    path: `/cpt-codes/${c.code}`,
    // The query shapes that actually rank for procedure codes are the bare
    // code and the operational question, not the descriptor.
    keywords: [
      `cpt ${c.code}`,
      `${c.code} cpt code`,
      `${c.code} billing`,
      `when to bill ${c.code}`,
      `${c.code} documentation requirements`,
    ],
  });
}

export default async function CptCodePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const c = getCptCode(code);
  if (!c) notFound();

  const question = `What is CPT code ${c.code} used for?`;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "CPT Codes", path: "/cpt-codes" },
    { name: `CPT ${c.code}`, path: `/cpt-codes/${c.code}` },
  ];

  const relatedCpt = c.relatedCpt.map(getCptCode).filter(Boolean);
  const modifiers = c.relatedModifiers.map(getModifier).filter(Boolean);
  const denials = c.relatedCodes
    .map((rc) => ({ code: rc, data: getDenialCode(rc), detail: getDenialDetail(rc) }))
    .filter((r) => r.data);
  const terms = c.relatedTerms.map(getTerm).filter(Boolean);
  const services = c.relatedServices.map(getService).filter(Boolean);
  const specialties = c.relatedSpecialties.map(getSpecialty).filter(Boolean);

  /**
   * Sibling codes in the same category, scoped rather than listing all 26.
   *
   * The scoping is load-bearing and was measured on the denial-code pages: at
   * full index scope the nav block ran to 1,338 words of a 2,440-word page and
   * pushed 8-word shingle overlap between sibling pages to 56.5%, past the
   * 50.3% Google crawled and declined to index on the state pages. The hub at
   * /cpt-codes carries the full set instead, and every page links to it.
   */
  const categoryIndex = cptCodes
    .filter((x) => x.category === c.category)
    .map((x) => ({ code: x.code, label: x.shortName, category: x.category }));

  return (
    <PageTransition>
      <JsonLd data={[
        breadcrumbSchema(crumbs),
        faqSchema([{ question, answer: c.summary }, ...c.faqs]),
        webPageSchema({
          name: `CPT ${c.code}`,
          description: c.summary,
          path: `/cpt-codes/${c.code}`,
          about: [{ name: `CPT code ${c.code}`, url: `${site.url}/cpt-codes/${c.code}` }],
          mentions: [ENTITIES.cpt, ENTITIES.medicalCoding, ENTITIES.medicalBilling],
          lastReviewed: LAST_UPDATED,
          speakableSelectors: ["[data-answer]"],
        }),
        techArticleSchema({
          headline: `CPT ${c.code}: ${c.shortName}`,
          description: c.summary,
          path: `/cpt-codes/${c.code}`,
          updated: LAST_UPDATED,
          section: c.category,
        }),
      ]} />
      <Breadcrumbs items={crumbs} />

      <Section className="scroll-rise relative overflow-hidden pt-4 pb-14">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl">
            <Badge tone="accent">{c.category}</Badge>

            <h1 className="mt-5 text-[clamp(2rem,4.6vw,3.1rem)] font-600 leading-[1.06]">
              CPT {c.code}
            </h1>
            <p className="measure mt-4 text-lg leading-relaxed text-muted">{c.shortName}</p>

            <AnswerBlock className="mt-8">{c.summary}</AnswerBlock>

            {/* Billing rules and documentation, side by side. Every other CPT
                reference states what a code covers; what decides whether it is
                paid is the unit rule and what the note has to show. */}
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <Card hover={false} className="border-accent/25 bg-accent/[0.04]">
                <p className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-accent">
                  <ClipboardCheck className="h-3.5 w-3.5" /> How it is billed
                </p>
                <ul className="mt-4 space-y-2.5">
                  {c.billingRules.map((r) => (
                    <li key={r} className="flex gap-2.5 text-sm leading-relaxed text-ink-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card hover={false} className="border-border">
                <p className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                  <FileWarning className="h-3.5 w-3.5" /> What the record must show
                </p>
                <ul className="mt-4 space-y-2.5">
                  {c.documentation.map((d) => (
                    <li key={d} className="flex gap-2.5 text-sm leading-relaxed text-ink-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
                      <span>{d}</span>
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
                  {c.example.map((p, i) => (
                    <p key={i} className="text-sm leading-relaxed text-ink-2">{p}</p>
                  ))}
                </div>
              </div>
            </Card>

            <h2 className="mt-12 text-display-sm font-600">What decides payment</h2>
            <Prose className="mt-4">
              {c.context.map((p, i) => <p key={i}>{p}</p>)}
            </Prose>

            {denials.length > 0 && (
              <>
                <h2 className="mt-12 text-display-sm font-600">Denials this code attracts</h2>
                <div className="mt-4 space-y-2">
                  {denials.map((r) => (
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

            {modifiers.length > 0 && (
              <>
                <h2 className="mt-12 text-display-sm font-600">Modifiers that apply</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {modifiers.map((m) => (
                    <Link
                      key={m!.code}
                      href={`/modifiers/${m!.code.toLowerCase()}`}
                      className="group rounded-lg border border-border p-4 transition-colors hover:border-accent/40"
                    >
                      <span className="font-mono text-sm font-700 text-accent">Modifier {m!.code}</span>
                      <span className="mt-1.5 block text-xs leading-relaxed text-muted">
                        {truncate(m!.shortName, 70)}
                      </span>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {relatedCpt.length > 0 && (
              <>
                <h2 className="mt-12 text-display-sm font-600">Codes billed alongside or confused with this one</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {relatedCpt.map((r) => (
                    <Link
                      key={r!.code}
                      href={`/cpt-codes/${r!.code}`}
                      className="group rounded-lg border border-border p-4 transition-colors hover:border-accent/40"
                    >
                      <span className="font-mono text-sm font-700 text-accent">CPT {r!.code}</span>
                      <span className="mt-1.5 block text-xs leading-relaxed text-muted">
                        {truncate(r!.shortName, 70)}
                      </span>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {specialties.length > 0 && (
              <p className="mt-10 text-sm text-muted">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-faint">Billed most in — </span>
                {specialties.map((s, i) => (
                  <span key={s!.slug}>
                    {i > 0 && " · "}
                    <Link href={`/specialties/${s!.slug}`} className="text-accent hover:underline">{s!.name}</Link>
                  </span>
                ))}
              </p>
            )}

            {terms.length > 0 && (
              <p className="mt-2 text-sm text-muted">
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
              items={categoryIndex}
              currentCode={c.code}
              basePath="/cpt-codes"
              title={`Every ${c.category.toLowerCase()} code with a guide`}
            />

            <p className="mt-6 text-sm text-muted">
              <Link href="/cpt-codes" className="text-accent hover:underline">
                All {cptCodes.length} CPT codes with a guide
              </Link>
            </p>

            <PrimarySources
              ids={refsForCptCode(c.code, c.category)}
              note={`What the code-set maintainers and payers actually publish about billing ${c.code}.`}
            />
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-display-sm font-600">Questions about CPT {c.code}</h2>
            <FAQList items={c.faqs} className="mt-6" />
          </div>
        </Container>
      </Section>

      <FinalCTA />
    </PageTransition>
  );
}
