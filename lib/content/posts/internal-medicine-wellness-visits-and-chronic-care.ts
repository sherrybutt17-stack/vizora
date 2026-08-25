import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "internal-medicine-wellness-visits-and-chronic-care",
  title: "Internal medicine billing: wellness visits, chronic care and E/M selection",
  excerpt:
    "Medicare does not cover an annual physical. It covers something adjacent with a different name, different content and different codes — and the confusion between them is expensive.",
  category: "Specialty Billing",
  published: "2026-08-25",
  updated: "2026-08-25",
  readingMinutes: 9,
  answer:
    "Medicare covers an Annual Wellness Visit, not an annual physical examination. They are different services with different required elements, and billing a commercial-style preventive code to Medicare produces a correct denial. Separately, office visit levels have been selected by medical decision-making or total time since 2021, which retired the history and examination bullet counts most practices were built around.",
  sections: [
    {
      heading: "The Annual Wellness Visit is not a physical",
      body: [
        "This is the single most consequential misunderstanding in adult primary care billing. Medicare has never covered a routine annual physical examination — it is excluded. What it covers is a distinct preventive service with defined required elements, none of which is a head-to-toe examination.",
        "The confusion is understandable because patients call it their annual physical, staff schedule it as an annual physical, and the visit feels like one. But the service Medicare pays for is a structured review: health risk assessment, a list of current providers and suppliers, measurement of routine vitals, detection of cognitive impairment, review of functional ability and safety, establishment of a screening schedule, and personalised health advice.",
        "A visit performed as a physical examination and billed as an Annual Wellness Visit fails on documentation if reviewed, because the required elements are not in the note. A visit performed correctly and billed with a commercial preventive code denies, because that code is for a service Medicare does not cover.",
      ],
      table: {
        headers: ["Service", "Codes", "When"],
        rows: [
          ["Initial Preventive Physical Examination", "G0402", "Once, within 12 months of Part B enrolment"],
          ["Initial Annual Wellness Visit", "G0438", "Once per lifetime, after the first 12 months"],
          ["Subsequent Annual Wellness Visit", "G0439", "Annually thereafter"],
          ["Commercial preventive visit", "99381–99397", "Commercial plans — by age and new or established"],
        ],
      },
    },
    {
      heading: "A problem addressed during a wellness visit is separately billable",
      body: [
        "Wellness visits surface problems. A blood pressure reading is high, a medication needs adjusting, a new symptom emerges during the risk assessment. Evaluating any of those is not part of the wellness visit's defined content.",
        "Where a significant, separately identifiable problem is addressed, the office visit is reported alongside the wellness visit with modifier 25. Both are payable, and folding the problem work into the wellness visit gives it away.",
        "One consequence has to be communicated before the visit rather than discovered afterwards. The wellness visit itself carries no patient cost-sharing. The problem-oriented visit does. A patient who came in for a free annual check and receives a bill will assume an error was made, and explaining it after the fact is far harder than mentioning it at check-in.",
        "Practices sometimes respond by never billing the problem visit, which is generous and unsustainable. The better answer is a scheduling and check-in script that sets the expectation plainly.",
      ],
    },
    {
      heading: "Office visit levels are chosen by decision-making or time",
      body: [
        "The 2021 revision to office and outpatient evaluation and management codes changed the basis of selection. History and examination are still performed and documented as clinically appropriate, but they no longer determine the level. Selection is by medical decision-making or by total time on the date of the encounter.",
        "Practices whose documentation habits were built around bullet counting frequently under-code after this change, because notes optimised to satisfy an examination requirement do not necessarily articulate the complexity that now drives the level.",
        "Medical decision-making is assessed across three elements: the number and complexity of problems addressed, the amount and complexity of data reviewed, and the risk of complications from management. Two of the three at a given level determine it.",
        "Time is the alternative, and it is broader than it used to be. Total time on the date of service includes non-face-to-face work — reviewing records beforehand, ordering, documenting, and coordinating care — not only the time in the room. For a complex patient whose visit involves substantial record review, time frequently supports a higher level than the face-to-face encounter alone would suggest.",
      ],
      list: [
        "Document the problems addressed and their status, since problem complexity is a decision-making element",
        "Record what data was reviewed and interpreted, not merely that tests were ordered",
        "State the risk considerations behind management decisions, including medications and their monitoring",
        "Where billing on time, record total time on the date of service and what it comprised",
        "Do not count time twice — time used to select a visit level cannot also support a separate time-based service",
      ],
    },
    {
      heading: "Chronic care management is billable and mostly unbilled",
      body: [
        "Patients with multiple chronic conditions generate substantial work between visits: reviewing results, coordinating with specialists, adjusting medications, responding to messages. Chronic care management codes pay for that work, and most eligible practices do not bill them.",
        "The requirements are specific rather than difficult. The patient must have two or more chronic conditions expected to last at least a year or until death, placing them at significant risk. A comprehensive care plan must exist and be available to the care team. The patient must consent, and be told about cost-sharing. And the time must be tracked.",
        "The tracking requirement is what stops most practices, because the work is genuinely being done and simply is not being timed. A system that logs clinical staff time against the patient during the month converts existing effort into billable service without changing the care at all.",
        "Related time-based services follow similar logic. Transitional care management covers the period after a discharge and requires contact within a defined window and a face-to-face visit within another. Both windows are short and both are missed by practices that do not know a patient was discharged — which makes discharge notification the actual bottleneck rather than the billing.",
      ],
    },
    {
      heading: "Preventive and problem visits collide constantly",
      body: [
        "The tension in this specialty is that almost every preventive encounter contains problem-oriented work, and almost every problem visit touches on prevention. The billing rules require them to be separated, and clinical practice does not naturally separate them.",
        "The workable discipline is documentary rather than clinical. The physician provides whatever care the patient needs; the note distinguishes the preventive content from the problem-oriented content clearly enough that a coder — and, later, a reviewer — can see both.",
        "Where that separation is present, billing both with modifier 25 is straightforward and defensible. Where the note is a single narrative covering everything, only one service is supportable, and it will usually be the lower-paying one.",
      ],
    },
    {
      heading: "What this adds up to",
      body: [
        "Internal medicine's revenue risk is weighted toward under-billing rather than denial. An Annual Wellness Visit billed without the problem visit it contained produces no denial. A visit under-coded because the note documents an examination rather than the decision-making produces no denial. Chronic care management never billed produces no denial. None of it appears on a remittance as something to work.",
        "Optum's analysis of 124 million claim remits found 84% of denials potentially avoidable, and that figure is worth knowing. But the more useful number in this specialty is the gap between what was done and what was charged, which no remittance reports.",
        "Finding it requires looking at the encounters rather than the denials: a sample of wellness visits checked for unbilled problem work, a sample of office visits checked against the decision-making documented, and a count of patients who meet chronic care management criteria against those actually enrolled.",
      ],
    },
  ],
  faq: [
    {
      question: "Does Medicare cover an annual physical?",
      answer:
        "No. A routine annual physical examination is excluded. Medicare covers the Annual Wellness Visit, a distinct service with defined elements — health risk assessment, provider list, routine vitals, cognitive impairment detection, functional review, screening schedule and personalised advice. It does not include a head-to-toe examination, and billing a commercial preventive code to Medicare denies correctly.",
    },
    {
      question: "Can an office visit be billed with an Annual Wellness Visit?",
      answer:
        "Yes, when a significant, separately identifiable problem was addressed, with modifier 25 on the problem-oriented visit. Note that the wellness visit carries no patient cost-sharing while the problem visit does — telling the patient at check-in rather than by statement afterwards prevents most disputes.",
    },
    {
      question: "How are office visit levels selected since 2021?",
      answer:
        "By medical decision-making or by total time on the date of the encounter. History and examination are still performed and documented as clinically appropriate but no longer determine the level. Practices whose notes were built around bullet counting frequently under-code, because those notes do not articulate the complexity that now drives selection.",
    },
    {
      question: "What counts as total time for an office visit?",
      answer:
        "Total time on the date of service, including non-face-to-face work — reviewing records beforehand, ordering, documenting and coordinating care — not only time in the room. Time used to select a visit level cannot also support a separate time-based service.",
    },
    {
      question: "What is required to bill chronic care management?",
      answer:
        "Two or more chronic conditions expected to last at least a year or until death and placing the patient at significant risk, a comprehensive care plan available to the care team, documented patient consent including cost-sharing, and tracked time. The work is usually already happening — the tracking is what most practices lack.",
    },
  ],
  relatedServices: ["medical-coding", "practice-analytics", "claims-management"],
  relatedSpecialties: ["internal-medicine"],
};

export default post;
