import { notFound } from "next/navigation";
import Link from "next/link";
import { Check } from "lucide-react";
import { Container, Section, Badge, Eyebrow } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CountUp } from "@/components/motion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { RelatedContent } from "@/components/sections/RelatedContent";
import { JsonLd, breadcrumbSchema, caseStudySchema } from "@/lib/schema";
import { caseStudies, caseStudyMap } from "@/lib/content/case-studies";
import { getSpecialty } from "@/lib/content/specialties";
import { pageMeta } from "@/lib/seo";
import { clampDescription } from "@/lib/seo";
import { lastUpdated } from "@/lib/utils";
import { PageTransition } from "@/components/motion/ViewTransition";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

/**
 * The description is built from the measured outcome rather than the practice
 * name, because the query these pages answer is "does outsourced billing
 * actually reduce denials in <specialty>" — not the name of a practice nobody
 * outside it has heard of.
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = caseStudyMap.get(slug);
  if (!c) return {};
  return pageMeta({
    title: `${c.specialty} Case Study: ${c.headlineMetric.value} ${c.headlineMetric.label}`,
    description: clampDescription(
      `${c.size} ${c.specialty.toLowerCase()} practice in ${c.location}. ${c.challenge}`,
    ),
    path: `/case-studies/${c.slug}`,
    keywords: [
      `${c.specialty.toLowerCase()} billing case study`,
      `${c.specialty.toLowerCase()} medical billing results`,
      "medical billing case study",
      "denial rate reduction",
      "revenue cycle results",
    ],
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = caseStudyMap.get(slug);
  if (!c) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Case studies", path: "/case-studies" },
    { name: c.title, path: `/case-studies/${c.slug}` },
  ];

  const specialty = c.specialtySlug ? getSpecialty(c.specialtySlug) : undefined;

  // Every other case study, so each of the five carries outbound links to the
  // other four. Five pages left unlinked to each other would each depend on
  // the index page alone for discovery.
  const others = caseStudies.filter((o) => o.slug !== c.slug);

  return (
    <PageTransition>
      <JsonLd data={[
        breadcrumbSchema(crumbs),
        ...caseStudySchema({
          title: c.title,
          slug: c.slug,
          description: c.challenge,
          quote: c.quote,
          clientName: c.client.name,
          clientRole: c.client.role,
          lastReviewed: lastUpdated("caseStudies"),
        }),
      ]} />
      <Breadcrumbs items={crumbs} />

      <article>
        <Section className="scroll-rise pt-6">
          <Container>
            <div className="mx-auto max-w-3xl">
              <Badge tone="accent">{c.specialty}</Badge>
              <h1 className="mt-5 text-[clamp(2rem,4.4vw,3rem)] font-600 leading-[1.1]">
                {c.title}
              </h1>

              {/* Answer-first block — the extractable passage, mirroring the
                  pattern the blog posts use. */}
              <div className="mt-9 rounded-xl border border-accent/25 bg-accent/[0.05] p-6">
                <p className="text-[1.05rem] leading-relaxed text-ink-2">
                  A {c.size.toLowerCase()} {c.specialty.toLowerCase()} practice in {c.location}{" "}
                  achieved {c.headlineMetric.value.toLowerCase()} {c.headlineMetric.label.toLowerCase()}{" "}
                  after restructuring its revenue cycle. {c.results[0]}.
                </p>
              </div>

              <dl className="mt-8 grid gap-x-8 gap-y-4 border-y border-border py-6 sm:grid-cols-2">
                {[
                  ["Specialty", specialty
                    ? <Link key="s" href={`/specialties/${c.specialtySlug}`} data-tap className="text-accent hover:text-accent-2">{c.specialty}</Link>
                    : c.specialty],
                  ["Location", c.location],
                  ["Practice size", c.size],
                  ["Contact", `${c.client.name}, ${c.client.role}`],
                ].map(([k, v]) => (
                  <div key={String(k)} className="flex justify-between gap-4 text-sm">
                    <dt className="text-faint">{k}</dt>
                    <dd className="text-right text-muted">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Container>
        </Section>

        <Section className="scroll-rise pt-0">
          <Container>
            <div className="mx-auto max-w-3xl">
              <div className="rounded-2xl border border-border bg-surface p-7 text-center sm:p-9">
                <p className="font-mono text-[clamp(2.6rem,6vw,4rem)] font-700 leading-none text-accent">
                  <CountUp value={c.headlineMetric.value} />
                </p>
                <p className="mt-3 text-sm text-faint">{c.headlineMetric.label}</p>
              </div>

              <section className="mt-12">
                <h2 className="text-[clamp(1.4rem,2.6vw,1.85rem)] font-600">The starting position</h2>
                <p className="mt-5 text-[1.02rem] leading-[1.75] text-ink-2">{c.challenge}</p>
              </section>

              <section className="mt-12">
                <h2 className="text-[clamp(1.4rem,2.6vw,1.85rem)] font-600">What we did</h2>
                <p className="mt-5 text-[1.02rem] leading-[1.75] text-ink-2">{c.solution}</p>
              </section>

              <section className="mt-12">
                <h2 className="text-[clamp(1.4rem,2.6vw,1.85rem)] font-600">What changed</h2>
                <ul className="mt-6 space-y-3">
                  {c.results.map((r) => (
                    <li key={r} className="flex gap-3 leading-relaxed text-ink-2">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
                      {r}
                    </li>
                  ))}
                </ul>
              </section>

              <blockquote className="mt-12 rounded-xl border-l-2 border-accent/50 bg-surface p-6 text-[1.02rem] italic leading-relaxed text-ink-2">
                &ldquo;{c.quote}&rdquo;
                <footer className="mt-3 text-sm not-italic text-faint">
                  — {c.client.name}, {c.client.role}
                </footer>
              </blockquote>

              <section className="mt-14">
                <Eyebrow>Other case studies</Eyebrow>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {others.map((o) => (
                    <Link
                      key={o.slug}
                      href={`/case-studies/${o.slug}`}
                      data-tap
                      className="group rounded-xl border border-border bg-surface p-5 transition-all hover:-translate-y-1 hover:border-accent/30"
                    >
                      <p className="text-xs text-faint">{o.specialty}</p>
                      <p className="mt-2 font-500 leading-snug text-ink group-hover:text-accent">
                        {o.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </Container>
        </Section>
      </article>

      {specialty && (
        <RelatedContent
          title="Related"
          links={[
            { label: `${specialty.name} billing`, href: `/specialties/${c.specialtySlug}`, description: specialty.blurb },
          ]}
        />
      )}

      <FinalCTA />
    </PageTransition>
  );
}
