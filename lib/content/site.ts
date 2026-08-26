/**
 * Single source of truth for company identity and contact details.
 * Every value marked PLACEHOLDER came from the reference site as dummy data
 * and must be replaced with real details before launch.
 */
export const site = {
  name: "Vizora",
  legalName: "Vizora LLC",
  tagline: "Medical billing that helps practices collect more",
  description:
    "Vizora is a medical billing and revenue cycle management company helping healthcare practices reduce claim denials, accelerate reimbursement, and recover aging AR.",
  url: "https://vizora.co",
  phone: "(307) 370-3902",
  phoneHref: "tel:+13073703902",
  email: "info@vizora.co", // PLACEHOLDER
  hours: "Monday – Friday, 9am – 5pm EST",
  responseTime: "We respond within 24 hours on business days",
  /**
   * PLACEHOLDER — the reference site publishes no postal address anywhere.
   * A real address is required before LocalBusiness schema or local SEO is
   * worth attempting. Left null so schema.ts omits the block rather than
   * emitting a fabricated one.
   */
  address: null as null | {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  },
  /**
   * Confirmed by the owner 2026-08-26. Replaces the inherited "2015", which was
   * dummy data published as both schema `foundingDate` and a "Since 2015" badge.
   * Emitted as `foundingDate` in organizationSchema.
   */
  founded: "2024",
  /**
   * Team size, confirmed by the owner 2026-08-26 as "50+".
   *
   * Emitted as a QuantitativeValue with `minValue` only, which is what "50+"
   * actually asserts. A single figure would state a precision we do not have.
   */
  employeesMin: 50,
  /**
   * Public profiles, emitted as schema `sameAs` — the property search engines
   * use to reconcile this business against entities they already know.
   *
   * Deliberately empty: no profiles exist yet, and pointing `sameAs` at URLs
   * that 404 is a worse entity signal than omitting it. `organizationSchema()`
   * drops the property entirely while this is empty. Add real profile URLs
   * here as they go live and the schema picks them up with no code change.
   */
  social: {} as Record<string, string>,
  /**
   * Search engine ownership verification.
   *
   * Only needed if you verify by HTML meta tag. DNS TXT verification is the
   * better route and needs nothing here — it proves ownership of the domain
   * itself, so it covers apex, www, http and https in one record and survives
   * a change of host. Leave these empty unless you deliberately chose the tag.
   *
   * Empty strings are omitted from the rendered metadata rather than emitted
   * blank, because an empty verification tag is a broken signal, not a neutral
   * one.
   */
  verification: {
    google: "",
    bing: "",
  },
  pricing: {
    /**
     * Vizora's own rates, confirmed by the owner 2026-08-20.
     *
     * Deliberately NOT the same as the industry-typical 4–8% quoted in
     * educational content on the blog and the pricing-model comparison pages.
     * That figure describes the market; this one describes us, and sitting
     * below the market range is the point. Do not reconcile the two.
     */
    startingRate: "3%",
    typicalRange: "3–6%",
    model: "percentage of net collections",
    note: "You only pay when we collect. No setup fees, no hidden charges.",
  },
} as const;

/**
 * Compliance claims. Everything in this list is published in the footer on
 * every page and on /about, so it must be true and currently held.
 *
 * SOC 2 Type II, ISO 27001, HITRUST, PCI DSS, AAPC and AHIMA were inherited
 * from the reference site as unverified placeholders and have been REMOVED —
 * they are formal, auditable claims that a prospect can ask to see a report
 * for, and publishing one that is not held is a material misrepresentation
 * rather than a marketing flourish.
 *
 * Add an entry back only when the certification is actually held. `verified`
 * must be true for anything in this array.
 */
export const certifications = [
  { label: "HIPAA Compliant", detail: "Signed BAA available on request", verified: true },
] as const;

export const payers = [
  "Aetna", "Cigna", "UnitedHealthcare", "Blue Cross Blue Shield", "Humana",
  "Medicare", "Medicaid", "Anthem", "Kaiser Permanente", "Centene",
  "Molina Healthcare", "Tricare",
] as const;
