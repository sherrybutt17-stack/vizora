import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "nephrology-dialysis-monthly-capitation-billing",
  title: "Nephrology billing: monthly capitation for dialysis and what sits outside it",
  excerpt:
    "Dialysis management is paid monthly rather than per visit, and the code depends on the patient's age and how many times they were seen. Almost everything else nephrology does is billed normally.",
  category: "Specialty Billing",
  published: "2026-08-25",
  updated: "2026-08-25",
  readingMinutes: 8,
  answer:
    "End-stage renal disease management is reimbursed through a monthly capitation payment covering all outpatient dialysis-related physician services for the month. The code is selected by the patient's age and, for adults, by the number of face-to-face visits provided. Vascular access procedures, inpatient care and unrelated conditions fall outside it and are billed separately.",
  sections: [
    {
      heading: "The monthly capitation payment replaces per-visit billing",
      body: [
        "For patients on outpatient dialysis, physician services related to that dialysis are not billed per encounter. A single monthly code covers the month's management — the visits, the review of laboratory results, the adjustment of the prescription, the coordination with the facility.",
        "This is a genuinely different billing model from the rest of medicine, and practices moving into dialysis management frequently attempt to bill office visits alongside it. Those deny, because the work is already inside the capitation payment.",
        "The code is selected on two axes. The first is the patient's age band, which has its own set of codes. The second, for adult patients, is how many face-to-face visits were provided during the month — with distinct codes for one visit, two to three visits, and four or more.",
      ],
      table: {
        headers: ["Patient group", "Selection basis", "Code family"],
        rows: [
          ["Adults, full month", "Number of face-to-face visits in the month", "90960–90962"],
          ["Adults, partial month", "Per day, where the full month was not served", "90966, 90970"],
          ["Paediatric bands", "Age band, then visit count", "90951–90959"],
          ["Home dialysis, full month", "Age band", "90963–90966"],
        ],
      },
    },
    {
      heading: "Partial months are the recurring error",
      body: [
        "A patient does not always receive a full month of outpatient dialysis management from one physician. They may be admitted to hospital, start dialysis mid-month, transfer to another practice, receive a transplant, or die.",
        "In those cases the full-month code is not correct, and the per-day codes apply for the portion actually served. Billing a full month when the patient was hospitalised for two weeks of it overstates the service, and it is detectable by comparing claims against facility treatment records.",
        "The inverse error is more common and costs the practice: billing per-day for a month that was, in fact, complete, or failing to bill the transitional period at all because it did not fit the usual pattern.",
        "The control is a monthly reconciliation against the dialysis facility's treatment log, which records exactly which days the patient dialysed and where. That log is the evidence for the code selected, and it exists whether or not the practice uses it.",
      ],
    },
    {
      heading: "The visit count has to be documented as face-to-face",
      body: [
        "For adult patients, the difference between the one-visit code, the two-to-three code and the four-or-more code is meaningful revenue, and it turns on documented face-to-face visits with the physician or qualified professional during the month.",
        "Reviewing a patient's laboratory results, adjusting their prescription remotely, or speaking to the facility about them is management work — it is inside the capitation payment, and it does not count toward the visit tally. Only face-to-face encounters do.",
        "The documentation therefore has to make the face-to-face nature explicit and dated. A monthly summary note describing management over the period does not establish how many visits occurred. Individual dated encounter notes do.",
        "This is one of the more straightforward under-billing patterns to correct, because the visits are usually happening — nephrologists round in dialysis units regularly — and simply are not documented in a form that supports the higher code.",
      ],
    },
    {
      heading: "What falls outside the capitation payment",
      body: [
        "The monthly payment covers outpatient dialysis-related physician services. A substantial amount of nephrology work is not that, and is separately billable.",
      ],
      list: [
        "Vascular access procedures — creation, revision, declotting and imaging of access sites",
        "Inpatient care during a hospital admission, which is billed under inpatient rules",
        "Evaluation and management of conditions unrelated to the renal disease",
        "Transplant evaluation and related services",
        "Consultations requested by other physicians for non-dialysis questions",
        "Chronic kidney disease management for patients not yet on dialysis, which is billed conventionally",
      ],
    },
    {
      heading: "Access procedures are a distinct billing discipline",
      body: [
        "Vascular access is where nephrology's procedural revenue concentrates, and it follows ordinary surgical billing rules rather than the capitation model. Creation of a fistula or graft, revision, thrombectomy, angioplasty and stent placement each have their own codes and their own bundling relationships.",
        "The recurring issue is the same one that affects every proceduralist: diagnostic imaging performed as part of gaining access to perform an intervention is generally included in the intervention. Billing a diagnostic study alongside the therapeutic procedure it enabled triggers an edit.",
        "Where a genuinely diagnostic study leads to a decision not to intervene, or where the imaging is of a separate site, separate billing is supportable — and the note has to establish the sequence rather than the modifier assert it.",
        "Because access procedures carry meaningful claim values and are frequently repeated on the same patient, laterality and site documentation matter more than usual. A second procedure on the same patient without site specificity adjudicates as a duplicate.",
      ],
    },
    {
      heading: "Why the model rewards reconciliation over denial work",
      body: [
        "Nephrology's dialysis revenue is unusual in being predictable. The patient population is known, the treatment schedule is known, and the monthly codes are known. That makes the whole thing reconcilable in a way most specialties are not.",
        "A monthly comparison of patients dialysed against monthly capitation claims submitted will find every missed month, every partial month billed as full, and every full month billed as partial. It takes an hour and it finds errors that would never appear as denials, because a month never billed produces no remittance at all.",
        "Optum's analysis of 124 million claim remits found 84% of denials potentially avoidable. In this service line the more relevant category is claims never submitted, which no denial report will surface. The facility treatment log is the check, and it is already being produced.",
      ],
    },
  ],
  faq: [
    {
      question: "How is dialysis physician management billed?",
      answer:
        "Through a monthly capitation payment covering all outpatient dialysis-related physician services for the month, rather than per visit. The code is selected by the patient's age band and, for adults, by the number of face-to-face visits provided during the month. Office visits billed alongside it deny, because that work is already included.",
    },
    {
      question: "What happens when a patient is hospitalised mid-month?",
      answer:
        "The full-month code no longer applies for that period. Per-day codes cover the portion actually served in the outpatient setting, and inpatient care is billed under inpatient rules. Billing a full month when the patient was hospitalised for part of it overstates the service and is detectable against facility treatment records.",
    },
    {
      question: "Do phone calls and lab reviews count toward the visit tally?",
      answer:
        "No. Only face-to-face encounters count toward the visit count that selects the adult code. Reviewing results, adjusting the prescription remotely and speaking with the facility are management work already inside the capitation payment. Individual dated encounter notes are what establish the count.",
    },
    {
      question: "What nephrology services are billed outside the monthly payment?",
      answer:
        "Vascular access procedures, inpatient care, evaluation and management of unrelated conditions, transplant evaluation, consultations on non-dialysis questions, and chronic kidney disease management for patients not yet on dialysis.",
    },
    {
      question: "Can diagnostic imaging be billed with a vascular access intervention?",
      answer:
        "Generally not when the imaging was performed to gain access for the intervention — that is included. Where a genuinely diagnostic study led to a decision not to intervene, or imaged a separate site, separate billing is supportable, but the note has to establish the sequence rather than a modifier assert it.",
    },
  ],
  relatedServices: ["medical-coding", "claims-management", "practice-analytics"],
  relatedSpecialties: ["nephrology"],
};

export default post;
