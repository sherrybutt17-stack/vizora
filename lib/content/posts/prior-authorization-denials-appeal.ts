import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "prior-authorization-denials-appeal",
  title: "Prior authorization denials: why 88% go unappealed",
  excerpt:
    "Four out of five appealed Medicare Advantage prior-auth denials are overturned. Almost nobody appeals them. The gap is capacity, not merit — and it is measurable.",
  category: "Prior Authorization",
  published: "2026-08-19",
  updated: "2026-08-19",
  readingMinutes: 4,
  answer:
    "80.7% of appealed Medicare Advantage prior authorization denials are overturned, but only 11.5% of denials are ever appealed. That means roughly 88% of denied authorizations are abandoned — and based on the overturn rate, most of them would have been approved. The constraint is staff capacity, not the strength of the claim.",
  sections: [
    {
      heading: "The number that should change how you staff",
      body: [
        "KFF's analysis of CMS Part C reporting covers 52.8 million prior authorization determinations across Medicare Advantage plans. Two figures from it sit uncomfortably next to each other: 80.7% of appealed prior-authorization denials are overturned, and only 11.5% of denials are ever appealed.",
        "Read together, they describe a system where the appeal almost always works and almost never happens. Nearly nine in ten denied authorizations are simply absorbed — the service is not rendered, is rendered unpaid, or is rescheduled into a later month and forgotten.",
        "This is not a story about payers denying claims they should approve, though that is part of it. It is a story about what happens when the cost of contesting a decision exceeds the staff hours available to contest it.",
      ],
    },
    {
      heading: "Why practices do not appeal",
      body: [
        "The AMA's 2025 physician survey puts the administrative load at 13 hours per physician per week on prior authorization alone, across an average of 40 requests. That is most of a full working day, every week, per physician, before a single appeal is filed.",
        "An appeal is strictly additional work on top of that. It requires pulling the clinical documentation, identifying the specific policy criterion the payer applied, writing a letter that addresses that criterion rather than restating the original request, and then tracking the response through a second determination window.",
        "So the decision not to appeal is rarely a clinical judgement that the denial was correct. It is an arithmetic one: the practice has a finite number of staff hours, and the queue is longer than the hours.",
      ],
    },
    {
      heading: "What a prior authorization denial actually costs",
      body: [
        "The direct cost of contesting a single denied claim averages $57.23 according to Premier's analysis of 280 hospitals. That is the labour to research, document and submit — not the value of the service.",
        "Against that, the expected value of appealing is straightforward to estimate. If the overturn rate on appeal is roughly 80%, the expected recovery on a $400 procedure is about $320 for $57 of work. The economics of appealing are not close.",
      ],
      table: {
        headers: ["Figure", "Value", "Source"],
        rows: [
          ["MA prior-auth denials overturned on appeal", "80.7%", "KFF / CMS Part C, 2024"],
          ["MA prior-auth denials that are appealed", "11.5%", "KFF / CMS Part C, 2024"],
          ["Physician hours per week on prior auth", "13 hrs", "AMA, 2025"],
          ["Average cost to contest one denied claim", "$57.23", "Premier Inc., 2023"],
          ["Denials that are potentially avoidable", "84%", "Optum, 2023"],
        ],
      },
    },
    {
      heading: "Prevent first, appeal second",
      body: [
        "Optum's index of 124 million hospital claim remits found 84% of denials are potentially avoidable, and that 44% originate at the front end — registration, eligibility and authorization. Authorization and precertification alone account for 12.8% of all denials.",
        "That ordering matters. An appeal recovers revenue after the fact at $57 a claim; a correct authorization on the first submission costs nothing extra. The highest-return work is upstream of the denial, not downstream of it.",
      ],
      list: [
        "Verify eligibility and benefits at scheduling, not at check-in — coverage changes mid-year and plan-level authorization rules change more often than that.",
        "Maintain payer-specific authorization requirements by CPT code, and check them at the point of scheduling.",
        "Capture the clinical rationale in the note at the time of the visit, while it is fresh — most appeals fail on documentation, not on merit.",
        "Track the authorization number and its expiry against the scheduled date of service; expired authorizations deny exactly like absent ones.",
        "Log every denial by payer and by reason code, so the recurring ones can be fixed at the process level rather than one claim at a time.",
      ],
    },
    {
      heading: "How to appeal a prior authorization denial",
      body: [
        "An effective appeal answers the specific criterion the payer cited. A letter that restates the original request will usually produce the same determination, because the reviewer is applying a policy test the letter never addresses.",
      ],
      list: [
        "Read the denial letter for the exact policy provision and criterion referenced — not just the reason code.",
        "Pull the clinical documentation that speaks to that criterion, including prior conservative treatment where medical necessity is the stated basis.",
        "State plainly which criterion is met and where in the record it is evidenced, with dates.",
        "File within the payer's appeal window, which is frequently shorter for prior-authorization determinations than for post-service claim denials.",
        "Escalate to peer-to-peer review where the payer offers it; a clinician-to-clinician conversation resolves medical-necessity disputes that correspondence does not.",
      ],
    },
    {
      heading: "The capacity problem is the real problem",
      body: [
        "Every figure above points at the same conclusion. The denials are largely avoidable, the appeals largely succeed, and the reason neither happens is that nobody has the hours.",
        "That is a staffing and process question rather than a clinical one, which is also why it is solvable. A practice that systematically works its authorization queue — preventing what it can upstream and appealing what it cannot — is not being cleverer than its payers. It is simply doing work that most practices leave undone because they cannot staff it.",
      ],
    },
  ],
  relatedServices: ["prior-authorization", "denial-management", "eligibility-verification"],
};

export default post;
