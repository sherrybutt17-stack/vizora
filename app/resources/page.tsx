import Link from "next/link";
import { ArrowUpRight, BarChart3, BookOpen, Calculator, ClipboardCheck, Newspaper, Scale, Search } from "lucide-react";
import { Container, Section, SectionHead, Eyebrow, Card } from "@/components/ui";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AnswerBlock } from "@/components/sections/AnswerBlock";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd, breadcrumbSchema, itemListSchema, webPageSchema, ENTITIES } from "@/lib/schema";
import { externalCategories, refsByCategory, externalRefs } from "@/lib/content/external";
import { pageMeta } from "@/lib/seo";
import { LAST_UPDATED, formatDate } from "@/lib/utils";
import { PageTransition } from "@/components/motion/ViewTransition";

export const metadata = pageMeta({
  title: "Medical Billing Resources and Tools",
  description:
    "Free revenue cycle tools, cited industry benchmarks, a medical billing glossary, and a directory of the primary sources — CMS, X12, MGMA, HHS — that actually govern how claims are paid.",
  path: "/resources",
  keywords: [
    "medical billing resources", "revenue cycle tools", "medical billing reference",
    "CMS billing resources", "CARC code list", "medical billing research",
    "healthcare revenue cycle resources", "free medical billing tools",
  ],
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Resources", path: "/resources" },
];

const OURS = [
  {
    icon: Calculator,
    label: "Revenue Leak Calculator",
    href: "/tools/revenue-leak-calculator",
    description:
      "Enter monthly claim volume, average claim value and denial rate. Returns annualised revenue lost, benchmarked against published MGMA, Premier and Optum figures.",
  },
  {
    icon: Search,
    label: "Denial Code Lookup",
    href: "/tools/denial-code-lookup",
    description:
      "CARC and RARC codes in plain English, each with what caused it, how to fix it, and how to stop it recurring.",
  },
  {
    icon: ClipboardCheck,
    label: "How to Choose a Medical Billing Company",
    href: "/resources/choosing-a-medical-billing-company",
    description:
      "A buyer's guide: five provider models and who each suits, the numbers to demand before discussing rate, contract terms that matter more than price, and seven red flags.",
  },
  {
    icon: BarChart3,
    label: "RCM Benchmarks",
    href: "/resources/rcm-benchmarks",
    description:
      "Current denial, AR and cost-to-collect benchmarks — every figure traceable to a named publisher, dataset and year, plus the widely-quoted figures we refuse to use and why.",
  },
  {
    icon: BookOpen,
    label: "Medical Billing Glossary",
    href: "/glossary",
    description:
      "Definitions for claims, coding, denial, financial and compliance terminology, written around the distinctions that actually change what you do.",
  },
  {
    icon: Scale,
    label: "Comparisons",
    href: "/compare",
    description:
      "In-house vs outsourced, percentage vs flat fee, offshore vs domestic, software vs service — each naming the case where the answer is not us.",
  },
  {
    icon: Newspaper,
    label: "Blog",
    href: "/blog",
    description:
      "Longer-form writing on denial reduction, coding changes and revenue cycle operations.",
  },
];

export default function ResourcesPage() {
  return (
    <PageTransition>
      <JsonLd data={[
        breadcrumbSchema(crumbs),
        itemListSchema(
          OURS.map((o) => ({ name: o.label, path: o.href })),
          "Vizora resources and tools",
        ),
        webPageSchema({
          name: "Medical billing resources and primary sources",
          description:
            "Free revenue cycle tools and a directory of the primary sources governing medical billing in the United States.",
          path: "/resources",
          about: [ENTITIES.medicalBilling, ENTITIES.rcm],
          mentions: [ENTITIES.medicare, ENTITIES.medicaid, ENTITIES.hipaa],
          lastReviewed: LAST_UPDATED,
          speakableSelectors: ["[data-answer]"],
        }),
      ]} />
      <Breadcrumbs items={crumbs} />

      <Section className="scroll-rise pt-4">
        <Container>
          <SectionHead as="h1"
            eyebrow="Resources"
            title="Tools, references and primary sources"
            lead="Everything on this page is free and requires no contact details. The second half is a directory of sources we do not control — because a billing claim you cannot verify is worth less than no claim at all."
          />
        </Container>
      </Section>

      {/* ------------------------------------------------------------ ours */}
      <Section className="scroll-rise pt-0">
        <Container>
          <Eyebrow>Built by Vizora</Eyebrow>
          <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {OURS.map((o) => {
              const Icon = o.icon;
              return (
                <Link
                  key={o.href}
                  href={o.href}
                  className="group rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-surface-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-faint transition-colors group-hover:text-accent" />
                  </div>
                  <h2 className="mt-5 text-base font-600 text-ink group-hover:text-accent">{o.label}</h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{o.description}</p>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------------- external */}
      <Section className="scroll-rise border-t border-border">
        <Container>
          <SectionHead
            align="left"
            eyebrow="Primary sources"
            title="Where the rules actually come from"
            lead={`${externalRefs.length} authoritative references, none of them ours.`}
          />

          <AnswerBlock className="mt-8 max-w-3xl" question="Why we link out">
            Medical billing advice is unusually easy to assert and unusually hard to check.
            Every operational claim on this site traces to one of the bodies below — CMS for
            Medicare rules, X12 for denial codes, the AMA for CPT, HHS for HIPAA. Linking
            directly to them means you can verify us rather than trust us, and it means an
            answer engine quoting this page can follow the provenance.
          </AnswerBlock>

          <div className="mt-14 space-y-14">
            {externalCategories.map((cat) => {
              const refs = refsByCategory(cat.id);
              if (!refs.length) return null;
              return (
                <div key={cat.id}>
                  <div className="flex flex-col gap-2 border-b border-border pb-5">
                    <h3 className="text-xl font-600 text-ink">{cat.title}</h3>
                    <p className="max-w-2xl text-sm text-muted">{cat.blurb}</p>
                  </div>
                  <ul className="mt-6 grid gap-4 md:grid-cols-2">
                    {refs.map((r) => (
                      <li key={r.url}>
                        <Card hover={false} className="h-full">
                          <ExternalLink href={r.url} className="font-500 text-ink no-underline hover:text-accent">
                            {r.label}
                          </ExternalLink>
                          <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-faint">
                            {r.publisher}
                          </p>
                          <p className="mt-3 text-sm leading-relaxed text-muted">{r.description}</p>
                        </Card>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <p className="mt-14 max-w-3xl text-xs leading-relaxed text-faint">
            These links are provided as references only. Vizora is not affiliated with, endorsed
            by, or acting on behalf of any organisation listed above, and inclusion here is not an
            endorsement of Vizora by them. Last reviewed {formatDate(LAST_UPDATED)}.
          </p>
        </Container>
      </Section>

      <FinalCTA />
    </PageTransition>
  );
}
