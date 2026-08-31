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
    // Exported from components/brand/Logo.tsx to public/logo.png at 512x512.
    // Google requires a resolvable image; referencing a file that does not
    // exist is the same class of error as a sameAs pointing at a 404.
    logo: {
      "@type": "ImageObject",
      url: `${site.url}/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${site.url}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: site.phone,
      email: site.email,
      areaServed: "US",
      availableLanguage: "English",
    },
    foundingDate: site.founded,
    // "50+" is a lower bound, so minValue alone is what it asserts. Publishing
    // a single figure would state a precision the business has not given.
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: site.employeesMin,
    },
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
    /**
     * Points at the denial code lookup, which is the site's actual search.
     * There is no site-wide search here, and pointing this at a URL that does
     * not resolve would advertise a capability we do not have — so it names
     * the one that does, and that tool accepts `?q=` for exactly this reason.
     */
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${site.url}/tools/denial-code-lookup?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function serviceSchema(s: {
  name: string;
  summary: string;
  /**
   * The page's own path, e.g. `/services/medical-coding`.
   *
   * This used to be a bare `slug` that the function pasted into a hardcoded
   * `/services/` template. Specialty and location pages reuse this schema, so
   * they escaped that template by passing `../specialties/cardiology`, and the
   * emitted url read `https://vizora.co/services/../specialties/cardiology` on
   * all 75 of them — a string only a consumer performing dot-segment
   * normalisation would resolve, and one that never matches the page's own
   * canonical on a literal comparison.
   */
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.summary,
    url: `${site.url}${s.path}`,
    serviceType: s.name,
    provider: { "@id": ORG_ID },
    // `foundingDate` and `numberOfEmployees` used to be asserted here too. They
    // are Organization properties, not Service ones, and the Organization node
    // on every page already carries both — so this was the same fact stated
    // twice on one page, once on a type that has no such property.
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

/**
 * TechArticle for the denial-code and modifier reference pages.
 *
 * These are not blog posts and they are not thin product pages. Each is 800
 * to 990 words of written analysis — what the code means, a worked example,
 * how to fix it and how to prevent it — which is what schema.org describes as
 * a technical article: "how-to (task) topics, step-by-step, procedural
 * troubleshooting, specifications".
 *
 * Applied ONLY where that is true. Glossary terms are definitions and stay
 * `DefinedTerm`; specialty pages are service offerings and stay `Service`.
 * Declaring Article on those to collect a point would be schema stuffing.
 */
export function techArticleSchema(p: {
  headline: string;
  description: string;
  path: string;
  updated: string;
  section: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${site.url}${p.path}#article`,
    headline: p.headline,
    description: p.description,
    url: `${site.url}${p.path}`,
    datePublished: p.updated,
    dateModified: p.updated,
    articleSection: p.section,
    image: `${site.url}/og.png`,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": `${site.url}/#website` },
    mainEntityOfPage: `${site.url}${p.path}`,
    inLanguage: "en-US",
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
    image: `${site.url}/og.png`,
    // Reference the organisation entity rather than minting a second, bare
    // Organization node. The inline version carried only a name, which left
    // Organization.url missing — a required field — and split the entity in
    // two for anything trying to reconcile who published the article.
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: `${site.url}/blog/${p.slug}`,
  };
}

/**
 * Case study page: an Article describing the engagement, plus a Review
 * carrying the client's own words attributed to them by name.
 *
 * The Review is deliberately a separate top-level object rather than nested
 * inside the Article, because the thing being reviewed is the organisation,
 * not the article about it.
 *
 * Worth knowing what this does and does not buy: Google does not render review
 * rich results for "self-serving" reviews — an entity publishing reviews of
 * itself on its own site — so this will not produce stars in the SERP. It is
 * emitted because answer engines do parse it when reconciling what an
 * organisation is and who vouches for it, which is where the value is.
 *
 * Only emit this where the testimonial is genuine and the named person has
 * agreed to be quoted. Attributed quotes are the one kind of markup where
 * being wrong is a problem beyond ranking.
 */
export function caseStudySchema(c: {
  title: string;
  slug: string;
  description: string;
  quote: string;
  clientName: string;
  clientRole: string;
  lastReviewed: string;
}) {
  const url = `${site.url}/case-studies/${c.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: c.title,
      description: c.description,
      url,
      datePublished: c.lastReviewed,
      dateModified: c.lastReviewed,
      image: `${site.url}/og.png`,
      author: { "@id": ORG_ID },
      publisher: { "@id": ORG_ID },
      mainEntityOfPage: url,
    },
    {
      "@context": "https://schema.org",
      "@type": "Review",
      itemReviewed: { "@id": ORG_ID },
      // reviewRating is deliberately omitted. Google lists it as recommended,
      // but these clients never gave a star rating — inventing one to satisfy
      // a validator would be fabricating the exact signal the property exists
      // to convey. A Review without a rating is valid.
      datePublished: c.lastReviewed,
      reviewBody: c.quote,
      author: { "@type": "Person", name: c.clientName, jobTitle: c.clientRole },
      publisher: { "@id": ORG_ID },
    },
  ];
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
    /**
     * The organisation is the author of these reference pages, and saying so
     * is both true and the thing consumers look for — a page with no author
     * of any kind reads as unattributed.
     *
     * Deliberately the Organization rather than a Person: no named byline is
     * published on this site, and inventing one to satisfy a checker would be
     * exactly the kind of fabricated signal the rest of this file avoids.
     * Blog posts carry their own `author` through articleSchema.
     */
    author: { "@id": ORG_ID },
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
    image: `${site.url}/og.png`,
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
        // Currency only alongside an actual price. A bare `priceCurrency: USD`
        // on a percentage-of-collections offer asserts a dollar figure that
        // does not exist.
        ...(t.price ? { priceCurrency: t.priceCurrency ?? "USD" } : {}),
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
/*
 * qaPageSchema was removed on 2026-08-22.
 *
 * It was emitted on all 41 glossary pages and 10 comparison pages, and Search
 * Console flagged five Q&A structured data issues against it. The fields it
 * reported missing — author, datePublished and upvoteCount — were a symptom
 * rather than the problem: QAPage is scoped by Google to pages where users can
 * submit answers to a question, and it explicitly must not be used for content
 * with a single answer and no way to add alternatives.
 *
 * Both page types now emit FAQPage instead, which is the correct type for
 * site-written answers and preserves every extractable question-answer pair.
 * Populating upvoteCount on editorial content would also have published an
 * engagement number that does not exist.
 *
 * Do not reintroduce this unless the site gains genuine user-submitted answers.
 */
