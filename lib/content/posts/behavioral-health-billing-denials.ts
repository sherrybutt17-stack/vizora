import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "behavioral-health-billing-denials",
  title: "Why behavioral health claims deny, and what fixes them",
  metaTitle: "Why behavioral health claims deny",
  excerpt:
    "Time-based session codes, carved-out payers and visit limits make behavioral health the specialty where correct clinical work most often bills incorrectly.",
  category: "Specialty Billing",
  published: "2026-08-20",
  updated: "2026-08-20",
  readingMinutes: 8,
  answer:
    "Behavioral health claims deny for reasons largely absent from other specialties: psychotherapy codes are selected by documented session time, coverage is frequently carved out to a separate managed behavioral health payer with its own payer ID, and plans impose visit limits and authorization requirements that reset annually. Most denials trace to one of those three, not to clinical judgement.",
  sections: [
    {
      heading: "Session codes are chosen by time, and the time must be documented",
      body: [
        "Psychotherapy codes are time-based, which makes behavioral health unusual: the code is determined by how long the session actually ran, and the note has to establish that duration. A clinician who documents “50-minute session” has documented the appointment slot, not the therapy time.",
        "The distinction matters because the ranges do not align with how practices schedule. Sessions are booked in round numbers; codes are defined in bands, and a session that ran slightly short of a band bills one level down regardless of what was scheduled.",
      ],
      table: {
        headers: ["Code", "Descriptor", "Documented time range"],
        rows: [
          ["90832", "Psychotherapy with patient", "16–37 minutes"],
          ["90834", "Psychotherapy with patient", "38–52 minutes"],
          ["90837", "Psychotherapy with patient", "53 minutes or more"],
          ["90791", "Psychiatric diagnostic evaluation", "Not time-based"],
          ["90792", "Diagnostic evaluation with medical services", "Not time-based"],
          ["90853", "Group psychotherapy", "Not time-based"],
          ["90785", "Interactive complexity (add-on)", "Reported alongside the base code"],
        ],
      },
    },
    {
      heading: "90837 attracts review, and that is not a reason to avoid it",
      body: [
        "Many practices systematically bill 90834 for sessions that genuinely ran 53 minutes or longer, because 90837 is known to draw payer scrutiny. That is undercoding, and it is expensive in a way that never appears on a denial report — the claim pays, so nothing looks wrong.",
        "The correct response to scrutiny is documentation, not avoidance. Record the actual start and stop times, or the total therapy minutes, in the note itself rather than relying on the appointment length. A record that establishes 55 minutes of therapy supports 90837 on audit; a record that says “1 hour session” does not, because an hour-long appointment routinely contains less than 53 minutes of therapy.",
        "Where a payer requires prior authorization specifically for 90837, that is a process step, not a coding constraint. Obtain it and bill what was delivered.",
      ],
    },
    {
      heading: "Behavioral health is frequently carved out to a different payer",
      body: [
        "This single structural fact causes more behavioral health denials than any coding issue. A patient's medical coverage and their behavioral health coverage are often administered by different organisations — the medical plan by the carrier on the card, the behavioral health benefit by a separate managed behavioral health organisation with its own network, its own authorisation rules and its own payer ID.",
        "The card usually does not make this obvious. Verification that confirms only “active coverage” returns a valid answer about the medical plan and tells you nothing about the benefit you are about to deliver. The claim then routes to the medical payer, which denies it as not covered, and the denial reads as a coverage problem rather than a routing problem.",
        "Verification for behavioral health therefore has to ask a specific question: who administers the behavioral health benefit, and what is that entity's payer ID. Confirm the answer at the benefit level for the specific service, and confirm whether the provider is in network with the carve-out entity rather than with the medical plan, because the two networks are separate and being in one does not place you in the other.",
      ],
    },
    {
      heading: "Visit limits and authorisation reset, and nobody is notified",
      body: [
        "Behavioral health benefits are commonly capped — a number of sessions per year, or authorisation granted for a fixed block of visits. Both run out mid-treatment, and neither generates a warning to the practice.",
        "The failure is predictable and therefore preventable. An authorisation for twelve sessions is exhausted at the twelfth, and session thirteen denies. Because behavioral health treatment is continuous rather than episodic, that thirteenth session is delivered as a matter of course by a clinician who has no visibility into the authorisation count.",
      ],
      list: [
        "Record the authorised visit count and the authorisation expiry date at the point of approval, not in the chart note",
        "Track sessions consumed against that count, and trigger re-authorisation with two or three visits remaining rather than at zero",
        "Re-verify benefits at the start of each plan year — limits reset, and so do deductibles",
        "Confirm whether the limit is per calendar year, per plan year or per episode of care; the three expire on different dates",
        "Check whether telehealth sessions count against the same limit as in-person visits",
        "Note that concurrent review requirements often begin partway through an approved block, not at its end",
      ],
    },
    {
      heading: "Credentialing is a harder constraint in behavioral health than elsewhere",
      body: [
        "Behavioral health panels close. A payer that is accepting applications from primary care may be closed to new behavioral health providers in the same region, and closure is often not published — practices discover it on submitting an application.",
        "This changes the sequencing. In most specialties credentialing is a timeline problem, solved by applying early. In behavioral health it is a viability question that should be answered before a provider is hired, because a closed panel cannot be opened by applying sooner. Ask each target payer about panel status for the specific licence type and region during recruitment.",
        "Licence type matters as much as the panel. Payers credential clinical psychologists, licensed clinical social workers, licensed professional counsellors and marriage and family therapists under different rules, and a payer that credentials one may not credential another. Supervised or associate-level clinicians are frequently not billable at all under commercial plans, whatever the state permits clinically.",
      ],
    },
    {
      heading: "Where the revenue actually leaks",
      body: [
        "Optum's analysis of 124 million claim remits found 84% of denials are potentially avoidable and 44% originate in front-end processes. Behavioral health sits at the extreme end of that pattern, because three of its most common denial causes — carve-out routing, exhausted authorisation and panel status — are all determined before the session happens.",
        "The economics compound with session value. Premier Inc. puts the average administrative cost of fighting a denied claim at $57.23. Against a surgical claim that is a rounding error; against a single psychotherapy session it can approach or exceed the value of the claim itself, which is why unworked behavioral health denials are written off more readily than denials in any other specialty.",
        "That write-off tendency is what makes prevention disproportionately valuable here. A specialty where appeals are economically marginal is a specialty where the front end has to be right the first time.",
      ],
    },
  ],
  faq: [
    {
      question: "Why do behavioral health claims deny more often than medical claims?",
      answer:
        "Because three denial causes are largely specific to the specialty: psychotherapy codes are selected by documented session time rather than by service type, behavioral health benefits are frequently administered by a separate carved-out payer with its own payer ID and network, and plans impose visit limits and authorisation blocks that are exhausted mid-treatment without notifying the practice.",
    },
    {
      question: "What is the difference between 90834 and 90837?",
      answer:
        "Documented therapy time. 90834 covers sessions of 38 to 52 minutes and 90837 covers 53 minutes or more. The time that counts is therapy time recorded in the note, not the length of the scheduled appointment — an hour-long slot frequently contains fewer than 53 minutes of therapy, which is why the appointment length cannot substitute for documentation.",
    },
    {
      question: "Should practices avoid 90837 because it triggers payer review?",
      answer:
        "No. Billing 90834 for sessions that genuinely ran 53 minutes or longer is undercoding, and it is invisible because the claim pays. The correct response to scrutiny is documenting actual start and stop times or total therapy minutes in the note. Where a payer requires prior authorisation for 90837 specifically, obtain it and bill the service delivered.",
    },
    {
      question: "What is a behavioral health carve-out?",
      answer:
        "An arrangement where a health plan's behavioral health benefit is administered by a separate managed behavioral health organisation rather than by the medical carrier. It has its own payer ID, network and authorisation rules, so a claim routed to the medical payer denies as non-covered. Being in network with the medical plan does not place a provider in the carve-out network.",
    },
    {
      question: "How should visit limits be tracked?",
      answer:
        "Record the authorised visit count and expiry date at the point of approval, then track sessions consumed against it and trigger re-authorisation with two or three visits remaining. Because behavioral health treatment is continuous, the session after an authorisation is exhausted gets delivered as a matter of course by a clinician who cannot see the count — so the control has to sit outside the chart.",
    },
  ],
  sources: ["medicare-benefit-policy-manual", "medicare-coverage-database", "telehealth-billing"],
  relatedServices: ["medical-billing", "prior-authorization", "credentialing"],
  relatedSpecialties: ["mental-health"],
};

export default post;
