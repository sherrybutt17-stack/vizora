import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "family-medicine-em-and-preventive-denials",
  title: "Family medicine billing: E/M levels, wellness visits and care management",
  excerpt:
    "Primary care loses more revenue to undercoding than to denials, and the biggest single confusion is between a Medicare wellness visit and a physical.",
  category: "Specialty Billing",
  published: "2026-08-21",
  updated: "2026-08-21",
  readingMinutes: 8,
  answer:
    "Family medicine revenue turns on three things: selecting evaluation and management levels by medical decision making or total time rather than by habit, distinguishing a Medicare annual wellness visit from a routine physical Medicare does not cover, and meeting the specific documentation conditions attached to chronic and transitional care management codes.",
  sections: [
    {
      heading: "E/M levels are chosen two ways, and you pick whichever is better",
      body: [
        "Office visit levels are selected either by medical decision making or by total time spent on the date of the encounter. History and examination no longer drive level selection — they are performed and documented as clinically appropriate, but they do not determine the code.",
        "Both routes are available for every visit, and the correct approach is to use whichever supports the higher level. A visit with straightforward decision making that consumed forty minutes of the physician's day is a 99214 by time even though decision making alone would place it lower.",
      ],
      table: {
        headers: ["Code", "Medical decision making", "Total time on the date of encounter"],
        rows: [
          ["99212", "Straightforward", "10–19 minutes"],
          ["99213", "Low", "20–29 minutes"],
          ["99214", "Moderate", "30–39 minutes"],
          ["99215", "High", "40–54 minutes"],
        ],
      },
    },
    {
      heading: "Total time means more than the time in the room",
      body: [
        "Time-based selection counts the physician's total work on the date of the encounter, not the length of the face-to-face portion. That includes reviewing records beforehand, ordering tests, documenting in the chart, counselling the patient, coordinating care, and communicating results — provided it happened on the same calendar date.",
        "Most primary care practices undercount this substantially, because the number that feels defensible is the appointment length. A fifteen-minute visit that involved ten minutes of prior chart review and eight minutes of documentation afterwards is a thirty-three minute encounter, which is a 99214 by time.",
        "What the record has to show is the total, stated. A note that describes the visit without recording the time supports only the decision-making route. Documenting “total time on date of encounter: 34 minutes, including review of prior records, discussion of results and documentation” takes seconds and converts an unprovable level into a defensible one.",
      ],
    },
    {
      heading: "The annual wellness visit is not a physical, and Medicare pays for only one of them",
      body: [
        "This single distinction causes more primary care billing problems than any coding subtlety, because the patient, the schedule and often the clinician all use the word “physical.”",
        "Medicare does not cover routine physical examinations. It covers the Initial Preventive Physical Examination once in a lifetime within the first twelve months of Part B enrollment, then the Annual Wellness Visit thereafter. These are structured services built around a health risk assessment, a review of medical and family history, current providers and medications, routine measurements, cognitive assessment and a written personalised prevention plan. They do not require a head-to-toe examination.",
        "Commercial preventive medicine visits are a different service entirely and are covered by most commercial plans. A patient who books a “physical” under Medicare and receives one will generate a non-covered charge that falls to them, which produces exactly the complaint call that consumes an afternoon.",
      ],
      table: {
        headers: ["Service", "Code", "Frequency"],
        rows: [
          ["Initial Preventive Physical Examination", "G0402", "Once, within 12 months of Part B enrollment"],
          ["Annual Wellness Visit, initial", "G0438", "Once per lifetime, after the first 12 months"],
          ["Annual Wellness Visit, subsequent", "G0439", "Annually thereafter"],
          ["Commercial preventive medicine, established patient", "99391–99397", "Per plan, typically annually"],
        ],
      },
    },
    {
      heading: "A problem addressed during a wellness visit is separately billable",
      body: [
        "When a patient raises a genuine problem during a preventive or wellness visit and the clinician evaluates it, the problem-oriented evaluation may be reported alongside the preventive service with modifier 25 appended to the E/M code.",
        "Practices tend to err in both directions here, and both are costly. Some bill the additional E/M reflexively whenever any complaint is mentioned, which is not supportable — a passing mention that required no additional work is part of the preventive visit. Others never bill it at all, absorbing real diagnostic and management work into a preventive payment because the encounter was scheduled as a wellness visit.",
        "The test is whether the problem required work above and beyond the preventive service. Where it did, the record must show that separately: its own history, its own assessment, its own plan, distinguishable from the preventive documentation. Where it did not, it belongs to the wellness visit.",
      ],
    },
    {
      heading: "Care management codes deny on conditions, not on clinical merit",
      body: [
        "Chronic care management and transitional care management are among the better-paying primary care services and among the most consistently underbilled, because each carries specific conditions that are easy to miss and easy to fail to document.",
        "Chronic care management requires a patient with two or more chronic conditions expected to last at least twelve months or until death, documented patient consent, a comprehensive care plan, and a threshold of clinical staff time in the calendar month directed by the physician. The consent requirement is the one most often missing — the care was delivered, the time was spent, and there is no documented agreement on file.",
        "Transitional care management is governed by two clocks after discharge. Interactive contact with the patient or caregiver must occur within two business days, and a face-to-face visit must occur within fourteen days for moderate complexity or seven days for high complexity. Both are calendar requirements rather than clinical ones, and a discharge that arrives on a Friday afternoon frequently fails the first without anyone realising the window opened.",
        "The control for both is the same: track the dates outside the chart, on a list somebody owns, because a requirement measured in business days cannot be met by noticing it during the next appointment.",
      ],
    },
    {
      heading: "In primary care, undercoding costs more than denials",
      body: [
        "Family medicine sits at the opposite end of the risk profile from surgical specialties. Individual claim values are low, so Premier Inc.'s $57.23 average cost of fighting a denied claim frequently approaches the value of the claim itself — which means a meaningful share of primary care denials are genuinely uneconomic to appeal.",
        "That reframes where attention belongs. The recoverable money in primary care is not in the denial queue; it is in the visits that paid correctly at a level lower than the documentation supported. A practice systematically billing 99213 for encounters that met 99214 loses more revenue than its entire denial rate represents, and loses it silently, because every one of those claims paid.",
        "Optum's finding that 84% of denials are potentially avoidable applies with particular force here, because the front-end controls are cheap and the appeals are not. Get eligibility right, get the wellness visit category right, document total time, and the denials that remain are few enough to work properly.",
      ],
    },
  ],
  faq: [
    {
      question: "How are E/M levels selected now?",
      answer:
        "By either medical decision making or total time on the date of the encounter, whichever supports the higher level. History and examination are performed and documented as clinically appropriate but no longer determine the code. Both routes are available on every visit, so a straightforward but lengthy encounter can still reach 99214 on time alone.",
    },
    {
      question: "What counts toward total time for an office visit?",
      answer:
        "All physician work on the date of the encounter, not just the face-to-face portion — reviewing records beforehand, ordering tests, counselling, coordinating care, communicating results and documenting in the chart. Most practices undercount because the appointment length feels like the defensible number. The note must state the total for it to support the level.",
    },
    {
      question: "What is the difference between an annual wellness visit and a physical?",
      answer:
        "Medicare does not cover routine physical examinations. It covers the Annual Wellness Visit, a structured service built around a health risk assessment, history review, routine measurements, cognitive assessment and a written prevention plan — it does not require a head-to-toe exam. Commercial preventive medicine visits are a separate service covered by most commercial plans.",
    },
    {
      question: "Can a problem visit be billed on the same day as a wellness visit?",
      answer:
        "Yes, where the problem required work above and beyond the preventive service, using modifier 25 on the problem-oriented E/M code. The record must document the problem separately with its own history, assessment and plan. A passing mention that required no additional work is part of the preventive visit and is not separately billable.",
    },
    {
      question: "Why do chronic care management claims get denied?",
      answer:
        "Most commonly for missing documented patient consent. Chronic care management also requires two or more chronic conditions expected to last twelve months or until death, a comprehensive care plan, and a threshold of clinical staff time within the calendar month. The care is usually delivered correctly; what is missing is the documentation of a condition that had to be met beforehand.",
    },
  ],
  relatedServices: ["medical-coding", "medical-billing", "denial-management"],
  relatedSpecialties: ["family-medicine"],
};

export default post;
