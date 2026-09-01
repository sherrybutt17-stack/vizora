import Link from "next/link";
import { Check, X } from "lucide-react";
import { Button, Card, Container, Section, SectionHead, Badge, DataTable, Eyebrow } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Reveal, CountUp } from "@/components/motion";
import { FAQList } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { CitedFigure } from "@/components/sections/CitedFigure";
import { JsonLd, breadcrumbSchema, faqSchema, offerCatalogSchema, webPageSchema, ENTITIES } from "@/lib/schema";
import { site } from "@/lib/content/site";
import { faqCategories } from "@/lib/content/faq";
import { industry } from "@/lib/content/stats";
import { pageMeta } from "@/lib/seo";
import { lastUpdated } from "@/lib/utils";
import { PageTransition } from "@/components/motion/ViewTransition";

export const metadata = pageMeta({
  title: "Medical Billing Pricing",
  description:
    "Transparent medical billing pricing: from 3% of net collections, typically 3–6% depending on volume and specialty. No setup fees, no charge for denial appeals, no long-term lock-in.",
  path: "/pricing",
  keywords: [
    "medical billing pricing", "medical billing cost", "percentage of collections billing",
    "how much do medical billing companies charge", "medical billing rates",
    "medical billing fees", "outsourced medical billing cost",
    "medical billing cost per claim", "flat fee medical billing",
    "medical billing service pricing 2026",
  ],
});

const crumbs = [{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }];

const INCLUDED = [
  "Coding by specialty-assigned certified coders",
  "Claim scrubbing against payer-specific edits",
  "Electronic submission and status tracking",
  "Denial management, appeals and rework",
  "AR follow-up and recovery",
  "Payment posting and reconciliation",
  "Eligibility verification",
  "Monthly reporting and performance review",
  "Client portal with live claim status",
  "A dedicated specialist you can reach directly",
];

const NOT_CHARGED = [
  "Setup or onboarding fees",
  "Denial appeals or claim rework",
  "EHR or practice management integration",
  "Monthly reporting or portal access",
  "Contract termination after the initial term",
];

const faqs = faqCategories.find((c) => c.slug === "pricing")!.items;

