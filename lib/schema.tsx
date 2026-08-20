import { site } from "./content/site";
import type { Faq } from "./content/faq";

/**
 * JSON-LD is generated from the same content modules that render the pages,
 * so structured data and visible copy cannot drift apart.
 */

const ORG_ID = `${site.url}/#organization`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.description,
    telephone: site.phone,
    email: site.email,
    areaServed: { "@type": "Country", name: "United States" },
    knowsAbout: [
      "Medical billing", "Revenue cycle management", "Medical coding",
      "Denial management", "Provider credentialing", "Prior authorization",
    ],
    // Omitted entirely while no profiles exist — an empty sameAs array, or one
    // pointing at profiles that 404, degrades entity reconciliation.
    ...(Object.values(site.social).length ? { sameAs: Object.values(site.social) } : {}),
    // address is intentionally omitted while site.address is null — emitting a
    // fabricated PostalAddress would be worse than having none.
    ...(site.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: site.address.street,
            addressLocality: site.address.city,
            addressRegion: site.address.region,
            postalCode: site.address.postalCode,
            addressCountry: site.address.country,
          },
        }
      : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { "@id": ORG_ID },
  };
}

export function serviceSchema(s: {
  name: string;
  summary: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.summary,
    url: `${site.url}/services/${s.slug}`,
    serviceType: s.name,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "United States" },
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function articleSchema(p: {
  title: string;
  excerpt: string;
  slug: string;
  published: string;
  updated: string;
  authorName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.excerpt,
    url: `${site.url}/blog/${p.slug}`,
    datePublished: p.published,
    dateModified: p.updated,
    author: { "@type": "Organization", name: p.authorName },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: `${site.url}/blog/${p.slug}`,
  };
}

export function itemListSchema(items: { name: string; path: string }[], name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: `${site.url}${item.path}`,
    })),
  };
}

/** Renders JSON-LD. Next handles escaping of the serialized payload. */
export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}

/* ================================================================
   Entity grounding
   ================================================================
   Answer engines resolve a page to entities before they decide whether it is
   about the thing the user asked about. Naming the entity and linking it to a
   stable public identifier (Wikipedia / Wikidata) is the cheapest way to make
   that resolution unambiguous, and it is the part of "GEO" that is actually
   mechanical rather than stylistic. */

export const ENTITIES = {
  medicalBilling: { name: "Medical billing", url: "https://en.wikipedia.org/wiki/Medical_billing" },
  rcm: { name: "Revenue cycle management", url: "https://en.wikipedia.org/wiki/Revenue_cycle_management" },
  medicalCoding: { name: "Clinical coder", url: "https://en.wikipedia.org/wiki/Clinical_coder" },
  cpt: { name: "Current Procedural Terminology", url: "https://en.wikipedia.org/wiki/Current_Procedural_Terminology" },
  icd10: { name: "ICD-10-CM", url: "https://en.wikipedia.org/wiki/ICD-10-CM" },
  hipaa: { name: "Health Insurance Portability and Accountability Act", url: "https://en.wikipedia.org/wiki/Health_Insurance_Portability_and_Accountability_Act" },
  medicare: { name: "Medicare (United States)", url: "https://en.wikipedia.org/wiki/Medicare_(United_States)" },
  medicaid: { name: "Medicaid", url: "https://en.wikipedia.org/wiki/Medicaid" },
  clearinghouse: { name: "Clearinghouse (healthcare)", url: "https://en.wikipedia.org/wiki/Clearing_house_(finance)" },
  healthInsurance: { name: "Health insurance in the United States", url: "https://en.wikipedia.org/wiki/Health_insurance_in_the_United_States" },
} as const;

type Entity = { name: string; url: string };

const thing = (e: Entity) => ({ "@type": "Thing", name: e.name, sameAs: e.url });

/**
 * WebPage node carrying topical grounding. `about` is the page's subject;
 * `mentions` are supporting entities. Keep `about` to one or two — a page
 * that claims to be about nine things is about none of them.
 */
export function webPageSchema({
  name,
  description,
  path,
  about = [],
  mentions = [],
  lastReviewed,
  speakableSelectors,
}: {
  name: string;
  description: string;
  path: string;
  about?: Entity[];
  mentions?: Entity[];
  lastReviewed?: string;
  speakableSelectors?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${site.url}${path}#webpage`,
    url: `${site.url}${path}`,
    name,
    description,
    isPartOf: { "@id": `${site.url}/#website` },
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
    ...(lastReviewed ? { lastReviewed, dateModified: lastReviewed } : {}),
    ...(about.length ? { about: about.map(thing) } : {}),
    ...(mentions.length ? { mentions: mentions.map(thing) } : {}),
    ...(speakableSelectors?.length
      ? { speakable: { "@type": "SpeakableSpecification", cssSelector: speakableSelectors } }
      : {}),
  };
}

