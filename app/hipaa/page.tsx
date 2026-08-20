import { LegalPage } from "@/components/sections/LegalPage";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/content/site";

export const metadata = pageMeta({
  title: "HIPAA Compliance Statement",
  description: `${site.name}'s HIPAA compliance posture as a business associate handling protected health information.`,
  path: "/hipaa",
});

export default function HipaaPage() {
  return (
    <LegalPage
      path="/hipaa"
      title="HIPAA Compliance Statement"
      intro={`${site.name} operates as a business associate under HIPAA. This statement describes our obligations and the safeguards we apply to protected health information handled on behalf of client practices.`}
      sections={[
        { heading: "Our role as a business associate", body: [
          "Under the HIPAA Privacy and Security Rules, a business associate is any entity that creates, receives, maintains or transmits protected health information on behalf of a covered entity. Providing billing and revenue cycle services places us squarely in that category.",
          "This means we are directly subject to HIPAA — not merely contractually bound through our clients — and are independently liable for breaches of the Security Rule and for impermissible uses or disclosures.",
        ]},
        { heading: "Business Associate Agreement", body: [
          "We execute a Business Associate Agreement with every client practice before receiving any protected health information. The BAA defines permitted uses and disclosures, required safeguards, breach notification obligations and the disposition of PHI at termination.",
          "You should require a BAA from every vendor that touches your patient data. A vendor unwilling to sign one should not be handling PHI.",
        ]},
        { heading: "Administrative safeguards", body: [
          "Designated security responsibility, workforce HIPAA training at onboarding and periodically thereafter, background screening, documented sanction policy, role-based access authorization, and periodic risk assessment.",
        ]},
        { heading: "Technical safeguards", body: [
          "Unique user identification, multi-factor authentication, automatic session termination, encryption of PHI in transit and at rest, audit logging of access to systems containing PHI, and integrity controls.",
        ]},
        { heading: "Physical safeguards", body: [
          "Facility access controls, workstation use and security policies, and documented media disposal and re-use procedures.",
        ]},
        { heading: "Minimum necessary", body: [
          "Access to PHI is limited to the minimum necessary to perform the specific billing function assigned. Staff working a denial queue do not receive broader access than that task requires.",
        ]},
        { heading: "Breach notification", body: [
          "In the event of a breach of unsecured PHI, we notify the affected covered entity without unreasonable delay and within the timeframe required by the Breach Notification Rule and the applicable BAA, with the information needed for the covered entity to meet its own notification obligations.",
        ]},
        { heading: "Subcontractors", body: [
          "Any subcontractor that creates, receives, maintains or transmits PHI on our behalf is bound by written agreement to restrictions and conditions at least as protective as those that apply to us.",
        ]},
        { heading: "Requesting documentation", body: [
          `To request a copy of our Business Associate Agreement or supporting compliance documentation, contact ${site.email}.`,
        ]},
      ]}
    />
  );
}
