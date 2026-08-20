import { ShieldCheck } from "lucide-react";
import { Card, Container, Section, SectionHead, Badge, Eyebrow } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Reveal } from "@/components/motion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { certifications } from "@/lib/content/site";
import { pageMeta } from "@/lib/seo";
import { PageTransition } from "@/components/motion/ViewTransition";

export const metadata = pageMeta({
  title: "About Vizora",
  description:
    "Vizora is a medical billing and revenue cycle management company built to help healthcare practices reduce denials, recover aging AR and improve revenue visibility.",
  path: "/about",
  keywords: [
    "about vizora",
    "medical billing company",
    "healthcare RCM company",
    "certified medical coders",
    "certified medical billing company",
    "HIPAA compliant billing company",
  ],
});

const crumbs = [{ name: "Home", path: "/" }, { name: "About", path: "/about" }];

const VALUES = [
  { n: "01", title: "Accuracy", body: "Precision in every claim, every code, every time. Coders are assigned by specialty and audited on a sample basis rather than trusted by default." },
  { n: "02", title: "Transparency", body: "You keep portal access and monthly reporting showing exactly what was submitted, paid, denied and appealed. Outsourcing the work shouldn't mean losing sight of it." },
  { n: "03", title: "Partnership", body: "We charge a percentage of collections, so we only do well when you do. We don't bill separately for appeals, because that would reward generating denials." },
  { n: "04", title: "Compliance", body: "HIPAA-conscious operations, executed BAAs, encryption in transit and at rest, and role-based access limited to the minimum necessary." },
];

const TEAM_ROLES = [
  { role: "Certified coders", body: "Certified coders assigned by specialty rather than pooled across a queue." },
  { role: "AR and denial specialists", body: "Full-time payer follow-up and appeals, working queues by recoverability rather than by whatever surfaces first." },
  { role: "Credentialing coordinators", body: "Managing applications, primary source verification, CAQH maintenance and re-credentialing deadlines." },
  { role: "Revenue cycle analysts", body: "Aggregating denials by reason and payer, and translating the patterns into process changes upstream." },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Breadcrumbs items={crumbs} />

      <Section className="pt-6">
        <Container>
          <SectionHead as="h1"
            eyebrow="About us"
            title="Built for practices losing revenue they already earned"
            lead="Vizora exists because most practices are not losing money on the care they deliver — they're losing it in the gap between delivering care and getting paid for it."
          />
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>Our mission</Eyebrow>
              <h2 className="mt-4 text-2xl font-600 leading-snug">
                Providers should focus on patient care, not payer policy
              </h2>
              <div className="mt-5 space-y-4 leading-relaxed text-muted">
                <p>
                  A denied claim is rarely a clinical failure. It is usually a coverage that changed
                  without anyone checking, an authorization requirement discovered too late, or a
                  modifier convention that differs between two payers for no clinical reason at all.
                </p>
                <p>
                  None of that requires a physician&rsquo;s judgment, and none of it should consume a
                  physician&rsquo;s time. That is the work we take on.
                </p>
              </div>
            </div>
            <div>
              <Eyebrow>What we do</Eyebrow>
              <h2 className="mt-4 text-2xl font-600 leading-snug">
                The full revenue cycle, or the part that&rsquo;s failing
              </h2>
              <div className="mt-5 space-y-4 leading-relaxed text-muted">
                <p>
                  We provide medical billing and coding, credentialing, denial management, AR
                  recovery, eligibility verification, prior authorization and analytics — across 25
                  specialties, in all 50 states.
                </p>
                <p>
                  Some practices hand us the entire revenue cycle. Others start with the single
                  thing that is bleeding: an aged AR backlog, a denial rate that will not come down,
                  or new providers who cannot bill because credentialing stalled.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-bg-soft">
        <Container>
          <SectionHead align="left" eyebrow="How we work" title="Our operating principles" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <Reveal key={v.n} delay={(i % 2) * 0.06}>
                <Card className="h-full">
                  <span className="font-mono text-sm font-700 text-accent">{v.n}</span>
                  <h3 className="mt-3 text-lg font-600">{v.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{v.body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHead
            align="left"
            eyebrow="Our team"
            title="Who actually works your account"
            lead="Billing is not one role. These are the functions that touch your revenue cycle."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {TEAM_ROLES.map((t) => (
              <Card key={t.role} hover={false} className="h-full">
                <h3 className="font-600 text-ink">{t.role}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-bg-soft">
        <Container>
          <SectionHead
            align="left"
            eyebrow="Compliance"
            title="Certifications and security"
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((c) => (
              <div key={c.label} className="rounded-xl border border-border bg-surface p-5">
                <ShieldCheck className="h-5 w-5 text-accent" />
                <p className="mt-3 font-500 text-ink">{c.label}</p>
                <p className="mt-1 text-xs leading-snug text-muted">{c.detail}</p>
              </div>
            ))}
          </div>

        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Badge tone="accent">Compliance first</Badge>
            <h2 className="mt-6 text-[clamp(1.8rem,3.6vw,2.5rem)] font-600 leading-tight">
              A Business Associate Agreement, before anything else
            </h2>
            <p className="mt-5 leading-relaxed text-muted">
              Any vendor handling protected health information on your behalf is a business
              associate under HIPAA, and the BAA is what establishes their obligations. We execute
              ours during onboarding as a matter of course — and you should require one from every
              vendor who touches your data, not only from us.
            </p>
          </div>
        </Container>
      </Section>

      <FinalCTA />
    </PageTransition>
  );
}
