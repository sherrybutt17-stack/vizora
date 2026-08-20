import { LegalPage } from "@/components/sections/LegalPage";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/content/site";

export const metadata = pageMeta({
  title: "Terms of Service",
  description: `Terms governing use of the ${site.name} website and services.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      path="/terms"
      title="Terms of Service"
      intro={`The terms governing your use of this website. Services themselves are governed by the separate written agreement and Business Associate Agreement executed with each client practice.`}
      sections={[
        { heading: "Scope", body: [
          "These terms apply to your use of this website. They do not govern billing services, which are provided under a separate written services agreement and an executed Business Associate Agreement.",
          "Where these terms conflict with an executed services agreement, that agreement controls.",
        ]},
        { heading: "Use of the site", body: [
          "You may use this site for lawful purposes related to evaluating or obtaining our services. You may not attempt to gain unauthorized access to any part of the site, interfere with its operation, or use automated means to extract content beyond ordinary search indexing.",
        ]},
        { heading: "Informational content", body: [
          "Content on this site — including benchmarks, coding references, denial code explanations and calculators — is provided for general information. It does not constitute legal, compliance, coding or financial advice, and does not create a professional relationship.",
          "Coding rules, payer policies and coverage determinations change frequently. Verify current requirements against the applicable payer policy and code set before relying on anything published here.",
        ]},
        { heading: "Calculators and estimates", body: [
          "Tools on this site produce estimates using published industry benchmarks applied to figures you supply. They are not quotes, guarantees or predictions of results for your practice.",
        ]},
        { heading: "Intellectual property", body: [
          "Content on this site is owned by us or our licensors. CPT is a registered trademark of the American Medical Association; other marks belong to their respective owners.",
        ]},
        { heading: "Disclaimers and limitation of liability", body: [
          "This site is provided on an as-is basis without warranties of any kind. To the maximum extent permitted by law, we are not liable for indirect, incidental or consequential damages arising from use of this site.",
        ]},
        { heading: "Contact", body: [
          `Questions about these terms can be directed to ${site.email}.`,
        ]},
      ]}
    />
  );
}
