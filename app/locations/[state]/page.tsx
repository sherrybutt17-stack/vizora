import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Building2, Landmark, MapPin } from "lucide-react";
import { Button, Card, Container, Section, SectionHead, Eyebrow, DataTable } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Reveal } from "@/components/motion";
import { FAQList } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { RelatedContent } from "@/components/sections/RelatedContent";
import { CitedFigure } from "@/components/sections/CitedFigure";
import { JsonLd, breadcrumbSchema, faqSchema, webPageSchema, serviceSchema, ENTITIES } from "@/lib/schema";
import { getState, stateSlugs, nearbyStates, regionOf } from "@/lib/content/locations";
import { specialties } from "@/lib/content/specialties";
import { services } from "@/lib/content/services";
import { industry } from "@/lib/content/stats";
import { pageMeta } from "@/lib/seo";
import { LAST_UPDATED, formatDate } from "@/lib/utils";
import { PageTransition } from "@/components/motion/ViewTransition";

export function generateStaticParams() {
  return stateSlugs.map((state) => ({ state }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const s = getState(state);
  if (!s) return {};
  return pageMeta({
    title: `Medical Billing Services in ${s.name}`,
    description: `Medical billing and RCM for ${s.name} practices — ${s.medicaid}, ${s.mac} (Jurisdiction ${s.jurisdiction}) and the state's main commercial payers.`,
    path: `/locations/${s.slug}`,
    keywords: [
      `medical billing services ${s.name.toLowerCase()}`,
      `medical billing company ${s.name.toLowerCase()}`,
      `medical billing companies in ${s.name.toLowerCase()}`,
      `outsourced medical billing ${s.name.toLowerCase()}`,
      `medical coding services ${s.name.toLowerCase()}`,
      `revenue cycle management ${s.name.toLowerCase()}`,
      `${s.medicaid.toLowerCase()} billing`,
      `${s.medicaid.toLowerCase()} claims`,
      `${s.mac.toLowerCase()} jurisdiction ${s.jurisdiction.toLowerCase()}`,
      `provider credentialing ${s.name.toLowerCase()}`,
      ...s.metros.slice(0, 3).map((m) => `medical billing ${m.toLowerCase()}`),
    ],
  });
}

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const s = getState(state);
  if (!s) notFound();

  const nearby = nearbyStates(s.slug, 8);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Locations", path: "/locations" },
    { name: s.name, path: `/locations/${s.slug}` },
  ];

  // Prose composed from real, state-varying facts rather than a swapped noun.
  const modelPhrase =
    s.medicaidModel === "managed-care"
      ? "through its contracted managed care plans"
      : s.medicaidModel === "fee-for-service"
        ? "on a fee-for-service basis, adjudicated by the state rather than by competing plans"
        : "under a mixed model where routing depends on the member's eligibility category";

  const expansionPhrase = s.expansion
    ? `Because ${s.name} expanded Medicaid, a larger share of adult volume carries coverage — which shifts the billing burden toward Medicaid plan rules rather than toward self-pay collection.`
    : `Because ${s.name} has not expanded Medicaid, practices here carry a higher share of uninsured and self-pay patients than neighbouring expansion states, which makes point-of-service collection and financial counselling a larger part of the revenue cycle.`;

  const modelImplication =
    s.medicaidModel === "managed-care"
      ? `${s.medicaid} claims are adjudicated by contracted health plans, each maintaining its own payer ID, authorization criteria and fee schedule. Submitting to the state instead of the member's assigned plan is one of the most common Medicaid denials in ${s.name}.`
      : s.medicaidModel === "fee-for-service"
        ? `${s.medicaid} is administered largely fee-for-service, which means claims are adjudicated by the state rather than by competing plans. That simplifies routing considerably, but it also means state policy changes hit every Medicaid claim at once rather than phasing in plan by plan.`
        : `${s.medicaid} operates a mixed model, with some populations in managed care and others remaining fee-for-service. Routing therefore depends on the member's eligibility category rather than on the state alone — and verifying which applies before the visit is what prevents the denial.`;

  const faqs = [
    {
      question: `Do you bill ${s.medicaid}?`,
      answer: `Yes. ${s.medicaid} is ${s.name}'s Medicaid program. ${modelImplication} We maintain requirements at that level rather than treating Medicaid as a single generic payer, which is where most Medicaid denials originate.`,
    },
    {
      question: `Which Medicare contractor processes ${s.name} claims?`,
      answer: `${s.name} Part B claims are adjudicated by ${s.mac} under Jurisdiction ${s.jurisdiction}. This matters more than most practices realize: each MAC issues its own Local Coverage Determinations, so a service payable in one jurisdiction can be denied for medical necessity in another with identical documentation.`,
    },
    {
      question: `Which commercial payers matter most in ${s.name}?`,
      answer: `The dominant commercial payers in ${s.name} include ${s.payers.slice(0, -1).join(", ")} and ${s.payers[s.payers.length - 1]}. Regional payers often carry the largest share of a local practice's volume while being the least standardized, which makes payer-specific claim edits more valuable here than generic scrubbing.`,
    },
    {
      question: `Has ${s.name} expanded Medicaid, and does that affect our billing?`,
      answer: `${s.name} ${s.expansion ? "has expanded" : "has not expanded"} Medicaid. ${expansionPhrase} It also changes which denials dominate: expansion states see more Medicaid plan authorization denials, while non-expansion states carry more uncompensated care and patient-responsibility balances that never reach a payer at all.`,
    },
    {
      question: `Do you work with practices outside major ${s.name} metros?`,
      answer: `Yes. We work with practices across ${s.name}, from ${s.metros.slice(0, 2).join(" and ")} through rural and independent practices. Billing is performed remotely, so location within the state does not affect service — though rural practices often have a different payer mix worth accounting for.`,
    },
  ];

  const topSpecialties = specialties.slice(0, 9);
  const topServices = services.slice(0, 6);

  return (
    <PageTransition>
      <JsonLd data={[
        breadcrumbSchema(crumbs),
        faqSchema(faqs),
        serviceSchema({
          name: `Medical Billing Services in ${s.name}`,
          summary: `Medical billing and revenue cycle management for practices in ${s.name}, including ${s.medicaid} and ${s.mac} Jurisdiction ${s.jurisdiction} claims.`,
          slug: `../locations/${s.slug}`,
        }),
        webPageSchema({
          name: `Medical Billing Services in ${s.name}`,
          description: `Medical billing for ${s.name} practices: ${s.medicaid}, ${s.mac} (Jurisdiction ${s.jurisdiction}) and the state's dominant commercial payers.`,
          path: `/locations/${s.slug}`,
          about: [ENTITIES.medicalBilling],
          mentions: [ENTITIES.medicaid, ENTITIES.medicare, ENTITIES.rcm],
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
              <Eyebrow>
                <MapPin className="mr-1 inline h-3 w-3" />
                {s.name} · {s.abbr}
              </Eyebrow>
              <h1 className="mt-4 text-[clamp(2.1rem,4.8vw,3.4rem)] font-600 leading-[1.06]">
                Medical Billing Services in {s.name}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
                {s.note}
              </p>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted">
                Billing here means working {s.medicaid} {modelPhrase} alongside {s.mac} for
                Medicare Part B, plus a commercial mix led by {s.payers[0]}. {expansionPhrase}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact" size="lg">
                  Get a free {s.name} billing audit <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Reveal delay={0.1}>
              <Card hover={false} className="p-6">
                <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-faint">
                  {s.name} payer landscape
                </h2>
                <dl className="mt-5 space-y-4 text-sm">
                  <div className="flex gap-3">
                    <Landmark className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <div>
                      <dt className="font-500 text-ink">Medicaid program</dt>
                      <dd className="mt-0.5 text-muted">{s.medicaid}</dd>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <div>
                      <dt className="font-500 text-ink">Medicare contractor</dt>
                      <dd className="mt-0.5 text-muted">{s.mac} — Jurisdiction {s.jurisdiction}</dd>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <div>
                      <dt className="font-500 text-ink">Primary metros</dt>
                      <dd className="mt-0.5 text-muted">{s.metros.join(", ")}</dd>
                    </div>
                  </div>
                </dl>
              </Card>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Payers */}
      <Section className="border-t border-border bg-bg-soft">
        <Container>
          <SectionHead
            align="left"
            eyebrow="Commercial payers"
            title={`Who pays claims in ${s.name}`}
            lead="Regional payers frequently carry the largest share of a local practice's volume while being the least standardized. Payer-specific edits matter more here than generic claim scrubbing."
          />
          <Reveal className="mt-10">
            <DataTable
              headers={["Payer type", "In " + s.name]}
              rows={[
                ["Medicaid program", s.medicaid],
                ["Medicaid delivery model", s.medicaidModel === "managed-care" ? "Comprehensive managed care" : s.medicaidModel === "fee-for-service" ? "Predominantly fee-for-service" : "Mixed — varies by eligibility category"],
                ["Medicaid expansion", s.expansion ? "Expanded" : "Not expanded"],
                ["Medicare Part B", `${s.mac} (Jurisdiction ${s.jurisdiction})`],
                ["Dominant commercial", s.payers.join(", ")],
                ["Primary metros served", s.metros.join(", ")],
              ]}
            />
          </Reveal>
        </Container>
      </Section>

      {/* Why MAC matters */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <Eyebrow>Why jurisdiction matters</Eyebrow>
              <h2 className="mt-4 text-[clamp(1.8rem,3.6vw,2.5rem)] font-600 leading-[1.1]">
                The same claim can pay in one state and deny in another
              </h2>
              <p className="mt-5 leading-relaxed text-muted">
                Medicare Part B claims in {s.name} are processed by {s.mac} under Jurisdiction{" "}
                {s.jurisdiction}. Each contractor publishes its own Local Coverage Determinations,
                which means medical necessity criteria for the same procedure genuinely differ across
                jurisdiction lines.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                Practices that expand across state lines, or that hire billing help unfamiliar with
                their jurisdiction, tend to discover this through denials rather than in advance. It
                is entirely avoidable, but only if someone is tracking the right contractor&rsquo;s policies.
              </p>
              <h3 className="mt-8 text-lg font-600">How {s.medicaid} actually pays</h3>
              <p className="mt-3 leading-relaxed text-muted">{modelImplication}</p>
              <h3 className="mt-8 text-lg font-600">
                What {s.expansion ? "expansion" : "non-expansion"} means for your AR
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{expansionPhrase}</p>
            </div>
            <div className="space-y-4">
              <CitedFigure stat={industry.topDenialReason} />
              <CitedFigure stat={industry.overturnRate} />
            </div>
          </div>
        </Container>
      </Section>

      {/* Specialties */}
      <Section className="border-t border-border bg-bg-soft">
        <Container>
          <SectionHead
            align="left"
            eyebrow="Specialty coverage"
            title={`Specialties we bill for in ${s.name}`}
          />
          <div className="mt-10 flex flex-wrap gap-2.5">
            {topSpecialties.map((sp) => (
              <Link
                key={sp.slug}
                href={`/specialties/${sp.slug}`}
                className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
              >
                <span className="mr-1.5" aria-hidden="true">{sp.emoji}</span>
                {sp.name}
              </Link>
            ))}
            <Link
              href="/specialties"
              className="rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-500 text-accent transition-all hover:-translate-y-0.5"
            >
              All specialties →
            </Link>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <Eyebrow>Questions</Eyebrow>
              <h2 className="mt-4 text-[clamp(1.8rem,3.6vw,2.4rem)] font-600 leading-[1.1]">
                Billing in {s.name}
              </h2>
              <p className="mt-4 text-sm text-faint">Last updated {formatDate(LAST_UPDATED)}</p>
            </div>
            <FAQList items={faqs} />
          </div>
        </Container>
      </Section>

      <RelatedContent
        title={`Services for ${s.name} practices`}
        links={topServices.map((r) => ({ label: r.name, href: `/services/${r.slug}`, description: r.blurb }))}
      />

      {/* Regional cross-links. Neighbouring states share MAC jurisdictions and
          regional payers far more often than distant ones, so this is a
          genuinely relevant next click rather than link padding. */}
      {nearby.length > 0 && (
        <Section className="border-t border-border py-14">
          <Container>
            <Eyebrow>Nearby markets</Eyebrow>
            <h2 className="mt-3 text-xl font-600">
              Medical billing in other {regionOf(s.abbr)} states
            </h2>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {nearby.map((n) => (
                <Link
                  key={n.slug}
                  href={`/locations/${n.slug}`}
                  className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
                >
                  {n.name}
                  <span className="ml-2 text-xs text-faint">{n.jurisdiction}</span>
                </Link>
              ))}
              <Link
                href="/locations"
                className="rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-500 text-accent transition-all hover:-translate-y-0.5"
              >
                All 50 states →
              </Link>
            </div>

            <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
              Unsure what any of this means? {" "}
              <Link href="/glossary/credentialing" className="text-accent underline underline-offset-4 hover:text-accent-2">Credentialing</Link>,{" "}
              <Link href="/glossary/timely-filing" className="text-accent underline underline-offset-4 hover:text-accent-2">timely filing</Link> and{" "}
              <Link href="/glossary/medical-necessity" className="text-accent underline underline-offset-4 hover:text-accent-2">medical necessity</Link>{" "}
              are the three terms that decide most {s.name} denials — each is defined in the{" "}
              <Link href="/glossary" className="text-accent underline underline-offset-4 hover:text-accent-2">glossary</Link>.
            </p>
          </Container>
        </Section>
      )}

      <FinalCTA
        title={`Get a free billing audit for your ${s.name} practice`}
        lead={`We'll review your denial rate, AR aging and clean claim rate — including how ${s.medicaid} and ${s.mac} claims are performing specifically.`}
      />
    </PageTransition>
  );
}
