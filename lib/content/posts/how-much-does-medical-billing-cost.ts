import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "how-much-does-medical-billing-cost",
  title: "How much does medical billing cost?",
  excerpt:
    "Outsourced billing runs 4–8% of collections. In-house looks cheaper until you cost the whole function rather than one salary. Here is the comparison with the parts most calculations leave out.",
  category: "Practice Economics",
  published: "2026-08-19",
  updated: "2026-08-19",
  readingMinutes: 4,
  answer:
    "Outsourced medical billing typically costs 4–8% of net collections, with larger practices and high-value specialties at the lower end. In-house billing costs roughly $73,000 per biller annually once benefits are included, plus software, clearinghouse fees and management time — which is why per-biller salary alone understates the true cost of the function.",
  sections: [
    {
      heading: "The three pricing models",
      body: [
        "Almost every billing arrangement falls into one of three structures, and they distribute risk very differently.",
      ],
      table: {
        headers: ["Model", "Typical range", "Who carries the risk"],
        rows: [
          ["Percentage of net collections", "4–8% of collections", "The billing company — it earns only on what it collects"],
          ["Flat fee per claim", "$4–$8 per claim", "The practice — the fee is owed whether the claim pays or not"],
          ["Fixed monthly retainer", "Varies by scope", "The practice — cost is fixed regardless of volume or performance"],
        ],
      },
    },
    {
      heading: "Why percentage of collections is the common default",
      body: [
        "Under a percentage model the vendor is paid on money that actually arrives. A denied claim that is never overturned earns the vendor nothing, which aligns their incentive with the practice's on exactly the work that matters most — appeals, AR follow-up and underpayment recovery.",
        "Per-claim pricing inverts that. The fee is earned on submission, so a claim submitted and denied has already been billed for. The vendor's incentive is throughput; the practice's is collection. Those are not the same thing.",
        "The honest caveat on percentage pricing is that it scales with your revenue rather than with the work. A practice whose collections grow substantially without a matching increase in claim volume will pay more for the same effort, which is usually a good problem and occasionally worth renegotiating.",
      ],
    },
    {
      heading: "What in-house billing actually costs",
      body: [
        "The comparison most practices run is a billing salary against a percentage fee. That understates in-house cost, because a salary is the smallest line in the function.",
        "US Bureau of Labor Statistics data puts the fully loaded annual cost of one medical records specialist at roughly $73,000 — a median wage of $51,140 plus benefits averaging 29.9% of total compensation. That is one person, before anything else the function requires.",
      ],
      list: [
        "Practice management and clearinghouse software, billed per provider or per claim.",
        "Coding credentials and continuing education — CPT and ICD-10 change annually.",
        "Management time spent supervising billing, which is usually a practice manager's or physician's time.",
        "Coverage risk: when the biller is on leave or resigns, collections stop. In a one-person billing department this is a single point of failure on the practice's entire cash flow.",
        "Denial and AR work that gets deferred when the queue is full, which does not appear as a cost line but shows up as aged receivables.",
      ],
    },
    {
      heading: "The administrative load behind the number",
      body: [
        "CAQH's index, covering more than 600 provider organisations and health plans, measures roughly 70 minutes of administrative work per patient visit across eligibility, claims, status inquiry and prior authorization.",
        "The distribution inside that figure is instructive. A single claim status inquiry made by phone consumes 25 minutes of staff time — the most time-consuming transaction CAQH measures — while electronic eligibility verification represents an $11.7 billion annual savings opportunity industry-wide, the largest of any administrative transaction.",
        "This is why billing cost is better understood as a function of process quality than of headcount. A practice making status inquiries by phone is buying the same outcome as one checking electronically, at many times the labour cost.",
      ],
    },
    {
      heading: "How to compare two quotes honestly",
      body: [
        "A percentage is not comparable to another percentage until you know what each one includes. The questions that actually separate offers:",
      ],
      list: [
        "Is the percentage taken on net collections or on gross charges? Gross-charge pricing is not comparable and is almost always more expensive.",
        "Are denial appeals and claim rework billed separately, or included?",
        "Is there a setup, onboarding or integration fee?",
        "Who works aged AR, and is a historical backlog inside the same rate or scoped separately?",
        "What is the termination clause, and who owns the data on exit?",
        "Is patient billing and patient support included, or a separate line?",
      ],
    },
    {
      heading: "The cost that does not appear on either quote",
      body: [
        "Premier's analysis puts the average cost of contesting a single denied claim at $57.23, up 31% in a single year. Optum's index of 124 million claim remits found 84% of denials are potentially avoidable.",
        "Those two numbers define the real spread between a cheap billing arrangement and a good one. A vendor whose denial rate is two points higher than another's is not cheaper at the same percentage — the difference simply moves from the invoice to the AR report, where it is harder to see.",
        "Which is the argument for evaluating billing cost on collected revenue rather than on rate. A practice paying 7% and collecting 97% of what it bills is materially better off than one paying 4% and collecting 88%.",
      ],
    },
  ],
  relatedServices: ["medical-billing", "revenue-cycle-management", "denial-management"],
};

export default post;
