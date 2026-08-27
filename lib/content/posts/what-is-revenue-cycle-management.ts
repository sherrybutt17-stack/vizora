import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "what-is-revenue-cycle-management",
  title: "What is revenue cycle management?",
  excerpt:
    "A plain explanation of RCM, how it differs from medical billing, and which metrics actually indicate whether yours is working.",
  category: "Education",
  published: "2026-05-03",
  updated: "2026-08-20",
  readingMinutes: 8,
  answer:
    "Revenue cycle management is the complete financial process for a healthcare encounter, running from patient scheduling and insurance verification through coding, claim submission, payment posting, denial management and collection of any remaining balance. It covers every step where revenue can be earned, delayed or lost — which is why it is broader than medical billing.",
  sections: [
    {
      heading: "RCM is not the same as medical billing",
      body: [
        "The terms get used interchangeably, but they describe different scopes. Medical billing is one stage: preparing and submitting claims, then following up on them. Revenue cycle management is the entire span, beginning before the patient arrives and ending when the balance reaches zero.",
        "The distinction has practical consequences. If 44% of denials originate in front-end processes — registration, eligibility, authorization — then a service scoped to billing alone cannot address where most of your revenue is actually leaking. It can only work the denials those failures produce.",
      ],
    },
    {
      heading: "The stages of the revenue cycle",
      body: ["A complete revenue cycle has five stages, each with its own failure modes:"],
      list: [
        "Patient access — scheduling, registration, insurance verification and prior authorization. Errors here surface as denials weeks later.",
        "Charge capture — documenting and recording every service delivered. Services not captured are never billed at all.",
        "Coding — translating documentation into ICD-10, CPT and HCPCS codes. Errors cause both denial and silent underpayment.",
        "Claim submission and follow-up — scrubbing, transmitting and tracking claims through adjudication.",
        "Payment, denial and analysis — posting payments, appealing denials, collecting patient balances, and routing findings back upstream.",
      ],
    },
    {
      heading: "The five metrics that matter",
      body: [
        "Most revenue cycle reporting produces more numbers than insight. Five carry most of the signal:",
      ],
      table: {
        headers: ["Metric", "What it tells you", "Benchmark"],
        rows: [
          ["Net collection ratio", "What you collect against what was collectible", "Below 95% signals leakage"],
          ["First-pass clean claim rate", "Share accepted without rework", "Physician practices average 92%"],
          ["Days in AR", "Speed of collection", "MGMA median 47; better performers 36"],
          ["Denial rate by reason and payer", "Where and why revenue fails", "MGMA reports 8% for practices"],
          ["Cost to collect", "What the revenue cycle costs to run", "Compare against outsourced pricing"],
        ],
      },
    },
    {
      heading: "Why the segmentation matters more than the headline number",
      body: [
        "A 9% denial rate tells you almost nothing actionable. The same 9% could be evenly distributed noise or could be one payer denying 40% of your claims for a single fixable reason.",
        "Segment by reason code and by payer, every month. Recurring reason codes point to a process failure with a specific owner. A single payer denying disproportionately points to a contract or enrollment issue. Both are fixable; the aggregate number is not.",
      ],
    },
    {
      heading: "When outsourcing makes sense",
      body: [
        "Outsourcing is worth considering when denial rates stay above 10% despite effort, when AR days exceed 45, when billing depends on one person whose absence stops collections, or when patient volume is growing faster than billing capacity.",
        "The honest comparison includes everything: one in-house biller costs roughly $73,000 a year fully loaded, based on a $51,140 median wage plus benefits averaging 29.9% of total compensation — before software, clearinghouse fees, training or coverage during leave.",
      ],
    },
    {
      heading: "Who owns each stage in a small practice",
      body: [
        "In a large group each revenue cycle stage has a department. In a practice of two to ten providers the same five stages exist but the owners are people who also do other jobs — which is where the gaps appear.",
        "The failure is rarely that a stage is done badly. It is that a stage has no owner at all, so it happens when someone has time.",
      ],
      table: {
        headers: ["Stage", "Usually owned by", "The gap that opens"],
        rows: [
          ["Patient access", "Front desk", "Re-verification before every visit gets skipped when the schedule is full"],
          ["Charge capture", "Provider", "Services delivered late in the day are documented but never charged"],
          ["Coding", "Provider or biller", "Undercoding, because it produces no error and no alert"],
          ["Submission and follow-up", "Biller", "Clearinghouse rejections, which never reach the payer and appear nowhere"],
          ["Denial and analysis", "Nobody, in practice", "Appeals are not filed and root causes are never aggregated"],
        ],
      },
    },
    {
      heading: "How long each stage should take",
      body: [
        "A revenue cycle is diagnosed by where time accumulates. Compare your own intervals against the shape below — the specific numbers matter less than which interval is the outlier.",
      ],
      list: [
        "Date of service to charge entry: 1–2 business days. Longer means charge capture is a queue, not a process.",
        "Charge entry to claim submission: same or next day. Anything beyond that is usually a scrubbing backlog.",
        "Submission to payer acknowledgement: 1–3 days. If you are not reading acknowledgements daily, rejected claims are aging invisibly.",
        "Submission to payment: 14–30 days for clean electronic claims.",
        "Denial to appeal filed: within days, not weeks. Appeal windows for authorization denials are frequently shorter than for claim denials.",
      ],
    },
    {
      heading: "The handoffs are where revenue is lost",
      body: [
        "Each stage of the revenue cycle usually works acceptably in isolation. Revenue leaks at the joints between them, because that is where responsibility transfers and where nobody is measured on the transfer itself.",
      ],
      table: {
        headers: ["Handoff", "What is passed", "What goes wrong"],
        rows: [
          ["Scheduling \u2192 registration", "Demographics and coverage", "Coverage assumed unchanged from the last visit"],
          ["Registration \u2192 clinical", "Authorization status", "Service delivered before authorization is confirmed"],
          ["Clinical \u2192 coding", "Documentation", "Notes support a lower level than the work performed"],
          ["Coding \u2192 submission", "Coded charges", "Charges never posted \u2014 the encounter is simply never billed"],
          ["Submission \u2192 posting", "Acknowledgements and remits", "Rejections not read; claim looks submitted but was never received"],
          ["Posting \u2192 follow-up", "Denials and underpayments", "Posted as adjustments and treated as final"],
        ],
      },
    },
    {
      heading: "Charge capture is the leak nobody sees",
      body: [
        "Every other revenue cycle failure produces evidence. A denial appears on a report; an aged claim appears in AR; an underpayment appears as a variance. An encounter that is never charged produces nothing at all \u2014 no claim, no denial, no balance, no trace.",
        "This is why practices can run a clean revenue cycle by every measured metric and still lose material revenue. The metrics are all calculated on claims that exist. Missing charges are absent from the denominator as well as the numerator.",
        "The only reliable control is reconciliation against the schedule rather than against the billing system: every completed appointment should resolve to a charge, a documented no-show, or a deliberate non-billable encounter. Running that comparison weekly catches the missing charge while the documentation is still fresh and the timely filing window is still wide open.",
      ],
    },
    {
      heading: "The administrative load is the underlying constraint",
      body: [
        "Revenue cycle work is often discussed as though it were mainly a question of diligence. It is more usefully understood as a capacity problem, because the volume is fixed by the payer environment rather than by the practice.",
        "CAQH measures roughly 70 minutes of administrative work per patient visit across the US healthcare system, and puts the savings available from electronic eligibility verification alone at $11.7 billion annually \u2014 the largest single administrative savings opportunity it tracks. A single claim status inquiry made by phone costs 25 minutes of staff time.",
        "Those numbers explain why revenue cycle problems resist being solved by working harder. A practice cannot out-diligence 70 minutes per visit; it can only remove transactions from the manual path. Every process converted from phone or portal to electronic exchange returns capacity that can then be spent on the work that genuinely requires judgement \u2014 appeals, underpayment variances, and the denial clusters worth removing at the cause.",
      ],
    },
    {
      heading: "The three reports worth reading every month",
      body: [
        "Most practice management systems will generate dozens of reports. Three of them carry nearly all the decision-relevant signal, and reading them monthly is enough.",
      ],
      list: [
        "Denials by reason code and payer — recurring codes identify a process failure with a specific owner upstream.",
        "AR aging by bucket and payer — the 90+ bucket is where timely-filing risk lives, and one payer over-represented there is a contract or enrollment problem.",
        "Net collection ratio by payer — this is the report that exposes underpayments, which produce no denial and therefore no alert.",
      ],
    },
  ],
  faq: [
    {
      question: "What is revenue cycle management?",
      answer:
        "Revenue cycle management is the end-to-end process of capturing and collecting revenue for care delivered \u2014 from scheduling and eligibility verification, through coding, claim submission and payment posting, to denial follow-up and patient collections. It begins before the patient arrives and ends when the balance reaches zero.",
    },
    {
      question: "How is revenue cycle management different from medical billing?",
      answer:
        "Billing is one stage within the revenue cycle: preparing and submitting claims and posting what comes back. Revenue cycle management covers the whole span, including the front-end steps that determine whether a claim can be paid at all. Since 44% of denials originate in front-end processes, a practice can bill flawlessly and still lose revenue decided before billing began.",
    },
    {
      question: "Which revenue cycle metrics matter most?",
      answer:
        "Days in AR, percentage of AR over 90 days, first-pass clean claim rate, denial rate, and net collection rate. They should be read together rather than individually \u2014 days in AR falls when aged balances are written off, so it can improve while collections worsen. The percentage over 90 days and the net collection rate are the harder figures to flatter.",
    },
    {
      question: "Where do practices lose the most revenue in the cycle?",
      answer:
        "At the handoffs between stages, and most invisibly at charge capture. An encounter that is never charged produces no claim, no denial and no balance, so it appears in no report at all \u2014 which means a practice can look healthy on every metric while losing real revenue. Reconciling completed appointments against posted charges weekly is the only reliable control.",
    },
    {
      question: "When does outsourcing revenue cycle management make sense?",
      answer:
        "Generally when the practice is at a capacity threshold rather than a cost one \u2014 volume has outgrown one biller but does not yet justify two, specialty knowledge for appeals is missing, or the function has no cross-trained backup and stalls whenever one person is unavailable. Outsourced pricing scales continuously with collections, whereas in-house capacity moves in whole headcount steps.",
    },
  ],
  sources: ["hfma-map-keys", "mgma-data", "caqh-index"],
  relatedServices: ["revenue-cycle-management", "practice-analytics", "medical-billing"],
};

export default post;
