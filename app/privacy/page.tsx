import { LegalPage } from "@/components/sections/LegalPage";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/content/site";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, protects and shares information, including protected health information handled under HIPAA as a business associate of the practices we bill for.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      path="/privacy"
      title="Privacy Policy"
      intro={`How ${site.name} collects, uses, protects and shares information — both the business information you provide us and the protected health information we handle on behalf of client practices.`}
      sections={[
        { heading: "Information we collect", body: [
          "Information you provide directly: name, practice name, email address, phone number, specialty and any details submitted through forms on this site.",
          "Protected health information (PHI) received from client practices in the course of providing billing and revenue cycle services. PHI is governed by HIPAA and by the Business Associate Agreement executed with each practice, not by this policy alone.",
          "Technical information collected automatically when you visit this site, which may include IP address, browser type, pages viewed and referring source.",
        ]},
        { heading: "How we use information", body: [
          "Business contact information is used to respond to inquiries, deliver requested services and communicate about your account.",
          "PHI is used solely to perform the billing, coding and revenue cycle services described in the applicable Business Associate Agreement, and for no other purpose.",
          "Technical information is used to operate and improve the site.",
        ]},
        { heading: "How we protect information", body: [
          "Administrative, physical and technical safeguards consistent with the HIPAA Security Rule, including encryption of data in transit and at rest, role-based access limited to the minimum necessary, access logging, workforce training and background screening.",
        ]},
        { heading: "Information sharing", body: [
          "We do not sell personal information or PHI.",
          "Information may be shared with payers and clearinghouses as necessary to submit and adjudicate claims, with subcontractors bound by equivalent obligations, and where required by law.",
        ]},
        { heading: "Your rights", body: [
          "Individuals seeking to exercise HIPAA rights regarding their health information — access, amendment, accounting of disclosures — should contact the healthcare provider that holds the record. As a business associate, we act at the direction of that provider.",
          "For business contact information you have provided directly, you may request access, correction or deletion by contacting us.",
        ]},
        { heading: "Contact", body: [
          `Questions about this policy can be directed to ${site.email} or ${site.phone}.`,
        ]},
      ]}
    />
  );
}
