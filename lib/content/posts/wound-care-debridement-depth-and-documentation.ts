import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "wound-care-debridement-depth-and-documentation",
  title: "Wound care billing: debridement by depth and area, and the measurements that prove it",
  excerpt:
    "Debridement codes are selected by the deepest tissue removed and the surface area treated. Both are numbers, and a note without them selects the lowest-paying code by default.",
  category: "Specialty Billing",
  published: "2026-08-25",
  updated: "2026-08-25",
  readingMinutes: 8,
  answer:
    "Surgical debridement is coded by the deepest tissue level actually removed — subcutaneous, muscle and fascia, or bone — and by the total surface area debrided, with add-on codes for area beyond the first 20 square centimetres. Selective debridement without instrumentation is a different code family entirely. The operative note must record both the depth and the measured area.",
  sections: [
    {
      heading: "Depth is what was removed, not what was exposed",
      body: [
        "Debridement codes are ranked by the deepest tissue level actually removed during the procedure. This is a precise distinction and it is the one most often coded incorrectly.",
        "A wound extending to bone that is debrided of devitalised subcutaneous tissue is a subcutaneous debridement. The bone was visible, it was involved in the wound, and it was not removed — so the code follows what was excised rather than what the wound reached.",
        "Coding by wound depth rather than debridement depth systematically overbills, and it is detectable by comparing operative notes against codes submitted. Coding by the least significant tissue removed underbills. Both errors come from the same source: a note that describes the wound thoroughly and the procedure vaguely.",
      ],
      table: {
        headers: ["Deepest tissue removed", "Base code", "Add-on for additional area"],
        rows: [
          ["Subcutaneous tissue", "11042", "11045 — each additional 20 sq cm"],
          ["Muscle and/or fascia", "11043", "11046 — each additional 20 sq cm"],
          ["Bone", "11044", "11047 — each additional 20 sq cm"],
          ["Selective, without anaesthesia or instrumentation", "97597, 97598", "97598 — each additional 20 sq cm"],
        ],
      },
    },
    {
      heading: "Area is measured, and it accumulates across wounds at the same depth",
      body: [
        "The base codes cover the first 20 square centimetres of surface area debrided. Beyond that, add-on codes report each additional 20 square centimetres or part thereof.",
        "Where several wounds are debrided in the same session, areas are summed for wounds debrided to the same depth. Two wounds each debrided to subcutaneous tissue combine into a single total area for code selection — they are not reported as two separate base codes.",
        "Wounds debrided to different depths are reported separately, each with its own base code and its own accumulated area at that depth. This is the rule that most often produces both under-billing and over-billing in the same practice, depending on which way the assumption ran.",
        "None of this works without measurements. Length and width in centimetres for each wound, recorded at the time, is what makes the area calculation possible and defensible. A note describing a large wound supports nothing arithmetic.",
      ],
      list: [
        "Measure each wound in centimetres before debriding and record it",
        "State the deepest tissue actually removed, using the anatomical term",
        "Sum areas across wounds debrided to the same depth; report different depths separately",
        "Record the instrument or method used, which distinguishes surgical from selective debridement",
        "Document the tissue removed as devitalised, since debridement of viable tissue is a different service",
        "Re-measure at each encounter — progress or its absence drives continued coverage",
      ],
    },
    {
      heading: "Selective debridement is a different service entirely",
      body: [
        "Removal of devitalised tissue without anaesthesia and without cutting instrumentation — using forceps, scissors for loose tissue, high-pressure irrigation or enzymatic and autolytic methods — falls into a separate code family from surgical debridement.",
        "These codes also carry an area component with the same 20 square centimetre structure, but they are not interchangeable with the surgical codes and they pay differently.",
        "The distinguishing factor is what was done, and the note has to make it evident. A note stating that the wound was debrided, without saying how, does not distinguish between the two families, and a coder faced with that ambiguity has to choose the more conservative option.",
        "This is a case where a single sentence in the procedure note — naming the instrument and whether anaesthesia was used — determines which code family applies and therefore what the encounter is worth.",
      ],
    },
    {
      heading: "Skin substitutes carry their own coverage architecture",
      body: [
        "Cellular and tissue-based products are among the more tightly managed items in wound care. Coverage generally requires a documented wound type and duration, documented failure of standard care over a defined period, and adequate vascular supply — each stated in the payer's medical policy.",
        "The application procedure and the product itself are separate charges. Application codes are selected by anatomic site and by the surface area treated; the product is reported in units of the code's stated measure, with wastage reportable where the payer permits and the discarded amount documented.",
        "Payers commonly limit the number of applications they will cover per wound per episode, and exceeding that limit denies on frequency regardless of clinical justification.",
        "The failure that costs most is starting a course of treatment before confirming coverage criteria are documented. These products carry high per-application costs, and a practice that applies one to a wound whose four-week trial of standard care was never recorded has purchased an expensive product it cannot bill.",
      ],
    },
    {
      heading: "Continued coverage depends on documented progress",
      body: [
        "Wound care is a course of treatment rather than an episode, and payers expect measurable improvement over time. Where a wound is not progressing, coverage for continued treatment of the same kind becomes questionable, and payers apply that scrutiny at defined intervals.",
        "The documentation that satisfies it is serial measurement. Length, width and depth recorded at each visit, producing a trend, is what demonstrates either progress or a reasoned change in approach when progress stalls.",
        "Where a wound is genuinely not improving, the record should show the reassessment and the change in plan rather than an unchanged course continuing indefinitely. That is better clinical practice and it is also what distinguishes ongoing active treatment from maintenance in the payer's eyes.",
        "Optum's analysis of 124 million claim remits found 84% of denials potentially avoidable, with 22% unrecoverable once they occur. Wound care sits high on both counts, because the evidence an appeal would need — the measurements, the depth, the failed standard care — either exists in the record from the day of service or does not exist at all.",
      ],
    },
  ],
  faq: [
    {
      question: "How is debridement depth determined for coding?",
      answer:
        "By the deepest tissue actually removed, not the depth the wound reaches. A wound extending to bone that is debrided only of devitalised subcutaneous tissue is a subcutaneous debridement. Coding by wound depth rather than debridement depth systematically overbills and is detectable by comparing notes against codes submitted.",
    },
    {
      question: "How is surface area calculated for multiple wounds?",
      answer:
        "Areas are summed across wounds debrided to the same depth, producing one total for code selection with add-ons for each additional 20 square centimetres. Wounds debrided to different depths are reported separately, each with its own base code and its own accumulated area at that depth.",
    },
    {
      question: "What is the difference between surgical and selective debridement?",
      answer:
        "Surgical debridement uses cutting instrumentation and typically anaesthesia. Selective debridement removes devitalised tissue without either — forceps, scissors for loose tissue, high-pressure irrigation, or enzymatic and autolytic methods. They are separate code families that pay differently, and the note must name the method used to distinguish them.",
    },
    {
      question: "What is required for skin substitute coverage?",
      answer:
        "Typically a documented wound type and duration, documented failure of standard care over a defined period, and adequate vascular supply — each stated in the payer's medical policy. Payers also limit applications per wound per episode. Starting a course before confirming those criteria are documented means buying an expensive product that cannot be billed.",
    },
    {
      question: "Why do wound care claims deny after several visits?",
      answer:
        "Because payers expect measurable improvement and apply scrutiny at intervals. Serial measurements at each visit produce the trend that demonstrates progress. Where a wound is not improving, the record should show a reassessment and a changed plan rather than an unchanged course continuing indefinitely.",
    },
  ],
  relatedServices: ["medical-coding", "denial-management", "prior-authorization"],
  relatedSpecialties: ["wound-care"],
};

export default post;
