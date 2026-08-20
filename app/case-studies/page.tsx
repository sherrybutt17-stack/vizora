import Link from "next/link";
import { Check } from "lucide-react";
import { Container, Section, SectionHead, Card, Badge } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Reveal, CountUp } from "@/components/motion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { caseStudies, aggregateResults } from "@/lib/content/case-studies";
import { pageMeta } from "@/lib/seo";
import { PageTransition } from "@/components/motion/ViewTransition";

export const metadata = pageMeta({
  title: "Medical Billing Case Studies & Client Results",
  description:
    "Real results from healthcare practices: denial rates cut from 28% to 8%, AR days reduced from 62 to 24, $150K recovered in denied surgical claims.",
  path: "/case-studies",
  keywords: [
    "medical billing case studies",
    "revenue cycle case study",
    "denial reduction results",
    "medical billing success stories",
    "AR days reduction case study",
    "practice collections improvement",
  ],
});

const crumbs = [{ name: "Home", path: "/" }, { name: "Case studies", path: "/case-studies" }];

export default function CaseStudiesPage() {
  return (
    <PageTransition>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Breadcrumbs items={crumbs} />

      <Section className="pt-6">
        <Container>
          <SectionHead as="h1"
            eyebrow="Real results from real practices"
            title="What changed, and by how much"
            lead="Five practices across five specialties. Each entry states the starting position, what we actually did, and the measured outcome."
          />

          <div className="mt-16 space-y-6">
            {caseStudies.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 2) * 0.06}>
                <Card hover={false} as="article" className="p-7 sm:p-9">
                  <div className="grid gap-9 lg:grid-cols-[0.9fr_1.1fr]">
                    <div>
                      <p className="font-mono text-[clamp(2.4rem,5vw,3.4rem)] font-700 leading-none text-accent">
                        <CountUp value={c.headlineMetric.value} />
                      </p>
                      <p className="mt-2 text-sm text-faint">{c.headlineMetric.label}</p>
                      <h2 className="mt-6 text-2xl font-600 leading-snug">
                        <Link
                          href={`/case-studies/${c.slug}`}
                          data-tap
                          className="transition-colors hover:text-accent"
                        >
                          {c.title}
                        </Link>
                      </h2>
                      <dl className="mt-6 space-y-2 border-t border-border pt-5 text-sm">
                        {[
                          ["Specialty", c.specialtySlug ? <Link key="s" href={`/specialties/${c.specialtySlug}`} data-tap className="text-accent hover:text-accent-2">{c.specialty}</Link> : c.specialty],
                          ["Location", c.location],
                          ["Size", c.size],
                          ["Contact", `${c.client.name}, ${c.client.role}`],
                        ].map(([k, v]) => (
                          <div key={String(k)} className="flex justify-between gap-4">
                            <dt className="text-faint">{k}</dt>
                            <dd className="text-right text-muted">{v}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <Badge className="mb-3">Challenge</Badge>
                        <p className="leading-relaxed text-muted">{c.challenge}</p>
                      </div>
                      <div>
                        <Badge className="mb-3">What we did</Badge>
                        <p className="leading-relaxed text-muted">{c.solution}</p>
                      </div>
                      <div>
                        <Badge tone="positive" className="mb-3">Results</Badge>
                        <ul className="space-y-2">
                          {c.results.map((r) => (
                            <li key={r} className="flex gap-2.5 text-sm leading-relaxed text-ink-2">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <blockquote className="border-l-2 border-accent/50 pl-5 text-[0.95rem] italic leading-relaxed text-ink-2">
                        &ldquo;{c.quote}&rdquo;
                        <footer className="mt-2 text-xs not-italic text-faint">
                          — {c.client.name}, {c.client.role}
                        </footer>
                      </blockquote>
                      <Link
                        href={`/case-studies/${c.slug}`}
                        data-tap
                        className="inline-flex text-sm font-500 text-accent transition-colors hover:text-accent-2"
                      >
                        Read the full case study &rarr;
                      </Link>
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-16 rounded-2xl border border-border bg-surface p-8 sm:p-10">
              <h2 className="text-center text-xl font-600">Combined across these partnerships</h2>
              <dl className="mt-8 grid gap-6 sm:grid-cols-4">
                {aggregateResults.map((r) => (
                  <div key={r.label} className="text-center">
                    <dt className="sr-only">{r.label}</dt>
                    <dd>
                      <span className="block font-mono text-3xl font-700 text-accent">
                        <CountUp value={r.value} />
                      </span>
                      <span className="mt-1 block text-sm text-muted">{r.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </Container>
      </Section>

      <FinalCTA />
    </PageTransition>
  );
}
