import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, X, ArrowRight } from "lucide-react";
import { Button, Card, Container, Section, SectionHead, Badge, Eyebrow } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Reveal } from "@/components/motion";
import { FAQList } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { RelatedContent } from "@/components/sections/RelatedContent";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema, howToSchema, webPageSchema, ENTITIES } from "@/lib/schema";
import { services, getService, serviceSlugs } from "@/lib/content/services";
import { specialties } from "@/lib/content/specialties";
import { termsLinkingTo } from "@/lib/content/glossary";
import { pageMeta } from "@/lib/seo";
import { LAST_UPDATED, formatDate } from "@/lib/utils";
import { PageTransition } from "@/components/motion/ViewTransition";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMeta({
    title: s.metaTitle ?? s.headline,
    description: s.summary,
    path: `/services/${s.slug}`,
    keywords: s.keywords,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.short, path: `/services/${service.slug}` },
  ];

  // Specialties that list this service as relevant — generated, not hand-kept.
  const relevantSpecialties = specialties
    .filter((sp) => sp.relatedServices.includes(service.slug))
    .slice(0, 6);

  const related = service.related
    .map((r) => services.find((s) => s.slug === r))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const glossaryTerms = termsLinkingTo(`/services/${service.slug}`);

  return (
    <PageTransition>
      <JsonLd data={[
        breadcrumbSchema(crumbs),
        serviceSchema({ name: service.name, summary: service.summary, slug: service.slug }),
        faqSchema(service.faqs),
        howToSchema({
          name: `How ${service.name.toLowerCase()} works at Vizora`,
          description: service.summary,
          path: `/services/${service.slug}`,
          steps: service.process.map((p) => ({ name: p.title, text: p.description })),
        }),
        webPageSchema({
          name: service.headline,
          description: service.summary,
          path: `/services/${service.slug}`,
          about: [ENTITIES.medicalBilling, ENTITIES.rcm],
          mentions: [ENTITIES.medicalCoding, ENTITIES.cpt, ENTITIES.icd10],
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
              <Eyebrow>{service.eyebrow}</Eyebrow>
              <h1 className="mt-4 text-[clamp(2.1rem,4.8vw,3.4rem)] font-600 leading-[1.06]">
                {service.headline}
              </h1>
              {/* Answer-first summary — the extractable passage */}
              <p data-answer="" className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">{service.summary}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact" size="lg">
                  Get your free billing audit <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="/tools/revenue-leak-calculator" variant="secondary" size="lg">
                  Estimate your revenue leak
                </Button>
              </div>
            </div>

            <Reveal delay={0.1}>
              <Card hover={false} className="p-6">
                <h2 className="text-sm font-600 text-ink">What&rsquo;s included</h2>
                <ul className="mt-4 space-y-2.5">
                  {service.features.map((f) => (
                    <li key={f.title} className="flex gap-3 text-sm text-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span><strong className="font-500 text-ink">{f.title}</strong> — {f.description}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Challenges */}
      <Section className="border-t border-border bg-bg-soft">
        <Container>
          <SectionHead
            align="left"
            eyebrow="The problem"
            title={`Where ${service.short.toLowerCase()} goes wrong`}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.challenges.map((c, i) => (
              <Reveal key={c} delay={(i % 3) * 0.05}>
                <div className="flex h-full gap-3 rounded-xl border border-border bg-surface p-5">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-danger" />
                  <p className="text-sm leading-relaxed text-muted">{c}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section>
        <Container>
          <SectionHead
            align="left"
            eyebrow="How it works"
            title={`Our ${service.short.toLowerCase()} process`}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.07}>
                <Card className="h-full">
                  <span className="font-mono text-sm font-700 text-accent">{p.step}</span>
                  <h3 className="mt-3 font-600 leading-snug">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Benefits */}
      <Section className="border-t border-border bg-bg-soft">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <Eyebrow>Outcomes</Eyebrow>
              <h2 className="mt-4 text-[clamp(1.8rem,3.6vw,2.5rem)] font-600 leading-[1.1]">
                What changes for your practice
              </h2>
              <p className="mt-5 leading-relaxed text-muted">
                We baseline these during the free audit so improvement is measured against your
                actual starting point, not an industry average.
              </p>
              <Button href="/contact" className="mt-7">Get your free audit</Button>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {service.benefits.map((b) => (
                <li key={b} className="flex gap-3 rounded-xl border border-border bg-surface p-4 text-sm leading-relaxed text-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Specialties served */}
      {relevantSpecialties.length > 0 && (
        <Section>
          <Container>
            <SectionHead
              align="left"
              eyebrow="Specialty coverage"
              title={`${service.short} by specialty`}
              lead="Each specialty fails differently. These pages cover the specific codes, denial patterns and payer rules that apply."
            />
            <div className="mt-8 flex flex-wrap gap-2.5">
              {relevantSpecialties.map((sp) => (
                <Link
                  key={sp.slug}
                  href={`/specialties/${sp.slug}`}
                  className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
                >
                  <span className="mr-1.5" aria-hidden="true">{sp.emoji}</span>
                  {sp.name}
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* FAQ */}
      <Section className="border-t border-border bg-bg-soft">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <Eyebrow>Questions</Eyebrow>
              <h2 className="mt-4 text-[clamp(1.8rem,3.6vw,2.4rem)] font-600 leading-[1.1]">
                {service.short} FAQ
              </h2>
              <p className="mt-4 text-sm text-faint">
                Last updated {formatDate(LAST_UPDATED)}
              </p>
              <Badge className="mt-4">Reviewed by a certified coding lead</Badge>
            </div>
            <FAQList items={service.faqs} />
          </div>
        </Container>
      </Section>

      {/* Terminology cross-links. Derived from the glossary's own service
          references, so the relationship is declared once and rendered from
          both ends. */}
      {glossaryTerms.length > 0 && (
        <Section className="border-t border-border py-14">
          <Container>
            <Eyebrow>Terms used on this page</Eyebrow>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {glossaryTerms.map((t) => (
                <Link
                  key={t.slug}
                  href={`/glossary/${t.slug}`}
                  className="group rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-surface-2"
                >
                  <p className="font-500 text-ink group-hover:text-accent">{t.term}</p>
                  <p className="mt-2 line-clamp-2 text-sm leading-snug text-muted">{t.answer}</p>
                </Link>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted">
              Still deciding how to run billing at all? Compare{" "}
              <Link href="/compare/in-house-vs-outsourced-medical-billing" className="text-accent underline underline-offset-4 hover:text-accent-2">
                in-house against outsourced
              </Link>{" "}
              or read the{" "}
              <Link href="/compare" className="text-accent underline underline-offset-4 hover:text-accent-2">
                full set of comparisons
              </Link>.
            </p>
          </Container>
        </Section>
      )}

      <RelatedContent
        title="Related services"
        links={related.map((r) => ({ label: r.name, href: `/services/${r.slug}`, description: r.blurb }))}
      />

      <FinalCTA />
    </PageTransition>
  );
}
