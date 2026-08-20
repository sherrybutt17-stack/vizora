/**
 * Every number rendered on this site resolves through this module.
 *
 * Two reasons this exists:
 *
 *  1. The reference site contradicted itself — clean claim rate appeared as
 *     97%, 98%, 99% and 99.2% on different pages; specialty count as 42, 45+
 *     and 50+. Conflicts below are resolved to the most conservative value.
 *
 *  2. Industry statistics render with source and year visible. Cited
 *     statistics are the largest single driver of AI-answer citation — but
 *     only if they survive scrutiny. Several figures that saturate medical
 *     billing marketing have NO verifiable primary source and are deliberately
 *     excluded; see REJECTED at the bottom of this file. Do not add a number
 *     here without a traceable publisher, dataset and year.
 */

export type Stat = { value: string; label: string; detail?: string };

export type CitedStat = Stat & {
  /** Self-contained sentence suitable for extraction/quotation. */
  claim: string;
  source: string;
  /** Year the underlying DATA is from, not the publication year. */
  dataYear: string;
  /** Sample/dataset, so the claim can be audited. */
  basis?: string;
  url?: string;
};

/**
 * Vizora's own performance claims.
 *
 * 2026-08-21 — REDUCED TO WHAT CAN BE EVIDENCED.
 *
 * Removed: cleanClaimRate 97%, denialRecovery 60%, arDays 24, paymentCycle
 * 20 days, revenueIncrease 30%, recovered $480K+. Each was published as a
 * company-wide statement of fact with no measurement behind it, and several
 * read as performance guarantees. They were inherited from the reference site
 * alongside the SOC 2 and ISO 27001 certifications already removed, and were
 * dead code here — only `onboarding` was ever rendered.
 *
 * Note that `aggregateResults` in case-studies.ts still publishes $480K+, 97%
 * and 20 days. Those are DERIVED FROM the five case studies, which the owner
 * confirmed are real engagements, so they have a stated basis these did not.
 *
 * `specialties` moved to a derived count — see specialtyCount below — because
 * the hardcoded 42 contradicted the 25 specialty pages the site actually has.
 *
 * Do not add a number here without a measurement behind it. The same rule the
 * industry benchmarks below are held to applies to our own claims.
 */
export const performance = {
  onboarding: { value: "Within 2 weeks", label: "Typical onboarding", detail: "Signed agreement to first claim submitted" },
} as const satisfies Record<string, Stat>;

/**
 * Independently sourced industry benchmarks. Every one traces to a named
 * publisher with a stated dataset. These are the numbers AI assistants quote.
 * Never render one without its source — <CitedFigure> enforces this.
 */
