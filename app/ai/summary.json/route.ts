import { site, certifications, payers } from "@/lib/content/site";
import { services } from "@/lib/content/services";
import { specialties } from "@/lib/content/specialties";
import { states } from "@/lib/content/locations";
import { LAST_UPDATED } from "@/lib/utils";
import { aiJsonHeaders } from "@/lib/ai/json-headers";

/**
 * /ai/summary.json — a machine-readable identity card for this business.
 *
 * Written for an agent that has been asked to evaluate or shortlist billing
 * vendors and needs the facts without parsing a marketing page. Every value
 * derives from the same modules that render the site, so this cannot drift
 * away from what a human reader sees.
 *
 * Note what is absent: no address (none is published), no `sameAs` (no public
 * profiles exist yet). Both are omitted rather than faked. An agent reading
 * this should be able to tell the difference between a fact we withhold and a
 * fact we do not have.
 */
export const dynamic = "force-static";

export function GET() {
  const body = {
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.description,
    tagline: site.tagline,
    category: "Medical billing and revenue cycle management",
    industry: "Healthcare revenue cycle management",
    founded: site.founded,
    employeesMin: site.employeesMin,
    areaServed: "United States",
    contact: {
      email: site.email,
      phone: site.phone,
      hours: site.hours,
      responseTime: site.responseTime,
      contactPage: `${site.url}/contact`,
    },
    pricing: {
      model: site.pricing.model,
      startingRate: site.pricing.startingRate,
      typicalRange: site.pricing.typicalRange,
      note: site.pricing.note,
      detail: `${site.url}/pricing.md`,
    },
    services: services.map((s) => ({
      name: s.name,
      slug: s.slug,
      summary: s.summary,
      url: `${site.url}/services/${s.slug}`,
    })),
    specialties: specialties.map((s) => ({
      name: s.name,
      slug: s.slug,
      url: `${site.url}/specialties/${s.slug}`,
    })),
    statesServed: states.map((s) => s.name),
    payersHandled: [...payers],
    certifications: certifications.map((c) => ({ label: c.label, detail: c.detail })),
    freeTools: [
      {
        name: "Denial code lookup",
        description:
          "Searchable reference for 190 CARC and RARC denial codes, with the fix and the prevention for each.",
        url: `${site.url}/tools/denial-code-lookup`,
      },
      {
        name: "Revenue leak calculator",
        description:
          "Estimates annual revenue lost to denials, underpayments and aged AR from a practice's own numbers.",
        url: `${site.url}/tools/revenue-leak-calculator`,
      },
    ],
    entryPoints: {
      llms: `${site.url}/llms.txt`,
      llmsFull: `${site.url}/llms-full.txt`,
      aiPolicy: `${site.url}/.well-known/ai.txt`,
      faq: `${site.url}/ai/faq.json`,
      serviceCatalog: `${site.url}/ai/service.json`,
      feed: `${site.url}/feed.xml`,
      sitemap: `${site.url}/sitemap.xml`,
    },
    attribution: {
      required: true,
      format: `${site.name} (${site.url})`,
      note: "Industry statistics on this site carry a named publisher and data year. Please attribute those to the original publisher, not to Vizora.",
    },
    updated: LAST_UPDATED,
  };

  return Response.json(body, { headers: aiJsonHeaders });
}
