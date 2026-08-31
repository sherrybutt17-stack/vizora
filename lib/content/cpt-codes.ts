/**
 * CPT procedure code reference.
 *
 * Same structure and same discipline as `modifiers.ts` and
 * `denial-code-details.ts`: a page exists only where long-form content has
 * been written for it, and `generateStaticParams` reads this array.
 *
 * Why this file exists: 132 distinct CPT codes are already named across
 * `specialties.ts` with nowhere to link them, and Search Console showed the
 * site ranking at positions 58-74 for `cpt 96413` and `98941` with no CPT
 * page existing at all. Denial-code pages rank at a median of 21 on this
 * domain while location pages sit at 88 — the difference is specific
 * technical reference queries against weak SERPs, which is exactly what a
 * procedure code is.
 *
 * ## The copyright constraint, which shapes every entry here
 *
 * CPT is a copyrighted code set owned by the American Medical Association.
 * The five-digit numbers are facts and may be stated; the official descriptor
 * attached to each one is licensed text and is NOT reproduced anywhere in
 * this file. `shortName` is our own compact label, and every paragraph is
 * written from the billing rules rather than paraphrased from the codebook.
 *
 * That constraint is also the reason these pages can win. A page that
 * reproduces the descriptor competes with every other page reproducing the
 * same sentence. A page explaining which unit rule, time threshold or
 * documentation element decides whether the code pays has no such twin.
 *
 * Anti-thin-content bar, carried over from the denial build: roughly 450
 * words of code-specific prose per entry, and 8-word shingle overlap against
 * sibling pages under ~35%. Codes within a family — the E/M levels, the three
 * chiropractic manipulation codes — are the hard cases and are deliberately
 * written from different angles rather than from a shared skeleton.
 */

export type CptCategory =
  | "Evaluation and management"
  | "Behavioral health"
  | "Chiropractic"
  | "Physical medicine"
  | "Drug administration"
  | "Cardiovascular diagnostics"
  | "Procedures"
  | "Care management";

export type CptCode = {
  code: string;
  /**
   * Our own plain-English label, used in the page title and the code index.
   *
   * Not the AMA descriptor — see the copyright note above. Keep under 42
   * characters so the rendered title lands near 55: "CPT 99214" alone is 9
   * characters, which forfeits most of the SERP line and matches only the
   * bare code query rather than "when to bill 99214" or "99214 vs 99213".
   */
  shortName: string;
  category: CptCategory;
  /** Answer-first and self-contained, for extraction. 40-70 words. */
  summary: string;
  /** How the code is actually reported: units, thresholds, frequency. */
  billingRules: string[];
  /** What the note has to show for the code to survive review. */
  documentation: string[];
  /** A concrete scenario, billed correctly and billed wrongly. */
  example: string[];
  /** The mechanism behind the rules — why they are what they are. */
  context: string[];
  /** Other CPT codes in this file. */
  relatedCpt: string[];
  /** Modifier codes from modifiers.ts. */
  relatedModifiers: string[];
  /** Denial codes from denial-codes.ts. */
  relatedCodes: string[];
  /** Glossary slugs. */
  relatedTerms: string[];
  /** Service slugs. */
  relatedServices: string[];
  /** Specialty slugs. */
  relatedSpecialties: string[];
  faqs: { question: string; answer: string }[];
};

