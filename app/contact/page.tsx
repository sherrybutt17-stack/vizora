import { Clock, Mail, Phone, ShieldCheck } from "lucide-react";
import { Card, Container, Section, SectionHead, Badge, Eyebrow } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ContactForm } from "@/components/sections/ContactForm";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/content/site";
import { pageMeta } from "@/lib/seo";
import { PageTransition } from "@/components/motion/ViewTransition";

export const metadata = pageMeta({
  title: "Contact Us — Request a Free Billing Audit",
  description:
    "Request a free medical billing audit. We review your denial rate, AR aging and clean claim rate against industry benchmarks, and tell you what we find either way.",
  path: "/contact",
  keywords: [
    "free medical billing audit",
    "medical billing consultation",
    "contact medical billing company",
    "medical billing quote",
    "RCM assessment",
  ],
});

const crumbs = [{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }];

const AUDIT_INCLUDES = [
  "Denial rate benchmarked against MGMA and Premier data",
  "AR aging analysis, including claims near filing deadlines",
  "Clean claim rate and top rejection reasons",
  "Coding sample reviewed for undercoding and audit exposure",
  "Payer-level performance comparison",
  "A written summary of what we found — yours regardless",
];

export default function ContactPage() {
  return (
    <PageTransition>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Breadcrumbs items={crumbs} />

      <Section className="scroll-rise pt-6">
        <Container>
          <SectionHead as="h1"
            eyebrow="Free billing audit"
            title="Find out what you're leaving on the table"
            lead="We review your actual numbers against published benchmarks and tell you what we find — whether or not you end up working with us."
          />

          <div className="mt-16 grid min-w-0 gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
            <Card hover={false} className="p-7 sm:p-9">
              <h2 className="text-xl font-600">Request your audit</h2>
              <p className="mt-2 text-sm text-muted">
                Takes about two minutes. We respond within one business day.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </Card>

            <div className="min-w-0 space-y-6">
              <Card hover={false}>
                <Eyebrow>What the audit covers</Eyebrow>
                <ul className="mt-4 space-y-2.5">
                  {AUDIT_INCLUDES.map((a) => (
                    <li key={a} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {a}
                    </li>
                  ))}
                </ul>
                <Badge tone="accent" className="mt-5">No sales pitch</Badge>
              </Card>

              <Card hover={false}>
                <Eyebrow>Reach us directly</Eyebrow>
                <div className="mt-4 space-y-3 text-sm">
                  <a href={site.phoneHref} data-tap className="flex items-center gap-3 text-muted transition-colors hover:text-accent">
                    <Phone className="h-4 w-4 shrink-0 text-accent" /> {site.phone}
                  </a>
                  <a href={`mailto:${site.email}`} data-tap className="flex items-center gap-3 text-muted transition-colors hover:text-accent">
                    <Mail className="h-4 w-4 shrink-0 text-accent" /> {site.email}
                  </a>
                  <p className="flex items-center gap-3 text-muted">
                    <Clock className="h-4 w-4 shrink-0 text-accent" /> {site.hours}
                  </p>
                </div>
              </Card>

              <Card hover={false}>
                <div className="flex gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <h3 className="font-600 text-ink">HIPAA compliance</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      Please don&rsquo;t include protected health information in this form. Once a
                      Business Associate Agreement is executed, we&rsquo;ll share a secure channel for
                      anything containing PHI.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </PageTransition>
  );
}
