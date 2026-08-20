import { slugify } from "@/lib/utils";

/**
 * Medical billing glossary.
 *
 * Purpose is threefold:
 *  1. Search — "what is X" queries are high-volume, low-competition, and this
 *     is the one page type where a zero-authority domain can win quickly.
 *  2. AI answer engines — definitional content is disproportionately quoted.
 *     Every `answer` below is written to stand alone at 40-60 words, so it
 *     survives extraction without the surrounding page.
 *  3. Internal linking — each term links to the service pages and sibling
 *     terms it relates to, which is how link equity reaches money pages.
 *
 * Writing rules: lead with the definition, no throat-clearing, no marketing in
 * the `answer` field. If a term needs a caveat, it goes in `body`.
 */

export type GlossaryCategory =
  | "claims"
  | "coding"
  | "denials"
  | "financial"
  | "payers"
  | "compliance";

export type GlossaryTerm = {
  term: string;
  slug: string;
  /** Search variants people actually type. Used for on-page phrasing and metadata. */
  aliases?: string[];
  category: GlossaryCategory;
  /** 40-60 words. Self-contained. This is what gets quoted. */
  answer: string;
  body: string[];
  /** Concrete illustration — the thing that makes a definition stick. */
  example?: string;
  related: string[];
  services?: { label: string; href: string }[];
};

export const glossaryCategories: { id: GlossaryCategory; title: string; blurb: string }[] = [
  { id: "claims", title: "Claims and submission", blurb: "How a claim is created, transmitted and adjudicated." },
  { id: "coding", title: "Coding", blurb: "The code sets and documentation rules that determine what you can bill." },
  { id: "denials", title: "Denials and appeals", blurb: "Why claims fail, and what can be done about it." },
  { id: "financial", title: "Financial metrics", blurb: "The numbers that tell you whether a revenue cycle is working." },
  { id: "payers", title: "Payers and coverage", blurb: "Insurance mechanics, benefits and patient responsibility." },
  { id: "compliance", title: "Compliance", blurb: "Privacy, security and the rules that constrain billing operations." },
];

