import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "anesthesia-billing-units-and-medical-direction",
  title: "Anesthesia billing: base units, time units and medical direction",
  excerpt:
    "Anesthesia is the only specialty where payment is calculated rather than looked up — and every input to that calculation is a place revenue leaks.",
  category: "Specialty Billing",
  published: "2026-08-22",
  updated: "2026-08-22",
  readingMinutes: 8,
  answer:
    "Anesthesia payment is calculated, not looked up: base units for the procedure, plus time units for its duration, plus any modifying units, multiplied by a conversion factor. Denials concentrate in three places — the wrong medical direction modifier, anesthesia times that do not reconcile between the record and the claim, and concurrency that exceeds what medical direction permits.",
  sections: [
    {
      heading: "The formula, and why every input matters",
      body: [
        "Anesthesia does not have a fee per procedure the way surgery does. Payment is computed:",
        "(Base units + Time units + Modifying units) × conversion factor",
        "Base units come from the anesthesia code cross-walked from the surgical procedure. Time units are the duration of anesthesia care, conventionally one unit per fifteen minutes. Modifying units come from physical status and qualifying circumstances where the payer recognises them. The conversion factor is set by the payer and by locality.",
        "Because the output is a calculation, an error in any single input produces an underpayment that looks like a normal payment. Nothing denies. The remittance appears clean. That is what makes anesthesia billing errors unusually persistent — the feedback loop that catches other specialties' mistakes does not exist here.",
      ],
    },
    {
      heading: "Cross-walking the surgical code is where base units go wrong",
      body: [
        "The anesthesia code is derived from the procedure actually performed, and a procedure that changed intraoperatively changes the cross-walk with it. A case that began laparoscopically and converted to open is not the anesthesia code the schedule predicted.",
        "Where multiple procedures were performed in one anesthetic, only one anesthesia code is reported — the one carrying the highest base unit value. Reporting the scheduled procedure rather than the highest-valued one performed is a straightforward underpayment, and it recurs whenever billing works from the schedule instead of from the operative record.",
        "The control is billing from the anesthesia record and the operative note together, after the case, rather than from the booking. That sounds obvious and is frequently not what happens when volume is high.",
      ],
    },
    {
      heading: "Anesthesia time has a defined start and stop",
      body: [
        "Time units are the largest variable input, and the definition of anesthesia time is narrower than staff often assume. It begins when the provider starts preparing the patient for anesthesia care in the location where it is delivered, and ends when the provider is no longer in personal attendance — that is, when the patient can safely be placed under postoperative supervision.",
        "It is not the surgical time, and it is not the room time. Billing surgical time understates it; billing room time overstates it. Both are common, and only one of them is a compliance problem.",
        "The recurring denial here is not the definition but the reconciliation. Where the anesthesia record shows one set of times and the claim carries another, the discrepancy invalidates the time units. That usually happens when times are transcribed rather than carried through from the record — the same transcription failure that produces eligibility denials, applied to a field that determines payment directly.",
      ],
    },
    {
      heading: "Medical direction modifiers change who gets paid what",
      body: [
        "The modifier on an anesthesia claim describes the care team structure, and it determines how payment splits between the anesthesiologist and any certified registered nurse anesthetist involved. Choosing the wrong one either splits payment incorrectly or denies one side of the claim outright.",
      ],
      table: {
        headers: ["Modifier", "Describes"],
        rows: [
          ["AA", "Anesthesia personally performed by the anesthesiologist"],
          ["QY", "Anesthesiologist medically directs one CRNA"],
          ["QK", "Anesthesiologist medically directs two to four concurrent procedures"],
          ["QX", "CRNA service with medical direction by a physician"],
          ["QZ", "CRNA service without medical direction by a physician"],
        ],
      },
    },
    {
      heading: "Medical direction is a set of conditions, not a description",
      body: [
        "Billing medical direction asserts that specific requirements were met for each concurrent case. The anesthesiologist must perform a pre-anesthetic examination and evaluation, prescribe the anesthesia plan, personally participate in the most demanding portions including induction and emergence, ensure any procedures they do not perform are performed by a qualified individual, monitor the course at frequent intervals, remain physically available for immediate diagnosis and treatment of emergencies, and provide indicated post-anesthesia care.",
        "Two consequences follow. First, medical direction is limited to four concurrent procedures — billing direction on a fifth concurrent case is not supportable regardless of what happened clinically. Second, the requirements must be documented per case, not asserted as a general practice pattern. An audit of medical direction examines individual records for evidence of presence at induction and emergence.",
        "Where the conditions were not met, the correct billing is medical supervision or independent CRNA billing, not medical direction. Billing direction that cannot be evidenced is the highest-risk error in the specialty, and it is a compliance exposure rather than a revenue one.",
      ],
    },
    {
      heading: "Modifying units are frequently left on the table",
      body: [
        "Physical status modifiers describe the patient's condition and can add units where a payer recognises them. Qualifying circumstances describe conditions that made the anesthetic materially more difficult.",
        "These are the clearest example of anesthesia's silent-underpayment problem. Omitting them does not deny anything; the claim pays at a lower calculated amount and no report flags it.",
      ],
      list: [
        "Physical status P3, P4 and P5 add units under many commercial contracts — check each payer rather than assuming",
        "Medicare does not recognise physical status modifiers, so a practice that suppresses them universally is losing commercial revenue for a Medicare rule",
        "99100 covers extreme age — under one year or over seventy",
        "99116 covers anesthesia complicated by utilisation of total body hypothermia",
        "99135 covers anesthesia complicated by controlled hypotension",
        "99140 covers emergency conditions, where the emergency must be documented as such in the record",
      ],
    },
    {
      heading: "Why the losses here are invisible",
      body: [
        "Optum's analysis of 124 million claim remits found 84% of denials are potentially avoidable. Anesthesia's distinctive problem is that its largest revenue losses are not denials at all and therefore appear in no avoidable-denial statistic.",
        "A case cross-walked to a lower base unit value pays. A case billed with surgical time rather than anesthesia time pays. A case missing a physical status modifier the contract recognises pays. Every one of those is a permanent, silent shortfall on a claim that adjudicated cleanly, and no denial report will ever surface any of them.",
        "The only control that finds them is variance work: comparing the calculated expected payment against what was received, case by case, against the contracted conversion factor. Practices that run this routinely find the pattern quickly, because the errors are systematic rather than random. Practices that rely on denial reports never find them at all.",
      ],
    },
  ],
  faq: [
    {
      question: "How is anesthesia payment calculated?",
      answer:
        "Base units plus time units plus modifying units, multiplied by a payer- and locality-specific conversion factor. Base units come from the anesthesia code cross-walked from the procedure performed, time units are conventionally one per fifteen minutes of anesthesia care, and modifying units come from physical status and qualifying circumstances where the payer recognises them.",
    },
    {
      question: "When does anesthesia time start and stop?",
      answer:
        "It begins when the provider starts preparing the patient for anesthesia care in the location where it is delivered, and ends when the provider is no longer in personal attendance and the patient can safely be placed under postoperative supervision. It is neither surgical time nor room time — billing surgical time understates it, billing room time overstates it.",
    },
    {
      question: "What is the difference between QK, QY, QX and QZ?",
      answer:
        "They describe the care team structure. QY is medical direction of one CRNA and QK is medical direction of two to four concurrent procedures — both billed by the anesthesiologist. QX is the CRNA's side of a medically directed case, and QZ is a CRNA service with no medical direction. The wrong modifier either splits payment incorrectly or denies one side of the claim.",
    },
    {
      question: "How many concurrent cases can be medically directed?",
      answer:
        "Four. Beyond that, medical direction is not supportable regardless of the clinical circumstances, and the correct billing becomes medical supervision. Medical direction also requires specific documented conditions per case — including personal participation in induction and emergence — which are examined individually on audit rather than accepted as a practice pattern.",
    },
    {
      question: "Why do anesthesia practices lose revenue without seeing denials?",
      answer:
        "Because payment is calculated rather than looked up, so an error in any input produces a lower payment on a claim that adjudicates cleanly. A wrong cross-walk, surgical time billed instead of anesthesia time, or an omitted physical status modifier all pay — just less. Only variance work comparing expected against received payment finds them; denial reports never will.",
    },
  ],
  relatedServices: ["medical-coding", "medical-billing", "practice-analytics"],
  relatedSpecialties: ["anesthesia"],
};

export default post;
