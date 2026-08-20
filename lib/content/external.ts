/**
 * Authoritative outbound references.
 *
 * Outbound links to primary sources are not a leak of authority — they are a
 * quality signal for both search engines and AI answer engines. The Princeton
 * GEO study found citing sources to be the single highest-impact optimization
 * (~+40% visibility). More importantly, a medical billing claim that names
 * CMS, X12 or MGMA and links to them is verifiable; one that doesn't is
 * marketing.
 *
 * Rules for this file:
 *  - Only primary sources: the body that publishes the rule, code set or data.
 *  - No competitor blogs, no aggregators, no SEO link swaps.
 *  - `authority` is used to order lists; it is an editorial judgement, not a
 *    metric.
 */

export type ExternalRef = {
  label: string;
  url: string;
  publisher: string;
  /** What a reader actually gets by following the link. */
  description: string;
  category: ExternalCategory;
};

export type ExternalCategory =
  | "regulation"
  | "code-sets"
  | "benchmarks"
  | "credentialing"
  | "payers"
  | "compliance";

export const externalCategories: { id: ExternalCategory; title: string; blurb: string }[] = [
  {
    id: "regulation",
    title: "Rules and regulation",
    blurb: "The federal sources that actually govern how a claim must be submitted, adjudicated and appealed.",
  },
  {
    id: "code-sets",
    title: "Code sets and claim standards",
    blurb: "The maintainers of CPT, ICD-10-CM, HCPCS, CARC/RARC and the claim forms themselves.",
  },
  {
    id: "benchmarks",
    title: "Industry data and benchmarks",
    blurb: "Publishers of the denial, AR and cost-to-collect figures quoted across this site.",
  },
  {
    id: "credentialing",
    title: "Credentialing and enrollment",
    blurb: "Where provider identifiers, enrollment and payer credentialing are administered.",
  },
  {
    id: "payers",
    title: "Payer and program directories",
    blurb: "Medicare contractors, Medicaid programs and coverage policy lookups.",
  },
  {
    id: "compliance",
    title: "Privacy, security and compliance",
    blurb: "HIPAA, enforcement, and the guidance that defines a compliant billing operation.",
  },
];

