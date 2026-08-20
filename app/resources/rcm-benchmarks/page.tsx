import { Container, Section, SectionHead, DataTable, Eyebrow } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CitedFigure } from "@/components/sections/CitedFigure";
import { DenialBreakdown } from "@/components/viz/DenialBreakdown";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd, breadcrumbSchema, datasetSchema, webPageSchema, ENTITIES } from "@/lib/schema";
import { industry } from "@/lib/content/stats";
import { pageMeta } from "@/lib/seo";
import { LAST_UPDATED, formatDate } from "@/lib/utils";
import { PageTransition } from "@/components/motion/ViewTransition";

export const metadata = pageMeta({
  title: "Medical Billing & RCM Benchmarks (Cited Sources)",
  description:
    "Current revenue cycle benchmarks with named sources: denial rates, days in AR, cost to rework a claim, clean claim rates and administrative burden. Every figure traceable to its publisher and year.",
  path: "/resources/rcm-benchmarks",
  keywords: [
    "medical billing benchmarks", "denial rate benchmark", "days in AR benchmark",
    "RCM statistics", "average claim denial rate", "what is a good clean claim rate",
    "cost to rework a denied claim", "healthcare denial statistics 2026",
    "revenue cycle KPI benchmarks", "medical practice AR days average",
    "claim denial rate by payer", "medical billing industry statistics",
  ],
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Resources", path: "/resources" },
  { name: "RCM Benchmarks", path: "/resources/rcm-benchmarks" },
];

const REJECTED = [
  ["“50–65% of denied claims are never reworked”", "No primary study, sample or methodology exists. Appears even in HFMA content without a citation."],
  ["“90% of denials are preventable”", "Traces to an Advisory Board blog post from December 2014."],
  ["“$118 to rework a denied claim”", "Change Healthcare, 2016 data. Superseded by Premier's $57.23 (2023)."],
  ["“$181 to rework a denied claim”", "No traceable source of any kind."],
  ["“95% clean claim rate is the HFMA benchmark”", "HFMA publishes MAP Key definitions only — no public benchmark values."],
  ["“80% of medical bills contain errors”", "An advocacy group's self-selected caseload, not a study."],
  ["“Patient responsibility is 30%+ of provider revenue”", "Contradicted by Kodiak Solutions: 7.3% of net patient revenue."],
];

export default function BenchmarksPage() {
  return (
    <PageTransition>
      <JsonLd data={[
        breadcrumbSchema(crumbs),
        datasetSchema({
          name: "Medical billing and revenue cycle benchmarks",
          description:
            "Curated revenue cycle benchmarks — denial rates, days in AR, cost to contest a denial, administrative burden — each attributed to a named publisher, dataset and data year.",
          path: "/resources/rcm-benchmarks",
          lastReviewed: LAST_UPDATED,
          citations: Array.from(
            new Set(Object.values(industry).map((s) => s.url).filter((u): u is string => Boolean(u))),
          ),
          keywords: [
            "claim denial rate", "days in accounts receivable", "clean claim rate",
            "cost to rework a denied claim", "prior authorization burden",
            "revenue cycle management benchmarks",
          ],
        }),
        webPageSchema({
          name: "Medical billing and RCM benchmarks",
          description:
            "Current revenue cycle benchmarks with named sources and data years.",
          path: "/resources/rcm-benchmarks",
          about: [ENTITIES.rcm, ENTITIES.medicalBilling],
          mentions: [ENTITIES.medicare, ENTITIES.healthInsurance],
          lastReviewed: LAST_UPDATED,
          speakableSelectors: ["[data-answer]"],
        }),
      ]} />
      <Breadcrumbs items={crumbs} />

      <Section className="scroll-rise pt-6">
        <Container>
          <SectionHead as="h1"
            eyebrow="Reference"
            title="Medical billing and RCM benchmarks"
            lead="What a normal denial rate actually is, what a denial actually costs, and where practices actually sit on days in AR — with every figure traceable to a named publisher, dataset and year."
          />
          <p className="mt-6 text-center text-sm text-faint">
            Last reviewed {formatDate(LAST_UPDATED)}
          </p>
        </Container>
      </Section>

      <Section className="scroll-rise pt-0">
        <Container>
          <Eyebrow>Denials</Eyebrow>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <CitedFigure stat={industry.practiceDenialRate} />
            <CitedFigure stat={industry.hospitalDenialRate} />
            <CitedFigure stat={industry.providersAbove10} />
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <CitedFigure stat={industry.avoidable} />
            <CitedFigure stat={industry.frontEnd} />
            <CitedFigure stat={industry.topDenialReason} />
          </div>

          {/* The same Optum categories the three figures above quote, charted
              so the front-end concentration is visible rather than asserted. */}
          <DenialBreakdown className="mt-8" />

          <Eyebrow className="mt-16 block">Cost and recovery</Eyebrow>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <CitedFigure stat={industry.reworkCost} />
            <CitedFigure stat={industry.overturnRate} />
            <CitedFigure stat={industry.wastedSpend} />
          </div>

          <Eyebrow className="mt-16 block">Accounts receivable and administration</Eyebrow>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <CitedFigure stat={industry.arDaysMedian} />
            <CitedFigure stat={industry.adminTimePerVisit} />
            <CitedFigure stat={industry.claimStatusPhone} />
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <CitedFigure stat={industry.eligibilitySavings} />
            <CitedFigure stat={industry.inHouseBillerCost} />
            <CitedFigure stat={industry.cleanClaimsHarder} />
          </div>

          <Eyebrow className="mt-16 block">Prior authorization</Eyebrow>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <CitedFigure stat={industry.priorAuthBurden} />
            <CitedFigure stat={industry.maPriorAuthDenials} />
          </div>
        </Container>
      </Section>

      {/* The differentiator — nobody else publishes what they refused to cite */}
      <Section className="scroll-rise border-t border-border bg-bg-soft">
        <Container>
          <div className="mx-auto max-w-4xl">
            <SectionHead
              align="left"
              eyebrow="What we deliberately excluded"
              title="Statistics we won't repeat"
              lead="Several figures saturate medical billing marketing despite having no verifiable primary source, or being a decade old and still quoted as current. We checked, and left them out. Here they are, so you can recognize them elsewhere."
            />
            <DataTable
              className="mt-10"
              headers={["Claim", "Why we excluded it"]}
              rows={REJECTED}
            />
            <p className="mt-6 text-sm leading-relaxed text-faint">
              This matters beyond pedantry. If a vendor quotes you a statistic that dissolves on
              inspection, it is reasonable to wonder what else they have not checked.
            </p>
          </div>
        </Container>
      </Section>

      <FinalCTA
        title="See how your practice compares"
        lead="A free billing audit measures your denial rate, AR aging and clean claim rate against these benchmarks — using your actual numbers rather than industry averages."
      />
    </PageTransition>
  );
}
