/**
 * CPT and HCPCS modifier reference.
 *
 * Same structure and same discipline as `denial-code-details.ts`: a page
 * exists only where long-form content has been written for it, and
 * `generateStaticParams` reads this array. Modifiers are referenced across
 * fourteen content files with nowhere to link them, which is the gap this
 * closes — these are the ones that actually decide whether claims pay.
 */

export type ModifierCategory =
  | "Evaluation and management"
  | "Global period"
  | "Component"
  | "Multiple and bilateral"
  | "Repeat"
  | "Coverage attestation";

export type Modifier = {
  code: string;
  /** Official-style descriptor. */
  name: string;
  category: ModifierCategory;
  /** Answer-first, self-contained for extraction. */
  summary: string;
  whenToUse: string[];
  whenNotToUse: string[];
  example: string[];
  context: string[];
  relatedModifiers: string[];
  /** Denial codes this modifier resolves or prevents. */
  relatedCodes: string[];
  /** Glossary slugs. */
  relatedTerms: string[];
  /** Service slugs. */
  relatedServices: string[];
  faqs: { question: string; answer: string }[];
};

export const modifiers: Modifier[] = [
  {
    code: "25",
    name: "Significant, separately identifiable evaluation and management service by the same physician on the same day of a procedure",
    category: "Evaluation and management",
    summary:
      "Modifier 25 reports an evaluation and management service performed on the same day as a procedure, where the evaluation went beyond the assessment inherent in performing that procedure. Every procedure includes some pre-service evaluation; modifier 25 asserts that additional, separately identifiable work occurred.",
    whenToUse: [
      "A patient attends for a scheduled procedure and is also evaluated for an unrelated complaint",
      "A new problem is identified and assessed during a visit at which a procedure is performed",
      "A preventive visit during which a distinct problem requires its own assessment and plan",
      "An evaluation that leads to the decision to perform a minor procedure the same day",
    ],
    whenNotToUse: [
      "The only evaluation performed was the assessment inherent in the procedure itself",
      "A patient arrives for a scheduled injection, receives it, and leaves",
      "A brief look at the site immediately before treating it",
      "The evaluation and the procedure address the same problem with no additional work",
    ],
    example: [
      "A patient attends a dermatology clinic for a planned lesion excision. During the visit they also report a new rash on the forearm, which the physician examines, diagnoses and treats with a prescription.",
      "The excision includes its own pre-service assessment — inspecting the lesion, confirming the plan, obtaining consent — and that work is not separately billable. The rash is different: it has its own history, examination and treatment decision, none of which relates to the excision.",
      "The office visit is reported with modifier 25 alongside the excision. The note must carry the rash assessment as distinct content rather than a line inside the procedure note.",
    ],
    context: [
      "Modifier 25 is among the most audited modifiers in circulation, because it is both frequently correct and frequently applied by default. Payers analyse the proportion of a practice's procedures that carry an accompanying E/M, and an outlying ratio invites review without anyone reading a chart.",
      "The word doing the work is 'separately identifiable'. It does not require an unrelated diagnosis — the same diagnosis can support both services where the evaluation genuinely exceeded the procedure's inherent assessment. But it does require that a reviewer can see the separate work in the record.",
      "The practical protection is structural: document the evaluation and the procedure as distinct sections, with their own assessment and plan. That costs nothing at the time and is the entire difference between a defensible claim and an indefensible one.",
    ],
    relatedModifiers: ["24", "57", "59"],
    relatedCodes: ["CO-97", "CO-B15"],
    relatedTerms: ["e-m-coding", "modifier", "ncci-edits"],
    relatedServices: ["medical-coding", "denial-management", "claims-management"],
    faqs: [
      { question: "When should modifier 25 be used?", answer: "When an evaluation and management service on the same day as a procedure went beyond the assessment inherent in performing that procedure. Every procedure includes pre-service evaluation; modifier 25 asserts additional, separately identifiable work occurred and that a reviewer can see it in the record." },
      { question: "Does modifier 25 require a different diagnosis?", answer: "No. The same diagnosis can support both services where the evaluation genuinely exceeded the procedure's inherent assessment. What is required is that the separate work is visible in the documentation, not that the diagnoses differ." },
      { question: "Why is modifier 25 audited so heavily?", answer: "Because it is both frequently correct and frequently applied by default. Payers analyse what proportion of a practice's procedures carry an accompanying E/M, and an outlying ratio triggers review without anyone opening a chart." },
      { question: "Can modifier 25 be used with a preventive visit?", answer: "Yes, when a distinct problem was addressed with its own assessment and plan. The modifier goes on the problem-oriented visit, never on the preventive one. A parent or patient mentioning a minor concern that required no separate evaluation is not a second service." },
    ],
  },
  {
    code: "59",
    name: "Distinct procedural service",
    category: "Evaluation and management",
    summary:
      "Modifier 59 identifies a procedure as distinct from another performed the same day, overriding an edit that would otherwise bundle them. It is the modifier of last resort — where a more specific X modifier or an anatomic modifier describes the distinction, that one should be used instead.",
    whenToUse: [
      "Two procedures performed at separate encounters on the same day",
      "Procedures on different anatomic sites or separate organs",
      "A diagnostic procedure that led to the decision to perform a therapeutic one",
      "Only where no more specific modifier describes the distinction",
    ],
    whenNotToUse: [
      "To clear a bundling edit where the services were genuinely one service",
      "Where an X modifier more precisely describes why the services were distinct",
      "Where an anatomic modifier such as a side or digit indicator applies",
      "As a routine addition to any claim returning a bundling denial",
    ],
    example: [
      "A patient undergoes a procedure on the left knee and a separate, unrelated procedure on the right shoulder during the same session. An NCCI edit bundles the two codes.",
      "The services were performed on separate anatomic structures and are genuinely distinct. Because a more specific modifier exists for that circumstance — the separate structure indicator — it is preferred over the generic distinct-service modifier.",
      "Using XS here states why the services were distinct. Using 59 merely asserts that they were, which is weaker on review even though both may clear the edit.",
    ],
    context: [
      "The X modifiers were introduced precisely because modifier 59 was being applied indiscriminately. Each states a reason: XE for a separate encounter, XS for a separate structure, XP for a separate practitioner, XU for an unusual non-overlapping service.",
      "Applying 59 reflexively to clear a CO-97 denial is the error that converts a recoverable claim into an audit finding. The edit may clear and the claim may pay, and the pattern remains visible in claims data afterwards.",
      "The test worth applying before using it: can you state, in one sentence, why these two services were distinct? If yes, one of the X modifiers probably says it better. If no, the modifier is not supportable.",
    ],
    relatedModifiers: ["25", "51", "76"],
    relatedCodes: ["CO-97", "CO-59", "CO-B15"],
    relatedTerms: ["ncci-edits", "modifier", "cpt-code"],
    relatedServices: ["medical-coding", "denial-management", "claims-management"],
    faqs: [
      { question: "What does modifier 59 do?", answer: "It identifies a procedure as distinct from another performed the same day, overriding an edit that would otherwise bundle them. It is a modifier of last resort — where a more specific X modifier or anatomic modifier describes the distinction, that one is preferred." },
      { question: "What is the difference between 59 and the X modifiers?", answer: "The X modifiers state why the services were distinct: XE separate encounter, XS separate structure, XP separate practitioner, XU unusual non-overlapping service. Modifier 59 only asserts that they were distinct. They were introduced because 59 was being applied indiscriminately." },
      { question: "Can modifier 59 clear any bundling denial?", answer: "It may clear the edit mechanically, which is not the same as being correct. Applying it reflexively to CO-97 denials converts a recoverable claim into an audit finding, and the pattern is visible in claims data without anyone reading a chart." },
      { question: "How do you know if modifier 59 is justified?", answer: "Ask whether you can state in one sentence why the two services were distinct. If you can, an X modifier probably says it more precisely. If you cannot, the modifier is not supportable." },
    ],
  },
  {
    code: "26",
    name: "Professional component",
    category: "Component",
    summary:
      "Modifier 26 reports the physician's interpretation and written report for a diagnostic service, separately from the equipment, supplies and technical staff that produced it. It applies when the interpreting physician does not own the equipment used.",
    whenToUse: [
      "A radiologist interprets studies performed at a hospital or another facility",
      "A cardiologist reads a study performed on equipment owned by someone else",
      "A pathologist interprets a specimen processed at another laboratory",
      "Any diagnostic service where the practice supplies the read but not the equipment",
    ],
    whenNotToUse: [
      "The practice owns the equipment and performs the interpretation — bill globally with no modifier",
      "The code has no professional and technical split",
      "Reporting the technical side, which uses the technical component modifier instead",
    ],
    example: [
      "A radiology group reads studies performed at a hospital. The hospital owns the scanners, employs the technologists, and bills the technical component on its own claim.",
      "The group bills the professional component only, with modifier 26. Billing globally would ask the payer to pay the technical component twice — once to the hospital and once to the group.",
      "Some payers reject that outright; others pay the professional portion and deny the rest, which looks like a partial payment rather than an error and frequently goes unworked for months.",
    ],
    context: [
      "The most reliable check is place of service. A global claim carrying a facility place of service is internally contradictory, because the facility is already billing the technical side under its own claim.",
      "The failure is usually configuration rather than judgement. A group that historically read only in its own centre adds a hospital contract, and the charge templates still default to global. Every claim from the new contract is wrong from day one.",
      "Because the professional portion still pays, the underlying error can persist for months before anyone reconciles expected against received. A standing report for global claims with a facility place of service catches it before submission.",
    ],
    relatedModifiers: ["TC", "76", "77"],
    relatedCodes: ["CO-45", "CO-16", "CO-18"],
    relatedTerms: ["modifier", "allowed-amount", "underpayment"],
    relatedServices: ["medical-coding", "claims-management", "practice-analytics"],
    faqs: [
      { question: "When is modifier 26 used?", answer: "When the practice provides the interpretation and written report but does not own the equipment — most commonly a radiologist reading studies performed at a hospital. The facility bills the technical component separately on its own claim." },
      { question: "What happens if you bill globally instead?", answer: "You ask the payer to pay the technical component twice, since the facility is already billing it. Some payers reject the claim; others pay the professional portion and deny the rest, which resembles a partial payment and often goes unworked." },
      { question: "How do you catch modifier 26 errors before submission?", answer: "Run a standing check for global claims carrying a facility place of service — that combination is structurally impossible. It is usually a charge template that still defaults to global after a group adds a hospital contract." },
      { question: "Does every diagnostic code have a 26/TC split?", answer: "No. The split applies only to codes with both a professional and a technical element. Appending 26 to a code without a professional component produces a denial." },
    ],
  },
  {
    code: "TC",
    name: "Technical component",
    category: "Component",
    summary:
      "Modifier TC reports the equipment, supplies, technical staff and facility overhead used to produce a diagnostic service, separately from the physician's interpretation. It applies when the practice performs the study but the read is supplied by someone else.",
    whenToUse: [
      "A physician office performs imaging and sends the study out for interpretation",
      "A facility owns the equipment while an outside group supplies the reads",
      "An independent diagnostic testing facility performing studies read elsewhere",
    ],
    whenNotToUse: [
      "The practice both performs and interprets — bill globally with no modifier",
      "Reporting the interpretation, which uses the professional component modifier",
      "On codes with no professional and technical split",
    ],
    example: [
      "A primary care practice performs radiographs in the office and sends the images to a radiology group for interpretation.",
      "The practice bills the technical component with modifier TC. The radiology group bills the professional component with modifier 26. Between them, the payer sees one complete service split across two claims.",
      "Where the practice bills globally in that arrangement, the radiologist's claim for the professional component denies as a duplicate of work already paid — and the radiologist, not the practice, absorbs the loss.",
    ],
    context: [
      "The two component modifiers are complementary and mutually exclusive on a given service. If 26 and TC are both correct on the same claim for the same study, the claim should have been billed globally with neither.",
      "Payment is not split evenly. The technical component typically carries the larger share, reflecting equipment and staffing costs, which makes the correct split materially consequential for both parties.",
      "Arrangements change more often than charge templates do. A practice that stops interpreting in house, or starts, needs the templates revisited on the same day the arrangement changes rather than at the next audit.",
    ],
    relatedModifiers: ["26", "76", "77"],
    relatedCodes: ["CO-18", "CO-45", "CO-16"],
    relatedTerms: ["modifier", "allowed-amount", "claim-scrubbing"],
    relatedServices: ["medical-coding", "claims-management", "practice-analytics"],
    faqs: [
      { question: "When is modifier TC used?", answer: "When the practice performs the diagnostic study — owning the equipment and employing the staff — but the interpretation is supplied by someone else. The interpreting physician bills the professional component separately with modifier 26." },
      { question: "Can 26 and TC appear on the same claim?", answer: "Not for the same service. If both would be correct, the study should have been billed globally with no modifier at all. They are complementary halves of one service, normally split across two claims from two entities." },
      { question: "Which component pays more?", answer: "The technical component typically carries the larger share, reflecting equipment and staffing costs. That makes getting the split right materially consequential rather than a formality." },
      { question: "What triggers TC billing errors?", answer: "Changed arrangements with unchanged charge templates. A practice that starts or stops interpreting in house needs its templates revisited the same day, not at the next audit." },
    ],
  },
  {
    code: "50",
    name: "Bilateral procedure",
    category: "Multiple and bilateral",
    summary:
      "Modifier 50 reports a procedure performed on both sides of the body during the same session, where the code itself describes a unilateral service. It does not apply to codes that are already inherently bilateral, and appending it to one overbills.",
    whenToUse: [
      "A unilateral procedure code performed on both left and right sides in the same session",
      "Where the payer's convention is a single line with modifier 50 rather than two lines",
    ],
    whenNotToUse: [
      "The code descriptor already includes both sides — it is inherently bilateral",
      "The payer requires two lines with side indicators instead",
      "Procedures on paired structures that are not truly bilateral, such as two different digits on one foot",
    ],
    example: [
      "A patient undergoes the same procedure on both knees during one session. The procedure code describes a unilateral service.",
      "Reported once with modifier 50, the claim tells the payer both sides were treated and payment is calculated on the payer's bilateral methodology — commonly a percentage uplift rather than double.",
      "Reported twice without a modifier, the second line adjudicates as a duplicate. Reported once with no modifier, only one side is paid for work performed on two.",
    ],
    context: [
      "Payer conventions genuinely differ, and this is one of the few places where following the wrong convention produces a denial even though the coding logic is sound. Some payers want one line with modifier 50; others want two lines with left and right indicators.",
      "Bilateral payment is rarely double. Most methodologies pay the second side at a reduced rate on the basis that access and preparation are not duplicated, which means a claim paying less than twice the unilateral rate is usually correct rather than underpaid.",
      "Codes vary in whether they are inherently bilateral, and the descriptor is the authority. Appending modifier 50 to a code that already covers both sides is an overpayment that surfaces in audit rather than in adjudication.",
    ],
    relatedModifiers: ["51", "59", "76"],
    relatedCodes: ["CO-18", "CO-59", "CO-4"],
    relatedTerms: ["modifier", "cpt-code", "claim-scrubbing"],
    relatedServices: ["medical-coding", "claims-management", "denial-management"],
    faqs: [
      { question: "When is modifier 50 used?", answer: "When a procedure whose code describes a unilateral service is performed on both sides during the same session. It does not apply to codes that are already inherently bilateral — the descriptor is the authority, and appending 50 to one overbills." },
      { question: "Should bilateral procedures be one line or two?", answer: "It depends on the payer. Some require a single line with modifier 50; others require two lines with left and right indicators. Following the wrong convention produces a denial even where the coding logic is sound." },
      { question: "Why did a bilateral claim pay less than double?", answer: "Because most bilateral methodologies pay the second side at a reduced rate, on the basis that access and preparation are not duplicated. Payment below twice the unilateral rate is usually correct rather than an underpayment." },
      { question: "Does modifier 50 apply to two digits on the same foot?", answer: "No. Those are separate anatomic sites on one side, not a bilateral procedure. Digit-specific modifiers identify them, and using 50 misrepresents what was performed." },
    ],
  },
  {
    code: "51",
    name: "Multiple procedures",
    category: "Multiple and bilateral",
    summary:
      "Modifier 51 identifies the second and subsequent procedures performed during the same session, triggering multiple procedure payment reduction. Many payers now append it automatically during adjudication, which makes manual use unnecessary and occasionally harmful.",
    whenToUse: [
      "Multiple distinct procedures in one session, on payers that require it manually",
      "On the lower-valued procedures, never on the primary one",
    ],
    whenNotToUse: [
      "On add-on codes, which are exempt from multiple procedure reduction by design",
      "On codes designated as modifier 51 exempt",
      "Where the payer appends it during adjudication, which most now do",
      "On the highest-valued procedure of the session",
    ],
    example: [
      "Three procedures are performed in one session. The payer applies its multiple procedure reduction, paying the first at full rate and the second and third at reduced rates.",
      "The reduction is applied in descending order of value, so ranking matters. A claim that lists procedures in the wrong order can produce a larger total reduction than the rules require if the payer reduces by line order rather than by value.",
      "The resulting remittance shows CO-59 against the reduced lines. That is the reduction operating as designed, not a denial.",
    ],
    context: [
      "Modifier 51 has become largely vestigial. Most payers now apply multiple procedure logic during adjudication regardless of whether the modifier is present, and some reject claims where it is appended manually.",
      "Two exemption categories matter. Add-on codes are exempt by design, because their value already assumes they accompany a primary procedure. And a defined set of codes is designated modifier 51 exempt, meaning reduction does not apply to them at all.",
      "Because the reduction is published, expected payment can be modelled. A practice that does not model it either writes off genuine underpayments as ordinary reductions or spends effort disputing reductions that were correctly applied.",
    ],
    relatedModifiers: ["50", "59", "22"],
    relatedCodes: ["CO-59", "CO-45", "CO-97"],
    relatedTerms: ["modifier", "allowed-amount", "underpayment"],
    relatedServices: ["medical-coding", "practice-analytics", "denial-management"],
    faqs: [
      { question: "Is modifier 51 still needed?", answer: "Often not. Most payers now apply multiple procedure logic during adjudication whether or not the modifier is present, and some reject claims where it is appended manually. Check the individual payer's requirement rather than applying it by habit." },
      { question: "Which codes are exempt from modifier 51?", answer: "Add-on codes, whose value already assumes they accompany a primary procedure, and a defined set of codes designated modifier 51 exempt. Reduction does not apply to either category." },
      { question: "Which procedure does modifier 51 go on?", answer: "The second and subsequent procedures, never the primary one. Reduction is applied in descending order of value, so the highest-valued procedure is the one paid in full." },
      { question: "What is the difference between modifier 51 and CO-59?", answer: "Modifier 51 is what you append to a claim; CO-59 is what appears on the remittance when the reduction has been applied. Seeing CO-59 means the rule operated as designed rather than that anything was denied." },
    ],
  },
  {
    code: "24",
    name: "Unrelated evaluation and management service by the same physician during a postoperative period",
    category: "Global period",
    summary:
      "Modifier 24 reports an evaluation and management service during a surgical global period that is unrelated to the surgery. Routine postoperative care is included in the surgical payment; care for a different problem is not, and this modifier says so.",
    whenToUse: [
      "An E/M during a global period addressing a condition unrelated to the surgery",
      "Treatment of a new problem arising during the postoperative window",
      "An unrelated chronic condition managed during a postoperative visit",
    ],
    whenNotToUse: [
      "Routine postoperative follow-up, which is included in the surgical payment",
      "Management of the expected postoperative course",
      "Complications related to the surgery, which have their own modifiers",
    ],
    example: [
      "A patient is three weeks into the global period following a knee procedure. They attend for a scheduled postoperative check and, at the same visit, are evaluated for newly elevated blood pressure requiring medication adjustment.",
      "The postoperative check is included in the surgical payment and is not billable. The hypertension evaluation is unrelated to the knee and is separately reportable with modifier 24.",
      "The note has to establish the separation. A single narrative covering the knee and the blood pressure together supports one service, and it will be the one already paid for.",
    ],
    context: [
      "Global periods run 10 or 90 days depending on the procedure, and knowing which applies is a prerequisite to using this modifier correctly. A service on day 45 following a 10-day global procedure needs no modifier at all.",
      "The distinction between unrelated and complication matters, because they use different modifiers. An unrelated problem takes modifier 24. A complication requiring a return to the operating room takes a different one, and an unrelated procedure takes another again.",
      "The diagnosis on the claim carries much of the weight. An E/M with modifier 24 reported under the same diagnosis as the surgery invites the obvious question, and the answer has to be in the note rather than in the modifier.",
    ],
    relatedModifiers: ["25", "78", "79"],
    relatedCodes: ["CO-97", "CO-B15"],
    relatedTerms: ["e-m-coding", "modifier", "denial"],
    relatedServices: ["medical-coding", "denial-management", "claims-management"],
    faqs: [
      { question: "When is modifier 24 used?", answer: "For an evaluation and management service during a surgical global period that is unrelated to the surgery — a new problem, or an unrelated chronic condition. Routine postoperative follow-up is included in the surgical payment and is not separately billable." },
      { question: "What is the difference between modifier 24 and 79?", answer: "Modifier 24 covers an unrelated E/M service during the global period. Modifier 79 covers an unrelated procedure. Both say the service was unrelated to the original surgery; they differ in what kind of service is being reported." },
      { question: "How long does a global period last?", answer: "Ten or ninety days depending on the procedure. Knowing which applies is a prerequisite — a service after the window has closed needs no global-period modifier at all." },
      { question: "Can modifier 24 be used with the same diagnosis as the surgery?", answer: "It invites scrutiny. Reporting an unrelated service under the surgical diagnosis is internally contradictory, and the documentation has to establish the separation rather than the modifier asserting it." },
    ],
  },
  {
    code: "57",
    name: "Decision for surgery",
    category: "Global period",
    summary:
      "Modifier 57 reports an evaluation and management service that resulted in the initial decision to perform major surgery. Without it, an E/M on the day of or the day before a major procedure is treated as part of the surgical package.",
    whenToUse: [
      "An E/M on the day of or day before a major procedure at which the decision to operate was made",
      "Where the surgery carries a 90-day global period",
    ],
    whenNotToUse: [
      "Minor procedures with a 10-day or zero-day global period — modifier 25 applies there",
      "A visit confirming a decision made at an earlier encounter",
      "Routine preoperative clearance or history taking after the decision was already made",
    ],
    example: [
      "A patient presents with acute symptoms. The surgeon evaluates them, reaches a diagnosis, and decides that surgery is required. The operation is performed the following morning.",
      "That evaluation is what produced the decision to operate. Without modifier 57 it falls inside the surgical package and is not separately paid, because E/M services on the day of or before a major procedure are otherwise bundled.",
      "Reported with modifier 57, it is separately payable. The note has to show that the decision was reached at that encounter, not confirmed at it.",
    ],
    context: [
      "The choice between modifiers 57 and 25 is determined by the global period of the procedure, not by the complexity of the evaluation. Major procedures carrying a 90-day global take 57; minor procedures take 25.",
      "The word 'initial' is doing real work. A visit at which an already-made decision is confirmed, consent obtained and preoperative instructions given is part of the surgical package. The visit where the decision was actually reached is not.",
      "This is a modifier practices under-use rather than over-use. Surgeons frequently perform a substantial evaluation that leads directly to an operation and never bill it, because the visit and the surgery feel like one episode of care.",
    ],
    relatedModifiers: ["25", "24", "79"],
    relatedCodes: ["CO-97"],
    relatedTerms: ["e-m-coding", "modifier", "denial"],
    relatedServices: ["medical-coding", "claims-management", "denial-management"],
    faqs: [
      { question: "When is modifier 57 used?", answer: "For an evaluation and management service on the day of or the day before a major procedure, at which the initial decision to operate was made. Without it, that E/M falls inside the surgical package and is not separately paid." },
      { question: "What is the difference between modifier 57 and 25?", answer: "The global period of the procedure decides it, not the complexity of the evaluation. Major procedures with a 90-day global take modifier 57; minor procedures with a 10-day or zero-day global take modifier 25." },
      { question: "Does a preoperative visit qualify for modifier 57?", answer: "Only if the decision to operate was reached at that visit. A visit confirming an earlier decision, obtaining consent and giving preoperative instructions is part of the surgical package." },
      { question: "Is modifier 57 over-used or under-used?", answer: "Under-used. Surgeons frequently perform a substantial evaluation leading directly to an operation and never bill it, because the visit and the surgery feel like a single episode of care." },
    ],
  },
  {
    code: "78",
    name: "Unplanned return to the operating or procedure room by the same physician for a related procedure during the postoperative period",
    category: "Global period",
    summary:
      "Modifier 78 reports an unplanned return to the operating room during a global period to treat a complication of the original surgery. The return is paid at the intraoperative rate only, and it does not restart the global period.",
    whenToUse: [
      "A complication of the original surgery requiring a return to the operating or procedure room",
      "An unplanned reoperation by the same physician during the global period",
    ],
    whenNotToUse: [
      "A staged or planned second procedure, which has its own modifier",
      "An unrelated procedure during the global period, which takes modifier 79",
      "Treatment of a complication that did not require a return to the operating room",
    ],
    example: [
      "A patient develops post-surgical bleeding four days after an operation and is returned to theatre for control of haemorrhage.",
      "The return is related to the original surgery and was not planned, so modifier 78 applies. Payment covers the intraoperative work only — not the preoperative and postoperative components, which were already paid within the original global package.",
      "The global period continues to run from the original surgery. It does not reset, which matters for any subsequent service in the window.",
    ],
    context: [
      "The three global-period procedure modifiers are frequently confused and pay differently. Modifier 78 covers a related, unplanned return. Modifier 79 covers an unrelated procedure. A separate modifier covers a staged or planned return.",
      "The reduced payment surprises practices that expect full reimbursement for genuine operative work. It is deliberate — the surgical package already paid for the pre- and post-operative components once, and the return is not a new episode.",
      "Treatment of a complication that does not require a return to the operating room is generally included in the global package entirely. The return to theatre is what makes it separately reportable.",
    ],
    relatedModifiers: ["79", "24", "22"],
    relatedCodes: ["CO-97", "CO-B15"],
    relatedTerms: ["modifier", "denial", "cpt-code"],
    relatedServices: ["medical-coding", "denial-management", "claims-management"],
    faqs: [
      { question: "When is modifier 78 used?", answer: "For an unplanned return to the operating or procedure room during a global period, by the same physician, to treat a complication related to the original surgery. A planned or staged return uses a different modifier." },
      { question: "Does modifier 78 pay the full procedure rate?", answer: "No. Payment covers the intraoperative component only. The preoperative and postoperative components were already paid within the original surgical package, so the return is not treated as a new episode." },
      { question: "Does a return to theatre reset the global period?", answer: "No. The global period continues running from the original surgery, which matters for any subsequent service inside the window." },
      { question: "What if a complication is treated without returning to theatre?", answer: "It is generally included in the global package entirely. The return to the operating or procedure room is what makes the service separately reportable." },
    ],
  },
  {
    code: "79",
    name: "Unrelated procedure or service by the same physician during the postoperative period",
    category: "Global period",
    summary:
      "Modifier 79 reports a procedure during a surgical global period that is unrelated to the original surgery. Unlike a related return, it is paid at the full rate and starts its own global period.",
    whenToUse: [
      "A procedure during a global period addressing a completely different problem",
      "Surgery on a different anatomic site during another procedure's global window",
      "The same procedure performed on the contralateral side",
    ],
    whenNotToUse: [
      "A complication of the original surgery, which takes modifier 78",
      "A staged or planned procedure related to the original",
      "An evaluation and management service, which takes modifier 24",
    ],
    example: [
      "A patient is six weeks into the 90-day global period following surgery on the right eye. Surgery on the left eye is now performed.",
      "The second procedure is on a different anatomic site and is unrelated to the first, so modifier 79 applies. It is paid at the full rate and begins its own global period.",
      "Practices sometimes hesitate to operate on the fellow structure during a global period, believing payment will be reduced. It will not — the global period attaches to the site operated on, not to the patient.",
    ],
    context: [
      "The payment difference between modifiers 78 and 79 is substantial, which is why the distinction matters commercially as well as accurately. A related return pays the intraoperative component; an unrelated procedure pays in full.",
      "Because modifier 79 starts a new global period, a patient can be inside two overlapping global windows for different sites. Tracking them separately is what prevents later services being wrongly bundled or wrongly billed.",
      "The diagnosis on the claim should reflect the unrelated condition. An unrelated procedure reported under the original surgical diagnosis contradicts itself and invites review.",
    ],
    relatedModifiers: ["78", "24", "50"],
    relatedCodes: ["CO-97", "CO-18"],
    relatedTerms: ["modifier", "denial", "cpt-code"],
    relatedServices: ["medical-coding", "denial-management", "claims-management"],
    faqs: [
      { question: "When is modifier 79 used?", answer: "For a procedure during a surgical global period that is unrelated to the original surgery — a different problem, a different anatomic site, or the same procedure on the contralateral side. It is paid at the full rate." },
      { question: "What is the difference between modifier 78 and 79?", answer: "Modifier 78 is a related, unplanned return to theatre for a complication, paid at the intraoperative rate only and not restarting the global period. Modifier 79 is an unrelated procedure, paid in full and starting its own global period." },
      { question: "Can the second eye or knee be operated on during the first one's global period?", answer: "Yes, with modifier 79. The global period attaches to the site operated on rather than to the patient, and payment is not reduced. Practices frequently hesitate here unnecessarily." },
      { question: "Does modifier 79 start a new global period?", answer: "Yes, which means a patient can be inside two overlapping global windows for different sites. Tracking them separately prevents later services being wrongly bundled or wrongly billed." },
    ],
  },
  {
    code: "76",
    name: "Repeat procedure or service by the same physician",
    category: "Repeat",
    summary:
      "Modifier 76 reports a procedure repeated by the same physician on the same day, distinguishing a genuine repeat from a duplicate claim. Without it, the second claim adjudicates as a duplicate and denies.",
    whenToUse: [
      "The same procedure performed again the same day by the same physician",
      "A repeat radiograph to assess change or confirm placement",
      "A repeat procedure necessitated by a change in the patient's condition",
    ],
    whenNotToUse: [
      "The repeat was performed by a different physician, which takes modifier 77",
      "A repeat clinical diagnostic laboratory test, which takes modifier 91",
      "Resubmitting a claim that was not paid, which needs a corrected claim not a modifier",
    ],
    example: [
      "A chest radiograph is performed in the morning. The patient's condition changes and a second radiograph is performed the same afternoon by the same physician.",
      "Both studies were genuinely performed and both are billable. Without modifier 76 on the second, it adjudicates as an exact duplicate of the first and returns CO-18.",
      "The report for each study has to stand on its own, with its own indication and findings. Two claims supported by one report is not a repeat procedure.",
    ],
    context: [
      "CO-18 duplicate denials divide into two causes with opposite fixes. One is a workflow problem — resubmitting instead of checking claim status. The other is this: a genuine repeat missing the modifier that distinguishes it.",
      "The reason for the repeat should be documented, because a repeat performed without a clinical reason is not separately billable however genuinely it occurred. A study repeated because the first was technically inadequate is generally not separately payable.",
      "Using a generic distinct-service modifier where a specific repeat modifier exists is weaker on review. Modifier 76 states what happened; modifier 59 merely asserts the services were distinct.",
    ],
    relatedModifiers: ["77", "91", "59"],
    relatedCodes: ["CO-18", "CO-16"],
    relatedTerms: ["modifier", "rejection", "claim-scrubbing"],
    relatedServices: ["claims-management", "denial-management", "medical-coding"],
    faqs: [
      { question: "When is modifier 76 used?", answer: "When the same physician repeats the same procedure on the same day and both are genuinely billable. Without it, the second claim adjudicates as an exact duplicate and returns CO-18." },
      { question: "What is the difference between modifier 76 and 77?", answer: "Modifier 76 is a repeat by the same physician; modifier 77 is a repeat by a different physician. Both distinguish a genuine repeat from a duplicate claim, and using the wrong one misstates who performed the service." },
      { question: "Is a repeat needed because the first study was inadequate billable?", answer: "Generally not. A study repeated for technical inadequacy is not separately payable. The repeat needs a clinical reason — a change in condition, or a need to assess response — and the reason should be documented." },
      { question: "Can modifier 59 be used instead of 76?", answer: "It may clear the edit, but it is weaker on review. Modifier 76 states what happened; modifier 59 only asserts that the services were distinct. Use the specific modifier where one exists." },
    ],
  },
  {
    code: "91",
    name: "Repeat clinical diagnostic laboratory test",
    category: "Repeat",
    summary:
      "Modifier 91 reports a clinical diagnostic laboratory test repeated on the same day to obtain successive results. It applies only where repeat testing was clinically necessary, not where a test was rerun for quality control or because of equipment failure.",
    whenToUse: [
      "Serial testing to monitor a changing value over the course of a day",
      "Repeat testing required to assess response to treatment",
      "Successive specimens genuinely needed for clinical decision-making",
    ],
    whenNotToUse: [
      "Rerunning a test to confirm an initial result",
      "Repeat testing due to specimen problems or equipment failure",
      "Tests that are defined as serial by their own code descriptor",
      "Repeat procedures that are not laboratory tests, which take modifier 76 or 77",
    ],
    example: [
      "A patient's potassium is monitored across a single day during treatment, with three separate draws producing three successive results used to adjust therapy.",
      "The second and third tests carry modifier 91. Without it they adjudicate as duplicates of the first, since the code, the date and the provider are identical.",
      "Where a test is rerun because the first specimen haemolysed, modifier 91 does not apply. That is a repeat for a laboratory reason, not a clinical one, and it is not separately billable.",
    ],
    context: [
      "The distinction between clinically necessary repeats and operational repeats is the entire content of this modifier, and it is the one most often ignored. A laboratory that appends 91 to every same-day repeat bills for its own rework.",
      "Some codes already describe serial or multiple determinations in their descriptor. Appending modifier 91 to those double-counts, because the repetition is already inside the code.",
      "The ordering record is what supports it. Successive orders, timed, with the clinical reason evident, distinguish a monitored series from a rerun. A single order producing three results does not.",
    ],
    relatedModifiers: ["76", "77", "59"],
    relatedCodes: ["CO-18", "CO-151"],
    relatedTerms: ["modifier", "rejection", "medical-necessity"],
    relatedServices: ["claims-management", "medical-coding", "denial-management"],
    faqs: [
      { question: "When is modifier 91 used?", answer: "When a clinical diagnostic laboratory test is repeated the same day to obtain successive results needed for clinical decision-making — serial monitoring of a changing value, or assessing response to treatment." },
      { question: "Can modifier 91 be used for a rerun?", answer: "No. Repeat testing because of specimen problems, equipment failure, or to confirm an initial result is operational rework, not a clinically necessary repeat. Billing it charges the payer for the laboratory's own rework." },
      { question: "What is the difference between modifier 91 and 76?", answer: "Modifier 91 is specific to clinical diagnostic laboratory tests. Modifier 76 covers repeat procedures generally, by the same physician. Using 76 on a laboratory repeat misapplies a procedural modifier." },
      { question: "Does modifier 91 apply to codes that describe serial testing?", answer: "No. Where the code descriptor already covers serial or multiple determinations, the repetition is inside the code and appending 91 double-counts it." },
    ],
  },
  {
    code: "GA",
    name: "Waiver of liability statement issued as required by payer policy",
    category: "Coverage attestation",
    summary:
      "Modifier GA attests that a valid Advance Beneficiary Notice is on file for a service expected to be denied as not medically necessary. It is what makes the balance billable to the patient once the denial arrives.",
    whenToUse: [
      "A Medicare service expected to be denied as not reasonable and necessary",
      "Where a valid ABN was signed by the beneficiary before the service",
      "Where the practice intends to bill the patient after the denial",
    ],
    whenNotToUse: [
      "No ABN was obtained, or it was obtained after the service",
      "A blanket ABN signed routinely at registration, which is not valid",
      "Services excluded by statute rather than denied for medical necessity",
    ],
    example: [
      "A chiropractic patient has reached maximum therapeutic benefit and further care is maintenance rather than active treatment. Maintenance is not a Medicare benefit.",
      "Before the visit, the patient signs an ABN naming the service, stating the expected reason for non-coverage and an estimated cost, and selecting an option. The claim is submitted with modifier GA.",
      "Medicare denies, as expected, and the denial notice establishes patient responsibility. Without modifier GA and a valid ABN, the balance would be written off entirely.",
    ],
    context: [
      "The modifier is an attestation, not a formality. Appending GA where no valid notice exists is a false statement about the file, and the usage pattern is visible in claims data without anyone opening a chart.",
      "ABN validity is where most of this fails. The notice must be issued before the service, identify the specific service, state the specific expected reason for denial, give an estimated cost, and carry a signature with an option selected. CMS treats routine blanket issuance as no issuance at all.",
      "Related modifiers distinguish different situations. Where a notice was not obtained but the practice knows the service is non-covered, a different modifier applies, and it does not make the balance billable. Choosing between them is a judgement about what is actually in the file.",
    ],
    relatedModifiers: ["KX", "AT", "25"],
    relatedCodes: ["CO-50", "CO-96", "PR-204"],
    relatedTerms: ["medical-necessity", "patient-responsibility", "denial"],
    relatedServices: ["denial-management", "patient-collections", "eligibility-verification"],
    faqs: [
      { question: "What does modifier GA mean?", answer: "That a valid Advance Beneficiary Notice is on file for a service expected to be denied as not medically necessary. It is what makes the balance billable to the patient once the denial arrives — without it, the balance is written off." },
      { question: "What makes an ABN valid?", answer: "Issued before the service, naming the specific service, stating the specific expected reason for denial, giving an estimated cost, and signed with an option selected. A blanket notice signed routinely by every patient at registration is treated by CMS as no notice at all." },
      { question: "Can modifier GA be added after the fact?", answer: "Only if a valid ABN was genuinely obtained before the service. The modifier attests to what is in the file; appending it where no valid notice exists is a false statement, and the pattern is visible in claims data." },
      { question: "Does modifier GA apply to statutory exclusions?", answer: "No. It applies where a service is expected to be denied as not reasonable and necessary. Services excluded by statute are a different category, and an ABN is not the instrument that governs them." },
    ],
  },
  {
    code: "KX",
    name: "Requirements specified in the medical policy have been met",
    category: "Coverage attestation",
    summary:
      "Modifier KX attests that the coverage criteria in the applicable medical policy are met and that supporting documentation is on file. It is a statement about the file, not a character that makes claims pay.",
    whenToUse: [
      "Durable medical equipment where the policy's coverage criteria are documented",
      "Therapy services exceeding a threshold where continued care is justified and documented",
      "Any item or service whose policy specifies KX as the attestation of met criteria",
    ],
    whenNotToUse: [
      "The documentation has not been obtained or verified",
      "The criteria are partly met and the gap has not been resolved",
      "Routinely, as a default appended to every claim in a category",
    ],
    example: [
      "A supplier furnishes an item of durable medical equipment. The policy requires a face-to-face encounter within a defined window, clinical records supporting medical necessity, and a written order before delivery.",
      "Where all three are present and have been read against the policy, modifier KX attests to that and the claim is submitted. Where the clinical records were requested but never received, KX is not supportable — the criteria may well be met clinically, and the file does not establish it.",
      "The distinction matters because the attestation is about the documentation, not about the patient's condition.",
    ],
    context: [
      "KX is widely treated as a required character that unlocks payment, which is exactly backwards. Applying it to items whose documentation has not been verified converts a paperwork gap into a false attestation.",
      "The usage pattern is auditable in aggregate. A supplier appending KX to essentially every claim in a category is visible in claims data before any chart is reviewed, and that pattern is what selects a supplier for review.",
      "Where criteria are not met, different modifiers apply, and they do not make the claim payable. Choosing correctly between them is a judgement made before submission about what the file actually contains.",
    ],
    relatedModifiers: ["GA", "26", "TC"],
    relatedCodes: ["CO-50", "CO-16", "CO-96"],
    relatedTerms: ["medical-necessity", "prior-authorization", "denial"],
    relatedServices: ["denial-management", "eligibility-verification", "claims-management"],
    faqs: [
      { question: "What does modifier KX attest to?", answer: "That the coverage criteria in the applicable medical policy are met and that supporting documentation is on file. It is a statement about the documentation, not about the patient's clinical condition, and not a character that makes claims pay." },
      { question: "Can KX be used if documentation is pending?", answer: "No. If the clinical records were requested but not received, the criteria may well be met clinically while the file fails to establish it. The attestation is about the file." },
      { question: "Is routine KX use risky?", answer: "Yes. A supplier appending KX to essentially every claim in a category is visible in aggregate claims data before any chart is reviewed, and that pattern is what selects a supplier for review." },
      { question: "What if the coverage criteria are not met?", answer: "Different modifiers apply, and they do not make the claim payable. Where the patient is to be billed, an Advance Beneficiary Notice and modifier GA are the relevant instruments." },
    ],
  },
];

export const modifierCodes = modifiers.map((m) => m.code);

export const getModifier = (code: string) =>
  modifiers.find((m) => m.code.toLowerCase() === code.toLowerCase());

export const modifierCategories: ModifierCategory[] = [
  "Evaluation and management",
  "Global period",
  "Component",
  "Multiple and bilateral",
  "Repeat",
  "Coverage attestation",
];
