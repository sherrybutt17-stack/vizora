import type { LucideIcon } from "lucide-react";
import {
  Receipt, FileCode2, RefreshCcw, Send, ShieldAlert, Clock4,
  BadgeCheck, KeyRound, UserCheck, CreditCard, Headphones, BarChart3,
} from "lucide-react";

export type FaqItem = { question: string; answer: string };

export type Service = {
  slug: string;
  name: string;
  /** Short label for nav and cards. */
  short: string;
  icon: LucideIcon;
  eyebrow: string;
  headline: string;
  /**
   * SERP title, where `headline` would collide with another page.
   *
   * `headline` is the H1 and reads correctly on the page. The problem is
   * cross-page: "Medical Billing & Coding Services" competes with the
   * /services hub for the same head term AND with /services/medical-coding
   * for "medical coding services". A coherence sweep put those pairs at 91%
   * and 86% title similarity — which is cannibalisation, not consistency.
   * Set this only where a real collision exists.
   */
  metaTitle?: string;
  /** Answer-first summary, 40–60 words, self-contained for AI extraction. */
  summary: string;
  /** One-liner for grids. */
  blurb: string;
  challenges: string[];
  features: { title: string; description: string }[];
  benefits: string[];
  process: { step: string; title: string; description: string }[];
  faqs: FaqItem[];
  /** Slugs of related services — drives internal linking. */
  related: string[];
  keywords: string[];
};

