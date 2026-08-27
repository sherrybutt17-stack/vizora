import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "how-practices-lose-revenue-through-ar-aging",
  title: "How practices lose revenue through AR aging",
  excerpt:
    "Accounts receivable decay with age. Past the filing deadline they collect at zero. Here is how to work AR by recoverability.",
  category: "AR Management",
  published: "2026-04-28",
  updated: "2026-08-20",
  readingMinutes: 7,
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
      heading: "Timely filing is the hard deadline behind every aging bucket",
      body: [
        "Aging buckets matter because one of them ends in a wall. Past the payer\u2019s timely filing limit a claim is not merely harder to collect \u2014 it is uncollectable, and no appeal recovers it. The limits vary enough that a single practice is working several different clocks at once.",
      ],
      table: {
        headers: ["Payer type", "Typical filing limit", "What resets or extends it"],
        rows: [
          ["Medicare", "12 months from date of service", "Very limited exceptions; administrative error must be documented"],
          ["Medicaid (state-dependent)", "90 days to 12 months", "Varies materially by state; retroactive eligibility can extend"],
          ["Commercial", "90 to 180 days", "Contract language governs, not the payer\u2019s published policy"],
          ["Secondary / COB", "Often 90 days from primary EOB", "Clock starts at primary adjudication, not date of service"],
          ["Workers\u2019 compensation", "State-specific, frequently short", "Often tied to injury reporting deadlines"],
        ],
      },
    },
    {
      heading: "Days in AR can be improved without collecting anything",
      body: [
        "Days in AR is the standard measure and it is genuinely useful, but it is also the easiest revenue cycle metric to move without doing any real work. Writing off aged balances lowers it immediately. So does a month of unusually high charges, because the denominator moves faster than the numerator.",
        "MGMA puts the median practice at 47 days, with better performers near 36. A practice reporting 30 days has either an excellent revenue cycle or an aggressive write-off policy, and the number alone does not distinguish them.",
        "Read it alongside two figures that are harder to flatter: the percentage of AR over 90 days, and the net collection rate. A falling days-in-AR with a rising over-90 percentage means the fresh claims are being worked and the difficult ones are being abandoned \u2014 which is the exact pattern that produces a large, quiet write-off at year end.",
      ],
    },
    {
      heading: "Small balances are where the leak is invisible",
      body: [
        "Most practices set a write-off threshold below which a balance is not worth pursuing, and that is a defensible policy. What makes it dangerous is that the threshold is usually set once and never re-examined against volume.",
        "A $12 balance is not worth a phone call. Ten thousand of them is a material sum, and because each individual instance is obviously correct to write off, no single decision ever looks wrong. The aggregate never appears in a report because the balances leave AR before anyone aggregates them.",
        "The fix is not to chase small balances individually but to ask why they exist. Recurring small underpayments usually indicate a fee schedule loaded incorrectly, a modifier applied inconsistently, or a contracted rate the payer is not honouring \u2014 all of which are systemic, and all of which are worth far more to fix than to collect.",
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
  faq: [
    {
      question: "What is a good days-in-AR figure for a medical practice?",
      answer:
        "MGMA reports a median of 47 days across practices, with better performers around 36. Below 40 days is generally healthy, but the number should always be read alongside the percentage of AR over 90 days and the net collection rate \u2014 days in AR falls when aged balances are written off, so it can improve without any additional cash being collected.",
    },
    {
      question: "At what point does a claim become uncollectable?",
      answer:
        "At the payer\u2019s timely filing deadline, which is a hard stop rather than a gradual decline. Medicare generally allows 12 months from the date of service, commercial payers commonly 90 to 180 days, and secondary claims are often 90 days from the primary EOB rather than from the date of service. Past that date no appeal recovers the claim.",
    },
    {
      question: "Should AR be worked oldest first?",
      answer:
        "No \u2014 work it by recoverability and by deadline. The oldest claims are frequently the least recoverable, so working strictly oldest-first spends the most effort on the least return. The exception is any claim approaching its timely filing limit, which should be worked immediately regardless of balance, because its value drops to zero on a known date.",
    },
    {
      question: "Why does AR age even when claims are submitted on time?",
      answer:
        "Because submission is not adjudication. Claims sit in AR when rejections are never read, when denials are posted but not worked, when secondary claims are not billed after the primary pays, and when underpayments are posted as though they were correct. Each of these leaves the balance technically open and functionally abandoned.",
    },
    {
      question: "What percentage of AR over 90 days is acceptable?",
      answer:
        "Most practices target under 15% to 20% of total AR sitting beyond 90 days. The trend matters more than the absolute figure: a rising over-90 percentage alongside a falling days-in-AR indicates that recent claims are being worked while older ones are being left, which typically resolves into a large write-off later.",
    },
  ],
  sources: ["mgma-data", "hfma-map-keys", "optum-denials-index"],
  relatedServices: ["ar-management", "denial-management", "practice-analytics"],
};

export default post;
