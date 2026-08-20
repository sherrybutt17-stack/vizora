import type { MetadataRoute } from "next";
import { site } from "@/lib/content/site";
import { serviceSlugs } from "@/lib/content/services";
import { specialtySlugs } from "@/lib/content/specialties";
import { stateSlugs } from "@/lib/content/locations";
import { posts } from "@/lib/content/blog";
import { glossarySlugs } from "@/lib/content/glossary";
import { comparisonSlugs } from "@/lib/content/comparisons";
import { caseStudies } from "@/lib/content/case-studies";
import { LAST_UPDATED } from "@/lib/utils";

const now = new Date(LAST_UPDATED);

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
    { url: `${site.url}/resources`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/resources/rcm-benchmarks`, changeFrequency: "monthly", priority: 0.8 },
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
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const specialties = specialtySlugs.map((slug) => ({
    url: `${site.url}/specialties/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const locations = stateSlugs.map((slug) => ({
    url: `${site.url}/locations/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const glossaryPages = glossarySlugs.map((slug) => ({
    url: `${site.url}/glossary/${slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  const comparePages = comparisonSlugs.map((slug) => ({
    url: `${site.url}/compare/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const caseStudyPages = caseStudies.map((c) => ({
    url: `${site.url}/case-studies/${c.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.75,
  }));

  const blog = posts.map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: new Date(p.updated),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...core, ...services, ...specialties, ...locations,
    ...comparePages, ...glossaryPages, ...caseStudyPages, ...blog,
  ].map((entry) => ({
    lastModified: now,
    ...entry,
  }));
}