export const industry: Record<string, CitedStat> = {
  /** The load-bearing claim. Replaces the widely-repeated but unsourced
   *  "50–65% of denials are never reworked", which has no primary study. */
  avoidable: {
    value: "84%",
    label: "of claim denials are potentially avoidable",
    claim:
      "84% of claim denials are potentially avoidable, and 22% of those are not recoverable once they occur — meaning most denied revenue is lost to process failures that never had to happen.",
    source: "Optum Revenue Cycle Denials Index",
    dataYear: "2023",
    basis: "124 million hospital claim remits, $500B in charges, 1,400+ US hospitals",
    url: "https://business.optum.com/en/insights/denials-index.html",
  },
  frontEnd: {
    value: "44%",
    label: "of denials originate at the front end",
    claim:
      "44% of all claim denials originate in front-end revenue cycle processes such as registration, eligibility and authorization — up from 34% in 2019–20.",
    source: "Optum Revenue Cycle Denials Index",
    dataYear: "2023",
    basis: "124 million hospital claim remits across 1,400+ US hospitals",
    url: "https://business.optum.com/en/insights/denials-index.html",
  },
  topDenialReason: {
    value: "24.3%",
    label: "of denials are registration and eligibility errors",
    claim:
      "Registration and eligibility errors are the single largest denial category at 24.3%, ahead of missing or invalid claim data at 15.9% and authorization issues at 12.8%.",
    source: "Optum Revenue Cycle Denials Index",
    dataYear: "2023",
    basis: "124 million hospital claim remits across 1,400+ US hospitals",
    url: "https://business.optum.com/en/insights/denials-index.html",
  },
  practiceDenialRate: {
    value: "8%",
    label: "first-submission denial rate, physician practices",
    claim:
      "Single-specialty physician practices see an aggregate first-submission denial rate of 8%, meaning roughly one claim in twelve fails on first pass.",
    source: "MGMA DataDive Practice Operations",
    dataYear: "2023",
    basis: "Single-specialty practice cohort",
    url: "https://www.mgma.com/data",
  },
  hospitalDenialRate: {
    value: "11.8%",
    label: "initial denial rate, hospitals and health systems",
    claim:
      "The initial claim denial rate reached 11.81% in 2024, a 15.7% increase since 2020.",
    source: "Kodiak Solutions Revenue Cycle Analytics",
    dataYear: "2024",
    basis: "2,100+ hospitals and 300,000 physicians",
    url: "https://kodiaksolutions.io",
  },
  providersAbove10: {
    value: "41%",
    label: "of providers report denial rates above 10%",
    claim:
      "41% of healthcare providers now report that more than 10% of their claims are denied, up from 30% in 2022.",
    source: "Experian Health State of Claims",
    dataYear: "2025",
    basis: "250 revenue cycle decision-makers surveyed",
    url: "https://www.experian.com/healthcare/resources/state-of-claims",
  },
  reworkCost: {
    value: "$57.23",
    label: "average cost to fight a single denied claim",
    claim:
      "The average cost to contest a denied claim is $57.23, a 31% increase in a single year.",
    source: "Premier Inc.",
    dataYear: "2023",
    basis: "280 hospitals across 23 states, 48,000+ beds",
    url: "https://premierinc.com/newsroom",
  },
  overturnRate: {
    value: "~70%",
    label: "of denied claims are overturned and paid on appeal",
    claim:
      "Approximately 70% of denied claims are ultimately overturned and paid when appealed — meaning most denied revenue was collectible all along.",
    source: "Premier Inc.",
    dataYear: "2023",
    basis: "280 hospitals across 23 states",
    url: "https://premierinc.com/newsroom",
  },
  wastedSpend: {
    value: "$18B",
    label: "spent annually adjudicating claims that should have paid",
    claim:
      "US providers spend $25.7 billion a year adjudicating claims with payers, of which roughly $18 billion is potentially unnecessary.",
    source: "Premier Inc.",
    dataYear: "2023",
    basis: "280 hospitals across 23 states",
    url: "https://premierinc.com/newsroom",
  },
  arDaysMedian: {
    value: "47",
    label: "median days in accounts receivable",
    claim:
      "The median medical practice carries 47 days in accounts receivable, while better-performing practices operate at 36 days.",
    source: "MGMA Cost and Revenue Survey",
    dataYear: "2024",
    url: "https://www.mgma.com/data",
  },
  cleanClaimsHarder: {
    value: "68%",
    label: "say submitting clean claims is harder than a year ago",
    claim:
      "68% of providers say submitting clean claims has become harder than it was a year ago, and 54% report claim errors are increasing.",
    source: "Experian Health State of Claims",
    dataYear: "2025",
    basis: "250 revenue cycle decision-makers surveyed",
    url: "https://www.experian.com/healthcare/resources/state-of-claims",
  },
  adminTimePerVisit: {
    value: "~70 min",
    label: "of administrative work per patient visit",
    claim:
      "Administrative transactions consume roughly 70 minutes of provider staff time per patient visit across eligibility, claims, status inquiry and prior authorization.",
    source: "CAQH Index",
    dataYear: "2023",
    basis: "600+ provider organizations and health plans, 63% of insured lives",
    url: "https://www.caqh.org/insights/explorations",
  },
  eligibilitySavings: {
    value: "$11.7B",
    label: "annual savings available from electronic eligibility verification",
    claim:
      "Electronic eligibility and benefit verification represents an $11.7 billion annual savings opportunity for the medical industry, the largest of any administrative transaction, saving 12 minutes per verification.",
    source: "CAQH Index",
    dataYear: "2023",
    basis: "600+ provider organizations and health plans",
    url: "https://www.caqh.org/insights/explorations",
  },
  claimStatusPhone: {
    value: "25 min",
    label: "per claim status inquiry made by phone",
    claim:
      "A single claim status inquiry made by phone consumes 25 minutes of staff time — the most time-consuming administrative transaction measured.",
    source: "CAQH Index",
    dataYear: "2023",
    url: "https://www.caqh.org/insights/explorations",
  },
  inHouseBillerCost: {
    value: "~$73,000",
    label: "fully loaded annual cost of one in-house biller",
    claim:
      "One in-house medical biller costs roughly $73,000 a year fully loaded, based on a median wage of $51,140 plus benefits averaging 29.9% of total compensation.",
    source: "US Bureau of Labor Statistics (OEWS + ECEC)",
    dataYear: "2025",
    basis: "Medical Records Specialists, SOC 29-2072",
    url: "https://www.bls.gov/oes/current/oes292072.htm",
  },
  priorAuthBurden: {
    value: "13 hrs",
    label: "per physician per week on prior authorization",
    claim:
      "Physicians and their staff spend 13 hours per week on prior authorization, processing an average of 40 requests per physician.",
    source: "AMA Prior Authorization Physician Survey",
    dataYear: "2025",
    basis: "1,000 physicians surveyed",
    url: "https://www.ama-assn.org/practice-management/prior-authorization",
  },
  maPriorAuthDenials: {
    value: "80.7%",
    label: "of appealed Medicare Advantage prior-auth denials are overturned",
    claim:
      "80.7% of appealed Medicare Advantage prior authorization denials are overturned, yet only 11.5% of denials are ever appealed.",
    source: "KFF analysis of CMS Part C reporting",
    dataYear: "2024",
    basis: "52.8 million prior authorization determinations",
    url: "https://www.kff.org/medicare/",
  },
};

