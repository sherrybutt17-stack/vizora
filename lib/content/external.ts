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
  /**
   * Stable short key, used to attach refs to a denial code, modifier,
   * glossary term or specialty. Deliberately not derived from `label` —
   * an editorial rewording of a label should not silently break a mapping.
   */
  id: string;
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
    id: "claims-processing-manual",
    label: "Medicare Claims Processing Manual",
    url: "https://www.cms.gov/regulations-and-guidance/guidance/manuals/internet-only-manuals-ioms",
    publisher: "Centers for Medicare & Medicaid Services",
    description:
      "The operative manual for how Medicare claims must be coded, submitted, adjusted and appealed. When a payer policy and a vendor's advice disagree, this settles it.",
    category: "regulation",
  },
  {
    id: "cms-0057-f",
    label: "CMS Interoperability and Prior Authorization Final Rule (CMS-0057-F)",
    url: "https://www.cms.gov/priorities/key-initiatives/burden-reduction/interoperability/policies-and-regulations",
    publisher: "Centers for Medicare & Medicaid Services",
    description:
      "The rule imposing prior authorization decision timelines and API requirements on impacted payers. It is the single largest scheduled change to authorization workflow this decade.",
    category: "regulation",
  },
  {
    id: "no-surprises-act",
    label: "No Surprises Act guidance",
    url: "https://www.cms.gov/nosurprises",
    publisher: "Centers for Medicare & Medicaid Services",
    description:
      "Balance billing restrictions, good faith estimates and the independent dispute resolution process — all of which change what a practice may bill a patient.",
    category: "regulation",
  },
  {
    id: "physician-fee-schedule",
    label: "Medicare Physician Fee Schedule lookup",
    url: "https://www.cms.gov/medicare/physician-fee-schedule/search",
    publisher: "Centers for Medicare & Medicaid Services",
    description:
      "Official allowed amounts by CPT/HCPCS code and locality. The reference point most commercial contracts are written against as a percentage.",
    category: "regulation",
  },

  // ---------------------------------------------------------- code sets
  {
    id: "x12-carc",
    label: "Claim Adjustment Reason Codes (CARC)",
    url: "https://x12.org/codes/claim-adjustment-reason-codes",
    publisher: "X12",
    description:
      "The authoritative, maintained CARC list. Our denial code lookup explains these in plain English; X12 is where the canonical definitions live.",
    category: "code-sets",
  },
  {
    id: "x12-rarc",
    label: "Remittance Advice Remark Codes (RARC)",
    url: "https://x12.org/codes/remittance-advice-remark-codes",
    publisher: "X12",
    description:
      "The remark codes that qualify a CARC on an ERA. Reading the RARC is usually what tells you whether a denial is appealable.",
    category: "code-sets",
  },
  {
    id: "ama-cpt",
    label: "CPT code set",
    url: "https://www.ama-assn.org/practice-management/cpt",
    publisher: "American Medical Association",
    description:
      "Maintainer of CPT. Annual changes to CPT are the most common cause of a sudden, unexplained rise in denials each January.",
    category: "code-sets",
  },
  {
    id: "icd-10-cm",
    label: "ICD-10-CM official guidelines and files",
    url: "https://www.cdc.gov/nchs/icd/icd-10-cm/index.html",
    publisher: "CDC / National Center for Health Statistics",
    description:
      "The official ICD-10-CM code files and coding guidelines, updated annually. Specificity requirements here drive a large share of medical necessity denials.",
    category: "code-sets",
  },
  {
    id: "hcpcs-level-ii",
    label: "HCPCS Level II code set",
    url: "https://www.cms.gov/medicare/coding-billing/healthcare-common-procedure-system",
    publisher: "Centers for Medicare & Medicaid Services",
    description:
      "Codes for supplies, drugs, DME and services outside CPT — and the modifier definitions that go with them.",
    category: "code-sets",
  },
  {
    id: "ncci-edits",
    label: "National Correct Coding Initiative (NCCI) edits",
    url: "https://www.cms.gov/medicare/coding-billing/national-correct-coding-initiative-ncci-edits",
    publisher: "Centers for Medicare & Medicaid Services",
    description:
      "The procedure-to-procedure and medically-unlikely edits behind most bundling denials. Checking these before submission prevents the denial entirely.",
    category: "code-sets",
  },
  {
    id: "nucc-cms-1500",
    label: "CMS-1500 claim form standards",
    url: "https://www.nucc.org",
    publisher: "National Uniform Claim Committee",
    description:
      "Maintainer of the CMS-1500 professional claim form and its data element definitions, plus the provider taxonomy code set.",
    category: "code-sets",
  },

  // ---------------------------------------------------------- benchmarks
  {
    id: "optum-denials-index",
    label: "Revenue Cycle Denials Index",
    url: "https://business.optum.com/en/insights/denials-index.html",
    publisher: "Optum",
    description:
      "Denial rates and denial causes derived from roughly 124 million hospital claim remits. Source of the avoidability and front-end origination figures used across this site.",
    category: "benchmarks",
  },
  {
    id: "mgma-data",
    label: "MGMA DataDive and MGMA Stat",
    url: "https://www.mgma.com/datadive",
    publisher: "Medical Group Management Association",
    description:
      "The practice-level operations benchmarks — days in AR, denial rate, cost to collect — that physician groups are actually measured against.",
    category: "benchmarks",
  },
  {
    id: "hfma-map-keys",
    label: "MAP Keys revenue cycle metrics",
    url: "https://www.hfma.org",
    publisher: "Healthcare Financial Management Association",
    description:
      "Standard definitions for revenue cycle KPIs. Worth reading precisely because HFMA defines the metrics without publishing public target values — a distinction most vendor marketing ignores.",
    category: "benchmarks",
  },
  {
    id: "caqh-index",
    label: "CAQH Index: cost of administrative transactions",
    url: "https://www.caqh.org/insights/caqh-index-report",
    publisher: "CAQH",
    description:
      "Per-transaction cost of eligibility checks, claim status inquiries and prior authorization, manual versus electronic. The best public evidence for automating front-end work.",
    category: "benchmarks",
  },
  {
    id: "kff-denials",
    label: "Claims denials and appeals research",
    url: "https://www.kff.org/private-insurance/",
    publisher: "KFF",
    description:
      "Independent analysis of in-network denial rates and how rarely denials are appealed on the marketplace side. Useful counterweight to vendor-published statistics.",
    category: "benchmarks",
  },

  // ---------------------------------------------------------- credentialing
  {
    id: "nppes",
    label: "NPI Registry (NPPES)",
    url: "https://npiregistry.cms.hhs.gov",
    publisher: "Centers for Medicare & Medicaid Services",
    description:
      "Public lookup and management for National Provider Identifiers. A stale NPPES record is a quietly common cause of enrollment and claim rejections.",
    category: "credentialing",
  },
  {
    id: "pecos",
    label: "PECOS Medicare enrollment",
    url: "https://pecos.cms.hhs.gov",
    publisher: "Centers for Medicare & Medicaid Services",
    description:
      "Where Medicare provider enrollment is filed and maintained. Revalidation deadlines missed here stop payment outright.",
    category: "credentialing",
  },
  {
    id: "caqh-proview",
    label: "CAQH ProView",
    url: "https://proview.caqh.org",
    publisher: "CAQH",
    description:
      "The credentialing profile most commercial payers pull from. Attestation lapses here are the most frequent cause of stalled commercial credentialing.",
    category: "credentialing",
  },
  {
    id: "aapc",
    label: "AAPC certification and coding resources",
    url: "https://www.aapc.com",
    publisher: "AAPC",
    description:
      "Certifying body for CPC, CPB and CPMA credentials, and a widely used reference for coding guidance and audit standards.",
    category: "credentialing",
  },
  {
    id: "ahima",
    label: "AHIMA professional standards",
    url: "https://www.ahima.org",
    publisher: "American Health Information Management Association",
    description:
      "Health information management standards, including documentation integrity and clinical documentation improvement guidance.",
    category: "credentialing",
  },

  // ---------------------------------------------------------- payers
  {
    id: "find-your-mac",
    label: "Find your Medicare Administrative Contractor",
    url: "https://www.cms.gov/medicare/coding-billing/medicare-administrative-contractors-macs/who-are-macs",
    publisher: "Centers for Medicare & Medicaid Services",
    description:
      "Which MAC processes your Part B claims, by state. Local Coverage Determinations vary by MAC, so this determines which medical necessity policies apply to you.",
    category: "payers",
  },
  {
    id: "medicare-coverage-database",
    label: "Medicare Coverage Database (LCD/NCD)",
    url: "https://www.cms.gov/medicare-coverage-database/search.aspx",
    publisher: "Centers for Medicare & Medicaid Services",
    description:
      "Searchable national and local coverage determinations. The direct answer to whether a diagnosis supports medical necessity for a given procedure.",
    category: "payers",
  },
  {
    id: "medicaid-directory",
    label: "State Medicaid program overviews",
    url: "https://www.medicaid.gov/state-overviews",
    publisher: "Medicaid.gov",
    description:
      "Program structure, delivery model and waivers by state. Our state pages summarise the program name and delivery model; this is the authoritative source behind them.",
    category: "payers",
  },

  // ---------------------------------------------------------- compliance
  {
    id: "hipaa-professionals",
    label: "HIPAA for professionals",
    url: "https://www.hhs.gov/hipaa/for-professionals/index.html",
    publisher: "HHS Office for Civil Rights",
    description:
      "The Privacy, Security and Breach Notification Rules in their authoritative form, including what a billing vendor is permitted to do with PHI.",
    category: "compliance",
  },
  {
    id: "hhs-baa",
    label: "Sample Business Associate Agreement provisions",
    url: "https://www.hhs.gov/hipaa/for-professionals/covered-entities/sample-business-associate-agreement-provisions/index.html",
    publisher: "HHS Office for Civil Rights",
    description:
      "The government's own BAA language. Compare any billing company's BAA against it before signing.",
    category: "compliance",
  },
  {
    id: "oig-compliance",
    label: "OIG compliance program guidance",
    url: "https://oig.hhs.gov/compliance/compliance-guidance/",
    publisher: "HHS Office of Inspector General",
    description:
      "What a defensible billing compliance program looks like, including guidance written specifically for individual and small group physician practices.",
    category: "compliance",
  },
  {
    id: "ocr-breach-portal",
    label: "HIPAA breach portal",
    url: "https://ocrportal.hhs.gov/ocr/breach/breach_report.jsf",
    publisher: "HHS Office for Civil Rights",
    description:
      "Public record of reported breaches affecting 500+ individuals. Worth searching any vendor you are about to hand PHI to.",
    category: "compliance",
  },
  // --- added so per-page citation can be specific rather than generic ---
  // Twenty-eight sources covered the site's hub pages. Attaching references
  // to individual denial codes, modifiers and specialties needs finer grain:
  // a bundling denial should cite the NCCI policy manual, not "CMS".
  {
    id: "ncci-policy-manual",
    label: "NCCI Policy Manual for Medicare Services",
    url: "https://www.cms.gov/medicare/coding-billing/national-correct-coding-initiative-ncci-edits/medicare-ncci-policy-manual",
    publisher: "Centers for Medicare & Medicaid Services",
    description:
      "The reasoning behind the edits, chapter by chapter. Where the edit files tell you two codes conflict, this explains why — which is what an appeal has to address.",
    category: "code-sets",
  },
  {
    id: "mue-tables",
    label: "Medically Unlikely Edits (MUE) tables",
    url: "https://www.cms.gov/medicare/coding-billing/national-correct-coding-initiative-ncci-edits/medicare-ncci-medically-unlikely-edits",
    publisher: "Centers for Medicare & Medicaid Services",
    description:
      "The maximum units of a code payable for one patient on one day. Unit-based denials usually trace to this table rather than to a coding error.",
    category: "code-sets",
  },
  {
    id: "global-surgery-booklet",
    label: "Global Surgery booklet",
    url: "https://www.cms.gov/files/document/mln907166-global-surgery-booklet.pdf",
    publisher: "Centers for Medicare & Medicaid Services",
    description:
      "What the 10 and 90-day global periods include, and which modifiers break out of them. The authority behind most postoperative bundling disputes.",
    category: "regulation",
  },
  {
    id: "medicare-appeals",
    label: "Medicare claims appeals process",
    url: "https://www.cms.gov/medicare/appeals-grievances/fee-for-service",
    publisher: "Centers for Medicare & Medicaid Services",
    description:
      "The five levels of appeal, what each requires and the deadline for each. Missing a level's deadline ends the appeal regardless of the claim's merits.",
    category: "regulation",
  },
  {
    id: "abn-forms",
    label: "Advance Beneficiary Notice of Noncoverage (ABN)",
    url: "https://www.cms.gov/medicare/forms-notices/beneficiary-notices-initiative/ffs-abn",
    publisher: "Centers for Medicare & Medicaid Services",
    description:
      "The form and the rules for issuing it. Whether a non-covered service can be billed to the patient usually turns on whether a valid ABN was obtained beforehand.",
    category: "regulation",
  },
  {
    id: "oig-work-plan",
    label: "OIG Work Plan",
    url: "https://oig.hhs.gov/reports/work-plan/",
    publisher: "HHS Office of Inspector General",
    description:
      "What the OIG has said it will audit and when. The clearest available signal of which coding patterns are about to receive attention.",
    category: "compliance",
  },
  {
    id: "medicare-benefit-policy-manual",
    label: "Medicare Benefit Policy Manual",
    url: "https://www.cms.gov/regulations-and-guidance/guidance/manuals/internet-only-manuals-ioms-items/cms012673",
    publisher: "Centers for Medicare & Medicaid Services",
    description:
      "What Medicare covers and under what conditions, as distinct from how a claim is processed. The starting point for any coverage or medical necessity question.",
    category: "payers",
  },
  {
    id: "place-of-service-codes",
    label: "Place of Service code set",
    url: "https://www.cms.gov/medicare/coding-billing/place-of-service-codes/code-sets",
    publisher: "Centers for Medicare & Medicaid Services",
    description:
      "The two-digit codes and their definitions. Place of service drives the facility versus non-facility payment rate, so an error here changes the amount paid, not just the acceptance.",
    category: "code-sets",
  },
  {
    id: "msp-manual",
    label: "Medicare Secondary Payer Manual",
    url: "https://www.cms.gov/regulations-and-guidance/guidance/manuals/downloads/msp105c01.pdf",
    publisher: "Centers for Medicare & Medicaid Services",
    description:
      "When Medicare pays second, and to whom the claim goes first. Coordination-of-benefits denials are resolved here rather than with the patient.",
    category: "payers",
  },
  {
    id: "telehealth-billing",
    label: "Medicare telehealth billing",
    url: "https://www.cms.gov/medicare/coverage/telehealth",
    publisher: "Centers for Medicare & Medicaid Services",
    description:
      "Current telehealth code list, place of service and modifier conventions. This area has changed repeatedly, so the date on any secondary guidance matters.",
    category: "payers",
  },
  {
    id: "clia-certification",
    label: "CLIA certification and permitted testing",
    url: "https://www.cms.gov/medicare/quality/clinical-laboratory-improvement-amendments",
    publisher: "Centers for Medicare & Medicaid Services",
    description:
      "Which laboratory tests a certificate permits a practice to bill. A test outside the certificate's scope is denied on the certificate, not on the coding.",
    category: "credentialing",
  },
  {
    id: "dmepos-supplier-standards",
    label: "DMEPOS supplier standards and enrollment",
    url: "https://www.cms.gov/medicare/enrollment-renewal/providers-suppliers/durable-medical-equipment-prosthetics-orthotics-supplies-dmepos",
    publisher: "Centers for Medicare & Medicaid Services",
    description:
      "Supplier enrollment requirements and documentation standards for durable medical equipment, prosthetics, orthotics and supplies.",
    category: "credentialing",
  },
  {
    id: "owcp-workers-comp",
    label: "Workers' compensation medical billing",
    url: "https://www.dol.gov/agencies/owcp/regs/feeschedule/fee",
    publisher: "US Department of Labor, OWCP",
    description:
      "Federal workers' compensation fee schedule and billing requirements. State programs differ, but the structural rules are the same: a separate payer with its own schedule.",
    category: "payers",
  },
  {
    id: "em-documentation-guidelines",
    label: "Evaluation and Management services guide",
    url: "https://www.cms.gov/outreach-and-education/medicare-learning-network-mln/mlnproducts/downloads/eval-mgmt-serv-guide-icn006764.pdf",
    publisher: "Centers for Medicare & Medicaid Services",
    description:
      "How E/M level is determined under the current medical decision making and time rules. The reference for any dispute about whether documentation supports a level.",
    category: "code-sets",
  },
  {
    id: "timely-filing-medicare",
    label: "Medicare timely filing requirements",
    url: "https://www.cms.gov/regulations-and-guidance/guidance/transmittals/downloads/r735otn.pdf",
    publisher: "Centers for Medicare & Medicaid Services",
    description:
      "The one-year filing limit and the narrow exceptions to it. Commercial payers set their own, usually shorter, limits by contract.",
    category: "regulation",
  },
];

export const refsByCategory = (category: ExternalCategory) =>
  externalRefs.filter((r) => r.category === category);

const refById = new Map(externalRefs.map((r) => [r.id, r]));

/**
 * Resolve ref ids to refs, in the order given.
 *
 * Unknown ids are dropped rather than throwing, because a citation block is
 * decoration on a page that is already useful — a typo in a mapping should not
 * take a denial code page down. `scripts/check-refs.mjs` fails the build on an
 * unknown id, so the typo still gets caught, just not at request time.
 */
export const getRefs = (ids: readonly string[]): ExternalRef[] =>
  ids.map((id) => refById.get(id)).filter((r): r is ExternalRef => Boolean(r));

export const externalRefIds = externalRefs.map((r) => r.id);
