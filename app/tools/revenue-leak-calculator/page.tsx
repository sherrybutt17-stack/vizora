import { Container, Section, SectionHead } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RevenueLeakCalculator } from "@/components/tools/RevenueLeakCalculator";
import { CitedFigure } from "@/components/sections/CitedFigure";
import { FAQList } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { industry } from "@/lib/content/stats";
import { pageMeta } from "@/lib/seo";
import { PageTransition } from "@/components/motion/ViewTransition";

export const metadata = pageMeta({
  title: "Revenue Leak Calculator",
  description:
    "Free calculator estimating annual revenue lost to claim denials, using published MGMA, Premier and Optum benchmarks. Enter claim volume, claim value and denial rate.",
  path: "/tools/revenue-leak-calculator",
  keywords: [
    "medical billing calculator",
    "denial cost calculator",
    "revenue cycle calculator",
    "claim denial cost estimator",
    "practice revenue loss calculator",
    "how much do denials cost",
    "medical practice revenue calculator",
  ],
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Tools", path: "/tools/revenue-leak-calculator" },
  { name: "Revenue Leak Calculator", path: "/tools/revenue-leak-calculator" },
];

const faqs = [
  {
    question: "How is the revenue leak calculated?",
    answer:
      "Denied claim volume is your monthly claim count multiplied by your denial rate, annualized. That is multiplied by average claim value to give total denied revenue. The recoverable portion applies Premier Inc.'s finding that approximately 70% of denied claims are overturned when appealed, and the rework burden uses Premier's measured cost of $57.23 per contested claim.",
  },
  {
    question: "What should I enter for average claim value?",
    answer:
      "Use your average allowed amount rather than your billed charge. Billed charges are typically well above contracted rates, so using them inflates the result substantially. If you do not know your allowed average, dividing total collections by claim count for a recent month is a reasonable approximation.",
  },
  {
    question: "What if I don't know my denial rate?",
    answer:
      "Use the benchmark for your setting. MGMA reports an aggregate first-submission denial rate of 8% for single-specialty physician practices. Kodiak Solutions measured 11.81% across hospitals and health systems. If you have never measured it, starting at 10% is a defensible assumption — and measuring it is the first thing a billing audit does.",
  },
  {
    question: "Is this an estimate or a quote?",
    answer:
      "An estimate for orientation. It applies published industry benchmarks to numbers you supply, which means it cannot account for your specific payer mix, specialty, or which denials are genuinely recoverable in your case. A billing audit measures your actual figures rather than modeling them.",
  },
];

export default function CalculatorPage() {
  return (
    <PageTransition>
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(faqs)]} />
      <Breadcrumbs items={crumbs} />

      <Section className="scroll-rise pt-6">
        <Container>
          <SectionHead as="h1"
            eyebrow="Free tool"
            title="What are claim denials costing your practice?"
            lead="Denials are usually treated as an operational nuisance rather than a number. This turns them into one — using published benchmarks, with every source shown."
          />
          <div className="mt-14">
            <RevenueLeakCalculator />
          </div>
        </Container>
      </Section>

      <Section className="scroll-rise border-t border-border bg-bg-soft">
        <Container>
          <SectionHead
            align="left"
            eyebrow="The benchmarks behind it"
            title="Where these numbers come from"
            lead="Medical billing marketing is full of statistics with no traceable source. Every figure this calculator uses names its publisher, dataset and year."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <CitedFigure stat={industry.overturnRate} />
            <CitedFigure stat={industry.reworkCost} />
            <CitedFigure stat={industry.avoidable} />
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <CitedFigure stat={industry.practiceDenialRate} />
            <CitedFigure stat={industry.providersAbove10} />
            <CitedFigure stat={industry.wastedSpend} />
          </div>
        </Container>
      </Section>

      <Section className="scroll-rise">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionHead align="left" eyebrow="Questions" title="About this calculator" />
            <FAQList items={faqs} className="mt-8" />
          </div>
        </Container>
      </Section>

      <FinalCTA />
    </PageTransition>
  );
}
