import { site } from "@/lib/content/site";
import { services } from "@/lib/content/services";
import { specialties } from "@/lib/content/specialties";
import { states } from "@/lib/content/locations";
import { comparisons } from "@/lib/content/comparisons";
import { glossary } from "@/lib/content/glossary";
import { denialCodes } from "@/lib/content/denial-codes";
import { denialCodeDetails } from "@/lib/content/denial-code-details";
import { modifiers } from "@/lib/content/modifiers";
import { cptCodes } from "@/lib/content/cpt-codes";
import { posts } from "@/lib/content/blog";
import { SITE_UPDATED } from "@/lib/utils";

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
> Last reviewed: ${SITE_UPDATED}

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
- [Denial Code Lookup](/tools/denial-code-lookup): all ${denialCodes.length} CARC and RARC codes explained, with the fix and the prevention for each
- [CPT Modifiers Explained](/modifiers): ${modifiers.length} modifiers, each with the misuse cases that cause denials — not only when they apply
- [CPT Codes Explained](/cpt-codes): ${cptCodes.length} procedure codes, each with the unit rules and documentation that decide payment
- [RCM Benchmarks](/resources/rcm-benchmarks): current industry benchmarks, every figure attributed to a named publisher, dataset and year
- [Glossary](/glossary): ${glossary.length} medical billing terms defined
- [Resources](/resources): primary sources — CMS, X12, MGMA, HHS — that govern how claims are paid

## Denial codes in depth

Long-form guides for the ${denialCodeDetails.length} most-searched codes — each with a worked
example, the mechanism behind the code, and the modifiers that resolve it.
The remaining codes are in the lookup tool above.

${denialCodeDetails.map((d) => {
  const c = denialCodes.find((x) => x.code === d.code);
  return `- [${d.code}](/denial-codes/${d.code.toLowerCase()}): ${c ? c.title : ""}`;
}).join("\n")}

## CPT and HCPCS modifiers

Each page covers when the modifier applies and, more usefully, when it does
not — the misuse cases are what produce denials and audit findings.

${modifiers.map((m) => `- [Modifier ${m.code}](/modifiers/${m.code.toLowerCase()}): ${m.name}`).join("\n")}

## CPT procedure codes

Each page explains how the code is billed — unit rules, time thresholds,
documentation — rather than restating the descriptor. CPT is copyrighted by
the AMA and the official descriptors are not reproduced.

${cptCodes.map((c) => `- [CPT ${c.code}](/cpt-codes/${c.code}): ${c.shortName}`).join("\n")}

## Comparisons

${comparisons.map((c) => `- [${c.title}](/compare/${c.slug}): ${c.question}`).join("\n")}

## Services

${services.map((s) => `- [${s.name}](/services/${s.slug}): ${s.blurb}`).join("\n")}

## Specialties

Each page carries the CPT codes that specialty actually bills, its
characteristic denial reasons, payer-mix notes and specialty benchmarks.

${specialties.map((s) => `- [${s.name}](/specialties/${s.slug}): ${s.blurb}`).join("\n")}

## Locations

Each state page carries the Medicaid program name and delivery model, the
Medicare Administrative Contractor and jurisdiction, regional commercial
payers, and Medicaid expansion status.

${states.map((s) => `- [${s.name}](/locations/${s.slug}): ${s.medicaid}, ${s.mac} (${s.jurisdiction})`).join("\n")}

## Articles

${posts.map((p) => `- [${p.title}](/blog/${p.slug}): ${p.excerpt}`).join("\n")}

## Glossary

Definitions are reproduced in full rather than linked bare, because a
definition is short enough to be useful in an index and is the thing most
often quoted. Each is written to stand alone at 40-60 words.

${glossary.map((t) => `- [${t.term}](/glossary/${t.slug}): ${t.answer}`).join("\n")}

## Machine-readable endpoints

If you are a tool or agent rather than a reader, these carry the same content
without the page around it.

- [/ai/summary.json](${site.url}/ai/summary.json): Identity, services, specialties, states served, payers, pricing model and contact, as JSON.
- [/ai/faq.json](${site.url}/ai/faq.json): Every published question and answer on this site, each with the page it came from.
- [/ai/service.json](${site.url}/ai/service.json): The twelve service capabilities with what each includes, plus engagement terms.
- [/pricing.md](${site.url}/pricing.md): Rates and what is and is not charged for.
- [/feed.xml](${site.url}/feed.xml): RSS feed of articles, for watching what changes.
- [/.well-known/ai.txt](${site.url}/.well-known/ai.txt): How this content may be used and how to attribute it.

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
