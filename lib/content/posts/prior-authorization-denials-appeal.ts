import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "prior-authorization-denials-appeal",
  title: "Prior authorization denials: why 88% go unappealed",
  excerpt:
    "Four out of five appealed Medicare Advantage prior-auth denials are overturned. Almost nobody appeals them. The gap is capacity, not merit — and it is measurable.",
  category: "Prior Authorization",
  published: "2026-08-19",
  updated: "2026-08-20",
  readingMinutes: 8,
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
      heading: "Peer-to-peer review is the fastest route, and it is time-limited",
      body: [
        "Most payers offer a peer-to-peer review in which the ordering physician speaks directly with the payer\u2019s medical director. It is the fastest available reversal mechanism \u2014 frequently resolved on the call rather than in the 30 to 60 days a written appeal takes.",
        "It is also the mechanism practices most often lose by default, because the window is short. Payers typically allow only a few business days from the denial notice to request it, and once that window closes the case drops into the written appeal queue regardless of merit.",
        "Two things make peer-to-peer work. Request it the same day the denial is received, before anyone has decided whether to appeal, because the request can be withdrawn but the window cannot be reopened. Then have the ordering physician cite the payer\u2019s own published medical policy criteria and state which of them the documentation satisfies. A conversation about clinical judgement in general terms tends to fail; a conversation about criterion three of the payer\u2019s own policy tends to succeed.",
      ],
    },
    {
      heading: "Build the appeal against the payer\u2019s criteria, not the diagnosis",
      body: [
        "The most common weakness in a prior authorization appeal is that it argues the patient needs the service. The payer is not disputing that. It is asserting that the documentation submitted did not establish the specific criteria in its coverage policy.",
        "Every commercial payer publishes medical policies stating exactly what must be documented for a given service. An appeal that walks through those criteria in order, quotes the policy, and points to the page and date in the record satisfying each one is answering the question actually asked. An appeal that describes the patient\u2019s condition is answering a different one.",
      ],
      list: [
        "Quote the payer\u2019s own policy number and effective date at the top of the letter",
        "Address each criterion in the order the policy lists them",
        "Cite the specific chart date and page establishing each criterion, not the record as a whole",
        "Document conservative treatment already tried, with dates and outcomes, where the policy requires step therapy",
        "Include the denial letter and the original authorization request as attachments",
        "State the requested remedy explicitly \u2014 approval of the named CPT for the named date range",
      ],
    },
    {
      heading: "Track the deadlines, because they are shorter than they look",
      body: [
        "Appeal rights expire, and the windows are set by the payer and the plan type rather than by any single rule. Medicare Advantage, commercial and self-funded ERISA plans all run different clocks, and the clock generally starts at the date on the denial notice rather than the date the practice opened the envelope.",
        "The practical control is a single tracked list with three dates per denial: the peer-to-peer request deadline, the first-level appeal deadline, and the external review deadline where one exists. Denials worked from a general queue without those dates attached are the ones that expire, and an expired appeal right converts a recoverable denial into a write-off with no further options.",
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
  faq: [
    {
      question: "How often are prior authorization denials overturned on appeal?",
      answer:
        "KFF\u2019s analysis of CMS Part C reporting found that 80.7% of appealed Medicare Advantage prior authorization denials were overturned. That figure is the argument for appealing: the large majority of denied requests were payable, and they were denied on documentation grounds rather than on clinical merit.",
    },
    {
      question: "If most appeals succeed, why do so few practices appeal?",
      answer:
        "Capacity, not judgement. The AMA measures roughly 13 hours of physician time per week spent on prior authorization before any appeal is written. Appeals compete with clinical work for the same hours, so they are triaged out in favour of patients \u2014 which means the denials that go unappealed are selected by staffing pressure rather than by whether they were correct.",
    },
    {
      question: "What is a peer-to-peer review and when should it be requested?",
      answer:
        "A direct conversation between the ordering physician and the payer\u2019s medical director, and generally the fastest way to reverse a denial \u2014 often resolved on the call rather than in the weeks a written appeal takes. The request window is usually only a few business days from the denial notice, so it should be requested the same day the denial arrives, before deciding whether to pursue it.",
    },
    {
      question: "What should a prior authorization appeal letter contain?",
      answer:
        "It should argue against the payer\u2019s published medical policy rather than describing the patient\u2019s condition. Quote the policy number and effective date, address each criterion in the order listed, and cite the specific chart date and page satisfying each one. Attach the denial letter and the original request, and state the remedy sought \u2014 approval of the named CPT for a named date range.",
    },
    {
      question: "What happens if the appeal deadline is missed?",
      answer:
        "The appeal right expires and the denial becomes a write-off, regardless of how strong the clinical case was. Windows vary by payer and plan type and generally run from the date on the denial notice rather than the date it was received, so tracking three dates per denial \u2014 peer-to-peer, first-level appeal, and external review \u2014 is what prevents recoverable revenue expiring unworked.",
    },
  ],
  sources: ["cms-0057-f", "medicare-appeals", "caqh-index"],
  relatedServices: ["prior-authorization", "denial-management", "eligibility-verification"],
};

export default post;
