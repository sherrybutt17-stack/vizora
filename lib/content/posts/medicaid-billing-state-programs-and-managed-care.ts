import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "medicaid-billing-state-programs-and-managed-care",
  title: "Medicaid billing: why the same claim behaves differently in every state",
  metaTitle: "Medicaid billing: state programs and MCOs",
  excerpt:
    "Medicaid is fifty programs, not one payer. What that changes about eligibility, filing deadlines, authorization and who actually adjudicates your claim.",
  category: "Payers",
  published: "2026-08-28",
  updated: "2026-08-28",
  readingMinutes: 8,
  answer:
    "Medicaid is a joint federal and state program administered separately by each state, so eligibility rules, covered benefits, fee schedules, filing deadlines and the entity that adjudicates a claim all vary by state. A practice billing Medicaid in three states is working with three different payers that happen to share a name.",
  sections: [
    {
      heading: "The claim is usually not adjudicated by the state",
      body: [
        "The most consequential thing to establish about a Medicaid patient is who actually pays the claim. Most states deliver Medicaid through managed care organisations rather than paying claims directly, which means the state agency sets policy while a commercial insurer adjudicates.",
        "That distinction determines the payer ID, the provider portal, the authorization process, the appeal route and the filing deadline. Submitting to the state agency for a patient enrolled with an MCO produces CO-109 — claim not covered by this payer or contractor — and the filing clock keeps running while the claim is redirected.",
        "A minority of states still run fee-for-service Medicaid, and several run a mixed model where certain populations or services are carved out of managed care. Behavioural health, dental, transportation and long-term services are the usual carve-outs, and they are frequently administered by yet another entity.",
      ],
    },
    {
      heading: "Eligibility changes more often than commercial coverage",
      body: [
        "Medicaid eligibility is income-tested and redetermined periodically, which makes it materially less stable than employer coverage. A patient can be eligible in March, ineligible in April and eligible again in June, and none of those transitions generate a notification to the practice.",
        "Managed care assignment shifts on its own schedule as well. A patient may retain continuous Medicaid eligibility while moving between MCOs at the plan year, which changes the payer without changing the patient's coverage status.",
        "The practical consequence is that verifying a Medicaid patient once is close to worthless. Verification has to happen for the specific date of service and has to return the current managed care assignment, not just active status.",
      ],
      list: [
        "Verify for the date of service, not for today",
        "Capture the managed care plan, not only that Medicaid is active",
        "Re-verify at every visit for patients in a course of treatment",
        "Check for retroactive eligibility, which can make an old self-pay balance billable",
        "Check for a spend-down requirement, which can make an eligible patient temporarily non-covered",
      ],
    },
    {
      heading: "Retroactive eligibility works in your favour",
      body: [
        "Medicaid can be granted retroactively, in many states covering up to three months before the application date. A patient treated as self-pay in January whose Medicaid is approved in March may have covered claims for the January visit.",
        "Practices that write balances to self-pay and never revisit them lose this revenue routinely. The recovery is a periodic re-check of aged self-pay balances against Medicaid eligibility, which is one of the few places in the revenue cycle where money genuinely appears from work already written off.",
        "The constraint is the filing deadline, which is where states differ most sharply. Some run timely filing from the date of service regardless of when eligibility was granted; others start the clock from the eligibility determination date. Which rule applies decides whether a retroactive claim is worth building.",
      ],
    },
    {
      heading: "Filing deadlines are shorter and less forgiving",
      body: [
        "Medicare allows one year from the date of service. Commercial contracts commonly allow 90 to 180 days. Several state Medicaid programs are tighter than both, and unlike commercial payers there is rarely a contract to negotiate.",
        "The compounding problem is that Medicaid claims are more likely to be redirected — to an MCO, to a carve-out administrator, or to a primary payer under coordination of benefits — and every redirection consumes the same window. A claim that bounces twice can exhaust a 95-day deadline without ever having been worked incorrectly.",
        "The operational answer is to work Medicaid accounts receivable by deadline proximity rather than by balance. A $90 Medicaid claim two weeks from its filing limit is more urgent than a $900 commercial claim with six months left.",
      ],
    },
    {
      heading: "Rates are lower, which changes what is worth pursuing",
      body: [
        "Medicaid generally reimburses below both Medicare and commercial rates, and the gap varies substantially by state and by service. That is not a billing problem to be solved, but it is a fact that should shape process design.",
        "The implication is that manual, high-touch work does not pay for itself on Medicaid claims the way it might on commercial ones. Where a commercial denial can justify a written appeal with attached records, the same effort on a Medicaid claim can cost more than the claim is worth.",
        "That argues for prevention over recovery on this payer class specifically: front-end verification, correct MCO routing and authorization capture, rather than back-end appeal capacity. The economics reward getting it right the first time more heavily here than anywhere else in the book.",
      ],
      table: {
        headers: ["What varies by state", "Why it changes the claim"],
        rows: [
          ["Program name", "Determines which portal, payer ID and manual apply"],
          ["Delivery model", "Whether the state or an MCO adjudicates the claim"],
          ["Managed care carve-outs", "Behavioural health and dental often route elsewhere"],
          ["Timely filing limit", "Shorter than Medicare, and rarely negotiable"],
          ["Retroactive eligibility", "Whether an old self-pay balance becomes billable"],
          ["Expansion status", "Changes payer mix and self-pay volume materially"],
        ],
      },
    },
    {
      heading: "What this means if you bill more than one state",
      body: [
        "A practice or billing operation working several states is maintaining several payer relationships that share a name and very little else. The failure mode is treating the second state like the first — same portal habits, same filing assumptions, same authorization workflow — and discovering the differences through denials.",
        "The defensible approach is to hold the state-specific facts explicitly: program name, delivery model, the MCOs actually operating there, carve-out administrators, and the filing limit. Those five facts prevent most of the avoidable denial volume on this payer class.",
        "Our state pages carry the program name, Medicare Administrative Contractor, delivery model and expansion status for each of the fifty states, which is the starting set.",
      ],
    },
  ],
  faq: [
    {
      question: "Why was a Medicaid claim denied as not covered by this payer?",
      answer:
        "Almost always because the patient is enrolled in a Medicaid managed care organisation and the claim went to the state agency, or to the wrong MCO. Most states deliver Medicaid through managed care, so the state sets policy while a commercial insurer adjudicates. Verify the current managed care assignment for the date of service and resubmit to that payer, watching the filing deadline, which has been running throughout.",
    },
    {
      question: "Can you bill a patient the difference on a Medicaid claim?",
      answer:
        "Generally no. Balance billing a Medicaid beneficiary for covered services is prohibited, and the prohibition holds even where the Medicaid rate is well below your charge. Narrow exceptions exist for non-covered services where the patient accepted responsibility in advance, and for permitted nominal cost-sharing, both of which vary by state.",
    },
    {
      question: "What is retroactive Medicaid eligibility?",
      answer:
        "Medicaid can be approved with an effective date before the application, in many states covering up to three months prior. A patient treated as self-pay during that window may have covered claims. Re-checking aged self-pay balances against Medicaid eligibility recovers revenue already written off, subject to the state's filing deadline.",
    },
    {
      question: "Is Medicaid timely filing shorter than Medicare?",
      answer:
        "Frequently, yes. Medicare allows one year from the date of service; several state Medicaid programs allow materially less. Because Medicaid claims are also more likely to be redirected between the state, an MCO and a carve-out administrator, the same window absorbs multiple submission cycles. Work Medicaid receivables by deadline proximity rather than by balance.",
    },
    {
      question: "Does Medicaid expansion status affect billing?",
      answer:
        "It changes payer mix rather than claim mechanics. In expansion states a larger share of low-income adults hold Medicaid instead of being uninsured, which raises Medicaid volume and lowers self-pay volume. That shifts where a practice's collection effort should sit, since Medicaid and self-pay balances are worked in completely different ways.",
    },
  ],
  sources: ["medicaid-directory", "msp-manual", "claims-processing-manual"],
  relatedServices: ["eligibility-verification", "claims-management", "denial-management"],
};

export default post;
