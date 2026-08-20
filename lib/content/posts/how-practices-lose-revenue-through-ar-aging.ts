import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "how-practices-lose-revenue-through-ar-aging",
  title: "How practices lose revenue through AR aging",
  excerpt:
    "Accounts receivable decay with age. Past the filing deadline they collect at zero. Here is how to work AR by recoverability.",
  category: "AR Management",
  published: "2026-04-28",
  updated: "2026-08-19",
  readingMinutes: 3,
  answer:
    "Accounts receivable lose value as they age. Claims past 90 days collect at a fraction of fresh claims, and once past the payer's timely filing deadline they collect at nothing. MGMA puts the median practice at 47 days in AR, with better-performing practices at 36 — a gap that represents real, recoverable cash.",
  sections: [
    {
      heading: "AR value decays, and the decay accelerates",
      body: [
        "The cost of working a denial illustrates the principle. MGMA measured rework at roughly $25 when handled within three days. Premier Inc. put the average cost of contesting a denial at $57.23 across all ages. The same work costs more the longer it waits, and the probability of recovery falls at the same time.",
        "Past the filing deadline — typically 90 to 365 days depending on payer — recovery probability reaches zero permanently. A CO-29 timely filing denial has no remedy unless you can document timely original submission.",
      ],
    },
    {
      heading: "Why AR ages in the first place",
      body: [
        "It is rarely a decision. AR ages because follow-up is the first task dropped when billing staff are stretched, and because nothing forces the issue until a report is run.",
      ],
      list: [
        "Follow-up is fitted around other duties rather than owned by anyone",
        "No prioritization method, so staff work whatever surfaces rather than what is recoverable",
        "Denials requiring appeal are deferred in favor of easier claims",
        "Filing deadlines are not tracked, so claims expire without anyone noticing",
        "No escalation path when routine payer follow-up produces nothing",
      ],
    },
    {
      heading: "Work AR by recoverability, not by balance",
      body: [
        "The instinct is to chase the largest balances first. The better method scores claims on value, age, payer responsiveness and proximity to the filing deadline.",
        "A $400 claim eight days from its deadline outranks a $4,000 claim at 30 days, because one is about to become worthless and the other is not. Every claim still gets systematic follow-up — prioritization determines sequence, not coverage.",
      ],
    },
    {
      heading: "The aging buckets to watch",
      body: [
        "Total days in AR is a summary statistic that hides the problem. The distribution is what matters — specifically the share sitting beyond 90 days, and whether that share is growing.",
        "A practice at 40 days in AR with 5% over 90 days is healthy. A practice at 40 days with 20% over 90 days has a fast-paying commercial book masking an unworked aged inventory, and the aggregate number will not reveal it.",
      ],
    },
    {
      heading: "What the aging buckets actually mean",
      body: [
        "AR aging is usually reported in 30-day buckets, and each one carries a different meaning and a different urgency. The mistake is treating the report as one number.",
      ],
      table: {
        headers: ["Bucket", "What it represents", "What it needs"],
        rows: [
          ["0–30 days", "Normal adjudication for clean electronic claims", "Nothing — this is the cycle working"],
          ["31–60 days", "Slow payers, or claims that hit an edit", "Check acknowledgements; confirm the claim reached the payer"],
          ["61–90 days", "Something has gone wrong and nobody has looked", "Active follow-up; this is where recovery is still cheap"],
          ["90+ days", "Denials unworked, rejections never resubmitted, underpayments", "Triage against timely filing first, then value"],
        ],
      },
    },
    {
      heading: "Work the 90+ bucket by deadline, not by dollar value",
      body: [
        "The instinct with an aged AR backlog is to start with the largest balances. That is the wrong sort order, because value is recoverable later and time is not.",
        "Sort the 90+ bucket by days remaining until each payer's timely filing deadline. A $180 claim expiring in nine days is more urgent than a $2,400 claim with four months left, because one of them stops being collectible and the other does not.",
        "Timely filing limits typically run 90 to 365 days from date of service and vary by payer and plan. Once that window closes the claim is not denied on merit — it is simply uncollectible, and no appeal recovers it.",
      ],
    },
    {
      heading: "The revenue that never appears in AR at all",
      body: [
        "An aging report is built from claims the payer knows about. Two categories of lost revenue are invisible to it entirely.",
        "The first is clearinghouse rejections. Those claims exist in your system as submitted and in the payer's system not at all, so they appear in no payer-derived aging report while the filing clock runs.",
        "The second is underpayment. A claim paid at less than the contracted rate closes as paid, drops out of AR, and generates no denial and no alert. Detecting it requires comparing remittance against your fee schedule — which is why net collection ratio by payer catches revenue that the aging report structurally cannot.",
      ],
    },
  ],
  relatedServices: ["ar-management", "denial-management", "practice-analytics"],
};

export default post;
