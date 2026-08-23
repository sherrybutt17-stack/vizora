import type { Faq } from "./faq";

/**
 * Buyer's guide content.
 *
 * Written to be extractable rather than persuasive. Comparison and buying-guide
 * content accounts for roughly a third of AI answer citations because it is
 * structured and answers an evaluative question directly — but only content
 * that names the situations where the answer is NOT us earns that citation.
 * A guide that concludes "hire us" at every step is an advert, and both
 * readers and language models discount it accordingly.
 *
 * Provider categories are described at the level of the BUSINESS MODEL, never
 * by naming a vendor and asserting facts about their contracts or product.
 * Same rule as lib/content/comparisons.ts — see the header note there.
 */

export const guideAnswer =
  "Choosing a medical billing company comes down to one diagnostic and four numbers. The diagnostic: is your problem your systems or your collections? The numbers: first-pass clean claim rate, denial rate, days in AR, and net collection rate — demanded as figures from the vendor's existing book before any rate is discussed, because a two-point difference in net collection rate outweighs almost any difference in billing percentage.";

export type ProviderCategory = {
  model: string;
  whatItIs: string;
  suits: string;
  tradeoff: string;
};

export const providerCategories: ProviderCategory[] = [
  {
    model: "Platform-attached RCM",
    whatItIs: "Billing sold by the vendor that also supplies your EHR and practice management software.",
    suits: "Practices replacing clinical software anyway, who want one vendor and one implementation.",
    tradeoff: "Billing performance becomes expensive to change, because changing it can mean changing systems too.",
  },
  {
    model: "All-in-one practice platform",
    whatItIs: "Practice management, charting, patient communication and billing in a single subscription product.",
    suits: "Small and solo practices with no administrative staff to manage several vendors.",
    tradeoff: "Breadth over depth. Adequate at many things rather than specialist at collections.",
  },
  {
    model: "Independent billing service",
    whatItIs: "Revenue cycle only, working inside whatever practice management system you already run.",
    suits: "Practices whose systems are fine and whose collections specifically are underperforming.",
    tradeoff: "Two vendor relationships instead of one, and you keep responsibility for the software half.",
  },
  {
    model: "In-house billing staff",
    whatItIs: "Employed billers working on your own systems under your direct management.",
    suits: "Practices with enough volume to justify dedicated headcount and the management capacity to supervise it.",
    tradeoff: "Capacity moves in whole headcount steps, and a single resignation can leave AR unworked for weeks.",
  },
  {
    model: "Offshore billing vendor",
    whatItIs: "Lower-cost labour, usually priced well below domestic rates, often for data entry and follow-up.",
    suits: "High-volume, low-complexity claim profiles where the work is repetitive.",
    tradeoff: "Payer-specific and regional knowledge is harder to build, and time zones complicate live payer calls.",
  },
];

export type GuideStep = { name: string; text: string };

export const evaluationSteps: GuideStep[] = [
  {
    name: "Diagnose systems versus collections",
    text: "Ask whether you can produce, from a report, your first-pass denial rate by payer and your AR aging by bucket for last month. If the data exists and the numbers are bad, you have a collections problem and a billing service addresses it. If the data does not exist at all, you have a systems problem, and no billing service fully compensates for a system that never captured the data.",
  },
  {
    name: "Establish your own baseline first",
    text: "Record your current first-pass clean claim rate, denial rate, days in AR, percentage of AR over 90 days, and net collection rate before you speak to anyone. Without a baseline you cannot evaluate a proposal or hold anyone to it later, and every vendor will sound like an improvement.",
  },
  {
    name: "Demand the vendor's numbers, not their claims",
    text: "Ask for first-pass clean claim rate, denial rate, days in AR, appeal rate and net collection rate across their existing book — not a best case. Ask how each is calculated. A clean claim rate measured after resubmission flatters itself; days in AR falls when aged balances are written off. A vendor who cannot produce these, or who answers with adjectives, is telling you they do not measure them.",
  },
  {
    name: "Compare scope before comparing rate",
    text: "Establish what the percentage includes. Patient statements and postage, clearinghouse fees, credentialing, coding from documentation, implementation and data migration are all commonly billed separately. Two vendors quoting the same percentage can be quoting materially different services.",
  },
  {
    name: "Read the exit terms before the pricing",
    text: "Confirm who owns the data on exit, in what format it is returned and within how many days, whether outstanding AR continues to be worked after notice is served and at what rate, and what notice period applies. Exit terms are the most commonly overlooked and the most expensive to discover late.",
  },
  {
    name: "Ask who actually does the work",
    text: "Establish whether coders are assigned by specialty or pooled across a general queue, who your named escalation contact is and their response time, and whether the people handling your claims are employees or subcontracted. Then ask what happens when that person is on leave.",
  },
  {
    name: "Agree how the aged AR is handled during transition",
    text: "The genuine risk in changing billers is not the new claims — it is the existing accounts receivable. Agree explicitly, in writing, who works the backlog during changeover and to what standard. That inventory ages quietly during transitions and is where recoverable revenue is most often lost.",
  },
];

