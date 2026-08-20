import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "credentialing-mistakes-that-delay-payments",
  title: "Credentialing mistakes that delay payments",
  excerpt:
    "A provider who cannot bill still costs you a salary. The five credentialing errors that create the longest revenue gaps.",
  category: "Credentialing",
  published: "2026-05-01",
  updated: "2026-08-20",
  readingMinutes: 7,
  answer:
    "Credentialing typically takes 60 to 90 days from complete application to network approval. The most costly mistake is starting late — every week of delay is a week a salaried provider generates cost but no billable revenue, and many payers do not permit retroactive billing to the application date.",
  sections: [
    {
      heading: "Starting after the start date",
      body: [
        "The single most expensive credentialing error is beginning the process when a provider arrives rather than when they sign. With a 60–90 day timeline, a provider who starts seeing patients on day one may not be billable until month three.",
        "Whether that care is recoverable depends entirely on the payer. Some permit retroactive billing to the application date once approved; many do not. For a behavioral health group hiring several clinicians a year, this is routinely the largest single source of lost revenue in the practice.",
      ],
    },
    {
      heading: "Incomplete initial applications",
      body: [
        "Applications rejected for missing information do not resume where they stopped — they generally restart. A single missing document can add weeks to an already long timeline.",
        "The preparation stage matters more than it appears. Assembling licenses, education verification, board certification, work history with no unexplained gaps, malpractice history and hospital privileges before submitting is faster than submitting early and correcting.",
      ],
    },
    {
      heading: "Letting CAQH lapse",
      body: [
        "CAQH ProView is the database most commercial payers pull credentialing data from. Profiles require periodic re-attestation, and when attestation lapses, applications stall — often without the practice being notified.",
        "This is a silent failure mode. The application does not get rejected; it simply stops progressing, and nobody notices until someone asks why a provider still is not enrolled.",
      ],
    },
    {
      heading: "Missing re-credentialing deadlines",
      body: [
        "Re-credentialing recurs every two to three years per payer. A missed deadline can mean termination from the network, which stops payment on a provider who has been billing successfully for years.",
        "Because the cycles are long and stagger across payers, they are easy to lose track of. Tracking renewal dates per provider per payer is the entire control.",
      ],
    },
    {
      heading: "Scheduling patients before enrollment is effective",
      body: [
        "Enrollment has an effective date, and services before it generally deny under CO-B7 — provider not eligible on the date of service. These denials are usually unrecoverable.",
        "The practical control is to hold payer-specific scheduling until enrollment is confirmed effective, rather than assuming approval is imminent.",
      ],
    },
    {
      heading: "The credentialing timeline, realistically",
      body: [
        "Most credentialing delays are not caused by a mistake in the application. They are caused by starting it on the assumption it takes weeks when it takes months.",
      ],
      table: {
        headers: ["Stage", "Typical duration", "What delays it"],
        rows: [
          ["CAQH profile complete and attested", "1–2 weeks", "Missing documents; expired attestation"],
          ["Payer application submitted", "1 week", "Waiting on the practice for a W-9, license or malpractice face sheet"],
          ["Primary source verification", "30–90 days", "Unresponsive references and prior employers"],
          ["Committee review and approval", "30–60 days", "Committees meet monthly — missing one adds a full cycle"],
          ["Contract loaded and effective", "2–4 weeks", "Approval is not the same as being loaded; claims deny until it is"],
        ],
      },
    },
    {
      heading: "Approved is not the same as billable",
      body: [
        "The most expensive misunderstanding in credentialing is treating the approval letter as the finish line. Approval means the payer has accepted the provider; it does not mean the provider is loaded into the claims system under the correct group, tax ID and location.",
        "Until that load happens, claims deny — commonly as a provider-not-eligible or enrollment denial, which reads like a credentialing failure and is actually a configuration lag.",
        "Confirm three things in writing before billing: the effective date, the group and tax ID the provider is linked to, and every service location associated with the contract. A provider correctly credentialed at one location and not another will deny for exactly half their schedule.",
      ],
    },
    {
      heading: "Letting the group contract stand in for the provider",
      body: [
        "A practice that already participates with a payer often assumes a new hire inherits that participation. They do not. Network participation attaches to the individual provider as well as the group, and a claim billed under a provider who is not yet enrolled will deny regardless of how long the practice has been in network.",
        "The exception is delegated credentialing, where a payer contractually authorises a large group to credential its own providers against agreed standards and simply loads the roster. That arrangement genuinely does compress timelines to weeks — but it is negotiated, audited, and generally available only to groups with the volume and infrastructure to sustain it. If nobody at the practice can name the delegated agreement, there is not one.",
        "The practical consequence is that every new provider restarts the clock with every payer, in parallel. A practice contracted with fourteen payers is running fourteen independent applications, each with its own committee calendar.",
      ],
    },
    {
      heading: "The documents that stall applications most often",
      body: [
        "Payers rarely reject applications outright. They pend them, which is worse — a pended application sits without a decision and without notice, and the clock keeps running while nobody is waiting on anything they know about. Almost all pends trace to the same short list.",
      ],
      list: [
        "Malpractice insurance certificate expiring before the anticipated effective date",
        "Gaps in the work history longer than 30 days without a written explanation",
        "State licence or DEA registration not yet issued, or issued in a different name",
        "Hospital privileges pending, where the payer requires them for the specialty",
        "Board certification status listed as \u201Cin progress\u201D without an exam date",
        "A signature or attestation date that predates another document in the packet",
        "W-9 or group tax ID that does not match the contracted entity exactly",
      ],
    },
    {
      heading: "Keep CAQH current, because payers pull rather than ask",
      body: [
        "CAQH ProView is the shared credentialing repository most commercial payers draw from, and it requires re-attestation every 120 days. Attestation is not a formality: an expired profile is treated as unverified data, and payers pulling the record find nothing usable.",
        "The failure mode is quiet. Nobody is refused; the application simply does not progress, and the practice discovers the lapse when it asks for a status update weeks later. Put the 120-day re-attestation on a calendar owned by a named person, and re-attest whenever a licence, insurance certificate or practice location changes rather than waiting for the cycle.",
      ],
    },
    {
      heading: "What the delay actually costs",
      body: [
        "The cost of a credentialing delay is not an administrative inconvenience; it is the provider\u2019s full compensation for the period, against zero billable revenue. A salaried physician starting 60 days before their effective date represents two months of cost the practice absorbs with nothing to offset it.",
        "Retroactive billing rarely rescues it. Medicare permits limited retrospective billing for physicians \u2014 generally up to 30 days before the effective date of enrollment \u2014 but commercial payers set their own rules and many permit none at all. Planning around retroactive billing means planning around the one payer that allows it and hoping the rest follow, which they do not.",
        "This is why credentialing belongs on the hiring timeline rather than the onboarding checklist. The application should be submitted when the offer is signed, not when the provider arrives.",
      ],
    },
    {
      heading: "Protect the revenue while you wait",
      body: [
        "Credentialing lag is predictable, so the revenue exposure it creates is manageable rather than inevitable.",
      ],
      list: [
        "Start 90–120 days before the provider's start date. This is the single highest-return decision in the process.",
        "Ask each payer explicitly whether retroactive billing to the effective date is permitted, and get the answer in writing — policies differ and some allow it within a defined window.",
        "Hold claims rather than submitting them into a denial. A denied claim consumes an appeal; a held claim only consumes time.",
        "Track every expirable credential — license, DEA, malpractice, board certification — against a calendar. A lapsed credential mid-contract suspends billing exactly like a missing one.",
        "Re-attest CAQH on schedule. An expired attestation quietly stalls applications at payers that pull from it.",
      ],
    },
  ],
  faq: [
    {
      question: "How long does provider credentialing take?",
      answer:
        "Typically 60 to 90 days from a complete application to network approval, though individual payers range from about 30 days to well past 120. The variable is rarely the payer\u2019s speed \u2014 it is whether the application arrived complete. Pended applications wait without notice, so an incomplete packet can add a month before anyone realises nothing is progressing.",
    },
    {
      question: "Can a provider see patients before credentialing is complete?",
      answer:
        "They can be scheduled, but the claims will deny. Some practices bill under a supervising provider where incident-to rules genuinely apply, which is legitimate only when every condition of that rule is met. Billing under another provider simply to get claims paid is misrepresentation of the rendering provider, and it carries consequences far larger than the delayed revenue.",
    },
    {
      question: "Does a new provider need credentialing if the practice is already in network?",
      answer:
        "Yes. Network participation attaches to the individual provider as well as the group, so a new hire must be enrolled with each payer separately even at a long-established practice. The only exception is a negotiated delegated credentialing agreement, where the payer authorises the group to credential its own providers and load them to the roster.",
    },
    {
      question: "What is CAQH and why does it matter?",
      answer:
        "CAQH ProView is the shared credentialing repository most commercial payers pull provider data from. It requires re-attestation every 120 days, and a lapsed profile is treated as unverified \u2014 payers find no usable record and the application stalls silently. Keeping attestation current is one of the cheapest ways to protect a credentialing timeline.",
    },
    {
      question: "Can claims be billed retroactively once credentialing is approved?",
      answer:
        "Sometimes, but not reliably. Medicare generally permits physicians limited retrospective billing up to 30 days before the enrollment effective date. Commercial payers set their own rules and many allow none at all, so revenue for services delivered before the effective date is frequently unrecoverable. Submitting applications at offer-signing rather than at start date is the only dependable protection.",
    },
  ],
  relatedServices: ["credentialing", "revenue-cycle-management", "denial-management"],
  relatedSpecialties: ["mental-health"],
};

export default post;
