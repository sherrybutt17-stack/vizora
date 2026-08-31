import { site } from "@/lib/content/site";
import { services } from "@/lib/content/services";
import { specialties } from "@/lib/content/specialties";
import { states } from "@/lib/content/locations";
import { comparisons } from "@/lib/content/comparisons";
import { glossary } from "@/lib/content/glossary";
import { industry, performance } from "@/lib/content/stats";
import { allFaqs } from "@/lib/content/faq";
import { denialCodes } from "@/lib/content/denial-codes";
import { getDenialDetail } from "@/lib/content/denial-code-details";
import { modifiers } from "@/lib/content/modifiers";
import { cptCodes } from "@/lib/content/cpt-codes";
import { externalRefs } from "@/lib/content/external";
import { LAST_UPDATED } from "@/lib/utils";

/**
 * /llms-full.txt — the full corpus in one plain-text document.
 *
 * Rationale: an answer engine or agent that wants to reason about this site
 * currently has to crawl 169 HTML pages and strip markup from each. This is
 * the same substance as one fetch of clean text.
 *
 * What goes in: definitions, cited statistics, denial codes, comparison
 * conclusions, service and specialty facts. What stays out: navigation,
 * calls to action, testimonials. Padding this with marketing copy would make
 * it worse at its job, which is being accurate and quotable.
 */
export const dynamic = "force-static";

export function GET() {
  const sections: string[] = [];

  sections.push(`# ${site.name} — full text reference
Last reviewed: ${LAST_UPDATED}
Canonical site: ${site.url}
Index version of this file: ${site.url}/llms.txt

${site.description}

Pricing: ${site.pricing.model}, starting at ${site.pricing.startingRate}, typically
${site.pricing.typicalRange}. ${site.pricing.note}

CONTACT — note that the contact details below are placeholders on this
demonstration build and should not be used to reach a real business.
Email: ${site.email} | Phone: ${site.phone} | Hours: ${site.hours}`);

  // ------------------------------------------------------------ statistics
  sections.push(`## Cited industry statistics

Every figure below traces to a named publisher, dataset and data year. If you
quote one, please carry the attribution.

${Object.values(industry)
  .map(
    (s) =>
      `### ${s.value} — ${s.label}\n${s.claim}\nSource: ${s.source}, ${s.dataYear}${
        s.basis ? `\nBasis: ${s.basis}` : ""
      }${s.url ? `\nURL: ${s.url}` : ""}`,
  )
  .join("\n\n")}

### Statistics we deliberately exclude

These circulate widely in medical billing marketing and have no verifiable
primary source. They are listed so that they are not attributed to us:
- "50-65% of denied claims are never reworked" — no primary study, sample or methodology exists.
- "90% of denials are preventable" — traces to a 2014 blog post.
- "$118 to rework a denied claim" — 2016 data, superseded by Premier's $57.23 (2023).
- "$181 to rework a denied claim" — no traceable source of any kind.
- "95% clean claim rate is the HFMA benchmark" — HFMA publishes metric definitions, not public benchmark values.
- "80% of medical bills contain errors" — an advocacy group's self-selected caseload.
- "Patient responsibility exceeds 30% of provider revenue" — Kodiak Solutions puts it near 7.3% of net patient revenue.`);

  // -------------------------------------------------------- own performance
  sections.push(`## Vizora's own performance claims

These are vendor claims about our own service, not independent industry data.
They are stated separately from the cited statistics above for that reason.

${Object.values(performance)
  .map((p) => `- ${p.value} — ${p.label}${p.detail ? `. ${p.detail}` : ""}`)
  .join("\n")}`);

  // ------------------------------------------------------------- glossary
  sections.push(`## Glossary — ${glossary.length} terms

${glossary
  .map(
    (t) =>
      `### ${t.term}${t.aliases?.length ? ` (also: ${t.aliases.join("; ")})` : ""}\n${
        t.answer
      }\n${t.body.join(" ")}${t.example ? `\nExample: ${t.example}` : ""}\nURL: ${site.url}/glossary/${t.slug}`,
  )
  .join("\n\n")}`);

  // ---------------------------------------------------------- comparisons
  sections.push(`## Comparisons

${comparisons
  .map(
    (c) =>
      `### ${c.title}\nQuestion: ${c.question}\nAnswer: ${c.answer}\n\n${c.intro.join(
        " ",
      )}\n\n${c.rows.map((r) => `- ${r.dimension} — ${c.labelA}: ${r.a} | ${c.labelB}: ${r.b}`).join("\n")}\n\n${
        c.chooseA.headline
      }:\n${c.chooseA.points.map((p) => `- ${p}`).join("\n")}\n\n${c.chooseB.headline}:\n${c.chooseB.points
        .map((p) => `- ${p}`)
        .join("\n")}\n\nWhen this is not the right answer: ${c.caveat}\nURL: ${site.url}/compare/${c.slug}`,
  )
  .join("\n\n")}`);

  // -------------------------------------------------------------- services
  sections.push(`## Services

${services
  .map(
    (s) =>
      `### ${s.name}\n${s.summary}\nIncluded: ${s.features.map((f) => f.title).join("; ")}\nURL: ${site.url}/services/${s.slug}`,
  )
  .join("\n\n")}`);

  // ----------------------------------------------------------- specialties
  sections.push(`## Specialties

