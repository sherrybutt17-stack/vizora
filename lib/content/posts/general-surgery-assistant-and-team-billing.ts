import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "general-surgery-assistant-and-team-billing",
  title: "General surgery billing: assistants, co-surgeons and converted procedures",
  excerpt:
    "When more than one surgeon is involved, or the procedure changes mid-case, the modifier decides whether the work gets paid at all.",
  category: "Specialty Billing",
  published: "2026-08-22",
  updated: "2026-08-22",
  readingMinutes: 8,
  answer:
    "General surgery denials concentrate where more than one provider is involved or the procedure changed during the case. Assistant surgeons bill with modifier 80, 81, 82 or AS depending on who assisted and why; co-surgeons performing distinct parts of one procedure each bill with modifier 62; and a laparoscopic case converted to open is billed as the open procedure, with the conversion documented.",
  sections: [
    {
      heading: "Four assistant modifiers, and they are not interchangeable",
      body: [
        "An assistant surgeon claim asserts two things: that an assistant participated, and that the assistant was of a particular type. The modifier carries the second assertion, and payers price them differently.",
      ],
      table: {
        headers: ["Modifier", "Who assisted", "Typical payment"],
        rows: [
          ["80", "Physician assistant surgeon, full assistance", "A percentage of the surgeon's allowance"],
          ["81", "Physician assistant surgeon, minimum assistance", "A lower percentage"],
          ["82", "Physician assistant where a qualified resident was unavailable", "As modifier 80, teaching settings"],
          ["AS", "Physician assistant, nurse practitioner or clinical nurse specialist", "A reduced percentage of the assistant rate"],
        ],
      },
    },
    {
      heading: "The assistant has to be justified in the operative note",
      body: [
        "The most common assistant surgeon denial is not a wrong modifier. It is an assistant billed for a procedure the payer does not consider to require one.",
        "Payers publish assistant-at-surgery indicators per procedure code, and those indicators fall into three states: an assistant is payable, an assistant is not payable, or an assistant is payable only with documentation supporting medical necessity. Billing against a code flagged as not payable will be denied regardless of what happened in theatre, and appealing it is wasted effort.",
        "Where the indicator requires documentation, the operative note has to establish why an assistant was necessary for this patient and this procedure — the complexity encountered, the anatomy, the duration, the specific tasks the assistant performed. A note that lists the assistant in the header and never mentions them again supports nothing.",
        "Checking the indicator before the case is the control. It takes seconds, it is published, and it converts an unpredictable denial into a known answer.",
      ],
    },
    {
      heading: "Co-surgery is a different arrangement from assistance",
      body: [
        "Modifier 62 identifies two surgeons, usually of different specialties, each performing a distinct portion of a single procedure. It is not two surgeons doing the same operation together, and it is not a surgeon with an assistant.",
        "Both surgeons report the same procedure code with modifier 62 appended, and each is typically paid a share of the total allowance. The requirement that catches practices is documentation: each surgeon must dictate their own operative note describing the portion they personally performed. A single shared note signed by both does not support co-surgery billing, because it cannot establish the distinct contribution each made.",
        "Where three or more surgeons are required, modifier 66 identifies a surgical team, and payers generally price those by report rather than by schedule. Both arrangements carry payer indicators in the same way assistant surgery does, and both are worth checking before the case rather than after the denial.",
      ],
    },
    {
      heading: "A converted procedure is billed as what was completed",
      body: [
        "When a laparoscopic procedure is converted to open, the claim reports the open procedure. The laparoscopic attempt is not separately billable, and billing both denies.",
        "This produces two opposite errors. Some practices bill the laparoscopic code because that is what the case was booked as, which undervalues a more demanding procedure. Others bill both codes hoping to capture the attempted approach, which denies as bundled and can look like unbundling.",
        "The nuance worth capturing is modifier 22. Where the conversion made the procedure substantially more difficult than the open procedure typically is — significant adhesions, unexpected anatomy, materially extended operative time — modifier 22 supports additional payment. It requires a separate statement in the operative note explaining what made the case unusual, and it is priced by report, so it only works when the documentation makes the case.",
        "Most conversions are billed without modifier 22 even where it is supportable, because the note describes what was done without ever stating why it was harder than usual.",
      ],
    },
    {
      heading: "Multiple procedure reduction is correct, and often mistaken for underpayment",
      body: [
        "When several procedures are performed in one session, the highest-valued pays in full and subsequent procedures pay at a reduced rate, on the reasoning that approach and closure are not duplicated. Modifier 51 identifies the secondary procedures where a payer requires it.",
        "This reduction is expected, and appealing it wastes appeal capacity on claims that adjudicated correctly. The problem is that genuine underpayments hide in exactly the same place: a procedure reduced when it should have been exempt, or a bilateral procedure paid as unilateral, appears on the remittance as an ordinary reduction.",
        "Distinguishing them requires comparing the payment against the contracted rate and the applicable reduction, which is variance work rather than denial work. It is also why underpayments persist for years in practices with otherwise strong denial management — nothing on the remittance flags them, so nothing routes them to anyone.",
      ],
    },
    {
      heading: "Reduced and discontinued are two different modifiers",
      body: [
        "When a procedure does not go as planned, the modifier depends on why — and the distinction is one billers routinely collapse into whichever modifier they remember.",
        "Modifier 52 reports reduced services: the procedure was completed, but a component of it was deliberately not performed. The surgeon elected to do less than the code describes, and the work was finished. Modifier 53 reports a discontinued procedure: the procedure was started and then terminated, usually because continuing would have threatened the patient's wellbeing.",
        "The difference is intent and completion. A planned bilateral procedure where only one side was addressed is reduced. A procedure abandoned after induction because the patient became unstable is discontinued. Both are priced by report rather than by schedule, so both require the operative note to state plainly what was and was not done, and why.",
        "In facility and ambulatory surgical centre settings a separate pair applies: modifier 73 for a procedure discontinued before anesthesia administration, and 74 for one discontinued after. Those are facility modifiers rather than professional ones, which is why a surgeon's claim and the facility's claim for the same aborted case legitimately carry different modifiers — a discrepancy that occasionally gets flagged internally as an error when it is not one.",
        "The recurring failure across all four is not modifier selection but documentation. A note describing an uneventful procedure, appended with a modifier asserting it was reduced or abandoned, cannot support by-report pricing. The reviewer is reading the note, not the modifier.",
      ],
    },
    {
      heading: "The economics favour appealing almost everything",
      body: [
        "Premier Inc. measures the average administrative cost of fighting a denied claim at $57.23, and roughly 70% of denied claims are eventually overturned and paid. In low-value specialties that arithmetic makes some denials uneconomic to pursue. In general surgery it essentially never does.",
        "A denied surgical claim is worth multiples of the cost to appeal it, which means the correct policy is to work all of them. Practices that write off surgical denials are almost always doing so for capacity reasons rather than economic ones.",
        "Prevention still matters more. Optum found 84% of denials are potentially avoidable and 22% of those are unrecoverable once they occur. Assistant indicators, co-surgery documentation and conversion coding are all decided before the claim is built — which puts the specialty's main denial categories firmly in the avoidable half, and makes the twenty-two percent figure the reason to bother.",
      ],
    },
  ],
  faq: [
    {
      question: "What is the difference between modifiers 80, 81, 82 and AS?",
      answer:
        "They identify who assisted. Modifier 80 is a physician providing full assistance, 81 is a physician providing minimum assistance, and 82 is a physician assisting where a qualified resident was unavailable, which applies in teaching settings. AS identifies a physician assistant, nurse practitioner or clinical nurse specialist and is paid at a reduced percentage of the assistant rate.",
    },
    {
      question: "Why was an assistant surgeon claim denied?",
      answer:
        "Most often because the payer's assistant-at-surgery indicator for that procedure says an assistant is not payable, in which case appealing is wasted effort. Where the indicator requires documentation, the operative note must establish why an assistant was necessary for this patient and procedure — naming them in the header and never mentioning them again supports nothing.",
    },
    {
      question: "When should modifier 62 be used?",
      answer:
        "When two surgeons, usually of different specialties, each perform a distinct portion of a single procedure. Both report the same code with modifier 62 and each is paid a share of the allowance. Each surgeon must dictate their own operative note describing the portion they personally performed — a single shared note signed by both does not support co-surgery billing.",
    },
    {
      question: "How is a laparoscopic procedure converted to open billed?",
      answer:
        "As the open procedure. The laparoscopic attempt is not separately billable and billing both denies. Where the conversion made the case substantially more difficult than an open procedure typically is, modifier 22 supports additional payment — but it requires a separate statement in the operative note explaining what made it unusual, and is priced by report.",
    },
    {
      question: "Should a multiple procedure payment reduction be appealed?",
      answer:
        "Usually not — the reduction is correct, since approach and closure are not duplicated across procedures in one session. The difficulty is that genuine underpayments look identical on the remittance. Telling them apart means comparing the payment against the contracted rate and the applicable reduction, which is variance work rather than denial work.",
    },
  ],
  relatedServices: ["medical-coding", "denial-management", "medical-billing"],
  relatedSpecialties: ["general-surgery"],
};

export default post;
