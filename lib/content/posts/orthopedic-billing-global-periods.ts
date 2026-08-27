import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "orthopedic-billing-global-periods",
  title: "Surgical global periods and why orthopedic claims deny",
  metaTitle: "Surgical global periods in orthopedics",
  excerpt:
    "Global periods, modifier selection and NCCI bundling make orthopedics the specialty where correct surgery is most often billed incorrectly — usually downward.",
  category: "Specialty Billing",
  published: "2026-08-20",
  updated: "2026-08-20",
  readingMinutes: 8,
  answer:
    "Orthopedic claims deny largely because of the global surgical package: procedures carry a 0, 10 or 90-day global period during which related visits and procedures are bundled and paid at zero. Recovering that revenue depends on modifier selection — 24, 25, 57, 58, 78 and 79 each describe a specific exception, and using the wrong one denies as reliably as using none.",
  sections: [
    {
      heading: "The global package is what makes orthopedics different",
      body: [
        "Most specialties bill a service and get paid for it. Orthopedic surgery bills a procedure that includes an unspecified amount of future care in the same payment, and the practice then has to distinguish what falls inside that package from what does not.",
        "Medicare assigns each procedure a global period indicator, and commercial payers largely follow the same structure. The indicator determines how long related care is bundled after the surgery.",
      ],
      table: {
        headers: ["Indicator", "Global period", "What is bundled"],
        rows: [
          ["000", "0 days", "Same-day related care only; minor procedures"],
          ["010", "10 days", "Procedure plus 10 days of related postoperative care"],
          ["090", "90 days", "Day before surgery, surgery, and 90 days after"],
          ["XXX", "Not applicable", "Global concept does not apply to the code"],
          ["ZZZ", "Add-on", "Bundled into the primary procedure's global period"],
        ],
      },
    },
    {
      heading: "Six modifiers do almost all the work",
      body: [
        "Each modifier below asserts a specific, different exception to the global package. They are not interchangeable, and the most common orthopedic denial pattern is a correct clinical situation described with the wrong modifier.",
      ],
      table: {
        headers: ["Modifier", "Use it when", "Common error"],
        rows: [
          ["24", "Unrelated E/M during another procedure's postoperative period", "Applied to related follow-up, which is bundled"],
          ["25", "Significant, separately identifiable E/M on the same day as a procedure", "Applied to the routine pre-procedure evaluation"],
          ["57", "The E/M at which the decision for major surgery was made", "Using 25 instead, which does not apply to 90-day procedures"],
          ["58", "Staged or more extensive procedure planned during the global period", "Using 78, which implies an unplanned return"],
          ["78", "Unplanned return to the operating room for a related complication", "Using 79, which asserts the procedure was unrelated"],
          ["79", "Unrelated procedure by the same surgeon during the global period", "Applied to related work, which is bundled"],
        ],
      },
    },
    {
      heading: "Undercoding is the larger loss, and it is silent",
      body: [
        "Denials are visible. Undercoding is not — the claim pays, the remittance looks clean, and the practice never learns it billed a lower-value code than the documentation supported.",
        "Orthopedics is unusually exposed to this because the coding depends on operative detail that only the note establishes: approach, laterality, the number of compartments or levels addressed, whether a repair was primary or revision, and whether additional structures were treated in the same session. Where the note is thin, a coder without orthopedic depth codes conservatively, which is professionally correct and financially costly.",
        "The two structural fixes are documentation templates that prompt for the specific elements each procedure family requires, and coders assigned by specialty rather than pooled across a general queue. A coder who reads orthopedic operative notes daily recognises when documentation supports more than has been coded; a generalist reasonably does not.",
      ],
    },
    {
      heading: "NCCI edits and the difference between bundling and unbundling",
      body: [
        "The National Correct Coding Initiative publishes procedure-to-procedure edits identifying code pairs that should not normally be reported together, largely because one is considered a component of the other. Orthopedic surgery generates a high volume of these because procedures are anatomically adjacent and frequently performed in combination.",
        "Each edit carries a modifier indicator. Where the indicator permits it, modifier 59 or the more specific X-series modifiers — XE, XS, XP, XU — can override the edit when the services genuinely were distinct: separate encounters, separate anatomic sites, separate practitioners, or otherwise unusual non-overlapping service.",
        "That override has to be supported by the record rather than applied to clear an edit. Routine use of modifier 59 to release bundled pairs is one of the more heavily audited billing patterns in the specialty. Where the edit indicator is zero, no modifier permits the pair, and appealing it wastes the appeal.",
      ],
    },
    {
      heading: "Durable medical equipment is a separate business inside the practice",
      body: [
        "Orthopedic practices dispensing braces, walking boots, slings and other durable medical equipment are operating a second billing function with its own rules, and it is commonly run as an afterthought.",
        "DME requires its own supplier enrolment, its own documentation of medical necessity, and correct HCPCS Level II coding with the applicable modifiers indicating whether the item is purchased or rented and whether it was supplied in the office. Items dispensed during a global period raise the additional question of whether the equipment is included in the procedure's payment.",
        "The practical failure is that DME is dispensed by clinical staff at the point of care and billed later by someone reconstructing what was handed over from an inventory note. Where the item, the date and the medical necessity are not captured at dispensing, the claim either denies or is never submitted — and unbilled DME is invisible in exactly the way missing charges always are.",
      ],
    },
    {
      heading: "Laterality and multiple procedures change what gets paid",
      body: [
        "Orthopedic surgery is performed on paired anatomy, frequently in combination, and both facts reduce payment in ways that are correct but often mis-billed.",
        "Laterality has to be asserted rather than implied. RT and LT identify the side; modifier 50 reports a bilateral procedure. Payers differ on whether they want one line with modifier 50 or two lines with RT and LT, and submitting in the format a payer does not accept denies a claim that was clinically and procedurally correct. This is payer-specific configuration rather than a coding decision, and it belongs in the claim scrubber rather than in a coder's memory.",
        "When several procedures are performed in the same session, multiple-procedure payment reduction applies: the highest-valued procedure pays in full and subsequent procedures pay at a reduced rate, on the reasoning that approach and closure are not duplicated. Modifier 51 identifies the secondary procedures where a payer requires it. The reduction is expected and correct — the error is treating the reduced payment as an underpayment and appealing it, which spends appeal capacity on claims that adjudicated properly.",
        "The genuine underpayments hide in the same place, which is what makes this worth checking rather than assuming. A procedure reduced when it should have been exempt, or a bilateral procedure paid as unilateral, appears on the remittance as an ordinary reduction. Distinguishing the two requires comparing the payment against the contracted rate and the applicable reduction, which is variance work rather than denial work — and it is the reason underpayments persist for years in practices with otherwise strong denial management.",
      ],
    },
    {
      heading: "What this is worth",
      body: [
        "Optum's analysis of 124 million claim remits found 84% of denials are potentially avoidable. In orthopedics the avoidable share concentrates in two places that are both administrative rather than clinical: global-period modifier selection, and documentation depth sufficient to support the code the surgery actually warranted.",
        "Premier Inc. measures the average cost of fighting a denied claim at $57.23, and roughly 70% of denied claims are eventually overturned. For a high-value surgical claim those economics strongly favour appealing — unlike lower-value specialties, an orthopedic denial is almost always worth working.",
        "The larger opportunity remains the invisible one. A denial gets worked because someone sees it. An undercoded claim that paid correctly against the code submitted is never reviewed by anyone, which is why systematic undercoding outlasts every denial-reduction initiative a practice runs.",
      ],
    },
  ],
  faq: [
    {
      question: "What is a global period in surgical billing?",
      answer:
        "A window following a procedure during which related care is included in the surgery's payment rather than billed separately. Medicare assigns indicators of 000, 010 or 090 days, and most commercial payers follow the same structure. A 90-day global period also includes the day before surgery, so a preoperative visit the day prior is bundled unless a modifier establishes an exception.",
    },
    {
      question: "When should modifier 57 be used instead of modifier 25?",
      answer:
        "Modifier 57 identifies the evaluation at which the decision for major surgery was made, and applies to procedures with a 90-day global period. Modifier 25 identifies a significant, separately identifiable evaluation on the same day as a minor procedure. Using 25 where 57 is required is one of the most common orthopedic denials, because the two describe different exceptions.",
    },
    {
      question: "What is the difference between modifiers 58, 78 and 79?",
      answer:
        "All three apply during a global period but assert different things. Modifier 58 means the second procedure was staged or planned. Modifier 78 means an unplanned return to the operating room for a related complication. Modifier 79 means the procedure was unrelated to the original surgery. Choosing the wrong one denies as reliably as omitting a modifier entirely.",
    },
    {
      question: "Can modifier 59 override any NCCI edit?",
      answer:
        "No. Each NCCI procedure-to-procedure edit carries a modifier indicator, and where that indicator is zero no modifier permits the pair — appealing it is wasted effort. Where an override is permitted, modifier 59 or the more specific XE, XS, XP and XU modifiers apply only when the services were genuinely distinct, and the record has to support that rather than the modifier being applied to clear the edit.",
    },
    {
      question: "Why is undercoding a bigger problem than denials in orthopedics?",
      answer:
        "Because it is invisible. An undercoded claim pays, the remittance looks clean, and nothing prompts review. Orthopedic coding depends on operative detail — approach, laterality, levels or compartments addressed, primary versus revision — so thin documentation leads a generalist coder to code conservatively. That is correct practice and a permanent revenue loss no denial report will ever surface.",
    },
  ],
  sources: ["global-surgery-booklet", "ncci-policy-manual", "claims-processing-manual"],
  relatedServices: ["medical-coding", "denial-management", "medical-billing"],
  relatedSpecialties: ["orthopedics"],
};

export default post;
