import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "chiropractic-billing-at-modifier-and-maintenance",
  title: "Chiropractic billing: active treatment, the AT modifier and maintenance care",
  metaTitle: "Chiropractic billing: the AT modifier",
  excerpt:
    "Medicare covers exactly one chiropractic service, and only while the patient is improving. Everything else in the practice is the patient's own cost — which makes the conversation as important as the coding.",
  category: "Specialty Billing",
  published: "2026-08-25",
  updated: "2026-08-25",
  readingMinutes: 8,
  answer:
    "Medicare covers manual manipulation of the spine to correct a subluxation, and nothing else a chiropractor does. Coverage continues only while care is active treatment producing improvement, identified by the AT modifier. Once care becomes maintenance, it is not covered — and billing it without an Advance Beneficiary Notice makes it unbillable to anyone.",
  sections: [
    {
      heading: "The covered benefit is narrower than most practices assume",
      body: [
        "Medicare's chiropractic benefit covers manual manipulation of the spine to correct a subluxation. That is the entire covered service. Examinations, radiographs, physical therapy modalities, massage, supports and nutritional counselling performed in a chiropractic office are all excluded, regardless of clinical value.",
        "This surprises patients constantly, because they have Medicare, they are attending a chiropractor, and they reasonably assume their care is covered. The gap between what they expect and what is covered is the source of nearly every billing dispute in the specialty.",
        "The three spinal manipulation codes are distinguished by how many spinal regions were treated. Selecting among them is straightforward; the difficulty lies entirely in whether the service is covered at all.",
      ],
      table: {
        headers: ["Service", "Codes", "Medicare coverage"],
        rows: [
          ["Spinal manipulation, 1–2 regions", "98940", "Covered with AT modifier during active treatment"],
          ["Spinal manipulation, 3–4 regions", "98941", "Covered with AT modifier during active treatment"],
          ["Spinal manipulation, 5 regions", "98942", "Covered with AT modifier during active treatment"],
          ["Extraspinal manipulation", "98943", "Not covered"],
          ["Radiographs, examinations, modalities", "Various", "Not covered when performed by a chiropractor"],
        ],
      },
    },
    {
      heading: "The AT modifier separates active treatment from maintenance",
      body: [
        "The AT modifier identifies that the manipulation was active treatment — care intended to produce functional improvement in an acute or chronic condition, where improvement is expected and occurring.",
        "Maintenance therapy is care intended to preserve a level of function rather than improve it. It is legitimate clinical practice and it is not a Medicare benefit. Appending AT to maintenance care misrepresents the service, and this is a well-known enforcement area rather than a theoretical risk.",
        "The distinction is clinical and it has to be visible in the record. A treatment plan stating the functional goal, objective measures at the outset, and documented progress against them is what establishes active treatment. A note recording that the patient was adjusted and felt better does not.",
        "The uncomfortable part is that active treatment ends. A patient who has reached maximum therapeutic benefit is no longer receiving covered care even if they are still benefiting from attending, and continuing to bill with AT because the patient values the treatment is the error the enforcement actions describe.",
      ],
    },
    {
      heading: "The ABN is what makes non-covered care billable",
      body: [
        "When care transitions to maintenance, or when a non-covered service is provided, an Advance Beneficiary Notice signed before the service transfers financial responsibility to the patient. Without one, the balance cannot be billed to the patient and cannot be collected from Medicare either.",
        "The requirements are specific and routinely missed. The notice must identify the specific service, state the specific reason Medicare is expected not to pay, give an estimated cost, and be signed with an option selected. A single ABN signed at the first visit covering all future care is not valid — CMS treats routine blanket issuance as no issuance.",
        "For an ongoing course of care this means the ABN has to be revisited when the situation changes, most importantly at the transition from active treatment to maintenance. That transition is a clinical judgement the practice makes, and the paperwork should follow it on the same day rather than months later.",
        "Where a claim is submitted for a service the practice knows is not covered, in order to obtain a denial the patient can use with a secondary payer, the GA modifier indicates that an ABN is on file. Getting that modifier right is what preserves the ability to bill.",
      ],
      list: [
        "Issue the ABN before the service, never after",
        "Name the specific service and the specific reason non-coverage is expected",
        "Include an estimated cost and obtain a signature with an option selected",
        "Re-issue when care transitions from active treatment to maintenance",
        "Use GA where an ABN is on file and a denial is expected",
        "Do not issue routinely to every patient at intake — blanket notices are invalid",
      ],
    },
    {
      heading: "Commercial plans have their own limits",
      body: [
        "Commercial coverage for chiropractic care is generally broader than Medicare's but is capped, usually by visit count per plan year and sometimes by dollar amount.",
        "Two details cause most of the avoidable loss. Caps count visits used anywhere, so a patient who saw another chiropractor earlier in the year arrives with fewer visits remaining than either party realises. And caps are usually per plan year rather than per episode, so a course of care spanning a year boundary behaves differently at each end.",
        "Because the remaining benefit is available in the eligibility response for most payers, this is a counting problem rather than an information problem. A practice that checks remaining visits at intake and tracks them through the course converts an eventual denial into a financial conversation held at the right moment.",
        "Many commercial plans also require prior authorisation after a threshold number of visits, with continued care contingent on documented functional progress. That requirement rewards exactly the documentation that Medicare's active treatment standard requires, which means one discipline serves both.",
      ],
    },
    {
      heading: "The documentation that serves every purpose",
      body: [
        "Chiropractic billing has an unusually clean answer, and it is a treatment plan with measurable goals. That single artefact satisfies the Medicare active-treatment standard, supports commercial authorisation requests, establishes when maintenance begins, and gives the patient a clear account of what care is intended to achieve.",
        "What it needs is objective rather than subjective content: the initial functional measures, the specific goals, the expected duration and frequency, and periodic re-measurement against the baseline. Pain scales alone are weak; functional measures — what the patient can do that they could not — are strong.",
        "The moment that measurement plateaus is the moment active treatment has ended, which the plan makes visible rather than leaving to judgement in hindsight.",
        "Premier Inc. puts the average administrative cost of fighting a denied claim at $57.23. Against chiropractic per-visit values that is often more than the claim is worth, which removes appeals as a realistic strategy and leaves documentation and the patient conversation as the whole of the revenue cycle.",
      ],
    },
  ],
  faq: [
    {
      question: "What does Medicare cover for chiropractic care?",
      answer:
        "Manual manipulation of the spine to correct a subluxation, and nothing else. Examinations, radiographs, physical therapy modalities, massage and supports are excluded when performed by a chiropractor, regardless of clinical value. Extraspinal manipulation is also not covered.",
    },
    {
      question: "What does the AT modifier mean?",
      answer:
        "That the manipulation was active treatment — care intended to produce functional improvement, where improvement is expected and occurring. Maintenance therapy, intended to preserve function rather than improve it, is not a Medicare benefit. Appending AT to maintenance care misrepresents the service and is a known enforcement area.",
    },
    {
      question: "When does care become maintenance?",
      answer:
        "When the patient has reached maximum therapeutic benefit and further care preserves rather than improves function. A treatment plan with objective functional measures makes that point visible when it arrives. Continuing to bill with AT because the patient still values the treatment is the specific error enforcement actions describe.",
    },
    {
      question: "How does an ABN work for chiropractic patients?",
      answer:
        "Signed before the service, it transfers financial responsibility to the patient for non-covered care. It must name the specific service, the specific reason non-coverage is expected, and an estimated cost, and be signed with an option selected. A single notice signed at intake covering all future care is invalid — it must be re-issued when care transitions to maintenance.",
    },
    {
      question: "How do commercial chiropractic caps work?",
      answer:
        "Usually a visit count per plan year, sometimes with a dollar limit. Visits used at other providers count toward the same cap, and caps run per plan year rather than per episode. The remaining benefit is available in the eligibility response for most payers, which makes this a counting problem rather than an information problem.",
    },
  ],
  sources: ["medicare-benefit-policy-manual", "abn-forms", "medicare-coverage-database"],
  relatedServices: ["eligibility-verification", "medical-coding", "patient-collections"],
  relatedSpecialties: ["chiropractic"],
};

export default post;
