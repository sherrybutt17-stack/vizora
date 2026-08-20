export type CaseStudy = {
  slug: string;
  title: string;
  headlineMetric: { value: string; label: string };
  specialty: string;
  /** Links to /specialties/[slug] when a matching page exists. */
  specialtySlug?: string;
  location: string;
  size: string;
  client: { name: string; role: string };
  challenge: string;
  solution: string;
  results: string[];
  quote: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "austin-family-practice",
    title: "Austin Family Practice reduces denials by 71%",
    headlineMetric: { value: "32%", label: "Revenue increase" },
    specialty: "Family Medicine",
    specialtySlug: "family-medicine",
    location: "Austin, TX",
    size: "3 physicians",
    client: { name: "Dr. Rebecca Martinez", role: "Lead Physician" },
    challenge:
      "The practice was running a 28% claim denial rate with payment cycles averaging 52 days. Staff were managing billing alongside patient care, which meant follow-up happened only when someone found time for it — so denials went unworked and revenue was written off by default.",
    solution:
      "We implemented a structured billing review, assigned certified coders to claim preparation, and established systematic denial management with weekly payer follow-up so no denial sat unaddressed.",
    results: [
      "Denial rate reduced from 28% to 8% within three months",
      "Average payment cycle shortened from 52 days to 18",
      "Monthly revenue increased 32%",
      "Staff returned to patient care instead of billing administration",
    ],
    quote:
      "Vizora transformed our billing process. The improvement in our denial rate and cash flow has been remarkable. Our staff can now focus on what they do best — caring for patients.",
  },
  {
    slug: "northwest-cardiology",
    title: "Northwest Cardiology improves cash flow by 45%",
    headlineMetric: { value: "45%", label: "Cash flow improvement" },
    specialty: "Cardiology",
    specialtySlug: "cardiology",
    location: "Seattle, WA",
    size: "5 physicians",
    client: { name: "Sarah Chen, MBA", role: "Practice Administrator" },
    challenge:
      "Complex cardiology procedures were producing frequent coding errors and underpayments, particularly around the technical and professional component split. AR days averaged 62, with significant aging receivables creating persistent cash flow pressure.",
    solution:
      "We deployed cardiology-specialized coders, implemented pre-authorization verification on all interventional procedures, and began aggressive AR follow-up driven by systematic aging report review.",
    results: [
      "Clean claim rate reached 97% on cardiology procedures",
      "AR days reduced from 62 to 24",
      "Cash flow improved 45%",
      "$180,000 in aging AR recovered within the first six months",
    ],
    quote:
      "The transparency and expertise Vizora brings to our billing has been invaluable. We finally have predictable cash flow and clear visibility into our revenue cycle.",
  },
  {
    slug: "pacific-orthopedics",
    title: "Pacific Orthopedics recovers $150K in denied claims",
    headlineMetric: { value: "$150K", label: "Revenue recovered" },
    specialty: "Orthopedics",
    specialtySlug: "orthopedics",
    location: "San Diego, CA",
    size: "4 surgeons",
    client: { name: "Dr. James Thompson", role: "Managing Partner" },
    challenge:
      "Surgical coding complexity had produced a 35% denial rate on orthopedic procedures. The previous billing company had limited orthopedic expertise, resulting in systematic undercoding and a backlog of denied surgical claims nobody had appealed.",
    solution:
      "We assigned AAPC-certified orthopedic coders, implemented comprehensive procedure documentation review, and launched an appeal process covering every rejected surgical claim still inside its filing window.",
    results: [
      "Denial rate decreased from 35% to 9%",
      "$150,000 recovered in previously denied surgical claims",
      "Surgical reimbursement rates increased 28%",
      "Documentation improvements reduced ongoing compliance risk",
    ],
    quote:
      "Vizora's orthopedic billing expertise has been a game-changer. They recovered revenue we thought was lost and dramatically improved our surgical claim acceptance.",
  },
  {
    slug: "wellness-behavioral-health",
    title: "Wellness Behavioral Health streamlines multi-provider billing",
    headlineMetric: { value: "38%", label: "Revenue growth" },
    specialty: "Behavioral Health",
    specialtySlug: "mental-health",
    location: "Denver, CO",
    size: "8 therapists",
    client: { name: "Dr. Emily Rodriguez", role: "Clinical Director" },
    challenge:
      "Managing billing across eight therapists with different insurance panels had become administratively unmanageable. Credentialing delays were preventing newly hired providers from billing for six months or more, so delivered care went uncollected.",
    solution:
      "We centralized billing across all providers, implemented a fast-track credentialing process that began before each start date, and established payer-specific protocols for behavioral health carve-outs.",
    results: [
      "All providers credentialed within 90 days of hire",
      "Billing errors reduced 64%",
      "Practice revenue increased 38%",
      "Administrative time reduced by 15 hours per week",
    ],
    quote:
      "Before Vizora, billing was a constant source of stress. Now it runs smoothly in the background, and we can focus on providing excellent mental health care.",
  },
  {
    slug: "summit-physical-therapy",
    title: "Summit Physical Therapy achieves a 99% clean claim rate",
    headlineMetric: { value: "99%", label: "Clean claim rate" },
    specialty: "Physical Therapy",
    specialtySlug: "physical-therapy",
    location: "Boulder, CO",
    size: "6 therapists",
    client: { name: "Michael Anderson, PT", role: "Clinic Owner" },
    challenge:
      "Authorization requirements were being missed routinely, producing denials on care already delivered. High patient volume made it impractical for front-desk staff to verify coverage and remaining authorized visits before each appointment.",
    solution:
      "We implemented automated eligibility verification at check-in, built an authorization tracking system flagging patients approaching their visit limit, and trained front-desk staff on verification protocol.",
    results: [
      "Clean claim rate improved to 99%",
      "Authorization-related denials eliminated",
      "Patient satisfaction increased with clearer billing communication",
      "Revenue cycle time reduced from 45 days to 16",
    ],
    quote:
      "The verification system Vizora set up has eliminated our authorization headaches. We haven't had an authorization denial in over six months.",
  },
];

export const caseStudyMap = new Map(caseStudies.map((c) => [c.slug, c]));
export const getCaseStudiesForSpecialty = (slug: string) =>
  caseStudies.filter((c) => c.specialtySlug === slug);

export const aggregateResults = [
  { value: "$480K+", label: "Revenue recovered" },
  { value: "97%", label: "Average clean claim rate" },
  { value: "20 days", label: "Average payment cycle" },
  { value: "5", label: "Specialties represented" },
];
