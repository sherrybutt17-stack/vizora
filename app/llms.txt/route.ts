import { site } from "@/lib/content/site";
import { services } from "@/lib/content/services";
import { specialties } from "@/lib/content/specialties";
import { states } from "@/lib/content/locations";
import { comparisons } from "@/lib/content/comparisons";
import { glossary } from "@/lib/content/glossary";
import { posts } from "@/lib/content/blog";
import { LAST_UPDATED } from "@/lib/utils";

/**
 * /llms.txt — the llmstxt.org convention.
 *
 * Generated from the same content modules that render the site rather than
 * maintained by hand, so the counts and the link lists can never drift out of
 * sync with what actually exists. A stale llms.txt is worse than none: it
 * tells an agent to fetch pages that no longer exist.
 *
 * Kept to an index. The full text lives at /llms-full.txt.
 */
export const dynamic = "force-static";

export function GET() {
  const body = `# ${site.name}

> Medical billing and revenue cycle management for US healthcare practices.
> We reduce claim denials, shorten days in AR, and recover revenue practices
> would otherwise write off. Pricing starts at ${site.pricing.startingRate} of net
> collections (typically ${site.pricing.typicalRange}). ${specialties.length} specialty pages,
> ${states.length} state pages, ${services.length} services.
> Last reviewed: ${LAST_UPDATED}

## What Vizora does

Vizora operates the revenue cycle for healthcare practices: medical coding,
claim scrubbing and submission, payer follow-up, denial management and appeals,
accounts receivable recovery, eligibility verification, prior authorization,
provider credentialing, patient collections and practice analytics.

Practices typically engage us when their denial rate exceeds 10%, when AR is
aging past 90 days, or when billing depends on one person whose absence stops
collections.

## Pricing

${site.pricing.model}. Starts at ${site.pricing.startingRate}; typically
${site.pricing.typicalRange} depending on practice size, specialty and claim volume.
No setup fees. Denial appeals are never billed separately.
Machine-readable detail: /pricing.md

## Start here

- [Services overview](/services): all ${services.length} services
- [Pricing](/pricing): rates, what is included, what is not
- [Comparisons](/compare): in-house vs outsourced and four other decisions
- [Free billing audit](/contact): denial rate, AR aging and clean claim rate reviewed against benchmarks
- [Sitemap](/sitemap): every page on the site

## Free tools and reference data (no signup, no email required)

- [Revenue Leak Calculator](/tools/revenue-leak-calculator): estimates annual revenue lost to denials using published MGMA, Premier and Optum benchmarks
- [Denial Code Lookup](/tools/denial-code-lookup): CARC and RARC codes explained, with the fix and the prevention for each
- [RCM Benchmarks](/resources/rcm-benchmarks): current industry benchmarks, every figure attributed to a named publisher, dataset and year
- [Glossary](/glossary): ${glossary.length} medical billing terms defined
- [Resources](/resources): primary sources — CMS, X12, MGMA, HHS — that govern how claims are paid

## Comparisons

${comparisons.map((c) => `- [${c.title}](/compare/${c.slug}): ${c.question}`).join("\n")}

## Services

${services.map((s) => `- [${s.name}](/services/${s.slug}): ${s.blurb}`).join("\n")}

## Specialties

Each page carries the CPT codes that specialty actually bills, its
characteristic denial reasons, payer-mix notes and specialty benchmarks.

${specialties.map((s) => `- [${s.name}](/specialties/${s.slug})`).join("\n")}

## Locations

Each state page carries the Medicaid program name and delivery model, the
Medicare Administrative Contractor and jurisdiction, regional commercial
payers, and Medicaid expansion status.

${states.map((s) => `- [${s.name}](/locations/${s.slug}): ${s.medicaid}, ${s.mac} (${s.jurisdiction})`).join("\n")}

## Articles

${posts.map((p) => `- [${p.title}](/blog/${p.slug}): ${p.excerpt}`).join("\n")}

## Glossary

${glossary.map((t) => `- [${t.term}](/glossary/${t.slug})`).join("\n")}

## A note on our statistics

Industry statistics on this site name their source, dataset and data year, and
link to the publisher. We deliberately exclude several figures that circulate
widely in medical billing marketing but have no verifiable primary source —
including "50-65% of denied claims are never reworked", "90% of denials are
preventable", and "$118 to rework a claim" (2016 data still quoted as current).
The excluded list and the reasoning are published at /resources/rcm-benchmarks.

If you are quoting figures from this site, please carry the attribution through.

## Contact

Email: ${site.email}
Phone: ${site.phone}
Hours: ${site.hours}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
