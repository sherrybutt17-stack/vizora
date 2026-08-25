import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "neurology-billing-nerve-studies-and-eeg",
  title: "Neurology billing: nerve conduction study counts, EEG and botulinum policy",
  excerpt:
    "Neurology's diagnostic testing is billed by counting studies, and payers audit those counts more closely than almost anything else in outpatient medicine.",
  category: "Specialty Billing",
  published: "2026-08-25",
  updated: "2026-08-25",
  readingMinutes: 9,
  answer:
    "Nerve conduction studies are billed by the number of studies performed, using codes that already encompass a range rather than per-nerve units. Electromyography performed on the same day has its own codes for that combination. Botulinum toxin for chronic migraine requires documented headache frequency meeting the payer's criteria and prior failure of preventive therapy.",
  sections: [
    {
      heading: "Nerve conduction studies are counted, and the count selects one code",
      body: [
        "This is the structural rule that most often goes wrong. Nerve conduction studies are not billed per nerve as separate units. A single code is selected based on how many studies were performed, with each code covering a defined range.",
        "Billing a per-nerve quantity against a code that already describes a range double-counts the work, and it is a visible pattern in claims data. The correct approach is to count the studies performed, select the code whose range contains that number, and report it once.",
        "What counts as a study is defined and is not the same as what counts as a nerve. A motor study with F-wave, a motor study without, and a sensory study each count once for the nerve tested, and the definitions matter because they determine which range applies.",
        "The documentation has to support the count. A report listing each nerve tested and the type of study performed on it supports the code selected. A report stating that nerve conduction studies were performed supports the lowest range, whatever was actually done.",
      ],
    },
    {
      heading: "EMG performed with nerve studies uses different codes",
      body: [
        "Needle electromyography has its own code family, and when it is performed on the same day as nerve conduction studies, a specific set of codes covers that combination rather than the standalone EMG codes.",
        "Using standalone EMG codes alongside nerve conduction studies on the same date produces a bundling edit. The combination codes exist precisely because the two tests are routinely performed together and the combined work is valued as a unit.",
        "The choice between them depends on how many extremities were studied and whether the study was limited or complete, which again turns on documentation naming the muscles examined rather than describing the study in general terms.",
      ],
      table: {
        headers: ["Study", "Code family", "Selection driver"],
        rows: [
          ["Nerve conduction studies", "95907–95913", "Number of studies performed, by range"],
          ["Needle EMG, standalone", "95860–95864", "Number of extremities examined"],
          ["Needle EMG with nerve conduction studies", "95885–95887", "Limited or complete, per extremity"],
          ["Routine EEG", "95816, 95819, 95822", "Awake, awake and asleep, or sleep only"],
        ],
      },
    },
    {
      heading: "EEG codes describe the state of the patient",
      body: [
        "Routine electroencephalography is coded by what the recording captured — an awake and drowsy record, an awake and asleep record, or a record during sleep only. The distinction is not a technical detail; it selects the code.",
        "The report has to state it. Where the report does not specify whether sleep was recorded, the coder cannot select accurately, and the safe selection is usually the lower-paying one.",
        "Extended and continuous monitoring is a separate matter entirely, with codes reflecting duration, whether video was recorded, and the level of physician involvement in review. These are among the more frequently miscoded services in neurology because the code structure changed and older habits persist.",
        "As with radiology, the professional and technical split applies. A neurologist interpreting a study performed on someone else's equipment bills the professional component only. Where the practice owns the equipment and interprets, it bills globally.",
      ],
    },
    {
      heading: "Botulinum toxin for migraine is governed by published criteria",
      body: [
        "Chemodenervation for chronic migraine is well reimbursed and tightly managed. Payers publish medical policy stating what must be documented before they will authorise, and the criteria are specific enough that a denial is usually predictable.",
        "The most common requirement is a documented headache frequency threshold — chronic migraine is generally defined by a substantial number of headache days per month over a sustained period — together with documented trial and failure or intolerance of preventive medications.",
        "The failure that costs practices is documenting the clinical picture accurately without documenting it in the policy's terms. A note describing frequent disabling headaches is clinically clear and does not establish a headache-day count. A headache diary with a monthly total does.",
        "The drug and its administration are separate charges. The toxin is reported with its own code in units of drug, and wastage from a single-use vial is generally reportable where the payer permits it and the discarded amount is documented. Units are a recurring error here, because the drug's billing unit does not correspond to a vial.",
      ],
      list: [
        "Record headache days per month from a diary, not an impression",
        "Document which preventive medications were tried, at what dose, for how long, and why they were stopped",
        "Confirm authorisation covers both the drug and the administration — some payers authorise them separately",
        "Report drug units by the code's stated unit, not by vial count",
        "Document discarded amount where wastage is billable, with the reason",
        "Re-check the policy annually; migraine criteria are revised more often than most",
      ],
    },
    {
      heading: "Evaluation services alongside procedures need real separation",
      body: [
        "Neurology performs many procedures during visits that also involve substantial evaluation, and the modifier 25 question arises constantly. The rule is the same as elsewhere and the temptation is stronger, because neurological evaluation genuinely is complex.",
        "A patient attending for a scheduled injection who receives it and leaves has not had a separately identifiable evaluation, regardless of how complex their underlying condition is. A patient whose treatment plan is reassessed, whose medications are adjusted, or who presents with new symptoms requiring workup, has.",
        "Because neurology's E/M levels tend to be high, and because the procedures are well reimbursed, this combination attracts attention. The protection is a note that carries the evaluation content separately from the procedure note, which is a formatting discipline more than a clinical one.",
      ],
    },
    {
      heading: "Where the specialty's risk actually concentrates",
      body: [
        "Neurology's denial profile is unusual in being weighted toward audit risk rather than front-end denial. The diagnostic testing codes pay, and then get reviewed — study counts that do not match reports, EMG combinations billed as standalone services, monitoring durations that exceed what the record supports.",
        "Optum's analysis of 124 million claim remits found 84% of denials potentially avoidable, and Premier Inc. puts the average administrative cost of fighting one at $57.23 with roughly 70% eventually overturned. Those figures describe denials. They understate the exposure in a specialty where the more expensive event is a post-payment review covering a period rather than a claim.",
        "The control is the same in both cases and it is documentary. A test report that names what was tested, in terms that map to the code selected, is what makes a claim payable and what makes it survive review. Neither requires additional clinical work — only that the work performed is described specifically enough to be recognised.",
      ],
    },
  ],
  faq: [
    {
      question: "How are nerve conduction studies billed?",
      answer:
        "By the number of studies performed, selecting the single code whose range contains that count. They are not billed per nerve as separate units, and reporting a per-nerve quantity against a range-based code double-counts the work. The report must list each nerve tested and the study type performed on it to support the count.",
    },
    {
      question: "Can EMG and nerve conduction studies be billed together?",
      answer:
        "Yes, but using the codes designed for that combination rather than the standalone EMG codes. Reporting standalone EMG alongside nerve conduction studies on the same date produces a bundling edit, because the combination codes already value the two tests performed together.",
    },
    {
      question: "What determines the EEG code?",
      answer:
        "What the recording captured — awake and drowsy, awake and asleep, or sleep only. The report has to state it explicitly. Where it does not, accurate selection is impossible and the safe choice is usually the lower-paying code. Extended and continuous monitoring uses a separate structure based on duration, video, and physician review.",
    },
    {
      question: "What is required to authorise botulinum toxin for migraine?",
      answer:
        "Typically a documented headache-day count per month meeting the payer's chronic migraine threshold, plus documented trial and failure or intolerance of preventive medications. The count has to come from a diary rather than a clinical impression — a note describing frequent disabling headaches does not establish a headache-day figure.",
    },
    {
      question: "How are botulinum toxin units billed?",
      answer:
        "By the code's stated drug unit, not by vial count — a frequent and material error. Wastage from a single-use vial is generally reportable where the payer permits it, provided the discarded amount and the reason are documented. The drug and its administration are separate charges and some payers authorise them separately.",
    },
  ],
  relatedServices: ["medical-coding", "prior-authorization", "denial-management"],
  relatedSpecialties: ["neurology"],
};

export default post;
