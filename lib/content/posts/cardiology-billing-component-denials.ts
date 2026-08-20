import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "cardiology-billing-component-denials",
  title: "Cardiology billing: component splits, global periods and monitoring intervals",
  excerpt:
    "Three denial patterns account for most cardiology write-offs, and all three come from billing correct work under the wrong structure.",
  category: "Specialty Billing",
  published: "2026-08-21",
  updated: "2026-08-21",
  readingMinutes: 8,
  answer:
    "Most cardiology denials are structural rather than clinical. Diagnostic studies split into professional and technical components that must be billed with modifier 26 or TC depending on where the work was done, interventional procedures carry global periods that bundle subsequent visits, and remote monitoring codes cannot be submitted before their required interval has fully elapsed.",
  sections: [
    {
      heading: "Component billing is where the money goes first",
      body: [
        "Diagnostic cardiology studies have two halves. The technical component is the equipment, the supplies and the staff time to acquire the study. The professional component is the physician's interpretation and written report. Whether you bill one, the other, or both depends entirely on what your practice actually performed and who owns the equipment.",
        "Bill globally — no modifier — only when the practice performed both halves. Append modifier TC when you acquired the study but someone else interpreted it. Append modifier 26 when you interpreted a study acquired elsewhere, which is the common case for hospital-based reads.",
        "The expensive error is billing globally by default. A cardiologist reading a study performed at the hospital who bills without modifier 26 has claimed the technical component too, and the hospital has already billed it. The claim denies as a duplicate, or worse, pays and is recouped later.",
      ],
      table: {
        headers: ["Study", "Global", "Professional only", "Technical only"],
        rows: [
          ["Transthoracic echo, complete with Doppler", "93306", "93306-26", "93306-TC"],
          ["Transthoracic echo, complete without Doppler", "93307", "93307-26", "93307-TC"],
          ["Transthoracic echo, limited or follow-up", "93308", "93308-26", "93308-TC"],
          ["Cardiovascular stress test", "93015", "93018 (interpretation and report)", "93017 (tracing only)"],
          ["Stress test, supervision only", "—", "93016", "—"],
        ],
      },
    },
    {
      heading: "The stress test family is not a modifier situation",
      body: [
        "Stress testing is the exception that catches people who have learned the 26/TC rule and apply it everywhere. The components are not modifiers here; they are separate codes.",
        "93015 is the complete service. Where the work is split, 93016 covers physician supervision, 93017 covers the tracing only, and 93018 covers interpretation and report only. Appending modifier 26 to 93015 is not the correct way to bill a physician-only stress test, and payers reject it.",
        "The practical control is knowing, per location, which half of each study your practice actually performs. That is a configuration question answered once per site and per payer contract, not a decision a coder should be making claim by claim from the note.",
      ],
    },
    {
      heading: "Global periods bundle the visits nobody expects",
      body: [
        "Interventional cardiology procedures carry global periods, and during that window related evaluation and management services are included in the procedure's payment rather than separately billable.",
        "This produces a denial pattern that reads as a coding error but is really a modifier omission. A patient returns during the global period, is genuinely seen, and the visit is billed without establishing why it falls outside the package. The payer bundles it, correctly, and the practice writes off work that was performed.",
        "Three modifiers carry almost all of this. Modifier 25 identifies a significant, separately identifiable evaluation on the same day as a procedure. Modifier 24 identifies an unrelated evaluation during another procedure's postoperative period. Modifier 57 identifies the visit at which the decision for a major procedure was made. Each asserts a different exception, and substituting one for another denies as reliably as omitting all three.",
        "Cardiology is unusually exposed because patients are managed continuously. A cardiology patient does not have one episode and disappear; they return for medication management, for an unrelated arrhythmia, for a chronic condition entirely separate from the stent placed six weeks ago. Every one of those visits sits inside somebody's global period.",
      ],
    },
    {
      heading: "Remote monitoring codes are calendar arithmetic",
      body: [
        "Remote cardiac monitoring is billed per interval, and the interval must have fully elapsed before the code is submitted. This is the most mechanical denial category in the specialty and the easiest to eliminate.",
        "Remote interrogation of an implanted pacemaker or defibrillator covers a period of up to 90 days. Remote monitoring of physiologic cardiovascular data from an implantable cardiovascular monitor covers up to 30 days. Submitting on day 82 of a 90-day interval denies, and resubmitting on day 91 frequently denies again because the payer now has a prior claim on file for the same period.",
      ],
      list: [
        "Record the interval start date at device enrollment, not at the first transmission received",
        "Bill from a scheduled report driven by that date rather than from transmissions arriving in the inbox",
        "Confirm the interval length for the specific device category — 30 and 90 days are not interchangeable",
        "Check that the required number of transmissions occurred within the interval, not merely that time passed",
        "Track technician review time separately where the code requires it to be documented",
        "Never resubmit a rejected interval claim without first confirming no prior claim exists for that period",
      ],
    },
    {
      heading: "Prior authorization rules differ by payer for the same procedure",
      body: [
        "Advanced cardiac imaging and interventional procedures frequently require prior authorization, and the requirement is set per payer and per plan rather than by the procedure itself. The same CPT code can require authorization under one plan and not another from the same carrier.",
        "That variability is why a practice-wide rule of thumb fails. Staff learn that a given study needs authorization, apply it consistently, and are correct most of the time — which means the failures are rare, unpredictable and discovered only after the service has been delivered and the authorization can no longer be obtained.",
        "The workable control is checking the requirement against the specific plan at scheduling, when the appointment can still be moved, rather than relying on institutional memory. Registration and eligibility errors are already the largest denial category industry-wide at 24.3%, and authorization sits close behind at 12.8% — in a specialty running high-value procedures, those percentages attach to unusually large claims.",
      ],
    },
    {
      heading: "Why cardiology denials are always worth working",
      body: [
        "Premier Inc. measures the average administrative cost of fighting a denied claim at $57.23, and roughly 70% of denied claims are eventually overturned and paid. In lower-value specialties that arithmetic makes some denials uneconomic to pursue. In cardiology it almost never does.",
        "A denied interventional claim or advanced imaging study is worth multiples of the cost to appeal it, which means the correct policy is to work essentially all of them. Practices that write off cardiology denials are usually doing so for capacity reasons rather than economic ones — the claims are worth pursuing and nobody has the hours.",
        "The larger opportunity is still prevention. Optum's analysis of 124 million claim remits found 84% of denials are potentially avoidable, and 22% of those are not recoverable at all once they occur. Component splits, global-period modifiers and monitoring intervals are all determined before submission, which puts them squarely in the avoidable category — and the 22% figure is the reminder that appealing is a worse strategy than not being denied.",
      ],
    },
  ],
  faq: [
    {
      question: "When should modifier 26 be used in cardiology billing?",
      answer:
        "When the practice interpreted a diagnostic study that was acquired somewhere else — the common case for hospital-based reads. Modifier TC is the reverse, covering acquisition without interpretation, and no modifier at all is correct only when the practice performed both halves. Billing globally by default duplicates a technical component the facility has already billed.",
    },
    {
      question: "Can modifier 26 be appended to a stress test code?",
      answer:
        "No, and this is a common error. The stress test family splits into separate codes rather than modifiers: 93015 is the complete service, 93016 is supervision only, 93017 is the tracing only, and 93018 is interpretation and report only. Payers reject 93015-26, so a physician-only stress test must be billed with the correct component code instead.",
    },
    {
      question: "Why do cardiology office visits deny after a procedure?",
      answer:
        "Because interventional procedures carry a global period during which related evaluation and management services are bundled into the procedure's payment. The visit must carry a modifier establishing the exception — 25 for a significant separately identifiable service the same day, 24 for an unrelated visit during the postoperative period, or 57 for the decision-for-surgery visit.",
    },
    {
      question: "Why do remote monitoring claims deny?",
      answer:
        "Almost always because the billing interval had not fully elapsed when the claim was submitted. Remote interrogation of a pacemaker or defibrillator covers up to 90 days and remote monitoring of an implantable cardiovascular monitor covers up to 30, and the two are not interchangeable. Billing should be driven from the enrollment date on a schedule, not from transmissions as they arrive.",
    },
    {
      question: "Are cardiology denials worth appealing?",
      answer:
        "Nearly always. Premier Inc. puts the average cost of working a denied claim at $57.23 while roughly 70% of denials are eventually overturned, and cardiology claim values are high enough that the economics favour appealing almost everything. Practices that write these off are usually constrained by staffing hours rather than by whether the appeal would pay for itself.",
    },
  ],
  relatedServices: ["medical-coding", "denial-management", "prior-authorization"],
  relatedSpecialties: ["cardiology"],
};

export default post;
