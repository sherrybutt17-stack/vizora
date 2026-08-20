import { notFound } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Check } from "lucide-react";
import { Button, Card, Container, Section, SectionHead, Badge, Eyebrow, DataTable } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Reveal, CountUp } from "@/components/motion";
import { PageTransition } from "@/components/motion/ViewTransition";
import { FAQList } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { RelatedContent } from "@/components/sections/RelatedContent";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema, webPageSchema, ENTITIES } from "@/lib/schema";
import { getSpecialty, specialtySlugs } from "@/lib/content/specialties";
import { getService } from "@/lib/content/services";
import { getCaseStudiesForSpecialty } from "@/lib/content/case-studies";
import { getPostsForSpecialty } from "@/lib/content/blog";
import { pageMeta } from "@/lib/seo";
import { LAST_UPDATED, formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return specialtySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getSpecialty(slug);
  if (!s) return {};
  return pageMeta({
    title: `${s.name} Medical Billing Services`,
    description: s.summary,
    path: `/specialties/${s.slug}`,
    keywords: [
      `${s.name.toLowerCase()} billing services`,
      `${s.name.toLowerCase()} medical billing`,
      `${s.name.toLowerCase()} medical billing company`,
      `${s.name.toLowerCase()} coding`,
      `${s.name.toLowerCase()} coding services`,
      `${s.name.toLowerCase()} billing company`,
      `outsourced ${s.name.toLowerCase()} billing`,
      `${s.name.toLowerCase()} revenue cycle management`,
      `${s.name.toLowerCase()} claim denials`,
      `${s.name.toLowerCase()} CPT codes`,
      ...s.codes.slice(0, 3).map((c) => `${c.code} billing`),
    ],
  });
}

