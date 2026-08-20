import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section, SectionHead, Badge } from "@/components/ui";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Reveal } from "@/components/motion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd, breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { services } from "@/lib/content/services";
import { pageMeta } from "@/lib/seo";
import { PageTransition } from "@/components/motion/ViewTransition";

export const metadata = pageMeta({
  title: "Medical Billing & RCM Services",
  description:
    "Twelve revenue cycle services covering coding, claims, denials, AR recovery, credentialing, prior authorization and analytics. Take the whole cycle or the piece that's failing.",
  path: "/services",
  keywords: [
    "medical billing services",
    "revenue cycle management services",
    "RCM services",
    "medical coding services",
    "denial management services",
    "AR recovery services",
    "provider credentialing services",
    "prior authorization services",
    "eligibility verification services",
    "patient collections services",
    "practice analytics healthcare",
    "outsourced revenue cycle services",
  ],
});

const crumbs = [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }];

export default function ServicesPage() {
  return (
    <PageTransition>
      <JsonLd data={[
        breadcrumbSchema(crumbs),
        itemListSchema(services.map((s) => ({ name: s.name, path: `/services/${s.slug}` })), "Vizora services"),
      ]} />
      <Breadcrumbs items={crumbs} />

      <Section className="pt-6">
        <Container>
          <SectionHead as="h1"
            eyebrow="Complete revenue cycle solutions"
            title="Everything between the encounter and the payment"
            lead="Revenue leaks at the seams — between the front desk and coding, between submission and follow-up, between a denial and the appeal nobody filed. These twelve services cover all of it."
          />

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.06}>
                <Link href={`/services/${s.slug}`} transitionTypes={["nav-forward"]} className="block h-full">
                  <SpotlightCard className="flex h-full flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <s.icon className="h-6 w-6 text-accent" />
                      <span className="font-mono text-xs text-faint">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h2 className="mt-4 text-lg font-600 leading-snug group-hover:text-accent">
                      {s.name}
                    </h2>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{s.blurb}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-500 text-accent">
                      Explore service
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </SpotlightCard>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-16 rounded-2xl border border-border bg-surface p-8 text-center sm:p-10">
              <Badge tone="accent" className="mb-4">Not sure where to start?</Badge>
              <h2 className="text-2xl font-600">Most practices start with what&rsquo;s bleeding</h2>
              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted">
                If your denial rate is above 10%, start with{" "}
                <Link href="/services/denial-management" className="text-accent underline underline-offset-4">denial management</Link>.
                If AR is aging past 90 days, start with{" "}
                <Link href="/services/ar-management" className="text-accent underline underline-offset-4">AR recovery</Link>.
                If new providers can&rsquo;t bill, start with{" "}
                <Link href="/services/credentialing" className="text-accent underline underline-offset-4">credentialing</Link>.
                A free audit tells you which one applies.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <FinalCTA />
    </PageTransition>
  );
}
