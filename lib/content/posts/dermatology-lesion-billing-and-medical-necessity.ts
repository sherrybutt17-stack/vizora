import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "dermatology-lesion-billing-and-medical-necessity",
  title: "Dermatology billing: lesion measurement, pathology timing and cosmetic denials",
  excerpt:
    "Dermatology codes are selected on a measurement taken before the excision and a pathology result that arrives after it. That sequence causes most of the specialty's revenue loss.",
  category: "Specialty Billing",
  published: "2026-08-23",
  updated: "2026-08-23",
  readingMinutes: 9,
  answer:
    "Excision codes are chosen by excised diameter — the lesion's widest measurement plus the narrowest margin on each side — recorded before the tissue is removed. They are also chosen by whether the lesion was benign or malignant, which is not known until pathology returns. A practice that measures after excision or codes before pathology loses money on one and risks recoupment on the other.",
  sections: [
    {
      heading: "Excised diameter is not lesion diameter",
      body: [
        "Excision codes are ranked by size, and the size that selects the code is not the size of the lesion. It is the excised diameter: the greatest clinical diameter of the lesion plus the narrowest surgical margin, counted on both sides.",
        "A 1.0 cm lesion excised with 0.5 cm margins is a 2.0 cm excision, not a 1.0 cm one, and the difference crosses a code boundary. Coding from the lesion size alone systematically underpays, and it does so invisibly — the claim pays, just at the wrong level, so nothing surfaces as a denial to be investigated.",
        "Two rules make the measurement usable. It has to be taken before excision, because tissue contracts once removed and the specimen the pathologist measures is smaller than what was cut. And it has to be recorded in centimetres in the operative note, by the person who performed the excision, at the time.",
      ],
      list: [
        "Measure the lesion at its greatest clinical diameter before any incision",
        "Measure the narrowest margin planned on each side, and add both to the lesion diameter",
        "Record the arithmetic in the note: lesion 1.0 cm plus 0.5 cm margins equals 2.0 cm excised diameter",
        "Do not use the pathology report's specimen measurement to select the code — tissue shrinks",
        "Record the anatomic site precisely; excision codes are grouped by body area and the groups pay differently",
        "Where multiple lesions are excised, measure and document each one separately",
      ],
    },
    {
      heading: "The benign-or-malignant question is answered after the claim would otherwise go out",
      body: [
        "Excision codes fork on pathology. Benign lesion excision and malignant lesion excision are separate code families, and the malignant family pays substantially more for the same anatomic site and the same excised diameter.",
        "The problem is timing. The procedure happens on Monday, the practice would like to bill on Monday, and pathology returns on Thursday. Billing on Monday means guessing, and the two ways of guessing fail differently: coding everything benign gives away revenue on every malignancy, and coding by clinical suspicion produces claims that pathology later contradicts.",
        "The clean answer is holding lesion excision claims until pathology returns, and treating that hold as a normal part of the workflow rather than an exception. It costs a few days of days-in-A/R on a subset of claims and it removes an entire category of error.",
        "Where a claim has already gone out and pathology contradicts it, the correction is a corrected claim, not a quiet adjustment. A benign excision billed as malignant is an overpayment, and overpayments identified and not returned are a compliance exposure independent of any billing consideration.",
      ],
    },
    {
      heading: "Destruction, excision and biopsy are three different services",
      body: [
        "Dermatology has several ways to remove a lesion, each with its own code family, and the code follows the technique actually used rather than the outcome achieved. Destroying a lesion by cryotherapy is not an excision, however completely the lesion is gone.",
      ],
      table: {
        headers: ["Service", "Code family", "Selection driver"],
        rows: [
          ["Destruction of premalignant lesions", "17000, 17003, 17004", "Lesion count — first, each additional, or 15 or more"],
          ["Destruction of benign lesions", "17110, 17111", "Lesion count — up to 14, or 15 and over"],
          ["Destruction of malignant lesions", "17260 series", "Anatomic site and lesion diameter"],
          ["Skin biopsy", "11102–11107", "Technique — tangential, punch or incisional — plus first or additional"],
          ["Excision, benign", "114xx series", "Anatomic site and excised diameter"],
          ["Excision, malignant", "116xx series", "Anatomic site and excised diameter"],
        ],
      },
    },
    {
      heading: "Biopsy codes are chosen by technique, and the first one is priced differently",
      body: [
        "The biopsy codes are structured around how the tissue was obtained rather than what was biopsied. Tangential, punch and incisional biopsies each have their own base code, and each has an add-on code for additional lesions sampled in the same session.",
        "The billing rule that follows is easy to get wrong when several lesions are sampled by different techniques. The base code is reported once for the primary biopsy, and every additional lesion is reported with an add-on code — including where the additional lesion was sampled by a different technique. Reporting two base codes for two lesions is a common and consistent overbilling error.",
        "The note has to state the technique for each lesion, not just that biopsies were taken. \"Punch biopsy of a 4mm pigmented lesion on the left upper back; tangential biopsy of a scaling lesion on the right forearm\" selects the codes unambiguously. \"Two lesions biopsied\" selects nothing.",
      ],
    },
    {
      heading: "A biopsy on the same day as a removal is usually bundled",
      body: [
        "When a lesion is biopsied and then excised or destroyed in the same session, the biopsy is generally included in the removal. The reasoning is straightforward: obtaining tissue is part of removing the lesion, and billing both is billing the same work twice.",
        "There are two situations where the biopsy is separately reportable, and both need to be visible in the documentation. The first is a biopsy of a different lesion than the one removed — separate site, separate lesion, appended with modifier 59 or the more specific XS. The second is a biopsy performed to obtain a diagnosis that determined whether and how to proceed, where the removal followed as a consequence rather than as a plan.",
        "The second case is genuinely narrower than it is often billed. A biopsy taken as the first step of a planned excision is part of the excision. A biopsy taken because the lesion's nature was unknown, with the treatment decision made on the result, is a separate service — and the note has to show that sequence rather than assert it.",
      ],
    },
    {
      heading: "Mohs surgery cannot be unbundled into its parts",
      body: [
        "Mohs micrographic surgery is a single service in which one physician acts as both surgeon and pathologist. That structure is what the code pays for, and it is also what prevents the components from being billed separately.",
        "The recurring error is billing surgical pathology alongside the Mohs codes for the same tissue. The pathologic examination is inside the Mohs service — that is the defining feature of the technique — so a separate pathology charge for the same specimen is a duplicate. Frozen section codes are likewise not separately reportable for tissue processed as part of the Mohs procedure.",
        "The codes themselves are structured by anatomic area and by stage: a base code for the first stage on a given site with up to five tissue blocks, add-on codes for each additional stage, and a further add-on for blocks beyond five in any stage. Every stage and every block count has to be documented, because the add-ons are the majority of the revenue on a multi-stage case and an undocumented stage is an unbillable one.",
        "Where a separate lesion is biopsied or excised on the same day as Mohs, that service is separately reportable — but the documentation has to establish it as a distinct lesion, not additional work on the Mohs site.",
      ],
    },
    {
      heading: "Cosmetic versus medically necessary is decided by the note, not the diagnosis",
      body: [
        "Dermatology carries more cosmetic-exclusion denials than any other specialty, because a large share of what it treats can be either medically necessary or cosmetic depending on facts that only the record establishes.",
        "A benign lesion removed because the patient dislikes its appearance is cosmetic and excluded. The same lesion removed because it bleeds, is repeatedly irritated by clothing, has changed in size or colour, is inflamed, or obstructs vision is medically necessary — and the difference lives entirely in whether the note records the symptom.",
        "The failure mode is a note that documents the procedure impeccably and the indication not at all. The lesion is described, the technique is described, the closure is described, and nothing states why removal was warranted. On review, that is a cosmetic procedure, because nothing in the record says otherwise.",
        "For Medicare patients, where removal is likely to be considered cosmetic, an ABN signed before the procedure makes the balance billable to the patient. It has to be specific to the service and the expected reason for denial; a routine ABN signed by every patient at registration is not valid.",
        "Where an evaluation and management service is provided on the same day as a procedure, and the E/M was significant and separately identifiable from the procedure's inherent pre-service work, modifier 25 applies. The qualifier matters — a brief look at the lesion immediately before removing it is not a separate E/M, and modifier 25 usage is among the most audited patterns in the specialty.",
      ],
    },
    {
      heading: "The pattern underneath all of this",
      body: [
        "Every issue above resolves to documentation captured at the moment of the procedure by the person performing it. Excised diameter cannot be reconstructed afterwards. The technique used on each lesion cannot be inferred from the pathology report. The reason a lesion was removed cannot be added to the note credibly three weeks later when the denial arrives.",
        "Optum's analysis of 124 million claim remits found 84% of denials potentially avoidable, with 22% of those unrecoverable once they occur. Dermatology's avoidable share is high, and its recoverable share is low — a cosmetic-exclusion denial on a note that never stated an indication is not winnable on appeal, because the appeal has nothing to submit.",
        "Premier Inc. puts the average administrative cost of fighting a denied claim at $57.23. Against dermatology's per-claim values, that cost is significant enough that prevention is not merely better practice but better arithmetic. A structured operative note template that forces the indication, the measurement, the technique and the site is the cheapest intervention available in this specialty and the one with the largest return.",
      ],
    },
  ],
  faq: [
    {
      question: "How is excised diameter calculated for lesion excision codes?",
      answer:
        "Lesion diameter at its greatest clinical width, plus the narrowest surgical margin on each side. A 1.0 cm lesion excised with 0.5 cm margins is a 2.0 cm excision. The measurement must be taken before excision, because tissue contracts once removed, and coding from the pathology specimen's measurement systematically underpays.",
    },
    {
      question: "Should lesion excision claims wait for pathology?",
      answer:
        "Yes. Benign and malignant excisions are separate code families and the malignant family pays substantially more for the same site and size. Billing before pathology returns means guessing — coding everything benign gives away revenue, and coding by clinical suspicion produces claims pathology later contradicts, which then require corrected claims.",
    },
    {
      question: "Can a biopsy be billed with an excision on the same day?",
      answer:
        "Usually not for the same lesion, because obtaining tissue is part of removing it. It is separately reportable when the biopsy was of a different lesion, appended with modifier 59 or XS, or when the biopsy was performed to obtain a diagnosis that determined whether to proceed. A biopsy taken as the first step of a planned excision does not qualify.",
    },
    {
      question: "Why is surgical pathology not billable with Mohs surgery?",
      answer:
        "Because the pathologic examination is inside the Mohs service — the defining feature of the technique is that one physician acts as both surgeon and pathologist. Billing surgical pathology or frozen section codes for tissue processed during Mohs duplicates work the Mohs codes already pay for.",
    },
    {
      question: "What makes a lesion removal medically necessary rather than cosmetic?",
      answer:
        "A documented symptom or clinical concern: bleeding, repeated irritation, inflammation, change in size or colour, obstruction of vision, or suspicion of malignancy. The distinction lives entirely in whether the note records it. A note that describes the procedure perfectly but never states why removal was warranted reads, on review, as cosmetic.",
    },
  ],
  relatedServices: ["medical-coding", "denial-management", "claims-management"],
  relatedSpecialties: ["dermatology"],
};

export default post;