export const cptCodes: CptCode[] = [
  {
    code: "99213",
    shortName: "Established Patient Visit, Low MDM",
    category: "Evaluation and management",
    summary:
      "99213 reports an office or outpatient visit for an established patient at the third of five levels. Since the 2021 revision it is selected either by low medical decision-making or by 20 to 29 minutes of total time on the date of the encounter. History and examination no longer decide the level.",
    billingRules: [
      "Selected by low medical decision-making, or by total time of 20 to 29 minutes on the encounter date — the biller chooses whichever method supports the higher level",
      "Total time counts the physician's own work on that calendar day: reviewing records beforehand, the visit itself, ordering, counselling and documenting afterwards",
      "Clinical staff time does not count, and neither does work done on any other day",
      "Established means the patient received a face-to-face professional service from the same physician, or a same-specialty physician in the same group, within the previous three years",
      "Billed with modifier 25 when a minor procedure is performed at the same visit and the evaluation went beyond the procedure's inherent assessment",
    ],
    documentation: [
      "The note must show which problems were addressed, not merely that they exist on the problem list — an unaddressed chronic condition carried forward does not raise decision-making",
      "Where time is the basis, the total time and the fact that it was spent on the encounter date should both be recorded; a bare range copied into every note is what auditors look for first",
      "A medically appropriate history and examination still belong in the record; they no longer determine the level but their absence undermines the visit as a whole",
    ],
    example: [
      "An established patient attends for follow-up on hypertension that is stable on current medication, plus a mild seasonal complaint managed with an over-the-counter recommendation. The physician reviews home readings, makes no change to therapy and schedules a six-month review.",
      "That is low decision-making: two stable problems, minimal data, low risk. 99213 is correct, and the visit took 22 minutes including the record review, which supports it on time as well.",
      "The same encounter becomes 99214 only if something in it actually rises — the hypertension is uncontrolled and therapy is changed, or a prescription drug requiring monitoring is managed. Billing 99214 because the visit felt long, without either the decision-making or the recorded time, is the single most common finding in E/M audits.",
    ],
    context: [
      "99213 is the code most practices over-use in one direction and under-use in the other. It is the safe default: reported when the work was genuinely level four because nobody wants an audit, and reported when the work was level two because it is what the template inserts. Both cost money, and only one of them is a compliance problem.",
      "The 2021 restructure of office and outpatient E/M removed history and examination from level selection precisely because bullet-counting had stopped describing physician work. What replaced it — problems addressed, data reviewed, risk — is harder to template and easier to defend, provided the note reflects thinking rather than volume.",
      "Payers profile E/M distribution by specialty. A practice whose established-visit curve sits far from its peers in either direction attracts attention, but the distribution is a screening tool rather than a finding. What settles a review is whether individual notes support the individual codes.",
    ],
    relatedCpt: ["99214", "99215", "99204"],
    relatedModifiers: ["25", "24", "95"],
    relatedCodes: ["CO-97", "CO-50", "CO-16"],
    relatedTerms: ["e-m-coding", "cpt-code", "undercoding", "medical-necessity"],
    relatedServices: ["medical-coding", "denial-management", "practice-analytics"],
    relatedSpecialties: ["family-medicine", "internal-medicine", "pediatrics"],
    faqs: [
      { question: "What is CPT code 99213 used for?", answer: "An office or outpatient visit with an established patient involving low medical decision-making, or 20 to 29 minutes of the physician's total time on the date of the encounter. It is the mid-level of the five established-patient codes." },
      { question: "What is the time range for 99213?", answer: "20 to 29 minutes of total time on the encounter date. That includes the physician's pre-visit record review, the face-to-face time and post-visit documentation and ordering, but excludes clinical staff time and anything done on a different day." },
      { question: "What is the difference between 99213 and 99214?", answer: "Decision-making level, or time. 99213 is low complexity or 20 to 29 minutes; 99214 is moderate complexity or 30 to 39 minutes. The usual dividing line in practice is whether a problem was actively managed and therapy changed, rather than reviewed and continued." },
      { question: "Can 99213 be billed with a procedure on the same day?", answer: "Yes, with modifier 25, provided the evaluation went beyond the assessment inherent in performing that procedure. The note has to show separate history, examination and decision-making for the evaluation, or the E/M line adjusts under CO-97." },
    ],
  },
  {
    code: "99214",
    shortName: "Established Patient Visit, Moderate MDM",
    category: "Evaluation and management",
    summary:
      "99214 reports an established-patient office visit at moderate medical decision-making, or 30 to 39 minutes of total time on the encounter date. It is the most-billed level-four code in primary care and the one payers audit most often, because moderate complexity turns on judgement rather than on a countable threshold.",
    billingRules: [
      "Moderate decision-making requires two of the three elements at that level: problems addressed, data reviewed and analysed, or risk of the management selected",
      "One chronic illness with exacerbation, or two or more stable chronic illnesses, meets the problems element at moderate",
      "Prescription drug management meets the risk element on its own — including a decision not to prescribe, where that decision is documented",
      "The data element needs genuine analysis: reviewing external notes, ordering and interpreting tests, or discussing management with another clinician, each category counting once",
      "By time, 30 to 39 minutes; past 40 minutes the encounter becomes 99215 rather than 99214 with a prolonged-services add-on",
    ],
    documentation: [
      "Risk from prescription drug management should be visible as management — the drug, the decision and the reasoning — not merely a medication list rendered by the chart",
      "Where the data element is claimed, the note must show what was reviewed and what it changed; an auto-populated list of results present in the chart is not analysis",
      "Exacerbation of a chronic condition needs the clinical evidence for it, since that single word is what moves the problems element from low to moderate",
    ],
    example: [
      "A patient with type 2 diabetes attends with a rising HbA1c. The physician reviews laboratory results from an outside endocrinology practice, adjusts the oral regimen, orders repeat testing and counsels on the change.",
      "Moderate is met twice over: a chronic illness with exacerbation under problems, and prescription drug management under risk. 99214 is supported on decision-making regardless of how long the visit took.",
      "Now change one fact. The HbA1c is stable, the regimen continues unchanged and the outside results were merely acknowledged. The problems element is a stable chronic illness and the risk element is low, so the same 25-minute visit is 99213 — and reporting 99214 because two conditions appear on the problem list is the specific error that shows up in post-payment review.",
    ],
    context: [
      "The reason 99214 attracts audit attention is structural rather than suspicious. It sits directly above the most common visit type, it pays materially more than 99213, and its threshold is met by a phrase — prescription drug management — that appears in a great many notes whether or not any management occurred. That combination makes it the highest-yield code for a payer to review.",
      "Two of three elements is the rule that gets misremembered as all three. A visit with one chronic illness with exacerbation and prescription drug management qualifies at moderate even where the data element is minimal, and coders who require all three systematically undercode.",
      "Time and decision-making are alternatives, not a combination. Where the recorded time supports 99214 and the decision-making supports 99213, the higher of the two stands provided the time is documented as total time on the encounter date. Practices that only ever code on decision-making leave revenue behind on long, low-complexity visits.",
    ],
    relatedCpt: ["99213", "99215", "99204"],
    relatedModifiers: ["25", "95", "24"],
    relatedCodes: ["CO-50", "CO-97", "CO-16"],
    relatedTerms: ["e-m-coding", "upcoding", "medical-necessity", "cpt-code"],
    relatedServices: ["medical-coding", "practice-analytics", "denial-management"],
    relatedSpecialties: ["family-medicine", "internal-medicine", "cardiology"],
    faqs: [
      { question: "What is CPT code 99214 used for?", answer: "An office or outpatient visit with an established patient involving moderate medical decision-making, or 30 to 39 minutes of total time on the encounter date. It is the level-four established-patient code." },
      { question: "What qualifies as moderate medical decision-making?", answer: "Two of three elements at the moderate level: problems addressed — one chronic illness with exacerbation, or two or more stable chronic illnesses; data reviewed and analysed; or risk, which prescription drug management satisfies on its own." },
      { question: "Does prescription drug management alone justify 99214?", answer: "It satisfies the risk element, which is one of the two required elements. A second element — problems addressed or data — still has to reach moderate. In most real visits involving active drug management it does, but it should be visible in the note rather than assumed." },
      { question: "Why is 99214 audited more than other E/M codes?", answer: "Because it pays materially more than 99213, sits above the most common visit type in primary care, and one of its qualifying elements is met by a phrase that appears in many notes regardless of whether management occurred. High volume plus a judgement-based threshold is what makes it high-yield to review." },
    ],
  },
  {
    code: "99215",
    shortName: "Established Patient Visit, High MDM",
    category: "Evaluation and management",
    summary:
      "99215 is the highest established-patient office visit, reported for high medical decision-making or 40 to 54 minutes of total time on the encounter date. High complexity has a specific meaning — severe exacerbation posing a threat to life or bodily function, drug therapy requiring intensive toxicity monitoring, or a decision about hospitalisation.",
    billingRules: [
      "High decision-making requires two of three elements at that level, and the problems element means severe exacerbation or progression of a chronic illness, or an acute illness posing a threat to life or bodily function",
      "The risk element at high is met by drug therapy requiring intensive monitoring for toxicity, a decision about hospitalisation or escalation of care, or a decision to forgo further treatment because of poor prognosis",
      "By time, 40 to 54 minutes; beyond 55 minutes the prolonged services add-on applies rather than a higher base code, and Medicare uses its own prolonged-services code rather than the CPT one",
      "Intensive monitoring for toxicity means monitoring for adverse effects the drug is known to cause, not routine efficacy checks — the distinction decides most 99215 audits",
      "Reported with modifier 25 where a procedure was performed at the same visit, on the same separately-identifiable basis as any other E/M level",
    ],
    documentation: [
      "The severity language has to be earned by the clinical picture recorded, since 'severe' and 'threat to bodily function' are the words the level rests on",
      "Where hospitalisation was considered and not pursued, the note should say so — the decision itself carries the risk, whether or not the patient was admitted",
      "Time-based 99215 needs the total time recorded on the encounter date; at this level a time figure appearing in a fixed template on every visit is the fastest route to a repayment demand",
    ],
    example: [
      "A patient with heart failure attends with worsening dyspnoea and weight gain over four days. The physician reviews recent laboratory results and an echocardiogram report, adjusts diuretic therapy, arranges same-week follow-up and documents that admission was considered and deferred on the basis of the patient's response and home support.",
      "Both the problems element and the risk element reach high: severe exacerbation of a chronic illness, and a documented decision about hospitalisation. 99215 is supported on decision-making irrespective of the visit length.",
      "The failure mode is subtler than upcoding. A physician doing genuinely high-complexity work and documenting it as a routine follow-up will be paid at 99213, and the note offers nothing to appeal with. Undercoding at this level is common precisely because the clinical work feels ordinary to the clinician doing it.",
    ],
    context: [
      "99215 is a low-volume code in most practices and that is what makes its distribution informative to a payer. A primary care panel where level five appears in a small single-digit percentage of established visits is unremarkable; one where it appears in a quarter of them invites a review, because the underlying population rarely supports that rate.",
      "Intensive monitoring for toxicity is the element most often claimed loosely. The distinction is whether monitoring exists because the drug could cause harm — hepatic or renal function on a drug known for that toxicity — rather than to see whether the drug is working. Routine efficacy monitoring is moderate risk at best.",
      "The 2021 revision made time a genuine alternative at every level, which changed the economics of long visits. A 45-minute encounter dominated by counselling can be 99215 on time even where decision-making sits at moderate, and practices with counselling-heavy panels systematically undercode by never applying it.",
    ],
    relatedCpt: ["99214", "99213", "99204"],
    relatedModifiers: ["25", "24", "95"],
    relatedCodes: ["CO-50", "CO-16", "CO-151"],
    relatedTerms: ["e-m-coding", "upcoding", "medical-necessity", "denial"],
    relatedServices: ["medical-coding", "practice-analytics", "denial-management"],
    relatedSpecialties: ["internal-medicine", "family-medicine", "neurology"],
    faqs: [
      { question: "What is CPT code 99215 used for?", answer: "The highest-level office visit for an established patient: high medical decision-making, or 40 to 54 minutes of total time on the encounter date. High complexity means severe exacerbation, intensive drug toxicity monitoring, or a decision about hospitalisation." },
      { question: "What counts as high medical decision-making?", answer: "Two of three elements at the high level. Problems: severe exacerbation or progression, or an acute illness threatening life or bodily function. Risk: drug therapy requiring intensive monitoring for toxicity, a hospitalisation decision, or a decision to forgo treatment given prognosis." },
      { question: "What happens after 54 minutes?", answer: "The prolonged services add-on applies on top of 99215 rather than a higher base code. Medicare maintains its own prolonged-services code rather than recognising the CPT one, so which add-on is correct depends on the payer." },
      { question: "How often should a practice bill 99215?", answer: "There is no correct percentage — the panel decides it. What matters is that a distribution far above specialty peers is a screening trigger, and that each individual note supports its own code. The distribution is never itself the finding." },
    ],
  },
  {
    code: "99204",
    shortName: "New Patient Visit, Moderate MDM",
    category: "Evaluation and management",
    summary:
      "99204 reports an office visit for a new patient at moderate medical decision-making, or 45 to 59 minutes of total time. New-patient codes carry longer time ranges and higher payment than their established equivalents because the work of building a record from nothing is real — and because of that, whether the patient is genuinely new is audited.",
    billingRules: [
      "A patient is new only where no face-to-face professional service was received from the physician, or from a physician of the same specialty and subspecialty in the same group practice, within the previous three years",
      "Moderate decision-making is the same standard as the established-patient level four: two of three elements at moderate",
      "By time, 45 to 59 minutes of total time on the encounter date — 15 minutes wider than the established-patient equivalent",
      "The three-year test runs from the date of the last face-to-face service, and a service delivered by a different specialty within the same group does not make the patient established for this specialty",
      "Where a group has physicians and advanced practice providers, the same-specialty question follows how the provider is enrolled with that payer, not the internal job title",
    ],
    documentation: [
      "The record should support the new-patient determination — a prior encounter three years and one month ago is a defensible new patient, and a prior encounter eleven months ago is not, whatever the registration system defaulted to",
      "Level selection rests on decision-making or time exactly as it does for established patients; a comprehensive history and examination no longer raise the level however thorough they were",
      "Where time is used, the total time on the encounter date carries the code, and new-patient visits genuinely reaching 45 minutes are common enough that failing to record it is expensive",
    ],
    example: [
      "A patient attends a practice for the first time in four years with two chronic conditions previously managed elsewhere. The physician reviews external records, orders baseline laboratory testing, changes one medication and establishes a follow-up plan. Total time on the day is 52 minutes.",
      "Both routes support 99204: moderate decision-making through the data and prescription elements, and 45 to 59 minutes on time. Either is sufficient, and only one needs to be documented as the basis.",
      "Change the interval to two years and the coding changes entirely. The same work is now an established-patient visit at 99214 or 99215, because the three-year test failed — and a payer that holds the earlier claim will recode or deny it. The registration workflow, not the clinical note, is where this error is prevented.",
    ],
    context: [
      "New-patient visits pay more for a structural reason: the physician is constructing a problem list, medication history and baseline from nothing, and that work is real. The trade is that the payer holds a claims history capable of testing the assertion, which makes new-patient status one of the few E/M questions with an objective answer.",
      "The same-specialty, same-group construction is where practices lose money in the other direction. Two physicians in one group who are enrolled under genuinely different specialties each treat the patient as new, and groups that apply a blanket rule of established-for-everyone forfeit the higher code they were entitled to.",
      "Consultations complicate the picture for payers that still recognise them. Medicare has not paid consultation codes for many years and expects a new or established office visit code instead, while some commercial payers continue to accept them, so the same referral encounter can carry different codes by payer.",
    ],
    relatedCpt: ["99214", "99215", "99213"],
    relatedModifiers: ["25", "95", "57"],
    relatedCodes: ["CO-16", "CO-50", "CO-18"],
    relatedTerms: ["e-m-coding", "eligibility-verification", "cpt-code", "denial"],
    relatedServices: ["medical-coding", "eligibility-verification", "denial-management"],
    relatedSpecialties: ["family-medicine", "internal-medicine", "urgent-care"],
    faqs: [
      { question: "What is CPT code 99204 used for?", answer: "An office or outpatient visit with a new patient involving moderate medical decision-making, or 45 to 59 minutes of total time on the encounter date. It is the level-four new-patient code." },
      { question: "What makes a patient new rather than established?", answer: "No face-to-face professional service from the same physician, or from a same-specialty and same-subspecialty physician in the same group, within the previous three years. A service from a different specialty in the same group does not make the patient established." },
      { question: "What is the time range for 99204?", answer: "45 to 59 minutes of total time on the encounter date, which is 15 minutes wider than the established-patient equivalent. Total time includes the physician's record review, the visit and the documentation and ordering completed that day." },
      { question: "What happens if a patient is billed as new when they are established?", answer: "The payer holds the claims history and can recode or deny, usually recovering the difference post-payment. The error is prevented at registration rather than in the clinical note, since it turns on the date of the last face-to-face service." },
    ],
  },
  {
    code: "90791",
    shortName: "Psychiatric Diagnostic Evaluation",
    category: "Behavioral health",
    summary:
      "90791 reports the initial diagnostic evaluation in behavioural health — history, mental status, assessment and treatment recommendations, without medical services. It is not a timed code, and most payers allow it once per episode of care per provider, which makes frequency limits rather than documentation the usual denial driver.",
    billingRules: [
      "Reported without medical services; where an evaluation includes a medical assessment and prescribing, the companion code covering medical services applies instead",
      "Not time-based — the code describes a service rather than an interval, so no time threshold has to be met and none should be reported as if it were",
      "Most payers permit one per patient per provider per episode of care, and many define that operationally as once per calendar year",
      "Where a second clinician in the same group evaluates the same patient in the same period, the claim frequently duplicates against the first and needs the distinct provider and clinical rationale to survive",
      "The interactive complexity add-on applies where communication factors — a third party, a translator, a young child — genuinely complicate the evaluation, and is reported alongside rather than instead",
    ],
    documentation: [
      "The elements of the evaluation should appear as an evaluation: presenting problem, relevant history, mental status examination, diagnostic formulation and the treatment plan that follows from it",
      "Where a re-evaluation is billed within a payer's frequency window, the note must justify why — a new episode, a substantial change in presentation, or a transfer of care",
      "Interactive complexity, where reported, needs its factor named; the add-on is a specific circumstance rather than a general statement that the session was difficult",
    ],
    example: [
      "A patient is referred for anxiety and attends an intake session. The clinician takes a history, performs a mental status examination, reaches a working diagnosis and agrees a course of weekly psychotherapy. 90791 covers that encounter.",
      "The following week the therapy begins, and every subsequent session is reported with the psychotherapy codes by duration. Billing 90791 again at session two — because the clinician was still gathering history — is the error, since the diagnostic evaluation is one service rather than a phase.",
      "Six months later the patient returns after discharge with a different presentation. A second 90791 is defensible here, and whether it pays depends on the payer's frequency rule and on the note making the new episode explicit rather than leaving it to be inferred.",
    ],
    context: [
      "Behavioural health denials cluster differently from medical ones. The dominant causes are eligibility and benefit structure — carve-out plans where behavioural health is administered by a separate entity with its own authorisation rules — and frequency limits, rather than the coding of the service itself.",
      "The distinction between the evaluation with and without medical services matters more than its subtlety suggests, because it maps onto who performed it. A prescriber's evaluation including medication assessment belongs on the medical-services code, and using the non-medical code understates the work while using it in reverse invites recoupment.",
      "Payer authorisation practice varies widely: some require no authorisation for the evaluation but authorise a defined number of subsequent sessions, others authorise from the first contact. Verifying which applies before the intake is what prevents the entire episode being unpayable.",
    ],
    relatedCpt: ["90834", "90837", "90853"],
    relatedModifiers: ["95", "25"],
    relatedCodes: ["CO-119", "CO-18", "CO-197"],
    relatedTerms: ["prior-authorization", "eligibility-verification", "medical-necessity", "denial"],
    relatedServices: ["eligibility-verification", "prior-authorization", "medical-coding"],
    relatedSpecialties: ["mental-health", "pediatrics", "neurology"],
    faqs: [
      { question: "What is CPT code 90791 used for?", answer: "The initial psychiatric diagnostic evaluation without medical services — history, mental status examination, diagnostic assessment and treatment recommendations. It is the intake code in behavioural health." },
      { question: "Is 90791 a timed code?", answer: "No. It describes a service rather than a duration, so there is no time threshold to meet and no time-based unit calculation. Documentation should show the elements of the evaluation rather than a start and stop time." },
      { question: "How often can 90791 be billed?", answer: "Most payers allow one per patient per provider per episode of care, and many enforce that as once per calendar year. A second evaluation within the window needs a documented new episode, significant change in presentation, or transfer of care." },
      { question: "What is the difference between 90791 and 90792?", answer: "Medical services. 90792 covers a diagnostic evaluation that includes medical assessment and prescribing, typically performed by a prescriber; 90791 covers the evaluation without them. Using the wrong one either understates the work or invites recoupment." },
    ],
  },
  {
    code: "90834",
    shortName: "Psychotherapy, 45 Minutes",
    category: "Behavioral health",
    summary:
      "90834 reports individual psychotherapy of approximately 45 minutes, satisfied by a session of 38 to 52 minutes. The time ranges around each psychotherapy code are the whole coding rule, and the boundary between 90834 and the 60-minute code at 53 minutes is the single most-reviewed line in outpatient behavioural health billing.",
    billingRules: [
      "The 45-minute code is met by any session from 38 to 52 minutes of psychotherapy time — the ranges are contiguous, so every session length maps to exactly one code",
      "Below 38 minutes the 30-minute code applies; at 53 minutes and above the 60-minute code does",
      "Psychotherapy time is the therapy itself; time spent on separately reportable services or on administrative work is not counted toward the range",
      "Where a prescriber provides an evaluation and management service and psychotherapy in the same encounter, the psychotherapy add-on codes apply rather than the standalone ones",
      "Telehealth delivery uses the same code with the telehealth modifier and the place of service the payer specifies, and the time ranges do not change",
    ],
    documentation: [
      "The session's start and stop times, or its duration, must be recorded — the code is defined by an interval, so a note without one cannot support the code that was billed",
      "The therapeutic content should show what was done: the modality, the focus, the response and the plan, rather than a generic statement that supportive therapy was provided",
      "Where sessions consistently land at exactly the same duration across an entire caseload, the pattern rather than any individual note is what attracts review",
    ],
    example: [
      "A patient attends a weekly session running from 10:02 to 10:49 — 47 minutes of psychotherapy. That falls inside 38 to 52 minutes, so 90834 is correct and the recorded times prove it.",
      "The next session runs 10:00 to 10:56. At 56 minutes it is the 60-minute code, not 90834, and reporting 90834 out of habit undercharges for work actually performed.",
      "A third session is cut short at 34 minutes when the patient leaves early. That is the 30-minute code — not 90834 with an explanation, and not a full-length code because the appointment was scheduled for one. The clock, recorded contemporaneously, decides all three.",
    ],
    context: [
      "The contiguous ranges exist because a rule keyed to exact durations would be unworkable in a clinical setting. What they produce in practice is a boundary at 53 minutes with meaningfully different payment either side, which is why payers profile the ratio between the two codes across a provider's caseload.",
      "That profiling is a screening tool and not a finding. A practice whose model is 60-minute sessions will legitimately report the longer code almost exclusively, and the defence is scheduling records and contemporaneous times rather than a distribution that matches an average.",
      "Behavioural health carve-outs complicate everything upstream of the code. Where a plan delegates behavioural health to a separate administrator, eligibility, authorisation and the claims address all differ from the medical benefit, and a correctly coded claim sent to the wrong administrator still fails.",
    ],
    relatedCpt: ["90837", "90791", "90853"],
    relatedModifiers: ["95", "25", "52"],
    relatedCodes: ["CO-197", "CO-151", "CO-119"],
    relatedTerms: ["medical-necessity", "prior-authorization", "cpt-code", "denial"],
    relatedServices: ["medical-coding", "prior-authorization", "claims-management"],
    relatedSpecialties: ["mental-health", "pediatrics", "internal-medicine"],
    faqs: [
      { question: "What is CPT code 90834 used for?", answer: "Individual psychotherapy of approximately 45 minutes with the patient, satisfied by any session lasting 38 to 52 minutes. It is the most commonly reported outpatient psychotherapy code." },
      { question: "What is the time range for 90834?", answer: "38 to 52 minutes of psychotherapy. Below 38 minutes the 30-minute code applies; at 53 minutes and above the 60-minute code does. The ranges are contiguous, so every session maps to exactly one code." },
      { question: "What is the difference between 90834 and 90837?", answer: "Duration alone. 90834 covers 38 to 52 minutes and 90837 covers 53 minutes and beyond. Because payment differs meaningfully at that boundary, payers profile the ratio between the two across a provider's caseload." },
      { question: "Does a session have to run the full 45 minutes?", answer: "No. Anything from 38 minutes qualifies. A session ending below 38 minutes takes the 30-minute code instead — the scheduled length is irrelevant, and the contemporaneously recorded duration is what supports the claim." },
    ],
  },
  {
    code: "90837",
    shortName: "Psychotherapy, 60 Minutes",
    category: "Behavioral health",
    summary:
      "90837 reports individual psychotherapy of approximately 60 minutes, met by any session of 53 minutes or more. It pays more than the 45-minute code and is the behavioural health code payers most often subject to authorisation, utilisation review and retrospective audit — usually on the strength of a provider's utilisation ratio rather than any single note.",
    billingRules: [
      "Met at 53 minutes and beyond, with no upper boundary — a 75-minute session is still this code rather than a longer one, and the extra time is not separately reportable",
      "Some payers require prior authorisation for routine use of the 60-minute code where they do not for the 45-minute one",
      "The interactive complexity add-on may accompany it where a specific communication factor complicated the session",
      "Where the same clinician provides both an evaluation and management service and psychotherapy, the psychotherapy add-on codes replace this standalone code",
      "Session time is psychotherapy time — an encounter running 60 minutes of which 15 were spent on paperwork is not a 60-minute psychotherapy session",
    ],
    documentation: [
      "Start and stop times, recorded at the time rather than reconstructed, are the foundation of any defence of this code",
      "The note should show why the longer session was clinically indicated — the modality, the complexity of the presentation, or the phase of treatment — because medical necessity for the duration is what utilisation review actually tests",
      "Identical durations across an entire caseload, or session times that always begin and end on the hour, are the specific patterns that draw scrutiny",
    ],
    example: [
      "A patient in trauma-focused treatment attends a session running 58 minutes, using a modality where the processing phase cannot be safely truncated. The note records the times, the modality and the clinical reason the session runs long. 90837 is correct and defensible.",
      "A different provider reports 90837 for every patient on the caseload, with no recorded times and a template stating '60-minute session' in each note. The individual claims may all be legitimate, but there is nothing in the record capable of proving it, and a post-payment review can recoup the difference against the 45-minute code across the whole population.",
      "The asymmetry is what makes this code worth handling carefully: the documentation cost of recording times is trivial, while the exposure from not recording them scales with volume.",
    ],
    context: [
      "Payer treatment of this code varies more than the code itself does. Some require authorisation after a set number of sessions, some review utilisation quarterly, and some simply pay it — so the operationally correct answer is payer-specific and belongs in the practice's payer matrix rather than in a coding rule.",
      "The clinical reality is that many modalities do not fit in 45 minutes. Exposure-based and trauma-focused therapies have structural session lengths, and a policy of defaulting to the shorter code to avoid scrutiny both understates the work and, over a caseload, materially reduces revenue.",
      "Where authorisation is required, obtaining it is an eligibility and authorisation workflow question rather than a coding one. The claim fails before it is coded, and the failure is invisible in coding metrics — which is why behavioural health denial analysis should segment by cause before anyone examines code selection.",
    ],
    relatedCpt: ["90834", "90791", "90853"],
    relatedModifiers: ["95", "25", "22"],
    relatedCodes: ["CO-197", "CO-151", "CO-50"],
    relatedTerms: ["prior-authorization", "medical-necessity", "denial", "appeal"],
    relatedServices: ["prior-authorization", "denial-management", "medical-coding"],
    relatedSpecialties: ["mental-health", "pain-management", "pediatrics"],
    faqs: [
      { question: "What is CPT code 90837 used for?", answer: "Individual psychotherapy of approximately 60 minutes, met by any session of 53 minutes or more. There is no upper limit — longer sessions are still reported with this single code." },
      { question: "Does 90837 require prior authorisation?", answer: "It depends on the payer. Several require authorisation for routine use of the 60-minute code where they do not for the 45-minute one, and some review utilisation retrospectively instead. It belongs in the practice's payer matrix rather than being assumed either way." },
      { question: "Why is 90837 audited so often?", answer: "It pays more than the 45-minute code, the boundary between them is a single minute, and utilisation ratios are easy for a payer to profile across providers. Reviews are usually triggered by the ratio, then settled by whether individual notes record session times." },
      { question: "What documentation supports 90837?", answer: "Contemporaneous start and stop times, plus a clinical rationale for the session length — the modality, presentation complexity or treatment phase. Times alone prove duration; the rationale is what answers a medical necessity review." },
    ],
  },
  {
    code: "90853",
    shortName: "Group Psychotherapy",
    category: "Behavioral health",
    summary:
      "90853 reports group psychotherapy for one patient in a group setting, billed once per patient per session rather than once for the group. It covers therapy delivered in a group, not education or activity delivered to a group, and the distinction between those two is what most group-therapy denials turn on.",
    billingRules: [
      "Billed per patient — a group of eight produces eight claims, each supported by that patient's own note",
      "The service must be psychotherapy, with the group process itself as the therapeutic mechanism; psychoeducational sessions and activity groups are not this code",
      "Family psychotherapy involving one patient's family is a different service with its own codes, whether or not the patient is present",
      "No time range defines the code, but payers commonly expect a session length consistent with group therapy practice and may set their own minimum",
      "Where interactive complexity applies to a particular patient in the group, the add-on is reported on that patient's claim only",
    ],
    documentation: [
      "Each patient needs an individual note describing that patient's participation, response and progress against their own treatment plan — a single shared group note supporting eight claims is the classic audit failure",
      "The record should establish the group's therapeutic purpose and the patient's clinical indication for group treatment, since medical necessity is assessed per patient",
      "Group size should be documented where the payer sets a maximum, because a claim from a group exceeding it is deniable regardless of clinical quality",
    ],
    example: [
      "Six patients attend a weekly process group for substance use recovery. The clinician writes six notes, each recording that patient's contribution, affect, insight and progress toward their individual goals, alongside the group's focus for the session.",
      "That produces six defensible claims. The same session documented as one note stating the group topic and listing attendees produces six claims with no per-patient support, and a reviewer recoups all six rather than one.",
      "Now suppose the session was a medication education class delivered by a nurse. Attendance, topic and value to patients may all be genuine, but it is not group psychotherapy and this code does not describe it — the service is either reported under a different code or is not separately billable.",
    ],
    context: [
      "Group therapy is economically attractive precisely because one clinician hour generates several claims, and that multiplier is why the documentation standard is per patient. A reviewer examining a single group session is examining every claim from it at once, so the failure mode is systemic rather than isolated.",
      "The boundary against psychoeducation is not a technicality. Group psychotherapy uses interaction among members as the mechanism of change, which is why a lecture-format session with the same participants is a different service — and why intensive outpatient programmes bundle their components under programme codes instead.",
      "Where behavioural health is administered by a carve-out, group services frequently carry their own authorisation rules and session limits distinct from individual therapy, and exceeding a limit produces a denial that no coding change can resolve.",
    ],
    relatedCpt: ["90834", "90837", "90791"],
    relatedModifiers: ["95", "59"],
    relatedCodes: ["CO-151", "CO-197", "CO-50"],
    relatedTerms: ["medical-necessity", "denial", "prior-authorization", "cpt-code"],
    relatedServices: ["medical-coding", "denial-management", "prior-authorization"],
    relatedSpecialties: ["mental-health", "pediatrics", "family-medicine"],
    faqs: [
      { question: "What is CPT code 90853 used for?", answer: "Group psychotherapy, reported once for each patient in the group rather than once for the session. It covers therapy in which the group process is the therapeutic mechanism, not education or activity delivered to a group." },
      { question: "Is 90853 billed once per group or once per patient?", answer: "Once per patient. A group of eight generates eight claims, and each has to be supported by that patient's own note describing their participation and progress." },
      { question: "Does each patient need a separate note?", answer: "Yes. A single shared note listing attendees is the most common reason group therapy claims are recouped, because it supports no individual claim. Each note should record that patient's contribution, response and progress against their own plan." },
      { question: "Is a psychoeducation class billed as group psychotherapy?", answer: "No. Group psychotherapy relies on interaction among members as the mechanism of change. A lecture-format education session with the same participants is a different service and does not meet this code, however clinically valuable it is." },
    ],
  },
  {
    code: "98940",
    shortName: "Chiropractic Manipulation, 1-2 Regions",
    category: "Chiropractic",
    summary:
      "98940 reports chiropractic manipulative treatment of one or two spinal regions. The five spinal regions are cervical, thoracic, lumbar, sacral and pelvic, and the count of regions treated — not the number of adjustments delivered — is what selects between this code and the two above it.",
    billingRules: [
      "Region count, not adjustment count: two adjustments in one region is still one region, and this code covers one or two",
      "Medicare covers manual manipulation of the spine to correct a subluxation and nothing else — no extraspinal manipulation, no therapies, no examinations",
      "Medicare requires the active treatment modifier to indicate corrective rather than maintenance care; without it the claim is treated as maintenance and denied",
      "Maintenance care is a non-covered service for Medicare, which makes an advance beneficiary notice and the corresponding modifier the mechanism for billing the patient",
      "An evaluation and management service on the same day requires modifier 25 and a separately identifiable reason beyond the pre-manipulation assessment",
    ],
    documentation: [
      "The initial visit must establish the subluxation, the levels involved, and a treatment plan with measurable goals and a frequency and duration",
      "Each subsequent visit needs the standard assessment findings and the patient's response to treatment, showing progression toward the plan's goals rather than a static record repeated visit to visit",
      "The specific regions treated must be identifiable in the note, since the region count is the entire basis of code selection",
    ],
    example: [
      "A patient presents with neck pain and upper back tightness. The examination documents subluxation in the cervical and thoracic regions, and both are adjusted. Two regions, so 98940 is correct.",
      "Three weeks later the patient's lumbar spine becomes symptomatic and is documented and treated as well. That visit is three regions and moves to the next code up — the change is driven by the documented examination, not by the length of the visit or the number of thrusts.",
      "Once the treatment plan's goals are met and the patient continues attending to maintain function, the care becomes maintenance. For Medicare that is non-covered: the visit is billed with an advance beneficiary notice on file and the modifier indicating a signed notice, which shifts the balance to the patient rather than producing an unexpected write-off.",
    ],
    context: [
      "Chiropractic is one of the most heavily reviewed services in Medicare, and the reason is documentation rather than clinical merit. The requirement to distinguish active corrective treatment from maintenance is easy to state and easy to fail, because a note that looks the same in week two and week twenty demonstrates maintenance by its own repetition.",
      "The region-count structure creates a visible distribution: three codes covering one or two, three or four, and five regions. A practice reporting the middle code almost exclusively is the pattern most often selected for review, and the answer is examination findings that actually vary by patient.",
      "Coverage outside Medicare varies sharply. Many commercial plans cover therapies and examinations that Medicare excludes, and several impose visit caps or require authorisation after a set number — so the same clinical course is billed differently by payer, and verifying which applies before the plan is written is what prevents mid-course denials.",
    ],
    relatedCpt: ["98941", "98942", "97140"],
    relatedModifiers: ["25", "GA", "59"],
    relatedCodes: ["CO-50", "CO-97", "PR-49"],
    relatedTerms: ["medical-necessity", "denial", "modifier", "patient-responsibility"],
    relatedServices: ["medical-coding", "denial-management", "eligibility-verification"],
    relatedSpecialties: ["chiropractic", "physical-therapy", "pain-management"],
    faqs: [
      { question: "What is CPT code 98940 used for?", answer: "Chiropractic manipulative treatment of one or two spinal regions. The five spinal regions are cervical, thoracic, lumbar, sacral and pelvic, and the number of regions treated selects the code." },
      { question: "Does the number of adjustments affect the code?", answer: "No. Code selection is by region count, not by how many adjustments were performed. Two adjustments within the cervical region is still one region and still this code." },
      { question: "Does Medicare cover chiropractic care?", answer: "Only manual manipulation of the spine to correct a subluxation, and only where the treatment is active and corrective. Examinations, therapies and extraspinal manipulation are not covered, and maintenance care is excluded." },
      { question: "How is maintenance care billed?", answer: "As a non-covered service, with an advance beneficiary notice signed before the visit and the modifier indicating that a notice is on file. That makes the patient responsible rather than producing an unexpected write-off." },
    ],
  },
  {
    code: "98941",
    shortName: "Chiropractic Manipulation, 3-4 Regions",
    category: "Chiropractic",
    summary:
      "98941 reports chiropractic manipulative treatment of three or four spinal regions. It is the most frequently reported chiropractic code in the United States, and the ratio between it and the one- to two-region code across a provider's claims is one of the most commonly profiled patterns in outpatient billing.",
    billingRules: [
      "Three or four of the five spinal regions treated at the visit — cervical, thoracic, lumbar, sacral, pelvic",
      "Each region billed must have a documented subluxation and a documented reason for treating it; regions adjusted as a matter of routine technique are not regions supported for billing",
      "For Medicare, the active treatment modifier is required for the visit to be considered corrective rather than maintenance",
      "The sacral and pelvic regions are distinct for counting purposes, which is where region counts most often drift upward without the examination to match",
      "Same-day evaluation and management requires modifier 25 and documentation that goes beyond the assessment inherent in the manipulation",
    ],
    documentation: [
      "The examination must identify subluxation in each region billed, at named levels — a claim for four regions supported by findings in two is a partial recoupment rather than a denial",
      "The treatment plan must show measurable goals and an expected frequency and duration, and subsequent notes must show movement toward them",
      "Notes that repeat verbatim across visits are the single strongest evidence a reviewer has that care has become maintenance, whatever the modifier on the claim says",
    ],
    example: [
      "A patient with low back pain radiating into the pelvis is examined and found to have subluxation in the lumbar, sacral and pelvic regions. All three are treated and documented individually. Three regions supports 98941.",
      "Over the following weeks the pelvic findings resolve and are no longer treated. The visits become two regions and should drop to the lower code. Continuing to report three regions because the plan was written for three is exactly the pattern a post-payment review identifies, since the notes themselves show the change.",
      "The reverse error costs money in the other direction. A practice that documents four regions properly and bills the lower code out of caution is giving away the difference on every visit, across a caseload, indefinitely.",
    ],
    context: [
      "This code's dominance in national claims data is what draws attention to it. When one code accounts for the majority of a specialty's volume, payers profile deviation from the mean, and a practice reporting it on nearly every visit is a natural review candidate — not because the code is wrong, but because it is the highest-yield place to look.",
      "The defence is never the distribution. It is examination findings that vary patient to patient and visit to visit, region counts that change as the clinical picture changes, and a treatment plan with an endpoint. Practices that produce those documents survive review with the distribution unchanged.",
      "The economics push the wrong way. Region counts creep upward because the differential is small per visit and large per year, and the notes rarely get harder to write. That is precisely why the pattern is monitored, and why the file-level fix is examination discipline rather than a coding rule.",
    ],
    relatedCpt: ["98940", "98942", "97140"],
    relatedModifiers: ["25", "GA", "59"],
    relatedCodes: ["CO-50", "CO-97", "CO-151"],
    relatedTerms: ["medical-necessity", "upcoding", "denial", "appeal"],
    relatedServices: ["medical-coding", "denial-management", "practice-analytics"],
    relatedSpecialties: ["chiropractic", "pain-management", "physical-therapy"],
    faqs: [
      { question: "What is CPT code 98941 used for?", answer: "Chiropractic manipulative treatment of three or four spinal regions in a single visit. It is the most frequently reported chiropractic code, covering the middle of the three region-count codes." },
      { question: "What are the five spinal regions?", answer: "Cervical, thoracic, lumbar, sacral and pelvic. Sacral and pelvic count separately, which is where region counts most often drift upward without examination findings to support the additional region." },
      { question: "Why is 98941 reviewed so often?", answer: "Because it dominates national chiropractic claims volume, which makes it the highest-yield code for a payer to profile. Reviews are triggered by utilisation patterns and settled by whether examination findings document subluxation in each region billed." },
      { question: "What documentation supports three or four regions?", answer: "An examination identifying subluxation at named levels in each region billed, a treatment plan with measurable goals and an expected duration, and visit notes showing response to treatment rather than repeating verbatim." },
    ],
  },
  {
    code: "98942",
    shortName: "Chiropractic Manipulation, 5 Regions",
    category: "Chiropractic",
    summary:
      "98942 reports chiropractic manipulative treatment of all five spinal regions in one visit. It is the least-used and most-scrutinised of the three manipulation codes, because treating every spinal region requires documented subluxation in every spinal region — a clinical picture that exists but is uncommon.",
    billingRules: [
      "All five regions — cervical, thoracic, lumbar, sacral and pelvic — treated and documented at the same visit",
      "Every region billed needs its own documented subluxation and clinical indication; there is no aggregate justification covering the set",
      "The active treatment modifier applies for Medicare exactly as it does for the lower codes, and maintenance care remains non-covered",
      "The payment differential over the three- to four-region code is modest, which is why the code rarely repays the documentation burden unless the findings are genuinely there",
      "Some payers apply frequency edits to this code specifically, denying repeated use across consecutive visits regardless of the notes",
    ],
    documentation: [
      "Findings in all five regions, at named levels, in the same examination — the practical test a reviewer applies is whether the examination could plausibly have produced them",
      "A clinical rationale for whole-spine treatment, since a five-region course reported repeatedly reads as technique-driven rather than finding-driven",
      "Response to treatment recorded per region where possible, because a plan targeting five regions should show five regions changing",
    ],
    example: [
      "A patient involved in a motor vehicle collision presents with pain across the entire spine. The examination documents subluxation in all five regions with specific levels, and all five are treated. 98942 is supported and defensible.",
      "As recovery progresses the regions involved narrow, and the codes should narrow with them — to three or four regions, then to one or two. A course that reports five regions from first visit to discharge tells a reviewer the code reflects protocol rather than findings.",
      "Where a practice reports five regions routinely, the exposure is not one visit. It is every visit in every affected episode, assessed against notes that were written the same way each time.",
    ],
    context: [
      "The risk-to-reward ratio on this code is unfavourable in a way that is worth stating plainly. The payment increment over the three- to four-region code is small; the additional documentation burden is significant; and the audit exposure is disproportionate because the code stands out in any distribution.",
      "That does not make it wrong to bill. Whole-spine involvement after trauma is real, and a practice that documents it properly should be paid for it. The point is that the code should follow findings rather than technique, and a five-region default is a compliance problem wearing a clinical justification.",
      "Payer frequency edits complicate matters further: several will pay the code occasionally and deny it on repetition, so a legitimate extended course can still produce denials that appeal successfully only with per-visit examination findings attached.",
    ],
    relatedCpt: ["98941", "98940", "97140"],
    relatedModifiers: ["25", "GA", "59"],
    relatedCodes: ["CO-151", "CO-50", "CO-97"],
    relatedTerms: ["upcoding", "medical-necessity", "denial", "appeal"],
    relatedServices: ["medical-coding", "denial-management", "ar-management"],
    relatedSpecialties: ["chiropractic", "pain-management", "orthopedics"],
    faqs: [
      { question: "What is CPT code 98942 used for?", answer: "Chiropractic manipulative treatment of all five spinal regions — cervical, thoracic, lumbar, sacral and pelvic — in a single visit. It is the highest of the three region-count codes." },
      { question: "Why is 98942 flagged so frequently?", answer: "Because treating all five regions requires documented subluxation in all five, which is uncommon. The code stands out in any utilisation distribution, and the payment increment over the lower code is small relative to the review exposure it invites." },
      { question: "Can 98942 be billed for every visit in a course of care?", answer: "Only where every visit documents findings in all five regions, which is rare. Several payers also apply frequency edits denying repeated use, so a genuine extended course often needs per-visit examination findings attached on appeal." },
      { question: "Is 98942 worth billing?", answer: "Where the findings are genuinely there, yes — the work was done and should be paid. Where they are not, the small payment differential does not come close to covering the audit exposure the code creates across a caseload." },
    ],
  },
  {
    code: "97110",
    shortName: "Therapeutic Exercise, Timed",
    category: "Physical medicine",
    summary:
      "97110 reports therapeutic exercise to develop strength, endurance, range of motion or flexibility. It is a timed code billed in 15-minute units under direct one-to-one contact, and the number of units is decided by total timed minutes under the eight-minute rule rather than by rounding each service separately.",
    billingRules: [
      "Billed in 15-minute units of direct one-to-one patient contact; supervised exercise without the therapist present is not this code",
      "Under Medicare's eight-minute rule, units come from total timed-code minutes in the session: 8 to 22 minutes is one unit, 23 to 37 is two, 38 to 52 is three, and so on",
      "Minutes from all timed codes in the session are summed first, then allocated — billing each code's minutes independently and rounding each is the most common unit error",
      "Untimed services performed in the same session do not contribute minutes to the calculation",
      "Where the annual therapy threshold is exceeded, the modifier attesting medical necessity is required for continued payment",
    ],
    documentation: [
      "Timed minutes per service, recorded so that total treatment time and total timed minutes are both derivable from the note",
      "The specific exercises, the body parts treated and the objective they serve — strength, endurance, range of motion or flexibility — since the code is defined by purpose rather than activity",
      "Objective measures showing progress toward functional goals, because continued medical necessity is what supports a course of treatment rather than any single session",
    ],
    example: [
      "A patient receives 22 minutes of therapeutic exercise and 20 minutes of manual therapy in the same visit. Total timed minutes are 42, which is three units under the eight-minute rule.",
      "Those three units are then allocated between the two services by their minutes: two units of therapeutic exercise and one of manual therapy, reflecting the larger share. Billing two units for each service — rounding 22 up and 20 up independently — claims four units where three were earned, and is the error most commonly found in therapy audits.",
      "The same session without direct one-to-one contact for part of the time is shorter still. Minutes during which the patient exercised independently while the therapist treated someone else are not billable minutes for this code, however therapeutic the exercise was.",
    ],
    context: [
      "The eight-minute rule exists to stop a fifteen-minute unit being claimed for a few minutes of work, and it is arithmetic rather than judgement — which is why unit errors are the most reliably identified finding in any therapy review. Automated edits detect them without reading a note.",
      "Multiple procedure payment reduction compounds the economics. When several therapy services are billed on one date, the practice expense component of the lower-paying ones is reduced, so a session's revenue is not the sum of its parts and unit inflation buys less than it appears to.",
      "The therapy threshold that replaced the old hard caps still requires an attestation modifier past a dollar amount, and claims above a higher threshold face targeted review. Neither is a coverage limit, but both are workflow requirements that silently stop payment when missed.",
    ],
    relatedCpt: ["97140", "97530", "97597"],
    relatedModifiers: ["59", "KX", "XU"],
    relatedCodes: ["CO-151", "CO-97", "CO-50"],
    relatedTerms: ["medical-necessity", "ncci-edits", "modifier", "denial"],
    relatedServices: ["medical-coding", "denial-management", "practice-analytics"],
    relatedSpecialties: ["physical-therapy", "orthopedics", "chiropractic"],
    faqs: [
      { question: "What is CPT code 97110 used for?", answer: "Therapeutic exercise to develop strength, endurance, range of motion or flexibility, delivered in direct one-to-one contact with the patient and billed in 15-minute units." },
      { question: "How does the eight-minute rule work?", answer: "Total the minutes across all timed codes in the session, then convert: 8 to 22 minutes is one unit, 23 to 37 is two, 38 to 52 is three, and so on. Allocate the units to services by their share of the minutes." },
      { question: "Can units be calculated per code instead of per session?", answer: "Not under Medicare's rule. Rounding each service's minutes independently produces more units than the session earned, and it is the most reliably detected error in therapy billing because an edit can find it without reading the note." },
      { question: "Does supervised exercise count toward 97110?", answer: "No. The code requires direct one-to-one contact. Minutes in which the patient exercises independently while the therapist is occupied elsewhere are not billable minutes, however appropriate the exercise is." },
    ],
  },
  {
    code: "97140",
    shortName: "Manual Therapy Techniques, Timed",
    category: "Physical medicine",
    summary:
      "97140 reports manual therapy — mobilisation, manipulation, manual lymphatic drainage and manual traction — in 15-minute units of direct contact. Its defining billing problem is the edit against chiropractic manipulation: performed on the same spinal region, the two are one service, and separating them requires a different region and the modifier to say so.",
    billingRules: [
      "Timed in 15-minute units of direct one-to-one contact, counted into the session total under the same eight-minute rule as other timed therapy codes",
      "Bundled with chiropractic manipulative treatment when performed on the same spinal region on the same day — the manipulation code includes the manual work in that region",
      "Separately payable where performed on a different region than the manipulation, reported with the modifier identifying the distinct anatomical site",
      "The generic distinct-service modifier is accepted by most payers, but the specific separate-structure modifier states the actual reason and is the better choice where the payer recognises it",
      "Applying a distinct-service modifier to clear the edit without a genuinely different region is the pattern that converts a recoverable denial into an audit finding",
    ],
    documentation: [
      "The region treated with manual therapy must be named and must differ from the manipulated region for the modifier to be defensible",
      "The technique performed should be identified — mobilisation, manual traction, lymphatic drainage — rather than recorded as generic manual therapy",
      "Timed minutes recorded separately from other services in the session, since the unit calculation depends on the split",
    ],
    example: [
      "A chiropractor adjusts the lumbar and sacral regions and then performs 15 minutes of soft tissue mobilisation on the cervical spine. The manual therapy is a different region from the manipulation, so it is separately reportable with the modifier identifying the separate structure.",
      "Change the manual therapy to the lumbar region and the answer reverses. It is now the same region as the manipulation, the work is included in the manipulation code, and a modifier does not make it payable — it makes it an unsupported override.",
      "The remittance is the same in both cases at first: a bundling denial on the manual therapy line. The difference is that the first appeals successfully on the note, and the second should never have been billed.",
    ],
    context: [
      "This edit is one of the most consistently mis-handled in outpatient billing, because the fix looks like a modifier and is actually a documentation question. The modifier asserts that services were distinct; only the note can establish that they were, and reviewers read the note rather than the claim.",
      "The specific separate-structure modifier was introduced alongside three others precisely to replace reflexive use of the generic one. Each states why services were distinct — different encounter, different structure, different practitioner, or unusual non-overlapping service — and payer acceptance still varies, so the practice's payer matrix decides which to send.",
      "The volume makes it material. In chiropractic and physical therapy settings the manipulation-plus-manual-therapy combination occurs daily, so a systematic error in either direction — always bundling, or always overriding — compounds across thousands of claims before anyone reviews it.",
    ],
    relatedCpt: ["97110", "98941", "97530"],
    relatedModifiers: ["59", "XS", "XU"],
    relatedCodes: ["CO-97", "CO-B15", "CO-151"],
    relatedTerms: ["ncci-edits", "modifier", "denial", "appeal"],
    relatedServices: ["medical-coding", "denial-management", "claims-management"],
    relatedSpecialties: ["chiropractic", "physical-therapy", "orthopedics"],
    faqs: [
      { question: "What is CPT code 97140 used for?", answer: "Manual therapy techniques — mobilisation, manipulation, manual lymphatic drainage and manual traction — delivered in direct one-to-one contact and billed in 15-minute units." },
      { question: "Can 97140 be billed with chiropractic manipulation?", answer: "Only where the manual therapy was performed on a different spinal region than the manipulation, and reported with the modifier identifying the separate structure. Same region, same day, the manual work is included in the manipulation code." },
      { question: "Which modifier separates 97140 from a manipulation code?", answer: "The separate-structure modifier states the actual reason and is preferred where the payer recognises it. The generic distinct-service modifier is more widely accepted but says less, and neither works without a note documenting the different region." },
      { question: "Why does 97140 deny with a bundling code so often?", answer: "Because the edit pairs it with same-region manipulation by default. A denial is correct where the regions matched and appealable where they did not — which makes the note, not the modifier, the thing that decides the outcome." },
    ],
  },
  {
    code: "97530",
    shortName: "Therapeutic Activities, Timed",
    category: "Physical medicine",
    summary:
      "97530 reports dynamic activities designed to improve functional performance — lifting, carrying, reaching, transfers — in 15-minute units of direct contact. It is separated from therapeutic exercise by purpose rather than by exertion: exercise builds a physical capacity, activities apply capacities to a functional task.",
    billingRules: [
      "Timed in 15-minute units of direct one-to-one contact and counted into the session total under the eight-minute rule",
      "The activity must be functional and dynamic, tied to a task the patient needs to perform, rather than an isolated strength or range-of-motion exercise",
      "Where therapeutic exercise and therapeutic activities are both performed, both are reportable, and the session's total timed minutes are allocated between them",
      "An edit pairs this code with some evaluation and other therapy services, so simultaneous reporting may need a distinct-service modifier supported by the note",
      "The annual therapy threshold attestation applies here as it does to the other timed therapy codes",
    ],
    documentation: [
      "The functional goal must be visible: which task the activity targets and what limitation it addresses, not merely which movements were performed",
      "Timed minutes for this service separately from other timed services, since unit allocation depends on the split",
      "Progress recorded against the functional objective — the case for continuing treatment is functional improvement rather than repetition of the activity",
    ],
    example: [
      "A patient recovering from a shoulder injury spends 15 minutes on resisted rotator cuff work and 20 minutes practising overhead lifting and carrying tasks needed to return to work.",
      "The first is therapeutic exercise, building a capacity. The second is therapeutic activities, applying that capacity to the functional demand. Total timed minutes are 35, which is two units, allocated one to each service by their shares.",
      "Documented as 35 minutes of exercise, the same session loses the functional narrative entirely — and with it the strongest evidence that treatment is producing the return-to-work outcome the plan of care was written to achieve.",
    ],
    context: [
      "The distinction between exercise and activities is a documentation distinction more than a clinical one, and it matters because the two answer different questions. Exercise shows the impairment being treated; activities show the disability being resolved. Reviewers assessing medical necessity for a long course are looking for the second.",
      "Practices tend to under-report activities and over-report exercise, because exercise is easier to describe. The result is a record that documents strength gains for months without ever demonstrating functional change, which is precisely the profile that attracts a medical necessity review.",
      "As with every timed therapy code, the unit arithmetic is where automated recoupment happens. Allocating session units by minute share rather than rounding per code is the single behaviour that keeps a therapy practice out of the most common finding in its specialty.",
    ],
    relatedCpt: ["97110", "97140", "97597"],
    relatedModifiers: ["59", "KX", "XU"],
    relatedCodes: ["CO-97", "CO-151", "CO-50"],
    relatedTerms: ["medical-necessity", "ncci-edits", "denial", "cpt-code"],
    relatedServices: ["medical-coding", "denial-management", "practice-analytics"],
    relatedSpecialties: ["physical-therapy", "orthopedics", "neurology"],
    faqs: [
      { question: "What is CPT code 97530 used for?", answer: "Dynamic therapeutic activities that improve functional performance — lifting, carrying, reaching, transfers — delivered in direct one-to-one contact and billed in 15-minute units." },
      { question: "What is the difference between 97530 and 97110?", answer: "Purpose. Therapeutic exercise builds a physical capacity such as strength or range of motion; therapeutic activities apply capacities to a functional task the patient needs to perform. Both can be billed in one session, with units allocated by minutes." },
      { question: "Can 97530 and 97110 be billed on the same day?", answer: "Yes, where both were genuinely performed. Total the session's timed minutes, convert to units under the eight-minute rule, then allocate the units between the services by their share of the minutes." },
      { question: "What documentation does 97530 need?", answer: "The functional goal the activity targets, the limitation it addresses, the minutes spent, and progress against that functional objective. Activity descriptions without a functional target read as exercise and undermine the medical necessity case." },
    ],
  },
  {
    code: "97597",
    shortName: "Selective Wound Debridement",
    category: "Physical medicine",
    summary:
      "97597 reports selective debridement of a wound — removing devitalised tissue without cutting into viable tissue — for the first 20 square centimetres of wound surface. It is selected by surface area rather than time, and its boundary against surgical debridement is depth: this code stops at non-viable tissue.",
    billingRules: [
      "Covers the first 20 square centimetres of wound surface; each additional 20 square centimetres or part thereof is reported with the add-on code",
      "Surface areas of multiple wounds debrided at the same depth are summed before the area is converted to units",
      "Selective means removal of non-viable tissue only — high pressure waterjet, sharp selective removal with scissors, scalpel or forceps, and enzymatic or autolytic methods",
      "Where debridement extends into viable subcutaneous tissue, muscle, fascia or bone, the surgical debridement codes apply instead and are selected by depth",
      "The same wound is not billed under both families on the same day; the deepest tissue actually removed determines which family applies",
    ],
    documentation: [
      "Wound measurements in centimetres before and after debridement, since the area billed is the area debrided rather than the area of the wound",
      "The tissue removed and the method used, which together establish that the debridement was selective rather than surgical",
      "The wound's characteristics and response over time, because coverage for a course of debridement rests on the wound demonstrably progressing",
    ],
    example: [
      "A patient has two pressure injuries, one measuring 12 square centimetres and one 15. Both are debrided selectively at the same visit, removing slough without entering viable tissue.",
      "The areas sum to 27 square centimetres. That is one unit of 97597 for the first 20 and one add-on unit for the remaining seven — the add-on covers each additional 20 or part of it, so a partial increment still bills as a full add-on unit.",
      "Had the clinician excised into viable subcutaneous tissue on the larger wound, that wound moves to the surgical debridement family selected by depth, and it would be billed there rather than here. Reporting both families for the same wound on the same day is the error the edits are built to catch.",
    ],
    context: [
      "Wound care billing is unusual in being driven by measurement. Area determines units for selective debridement and depth determines code family for surgical debridement, so a note without dimensions and without a statement of the deepest tissue removed cannot support either.",
      "Debridement has been a recurring focus of federal oversight, and the pattern examined is almost always the same: surgical debridement codes reported where the documentation describes selective removal of slough. The difference in payment between the families is large, which is what makes the pattern worth examining.",
      "Coverage for a series of debridements depends on the wound improving. Where the record shows the same measurements week after week, the question shifts from coding to whether continued debridement is reasonable — and a wound that genuinely is not progressing needs a documented change of plan rather than another identical visit.",
    ],
    relatedCpt: ["11042", "97110", "97530"],
    relatedModifiers: ["59", "XU", "KX"],
    relatedCodes: ["CO-97", "CO-151", "CO-50"],
    relatedTerms: ["medical-necessity", "ncci-edits", "denial", "cpt-code"],
    relatedServices: ["medical-coding", "denial-management", "claims-management"],
    relatedSpecialties: ["wound-care", "podiatry", "physical-therapy"],
    faqs: [
      { question: "What is CPT code 97597 used for?", answer: "Selective debridement of a wound — removing devitalised tissue without cutting into viable tissue — covering the first 20 square centimetres of wound surface debrided." },
      { question: "How is the area calculated for 97597?", answer: "By summing the surface areas of all wounds debrided at the same depth, then converting: the first 20 square centimetres on this code and each additional 20 or part of it on the add-on code." },
      { question: "What is the difference between 97597 and 11042?", answer: "Depth. Selective debridement removes non-viable tissue only; the surgical debridement codes apply once viable subcutaneous tissue, muscle, fascia or bone is removed, and are selected by the deepest tissue actually removed." },
      { question: "Can both debridement families be billed for the same wound?", answer: "Not on the same day for the same wound. The deepest tissue removed decides which family applies, and reporting both is the pattern the edits and federal reviews are specifically designed to identify." },
    ],
  },
  {
    code: "96413",
    shortName: "Chemotherapy IV Infusion, Initial Hour",
    category: "Drug administration",
    summary:
      "96413 reports chemotherapy administration by intravenous infusion for up to one hour, as the initial service of the encounter. Drug administration coding is governed by a hierarchy — chemotherapy outranks therapeutic infusion, which outranks hydration — and exactly one initial code is reported per encounter per vascular access site.",
    billingRules: [
      "One initial service per encounter, chosen as the highest service in the hierarchy performed, regardless of the order in which services were given",
      "Chemotherapy sits above therapeutic, prophylactic and diagnostic infusions, which sit above hydration; the initial code comes from the highest tier present",
      "Covers infusion up to one hour; each additional hour beyond the first is reported with the add-on code, which requires more than 30 minutes beyond the previous increment",
      "A second initial code is reportable only where a separate vascular access site was genuinely required, with the modifier documenting the distinct service",
      "The drug itself is billed separately under its own supply code with units matching the amount administered, and unit errors there are a leading cause of denials on otherwise correct administration claims",
    ],
    documentation: [
      "Infusion start and stop times, since the hour increments and every add-on unit are derived from them",
      "The vascular access used, and for any second initial service, why a separate site was required",
      "The drug, dose and wastage, because the administration claim and the drug claim are adjudicated against each other and a mismatch denies one or both",
    ],
    example: [
      "A patient receives a 90-minute chemotherapy infusion followed by 45 minutes of hydration through the same line. The chemotherapy is the highest service in the hierarchy, so it takes the initial code: 96413 for the first hour plus one add-on hour for the remaining 30 minutes.",
      "The hydration cannot also be an initial service — it is reported with its own sequential or concurrent code, because only one initial service exists per encounter per access site. Billing hydration as initial because it was given last is the hierarchy error the edits detect immediately.",
      "The 30-minute remainder is the second trap. The additional-hour add-on requires more than 30 minutes beyond the previous increment, so a 90-minute infusion earns it while an 85-minute infusion does not — and the difference is visible only in the recorded times.",
    ],
    context: [
      "The hierarchy exists because a single encounter routinely involves several infusions through one line, and without a rule every one of them would be billed as an initial service. Understanding that the rule is about the encounter rather than the sequence is what makes the rest of drug administration coding tractable.",
      "Medically unlikely edits sit on the drug supply codes and cap the units payable per date of service. Oncology units are unit-dense by nature, so a correct high-dose administration can exceed the edit and deny — recoverable, but only with documentation of the dose and the clinical rationale attached.",
      "This code carries measured search demand for this site with no page previously existing, which is the reason it appears in the first tranche of this reference. Specific administration codes are queried by billers working a remittance, not by buyers, and that is exactly the audience a reference page should serve.",
    ],
    relatedCpt: ["96415", "96365", "96372"],
    relatedModifiers: ["59", "XE", "XU"],
    relatedCodes: ["CO-151", "CO-97", "CO-16"],
    relatedTerms: ["hcpcs", "ncci-edits", "medical-necessity", "denial"],
    relatedServices: ["medical-coding", "denial-management", "prior-authorization"],
    relatedSpecialties: ["oncology", "nephrology", "internal-medicine"],
    faqs: [
      { question: "What is CPT code 96413 used for?", answer: "Chemotherapy administration by intravenous infusion for up to one hour, reported as the initial service of the encounter. It is the base code for a chemotherapy infusion session." },
      { question: "How many initial infusion codes can be billed per visit?", answer: "One per encounter per vascular access site, taken from the highest service in the hierarchy performed — chemotherapy above therapeutic infusion above hydration. A second initial code needs a genuinely separate access site and a modifier." },
      { question: "When does the additional-hour add-on apply?", answer: "When infusion time exceeds the previous increment by more than 30 minutes. A 90-minute infusion earns one add-on unit; an 85-minute infusion does not, which is why recorded start and stop times decide the claim." },
      { question: "Is the chemotherapy drug billed separately from 96413?", answer: "Yes. The administration and the drug are separate claims lines, the drug billed under its own supply code with units matching the dose given. Mismatched units are a leading cause of denial on otherwise correct administration claims." },
    ],
  },
  {
    code: "96415",
    shortName: "Chemotherapy Infusion, Each Extra Hour",
    category: "Drug administration",
    summary:
      "96415 is the add-on for each additional hour of chemotherapy infusion beyond the initial hour. It cannot be billed alone, and the threshold that decides whether an hour has been earned is more than 30 minutes past the previous increment — which makes recorded infusion times, rather than scheduled duration, the entire basis of the claim.",
    billingRules: [
      "An add-on code: reported only alongside the initial chemotherapy infusion code, never independently",
      "Each unit represents an additional hour, earned once infusion runs more than 30 minutes beyond the previous increment",
      "Units accumulate by that same rule — a 3 hour 40 minute infusion earns the initial hour plus three add-on units, since the final 40 minutes exceeds 30",
      "Time counts actual infusion, not chair time; setup, flushing between agents and observation after the infusion ends do not extend the billed duration",
      "Payer medically unlikely edits cap add-on units per date of service, so genuinely long infusions can require documentation attached to pay in full",
    ],
    documentation: [
      "Start and stop times for the infusion itself, recorded contemporaneously — this code has no defensible basis without them",
      "Where multiple agents infuse sequentially, times per agent, since sequential infusions are coded differently from a single prolonged one",
      "Any interruption and its reason, because a paused infusion's billed time is the time infusing rather than the elapsed clock time",
    ],
    example: [
      "An infusion runs from 09:15 to 12:05 — 2 hours 50 minutes. The initial hour takes the base code. The second hour is complete. The remaining 50 minutes exceeds 30, so it earns a third increment. Two add-on units in total.",
      "Now change the stop time to 11:40, giving 2 hours 25 minutes. The remaining 25 minutes does not exceed 30, so only one add-on unit is earned. A 25-minute difference in the record changes the payable amount, which is why time capture at the chair rather than at the end of the day matters.",
      "Where the schedule said three hours and the infusion actually ran two and a half, the schedule is irrelevant. Billing to the appointment length rather than the recorded infusion is the most common source of overpayment in infusion billing.",
    ],
    context: [
      "Add-on codes are structurally different from standalone codes in a way that shapes denials: rejected outright when the primary code is missing from the claim, or when the primary was denied. A large share of add-on denials are therefore consequences of a problem on another line rather than anything wrong with the add-on itself.",
      "Infusion time is one of the few billing quantities that a clinical workflow measures naturally and a billing workflow routinely loses. Times are recorded on the flow sheet and then summarised into a duration, and the summarising step is where 50 minutes becomes 'about an hour'.",
      "The volume of units in oncology makes small systematic errors large. A practice consistently earning one fewer add-on unit than the record supports loses a meaningful sum annually without a single denial appearing anywhere — the claims pay, they simply pay less than they should.",
    ],
    relatedCpt: ["96413", "96365", "96372"],
    relatedModifiers: ["59", "76", "XE"],
    relatedCodes: ["CO-151", "CO-16", "CO-97"],
    relatedTerms: ["cpt-code", "denial", "underpayment", "charge-capture"],
    relatedServices: ["medical-coding", "practice-analytics", "denial-management"],
    relatedSpecialties: ["oncology", "nephrology", "internal-medicine"],
    faqs: [
      { question: "What is CPT code 96415 used for?", answer: "Each additional hour of chemotherapy infusion beyond the initial hour. It is an add-on code and is reported alongside the initial chemotherapy infusion code, never on its own." },
      { question: "When is an additional hour earned?", answer: "When infusion time runs more than 30 minutes beyond the previous increment. A 2 hour 50 minute infusion earns two add-on units; a 2 hour 25 minute infusion earns one." },
      { question: "Does chair time count toward 96415?", answer: "No. Only actual infusion time counts. Setup, flushing between agents and post-infusion observation do not extend billable duration, and billing to the scheduled appointment length is the most common source of overpayment here." },
      { question: "Why would 96415 deny when the infusion clearly ran long?", answer: "Usually because of the other line rather than this one: a missing or denied primary infusion code takes the add-on with it. Unit caps on the date of service are the second cause, and those are recoverable with the times and clinical rationale attached." },
    ],
  },
  {
    code: "96365",
    shortName: "IV Infusion, Initial Hour",
    category: "Drug administration",
    summary:
      "96365 reports an intravenous infusion for therapy, prophylaxis or diagnosis, up to one hour, as the initial service of the encounter. It sits in the middle of the drug administration hierarchy — below chemotherapy and above hydration — and the hierarchy, not the clock, decides which service in a multi-infusion visit takes the initial code.",
    billingRules: [
      "One initial service per encounter per access site, taken from the highest tier performed: chemotherapy, then therapeutic infusion, then hydration",
      "Infusion must run longer than 15 minutes to be an infusion at all; at or below that it is reported as an injection instead",
      "Additional hours use the add-on code and follow the same more-than-30-minutes rule as chemotherapy infusion",
      "Sequential infusions of different drugs through the same access use the sequential add-on rather than a second initial code; concurrent infusions have their own code, reportable once per encounter",
      "The drug is billed separately with units matching the dose administered, and wastage is documented and reported where the payer's policy allows it",
    ],
    documentation: [
      "Start and stop times per drug, because the initial-versus-sequential distinction and every add-on unit are derived from them",
      "The access site, and for any second initial service, why a separate site was clinically required",
      "The clinical indication for infusion rather than injection, since the route affects both the code family and the medical necessity assessment",
    ],
    example: [
      "A patient receives an hour of intravenous antibiotics followed by 45 minutes of hydration through the same line. The antibiotic infusion is the higher tier, so it takes the initial code; the hydration is reported with its sequential code.",
      "Reverse the order of administration and nothing changes. The hierarchy is fixed by service type, not by which infusion ran first — a rule that exists precisely because sequence would otherwise determine payment for identical care.",
      "Now suppose the antibiotic ran 12 minutes as a rapid infusion. Below the 15-minute threshold it is not an infusion at all: it is reported as an intravenous push, and billing an infusion code for it is a straightforward overpayment visible from the recorded times.",
    ],
    context: [
      "Drug administration coding is one of the few areas where the rules are almost entirely mechanical — hierarchy, thresholds, one initial per access — and where errors are correspondingly easy for an edit to detect. That combination makes it a reliable source of recoupment for payers and a reliable source of preventable loss for practices.",
      "The infusion-versus-injection threshold at 15 minutes catches practices whose workflow does not record short infusion times precisely. Where the flow sheet rounds to the nearest quarter hour, a 13-minute infusion becomes 15 and a coding decision is being made by a rounding convention.",
      "Infusion services frequently require prior authorisation for the drug rather than the administration, and the denial arrives on the administration line. Reading it as an administration coding problem sends the follow-up in the wrong direction, which is why drug administration denials should be segmented by whether the drug or the service was refused.",
    ],
    relatedCpt: ["96372", "96413", "96415"],
    relatedModifiers: ["59", "XE", "XU"],
    relatedCodes: ["CO-151", "CO-197", "CO-97"],
    relatedTerms: ["hcpcs", "prior-authorization", "ncci-edits", "denial"],
    relatedServices: ["medical-coding", "prior-authorization", "denial-management"],
    relatedSpecialties: ["oncology", "nephrology", "urgent-care"],
    faqs: [
      { question: "What is CPT code 96365 used for?", answer: "An intravenous infusion for therapy, prophylaxis or diagnosis lasting up to one hour, reported as the initial service of the encounter. It sits below chemotherapy and above hydration in the administration hierarchy." },
      { question: "How long must an infusion run to bill 96365?", answer: "More than 15 minutes. At or below 15 minutes the service is an intravenous push and is reported with the injection codes instead, regardless of how it was set up." },
      { question: "What if a patient receives two different drugs by infusion?", answer: "The higher-tier drug takes the initial code and the second is reported with the sequential add-on through the same access. A second initial code requires a separate vascular access site that was clinically necessary." },
      { question: "Why do infusion claims deny when the coding is correct?", answer: "Often because the drug rather than the administration was refused — an authorisation or coverage problem on the supply line that surfaces as a denial on the service. Segmenting denials by drug versus service is what keeps the follow-up pointed in the right direction." },
    ],
  },
  {
    code: "96372",
    shortName: "Therapeutic Injection, IM or SubQ",
    category: "Drug administration",
    summary:
      "96372 reports a therapeutic, prophylactic or diagnostic injection given intramuscularly or subcutaneously. It is one of the highest-volume administration codes in outpatient medicine and one of the most frequently denied, because it bundles into a same-day office visit unless the visit was separately identifiable, and because vaccines take different codes entirely.",
    billingRules: [
      "Covers therapeutic, prophylactic and diagnostic injections by intramuscular or subcutaneous route — not vaccines, which use the immunisation administration codes",
      "Requires direct physician supervision in the office setting, meaning a physician present in the suite and immediately available, not necessarily in the room",
      "Bundles into a same-day evaluation and management service unless that service was significant and separately identifiable, reported with modifier 25",
      "The drug administered is billed separately with units matching the dose; the administration code covers the act of injecting only",
      "Multiple injections of different drugs are each reportable, and repeat injections of the same drug on the same day take the repeat-procedure modifier",
    ],
    documentation: [
      "The drug, dose, route and site, since the route determines the code family and the dose determines the units on the supply line",
      "Where an evaluation and management service is billed the same day, the separately identifiable content of that visit — the modifier asserts it and only the note proves it",
      "The supervising physician's availability where the injection was administered by clinical staff, because the supervision requirement is a payment condition rather than a formality",
    ],
    example: [
      "A patient attends specifically for a scheduled vitamin B12 injection, sees the nurse, receives it and leaves. Only the administration and the drug are billable — there is no separately identifiable evaluation, so no office visit should be reported.",
      "A second patient attends for a new complaint, is evaluated, and receives an injection as part of the treatment decided at that visit. Here the evaluation is separately identifiable, the office visit is billable with modifier 25, and the injection is billed alongside it.",
      "The two look nearly identical on a claim and completely different in a chart. That gap is why the bundling denial on this code is so common, and why it is one of the few denials where the correct response is often to accept it.",
    ],
    context: [
      "Volume is what makes this code matter. It appears in almost every outpatient specialty and generates modest payment per claim, so a systematic error — always appending modifier 25, or never billing the injection with a visit — produces a large annual effect invisible at the level of any single claim.",
      "The vaccine distinction trips practices with mixed workflows. Immunisation administration codes carry their own counting rules and their own counselling variants for younger patients, and reporting an immunisation under the therapeutic injection code is a straightforward miscode rather than a judgement call.",
      "Direct supervision is the requirement most often assumed rather than verified. Where a practice runs nurse injection clinics on days without a physician in the suite, the service is not payable under this rule however competent the administration — a staffing question that surfaces as a billing denial.",
    ],
    relatedCpt: ["96365", "96413", "99213"],
    relatedModifiers: ["25", "59", "76"],
    relatedCodes: ["CO-97", "CO-151", "CO-16"],
    relatedTerms: ["modifier", "ncci-edits", "hcpcs", "denial"],
    relatedServices: ["medical-coding", "denial-management", "claims-management"],
    relatedSpecialties: ["family-medicine", "internal-medicine", "urgent-care"],
    faqs: [
      { question: "What is CPT code 96372 used for?", answer: "A therapeutic, prophylactic or diagnostic injection given intramuscularly or subcutaneously. It covers the administration only — the drug is billed separately with its own units." },
      { question: "Can 96372 be billed with an office visit?", answer: "Only where the visit was significant and separately identifiable from the injection, reported with modifier 25. A patient attending solely for a scheduled injection has no separately identifiable visit to bill." },
      { question: "Is 96372 used for vaccines?", answer: "No. Immunisations use the immunisation administration codes, which have their own counting rules and counselling variants. Reporting a vaccine under this code is a miscode rather than a matter of preference." },
      { question: "What supervision does 96372 require?", answer: "Direct physician supervision in the office setting — a physician present in the suite and immediately available. Injection clinics run without a physician on site do not meet the requirement, which surfaces later as a denial." },
    ],
  },
  {
    code: "93000",
    shortName: "Electrocardiogram, Complete",
    category: "Cardiovascular diagnostics",
    summary:
      "93000 reports a routine electrocardiogram with at least 12 leads, including both the tracing and the interpretation and written report. It is the global code, which means it is only correct where the same entity owns both halves — and misuse of it in facility settings is one of the most common diagnostic billing errors.",
    billingRules: [
      "Global: it includes the technical work of performing the tracing and the professional work of interpreting it and producing a written report",
      "Correct only where one entity performed and owns both components — typically a physician office using its own equipment and its own interpretation",
      "Where the tracing is performed by one entity and interpreted by another, each bills its own component code rather than this one",
      "Component modifiers do not belong on this code: a professional-only service uses the interpretation code, not this code with a professional modifier",
      "One tracing supports one interpretation claim; where two clinicians review the same tracing, only the one producing the formal written report bills it",
    ],
    documentation: [
      "A written interpretation with findings and a conclusion, signed and dated — a rhythm comment in a progress note is a review, not an interpretation supporting the professional component",
      "The tracing retained in the record, since the professional component is unsupportable without the study it interprets",
      "The clinical indication for the study, because coverage policies for routine electrocardiography are diagnosis-driven and vary by contractor",
    ],
    example: [
      "A cardiology office performs an electrocardiogram on its own machine and the physician writes the interpretation into the chart with findings and a conclusion. One entity owns both halves, so 93000 is correct.",
      "The same physician reads a tracing performed at a hospital. The hospital owns the technical component and bills it; the physician bills only the interpretation code. Billing 93000 here claims the hospital's equipment and staff as well, which is why the second claim denies as a duplicate of the facility's.",
      "In an emergency department the pattern repeats with more participants: the facility bills the technical component, and only the clinician producing the formal written interpretation bills the professional one — not every clinician who looked at the tracing during the encounter.",
    ],
    context: [
      "The global-versus-component split is the single structural idea behind most diagnostic billing, and electrocardiography is where practices meet it first because the volumes are high and the settings mixed. A practice that reads studies performed elsewhere and bills globally will generate duplicate denials at scale until the split is understood.",
      "Bundling is the second recurring issue. Electrocardiographic interpretation performed as part of another cardiac procedure is often included in that procedure, and reporting it separately produces a bundling denial that is usually correct.",
      "Coverage for routine tracings is narrower than clinicians expect. Screening electrocardiograms outside specific benefit categories are frequently non-covered, which makes the diagnosis on the claim, rather than the coding of the service, the thing that decides payment.",
    ],
    relatedCpt: ["93010", "93306", "99214"],
    relatedModifiers: ["26", "TC", "59"],
    relatedCodes: ["CO-18", "CO-97", "CO-50"],
    relatedTerms: ["modifier", "medical-necessity", "denial", "cpt-code"],
    relatedServices: ["medical-coding", "denial-management", "claims-management"],
    relatedSpecialties: ["cardiology", "internal-medicine", "urgent-care"],
    faqs: [
      { question: "What is CPT code 93000 used for?", answer: "A routine electrocardiogram with at least 12 leads including both the tracing and the interpretation and written report. It is the global code, covering the technical and professional components together." },
      { question: "When should 93000 not be used?", answer: "Whenever the tracing and the interpretation belong to different entities. If a facility performed the tracing, the physician bills only the interpretation code, and billing globally duplicates the facility's technical claim." },
      { question: "Should modifier 26 be added to 93000?", answer: "No. A professional-only service has its own code — use the interpretation code rather than the global code with a professional modifier. The component codes exist precisely so the split does not depend on modifiers." },
      { question: "Can two clinicians bill for reading the same tracing?", answer: "No. One tracing supports one professional claim, and it belongs to the clinician who produced the formal written interpretation with findings and a conclusion. A rhythm comment in a progress note does not qualify." },
    ],
  },
  {
    code: "93010",
    shortName: "Electrocardiogram, Interpretation Only",
    category: "Cardiovascular diagnostics",
    summary:
      "93010 reports the interpretation and written report of an electrocardiogram where another entity performed the tracing. It is the professional component as its own code, and the question it turns on is not who looked at the tracing but who produced the formal written interpretation that the record relies on.",
    billingRules: [
      "Professional component only: interpretation and a written report, with the tracing performed and billed by another entity",
      "Requires a separate, identifiable written interpretation with findings and a conclusion — not a reference to the tracing inside another note",
      "One professional claim per tracing; where several clinicians review it during an encounter, the one producing the formal report bills it",
      "Bundled where electrocardiographic interpretation is included in another service performed the same day, such as certain cardiac procedures or monitoring services",
      "In hospital settings the facility bills the technical component separately, and both claims should describe the same study on the same date",
    ],
    documentation: [
      "A standalone interpretation: rate, rhythm, axis, intervals, morphology as applicable, and a conclusion, signed and dated by the interpreting clinician",
      "Identification of the tracing being interpreted, since two claims for the same study on the same date will be compared",
      "The clinical question the study was ordered to answer, because coverage is diagnosis-driven and an interpretation without an indication is difficult to defend",
    ],
    example: [
      "A patient presents to an emergency department, a tracing is performed by the facility, and the emergency physician documents a formal interpretation with findings and a conclusion. The facility bills the technical component; the physician bills 93010.",
      "A cardiologist later reviews the same tracing during a consultation and comments on it in the consultation note. That is a review informing the consultation, not a second interpretation, and the cardiologist does not bill 93010 for it — the work is inside the evaluation and management service.",
      "Where both clinicians bill, the second claim denies as a duplicate. The denial is correct, and the correct response is a workflow rule about who reads and reports, not an appeal.",
    ],
    context: [
      "Duplicate professional claims on diagnostic studies are among the most common avoidable denials in hospital-based practice, and they arise from an ambiguity in the clinical workflow rather than the coding. Several clinicians genuinely look at the tracing; only one is producing the record's formal interpretation.",
      "The written report requirement is stricter than practice often assumes. A conclusion such as 'ECG reviewed, no acute changes' inside a progress note documents a review, and payers routinely deny professional component claims supported by nothing more than that.",
      "Where a practice reads high volumes of studies performed elsewhere, the professional component becomes a meaningful revenue line rather than an afterthought, and its principal risks are duplication against another reader and bundling into a same-day procedure.",
    ],
    relatedCpt: ["93000", "93306", "99204"],
    relatedModifiers: ["26", "TC", "77"],
    relatedCodes: ["CO-18", "CO-97", "CO-B15"],
    relatedTerms: ["modifier", "denial", "medical-necessity", "appeal"],
    relatedServices: ["medical-coding", "denial-management", "ar-management"],
    relatedSpecialties: ["cardiology", "urgent-care", "internal-medicine"],
    faqs: [
      { question: "What is CPT code 93010 used for?", answer: "The interpretation and written report of an electrocardiogram where another entity performed the tracing. It is the professional component reported as its own code." },
      { question: "What is the difference between 93000 and 93010?", answer: "93000 is global, covering the tracing and the interpretation together where one entity owns both. 93010 is the interpretation alone, used when a facility or another practice performed and billed the tracing." },
      { question: "Does reviewing a tracing count as interpreting it?", answer: "No. The code requires a separate written interpretation with findings and a conclusion. A line in a progress note saying the tracing was reviewed documents a review, and claims supported by only that are routinely denied." },
      { question: "Why does 93010 deny as a duplicate?", answer: "Because another clinician billed the professional component for the same tracing. One study supports one professional claim, so the fix is a workflow rule about who produces the formal report rather than an appeal." },
    ],
  },
  {
    code: "93306",
    shortName: "Complete Echocardiogram with Doppler",
    category: "Cardiovascular diagnostics",
    summary:
      "93306 reports a complete transthoracic echocardiogram with spectral and colour flow Doppler. Complete is a defined content standard rather than a description of effort: the study must attempt to image and document a specified set of structures, and a study falling short of it is a limited study with a different code.",
    billingRules: [
      "Complete means an attempt to obtain and document the full set of required views and structures, with any structure not visualised noted and the reason given",
      "Includes spectral Doppler and colour flow Doppler; the variants without Doppler have separate codes and pay differently",
      "Component split applies: professional and technical modifiers where the interpreting physician and the equipment owner differ",
      "A follow-up study examining a limited question is a limited echocardiogram, not a complete one repeated — repeating the complete code for interval checks is a recurring overpayment pattern",
      "Coverage is governed by local determinations, and both the indication and the frequency are tested against them",
    ],
    documentation: [
      "A report documenting each required structure, with any that could not be visualised explicitly identified and explained — an incomplete study documented as complete is the finding reviewers look for",
      "Permanently recorded images retained in the record, since the interpretation is supported by the study rather than by the report alone",
      "The clinical indication, matched to the coverage policy of the relevant contractor, because echocardiography frequency limits are actively enforced",
    ],
    example: [
      "A patient with new heart failure symptoms undergoes a full transthoracic study with Doppler. All required structures are imaged except one obscured by body habitus, which the report identifies and explains. That is a complete study and 93306 is correct.",
      "Three months later the patient returns and a focused study is performed to reassess ventricular function alone. That is a limited echocardiogram with its own code — reporting the complete code because the same machine and the same protocol were used overstates the service.",
      "Where the study is performed at a hospital and read by the practice's cardiologist, the practice bills the professional component only. Billing globally in that setting is the same error as on electrocardiography, and it generates the same duplicate denial against the facility's technical claim.",
    ],
    context: [
      "Echocardiography is one of the most closely watched imaging services in cardiology because volume is high, payment is meaningful, and the complete-versus-limited distinction is documented rather than physical. The same machine, the same patient and the same sonographer can produce either study, so only the report distinguishes them.",
      "The requirement to explain non-visualised structures exists to protect complete studies performed on difficult patients. A study that genuinely attempted the full protocol and documented why one view failed remains complete; one that never attempted it does not.",
      "Local coverage determinations set both indications and frequency, which is why the same follow-up interval can be payable in one jurisdiction and denied in another. Checking the applicable determination before scheduling a serial study prevents a denial that no coding choice can fix afterwards.",
    ],
    relatedCpt: ["93000", "93010", "99215"],
    relatedModifiers: ["26", "TC", "59"],
    relatedCodes: ["CO-50", "CO-151", "CO-18"],
    relatedTerms: ["medical-necessity", "modifier", "denial", "prior-authorization"],
    relatedServices: ["medical-coding", "prior-authorization", "denial-management"],
    relatedSpecialties: ["cardiology", "internal-medicine", "radiology"],
    faqs: [
      { question: "What is CPT code 93306 used for?", answer: "A complete transthoracic echocardiogram including spectral and colour flow Doppler. Complete refers to a defined set of structures the study must attempt to image and document." },
      { question: "What makes an echocardiogram complete rather than limited?", answer: "The attempt to obtain and document the full required set of views and structures. Any structure not visualised must be identified with the reason. A study answering one focused question is a limited echocardiogram with its own code." },
      { question: "Can 93306 be billed for a follow-up study?", answer: "Only where the follow-up was itself a complete study. Interval checks addressing a single question are limited studies, and repeating the complete code for them is a recurring overpayment pattern in cardiology billing." },
      { question: "Who bills the professional component of an echocardiogram?", answer: "The physician who interprets the study and produces the report, using the professional modifier, when the equipment belongs to another entity. That entity bills the technical component separately." },
    ],
  },
  {
    code: "20610",
    shortName: "Major Joint Aspiration or Injection",
    category: "Procedures",
    summary:
      "20610 reports arthrocentesis, aspiration or injection of a major joint or bursa — knee, shoulder, hip, subacromial bursa — performed without ultrasound guidance. It is billed per joint rather than per injection, and the two facts that decide the claim are how many joints were treated and whether imaging guidance was used.",
    billingRules: [
      "One unit per joint treated, regardless of whether the joint was aspirated, injected, or both in the same encounter",
      "Where ultrasound guidance with permanent recording is used, a different code covering guidance applies instead — this code is the unguided service",
      "Bilateral treatment of the same joint is reported with the bilateral modifier or with side modifiers, depending on payer preference",
      "Two different joints treated in one session are separately reportable with the modifier identifying the distinct anatomical site",
      "The injected drug is billed separately under its own supply code, and the units must match the amount actually administered",
    ],
    documentation: [
      "The specific joint and the side, since laterality drives both the units and the modifier",
      "Whether imaging guidance was used and whether a permanent image was recorded, because guidance without a retained image does not support the guided code",
      "The drug, dose and any aspirate obtained, so the administration, supply and procedure lines reconcile against one another",
    ],
    example: [
      "A patient receives corticosteroid injections into both knees at one visit. That is one joint treated bilaterally: one code with the bilateral modifier, or two lines with side modifiers where the payer requires it, plus the drug billed to the total dose.",
      "A second patient has the left knee aspirated and the right shoulder injected. Two different joints, so two units reported with the modifier identifying the distinct sites — and because they are different anatomical structures, that modifier is supported by the note rather than merely asserted.",
      "Aspirating and then injecting the same knee at the same visit is still one unit. The code covers the encounter with that joint, not the number of needle passes, and reporting two units is the most common unit error on this code.",
    ],
    context: [
      "Joint injection billing sits at the intersection of three separately-adjudicated lines — the procedure, the drug and any guidance — and denials frequently arise from a mismatch between them rather than from any one being wrong. A drug quantity that does not match the number of joints treated is a common trigger.",
      "The guidance question changed the economics of these procedures. Ultrasound-guided injection has its own code that includes the guidance and requires a permanently recorded image, so a practice performing guided injections and billing the unguided code is underbilling, while one billing the guided code without retaining images is exposed on review.",
      "Payer handling of bilateral services is inconsistent enough that it belongs in a payer matrix. Some require one line with the bilateral modifier, others two lines with side modifiers, and a claim built the other way denies as a duplicate rather than paying at the bilateral rate.",
    ],
    relatedCpt: ["11042", "97140", "99213"],
    relatedModifiers: ["50", "59", "XS"],
    relatedCodes: ["CO-18", "CO-151", "CO-97"],
    relatedTerms: ["modifier", "ncci-edits", "hcpcs", "denial"],
    relatedServices: ["medical-coding", "denial-management", "claims-management"],
    relatedSpecialties: ["orthopedics", "pain-management", "podiatry"],
    faqs: [
      { question: "What is CPT code 20610 used for?", answer: "Arthrocentesis, aspiration or injection of a major joint or bursa — such as the knee, shoulder or hip — performed without ultrasound guidance." },
      { question: "Is 20610 billed per injection or per joint?", answer: "Per joint. Aspirating and then injecting the same knee at one visit is a single unit, since the code describes the encounter with that joint rather than the number of needle passes." },
      { question: "How are bilateral injections billed?", answer: "As one joint treated bilaterally — either one line with the bilateral modifier or two lines with side modifiers, depending on the payer. Building the claim the way the payer does not expect produces a duplicate denial rather than bilateral payment." },
      { question: "What if ultrasound guidance is used?", answer: "A different code covering the injection with ultrasound guidance applies, and it requires a permanently recorded image. Billing the unguided code for a guided procedure underpays the practice; billing the guided code without images is an audit exposure." },
    ],
  },
  {
    code: "11042",
    shortName: "Debridement, Subcutaneous Tissue",
    category: "Procedures",
    summary:
      "11042 reports surgical debridement of subcutaneous tissue for the first 20 square centimetres. The surgical debridement family is selected by the deepest tissue actually removed, not by the depth of the wound or the instrument used — a distinction that has been the subject of sustained federal audit attention.",
    billingRules: [
      "Selected by the deepest tissue removed: subcutaneous tissue here, with separate codes for muscle or fascia and for bone",
      "Covers the first 20 square centimetres of surface area; each additional 20 square centimetres or part thereof takes the add-on code",
      "Wounds debrided to the same depth are summed for area; wounds debrided to different depths are reported under their own depth codes",
      "Where only devitalised tissue was removed without entering viable subcutaneous tissue, the selective debridement code applies instead",
      "Debridement performed as part of another procedure on the same site is generally included in that procedure rather than separately reportable",
    ],
    documentation: [
      "The deepest tissue removed, stated explicitly — this single fact selects the code, and its absence is the most common reason a claim cannot be defended",
      "Wound measurements in centimetres, since area drives the units and summing rules depend on which wounds shared a depth",
      "The instrument and technique, the tissue removed, and the wound's appearance before and after, establishing that the debridement was surgical rather than selective",
    ],
    example: [
      "A patient with a diabetic foot ulcer measuring 18 square centimetres undergoes excisional debridement into viable subcutaneous tissue. One unit of 11042 covers it, since the area falls within the first 20 square centimetres.",
      "A second wound on the same foot, measuring 14 square centimetres, is debrided to the same subcutaneous depth at the same visit. Areas at the same depth sum to 32, so one add-on unit covers the excess beyond 20.",
      "Had the second wound been debrided only of surface slough without entering viable tissue, it would not join the sum at all — it belongs to the selective debridement family and is reported there. Depth, not the visit, decides which family each wound falls into.",
    ],
    context: [
      "Debridement coding has drawn sustained oversight attention, and the pattern examined is consistent: surgical codes reported where documentation describes removal of slough and non-viable tissue only. The payment difference between the families is substantial, which is why the depth statement in the note carries so much weight.",
      "The area-summing rule is counterintuitive enough to cause errors in both directions. Practices commonly report each wound separately with its own first-20 unit, which overstates, or bill one unit for a large multi-wound session, which understates. Summing by depth, then converting to units, is the rule.",
      "Wound care is a service where a course of treatment is assessed as a whole. Repeated debridement of a wound that never changes shifts the question from coding to whether continued debridement is reasonable — and the record should show either progress or a documented change of approach.",
    ],
    relatedCpt: ["97597", "20610", "97530"],
    relatedModifiers: ["59", "XS", "58"],
    relatedCodes: ["CO-97", "CO-151", "CO-50"],
    relatedTerms: ["ncci-edits", "medical-necessity", "denial", "cpt-code"],
    relatedServices: ["medical-coding", "denial-management", "ar-management"],
    relatedSpecialties: ["wound-care", "podiatry", "general-surgery"],
    faqs: [
      { question: "What is CPT code 11042 used for?", answer: "Surgical debridement of subcutaneous tissue covering the first 20 square centimetres of wound surface. Deeper debridement into muscle, fascia or bone takes its own codes." },
      { question: "How is the correct debridement code chosen?", answer: "By the deepest tissue actually removed, not the depth of the wound or the instrument used. Removal limited to devitalised tissue is selective debridement and belongs to a different code family." },
      { question: "How are multiple wounds counted?", answer: "Sum the surface areas of wounds debrided to the same depth, then convert: the first 20 square centimetres on the base code and each additional 20 or part of it on the add-on. Wounds debrided to different depths are reported under their own depth codes." },
      { question: "Why is debridement coding audited so heavily?", answer: "Because the payment gap between surgical and selective debridement is large and the distinction lives entirely in the documentation. Reviews consistently find surgical codes supported by notes describing removal of slough only." },
    ],
  },
  {
    code: "99490",
    shortName: "Chronic Care Management, 20 Minutes",
    category: "Care management",
    summary:
      "99490 reports at least 20 minutes of clinical staff time per calendar month directing chronic care management for a patient with two or more chronic conditions. It is a monthly service rather than an encounter, and its requirements — consent, a comprehensive care plan, round-the-clock access — sit outside the visit entirely.",
    billingRules: [
      "At least 20 minutes of clinical staff time directed by a physician or qualified professional, accumulated across the calendar month",
      "The patient must have two or more chronic conditions expected to last at least twelve months or until death, placing them at significant risk of decline",
      "Patient consent must be obtained and documented before the service begins, including the fact that cost sharing may apply and that only one practitioner may bill it per month",
      "A comprehensive, patient-centred care plan must exist in the record and be available to the care team, with round-the-clock access to a clinician for urgent needs",
      "Only one practitioner may bill chronic care management for a patient in a given month, and additional 20-minute increments take the add-on code",
    ],
    documentation: [
      "Time logged as it accrues, attributable to named staff and to specific activities — a monthly total asserted at the end without an underlying log is the weakest possible support",
      "The consent conversation and its date, since a service delivered before consent is not billable however well documented afterwards",
      "The care plan itself, and evidence it was shared with the patient and available to the team, because the plan is a condition of payment rather than good practice",
    ],
    example: [
      "A patient with diabetes and heart failure consents to chronic care management. Over the month, staff spend 12 minutes on medication reconciliation, 9 minutes coordinating a cardiology referral and 6 minutes on a follow-up call. That is 27 minutes, and one unit is billable at month end.",
      "The following month accrues 14 minutes. Nothing is billable — the threshold is 20 minutes within the calendar month and time does not carry forward, which is why practices track the running total rather than discovering it in arrears.",
      "A third month accrues 45 minutes. That is the base code plus one add-on increment, provided the log attributes the time and no other practitioner billed the service for that patient in the same month.",
    ],
    context: [
      "Care management codes are structurally unlike the rest of the fee schedule: no encounter, no face-to-face requirement, a calendar-month unit and a set of programme conditions that must be true before any time counts. Practices that treat them as billing codes rather than as a programme consistently fail the conditions rather than the coding.",
      "The exclusivity rule — one practitioner per patient per month — makes coordination a revenue question. Where a patient's specialist and primary care practice both run care management, the second claim denies, and the resolution is an agreement about who owns the service rather than an appeal.",
      "Time capture is the operational core. Retrospective reconstruction at month end produces totals that cluster suspiciously at the threshold, while contemporaneous logging produces a distribution that reflects real work and supports both the base code and its increments.",
    ],
    relatedCpt: ["99457", "99214", "99213"],
    relatedModifiers: ["25", "95"],
    relatedCodes: ["CO-18", "CO-97", "CO-151"],
    relatedTerms: ["medical-necessity", "denial", "charge-capture", "revenue-cycle-management"],
    relatedServices: ["medical-coding", "practice-analytics", "patient-support"],
    relatedSpecialties: ["family-medicine", "internal-medicine", "nephrology"],
    faqs: [
      { question: "What is CPT code 99490 used for?", answer: "At least 20 minutes of clinical staff time per calendar month spent on chronic care management for a patient with two or more chronic conditions expected to last twelve months or longer." },
      { question: "Does chronic care management require a visit?", answer: "No. It is a monthly service based on accumulated staff time rather than an encounter. What it does require is documented consent, a comprehensive care plan and round-the-clock access to a clinician for urgent needs." },
      { question: "Can time carry over between months?", answer: "No. The 20 minutes must accrue within the calendar month. A month reaching 14 minutes is not billable, which is why the running total needs to be visible during the month rather than reconciled afterwards." },
      { question: "Can two practices bill chronic care management for the same patient?", answer: "No. Only one practitioner may bill it per patient per month. Where a specialist and a primary care practice both run programmes, the second claim denies and the fix is an agreement about ownership rather than an appeal." },
    ],
  },
  {
    code: "99457",
    shortName: "Remote Monitoring Management, 20 Minutes",
    category: "Care management",
    summary:
      "99457 reports the first 20 minutes of clinical staff or physician time per calendar month managing a patient on remote physiological monitoring, and it requires at least one interactive communication with the patient or caregiver during the month. Review of transmitted data alone, however thorough, does not meet it.",
    billingRules: [
      "At least 20 minutes of management time in the calendar month, with additional 20-minute increments taking the add-on code",
      "At least one interactive communication with the patient or caregiver during the month — a real-time conversation, not a message or a data review",
      "Distinct from the setup and device-supply codes: setup is billed once at initiation, and device supply requires at least 16 days of data within a 30-day period",
      "The 16-day requirement applies to the device supply code rather than to this management code, and confusing the two is a frequent source of incorrect denials being written off",
      "May be billed in the same month as chronic care management provided the time is counted once and the services are separately documented",
    ],
    documentation: [
      "The interactive communication, with its date and substance, since its absence makes the month unbillable no matter how much data was reviewed",
      "Time logged contemporaneously and attributed to staff and activity, exactly as for chronic care management",
      "The clinical decisions the monitoring drove — treatment changes, escalation, reassurance — because the code pays for management rather than for data collection",
    ],
    example: [
      "A patient on remote blood pressure monitoring transmits readings on 22 days in the month. Staff review trends across the month, and a nurse calls the patient to discuss a rising trend and a medication adjustment. Total management time is 24 minutes.",
      "That month is billable: 20 minutes of management time reached, and one interactive communication documented. The device supply code is also billable because transmissions exceeded 16 days.",
      "The next month the patient transmits on 11 days and no call takes place. Neither code is billable — the supply code fails the 16-day threshold, and the management code fails the interactive requirement even though staff reviewed every reading.",
    ],
    context: [
      "Remote monitoring is a family of codes rather than a single service, and most billing errors are boundary errors between them: setup billed monthly, supply billed without meeting the day threshold, or management billed without the interactive contact. Each has a different condition, and each fails independently.",
      "The interactive communication requirement is the one that most often surprises practices, because it is a workflow obligation rather than a clinical one. Where monitoring is genuinely passive in a stable month, the honest answer is that the management code is not billable that month.",
      "Overlap with chronic care management is permitted but demands discipline, since the same 20 minutes cannot support both. Practices running both programmes need time capture that attributes each activity to one service, which is a documentation design question rather than a coding one.",
    ],
    relatedCpt: ["99490", "99214", "93000"],
    relatedModifiers: ["95", "25"],
    relatedCodes: ["CO-151", "CO-18", "CO-97"],
    relatedTerms: ["charge-capture", "medical-necessity", "denial", "revenue-cycle-management"],
    relatedServices: ["medical-coding", "practice-analytics", "patient-support"],
    relatedSpecialties: ["cardiology", "internal-medicine", "nephrology"],
    faqs: [
      { question: "What is CPT code 99457 used for?", answer: "The first 20 minutes of clinical staff or physician time in a calendar month spent managing a patient on remote physiological monitoring, including at least one interactive communication with the patient or caregiver." },
      { question: "Does reviewing transmitted data count toward 99457?", answer: "Review time counts toward the 20 minutes, but the month is not billable without at least one interactive communication — a real-time conversation with the patient or caregiver. Data review alone never satisfies the code." },
      { question: "What is the 16-day rule?", answer: "It applies to the device supply code, which requires at least 16 days of data within a 30-day period. It is not a condition of the management code, and conflating the two leads practices to write off denials that were about a different line." },
      { question: "Can 99457 and chronic care management be billed the same month?", answer: "Yes, provided the services are separately documented and the same minutes are counted only once. That requires time capture attributing each activity to one service rather than a single monthly pool." },
    ],
  },
];

export const cptCodeList = cptCodes.map((c) => c.code);

export const getCptCode = (code: string) =>
  cptCodes.find((c) => c.code.toLowerCase() === code.toLowerCase());

/** True where a code named elsewhere on the site has a page to link to. */
export const hasCptPage = (code: string) => cptCodeList.includes(code);

export const cptCategories: CptCategory[] = [
  "Evaluation and management",
  "Behavioral health",
  "Chiropractic",
  "Physical medicine",
  "Drug administration",
  "Cardiovascular diagnostics",
  "Procedures",
  "Care management",
];
