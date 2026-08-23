import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "radiology-billing-professional-technical-component",
  title: "Radiology billing: component splits, orders and medical necessity denials",
  excerpt:
    "Radiology is the specialty where you bill for a patient you never met, using an order someone else wrote. That structure produces a denial profile unlike any other specialty.",
  category: "Specialty Billing",
  published: "2026-08-23",
  updated: "2026-08-23",
  readingMinutes: 9,
  answer:
    "Most radiology denials come from three sources: billing the wrong component for the place of service, a signed order that does not carry a diagnosis supporting medical necessity under the payer's coverage policy, and demographic or eligibility errors inherited from the referring practice. All three originate outside the radiology group, which is what makes them hard to control and expensive to ignore.",
  sections: [
    {
      heading: "The component split decides the code before anything else does",
      body: [
        "Most diagnostic imaging services divide into two parts. The technical component covers the equipment, the supplies, the technologist and the facility overhead. The professional component covers the physician's interpretation and the written report. Whether a group bills one, the other, or both is determined by what it actually owns and performs — and getting this wrong is the most mechanical denial in the specialty.",
        "A radiologist reading hospital studies bills the professional component only, because the hospital owns the equipment and bills the technical side. An imaging centre that owns its scanners and employs its readers bills globally, with no modifier. An arrangement where one entity owns the equipment and another supplies the reads splits the claim between them.",
      ],
      table: {
        headers: ["Arrangement", "What to bill", "Modifier"],
        rows: [
          ["Imaging centre owns equipment and reads in-house", "Global service", "None"],
          ["Radiologist reads studies performed at a hospital", "Professional component only", "26"],
          ["Facility owns equipment, outside group reads", "Technical component only", "TC"],
          ["Physician office performs imaging, sends out for reading", "Technical component only", "TC"],
        ],
      },
    },
    {
      heading: "Place of service is what tells the payer the split is right",
      body: [
        "A global claim submitted with a hospital place of service is internally contradictory. The payer is already paying the hospital for the technical component under its own claim, so a second global claim asks it to pay that component twice. Some payers reject this outright; others pay the professional portion and deny the rest, which looks like a partial payment rather than an error and often goes unworked.",
        "The failure is usually configuration rather than judgement. A group that historically read only in its own centre adds a hospital contract, and the charge templates still default to global. Every claim from the new contract is wrong from the first day, and because the professional portion pays, the underlying problem can persist for months before anyone reconciles expected against received.",
        "The check is straightforward and worth running as a standing report: any claim carrying a facility place of service with no component modifier, and any claim carrying modifier 26 with an office place of service where the group owns the equipment. Both are structurally impossible and both are visible before submission.",
      ],
    },
    {
      heading: "Medical necessity is decided by a diagnosis the radiologist did not choose",
      body: [
        "This is the defining constraint of the specialty. Payers publish coverage policies stating which diagnoses support which imaging studies, and a study performed for a diagnosis outside that list is denied as not medically necessary. The radiologist has no control over the diagnosis, because it comes from the referring physician's order.",
        "The result is a denial the radiology group receives for a decision it did not make. An order arrives reading \"MRI lumbar spine, back pain\", the payer's policy requires documented conservative therapy or specific neurological findings for that indication, and the study is denied after it has already been performed and read.",
        "There is no fixing this at the claim level. Unspecified back pain does not become a covered indication because a coder would like it to, and changing the diagnosis to one that is covered — without documentation from the ordering physician supporting it — is not a coding correction, it is a false claim.",
        "What can be fixed is the point of capture. The order is where medical necessity is established or lost, and an order carrying only a symptom when the policy requires a clinical finding is a denial that has already happened, weeks before the claim goes out.",
      ],
      list: [
        "Screen orders against the payer's coverage policy at scheduling, not at billing",
        "Where the order's diagnosis does not support the study, query the referring practice before the appointment",
        "Issue an ABN for Medicare patients where the study is likely to be denied, before it is performed",
        "Track denials by referring provider — the pattern is almost always concentrated in a handful of practices",
        "Keep the signed order on file; an unsigned or verbal order without written confirmation is not defensible in an audit",
        "Re-verify coverage policies annually; imaging policies are among the most frequently revised",
      ],
    },
    {
      heading: "The ABN is the only mechanism that makes a denial billable",
      body: [
        "For Medicare patients, an Advance Beneficiary Notice signed before the service is performed transfers financial responsibility to the patient when the study is denied as not medically necessary. Without it, the denial is written off. With it, the balance is billable.",
        "The requirements are specific and unforgiving. The notice has to be issued before the service, has to identify the specific study and the specific reason it is expected to be denied, has to state an estimated cost, and has to be signed by the patient with a selected option. A blanket ABN signed at registration by every patient, covering every service, is not valid — CMS treats routine issuance as no issuance at all.",
        "In practice this means the ABN decision has to happen at the same moment the order is screened, because that is the only point where the group knows a denial is likely and the patient is still available to sign. A group that screens orders but does not act on the result has done the analysis and thrown away the benefit.",
      ],
    },
    {
      heading: "Contrast coding is more literal than it sounds",
      body: [
        "Imaging codes distinguish studies performed without contrast, with contrast, and without followed by with. The distinction is worth real money and is frequently coded from the order rather than from what was actually administered.",
        "The definition is narrower than clinicians often assume. For coding purposes, \"with contrast\" means contrast administered intravascularly, intra-articularly or intrathecally. Oral or rectal contrast alone does not meet the definition, so a CT abdomen given oral contrast only is coded as a study without contrast, whatever the order requested.",
        "The \"without followed by with\" codes require both sequences to have been performed and documented in the same session. Billing them because the protocol allows for it, when only one sequence was acquired, is an overpayment that surfaces in audit rather than in adjudication.",
        "The report is the source. Where the report does not state what contrast was given and by what route, the coder is guessing, and the guess is as likely to underpay the group as to overpay it.",
      ],
    },
    {
      heading: "Repeat, bilateral and multiple studies each need their own signal",
      body: [
        "Radiology generates more same-day duplicate-looking claims than most specialties, and each legitimate duplication needs a modifier that explains it. Without one, the second claim is denied as a duplicate — a denial that is trivially correct on its face and requires the underlying documentation to overturn.",
      ],
      table: {
        headers: ["Situation", "Modifier", "Note"],
        rows: [
          ["Repeat procedure, same physician", "76", "Same study repeated the same day by the same reader"],
          ["Repeat procedure, different physician", "77", "Same study repeated by a different reader"],
          ["Bilateral procedure", "50", "Where the code is not already inherently bilateral"],
          ["Distinct study, separate anatomic site", "XS", "More specific than 59 and preferred where it applies"],
          ["Reduced service", "52", "Study partially performed — do not bill as complete"],
        ],
      },
    },
    {
      heading: "The data you bill on arrives from someone else",
      body: [
        "A radiology group receives the patient's demographics, insurance and order from the referring practice, and inherits every error in them. A transposed member ID, a plan that terminated last month, a name that does not match the payer's record — none of these originate with the group, and all of them deny.",
        "Registration and eligibility errors are the single largest denial category industry-wide in Optum's analysis of 124 million claim remits, at 21.9%. In radiology the proportion tends to run higher, because the group is not the entity that collected the information and often does not meet the patient long enough to correct it.",
        "The mitigation is running eligibility independently rather than trusting the referral. It is duplicated work, and it is cheaper than the denial: verifying coverage at the point the study is scheduled catches terminated plans, wrong payers and prior-authorisation requirements while the appointment can still be rescheduled.",
        "Prior authorisation deserves particular attention, because advanced imaging is one of the most heavily managed service categories in the market. Many plans delegate imaging authorisation to a radiology benefit manager with its own portal, its own criteria and its own turnaround. The referring practice is nominally responsible for obtaining it; the radiology group is the one that does not get paid when it was not obtained.",
      ],
    },
    {
      heading: "Where the leverage actually is",
      body: [
        "Radiology's denial profile is unusual in that most of it is created upstream. That is discouraging if the group thinks of billing as something that happens after the study, and it is the entire opportunity if the group moves the work forward.",
        "Every meaningful control in this specialty sits at scheduling: verify eligibility independently, confirm authorisation is actually on file rather than assumed, screen the order's diagnosis against the coverage policy, and issue an ABN where the study is likely to be denied. Each of those is available days before the study and impossible after it.",
        "Optum found 84% of denials potentially avoidable and 22% of those unrecoverable once they occur. Premier Inc. puts the administrative cost of fighting a denial at $57.23, with roughly 70% eventually overturned. For a high-volume specialty billing modest amounts per study, the arithmetic is stark — a $57 appeal on a study reimbursed in the low hundreds is worth running, but preventing it is worth several times more.",
      ],
    },
  ],
  faq: [
    {
      question: "When should modifier 26 be used in radiology billing?",
      answer:
        "When the group provides the interpretation and written report but does not own the equipment — most commonly a radiologist reading studies performed at a hospital. The facility bills the technical component separately. Billing globally in that arrangement asks the payer to pay the technical component twice and is denied or partially paid.",
    },
    {
      question: "Why are radiology claims denied as not medically necessary?",
      answer:
        "Because the diagnosis on the referring physician's order does not appear in the payer's coverage policy for that study. The radiology group did not choose the diagnosis and cannot change it without documentation supporting the change. The only effective control is screening orders against the coverage policy at scheduling, while there is still time to query the referring practice.",
    },
    {
      question: "Does oral contrast count as a study with contrast?",
      answer:
        "No. For coding purposes, contrast means administered intravascularly, intra-articularly or intrathecally. A CT given oral or rectal contrast only is coded as a study without contrast, regardless of what the order requested. The radiology report should state what contrast was given and by what route, or the coder is guessing.",
    },
    {
      question: "When is an ABN required for imaging?",
      answer:
        "For Medicare patients, before performing a study the group expects to be denied as not medically necessary. It must identify the specific study, the specific reason denial is expected, an estimated cost, and be signed with an option selected. A blanket ABN signed routinely by every patient is not valid and does not make the balance billable.",
    },
    {
      question: "Who is responsible for prior authorisation on advanced imaging?",
      answer:
        "The referring practice is nominally responsible, but the radiology group is the party that goes unpaid when authorisation was not obtained. Many plans delegate imaging authorisation to a radiology benefit manager with separate criteria and turnaround times. Confirming authorisation is actually on file, rather than assumed, is worth doing independently at scheduling.",
    },
  ],
  relatedServices: ["eligibility-verification", "prior-authorization", "denial-management"],
  relatedSpecialties: ["radiology"],
};

export default post;
