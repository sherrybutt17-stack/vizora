import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "obgyn-global-obstetric-package-billing",
  title: "OB-GYN billing: the global obstetric package and what falls outside it",
  excerpt:
    "One code covers nine months of care. Knowing precisely what it does not cover is where obstetric practices find the revenue they are already earning.",
  category: "Specialty Billing",
  published: "2026-08-24",
  updated: "2026-08-24",
  readingMinutes: 9,
  answer:
    "The global obstetric package bundles routine antepartum visits, delivery and postpartum care into a single code billed after delivery. Ultrasounds, non-stress tests, problems unrelated to the pregnancy, and complications requiring care beyond routine are not included. Most obstetric revenue loss is either failing to bill those separately or billing the global when the patient did not receive all of it.",
  sections: [
    {
      heading: "What the global package actually contains",
      body: [
        "Obstetric care is billed unlike anything else in medicine. Rather than charging per encounter, the practice provides months of care and reports a single code after delivery that covers routine antepartum visits, the delivery itself, and postpartum care.",
        "The routine antepartum component is understood to cover a typical schedule — roughly monthly visits early, increasing in frequency toward term, on the order of thirteen visits in total. Included in each are the standard elements: blood pressure, weight, foetal heart tones, urinalysis and routine assessment.",
        "The delivery component covers the admission, the delivery, and the immediate postpartum management in hospital. The postpartum component covers office visits following discharge.",
      ],
      table: {
        headers: ["Scenario", "Code", "Covers"],
        rows: [
          ["Vaginal delivery, complete care", "59400", "Antepartum, delivery, postpartum"],
          ["Cesarean delivery, complete care", "59510", "Antepartum, delivery, postpartum"],
          ["VBAC, complete care", "59610", "Antepartum, vaginal delivery after cesarean, postpartum"],
          ["Attempted VBAC ending in cesarean", "59618", "Antepartum, cesarean, postpartum"],
        ],
      },
    },
    {
      heading: "The global is only correct when the practice provided all of it",
      body: [
        "This is the error that costs most, and it runs in both directions. A practice that bills the global for a patient who transferred in at thirty weeks is billing for antepartum care it did not provide. A practice that bills individual visits for a patient it cared for throughout is usually leaving money behind.",
        "Patients change insurance mid-pregnancy, move, transfer between practices, or deliver elsewhere. Each of those breaks the global, and the correct billing depends on how much care was actually delivered.",
        "The antepartum-only codes exist for exactly this. A short course of visits is billed as individual evaluation and management encounters. A moderate course and an extended course each have their own code covering the range. Delivery-only codes cover the case where another practice provided the prenatal care.",
      ],
      list: [
        "Fewer than four antepartum visits — bill individual E/M visits rather than an antepartum package",
        "Four to six antepartum visits — 59425",
        "Seven or more antepartum visits — 59426",
        "Delivery only, prenatal care elsewhere — 59409 vaginal, 59514 cesarean, 59612 VBAC",
        "Delivery with postpartum care but not antepartum — the delivery-plus-postpartum codes",
        "Postpartum care only — 59430",
      ],
    },
    {
      heading: "Ultrasound is not in the global, and it is where the volume is",
      body: [
        "Obstetric ultrasound is separately billable and is frequently the largest category of separately reportable service in an obstetric practice. It is not part of the global package, and treating it as though it were is a substantial and silent write-off.",
        "The codes distinguish what was actually performed. A first-trimester study, a standard second- or third-trimester study, a detailed anatomic survey, a limited follow-up study and a transvaginal study are separate codes with different requirements, and the report has to support the one billed.",
        "The detailed anatomic examination in particular carries specific content requirements, and billing it for a study that did not include them is an overpayment rather than an aggressive interpretation. Conversely, billing a limited study for a full anatomic survey underpays materially.",
        "The recurring failure is a template that reports the same ultrasound code regardless of what was done. It underpays on the detailed studies and overpays on the limited ones, and both errors are visible in a review of report content against codes billed.",
        "Non-stress tests, biophysical profiles and foetal Doppler studies are likewise outside the global and separately reportable when performed and documented.",
      ],
    },
    {
      heading: "Complications and unrelated problems are separately billable",
      body: [
        "The global covers routine antepartum care. It does not cover the management of conditions that go beyond routine, and this is the most commonly under-billed area in obstetrics.",
        "A patient seen for a scheduled prenatal visit who is also evaluated for hyperemesis, gestational diabetes management, preterm labour, hypertension in pregnancy, or a condition unrelated to the pregnancy has received a service the global does not contemplate. That visit is separately reportable with the appropriate evaluation and management code.",
        "The documentation requirement is real: the note has to show the separate work rather than fold it into the routine prenatal template. A prenatal flow sheet with a blood pressure recorded is not documentation of hypertension management. An assessment, a plan and the reasoning behind it are.",
        "Practices tend to under-bill here out of caution, which is understandable and expensive. The conservative instinct is correct about modifier discipline on same-day procedures and incorrect about genuinely separate obstetric complications, which are exactly what the payer expects to see reported separately.",
      ],
    },
    {
      heading: "The gynaecology side has its own distinction to get right",
      body: [
        "Outside obstetrics, the dominant question is whether a visit was preventive or problem-oriented, and the two are paid under different benefits with different patient cost-sharing.",
        "A preventive visit is an age-appropriate comprehensive examination with no presenting complaint. A problem visit addresses a complaint. Where both genuinely occur — a patient attends for her annual examination and also raises a new complaint requiring separate evaluation — both are reportable, with modifier 25 on the problem-oriented service.",
        "The qualifier matters as much here as anywhere. A brief mention during an otherwise routine annual is not a separately identifiable service, and routine modifier 25 use on preventive visits is a visible audit pattern.",
        "Medicare complicates this further, because it does not cover a general preventive physical in the way commercial plans do. It covers a screening pelvic and clinical breast examination on a defined frequency, and Pap smear collection separately, each with their own codes. Billing a commercial-style preventive code to Medicare produces a denial that is correct.",
        "Long-acting reversible contraception is separately reportable — the insertion procedure and the device itself are distinct, and the device frequently requires its own authorisation and may be subject to a buy-and-bill or supplied-by-plan arrangement that differs by payer.",
      ],
    },
    {
      heading: "Where the money actually sits",
      body: [
        "Obstetrics is unusual in that its dominant revenue risk is under-billing rather than denial. The global package is a single large claim submitted months after care began, and everything the practice failed to capture along the way is simply absent from it — there is no denial to work, no remittance line to investigate, and no signal that anything went wrong.",
        "That makes obstetric revenue integrity a documentation and capture problem rather than a denial management problem. The controls that matter are a prenatal record that flags separately reportable encounters as they happen, an ultrasound log reconciled against codes billed, and a check at delivery that the global is actually the right code for the care this practice provided.",
        "Optum's analysis of 124 million claim remits found 84% of denials potentially avoidable. In obstetrics the more useful figure is the one nobody measures — services genuinely performed, documented, and never billed at all. A practice that reconciles its ultrasound and complication volume against its claims for a single quarter usually finds it.",
      ],
    },
  ],
  faq: [
    {
      question: "What does the global obstetric package include?",
      answer:
        "Routine antepartum visits — on the order of thirteen across the pregnancy — the delivery itself with its admission and immediate postpartum hospital management, and postpartum office care. It is billed as a single code after delivery rather than per encounter. Ultrasounds, non-stress tests and management of complications are not included.",
    },
    {
      question: "What if a patient transfers care mid-pregnancy?",
      answer:
        "The global no longer applies, because the practice did not provide all of it. Bill according to what was actually delivered: individual E/M visits for fewer than four antepartum visits, 59425 for four to six, 59426 for seven or more, and delivery-only codes where another practice provided the prenatal care.",
    },
    {
      question: "Can obstetric ultrasound be billed separately?",
      answer:
        "Yes. Ultrasound is not part of the global package and is often the largest category of separately reportable service in an obstetric practice. The code must match what was performed — a detailed anatomic survey carries specific content requirements, and billing it for a study that lacked them is an overpayment, while billing a limited study for a full survey underpays materially.",
    },
    {
      question: "Are pregnancy complications billable outside the global?",
      answer:
        "Yes. The global covers routine antepartum care only. Hyperemesis, gestational diabetes management, preterm labour, hypertension in pregnancy and unrelated conditions are separately reportable. The note has to show the separate assessment and plan rather than fold it into the prenatal flow sheet — a blood pressure recorded on a template is not documentation of hypertension management.",
    },
    {
      question: "How do preventive and problem gynaecology visits differ?",
      answer:
        "A preventive visit is a comprehensive age-appropriate examination with no presenting complaint; a problem visit addresses a complaint. Both are reportable when both genuinely occur, with modifier 25 on the problem service. Medicare does not cover a general preventive physical the way commercial plans do — it covers a screening pelvic and breast examination on a set frequency, with Pap collection billed separately.",
    },
  ],
  relatedServices: ["medical-coding", "claims-management", "prior-authorization"],
  relatedSpecialties: ["obgyn"],
};

export default post;
