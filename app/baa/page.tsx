import { LegalPage } from "@/components/sections/LegalPage";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/content/site";

export const metadata = pageMeta({
  title: "Business Associate Agreement",
  description: `Request ${site.name}'s HIPAA Business Associate Agreement. What it covers, which safeguards it commits us to, and how to get a signed copy for your practice.`,
  path: "/baa",
});

export default function BaaPage() {
  return (
    <LegalPage
      path="/baa"
      title="Business Associate Agreement"
      intro={`A Business Associate Agreement is the contract HIPAA requires between a covered entity and any vendor handling protected health information on its behalf. We execute one with every client before receiving any PHI.`}
      sections={[
        { heading: "Why a BAA is required", body: [
          "HIPAA requires a covered entity to obtain satisfactory assurances, in writing, that a business associate will appropriately safeguard protected health information. Without an executed BAA, disclosing PHI to a billing vendor is itself an impermissible disclosure — regardless of how carefully that vendor handles the data.",
          "This is a common and serious gap. Practices routinely share patient data with vendors under nothing more than a services agreement, which does not satisfy the requirement.",
        ]},
        { heading: "What the agreement covers", body: [
          "Permitted uses and disclosures of PHI, and the prohibition on any use beyond those purposes. Required administrative, physical and technical safeguards. Breach notification obligations and timelines. Obligations flowed down to subcontractors. Individual rights support, including access and amendment requests. Return or destruction of PHI at termination. Audit and documentation rights.",
        ]},
        { heading: "When it is executed", body: [
          "During onboarding, before any protected health information is transmitted to us. We will not begin working claims until the BAA is signed by both parties.",
        ]},
        { heading: "Reviewing our BAA", body: [
          "Practices are welcome to have counsel review our standard agreement, and we can work from your form where you have one. We would rather spend time on the agreement up front than discover a gap during an audit.",
        ]},
        { heading: "Requesting a copy", body: [
          `To request our Business Associate Agreement, contact ${site.email} or call ${site.phone}. We can usually provide it the same business day.`,
        ]},
      ]}
    />
  );
}
