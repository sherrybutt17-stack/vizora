import { PageTransition } from "@/components/motion/ViewTransition";
import { JsonLd, breadcrumbSchema, webPageSchema, ENTITIES } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { LAST_UPDATED } from "@/lib/utils";
import { ReferralForm } from "./ReferralForm";

/**
 * Server component wrapper.
 *
 * The referral form is interactive, so it has to be a client component — but a
 * client component cannot export `metadata`, which meant this route shipped
 * with no title, description or canonical while every other page had them.
 * Splitting the form out restores the metadata without changing the form.
 */
export const metadata = pageMeta({
  title: "Referral Program",
  description:
    "Refer another practice to Vizora and earn $250 to $500 when they come on board. No cap on referrals, paid after their first full billing cycle.",
  path: "/referral",
  keywords: [
    "medical billing referral program",
    "refer a practice medical billing",
    "medical billing partner program",
    "healthcare referral bonus",
  ],
});

const crumbs = [{ name: "Home", path: "/" }, { name: "Referral", path: "/referral" }];

export default function ReferralPage() {
  return (
    <PageTransition>
      <JsonLd data={[
        breadcrumbSchema(crumbs),
        webPageSchema({
          name: "Referral program",
          description:
            "Refer a practice to Vizora and earn $250 to $500 once they become a client.",
          path: "/referral",
          about: [ENTITIES.medicalBilling],
          lastReviewed: LAST_UPDATED,
        }),
      ]} />
      <ReferralForm />
    </PageTransition>
  );
}