/* ---------------------------------------------------------------- Glossary */

export function definedTermSchema(t: {
  term: string;
  slug: string;
  answer: string;
  aliases?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": `${site.url}/glossary/${t.slug}#term`,
    name: t.term,
    description: t.answer,
    url: `${site.url}/glossary/${t.slug}`,
    ...(t.aliases?.length ? { alternateName: t.aliases } : {}),
    inDefinedTermSet: { "@id": `${site.url}/glossary#termset` },
  };
}

export function definedTermSetSchema(terms: { term: string; slug: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${site.url}/glossary#termset`,
    name: "Medical Billing and Revenue Cycle Glossary",
    description:
      "Plain-English definitions of medical billing, coding, denial and revenue cycle terminology.",
    url: `${site.url}/glossary`,
    publisher: { "@id": ORG_ID },
    hasDefinedTerm: terms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      url: `${site.url}/glossary/${t.slug}`,
    })),
  };
}

/* -------------------------------------------------------------- Comparison */

/**
 * Comparison pages are emitted as an Article with an explicit ItemList of the
 * two options, rather than as a Product comparison — we are not selling either
 * side of "in-house vs outsourced", and Product markup would misrepresent it.
 */
export function comparisonSchema(c: {
  title: string;
  question: string;
  answer: string;
  slug: string;
  labelA: string;
  labelB: string;
  lastReviewed: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${site.url}/compare/${c.slug}#article`,
    headline: c.title,
    description: c.answer,
    url: `${site.url}/compare/${c.slug}`,
    datePublished: c.lastReviewed,
    dateModified: c.lastReviewed,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: `${site.url}/compare/${c.slug}`,
    about: {
      "@type": "ItemList",
      name: c.title,
      itemListElement: [c.labelA, c.labelB].map((name, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name,
      })),
    },
  };
}

/* ------------------------------------------------------------------- HowTo */

export function howToSchema(h: {
  name: string;
  description: string;
  path: string;
  steps: { name: string; text: string }[];
  totalTime?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: h.name,
    description: h.description,
    url: `${site.url}${h.path}`,
    ...(h.totalTime ? { totalTime: h.totalTime } : {}),
    step: h.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

/* ----------------------------------------------------------------- Dataset */

/**
 * The benchmarks page is genuinely a dataset — a curated set of published
 * figures with named provenance. Dataset markup is how a machine finds it,
 * and `citation` is how it verifies the provenance without trusting us.
 */
export function datasetSchema(d: {
  name: string;
  description: string;
  path: string;
  lastReviewed: string;
  citations: string[];
  keywords: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${site.url}${d.path}#dataset`,
    name: d.name,
    description: d.description,
    url: `${site.url}${d.path}`,
    dateModified: d.lastReviewed,
    creator: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    isAccessibleForFree: true,
    keywords: d.keywords,
    license: "https://creativecommons.org/licenses/by/4.0/",
    citation: d.citations,
  };
}

/* ------------------------------------------------------------------- Offer */

export function offerCatalogSchema(tiers: {
  name: string;
  description: string;
  price?: string;
  priceCurrency?: string;
  unit?: string;
}[]) {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: `${site.name} medical billing pricing`,
    url: `${site.url}/pricing`,
    provider: { "@id": ORG_ID },
    itemListElement: tiers.map((t, i) => ({
      "@type": "Offer",
      position: i + 1,
      name: t.name,
      description: t.description,
      url: `${site.url}/pricing`,
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        ...(t.price ? { price: t.price } : {}),
        priceCurrency: t.priceCurrency ?? "USD",
        ...(t.unit ? { unitText: t.unit } : {}),
        valueAddedTaxIncluded: false,
      },
    })),
  };
}

/* -------------------------------------------------------------- Q&A / FAQ */

/**
 * A single answer-bearing question, for pages that answer one question rather
 * than a list. QAPage is a closer fit than FAQPage where the page IS the
 * answer — comparison pages, for instance.
 */
export function qaPageSchema(q: {
  question: string;
  answer: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "QAPage",
    "@id": `${site.url}${q.path}#qa`,
    mainEntity: {
      "@type": "Question",
      name: q.question,
      text: q.question,
      answerCount: 1,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
        url: `${site.url}${q.path}`,
      },
    },
  };
}
