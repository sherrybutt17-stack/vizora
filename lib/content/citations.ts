import type { DenialCategory } from "./denial-codes";
import type { ModifierCategory } from "./modifiers";
import type { GlossaryCategory } from "./glossary";

/**
 * Which primary sources each page cites.
 *
 * Outbound citation to a primary source is the single highest-impact thing a
 * page can do for AI citation — and until now `external.ts` reached exactly one
 * page on this site while 177 content pages cited nothing at all.
 *
 * The mapping is by category rather than per-entry because that is what is
 * actually true: every bundling denial is governed by the NCCI policy manual,
 * every coverage denial by the Medicare Coverage Database. Ten denial
 * categories, six modifier categories and six glossary categories give real
 * variation across the site without pretending each of 115 pages has a unique
 * bibliography.
 *
 * `*Overrides` exists for the cases where the category default is not the best
 * available answer — CO-29 is a timely filing code, but the specific filing
 * limit document is a better citation than the generic appeals page.
 *
 * Rule: only cite a source that genuinely bears on the page. A page with two
 * relevant citations is better than one with four, two of which are padding.
 */

const denialByCategory: Record<DenialCategory, string[]> = {
  Bundling: ["ncci-policy-manual", "ncci-edits", "claims-processing-manual"],
  Coding: ["ama-cpt", "x12-carc", "ncci-edits"],
  Coverage: ["medicare-coverage-database", "medicare-benefit-policy-manual", "abn-forms"],
  Authorization: ["cms-0057-f", "medicare-coverage-database", "claims-processing-manual"],
  Eligibility: ["msp-manual", "medicare-coverage-database", "x12-carc"],
  "Provider eligibility": ["pecos", "nppes", "claims-processing-manual"],
  Documentation: ["em-documentation-guidelines", "claims-processing-manual", "medicare-appeals"],
  "Timely filing": ["timely-filing-medicare", "medicare-appeals", "claims-processing-manual"],
  Contractual: ["physician-fee-schedule", "claims-processing-manual", "x12-carc"],
  "Patient responsibility": ["abn-forms", "no-surprises-act", "x12-carc"],
  "Data quality": ["x12-rarc", "nucc-cms-1500", "nppes"],
  "Liability and workers comp": ["owcp-workers-comp", "msp-manual", "claims-processing-manual"],
};

const denialOverrides: Record<string, string[]> = {
  "CO-97": ["ncci-policy-manual", "ncci-edits", "global-surgery-booklet"],
  "CO-45": ["physician-fee-schedule", "claims-processing-manual"],
  "CO-16": ["x12-rarc", "x12-carc", "nucc-cms-1500"],
  "CO-29": ["timely-filing-medicare", "medicare-appeals"],
  "CO-50": ["medicare-coverage-database", "medicare-benefit-policy-manual", "abn-forms"],
  "CO-59": ["claims-processing-manual", "physician-fee-schedule", "ncci-policy-manual"],
  "CO-B15": ["ncci-policy-manual", "claims-processing-manual"],
  "CO-151": ["mue-tables", "medicare-coverage-database", "claims-processing-manual"],
  "CO-167": ["medicare-coverage-database", "icd-10-cm"],
  "CO-4": ["hcpcs-level-ii", "ncci-policy-manual", "ama-cpt"],
  "CO-11": ["icd-10-cm", "medicare-coverage-database"],
  "CO-96": ["medicare-benefit-policy-manual", "abn-forms", "medicare-coverage-database"],
  "CO-109": ["find-your-mac", "msp-manual", "medicaid-directory"],
  "CO-22": ["msp-manual", "claims-processing-manual"],
  "PR-204": ["medicare-benefit-policy-manual", "abn-forms"],
  "PR-1": ["claims-processing-manual", "no-surprises-act"],
  "PR-2": ["claims-processing-manual", "no-surprises-act"],
  "PR-3": ["claims-processing-manual", "no-surprises-act"],
};

