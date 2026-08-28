import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "medicare-part-b-billing-and-your-mac",
  title: "Medicare Part B billing: your MAC decides more than the fee schedule",
  metaTitle: "Medicare Part B billing and your MAC",
  excerpt:
    "Medicare is national, but the contractor that adjudicates your claims is regional — and that contractor sets coverage policy, review targets and the answer you get on appeal.",
  category: "Payers",
  published: "2026-08-28",
  updated: "2026-08-28",
  readingMinutes: 8,
  answer:
    "Medicare Part B claims are processed by a Medicare Administrative Contractor assigned to your state, not by CMS directly. The MAC applies national rules but sets its own local coverage policies, medical review priorities and appeal decisions, which is why an identical claim can pay in one jurisdiction and deny in another.",
  sections: [
    {
      heading: "Your MAC is your actual payer",
      body: [
        "CMS writes national policy. A Medicare Administrative Contractor adjudicates the claim, and there are separate contractors for different regions of the country. Which one handles your claims is determined by where the service was rendered, not by where your practice is incorporated.",
        "That matters because MACs are not passive processors. Each publishes its own local coverage determinations, runs its own medical review programme, sets its own documentation expectations for those reviews, and decides the first level of appeal on its own claims.",
        "The practical consequence for a multi-state practice is that Medicare is not one payer relationship. A group billing across three MAC jurisdictions is working with three sets of local coverage policy and three review programmes, under one national rulebook.",
      ],
    },
    {
      heading: "Enrolment lapses stop payment outright",
      body: [
        "Medicare enrolment is maintained in PECOS and has to be revalidated on a cycle — generally every five years for physicians and practitioners, and more frequently for DMEPOS suppliers. A revalidation notice missed is not a warning; it deactivates billing privileges.",
        "The second enrolment failure is subtler. Ordering and referring providers must hold their own current enrolment record even when they never submit a claim, which is what produces CO-183 on diagnostic, laboratory, DME and home health claims. The practice losing the money is not the one whose record lapsed.",
        "Reactivation after a deactivation is possible but is not always retroactive to the gap, so claims rendered during the lapse can be permanently unbillable. Treat revalidation dates as a tracked deadline in the same way as filing limits.",
      ],
    },
    {
      heading: "Assignment decides what you may charge the patient",
      body: [
        "A participating provider accepts assignment on all Medicare claims, which means accepting the Medicare-approved amount as payment in full. Medicare pays its share directly and the patient owes the remaining coinsurance and any unmet deductible — nothing more.",
        "A non-participating provider may accept assignment case by case. Where they do not, the non-participating fee schedule amount is lower than the participating one, and the limiting charge caps what may be billed to the beneficiary above it. Exceeding the limiting charge is a compliance problem, not a pricing decision.",
        "For most practices the question is settled once at enrolment and then forgotten, which is fine — until someone bills a patient a balance that assignment status does not permit.",
      ],
    },
    {
      heading: "One year to file, and the clock does not pause",
      body: [
        "Medicare fee-for-service allows one calendar year from the date of service. That is longer than most commercial contracts and it produces a false sense of safety: a claim that bounces between payers under coordination of benefits, or sits unworked in a rejection queue, can still exhaust it.",
        "The distinction that costs the most money here is between a rejection and a denial. A denied claim was adjudicated and carries appeal rights. A rejected claim was never adjudicated, so there is nothing to appeal and the filing clock has been running from the date of service throughout — which is what MA130 means when it says no appeal rights are afforded.",
        "Exceptions to the one-year limit exist but are narrow and specific, and none of them cover a claim that was simply worked late.",
      ],
    },
    {
      heading: "Five levels of appeal, each with its own deadline",
      body: [
        "The Medicare appeals process runs through five levels: redetermination by the MAC, reconsideration by a Qualified Independent Contractor, a hearing before an Administrative Law Judge, review by the Medicare Appeals Council, and finally judicial review in federal district court.",
        "Each level has its own filing deadline, and missing one ends the appeal regardless of the claim's merits. The higher levels also carry an amount-in-controversy threshold, which is why low-value claims are worth aggregating rather than appealing individually.",
        "Most practices never go past the first level, and for most claims that is the right economic answer. The reason to know the structure is that a claim worth escalating has to survive each deadline to get there, and a redetermination filed late has already ended the case.",
      ],
      table: {
        headers: ["What CMS sets nationally", "What your MAC sets locally"],
        rows: [
          ["National coverage determinations", "Local coverage determinations"],
          ["The physician fee schedule", "Medical review targets and prepayment edits"],
          ["Timely filing limits", "Documentation expectations on review"],
          ["Appeal structure and deadlines", "The redetermination decision itself"],
          ["Enrolment requirements", "Provider outreach and education"],
        ],
      },
    },
    {
      heading: "Reductions that are not denials",
      body: [
        "Two adjustments appear on nearly every Medicare remittance and neither is a denial. CO-45 is the contractual difference between the charge and the Medicare-approved amount. CO-253 is sequestration, a statutory percentage reduction applied to the Medicare payment after the beneficiary's coinsurance and deductible have been calculated.",
        "Because sequestration is applied after patient liability is determined, it cannot be shifted to the beneficiary. It is also not appealable, since it is a legislated reduction rather than a payer decision.",
        "Both should be configured to adjust automatically at payment posting. A denial queue that fills with sequestration lines is a workflow that will never empty, and the time spent looking at them is the only real cost either code carries.",
      ],
    },
    {
      heading: "What to hold for each jurisdiction you bill",
      body: [
        "A practice billing Medicare in more than one state should be able to state, per jurisdiction, which contractor adjudicates its claims and where that contractor's coverage policies are published. Those two facts route almost every coverage question that follows.",
        "Our state pages carry the Medicare Administrative Contractor and jurisdiction identifier for each of the fifty states, alongside the Medicaid program and delivery model. That is the reference set for deciding which local policy applies to a given claim.",
      ],
    },
  ],
  faq: [
    {
      question: "What is a Medicare Administrative Contractor?",
      answer:
        "A private organisation contracted by CMS to process Medicare fee-for-service claims for a defined geographic jurisdiction. The MAC applies national Medicare rules but also publishes its own local coverage determinations, runs its own medical review programme, and decides the first level of appeal on the claims it processes.",
    },
    {
      question: "Why does the same Medicare claim pay in one state and deny in another?",
      answer:
        "Because local coverage determinations are set by each Medicare Administrative Contractor for its own jurisdiction. Where no national coverage determination exists, contractors may reach different conclusions about which diagnoses support a procedure, so an identical CPT and ICD-10 pairing can be covered in one jurisdiction and not in another.",
    },
    {
      question: "How long do you have to file a Medicare claim?",
      answer:
        "One calendar year from the date of service for Medicare fee-for-service. Exceptions are narrow and do not cover a claim that was worked late. Note that a rejected claim never entered adjudication, so the clock has been running throughout and no appeal right exists — the claim has to be corrected and refiled.",
    },
    {
      question: "Can you bill a Medicare patient more than the approved amount?",
      answer:
        "Not if you accept assignment — the Medicare-approved amount is payment in full, and the patient owes only coinsurance and any unmet deductible. A non-participating provider who does not accept assignment on a claim is still capped by the limiting charge. Exceeding it is a compliance issue rather than a pricing choice.",
    },
    {
      question: "Is sequestration billable to the patient?",
      answer:
        "No. Sequestration is applied to the Medicare payment after the beneficiary's coinsurance and deductible have already been calculated on the full approved amount, so it was never part of what the patient owed. It is also not appealable, being a statutory reduction rather than a payer determination.",
    },
  ],
  sources: ["find-your-mac", "claims-processing-manual", "medicare-appeals", "pecos"],
  relatedServices: ["claims-management", "credentialing", "denial-management"],
};

export default post;
