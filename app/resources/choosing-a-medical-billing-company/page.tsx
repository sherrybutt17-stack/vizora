import Link from "next/link";
import { Check, AlertTriangle } from "lucide-react";
import { Container, Section, SectionHead, DataTable, Eyebrow, Badge } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQList } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { RelatedContent } from "@/components/sections/RelatedContent";
import { Reveal } from "@/components/motion";
import {
  JsonLd, breadcrumbSchema, faqSchema, howToSchema, webPageSchema, ENTITIES,
} from "@/lib/schema";
import {
  guideAnswer, providerCategories, evaluationSteps, askThese, redFlags, guideFaqs,
} from "@/lib/content/buyers-guide";
import { pageMeta } from "@/lib/seo";
import { LAST_UPDATED, formatDate } from "@/lib/utils";
import { PageTransition } from "@/components/motion/ViewTransition";

export const metadata = pageMeta({
  title: "How to Choose a Medical Billing Company",
  description:
    "A buyer's guide: the five provider models and who each suits, the numbers to demand before discussing rate, the contract terms that matter more than price, and seven red flags.",
  path: "/resources/choosing-a-medical-billing-company",
  keywords: [
    "how to choose a medical billing company",
    "medical billing company checklist",
    "questions to ask a medical billing company",
    "best medical billing service for small practice",
    "medical billing vendor evaluation",
    "switching medical billing companies",
    "outsourced billing buyers guide",
    "medical billing RFP questions",
  ],
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Resources", path: "/resources" },
  { name: "Choosing a billing company", path: "/resources/choosing-a-medical-billing-company" },
];

export default function ChoosingPage() {
  return (
    <PageTransition>
      <JsonLd data={[
        breadcrumbSchema(crumbs),
        howToSchema({
          name: "How to choose a medical billing company",
          description:
            "A seven-step evaluation process for selecting a medical billing or revenue cycle vendor, from diagnosing the underlying problem through agreeing how aged accounts receivable is handled during transition.",
          path: "/resources/choosing-a-medical-billing-company",
          steps: evaluationSteps,
        }),
        faqSchema(guideFaqs),
        webPageSchema({
          name: "How to choose a medical billing company",
          description:
            "Buyer's guide covering provider models, the metrics to demand before discussing rate, contract terms and red flags.",
          path: "/resources/choosing-a-medical-billing-company",
          about: [ENTITIES.medicalBilling],
          mentions: [ENTITIES.rcm],
          lastReviewed: LAST_UPDATED,
        }),
      ]} />
      <Breadcrumbs items={crumbs} />

      <Section className="scroll-rise pt-6 pb-10">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Badge tone="accent">Buyer&rsquo;s guide</Badge>
            <h1 className="mt-5 text-[clamp(2.1rem,4.6vw,3.1rem)] font-600 leading-[1.08]">
              How to choose a medical billing company
            </h1>
            <p className="mt-5 text-sm text-faint">Updated {formatDate(LAST_UPDATED)}</p>

            <div
              data-answer
              className="mt-9 rounded-xl border border-accent/25 bg-accent/[0.05] p-6"
            >
              <p className="text-[1.05rem] leading-relaxed text-ink-2">{guideAnswer}</p>
            </div>

            <p className="mt-8 leading-relaxed text-muted">
              We sell billing services, so read this the way you would read anything written by a
              vendor. What follows is deliberately structured so you can hold us to it too — the
              questions below are the ones we would expect to answer, and the red flags are ones we
              would fail if they applied.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="scroll-rise pt-0">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-[clamp(1.5rem,2.8vw,2rem)] font-600">
              Start with one diagnostic: systems or collections?
            </h2>
            <div className="mt-5 space-y-4 text-[1.02rem] leading-[1.75] text-ink-2">
              <p>
                Practices usually arrive at this decision having noticed a number they do not like,
                then start evaluating vendors of quite different kinds against each other. Separate
                the problem first, because replacing a platform solves a systems problem and
                replacing a biller solves a collections problem. They cost different amounts, take
                different lengths of time, and disrupt different people.
              </p>
              <p>
                The test is simple. Can you produce, from a report, your first-pass denial rate by
                payer and your AR aging by bucket for last month? If the data exists and the numbers
                are bad, it is a collections problem. If the data does not exist at all, it is a
                systems problem — and a billing service layered on top inherits those constraints
                rather than fixing them.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="scroll-rise border-t border-border bg-bg-soft">
        <Container>
          <SectionHead
            align="left"
            eyebrow="The options"
            title="Five models, and who each one actually suits"
            lead="These are business models rather than vendors. Most shortlists mix two or three of them together, which is why they are hard to compare."
          />
          <DataTable
            className="mt-10"
            headers={["Model", "What it is", "Suits", "The trade-off"]}
            rows={providerCategories.map((c) => [c.model, c.whatItIs, c.suits, c.tradeoff])}
          />
        </Container>
      </Section>

      <Section className="scroll-rise">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionHead
              align="left"
              eyebrow="Process"
              title="Seven steps, in this order"
              lead="The order matters. Most practices compare rates first, which is the least informative comparison available."
            />
            <ol className="mt-10 space-y-8">
              {evaluationSteps.map((s, i) => (
                <Reveal key={s.name} delay={(i % 3) * 0.05}>
                  <li className="relative border-l-2 border-border pl-6">
                    <span className="absolute -left-[9px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent font-mono text-[0.6rem] font-700 text-bg">
                      {i + 1}
                    </span>
                    <h3 className="text-lg font-600 text-ink">{s.name}</h3>
                    <p className="mt-2.5 leading-relaxed text-muted">{s.text}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section className="scroll-rise border-t border-border bg-bg-soft">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionHead
              align="left"
              eyebrow="Due diligence"
              title="Twelve questions worth asking"
              lead="Send these before the first call. What comes back — figures or adjectives — tells you most of what you need."
            />
            <ul className="mt-9 space-y-3.5">
              {askThese.map((q) => (
                <li key={q} className="flex gap-3 leading-relaxed text-ink-2">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section className="scroll-rise">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionHead
              align="left"
              eyebrow="Warning signs"
              title="Seven red flags"
              lead="None of these are automatically disqualifying. All of them are worth an explanation before you sign."
            />
            <div className="mt-9 space-y-4">
              {redFlags.map((r) => (
                <div key={r.flag} className="rounded-xl border border-border bg-surface p-5">
                  <p className="flex items-start gap-2.5 font-600 leading-snug text-ink">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                    {r.flag}
                  </p>
                  <p className="mt-2.5 pl-7 leading-relaxed text-muted">{r.why}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="scroll-rise border-t border-border bg-bg-soft">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <Eyebrow>Questions</Eyebrow>
              <h2 className="mt-4 text-[clamp(1.8rem,3.6vw,2.4rem)] font-600 leading-[1.1]">
                Common questions
              </h2>
              <p className="mt-4 text-sm text-faint">Updated {formatDate(LAST_UPDATED)}</p>
            </div>
            <FAQList items={guideFaqs} />
          </div>
        </Container>
      </Section>

      <Section className="scroll-rise">
        <Container>
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-surface p-7 sm:p-9">
            <Eyebrow>Work the numbers yourself</Eyebrow>
            <p className="mt-4 leading-relaxed text-muted">
              Before any vendor conversation, it is worth knowing roughly what your current denial
              rate and AR aging are costing you. Our{" "}
              <Link href="/tools/revenue-leak-calculator" data-tap className="text-accent hover:text-accent-2">
                revenue leak calculator
              </Link>{" "}
              estimates it from figures you already have, and the{" "}
              <Link href="/tools/denial-code-lookup" data-tap className="text-accent hover:text-accent-2">
                denial code lookup
              </Link>{" "}
              covers 190 CARC and RARC codes with the cause behind each. Neither requires an email
              address.
            </p>
          </div>
        </Container>
      </Section>

      <RelatedContent
        title="Compare the models in detail"
        links={[
          { label: "In-house vs outsourced billing", href: "/compare/in-house-vs-outsourced-medical-billing", description: "The full cost comparison, including what in-house calculations usually leave out." },
          { label: "Billing software vs billing service", href: "/compare/billing-software-vs-billing-service", description: "Buying a tool versus buying the work being done." },
          { label: "Percentage of collections vs flat fee", href: "/compare/percentage-of-collections-vs-flat-fee-billing", description: "How each pricing model changes vendor incentives." },
          { label: "RCM benchmarks", href: "/resources/rcm-benchmarks", description: "Cited industry figures to measure any vendor's claims against." },
          { label: "Pricing", href: "/pricing", description: "What we charge and what it includes." },
        ]}
      />

      <FinalCTA
        title="Ask us these questions"
        lead="We will answer the twelve above in writing before you commit to anything. If the answers do not compare well, you will have learned something useful either way."
      />
    </PageTransition>
  );
}
