import { notFound } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, ArrowUpRight, Lightbulb, ShieldCheck, Wrench } from "lucide-react";
import { Container, Section, Badge, Card, Prose } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AnswerBlock } from "@/components/sections/AnswerBlock";
import { FAQList } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PrimarySources } from "@/components/sections/PrimarySources";
import {
  JsonLd, breadcrumbSchema, faqSchema, webPageSchema, ENTITIES,
  techArticleSchema,
} from "@/lib/schema";
import { getDenialCode } from "@/lib/content/denial-codes";
import { refsForDenialCode } from "@/lib/content/citations";
import { denialCodeDetails, getDenialDetail } from "@/lib/content/denial-code-details";
import { getTerm } from "@/lib/content/glossary";
import { getService } from "@/lib/content/services";
import { pageMeta } from "@/lib/seo";
import { LAST_UPDATED } from "@/lib/utils";
import { PageTransition } from "@/components/motion/ViewTransition";
import { site } from "@/lib/content/site";

/**
 * Detail pages exist only for codes with written long-form content.
 *
 * Params come from `denialCodeDetails`, never from the full `denialCodes`
 * array — a page cannot be generated for a code nobody has written depth for,
 * which is what keeps this route from becoming 190 thin pages.
 */
export function generateStaticParams() {
  return denialCodeDetails.map((d) => ({ code: d.code.toLowerCase() }));
}

function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).replace(/[,;:]$/, "")}…`;
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const c = getDenialCode(code);
  const d = getDenialDetail(code);
  if (!c || !d) return {};
  return pageMeta({
    title: `${c.code} Denial Code: ${d.shortLabel}`,
    description: truncate(`${c.title}. ${c.meaning}`, 155),
    path: `/denial-codes/${c.code.toLowerCase()}`,
    keywords: [
      `${c.code.toLowerCase()} denial code`,
      `${c.code.toLowerCase()} denial`,
      `what is ${c.code.toLowerCase()}`,
      `${c.code.toLowerCase()} medical billing`,
      `how to fix ${c.code.toLowerCase()}`,
    ],
  });
}

export default async function DenialCodePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const c = getDenialCode(code);
  const d = getDenialDetail(code);
  if (!c || !d) notFound();

  const question = `What does denial code ${c.code} mean?`;
  const answer = `${c.code} means ${c.meaning}`;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Denial Codes", path: "/tools/denial-code-lookup" },
    { name: c.code, path: `/denial-codes/${c.code.toLowerCase()}` },
  ];

  const relatedCodes = d.relatedCodes
    .map((rc) => ({ code: rc, data: getDenialCode(rc), detail: getDenialDetail(rc) }))
    .filter((r) => r.data);
  const relatedTerms = d.relatedTerms.map(getTerm).filter(Boolean);
  const relatedServices = d.relatedServices.map(getService).filter(Boolean);

  return (
    <PageTransition>
      <JsonLd data={[
        breadcrumbSchema(crumbs),
        faqSchema([{ question, answer }, ...d.faqs]),
        webPageSchema({
          name: `${c.code} Denial Code`,
          description: `${c.title}. ${c.meaning}`,
          path: `/denial-codes/${c.code.toLowerCase()}`,
          about: [{ name: `${c.code} denial code`, url: `${site.url}/denial-codes/${c.code.toLowerCase()}` }],
          mentions: [ENTITIES.medicalBilling, ENTITIES.rcm],
          lastReviewed: LAST_UPDATED,
          speakableSelectors: ["[data-answer]"],
        }),
        techArticleSchema({
          headline: `${c.code} Denial Code: ${d.shortLabel}`,
          description: `${c.title}. ${c.meaning}`,
          path: `/denial-codes/${c.code.toLowerCase()}`,
          updated: LAST_UPDATED,
          section: c.category,
        }),
      ]} />
      <Breadcrumbs items={crumbs} />

      <Section className="scroll-rise relative overflow-hidden pt-4 pb-14">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="accent">{c.category}</Badge>
              <Badge>{c.group}</Badge>
              {c.writeOff && <Badge>Not billable to patient</Badge>}
            </div>

            <h1 className="mt-5 text-[clamp(2rem,4.6vw,3.1rem)] font-600 leading-[1.06]">
              {c.code} denial code
            </h1>
            <p className="measure mt-4 text-lg leading-relaxed text-muted">{c.title}</p>

            <AnswerBlock className="mt-8">{c.meaning}</AnswerBlock>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              <Card hover={false}>
                <div className="flex items-start gap-3">
                  <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <div>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-accent">How to fix it</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-2">{c.fix}</p>
                  </div>
                </div>
              </Card>
              <Card hover={false}>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <div>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-accent">How to prevent it</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-2">{c.prevent}</p>
                  </div>
                </div>
              </Card>
            </div>

            {c.writeOff && (
              <Card hover={false} className="mt-4 border-warning/25 bg-warning/[0.05]">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                  <p className="text-sm leading-relaxed text-ink-2">
                    The <strong>CO</strong> prefix marks this a contractual obligation. The balance is
                    absorbed by the provider under the payer agreement and cannot be transferred to
                    the patient.
                  </p>
                </div>
              </Card>
            )}

            <h2 className="mt-12 text-display-sm font-600">In practice</h2>
            <Card hover={false} className="mt-4 border-accent/20 bg-accent/[0.04]">
              <div className="flex items-start gap-3">
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div className="space-y-3">
                  {d.example.map((p, i) => (
                    <p key={i} className="text-sm leading-relaxed text-ink-2">{p}</p>
                  ))}
                </div>
              </div>
            </Card>

            <h2 className="mt-12 text-display-sm font-600">What sits behind it</h2>
            <Prose className="mt-4">
              {d.context.map((p, i) => <p key={i}>{p}</p>)}
            </Prose>

            {relatedCodes.length > 0 && (
              <>
                <h2 className="mt-12 text-display-sm font-600">Related codes</h2>
                <div className="mt-4 space-y-2">
                  {relatedCodes.map((r) => (
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

            {relatedTerms.length > 0 && (
              <p className="mt-8 text-sm text-muted">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-faint">Terms used here — </span>
                {relatedTerms.map((t, i) => (
                  <span key={t!.slug}>
                    {i > 0 && " · "}
                    <Link href={`/glossary/${t!.slug}`} className="text-accent hover:underline">{t!.term}</Link>
                  </span>
                ))}
              </p>
            )}

            {relatedServices.length > 0 && (
              <p className="mt-2 text-sm text-muted">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-faint">How we handle it — </span>
                {relatedServices.map((s, i) => (
                  <span key={s!.slug}>
                    {i > 0 && " · "}
                    <Link href={`/services/${s!.slug}`} className="text-accent hover:underline">{s!.name}</Link>
                  </span>
                ))}
              </p>
            )}

            <PrimarySources
              ids={refsForDenialCode(c.code, c.category)}
              note={`The rules behind ${c.code}, at the bodies that publish them.`}
            />

            <p className="mt-8 text-sm text-faint">
              Looking for a different code?{" "}
              <Link href="/tools/denial-code-lookup" className="text-accent hover:underline">
                Search all 190 CARC and RARC codes
              </Link>
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-display-sm font-600">Questions about {c.code}</h2>
            <FAQList items={d.faqs} className="mt-6" />
          </div>
        </Container>
      </Section>

      <FinalCTA />
    </PageTransition>
  );
}
