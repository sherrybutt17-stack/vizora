import Link from "next/link";
import { ArrowUpRight, Scale } from "lucide-react";
import { Container, Section, SectionHead } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AnswerBlock } from "@/components/sections/AnswerBlock";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd, breadcrumbSchema, itemListSchema, webPageSchema, ENTITIES } from "@/lib/schema";
import { comparisons } from "@/lib/content/comparisons";
import { pageMeta } from "@/lib/seo";
import { LAST_UPDATED, formatDate } from "@/lib/utils";
import { PageTransition } from "@/components/motion/ViewTransition";

export const metadata = pageMeta({
  title: "Medical Billing Comparisons",
  description:
    "In-house vs outsourced billing, percentage vs flat fee pricing, offshore vs domestic, software vs service. Structured comparisons that name the cases where the answer is not us.",
  path: "/compare",
  keywords: [
    "medical billing comparison", "in-house vs outsourced medical billing",
    "medical billing vs coding", "medical billing pricing comparison",
    "offshore vs domestic medical billing", "billing software vs service",
  ],
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Compare", path: "/compare" },
];

export default function ComparePage() {
  return (
    <PageTransition>
      <JsonLd data={[
        breadcrumbSchema(crumbs),
        itemListSchema(
          comparisons.map((c) => ({ name: c.title, path: `/compare/${c.slug}` })),
          "Medical billing comparisons",
        ),
        webPageSchema({
          name: "Medical billing comparisons",
          description: "Side-by-side analysis of the decisions practices face when choosing how to run billing.",
          path: "/compare",
          about: [ENTITIES.medicalBilling],
          lastReviewed: LAST_UPDATED,
        }),
      ]} />
      <Breadcrumbs items={crumbs} />

      <Section className="scroll-rise pt-4">
        <Container>
          <SectionHead as="h1"
            eyebrow="Decide"
            title="Comparisons"
            lead="The six decisions practices actually agonise over, laid out side by side — including the cases where the honest answer is that you do not need us."
          />

          <AnswerBlock className="mx-auto mt-10 max-w-3xl" question="How to read these">
            Every comparison below names the situations where each option wins, and every
            one includes a caveat section describing when Vizora is the wrong choice. A
            vendor comparison that concludes in the vendor&rsquo;s favour six times out of six
            is an advertisement. These are written to be useful even if you never contact us.
          </AnswerBlock>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {comparisons.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                transitionTypes={["nav-forward"]}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-surface-2"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <Scale className="h-4 w-4 shrink-0 text-accent" />
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-faint">
                      {c.labelA} vs {c.labelB}
                    </span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-accent" />
                </div>
                <h2 className="mt-4 text-xl font-600 text-ink group-hover:text-accent">{c.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{c.answer}</p>
              </Link>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-faint">
            Last reviewed {formatDate(LAST_UPDATED)}
          </p>
        </Container>
      </Section>

      <FinalCTA />
    </PageTransition>
  );
}
