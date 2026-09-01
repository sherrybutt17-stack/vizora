import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Section, SectionHead, Card } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd, breadcrumbSchema, itemListSchema, webPageSchema, ENTITIES } from "@/lib/schema";
import { modifiers, modifierCategories } from "@/lib/content/modifiers";
import { pageMeta } from "@/lib/seo";
import { lastUpdated, formatDate } from "@/lib/utils";
import { PageTransition } from "@/components/motion/ViewTransition";

export const metadata = pageMeta({
  title: "CPT Modifiers Explained — When to Use Each One",
  description:
    "Plain-English guides to the CPT and HCPCS modifiers that decide whether claims pay — what each means, when it applies, and the misuse cases that cause denials.",
  path: "/modifiers",
  keywords: [
    "cpt modifiers",
    "medical billing modifiers",
    "modifier 25",
    "modifier 59",
    "when to use cpt modifiers",
  ],
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Modifiers", path: "/modifiers" },
];

export default function ModifiersPage() {
  return (
    <PageTransition>
      <JsonLd data={[
        breadcrumbSchema(crumbs),
        itemListSchema(
          modifiers.map((m) => ({ name: `Modifier ${m.code}`, path: `/modifiers/${m.code.toLowerCase()}` })),
          "CPT and HCPCS modifiers",
        ),
        webPageSchema({
          name: "CPT Modifiers Explained",
          description:
            "Guides to the CPT and HCPCS modifiers that decide whether claims pay, including the misuse cases that cause denials.",
          path: "/modifiers",
          mentions: [ENTITIES.medicalBilling, ENTITIES.rcm],
          lastReviewed: lastUpdated("modifiersHub"),
        }),
      ]} />
      <Breadcrumbs items={crumbs} />

      <Section className="scroll-rise pt-6">
        <Container>
          <SectionHead as="h1"
            eyebrow="Free reference"
            title="CPT modifiers explained"
            lead="A modifier is two characters that change how a claim adjudicates. Most references list only when each one applies — the half that is easy to guess. These also cover the misuse cases, which is where the denials and the audit findings actually come from."
          />
          <p className="mt-6 text-center text-sm text-faint">
            {modifiers.length} modifiers · Last updated {formatDate(lastUpdated("modifiersHub"))}
          </p>

          <div className="mx-auto mt-14 max-w-4xl space-y-12">
            {modifierCategories.map((cat) => {
              const group = modifiers.filter((m) => m.category === cat);
              if (!group.length) return null;
              return (
                <div key={cat}>
                  <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-faint">
                    {cat}
                  </h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {group.map((m) => (
                      <Link key={m.code} href={`/modifiers/${m.code.toLowerCase()}`} className="group">
                        <Card className="h-full">
                          <div className="flex items-start justify-between gap-3">
                            <span className="font-mono text-lg font-700 text-accent">
                              Modifier {m.code}
                            </span>
                            <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-accent" />
                          </div>
                          <p className="mt-2 text-sm leading-snug text-ink">{m.name}</p>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <FinalCTA />
    </PageTransition>
  );
}