export const refsForDenialCode = (code: string, category: DenialCategory): string[] =>
  denialOverrides[code] ?? denialByCategory[category];

const modifierByCategory: Record<ModifierCategory, string[]> = {
  "Evaluation and management": ["em-documentation-guidelines", "ncci-policy-manual", "ama-cpt"],
  "Global period": ["global-surgery-booklet", "claims-processing-manual", "ama-cpt"],
  Component: ["physician-fee-schedule", "claims-processing-manual", "ama-cpt"],
  "Multiple and bilateral": ["physician-fee-schedule", "claims-processing-manual", "ncci-policy-manual"],
  Repeat: ["ncci-policy-manual", "mue-tables", "ama-cpt"],
  "Coverage attestation": ["abn-forms", "medicare-coverage-database", "hcpcs-level-ii"],
};

const modifierOverrides: Record<string, string[]> = {
  "59": ["ncci-policy-manual", "ncci-edits", "oig-work-plan"],
  XS: ["ncci-policy-manual", "ncci-edits", "oig-work-plan"],
  XE: ["ncci-policy-manual", "ncci-edits"],
  XP: ["ncci-policy-manual", "ncci-edits"],
  XU: ["ncci-policy-manual", "ncci-edits"],
  "25": ["em-documentation-guidelines", "ncci-policy-manual", "oig-work-plan"],
  "95": ["telehealth-billing", "place-of-service-codes", "ama-cpt"],
  KX: ["dmepos-supplier-standards", "medicare-coverage-database", "hcpcs-level-ii"],
  GA: ["abn-forms", "medicare-coverage-database"],
  "91": ["clia-certification", "mue-tables", "ncci-policy-manual"],
};

export const refsForModifier = (code: string, category: ModifierCategory): string[] =>
  modifierOverrides[code] ?? modifierByCategory[category];

const glossaryByCategory: Record<GlossaryCategory, string[]> = {
  claims: ["nucc-cms-1500", "claims-processing-manual", "caqh-index"],
  coding: ["ama-cpt", "icd-10-cm", "hcpcs-level-ii"],
  denials: ["x12-carc", "x12-rarc", "medicare-appeals"],
  financial: ["mgma-data", "hfma-map-keys", "physician-fee-schedule"],
  payers: ["find-your-mac", "medicare-coverage-database", "msp-manual"],
  compliance: ["hipaa-professionals", "oig-compliance", "hhs-baa"],
};

const glossaryOverrides: Record<string, string[]> = {
  "ncci-edits": ["ncci-policy-manual", "ncci-edits", "mue-tables"],
  modifier: ["ama-cpt", "hcpcs-level-ii", "ncci-policy-manual"],
  "e-m-coding": ["em-documentation-guidelines", "ama-cpt", "oig-work-plan"],
  "timely-filing": ["timely-filing-medicare", "medicare-appeals"],
  "medical-necessity": ["medicare-coverage-database", "medicare-benefit-policy-manual", "abn-forms"],
  "prior-authorization": ["cms-0057-f", "caqh-index", "medicare-coverage-database"],
  credentialing: ["pecos", "caqh-proview", "nppes"],
  npi: ["nppes", "nucc-cms-1500"],
  appeal: ["medicare-appeals", "x12-carc", "kff-denials"],
  "coordination-of-benefits": ["msp-manual", "claims-processing-manual"],
  "out-of-network": ["no-surprises-act", "kff-denials"],
  "patient-responsibility": ["no-surprises-act", "abn-forms"],
  upcoding: ["oig-compliance", "oig-work-plan", "em-documentation-guidelines"],
  undercoding: ["em-documentation-guidelines", "oig-compliance"],
  hipaa: ["hipaa-professionals", "ocr-breach-portal"],
  "business-associate-agreement": ["hhs-baa", "hipaa-professionals"],
  "minimum-necessary": ["hipaa-professionals", "oig-compliance"],
  "allowed-amount": ["physician-fee-schedule", "claims-processing-manual"],
  "contractual-adjustment": ["physician-fee-schedule", "x12-carc"],
  underpayment: ["physician-fee-schedule", "mgma-data"],
  "denial-rate": ["optum-denials-index", "mgma-data", "kff-denials"],
  "days-in-ar": ["mgma-data", "hfma-map-keys"],
  "net-collection-rate": ["mgma-data", "hfma-map-keys"],
  carc: ["x12-carc", "x12-rarc"],
  rarc: ["x12-rarc", "x12-carc"],
  "eligibility-verification": ["caqh-index", "msp-manual"],
};

