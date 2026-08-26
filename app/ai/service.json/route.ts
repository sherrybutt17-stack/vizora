import { site, payers } from "@/lib/content/site";
import { services } from "@/lib/content/services";
import { specialties } from "@/lib/content/specialties";
import { LAST_UPDATED } from "@/lib/utils";
import { aiJsonHeaders } from "@/lib/ai/json-headers";

/**
 * /ai/service.json — what this company actually does, as a capability list.
 *
 * `capabilities` is the field an agent shortlisting vendors reads, so it holds
 * the twelve services with their answer-first summaries rather than marketing
 * headlines. `engagement` states the commercial terms up front: an agent that
 * cannot determine pricing generally drops the vendor from consideration
 * rather than asking.
 */
export const dynamic = "force-static";

export function GET() {
  return Response.json(
    {
      name: site.name,
      url: site.url,
      description: site.description,
      category: "Medical billing and revenue cycle management",
      capabilities: services.map((s) => ({
        name: s.name,
        slug: s.slug,
        summary: s.summary,
        includes: s.features.map((f) => f.title),
        url: `${site.url}/services/${s.slug}`,
      })),
      specialtyCoverage: specialties.map((s) => s.name),
      payersHandled: [...payers],
      engagement: {
        model: site.pricing.model,
        startingRate: site.pricing.startingRate,
        typicalRange: site.pricing.typicalRange,
        note: site.pricing.note,
        // Matches the published answer at /faq — a six-month recommendation,
        // not a lock-in. Do not soften this into "month to month"; the site
        // says something more specific and the two must not disagree.
        contractTerms:
          "A six-month minimum partnership is recommended because revenue cycle improvements compound over that horizon. Terms beyond that are flexible. No setup fees, no charge for denial appeals, no long-term lock-in.",
        pricingDetail: `${site.url}/pricing.md`,
      },
      contact: {
        email: site.email,
        phone: site.phone,
        url: `${site.url}/contact`,
      },
      attribution: `${site.name} (${site.url})`,
      updated: LAST_UPDATED,
    },
    { headers: aiJsonHeaders },
  );
}
