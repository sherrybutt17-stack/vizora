import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "physical-therapy-billing-units",
  title: "The 8-minute rule and physical therapy billing units",
  metaTitle: "The 8-minute rule in physical therapy",
  excerpt:
    "Timed codes, untimed codes and the unit arithmetic between them. Where therapy practices lose revenue that was clinically earned and correctly delivered.",
  category: "Specialty Billing",
  published: "2026-08-20",
  updated: "2026-08-20",
  readingMinutes: 8,
  answer:
    "Medicare's 8-minute rule determines how many units of a timed therapy code can be billed: at least 8 minutes of direct one-on-one treatment is required for the first unit, with each additional unit requiring another full 15-minute increment counted across total timed minutes. Untimed codes, including evaluations, bill as one unit regardless of duration.",
  sections: [
    {
      heading: "Timed and untimed codes are counted differently",
      body: [
        "The first thing to establish on any therapy claim is which codes are time-based and which are not, because the two are counted by entirely different rules and mixing them is the most common source of unit errors.",
        "Untimed codes bill as a single unit whatever the duration. Therapy evaluations are the clearest example: an evaluation is one unit whether it took 25 minutes or 55. Timed codes — therapeutic exercise, manual therapy, neuromuscular re-education, therapeutic activities — are billed in 15-minute increments governed by total timed minutes in the session.",
        "The rule applies to direct one-on-one treatment time. Time the patient spends exercising unsupervised, resting between sets, or receiving an unattended modality does not count toward timed units, even though it occupies the appointment.",
      ],
      table: {
        headers: ["Total timed minutes", "Units billable"],
        rows: [
          ["Fewer than 8", "0"],
          ["8 – 22", "1"],
          ["23 – 37", "2"],
          ["38 – 52", "3"],
          ["53 – 67", "4"],
          ["68 – 82", "5"],
        ],
      },
    },
    {
      heading: "Units are calculated on total timed minutes, not per code",
      body: [
        "This is the arithmetic practices most often get wrong, and it costs units in both directions.",
        "The total number of billable units is determined by adding all timed minutes in the session and reading the result against the table above. Only then are those units distributed across the individual timed codes, with the code receiving the most time taking precedence where the allocation is ambiguous.",
        "Calculating units code by code produces a different and incorrect answer. Twelve minutes of therapeutic exercise and eleven minutes of manual therapy is twenty-three total timed minutes and therefore two units. Assessed separately, each falls in the 8–22 band and appears to be one unit each — the same two units, but arrived at by reasoning that breaks as soon as the numbers change. Seven minutes of one and sixteen of another is twenty-three minutes and two units, whereas code-by-code reasoning yields one, and the practice has given away a unit it earned.",
      ],
    },
    {
      heading: "Document minutes, not the appointment",
      body: [
        "A therapy note that records the appointment length supports nothing. What supports the units billed is the treatment time per intervention, and the total timed minutes for the session.",
        "This is the specialty's equivalent of the documentation problem behavioral health has with session length, and it fails the same way: the schedule says 60 minutes, the note says 60 minutes, and the record cannot establish how many of those minutes were direct one-on-one skilled treatment rather than setup, rest, unattended modalities or documentation.",
        "Recording start and stop times per intervention, plus a stated total, makes the claim defensible and takes seconds at the point of care. Reconstructing it afterwards from an appointment length does not, and it is the first thing a reviewer asks for.",
      ],
    },
    {
      heading: "Thresholds, the KX modifier and medical necessity",
      body: [
        "The hard annual dollar cap on outpatient therapy was repealed, but a threshold structure remains. Once a beneficiary's therapy expenditure passes the annual threshold, continued services require the KX modifier, which attests that the services are medically necessary and that the record supports it.",
        "The KX modifier is an attestation, not a formality. Appending it asserts documentation exists demonstrating the patient continues to require skilled therapy — objective measures, progress toward stated goals, and a clinical rationale for continuing. A second, higher threshold triggers targeted medical review, at which point that documentation is examined directly.",
        "The practical failure is applying KX automatically once the threshold is crossed, without the record having kept pace. Practices that document objective functional measures at each re-assessment carry the attestation comfortably; practices whose notes narrate treatment without measuring progress do not, and discover the gap during review rather than before it.",
      ],
    },
    {
      heading: "Plan of care certification expires quietly",
      body: [
        "Outpatient therapy requires a plan of care certified by a physician or other authorised practitioner, and it must be recertified at defined intervals as treatment continues.",
        "Certification is a paperwork dependency sitting outside the practice's control, which is precisely why it lapses. The treating therapist continues delivering appropriate care; the referring physician's signature is outstanding; and claims for services delivered after the certification expired deny, having been clinically correct throughout.",
      ],
      list: [
        "Obtain initial certification within the required window rather than when the signed form happens to return",
        "Track the recertification date on the same list as the visit count, not in the chart",
        "Chase the signature two weeks before expiry — physician turnaround is the binding constraint",
        "Confirm the certifying practitioner type is one the payer accepts, which varies by plan",
        "Re-certify on a change in the plan of care, not only on the calendar interval",
        "Retain the signed and dated certification; an unsigned plan in the chart is not a certification",
      ],
    },
    {
      heading: "Therapy to maintain function is covered, and is routinely under-billed",
      body: [
        "A durable misconception holds that skilled therapy is only covered while the patient is measurably improving, and that treatment must stop once progress plateaus. The Jimmo v. Sebelius settlement established otherwise: coverage turns on whether the services require the skills of a therapist, not on whether the patient's condition is improving.",
        "Skilled therapy to maintain function, or to slow deterioration in a progressive condition, is covered where the skill of a therapist is genuinely required to deliver it safely and effectively. Practices that discharge on plateau, or decline to bill maintenance treatment they have already delivered, are giving up revenue for care that qualifies.",
        "What the record has to establish shifts accordingly. Improvement-based documentation charts progress toward a functional goal. Maintenance documentation has to explain why the intervention requires a therapist's skill rather than a caregiver or an unsupervised programme — the complexity of the condition, the risk of harm without skilled oversight, the judgement involved in modifying the programme. That is a different note, and practices that continue writing progress-based notes for maintenance patients fail review on documentation grounds rather than on coverage grounds.",
      ],
    },
    {
      heading: "Why therapy denials are worth preventing rather than appealing",
      body: [
        "Premier Inc. puts the average administrative cost of fighting a denied claim at $57.23. Set against a single therapy visit billed at two or three units, that figure frequently approaches the value of the claim, which changes the economics of denial management in this specialty specifically.",
        "In high-value surgical specialties almost every denial is worth appealing. In outpatient therapy a meaningful share is not — the labour costs more than the recovery. That is not an argument for accepting denials; it is an argument for the front-end controls that stop them being created, because the usual backstop of appealing what goes wrong does not pay for itself here.",
        "It also means therapy denials cluster more usefully than they appeal. A recurring unit-calculation error, an expired certification, or a missing KX attestation each generates a steady stream of individually low-value denials. Fixing the cause recovers far more than working the claims one at a time ever will, and Optum's finding that 84% of denials are potentially avoidable applies with unusual force where appeals are economically marginal.",
      ],
    },
  ],
  faq: [
    {
      question: "What is the 8-minute rule?",
      answer:
        "A Medicare rule determining how many units of a timed therapy code can be billed. At least 8 minutes of direct one-on-one treatment is required to bill the first unit, and units are calculated from total timed minutes across the session: 8–22 minutes is one unit, 23–37 is two, 38–52 is three, and so on in 15-minute increments.",
    },
    {
      question: "Are units calculated per code or across the whole session?",
      answer:
        "Across the whole session. Add every timed minute, read the total against the unit bands, then distribute those units across the individual timed codes with the code receiving the most time taking precedence. Calculating each code separately produces the wrong answer whenever individual codes fall short of 8 minutes but combine past a threshold — and the practice loses a unit it earned.",
    },
    {
      question: "Which therapy codes are untimed?",
      answer:
        "Therapy evaluations and re-evaluations are untimed and bill as one unit regardless of duration. Timed codes include therapeutic exercise, manual therapy, neuromuscular re-education and therapeutic activities. The distinction matters because untimed codes never contribute minutes to the timed-unit calculation, and including them inflates the unit count.",
    },
    {
      question: "What does the KX modifier do?",
      answer:
        "It attests that therapy services beyond the annual threshold are medically necessary and that documentation in the record supports continued skilled care. It is an attestation rather than a formality — a second, higher threshold triggers targeted medical review where that documentation is examined. Applying KX automatically without objective progress measures in the notes is where practices fail review.",
    },
    {
      question: "Does time the patient exercises alone count toward billable units?",
      answer:
        "No. Only direct one-on-one skilled treatment time counts. Unsupervised exercise, rest between sets, and unattended modalities occupy the appointment but contribute no timed minutes. This is why documenting the appointment length supports nothing — the record has to establish minutes of direct treatment per intervention plus a stated session total.",
    },
  ],
  sources: ["claims-processing-manual", "mue-tables", "medicare-benefit-policy-manual"],
  relatedServices: ["medical-billing", "medical-coding", "denial-management"],
  relatedSpecialties: ["physical-therapy"],
};

export default post;
