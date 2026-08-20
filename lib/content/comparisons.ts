import type { Faq } from "./faq";

/**
 * Comparison pages.
 *
 * Comparison content is the highest-yield format for AI answer engines —
 * roughly a third of citations across studied queries — because it is
 * structured, balanced and directly answers an evaluative question. It also
 * captures the highest-intent search there is: someone comparing options is
 * someone about to decide.
 *
 * The editorial rule here is the one that makes comparison content work at
 * all: each page has to name the situations where the answer is NOT us. A
 * comparison that concludes "choose us" six times out of six is an ad, and
 * both readers and language models discount it accordingly.
 *
 * ---------------------------------------------------------------------------
 * NAMED-COMPETITOR PAGES — VERIFY BEFORE PUBLISHING
 *
 * Pages that name a real company are deliberately written at the level of the
 * BUSINESS MODEL (integrated platform vs independent service), not at the
 * level of that company's current pricing, feature list or ownership. Those
 * change without notice, and a comparison page that misstates a competitor is
 * a legal exposure as well as a ranking liability — answer engines cross-check
 * competitor claims and discount pages that get them wrong.
 *
 * Rules for anything naming a competitor:
 *  - No specific competitor pricing figures. Say "confirm current terms
 *    directly" instead, as the existing rows do.
 *  - No claims about ownership, funding, headcount or roadmap.
 *  - Nothing stated as a competitor weakness that is not verifiable from
 *    their own public documentation.
 *  - Re-verify every competitor row at least annually.
 *
 * Someone with current knowledge of each product should read these before
 * they go live.
 * ---------------------------------------------------------------------------
 */

export type ComparisonRow = {
  dimension: string;
  a: string;
  b: string;
  /** Which column this dimension favours, if either. */
  edge?: "a" | "b" | "even";
};

export type Comparison = {
  slug: string;
  title: string;
  /** The query this page exists to answer, phrased as a person would type it. */
  question: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  labelA: string;
  labelB: string;
  /** 40-60 words, self-contained, leads the page. */
  answer: string;
  intro: string[];
  rows: ComparisonRow[];
  chooseA: { headline: string; points: string[] };
  chooseB: { headline: string; points: string[] };
  /** Where the honest answer is uncomfortable for us. */
  caveat: string;
  faqs: Faq[];
  related: { label: string; href: string }[];
};