const raw: Omit<GlossaryTerm, "slug">[] = [
  // ------------------------------------------------------------- claims
  {
    term: "Revenue Cycle Management",
    aliases: ["RCM", "healthcare revenue cycle", "what is revenue cycle management"],
    category: "financial",
    answer:
      "Revenue cycle management is the end-to-end financial process a healthcare practice runs from the moment a patient schedules an appointment until the balance for that visit is fully paid. It covers eligibility verification, coding, claim submission, payer follow-up, denial appeals, patient billing and reporting.",
    body: [
      "Revenue cycle management is usually described as a loop rather than a line, because failures at the front end surface as denials at the back end. A missed eligibility check at scheduling becomes a CO-27 denial six weeks later, by which point the patient has moved on and the cost of correction has multiplied.",
      "Practices tend to organize the cycle into three phases. Front-end covers scheduling, registration, insurance verification and prior authorization. Mid-cycle covers documentation, coding and charge capture. Back-end covers claim submission, payment posting, denial management, appeals and patient collections.",
      "The reason the phase matters is cost. Optum's denials research attributes 44% of denials to front-end processes — the cheapest place to fix anything and the place practices invest least.",
    ],
    related: ["Days in AR", "Clean Claim Rate", "Denial Rate", "Charge Capture"],
    services: [
      { label: "Revenue cycle management", href: "/services/revenue-cycle-management" },
      { label: "Free billing audit", href: "/contact" },
    ],
  },
  {
    term: "Clean Claim",
    aliases: ["clean claim rate", "first pass rate"],
    category: "claims",
    answer:
      "A clean claim is a claim that passes payer adjudication and is paid on first submission, without rejection, denial or a request for additional information. Clean claim rate — the percentage of claims meeting that standard — is the most direct measure of whether a billing operation is working.",
    body: [
      "The distinction that trips people up is rejection versus denial. A rejected claim never entered adjudication; it failed a format or eligibility check at the clearinghouse and can be corrected and resubmitted with no appeal rights. A denied claim was adjudicated and refused, and must be appealed. Only claims that clear both count as clean.",
      "Be skeptical of published clean claim benchmarks. HFMA defines the metric through its MAP Keys but does not publish public target values, so the widely quoted \"95% HFMA benchmark\" is not something HFMA actually says. What matters more than any industry number is your own trend line and whether the failures cluster around a fixable cause.",
    ],
    example:
      "A practice submitting 1,000 claims a month with 60 rejections and 80 denials has a clean claim rate of 86% — and roughly 140 claims a month of avoidable rework.",
    related: ["Denial Rate", "Claim Scrubbing", "Clearinghouse", "Rejection"],
    services: [
      { label: "Claims management", href: "/services/claims-management" },
      { label: "Medical billing", href: "/services/medical-billing" },
    ],
  },
  {
    term: "Claim Scrubbing",
    aliases: ["claim scrubber", "pre-submission edits"],
    category: "claims",
    answer:
      "Claim scrubbing is the automated review of a claim before submission, checking it against payer rules, code edits and formatting requirements to catch errors that would cause a rejection or denial. It runs after coding and before transmission, and it is the cheapest possible point of correction.",
    body: [
      "A scrubber checks the mechanical failures first: invalid or terminated codes, missing modifiers, diagnosis-to-procedure mismatches, NCCI bundling conflicts, medically unlikely edit violations, missing referring provider NPI, demographic and policy number mismatches.",
      "The economics are unambiguous. Correcting an error in the scrubber costs minutes. Correcting the same error after denial costs an average of $57.23 per claim according to Premier's 2023 analysis, plus 30 to 60 days of delay, plus the risk of missing a timely filing deadline entirely.",
    ],
    related: ["Clean Claim", "NCCI Edits", "Clearinghouse", "Denial"],
    services: [
      { label: "Claims management", href: "/services/claims-management" },
    ],
  },
  {
    term: "Clearinghouse",
    aliases: ["medical billing clearinghouse", "EDI clearinghouse"],
    category: "claims",
    answer:
      "A clearinghouse is an intermediary that receives claims from providers, validates and reformats them into each payer's required electronic standard, and routes them onward. It also returns acknowledgements, rejections and electronic remittance advice, acting as the single connection point to hundreds of payers.",
    body: [
      "Without a clearinghouse a practice would need a direct electronic connection, and a separate format, for every payer it bills. The clearinghouse collapses that into one submission pipeline and one set of status reports.",
      "The critical operational habit is reading clearinghouse acknowledgement reports daily. A claim rejected at the clearinghouse never reaches the payer, never appears in the payer's system, and will not show up in any aging report that is built from payer data. Practices routinely discover months of silently rejected claims this way.",
    ],
    related: ["EDI 837", "ERA", "Rejection", "Clean Claim"],
    services: [{ label: "Claims management", href: "/services/claims-management" }],
  },
  {
    term: "EDI 837",
    aliases: ["837P", "electronic claim format", "X12 837"],
    category: "claims",
    answer:
      "The EDI 837 is the HIPAA-mandated electronic format for submitting healthcare claims. The 837P variant carries professional claims, 837I carries institutional claims, and 837D carries dental. It is the electronic equivalent of a CMS-1500 or UB-04 paper form.",
    body: [
      "Because the 837 is a HIPAA transaction standard maintained by X12, its structure is not negotiable — which is precisely why a clearinghouse is useful. What varies between payers is not the format but the companion guide: which optional segments they require, how they want secondary payer information sequenced, and which identifiers they accept.",
      "The 837 has matching partners: the 835 returns the remittance, the 277 returns claim status, and the 270/271 pair handles eligibility inquiry and response.",
    ],
    related: ["Clearinghouse", "ERA", "CMS-1500", "EOB"],
  },
  {
    term: "ERA",
    aliases: ["electronic remittance advice", "835 file"],
    category: "claims",
    answer:
      "An electronic remittance advice, transmitted as an X12 835 file, is the payer's electronic explanation of how a claim was adjudicated. It reports what was allowed, what was paid, what was adjusted and why — using CARC and RARC codes — and it drives automated payment posting.",
    body: [
      "The ERA is where denial intelligence actually lives. Every adjustment carries a claim adjustment reason code, and reading those codes in aggregate rather than claim by claim is what turns denial management from firefighting into prevention.",
      "A practice that posts ERAs automatically but never analyzes the CARC distribution is discarding the most valuable dataset it owns.",
    ],
    related: ["CARC", "RARC", "EOB", "EFT", "Payment Posting"],
    services: [{ label: "Denial management", href: "/services/denial-management" }],
  },
  {
    term: "CMS-1500",
    aliases: ["HCFA 1500", "professional claim form"],
    category: "claims",
    answer:
      "The CMS-1500 is the standard paper claim form used by physicians and non-institutional providers to bill Medicare, Medicaid and most commercial payers. It is maintained by the National Uniform Claim Committee, and its electronic equivalent is the EDI 837P transaction.",
    body: [
      "Hospitals and other institutional providers use the UB-04 (CMS-1450) instead. Which form applies is determined by the provider type and place of service, not by preference.",
      "Even in fully electronic workflows the CMS-1500 remains the reference model: field numbers such as Box 24 for service lines and Box 33 for billing provider information are how payer companion guides and denial explanations are phrased.",
    ],
    related: ["EDI 837", "UB-04", "NPI", "Place of Service Code"],
  },
  {
    term: "Charge Capture",
    aliases: ["charge entry", "missed charges"],
    category: "financial",
    answer:
      "Charge capture is the process of recording every billable service a provider delivered so it reaches a claim. Services documented in the chart but never converted into a charge are revenue lost permanently — no denial appears, no report flags it, and nothing prompts anyone to look.",
    body: [
      "Charge capture leakage is uniquely dangerous because it is silent. A denial is visible and measurable. A charge that was never entered produces no signal at all.",
      "Common leakage points are hospital rounds and consults performed away from the practice's own system, procedures performed during an office visit but documented only in the note narrative, and services rendered by a provider whose charges route through a separate workflow.",
    ],
    related: ["Superbill", "Revenue Cycle Management", "Encounter"],
    services: [{ label: "Practice analytics", href: "/services/practice-analytics" }],
  },
  {
    term: "Superbill",
    aliases: ["encounter form", "charge ticket"],
    category: "claims",
    answer:
      "A superbill is an itemized record of the services a provider delivered during a visit, listing diagnosis and procedure codes, provider details and charges. It is not a claim: it is the source document a biller converts into a claim, or that a patient submits to seek out-of-network reimbursement.",
    body: [
      "For out-of-network and cash-pay practices the superbill is what enables the patient to pursue reimbursement themselves. For that to work it must carry the rendering provider's NPI, the tax ID, the place of service, the date of service and correctly paired diagnosis and procedure codes.",
      "An incomplete superbill is the most common reason a patient's out-of-network reimbursement request is refused, and the practice usually never learns it happened.",
    ],
    related: ["Charge Capture", "CPT Code", "ICD-10-CM", "Out-of-Network"],
  },
  {
    term: "Payment Posting",
    aliases: ["cash posting", "ERA posting"],
    category: "financial",
    answer:
      "Payment posting is the recording of payer and patient payments against the correct claims and service lines, including contractual adjustments, write-offs and patient responsibility. Done well it reconciles to the bank deposit; done poorly it corrupts every AR and denial report downstream.",
    body: [
      "The distinction that matters is between a contractual adjustment — the difference between billed charge and contracted allowed amount, which is expected and not collectible — and a write-off, which is revenue you were entitled to and chose to abandon. Posting the second as the first hides denial losses inside a number everyone assumes is normal.",
      "Underpayments hide here too. A payment that posts without anyone comparing the allowed amount to the contracted rate is how systematic payer underpayment goes unnoticed for years.",
    ],
    related: ["ERA", "Contractual Adjustment", "Underpayment", "Days in AR"],
    services: [{ label: "AR management", href: "/services/ar-management" }],
  },

  // ------------------------------------------------------------- coding
  {
    term: "CPT Code",
    aliases: ["current procedural terminology", "procedure code"],
    category: "coding",
    answer:
      "A CPT code is a five-character code maintained by the American Medical Association that identifies the procedure or service a provider performed. CPT answers what was done; ICD-10-CM answers why. Together they establish medical necessity, and a mismatch between them is a leading denial cause.",
    body: [
      "CPT is revised annually, effective January 1. New, revised and deleted codes each year are a predictable cause of a January denial spike in practices that have not updated their charge master and favorites lists.",
      "Category I codes cover established procedures. Category II are optional performance measurement codes. Category III are temporary codes for emerging technology and frequently require documentation for any payment at all.",
    ],
    related: ["ICD-10-CM", "HCPCS", "Modifier", "Medical Necessity", "E/M Coding"],
    services: [{ label: "Medical coding", href: "/services/medical-coding" }],
  },
  {
    term: "ICD-10-CM",
    aliases: ["diagnosis code", "ICD-10 coding"],
    category: "coding",
    answer:
      "ICD-10-CM is the diagnosis code set used in the United States to report the clinical reason for a service. Codes run three to seven characters, and the later characters carry specificity — laterality, encounter type, episode — that payers increasingly require before they will accept medical necessity.",
    body: [
      "The practical failure mode is unspecified codes. A code ending in a placeholder for \"unspecified\" is valid, but many payer policies will not accept it as supporting medical necessity for the procedure billed, and the claim denies for a reason that reads as clinical when it is really documentation.",
      "ICD-10-CM updates annually on October 1, six months offset from the CPT cycle — which means a practice has two separate annual code maintenance obligations, not one.",
    ],
    related: ["CPT Code", "Medical Necessity", "LCD", "Specificity"],
    services: [{ label: "Medical coding", href: "/services/medical-coding" }],
  },
  {
    term: "HCPCS",
    aliases: ["HCPCS Level II", "J codes"],
    category: "coding",
    answer:
      "HCPCS Level II is a CMS-maintained code set covering products, supplies and services not included in CPT — durable medical equipment, prosthetics, ambulance services, and drugs administered in a clinical setting. Level I of HCPCS is CPT itself.",
    body: [
      "The J-code series for injectable drugs is where most practices meet HCPCS, and it is unforgiving: units are defined per specific dosage amount, not per vial or per administration, and unit miscalculation is a routine source of both denials and overpayment recoupment.",
      "HCPCS also carries a large modifier set, including the modifiers that establish laterality and the ones that identify assistant surgeon and supervising provider relationships.",
    ],
    related: ["CPT Code", "Modifier", "NDC"],
    services: [{ label: "Medical coding", href: "/services/medical-coding" }],
  },
  {
    term: "Modifier",
    aliases: ["CPT modifier", "modifier 25", "modifier 59"],
    category: "coding",
    answer:
      "A modifier is a two-character suffix appended to a CPT or HCPCS code that alters its meaning without changing the code itself — signalling that a service was distinct, bilateral, repeated, reduced or performed by a specific provider role. Modifiers are how correct coding survives contact with bundling edits.",
    body: [
      "Modifier 25 identifies a significant, separately identifiable evaluation and management service performed on the same day as a procedure. Modifier 59 identifies a distinct procedural service that would otherwise be bundled. Both are heavily audited precisely because both are heavily misused.",
      "The rule that prevents most trouble: a modifier must be supported by documentation written before anyone knew a denial was coming. Appending a modifier to clear an edit, without documentation that independently justifies it, is the pattern auditors look for.",
    ],
    related: ["NCCI Edits", "CPT Code", "Upcoding", "Bundling"],
    services: [{ label: "Medical coding", href: "/services/medical-coding" }],
  },
  {
    term: "E/M Coding",
    aliases: ["evaluation and management", "office visit levels"],
    category: "coding",
    answer:
      "Evaluation and management coding assigns a level of service to a patient encounter based on either medical decision making or total time spent on the date of the encounter. Since the 2021 guideline revision, history and exam no longer determine the level for office visits.",
    body: [
      "Medical decision making is scored across three elements: the number and complexity of problems addressed, the amount and complexity of data reviewed, and the risk of complications from management decisions. Two of three elements determine the level.",
      "The time alternative counts total practitioner time on the date of service, including chart review, documentation and care coordination — not just face-to-face time. Many practices under-code by continuing to count only the visit itself.",
    ],
    related: ["CPT Code", "Medical Necessity", "Undercoding", "Modifier"],
    services: [{ label: "Medical coding", href: "/services/medical-coding" }],
  },
  {
    term: "NCCI Edits",
    aliases: ["correct coding initiative", "bundling edits", "MUE"],
    category: "coding",
    answer:
      "National Correct Coding Initiative edits are CMS-published rules preventing improper code pairings. Procedure-to-procedure edits stop two codes being billed together when one is a component of the other; medically unlikely edits cap the units of a code reportable for one patient on one day.",
    body: [
      "Each PTP edit carries a modifier indicator. An indicator of 0 means the pair can never be unbundled. An indicator of 1 means a modifier may override the edit when documentation supports a genuinely distinct service. Ignoring that indicator is how practices generate both denials and audit exposure.",
      "Commercial payers apply their own edit sets on top of NCCI, often stricter and rarely published in full — which is why denial patterns by payer are worth tracking separately.",
    ],
    related: ["Modifier", "Bundling", "Claim Scrubbing", "Denial"],
    services: [{ label: "Medical coding", href: "/services/medical-coding" }],
  },
  {
    term: "Upcoding",
    aliases: ["billing fraud", "overcoding"],
    category: "compliance",
    answer:
      "Upcoding is billing a higher-paying code than the documented service supports. It is a False Claims Act exposure regardless of intent, and it is detected statistically — payers profile a provider's code distribution against peers in the same specialty, so a skewed pattern surfaces without any single claim being reviewed.",
    body: [
      "Undercoding is the mirror error and is far more common: providers routinely bill a lower level than their documentation supports out of audit anxiety. It is not a compliance risk, but it is a persistent, invisible revenue loss that no denial report will ever show you.",
      "The correct posture is neither. Code what the documentation supports, and improve documentation where it understates the work actually performed.",
    ],
    related: ["Undercoding", "E/M Coding", "OIG", "Medical Necessity"],
  },
  {
    term: "Undercoding",
    aliases: ["under-coding", "leaving money on the table"],
    category: "financial",
    answer:
      "Undercoding is billing a lower-level or less specific code than the documentation supports. It produces no denials, triggers no alerts and appears nowhere in a standard revenue report — which makes it the least visible and most persistent form of revenue leakage in a physician practice.",
    body: [
      "It is usually defensive. A provider who has been audited once tends to down-shift permanently, and a practice with no coding review has no mechanism to notice.",
      "It is found by comparing a provider's E/M level distribution against specialty benchmarks and then auditing the outliers against the actual notes. A distribution weighted heavily toward level 3 in a specialty that benchmarks toward level 4 is worth reading charts over.",
    ],
    related: ["Upcoding", "E/M Coding", "Charge Capture"],
    services: [{ label: "Practice analytics", href: "/services/practice-analytics" }],
  },

  // ------------------------------------------------------------- denials
  {
    term: "Denial",
    aliases: ["claim denial", "denied claim"],
    category: "denials",
    answer:
      "A denial is a claim the payer adjudicated and refused to pay. It differs from a rejection, which never entered adjudication. That distinction determines your remedy: a rejected claim is corrected and resubmitted, while a denied claim must be appealed within the payer's deadline.",
    body: [
      "Denials split into hard and soft. A soft denial can be resolved without an appeal — additional information, corrected data, a resubmission. A hard denial requires a formal appeal, and once its deadline passes the revenue is gone.",
      "The number worth internalizing: roughly 70% of appealed denials are ultimately overturned and paid. The obstacle to recovering denied revenue is almost never the merits of the claim. It is whether anyone has the capacity to work it before the clock runs out.",
    ],
    related: ["Rejection", "Appeal", "CARC", "Denial Rate", "Timely Filing"],
    services: [
      { label: "Denial management", href: "/services/denial-management" },
      { label: "Denial code lookup", href: "/tools/denial-code-lookup" },
    ],
  },
  {
    term: "Rejection",
    aliases: ["claim rejection", "front-end rejection"],
    category: "denials",
    answer:
      "A rejection is a claim stopped before adjudication — by the clearinghouse or the payer's intake system — for a format, data or eligibility error. Because it never entered adjudication, it carries no appeal rights and does not appear in payer claim status. It must be corrected and resubmitted.",
    body: [
      "The danger is invisibility. A rejected claim exists in the practice management system as submitted and in the payer's system not at all. If nobody reads the clearinghouse acknowledgement reports, the claim ages silently until timely filing expires.",
      "Rejections are also the cheapest failure to fix, usually a demographic or identifier correction taking minutes — provided somebody looks.",
    ],
    related: ["Denial", "Clearinghouse", "Timely Filing", "Clean Claim"],
    services: [{ label: "Claims management", href: "/services/claims-management" }],
  },
  {
    term: "CARC",
    aliases: ["claim adjustment reason code", "CO-45", "CO-16"],
    category: "denials",
    answer:
      "A claim adjustment reason code explains why a payer adjusted or denied a payment. Maintained by X12, each CARC carries a group code — CO for contractual obligation, PR for patient responsibility, OA for other adjustment — which determines whether the balance may be billed to the patient.",
    body: [
      "The group code is the operational fork. CO means the provider absorbs it and may not bill the patient. PR means the balance moves to patient responsibility. Posting a CO adjustment as PR is a compliance problem, not a clerical one.",
      "CARCs are frequently qualified by a RARC that carries the specific detail. CO-16 in particular is nearly meaningless on its own — it says information is missing, and only the accompanying RARC says what.",
    ],
    related: ["RARC", "ERA", "Denial", "Contractual Adjustment"],
    services: [{ label: "Denial code lookup", href: "/tools/denial-code-lookup" }],
  },
  {
    term: "RARC",
    aliases: ["remittance advice remark code", "N-codes"],
    category: "denials",
    answer:
      "A remittance advice remark code supplements a CARC with the specific reason behind an adjustment. Where a CARC says information is missing, the RARC says which information. Reading the RARC is usually what determines whether a denial is correctable, appealable, or genuinely final.",
    body: [
      "RARCs come in two forms: alphanumeric codes beginning with N or M, and informational codes that add context without changing the adjustment.",
      "Denial workflows that route on CARC alone lose accuracy at exactly the codes that matter most. Routing on the CARC and RARC pair is what makes automated denial triage worth building.",
    ],
    related: ["CARC", "ERA", "Denial", "Appeal"],
    services: [{ label: "Denial code lookup", href: "/tools/denial-code-lookup" }],
  },
  {
    term: "Appeal",
    aliases: ["claim appeal", "reconsideration", "redetermination"],
    category: "denials",
    answer:
      "An appeal is a formal request that a payer reconsider a denied claim, supported by documentation addressing the stated denial reason. Commercial payers typically allow 90 to 180 days from the remittance date; Medicare provides five escalating levels beginning with redetermination within 120 days.",
    body: [
      "An effective appeal answers the specific CARC and RARC rather than restating that the service was performed. If the denial cites medical necessity, the appeal cites the coverage policy and points to the documentation satisfying it. If it cites missing authorization, the appeal supplies the authorization number or argues the retroactive exception.",
      "Because roughly 70% of appealed denials are overturned, an appeal backlog is not an administrative annoyance. It is a receivable being written off by default.",
    ],
    related: ["Denial", "Timely Filing", "Medical Necessity", "CARC"],
    services: [{ label: "Denial management", href: "/services/denial-management" }],
  },
  {
    term: "Timely Filing",
    aliases: ["filing deadline", "timely filing limit"],
    category: "denials",
    answer:
      "Timely filing is the deadline by which a payer must receive a claim. Limits commonly range from 90 days to one year from the date of service, vary by payer and contract, and are shorter for secondary claims. A claim denied for timely filing is generally unappealable and unbillable to the patient.",
    body: [
      "This is the one denial category with no recovery path, which makes it the clearest evidence of a broken process rather than a payer dispute. Every timely filing write-off traces back to a claim that sat unworked.",
      "The usual causes are unread clearinghouse rejections, credentialing gaps that stalled claims for a new provider, and AR queues sorted by dollar value rather than by age.",
    ],
    related: ["Rejection", "Denial", "Days in AR", "Appeal"],
    services: [{ label: "AR management", href: "/services/ar-management" }],
  },
  {
    term: "Medical Necessity",
    aliases: ["medically necessary", "medical necessity denial"],
    category: "denials",
    answer:
      "Medical necessity is a payer's determination that a service was appropriate for the patient's condition under its coverage policy. It is established by the pairing of diagnosis and procedure codes and supported by the documentation — which means a medically necessary service can still be denied if the coding does not demonstrate it.",
    body: [
      "For Medicare, the governing policies are National Coverage Determinations and the Local Coverage Determinations issued by your Medicare Administrative Contractor. Because LCDs vary by contractor, the same service can be covered in one state and denied in another.",
      "Most medical necessity denials are documentation problems wearing clinical clothing. The service was appropriate; the note did not say so in terms the policy recognizes, or the diagnosis code was too unspecific to match.",
    ],
    related: ["ICD-10-CM", "LCD", "Appeal", "Prior Authorization"],
    services: [{ label: "Denial management", href: "/services/denial-management" }],
  },
  {
    term: "Prior Authorization",
    aliases: ["pre-authorization", "precert", "prior auth"],
    category: "payers",
    answer:
      "Prior authorization is a payer requirement that a service be approved before it is delivered. Without it, the claim is denied regardless of medical necessity, and in most contracts the balance cannot be billed to the patient — the practice absorbs it entirely.",
    body: [
      "Authorization denials are among the most preventable and the most expensive, because they occur after the cost of delivering care has already been incurred.",
      "Two operational details cause most failures: an authorization approved for a specific CPT code does not cover a different code billed after the procedure changed intraoperatively, and an authorization has both a unit count and an expiry date that a delayed or rescheduled service can quietly exceed.",
    ],
    related: ["Medical Necessity", "Eligibility Verification", "Denial"],
    services: [{ label: "Prior authorization", href: "/services/prior-authorization" }],
  },

  // ------------------------------------------------------------- financial
  {
    term: "Days in AR",
    aliases: ["days in accounts receivable", "A/R days", "DSO healthcare"],
    category: "financial",
    answer:
      "Days in accounts receivable measures the average time between billing a service and collecting payment. It is calculated as total accounts receivable divided by average daily charges. It is the single best summary indicator of revenue cycle health, because every upstream failure eventually shows up in it.",
    body: [
      "Read it alongside the aging distribution, never alone. A practice can hold a respectable average while carrying a large, unworkable balance beyond 120 days, because a high volume of fast-paying small claims disguises the aged tail.",
      "The percentage of AR over 90 days is the more honest metric. That is where collectability falls sharply and where timely filing deadlines start expiring.",
    ],
    example:
      "A practice with $420,000 in AR and $17,500 in average daily charges has 24 days in AR.",
    related: ["Revenue Cycle Management", "Net Collection Rate", "Timely Filing", "Aging"],
    services: [
      { label: "AR management", href: "/services/ar-management" },
      { label: "Revenue leak calculator", href: "/tools/revenue-leak-calculator" },
    ],
  },
  {
    term: "Denial Rate",
    aliases: ["claim denial rate", "first pass denial rate"],
    category: "financial",
    answer:
      "Denial rate is the percentage of submitted claims a payer denies, usually measured on first submission. MGMA data puts single-specialty physician practices at roughly 8%; Kodiak Solutions reports 11.81% for hospitals and health systems in 2024. Above 10% is where practices generally start losing material revenue.",
    body: [
      "Track it three ways or it will mislead you: by payer, because one contract usually dominates the total; by denial reason, because that identifies the fixable process; and by provider, because coding and documentation habits are individual.",
      "A falling denial rate is not automatically good news. It can also mean claims are being written off rather than appealed, or held rather than submitted.",
    ],
    related: ["Denial", "Clean Claim", "Net Collection Rate", "CARC"],
    services: [
      { label: "Denial management", href: "/services/denial-management" },
      { label: "RCM benchmarks", href: "/resources/rcm-benchmarks" },
    ],
  },
  {
    term: "Net Collection Rate",
    aliases: ["NCR", "adjusted collection rate"],
    category: "financial",
    answer:
      "Net collection rate is payments received divided by the amount you were contractually entitled to collect, after removing contractual adjustments. It answers the question gross collection rate cannot: of the money you actually had a right to, how much did you get?",
    body: [
      "Gross collection rate — payments over billed charges — is close to meaningless, because it moves whenever you change your fee schedule rather than when your performance changes.",
      "The gap between net collection rate and 100% is denials, underpayments, uncollected patient balances and write-offs. That gap, multiplied by annual charges, is the number worth putting in front of a practice owner.",
    ],
    related: ["Days in AR", "Contractual Adjustment", "Underpayment", "Denial Rate"],
    services: [{ label: "Practice analytics", href: "/services/practice-analytics" }],
  },
  {
    term: "Contractual Adjustment",
    aliases: ["contractual write-off", "allowed amount adjustment"],
    category: "financial",
    answer:
      "A contractual adjustment is the difference between a provider's billed charge and the contracted allowed amount with that payer. It is not a loss and not collectible from the patient — it is the discount agreed to in the contract, and it must be recorded separately from write-offs.",
    body: [
      "Collapsing contractual adjustments and write-offs into one bucket is one of the most common accounting errors in physician practices, and it conceals exactly the losses you would want to see: denied claims abandoned, balances never pursued, underpayments never challenged.",
      "Contractual adjustments carry CO group codes on the remittance. Anything posted as an adjustment without a corresponding CO code deserves a second look.",
    ],
    related: ["Payment Posting", "Underpayment", "Allowed Amount", "CARC"],
  },
  {
    term: "Underpayment",
    aliases: ["payer underpayment", "contract variance"],
    category: "financial",
    answer:
      "An underpayment is a claim paid below the contracted allowed amount. Unlike a denial it produces no alert, posts cleanly, and closes the claim — which is why systematic underpayment can run for years without anyone noticing. Detection requires comparing every payment against a loaded fee schedule.",
    body: [
      "Common causes are fee schedule updates the payer applied late or not at all, incorrect multiple-procedure reductions, and modifier-based reductions applied where the contract does not permit them.",
      "The recovery route is the contract, not the appeal process — you are asserting a payment variance, not disputing an adjudication decision, and payers generally have a defined variance process for it.",
    ],
    related: ["Contractual Adjustment", "Allowed Amount", "Net Collection Rate"],
    services: [{ label: "Practice analytics", href: "/services/practice-analytics" }],
  },
  {
    term: "Allowed Amount",
    aliases: ["allowable", "contracted rate"],
    category: "payers",
    answer:
      "The allowed amount is the maximum a payer recognizes for a covered service under its contract with the provider. It sets the ceiling on total payment — payer portion plus patient responsibility — and the difference between billed charge and allowed amount becomes a contractual adjustment.",
    body: [
      "Most commercial contracts express the allowed amount as a percentage of the Medicare Physician Fee Schedule for the relevant locality, which makes the CMS fee schedule lookup a practical negotiating tool.",
      "Out-of-network is where this breaks down: with no contract there is no agreed allowed amount, and the payer applies its own methodology — which is the mechanic underneath most surprise billing disputes.",
    ],
    related: ["Contractual Adjustment", "Out-of-Network", "Fee Schedule"],
  },

  // ------------------------------------------------------------- payers
  {
    term: "Eligibility Verification",
    aliases: ["insurance verification", "benefits verification", "270/271"],
    category: "payers",
    answer:
      "Eligibility verification confirms a patient's active coverage, benefits, deductible status, copay, coinsurance and authorization requirements before the service is delivered. It runs electronically through the X12 270 inquiry and 271 response, and it prevents the largest single category of denials.",
    body: [
      "Optum attributes 24.3% of denials to registration and eligibility errors — the largest denial category there is, and the one with the cheapest fix.",
      "Verifying that coverage is active is only half of it. The response also carries the deductible remaining, which determines what to collect at the desk, and plan-level authorization requirements, which determine whether the visit should proceed at all.",
    ],
    related: ["Prior Authorization", "Coordination of Benefits", "Denial", "Patient Responsibility"],
    services: [{ label: "Eligibility verification", href: "/services/eligibility-verification" }],
  },
  {
    term: "Coordination of Benefits",
    aliases: ["COB", "primary and secondary insurance"],
    category: "payers",
    answer:
      "Coordination of benefits determines which payer is primary when a patient has more than one plan, and in what order the others pay. Billing the wrong payer first produces a denial that cannot be fixed by resubmission alone — the payers' own COB records must be corrected first.",
    body: [
      "COB denials are among the most persistent because the correction lives outside the practice. Until the patient or the plan updates the record, every resubmission denies identically.",
      "For Medicare the governing concept is the Medicare Secondary Payer rules, which determine primacy based on employment status, employer size, and whether the claim relates to a work injury, accident or end-stage renal disease.",
    ],
    related: ["Eligibility Verification", "Denial", "Patient Responsibility"],
    services: [{ label: "Eligibility verification", href: "/services/eligibility-verification" }],
  },
  {
    term: "Patient Responsibility",
    aliases: ["patient balance", "copay coinsurance deductible"],
    category: "payers",
    answer:
      "Patient responsibility is the portion of an allowed amount the patient owes: copay, coinsurance, deductible and non-covered charges. It is identified on the remittance by PR group codes, and it has become materially harder to collect as high-deductible plans have grown.",
    body: [
      "Collection probability falls steeply with time and distance from the visit. Balances collected at or before the point of service are collected at a far higher rate than the same balance billed 30 days later.",
      "One widely repeated claim is worth flagging: patient responsibility is often said to exceed 30% of provider revenue. Kodiak Solutions' analysis puts it near 7.3% of net patient revenue. The figure matters, but not at the scale vendor marketing asserts.",
    ],
    related: ["Allowed Amount", "Eligibility Verification", "CARC"],
    services: [{ label: "Patient collections", href: "/services/patient-collections" }],
  },
  {
    term: "Out-of-Network",
    aliases: ["non-participating provider", "OON billing"],
    category: "payers",
    answer:
      "Out-of-network describes a provider with no contract with a patient's payer. Without a contracted allowed amount the payer applies its own reimbursement methodology, patient cost-sharing is higher, and federal No Surprises Act protections restrict what may be balance-billed in emergency and certain facility-based situations.",
    body: [
      "Out-of-network claims usually require more documentation, are paid more slowly, and are far more likely to be paid directly to the patient rather than the provider — which turns a payer receivable into a patient receivable.",
      "Where the No Surprises Act applies, balance billing is prohibited and the dispute moves to independent dispute resolution between provider and payer, on a defined timeline.",
    ],
    related: ["Allowed Amount", "Patient Responsibility", "Superbill", "Credentialing"],
  },
  {
    term: "Credentialing",
    aliases: ["provider credentialing", "payer enrollment", "provider enrollment"],
    category: "compliance",
    answer:
      "Credentialing is the verification of a provider's qualifications by a payer, and enrollment is the resulting contract that permits billing under that plan. The process commonly takes 90 to 180 days, and claims for services delivered before the effective date are generally not payable.",
    body: [
      "The financial exposure is front-loaded and easy to underestimate. A provider seeing patients while enrollment is pending is generating receivables that may never be collectible, depending on whether the payer permits retroactive effective dates.",
      "Most commercial credentialing runs through CAQH ProView, where a lapsed attestation silently stalls applications. Medicare enrollment runs through PECOS and carries its own revalidation cycle.",
    ],
    related: ["Timely Filing", "NPI", "Out-of-Network"],
    services: [{ label: "Provider credentialing", href: "/services/credentialing" }],
  },
  {
    term: "NPI",
    aliases: ["national provider identifier", "NPI number"],
    category: "compliance",
    answer:
      "A National Provider Identifier is the 10-digit identifier required on all HIPAA standard transactions. Type 1 identifies an individual provider; Type 2 identifies an organization. Both usually appear on a claim — the rendering provider as Type 1, the billing entity as Type 2.",
    body: [
      "NPI records are maintained in NPPES and are public. Stale records — an old practice address, a retired taxonomy code — are a quiet and frequent cause of enrollment failures and claim rejections, because payers validate against NPPES.",
      "The taxonomy code attached to an NPI declares specialty, and a mismatch between taxonomy and the services billed will trigger denials on some payer edit sets.",
    ],
    related: ["Credentialing", "CMS-1500", "Rejection"],
    services: [{ label: "Provider credentialing", href: "/services/credentialing" }],
  },

  // ------------------------------------------------------------- compliance
  {
    term: "HIPAA",
    aliases: ["HIPAA compliance", "protected health information", "PHI"],
    category: "compliance",
    answer:
      "HIPAA is the federal law governing the privacy and security of protected health information. For billing it establishes three obligations: the standard electronic transaction formats, the Privacy Rule limiting use and disclosure of PHI, and the Security Rule requiring safeguards for electronic PHI.",
    body: [
      "A billing company is a business associate, not a covered entity, and may use PHI only as the Business Associate Agreement permits. That agreement is not a formality — it is the instrument that defines and limits what your vendor may do with your patients' data.",
      "The Security Rule requires an actual risk analysis, not a checklist. Ask any prospective vendor when theirs was last performed and by whom.",
    ],
    related: ["Business Associate Agreement", "Minimum Necessary", "Credentialing"],
    services: [{ label: "HIPAA compliance", href: "/hipaa" }],
  },
  {
    term: "Business Associate Agreement",
    aliases: ["BAA", "HIPAA BAA"],
    category: "compliance",
    answer:
      "A Business Associate Agreement is the HIPAA-required contract between a covered entity and a vendor handling protected health information on its behalf. It defines permitted uses, mandates safeguards, sets breach notification obligations, and governs return or destruction of PHI when the relationship ends.",
    body: [
      "Engaging a billing company without an executed BAA is itself a HIPAA violation, independent of whether anything goes wrong.",
      "HHS publishes sample BAA provisions. Comparing a vendor's BAA against that baseline is a fast way to spot narrowed breach notification windows or carved-out subcontractor obligations.",
    ],
    related: ["HIPAA", "Minimum Necessary"],
    services: [{ label: "Business Associate Agreement", href: "/baa" }],
  },
  {
    term: "Minimum Necessary",
    aliases: ["minimum necessary standard"],
    category: "compliance",
    answer:
      "The minimum necessary standard requires that uses and disclosures of protected health information be limited to the least amount needed to accomplish the purpose. It applies directly to billing operations, where the temptation to move whole charts rather than the relevant documentation is constant.",
    body: [
      "In practice this shapes system access: a biller working denials for one payer does not need read access to every chart in the practice, and role-based access control is how the standard is actually met.",
      "It does not apply to disclosures for treatment, or to disclosures required by law — but it does apply to payment and operations, which is nearly everything billing does.",
    ],
    related: ["HIPAA", "Business Associate Agreement"],
  },
];

export const glossary: GlossaryTerm[] = raw.map((t) => ({ ...t, slug: slugify(t.term) }));

export const glossarySlugs = glossary.map((t) => t.slug);

export const getTerm = (slug: string) => glossary.find((t) => t.slug === slug);

export const termsInCategory = (id: GlossaryCategory) =>
  glossary.filter((t) => t.category === id);

/** Resolve a related-term name to a linkable entry, skipping any that don't exist. */
export function resolveRelated(names: string[]) {
  return names
    .map((n) => glossary.find((t) => t.term.toLowerCase() === n.toLowerCase()))
    .filter((t): t is GlossaryTerm => Boolean(t));
}

/**
 * Reverse index: which glossary terms point at a given page.
 *
 * Derived rather than declared, so the link is bidirectional by construction.
 * Adding a term with `services: [{ href: "/services/denial-management" }]`
 * makes it appear on that service page automatically — there is no second
 * list to remember to update, which is the failure mode that makes hand-built
 * internal linking rot.
 */
export const termsLinkingTo = (href: string) =>
  glossary.filter((t) => t.services?.some((s) => s.href === href));
