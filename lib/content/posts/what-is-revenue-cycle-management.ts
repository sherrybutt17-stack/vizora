import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "what-is-revenue-cycle-management",
  title: "What is revenue cycle management?",
  excerpt:
    "A plain explanation of RCM, how it differs from medical billing, and which metrics actually indicate whether yours is working.",
  category: "Education",
  published: "2026-05-03",
  updated: "2026-08-19",
  readingMinutes: 4,
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
  relatedServices: ["revenue-cycle-management", "practice-analytics", "medical-billing"],
};

export default post;