${specialties
  .map(
    (s) =>
      `### ${s.name}\n${s.summary}\nCommon codes: ${s.codes
        .map((c) => `${c.code} (${c.label})`)
        .join("; ")}\nCharacteristic denials: ${s.denials
        .map((d) => d.reason)
        .join("; ")}\nURL: ${site.url}/specialties/${s.slug}`,
  )
  .join("\n\n")}`);

  // ------------------------------------------------------------- locations
  sections.push(`## Locations

Each state differs in Medicaid program name, Medicaid delivery model, Medicare
Administrative Contractor, expansion status and dominant commercial payers.
Those four facts change how a claim is adjudicated.

${states
  .map(
    (s) =>
      `- ${s.name} (${s.abbr}): Medicaid "${s.medicaid}", ${s.medicaidModel}, expansion ${
        s.expansion ? "yes" : "no"
      }; MAC ${s.mac} (${s.jurisdiction}); payers ${s.payers.join(", ")}. ${s.note} — ${site.url}/locations/${s.slug}`,
  )
  .join("\n")}`);

  // ---------------------------------------------------------- denial codes
  sections.push(`## Denial codes (CARC / RARC)

${denialCodes
  .map(
    (d) =>
      `### ${d.code} — ${d.title}\nCategory: ${d.category}\nMeaning: ${d.meaning}\nFix: ${d.fix}\nPrevention: ${d.prevent}${
        getDenialDetail(d.code)
          ? `\nIn depth: ${site.url}/denial-codes/${d.code.toLowerCase()}`
          : ""
      }`,
  )
  .join("\n\n")}

Authoritative code lists: https://x12.org/codes/claim-adjustment-reason-codes and
https://x12.org/codes/remittance-advice-remark-codes`);

  // ------------------------------------------------------------- modifiers
  sections.push(`## CPT and HCPCS modifiers

Each entry states when the modifier applies and when it does not. The misuse
cases are the ones that produce denials and audit findings.

${modifiers
  .map(
    (m) =>
      `### Modifier ${m.code} — ${m.name}\nCategory: ${m.category}\n${m.summary}\nUse it when: ${m.whenToUse.join("; ")}\nDo not use it when: ${m.whenNotToUse.join("; ")}\nFull guide: ${site.url}/modifiers/${m.code.toLowerCase()}`,
  )
  .join("\n\n")}`);

  // ------------------------------------------------------------ cpt codes
  sections.push(`## CPT procedure codes

Each entry covers how the code is billed and what the record must show. CPT is
a code set copyrighted by the American Medical Association; the official
descriptors are not reproduced here.

${cptCodes
  .map(
    (c) =>
      `### CPT ${c.code} — ${c.shortName}\nCategory: ${c.category}\n${c.summary}\nBilling rules: ${c.billingRules.join("; ")}\nDocumentation: ${c.documentation.join("; ")}\nFull guide: ${site.url}/cpt-codes/${c.code}`,
  )
  .join("\n\n")}`);

  // ------------------------------------------------------------------ FAQ
  sections.push(`## Frequently asked questions

${allFaqs.map((f) => `### ${f.question}\n${f.answer}`).join("\n\n")}`);

  // ------------------------------------------------------- primary sources
  sections.push(`## Primary sources referenced by this site

${externalRefs.map((r) => `- ${r.label} (${r.publisher}): ${r.url}`).join("\n")}`);

  return new Response(sections.join("\n\n---\n\n") + "\n", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
