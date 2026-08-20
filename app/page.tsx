import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, TrendingDown, Clock, FileWarning } from "lucide-react";
import { Button, Card, Container, Section, SectionHead, Badge, Eyebrow } from "@/components/ui";
import { Reveal, CountUp, Marquee } from "@/components/motion";
import { ProductShowcase } from "@/components/viz/ProductShowcase";
import { ClaimFlow } from "@/components/viz/ClaimFlow";
import { StickyShowcase } from "@/components/sections/StickyShowcase";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Avatar } from "@/components/ui/Avatar";
import { CitedFigure } from "@/components/sections/CitedFigure";
import { FAQList } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { RevenueLeakCalculator } from "@/components/tools/RevenueLeakCalculator";
import { JsonLd, faqSchema, howToSchema, webPageSchema, ENTITIES } from "@/lib/schema";
import { services } from "@/lib/content/services";
import { specialties } from "@/lib/content/specialties";
import { caseStudies } from "@/lib/content/case-studies";
import { testimonials } from "@/lib/content/testimonials";
import { homeFaqs } from "@/lib/content/faq";
import { industry, performance } from "@/lib/content/stats";
import { site, payers } from "@/lib/content/site";
import { pageMeta } from "@/lib/seo";
import { LAST_UPDATED } from "@/lib/utils";
import { PageTransition } from "@/components/motion/ViewTransition";

export const metadata = pageMeta({
  title: "Medical Billing Services That Reduce Denials and Recover Revenue",
  description:
    "Vizora is a medical billing and RCM company for healthcare practices. We cut denial rates, shorten AR days, and recover revenue most practices write off. Free billing audit.",
  path: "/",
  keywords: [
    "medical billing services", "medical billing company", "outsourced medical billing",
    "revenue cycle management", "RCM services", "denial management services",
    "medical billing and coding services", "medical claims processing",
    "healthcare revenue cycle management company", "physician billing services",
    "medical billing outsourcing", "reduce claim denials",
    "accounts receivable recovery healthcare", "medical billing for small practices",
    "best medical billing company", "medical billing services near me",
  ],
});

const PROCESS = [
  { step: "01", title: "Free billing audit", description: "We review your denial rate, AR aging, clean claim rate and payer mix against industry benchmarks — and tell you what we find, whether or not you hire us." },
  { step: "02", title: "Practice onboarding", description: "We learn your systems, workflows, payers and specialty requirements, then configure around them. Typically under 2 weeks, with no interruption to your claim flow." },
  { step: "03", title: "Claims and follow-up", description: "We code, scrub and submit claims, work the payer queue, and appeal denials instead of writing them off." },
  { step: "04", title: "Monthly reporting", description: "Transparent reporting on collections, denials by reason and payer, and AR aging — with the specific fixes that will move your numbers." },
] as const;

