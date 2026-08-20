export type Faq = { question: string; answer: string };
export type FaqCategory = { name: string; slug: string; items: Faq[] };

/**
 * Site-wide FAQ. Questions are phrased the way people actually ask them,
 * and answers lead with a direct response — both because that is clearer for
 * readers and because it is what makes a passage extractable as an AI answer.
 */
export const faqCategories: FaqCategory[] = [
  {
    name: "General",
    slug: "general",
    items: [
      {
        question: "What is medical billing?",
        answer:
          "Medical billing is the process of translating delivered care into coded claims, submitting them to insurance payers, and pursuing payment until the balance is resolved. It covers coding, claim scrubbing, submission, payer follow-up, payment posting, denial appeals and patient balance collection.",
      },
      {
        question: "What is the difference between medical billing and revenue cycle management?",
        answer:
          "Medical billing is one stage of the revenue cycle — preparing and submitting claims. Revenue cycle management covers the entire span from patient scheduling and eligibility verification through coding, submission, denial prevention, AR follow-up and analytics. Most revenue leakage happens at the front end, which billing alone never touches.",
      },
      {
        question: "How can Vizora help my practice?",
        answer:
          "We take over the full billing operation — coding, submission, payer follow-up, denial appeals, AR recovery and reporting. Practices typically come to us with a denial rate above 10%, AR days above 45, or a billing staffing problem they cannot solve by hiring.",
      },
      {
        question: "What specialties do you work with?",
        answer:
          "We support 42 specialties, from primary care and behavioral health through cardiology, orthopedics, oncology and surgical subspecialties. Coders are assigned by specialty rather than pooled, so the person coding your claims works in your specialty every day.",
      },
    ],
  },
  {
    name: "Pricing & contracts",
    slug: "pricing",
    items: [
      {
        question: "How much do medical billing services cost?",
        answer:
          "Vizora charges a percentage of net collections, starting at 3% and typically ranging from 3% to 6% depending on practice size, specialty and claim volume. You pay only when we collect. There are no setup fees and no hidden charges. For comparison, one in-house biller costs roughly $73,000 a year fully loaded before software or management overhead.",
      },
      {
        question: "Is outsourcing cheaper than billing in-house?",
        answer:
          "For most small and mid-sized practices, yes — but the comparison has to be complete. In-house costs include salary, benefits at roughly 30% of total compensation, billing software, clearinghouse fees, training, and the coverage gap when your biller takes leave. A percentage-of-collections model also scales with volume rather than requiring a hire.",
      },
      {
        question: "Is there a long-term contract?",
        answer:
          "We recommend a minimum six-month partnership because revenue cycle improvements compound over that horizon rather than appearing immediately. Terms beyond that are flexible, and we would rather earn renewal than enforce a lock-in.",
      },
      {
        question: "Do you charge extra for denial appeals?",
        answer:
          "No. Denial management and appeals are part of standard service. Charging separately for appeals would create an incentive to generate denials, which is precisely the wrong alignment.",
      },
    ],
  },
  {
    name: "Getting started",
    slug: "getting-started",
    items: [
      {
        question: "How long does onboarding take?",
        answer:
          "Typically within 2 weeks depending on practice size and complexity, covering credentialing verification, system integration, historical data migration and staff training. We sequence onboarding so your existing claim flow is never interrupted.",
      },
      {
        question: "What information do you need from my practice?",
        answer:
          "Provider credentials, tax ID and NPI numbers, current payer contracts, practice management system access, historical billing data and your fee schedules. We provide a checklist and work through it with you rather than handing it over.",
      },
      {
        question: "Do we have to change our practice management system or EHR?",
        answer:
          "No. We work inside your existing systems. If your current software is genuinely limiting collections we will tell you and quantify it, but migration is never a precondition of working with us.",
      },
      {
        question: "Will we still have visibility into our billing?",
        answer:
          "Yes. You get portal access with real-time claim status, payment posting, denial trends and financial performance, plus monthly reporting and review. Outsourcing the work should not mean losing sight of it.",
      },
    ],
  },
  {
    name: "Claims & denials",
    slug: "claims",
    items: [
      {
        question: "What is a normal claim denial rate?",
        answer:
          "For physician practices, MGMA reports an aggregate first-submission denial rate of 8%. Hospitals and health systems run higher — Kodiak Solutions measured 11.81% in 2024. Experian Health found 41% of providers now report denial rates above 10%, up from 30% in 2022. If you are above 10%, there is recoverable revenue in your denials.",
      },
      {
        question: "How much does it cost to rework a denied claim?",
        answer:
          "Premier Inc. put the average cost of contesting a denied claim at $57.23 in 2023, a 31% increase in a single year. Across US providers that amounts to $25.7 billion spent annually adjudicating claims with payers, of which roughly $18 billion is potentially unnecessary.",
      },
      {
        question: "Are denied claims usually recoverable?",
        answer:
          "Frequently. Premier Inc. found approximately 70% of denied claims are ultimately overturned and paid when appealed, and Optum reports 84% of denials are potentially avoidable in the first place. The revenue is generally collectible — the problem is that appeals take time most practices do not have.",
      },
      {
        question: "How can we reduce claim denials?",
        answer:
          "Start at the front end. Optum found 44% of denials originate in front-end processes, with registration and eligibility errors alone accounting for 24.3% — the largest single category. Verifying eligibility before the visit, confirming authorization requirements, and scrubbing claims pre-submission prevent more denials than any back-end process.",
      },
      {
        question: "What is the typical billing cycle time?",
        answer:
          "Our average is 20 days from date of service to posted payment. For context, MGMA puts the median practice at 47 days in accounts receivable, with better performers at 36.",
      },
    ],
  },
  {
    name: "Compliance & security",
    slug: "compliance",
    items: [
      {
        question: "Is Vizora HIPAA compliant?",
        answer:
          "Yes. We operate under HIPAA safeguards including encrypted data transmission and storage, role-based access controls, staff training and access logging. A Business Associate Agreement is available on request and should be executed before any protected health information is exchanged.",
      },
      {
        question: "How do you protect patient data?",
        answer:
          "256-bit encryption in transit and at rest, multi-factor authentication, role-based access restricted to the minimum necessary information, access logging, background checks on all staff, and regular security review.",
      },
      {
        question: "What certifications do your coders hold?",
        answer:
          "Our coders are certified and are assigned by specialty rather than pooled across a general queue. Coding accuracy is audited internally on a sample basis rather than assumed.",
      },
      {
        question: "Will you sign a Business Associate Agreement?",
        answer:
          "Yes, and you should require one. Any vendor handling protected health information on your behalf is a business associate under HIPAA, and the agreement is what establishes their obligations. We provide ours during onboarding as a matter of course.",
      },
    ],
  },
];

export const allFaqs: Faq[] = faqCategories.flatMap((c) => c.items);

/** Shorter set used on the homepage. */
export const homeFaqs: Faq[] = [
  faqCategories[1].items[0], // pricing
  faqCategories[3].items[0], // normal denial rate
  faqCategories[2].items[0], // onboarding
  faqCategories[2].items[2], // change systems
  faqCategories[3].items[3], // reduce denials
  faqCategories[4].items[0], // HIPAA
];
