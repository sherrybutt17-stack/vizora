import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "understanding-medical-coding-updates",
  title: "Understanding annual medical coding updates",
  excerpt:
    "ICD-10 changes October 1, CPT changes January 1. Claims are validated against the service date, not the submission date.",
  category: "Coding",
  published: "2026-04-22",
  updated: "2026-08-19",
  readingMinutes: 3,
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
  relatedServices: ["medical-coding", "claims-management", "denial-management"],
};

export default post;
