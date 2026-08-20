import Link from "next/link";
import { Container, Section, SectionHead } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd, breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { states } from "@/lib/content/locations";
import { pageMeta } from "@/lib/seo";
import { PageTransition } from "@/components/motion/ViewTransition";

export const metadata = pageMeta({
  title: "Medical Billing Services by State",
  description:
    "Medical billing and revenue cycle management across all 50 states. Each state page covers its Medicaid program, Medicare Administrative Contractor and dominant regional payers.",
  path: "/locations",
  keywords: [
    "medical billing services by state",
    "medical billing company near me",
    "local medical billing services",
    "state medicaid billing",
    "medicare administrative contractor by state",
    "medical billing all 50 states",
    "medical billing services texas",
    "medical billing services california",
    "medical billing services florida",
    "medical billing services new york",
  ],
});

const crumbs = [{ name: "Home", path: "/" }, { name: "Locations", path: "/locations" }];

export default function LocationsPage() {
  return (
    <PageTransition>
      <JsonLd data={[
        breadcrumbSchema(crumbs),
        itemListSchema(states.map((s) => ({ name: s.name, path: `/locations/${s.slug}` })), "States served"),
      ]} />
      <Breadcrumbs items={crumbs} />

      <Section className="scroll-rise pt-6">
        <Container>
          <SectionHead as="h1"
            eyebrow="Nationwide coverage"
            title="Medical billing services in all 50 states"
            lead="Billing is not uniform across state lines. Medicaid programs run under different names and rules, Part B claims are adjudicated by different Medicare contractors, and commercial mix varies sharply by region."
          />

          <div className="mt-16 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {states.map((s) => (
              <Link
                key={s.slug}
                href={`/locations/${s.slug}`}
                transitionTypes={["nav-forward"]}
                className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-surface px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:bg-surface-2"
              >
                <span className="font-500 text-ink group-hover:text-accent">{s.name}</span>
                <span className="font-mono text-xs text-faint">{s.abbr}</span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCTA />
    </PageTransition>
  );
}
