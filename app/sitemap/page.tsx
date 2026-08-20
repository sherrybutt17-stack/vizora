import Link from "next/link";
import { Container, Section, SectionHead, Eyebrow } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd, breadcrumbSchema, webPageSchema, ENTITIES } from "@/lib/schema";
import { services } from "@/lib/content/services";
import { specialties } from "@/lib/content/specialties";
import { statesByRegion, REGIONS } from "@/lib/content/locations";
import { posts } from "@/lib/content/blog";
import { glossary } from "@/lib/content/glossary";
import { comparisons } from "@/lib/content/comparisons";
import { caseStudies } from "@/lib/content/case-studies";
import { pageMeta } from "@/lib/seo";
import { LAST_UPDATED, formatDate } from "@/lib/utils";
import { PageTransition } from "@/components/motion/ViewTransition";

export const metadata = pageMeta({
  title: "Sitemap — Every Page on Vizora",
  description:
    "A complete index of every page: 12 services, 25 specialties, 50 state pages, comparisons, glossary terms, tools and articles.",
  path: "/sitemap",
  keywords: ["vizora sitemap", "medical billing site index"],
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Sitemap", path: "/sitemap" },
];

/**
 * Human-readable sitemap.
 *
 * Two purposes beyond the obvious. It guarantees no page is more than two
 * clicks from the homepage, which is what stops programmatic pages becoming
 * orphans. And it gives crawlers a single flat surface listing every route,
 * which is materially more reliable than relying on XML alone for a new domain.
 */
function LinkGroup({
  title, links, columns = 3,
}: {
  title: string;
  links: { label: string; href: string }[];
  columns?: 2 | 3 | 4;
}) {
  const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <div className="border-t border-border py-10">
      <Eyebrow>{title}</Eyebrow>
      <ul className={`link-list mt-5 grid gap-x-8 gap-y-2.5 ${cols}`}>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-muted transition-colors hover:text-accent">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SitemapPage() {
  const regions = statesByRegion();

  return (
    <PageTransition>
      <JsonLd data={[
        breadcrumbSchema(crumbs),
        webPageSchema({
          name: "Sitemap",
          description: "A complete index of every page on vizora.co.",
          path: "/sitemap",
          about: [ENTITIES.medicalBilling],
          lastReviewed: LAST_UPDATED,
        }),
      ]} />
      <Breadcrumbs items={crumbs} />

      <Section className="scroll-rise pt-4 pb-10">
        <Container>
          <SectionHead as="h1"
            align="left"
            eyebrow="Index"
            title="Every page on this site"
            lead="Nothing here is more than two clicks from the homepage. If a page exists, it is listed below."
          />
        </Container>
      </Section>

      <Section className="scroll-rise pt-0">
        <Container>
          <LinkGroup
            title="Main"
            columns={4}
            links={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: "Specialties", href: "/specialties" },
              { label: "Locations", href: "/locations" },
              { label: "Pricing", href: "/pricing" },
              { label: "Case studies", href: "/case-studies" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
              { label: "FAQ", href: "/faq" },
              { label: "Referral program", href: "/referral" },
              { label: "Resources", href: "/resources" },
              { label: "Blog", href: "/blog" },
            ]}
          />

          <LinkGroup
            title="Services"
            links={services.map((s) => ({ label: s.name, href: `/services/${s.slug}` }))}
          />

          <LinkGroup
            title="Specialties"
            columns={4}
            links={specialties.map((s) => ({ label: s.name, href: `/specialties/${s.slug}` }))}
          />

          {REGIONS.map((region) => (
            <LinkGroup
              key={region}
              title={`Locations — ${region}`}
              columns={4}
              links={regions[region].map((s) => ({ label: s.name, href: `/locations/${s.slug}` }))}
            />
          ))}

          <LinkGroup
            title="Compare"
            columns={2}
            links={comparisons.map((c) => ({ label: c.title, href: `/compare/${c.slug}` }))}
          />

          <LinkGroup
            title="Glossary"
            columns={4}
            links={glossary.map((t) => ({ label: t.term, href: `/glossary/${t.slug}` }))}
          />

          <LinkGroup
            title="Tools and reference"
            columns={3}
            links={[
              { label: "Revenue Leak Calculator", href: "/tools/revenue-leak-calculator" },
              { label: "Denial Code Lookup", href: "/tools/denial-code-lookup" },
              { label: "RCM Benchmarks", href: "/resources/rcm-benchmarks" },
              { label: "Glossary", href: "/glossary" },
              { label: "Comparisons", href: "/compare" },
              { label: "Machine-readable pricing", href: "/pricing.md" },
              { label: "llms.txt", href: "/llms.txt" },
              { label: "llms-full.txt", href: "/llms-full.txt" },
              { label: "robots.txt", href: "/robots.txt" },
              { label: "XML sitemap", href: "/sitemap.xml" },
            ]}
          />

          <LinkGroup
            title="Case studies"
            links={caseStudies.map((c) => ({ label: c.title, href: "/case-studies" }))}
          />

          <LinkGroup
            title="Articles"
            columns={2}
            links={posts.map((p) => ({ label: p.title, href: `/blog/${p.slug}` }))}
          />

          <LinkGroup
            title="Legal"
            columns={4}
            links={[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "HIPAA Compliance", href: "/hipaa" },
              { label: "Business Associate Agreement", href: "/baa" },
            ]}
          />

          <p className="border-t border-border pt-8 text-xs text-faint">
            Last reviewed {formatDate(LAST_UPDATED)}
          </p>
        </Container>
      </Section>
    </PageTransition>
  );
}