export const comparisons: Comparison[] = [
  {
    slug: "in-house-vs-outsourced-medical-billing",
    title: "In-House vs Outsourced Medical Billing",
    question: "Should a practice keep billing in-house or outsource it?",
    metaTitle: "In-House vs Outsourced Billing: Cost and Risk",
    metaDescription:
      "A direct cost and risk comparison of in-house billing versus outsourcing, including fully loaded staffing costs, key-person risk, and the practice sizes where each option actually wins.",
    keywords: [
      "in-house vs outsourced medical billing",
      "should I outsource medical billing",
      "outsourced medical billing cost",
      "in-house medical biller cost",
      "medical billing outsourcing pros and cons",
    ],
    labelA: "In-house billing",
    labelB: "Outsourced billing",
    answer:
      "In-house billing gives you direct control and fixed cost, but concentrates risk in one or two people and rarely justifies specialist coding expertise below about six providers. Outsourcing converts billing to a variable cost that scales with collections and removes key-person risk, at the cost of daily proximity.",
    intro: [
      "The comparison is usually framed as a percentage — a billing company charging 4 to 8% of collections versus a salaried biller — and framed that way, in-house almost always looks cheaper. The framing is wrong, because it compares a fully loaded external cost against a partially loaded internal one.",
      "A single medical biller's fully loaded cost runs near $73,000 a year once employer taxes, benefits and paid leave are included, using Bureau of Labor Statistics occupational wage and compensation data. That figure excludes clearinghouse fees, practice management software seats, coding reference subscriptions, continuing education, recruiting, and the cost of the weeks when that person is on leave and nothing is being submitted.",
      "The more useful question is not which is cheaper per dollar collected. It is which produces a higher net collection rate — because a two-point difference in net collection rate on $2 million in charges is $40,000, which dwarfs the fee difference in either direction.",
    ],
    rows: [
      { dimension: "Cost structure", a: "Fixed — salary and benefits regardless of collections", b: "Variable — a percentage of what is actually collected", edge: "b" },
      { dimension: "Fully loaded annual cost", a: "~$73,000 per biller (BLS wage + benefits data)", b: "4–8% of net collections", edge: "even" },
      { dimension: "Cost when volume drops", a: "Unchanged", b: "Falls proportionally", edge: "b" },
      { dimension: "Coverage during leave or turnover", a: "Collections stop or slow", b: "Team coverage, no single point of failure", edge: "b" },
      { dimension: "Specialty coding depth", a: "Limited to what your hires know", b: "Access to certified coders across specialties", edge: "b" },
      { dimension: "Day-to-day proximity", a: "Down the hall, immediate context", b: "Scheduled contact, defined escalation", edge: "a" },
      { dimension: "Control over process", a: "Complete", b: "Contractual — you set expectations, not steps", edge: "a" },
      { dimension: "Patient-facing billing questions", a: "Handled by staff who know the patients", b: "Handled by a service, quality varies by vendor", edge: "a" },
      { dimension: "Denial appeal capacity", a: "Constrained by one person's available hours", b: "Scales with volume", edge: "b" },
      { dimension: "Reporting and benchmarking", a: "Whatever your PM system produces", b: "Usually stronger, but verify before signing", edge: "b" },
      { dimension: "Data and access control", a: "Internal, no BAA needed", b: "Requires a Business Associate Agreement and vendor diligence", edge: "a" },
      { dimension: "Switching cost", a: "High — rehiring and retraining", b: "Moderate — contract notice period and data migration", edge: "even" },
    ],
    chooseA: {
      headline: "Keep billing in-house when",
      points: [
        "You have six or more providers and enough volume to employ a dedicated, credentialed coder rather than a generalist.",
        "Your specialty is narrow and stable, so institutional knowledge compounds rather than needing constant breadth.",
        "You already run a clean claim rate above 95% and days in AR under 35 — a working system is not worth disrupting.",
        "Patient billing conversations are a meaningful part of your patient relationship and you want them handled in-house.",
      ],
    },
    chooseB: {
      headline: "Outsource when",
      points: [
        "Collections depend on one person, and their absence stops cash flow.",
        "Your denial rate is above 10% or AR beyond 90 days is climbing, and nobody has the hours to work the queue.",
        "You are adding providers or locations and billing capacity is the constraint.",
        "You bill multiple specialties, or a specialty with genuinely difficult coding — anesthesia time units, mental health authorization limits, surgical global periods.",
        "You cannot answer, from a report, what your first-pass denial rate was last month.",
      ],
    },
    caveat:
      "If you have a strong biller, a denial rate under 8% and AR under 35 days, outsourcing will most likely not improve your numbers — and we will tell you that after the audit rather than after the contract. The practices that gain most from outsourcing are the ones whose current system is failing quietly, not the ones already running well.",
    faqs: [
      {
        question: "Is outsourced medical billing cheaper than hiring a biller?",
        answer:
          "It depends on volume. At roughly $73,000 fully loaded per biller, a practice collecting under about $1.2 million a year usually pays less outsourcing at 6% than employing one biller — and gets appeal capacity and coverage it could not otherwise afford. Above that threshold the comparison turns on net collection rate rather than raw cost.",
      },
      {
        question: "Do I lose control of my revenue if I outsource billing?",
        answer:
          "You lose proximity, not control. The claims, the data and the patient relationships remain yours, and a reasonable contract gives you full system access, monthly reporting on denials by reason and payer, and a defined notice period. What you should insist on is visibility: if a vendor cannot show you first-pass denial rate by payer, that is the real loss of control.",
      },
      {
        question: "How long does it take to switch to an outsourced biller?",
        answer:
          "Typically two to four weeks from signed agreement to first claim submitted, assuming system access is granted promptly. The genuine risk in a transition is not the new claims — it is the existing AR. Agree explicitly, in writing, who works the aged balances during changeover, or that inventory will quietly age past timely filing.",
      },
    ],
    related: [
      { label: "Pricing", href: "/pricing" },
      { label: "Revenue leak calculator", href: "/tools/revenue-leak-calculator" },
      { label: "Medical billing services", href: "/services/medical-billing" },
      { label: "AdvancedMD alternative", href: "/compare/advancedmd-vs-outsourced-billing-service" },
      { label: "CareCloud alternative", href: "/compare/carecloud-vs-outsourced-billing-service" },
    ],
  },

  {
    slug: "medical-billing-vs-medical-coding",
    title: "Medical Billing vs Medical Coding",
    question: "What is the difference between medical billing and medical coding?",
    metaTitle: "Medical Billing vs Medical Coding",
    metaDescription:
      "Medical coding translates documentation into CPT and ICD-10-CM codes; medical billing turns those codes into a paid claim. Where the two functions divide, overlap, and cause denials when they don't talk.",
    keywords: [
      "medical billing vs medical coding",
      "difference between medical billing and coding",
      "what does a medical coder do",
      "what does a medical biller do",
    ],
    labelA: "Medical coding",
    labelB: "Medical billing",
    answer:
      "Medical coding translates clinical documentation into standardized CPT, ICD-10-CM and HCPCS codes. Medical billing takes those codes and turns them into a submitted, adjudicated and collected claim. Coding determines what you are entitled to bill; billing determines whether you actually receive it.",
    intro: [
      "The two are routinely spoken of as one job, and in small practices one person often does both. They are nonetheless distinct disciplines with different credentials, different failure modes and different economics.",
      "Coding is a documentation discipline. The coder reads the note and answers two questions: what was done, and why. Getting that wrong produces denials that look clinical — medical necessity, bundling, level-of-service downcoding — and exposes the practice to audit risk in both directions.",
      "Billing is an operations discipline. The biller answers whether the claim reached the payer, in the required format, within the filing window, against active coverage, with any required authorization attached — and if it was refused, whether anyone appealed. Getting that wrong produces denials that look administrative and are almost entirely preventable.",
    ],
    rows: [
      { dimension: "Core question answered", a: "What was done, and why?", b: "Did we get paid for it?" },
      { dimension: "Primary inputs", a: "Clinical documentation, the chart note", b: "Coded claim, payer rules, remittance advice" },
      { dimension: "Outputs", a: "CPT, ICD-10-CM, HCPCS codes and modifiers", b: "Submitted claims, appeals, posted payments, patient statements" },
      { dimension: "Typical credentials", a: "CPC, CCS, CIC, RHIT (AAPC / AHIMA)", b: "CPB, or experience-based" },
      { dimension: "Governing references", a: "CPT, ICD-10-CM guidelines, NCCI edits, LCD/NCD policy", b: "Payer contracts, filing deadlines, X12 transaction standards" },
      { dimension: "Characteristic failure", a: "Medical necessity and bundling denials, under- or over-coding", b: "Timely filing, eligibility and authorization denials, unworked AR" },
      { dimension: "Revenue impact when wrong", a: "Silent — undercoding never generates an alert", b: "Visible — denials and aging appear in reports" },
      { dimension: "Audit exposure", a: "High — coding patterns are profiled by payers", b: "Lower, but includes patient-billing compliance" },
    ],
    chooseA: {
      headline: "Your problem is coding when",
      points: [
        "Denials cluster on medical necessity, bundling or level of service.",
        "Your E/M level distribution sits well below specialty benchmarks.",
        "Denials spike each January or October, when CPT and ICD-10-CM update.",
        "Modifier use is inconsistent between providers doing the same procedure.",
      ],
    },
    chooseB: {
      headline: "Your problem is billing when",
      points: [
        "Denials cluster on eligibility, registration, authorization or timely filing.",
        "AR beyond 90 days is growing while denial rate looks acceptable.",
        "Nobody reads clearinghouse rejection reports daily.",
        "Appeals are filed only for large-dollar claims because there is no capacity for the rest.",
      ],
    },
    caveat:
      "Most practices that ask this question have a coding problem being described as a billing problem, or the reverse. Before hiring for either, pull last quarter's denials, group them by CARC, and see which side of the line they fall on. That single exercise usually answers the staffing question outright.",
    faqs: [
      {
        question: "Can one person do both medical billing and coding?",
        answer:
          "Yes, and in solo and small practices one person usually does. The limit is specialty depth: a generalist handling both will cover routine coding well but is unlikely to keep pace with surgical global periods, anesthesia time units or annual code changes across multiple specialties. That is where combined roles start costing more than they save.",
      },
      {
        question: "Which causes more denials, coding errors or billing errors?",
        answer:
          "Billing and front-end process errors, by a wide margin. Optum attributes 24.3% of denials to registration and eligibility errors alone, and 44% of all denials to front-end processes. Coding errors are more expensive per occurrence and carry audit risk, but they are less frequent.",
      },
      {
        question: "Do I need a certified coder?",
        answer:
          "Certification is not legally required, but it is the practical baseline for specialties with real coding complexity, and it matters if your coding is ever audited. For a routine primary care practice an experienced non-certified coder with structured review can perform well; for surgery, anesthesia, cardiology or oncology, credentialed coding is worth its cost.",
      },
    ],
    related: [
      { label: "Medical coding services", href: "/services/medical-coding" },
      { label: "Medical billing services", href: "/services/medical-billing" },
      { label: "Glossary", href: "/glossary" },
    ],
  },

  {
    slug: "percentage-of-collections-vs-flat-fee-billing",
    title: "Percentage of Collections vs Flat Fee Billing",
    question: "Should a billing company charge a percentage of collections or a flat fee?",
    metaTitle: "Percentage of Collections vs Flat Fee Billing",
    metaDescription:
      "How medical billing companies price: percentage of collections, flat fee per claim, and hybrid models. Which aligns incentives, which is cheaper at volume, and what to check in either contract.",
    keywords: [
      "medical billing pricing models",
      "percentage of collections billing",
      "flat fee medical billing",
      "medical billing cost per claim",
      "how much do medical billing companies charge",
    ],
    labelA: "Percentage of collections",
    labelB: "Flat fee per claim",
    answer:
      "Percentage-of-collections pricing charges a share of what is actually collected, typically 4 to 8%, so the vendor earns nothing on revenue it fails to recover. Flat-fee pricing charges a set amount per claim regardless of outcome, which is cheaper at high volume and low claim value but removes the incentive to chase difficult claims.",
    intro: [
      "The distinction that matters is not price. It is what the vendor is paid for.",
      "Under percentage pricing, a denied claim that is never appealed costs the vendor money. Under flat-fee pricing, a denied claim that is never appealed costs the vendor nothing — the fee was earned on submission. Roughly 70% of appealed denials are overturned, so the appeals backlog is exactly where the incentive difference shows up in your bank account.",
      "That is an argument about alignment, not honesty. Good vendors work denials under either model. But contracts should be read on the assumption that incentives eventually win, because they usually do.",
    ],
    rows: [
      { dimension: "How it is charged", a: "A share of net collections, commonly 4–8%", b: "A fixed amount per claim submitted" },
      { dimension: "Vendor paid when a claim is denied and abandoned", a: "No", b: "Yes", edge: "a" },
      { dimension: "Incentive to appeal", a: "Direct and proportional", b: "None built in", edge: "a" },
      { dimension: "Cost predictability", a: "Varies with collections", b: "Predictable per claim", edge: "b" },
      { dimension: "Cheaper at high volume, low value per claim", a: "No", b: "Yes", edge: "b" },
      { dimension: "Cheaper at low volume, high value per claim", a: "Yes", b: "No", edge: "a" },
      { dimension: "Cost during a slow month", a: "Falls with collections", b: "Unchanged if claim count holds", edge: "a" },
      { dimension: "Risk of vendor cherry-picking easy claims", a: "Low", b: "Higher", edge: "a" },
      { dimension: "Suits high-deductible, patient-heavy revenue", a: "Watch how patient payments are treated", b: "Neutral", edge: "b" },
      { dimension: "Transparency of what you are buying", a: "Requires a clear definition of net collections", b: "Simple to audit", edge: "b" },
    ],
    chooseA: {
      headline: "Percentage of collections suits you when",
      points: [
        "Your average claim value is moderate to high and volume is not extreme.",
        "You have an aged AR or denial backlog you want actually worked, not just submitted.",
        "You want billing cost to fall automatically when volume falls — a seasonal or growing practice.",
        "You would rather pay more on a recovered claim than pay anything on an abandoned one.",
      ],
    },
    chooseB: {
      headline: "Flat fee suits you when",
      points: [
        "You bill very high volumes of low-value claims, where a percentage would exceed reasonable per-claim economics.",
        "Your denial rate is already low and appeals volume is minimal.",
        "You need a fixed, budgetable line item and can accept the incentive trade-off.",
        "You retain denial and appeal work in-house and are buying submission capacity only.",
      ],
    },
    caveat:
      "Under either model, read the definition of what is billable before the rate. A percentage applied to gross charges rather than net collections is a materially different deal at the same headline number. Ask specifically whether patient payments, capitation, refunds, and payments on claims submitted before the contract started are included — that is where the surprises live. Vizora charges a percentage of net collections starting at 3.2%, and does not bill separately for denial appeals.",
    faqs: [
      {
        question: "What is a normal percentage for medical billing services?",
        answer:
          "Between 4% and 8% of net collections for most physician practices, with larger practices and higher claim volumes at the lower end. Rates below roughly 3% usually indicate submission-only service with denial work excluded, and rates above 9% warrant asking what is included that others charge separately.",
      },
      {
        question: "Are denial appeals included in the billing fee?",
        answer:
          "Not always, and this is the single most important thing to confirm in writing. Some vendors bill appeals separately or exclude them entirely, which reintroduces the incentive problem percentage pricing is meant to solve. Ask for the answer in the contract, not the sales conversation.",
      },
      {
        question: "Is percentage-based medical billing legal?",
        answer:
          "Percentage-of-collections billing is standard practice and permitted for commercial and most government claims, but several states regulate percentage-based arrangements and some payer contracts restrict them. It is worth a check with counsel in your state rather than an assumption either way.",
      },
    ],
    related: [
      { label: "Pricing", href: "/pricing" },
      { label: "Machine-readable pricing", href: "/pricing.md" },
      { label: "In-house vs outsourced", href: "/compare/in-house-vs-outsourced-medical-billing" },
    ],
  },

  {
    slug: "offshore-vs-domestic-medical-billing",
    title: "Offshore vs Domestic Medical Billing",
    question: "Is offshore medical billing safe, and how does it compare to domestic?",
    metaTitle: "Offshore vs Domestic Billing: Cost and HIPAA",
    metaDescription:
      "How offshore and domestic medical billing compare on cost, HIPAA exposure, payer knowledge and patient-facing quality — and the contract terms that matter regardless of where the work happens.",
    keywords: [
      "offshore medical billing",
      "is offshore medical billing HIPAA compliant",
      "offshore vs domestic medical billing",
      "outsourcing medical billing overseas",
    ],
    labelA: "Offshore",
    labelB: "Domestic (US-based)",
    answer:
      "Offshore billing is substantially cheaper and can be fully HIPAA-compliant, since HIPAA imposes no geographic restriction — but it requires stricter vendor diligence and subcontractor disclosure. Domestic billing costs more and typically brings closer payer familiarity and better patient-facing interaction, particularly for phone-based collections.",
    intro: [
      "HIPAA does not prohibit offshore processing of protected health information. What it requires is that the business associate safeguard it and that subcontractors be bound by equivalent obligations, wherever they sit. The practical difficulty is not legality; it is enforceability and visibility.",
      "The question most practices should actually ask is not offshore or domestic. It is whether they know where the work happens at all. A meaningful share of US-branded billing companies subcontract offshore without saying so, which means the choice has often already been made for you and is not in the contract you signed.",
      "State law is a real constraint here and varies. Some states impose additional requirements on offshore handling of health data, and some payer contracts restrict it independently of state law.",
    ],
    rows: [
      { dimension: "Cost", a: "Materially lower", b: "Higher", edge: "a" },
      { dimension: "HIPAA permissibility", a: "Permitted; requires equivalent safeguards and BAA flow-down", b: "Permitted", edge: "b" },
      { dimension: "Enforceability of a data breach remedy", a: "Harder across jurisdictions", b: "Straightforward", edge: "b" },
      { dimension: "State law and payer contract constraints", a: "Varies — check both", b: "Generally unrestricted", edge: "b" },
      { dimension: "Familiarity with regional payer behaviour", a: "Varies widely by vendor", b: "Typically stronger", edge: "b" },
      { dimension: "Patient-facing phone interaction", a: "Often the weakest point", b: "Typically stronger", edge: "b" },
      { dimension: "Coverage hours", a: "Overnight processing is a genuine advantage", b: "Business hours", edge: "a" },
      { dimension: "Scalability at short notice", a: "High", b: "Moderate", edge: "a" },
      { dimension: "Transparency about who touches PHI", a: "Depends entirely on the contract", b: "Depends entirely on the contract", edge: "even" },
    ],
    chooseA: {
      headline: "Offshore can work well when",
      points: [
        "The work is high-volume, rules-based processing — charge entry, claim status follow-up, payment posting.",
        "The vendor names its processing locations and subcontractors in the contract.",
        "Access is role-based and auditable, and you can see the audit log.",
        "Patient-facing communication stays domestic or in-house.",
      ],
    },
    chooseB: {
      headline: "Domestic is the safer default when",
      points: [
        "Your state law or a payer contract restricts offshore handling of PHI.",
        "Patient collections involve significant phone contact.",
        "Your specialty needs deep familiarity with a specific MAC's local coverage determinations.",
        "You want breach remedies you can realistically enforce.",
      ],
    },
    caveat:
      "The diligence questions that matter are identical either way: where is PHI stored, who has access, are subcontractors disclosed and bound, when was the last security risk analysis, and what does the BAA say about breach notification timing. A domestic vendor that cannot answer those is a worse choice than an offshore vendor that can.",
    faqs: [
      {
        question: "Is offshore medical billing HIPAA compliant?",
        answer:
          "It can be. HIPAA imposes no geographic restriction on where protected health information is processed, provided the business associate applies required safeguards and binds subcontractors to equivalent terms through the BAA. Some state laws and payer contracts impose their own restrictions, so both need checking separately.",
      },
      {
        question: "How do I find out if my billing company sends work offshore?",
        answer:
          "Ask directly, in writing, and ask for the subcontractor list your BAA already entitles you to. Vague answers about 'global delivery' or 'follow-the-sun coverage' are worth pressing on, because a BAA that does not disclose subcontractors gives you no visibility into who is handling your patients' data.",
      },
    ],
    related: [
      { label: "HIPAA compliance", href: "/hipaa" },
      { label: "Business Associate Agreement", href: "/baa" },
      { label: "About Vizora", href: "/about" },
    ],
  },

  {
    slug: "billing-software-vs-billing-service",
    title: "Medical Billing Software vs a Billing Service",
    question: "Do I need better billing software or a billing service?",
    metaTitle: "Billing Software vs Billing Service",
    metaDescription:
      "Software fixes workflow problems; a service fixes capacity problems. How to tell which one your practice actually has, using your own denial and AR data.",
    keywords: [
      "medical billing software vs service",
      "best medical billing software",
      "do I need a billing service",
      "practice management software billing",
    ],
    labelA: "Billing software",
    labelB: "Billing service",
    answer:
      "Software fixes workflow and visibility problems — it will scrub claims, surface denials and produce reports. It will not work a queue. A billing service fixes capacity problems: someone appealing denials, chasing payers and following up on aged AR. Buying software to solve a capacity problem is the most common and most expensive mistake here.",
    intro: [
      "There is a straightforward diagnostic. Look at your denials from last quarter. If most were identified but never worked, you have a capacity problem and software will not touch it. If most were never identified at all, you have a visibility problem and better software may genuinely solve it.",
      "Practices frequently buy a platform migration — six figures and nine months of disruption — to solve what was an unstaffed appeals queue. The new system surfaces the same denials more attractively, and they go unworked in a nicer interface.",
      "The reverse mistake also happens: hiring a service on top of a practice management system so poor that the service spends its hours fighting the tooling rather than the payers.",
    ],
    rows: [
      { dimension: "What it actually provides", a: "Tooling and visibility", b: "Labour and expertise" },
      { dimension: "Works your denial queue", a: "No", b: "Yes", edge: "b" },
      { dimension: "Files appeals", a: "No", b: "Yes", edge: "b" },
      { dimension: "Improves claim scrubbing", a: "Yes", b: "Yes, via its own tooling", edge: "even" },
      { dimension: "Cost shape", a: "Per-seat or per-provider subscription", b: "Percentage of collections or per claim" },
      { dimension: "Time to benefit", a: "Months — implementation and retraining", b: "2–4 weeks typically", edge: "b" },
      { dimension: "Scales with provider count", a: "Cost rises per seat", b: "Cost rises with collections", edge: "even" },
      { dimension: "Survives your biller resigning", a: "No", b: "Yes", edge: "b" },
      { dimension: "You keep direct control of process", a: "Yes", b: "Contractual", edge: "a" },
    ],
    chooseA: {
      headline: "Buy or change software when",
      points: [
        "You cannot produce first-pass denial rate by payer from your current system.",
        "Denials are being discovered late because nothing surfaces them.",
        "Your staff spend meaningful time on manual re-keying between systems.",
        "Clearinghouse rejections are not visible in a daily worklist.",
      ],
    },
    chooseB: {
      headline: "Buy a service when",
      points: [
        "Your denials are visible and still not worked.",
        "AR beyond 90 days is growing while everyone is busy.",
        "One person's leave stops collections.",
        "You need specialty coding depth you cannot justify hiring for.",
      ],
    },
    caveat:
      "If your reporting is genuinely broken, fix that before hiring anyone — including us. A service operating inside a system that cannot report denial reasons will improve your collections and still leave you unable to verify it. Reporting you can trust is what makes any of this measurable.",
    faqs: [
      {
        question: "Will a billing service work with my existing EHR?",
        answer:
          "Most work directly inside your existing practice management system rather than requiring a migration, which is usually the right arrangement — your clinical data and your patient relationships stay where they are, and you retain full visibility into every claim. Confirm before signing that you keep administrative access rather than a read-only view.",
      },
      {
        question: "Can software reduce my denial rate on its own?",
        answer:
          "It can reduce the preventable share. Good scrubbing catches code edits, missing modifiers and eligibility mismatches before submission, which addresses a real portion of front-end denials. It cannot appeal the denials that still occur, and appeals are where roughly 70% of denied revenue is actually recovered.",
      },
    ],
    related: [
      { label: "Practice analytics", href: "/services/practice-analytics" },
      { label: "Denial management", href: "/services/denial-management" },
      { label: "Revenue leak calculator", href: "/tools/revenue-leak-calculator" },
      { label: "athenahealth alternative", href: "/compare/athenahealth-vs-outsourced-billing-service" },
      { label: "Tebra alternative", href: "/compare/tebra-vs-outsourced-billing-service" },
    ],
  },

  {
    slug: "denial-management-vs-denial-prevention",
    title: "Denial Management vs Denial Prevention",
    question: "Is it better to prevent denials or get better at appealing them?",
    metaTitle: "Denial Management vs Denial Prevention",
    metaDescription:
      "Prevention is cheaper per claim; management recovers revenue already lost. Why a practice with a backlog needs both, and the order to do them in.",
    keywords: [
      "denial management vs prevention",
      "how to reduce claim denials",
      "denial prevention strategies",
      "denial management process",
    ],
    labelA: "Denial prevention",
    labelB: "Denial management",
    answer:
      "Prevention stops denials before submission through eligibility checks, authorization tracking and claim scrubbing — it is far cheaper per claim and addresses the 84% of denials Optum finds potentially avoidable. Management recovers denials that already happened through appeals, where roughly 70% are overturned. A practice with a backlog needs management first and prevention immediately after.",
    intro: [
      "These are usually presented as alternatives and are actually a sequence. The order is determined by cash, not philosophy.",
      "Prevention has the better unit economics and no upper bound on how much it helps, but it only affects claims not yet submitted. If you have 90 days of denied claims sitting unworked, prevention returns nothing on them, and every week that passes moves some of them past appeal deadlines permanently.",
      "So: work the backlog to recover what is still recoverable, and build prevention in parallel so the backlog does not rebuild. Running only the first is a treadmill. Running only the second concedes revenue that was collectible.",
    ],
    rows: [
      { dimension: "Acts on", a: "Claims not yet submitted", b: "Claims already denied" },
      { dimension: "Cost per claim addressed", a: "Minutes of front-end work", b: "$57.23 average to contest (Premier, 2023)", edge: "a" },
      { dimension: "Recovers existing lost revenue", a: "No", b: "Yes", edge: "b" },
      { dimension: "Ceiling on impact", a: "84% of denials are potentially avoidable (Optum)", b: "~70% of appealed denials are overturned", edge: "even" },
      { dimension: "Time to visible result", a: "30–60 days as new claims cycle", b: "Immediate as appeals resolve", edge: "b" },
      { dimension: "Main levers", a: "Eligibility, authorization, scrubbing, coding review", b: "CARC/RARC triage, appeal letters, payer escalation" },
      { dimension: "Fails when", a: "Front desk is undertrained or understaffed", b: "Appeal deadlines pass unworked", edge: "even" },
      { dimension: "Compounds over time", a: "Yes", b: "No — it is remedial by nature", edge: "a" },
    ],
    chooseA: {
      headline: "Prioritise prevention when",
      points: [
        "Denials cluster on eligibility, registration or authorization — the categories that should never happen.",
        "Your appeal backlog is already current.",
        "The same CARC appears repeatedly across the same payer.",
        "You are adding volume and want the denial count not to scale with it.",
      ],
    },
    chooseB: {
      headline: "Prioritise management when",
      points: [
        "You have unworked denials approaching appeal deadlines.",
        "AR beyond 90 days is a material share of total AR.",
        "Denials are being written off as contractual adjustments rather than appealed.",
        "Cash flow needs to improve inside a quarter.",
      ],
    },
    caveat:
      "One qualifier on the widely quoted prevention numbers: the 84% avoidability figure comes from hospital claim remits, not physician practices, and the mix differs. The direction is sound and the order of magnitude is right, but a solo practice should not expect hospital-scale denial economics to map exactly onto its own.",
    faqs: [
      {
        question: "What percentage of claim denials are preventable?",
        answer:
          "Optum's Revenue Cycle Denials Index puts 84% of denials as potentially avoidable, based on roughly 124 million hospital claim remits across more than 1,400 US hospitals. The widely circulated '90% of denials are preventable' figure traces to a 2014 blog post with no published methodology and is best avoided.",
      },
      {
        question: "How long do I have to appeal a denied claim?",
        answer:
          "Commercial payers commonly allow 90 to 180 days from the remittance date, varying by payer and contract. Medicare provides five appeal levels, the first being redetermination within 120 days of the initial determination. Secondary claims often carry shorter windows, which is where deadlines are most often missed.",
      },
    ],
    related: [
      { label: "Denial management", href: "/services/denial-management" },
      { label: "Denial code lookup", href: "/tools/denial-code-lookup" },
      { label: "RCM benchmarks", href: "/resources/rcm-benchmarks" },
    ],
  },
  {
    slug: "athenahealth-vs-outsourced-billing-service",
    title: "athenahealth RCM vs an Outsourced Billing Service",
    question: "Should billing come from the EHR vendor or from an independent billing company?",
    metaTitle: "athenahealth Alternative for Medical Billing",
    metaDescription:
      "athenahealth bundles EHR, practice management and revenue cycle into one platform. An independent billing service works on the system you already have. A comparison of what each model costs you in flexibility, switching risk and coding depth.",
    keywords: [
      "athenahealth alternative",
      "athenahealth vs billing service",
      "athenahealth rcm review",
      "athenahealth billing alternative",
      "outsourced billing vs ehr billing",
      "should I use my ehr vendor for billing",
    ],
    labelA: "Platform RCM (athenahealth)",
    labelB: "Independent billing service",
    answer:
      "athenahealth bundles EHR, practice management and revenue cycle management into one platform, which means tight data integration and one vendor relationship — but billing is coupled to their clinical software. An independent billing service works inside whatever system you already run, so billing can be changed without replacing the systems your clinicians use daily.",
    intro: [
      "This is not really a comparison of two billing companies. It is a comparison of two structures, and the structural difference matters more than any feature list.",
      "In the platform model, the same vendor supplies the software your clinicians document in and the service that collects your money. Data moves between them without an interface, and there is one contract and one number to call.",
      "In the independent model, billing is a service layered onto the practice management system you already run. You manage two relationships instead of one, and you gain the ability to change either without disturbing the other.",
      "Which is better depends almost entirely on one question: how confident are you that you want the same vendor for the next decade?",
    ],
    rows: [
      { dimension: "What you are buying", a: "EHR, practice management and RCM as one product", b: "Billing and revenue cycle only, on your existing system", edge: "even" },
      { dimension: "Clinical software", a: "Their EHR — using their RCM generally means using their platform", b: "Whatever you already run; unchanged", edge: "b" },
      { dimension: "Data integration", a: "Native — no interface between chart and claim", b: "Works within your PM system; no new interface, but two vendors", edge: "a" },
      { dimension: "Vendor relationships", a: "One", b: "Two — your PM/EHR and your biller", edge: "a" },
      { dimension: "Cost of changing billers", a: "High — usually means changing EHR too", b: "Moderate — notice period, clinical systems untouched", edge: "b" },
      { dimension: "Cost of changing EHR", a: "High — billing moves with it", b: "Independent of billing", edge: "b" },
      { dimension: "Pricing model", a: "Typically a percentage of collections; confirm current terms directly", b: "Percentage of net collections, 4–8% typical", edge: "even" },
      { dimension: "Payer rules and edits", a: "Large national rules engine, a genuine strength of scale", b: "Payer-specific and NCCI edits, plus regional payer knowledge", edge: "a" },
      { dimension: "Specialty coding depth", a: "Broad; depth varies by specialty", b: "Specialty-assigned certified coders", edge: "even" },
      { dimension: "Denial appeal capacity", a: "Scales with the platform", b: "Scales with the service; ask for appeal rate, not denial rate", edge: "even" },
      { dimension: "Best-fit practice size", a: "Larger groups and health systems", b: "Solo through mid-size groups", edge: "even" },
      { dimension: "Implementation burden", a: "Significant — a platform migration touches clinical workflow", b: "Lower — billing changes, clinical workflow does not", edge: "b" },
    ],
    chooseA: {
      headline: "Choose platform RCM when",
      points: [
        "You are replacing your EHR anyway, so the migration cost is already being paid.",
        "You want a single vendor accountable end to end, and you value that more than the ability to change one piece.",
        "You are a larger group with the administrative capacity to run a platform implementation properly.",
        "Native chart-to-claim data flow matters more to you than system independence.",
      ],
    },
    chooseB: {
      headline: "Choose an independent billing service when",
      points: [
        "Your clinicians are productive in your current EHR and you do not want to retrain them to fix a billing problem.",
        "You want billing performance to be contestable — if it underperforms, you can change it without a clinical migration.",
        "You bill a specialty where coding depth matters more than platform breadth.",
        "You want to solve collections now rather than after a multi-month platform implementation.",
      ],
    },
    caveat:
      "If you are already committed to a platform and happy with the clinical side, moving billing out is often not worth the friction — the integration you would give up is real. And a large platform's payer rules engine is a genuine advantage of scale that an independent service matches through specialisation rather than volume. The case for an independent biller is strongest when your clinical systems are fine and only collections are failing.",
    faqs: [
      {
        question: "Can I use an outsourced billing company with athenahealth?",
        answer:
          "Generally yes — an independent biller can work inside most practice management systems given appropriate user access, and the Business Associate Agreement governs how they handle protected health information. What you should confirm before signing is the specific access level your biller needs and whether your platform contract restricts third-party billing. Ask both vendors directly rather than assuming.",
      },
      {
        question: "Is it cheaper to use my EHR vendor for billing?",
        answer:
          "Not reliably, and the rate is the wrong comparison. What determines cost is net collection rate: a two-point difference on $2 million in charges is $40,000, which is larger than most differences in billing rate. Compare vendors on first-pass denial rate, days in AR and appeal rate — and insist on those numbers before you compare percentages.",
      },
      {
        question: "What happens to my billing if I switch EHR?",
        answer:
          "Under a platform model, billing usually moves with the EHR, because the service is built on that software. Under an independent model it does not — the biller works in whatever system you run, so a clinical migration and a billing relationship are separate decisions. That separation is the main structural argument for an independent service.",
      },
    ],
    related: [
      { label: "Billing software vs billing service", href: "/compare/billing-software-vs-billing-service" },
      { label: "Pricing", href: "/pricing" },
      { label: "Medical billing services", href: "/services/medical-billing" },
    ],
  },

  {
    slug: "tebra-vs-outsourced-billing-service",
    title: "Tebra vs an Outsourced Billing Service",
    question: "Is an all-in-one small-practice platform or a dedicated billing service better for collections?",
    metaTitle: "Tebra Alternative for Medical Billing",
    metaDescription:
      "Tebra combines practice management, EHR and growth tools for independent practices. A dedicated billing service does one thing. A comparison of breadth versus depth, and which one actually moves your collection rate.",
    keywords: [
      "tebra alternative",
      "kareo alternative",
      "tebra vs billing service",
      "tebra billing review",
      "best billing service for small practice",
      "kareo billing alternative",
    ],
    labelA: "All-in-one platform (Tebra)",
    labelB: "Dedicated billing service",
    answer:
      "Tebra targets independent practices with practice management, EHR and patient-growth tools in one product, with billing available alongside. A dedicated billing service does only revenue cycle. The trade-off is breadth against depth: one vendor covering many needs adequately, or one function done by specialists.",
    intro: [
      "Small practices are the hardest segment to serve well, because they need the same functions a large group needs with a fraction of the administrative staff to run them. That is the gap all-in-one platforms are built to close, and they close a real one.",
      "The question is what happens when a practice's problem is specifically collections. Breadth is valuable when many things are mediocre. It is less valuable when nine things are fine and one thing — the denial queue, the aged AR, the underpayments nobody is checking — is quietly costing more than everything else combined.",
      "Optum's index of 124 million claim remits found 84% of denials are potentially avoidable and 44% originate at the front end. Fixing that is specialist work, and it is the work most likely to be deprioritised when the same team is also responsible for scheduling, patient messaging and web presence.",
    ],
    rows: [
      { dimension: "Scope", a: "Practice management, EHR, patient growth tools, billing", b: "Revenue cycle only", edge: "even" },
      { dimension: "Vendor count", a: "One", b: "Two — your PM system and your biller", edge: "a" },
      { dimension: "Best when", a: "Several functions need improving at once", b: "Collections specifically are underperforming", edge: "even" },
      { dimension: "Coding expertise", a: "Available; depth varies by specialty", b: "Specialty-assigned certified coders", edge: "b" },
      { dimension: "Denial and appeal work", a: "Part of a broader service offering", b: "The core of the engagement", edge: "b" },
      { dimension: "Aged AR recovery", a: "Confirm scope explicitly before signing", b: "Typically in scope; confirm whether backlog is separate", edge: "even" },
      { dimension: "Clinical software change required", a: "Yes, to use the platform fully", b: "No", edge: "b" },
      { dimension: "Patient-facing tools", a: "Included — scheduling, reminders, reputation", b: "Not included", edge: "a" },
      { dimension: "Pricing model", a: "Subscription plus billing fees; confirm current terms directly", b: "Percentage of net collections, 4–8% typical", edge: "even" },
      { dimension: "Practice size fit", a: "Solo and small independent practices", b: "Solo through mid-size groups", edge: "even" },
    ],
    chooseA: {
      headline: "Choose the all-in-one platform when",
      points: [
        "You need scheduling, charting, patient communication and billing, and you do not have staff to manage several vendors.",
        "Your practice is starting up and wants one decision rather than four.",
        "Patient acquisition and online presence are as pressing as collections.",
        "Your billing is roughly fine and consolidating vendors is the actual goal.",
      ],
    },
    chooseB: {
      headline: "Choose a dedicated billing service when",
      points: [
        "Your denial rate is above 10%, or AR past 90 days is growing.",
        "Nobody in the practice can tell you last month's first-pass denial rate from a report.",
        "Your specialty has genuinely difficult coding — anesthesia time units, surgical global periods, behavioural health authorisation limits.",
        "Appeals are not being filed because nobody has the hours, not because the claims lack merit.",
        "You are content with your clinical software and only want the money side fixed.",
      ],
    },
    caveat:
      "If your practice needs a practice management system, an EHR and patient communication tools as well as billing, an all-in-one platform will serve you better than we will — we do not provide any of those, and stitching four specialist vendors together is a real administrative burden for a small practice. Our case is strongest when your systems are already in place and collections are the specific thing failing.",
    faqs: [
      {
        question: "What is a good Tebra alternative for billing?",
        answer:
          "It depends on which part you are replacing. If you need the practice management and EHR functions, you need another platform. If your systems are fine and collections are the problem, a dedicated billing service addresses that without changing clinical software. Be clear which problem you are solving before you shortlist vendors — they are different purchases.",
      },
      {
        question: "Do I need to change practice management systems to outsource billing?",
        answer:
          "No. An independent billing service works inside the system you already run, given appropriate user access and an executed Business Associate Agreement. That is the main practical difference from platform-provided billing, where the service and the software are the same purchase.",
      },
      {
        question: "Is a specialist biller better than platform billing for a small practice?",
        answer:
          "For collections specifically, usually yes — the work that recovers revenue is denial prevention, appeals and AR follow-up, and that is specialist labour. For overall practice operations, not necessarily. A two-provider practice with no practice management system has a bigger problem than its denial rate, and should solve that first.",
      },
    ],
    related: [
      { label: "In-house vs outsourced billing", href: "/compare/in-house-vs-outsourced-medical-billing" },
      { label: "Denial management", href: "/services/denial-management" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    slug: "advancedmd-vs-outsourced-billing-service",
    title: "AdvancedMD RCM vs an Outsourced Billing Service",
    question: "Should revenue cycle come bundled with the practice management suite or be bought separately?",
    metaTitle: "AdvancedMD Alternative for Medical Billing",
    metaDescription:
      "AdvancedMD offers practice management, EHR and revenue cycle as a suite. An independent billing service is bought and measured separately. A comparison of bundled convenience against separable accountability.",
    keywords: [
      "advancedmd alternative",
      "advancedmd vs billing service",
      "advancedmd rcm review",
      "advancedmd billing alternative",
      "bundled rcm vs outsourced billing",
    ],
    labelA: "Bundled suite RCM (AdvancedMD)",
    labelB: "Independent billing service",
    answer:
      "AdvancedMD sells practice management, EHR and revenue cycle as parts of one suite, so billing is procured alongside the software. An independent billing service is bought separately and measured separately — which means it can be replaced on its performance alone, without touching the systems your clinicians use.",
    intro: [
      "Bundling is a real convenience and it is worth naming honestly: one contract, one implementation, one support number, and no argument between vendors about whose problem a given failure is.",
      "The cost of bundling is separability. When billing and software are the same purchase, underperforming billing is expensive to fix, because fixing it means unpicking the software too. That cost is invisible on day one and becomes the whole story in year three.",
      "So the question is not which vendor is better. It is whether you want billing performance to be a decision you can revisit cheaply.",
    ],
    rows: [
      { dimension: "Procurement", a: "One contract covering software and service", b: "Separate from your software contract", edge: "a" },
      { dimension: "Accountability when collections underperform", a: "Same vendor supplies the tool and the service", b: "Isolated — the service is measurable on its own", edge: "b" },
      { dimension: "Cost of replacing the biller", a: "High — entangled with the software contract", b: "Notice period; clinical systems untouched", edge: "b" },
      { dimension: "Implementation", a: "One project, but a larger one", b: "Billing only — clinical workflow unchanged", edge: "b" },
      { dimension: "Support model", a: "Single vendor, single escalation path", b: "Two vendors, two escalation paths", edge: "a" },
      { dimension: "Pricing", a: "Subscription plus RCM fees; confirm current terms directly", b: "Percentage of net collections, 4–8% typical", edge: "even" },
      { dimension: "Specialty coding depth", a: "Available; depth varies by specialty", b: "Specialty-assigned certified coders", edge: "b" },
      { dimension: "Aged AR recovery", a: "Confirm whether backlog is in scope", b: "Confirm whether backlog is scoped separately", edge: "even" },
      { dimension: "Reporting", a: "Native to the suite", b: "Provided by the service; verify depth before signing", edge: "a" },
      { dimension: "Best-fit practice", a: "Practices buying software and billing at the same time", b: "Practices whose software is settled and collections are not", edge: "even" },
    ],
    chooseA: {
      headline: "Choose the bundled suite when",
      points: [
        "You are replacing practice management software anyway and want one project rather than two.",
        "Administrative capacity is your constraint and reducing vendor count genuinely helps.",
        "You want one escalation path when something breaks, and will trade separability for it.",
        "Native reporting across scheduling, charting and billing matters to how you run the practice.",
      ],
    },
    chooseB: {
      headline: "Choose an independent billing service when",
      points: [
        "Your practice management system is working and you do not want to replace it to fix collections.",
        "You want billing measured on its own numbers — first-pass denial rate, days in AR, appeal rate — and replaceable on them.",
        "Your specialty coding is genuinely difficult and depth matters more than breadth.",
        "You have an aged AR backlog that needs dedicated attention now, not after an implementation.",
      ],
    },
    caveat:
      "If you are buying practice management software regardless, bundling RCM with it is a reasonable decision and we are not a substitute for the software half — we do not sell one. Our argument only applies once your systems are settled. A practice mid-way through choosing an EHR should finish that decision first.",
    faqs: [
      {
        question: "Can an outsourced biller work inside AdvancedMD?",
        answer:
          "Generally yes — independent billers work inside most practice management systems given appropriate user access and an executed Business Associate Agreement. Confirm the specific access level required and whether your software contract places any restriction on third-party billing. Ask both vendors directly rather than assuming either answer.",
      },
      {
        question: "Is bundled RCM cheaper than a separate billing service?",
        answer:
          "Rate is the wrong comparison. What determines cost is net collection rate, and a two-point difference on $2 million in charges is $40,000 — larger than most differences in billing rate. Compare on first-pass denial rate, days in AR and appeal rate, and require those figures before comparing percentages.",
      },
    ],
    related: [
      { label: "Billing software vs billing service", href: "/compare/billing-software-vs-billing-service" },
      { label: "In-house vs outsourced billing", href: "/compare/in-house-vs-outsourced-medical-billing" },
      { label: "Pricing", href: "/pricing" },
    ],
  },

  {
    slug: "carecloud-vs-outsourced-billing-service",
    title: "CareCloud RCM vs an Outsourced Billing Service",
    question: "Is platform-attached revenue cycle or a standalone billing service the better fit?",
    metaTitle: "CareCloud Alternative for Medical Billing",
    metaDescription:
      "CareCloud provides practice management, EHR and revenue cycle services together. A standalone billing service does revenue cycle only. Which model fits depends on whether your systems or your collections are the problem.",
    keywords: [
      "carecloud alternative",
      "carecloud vs billing service",
      "carecloud rcm review",
      "standalone medical billing service",
      "platform rcm vs billing company",
    ],
    labelA: "Platform-attached RCM (CareCloud)",
    labelB: "Standalone billing service",
    answer:
      "CareCloud offers practice management, EHR and revenue cycle services as an integrated set. A standalone billing service provides revenue cycle only, working inside your existing systems. The right choice follows from a single diagnostic: whether your problem is that your systems are inadequate, or that your collections are.",
    intro: [
      "Practices usually arrive at this comparison having noticed a number they do not like — a denial rate, an AR figure, a collection ratio — and then start evaluating vendors of quite different kinds against each other.",
      "That is worth separating before shortlisting. Replacing a platform solves a systems problem. Replacing a biller solves a collections problem. They cost different amounts, take different lengths of time, and disrupt different people.",
      "If your clinicians are productive and your reporting is adequate, a platform migration is a large amount of disruption aimed at a target it does not sit on.",
    ],
    rows: [
      { dimension: "Scope", a: "Practice management, EHR and revenue cycle", b: "Revenue cycle only", edge: "even" },
      { dimension: "Solves", a: "A systems problem", b: "A collections problem", edge: "even" },
      { dimension: "Disruption to clinicians", a: "Significant — a platform migration changes daily workflow", b: "Minimal — clinical workflow is untouched", edge: "b" },
      { dimension: "Time to effect", a: "Months, following implementation", b: "Weeks — typically 2–4 from agreement to first claim", edge: "b" },
      { dimension: "Vendor count", a: "One", b: "Two", edge: "a" },
      { dimension: "Pricing", a: "Subscription plus RCM fees; confirm current terms directly", b: "Percentage of net collections, 4–8% typical", edge: "even" },
      { dimension: "Specialty coding depth", a: "Available; varies by specialty", b: "Specialty-assigned certified coders", edge: "b" },
      { dimension: "If it underperforms", a: "Changing it means changing systems", b: "Changing it means a notice period", edge: "b" },
      { dimension: "Data ownership on exit", a: "Confirm export terms before signing", b: "Confirm export terms before signing", edge: "even" },
    ],
    chooseA: {
      headline: "Choose platform-attached RCM when",
      points: [
        "Your practice management system or EHR is genuinely inadequate and needs replacing regardless.",
        "You want one vendor accountable across clinical and financial operations.",
        "You are consolidating several tools and reducing vendor count is itself the goal.",
      ],
    },
    chooseB: {
      headline: "Choose a standalone billing service when",
      points: [
        "Your systems are adequate and collections are the specific thing failing.",
        "You need improvement in weeks rather than after an implementation cycle.",
        "You want to keep the ability to change billers without changing clinical software.",
        "You have aged AR that needs working now, before timely filing closes on it.",
      ],
    },
    caveat:
      "If your practice management system is genuinely holding you back — no usable reporting, no electronic eligibility, no claim scrubbing — then a billing service layered on top inherits those constraints, and a platform change is the more honest fix. We can work in most systems, but we cannot make a system produce data it does not capture.",
    faqs: [
      {
        question: "How do I tell whether my problem is systems or collections?",
        answer:
          "Ask whether you can produce, from a report, your first-pass denial rate by payer and your AR aging by bucket for last month. If the data exists and the numbers are bad, it is a collections problem and a billing service addresses it. If the data does not exist at all, it is a systems problem and no billing service fully compensates for that.",
      },
      {
        question: "How quickly can a billing service improve collections?",
        answer:
          "Onboarding typically runs two to four weeks from signed agreement to first claim submitted. New claims improve first; aged AR recovery runs on the payers' timelines and the remaining filing windows. Agree explicitly, in writing, who works the existing backlog during changeover — that inventory ages quietly during transitions and is where recoverable revenue is most often lost.",
      },
    ],
    related: [
      { label: "In-house vs outsourced billing", href: "/compare/in-house-vs-outsourced-medical-billing" },
      { label: "AR management", href: "/services/ar-management" },
      { label: "Revenue leak calculator", href: "/tools/revenue-leak-calculator" },
    ],
  },
];

export const comparisonSlugs = comparisons.map((c) => c.slug);
export const getComparison = (slug: string) => comparisons.find((c) => c.slug === slug);