/**
 * Denial categories as a distribution.
 *
 * Same Optum dataset as `topDenialReason`, `frontEnd` and `avoidable` above —
 * broken out so it can be charted rather than quoted one line at a time. The
 * first three rows are the front-end categories that sum to the 44% figure.
 *
 * These are the published category shares, not estimates. Do not add a row
 * here that is not in the source table, and do not round to make them total
 * 100 — the published categories are not exhaustive.
 */
export const denialCategories = {
  source: "Optum Revenue Cycle Denials Index",
  dataYear: "2023",
  basis: "124 million hospital claim remits across 1,400+ US hospitals",
  url: "https://business.optum.com/en/insights/denials-index.html",
  categories: [
    { label: "Registration and eligibility", share: 24.33, frontEnd: true },
    { label: "Missing or invalid claim data", share: 15.89, frontEnd: true },
    { label: "Authorization and precertification", share: 12.80, frontEnd: true },
    { label: "Medical documentation requested", share: 12.08, frontEnd: false },
    { label: "Service not covered", share: 9.67, frontEnd: false },
    { label: "Medical necessity", share: 6.76, frontEnd: false },
  ],
} as const;

/**
 * REJECTED — claims deliberately excluded, recorded so nobody reintroduces them.
 *
 * "50–65% of denied claims are never reworked"
 *     No primary study, sample or methodology exists. Appears even in HFMA's
 *     own content uncited. Replaced by `avoidable` (Optum, 84%).
 * "90% of denials are preventable"
 *     Traces to an Advisory Board blog post from December 2014.
 * "$118 to rework a denied claim"
 *     Change Healthcare, 2016 data. Superseded by Premier's $57.23 (2023).
 * "$181 to rework a denied claim"
 *     No traceable source of any kind.
 * "$262 billion in denied claims"
 *     Real, but 2016 data still quoted as current.
 * "95% clean claim rate is the HFMA benchmark"
 *     HFMA publishes MAP Key definitions only — no public benchmark values.
 *     Same for "cost to collect 2–4%" and "days in AR 30–40".
 * "80% of medical bills contain errors"
 *     An advocacy group's self-selected caseload, not a study.
 * "Patient responsibility is 30%+ of provider revenue"
 *     Contradicted by Kodiak: 7.3% of net patient revenue.
 * "~75% of Medicare appeals are overturned"
 *     Conflates three different appeal processes. ALJ level is ~30%.
 */
export const REJECTED_CLAIMS = true;
