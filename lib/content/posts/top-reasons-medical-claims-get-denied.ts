import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "top-reasons-medical-claims-get-denied",
  title: "Top reasons medical claims get denied",
  excerpt:
    "Registration and eligibility errors cause more denials than coding does. Here is what the data actually shows, and what to fix first.",
  category: "Denial Management",
  published: "2026-05-06",
  updated: "2026-08-20",
  readingMinutes: 8,
  featured: true,
  answer:
    "The largest cause of claim denials is not coding — it is registration and eligibility errors, which account for 24.3% of all denials according to Optum's analysis of 124 million hospital claims. Missing or invalid claim data follows at 15.9%, and authorization issues at 12.8%. Together, front-end problems generate 44% of all denials.",
  sections: [
    {
      heading: "Denials are mostly a front-end problem",
      body: [
        "Most practices treat denials as a billing department issue. The data says otherwise. Optum's Revenue Cycle Denials Index, built on 124 million hospital claim remits across more than 1,400 US hospitals, found that 44% of all denials originate in front-end revenue cycle processes — registration, eligibility and authorization. That share has risen steadily from 34% in 2019–20.",
        "This matters because front-end denials are the cheapest to prevent and the most expensive to ignore. A coding error is caught by a coder. An eligibility error is caught by nobody until the remittance arrives weeks later, by which point the care has been delivered and the cost is sunk.",
      ],
    },
    {
      heading: "The actual denial categories, ranked",
      body: [
        "Here is how denials distribute across categories, from the same Optum dataset covering 2023:",
      ],
      table: {
        headers: ["Denial category", "Share of all denials"],
        rows: [
          ["Registration and eligibility", "24.33%"],
          ["Missing or invalid claim data", "15.89%"],
          ["Authorization and precertification", "12.80%"],
          ["Medical documentation requested", "12.08%"],
          ["Service not covered", "9.67%"],
          ["Medical necessity", "6.76%"],
        ],
      },
    },
    {
      heading: "Why registration and eligibility errors dominate",
      body: [
        "Within the registration and eligibility category, coordination of benefits accounts for half of all denials. Patients carry coverage the practice does not know about, or coverage order changes and nobody re-checks. Benefit maximums account for another 27%, and plan coverage issues 17%.",
        "The common thread is that eligibility is verified once, at intake, and then assumed stable. It is not stable. Coverage terminates, employers change carriers, and Medicaid managed care assignments shift. Verifying before each visit rather than once per patient removes an entire denial category.",
      ],
    },
    {
      heading: "What denials actually cost",
      body: [
        "Premier Inc. measured the average cost of contesting a single denied claim at $57.23 in 2023 — a 31% increase in one year. Across US providers, that adds up to $25.7 billion spent annually adjudicating claims with payers, of which roughly $18 billion is potentially unnecessary.",
        "The more striking figure is what happens when practices do appeal: approximately 70% of denied claims are ultimately overturned and paid. The revenue is usually collectible. The obstacle is capacity, not merit.",
      ],
    },
    {
      heading: "Where to start",
      body: [
        "If your denial rate is above 10% — and 41% of providers now report exactly that, up from 30% in 2022 — the highest-leverage work is not in the billing office.",
      ],
      list: [
        "Verify eligibility before every visit, not once at registration. This addresses the single largest denial category.",
        "Confirm authorization requirements at scheduling, when there is still time to obtain one.",
        "Scrub claims against payer-specific edits before submission rather than correcting after rejection.",
        "Aggregate denials by reason code and payer monthly. Recurring codes indicate a process failure, not a claim failure.",
        "Work denials by filing deadline proximity, not by dollar value. An expired claim is worth nothing regardless of size.",
      ],
    },
    {
      heading: "What to actually do about the top three",
      body: [
        "Knowing the distribution is only useful if it changes what you do on Monday. The three largest categories have different owners and different fixes.",
      ],
      table: {
        headers: ["Category", "Share", "The fix, and who owns it"],
        rows: [
          ["Registration and eligibility", "24.33%", "Re-verify before every visit, electronically — front desk"],
          ["Missing or invalid claim data", "15.89%", "Validate demographics against the payer's own response — registration"],
          ["Authorization and precertification", "12.80%", "Check requirements by CPT at scheduling, not at check-in — scheduling"],
        ],
      },
    },
    {
      heading: "Denials versus rejections — not the same thing",
      body: [
        "A rejection and a denial are frequently conflated, and the difference determines where the claim actually is.",
        "A rejection happens before adjudication: the clearinghouse or payer refuses the claim for a format or data problem, so it never enters the payer's system. It can be corrected and resubmitted without an appeal, and critically, it does not appear in any aging report built from payer data.",
        "A denial happens after adjudication: the payer processed the claim and decided not to pay. It carries a CARC code, it is visible in remittance, and changing the outcome requires an appeal.",
        "The dangerous one is the rejection, because it exists in your system as submitted and in the payer's system not at all. It ages silently until timely filing closes — which is how CO-29 denials are manufactured months before they appear.",
      ],
    },
    {
      heading: "Read the remark code, not just the reason code",
      body: [
        "A claim adjustment reason code says what the payer did. The remittance advice remark code that accompanies it usually says why, and it is the field most often ignored because it sits further right on the remittance.",
        "CO-16 is the clearest example. On its own it means \u201Cclaim lacks information or has submission errors,\u201D which is not actionable \u2014 it could be almost anything. The attached remark code names the missing element: a specific identifier, an absent attachment, a required field left blank. Working CO-16 from the reason code alone produces guesswork and repeat denials; working it from the remark code produces a fix.",
        "The same applies to CO-97, where the service is bundled into another already adjudicated. The reason code tells you it was bundled; only the remark and the paired claim tell you what it was bundled into, and therefore whether a modifier would have been appropriate or whether the bundling was correct.",
      ],
    },
    {
      heading: "Denials cluster, and the clusters are what to work",
      body: [
        "Denials are usually worked one claim at a time because that is how they arrive. It is the least efficient possible order, because denials are not independent events \u2014 they arrive in clusters produced by a single upstream cause.",
        "One payer changing an authorization requirement generates dozens of denials that look individually unrelated. A fee schedule loaded incorrectly generates a steady trickle of underpayments across months. A provider whose credentialing lapsed generates every denial on their panel at once.",
        "Sorting the month\u2019s denials by payer, by code, by provider and by CPT takes a few minutes in any reporting tool and answers a different question than the claim-level queue does. The queue asks which claim to fix next. The clusters ask which cause to remove, and removing one cause typically prevents more future denials than a week of individual rework recovers.",
      ],
    },
    {
      heading: "Which denials to work, and which to let go",
      body: [
        "Not every denial is worth the labour. Premier Inc. puts the average administrative cost of fighting a single denied claim at $57.23, which means a denial on a claim worth less than roughly that amount costs more to pursue than it returns \u2014 unless working it removes a cause that will recur.",
        "That caveat is the important half. A $40 denial is not worth appealing on its own economics, but if it is the twelfth instance of the same fee schedule error, the fix is worth far more than the twelve claims combined. The decision is therefore not about the individual balance but about whether the denial is isolated or representative.",
        "A workable rule: appeal anything above the cost-to-work threshold on its own merit, and for anything below it, look at whether the same code and payer appear more than a handful of times that month. If they do, fix the cause and resubmit the batch. If they do not, write it off and spend the time on the clustered categories instead.",
      ],
    },
    {
      heading: "A monthly denial review that takes an hour",
      body: [
        "The practices that reduce denials rather than merely working them do the same unglamorous thing every month. It is not sophisticated and it does not take long.",
      ],
      list: [
        "Pull all denials for the month, grouped by CARC code and by payer.",
        "Take the top three codes by volume — not by dollar value, because volume identifies the broken process.",
        "For each, trace back to the step that caused it, using the code-to-cause mapping rather than the code's own wording.",
        "Assign one owner and one change per cause. Three changes a month is sustainable; twelve is not.",
        "Track appeal volume over time. If it is flat, you are managing symptoms — the underlying causes are untouched.",
      ],
    },
  ],
  faq: [
    {
      question: "What is the most common reason medical claims are denied?",
      answer:
        "Registration and eligibility errors, at 24.3% of all denials according to Optum\u2019s analysis of 124 million hospital claim remits. Missing or invalid claim data follows at 15.9%, and authorization issues at 12.8%. The ranking matters because the largest category is also the cheapest to prevent \u2014 it is created at the front desk, before a claim exists.",
    },
    {
      question: "What percentage of claim denials are preventable?",
      answer:
        "Optum found that 84% of denials are potentially avoidable, and that 22% of those are not recoverable once they occur. Read together, those figures mean most denied revenue is lost to process failures rather than to genuine coverage disputes, and a meaningful share of it cannot be recovered by any amount of downstream appeal work.",
    },
    {
      question: "What is the difference between a claim denial and a claim rejection?",
      answer:
        "A denial means the payer adjudicated the claim and refused payment, which creates an appeal right. A rejection means the claim failed validation before adjudication, usually at the clearinghouse, so the payer never received it \u2014 there is nothing to appeal, but the timely filing clock keeps running. Rejections are cheaper to fix and easier to miss entirely.",
    },
    {
      question: "How much does it cost to work a denied claim?",
      answer:
        "Premier Inc. measures the average administrative cost of fighting a single denied claim at $57.23. Roughly 70% of denied claims are eventually overturned and paid, which means the majority were payable when first submitted and the practice paid twice to collect them \u2014 once to submit and once to argue.",
    },
    {
      question: "Where should a practice start with denial management?",
      answer:
        "With the front end, and with clusters rather than individual claims. Sort a month of denials by payer, code, provider and CPT: denials arrive in groups produced by single upstream causes, such as a changed authorization requirement or a fee schedule loaded incorrectly. Removing one cause prevents more future denials than reworking claims individually recovers.",
    },
  ],
  sources: ["optum-denials-index", "x12-carc", "kff-denials"],
  relatedServices: ["denial-management", "eligibility-verification", "claims-management"],
};

export default post;