export default function PricingPage() {
  return (
    <PageTransition>
      <JsonLd data={[
        breadcrumbSchema(crumbs),
        faqSchema(faqs),
        offerCatalogSchema([
          {
            name: "Percentage of net collections",
            description:
              "Full revenue cycle management billed as a percentage of what is actually collected. Starts at 3%; typically 3–6% depending on practice size, specialty and claim volume. No setup fees, and denial appeals are never billed separately.",
            // No `price`/`priceCurrency`: together they assert a fixed
            // currency amount, so passing "3" published a $3.00 USD price for
            // what is 3% of net collections. The rate is stated in the
            // description instead, where it cannot be misread as a dollar figure.
            unit: `${site.pricing.startingRate} of net collections, starting rate`,
          },
        ]),
        webPageSchema({
          name: "Medical billing pricing",
          description:
            `Percentage-of-collections pricing starting at ${site.pricing.startingRate}, what is included, and what we do not charge for.`,
          path: "/pricing",
          about: [ENTITIES.medicalBilling],
          mentions: [ENTITIES.rcm],
          lastReviewed: lastUpdated("pricing"),
        }),
      ]} />
      <Breadcrumbs items={crumbs} />

      <Section className="pt-6">
        <Container>
          <SectionHead as="h1"
            eyebrow="Pricing"
            title={`From ${site.pricing.startingRate} of collections`}
            lead="Most billing companies in this category will not publish a number. Ours is on this page, along with what changes it and what an in-house alternative actually costs."
          />

          <div className="mx-auto mt-16 grid max-w-5xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal className="h-full">
            <Card hover={false} raised className="h-full p-8">
              <Badge tone="accent">Percentage of net collections</Badge>
              <p className="mt-6 font-display text-[clamp(3rem,8vw,4.5rem)] font-700 leading-none text-accent">
                <CountUp value={site.pricing.startingRate} />
              </p>
              <p className="mt-3 text-muted">
                starting rate · typically {site.pricing.typicalRange} depending on practice size,
                specialty and claim volume
              </p>
              <p className="mt-6 leading-relaxed text-ink-2">
                You pay only on what we actually collect. If a claim does not pay, we do not get
                paid on it either — which keeps our incentive and yours pointed the same direction.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact" size="lg">Get a custom quote</Button>
                <Button href="/tools/revenue-leak-calculator" variant="secondary" size="lg">
                  Estimate your leak
                </Button>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-faint">
                Comparing vendors?{" "}
                <Link
                  href="/resources/choosing-a-medical-billing-company"
                  data-tap
                  className="text-accent hover:text-accent-2"
                >
                  Our buyer&rsquo;s guide
                </Link>{" "}
                lists the twelve questions worth asking — including the ones we would expect to
                answer ourselves.
              </p>
            </Card>
            </Reveal>

            <div className="space-y-6">
              <Reveal delay={0.08}>
              <Card hover={false}>
                <h2 className="font-600 text-ink">What moves the rate</h2>
                <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted">
                  <li><strong className="text-ink">Claim volume</strong> — higher volume lowers the percentage.</li>
                  <li><strong className="text-ink">Average claim value</strong> — high-value specialties price lower.</li>
                  <li><strong className="text-ink">Specialty complexity</strong> — anesthesia, oncology and interventional work carry more coding burden.</li>
                  <li><strong className="text-ink">Scope</strong> — full RCM versus a single service such as AR recovery.</li>
                  <li><strong className="text-ink">Current AR condition</strong> — a large aged backlog is scoped separately.</li>
                </ul>
              </Card>
              </Reveal>
              <Reveal delay={0.16}>
              <Card hover={false}>
                <h2 className="font-600 text-ink">Never charged separately</h2>
                <ul className="mt-4 space-y-2">
                  {NOT_CHARGED.map((n) => (
                    <li key={n} className="flex gap-2.5 text-sm text-muted">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-danger" />
                      {n}
                    </li>
                  ))}
                </ul>
              </Card>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-bg-soft">
        <Container>
          <div className="mx-auto max-w-5xl">
            <SectionHead
              align="left"
              eyebrow="The honest comparison"
              title="Outsourced vs. in-house"
              lead="The comparison only works if it's complete. A billing salary is the smallest line in an in-house operation."
            />
            <DataTable
              className="mt-10"
              headers={["", "In-house billing", "Vizora"]}
              rows={[
                ["Salary and benefits", "~$73,000 per biller, fully loaded", "Included"],
                ["Billing software and clearinghouse", "Licensed separately", "Included"],
                ["Training and code set updates", "Your responsibility", "Included"],
                ["Coverage during leave or turnover", "Collections stop", "Continuous"],
                ["Denial appeals", "If there is time", "Always worked"],
                ["Specialty coding depth", "One generalist", "Coders assigned by specialty"],
                ["Cost structure", "Fixed, regardless of collections", "Scales with what we collect"],
              ]}
            />
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <CitedFigure stat={industry.inHouseBillerCost} />
              <CitedFigure stat={industry.reworkCost} />
            </div>
            <p className="mt-6 text-sm leading-relaxed text-faint">
              In-house billing is the right answer for some practices — particularly larger groups
              with the volume to keep specialists busy and the management depth to supervise them.
              It is usually the wrong answer for practices where one person is the entire billing
              department and their vacation stops cash flow.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mx-auto max-w-4xl">
            <Eyebrow>Included</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.8rem,3.6vw,2.4rem)] font-600">
              Everything in the percentage
            </h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {INCLUDED.map((i) => (
                <li key={i} className="flex gap-3 rounded-xl border border-border bg-surface p-4 text-sm leading-relaxed text-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {i}
                </li>
              ))}
            </ul>
            <div className="mt-14">
              <Eyebrow>Questions</Eyebrow>
              <FAQList items={faqs} className="mt-5" />
            </div>
            <p className="mt-8 text-sm text-faint">
              A machine-readable version of this page is available at{" "}
              <Link href="/pricing.md" className="text-accent underline underline-offset-4">/pricing.md</Link>{" "}
              for AI agents and automated vendor comparison.
            </p>
          </div>
        </Container>
      </Section>

      <FinalCTA
        title="Get a quote for your practice"
        lead="Tell us your specialty, claim volume and current pain points. We'll come back with a specific rate — and a free audit either way."
        cta="Request a custom quote"
      />
    </PageTransition>
  );
}
