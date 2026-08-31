import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Section, SectionHead, Card } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd, breadcrumbSchema, itemListSchema, webPageSchema, ENTITIES } from "@/lib/schema";
import { cptCodes, cptCategories } from "@/lib/content/cpt-codes";
import { pageMeta } from "@/lib/seo";
import { LAST_UPDATED, formatDate } from "@/lib/utils";
import { PageTransition } from "@/components/motion/ViewTransition";

export const metadata = pageMeta({
  title: "CPT Codes Explained — Billing and Documentation",
  description:
    "Plain-English guides to the CPT codes that practices bill daily — the unit rules, time thresholds and documentation that decide whether each one is paid.",
  path: "/cpt-codes",
  keywords: [
    "cpt codes",
    "cpt code lookup",
    "cpt billing rules",
    "cpt documentation requirements",
    "medical billing cpt codes",
  ],
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "CPT Codes", path: "/cpt-codes" },
];

export default function CptCodesPage() {
  return (
    <PageTransition>
      <JsonLd data={[
        breadcrumbSchema(crumbs),
        itemListSchema(
          cptCodes.map((c) => ({ name: `CPT ${c.code}`, path: `/cpt-codes/${c.code}` })),
          "CPT procedure codes",
        ),
        webPageSchema({
          name: "CPT Codes Explained",
          description:
            "Guides to commonly billed CPT codes, covering the unit rules, time thresholds and documentation that decide payment.",
          path: "/cpt-codes",
          mentions: [ENTITIES.cpt, ENTITIES.medicalCoding, ENTITIES.medicalBilling],
          lastReviewed: LAST_UPDATED,
        }),
      ]} />
      <Breadcrumbs items={crumbs} />

      <Section className="scroll-rise pt-6">
        <Container>
          <SectionHead as="h1"
            eyebrow="Free reference"
            title="CPT codes explained"
            lead="Most CPT references restate the descriptor, which tells you what a code is and nothing about whether it will be paid. These cover the unit rules, the time thresholds and the documentation each code actually turns on — and the errors that produce the denial."
          />
          <p className="mt-6 text-center text-sm text-faint">
            {cptCodes.length} codes · Last updated {formatDate(LAST_UPDATED)}
          </p>

          {/* CPT descriptors are copyrighted by the AMA and are deliberately
              not reproduced anywhere on this site. Saying so is both honest
              and useful: it tells a reader why these pages read differently
              from every other CPT reference they have opened. */}
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-muted">
            CPT is a code set maintained and copyrighted by the American Medical Association.
            These guides state the codes and explain how they are billed in our own words;
            they do not reproduce the official descriptors.
          </p>

          <div className="mx-auto mt-14 max-w-4xl space-y-12">
            {cptCategories.map((cat) => {
              const group = cptCodes.filter((c) => c.category === cat);
              if (!group.length) return null;
              return (
                <div key={cat}>
                  <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-faint">
                    {cat}
                  </h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {group.map((c) => (
                      <Link key={c.code} href={`/cpt-codes/${c.code}`} className="group">
                        <Card className="h-full">
                          <div className="flex items-start justify-between gap-3">
                            <span className="font-mono text-lg font-700 text-accent">
                              CPT {c.code}
                            </span>
                            <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-accent" />
                          </div>
                          <p className="mt-2 text-sm leading-snug text-ink">{c.shortName}</p>
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
