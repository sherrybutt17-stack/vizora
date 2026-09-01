import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { Container, Section, SectionHead, Eyebrow, Card } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AnswerBlock } from "@/components/sections/AnswerBlock";
import { FinalCTA } from "@/components/sections/FinalCTA";
import {
  JsonLd, breadcrumbSchema, definedTermSetSchema, webPageSchema, ENTITIES,
} from "@/lib/schema";
import { glossary, glossaryCategories, termsInCategory } from "@/lib/content/glossary";
import { pageMeta } from "@/lib/seo";
import { lastUpdated, formatDate } from "@/lib/utils";
import { PageTransition } from "@/components/motion/ViewTransition";

export const metadata = pageMeta({
  title: "Medical Billing Glossary: Terms and Codes",
  description:
    "Plain-English definitions for medical billing and revenue cycle terminology: clean claim rate, days in AR, CARC and RARC codes, prior authorization, net collection rate, timely filing and more.",
  path: "/glossary",
  keywords: [
    "medical billing glossary", "medical billing terms", "revenue cycle terminology",
    "medical billing definitions", "RCM glossary", "healthcare billing terms explained",
    "what is a clean claim", "what is days in AR", "medical billing terminology list",
  ],
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Glossary", path: "/glossary" },
];

export default function GlossaryPage() {
  return (
    <PageTransition>
      <JsonLd data={[
        breadcrumbSchema(crumbs),
        definedTermSetSchema(glossary),
        webPageSchema({
          name: "Medical Billing Glossary",
          description:
            "Definitions of medical billing, coding, denial and revenue cycle terminology.",
          path: "/glossary",
          about: [ENTITIES.medicalBilling, ENTITIES.rcm],
          mentions: [ENTITIES.cpt, ENTITIES.icd10, ENTITIES.medicalCoding],
          lastReviewed: lastUpdated("glossaryHub"),
          speakableSelectors: ["[data-answer]"],
        }),
      ]} />
      <Breadcrumbs items={crumbs} />

      <Section className="scroll-rise pt-4">
        <Container>
          <SectionHead as="h1"
            eyebrow="Reference"
            title="Medical billing glossary"
            lead={`${glossary.length} terms from claims, coding, denials, financial metrics, payer mechanics and compliance — defined in plain English, with the operational detail that actually matters.`}
          />

          <AnswerBlock className="mx-auto mt-10 max-w-3xl" question="Why this exists">
            Medical billing vocabulary is unusually treacherous because near-synonyms carry
            materially different consequences. A rejection and a denial are not the same
            thing and do not have the same remedy. A contractual adjustment and a write-off
            look identical in most reports and mean opposite things. Every definition here
            leads with the distinction that matters.
          </AnswerBlock>

          <p className="mt-6 text-center text-sm text-faint">
            Last reviewed {formatDate(lastUpdated("glossaryHub"))}
          </p>
        </Container>
      </Section>

      {glossaryCategories.map((cat) => {
        const terms = termsInCategory(cat.id);
        if (!terms.length) return null;
        return (
          <Section key={cat.id} className="scroll-rise border-t border-border py-14">
            <Container>
              <Eyebrow>{cat.title}</Eyebrow>
              <p className="mt-3 max-w-2xl text-muted">{cat.blurb}</p>
              <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {terms.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/glossary/${t.slug}`}
                    transitionTypes={["nav-forward"]}
                    className="group rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-surface-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-600 text-ink group-hover:text-accent">{t.term}</h3>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-accent" />
                    </div>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{t.answer}</p>
                  </Link>
                ))}
              </div>
            </Container>
          </Section>
        );
      })}

      <Section className="scroll-rise border-t border-border">
        <Container>
          <Card hover={false} className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div>
                <p className="font-600 text-ink">Looking up a denial code instead?</p>
                <p className="mt-1 text-sm text-muted">
                  CARC and RARC codes have their own reference, with the fix and the prevention for each.
                </p>
              </div>
            </div>
            <Link
              href="/tools/denial-code-lookup"
              data-tap
              className="shrink-0 text-sm font-500 text-accent underline underline-offset-4 hover:text-accent-2"
            >
              Denial code lookup
            </Link>
          </Card>
        </Container>
      </Section>

      <FinalCTA />
    </PageTransition>
  );
}