export const services: Service[] = [
  {
    slug: "medical-billing",
    name: "Medical Billing & Coding",
    short: "Medical Billing",
    icon: Receipt,
    eyebrow: "Core Service",
    headline: "Medical Billing & Coding Services",
    metaTitle: "Outsourced Medical Billing and Coding",
    summary:
      "Medical billing is the process of translating care delivered into coded claims, submitting them to payers, and pursuing payment until the balance is resolved. Vizora handles that end to end — coding, scrubbing, submission, payer follow-up, payment posting and denial rework — so your staff never touches a claim.",
    blurb: "Complete billing and coding built to maximize reimbursement and reduce denials.",
    challenges: [
      "High claim denial rates cutting directly into collected revenue",
      "Slow payment cycles straining practice cash flow",
      "Staff overwhelmed by billing administration instead of patient care",
      "Coding errors causing underpayment, downcoding or outright denial",
      "Payer rule changes arriving faster than your team can absorb them",
      "Aging AR that nobody has time to chase",
    ],
    features: [
      { title: "Certified coding", description: "Certified coders assign ICD-10, CPT and HCPCS codes with specialty-specific accuracy." },
      { title: "Clean claim submission", description: "Every claim is scrubbed against payer-specific edits before it leaves our system." },
      { title: "Payer follow-up", description: "We track each claim through adjudication and escalate anything that stalls." },
      { title: "Payment posting", description: "Payments, adjustments and write-offs are posted and reconciled against your ledger." },
      { title: "Denial rework", description: "Denials are root-caused, corrected and resubmitted or appealed — not written off." },
      { title: "Monthly reporting", description: "Transparent reporting on collections, denial trends, AR aging and payer performance." },
    ],
    benefits: [
      "Higher first-pass claim acceptance",
      "Faster payment cycles and steadier cash flow",
      "Administrative burden lifted off clinical staff",
      "Transparent monthly reporting and analytics",
      "Specialty-specific coding expertise",
      "Compliance with CMS and payer documentation requirements",
    ],
    process: [
      { step: "01", title: "Assessment & setup", description: "We audit your current billing process, quantify the gaps, and configure our systems around your existing workflow." },
      { step: "02", title: "Clean claim submission", description: "Our coders prepare and submit accurate, compliant claims with the documentation each payer requires." },
      { step: "03", title: "Follow-up & collections", description: "We monitor claim status, work the payer queue, and manage the payment process to resolution." },
      { step: "04", title: "Reporting & optimization", description: "You receive monthly reporting on collections, denials and the specific fixes that will move your numbers." },
    ],
    faqs: [
      { question: "How quickly can you start billing for our practice?", answer: "Typical onboarding takes under 2 weeks depending on practice size and complexity. That window covers credentialing verification, system integration, historical data migration and staff training. We sequence it to minimize disruption to your current claim flow." },
      { question: "What billing software do you work with?", answer: "We integrate with most major practice management systems and EHRs. During onboarding we configure our workflow around your existing software rather than forcing a migration, so your clinical team's day-to-day does not change." },
      { question: "How do you handle denied claims?", answer: "Denied claims are analyzed for root cause, corrected, and resubmitted or appealed as part of standard service at no additional charge. We also track denial patterns by payer and reason code so the same denial stops recurring." },
      { question: "What reports will we receive?", answer: "Monthly reporting covers claim submission volume, collections, denial rate by reason and payer, AR aging buckets, and net collection ratio. You also get portal access for real-time claim status between reports." },
    ],
    related: ["medical-coding", "denial-management", "ar-management"],
    keywords: ["medical billing services", "medical billing company", "outsourced medical billing"],
  },
  {
    slug: "medical-coding",
    name: "Medical Coding",
    short: "Medical Coding",
    icon: FileCode2,
    eyebrow: "Certified Professionals",
    headline: "Medical Coding Services",
    summary:
      "Medical coding converts documented clinical care into the ICD-10, CPT and HCPCS codes payers reimburse against. Coding errors cause underpayment as often as denial. Vizora's certified coders assign codes to specialty standards and audit their own work before submission.",
    blurb: "Precision ICD-10, CPT and HCPCS coding by certified coders.",
    challenges: [
      "Undercoding that quietly forfeits earned revenue on every encounter",
      "Upcoding exposure that invites payer audits and recoupment",
      "Modifier misuse triggering avoidable denials",
      "Annual ICD-10 and CPT updates outpacing internal training",
      "Documentation that does not support the level of service billed",
      "No independent audit to catch systematic coding drift",
    ],
    features: [
      { title: "ICD-10-CM diagnosis coding", description: "Accurate diagnosis coding to the highest level of specificity the documentation supports." },
      { title: "CPT & HCPCS procedure coding", description: "Procedure and supply coding across surgical, diagnostic and E/M services." },
      { title: "Modifier management", description: "Correct application of modifiers 25, 59, 51, and the specialty-specific set that drives your reimbursement." },
      { title: "E/M level validation", description: "Every evaluation and management level checked against 2021+ documentation guidelines." },
      { title: "Quality audits", description: "Routine internal audits measuring coding accuracy and flagging drift before a payer finds it." },
      { title: "Documentation feedback", description: "Specific, provider-level guidance on the documentation gaps costing you money." },
    ],
    benefits: [
      "Reimbursement that matches the care actually delivered",
      "Reduced audit and recoupment exposure",
      "Fewer modifier and medical-necessity denials",
      "Coders current on annual code set changes",
      "Independent audit trail for compliance",
      "Provider-level documentation coaching",
    ],
    process: [
      { step: "01", title: "Documentation review", description: "Coders review the clinical note against the services billed to confirm support for every code." },
      { step: "02", title: "Code assignment", description: "ICD-10, CPT, HCPCS and modifiers are assigned to specialty and payer standards." },
      { step: "03", title: "Second-level audit", description: "A sample of every coder's work is independently re-reviewed for accuracy before submission." },
      { step: "04", title: "Feedback loop", description: "Documentation gaps are reported back to providers so the fix is upstream, not repeated." },
    ],
    faqs: [
      { question: "What certifications do your coders hold?", answer: "Our coders are certified, and they are assigned by specialty rather than pooled — so the person coding your cardiology claims codes cardiology every day. Coding is audited internally on a sample basis rather than assumed correct." },
      { question: "How do you keep up with annual code changes?", answer: "ICD-10-CM and CPT updates take effect October 1 and January 1 respectively. Our coders complete mandatory update training before each effective date, and our claim edits are updated in the same cycle so nothing submits against a retired code." },
      { question: "Can you audit our existing coding?", answer: "Yes. A baseline coding audit is part of the free billing audit. We sample recent encounters, compare codes billed against documentation, and quantify both undercoding losses and overcoding exposure." },
      { question: "What is the difference between undercoding and downcoding?", answer: "Undercoding is your practice billing a lower level than the documentation supports, forfeiting revenue voluntarily. Downcoding is the payer unilaterally reducing the level you billed. Both cost money; the fixes are different, and we address each separately." },
    ],
    related: ["medical-billing", "claims-management", "denial-management"],
    keywords: ["medical coding services", "ICD-10 coding", "CPT coding services", "outsourced medical coding"],
  },
  {
    slug: "revenue-cycle-management",
    name: "Revenue Cycle Management",
    short: "Revenue Cycle Management",
    icon: RefreshCcw,
    eyebrow: "Complete Solution",
    headline: "Revenue Cycle Management",
    summary:
      "Revenue cycle management is the end-to-end financial process running from patient registration through final payment. RCM covers eligibility, charge capture, coding, claim submission, payment posting, denial management and AR follow-up. Vizora operates the entire cycle so revenue is managed as one system rather than disconnected tasks.",
    blurb: "End-to-end financial operations from patient registration to final payment.",
    challenges: [
      "Billing managed as disconnected tasks with no owner of the whole cycle",
      "Revenue leaking at handoffs between front desk, clinical and billing",
      "No single view of financial performance across the practice",
      "Front-end errors surfacing only as back-end denials weeks later",
      "Leadership making decisions on stale month-old reporting",
      "Growth stalling because billing capacity cannot scale with volume",
    ],
    features: [
      { title: "Patient access", description: "Registration, insurance verification and pre-authorization handled before the visit." },
      { title: "Charge capture", description: "Service documentation and charge entry reconciled so nothing delivered goes unbilled." },
      { title: "Claims management", description: "Scrubbing, submission and status tracking across every payer you contract with." },
      { title: "Payment & collections", description: "Payment posting, AR follow-up and patient billing run as one coordinated process." },
      { title: "Denial prevention", description: "Back-end denial data fed continuously into front-end process fixes." },
      { title: "Reporting & analytics", description: "Financial reporting and KPI tracking with the context to act on it." },
    ],
    benefits: [
      "One accountable owner for the entire revenue cycle",
      "Front-end fixes driven by back-end denial data",
      "Complete financial visibility in one place",
      "Billing capacity that scales with patient volume",
      "Lower total cost than staffing the cycle in-house",
      "Predictable, forecastable cash flow",
    ],
    process: [
      { step: "01", title: "Patient access", description: "Registration, eligibility verification and prior authorization completed before services are rendered." },
      { step: "02", title: "Charge capture & coding", description: "Documented services are captured, coded and reconciled against the schedule so nothing is missed." },
      { step: "03", title: "Claim submission & follow-up", description: "Claims are scrubbed, submitted and tracked through adjudication with active payer follow-up." },
      { step: "04", title: "Payment, denial & analysis", description: "Payments are posted, denials worked, and findings routed upstream to prevent recurrence." },
    ],
    faqs: [
      { question: "What is revenue cycle management?", answer: "Revenue cycle management is the complete financial process for a healthcare encounter, from scheduling and insurance verification through coding, claim submission, payment posting and collection of any remaining balance. It covers every step where revenue can be earned, delayed or lost." },
      { question: "How is RCM different from medical billing?", answer: "Medical billing is one stage inside the revenue cycle — preparing and submitting claims. RCM covers the whole span including front-end eligibility and authorization, charge capture, denial prevention, AR management and analytics. Most revenue leakage happens at the front end, which billing alone never touches." },
      { question: "Do we have to change our practice management system?", answer: "No. We work inside your existing PM and EHR. If your current system is genuinely limiting collections we will say so and quantify it, but a migration is never a precondition of working with us." },
      { question: "How do you measure RCM performance?", answer: "The core metrics are net collection ratio, first-pass clean claim rate, days in AR, denial rate by reason and payer, and cost to collect. We baseline each during the free audit so improvement is measured against your actual starting point, not an industry average." },
    ],
    related: ["medical-billing", "claims-management", "practice-analytics"],
    keywords: ["revenue cycle management", "RCM services", "healthcare revenue cycle"],
  },
  {
    slug: "claims-management",
    name: "Claims Management",
    short: "Claims Management",
    icon: Send,
    eyebrow: "Revenue Optimization",
    headline: "Claims Management & Optimization",
    summary:
      "Claims management covers everything between a coded encounter and an adjudicated payment: scrubbing against payer edits, electronic submission, status tracking, and rapid correction of rejections. Catching an error before submission costs a fraction of reworking a denial after it.",
    blurb: "Advanced scrubbing, real-time tracking and data-driven submission strategy.",
    challenges: [
      "High rejection rates from avoidable data and eligibility errors",
      "No visibility into where a claim sits once it is submitted",
      "Manual submission processes introducing delay and error",
      "Denial patterns invisible because nobody aggregates reason codes",
      "Claims abandoned past the filing deadline and written off",
      "Rework consuming staff time that clean submission would have saved",
    ],
    features: [
      { title: "Pre-submission scrubbing", description: "Automated validation against payer-specific rules, NCCI edits and medical necessity before submission." },
      { title: "Electronic submission", description: "Secure electronic submission to all major payers with clearinghouse acknowledgement tracking." },
      { title: "Real-time monitoring", description: "Continuous claim status tracking with alerts on anything stalled or rejected." },
      { title: "Rapid error resolution", description: "Rejections are identified, corrected and resubmitted in days, not weeks." },
      { title: "Performance analytics", description: "Dashboards showing acceptance rate, rejection reasons and payer-level trends." },
      { title: "Process optimization", description: "Data-driven changes to submission practice that lift clean claim rate over time." },
    ],
    benefits: [
      "Higher first-pass acceptance rates",
      "Fewer rejections and denials reaching your AR",
      "Faster reimbursement and improved cash flow",
      "Real-time claim status visibility",
      "Errors caught before submission, not after",
      "Filing deadlines tracked so nothing expires",
    ],
    process: [
      { step: "01", title: "Claim scrubbing", description: "Pre-submission validation checks coding accuracy, demographics, eligibility and compliance requirements." },
      { step: "02", title: "Electronic submission", description: "Claims are transmitted electronically with correct formatting and any required attachments." },
      { step: "03", title: "Status tracking", description: "We monitor adjudication in real time and act on anything that stalls or rejects." },
      { step: "04", title: "Performance analysis", description: "Aggregated data identifies the recurring causes of rejection so submission practice improves." },
    ],
    faqs: [
      { question: "What is claim scrubbing and why does it matter?", answer: "Claim scrubbing is automated pre-submission checking for errors — coding accuracy, patient demographics, insurance details and compliance requirements. It matters because catching an error before submission is dramatically cheaper than reworking a denial: MGMA puts rework at roughly $25 within three days versus $118 after 30." },
      { question: "What is the difference between a rejection and a denial?", answer: "A rejection happens before adjudication — the clearinghouse or payer refuses the claim for a format or data error, and it never enters the payer's system. A denial happens after adjudication, when the payer processes the claim and declines payment. Rejections are usually fixed and resubmitted in days; denials require appeal." },
      { question: "How do you track claim status?", answer: "We use integrated clearinghouse connections and direct payer portals to track claims through adjudication. You get dashboard access showing submission status, processing stage and anything requiring attention, rather than waiting for a monthly report." },
      { question: "What happens when a claim is rejected?", answer: "Rejections are flagged immediately, root-caused, corrected and resubmitted. We also aggregate rejection reasons by payer so recurring causes get fixed at the source instead of being handled one claim at a time." },
    ],
    related: ["medical-billing", "denial-management", "ar-management"],
    keywords: ["claims management services", "medical claims processing", "claim scrubbing"],
  },
  {
    slug: "denial-management",
    name: "Denial Management",
    short: "Denial Management",
    icon: ShieldAlert,
    eyebrow: "Revenue Recovery",
    headline: "Denial Management & Appeals",
    summary:
      "Denial management is the process of analyzing why claims are denied, appealing those that should be paid, and fixing the upstream cause so they stop recurring. It matters more than most practices realize: MGMA reports 50–65% of denied claims are never reworked at all, which means the revenue is simply written off.",
    blurb: "Root-cause analysis, strategic appeals, and prevention that compounds.",
    challenges: [
      "Denied claims written off because nobody has time to appeal them",
      "No root-cause analysis, so the same denial recurs every month",
      "Appeal letters that do not address the payer's stated reason",
      "Payer-specific appeal deadlines missed and revenue forfeited",
      "Denial reason codes collected but never aggregated or acted on",
      "Staff lacking the payer-policy knowledge to argue a case successfully",
    ],
    features: [
      { title: "Denial analytics", description: "Every denial categorized by CARC/RARC reason code, payer, provider and service line." },
      { title: "Root-cause analysis", description: "We trace each denial pattern to the upstream process failure that produced it." },
      { title: "Appeal preparation", description: "Appeals built around the payer's stated reason with the clinical documentation to support it." },
      { title: "Deadline tracking", description: "Payer-specific appeal windows tracked so nothing expires unworked." },
      { title: "Prevention feedback", description: "Findings routed to front-end and coding processes so denials stop being generated." },
      { title: "Recovery reporting", description: "Transparent reporting on appeal volume, overturn rate and dollars recovered." },
    ],
    benefits: [
      "Revenue recovered that would otherwise be written off",
      "Denial rate falling over time, not just denials worked faster",
      "Appeals filed within every payer's deadline",
      "Clear visibility into which payers deny most and why",
      "Documentation gaps identified and closed at the source",
      "Staff freed from a task most practices never complete",
    ],
    process: [
      { step: "01", title: "Capture & categorize", description: "Every denial is logged and classified by reason code, payer, provider and service line." },
      { step: "02", title: "Analyze root cause", description: "Patterns are traced to the specific upstream failure — eligibility, authorization, coding or documentation." },
      { step: "03", title: "Appeal & resubmit", description: "Appeals are prepared with payer-specific documentation and filed inside the deadline." },
      { step: "04", title: "Prevent recurrence", description: "Findings are fed back into front-end process so the same denial stops being generated." },
    ],
    faqs: [
      { question: "What is a normal claim denial rate?", answer: "The HFMA considers a first-pass denial rate of 5–10% acceptable, with top-quartile performers under 5%. The confirmed industry average reached 11.8% in 2024, and MGMA reports 41% of providers now exceed 10%. If your denial rate is above 10%, you are losing recoverable revenue every month." },
      { question: "How much does it cost to rework a denied claim?", answer: "MGMA puts the cost at roughly $25 when the denial is worked within three days, rising to about $118 once it has aged past 30 days — a 4.7x penalty for delay alone. Speed of response is one of the highest-leverage variables in denial management." },
      { question: "Can denied claims still be recovered?", answer: "Frequently, yes. Many denials are procedural rather than substantive — a missing modifier, an authorization not attached, a coordination-of-benefits issue. We review the denial reason, gather supporting documentation and appeal following payer-specific requirements. A substantial share are overturned." },
      { question: "How do you prevent denials rather than just appeal them?", answer: "Appealing is recovery; prevention is the actual goal. We aggregate denials by reason code and payer to find the systematic cause, then fix it upstream — tightening eligibility verification, correcting a coding pattern, or closing a documentation gap. Appeal volume should fall over time." },
    ],
    related: ["claims-management", "ar-management", "medical-coding"],
    keywords: ["denial management services", "claim denial appeals", "reduce claim denials"],
  },
  {
    slug: "ar-management",
    name: "AR Management",
    short: "AR Management",
    icon: Clock4,
    eyebrow: "Revenue Recovery",
    headline: "AR Management & Recovery",
    summary:
      "Accounts receivable management is the systematic pursuit of claims that have been submitted but not paid. AR value decays with age — claims past 90 days collect at a fraction of fresh claims, and past the payer's filing deadline they collect at zero. Vizora works your aging inventory by recovery priority.",
    blurb: "Systematic follow-up that turns aging balances into collected revenue.",
    challenges: [
      "AR balances past 90 days quietly aging toward write-off",
      "Staff without time for the consistent follow-up recovery requires",
      "No basis for deciding which claims to chase first",
      "Timely filing deadlines missed and revenue permanently forfeited",
      "Payers delaying or ignoring follow-up with no escalation path",
      "No expertise in escalation, appeals or payer dispute resolution",
    ],
    features: [
      { title: "Aging AR analysis", description: "Full inventory review scoring every outstanding claim by value, age and recoverability." },
      { title: "Dedicated follow-up team", description: "Specialists working payer queues full time rather than fitting it around other duties." },
      { title: "Systematic outreach", description: "A structured follow-up cadence so no claim is left unworked or forgotten." },
      { title: "Payer escalation", description: "Defined escalation paths when routine follow-up stalls, including provider-relations engagement." },
      { title: "Appeals management", description: "Underpaid and denied claims appealed with supporting documentation." },
      { title: "Recovery analytics", description: "Reporting on recovery rate by payer, aging bucket and denial category." },
    ],
    benefits: [
      "Aging balances converted into collected cash",
      "Lower write-offs and shrinking 90+ day buckets",
      "Filing deadlines tracked before they expire",
      "Recovery effort concentrated where the money is",
      "Payer-level insight into who delays payment and why",
      "Measurable ROI reported on the recovery work itself",
    ],
    process: [
      { step: "01", title: "AR analysis", description: "We inventory your receivables, score claims by recoverability, and identify claims approaching filing deadlines." },
      { step: "02", title: "Prioritized follow-up", description: "Specialists work the queue by value and urgency, contacting payers on a structured cadence." },
      { step: "03", title: "Appeals & resubmission", description: "Denied and underpaid claims are appealed with the documentation each payer requires." },
      { step: "04", title: "Recovery reporting", description: "Progress is tracked by aging bucket and payer, with clear reporting on dollars recovered." },
    ],
    faqs: [
      { question: "What are days in AR and what is a good number?", answer: "Days in AR measures how long it takes on average to collect payment after a service is delivered. MGMA benchmarks put the industry average at 35–45 days, with top performers under 30. Above 45 days generally indicates a follow-up process that is not keeping pace with claim volume." },
      { question: "How far back can you pursue unpaid claims?", answer: "Recovery is bounded by each payer's timely filing deadline, typically 90 to 365 days from date of service. We identify claims approaching those deadlines first, since those are the ones where delay converts recoverable revenue into a permanent write-off." },
      { question: "How do you decide which claims to work first?", answer: "We prioritize on claim value, aging bucket, payer responsiveness and likelihood of recovery — with claims near a filing deadline escalated immediately regardless of value. Every claim still gets systematic follow-up; prioritization determines sequence, not coverage." },
      { question: "Will you work claims that have already been denied?", answer: "Yes. Denied claims often carry significant recovery potential, particularly where the denial was procedural. We review the reason, gather additional documentation where needed, and appeal following payer-specific requirements." },
    ],
    related: ["denial-management", "claims-management", "patient-collections"],
    keywords: ["AR management", "accounts receivable recovery", "aged AR recovery healthcare"],
  },
  {
    slug: "eligibility-verification",
    name: "Eligibility Verification",
    short: "Eligibility Verification",
    icon: BadgeCheck,
    eyebrow: "Front-End Prevention",
    headline: "Insurance Eligibility Verification",
    summary:
      "Eligibility verification confirms a patient's coverage is active and establishes their financial responsibility before the visit. It is the cheapest denial prevention available: eligibility and registration errors are among the largest categories of avoidable denial, and every one is preventable at the front desk.",
    blurb: "Real-time coverage checks that stop denials before they are created.",
    challenges: [
      "Coverage terminated or changed without the practice knowing",
      "Eligibility denials arriving weeks after the service was delivered",
      "Patients billed unexpectedly, damaging trust and delaying payment",
      "Manual portal checks consuming front-desk time at every check-in",
      "Services requiring prior authorization identified only after denial",
      "Secondary and tertiary coverage missed entirely",
    ],
    features: [
      { title: "Real-time verification", description: "Active coverage confirmed against the payer before the appointment date." },
      { title: "Benefits breakdown", description: "Copay, deductible status, coinsurance and coverage limits captured in detail." },
      { title: "Authorization flags", description: "Services requiring prior authorization identified before they are rendered." },
      { title: "Patient responsibility", description: "Accurate out-of-pocket estimates so patients are not surprised by a bill." },
      { title: "Coordination of benefits", description: "Secondary and tertiary coverage identified and sequenced correctly." },
      { title: "Batch pre-checks", description: "Upcoming schedules verified in advance so issues surface before the patient arrives." },
    ],
    benefits: [
      "Eligibility denials substantially reduced",
      "Point-of-service collections improved",
      "Front-desk time returned to patient care",
      "Authorization requirements caught before service",
      "Fewer surprise patient bills and billing disputes",
      "Cleaner claims entering the submission process",
    ],
    process: [
      { step: "01", title: "Schedule ingestion", description: "We pull upcoming appointments from your practice management system on a rolling basis." },
      { step: "02", title: "Payer verification", description: "Coverage is verified against each payer, including plan status, benefits and authorization requirements." },
      { step: "03", title: "Exception handling", description: "Terminated, changed or unverifiable coverage is escalated to your front desk before the visit." },
      { step: "04", title: "Documentation", description: "Verified benefits and estimated patient responsibility are written back into the patient record." },
    ],
    faqs: [
      { question: "Why does eligibility verification reduce denials so much?", answer: "Because eligibility and registration errors are among the largest categories of avoidable denial, and unlike clinical denials they are entirely preventable. A claim submitted against terminated coverage will always deny. Verifying before the visit removes that failure mode instead of managing it afterward." },
      { question: "How far in advance do you verify?", answer: "We verify on a rolling basis ahead of the appointment date, which leaves time to resolve problems before the patient arrives. Same-day additions and walk-ins are verified in real time." },
      { question: "Do you check for prior authorization requirements?", answer: "Yes. Verification includes flagging services that require prior authorization under the patient's specific plan. Authorization denials are among the most frustrating precisely because the service has already been delivered when the denial arrives." },
      { question: "Can you estimate what the patient will owe?", answer: "Yes. We capture deductible status, copay and coinsurance so your front desk can quote an accurate out-of-pocket estimate and collect at the point of service — which collects far more reliably than billing the patient later." },
    ],
    related: ["prior-authorization", "medical-billing", "patient-collections"],
    keywords: ["insurance eligibility verification", "patient eligibility check", "benefits verification"],
  },
  {
    slug: "prior-authorization",
    name: "Prior Authorization",
    short: "Prior Authorization",
    icon: KeyRound,
    eyebrow: "Essential Service",
    headline: "Prior Authorization Services",
    summary:
      "Prior authorization is payer approval obtained before a service is delivered. When it is missed, the claim denies after the care has already been provided — the worst possible outcome, since the cost is sunk. Vizora manages authorization requests, follow-up and appeals end to end.",
    blurb: "Authorization requests, tracking and appeals handled end to end.",
    challenges: [
      "Treatment delayed while authorization sits in a payer queue",
      "Claims denied for missing authorization after care was delivered",
      "Clinical staff pulled off patient care to chase payer approvals",
      "No visibility into which requests are pending or stalled",
      "Payer-specific clinical criteria that change without notice",
      "Authorization denials accepted rather than appealed",
    ],
    features: [
      { title: "Request initiation", description: "We assemble and submit authorization requests with the clinical documentation each payer requires." },
      { title: "Active follow-up", description: "Requests are pursued rather than filed and forgotten, with escalation when they stall." },
      { title: "Real-time tracking", description: "Every pending request visible with current status and expected decision date." },
      { title: "Criteria expertise", description: "Working knowledge of payer-specific clinical criteria and how to document against them." },
      { title: "Peer-to-peer coordination", description: "We arrange and prepare providers for peer-to-peer reviews when required." },
      { title: "Denial appeals", description: "Authorization denials appealed with strengthened clinical justification." },
    ],
    benefits: [
      "Faster approvals and fewer treatment delays",
      "Authorization-related denials substantially reduced",
      "Clinical staff returned to clinical work",
      "Complete visibility into pending requests",
      "Documentation aligned to each payer's criteria",
      "Denied authorizations appealed rather than absorbed",
    ],
    process: [
      { step: "01", title: "Request initiation", description: "We receive the order, confirm authorization is required, and gather the supporting clinical documentation." },
      { step: "02", title: "Submission & follow-up", description: "Requests are submitted to the payer and actively worked until a decision is issued." },
      { step: "03", title: "Status tracking", description: "Real-time status is maintained and communicated proactively to your scheduling team." },
      { step: "04", title: "Approval or appeal", description: "Approvals are documented in your system; denials are appealed with strengthened justification." },
    ],
    faqs: [
      { question: "How long does prior authorization usually take?", answer: "Most authorizations are decided within 3–5 business days, though this varies significantly by payer and service. Urgent requests can often be expedited. We track every pending request and escalate anything sitting beyond the payer's stated turnaround." },
      { question: "What happens if an authorization is denied?", answer: "We appeal. Authorization denials frequently turn on documentation that did not clearly address the payer's clinical criteria rather than on genuine medical necessity. We work with your clinical team to strengthen the justification and resubmit, including arranging peer-to-peer review where that is the faster path." },
      { question: "Do you work with all payers?", answer: "Yes — major commercial payers, Medicare Advantage plans, and Medicaid managed care organizations. Each maintains its own criteria and submission channels, which is precisely the complexity this service exists to absorb." },
      { question: "Why are authorization denials so costly?", answer: "Because the service has usually already been delivered. Unlike an eligibility denial caught before the visit, an authorization denial means you have incurred the full cost of care with no path to payment. That asymmetry is why authorization is worth managing proactively." },
    ],
    related: ["eligibility-verification", "denial-management", "medical-billing"],
    keywords: ["prior authorization services", "pre-authorization outsourcing", "prior auth management"],
  },
  {
    slug: "credentialing",
    name: "Provider Credentialing",
    short: "Credentialing",
    icon: UserCheck,
    eyebrow: "Seamless Enrollment",
    headline: "Provider Credentialing & Enrollment",
    summary:
      "Credentialing is the process of enrolling a provider with insurance networks so their services can be billed. Until it completes, a provider generates cost but no billable revenue. Vizora manages applications, primary source verification, CAQH maintenance and re-credentialing so revenue starts as early as possible.",
    blurb: "Enrollment with every major network, tracked to completion.",
    challenges: [
      "New providers unable to bill for months after their start date",
      "Applications rejected for incomplete or inconsistent information",
      "CAQH profiles lapsing and silently blocking enrollment",
      "Re-credentialing deadlines missed, causing network termination",
      "No visibility into where each application actually stands",
      "Revenue lost permanently for services rendered pre-enrollment",
    ],
    features: [
      { title: "Application management", description: "Complete application preparation and submission to each target network." },
      { title: "Primary source verification", description: "Licenses, education, board certification and work history verified and documented." },
      { title: "CAQH maintenance", description: "Profiles kept current and re-attested on schedule so enrollment is never blocked." },
      { title: "Payer follow-up", description: "Applications actively tracked with each payer rather than submitted and awaited." },
      { title: "Re-credentialing", description: "Renewal deadlines tracked and processed ahead of expiration." },
      { title: "Status reporting", description: "Clear visibility into where every provider stands with every payer." },
    ],
    benefits: [
      "Providers billing sooner after their start date",
      "Fewer applications rejected on technicalities",
      "No lapses in network participation",
      "CAQH kept current without internal effort",
      "Enrollment status visible at a glance",
      "Revenue protected during practice growth",
    ],
    process: [
      { step: "01", title: "Application (weeks 1–2)", description: "Document collection, CAQH profile setup and initial submission to target payers." },
      { step: "02", title: "Verification (weeks 3–6)", description: "Primary source verification of licensure, education, board certification and work history." },
      { step: "03", title: "Committee review (weeks 7–10)", description: "Payer credentialing committee review, with active follow-up on anything outstanding." },
      { step: "04", title: "Enrollment (weeks 11–12)", description: "Network addition, provider ID issuance and configuration in your billing system." },
    ],
    faqs: [
      { question: "How long does provider credentialing take?", answer: "Typically 60–90 days from complete application to network approval, though it varies by payer and state. Medicare and Medicaid often run longer than commercial plans. The most common cause of delay is an incomplete initial application, which is why the preparation stage matters more than it appears." },
      { question: "Can we bill for services provided before credentialing completes?", answer: "It depends on the payer. Some permit retroactive billing to the application date once approved; many do not. This is why starting credentialing well before a provider's start date has direct revenue consequences — we begin as early as your onboarding timeline allows." },
      { question: "What is CAQH and why does it matter?", answer: "CAQH ProView is the centralized database most commercial payers pull credentialing data from. If a profile is incomplete or its attestation lapses, applications stall without the practice necessarily being notified. We maintain and re-attest profiles on schedule so this never becomes the bottleneck." },
      { question: "Do you handle re-credentialing?", answer: "Yes. Re-credentialing typically recurs every two to three years per payer. We track every renewal deadline and process it ahead of expiration, because a lapse can mean termination from the network and an interruption in payment." },
    ],
    related: ["medical-billing", "revenue-cycle-management", "practice-analytics"],
    keywords: ["provider credentialing services", "medical credentialing", "payer enrollment"],
  },
  {
    slug: "patient-collections",
    name: "Patient Collections",
    short: "Patient Collections",
    icon: CreditCard,
    eyebrow: "Revenue Recovery",
    headline: "Patient Collections & Payment Services",
    summary:
      "Patient responsibility has grown steadily with high-deductible plans, making patient balances a material share of practice revenue. Collecting them well requires a different approach than payer follow-up — clear statements, flexible payment options, and communication that preserves the clinical relationship.",
    blurb: "Compassionate collections that improve recovery without damaging trust.",
    challenges: [
      "Patient balances growing as high-deductible plans expand",
      "Statements patients cannot understand and therefore do not pay",
      "Staff uncomfortable having financial conversations with patients",
      "No payment plan option, so large balances go unpaid entirely",
      "Bad debt write-offs climbing year over year",
      "Collection efforts damaging the patient relationship",
    ],
    features: [
      { title: "Clear statements", description: "Plain-language statements that explain what insurance paid and what remains owed." },
      { title: "Multi-channel outreach", description: "Contact by the patient's preferred channel — mail, email, text or phone." },
      { title: "Flexible payment plans", description: "Structured plans that make large balances payable instead of ignored." },
      { title: "Online payment", description: "Card, ACH and portal payment options that remove friction from paying." },
      { title: "Point-of-service collection", description: "Front-desk support for collecting copays and estimates at the time of visit." },
      { title: "Compliant communication", description: "HIPAA-compliant, professional contact that protects the clinical relationship." },
    ],
    benefits: [
      "Higher recovery on patient balances",
      "Fewer bad debt write-offs",
      "Patients who understand what they owe and why",
      "Financial conversations handled off your staff's plate",
      "Payment options that fit patient budgets",
      "Patient satisfaction preserved through the process",
    ],
    process: [
      { step: "01", title: "Balance verification", description: "Outstanding balances are confirmed accurate before any patient is contacted." },
      { step: "02", title: "Patient outreach", description: "Professional, plain-language communication through the patient's preferred channel." },
      { step: "03", title: "Payment solutions", description: "Flexible plans and multiple payment methods offered to make resolution realistic." },
      { step: "04", title: "Posting & reconciliation", description: "Payments are processed, posted and reconciled against your ledger." },
    ],
    faqs: [
      { question: "Will collections damage our patient relationships?", answer: "It depends entirely on how it is done. Most patient frustration comes from statements they cannot understand and bills they did not expect — not from being asked to pay. Clear explanation, accurate up-front estimates and a realistic payment option resolve most balances without conflict." },
      { question: "What payment options do you offer patients?", answer: "Card and ACH payment, online portal access, and structured payment plans set according to your practice's policy. Offering a plan is often the difference between partial recovery and a total write-off on a large balance." },
      { question: "Do you collect at the point of service?", answer: "We support it. Point-of-service collection is substantially more effective than billing after the fact, which is why accurate eligibility verification matters here — you cannot collect an estimate you have not calculated." },
      { question: "Is this the same as a collections agency?", answer: "No. This is early-stage patient billing and follow-up conducted as an extension of your practice, under your policies and in your name. It is designed to resolve balances before they would ever reach third-party collections." },
    ],
    related: ["patient-support", "eligibility-verification", "ar-management"],
    keywords: ["patient collections services", "patient billing services", "patient payment solutions"],
  },
  {
    slug: "patient-support",
    name: "Patient Support",
    short: "Patient Support",
    icon: Headphones,
    eyebrow: "Patient Experience",
    headline: "Patient Billing Support Services",
    summary:
      "Billing questions are among the most common reasons patients call a practice, and each call pulls staff away from clinical work. Vizora's support team answers billing inquiries directly — explaining coverage, resolving disputes and setting up payment — with full access to claim detail.",
    blurb: "Professional billing support that frees your front desk.",
    challenges: [
      "Front desk interrupted constantly by billing questions",
      "Patients waiting on hold or never receiving a call back",
      "No coverage for inquiries outside office hours",
      "Call volume spiking unpredictably after statement runs",
      "Staff without claim-level detail to answer accurately",
      "Inconsistent explanations eroding patient trust",
    ],
    features: [
      { title: "Extended-hours coverage", description: "Support available beyond your office hours so inquiries do not queue overnight." },
      { title: "Multi-channel access", description: "Phone, email and patient portal handled by the same informed team." },
      { title: "Claim-level detail", description: "Representatives work with full claim and EOB visibility, so answers are accurate." },
      { title: "HIPAA-compliant handling", description: "Identity verification and privacy protocols applied on every interaction." },
      { title: "Payment handling", description: "Representatives can take payment and establish plans under your policies." },
      { title: "Complete logging", description: "Every interaction documented for continuity and quality review." },
    ],
    benefits: [
      "Front-desk staff returned to patient care",
      "Patients reaching a person who can actually answer",
      "Consistent, accurate billing explanations",
      "Call spikes absorbed without hiring",
      "Payment collected during the support call itself",
      "Documented history on every patient interaction",
    ],
    process: [
      { step: "01", title: "Inquiry received", description: "Patients reach us by phone, email or portal with a billing question or dispute." },
      { step: "02", title: "Research & resolution", description: "Representatives review claim history, EOBs and payment detail to establish the accurate answer." },
      { step: "03", title: "Clear explanation", description: "Charges, coverage and remaining responsibility are explained in plain language." },
      { step: "04", title: "Documentation & follow-up", description: "The interaction is logged and followed up to confirm the issue is genuinely resolved." },
    ],
    faqs: [
      { question: "What kinds of patient inquiries do you handle?", answer: "Balance questions, insurance and EOB explanations, claim status, statement clarification, payment arrangements and financial assistance requests. Anything requiring clinical judgment is routed straight back to your practice." },
      { question: "Are representatives trained on HIPAA?", answer: "Yes. All representatives complete HIPAA training and follow identity-verification protocols before discussing any account. Interactions are logged, and access is role-restricted to the minimum necessary information." },
      { question: "How quickly are inquiries answered?", answer: "Phone inquiries are answered live during covered hours. Email and portal inquiries receive a response within one business day. Anything urgent — a patient at the front desk with a billing dispute — is escalated immediately." },
      { question: "Can representatives set up payment plans?", answer: "Yes, within the parameters your practice defines. You set the policy on plan length, minimum payment and any discount authority; our team applies it consistently so patients receive the same answer regardless of who they reach." },
    ],
    related: ["patient-collections", "medical-billing", "eligibility-verification"],
    keywords: ["patient billing support", "medical billing customer service", "patient inquiry handling"],
  },
  {
    slug: "practice-analytics",
    name: "Practice Analytics",
    short: "Practice Analytics",
    icon: BarChart3,
    eyebrow: "Business Intelligence",
    headline: "Practice Analytics & Reporting",
    summary:
      "Practice analytics turns revenue cycle data into decisions. The metrics that matter are net collection ratio, first-pass clean claim rate, days in AR, denial rate by reason and payer, and cost to collect. Vizora delivers those continuously, benchmarked, with the analysis needed to act on them.",
    blurb: "Live dashboards, benchmarking, and analysis you can act on.",
    challenges: [
      "No clear view of how the revenue cycle is actually performing",
      "Data trapped across practice management, clearinghouse and payer systems",
      "Reports compiled by hand and outdated by the time they are read",
      "Problems visible only after they have cost a quarter of revenue",
      "No benchmark for whether current performance is good or poor",
      "Reporting that describes what happened but not what to do",
    ],
    features: [
      { title: "Live dashboards", description: "Key metrics updated continuously rather than compiled monthly." },
      { title: "Denial analytics", description: "Denial rate broken out by reason code, payer, provider and service line." },
      { title: "Payer performance", description: "Comparative analysis of payment speed, denial rate and underpayment by payer." },
      { title: "Trend analysis", description: "Performance tracked over time so direction is visible, not just position." },
      { title: "Benchmarking", description: "Your metrics compared against MGMA and HFMA industry benchmarks." },
      { title: "Actionable recommendations", description: "Analysis that names the specific change to make, not just the number that moved." },
    ],
    benefits: [
      "Revenue cycle performance visible in real time",
      "Problems caught in weeks rather than quarters",
      "Clear evidence of which payers underperform",
      "Objective benchmarks for practice performance",
      "Manual report compilation eliminated",
      "Decisions grounded in data rather than instinct",
    ],
    process: [
      { step: "01", title: "Data integration", description: "We connect to your practice management system and consolidate revenue cycle data from every source." },
      { step: "02", title: "Dashboard configuration", description: "Dashboards are built around the metrics that matter to your specialty and structure." },
      { step: "03", title: "Continuous monitoring", description: "Data refreshes automatically so performance and trend are always current." },
      { step: "04", title: "Analysis & recommendation", description: "Regular review translates the numbers into specific operational changes worth making." },
    ],
    faqs: [
      { question: "Which revenue cycle metrics actually matter?", answer: "Five carry most of the signal: net collection ratio (what you collect against what was collectible), first-pass clean claim rate, days in AR, denial rate segmented by reason and payer, and cost to collect. Most other metrics are downstream of these five." },
      { question: "What is a good net collection ratio?", answer: "Net collection ratio measures collections against the amount actually collectible after contractual adjustments. Consistently below 95% indicates revenue being lost to denials, underpayments or write-offs — and the segmented data is what tells you which of the three." },
      { question: "How often does data refresh?", answer: "Dashboards refresh multiple times daily, subject to your practice management system's data availability. Historical data is retained so trend analysis and period comparison are possible from the start." },
      { question: "Do you provide industry benchmarking?", answer: "Yes. Metrics are presented against published MGMA and HFMA benchmarks so you can see whether 38 days in AR is good or poor for your specialty. Context is what makes a number actionable." },
    ],
    related: ["revenue-cycle-management", "denial-management", "medical-billing"],
    keywords: ["practice analytics", "healthcare revenue analytics", "medical billing reporting"],
  },
];

export const serviceMap = new Map(services.map((s) => [s.slug, s]));
export const getService = (slug: string) => serviceMap.get(slug);
export const serviceSlugs = services.map((s) => s.slug);