export default function HomePage() {
  return (
    <PageTransition>
      <JsonLd data={[
        faqSchema(homeFaqs),
        howToSchema({
          name: "How Vizora takes over a practice's medical billing",
          description:
            "The four stages from a free billing audit to monthly reporting, and what happens at each.",
          path: "/",
          totalTime: "P4W",
          steps: PROCESS.map((p) => ({ name: p.title, text: p.description })),
        }),
        webPageSchema({
          name: "Medical billing services that reduce denials and recover revenue",
          description: site.description,
          path: "/",
          about: [ENTITIES.medicalBilling, ENTITIES.rcm],
          mentions: [ENTITIES.medicalCoding, ENTITIES.medicare, ENTITIES.medicaid, ENTITIES.hipaa],
          lastReviewed: LAST_UPDATED,
          speakableSelectors: ["[data-answer]"],
        }),
      ]} />

      {/* ---------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden">
        <div className="beam pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="bg-mesh" />
        </div>
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />
        <Container className="relative">
          <div className="grid items-center gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
            <div>
              <Badge tone="accent" className="mb-6">
                <ShieldCheck className="h-3.5 w-3.5" />
                HIPAA-conscious billing support
              </Badge>
              <h1 className="text-display-xl font-600">
                Your denials are{" "}
                <span className="text-shimmer">recoverable revenue</span>.
                Most practices never collect it.
              </h1>
              <p data-answer="" className="mt-7 max-w-xl text-[1.1rem] leading-[1.62] text-ink-2">
                Around 70% of denied claims are overturned when someone appeals them. The obstacle
                is never merit — it&rsquo;s capacity. Vizora codes, submits, chases and appeals every claim,
                so the revenue you already earned actually arrives.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact" size="lg">
                  Get your free billing audit <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="#how-it-works" variant="secondary" size="lg">See how it works</Button>
              </div>

              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5">
                {["No setup fees", "You pay when we collect", "42 specialties supported"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted">
                    <Check className="h-4 w-4 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <Reveal delay={0.15}>
              <ProductShowcase className="animate-float" />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ----------------------------------------------------- Trust strip */}
      <section className="border-y border-border bg-bg-soft py-7">
        <Container>
          <p className="mb-5 text-center font-mono text-[0.65rem] uppercase tracking-[0.18em] text-faint">
            Billing across every major payer
          </p>
          <div className="mask-fade-x">
            <Marquee items={[...payers]} />
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------- Problem */}
      <Section>
        <Container>
          <SectionHead
            eyebrow="The real problem"
            title="Denials aren't a billing problem. They're a front-end problem."
            lead="Most practices work denials harder. The data says the leverage is upstream — nearly half of all denials are created before a claim is ever coded."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            <Reveal><CitedFigure stat={industry.avoidable} /></Reveal>
            <Reveal delay={0.08}><CitedFigure stat={industry.frontEnd} /></Reveal>
            <Reveal delay={0.16}><CitedFigure stat={industry.topDenialReason} /></Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="mt-14 grid gap-8 rounded-2xl border border-border bg-surface p-7 sm:p-9 lg:grid-cols-2 lg:gap-12">
              <div>
                <h3 className="text-2xl font-600 leading-snug">What that looks like in a practice</h3>
                <p className="mt-4 leading-relaxed text-muted">
                  Coverage is verified once at registration and assumed stable. Authorization is
                  discovered to be required after the service is delivered. A claim rejects for a
                  missing modifier and sits in a worklist nobody has time to open. Ninety days pass.
                  Then it hits the filing deadline and becomes worth exactly nothing.
                </p>
                <p className="mt-4 leading-relaxed text-muted">
                  None of that is a coding failure. It&rsquo;s a capacity failure — and it compounds
                  quietly, because a denial that is never worked never shows up as a loss.
                </p>
              </div>
              <ul className="space-y-3">
                {[
                  { icon: FileWarning, label: "Denials written off unworked", detail: "The revenue was collectible. Nobody had time." },
                  { icon: Clock, label: "AR aging past the filing deadline", detail: "Past the payer's window, recovery probability is zero." },
                  { icon: TrendingDown, label: "Systematic undercoding", detail: "Documentation supports more than what gets billed." },
                ].map((row) => (
                  <li key={row.label} className="flex gap-4 rounded-xl border border-border bg-surface-2 p-4">
                    <row.icon className="mt-0.5 h-5 w-5 shrink-0 text-danger" />
                    <div>
                      <p className="font-500 text-ink">{row.label}</p>
                      <p className="mt-1 text-sm leading-snug text-muted">{row.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------------- Where revenue goes */}
      <Section className="border-t border-border">
        <Container>
          <SectionHead
            align="left"
            eyebrow="The lifecycle"
            title="Four places revenue leaves, and what closes each one"
            lead="Every dollar a practice loses exits at one of four points. None of them are visible in a standard collections report."
          />
          <StickyShowcase
            className="mt-16"
            visual={<ClaimFlow />}
            steps={[
              {
                eyebrow: "Before the visit",
                title: "Coverage assumed rather than verified",
                body:
                  "Eligibility is checked at registration and treated as stable. Plans change mid-year, secondary coverage goes unrecorded, and authorization requirements surface only after the service has been delivered and the cost already incurred.",
                metric: { value: industry.topDenialReason.value, label: "of denials are registration and eligibility errors" },
              },
              {
                eyebrow: "At coding",
                title: "Documentation that understates the work",
                body:
                  "Undercoding produces no denial, no alert and no report line. A provider audited once tends to down-shift permanently, and without periodic coding review nothing in the practice ever notices the gap between what was done and what was billed.",
              },
              {
                eyebrow: "At submission",
                title: "Claims that never reach the payer",
                body:
                  "A claim rejected at the clearinghouse exists in your system as submitted and in the payer's system not at all. It appears in no aging report built from payer data, and it ages silently until the filing deadline closes.",
              },
              {
                eyebrow: "After denial",
                title: "Appeals nobody has capacity to file",
                body:
                  "Roughly 70% of appealed denials are overturned and paid. The constraint is almost never the merits of the claim — it is whether anyone has the hours to work the queue before the payer's appeal window expires.",
                metric: { value: industry.overturnRate.value, label: "of appealed denials are overturned" },
              },
            ]}
          />
        </Container>
      </Section>

      {/* ----------------------------------------------------- Calculator */}
      <Section className="border-t border-border bg-bg-soft">
        <Container>
          <SectionHead
            eyebrow="Free tool"
            title="What are denials costing your practice?"
            lead="Enter your numbers. The calculation uses published MGMA, Premier and Optum benchmarks — sources shown."
          />
          <Reveal className="mt-12">
            <RevenueLeakCalculator />
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------------------ How it works */}
      <Section id="how-it-works">
        <Container>
          <SectionHead
            eyebrow="How it works"
            title="A transparent process, not a black box"
            lead="You keep full visibility into your revenue cycle. Outsourcing the work shouldn't mean losing sight of it."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.07}>
                <Card raised className="h-full">
                  <span className="metric text-sm text-accent">{p.step}</span>
                  <h3 className="mt-3 text-lg font-600 leading-snug">{p.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{p.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------------- Services */}
      <Section className="border-t border-border bg-bg-soft">
        <Container>
          <SectionHead
            eyebrow="What we do"
            title="Twelve services covering the whole revenue cycle"
            lead="Take the whole cycle or the piece that's failing. Most practices start with denial management or AR recovery."
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.06}>
                <Link href={`/services/${s.slug}`} className="block h-full">
                  <SpotlightCard className="h-full">
                    <s.icon className="h-6 w-6 text-accent transition-transform duration-300 group-hover:scale-110" />
                    <h3 className="mt-4 text-lg font-600 leading-snug group-hover:text-accent">
                      {s.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{s.blurb}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-500 text-accent opacity-60 transition-all group-hover:gap-2.5 group-hover:opacity-100">
                      Learn more <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </SpotlightCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------ Specialties */}
      <Section>
        <Container>
          <SectionHead
            eyebrow="Specialty expertise"
            title="Your specialty bills differently. Your coders should too."
            lead="Cardiology component splits, behavioral health carve-outs, the podiatry routine foot care exclusion — general-purpose coders miss all of it. Ours are assigned by specialty."
          />
          <div className="mt-12 flex flex-wrap justify-center gap-2.5">
            {specialties.map((s) => (
              <Link
                key={s.slug}
                href={`/specialties/${s.slug}`}
                className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
              >
                <span className="mr-1.5" aria-hidden="true">{s.emoji}</span>
                {s.name}
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/specialties" variant="secondary">View all specialties</Button>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ Proof */}
      <Section className="border-t border-border bg-bg-soft">
        <Container>
          <SectionHead eyebrow="Results" title="What changed for these practices" />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {caseStudies.slice(0, 3).map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.08}>
                <Link href="/case-studies" className="group block h-full">
                  <Card className="h-full">
                    <p className="font-mono text-3xl font-700 text-accent">
                      <CountUp value={c.headlineMetric.value} />
                    </p>
                    <p className="mt-1 text-sm text-faint">{c.headlineMetric.label}</p>
                    <h3 className="mt-5 font-600 leading-snug text-ink group-hover:text-accent">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{c.specialty} · {c.location}</p>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <Card hover={false} className="h-full">
                  {t.metric && <Badge tone="positive" className="mb-4">{t.metric}</Badge>}
                  <blockquote className="text-[0.95rem] leading-relaxed text-ink-2">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <footer className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                    <Avatar name={t.name} />
                    <div>
                      <p className="text-sm font-500 text-ink">{t.name}</p>
                      <p className="text-xs text-faint">{t.role} · {t.practice}</p>
                    </div>
                  </footer>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ----------------------------------------------------------- Offer */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>Pricing</Eyebrow>
              <h2 className="mt-4 text-[clamp(1.9rem,4vw,2.8rem)] font-600 leading-[1.1]">
                {site.pricing.startingRate} of collections. You pay when we collect.
              </h2>
              <p className="mt-5 leading-relaxed text-muted">
                Pricing starts at {site.pricing.startingRate} and typically runs {site.pricing.typicalRange} of
                net collections depending on practice size, specialty and claim volume. No setup fees,
                no charge for denial appeals, and no long-term lock-in.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                For comparison: one in-house biller costs roughly{" "}
                <strong className="text-ink">$73,000</strong> a year fully loaded — before billing
                software, clearinghouse fees, training, or coverage while they&rsquo;re on leave.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/pricing">See full pricing</Button>
                <Button href="/contact" variant="secondary">Get a custom quote</Button>
              </div>
            </div>

            <Card hover={false} className="p-7 sm:p-8">
              <h3 className="text-lg font-600">Included at no additional cost</h3>
              <ul className="mt-5 space-y-3">
                {[
                  "Denial appeals and rework — always included, never billed separately",
                  "Year-end billing and compliance audit",
                  "Real-time eligibility verification",
                  "Monthly reporting and performance review",
                  "Dedicated billing specialist you can reach directly",
                  "Client portal with live claim status",
                ].map((f) => (
                  <li key={f} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-border pt-5 text-xs leading-relaxed text-faint">
                We don&rsquo;t charge separately for appeals. Charging per appeal creates an incentive to
                generate denials, which is exactly the wrong alignment.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------- FAQ */}
      <Section className="border-t border-border bg-bg-soft">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <Eyebrow>Questions</Eyebrow>
              <h2 className="mt-4 text-[clamp(1.9rem,4vw,2.6rem)] font-600 leading-[1.1]">
                Frequently asked questions
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                More detail on the{" "}
                <Link href="/faq" className="text-accent underline underline-offset-4 hover:text-accent-2">
                  full FAQ page
                </Link>
                , or ask us directly.
              </p>
              <div className="mt-7 rounded-xl border border-border bg-surface p-5">
                <p className="font-mono text-3xl font-700 text-accent">
                  {performance.onboarding.value}
                </p>
                <p className="mt-1 text-sm text-muted">{performance.onboarding.label}</p>
              </div>
            </div>
            <FAQList items={homeFaqs} />
          </div>
        </Container>
      </Section>

      <FinalCTA />
    </PageTransition>
  );
}