export const askThese: string[] = [
  "What is your first-pass clean claim rate, and is it measured before or after resubmission?",
  "What is your average days in AR, and what percentage of AR sits beyond 90 days?",
  "What is your net collection rate across your existing book?",
  "What proportion of denials do you appeal, and what proportion of those are overturned?",
  "Is the fee calculated on net collections received, or on charges submitted?",
  "Are patient payments and copays collected at the desk included in the fee base?",
  "Which services are billed separately — statements, postage, clearinghouse, credentialing, coding?",
  "Are coders assigned by specialty, or pooled across a general queue?",
  "Who is my named escalation contact, and what is their response time?",
  "Who owns the data on exit, in what format, and within how many days?",
  "Will you continue working outstanding AR after notice is served, and at what rate?",
  "Will you provide a signed HIPAA business associate agreement without being asked?",
];

export const redFlags: { flag: string; why: string }[] = [
  {
    flag: "A percentage of charges rather than net collections",
    why: "The vendor is paid whether or not the claim is ever collected, which removes their incentive to work denials and appeals. Align the fee with the outcome or expect the outcome to suffer.",
  },
  {
    flag: "Guaranteed collection rates or promised percentage increases",
    why: "Nobody can guarantee payer behaviour. A guarantee is either meaningless in the contract's small print or a claim the vendor cannot support, and both should make you look harder at everything else they said.",
  },
  {
    flag: "Performance figures with no stated basis",
    why: "A clean claim rate quoted without a definition, a sample or a period is a marketing number. Ask what it was measured across and how — the answer, or the absence of one, tells you whether they measure at all.",
  },
  {
    flag: "Denial appeals billed separately",
    why: "Charging separately for appeals rewards a vendor for generating denials. Appeals should be inside the engagement.",
  },
  {
    flag: "No named escalation contact",
    why: "A shared support queue means nobody owns your account. When a payer issue needs a decision within a filing window, a ticket number is not enough.",
  },
  {
    flag: "Reluctance to discuss exit terms",
    why: "The willingness to talk plainly about how the relationship ends is the best available signal of how it will be run while it lasts.",
  },
  {
    flag: "Certifications or credentials asserted without specifics",
    why: "Ask which body, which certificate, and to see it. Unverifiable compliance claims are common in this industry and are a reasonable proxy for how carefully everything else is stated.",
  },
];

export const guideFaqs: Faq[] = [
  {
    question: "How do I know whether I need a new billing company or a new practice management system?",
    answer:
      "Ask whether you can produce, from a report, your first-pass denial rate by payer and your AR aging by bucket for last month. If the data exists and the numbers are bad, it is a collections problem and a billing service addresses it. If the data does not exist at all, it is a systems problem, and a billing service layered on top inherits those constraints rather than fixing them.",
  },
  {
    question: "What questions should I ask a medical billing company before signing?",
    answer:
      "Ask for their first-pass clean claim rate and how it is calculated, their days in AR and percentage over 90 days, their net collection rate, and what proportion of denials they appeal and overturn. Then establish what the fee covers, whether it is charged on collections or charges, and who owns the data on exit. A vendor who answers these with adjectives rather than figures does not measure them.",
  },
  {
    question: "Should billing be charged as a percentage of collections or of charges?",
    answer:
      "Collections, always. A percentage of charges pays the vendor whether or not the claim is ever collected, which removes any financial reason to pursue difficult claims. A percentage of net collections received means the vendor earns nothing on a claim that does not pay, which aligns them with the practice.",
  },
  {
    question: "Is the billing rate the most important thing to compare?",
    answer:
      "No. Net collection rate matters far more. A two-point difference in net collection rate on two million dollars of charges is forty thousand dollars, which is larger than almost any difference in billing percentage. Compare vendors on first-pass denial rate, days in AR and appeal rate, and require those figures before comparing rates at all.",
  },
  {
    question: "What is the biggest risk when switching billing companies?",
    answer:
      "The existing accounts receivable, not the new claims. Aged balances go unworked during a transition while both parties assume the other is handling them, and claims quietly pass their timely filing deadlines. Agree in writing, before changeover, who works the backlog and to what standard.",
  },
  {
    question: "How long does it take to switch medical billing companies?",
    answer:
      "Onboarding typically runs a few weeks from signed agreement to first claim submitted, covering system access, credentialing verification and data migration. New claims improve first. Aged AR recovery runs on the payers' timelines and on whatever filing windows remain open, so the full effect takes longer than the onboarding does.",
  },
];
