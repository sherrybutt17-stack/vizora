import Link from "next/link";
import { Container, Section, SectionHead } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { DenialCodeLookup } from "@/components/tools/DenialCodeLookup";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd, breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { denialCodes, getDenialCode } from "@/lib/content/denial-codes";
import { detailedCodes } from "@/lib/content/denial-code-details";
import { pageMeta } from "@/lib/seo";
import { lastUpdated, formatDate } from "@/lib/utils";
import { PageTransition } from "@/components/motion/ViewTransition";

export const metadata = pageMeta({
  title: "Denial Code Lookup — CARC & RARC Codes Explained",
  description:
    "Searchable reference for medical billing denial codes. CO-16, CO-45, CO-97, CO-197, PR-204 and more — what each means in plain English, how to fix it, and how to prevent it.",
  path: "/tools/denial-code-lookup",
  keywords: [
    "denial codes",
    "CARC codes",
    "RARC codes",
    "CO-16 denial",
    "claim adjustment reason codes",
    "CO-45 denial code",
    "PR-204 denial",
    "remittance advice remark codes",
    "medical billing denial code list",
    "what does CO-97 mean",
  ],
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Tools", path: "/tools/denial-code-lookup" },
  { name: "Denial Code Lookup", path: "/tools/denial-code-lookup" },
];

export default function DenialLookupPage() {
  return (
    <PageTransition>
      <JsonLd data={[
        breadcrumbSchema(crumbs),
        itemListSchema(
          denialCodes.map((d) => ({ name: `${d.code} — ${d.title}`, path: "/tools/denial-code-lookup" })),
          "Denial code reference",
        ),
      ]} />
      <Breadcrumbs items={crumbs} />

      <Section className="scroll-rise pt-6">
        <Container>
          <SectionHead as="h1"
            eyebrow="Free reference"
            title="Denial code lookup"
            lead="Claim adjustment reason codes tell you why a claim was denied — in language written for adjudication systems, not people. This translates the ones you actually see, with the fix and the prevention for each."
          />
          <p className="mt-6 text-center text-sm text-faint">
            {denialCodes.length} codes · Last updated {formatDate(lastUpdated("denialLookup"))}
          </p>

          {/* Surfaced above the search deliberately. These are the codes
              billers look up most, and each has a full guide behind it — a
              user who does not know what to search still lands somewhere
              useful, and the detail pages get a contextual entry point
              rather than existing only behind a filtered result. */}
          <div className="mx-auto mt-12 max-w-4xl">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-faint">
                Most looked-up codes — full guides
              </h2>
              <Link href="/modifiers" className="text-sm font-500 text-accent hover:underline">
                CPT modifiers explained →
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {detailedCodes.map((code) => {
                const c = getDenialCode(code);
                return (
                  <Link
                    key={code}
                    href={`/denial-codes/${code.toLowerCase()}`}
                    title={c?.title}
                    className="rounded-lg border border-border px-3 py-1.5 font-mono text-sm font-600 text-accent transition-colors hover:border-accent/40 hover:bg-accent/[0.05]"
                  >
                    {code}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-4xl">
            <DenialCodeLookup />
          </div>
        </Container>
      </Section>

      <Section className="scroll-rise border-t border-border bg-bg-soft">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionHead
              align="left"
              eyebrow="How to use this"
              title="Reading a denial properly"
            />
            <div className="mt-8 space-y-5 leading-relaxed text-muted">
              <p>
                A remittance carries two kinds of code. The <strong className="text-ink">CARC</strong>{" "}
                (Claim Adjustment Reason Code) states the reason for the adjustment. The{" "}
                <strong className="text-ink">RARC</strong> (Remittance Advice Remark Code) adds detail.
                The two are meant to be read together, and reading only the CARC is why so many denials
                get worked incorrectly.
              </p>
              <p>
                CO-16 is the clearest example. On its own it means only that required information is
                missing — it tells you nothing about what. The accompanying RARC names the actual field.
                Practices that work CO-16 denials without reading the RARC end up guessing.
              </p>
              <p>
                The prefix matters too. <strong className="text-ink">CO</strong> means contractual
                obligation, which generally cannot be billed to the patient.{" "}
                <strong className="text-ink">PR</strong> means patient responsibility, which can.
                Misreading a CO as a PR and billing the patient is both a collection failure and a
                contractual problem.
              </p>
              <p>
                Finally, aggregate them. A single denial is a claim problem; the same reason code
                appearing forty times a month is a process problem with a specific owner, and that is
                the one worth fixing.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <FinalCTA
        title="Stop working the same denial forty times"
        lead="A free billing audit aggregates your denials by reason code and payer, and tells you which upstream process is generating them."
      />
    </PageTransition>
  );
}
