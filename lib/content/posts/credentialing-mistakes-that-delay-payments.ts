import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "credentialing-mistakes-that-delay-payments",
  title: "Credentialing mistakes that delay payments",
  excerpt:
    "A provider who cannot bill still costs you a salary. The five credentialing errors that create the longest revenue gaps.",
  category: "Credentialing",
  published: "2026-05-01",
  updated: "2026-08-19",
  readingMinutes: 3,
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
  relatedServices: ["credentialing", "revenue-cycle-management", "denial-management"],
  relatedSpecialties: ["mental-health"],
};

export default post;
