import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "ent-billing-endoscopy-audiology-allergy",
  title: "ENT billing: endoscopy bundling, audiology coverage and allergy dose units",
  metaTitle: "ENT billing: endoscopy, audiology, allergy",
  excerpt:
    "An otolaryngology practice runs four different billing models under one roof. Most ENT revenue loss happens at the seams between them.",
  category: "Specialty Billing",
  published: "2026-08-24",
  updated: "2026-08-24",
  readingMinutes: 9,
  answer:
    "ENT denials concentrate in three places: diagnostic nasal endoscopy billed alongside a sinus procedure that already includes it, audiology testing denied because it was performed for hearing aid fitting rather than to evaluate a medical condition, and allergy immunotherapy billed per vial when the code is defined per dose. All three are structural rather than clerical.",
  sections: [
    {
      heading: "Four billing models, one practice",
      body: [
        "Otolaryngology is unusual in how many distinct reimbursement systems it operates simultaneously. Office endoscopy behaves like a procedural specialty. Audiology behaves like diagnostic testing with a statutory coverage carve-out. Allergy testing and immunotherapy behave like drug administration, billed in units that do not correspond to anything physical in the room. Surgery behaves like surgery, with global periods and bilateral rules.",
        "A biller who is fluent in one of these is not automatically fluent in the others, and the errors do not look alike. That is why ENT rewards specialty-specific handling more than most fields — the denial patterns are not variations on a theme, they are four separate problems.",
      ],
      table: {
        headers: ["Service line", "Dominant denial cause", "Where it is decided"],
        rows: [
          ["Office endoscopy", "Bundled into a same-session procedure", "The operative note"],
          ["Audiology", "Purpose of the test is not covered", "The order and the indication"],
          ["Allergy immunotherapy", "Units billed per vial instead of per dose", "The charge entry"],
          ["Sinus surgery", "Laterality and multiple-procedure rules", "The claim's modifiers"],
        ],
      },
    },
    {
      heading: "Diagnostic nasal endoscopy is included in the sinus procedure",
      body: [
        "This is the most common mechanical denial in the specialty. Diagnostic nasal endoscopy is a distinct billable service when it is the service performed. When it is performed as part of getting to a sinus procedure in the same session, it is included in that procedure and billing it separately triggers an NCCI edit.",
        "The confusion is reasonable, because the endoscope genuinely is used, often for a meaningful part of the encounter. But the surgical codes are valued on the assumption that the surgeon looked before operating. Paying for the look separately pays twice for the same work.",
        "The exception that is legitimately billable is a diagnostic endoscopy performed for a different purpose than the procedure — most defensibly, an endoscopy of the other side, or a diagnostic examination that led to the decision to perform an unplanned procedure. Both require the note to establish the sequence rather than assert the modifier.",
        "The failure mode worth naming: a charge template that automatically adds diagnostic endoscopy to every sinus case. It pays sometimes, denies often, and in an audit it reads as systematic rather than accidental — which changes the character of the finding.",
      ],
    },
    {
      heading: "Audiology coverage turns on why the test was done",
      body: [
        "Medicare covers diagnostic audiology when the testing is performed to evaluate a medical condition — to inform a diagnosis, or to determine whether medical or surgical treatment is warranted. It does not cover audiology performed to fit or select a hearing aid. Hearing aids and the examinations for them are excluded from Medicare by statute, which means this is not a medical-necessity judgement a good appeal can overturn. It is a coverage exclusion.",
        "The same audiogram, performed by the same audiologist on the same equipment, is therefore covered or excluded depending entirely on the documented purpose. That is an uncomfortable fact and it is the single most important thing to get right in an ENT practice with an audiology department.",
        "What the record needs is the medical indication stated plainly — the symptom, the suspected condition, the decision the test is meant to inform. \"Patient reports progressive unilateral hearing loss with tinnitus; audiometry to evaluate for retrocochlear pathology\" is covered testing. \"Hearing test for hearing aid evaluation\" is not, and coding it as though it were is not a coding fix.",
        "Where the testing genuinely is for hearing aid purposes, an ABN issued before the service transfers financial responsibility to the patient. That is the correct handling — it lets the practice be paid for real work, by the person who wants it done, without misrepresenting the purpose to the payer.",
      ],
      list: [
        "Document the medical indication for every audiology study, not just the results",
        "Distinguish diagnostic testing from hearing aid evaluation at scheduling, not at billing",
        "Issue an ABN before hearing-aid-related testing for Medicare patients",
        "Do not bill component codes alongside comprehensive audiometry — the comprehensive code includes them",
        "Since 2023 Medicare permits direct access to an audiologist for certain non-acute assessments without a physician order, identified by modifier AB and limited in frequency — check the current rule before relying on it",
        "Commercial plans set their own audiology rules and several are more restrictive than Medicare, not less",
      ],
    },
    {
      heading: "Allergy immunotherapy is billed in doses, and a dose is not a vial",
      body: [
        "Antigen preparation for allergen immunotherapy is reported with the number of doses prepared, not the number of vials, not the number of antigens, and not the number of visits. This single definition causes more allergy billing errors than everything else in the service line combined.",
        "A practice preparing a multi-dose vial and reporting one unit is underbilling substantially for work genuinely performed. A practice reporting units by antigen count is billing something the code does not describe. Both are wrong, and only one of them is in the practice's favour — which is precisely why the error persists in the direction it does.",
        "Many Medicare contractors also cap the number of billable doses per vial and publish that limit in local policy. Preparing more doses than the contractor will pay for is a clinical decision the practice can make freely; billing above the published cap is a denial the practice chose.",
      ],
      table: {
        headers: ["Service", "Code family", "Unit definition"],
        rows: [
          ["Percutaneous allergy testing", "95004", "Number of separate tests performed"],
          ["Intracutaneous testing", "95024, 95027", "Number of separate tests performed"],
          ["Antigen preparation for immunotherapy", "95165", "Number of doses prepared"],
          ["Injection only, antigen supplied by others", "95115, 95117", "One or two-or-more injections"],
        ],
      },
    },
    {
      heading: "Testing and injection on the same day are two different services",
      body: [
        "Allergy practices routinely test and treat in overlapping visits, and the codes distinguish preparation from administration deliberately. The antigen preparation code pays for supervising the making of the extract. The injection codes pay for giving it. Where the practice both prepares and injects, both are reportable; where the antigen came from elsewhere, only the injection is.",
        "The error that recurs is billing an evaluation and management service alongside routine injection visits. A patient arriving for a scheduled immunotherapy injection, receiving it, and leaving has not had a separately identifiable E/M service, and appending modifier 25 to claim one is among the more visible patterns in payer audit programmes.",
        "Where a genuine E/M does occur — the patient reports a reaction to the previous injection, or a new complaint is evaluated — it is billable with modifier 25, and the note has to carry the separate content that justifies it rather than restating the injection.",
      ],
    },
    {
      heading: "Sinus surgery: laterality is not optional detail",
      body: [
        "Endoscopic sinus procedures are performed on named sinuses, on a named side, and the claim has to reflect both. Bilateral procedures require the appropriate bilateral indicator, multiple sinuses in one session follow multiple-procedure reduction rules, and a claim that describes the work imprecisely is either denied or underpaid.",
        "The documentation requirement is straightforward and frequently unmet: the operative note should name each sinus entered and each side, in terms that map to codes without interpretation. \"Bilateral maxillary antrostomy with tissue removal and left anterior ethmoidectomy\" is codeable. \"Endoscopic sinus surgery performed\" is not.",
        "Balloon procedures deserve separate attention because payer medical policy governs them more tightly than the surgical codes suggest. Several plans require documented failure of medical management over a defined period, with specific findings on imaging, before they will authorise. Those requirements are published, which means a denial on them is knowable before the case is booked.",
      ],
    },
    {
      heading: "Where the leverage is in this specialty",
      body: [
        "Optum's analysis of 124 million claim remits found 84% of denials potentially avoidable, with 22% of those unrecoverable once they occur. ENT sits at the high end of avoidable, because the three dominant error categories are all determined by information available before or during the encounter rather than by payer discretion afterwards.",
        "Whether the endoscopy is bundled is determined by what else happened in the session. Whether the audiogram is covered is determined by why it was ordered. How many units of antigen preparation to bill is determined by how many doses were made. None of these require negotiation, an appeal, or a judgement call about medical necessity. They require the person entering the charge to know the rule.",
        "Premier Inc. puts the average administrative cost of fighting a denied claim at $57.23, with roughly 70% eventually overturned. For the bundling and unit errors, appealing is often not even available — a correctly applied NCCI edit is not overturned by explaining that the work was done. The return in ENT is almost entirely in configuration and documentation, which is unglamorous and is where the money is.",
      ],
    },
  ],
  faq: [
    {
      question: "Can diagnostic nasal endoscopy be billed with sinus surgery?",
      answer:
        "Generally not in the same session. The surgical codes are valued on the assumption the surgeon visualised the field before operating, so billing the diagnostic endoscopy separately pays twice for the same work and triggers an NCCI edit. A diagnostic endoscopy performed for a genuinely different purpose can be separately reportable, but the note has to establish that sequence rather than rely on a modifier.",
    },
    {
      question: "Why was an audiology claim denied by Medicare?",
      answer:
        "Most often because the testing was performed to fit or select a hearing aid. Hearing aids and the examinations for them are excluded from Medicare by statute, so this is a coverage exclusion rather than a medical-necessity judgement, and appeals do not succeed. Diagnostic audiology performed to evaluate a medical condition is covered — the difference lives entirely in the documented purpose.",
    },
    {
      question: "How are units calculated for allergy antigen preparation?",
      answer:
        "By the number of doses prepared, not the number of vials, antigens, or visits. Reporting one unit for a multi-dose vial substantially underbills work genuinely performed. Many Medicare contractors also publish a cap on billable doses per vial in local policy, and billing above that published cap is a predictable denial.",
    },
    {
      question: "Can an E/M be billed with an allergy injection visit?",
      answer:
        "Only when a significant, separately identifiable evaluation actually occurred — a reaction to a prior injection, or a new complaint assessed. A patient arriving for a scheduled injection, receiving it, and leaving has not had a separate E/M service. Routine modifier 25 use on injection visits is among the more visible patterns in payer audit programmes.",
    },
    {
      question: "What does an ENT operative note need for sinus surgery coding?",
      answer:
        "Each sinus entered and each side treated, named explicitly. Bilateral procedures need the bilateral indicator and multiple sinuses follow multiple-procedure reduction rules, so imprecise documentation is either denied or underpaid. For balloon procedures, payer policy often also requires documented failure of medical management and specific imaging findings before authorisation.",
    },
  ],
  sources: ["ncci-policy-manual", "mue-tables", "medicare-coverage-database"],
  relatedServices: ["medical-coding", "denial-management", "prior-authorization"],
  relatedSpecialties: ["ent"],
};

export default post;
