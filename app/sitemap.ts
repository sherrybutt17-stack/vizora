import type { MetadataRoute } from "next";
import { site } from "@/lib/content/site";
import { serviceSlugs } from "@/lib/content/services";
import { specialtySlugs } from "@/lib/content/specialties";
import { stateSlugs } from "@/lib/content/locations";
import { posts } from "@/lib/content/blog";
import { glossarySlugs } from "@/lib/content/glossary";
import { detailedCodes } from "@/lib/content/denial-code-details";
import { modifierCodes } from "@/lib/content/modifiers";
import { cptCodeList } from "@/lib/content/cpt-codes";
import { comparisonSlugs } from "@/lib/content/comparisons";
import { caseStudies } from "@/lib/content/case-studies";
import lastmod from "@/lib/content/lastmod.json";

/**
 * Real per-group modification dates, generated from git by
 * `scripts/gen-lastmod.mjs`.
 *
 * This used to be one hardcoded constant applied to every URL. On 2026-08-30
 * that constant read 2026-08-20, so 278 pages claimed no change across ten days
 * of daily shipping, and pages created on the 27th claimed a date from before
 * they existed. A demonstrably wrong lastmod is worse than none — it is a
 * reason for a crawler to ignore the field across the whole sitemap, which is
 * the opposite of what a site fighting for indexation wants.
 */
const at = (group: keyof typeof lastmod) => new Date(lastmod[group]);

export default function sitemap(): MetadataRoute.Sitemap {
  const core: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/specialties`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/locations`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/pricing`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/case-studies`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/contact`, changeFrequency: "yearly", priority: 0.9 },
    { url: `${site.url}/about`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/faq`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/referral`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${site.url}/blog`, changeFrequency: "weekly", priority: 0.7 },
    // Tools carry high priority — they are the link-earning assets.
    { url: `${site.url}/tools/revenue-leak-calculator`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/tools/denial-code-lookup`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/modifiers`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${site.url}/cpt-codes`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${site.url}/resources`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/resources/rcm-benchmarks`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/resources/choosing-a-medical-billing-company`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${site.url}/glossary`, changeFrequency: "monthly", priority: 0.8 },
    // Comparison content is the highest-converting and most-cited format on the
    // site, so the hub carries the same priority as the service hub.
    { url: `${site.url}/compare`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/sitemap`, changeFrequency: "weekly", priority: 0.3 },
    { url: `${site.url}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/hipaa`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${site.url}/baa`, changeFrequency: "yearly", priority: 0.4 },
  ];

  const services = serviceSlugs.map((slug) => ({
    url: `${site.url}/services/${slug}`,
    lastModified: at("services"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const specialties = specialtySlugs.map((slug) => ({
    url: `${site.url}/specialties/${slug}`,
    lastModified: at("specialties"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const locations = stateSlugs.map((slug) => ({
    url: `${site.url}/locations/${slug}`,
    lastModified: at("locations"),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const glossaryPages = glossarySlugs.map((slug) => ({
    url: `${site.url}/glossary/${slug}`,
    lastModified: at("glossary"),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  // Only codes with written long-form content have a route, so the params
  // come from `detailedCodes` rather than the full 190-code dataset.
  const denialCodePages = detailedCodes.map((code) => ({
    url: `${site.url}/denial-codes/${code.toLowerCase()}`,
    lastModified: at("denialCodes"),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const modifierPages = modifierCodes.map((code) => ({
    url: `${site.url}/modifiers/${code.toLowerCase()}`,
    lastModified: at("modifiers"),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  // Same coupling as the denial codes: params come from the written-content
  // array, so a code without a guide cannot appear in the sitemap.
  const cptCodePages = cptCodeList.map((code) => ({
    url: `${site.url}/cpt-codes/${code}`,
    lastModified: at("cptCodes"),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const comparePages = comparisonSlugs.map((slug) => ({
    url: `${site.url}/compare/${slug}`,
    lastModified: at("compare"),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const caseStudyPages = caseStudies.map((c) => ({
    url: `${site.url}/case-studies/${c.slug}`,
    lastModified: at("caseStudies"),
    changeFrequency: "yearly" as const,
    priority: 0.75,
  }));

  const blog = posts.map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    // The editorial review date, unless the template changed more recently.
    lastModified: new Date(Math.max(Date.parse(p.updated), at("blogTemplate").getTime())),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...core, ...services, ...specialties, ...locations,
    ...comparePages, ...glossaryPages, ...caseStudyPages, ...blog,
    ...denialCodePages,
    ...modifierPages,
    ...cptCodePages,
  ].map((entry) => ({
    // Core pages fall back to the site-wide date; every collection above
    // sets its own, so this only applies to the hand-listed routes.
    lastModified: at("core"),
    ...entry,
  }));
}
