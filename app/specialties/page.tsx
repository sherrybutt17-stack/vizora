import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section, SectionHead } from "@/components/ui";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Reveal } from "@/components/motion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd, breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { specialties } from "@/lib/content/specialties";
import { pageMeta } from "@/lib/seo";
import { PageTransition } from "@/components/motion/ViewTransition";

export const metadata = pageMeta({
  title: "Medical Billing by Specialty",
  description:
    "Specialty-specific medical billing across 25 specialties — cardiology, dermatology, orthopedics, behavioral health and more. Each with its own codes, denial patterns and payer rules.",
  path: "/specialties",
  keywords: [
    "specialty medical billing",
    "medical billing by specialty",
    "cardiology billing services",
    "dermatology billing services",
    "orthopedic billing services",
    "mental health billing services",
    "anesthesia billing services",
    "OBGYN billing services",
    "pain management billing",
    "physical therapy billing services",
    "specialty specific medical coding",
  ],
});

const crumbs = [{ name: "Home", path: "/" }, { name: "Specialties", path: "/specialties" }];

export default function SpecialtiesPage() {
  return (
    <PageTransition>
      <JsonLd data={[
        breadcrumbSchema(crumbs),
        itemListSchema(specialties.map((s) => ({ name: s.name, path: `/specialties/${s.slug}` })), "Specialties served"),
      ]} />
      <Breadcrumbs items={crumbs} />

      <Section className="pt-6">
        <Container>
          <SectionHead as="h1"
            eyebrow="Specialty expertise"
            title="Every specialty fails differently"
            lead="Cardiology loses money on component splits. Behavioral health loses it to credentialing delays. Podiatry loses it to the routine foot care exclusion. Generic billing catches none of it."
          />

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {specialties.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.05}>
                <Link href={`/specialties/${s.slug}`} prefetch transitionTypes={["nav-forward"]} className="block h-full">
                  <SpotlightCard className="flex h-full flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-2xl" aria-hidden="true">{s.emoji}</span>
                      <span className="font-mono text-xs text-faint">
                        {s.benchmarks[0].value} denials
                      </span>
                    </div>
                    <h2 className="mt-4 text-lg font-600 leading-snug group-hover:text-accent">
                      {s.name}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.blurb}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-500 text-accent">
                      View details
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </SpotlightCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCTA
        title="Don't see your specialty?"
        lead="Tell us what you practice and we'll walk you through the billing challenges specific to it."
        cta="Talk to a billing specialist"
      />
    </PageTransition>
  );
}