export default async function SpecialtyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getSpecialty(slug);
  if (!s) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Specialties", path: "/specialties" },
    { name: s.name, path: `/specialties/${s.slug}` },
  ];

  const relatedServices = s.relatedServices
    .map((r) => getService(r))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  const studies = getCaseStudiesForSpecialty(s.slug);
  const specialtyPosts = getPostsForSpecialty(s.slug);

  return (
    <PageTransition>
      <JsonLd data={[
        breadcrumbSchema(crumbs),
        serviceSchema({ name: `${s.name} Medical Billing`, summary: s.summary, slug: `../specialties/${s.slug}` }),
        faqSchema(s.faqs),
        webPageSchema({
          name: `${s.name} Medical Billing Services`,
          description: s.summary,
          path: `/specialties/${s.slug}`,
          about: [ENTITIES.medicalBilling],
          mentions: [ENTITIES.medicalCoding, ENTITIES.cpt, ENTITIES.icd10, ENTITIES.rcm],
          lastReviewed: LAST_UPDATED,
          speakableSelectors: ["[data-answer]"],
        }),
      ]} />
      <Breadcrumbs items={crumbs} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-aurora pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
        <Container className="relative">
          <div className="grid items-start gap-12 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-3xl" aria-hidden="true">{s.emoji}</span>
                <Eyebrow>Specialty billing</Eyebrow>
              </div>
              <h1 className="mt-4 text-[clamp(2.1rem,4.8vw,3.4rem)] font-600 leading-[1.06]">
                {s.name} Medical Billing Services
              </h1>
              <p data-answer="" className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">{s.summary}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact" size="lg">
                  Get a free {s.name.toLowerCase()} billing audit <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Reveal delay={0.1}>
              <Card hover={false} className="p-6">
                <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-faint">
                  {s.name} benchmarks
                </h2>
                <dl className="mt-5 space-y-4">
                  {s.benchmarks.map((b) => (
                    <div key={b.label} className="flex items-baseline justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
                      <dt className="text-sm text-muted">{b.label}</dt>
                      <dd className="font-mono text-xl font-700 text-accent">
                        <CountUp value={b.value} />
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-xs leading-relaxed text-faint">
                  Typical ranges for {s.practiceNoun}. Your actual numbers are measured during the audit.
                </p>
              </Card>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Why it's complex */}
      <Section className="border-t border-border bg-bg-soft">
        <Container>
          <SectionHead
            align="left"
            eyebrow="The complexity"
            title={`Why ${s.name.toLowerCase()} is uniquely difficult to bill`}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.complexity.map((c, i) => (
              <Reveal key={c} delay={(i % 3) * 0.05}>
                <div className="flex h-full gap-3 rounded-xl border border-border bg-surface p-5">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                  <p className="text-sm leading-relaxed text-muted">{c}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Codes */}
      <Section>
        <Container>
          <SectionHead
            align="left"
            eyebrow="Coding"
            title={`${s.name} procedure codes we work with daily`}
            lead="A representative sample, not an exhaustive list. Coders are assigned by specialty rather than pooled."
          />
          <Reveal className="mt-10">
            <DataTable
              headers={["Code", "Description"]}
              rows={s.codes.map((c) => [
                <span key={c.code} className="font-mono font-600 text-accent">{c.code}</span>,
                c.label,
              ])}
            />
          </Reveal>
        </Container>
      </Section>

      {/* Denial patterns */}
      <Section className="border-t border-border bg-bg-soft">
        <Container>
          <SectionHead
            align="left"
            eyebrow="Revenue leakage"
            title={`Where ${s.name.toLowerCase()} practices lose money`}
            lead="These are the denial patterns specific to this specialty — the ones a general-purpose billing service will not be looking for."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {s.denials.map((d, i) => (
              <Reveal key={d.reason} delay={(i % 2) * 0.06}>
                <Card hover={false} className="h-full">
                  <h3 className="font-600 leading-snug text-ink">{d.reason}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{d.detail}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Payer notes */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <Eyebrow>Payer landscape</Eyebrow>
              <h2 className="mt-4 text-[clamp(1.8rem,3.6vw,2.5rem)] font-600 leading-[1.1]">
                What {s.practiceNoun} need to know about payers
              </h2>
              <p className="mt-5 leading-relaxed text-muted">
                Payer policy drives more {s.name.toLowerCase()} denials than coding does. Knowing the
                policy before the service is what prevents them.
              </p>
            </div>
            <ul className="space-y-3">
              {s.payerNotes.map((n) => (
                <li key={n} className="flex gap-3 rounded-xl border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Case study */}
      {studies.length > 0 && (
        <Section className="border-t border-border bg-bg-soft">
          <Container>
            <SectionHead align="left" eyebrow="Proof" title={`A ${s.name.toLowerCase()} practice we worked with`} />
            {studies.map((c) => (
              <Reveal key={c.slug} className="mt-10">
                <Card hover={false} className="p-7 sm:p-9">
                  <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                    <div>
                      <Badge tone="positive" className="mb-4">
                        {c.headlineMetric.value} {c.headlineMetric.label.toLowerCase()}
                      </Badge>
                      <h3 className="text-2xl font-600 leading-snug">
                        <Link href={`/case-studies/${c.slug}`} data-tap className="transition-colors hover:text-accent">
                          {c.title}
                        </Link>
                      </h3>
                      <p className="mt-4 leading-relaxed text-muted">{c.challenge}</p>
                      <p className="mt-4 leading-relaxed text-muted">{c.solution}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-faint">Results</p>
                      <ul className="mt-4 space-y-2.5">
                        {c.results.map((r) => (
                          <li key={r} className="flex gap-2.5 text-sm leading-relaxed text-ink-2">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                            {r}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-5 border-t border-border pt-4 text-xs text-faint">
                        {c.client.name}, {c.client.role} · {c.location}
                      </p>
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
            <div className="mt-8">
              <Link href="/case-studies" data-tap className="inline-flex items-center gap-1.5 text-sm font-500 text-accent hover:text-accent-2">
                Read all case studies <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Container>
        </Section>
      )}

      {/* FAQ */}
      <Section className={studies.length > 0 ? "" : "border-t border-border bg-bg-soft"}>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <Eyebrow>Questions</Eyebrow>
              <h2 className="mt-4 text-[clamp(1.8rem,3.6vw,2.4rem)] font-600 leading-[1.1]">
                {s.name} billing FAQ
              </h2>
              <p className="mt-4 text-sm text-faint">Last updated {formatDate(LAST_UPDATED)}</p>
              <Badge className="mt-4">Reviewed by a certified coding lead</Badge>
            </div>
            <FAQList items={s.faqs} />
          </div>
        </Container>
      </Section>

      {specialtyPosts.length > 0 && (
        <Section className="border-t border-border">
          <Container>
            <SectionHead align="left" eyebrow="Reading" title={`${s.name} billing, in depth`} />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {specialtyPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  data-tap
                  className="group rounded-xl border border-border bg-surface p-5 transition-all hover:-translate-y-1 hover:border-accent/30"
                >
                  <p className="text-xs text-faint">{p.category}</p>
                  <p className="mt-2 font-500 leading-snug text-ink group-hover:text-accent">{p.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <RelatedContent
        title={`Services ${s.practiceNoun} use most`}
        links={relatedServices.map((r) => ({ label: r.name, href: `/services/${r.slug}`, description: r.blurb }))}
      />

      <FinalCTA
        title={`Get a free ${s.name.toLowerCase()} billing audit`}
        lead={`We'll review your ${s.name.toLowerCase()} denial patterns, coding accuracy and AR aging against the benchmarks above. Takes about two minutes to request.`}
      />
    </PageTransition>
  );
}