export const refsForGlossaryTerm = (slug: string, category: GlossaryCategory): string[] =>
  glossaryOverrides[slug] ?? glossaryByCategory[category];

/**
 * Specialty pages all sit on the same three questions — what does this payer
 * cover, at what rate, and under which local policy — so the base set is
 * shared and specialties with a distinct regulatory surface add to it.
 */
const specialtyBase = ["medicare-coverage-database", "physician-fee-schedule", "find-your-mac"];

const specialtyOverrides: Record<string, string[]> = {
  "mental-health": ["medicare-benefit-policy-manual", "medicare-coverage-database", "telehealth-billing"],
  radiology: ["physician-fee-schedule", "ncci-policy-manual", "medicare-coverage-database"],
  "physical-therapy": ["medicare-benefit-policy-manual", "mue-tables", "medicare-coverage-database"],
  chiropractic: ["medicare-benefit-policy-manual", "abn-forms", "medicare-coverage-database"],
  podiatry: ["medicare-coverage-database", "abn-forms", "medicare-benefit-policy-manual"],
  "urgent-care": ["place-of-service-codes", "no-surprises-act", "medicare-coverage-database"],
  anesthesia: ["physician-fee-schedule", "claims-processing-manual", "medicare-coverage-database"],
  "general-surgery": ["global-surgery-booklet", "ncci-policy-manual", "physician-fee-schedule"],
  orthopedics: ["global-surgery-booklet", "ncci-policy-manual", "medicare-coverage-database"],
  dermatology: ["ncci-policy-manual", "medicare-coverage-database", "abn-forms"],
  "family-medicine": ["em-documentation-guidelines", "medicare-coverage-database", "physician-fee-schedule"],
  "internal-medicine": ["em-documentation-guidelines", "medicare-coverage-database", "physician-fee-schedule"],
  pediatrics: ["medicaid-directory", "medicare-coverage-database", "ama-cpt"],
  nephrology: ["medicare-benefit-policy-manual", "physician-fee-schedule", "medicare-coverage-database"],
  oncology: ["medicare-coverage-database", "hcpcs-level-ii", "medicare-benefit-policy-manual"],
  "pain-management": ["medicare-coverage-database", "ncci-policy-manual", "oig-work-plan"],
  gastroenterology: ["medicare-coverage-database", "ncci-policy-manual", "abn-forms"],
  ophthalmology: ["medicare-coverage-database", "physician-fee-schedule", "ncci-policy-manual"],
  urology: ["ncci-policy-manual", "medicare-coverage-database", "physician-fee-schedule"],
  ent: ["ncci-policy-manual", "medicare-coverage-database", "physician-fee-schedule"],
  neurology: ["medicare-coverage-database", "mue-tables", "physician-fee-schedule"],
  obgyn: ["global-surgery-booklet", "medicare-coverage-database", "medicaid-directory"],
  "wound-care": ["medicare-coverage-database", "medicare-benefit-policy-manual", "abn-forms"],
  dme: ["dmepos-supplier-standards", "medicare-coverage-database", "hcpcs-level-ii"],
  cardiology: ["medicare-coverage-database", "ncci-policy-manual", "physician-fee-schedule"],
};

export const refsForSpecialty = (slug: string): string[] =>
  specialtyOverrides[slug] ?? specialtyBase;
