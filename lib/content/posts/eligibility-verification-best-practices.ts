import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "eligibility-verification-best-practices",
  title: "Eligibility verification best practices",
  excerpt:
    "The cheapest denial prevention available, and the one most practices perform once instead of continuously.",
  category: "Verification",
  published: "2026-04-25",
  updated: "2026-08-20",
  readingMinutes: 7,
  answer:
    "Eligibility verification confirms coverage is active and establishes patient financial responsibility before a visit. It is the highest-return front-end control available: registration and eligibility errors are the largest denial category at 24.3% of all denials, and unlike clinical denials, every one of them is preventable.",
  sections: [
    {
      heading: "Verify before every visit, not once per patient",
      body: [
        "The most common failure is treating verification as a registration task. Coverage is verified when a patient is established and then assumed stable — but it is not. Employers change carriers, plans terminate, and Medicaid managed care assignments shift without notice to the practice.",
        "Within the registration and eligibility denial category, coordination of benefits alone accounts for half of denials. Those are patients whose coverage situation changed and nobody re-checked.",
      ],
    },
    {
      heading: "Verify more than active status",
      body: [
        "Confirming a policy is active is the minimum. Complete verification captures what actually determines whether the claim pays and what the patient owes:",
      ],
      list: [
        "Active coverage on the specific date of service, not today",
        "Plan type and the correct payer ID, including behavioral health carve-outs",
        "Deductible status and remaining amount year-to-date",
        "Copay and coinsurance for the specific service being delivered",
        "Whether the planned service requires prior authorization",
        "Secondary and tertiary coverage, sequenced correctly",
        "Benefit limits for capped services such as therapy or chiropractic",
      ],
    },
    {
      heading: "The economics",
      body: [
        "CAQH measured electronic eligibility verification as the largest single administrative savings opportunity in healthcare at $11.7 billion annually, saving 12 minutes of staff time per verification compared with manual methods.",
        "Manual verification through payer portals and phone calls is also where transcription errors enter — the member ID and name mismatches behind CO-31 and CO-140 denials. Electronic verification returns the payer's own spelling, which removes that failure mode entirely.",
      ],
    },
    {
      heading: "When to verify: a workable cadence",
      body: [
        "\u201CVerify before every visit\u201D is correct but not actionable on its own \u2014 a practice running 60 appointments a day needs to know when, and with what fallback. The cadence below is the one that survives contact with a real schedule.",
      ],
      table: {
        headers: ["When", "What to check", "Why then"],
        rows: [
          ["At scheduling", "Active coverage, payer ID, authorization requirement for the planned CPT", "The only point where you can still move the appointment if authorization is needed"],
          ["48\u201372 hours before", "Re-run eligibility, deductible status, copay and coinsurance", "Catches mid-cycle terminations and gives time to reach the patient"],
          ["At check-in", "Scan the card, confirm demographics against the payer's response", "Catches the card the patient did not mention had changed"],
          ["After any gap in care", "Full re-verification including COB", "Coverage changes cluster around gaps \u2014 job changes, plan years, Medicaid redeterminations"],
        ],
      },
    },
    {
      heading: "Why phone verification is the expensive option",
      body: [
        "CAQH's index measures a single claim status inquiry made by phone at 25 minutes of staff time \u2014 the most time-consuming administrative transaction it tracks. Eligibility verification by phone carries a similar profile: long hold times, a human transcribing what another human reads out, and no artifact afterwards.",
        "The transcription step is the part that costs twice. A member ID copied by ear produces exactly the mismatches behind CO-16 and CO-31 denials, so the expensive method also generates the rework. Electronic verification returns the payer's own record, which removes the failure mode rather than managing it.",
        "Keep phone verification for what it is genuinely good at: resolving an ambiguous electronic response, confirming an unusual benefit limit, or documenting a representative's name and reference number when you expect to appeal.",
      ],
    },
    {
      heading: "Document the verification, not just the result",
      body: [
        "A verification that cannot be evidenced later is worth much less during an appeal. If a payer denies for terminated coverage and your record shows only \u201Cverified,\u201D you have nothing to contest with.",
        "Retain the payer's electronic response, the date and time it was returned, and the specific benefits it confirmed. Where verification happened by phone, record the representative's name and the call reference number. Payers routinely honour a documented verification even when their own downstream adjudication contradicts it \u2014 but only if you can produce it.",
      ],
    },
    {
      heading: "The denial codes eligibility failures actually produce",
      body: [
        "Eligibility problems rarely announce themselves as \u201Celigibility problems.\u201D They arrive as adjustment reason codes that look unrelated until you trace them back to the front desk. Knowing which code maps to which verification step is what turns a denial report into a work queue.",
      ],
      table: {
        headers: ["Code", "What the payer means", "Which verification step failed"],
        rows: [
          ["CO-27", "Expenses incurred after coverage terminated", "Coverage not re-checked for the actual date of service"],
          ["CO-22", "Care may be covered by another payer (COB)", "Secondary and tertiary coverage not sequenced"],
          ["CO-31", "Patient cannot be identified as our insured", "Member ID or name transcribed rather than returned electronically"],
          ["CO-45", "Charge exceeds fee schedule or contracted amount", "Plan type or network status misread at registration"],
          ["CO-197", "Precertification or authorization absent", "Authorization requirement not checked against the planned CPT"],
          ["CO-96", "Non-covered charge under the patient\u2019s plan", "Benefit detail confirmed as \u201Cactive\u201D only, not service-level"],
        ],
      },
    },
    {
      heading: "Who owns verification decides whether it happens",
      body: [
        "The most reliable predictor of a practice\u2019s eligibility denial rate is not its software. It is whether one named person is accountable for the verification queue clearing each day.",
        "Where verification is everyone\u2019s responsibility it becomes nobody\u2019s. Front desk staff are measured on patients checked in, not on coverage confirmed, and under a full waiting room the check that takes ninety seconds is the one that gets skipped. The denial surfaces four weeks later, in a different department, attached to a claim nobody remembers.",
        "Two structural fixes work. Separate the role, so verification is performed ahead of the day rather than during it \u2014 a scheduler or dedicated verifier working 48 hours out is not competing with a queue of patients. Then measure the queue, not the outcome: the number of unverified appointments remaining for tomorrow is visible today and can still be acted on, whereas an eligibility denial rate is a report on decisions already made.",
      ],
    },
    {
      heading: "What this is worth in real numbers",
      body: [
        "The case for front-end verification does not rest on the denial that is prevented. It rests on the arithmetic of what the alternative costs.",
        "Premier Inc. measured the average cost of fighting a single denied claim at $57.23 in administrative labour, and roughly 70% of denied claims are eventually overturned and paid on appeal. Read those two together and the picture is uncomfortable: most denied claims were payable all along, and the practice paid twice to collect them \u2014 once to submit, once to argue.",
        "Against that, a verification takes minutes and prevents the entire cycle. CAQH puts the savings available from electronic eligibility verification at $11.7 billion annually across US healthcare, the largest single administrative savings opportunity it tracks. The per-practice version of that number is simply the denials you never work.",
      ],
    },
    {
      heading: "Verification enables collection",
      body: [
        "The under-appreciated benefit is not denial prevention but patient collection. You cannot collect an accurate estimate you have not calculated.",
        "Practices that verify benefits thoroughly can quote what a patient owes and collect at the point of service, which recovers dramatically more than billing after the visit. It also eliminates the surprise bill that generates complaints and delays payment.",
      ],
    },
  ],
  faq: [
    {
      question: "How often should eligibility be verified?",
      answer:
        "Before every visit, not once per patient. Coverage should be checked at scheduling, re-run 48 to 72 hours before the appointment, and confirmed again at check-in. Employers change carriers, plans terminate mid-year, and Medicaid managed care assignments shift without notifying the practice, so a verification performed at the last visit tells you nothing about this one.",
    },
    {
      question: "What is the difference between eligibility verification and prior authorization?",
      answer:
        "Eligibility verification confirms that a patient\u2019s coverage is active and establishes what they owe. Prior authorization is the payer\u2019s advance approval for a specific service. Verification comes first and tells you whether authorization is required at all; skipping it means discovering the authorization requirement after the service has been delivered, when it can no longer be obtained.",
    },
    {
      question: "Why do claims get denied even after eligibility was verified?",
      answer:
        "Usually because verification confirmed only that the policy was active rather than the service-level detail. A plan can be active and still exclude the specific procedure, require authorization, cap the benefit, or sit behind a behavioral health carve-out with a different payer ID. Complete verification captures coverage for the specific date of service and the specific CPT being delivered.",
    },
    {
      question: "Is phone verification ever worth it?",
      answer:
        "For a narrow set of cases. CAQH measures phone-based administrative inquiries as the most time-consuming transaction it tracks, at around 25 minutes each, and the human transcription step introduces the member ID mismatches that cause CO-31 denials. Reserve phone verification for resolving an ambiguous electronic response, confirming an unusual benefit limit, or capturing a representative name and reference number ahead of an expected appeal.",
    },
    {
      question: "What should be documented when verifying eligibility?",
      answer:
        "Retain the payer\u2019s electronic response itself, the date and time it was returned, and the specific benefits it confirmed \u2014 not merely a note reading \u201Cverified.\u201D Where verification happened by phone, record the representative\u2019s name and call reference number. Payers frequently honour a documented verification even when their own downstream adjudication contradicts it, but only if the documentation can be produced.",
    },
  ],
  relatedServices: ["eligibility-verification", "prior-authorization", "patient-collections"],
};

export default post;
