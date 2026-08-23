import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "gastroenterology-screening-vs-diagnostic-colonoscopy",
  title: "Gastroenterology billing: screening versus diagnostic colonoscopy",
  excerpt:
    "One distinction drives most gastroenterology denials and nearly every patient billing complaint: whether the colonoscopy was screening or diagnostic, and what happens when it starts as one and becomes the other.",
  category: "Specialty Billing",
  published: "2026-08-23",
  updated: "2026-08-23",
  readingMinutes: 9,
  answer:
    "A colonoscopy booked as screening that finds and removes a polyp becomes a diagnostic procedure, but it does not stop being preventive. Medicare requires modifier PT and commercial plans require modifier 33 to preserve the patient's preventive benefit. Omitting the modifier is what produces a surprise bill for a patient who was told screening was covered in full.",
  sections: [
    {
      heading: "The conversion problem, and the two modifiers that solve it",
      body: [
        "A patient is scheduled for a screening colonoscopy. They have no symptoms, they are due by age, and they have been told — correctly — that preventive screening is covered without cost-sharing. During the procedure the gastroenterologist finds a polyp and removes it. The procedure that was performed is now therapeutic, and the code that describes it is a polypectomy code rather than a screening code.",
        "Nothing about the patient's benefit changed. The intent at the time of scheduling was screening, and the law that requires preventive coverage attaches to that intent. What changes is that the claim no longer looks like a screening claim, so unless the coding says otherwise, the plan adjudicates it as a diagnostic procedure and applies deductible and coinsurance.",
        "Two modifiers exist to say otherwise, and which one applies depends on the payer rather than the procedure.",
      ],
      table: {
        headers: ["Payer type", "Modifier", "What it communicates"],
        rows: [
          ["Medicare", "PT", "Colorectal cancer screening test converted to a diagnostic or therapeutic procedure"],
          ["Commercial / ACA plans", "33", "Preventive service — apply the preventive benefit despite the diagnostic code"],
          ["Medicare Advantage", "Varies", "Follow the plan's published policy; many follow PT, some follow 33"],
        ],
      },
    },
    {
      heading: "Medicare and commercial plans do not use the same code sets",
      body: [
        "This is the second structural trap, and it is independent of the first. Medicare has its own HCPCS codes for screening colonoscopy that commercial plans generally do not recognise, and commercial plans use the standard CPT colonoscopy codes with a preventive diagnosis and modifier 33.",
        "A practice that bills every screening colonoscopy the same way will therefore be wrong for roughly half its volume, and the failure is silent — the claim does not reject as malformed, it simply adjudicates against the wrong benefit.",
      ],
      table: {
        headers: ["Scenario", "Medicare", "Typical commercial"],
        rows: [
          ["Screening, average risk", "G0121", "45378 with a screening diagnosis and modifier 33"],
          ["Screening, high risk", "G0105", "45378 with a screening diagnosis and modifier 33"],
          ["Screening sigmoidoscopy", "G0104", "45330 with modifier 33"],
          ["Screening that becomes polypectomy", "45385 with modifier PT", "45385 with modifier 33"],
        ],
      },
    },
    {
      heading: "Screening frequency is counted in months, not years",
      body: [
        "Medicare covers screening colonoscopy at defined intervals, and the interval is enforced by month count rather than by calendar year. For a patient at average risk the interval is 120 months, and Medicare will pay once at least 119 months have passed since the last screening. For a patient at high risk the interval is 24 months, payable once at least 23 months have passed.",
        "The distinction matters more than it sounds. A practice tracking screening eligibility by year will schedule a patient in the tenth calendar year after their last colonoscopy and find the claim denied because only 116 months have elapsed. The denial is correct, the appeal fails, and the patient is left with a bill for a procedure they were told was free.",
        "High-risk status is also not a clinical impression — it is a defined set of conditions, most commonly a personal history of adenomatous polyps or colorectal cancer, a family history in a first-degree relative, or inflammatory bowel disease. The diagnosis coding on the claim is what establishes it, so a patient who genuinely qualifies but whose history is not coded gets adjudicated at the average-risk interval.",
        "The control is checking the actual month count and the documented risk category before the appointment is confirmed, not at the point of billing. By the time the claim is being coded, the procedure has already happened.",
      ],
    },
    {
      heading: "Multiple techniques in one session need the right modifier, or none at all",
      body: [
        "Endoscopists routinely use more than one technique in a single colonoscopy — snare a large polyp, cold-forceps a small one, biopsy a suspicious area. Each technique has its own code, and whether they are separately payable depends entirely on whether they were applied to different lesions.",
        "Two techniques on the same lesion are one service. Two techniques on two different lesions are two services, and the second needs a modifier to survive the NCCI edit that would otherwise bundle it.",
      ],
      list: [
        "45378 — diagnostic colonoscopy, with or without collection of specimen by brushing or washing",
        "45380 — colonoscopy with biopsy, single or multiple",
        "45384 — colonoscopy with removal of lesion by hot biopsy forceps",
        "45385 — colonoscopy with removal of lesion by snare technique",
        "45388 — colonoscopy with ablation of lesion",
        "Different lesions, different techniques: append modifier 59 or the more specific XS to the second code",
        "Same lesion, multiple techniques: bill only the most extensive service performed",
      ],
    },
    {
      heading: "The operative note has to identify lesions, not just techniques",
      body: [
        "This is where the modifier question is actually decided, and it is decided before anyone looks at a claim. A note that says a polyp was snared and a biopsy was taken does not establish whether those were the same lesion or two different ones. A coder reading it has no basis for the modifier, and a payer auditing it later has no basis to accept one.",
        "The documentation that supports separate billing identifies each lesion by location and describes what was done to it: a 6mm polyp at the hepatic flexure removed by snare, a 3mm polyp in the sigmoid removed by cold forceps. That is unambiguous to a coder, to an auditor, and to the pathologist receiving the specimens.",
        "It also has to distinguish the screening intent from the findings. The indication section should record why the patient was scheduled — average-risk screening, surveillance following prior adenomas, or evaluation of symptoms — because that is what determines whether the preventive modifiers apply at all. A colonoscopy performed to investigate rectal bleeding is diagnostic from the outset, and appending modifier 33 to it is a coding error rather than a patient benefit.",
        "This distinction is not a technicality the practice can resolve in its own favour. If the patient presented with symptoms, the procedure is diagnostic and the deductible applies, however unwelcome that is to explain at check-in.",
      ],
    },
    {
      heading: "Anesthesia for endoscopy carries the same distinction",
      body: [
        "Monitored anesthesia care during colonoscopy is billed separately, usually by a different entity, and it inherits the screening-versus-diagnostic question rather than escaping it. Anesthesia for a lower GI endoscopic procedure has distinct codes for the screening case and the non-screening case, and the preventive benefit follows the same logic it does on the endoscopy claim.",
        "The practical failure is a mismatch between the two claims. The endoscopist bills the procedure as screening with the appropriate modifier; the anesthesia claim arrives coded as diagnostic without one. The plan applies the preventive benefit to one and cost-sharing to the other, and the patient receives a bill they were assured would not come — for a service they did not choose and cannot evaluate.",
        "Where the practice controls both claims, they should be coded from the same source of truth about the procedure's intent. Where anesthesia is billed by an outside group, the operative note is the shared record, which is another reason for it to state the indication explicitly rather than leaving it to be inferred.",
      ],
    },
    {
      heading: "Infusion therapy is a separate billing discipline inside the same practice",
      body: [
        "Gastroenterology practices treating inflammatory bowel disease increasingly run biologic infusion services, and the billing has almost nothing in common with endoscopy. It is drug billing: J-code units, wastage, prior authorisation tied to a specific drug and dose, and infusion administration codes that depend on documented start and stop times.",
        "The dominant error is units. J-code units are defined by a specific quantity of drug per unit, and that quantity is rarely the same as a vial. Dividing the administered dose by the vial size instead of by the code's stated unit produces a claim that is wrong by a factor large enough to be either a substantial underpayment or an overpayment that has to be refunded.",
        "Administration codes require documented infusion start and stop times, because the codes are time-based beyond the initial hour. A note recording that an infusion was given, without times, supports the initial administration code and nothing further.",
        "Prior authorisation on biologics is granted for a named drug at a named dose over a named period. A dose escalation, a change in interval, or a switch to a biosimilar generally requires a new authorisation, and the claim value is high enough that a lapse here is one of the most expensive single errors a gastroenterology practice can make.",
      ],
    },
    {
      heading: "Why this specialty is worth systematising",
      body: [
        "Optum's analysis of 124 million claim remits found that 84% of denials are potentially avoidable, and gastroenterology sits well above that average because so much of its denial surface is rule-driven rather than judgement-driven. Frequency intervals are published. Which code set a payer expects is published. Whether a modifier applies is determined by the indication, which is known before the patient arrives.",
        "The patient-experience cost is what makes this specialty distinctive, though. Most billing errors produce a denial the practice absorbs and works. A missing modifier 33 produces a bill sent to a patient who was told screening was free, and that is a different kind of failure — it damages a relationship that took a referral and a difficult conversation about bowel prep to establish.",
        "Premier Inc. puts the average administrative cost of fighting a denied claim at $57.23, and roughly 70% are eventually overturned. The economics favour appealing. They favour configuring the screening rules correctly far more.",
      ],
    },
  ],
  faq: [
    {
      question: "What happens when a screening colonoscopy finds a polyp?",
      answer:
        "The procedure becomes therapeutic and is coded as a polypectomy, but the patient's preventive benefit still applies because the intent at scheduling was screening. Medicare requires modifier PT and commercial plans require modifier 33 to communicate that. Without the modifier, the plan applies deductible and coinsurance and the patient receives a bill for a procedure they were told was covered in full.",
    },
    {
      question: "What is the difference between modifier PT and modifier 33?",
      answer:
        "They do the same job for different payers. Modifier PT is Medicare's indicator that a colorectal cancer screening test was converted to a diagnostic or therapeutic procedure. Modifier 33 is the commercial and ACA-plan indicator that a service is preventive despite carrying a diagnostic code. Medicare Advantage plans vary, so the plan's published policy governs.",
    },
    {
      question: "How often will Medicare cover a screening colonoscopy?",
      answer:
        "Every 120 months for a patient at average risk, and every 24 months for a patient at high risk. The interval is enforced by month count rather than calendar year — Medicare pays once at least 119 or 23 months have elapsed. A practice scheduling by year will produce denials that are correct and cannot be appealed successfully.",
    },
    {
      question: "Can two polypectomy techniques be billed in the same colonoscopy?",
      answer:
        "Yes, if they were applied to different lesions, with modifier 59 or XS on the second code. If both techniques were used on the same lesion, only the most extensive service is billable. The operative note has to identify each lesion by location and size for either determination to be supportable in an audit.",
    },
    {
      question: "Why did a patient get a bill after being told screening was free?",
      answer:
        "Almost always one of three causes: a polyp was removed and the preventive modifier was omitted, the screening interval had not yet elapsed by month count, or the anesthesia claim was coded as diagnostic while the endoscopy claim was coded as screening. All three are preventable before the procedure rather than after the bill.",
    },
  ],
  relatedServices: ["medical-coding", "denial-management", "prior-authorization"],
  relatedSpecialties: ["gastroenterology"],
};

export default post;
