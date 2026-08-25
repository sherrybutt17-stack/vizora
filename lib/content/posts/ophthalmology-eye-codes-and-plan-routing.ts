import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "ophthalmology-eye-codes-and-plan-routing",
  title: "Ophthalmology billing: eye codes versus E/M and medical versus vision plans",
  excerpt:
    "Eye care is the only specialty with a parallel code set to evaluation and management, and a parallel insurance system to route claims through. Both choices are made per visit.",
  category: "Specialty Billing",
  published: "2026-08-25",
  updated: "2026-08-25",
  readingMinutes: 9,
  answer:
    "Ophthalmology can report visits with either ophthalmological service codes or standard evaluation and management codes, and the correct choice depends on what was performed and documented. Separately, the claim routes to a medical plan or a vision plan depending on the reason for the visit — not on what the patient was examined with, and not on patient preference.",
  sections: [
    {
      heading: "Two code sets, and the choice is per visit",
      body: [
        "Eye care has its own general ophthalmological service codes alongside the standard office visit codes available to every specialty. Both are legitimate, and the practice selects whichever accurately describes the encounter.",
        "The difference is what each requires. The eye codes are defined by a specific set of service components — an intermediate service and a comprehensive service each have defined content, and the comprehensive service requires a general evaluation of the complete visual system including a dilated examination, usually with initiation of a diagnostic and treatment programme.",
        "Standard office visit codes are selected by medical decision-making or total time, which since 2021 has been the basis across all specialties. That structure often suits a complex medical problem better than the eye codes' content-based definition.",
        "The practical implication is that neither set is universally correct, and defaulting to one because it is familiar leaves money behind in some visits and creates audit exposure in others. A comprehensive eye examination performed without dilation does not meet the comprehensive eye code's definition, however thorough it was.",
      ],
      table: {
        headers: ["Code set", "Codes", "Selected by"],
        rows: [
          ["Ophthalmological, new patient", "92002, 92004", "Intermediate or comprehensive service content"],
          ["Ophthalmological, established patient", "92012, 92014", "Intermediate or comprehensive service content"],
          ["Office visit, new patient", "99202–99205", "Medical decision-making or total time"],
          ["Office visit, established patient", "99211–99215", "Medical decision-making or total time"],
        ],
      },
    },
    {
      heading: "Medical or vision plan is decided by the reason for the visit",
      body: [
        "Many patients carry both a medical plan and a separate vision plan, and which one a claim goes to is determined by why the patient came — the chief complaint and the resulting diagnosis — not by which examination was performed or which plan the patient would prefer to use.",
        "A patient presenting for a routine refraction with no complaint and no ocular disease is a vision plan claim. A patient presenting with flashes, floaters, pain, redness or vision loss is a medical claim, even if the examination performed looks similar.",
        "The awkward case is the patient who arrives for a routine examination and is found to have pathology. The visit began as routine and produced a medical finding, and payer conventions on this differ enough that the plan documents govern rather than a general rule.",
        "What is not acceptable is routing by whichever plan pays better, or re-characterising the visit's purpose after the fact to reach a preferred payer. The chief complaint recorded at check-in is the evidence, which is a reason to record it accurately rather than as a formality.",
        "Refraction itself deserves separate mention. It is a distinct service, it is frequently not covered by medical plans, and where it is not covered the patient is generally responsible. Telling them beforehand costs nothing; not telling them produces a bill they did not expect.",
      ],
    },
    {
      heading: "Diagnostic testing carries frequency limits",
      body: [
        "Ophthalmology performs a large volume of diagnostic imaging and functional testing, and payers apply frequency limits to most of it. The limits are published in coverage policy and are among the most frequently exceeded in the specialty.",
        "Optical coherence tomography, visual field testing, fundus photography and corneal topography each have their own coverage criteria and their own expected frequency for a given diagnosis. Testing more often than the policy contemplates is denied on frequency, and appealing rarely succeeds because the payer applied a published rule correctly.",
        "Two structural points make this manageable. The frequency is tied to the diagnosis rather than the patient, so a change in condition can support a change in testing interval where it is documented. And the limits are published, which means the schedule can be configured rather than discovered.",
        "Testing performed on both eyes needs the correct laterality reporting, and the convention differs by code — some tests are inherently bilateral and are reported once regardless, while others are reported per eye. Reporting a bilateral-by-definition test twice is an overpayment.",
      ],
    },
    {
      heading: "Injections and the drugs they deliver are separate claims",
      body: [
        "Intravitreal injection is a procedure, and the agent injected is a drug billed separately in units. Both elements have to be present and correct, and the drug side is where the money and the errors concentrate.",
        "Drug units are defined by the code, not by the vial or the syringe. Reporting one unit per injection for a drug whose code unit is a small quantity substantially underbills; reporting vial quantity for a drug drawn in a partial dose overbills. Neither error announces itself.",
        "Wastage is reportable for single-use vials where the payer permits it, with the discarded amount and reason documented. Practices that draw multiple doses from a vial cannot bill wastage on those doses, and the distinction has to be recorded at the point of administration rather than reconstructed.",
        "Prior authorisation on these agents is near-universal and is granted for a named drug. Switching agents — including to a biosimilar — generally requires a new authorisation, and this is one of the most expensive lapses available in outpatient ophthalmology given the claim values involved.",
      ],
    },
    {
      heading: "Cataract surgery has a global period and postoperative rules",
      body: [
        "Cataract extraction carries a global surgical period, and services within it that relate to the surgery are included in the surgical payment. Postoperative visits, routine follow-up and management of the expected course are not separately billable.",
        "What is billable during the global period is unrelated care, reported with the modifier that identifies it as unrelated, and treatment of complications requiring a return to the operating room, reported with its own modifier. The distinction is documentary — the note has to establish that the service was unrelated or that a complication occurred.",
        "Where the surgery is performed on the second eye during the first eye's global period, that is a separate procedure on a separate site and is reported accordingly with the appropriate laterality. Practices sometimes hesitate here unnecessarily; the global period attaches to the eye operated on, not to the patient.",
        "Complex cataract extraction has its own code and its own documentation requirement. It is not selected by how difficult the case felt — the code has defined circumstances, and the operative note has to establish one of them.",
      ],
    },
    {
      heading: "The recurring theme",
      body: [
        "Every issue above is a routing or selection decision made at the moment of the encounter: which code set, which plan, whether the frequency limit permits the test, whether the drug units match the code's definition, whether a postoperative service is related.",
        "None of them are appeals problems. A test denied on a published frequency limit, a claim sent to the wrong plan, a drug billed in the wrong units — none is fixed by a well-written appeal, because in each case the payer applied its own stated rule to what it received.",
        "Optum's analysis of 124 million claim remits found 84% of denials potentially avoidable, with 22% of those unrecoverable once they occur. Ophthalmology's avoidable share is high and its recoverable share is low, which is an uncomfortable combination and the argument for putting the effort at the front of the encounter rather than the back.",
      ],
    },
  ],
  faq: [
    {
      question: "Should ophthalmology use eye codes or E/M codes?",
      answer:
        "Whichever accurately describes the encounter. Eye codes are defined by service content — a comprehensive service requires a general evaluation of the complete visual system including dilation, usually with initiation of a diagnostic and treatment programme. Office visit codes are selected by medical decision-making or total time, which often suits a complex medical problem better.",
    },
    {
      question: "How do you decide between a medical plan and a vision plan?",
      answer:
        "By the reason for the visit — the chief complaint and resulting diagnosis — not by which examination was performed or which plan the patient prefers. A routine refraction with no complaint and no disease is a vision claim; flashes, floaters, pain, redness or vision loss is a medical claim. The chief complaint recorded at check-in is the evidence.",
    },
    {
      question: "Why was an OCT or visual field denied?",
      answer:
        "Usually frequency. Payers publish expected testing intervals tied to the diagnosis, and testing more often than the policy contemplates denies. Appeals rarely succeed because a published rule was applied correctly. A documented change in condition can support a changed interval, but the documentation has to exist first.",
    },
    {
      question: "Can the second eye be operated on during the first eye's global period?",
      answer:
        "Yes. The global period attaches to the eye operated on rather than to the patient, so surgery on the fellow eye is a separate procedure on a separate site, reported with the appropriate laterality. Practices sometimes hesitate here unnecessarily.",
    },
    {
      question: "How are intravitreal drugs billed?",
      answer:
        "Separately from the injection procedure, in the units the drug's code defines — not per injection and not per vial. Wastage from a single-use vial is reportable where the payer permits it, with the discarded amount and reason documented at administration. Authorisation is granted for a named drug, so switching agents, including to a biosimilar, generally requires a new one.",
    },
  ],
  relatedServices: ["medical-coding", "prior-authorization", "eligibility-verification"],
  relatedSpecialties: ["ophthalmology"],
};

export default post;
