import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "lcds-ncds-and-how-coverage-is-decided",
  title: "LCDs and NCDs: how Medicare actually decides what is covered",
  metaTitle: "LCDs and NCDs: how coverage is decided",
  excerpt:
    "Coverage is not one rule. A national determination binds everyone; a local one binds only its jurisdiction — and most medical necessity denials trace to the second kind.",
  category: "Payers",
  published: "2026-08-28",
  updated: "2026-08-28",
  readingMinutes: 8,
  answer:
    "A National Coverage Determination is a CMS decision that applies everywhere. A Local Coverage Determination is issued by an individual Medicare Administrative Contractor and applies only in its jurisdiction. Where no NCD exists, contractors may reach different conclusions, which is why the same procedure and diagnosis can be covered in one state and denied in another.",
  sections: [
    {
      heading: "Two kinds of rule, and only one is national",
      body: [
        "A National Coverage Determination is made by CMS and binds every Medicare Administrative Contractor. Where an NCD says a service is covered under stated conditions, no contractor may narrow it, and where an NCD excludes a service, no contractor may cover it.",
        "A Local Coverage Determination is written by a single contractor for its own jurisdiction. Contractors develop them where national policy is silent, which is most of the time — the great majority of services have no NCD at all.",
        "This is the structural reason a CO-50 or CO-167 denial is not necessarily a coding error. The claim may be correct and simply fall outside a coverage position that applies where the service was rendered and nowhere else.",
      ],
    },
    {
      heading: "The diagnosis lists are not in the LCD",
      body: [
        "This trips up people who go looking for the ICD-10 codes and cannot find them. Since the LCD reform, the covered indication lists and the ICD-10 codes that support them live in a separate Billing and Coding Article attached to the determination, not in the LCD document itself.",
        "The LCD states the coverage position and the clinical criteria. The article states which diagnosis codes will actually pass the edit. A biller checking only the LCD reads the policy and misses the operative list.",
        "When investigating a medical necessity denial, open both. The LCD tells you whether the service is covered at all; the article tells you whether the diagnosis you submitted is one the contractor will accept for it.",
      ],
    },
    {
      heading: "What to read in a determination",
      body: [
        "Coverage policies are long and most of the length is not what decides the claim. Four things carry almost all of the weight.",
      ],
      list: [
        "Covered indications — the clinical circumstances under which the service is payable at all",
        "Limitations — the circumstances explicitly excluded, which is where most denials actually originate",
        "Documentation requirements — what the record must contain, which is what a medical review will be judged against",
        "Frequency limits — how often the service is payable per period, which produces denials that look like duplicates",
      ],
    },
    {
      heading: "When there is no policy at all",
      body: [
        "Plenty of services have neither an NCD nor an LCD. That absence is not a coverage guarantee and it is not an exclusion — it means the contractor has published no position and will adjudicate against general medical necessity standards.",
        "In practice this makes the documentation the entire argument, because there is no published criteria list to satisfy. The record has to establish why the service was reasonable and necessary for this patient on its own terms.",
        "It also makes the denial harder to predict, which is the case for obtaining an advance beneficiary notice where a service is unusual and expensive. An ABN issued before the service converts an unpredictable write-off into a billable balance; issued after the denial it does nothing.",
      ],
    },
    {
      heading: "Checking policy before the service, not after",
      body: [
        "The Medicare Coverage Database is searchable by code, by contractor and by state, and it is the direct answer to whether a diagnosis supports a procedure under the policy that applies to you. It is public, free, and updated as determinations change.",
        "Checking it before an elective service is the difference between a scheduling decision and a write-off. Checking it after a denial tells you only whether the appeal is worth writing.",
        "Determinations also change. A service covered last year may sit under a revised policy this year, and contractors publish proposed changes for comment before they take effect — which means the change is visible before it starts denying claims, to anyone watching.",
      ],
      table: {
        headers: ["", "NCD", "LCD"],
        rows: [
          ["Issued by", "CMS", "An individual MAC"],
          ["Applies", "Nationally", "In that contractor's jurisdiction only"],
          ["Can a MAC override it", "No", "It is the MAC's own policy"],
          ["Coverage where silent", "MACs may issue an LCD", "General medical necessity applies"],
          ["ICD-10 lists", "Within the determination", "In an attached Billing and Coding Article"],
        ],
      },
    },
    {
      heading: "What this changes about denial work",
      body: [
        "A medical necessity denial should be worked against the specific policy that governed the claim, not against a general sense of what Medicare covers. That means identifying the contractor for the place of service, finding the determination in force on the date of service, and answering the criteria it actually states.",
        "An appeal that argues the patient needed the service, without addressing the policy's criteria, is answering a question the reviewer was not asked. An appeal that quotes the covered indication and shows where the record satisfies it is answering the right one.",
        "Our state pages name the Medicare Administrative Contractor and jurisdiction for each of the fifty states, which is the first thing to establish before looking a policy up.",
      ],
    },
  ],
  faq: [
    {
      question: "What is the difference between an LCD and an NCD?",
      answer:
        "A National Coverage Determination is issued by CMS and binds every Medicare contractor nationwide. A Local Coverage Determination is issued by a single Medicare Administrative Contractor and applies only within its jurisdiction. Contractors develop LCDs where national policy is silent, which covers the majority of services.",
    },
    {
      question: "Why can't I find the ICD-10 codes in an LCD?",
      answer:
        "Because they are not there. Since the LCD reform, covered indication lists and the supporting ICD-10 codes live in a separate Billing and Coding Article attached to the determination. The LCD states the coverage position; the article states which diagnosis codes will pass the edit.",
    },
    {
      question: "What happens when there is no LCD or NCD for a service?",
      answer:
        "The contractor adjudicates against general medical necessity standards instead of a published criteria list. That makes the documentation the whole argument and the outcome harder to predict, which is exactly the situation where an advance beneficiary notice obtained before the service is worth having.",
    },
    {
      question: "Can a MAC refuse to cover something an NCD covers?",
      answer:
        "No. National coverage determinations bind all contractors. A MAC cannot narrow an NCD's coverage or cover a service an NCD excludes. Local determinations exist to address services national policy does not speak to.",
    },
    {
      question: "How do you check coverage before performing a service?",
      answer:
        "Search the Medicare Coverage Database by code, contractor or state for the determination in force on the date of service, then read the covered indications, limitations, documentation requirements and frequency limits — and open the attached billing and coding article for the diagnosis list.",
    },
  ],
  sources: ["medicare-coverage-database", "medicare-benefit-policy-manual", "find-your-mac", "abn-forms"],
  relatedServices: ["denial-management", "medical-coding", "prior-authorization"],
};

export default post;
