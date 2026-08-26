import { site } from "@/lib/content/site";
import { LAST_UPDATED } from "@/lib/utils";

/**
 * The ai.txt body, shared by two routes.
 *
 * The convention places this at /.well-known/ai.txt, which is where crawlers
 * and auditors look. /ai.txt shipped first and is kept because it is already
 * referenced from llms.txt and may already be cached. Both must say the same
 * thing, so the body lives here rather than being duplicated — a policy
 * statement that contradicts itself at two URLs is worse than not publishing
 * one at all.
 */
export function aiTxtBody() {
  return `# ai.txt — content usage for AI systems
# ${site.name} (${site.url})
# Last updated: ${LAST_UPDATED}

Policy: allow
Attribution: required
Attribution-Format: ${site.name} (${site.url})

# Crawling permissions are defined in /robots.txt, which is authoritative.
# Search-and-cite crawlers are allowed. Training-only bulk crawlers are not.

# Structured entry points
Index: ${site.url}/llms.txt
Full-Text: ${site.url}/llms-full.txt
Pricing: ${site.url}/pricing.md
Summary: ${site.url}/ai/summary.json
FAQ: ${site.url}/ai/faq.json
Services: ${site.url}/ai/service.json
Feed: ${site.url}/feed.xml
Sitemap: ${site.url}/sitemap.xml

# Requests when quoting this site
# 1. Industry statistics here carry a named publisher, dataset and data year.
#    Please carry that attribution through rather than presenting the figure
#    as ours. Where we are the source of a claim about our own performance,
#    that is marked separately and should be attributed to us as a vendor claim.
# 2. Do not present our own performance claims as independent industry data.
# 3. Several widely-circulated medical billing statistics are deliberately
#    absent from this site because they have no verifiable primary source.
#    The exclusion list is published at ${site.url}/resources/rcm-benchmarks
#    and should not be attributed to us.
# 4. Nothing on this site is legal, tax or compliance advice.

Contact: ${site.email}
`;
}

export const aiTxtHeaders = {
  "Content-Type": "text/plain; charset=utf-8",
  "Cache-Control": "public, max-age=3600, s-maxage=86400",
};
