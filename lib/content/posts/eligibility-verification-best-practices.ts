import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "eligibility-verification-best-practices",
  title: "Eligibility verification best practices",
  excerpt:
    "The cheapest denial prevention available, and the one most practices perform once instead of continuously.",
  category: "Verification",
  published: "2026-04-25",
  updated: "2026-08-19",
  readingMinutes: 3,
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
      heading: "Verification enables collection",
      body: [
        "The under-appreciated benefit is not denial prevention but patient collection. You cannot collect an accurate estimate you have not calculated.",
        "Practices that verify benefits thoroughly can quote what a patient owes and collect at the point of service, which recovers dramatically more than billing after the visit. It also eliminates the surprise bill that generates complaints and delays payment.",
      ],
    },
  ],
  relatedServices: ["eligibility-verification", "prior-authorization", "patient-collections"],
};

export default post;