export const externalRefs: ExternalRef[] = [
  // ---------------------------------------------------------- regulation
  {
    label: "Medicare Claims Processing Manual",
    url: "https://www.cms.gov/regulations-and-guidance/guidance/manuals/internet-only-manuals-ioms",
    publisher: "Centers for Medicare & Medicaid Services",
    description:
      "The operative manual for how Medicare claims must be coded, submitted, adjusted and appealed. When a payer policy and a vendor's advice disagree, this settles it.",
    category: "regulation",
  },
  {
    label: "CMS Interoperability and Prior Authorization Final Rule (CMS-0057-F)",
    url: "https://www.cms.gov/priorities/key-initiatives/burden-reduction/interoperability/policies-and-regulations",
    publisher: "Centers for Medicare & Medicaid Services",
    description:
      "The rule imposing prior authorization decision timelines and API requirements on impacted payers. It is the single largest scheduled change to authorization workflow this decade.",
    category: "regulation",
  },
  {
    label: "No Surprises Act guidance",
    url: "https://www.cms.gov/nosurprises",
    publisher: "Centers for Medicare & Medicaid Services",
    description:
      "Balance billing restrictions, good faith estimates and the independent dispute resolution process — all of which change what a practice may bill a patient.",
    category: "regulation",
  },
  {
    label: "Medicare Physician Fee Schedule lookup",
    url: "https://www.cms.gov/medicare/physician-fee-schedule/search",
    publisher: "Centers for Medicare & Medicaid Services",
    description:
      "Official allowed amounts by CPT/HCPCS code and locality. The reference point most commercial contracts are written against as a percentage.",
    category: "regulation",
  },

  // ---------------------------------------------------------- code sets
  {
    label: "Claim Adjustment Reason Codes (CARC)",
    url: "https://x12.org/codes/claim-adjustment-reason-codes",
    publisher: "X12",
    description:
      "The authoritative, maintained CARC list. Our denial code lookup explains these in plain English; X12 is where the canonical definitions live.",
    category: "code-sets",
  },
  {
    label: "Remittance Advice Remark Codes (RARC)",
    url: "https://x12.org/codes/remittance-advice-remark-codes",
    publisher: "X12",
    description:
      "The remark codes that qualify a CARC on an ERA. Reading the RARC is usually what tells you whether a denial is appealable.",
    category: "code-sets",
  },
  {
    label: "CPT code set",
    url: "https://www.ama-assn.org/practice-management/cpt",
    publisher: "American Medical Association",
    description:
      "Maintainer of CPT. Annual changes to CPT are the most common cause of a sudden, unexplained rise in denials each January.",
    category: "code-sets",
  },
  {
    label: "ICD-10-CM official guidelines and files",
    url: "https://www.cdc.gov/nchs/icd/icd-10-cm/index.html",
    publisher: "CDC / National Center for Health Statistics",
    description:
      "The official ICD-10-CM code files and coding guidelines, updated annually. Specificity requirements here drive a large share of medical necessity denials.",
    category: "code-sets",
  },
  {
    label: "HCPCS Level II code set",
    url: "https://www.cms.gov/medicare/coding-billing/healthcare-common-procedure-system",
    publisher: "Centers for Medicare & Medicaid Services",
    description:
      "Codes for supplies, drugs, DME and services outside CPT — and the modifier definitions that go with them.",
    category: "code-sets",
  },
  {
    label: "National Correct Coding Initiative (NCCI) edits",
    url: "https://www.cms.gov/medicare/coding-billing/national-correct-coding-initiative-ncci-edits",
    publisher: "Centers for Medicare & Medicaid Services",
    description:
      "The procedure-to-procedure and medically-unlikely edits behind most bundling denials. Checking these before submission prevents the denial entirely.",
    category: "code-sets",
  },
  {
    label: "CMS-1500 claim form standards",
    url: "https://www.nucc.org",
    publisher: "National Uniform Claim Committee",
    description:
      "Maintainer of the CMS-1500 professional claim form and its data element definitions, plus the provider taxonomy code set.",
    category: "code-sets",
  },

  // ---------------------------------------------------------- benchmarks
  {
    label: "Revenue Cycle Denials Index",
    url: "https://business.optum.com/en/insights/denials-index.html",
    publisher: "Optum",
    description:
      "Denial rates and denial causes derived from roughly 124 million hospital claim remits. Source of the avoidability and front-end origination figures used across this site.",
    category: "benchmarks",
  },
  {
    label: "MGMA DataDive and MGMA Stat",
    url: "https://www.mgma.com/data",
    publisher: "Medical Group Management Association",
    description:
      "The practice-level operations benchmarks — days in AR, denial rate, cost to collect — that physician groups are actually measured against.",
    category: "benchmarks",
  },
  {
    label: "MAP Keys revenue cycle metrics",
    url: "https://www.hfma.org",
    publisher: "Healthcare Financial Management Association",
    description:
      "Standard definitions for revenue cycle KPIs. Worth reading precisely because HFMA defines the metrics without publishing public target values — a distinction most vendor marketing ignores.",
    category: "benchmarks",
  },
  {
    label: "CAQH Index: cost of administrative transactions",
    url: "https://www.caqh.org/insights/explorations",
    publisher: "CAQH",
    description:
      "Per-transaction cost of eligibility checks, claim status inquiries and prior authorization, manual versus electronic. The best public evidence for automating front-end work.",
    category: "benchmarks",
  },
  {
    label: "Claims denials and appeals research",
    url: "https://www.kff.org/private-insurance/",
    publisher: "KFF",
    description:
      "Independent analysis of in-network denial rates and how rarely denials are appealed on the marketplace side. Useful counterweight to vendor-published statistics.",
    category: "benchmarks",
  },

  // ---------------------------------------------------------- credentialing
  {
    label: "NPI Registry (NPPES)",
    url: "https://npiregistry.cms.hhs.gov",
    publisher: "Centers for Medicare & Medicaid Services",
    description:
      "Public lookup and management for National Provider Identifiers. A stale NPPES record is a quietly common cause of enrollment and claim rejections.",
    category: "credentialing",
  },
  {
    label: "PECOS Medicare enrollment",
    url: "https://pecos.cms.hhs.gov",
    publisher: "Centers for Medicare & Medicaid Services",
    description:
      "Where Medicare provider enrollment is filed and maintained. Revalidation deadlines missed here stop payment outright.",
    category: "credentialing",
  },
  {
    label: "CAQH ProView",
    url: "https://proview.caqh.org",
    publisher: "CAQH",
    description:
      "The credentialing profile most commercial payers pull from. Attestation lapses here are the most frequent cause of stalled commercial credentialing.",
    category: "credentialing",
  },
  {
    label: "AAPC certification and coding resources",
    url: "https://www.aapc.com",
    publisher: "AAPC",
    description:
      "Certifying body for CPC, CPB and CPMA credentials, and a widely used reference for coding guidance and audit standards.",
    category: "credentialing",
  },
  {
    label: "AHIMA professional standards",
    url: "https://www.ahima.org",
    publisher: "American Health Information Management Association",
    description:
      "Health information management standards, including documentation integrity and clinical documentation improvement guidance.",
    category: "credentialing",
  },

  // ---------------------------------------------------------- payers
  {
    label: "Find your Medicare Administrative Contractor",
    url: "https://www.cms.gov/medicare/coding-billing/electronic-billing/find-your-mac",
    publisher: "Centers for Medicare & Medicaid Services",
    description:
      "Which MAC processes your Part B claims, by state. Local Coverage Determinations vary by MAC, so this determines which medical necessity policies apply to you.",
    category: "payers",
  },
  {
    label: "Medicare Coverage Database (LCD/NCD)",
    url: "https://www.cms.gov/medicare-coverage-database/search.aspx",
    publisher: "Centers for Medicare & Medicaid Services",
    description:
      "Searchable national and local coverage determinations. The direct answer to whether a diagnosis supports medical necessity for a given procedure.",
    category: "payers",
  },
  {
    label: "State Medicaid programs and agency directory",
    url: "https://www.medicaid.gov/about-us/contact-us/index.html",
    publisher: "Medicaid.gov",
    description:
      "Program contacts and policy by state. Our state pages summarize delivery model and program name; this is the authoritative directory behind them.",
    category: "payers",
  },

  // ---------------------------------------------------------- compliance
  {
    label: "HIPAA for professionals",
    url: "https://www.hhs.gov/hipaa/for-professionals/index.html",
    publisher: "HHS Office for Civil Rights",
    description:
      "The Privacy, Security and Breach Notification Rules in their authoritative form, including what a billing vendor is permitted to do with PHI.",
    category: "compliance",
  },
  {
    label: "Sample Business Associate Agreement provisions",
    url: "https://www.hhs.gov/hipaa/for-professionals/covered-entities/sample-business-associate-agreement-provisions/index.html",
    publisher: "HHS Office for Civil Rights",
    description:
      "The government's own BAA language. Compare any billing company's BAA against it before signing.",
    category: "compliance",
  },
  {
    label: "OIG compliance program guidance",
    url: "https://oig.hhs.gov/compliance/compliance-guidance/",
    publisher: "HHS Office of Inspector General",
    description:
      "What a defensible billing compliance program looks like, including guidance written specifically for individual and small group physician practices.",
    category: "compliance",
  },
  {
    label: "HIPAA breach portal",
    url: "https://ocrportal.hhs.gov/ocr/breach/breach_report.jsf",
    publisher: "HHS Office for Civil Rights",
    description:
      "Public record of reported breaches affecting 500+ individuals. Worth searching any vendor you are about to hand PHI to.",
    category: "compliance",
  },
];

export const refsByCategory = (category: ExternalCategory) =>
  externalRefs.filter((r) => r.category === category);
