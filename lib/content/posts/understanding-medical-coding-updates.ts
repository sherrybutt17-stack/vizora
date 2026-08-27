import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "understanding-medical-coding-updates",
  title: "Understanding annual medical coding updates",
  excerpt:
    "ICD-10 changes October 1, CPT changes January 1. Claims are validated against the service date, not the submission date.",
  category: "Coding",
  published: "2026-04-22",
  updated: "2026-08-20",
  readingMinutes: 7,
  answer:
    "ICD-10-CM diagnosis codes update annually on October 1 and CPT procedure codes on January 1. Claims are validated against the code set in effect on the date of service, not the date of submission — which is why claims submitted in January for December services must use the prior year's codes.",
  sections: [
    {
      heading: "Two update cycles, two dates",
      body: [
        "ICD-10-CM diagnosis codes and ICD-10-PCS procedure codes take effect October 1 each year, aligning with the federal fiscal year. CPT and HCPCS Level II codes take effect January 1, aligning with the calendar year.",
        "Running on two cycles means a practice faces a code set transition twice a year rather than once, and the two require different preparation from different parts of the team.",
      ],
    },
    {
      heading: "The date-of-service rule",
      body: [
        "This causes more denials than the code changes themselves. A claim is validated against the code set in effect on the date of service, not the date of submission.",
        "A December 28 encounter submitted on January 5 must use the prior year's CPT codes. Using the new set produces CO-181 — procedure code invalid on the date of service. The reverse applies after October 1 for diagnosis codes. Every January and October produces a predictable spike of exactly this denial.",
      ],
    },
    {
      heading: "What to do before each effective date",
      body: ["The preparation is unglamorous and entirely preventive:"],
      list: [
        "Update code sets in the practice management system and clearinghouse before the effective date, not after the first denial",
        "Identify deleted codes your practice actually used and map them to replacements",
        "Update superbills, encounter forms and EHR favorites lists, which are the most common source of retired-code submissions",
        "Confirm claim edits validate against date of service rather than submission date",
        "Brief providers on documentation changes where new codes require greater specificity",
      ],
    },
    {
      heading: "Watch for specificity changes, not just new codes",
      body: [
        "The additions that cause the most trouble are usually not new conditions but existing codes split into more specific variants. A code that was valid last year becomes unspecified this year, and unspecified codes draw denials and documentation requests.",
        "Where specificity increases, the fix is upstream in documentation rather than in coding. A coder cannot assign a more specific code than the note supports, which makes provider briefing part of the update process rather than an optional extra.",
      ],
    },
    {
      heading: "The annual update calendar",
      body: [
        "Code set changes are not a single event. They land on different dates from different bodies, and a practice that treats them as one January task will bill deleted codes for months.",
      ],
      table: {
        headers: ["Effective", "Code set", "Published by"],
        rows: [
          ["1 January", "CPT — new, revised and deleted procedure codes", "American Medical Association"],
          ["1 January", "HCPCS Level II annual update", "CMS"],
          ["1 October", "ICD-10-CM — diagnosis codes for the federal fiscal year", "CMS / NCHS"],
          ["Quarterly", "NCCI procedure-to-procedure and MUE edits", "CMS"],
          ["Varies", "Payer-specific policy and modifier rules", "Individual payers"],
        ],
      },
    },
    {
      heading: "Deleted codes are the expensive category",
      body: [
        "Of the three kinds of change — new, revised and deleted — deletions cause the most damage, because they fail silently in a system that has been working.",
        "A deleted code sitting in a superbill, an EHR favourites list or a charge template will keep being selected by clinicians who have used it for years. The claim denies as invalid, and because the cause is a stale template rather than a one-off error, it denies for every affected encounter until someone traces it.",
        "Revised codes are subtler still. When a code's description or its bundling behaviour changes, the code remains valid and the claim may pay — at the wrong amount, or bundled into another service. That produces no denial and no alert, which is exactly the profile of revenue that leaks unnoticed.",
      ],
    },
    {
      heading: "There is no grace period, whatever the payer implies",
      body: [
        "A persistent belief holds that payers allow a short window after each effective date during which retired codes still adjudicate. They do not, and the belief survives because the failure is delayed rather than immediate.",
        "Claims submitted with a deleted code are usually rejected at the clearinghouse or returned as unprocessable rather than denied outright. An unprocessable claim does not appear on a denial report, does not create an appeal right, and often does not surface in AR as a problem for weeks \u2014 by which point the practice has submitted a month of them.",
        "Where practices genuinely see leniency, it is almost always a payer\u2019s own system lagging its published policy. That lag is not a rule, it is not documented, and it disappears without notice. Building a January workflow around it means one year the claims will simply stop paying.",
      ],
    },
    {
      heading: "Three systems have to agree, and they update independently",
      body: [
        "A code set change is not one update. It propagates through several systems that are maintained by different vendors on different schedules, and the claim only pays when all of them agree.",
      ],
      table: {
        headers: ["System", "What has to change", "Failure if it lags"],
        rows: [
          ["EHR / charge capture", "Code descriptions, favourites lists, order sets", "Providers keep selecting a code that no longer exists"],
          ["Practice management / fee schedule", "New codes priced, deleted codes retired", "Claim submits at $0 or is held as unpriced"],
          ["Clearinghouse edits", "Validation rules for the new code set", "Claim rejected before it reaches the payer"],
          ["Payer policy and LCDs", "Coverage and medical necessity for new codes", "Claim denies as non-covered despite valid coding"],
          ["Superbills and encounter forms", "Printed and embedded code lists", "Paper artefacts silently reintroduce retired codes"],
        ],
      },
    },
    {
      heading: "Assign the update to a person, not to the calendar",
      body: [
        "Coding updates fail in practices that treat October 1 and January 1 as events rather than as owned work. The dates are known a year in advance; what is usually missing is a named person accountable for confirming each system has been updated before the effective date rather than after the first denials arrive.",
        "A workable version is narrow. Four to six weeks out, pull the addenda and identify only the codes the practice actually bills \u2014 for most specialties that is a handful, not the full change list. Confirm each of those is priced in the fee schedule and present in the EHR. Two weeks out, run a test claim through the clearinghouse for the highest-volume new code. In the first week after the effective date, read the rejection report daily rather than weekly, because that is the window in which a missed system shows itself and can still be fixed before a month of claims accumulates.",
      ],
    },
    {
      heading: "A workable annual routine",
      body: [
        "The goal is not for clinicians to memorise code changes. It is for the places codes are stored to be updated before the effective date.",
      ],
      list: [
        "Inventory every place a code is stored: superbills, EHR favourites, charge templates, order sets, standing orders.",
        "Before each effective date, cross-check that inventory against the deletions list for your specialty — deletions first, they cause the hard denials.",
        "Review revised descriptors for the codes you bill most; a changed descriptor can change the documentation the payer expects.",
        "Update the scrubber's edit set, including quarterly NCCI changes, which most practices never revisit between annual updates.",
        "For the first month after any update, review denials weekly rather than monthly. A template error found in week one costs a handful of claims; found in week six it costs hundreds.",
      ],
    },
  ],
  faq: [
    {
      question: "When do medical codes update each year?",
      answer:
        "ICD-10-CM diagnosis codes update on October 1 and CPT procedure codes on January 1. HCPCS Level II codes update quarterly, which is the cycle most practices forget. The two main dates are published well in advance, so the constraint is never notice \u2014 it is whether every downstream system has been updated before the date arrives.",
    },
    {
      question: "Which code set applies when a claim is submitted after the effective date?",
      answer:
        "The code set in effect on the date of service, not the date of submission. A claim submitted in January for a service delivered in December must use the prior year\u2019s CPT codes. This is the single most common source of January denials, because staff naturally reach for the codes currently in front of them.",
    },
    {
      question: "Is there a grace period for using deleted codes?",
      answer:
        "No. Claims using deleted codes are typically rejected at the clearinghouse or returned as unprocessable rather than formally denied, which makes the failure easy to miss \u2014 unprocessable claims do not appear on denial reports and create no appeal right. Any apparent leniency is a payer system lagging its own published policy, and it disappears without notice.",
    },
    {
      question: "What happens to claims already in process when codes change?",
      answer:
        "They adjudicate against the code set for their date of service, so claims correctly coded before the change are unaffected. The risk is to claims that need resubmission or correction after the effective date \u2014 staff must resubmit with the original date-of-service code set rather than the current one, which is counterintuitive and frequently done wrong.",
    },
    {
      question: "What is the most expensive kind of coding update to miss?",
      answer:
        "Deleted codes and specificity changes, rather than new codes. A missing new code is visible immediately because there is nothing to bill. A code that was split into more specific options still exists in the system and still submits, so claims deny for lack of specificity while appearing to have been coded correctly \u2014 which delays discovery by weeks.",
    },
  ],
  sources: ["ama-cpt", "icd-10-cm", "hcpcs-level-ii"],
  relatedServices: ["medical-coding", "claims-management", "denial-management"],
};

export default post;
