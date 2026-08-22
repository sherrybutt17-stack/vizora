import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "pain-management-injection-billing",
  title: "Pain management billing: frequency limits, imaging guidance and diagnostic blocks",
  excerpt:
    "Interventional pain is governed by payer medical policy more tightly than almost any specialty — and the policy is published, which makes most denials predictable.",
  category: "Specialty Billing",
  published: "2026-08-23",
  updated: "2026-08-23",
  readingMinutes: 8,
  answer:
    "Interventional pain denials are largely policy-driven rather than coding errors. Payers cap injection frequency over rolling periods, require documented duration and percentage of relief before approving a repeat, require diagnostic blocks before radiofrequency ablation, and reject separately billed fluoroscopy on codes that already include imaging guidance.",
  sections: [
    {
      heading: "Imaging guidance is already inside most injection codes",
      body: [
        "This is the most mechanical denial in the specialty and the easiest to eliminate outright. Many interventional spine codes have imaging guidance bundled into the code itself, and billing fluoroscopy separately alongside them triggers an NCCI edit.",
        "The confusion is understandable — fluoroscopy genuinely was separately reportable for some of these procedures historically, and older habits persist in charge templates long after the code descriptors changed.",
      ],
      table: {
        headers: ["Procedure", "Codes", "Imaging guidance"],
        rows: [
          ["Transforaminal epidural, lumbar or sacral", "64483, 64484", "Included — do not bill separately"],
          ["Paravertebral facet joint injection", "64490–64495", "Included"],
          ["Facet joint nerve destruction, radiofrequency", "64633–64636", "Included"],
          ["Interlaminar epidural, with imaging guidance", "62321, 62323", "Included in the code descriptor"],
          ["Interlaminar epidural, without imaging guidance", "62320, 62322", "Not included"],
        ],
      },
    },
    {
      heading: "Frequency limits are published, and they run on rolling periods",
      body: [
        "Payers cap how many injections of a given type they will cover in a period, and the cap is set in published medical policy rather than negotiated per claim. Exceeding it denies, and appealing a straightforward frequency denial rarely succeeds because the payer applied its own stated rule correctly.",
        "Two details cause most of the failures. The period is usually rolling rather than calendar — twelve months back from the date of service, not the current year — so a practice tracking by calendar year will approve a procedure the payer counts as exceeding the limit. And the count often spans levels and sides in ways that are not intuitive, so bilateral or multi-level work can consume the allowance faster than the visit count suggests.",
        "The control is tracking injections per patient against the specific payer's stated limit and period, visible at scheduling rather than discovered at adjudication. Because the limits are published, this is one of the few denial categories that can be reduced to nearly zero with configuration rather than judgement.",
      ],
    },
    {
      heading: "A repeat injection has to be justified by the response to the last one",
      body: [
        "Payers approve repeat injections on evidence that the previous one worked. What the record has to establish is specific and quantitative: how much relief the patient obtained, expressed as a percentage, and how long it lasted.",
        "A note recording that the patient “did well” or “had good relief” supports nothing. A note recording “70% reduction in pain sustained for approximately nine weeks, with return of symptoms thereafter” supports the repeat directly, in the terms the policy is written in.",
        "This is the single highest-yield documentation change available in the specialty, because it converts an appeal that fails on vagueness into one that succeeds on the record. It also has to be captured at the follow-up visit — reconstructing a percentage of relief months later, after the denial arrives, is neither accurate nor credible.",
        "Where relief was inadequate, that is also worth documenting plainly. A repeat injection after a failed one is harder to justify, and the clinical decision to proceed anyway should be reasoned in the note rather than left implicit.",
      ],
    },
    {
      heading: "Radiofrequency ablation depends on diagnostic blocks performed first",
      body: [
        "Ablation is rarely approved on symptoms alone. Payer policies generally require prior diagnostic medial branch blocks demonstrating that the targeted nerves are in fact the pain source, and the requirement is specific about how many blocks and what response threshold.",
        "The thresholds vary. Many policies require two separate diagnostic blocks, each producing a high percentage of relief — commonly eighty percent or more — over the expected duration of the anesthetic. Others accept a single block or a lower threshold. Because the requirement differs by payer, and by plan within a payer, the only reliable approach is reading the applicable policy before scheduling the ablation rather than after.",
        "The denial this produces is expensive and entirely avoidable. The ablation is performed, the payer asks what diagnostic blocks preceded it, and either the blocks were never done or the record does not quantify the response they produced. The procedure was clinically appropriate and is nonetheless unpayable, because the prerequisite was procedural rather than clinical.",
      ],
    },
    {
      heading: "Prior authorization is where the largest claims are lost",
      body: [
        "Interventional procedures carry meaningful claim values, and most require authorisation. Authorisation issues are the third-largest denial category industry-wide at 12.8% according to Optum's analysis of 124 million claim remits, and in this specialty they attach to unusually large claims.",
        "The recurring failure is not forgetting authorisation entirely. It is authorisation that does not match what was performed — approved for one level and two were done, approved for a right-side injection and the left was treated, approved for a diagnostic block and an ablation followed, or approved within a date range that expired before the procedure was scheduled.",
      ],
      list: [
        "Store the authorisation against the specific CPT codes, levels and laterality approved, not against the patient",
        "Confirm the authorisation's date range still covers the appointment when it is scheduled and again when it is confirmed",
        "Where the plan changes intraoperatively, treat additional levels as requiring their own approval rather than assuming coverage extends",
        "Check whether the payer requires separate authorisation for the diagnostic block and the subsequent ablation — many do",
        "Re-verify authorisation requirements at the start of each plan year; medical policies are revised annually",
        "Record who granted the authorisation and their reference number, which is the only useful evidence in an appeal",
      ],
    },
    {
      heading: "Most of these denials are preventable, which is the point",
      body: [
        "Optum found that 84% of denials are potentially avoidable and that 22% of those become unrecoverable once they occur. Interventional pain sits at the high end of the avoidable range, because nearly every denial category in the specialty is determined by information available before the procedure.",
        "Frequency limits are published. Medical policies stating diagnostic block requirements are published. Which codes include imaging guidance is in the code descriptor. Authorisation requirements are knowable at scheduling. None of this requires clinical judgement to get right — it requires the information to be in front of the person booking the case.",
        "Premier Inc. puts the average administrative cost of fighting a denied claim at $57.23, and roughly 70% of denials are eventually overturned. Given interventional claim values, appealing is economically sound here and worth doing systematically. But an appeal on a frequency limit correctly applied, or an ablation performed without its prerequisite blocks, is an appeal that was lost before it was written.",
      ],
    },
  ],
  faq: [
    {
      question: "Can fluoroscopic guidance be billed separately with spinal injections?",
      answer:
        "Usually not. Transforaminal epidural injections, paravertebral facet joint injections and facet joint nerve destruction all have imaging guidance included in the code, and billing fluoroscopy alongside them triggers an NCCI edit. The exception is interlaminar epidural codes performed without imaging guidance, where guidance is not part of the descriptor.",
    },
    {
      question: "Why was a repeat injection denied?",
      answer:
        "Most often because the record does not quantify the response to the previous injection. Payers approve repeats on evidence the last one worked, expressed as a percentage of relief and a duration. A note saying the patient did well supports nothing; a note recording seventy percent relief sustained for nine weeks supports the repeat in the terms the policy is written in.",
    },
    {
      question: "How do injection frequency limits work?",
      answer:
        "Payers cap how many injections of a given type they cover in a period, set in published medical policy. The period is usually rolling — twelve months back from the date of service rather than the calendar year — and the count can span levels and sides, so bilateral or multi-level work consumes the allowance faster than the visit count suggests.",
    },
    {
      question: "What is required before radiofrequency ablation?",
      answer:
        "Diagnostic medial branch blocks demonstrating the targeted nerves are the pain source. Many policies require two separate blocks each producing a high percentage of relief, commonly eighty percent or more, over the anesthetic's expected duration. Thresholds vary by payer and by plan, so the applicable policy has to be read before scheduling rather than after.",
    },
    {
      question: "Why do authorised pain procedures still get denied?",
      answer:
        "Because the authorisation did not match what was performed — approved for one level when two were done, one side when the other was treated, or within a date range that expired before the procedure. Storing authorisations against the specific codes, levels and laterality approved, rather than against the patient, is what prevents it.",
    },
  ],
  relatedServices: ["prior-authorization", "denial-management", "medical-coding"],
  relatedSpecialties: ["pain-management"],
};

export default post;
